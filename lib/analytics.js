// Sends a GA4 event through the dataLayer, mirroring the gtag() shim in
// AppShell so the call is safe before gtag.js loads or when it is blocked.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js only processes Arguments objects, not plain arrays.
  (function gtag() {
    window.dataLayer.push(arguments);
  })("event", name, params);
}
