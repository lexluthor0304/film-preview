import { siteConfig } from "@/lib/site-config";
import {
  languageAlternates,
  localizedPath,
  routePaths,
  supportedLocales,
} from "@/lib/i18n";
import { clusterGuidePaths } from "@/lib/cluster-guides";
import {
  clusterGuideLanguageAlternates,
  clusterGuideLocales,
} from "@/lib/localized-cluster-guides";
import { getPageDates } from "@/lib/page-dates";

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
      lastModified: new Date(getPageDates(path, locale).modified),
      changeFrequency: routeMeta[path].changeFrequency,
      priority: routeMeta[path].priority,
      alternates: {
        languages: languageAlternates(path),
      },
    }))
  );

  // Long-tail guides exist in English plus only some translations.
  const clusterGuideRoutes = clusterGuidePaths.flatMap((path) =>
    ["en", ...clusterGuideLocales(path)].map((locale) => ({
      url: `${siteConfig.url}${localizedPath(path, locale)}`,
      lastModified: new Date(getPageDates(path, locale).modified),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: clusterGuideLanguageAlternates(path),
      },
    }))
  );

  return [...localizedRoutes, ...clusterGuideRoutes];
}
