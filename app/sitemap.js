import { siteConfig } from "@/lib/site-config";
import {
  languageAlternates,
  localizedPath,
  routePaths,
  supportedLocales,
} from "@/lib/i18n";

export default function sitemap() {
  const lastModified = new Date(siteConfig.lastUpdatedISO);
  const routeMeta = {
    "/": { changeFrequency: "weekly", priority: 1.0 },
    "/how-to-use": { changeFrequency: "monthly", priority: 0.9 },
    "/faq": { changeFrequency: "monthly", priority: 0.8 },
    "/guides/film-negatives": { changeFrequency: "monthly", priority: 0.8 },
    "/guides/digitize-35mm": { changeFrequency: "monthly", priority: 0.8 },
    "/guides/film-vs-digital": { changeFrequency: "monthly", priority: 0.8 },
    "/about": { changeFrequency: "yearly", priority: 0.5 },
  };

  return routePaths.flatMap((path) =>
    supportedLocales.map((locale) => ({
      url: `${siteConfig.url}${localizedPath(path, locale)}`,
      lastModified,
      changeFrequency: routeMeta[path].changeFrequency,
      priority: routeMeta[path].priority,
      alternates: {
        languages: languageAlternates(path),
      },
    }))
  );
}
