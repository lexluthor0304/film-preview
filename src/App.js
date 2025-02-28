import { useRef, useState, useEffect } from 'react';
import './App.css';

function CameraControls({ track, onUpdate }) {
  const [exposure, setExposure] = useState(0);
  const [focusMode, setFocusMode] = useState('continuous');

  // 曝光补偿调整
  const handleExposureChange = async (value) => {
    try {
      await track.applyConstraints({
        advanced: [{ exposureCompensation: parseFloat(value) }]
      });
      setExposure(value);
      onUpdate(`Exposure: ${value}EV`);
    } catch (err) {
      console.error('Exposure adjustment failed:', err);
    }
  };

  // 对焦模式切换
  const toggleFocusMode = async () => {
    const newMode = focusMode === 'manual' ? 'continuous' : 'manual';
    try {
      await track.applyConstraints({
        advanced: [{ focusMode: newMode }]
      });
      setFocusMode(newMode);
      onUpdate(`Focus: ${newMode}`);
    } catch (err) {
      console.error('Focus mode change failed:', err);
    }
  };

  return (
    <div className="control-panel">
      <div className="control-group">
        <label>Exposure: {exposure}EV</label>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.5"
          value={exposure}
          onChange={(e) => handleExposureChange(e.target.value)}
        />
      </div>
      <button 
        onClick={toggleFocusMode}
        className="focus-button"
      >
        {focusMode === 'manual' ? 'Auto Focus' : 'Manual Focus'}
      </button>
    </div>
  );
}

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraTrack, setCameraTrack] = useState(null);
  const [status, setStatus] = useState('');
  const [supportedConstraints, setSupportedConstraints] = useState({});

  // 初始化摄像头时检测支持的约束
  useEffect(() => {
    const detectCapabilities = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];
        setSupportedConstraints(track.getCapabilities());
        stream.getTracks().forEach(t => t.stop());
      } catch (err) {
        console.error('Capability detection failed:', err);
      }
    };
    detectCapabilities();
  }, []);

  // 启动摄像头
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'environment',
          ...(supportedConstraints.exposureCompensation && {
            exposureCompensation: 0
          }),
          ...(supportedConstraints.focusMode && {
            focusMode: 'continuous'
          })
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const track = stream.getVideoTracks()[0];
      setCameraTrack(track);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        initializeCanvas();
      }
    } catch (err) {
      console.error('Camera initialization failed:', err);
      setStatus(`Error: ${err.message}`);
    }
  };

  // 初始化画布尺寸
  const initializeCanvas = () => {
    const checkVideoSize = () => {
      if (videoRef.current.videoWidth > 0) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        processVideo();
      } else {
        requestAnimationFrame(checkVideoSize);
      }
    };
    checkVideoSize();
  };

  // 视频处理循环
  const processVideo = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d', { 
      willReadFrequently: true 
    });
    
    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.putImageData(invertColors(imageData), 0, 0);
    requestAnimationFrame(processVideo);
  };

  // 负片转换
  const invertColors = (imageData) => {
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = 255 - d[i];       // Red
      d[i + 1] = 255 - d[i + 1]; // Green
      d[i + 2] = 255 - d[i + 2]; // Blue
      // d[i+3] 为 Alpha，不变
    }
    return imageData;
  };

  // 清理资源
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="retro-container">
      {/* 原有界面元素保持不变 */}
      <div className="camera-viewport">
        <video ref={videoRef} className="hidden-video" playsInline muted />
        <canvas ref={canvasRef} className="negative-preview" />
      </div>

      {cameraTrack && (
        <CameraControls 
          track={cameraTrack}
          onUpdate={setStatus} 
        />
      )}

      <div className="status-bar">{status}</div>
      <button onClick={startCamera} className="retro-button">
        Start Camera
      </button>
    </div>
  );
}

export default App;