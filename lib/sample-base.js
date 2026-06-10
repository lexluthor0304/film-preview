const SAMPLE_WIDTH = 256;
const TOP_FRACTION = 0.002;
// Robust auto-sampling: widen the bright-pixel pool, then keep only pixels
// that look like orange film base. Thresholds are empirical — tune against
// real negatives if needed.
const CANDIDATE_FRACTION = 0.02;
const MIN_ORANGE_COUNT = 12;
const ORANGE_CHANNEL_RATIO = 1.04;
const MIN_BASE_SATURATION = 0.12;
const MAX_BASE_SATURATION = 0.75;
const SATURATED_LEVEL = 254;

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

function isOrangeBaseCandidate(r, g, b) {
  // Saturated pixels are bare backlight (sprocket holes, edges past the film).
  if (r >= SATURATED_LEVEL || g >= SATURATED_LEVEL) return false;
  if (!(r > g * ORANGE_CHANNEL_RATIO && g > b * ORANGE_CHANNEL_RATIO)) {
    return false;
  }
  const sat = (r - b) / Math.max(r, 1);
  return sat >= MIN_BASE_SATURATION && sat <= MAX_BASE_SATURATION;
}

function median(values) {
  values.sort((a, b) => a - b);
  return values[values.length >> 1];
}

function channelMedians(pixels) {
  return {
    r: median(pixels.map((p) => p[0])),
    g: median(pixels.map((p) => p[1])),
    b: median(pixels.map((p) => p[2])),
  };
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
  const sorted = samples.slice().sort();

  // Preferred path: median of orange-looking pixels among the brightest 2%.
  const candidateCount = Math.max(1, Math.floor(total * CANDIDATE_FRACTION));
  const candidateThreshold = sorted[total - candidateCount];
  const orange = [];
  for (let i = 0, p = 0; p < total; i += 4, p += 1) {
    if (samples[p] < candidateThreshold) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isOrangeBaseCandidate(r, g, b)) orange.push([r, g, b]);
  }
  if (orange.length >= MIN_ORANGE_COUNT) {
    return channelMedians(orange);
  }

  // Fallback: mean of the brightest 0.2% (previous behavior).
  const k = Math.max(1, Math.floor(total * TOP_FRACTION));
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
  const pixels = [];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    if (r >= SATURATED_LEVEL || g >= SATURATED_LEVEL) continue;
    pixels.push([r, g, data[i + 2]]);
  }
  if (!pixels.length) return null;
  return channelMedians(pixels);
}
