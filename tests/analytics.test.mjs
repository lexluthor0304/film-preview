import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trackEvent } from '../lib/analytics.js';

test('gtag.js が処理できる Arguments 形式で dataLayer に積む', () => {
  globalThis.window = {};
  try {
    trackEvent('camera_start', { film_type: 'color' });
    const [entry] = window.dataLayer;
    assert.equal(Object.prototype.toString.call(entry), '[object Arguments]');
    assert.deepEqual([...entry], ['event', 'camera_start', { film_type: 'color' }]);
  } finally {
    delete globalThis.window;
  }
});

test('window がないサーバー側では何もしない', () => {
  assert.doesNotThrow(() => trackEvent('camera_start'));
});
