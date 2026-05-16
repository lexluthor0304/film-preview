import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export const viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.publisher.name,
  url: siteConfig.publisher.url,
  logo: `${siteConfig.url}/logo512.png`,
  founder: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  sameAs: [siteConfig.author.url],
};

export function buildWebsiteSchema(locale) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: dictionary.site.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
    },
    inLanguage: dictionary.htmlLang,
  };
}

export default function AppShell({ children, locale }) {
  const { gaTrackingId, adsenseClient } = siteConfig.analytics;
  const dictionary = getDictionary(locale);

  return (
    <html lang={dictionary.htmlLang}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={buildWebsiteSchema(locale)} />
      </head>
      <body>
        <SiteHeader locale={locale} />
        <main>{children}</main>
        <SiteFooter locale={locale} />

        {gaTrackingId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}');
              `}
            </Script>
          </>
        )}

        {adsenseClient && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
