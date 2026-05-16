import LocalizedHowToPage from "@/components/localized/LocalizedHowToPage";
import { getLocalizedPage } from "@/lib/localized-content";
import {
  buildLocalizedPageMetadata,
  requireTranslatedLocale,
} from "@/lib/localized-routing";

export async function generateMetadata({ params }) {
  return buildLocalizedPageMetadata(params, "howTo", "/how-to-use", "article");
}

export default async function Page({ params }) {
  const locale = await requireTranslatedLocale(params);
  const content = getLocalizedPage(locale, "howTo");
  return <LocalizedHowToPage locale={locale} content={content} />;
}
