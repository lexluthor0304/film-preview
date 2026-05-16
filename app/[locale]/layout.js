import "../globals.css";
import { notFound } from "next/navigation";
import AppShell, { viewport } from "@/components/AppShell";
import {
  getDictionary,
  isTranslatedLocale,
  translatedLocales,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return translatedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  return {
    ...buildMetadata({
      title: `${siteConfig.name} — ${dictionary.site.titleSuffix}`,
      description: dictionary.site.description,
      path: "/",
      locale,
    }),
    icons: {
      icon: "/favicon.ico",
      apple: "/logo192.png",
    },
    manifest: "/manifest.webmanifest",
  };
}

export { viewport };

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) {
    notFound();
  }

  return <AppShell locale={locale}>{children}</AppShell>;
}
