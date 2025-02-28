import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  // 负片转换核心算法
  const invertColors = (imageData) => {
    const data = imageData.data;
    const uint32 = new Uint32Array(data.buffer);
    
    // 使用位运算同时处理所有通道
    for (let i = 0; i < uint32.length; i++) {
      // 反相每个颜色通道 (RGBA => 255-R, 255-G, 255-B, A)
      uint32[i] = 
        (~uint32[i] & 0x00ffffff) | // 反相RGB但保留Alpha通道
        (uint32[i] & 0xff000000);    // 保持Alpha不变
    }
    return imageData;
  };

  // 优化后的视频处理
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
    requestAnimationFrame(processVideo);
  };

  // 兼容多浏览器的摄像头启动
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        
        // 等待视频尺寸就绪
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

  return (
    <div className="retro-container">
      <div className="crt-overlay">
        <div className="scanline"></div>
      </div>

      <div className="vhs-sticker">
        <h1 className="neon-text">NEGATIVE PREVIEW</h1>
        
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
          {isCameraOn ? '◼ ACTIVE' : '▶ START'}
        </button>
      </div>
    </div>
  );
}

export default App;