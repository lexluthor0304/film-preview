import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getDictionary } from "@/lib/i18n";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

export default function AppShell({ children, locale }) {
  const { gaTrackingId, adsenseClient } = siteConfig.analytics;
  const dictionary = getDictionary(locale);

  return (
    <html lang={dictionary.htmlLang}>
      <head>
        <JsonLd data={buildOrganizationSchema()} />
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
