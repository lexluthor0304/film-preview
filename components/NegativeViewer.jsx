"use client";

import { useEffect, useRef, useState } from "react";
import {
  createWebGLPipeline,
  correctionFromSample,
  DEFAULT_GAMMA,
} from "@/lib/webgl-pipeline";
import { autoSampleBase, manualSampleBase } from "@/lib/sample-base";
import { srgbToLinear, linearToSrgb } from "@/lib/color";
import {
  clampValue,
  clampPan,
  contentRect,
  clientToContentNorm,
  displayToSource,
  panDeltaToSource,
  fitRect,
} from "@/lib/view-transform";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

// Long enough for auto-exposure/AWB to settle before we lock and sample.
const AUTO_SAMPLE_DELAY_MS = 600;
const RESAMPLE_INTERVAL_MS = 2000;
const EMA_ALPHA = 0.25;
// Skip uniform updates below this per-channel delta (avoids flicker)…
const EMA_MIN_DELTA = 1.5;
// …but snap immediately on large jumps (user swapped negatives).
const EMA_SNAP_DELTA = 20;
const GAMMA_MIN = 1.0;
const GAMMA_MAX = 2.4;
const GAMMA_STEP = 0.05;
const EV_MIN = -2;
const EV_MAX = 2;
const EV_STEP = 0.1;
const MAX_ZOOM = 8;
const TAP_SLOP_PX = 8;
const FLASH_MS = 320;
const SETTINGS_KEY = "negative-viewer-settings-v1";

const FILM_TYPES = ["color", "bw", "positive"];
const FILM_TYPE_INDEX = { color: 0, bw: 1, positive: 2 };
// Aspect ratios for the frame guide, keyed by select value.
const GUIDE_ASPECTS = { "3:2": 3 / 2, "1:1": 1, "4:3": 4 / 3, "5:4": 5 / 4 };
const GUIDE_FRACTION = 0.9;

function buildLuts(correction, ev = 0, filmType = "color") {
  const luts = [new Uint8Array(256), new Uint8Array(256), new Uint8Array(256)];
  const gain = Math.pow(2, ev);
  const bases = correction
    ? [correction.base.r, correction.base.g, correction.base.b]
    : null;
  const black = correction
    ? Math.pow(correction.white, correction.gamma)
    : 0;
  for (let c = 0; c < 3; c += 1) {
    for (let v = 0; v < 256; v += 1) {
      let pos;
      if (filmType === "positive") {
        pos = srgbToLinear(v / 255);
      } else if (!correction) {
        pos = srgbToLinear((255 - v) / 255);
      } else {
        const lin = srgbToLinear(v / 255);
        const t = Math.min(Math.max(lin / bases[c], 1e-4), 1);
        const raw = Math.pow(correction.white / t, correction.gamma);
        pos = (raw - black) / (1 - black);
      }
      pos = Math.min(Math.max(pos * gain, 0), 1);
      luts[c][v] = Math.round(linearToSrgb(pos) * 255);
    }
  }
  return luts;
}

function applyCpuColor(imageData, luts, filmType) {
  const [lr, lg, lb] = luts;
  const d = imageData.data;
  const bw = filmType === "bw";
  for (let i = 0; i < d.length; i += 4) {
    let r = lr[d[i]];
    let g = lg[d[i + 1]];
    let b = lb[d[i + 2]];
    if (bw) {
      const y = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
      r = y;
      g = y;
      b = y;
    }
    d[i] = r;
    d[i + 1] = g;
    d[i + 2] = b;
  }
  return imageData;
}

async function lockCameraColor(stream) {
  const track = stream.getVideoTracks()[0];
  if (!track?.getCapabilities) return;
  try {
    const caps = track.getCapabilities();
    const settings = track.getSettings();
    const advanced = [];
    if (caps.whiteBalanceMode?.includes("manual")) {
      const wb = { whiteBalanceMode: "manual" };
      if (caps.colorTemperature) {
        // Lock at the value AWB has already converged to, not an arbitrary one.
        wb.colorTemperature =
          settings.colorTemperature ??
          (caps.colorTemperature.min + caps.colorTemperature.max) / 2;
      }
      advanced.push(wb);
    }
    if (caps.exposureMode?.includes("manual") && settings.exposureTime) {
      advanced.push({
        exposureMode: "manual",
        exposureTime: settings.exposureTime,
      });
    }
    if (advanced.length) await track.applyConstraints({ advanced });
  } catch {
    // Device-dependent; periodic resampling compensates for AWB drift.
  }
}

