import LocalizedClusterGuidePage from "@/components/localized/LocalizedClusterGuidePage";
import {
  clusterGuideLanguageAlternates,
  clusterGuideLocales,
  getLocalizedClusterGuide,
} from "@/lib/localized-cluster-guides";
import { buildMetadata } from "@/lib/seo";

const path = "/guides/invert-negatives-iphone";

// Only locales with a translation get this page; others 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return clusterGuideLocales(path).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const guide = getLocalizedClusterGuide(locale, path);
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path,
    locale,
    type: "article",
    languages: clusterGuideLanguageAlternates(path),
  });
}

export default async function LocalizedInvertNegativesIphonePage({ params }) {
  const { locale } = await params;
  return <LocalizedClusterGuidePage locale={locale} path={path} />;
}
