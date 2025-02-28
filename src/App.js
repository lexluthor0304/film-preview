import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  /**
   * 多重回退：先尝试 environment -> 再尝试 user -> 再尝试 default
   */
  const getCameraStream = async () => {
    // 尝试顺序
    const constraintsList = [
      { video: { facingMode: 'environment' }, audio: false },
      { video: { facingMode: 'user' }, audio: false },
      { video: true, audio: false },
    ];

    for (let i = 0; i < constraintsList.length; i++) {
      const constraints = constraintsList[i];
      try {
        console.log('尝试 getUserMedia: ', constraints);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // 检查是否有可用的视频轨道
        const tracks = stream.getVideoTracks();
        if (!tracks.length) {
          console.warn('没有找到 video track，继续回退...');
          continue; // 尝试下一个约束
        }
        // 如果拿到有效 track，就返回 stream
        console.log('成功获取摄像头流: ', constraints);
        return stream;
      } catch (err) {
        console.warn(`获取摄像头流失败 (${JSON.stringify(constraints)}): `, err);
        // 继续下一个约束
      }
    }

    // 所有约束都失败，抛出错误
    throw new Error('无法获取任何可用的摄像头流');
  };

  const initCamera = async () => {
    try {
      const stream = await getCameraStream();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play(); // 尝试播放
      }
      setIsCameraStarted(true);
    } catch (err) {
      console.error('摄像头访问失败:', err);
      setError('无法访问摄像头，请检查浏览器权限或是否在 HTTPS/localhost 环境下。');
    }
  };

  /**
   * 视频就绪后，开始帧处理
   */
  useEffect(() => {
    if (!isCameraStarted) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 调试用事件监听
    const onLoadedMetadata = () => {
      console.log(
        'loadedmetadata: videoWidth =',
        video.videoWidth,
        ', videoHeight =',
        video.videoHeight
      );
    };
    const onLoadedData = () => {
      console.log('loadeddata: 视频数据加载完毕');
    };
    const onPlaying = () => {
      console.log('playing: 视频开始播放');
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('playing', onPlaying);

    // 帧循环处理
    let frameId;
    const processFrame = () => {
      if (video.paused || video.ended) {
        frameId = requestAnimationFrame(processFrame);
        return;
      }
      // 若视频宽高尚未准备好，先等待下一帧
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        frameId = requestAnimationFrame(processFrame);
        return;
      }
      // 同步 canvas 尺寸
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 绘制当前视频帧
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 获取像素数据并交换 R / B
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        const temp = data[i];
        data[i] = data[i + 2];
        data[i + 2] = temp;
      }
      ctx.putImageData(frame, 0, 0);

      frameId = requestAnimationFrame(processFrame);
    };

    // 启动帧循环
    frameId = requestAnimationFrame(processFrame);

    // 卸载时清理事件与帧循环
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('playing', onPlaying);
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
            {/* 调试时让 video 可见，以确认摄像头画面确实捕获到 */}
            <video
              ref={videoRef}
              className="debug-video"
              playsInline
              muted
              autoPlay
            />
            {/* 显示处理后的 canvas */}
            <canvas ref={canvasRef} className="preview-canvas" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
