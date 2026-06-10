const defaultDates = {
  published: "2026-04-29",
  modified: "2026-06-10",
};

export const pageDates = {
  "/": defaultDates,
  "/how-to-use": defaultDates,
  "/faq": defaultDates,
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
    modified: "2026-06-10",
  },
  "/guides/orange-mask-removal": {
    published: "2026-06-10",
    modified: "2026-06-10",
  },
  "/guides/best-free-negative-viewer": {
    published: "2026-06-10",
    modified: "2026-06-10",
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
