import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  // 用户点击按钮后初始化摄像头
  const initCamera = async () => {
    try {
      // 尝试使用后置摄像头（部分浏览器如 Safari 可能不支持此约束）
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
    } catch (err) {
      console.warn("使用 environment 模式失败，尝试默认摄像头约束", err);
      try {
        // 回退方案：不指定 facingMode
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
      } catch (err2) {
        console.error("摄像头访问失败:", err2);
        setError("无法访问摄像头，请检查浏览器权限或是否在 HTTPS/localhost 环境下。");
      }
    }
  };

  // 摄像头启动后实时处理视频帧，交换 R 与 B 通道
  useEffect(() => {
    if (!isCameraStarted) return;

    let animationFrameId;
    const processFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d');
        // 同步 canvas 尺寸为视频尺寸
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // 绘制视频帧到 canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 获取当前帧数据
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        // 交换 R 与 B 通道
        for (let i = 0; i < data.length; i += 4) {
          let temp = data[i];       // 保存 R 通道
          data[i] = data[i + 2];      // 将 B 赋给 R
          data[i + 2] = temp;         // 将原 R 赋给 B
          // G 通道保持不变
        }
        // 写回处理后的图像数据
        ctx.putImageData(frame, 0, 0);
      }
      animationFrameId = requestAnimationFrame(processFrame);
    };

    animationFrameId = requestAnimationFrame(processFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isCameraStarted]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">80年代胶片预览器</h1>
        {error && <div className="error">{error}</div>}
        {/* 用户点击后启动摄像头 */}
        {!isCameraStarted ? (
          <button className="start-button" onClick={initCamera}>
            开始预览
          </button>
        ) : (
          <div className="video-container">
            {/* 隐藏的 video 元素仅作为数据源 */}
            <video
              ref={videoRef}
              style={{ display: 'none' }}
              playsInline
              muted
            />
            {/* 显示经过处理的 canvas */}
            <canvas ref={canvasRef} className="preview-canvas" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
