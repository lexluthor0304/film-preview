import { defaultLocale, getDictionary, localizedPath } from "./i18n";
import { getPageDates, getPageModifiedISO } from "./page-dates";
import { siteConfig } from "./site-config";

export const guideCitations = {
  "/guides/film-negatives": [
    {
      title: "Kodak Professional Ektar 100 Film",
      url: "https://www.kodak.com/en/still-film/product/professional/ektar-100-film/",
    },
    {
      title: "Kodak Professional Portra 400 Technical Data",
      url: "https://imaging.kodakalaris.com/sites/default/files/files/resources/e4050_portra_400.pdf",
    },
    {
      title: "Library of Congress: Care, Handling and Storage of Photographs",
      url: "https://www.loc.gov/preservation/care/photo.html",
    },
    {
      title: "Kodak Alaris: Storage and Care of KODAK Photographic Materials",
      url: "https://imaging.kodakalaris.com/sites/default/files/wysiwyg/pro/CIS_E30.pdf",
    },
  ],
  "/guides/digitize-35mm": [
    {
      title: "FADGI Technical Guidelines for Digitizing Cultural Heritage Materials",
      url: "https://www.digitizationguidelines.gov/guidelines/digitize-technical.html",
    },
    {
      title: "Epson Perfection V600 Photo Scanner Fact Sheet",
      url: "https://news.epson.com/facts/epson-perfection-v600-photo-scanner-150179",
    },
    {
      title: "Plustek OpticFilm 8200i SE Specifications",
      url: "https://plustek.com/us/products/film-photo-scanners/opticfilm-8200i-se/spec.php",
    },
    {
      title: "Library of Congress: Care, Handling and Storage of Photographs",
      url: "https://www.loc.gov/preservation/care/photo.html",
    },
  ],
  "/guides/film-vs-digital": [
    {
      title: "FADGI Technical Guidelines for Digitizing Cultural Heritage Materials",
      url: "https://www.digitizationguidelines.gov/guidelines/digitize-technical.html",
    },
    {
      title: "Library of Congress: Care, Handling and Storage of Photographs",
      url: "https://www.loc.gov/preservation/care/photo.html",
    },
    {
      title: "National Archives: Cold Storage for Photographs",
      url: "https://www.archives.gov/preservation/storage/cold-storage-photos.html",
    },
    {
      title: "Kodak Alaris: Storage and Care of KODAK Photographic Materials",
      url: "https://imaging.kodakalaris.com/sites/default/files/wysiwyg/pro/CIS_E30.pdf",
    },
  ],
};

export function absoluteUrl(path = "/", locale = defaultLocale) {
  return `${siteConfig.url}${localizedPath(path, locale)}`;
}

export function buildPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.author.url}/#person`,
    name: siteConfig.author.name,
    url: siteConfig.author.url,
    sameAs: [siteConfig.author.githubUrl].filter(Boolean),
    affiliation: {
      "@type": "Organization",
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
    },
    knowsAbout: [
      "film negatives",
      "browser-based image processing",
      "camera scanning",
      "photographic archives",
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.publisher.url}/#organization`,
    name: siteConfig.publisher.name,
    url: siteConfig.publisher.url,
    logo: `${siteConfig.url}/logo512.png`,
    founder: buildPersonSchema(),
    sameAs: [siteConfig.publisher.url, siteConfig.repositoryUrl].filter(Boolean),
  };
}

export function buildWebsiteSchema(locale = defaultLocale) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: dictionary.site.description,
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.publisher.url}/#organization`,
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
    },
    inLanguage: dictionary.htmlLang,
  };
}

export function buildSoftwareApplicationSchema({
  path = "/",
  locale = defaultLocale,
  description = siteConfig.description,
  featureList = [],
}) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/#software`,
    name: siteConfig.name,
    url: absoluteUrl(path, locale),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description,
    image: `${siteConfig.url}${siteConfig.defaultOgImagePath}`,
    screenshot: `${siteConfig.url}${siteConfig.defaultOgImagePath}`,
    inLanguage: dictionary.htmlLang,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList,
    author: buildPersonSchema(),
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.publisher.url}/#organization`,
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
    },
    sameAs: [siteConfig.repositoryUrl].filter(Boolean),
  };
}

export function buildFaqPageSchema({
  faqs,
  path = "/faq",
  locale = defaultLocale,
}) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path, locale)}#faq`,
    url: absoluteUrl(path, locale),
    inLanguage: dictionary.htmlLang,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  locale = defaultLocale,
  readTime,
  keywords = [],
  about = [],
  citations = guideCitations[path] || [],
}) {
  const dictionary = getDictionary(locale);
  const url = absoluteUrl(path, locale);
  const dates = getPageDates(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    image: [`${siteConfig.url}${siteConfig.defaultOgImagePath}`],
    datePublished: dates.published,
    dateModified: getPageModifiedISO(path),
    author: buildPersonSchema(),
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.publisher.url}/#organization`,
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: dictionary.nav?.guides || "Guides",
    inLanguage: dictionary.htmlLang,
    isAccessibleForFree: true,
    keywords,
    about: about.map((name) => ({ "@type": "Thing", name })),
    citation: citations.map((source) => source.url),
    timeRequired: readTime?.startsWith("PT") ? readTime : undefined,
  };
}

export function buildHowToSchema({
  title,
  description,
  path = "/how-to-use",
  locale = defaultLocale,
  steps,
  totalTime = "PT3M",
  tools = [],
}) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${absoluteUrl(path, locale)}#howto`,
    name: title,
    description,
    inLanguage: dictionary.htmlLang,
    totalTime,
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: 0 },
    tool: tools.map((name) => ({ "@type": "HowToTool", name })),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${absoluteUrl(path, locale)}#step-${index + 1}`,
    })),
  };
}

export function buildAboutPageSchema({ title, locale = defaultLocale }) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/about", locale)}#about`,
    name: title,
    url: absoluteUrl("/about", locale),
    inLanguage: dictionary.htmlLang,
    isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}/#website` },
    about: {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#software`,
      name: siteConfig.name,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      url: siteConfig.url,
      sameAs: [siteConfig.repositoryUrl].filter(Boolean),
    },
  };
}
