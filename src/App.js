import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [error, setError] = useState('');
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  /**
   * 点击“开始预览”后，获取摄像头流（只使用最简单的 { video: true }）
   */
  const initCamera = async () => {
    try {
      console.log('尝试获取摄像头流: { video: true, audio: false }');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      // 检查是否存在 video track
      const tracks = stream.getVideoTracks();
      if (!tracks.length) {
        throw new Error('没有可用的视频轨道');
      }
      console.log('成功获取摄像头流');

      // 将流设置给 video
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraStarted(true);
    } catch (err) {
      console.error('摄像头访问失败:', err);
      setError('无法访问摄像头，请检查浏览器权限或是否在 HTTPS/localhost 环境下。');
    }
  };

  /**
   * 在视频成功播放后，每帧将其绘制到 canvas 上（不做任何RGB翻转）
   */
  useEffect(() => {
    if (!isCameraStarted) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 当视频元数据加载完成后，可读取视频宽高
    const handleLoadedMetadata = () => {
      console.log('loadedmetadata:', video.videoWidth, 'x', video.videoHeight);
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // 帧处理循环
    let frameId;
    const processFrame = () => {
      if (video.paused || video.ended) {
        frameId = requestAnimationFrame(processFrame);
        return;
      }
      // 如果视频宽高还没准备好，就等下一帧
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        frameId = requestAnimationFrame(processFrame);
        return;
      }

      // 同步 canvas 尺寸
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 仅仅将视频帧绘制到 canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      frameId = requestAnimationFrame(processFrame);
    };

    // 在用户点击并 play 成功后，开始动画帧循环
    frameId = requestAnimationFrame(processFrame);

    // 卸载时清理
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      cancelAnimationFrame(frameId);
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
            {/* 让 video 可见，以确认是否真正有图像 */}
            <video
              ref={videoRef}
              className="debug-video"
              playsInline
              muted
              autoPlay
            />
            {/* 仅仅显示原始画面，未做任何通道翻转 */}
            <canvas ref={canvasRef} className="preview-canvas" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
