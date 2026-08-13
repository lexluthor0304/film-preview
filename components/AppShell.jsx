import Script from "next/script";
import { SerwistProvider } from "@serwist/next/react";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import VignetteOptOut from "@/components/VignetteOptOut";
import { getDictionary, getLocaleDir } from "@/lib/i18n";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function AppShell({ children, locale }) {
  const { gaTrackingId, adsenseClient } = siteConfig.analytics;
  const dictionary = getDictionary(locale);

  return (
    <html lang={dictionary.htmlLang} dir={getLocaleDir(locale)}>
      <head>
        {/* iOS PWA meta tags — required for Apple devices to treat this as a PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/logo512.png" />

        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebsiteSchema(locale)} />
      </head>
      <body>
        <SerwistProvider>
          <SiteHeader locale={locale} />
          <main>{children}</main>
          <SiteFooter locale={locale} />
        </SerwistProvider>

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
          <>
            {/* Auto ads would otherwise serve full-screen vignettes, which the
                Ad Experience Report reports as a POPUP violation. */}
            <VignetteOptOut />
            <Script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
          </>
        )}
      </body>
    </html>
  );
}
