import { siteConfig } from "./site-config";
import {
  defaultLocale,
  languageAlternates,
  localizedPath,
  normalizeLocale,
} from "./i18n";

export function buildMetadata({
  title,
  description,
  path = "/",
  locale = defaultLocale,
  type = "website",
  publishedTime,
  modifiedTime,
}) {
  const normalizedLocale = normalizeLocale(locale);
  const canonicalPath = localizedPath(path, normalizedLocale);
  const url = `${siteConfig.url}${canonicalPath}`;
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const desc = description || siteConfig.description;
  const ogImage = {
    url: `${siteConfig.url}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: fullTitle,
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url,
      locale: normalizedLocale,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      images: [ogImage],
      publishedTime,
      modifiedTime,
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
