import { siteConfig } from "@/lib/site-config";
import {
  languageAlternates,
  localizedPath,
  routePaths,
  supportedLocales,
} from "@/lib/i18n";
import { getPageDates } from "@/lib/page-dates";

const englishOnlyRoutePaths = [
  "/guides/scan-negatives-without-scanner",
  "/guides/invert-negatives-iphone",
  "/guides/orange-mask-removal",
  "/guides/best-free-negative-viewer",
];

export default function sitemap() {
  const routeMeta = {
    "/": { changeFrequency: "weekly", priority: 1.0 },
    "/how-to-use": { changeFrequency: "monthly", priority: 0.9 },
    "/faq": { changeFrequency: "monthly", priority: 0.8 },
    "/guides/film-negatives": { changeFrequency: "monthly", priority: 0.8 },
    "/guides/digitize-35mm": { changeFrequency: "monthly", priority: 0.8 },
    "/guides/film-vs-digital": { changeFrequency: "monthly", priority: 0.8 },
    "/about": { changeFrequency: "yearly", priority: 0.5 },
  };

  const localizedRoutes = routePaths.flatMap((path) =>
    supportedLocales.map((locale) => ({
      url: `${siteConfig.url}${localizedPath(path, locale)}`,
      lastModified: new Date(getPageDates(path).modified),
      changeFrequency: routeMeta[path].changeFrequency,
      priority: routeMeta[path].priority,
      alternates: {
        languages: languageAlternates(path),
      },
    }))
  );

  const englishOnlyRoutes = englishOnlyRoutePaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(getPageDates(path).modified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...localizedRoutes, ...englishOnlyRoutes];
}
