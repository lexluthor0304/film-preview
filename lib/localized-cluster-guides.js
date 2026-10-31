import { localizedPath } from "./i18n";
import { siteConfig } from "./site-config";
import es from "./localized-cluster-guides/es.json";
import fr from "./localized-cluster-guides/fr.json";
import id from "./localized-cluster-guides/id.json";
import it from "./localized-cluster-guides/it.json";
import ru from "./localized-cluster-guides/ru.json";
import zh from "./localized-cluster-guides/zh.json";

// Translations of the English long-tail guides in lib/cluster-guides.js. Each
// locale file holds shared UI strings plus one entry per translated path;
// sources and read time stay shared with the English guide.
export const localizedClusterGuides = { zh, ru, es, fr, it, id };

export function getLocalizedClusterGuide(locale, path) {
  return localizedClusterGuides[locale]?.guides[path];
}

export function getLocalizedClusterGuideUi(locale) {
  return localizedClusterGuides[locale]?.ui;
}

export function clusterGuideLocales(path) {
  return Object.keys(localizedClusterGuides).filter(
    (locale) => localizedClusterGuides[locale].guides[path]
  );
}

// hreflang set for a long-tail guide: English plus only the locales that have
// a translation, so every listed URL exists and points back.
export function clusterGuideLanguageAlternates(path) {
  const url = (locale) => `${siteConfig.url}${localizedPath(path, locale)}`;
  return {
    en: url("en"),
    ...Object.fromEntries(
      clusterGuideLocales(path).map((locale) => [locale, url(locale)])
    ),
    "x-default": url("en"),
  };
}
