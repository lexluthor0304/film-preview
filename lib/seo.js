import { siteConfig } from "./site-config";
import {
  defaultLocale,
  languageAlternates,
  localizedPath,
  normalizeLocale,
} from "./i18n";
import { getPageModifiedISO, getPagePublishedISO } from "./page-dates";

export function buildMetadata({
  title,
  description,
  path = "/",
  locale = defaultLocale,
  type = "website",
  publishedTime,
  modifiedTime,
  languages,
}) {
  const normalizedLocale = normalizeLocale(locale);
  const canonicalPath = localizedPath(path, normalizedLocale);
  const url = `${siteConfig.url}${canonicalPath}`;
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const desc = description || siteConfig.description;
  const ogImage = {
    url: `${siteConfig.url}${siteConfig.defaultOgImagePath}`,
    width: 1200,
    height: 675,
    alt: fullTitle,
  };
  const resolvedPublishedTime =
    publishedTime || (type === "article" ? getPagePublishedISO(path) : undefined);
  const resolvedModifiedTime = modifiedTime || getPageModifiedISO(path);

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: languages || languageAlternates(path),
    },
    openGraph: {
      type,
      url,
      locale: normalizedLocale,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      images: [ogImage],
      publishedTime: resolvedPublishedTime,
      modifiedTime: resolvedModifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.publisher.name,
  };
}

export function englishOnlyLanguageAlternates(path) {
  const url = `${siteConfig.url}${localizedPath(path, defaultLocale)}`;

  return {
    en: url,
    "x-default": url,
  };
}
