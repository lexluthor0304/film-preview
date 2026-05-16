"use client";

import { useEffect, useRef, useState } from "react";
import {
  createWebGLPipeline,
  gainsFromBase,
  IDENTITY_GAINS,
  gainsAreIdentity,
} from "@/lib/webgl-pipeline";
import { autoSampleBase, manualSampleBase } from "@/lib/sample-base";
import { getDictionary } from "@/lib/i18n";

const AUTO_SAMPLE_DELAY_MS = 250;

export default function NegativeViewer({ labels }) {
  const t = labels || getDictionary("en").viewer;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(0);
  const pipelineRef = useRef(null);
  const samplingRef = useRef(false);
  const autoSampleTimerRef = useRef(0);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [insecureContext, setInsecureContext] = useState(false);
  const [useGL, setUseGL] = useState(false);
  const [gains, setGains] = useState(IDENTITY_GAINS);
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
        setUseGL(true);
      }
    }
  }, []);

  const applyBase = (base, source) => {
    if (!base) return;
    const next = gainsFromBase(base);
    setGains(next);
    setSampleSource(source);
    pipelineRef.current?.setGains(next);
  };

  const resetGains = () => {
    setGains(IDENTITY_GAINS);
    setSampleSource("none");
    pipelineRef.current?.setGains(IDENTITY_GAINS);
  };

  const invertColorsCpu = (imageData) => {
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
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

  const startCamera = async () => {
    setError("");
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setError(t.cameraUnsupported);
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
          if (
            typeof window !== "undefined" &&
            window.matchMedia("(max-width: 720px)").matches
          ) {
            setIsFullscreen(true);
          }
          processVideo();
          if (pipelineRef.current) {
            autoSampleTimerRef.current = window.setTimeout(() => {
              const base = autoSampleBase(videoEl);
              if (base) applyBase(base, "auto");
            }, AUTO_SAMPLE_DELAY_MS);
          }
        } else {
          requestAnimationFrame(waitForSize);
        }
      };
      waitForSize();
    } catch (err) {
      console.error("Camera Error:", err);
      setError(t.cameraError);
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
      if (videoEl?.srcObject) {
        videoEl.srcObject.getTracks().forEach((t) => t.stop());
      }
      pipelineRef.current?.dispose();
      pipelineRef.current = null;
    };
  }, []);

  const isCorrected = !gainsAreIdentity(gains);
  const showColorControls = useGL && isCameraOn;

  let statusLabel = t.statusUncorrected;
  if (sampleSource === "auto") statusLabel = t.statusAuto;
  if (sampleSource === "manual") statusLabel = t.statusManual;

  return (
    <div className={`viewer${isFullscreen ? " viewer--fullscreen" : ""}`}>
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
          <button type="button" onClick={resetGains} className="btn">
            {t.resetColorCast}
          </button>
        )}
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          className="btn"
          aria-pressed={isFullscreen}
        >
          {isFullscreen ? t.exitFullscreen : t.fullscreen}
        </button>
      </div>
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
