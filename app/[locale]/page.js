import LocalizedHomePage from "@/components/localized/LocalizedHomePage";
import { getLocalizedPage } from "@/lib/localized-content";
import {
  buildLocalizedPageMetadata,
  requireTranslatedLocale,
} from "@/lib/localized-routing";

export async function generateMetadata({ params }) {
  return buildLocalizedPageMetadata(params, "home", "/", "website");
}

export default async function Page({ params }) {
  const locale = await requireTranslatedLocale(params);
  const content = getLocalizedPage(locale, "home");
  return <LocalizedHomePage locale={locale} content={content} />;
}
