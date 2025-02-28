// src/App.js
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Helmet } from "react-helmet";
import AutoAdSense from "./AutoAdSense";
import GoogleTag from "./GoogleTag";
import GoogleAnalytics from "./GoogleAnalytics";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const animationFrameRef = useRef();

  // 负片转换核心逻辑
  const invertColors = (imageData) => {
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = 255 - d[i];       // Red
      d[i + 1] = 255 - d[i + 1]; // Green
      d[i + 2] = 255 - d[i + 2]; // Blue
    }
    return imageData;
  };

  // 视频处理循环
  const processVideo = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d', { 
      willReadFrequently: true 
    });
    
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

  // 启动摄像头
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        
        const waitForSize = () => {
          if (videoRef.current.videoWidth > 0) {
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
    }
  };

  // 清理资源
  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoEl?.srcObject) {
        videoEl.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Negative Viewer</title>
      </Helmet>
      <GoogleAnalytics trackingId="G-P62PGR2LDG" />
      <GoogleTag trackingId="G-P62PGR2LDG" />
      <AutoAdSense client="ca-pub-1069480025527043" />
      <div className="retro-container">
        <header className="app-header">
          <h1 className="neon-text">NEGATIVE VIEWER</h1>
        </header>

        <main className="app-main">
          <div className="crt-overlay">
            <div className="scanline"></div>
            <div className="crt-glow"></div>
          </div>
          <section className="film-section">
          <div className="film-viewport">
            <video 
              ref={videoRef} 
              className="hidden-video" 
              playsInline 
              muted 
            />
            
            <canvas 
              ref={canvasRef}
              className="negative-preview"
            />
            </div>
          </section>
          <section className="controls">
            <button 
              onClick={startCamera}
              className="retro-button"
              disabled={isCameraOn}
            >
              {isCameraOn ? '◼ PREVIEWING' : '▶ START CAMERA'}
            </button>
          </section>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Negative Viewer. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;