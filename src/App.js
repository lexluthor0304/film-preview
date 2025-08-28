import { useEffect, useRef, useState } from 'react';
import './App.css';
import AutoAdSense from "./AutoAdSense";
import GoogleTag from "./GoogleTag";
import GoogleAnalytics from "./GoogleAnalytics";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const animationFrameRef = useRef();

  const capturePhoto = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'photo.png';
    link.click();
    alert('Photo saved!');
  };

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
      {/* React 19 直接支持 <title> 和 <meta> */}
      <title>Real-Time Online Negative Film Viewer | Convert Film to Digital Instantly</title>
      <meta name="description" content="Convert negative film into digital images instantly with this real-time color inverter. Use your webcam to preview and enhance your negatives online." />

      {/* Google Services */}
      <GoogleAnalytics trackingId="G-P62PGR2LDG" />
      <GoogleTag trackingId="G-P62PGR2LDG" />
      <AutoAdSense client="ca-pub-1069480025527043" />

      <div className="retro-container">
        <header className="app-header">
          <h1>NEGATIVE VIEWER</h1>
        </header>

        <main className="app-main">
          <section className="film-section">
            <div className="film-viewport">
              <video
                ref={videoRef}
                className="hidden-video"
                playsInline 
                muted 
                aria-label="Live camera feed for negative film conversion"
              />
              
              <canvas 
                ref={canvasRef}
                className="negative-preview"
                aria-label="Processed image preview after negative color inversion"
              />
            </div>
          </section>
          <section className="controls">
            <button
              onClick={startCamera}
              disabled={isCameraOn}
            >
              {isCameraOn ? '◼ PREVIEWING' : '▶ START CAMERA'}
            </button>
            <button
              onClick={capturePhoto}
              disabled={!isCameraOn}
            >
              📸 TAKE PHOTO
            </button>
          </section>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Negative Viewer. tokugai.com All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;