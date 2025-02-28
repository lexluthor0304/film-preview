import { useEffect, useRef, useState } from 'react';
import './App.css'; // 我们将在这里添加复古样式

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  // 初始化摄像头
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraOn(true);
        requestAnimationFrame(processVideo);
      }
    } catch (err) {
      console.error("摄像头访问错误:", err);
    }
  };

  // 视频处理（RGB翻转+复古滤镜）
  const processVideo = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    
    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const data = imageData.data;

    // RGB通道翻转
    for (let i = 0; i < data.length; i += 4) {
      [data[i], data[i+2]] = [data[i+2], data[i]]; // 交换R和B通道
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(processVideo);
  };

  return (
    <div className="retro-container">
      {/* CRT显示器效果 */}
      <div className="crt-overlay">
        <div className="scanline"></div>
        <div className="crt-glow"></div>
      </div>

      {/* 主内容区域 */}
      <div className="vhs-sticker">
        <h1 className="neon-text">FILM PREVIEW 3000</h1>
        
        <div className="camera-viewport">
          <video ref={videoRef} className="hidden-video" />
          <canvas 
            ref={canvasRef} 
            width="640" 
            height="480"
            className="film-preview"
          />
        </div>

        <button 
          onClick={startCamera}
          className="retro-button"
        >
          {isCameraOn ? '◼ RECORDING' : '● START PREVIEW'}
        </button>
      </div>
    </div>
  );
}

export default App;