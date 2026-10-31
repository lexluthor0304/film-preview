import { localizedClusterGuides } from "./localized-cluster-guides";

const defaultDates = {
  published: "2026-04-29",
  modified: "2026-06-10",
};

// Bump `modified` only when a page's own content changes (sitemap lastmod,
// JSON-LD dateModified and the visible "Last updated" all read from here).
export const pageDates = {
  "/": { published: "2026-04-29", modified: "2026-10-31" },
  "/how-to-use": { published: "2026-04-29", modified: "2026-10-31" },
  "/faq": { published: "2026-04-29", modified: "2026-10-31" },
  "/about": { published: "2026-04-29", modified: "2026-10-31" },
  "/guides/film-negatives": defaultDates,
  "/guides/digitize-35mm": defaultDates,
  "/guides/film-vs-digital": defaultDates,
  "/guides/scan-negatives-without-scanner": {
    published: "2026-06-10",
    modified: "2026-06-10",
  },
  "/guides/invert-negatives-iphone": {
    published: "2026-06-10",
    modified: "2026-10-31",
  },
  "/guides/view-negatives-android": {
    published: "2026-10-31",
    modified: "2026-10-31",
  },
  "/guides/orange-mask-removal": {
    published: "2026-06-10",
    modified: "2026-10-31",
  },
  "/guides/best-free-negative-viewer": {
    published: "2026-06-10",
    modified: "2026-10-31",
  },
};

// Core guides rewritten in full on 2026-10-31; the other locales keep the
// shorter versions and their original dates.
const rewrittenCoreGuides = Object.fromEntries(
  ["/guides/film-negatives", "/guides/digitize-35mm", "/guides/film-vs-digital"].map(
    (path) => [path, { published: "2026-04-29", modified: "2026-10-31" }]
  )
);
const rewrittenCoreGuideLocales = ["en", "zh", "ru", "es", "fr", "it", "id", "ja"];

// Translations published or revised on their own schedule override the
// per-path dates above.
const localePageDates = Object.fromEntries(
  [...new Set([...rewrittenCoreGuideLocales, ...Object.keys(localizedClusterGuides)])].map(
    (locale) => [
      locale,
      {
        ...(rewrittenCoreGuideLocales.includes(locale) ? rewrittenCoreGuides : {}),
        ...Object.fromEntries(
          Object.entries(localizedClusterGuides[locale]?.guides || {}).map(
            ([path, guide]) => [path, guide.dates]
          )
        ),
      },
    ]
  )
);

export function getPageDates(path = "/", locale = "en") {
  return localePageDates[locale]?.[path] || pageDates[path] || defaultDates;
}

export function getPagePublishedISO(path = "/", locale = "en") {
  return `${getPageDates(path, locale).published}T00:00:00Z`;
}

export function getPageModifiedISO(path = "/", locale = "en") {
  return `${getPageDates(path, locale).modified}T00:00:00Z`;
}
