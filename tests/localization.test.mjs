import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLocalizedGuideFaqs, localizedSourceTitles } from '../lib/guide-seo.js';

// i18n.js uses extensionless imports that plain Node can't resolve, so read the list from source.
const i18nSource = readFileSync(new URL('../lib/i18n.js', import.meta.url), 'utf8');
const translatedLocales = JSON.parse(i18nSource.match(/translatedLocales = (\[[^\]]*\])/)[1]);
const coreGuides = ['/guides/film-negatives', '/guides/digitize-35mm', '/guides/film-vs-digital'];

test('全翻訳言語にガイド出典の見出しがあり、英語のままではない', () => {
  for (const locale of translatedLocales) {
    const title = localizedSourceTitles[locale];
    assert.ok(title, `${locale} に見出しがない`);
    assert.notEqual(title, localizedSourceTitles.en, `${locale} の見出しが英語のまま`);
  }
});

test('全翻訳言語で中核ガイド3本それぞれにFAQが3問以上ある', () => {
  for (const locale of translatedLocales) {
    for (const path of coreGuides) {
      const faqs = getLocalizedGuideFaqs(path, locale);
      assert.ok(faqs.length >= 3, `${locale} ${path} のFAQが ${faqs.length} 問`);
      for (const { q, a } of faqs) assert.ok(q && a, `${locale} ${path} に空のFAQ`);
    }
  }
});
