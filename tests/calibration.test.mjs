import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectBase, inspectPatch, stableBase } from '../lib/sample-base.js';
import { lockCameraColor, waitForStableVideo } from '../lib/camera-calibration.js';
import { calibrationLabels } from '../lib/calibration-labels.js';

function frame(pixel, width = 256, height = 100) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) data.set([...pixel(x, y), 255], (y * width + x) * 4);
  return { data, width, height };
}
const orange = [220, 150, 90];
const expected = { r: 220, g: 150, b: 90 };

test('裸の光源が3%または30%あっても、橙色片基を採用する', () => {
  for (const rows of [0, 3, 30]) {
    const result = detectBase(frame((x, y) => y < rows ? [255, 255, 255] : orange));
    assert.deepEqual(result.base, expected);
    assert.ok(result.region.y >= rows / 100);
  }
});

test('白い光源だけ・全黒・過曝した片基では補正を作らない', () => {
  for (const pixel of [[255, 255, 255], [240, 240, 240], [0, 0, 0], [251, 160, 90]]) {
    assert.equal(detectBase(frame(() => pixel)).base, undefined);
  }
});

test('橙色の画像でも細かいテクスチャがある場合は棄却する', () => {
  assert.equal(detectBase(frame((x, y) => (x + y) % 2 ? [220, 150, 90] : [170, 110, 60])).base, undefined);
});

test('画像と光源に挟まれた細い均一な片縁を検出する', () => {
  const result = detectBase(frame((x, y) => y < 10 ? [255, 255, 255] : y < 20 ? orange : [90 + x % 30, 80, 80]));
  assert.deepEqual(result.base, expected);
  assert.ok(result.region.y >= 0.1 && result.region.y < 0.2);
});

test('小さな橙色の孤立点は十分な領域として扱わない', () => {
  assert.equal(detectBase(frame((x, y) => x < 5 && y < 5 ? orange : [80, 80, 80])).base, undefined);
});

test('厳格な領域判定の過曝・境界・均一性を確認する', () => {
  assert.equal(inspectPatch(frame(() => [255, 255, 255], 5, 5), 0, 0, 5).reason, 'clipped');
  assert.equal(inspectPatch(frame((x) => x < 2 ? [240, 240, 240] : orange, 5, 5), 0, 0, 5).reason, 'noBase');
  assert.deepEqual(inspectPatch(frame(() => orange, 5, 5), 0, 0, 5).base, expected);
});

test('白黒フィルムでは橙色を要求せず、ポジは自動補正しない', () => {
  const gray = frame(() => [180, 180, 180]);
  assert.equal(detectBase(gray).base, undefined);
  assert.deepEqual(detectBase(gray, 'bw').base, { r: 180, g: 180, b: 180 });
  assert.equal(detectBase(gray, 'positive').base, undefined);
});

test('連続3フレームの色が一致する場合のみ固定する', () => {
  const a = { base: expected, region: { x: 0, y: 0 } };
  assert.equal(stableBase([a, a]), null);
  assert.equal(stableBase([a, { reason: 'noBase' }, a]), null);
  assert.equal(stableBase([a, { base: { ...expected, r: 240 } }, a]), null);
  assert.deepEqual(stableBase([a, a, a]).base, expected);
});

test('カメラが制約を無視した場合は固定済みと表示しない', async () => {
  let constraint;
  const track = {
    getCapabilities: () => ({ whiteBalanceMode: ['manual'], exposureMode: ['manual'], iso: {} }),
    getSettings: () => ({ colorTemperature: 5000, exposureTime: 100, iso: 100, whiteBalanceMode: 'continuous', exposureMode: 'continuous' }),
    applyConstraints: async (value) => { constraint = value; },
  };
  assert.equal(await lockCameraColor({ getVideoTracks: () => [track] }), false);
  assert.equal(constraint.advanced[0].colorTemperature, 5000);
  assert.equal(constraint.advanced[0].iso, 100);
});

test('色温度を取得できない機種で中間値を推測しない', async () => {
  let calls = 0;
  const track = { getCapabilities: () => ({ whiteBalanceMode: ['manual'], colorTemperature: { min: 1000, max: 9000 } }), getSettings: () => ({}), applyConstraints: async () => { calls++; } };
  assert.equal(await lockCameraColor({ getVideoTracks: () => [track] }), false);
  assert.equal(calls, 0);
});

test('実際の設定が両方manualなら固定を確認できる', async () => {
  const track = { getCapabilities: () => ({}), getSettings: () => ({ whiteBalanceMode: 'manual', exposureMode: 'manual' }) };
  assert.equal(await lockCameraColor({ getVideoTracks: () => [track] }), true);
});

test('キャンセル後はカメラの収束待ちを終了する', async () => {
  const controller = new AbortController();
  const result = waitForStableVideo({ currentTime: 0 }, controller.signal);
  controller.abort();
  await assert.rejects(result, { name: 'AbortError' });
});

test('全対応言語に校正ラベルが揃っている', () => {
  const en = calibrationLabels('en');
  for (const locale of ['zh', 'ja', 'ru', 'es', 'fr', 'it', 'el', 'vi', 'id', 'hi', 'ko', 'uk', 'ar', 'he']) {
    const labels = calibrationLabels(locale);
    assert.deepEqual(Object.keys(labels), Object.keys(en));
    for (const value of Object.values(labels)) assert.ok(typeof value === 'string' && value.length);
  }
});

test('離れた橙色パッチが3個あっても片縁として採用しない', () => {
  const image = frame((x, y) => y < 5 && ((x < 5) || (x >= 20 && x < 25) || (x >= 40 && x < 45)) ? orange : [80, 80, 80]);
  assert.equal(detectBase(image).base, undefined);
});

test('手動で指定した均一な片基はAWBで中性化されていても使用できる', () => {
  const neutral = frame(() => [180, 179, 175], 5, 5);
  assert.deepEqual(inspectPatch(neutral, 0, 0, 5, 'color', { requireOrange: false }).base, { r: 180, g: 179, b: 175 });
});

test('手動取様は粒状性を警告にし、確認可能な中央値を返す', () => {
  const grain = frame((x, y) => [220, 150, 90].map(v => v + ((x + y) % 2 ? 8 : -8)), 15, 15);
  const strict = inspectPatch(grain, 0, 0, 15, 'color', { requireOrange: false });
  assert.equal(strict.reason, 'textured');
  const manual = inspectPatch(grain, 0, 0, 15, 'color', { requireOrange: false, manual: true });
  assert.ok(manual.base);
  assert.equal(manual.reason, null);
  assert.equal(manual.warning, 'textured');
});

test('手動取様は未飽和の明るい赤と弱い青チャネルを許容する', () => {
  for (const pixel of [[252, 180, 90], [220, 100, 12]]) {
    const manual = inspectPatch(frame(() => pixel, 5, 5), 0, 0, 5, 'color', { requireOrange: false, manual: true });
    assert.deepEqual(manual.base, { r: pixel[0], g: pixel[1], b: pixel[2] });
    assert.equal(manual.warning, null);
  }
});

test('手動でもクリップした片基やほぼ全黒は確認可能にしない', () => {
  for (const pixel of [[255, 255, 255], [255, 150, 90], [2, 2, 2]]) {
    assert.equal(inspectPatch(frame(() => pixel, 5, 5), 0, 0, 5, 'color', { requireOrange: false, manual: true }).base, undefined);
  }
});
