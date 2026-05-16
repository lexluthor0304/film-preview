import LocalizedGuidePage from "@/components/localized/LocalizedGuidePage";
import { getLocalizedGuide } from "@/lib/localized-content";
import {
  buildLocalizedGuideMetadata,
  requireTranslatedLocale,
} from "@/lib/localized-routing";

const path = "/guides/digitize-35mm";

export async function generateMetadata({ params }) {
  return buildLocalizedGuideMetadata(params, "digitize35mm", path);
}

export default async function Page({ params }) {
  const locale = await requireTranslatedLocale(params);
  const content = getLocalizedGuide(locale, "digitize35mm");
  return <LocalizedGuidePage locale={locale} content={content} path={path} />;
}
