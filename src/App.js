import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  // 用户点击后初始化摄像头
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

    // 确保视频数据加载完成后再开始处理帧
    const onLoadedData = () => {
      console.log("视频元数据加载完成：", video.videoWidth, video.videoHeight);
      startFrameProcessing();
    };

    const startFrameProcessing = () => {
      const processFrame = () => {
        // 确保视频处于播放状态
        if (video.paused || video.ended) {
          requestAnimationFrame(processFrame);
          return;
        }

        // 更新 canvas 尺寸
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          console.warn("视频数据未加载完成", video.readyState);
          requestAnimationFrame(processFrame);
          return;
        }
        // 输出当前视频尺寸调试
        console.log(`视频尺寸：${video.videoWidth} x ${video.videoHeight}`);

        // 绘制视频帧到 canvas
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
          console.error("处理图像数据时出错:", error);
        }
        requestAnimationFrame(processFrame);
      };

      requestAnimationFrame(processFrame);
    };

    // 监听 loadeddata 事件，确保视频数据加载完毕
    video.addEventListener('loadeddata', onLoadedData);
    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
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
            {/* 暂时显示 video 元素用于调试，查看摄像头原始画面 */}
            <video
              ref={videoRef}
              className="debug-video"
              playsInline
              muted
              autoPlay
              style={{ maxWidth: '300px', marginBottom: '10px', border: '2px solid #fff' }}
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
