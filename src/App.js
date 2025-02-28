// src/App.js
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const animationFrameRef = useRef();

  // 负片转换核心逻辑
  const invertColors = (imageData) => {
    const data = imageData.data;
    const uint32 = new Uint32Array(data.buffer);
    
    for (let i = 0; i < uint32.length; i++) {
      uint32[i] = (~uint32[i] & 0x00ffffff) | (uint32[i] & 0xff000000);
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
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="retro-container">
      <div className="crt-overlay">
        <div className="scanline"></div>
        <div className="crt-glow"></div>
      </div>

      <div className="vhs-sticker">
        <h1 className="neon-text">FILM NEGATIVE VIEWER</h1>
        
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

        <button 
          onClick={startCamera}
          className="retro-button"
          disabled={isCameraOn}
        >
          {isCameraOn ? '◼ PREVIEWING' : '▶ START CAMERA'}
        </button>
      </div>
    </div>
  );
}

export default App;