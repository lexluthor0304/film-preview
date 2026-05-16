import LocalizedFaqPage from "@/components/localized/LocalizedFaqPage";
import { getLocalizedPage } from "@/lib/localized-content";
import {
  buildLocalizedPageMetadata,
  requireTranslatedLocale,
} from "@/lib/localized-routing";

export async function generateMetadata({ params }) {
  return buildLocalizedPageMetadata(params, "faq", "/faq", "article");
}

export default async function Page({ params }) {
  const locale = await requireTranslatedLocale(params);
  const content = getLocalizedPage(locale, "faq");
  return <LocalizedFaqPage locale={locale} content={content} />;
}
