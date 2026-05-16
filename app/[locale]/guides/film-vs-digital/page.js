import LocalizedGuidePage from "@/components/localized/LocalizedGuidePage";
import { getLocalizedGuide } from "@/lib/localized-content";
import {
  buildLocalizedGuideMetadata,
  requireTranslatedLocale,
} from "@/lib/localized-routing";

const path = "/guides/film-vs-digital";

export async function generateMetadata({ params }) {
  return buildLocalizedGuideMetadata(params, "filmVsDigital", path);
}

export default async function Page({ params }) {
  const locale = await requireTranslatedLocale(params);
  const content = getLocalizedGuide(locale, "filmVsDigital");
  return <LocalizedGuidePage locale={locale} content={content} path={path} />;
}
