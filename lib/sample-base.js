const SAMPLE_WIDTH = 256;
const PATCH_SIZE = 5;
const CLIP_LEVEL = 250;

let sharedCanvas;
let sharedCtx;

export function readSampleFrame(source) {
  if (typeof document === "undefined") return null;
  if (!sharedCanvas) {
    sharedCanvas = document.createElement("canvas");
    sharedCtx = sharedCanvas.getContext("2d", { willReadFrequently: true });
  }
  const width = source.videoWidth ?? source.width;
  const height = source.videoHeight ?? source.height;
  if (!sharedCtx || !width || !height) return null;
  const scale = Math.min(1, SAMPLE_WIDTH / width);
  sharedCanvas.width = Math.max(1, Math.round(width * scale));
  sharedCanvas.height = Math.max(1, Math.round(height * scale));
  sharedCtx.drawImage(source, 0, 0, sharedCanvas.width, sharedCanvas.height);
  return sharedCtx.getImageData(0, 0, sharedCanvas.width, sharedCanvas.height);
}

const median = (values) => values.sort((a, b) => a - b)[values.length >> 1];
const luminance = (p) => 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
const distance = (a, b) => Math.max(...["r", "g", "b"].map((c) => Math.abs(a[c] - b[c])));

function orange(r, g, b) {
  const saturation = (r - b) / Math.max(r, 1);
  return r > g * 1.04 && g > b * 1.04 && saturation >= 0.12 && saturation <= 0.75;
}

// 均一な領域のみ採用し、白い光源・暗部・傷・画像との境界を除外する。
export function inspectPatch({ data, width, height }, x, y, size, filmType = "color", { requireOrange = filmType === "color" } = {}) {
  const channels = [[], [], []];
  let clipped = 0;
  let valid = 0;
  let total = 0;
  for (let py = Math.max(0, y); py < Math.min(height, y + size); py++) {
    for (let px = Math.max(0, x); px < Math.min(width, x + size); px++) {
      const i = (py * width + px) * 4;
      const [r, g, b] = data.subarray(i, i + 3);
      total++;
      if (Math.max(r, g, b) >= CLIP_LEVEL) { clipped++; continue; }
      if (Math.min(r, g, b) < 16 || (requireOrange && !orange(r, g, b))) continue;
      channels[0].push(r); channels[1].push(g); channels[2].push(b);
      valid++;
    }
  }
  if (!total || clipped / total > 0.05) return { reason: "clipped" };
  if (valid < 9 || valid / total < 0.85) return { reason: "noBase" };
  const base = { r: median(channels[0]), g: median(channels[1]), b: median(channels[2]) };
  const spread = Math.max(...channels.map((v) => v[Math.floor(v.length * 0.9)] - v[Math.floor(v.length * 0.1)]));
  if (spread > 12) return { reason: "textured" };
  return { base, reason: null };
}

// 全画面の明るさ順位ではなく、片基らしい小領域を先に検出する。
export function detectBase(frame, filmType = "color") {
  if (!frame || filmType === "positive") return { reason: "noBase" };
  const { width, height } = frame;
  const patches = [];
  for (let y = 0; y <= height - PATCH_SIZE; y += PATCH_SIZE) {
    for (let x = 0; x <= width - PATCH_SIZE; x += PATCH_SIZE) {
      const result = inspectPatch(frame, x, y, PATCH_SIZE, filmType);
      if (result.base) patches.push({ ...result.base, x, y });
    }
  }
  if (patches.length < 3) return { reason: "noBase" };
  patches.sort((a, b) => luminance(b) - luminance(a));
  // 一番明るい候補と色が一致する、十分な面積の集団が必要。
  const cluster = patches.filter((p) => distance(p, patches[0]) <= 12);
  if (cluster.length < 3) return { reason: "noBase" };
  const base = Object.fromEntries(["r", "g", "b"].map((c) => [c, median(cluster.map((p) => p[c]))]));
  // 点在する橙色の被写体を避け、横または縦に続く領域を要求する。
  const positions = new Set(cluster.map((p) => `${p.x},${p.y}`));
  const supported = cluster.filter((p) =>
    [[PATCH_SIZE, 0], [0, PATCH_SIZE]].some(([dx, dy]) =>
      positions.has(`${p.x - dx},${p.y - dy}`) && positions.has(`${p.x + dx},${p.y + dy}`)
    )
  );
  if (!supported.length) return { reason: "noBase" };
  const patch = supported.reduce((best, p) => distance(p, base) < distance(best, base) ? p : best);
  return {
    base,
    reason: null,
    region: { x: patch.x / width, y: patch.y / height, width: PATCH_SIZE / width, height: PATCH_SIZE / height },
  };
}

export function autoSampleBase(source, filmType = "color") {
  return detectBase(readSampleFrame(source), filmType).base ?? null;
}

export function manualSampleResult(source, normX, normY, filmType = "color") {
  // 原寸から切り出す。全体縮小による細い片縁と齒孔の混色を避ける。
  const width = source.videoWidth ?? source.width;
  const height = source.videoHeight ?? source.height;
  if (!width || !height || typeof document === "undefined") return { reason: "noBase" };
  const radius = Math.max(2, Math.round(width / SAMPLE_WIDTH * 2));
  const x = Math.max(0, Math.min(width - 1, Math.floor(normX * width)) - radius);
  const y = Math.max(0, Math.min(height - 1, Math.floor(normY * height)) - radius);
  const w = Math.min(radius * 2 + 1, width - x);
  const h = Math.min(radius * 2 + 1, height - y);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { reason: "noBase" };
  ctx.drawImage(source, x, y, w, h, 0, 0, w, h);
  // 手動選択では、AWBで橙色が弱くなった片基も選択できる。
  return inspectPatch(ctx.getImageData(0, 0, w, h), 0, 0, Math.max(w, h), filmType, { requireOrange: false });
}

export function manualSampleBase(source, x, y, filmType = "color") {
  return manualSampleResult(source, x, y, filmType).base ?? null;
}

// 同じ色の候補を異なるフレームで確認してから固定する。
export function stableBase(results) {
  if (results.length < 3 || results.some((r) => !r?.base)) return null;
  const base = Object.fromEntries(["r", "g", "b"].map((c) => [c, median(results.map((r) => r.base[c]))]));
  if (results.some((r) => distance(r.base, base) > 4)) return null;
  return { base, region: results.at(-1).region };
}
