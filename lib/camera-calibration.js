import { readSampleFrame, detectBase, stableBase } from "./sample-base.js";

export function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted();
    const abort = () => { clearTimeout(timer); reject(new DOMException("Aborted", "AbortError")); };
    const timer = setTimeout(() => { signal?.removeEventListener("abort", abort); resolve(); }, ms);
    signal?.addEventListener("abort", abort, { once: true });
  });
}

function signature(frame) {
  if (!frame) return null;
  const sums = [0, 0, 0];
  for (let i = 0; i < frame.data.length; i += 4) {
    for (let c = 0; c < 3; c++) sums[c] += frame.data[i + c];
  }
  return sums.map((s) => s / (frame.width * frame.height));
}

export async function waitForStableVideo(video, signal) {
  let previous;
  let lastTime = video.currentTime;
  let stable = 0;
  for (let i = 0; i < 20; i++) {
    await delay(120, signal);
    if (video.currentTime === lastTime || video.readyState < 2) continue;
    lastTime = video.currentTime;
    const current = signature(readSampleFrame(video));
    if (!current) continue;
    stable = previous && current.every((v, c) => Math.abs(v - previous[c]) <= 2) ? stable + 1 : 0;
    previous = current;
    if (stable >= 3) return true;
  }
  return false;
}

export async function lockCameraColor(stream) {
  const track = stream?.getVideoTracks()[0];
  if (!track?.getCapabilities) return false;
  try {
    const caps = track.getCapabilities();
    const settings = track.getSettings();
    const lock = {};
    // 値が取得できない場合、色温度の中間値を推測して設定しない。
    if (caps.whiteBalanceMode?.includes("manual") && Number.isFinite(settings.colorTemperature)) {
      lock.whiteBalanceMode = "manual";
      lock.colorTemperature = settings.colorTemperature;
    }
    if (caps.exposureMode?.includes("manual") && settings.exposureTime > 0) {
      lock.exposureMode = "manual";
      lock.exposureTime = settings.exposureTime;
      if (caps.iso && Number.isFinite(settings.iso)) lock.iso = settings.iso;
    }
    if (Object.keys(lock).length) await track.applyConstraints({ advanced: [lock] });
    const actual = track.getSettings();
    return actual.whiteBalanceMode === "manual" && actual.exposureMode === "manual";
  } catch {
    return false;
  }
}

export async function calibrateCamera(stream, video, filmType, signal, { findBase = true } = {}) {
  if (!(await waitForStableVideo(video, signal))) return { reason: "unstable", locked: false };
  signal.throwIfAborted();
  const locked = await lockCameraColor(stream);
  signal.throwIfAborted();
  // 制約の適用前のフレームを使わず、適用後の安定を確認する。
  if (!(await waitForStableVideo(video, signal))) return { reason: "unstable", locked };
  if (!findBase) return { locked };
  const samples = [];
  let lastTime = video.currentTime;
  for (let i = 0; i < 45; i++) {
    await delay(140, signal);
    if (video.currentTime === lastTime || video.readyState < 2) continue;
    lastTime = video.currentTime;
    samples.push(detectBase(readSampleFrame(video), filmType));
    if (samples.length > 3) samples.shift();
    const result = stableBase(samples);
    if (result) return { ...result, locked };
  }
  return { reason: "noBase", locked };
}
