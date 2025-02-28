import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => {
          console.error("视频播放错误:", err);
        });
      }
      setIsCameraStarted(true);
      console.log("摄像头已初始化（environment 模式）");
    } catch (err) {
      console.warn("使用 environment 模式失败，尝试默认摄像头约束", err);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(err => {
            console.error("视频播放错误:", err);
          });
        }
        setIsCameraStarted(true);
        console.log("摄像头已初始化（默认模式）");
      } catch (err2) {
        console.error("摄像头访问失败:", err2);
        setError("无法访问摄像头，请检查浏览器权限或是否在 HTTPS/localhost 环境下。");
      }
    }
  };

  useEffect(() => {
    if (!isCameraStarted) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const processFrame = () => {
      if (video.paused || video.ended) {
        // 如果视频暂停，则等待下一帧
        requestAnimationFrame(processFrame);
        return;
      }
      
      // 同步 canvas 尺寸为视频尺寸
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn("视频数据未加载完成", video.readyState);
        requestAnimationFrame(processFrame);
        return;
      }
      
      // 输出当前视频尺寸便于调试
      console.log(`视频尺寸：${video.videoWidth} x ${video.videoHeight}`);

      // 绘制视频帧
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 获取像素数据并交换 R 与 B 通道
      try {
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        for (let i = 0; i < data.length; i += 4) {
          let temp = data[i];       
          data[i] = data[i + 2];      
          data[i + 2] = temp;         
        }
        ctx.putImageData(frame, 0, 0);
      } catch (error) {
        console.error("获取或处理图像数据失败:", error);
      }
      
      requestAnimationFrame(processFrame);
    };

    const onPlay = () => {
      console.log("视频开始播放");
      requestAnimationFrame(processFrame);
    };

    video.addEventListener('playing', onPlay); // 使用 'playing' 事件更可靠
    return () => {
      video.removeEventListener('playing', onPlay);
    };
  }, [isCameraStarted]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">80年代胶片预览器</h1>
        {error && <div className="error">{error}</div>}
        {!isCameraStarted ? (
          <button className="start-button" onClick={initCamera}>
            开始预览
          </button>
        ) : (
          <div className="video-container">
            <video
              ref={videoRef}
              style={{ display: 'none' }}
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="preview-canvas" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
