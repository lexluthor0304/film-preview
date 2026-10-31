import { notFound } from "next/navigation";
import { isTranslatedLocale } from "./i18n";
import { getLocalizedGuide, getLocalizedPage } from "./localized-content";
import { buildMetadata } from "./seo";

export async function requireTranslatedLocale(params) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) {
    notFound();
  }
  return locale;
}

export async function buildLocalizedPageMetadata(params, pageKey, path, type) {
  const { locale } = await params;
  const page = getLocalizedPage(locale, pageKey);
  if (!page) {
    return {};
  }
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path,
    locale,
    type,
  });
}

export async function buildLocalizedGuideMetadata(params, guideKey, path) {
  const { locale } = await params;
  const guide = getLocalizedGuide(locale, guideKey);
  if (!guide) {
    return {};
  }
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path,
    locale,
    type: "article",
  });
}
