"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Automated browsers (navigator.webdriver) are bots, not visitors. Headless
// sessions with fixed viewports, zero engagement and ~1s duration made up
// about 8% of all GA4 sessions in October 2026, inflating Direct traffic and
// dragging engagement down, so GA4 is only loaded for real browsers.
export default function GoogleAnalytics({ trackingId }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!navigator.webdriver);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  );
}
