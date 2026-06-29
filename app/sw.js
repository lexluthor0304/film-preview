import { Serwist, NetworkFirst, StaleWhileRevalidate } from "serwist";
import { ExpirationPlugin } from "serwist";
import { defaultCache } from "@serwist/next/worker";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST || [],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
});

// Navigation routes — NetworkFirst with cache fallback for offline support
serwist.registerCapture(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
    networkTimeoutSeconds: 3,
  })
);

// External scripts (GA, AdSense) — StaleWhileRevalidate
serwist.registerCapture(
  /^https:\/\/(?:www\.)?(?:googletagmanager|google-analytics|googlesyndication|pagead2)\.com\/.*/,
  new StaleWhileRevalidate({
    cacheName: "external",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);

// Apply the default Next.js caching strategies (images, fonts, JS, CSS, RSC, etc.)
defaultCache.forEach(({ matcher, handler, method }) => {
  if (method) {
    serwist.registerCapture(matcher, handler, method);
  } else {
    serwist.registerCapture(matcher, handler);
  }
});

serwist.addEventListeners();
