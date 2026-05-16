import LocalizedGuidePage from "@/components/localized/LocalizedGuidePage";
import { getLocalizedGuide } from "@/lib/localized-content";
import {
  buildLocalizedGuideMetadata,
  requireTranslatedLocale,
} from "@/lib/localized-routing";

const path = "/guides/film-negatives";

export async function generateMetadata({ params }) {
  return buildLocalizedGuideMetadata(params, "filmNegatives", path);
}

export default async function Page({ params }) {
  const locale = await requireTranslatedLocale(params);
  const content = getLocalizedGuide(locale, "filmNegatives");
  return <LocalizedGuidePage locale={locale} content={content} path={path} />;
}
