import LocalizedAboutPage from "@/components/localized/LocalizedAboutPage";
import { getLocalizedPage } from "@/lib/localized-content";
import {
  buildLocalizedPageMetadata,
  requireTranslatedLocale,
} from "@/lib/localized-routing";

export async function generateMetadata({ params }) {
  return buildLocalizedPageMetadata(params, "about", "/about", "article");
}

export default async function Page({ params }) {
  const locale = await requireTranslatedLocale(params);
  const content = getLocalizedPage(locale, "about");
  return <LocalizedAboutPage locale={locale} content={content} />;
}