export default function NegativeViewer({ labels }) {
  const t = labels || getDictionary("en").viewer;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const viewportRef = useRef(null);
  const animationFrameRef = useRef(0);
  const pipelineRef = useRef(null);
  const samplingRef = useRef(false);
  const autoSampleTimerRef = useRef(0);
  const resampleTimerRef = useRef(0);
  const nativeFullscreenRef = useRef(false);
  const baseRef = useRef(null); // sampled base color, 0-255 per channel
  const gammaRef = useRef(DEFAULT_GAMMA);
  const evRef = useRef(0);
  const filmTypeRef = useRef("color");
  const guideRef = useRef("off");
  const sampleSourceRef = useRef("none");
  const lutRef = useRef(null);
  const streamRef = useRef(null);
  const imageCaptureRef = useRef(null);
  const wakeLockRef = useRef(null);
  const frozenRef = useRef(false);
  const isCameraOnRef = useRef(false);
  const viewRef = useRef({ zoom: 1, pan: { x: 0, y: 0 }, rotate: 0, mirror: false });
  const pointerStateRef = useRef({ pointers: new Map(), lastDist: 0, moved: false, downX: 0, downY: 0 });
  const captureCanvasRef = useRef(null);
  const capturePipelineRef = useRef(null);
  const shotsRef = useRef([]);
  const shotSeqRef = useRef(0);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [insecureContext, setInsecureContext] = useState(false);
  const [isCorrected, setIsCorrected] = useState(false);
  const [gamma, setGamma] = useState(DEFAULT_GAMMA);
  const [ev, setEv] = useState(0);
  const [filmType, setFilmType] = useState("color");
  const [guide, setGuide] = useState("off");
  const [guideStyle, setGuideStyle] = useState(null);
  const [sampleSource, setSampleSource] = useState("none"); // "none" | "auto" | "manual"
  const [armSample, setArmSample] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [zoomUi, setZoomUi] = useState(1);
  const [mirror, setMirror] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [hudHidden, setHudHidden] = useState(false);
  const [shots, setShots] = useState([]);
  const [flash, setFlash] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);

  useEffect(() => {
    isCameraOnRef.current = isCameraOn;
  }, [isCameraOn]);

  useEffect(() => {
    shotsRef.current = shots;
  }, [shots]);

  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (nativeFullscreenRef.current && !document.fullscreenElement) {
        nativeFullscreenRef.current = false;
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    const isLocalHost =
      host === "localhost" || host === "127.0.0.1" || host === "::1";
    if (!window.isSecureContext && !isLocalHost) {
      setInsecureContext(true);
    }
    if (canvasRef.current) {
      const pipeline = createWebGLPipeline(canvasRef.current);
      if (pipeline) {
        pipelineRef.current = pipeline;
      }
    }
    try {
      const raw = window.localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (
          typeof saved.gamma === "number" &&
          saved.gamma >= GAMMA_MIN &&
          saved.gamma <= GAMMA_MAX
        ) {
          gammaRef.current = saved.gamma;
          setGamma(saved.gamma);
        }
        if (typeof saved.ev === "number" && saved.ev >= EV_MIN && saved.ev <= EV_MAX) {
          evRef.current = saved.ev;
          setEv(saved.ev);
        }
        if (FILM_TYPES.includes(saved.filmType)) {
          filmTypeRef.current = saved.filmType;
          setFilmType(saved.filmType);
        }
        if (saved.guide === "off" || GUIDE_ASPECTS[saved.guide]) {
          guideRef.current = saved.guide;
          setGuide(saved.guide);
        }
      }
    } catch {
      // Ignore malformed settings.
    }
    pushColorState();
    try {
      const probe = new File([new Uint8Array([0])], "probe.png", {
        type: "image/png",
      });
      setCanShareFiles(Boolean(navigator.canShare?.({ files: [probe] })));
    } catch {
      setCanShareFiles(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistSettings = () => {
    try {
      window.localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          gamma: gammaRef.current,
          ev: evRef.current,
          filmType: filmTypeRef.current,
          guide: guideRef.current,
        })
      );
    } catch {
      // Storage may be unavailable (private mode); settings just won't stick.
    }
  };

  const shouldAutoFullscreen = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
  };

  const enterFullscreenPreview = () => {
    setIsFullscreen(true);
    setHudHidden(false);
    const el = viewerRef.current;
    if (!el || document.fullscreenElement || !el.requestFullscreen) return;
    el
      .requestFullscreen({ navigationUI: "hide" })
      .then(() => {
        nativeFullscreenRef.current = true;
      })
      .catch(() => {
        nativeFullscreenRef.current = false;
      });
  };

  const exitFullscreenPreview = () => {
    setIsFullscreen(false);
    setHudHidden(false);
    nativeFullscreenRef.current = false;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const currentCorrection = () =>
    baseRef.current
      ? correctionFromSample(baseRef.current, { gamma: gammaRef.current })
      : null;

  const pushColorState = () => {
    const correction = currentCorrection();
    pipelineRef.current?.setCorrection(correction);
    pipelineRef.current?.setAdjust({
      ev: evRef.current,
      filmType: FILM_TYPE_INDEX[filmTypeRef.current] ?? 0,
    });
    lutRef.current = pipelineRef.current
      ? null
      : buildLuts(correction, evRef.current, filmTypeRef.current);
    setIsCorrected(Boolean(correction));
  };

  const pushView = () => {
    pipelineRef.current?.setView(viewRef.current);
    setZoomUi(viewRef.current.zoom);
  };

  const applyBase = (base, source) => {
    if (!base) return;
    baseRef.current = base;
    sampleSourceRef.current = source;
    setSampleSource(source);
    pushColorState();
  };

  const resetCorrection = () => {
    baseRef.current = null;
    sampleSourceRef.current = "none";
    setSampleSource("none");
    pushColorState();
  };

  const changeGamma = (value) => {
    gammaRef.current = value;
    setGamma(value);
    pushColorState();
    persistSettings();
  };

  const changeEv = (value) => {
    evRef.current = value;
    setEv(value);
    pushColorState();
    persistSettings();
  };

  const changeFilmType = (value) => {
    if (!FILM_TYPES.includes(value)) return;
    filmTypeRef.current = value;
    setFilmType(value);
    if (value === "positive" && samplingRef.current) {
      samplingRef.current = false;
      setArmSample(false);
    }
    pushColorState();
    persistSettings();
  };

  const recomputeGuide = () => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    const aspect = GUIDE_ASPECTS[guideRef.current];
    if (!canvas || !viewport || !aspect || !isCameraOnRef.current) {
      setGuideStyle(null);
      return;
    }
    const content = contentRect(canvas);
    if (!content.width || !content.height) {
      setGuideStyle(null);
      return;
    }
    const rect = fitRect(content.width, content.height, aspect, GUIDE_FRACTION);
    const viewportRect = viewport.getBoundingClientRect();
    setGuideStyle({
      left: `${content.left - viewportRect.left + rect.x}px`,
      top: `${content.top - viewportRect.top + rect.y}px`,
      width: `${rect.w}px`,
      height: `${rect.h}px`,
    });
  };

  // Wait two frames so the render loop has resized the canvas first.
  const recomputeGuideSoon = () => {
    requestAnimationFrame(() => requestAnimationFrame(recomputeGuide));
  };

  const changeGuide = (value) => {
    if (value !== "off" && !GUIDE_ASPECTS[value]) return;
    guideRef.current = value;
    setGuide(value);
    recomputeGuideSoon();
    persistSettings();
  };

  const changeZoom = (value) => {
    const view = viewRef.current;
    view.zoom = clampValue(value, 1, MAX_ZOOM);
    view.pan = clampPan(view.pan, view.zoom);
    pushView();
  };

  const applyPanDelta = (dxPx, dyPx) => {
    const canvas = canvasRef.current;
    const view = viewRef.current;
    if (!canvas || view.zoom <= 1) return;
    const content = contentRect(canvas);
    if (!content.width || !content.height) return;
    const delta = panDeltaToSource(
      dxPx / content.width,
      dyPx / content.height,
      view
    );
    view.pan = clampPan(
      {
        x: view.pan.x - delta.u / view.zoom,
        y: view.pan.y - delta.v / view.zoom,
      },
      view.zoom
    );
    pushView();
  };

  const rotateView = () => {
    const view = viewRef.current;
    view.rotate = (view.rotate + 1) % 4;
    view.pan = { x: 0, y: 0 };
    pushView();
    recomputeGuideSoon();
  };

  const toggleMirror = () => {
    const view = viewRef.current;
    view.mirror = !view.mirror;
    setMirror(view.mirror);
    pushView();
  };

  const resetView = () => {
    viewRef.current = { zoom: 1, pan: { x: 0, y: 0 }, rotate: 0, mirror: false };
    setMirror(false);
    pushView();
  };

  const renderCpuFrame = (source) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const sw = source.videoWidth ?? source.width;
    const sh = source.videoHeight ?? source.height;
    if (!sw || !sh) return;
    const view = viewRef.current;
    const rotated = view.rotate % 2 === 1;
    const cw = rotated ? sh : sw;
    const ch = rotated ? sw : sh;
    if (canvas.width !== cw) canvas.width = cw;
    if (canvas.height !== ch) canvas.height = ch;
    const srcW = sw / view.zoom;
    const srcH = sh / view.zoom;
    const sx = (0.5 + view.pan.x) * sw - srcW / 2;
    const sy = (0.5 + view.pan.y) * sh - srcH / 2;
    ctx.save();
    ctx.translate(cw / 2, ch / 2);
    if (view.mirror) ctx.scale(-1, 1);
    ctx.rotate((view.rotate * Math.PI) / 2);
    ctx.drawImage(source, sx, sy, srcW, srcH, -sw / 2, -sh / 2, sw, sh);
    ctx.restore();
    if (!lutRef.current) {
      lutRef.current = buildLuts(
        currentCorrection(),
        evRef.current,
        filmTypeRef.current
      );
    }
    const imageData = ctx.getImageData(0, 0, cw, ch);
    ctx.putImageData(
      applyCpuColor(imageData, lutRef.current, filmTypeRef.current),
      0,
      0
    );
  };

  const processVideo = () => {
    const videoEl = videoRef.current;
    const canvas = canvasRef.current;
    if (!videoEl || !canvas) return;
    if (pipelineRef.current) {
      pipelineRef.current.renderFrame(videoEl);
    } else {
      renderCpuFrame(videoEl);
    }
    animationFrameRef.current = requestAnimationFrame(processVideo);
  };

  const startResampleLoop = () => {
    if (resampleTimerRef.current) return;
    resampleTimerRef.current = window.setInterval(() => {
      // Only track drift while in auto mode; never override a manual sample.
      if (sampleSourceRef.current !== "auto") return;
      if (frozenRef.current) return;
      const videoEl = videoRef.current;
      if (!videoEl) return;
      const sampled = autoSampleBase(videoEl);
      if (!sampled) return;
      const prev = baseRef.current;
      if (!prev) {
        applyBase(sampled, "auto");
        return;
      }
      const maxDelta = Math.max(
        Math.abs(sampled.r - prev.r),
        Math.abs(sampled.g - prev.g),
        Math.abs(sampled.b - prev.b)
      );
      if (maxDelta < EMA_MIN_DELTA) return;
      const next =
        maxDelta > EMA_SNAP_DELTA
          ? sampled
          : {
              r: prev.r + EMA_ALPHA * (sampled.r - prev.r),
              g: prev.g + EMA_ALPHA * (sampled.g - prev.g),
              b: prev.b + EMA_ALPHA * (sampled.b - prev.b),
            };
      baseRef.current = next;
      pushColorState();
    }, RESAMPLE_INTERVAL_MS);
  };

  const requestWakeLock = async () => {
    try {
      wakeLockRef.current = await navigator.wakeLock?.request("screen");
    } catch {
      // Not critical; the screen may still dim.
    }
  };

  const releaseWakeLock = () => {
    wakeLockRef.current?.release?.().catch(() => {});
    wakeLockRef.current = null;
  };

  const cameraErrorMessage = (err) => {
    switch (err?.name) {
      case "NotAllowedError":
      case "SecurityError":
        return t.errorPermission;
      case "NotFoundError":
      case "OverconstrainedError":
        return t.errorNoCamera;
      case "NotReadableError":
      case "AbortError":
        return t.errorCameraBusy;
      default:
        return t.cameraError;
    }
  };

  const startCamera = async () => {
    setError("");
    const autoFullscreen = shouldAutoFullscreen();
    if (autoFullscreen) {
      enterFullscreenPreview();
    }
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setError(t.cameraUnsupported);
        if (autoFullscreen) exitFullscreenPreview();
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      const videoEl = videoRef.current;
      const canvas = canvasRef.current;
      if (!videoEl || !canvas) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      const track = stream.getVideoTracks()[0];
      try {
        imageCaptureRef.current =
          typeof window.ImageCapture === "function" && track
            ? new window.ImageCapture(track)
            : null;
      } catch {
        imageCaptureRef.current = null;
      }
      videoEl.srcObject = stream;
      await videoEl.play();
      frozenRef.current = false;
      setFrozen(false);
      const waitForSize = () => {
        if (videoEl.videoWidth > 0) {
          setIsCameraOn(true);
          isCameraOnRef.current = true;
          processVideo();
          requestWakeLock();
          recomputeGuideSoon();
          autoSampleTimerRef.current = window.setTimeout(async () => {
            await lockCameraColor(stream);
            const base = autoSampleBase(videoEl);
            if (base) applyBase(base, "auto");
            startResampleLoop();
          }, AUTO_SAMPLE_DELAY_MS);
        } else {
          requestAnimationFrame(waitForSize);
        }
      };
      waitForSize();
    } catch (err) {
      console.error("Camera Error:", err);
      setError(cameraErrorMessage(err));
      if (autoFullscreen) exitFullscreenPreview();
    }
  };

  const stopCamera = () => {
    if (autoSampleTimerRef.current) {
      clearTimeout(autoSampleTimerRef.current);
      autoSampleTimerRef.current = 0;
    }
    if (resampleTimerRef.current) {
      clearInterval(resampleTimerRef.current);
      resampleTimerRef.current = 0;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    imageCaptureRef.current = null;
    const videoEl = videoRef.current;
    if (videoEl) videoEl.srcObject = null;
    frozenRef.current = false;
    setFrozen(false);
    samplingRef.current = false;
    setArmSample(false);
    releaseWakeLock();
    resetCorrection();
    resetView();
    if (pipelineRef.current) {
      pipelineRef.current.clear();
    } else if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setIsCameraOn(false);
    isCameraOnRef.current = false;
    setGuideStyle(null);
    setPanelOpen(false);
    exitFullscreenPreview();
  };

  const toggleFreeze = () => {
    const videoEl = videoRef.current;
    if (!videoEl || !isCameraOn) return;
    if (frozenRef.current) {
      videoEl.play().catch(() => {});
      frozenRef.current = false;
      setFrozen(false);
    } else {
      videoEl.pause();
      frozenRef.current = true;
      setFrozen(true);
    }
  };

  // ---- Capture & gallery -------------------------------------------------

  const blobFromCanvas = (canvas) =>
    new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

  // Crop to the frame guide (in canvas pixel space) when a guide is active.
  const cropForGuide = async (srcCanvas) => {
    const aspect = GUIDE_ASPECTS[guideRef.current];
    if (!aspect) return blobFromCanvas(srcCanvas);
    const rect = fitRect(srcCanvas.width, srcCanvas.height, aspect, GUIDE_FRACTION);
    const out = document.createElement("canvas");
    out.width = Math.max(1, Math.round(rect.w));
    out.height = Math.max(1, Math.round(rect.h));
    const ctx = out.getContext("2d");
    if (!ctx) return blobFromCanvas(srcCanvas);
    ctx.drawImage(
      srcCanvas,
      rect.x,
      rect.y,
      rect.w,
      rect.h,
      0,
      0,
      out.width,
      out.height
    );
    return blobFromCanvas(out);
  };

  const ensureCapturePipeline = () => {
    if (capturePipelineRef.current) return capturePipelineRef.current;
    const canvas = document.createElement("canvas");
    const pipeline = createWebGLPipeline(canvas);
    if (pipeline) {
      captureCanvasRef.current = canvas;
      capturePipelineRef.current = pipeline;
    }
    return pipeline;
  };

  // Full-resolution still via ImageCapture, processed through the same
  // shader settings as the live preview. Returns null when unavailable.
  const highResShot = async () => {
    const imageCapture = imageCaptureRef.current;
    if (!imageCapture) return null;
    const pipeline = ensureCapturePipeline();
    if (!pipeline) return null;
    const photoBlob = await imageCapture.takePhoto();
    let bitmap = await createImageBitmap(photoBlob);
    const maxTex = pipeline.maxTextureSize;
    if (bitmap.width > maxTex || bitmap.height > maxTex) {
      const scale = maxTex / Math.max(bitmap.width, bitmap.height);
      const resized = await createImageBitmap(bitmap, {
        resizeWidth: Math.max(1, Math.floor(bitmap.width * scale)),
        resizeHeight: Math.max(1, Math.floor(bitmap.height * scale)),
      });
      bitmap.close();
      bitmap = resized;
    }
    pipeline.setCorrection(currentCorrection());
    pipeline.setAdjust({
      ev: evRef.current,
      filmType: FILM_TYPE_INDEX[filmTypeRef.current] ?? 0,
    });
    pipeline.setView(viewRef.current);
    pipeline.renderFrame(bitmap);
    bitmap.close();
    return cropForGuide(captureCanvasRef.current);
  };

  const captureShot = async () => {
    if (!isCameraOn || capturing) return;
    setCapturing(true);
    setFlash(true);
    window.setTimeout(() => setFlash(false), FLASH_MS);
    try {
      navigator.vibrate?.(40);
    } catch {
      // Vibration is best-effort.
    }
    let blob = null;
    // A frozen preview must save exactly what is on screen; takePhoto would
    // capture the live sensor instead.
    if (!frozenRef.current) {
      try {
        blob = await highResShot();
      } catch {
        blob = null;
      }
    }
    if (!blob && canvasRef.current) {
      try {
        blob = await cropForGuide(canvasRef.current);
      } catch {
        blob = null;
      }
    }
    if (blob) {
      shotSeqRef.current += 1;
      const shot = {
        id: `${Date.now()}-${shotSeqRef.current}`,
        url: URL.createObjectURL(blob),
        blob,
      };
      setShots((prev) => [shot, ...prev]);
    }
    setCapturing(false);
  };

  const downloadShot = (shot) => {
    const link = document.createElement("a");
    link.href = shot.url;
    link.download = `negative-viewer-${shot.id}.png`;
    link.click();
  };

  const shareShot = async (shot) => {
    try {
      const file = new File([shot.blob], `negative-viewer-${shot.id}.png`, {
        type: "image/png",
      });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      }
    } catch {
      // User cancelled or share failed; nothing to clean up.
    }
  };

  const deleteShot = (shot) => {
    URL.revokeObjectURL(shot.url);
    setShots((prev) => prev.filter((s) => s.id !== shot.id));
  };

  const clearShots = () => {
    shotsRef.current.forEach((shot) => URL.revokeObjectURL(shot.url));
    setShots([]);
  };

  const saveAllShots = async () => {
    // Slight spacing keeps browsers from coalescing/blocking the downloads.
    for (const shot of shotsRef.current) {
      downloadShot(shot);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  };

  // ---- Pointer input: tap-to-sample, drag-to-pan, pinch-to-zoom ----------

  const sampleAtClient = (clientX, clientY) => {
    const videoEl = videoRef.current;
    const canvas = canvasRef.current;
    if (!videoEl || !canvas) return;
    const norm = clientToContentNorm(canvas, clientX, clientY);
    if (!norm || norm.x < 0 || norm.x > 1 || norm.y < 0 || norm.y > 1) return;
    const src = displayToSource(norm.x, norm.y, viewRef.current);
    const base = manualSampleBase(videoEl, src.u, src.v);
    if (base) applyBase(base, "manual");
    setArmSample(false);
    samplingRef.current = false;
  };

  const onPointerDown = (e) => {
    if (!isCameraOnRef.current) return;
    const st = pointerStateRef.current;
    canvasRef.current?.setPointerCapture?.(e.pointerId);
    st.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (st.pointers.size === 1) {
      st.moved = false;
      st.downX = e.clientX;
      st.downY = e.clientY;
    } else if (st.pointers.size === 2) {
      const pts = [...st.pointers.values()];
      st.lastDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      st.moved = true;
    }
  };

  const onPointerMove = (e) => {
    const st = pointerStateRef.current;
    const prev = st.pointers.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    st.pointers.set(e.pointerId, cur);
    if (Math.hypot(cur.x - st.downX, cur.y - st.downY) > TAP_SLOP_PX) {
      st.moved = true;
    }
    if (st.pointers.size === 2) {
      const pts = [...st.pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (st.lastDist > 0 && dist > 0) {
        changeZoom(viewRef.current.zoom * (dist / st.lastDist));
      }
      st.lastDist = dist;
      // Each finger contributes half of the two-finger pan.
      applyPanDelta((cur.x - prev.x) / 2, (cur.y - prev.y) / 2);
    } else if (st.pointers.size === 1 && st.moved && !samplingRef.current) {
      applyPanDelta(cur.x - prev.x, cur.y - prev.y);
    }
  };

  const onPointerUp = (e) => {
    const st = pointerStateRef.current;
    if (!st.pointers.has(e.pointerId)) return;
    st.pointers.delete(e.pointerId);
    canvasRef.current?.releasePointerCapture?.(e.pointerId);
    if (st.pointers.size === 0) {
      if (!st.moved && samplingRef.current) {
        sampleAtClient(e.clientX, e.clientY);
      } else if (!st.moved && isFullscreen) {
        // Tap toggles the control overlay, like a video player.
        setHudHidden((v) => !v);
      }
      st.lastDist = 0;
      st.moved = false;
    }
  };

  const toggleSample = () => {
    setArmSample((v) => {
      samplingRef.current = !v;
      return !v;
    });
  };

  // Desktop wheel zoom; React's synthetic wheel listener is passive, so we
  // attach our own to be able to preventDefault page scroll.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e) => {
      if (!isCameraOnRef.current) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      changeZoom(viewRef.current.zoom * factor);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pause the render loop while the tab is hidden; resume (and re-acquire
  // the wake lock, which the OS releases on hide) when it returns.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = 0;
        }
        return;
      }
      if (!isCameraOnRef.current) return;
      if (!frozenRef.current) videoRef.current?.play().catch(() => {});
      if (!animationFrameRef.current) processVideo();
      requestWakeLock();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => recomputeGuideSoon());
    observer.observe(viewport);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    recomputeGuideSoon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guide, isCameraOn, isFullscreen]);

  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoSampleTimerRef.current) {
        clearTimeout(autoSampleTimerRef.current);
      }
      if (resampleTimerRef.current) {
        clearInterval(resampleTimerRef.current);
      }
      if (videoEl?.srcObject) {
        videoEl.srcObject.getTracks().forEach((track) => track.stop());
      }
      releaseWakeLock();
      shotsRef.current.forEach((shot) => URL.revokeObjectURL(shot.url));
      capturePipelineRef.current?.dispose();
      capturePipelineRef.current = null;
      pipelineRef.current?.dispose();
      pipelineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showColorControls = isCameraOn;
  const showNegativeControls = showColorControls && filmType !== "positive";

  let statusLabel = t.statusUncorrected;
  if (sampleSource === "auto") statusLabel = t.statusAuto;
  if (sampleSource === "manual") statusLabel = t.statusManual;

  return (
    <div
      ref={viewerRef}
      className={`viewer${isFullscreen ? " viewer--fullscreen" : ""}`}
    >
      {insecureContext && (
        <p className="viewer__notice" role="status">
          {t.insecureNotice}
        </p>
      )}
      <div className="viewer__viewport" ref={viewportRef}>
        <video
          ref={videoRef}
          className="viewer__video"
          playsInline
          muted
          aria-label={t.videoAria}
        />
        <canvas
          ref={canvasRef}
          className={`viewer__canvas${armSample ? " viewer__canvas--sampling" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label={t.canvasAria}
        />
        {guideStyle && (
          <div className="viewer__guide" style={guideStyle} aria-hidden="true" />
        )}
        {flash && <div className="viewer__flash" aria-hidden="true" />}
        {isCameraOn && isFullscreen && hudHidden && (
          <button
            type="button"
            className="viewer__hud-reveal"
            onClick={() => setHudHidden(false)}
            aria-label={t.showControls}
          >
            ⋯
          </button>
        )}
        {!isCameraOn && (
          <div className="viewer__placeholder" aria-hidden="true">
            <p>{t.placeholder}</p>
            <p className="viewer__placeholder-sub">
              {t.placeholderSub}
            </p>
          </div>
        )}
      </div>
      <div
        className={`viewer__hud${
          isFullscreen && hudHidden ? " viewer__hud--hidden" : ""
        }`}
      >
        <div className="viewer__controls">
          {isCameraOn ? (
            <button type="button" onClick={stopCamera} className="btn">
              {t.stopCamera}
            </button>
          ) : (
            <button
              type="button"
              onClick={startCamera}
              disabled={insecureContext}
              className="btn btn--primary"
            >
              {t.startCamera}
            </button>
          )}
          {isCameraOn && (
            <button
              type="button"
              onClick={toggleFreeze}
              className={`btn${frozen ? " btn--primary" : ""}`}
              aria-pressed={frozen}
            >
              {frozen ? t.resume : t.freeze}
            </button>
          )}
          <button
            type="button"
            onClick={captureShot}
            disabled={!isCameraOn || capturing}
            className="btn viewer__capture-button"
          >
            {t.capture}
          </button>
          <a
            className="btn viewer__converter-link"
            href={siteConfig.negativeConverterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.openConverterAria}
          >
            {t.openConverter}
          </a>
          {isCameraOn && (
            <button
              type="button"
              onClick={() => setPanelOpen((v) => !v)}
              className={`btn${panelOpen ? " btn--primary" : ""}`}
              aria-expanded={panelOpen}
            >
              {t.adjust}
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              isFullscreen ? exitFullscreenPreview() : enterFullscreenPreview()
            }
            className="btn viewer__fullscreen-button"
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? t.exitFullscreen : t.fullscreen}
          </button>
        </div>
        {isCameraOn && panelOpen && (
          <div className="viewer__panel">
            <label className="viewer__field">
              <span>{t.filmType}</span>
              <select
                value={filmType}
                onChange={(e) => changeFilmType(e.target.value)}
              >
                <option value="color">{t.filmColor}</option>
                <option value="bw">{t.filmBw}</option>
                <option value="positive">{t.filmPositive}</option>
              </select>
            </label>
            {showNegativeControls && (
              <button
                type="button"
                onClick={toggleSample}
                className={`btn btn--small${armSample ? " btn--primary" : ""}`}
                aria-pressed={armSample}
              >
                {armSample ? t.tapOrangeFilm : t.sampleBase}
              </button>
            )}
            {showNegativeControls && isCorrected && (
              <button
                type="button"
                onClick={resetCorrection}
                className="btn btn--small"
              >
                {t.resetColorCast}
              </button>
            )}
            <label className="viewer__field">
              <span>{t.frameGuide}</span>
              <select value={guide} onChange={(e) => changeGuide(e.target.value)}>
                <option value="off">{t.guideOff}</option>
                <option value="3:2">3:2 · 135</option>
                <option value="1:1">1:1 · 6×6</option>
                <option value="4:3">4:3 · 6×4.5</option>
                <option value="5:4">5:4 · 4×5</option>
              </select>
            </label>
            <button type="button" onClick={rotateView} className="btn btn--small">
              ⟳ {t.rotate}
            </button>
            <button
              type="button"
              onClick={toggleMirror}
              className={`btn btn--small${mirror ? " btn--primary" : ""}`}
              aria-pressed={mirror}
            >
              ⇄ {t.mirror}
            </button>
            <label className="viewer__slider">
              <span>{t.zoom}</span>
              <input
                type="range"
                min={1}
                max={MAX_ZOOM}
                step={0.1}
                value={zoomUi}
                onChange={(e) => changeZoom(Number(e.target.value))}
                aria-label={t.zoomAria}
              />
              <output>{zoomUi.toFixed(1)}×</output>
            </label>
            <label className="viewer__slider">
              <span>{t.brightness}</span>
              <input
                type="range"
                min={EV_MIN}
                max={EV_MAX}
                step={EV_STEP}
                value={ev}
                onChange={(e) => changeEv(Number(e.target.value))}
                aria-label={t.brightnessAria}
              />
              <output>{ev >= 0 ? `+${ev.toFixed(1)}` : ev.toFixed(1)}</output>
            </label>
            {showNegativeControls && isCorrected && (
              <label className="viewer__slider">
                <span>{t.contrast}</span>
                <input
                  type="range"
                  min={GAMMA_MIN}
                  max={GAMMA_MAX}
                  step={GAMMA_STEP}
                  value={gamma}
                  onChange={(e) => changeGamma(Number(e.target.value))}
                  aria-label={t.contrastAria}
                />
                <output>{gamma.toFixed(2)}</output>
              </label>
            )}
          </div>
        )}
        {showNegativeControls && (
          <p className="viewer__status" role="status">
            {statusLabel}
          </p>
        )}
        {error && (
          <p className="viewer__error" role="alert">
            {error}
          </p>
        )}
        {shots.length > 0 && (
          <div className="viewer__gallery">
            <div className="viewer__gallery-header">
              <p className="viewer__gallery-title">
                {t.gallery} ({shots.length})
              </p>
              <div className="viewer__gallery-actions">
                <button
                  type="button"
                  onClick={saveAllShots}
                  className="btn btn--small"
                >
                  {t.saveAll}
                </button>
                <button
                  type="button"
                  onClick={clearShots}
                  className="btn btn--small"
                >
                  {t.clearAll}
                </button>
              </div>
            </div>
            <div className="viewer__gallery-strip">
              {shots.map((shot, index) => (
                <figure key={shot.id} className="viewer__shot">
                  {/* Object URLs are session-local blobs; next/image adds nothing. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.url}
                    alt={`${t.shotAlt} ${shots.length - index}`}
                  />
                  <div className="viewer__shot-actions">
                    <button
                      type="button"
                      onClick={() => downloadShot(shot)}
                      className="btn btn--small"
                      title={t.savePhoto}
                      aria-label={t.savePhoto}
                    >
                      ↓
                    </button>
                    {canShareFiles && (
                      <button
                        type="button"
                        onClick={() => shareShot(shot)}
                        className="btn btn--small"
                        title={t.share}
                        aria-label={t.share}
                      >
                        ↗
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteShot(shot)}
                      className="btn btn--small"
                      title={t.deleteShot}
                      aria-label={t.deleteShot}
                    >
                      ✕
                    </button>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
