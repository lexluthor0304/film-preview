const SAMPLE_WIDTH = 256;
const TOP_FRACTION = 0.002;

let sharedCanvas = null;
let sharedCtx = null;

function ensureCanvas() {
  if (typeof document === "undefined") return null;
  if (!sharedCanvas) {
    sharedCanvas = document.createElement("canvas");
    sharedCtx = sharedCanvas.getContext("2d", { willReadFrequently: true });
  }
  return sharedCtx ? sharedCanvas : null;
}

function drawVideoToShared(videoEl) {
  const canvas = ensureCanvas();
  if (!canvas) return null;
  const vw = videoEl.videoWidth;
  const vh = videoEl.videoHeight;
  if (!vw || !vh) return null;
  const scale = Math.min(1, SAMPLE_WIDTH / vw);
  const w = Math.max(1, Math.round(vw * scale));
  const h = Math.max(1, Math.round(vh * scale));
  canvas.width = w;
  canvas.height = h;
  sharedCtx.drawImage(videoEl, 0, 0, w, h);
  return { w, h };
}

export function autoSampleBase(videoEl) {
  const dims = drawVideoToShared(videoEl);
  if (!dims) return null;
  const { w, h } = dims;
  const data = sharedCtx.getImageData(0, 0, w, h).data;
  const total = w * h;
  const samples = new Float32Array(total);
  for (let i = 0, p = 0; p < total; i += 4, p += 1) {
    samples[p] = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  const k = Math.max(1, Math.floor(total * TOP_FRACTION));
  const sorted = samples.slice().sort();
  const threshold = sorted[total - k];
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0, p = 0; p < total; i += 4, p += 1) {
    if (samples[p] >= threshold) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count += 1;
    }
  }
  if (!count) return null;
  return { r: r / count, g: g / count, b: b / count };
}

export function manualSampleBase(videoEl, normX, normY, radius = 4) {
  const dims = drawVideoToShared(videoEl);
  if (!dims) return null;
  const { w, h } = dims;
  const cx = Math.max(0, Math.min(w - 1, Math.round(normX * w)));
  const cy = Math.max(0, Math.min(h - 1, Math.round(normY * h)));
  const x0 = Math.max(0, cx - radius);
  const y0 = Math.max(0, cy - radius);
  const x1 = Math.min(w, cx + radius + 1);
  const y1 = Math.min(h, cy + radius + 1);
  const data = sharedCtx.getImageData(x0, y0, x1 - x0, y1 - y0).data;
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count += 1;
  }
  if (!count) return null;
  return { r: r / count, g: g / count, b: b / count };
}
