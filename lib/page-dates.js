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
  "/about": defaultDates,
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

export function getPageDates(path = "/") {
  return pageDates[path] || defaultDates;
}

export function getPagePublishedISO(path = "/") {
  return `${getPageDates(path).published}T00:00:00Z`;
}

export function getPageModifiedISO(path = "/") {
  return `${getPageDates(path).modified}T00:00:00Z`;
}
