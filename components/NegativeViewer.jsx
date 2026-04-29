"use client";

import { useEffect, useRef, useState } from "react";

export default function NegativeViewer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(0);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [insecureContext, setInsecureContext] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    const isLocalHost =
      host === "localhost" || host === "127.0.0.1" || host === "::1";
    if (!window.isSecureContext && !isLocalHost) {
      setInsecureContext(true);
    }
  }, []);

  const invertColors = (imageData) => {
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
    }
    return imageData;
  };

  const processVideo = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctx.putImageData(invertColors(imageData), 0, 0);
    animationFrameRef.current = requestAnimationFrame(processVideo);
  };

  const startCamera = async () => {
    setError("");
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setError("Camera access is not supported in this browser.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        const waitForSize = () => {
          if (videoRef.current && videoRef.current.videoWidth > 0) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            setIsCameraOn(true);
            processVideo();
          } else {
            requestAnimationFrame(waitForSize);
          }
        };
        waitForSize();
      }
    } catch (err) {
      console.error("Camera Error:", err);
      setError(
        "Could not start the camera. Make sure you granted permission and that you're on HTTPS."
      );
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

  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoEl?.srcObject) {
        videoEl.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <div className="viewer">
      {insecureContext && (
        <p className="viewer__notice" role="status">
          <strong>Camera access requires HTTPS.</strong> Open this page over HTTPS
          (or via <code>localhost</code>) to use the live viewer. The deployed site
          at <code>negativeviewer.tokugai.com</code> already uses HTTPS — this notice
          only appears when the page is served over plain HTTP from a non-localhost
          host (typically a LAN dev server).
        </p>
      )}
      <div className="viewer__viewport">
        <video
          ref={videoRef}
          className="viewer__video"
          playsInline
          muted
          aria-label="Live camera feed for negative film conversion"
        />
        <canvas
          ref={canvasRef}
          className="viewer__canvas"
          aria-label="Processed image preview after negative color inversion"
        />
        {!isCameraOn && (
          <div className="viewer__placeholder" aria-hidden="true">
            <p>Camera preview will appear here.</p>
            <p className="viewer__placeholder-sub">
              Your video never leaves this device — all processing runs in your browser.
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
          {isCameraOn ? "● Live" : "▶ Start camera"}
        </button>
        <button
          type="button"
          onClick={capturePhoto}
          disabled={!isCameraOn}
          className="btn"
        >
          Save photo
        </button>
      </div>
      {error && (
        <p className="viewer__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
