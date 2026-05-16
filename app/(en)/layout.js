import "../globals.css";
import AppShell, { viewport } from "@/components/AppShell";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const dictionary = getDictionary(defaultLocale);

export const metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — ${dictionary.site.titleSuffix}`,
    description: dictionary.site.description,
    path: "/",
    locale: defaultLocale,
  }),
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  manifest: "/manifest.webmanifest",
};

export { viewport };

export default function EnglishLayout({ children }) {
  return <AppShell locale={defaultLocale}>{children}</AppShell>;
}
