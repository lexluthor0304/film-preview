"use client";

import { useEffect, useRef, useState } from "react";
import {
  createWebGLPipeline,
  correctionFromSample,
  DEFAULT_GAMMA,
} from "@/lib/webgl-pipeline";
import { autoSampleBase, manualSampleBase } from "@/lib/sample-base";
import { srgbToLinear, linearToSrgb } from "@/lib/color";
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

function buildLuts(correction) {
  const luts = [new Uint8Array(256), new Uint8Array(256), new Uint8Array(256)];
  const bases = correction
    ? [correction.base.r, correction.base.g, correction.base.b]
    : null;
  const black = correction
    ? Math.pow(correction.white, correction.gamma)
    : 0;
  for (let c = 0; c < 3; c += 1) {
    for (let v = 0; v < 256; v += 1) {
      if (!correction) {
        luts[c][v] = 255 - v;
        continue;
      }
      const lin = srgbToLinear(v / 255);
      const t = Math.min(Math.max(lin / bases[c], 1e-4), 1);
      const raw = Math.pow(correction.white / t, correction.gamma);
      const pos = Math.min(Math.max((raw - black) / (1 - black), 0), 1);
      luts[c][v] = Math.round(linearToSrgb(pos) * 255);
    }
  }
  return luts;
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
  const animationFrameRef = useRef(0);
  const pipelineRef = useRef(null);
  const samplingRef = useRef(false);
  const autoSampleTimerRef = useRef(0);
  const resampleTimerRef = useRef(0);
  const nativeFullscreenRef = useRef(false);
  const baseRef = useRef(null); // sampled base color, 0-255 per channel
  const gammaRef = useRef(DEFAULT_GAMMA);
  const sampleSourceRef = useRef("none");
  const lutRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [insecureContext, setInsecureContext] = useState(false);
  const [isCorrected, setIsCorrected] = useState(false);
  const [gamma, setGamma] = useState(DEFAULT_GAMMA);
  const [sampleSource, setSampleSource] = useState("none"); // "none" | "auto" | "manual"
  const [armSample, setArmSample] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
  }, []);

  const shouldAutoFullscreen = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
  };

  const enterFullscreenPreview = () => {
    setIsFullscreen(true);
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
    nativeFullscreenRef.current = false;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const pushCorrection = () => {
    const base = baseRef.current;
    const correction = base
      ? correctionFromSample(base, { gamma: gammaRef.current })
      : null;
    pipelineRef.current?.setCorrection(correction);
    if (!pipelineRef.current) lutRef.current = buildLuts(correction);
    setIsCorrected(Boolean(correction));
  };

  const applyBase = (base, source) => {
    if (!base) return;
    baseRef.current = base;
    sampleSourceRef.current = source;
    setSampleSource(source);
    pushCorrection();
  };

  const resetCorrection = () => {
    baseRef.current = null;
    sampleSourceRef.current = "none";
    setSampleSource("none");
    pushCorrection();
  };

  const changeGamma = (value) => {
    gammaRef.current = value;
    setGamma(value);
    if (baseRef.current) pushCorrection();
  };

  const invertColorsCpu = (imageData) => {
    if (!lutRef.current) lutRef.current = buildLuts(null);
    const [lr, lg, lb] = lutRef.current;
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = lr[d[i]];
      d[i + 1] = lg[d[i + 1]];
      d[i + 2] = lb[d[i + 2]];
    }
    return imageData;
  };

  const processVideo = () => {
    const videoEl = videoRef.current;
    const canvas = canvasRef.current;
    if (!videoEl || !canvas) return;
    if (pipelineRef.current) {
      pipelineRef.current.renderFrame(videoEl);
    } else {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(videoEl, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(invertColorsCpu(imageData), 0, 0);
    }
    animationFrameRef.current = requestAnimationFrame(processVideo);
  };

  const startResampleLoop = () => {
    if (resampleTimerRef.current) return;
    resampleTimerRef.current = window.setInterval(() => {
      // Only track drift while in auto mode; never override a manual sample.
      if (sampleSourceRef.current !== "auto") return;
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
      pushCorrection();
    }, RESAMPLE_INTERVAL_MS);
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
      if (!videoEl || !canvas) return;
      videoEl.srcObject = stream;
      await videoEl.play();
      const waitForSize = () => {
        if (videoEl.videoWidth > 0) {
          if (!pipelineRef.current) {
            canvas.width = videoEl.videoWidth;
            canvas.height = videoEl.videoHeight;
          }
          setIsCameraOn(true);
          processVideo();
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
      setError(t.cameraError);
      if (autoFullscreen) exitFullscreenPreview();
    }
  };

  const capturePhoto = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `negative-viewer-${Date.now()}.png`;
    link.click();
  };

  const handleCanvasClick = (event) => {
    if (!armSample) return;
    const videoEl = videoRef.current;
    const canvas = canvasRef.current;
    if (!videoEl || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width;
    const normY = (event.clientY - rect.top) / rect.height;
    const base = manualSampleBase(videoEl, normX, normY);
    if (base) applyBase(base, "manual");
    setArmSample(false);
    samplingRef.current = false;
  };

  const toggleSample = () => {
    setArmSample((v) => {
      samplingRef.current = !v;
      return !v;
    });
  };

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
        videoEl.srcObject.getTracks().forEach((t) => t.stop());
      }
      pipelineRef.current?.dispose();
      pipelineRef.current = null;
    };
  }, []);

  const showColorControls = isCameraOn;

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
      <div className="viewer__viewport">
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
          onClick={handleCanvasClick}
          aria-label={t.canvasAria}
        />
        {!isCameraOn && (
          <div className="viewer__placeholder" aria-hidden="true">
            <p>{t.placeholder}</p>
            <p className="viewer__placeholder-sub">
              {t.placeholderSub}
            </p>
          </div>
        )}
      </div>
      <div className="viewer__controls">
        <button
          type="button"
          onClick={startCamera}
          disabled={isCameraOn || insecureContext}
          className="btn btn--primary"
        >
          {isCameraOn ? t.live : t.startCamera}
        </button>
        <button
          type="button"
          onClick={capturePhoto}
          disabled={!isCameraOn}
          className="btn"
        >
          {t.savePhoto}
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
        {showColorControls && (
          <button
            type="button"
            onClick={toggleSample}
            className={`btn${armSample ? " btn--primary" : ""}`}
            aria-pressed={armSample}
          >
            {armSample ? t.tapOrangeFilm : t.sampleBase}
          </button>
        )}
        {showColorControls && isCorrected && (
          <button type="button" onClick={resetCorrection} className="btn">
            {t.resetColorCast}
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
      {showColorControls && isCorrected && (
        <label className="viewer__contrast">
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
        </label>
      )}
      {showColorControls && (
        <p className="viewer__status" role="status">
          {statusLabel}
        </p>
      )}
      {error && (
        <p className="viewer__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
