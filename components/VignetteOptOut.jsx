"use client";

import { useEffect } from "react";

// AdSense Auto ads include "vignette" ads — full-screen interstitials that cover
// the page. Google's own Ad Experience Report classifies them as POPUP, which
// fails the Better Ads Standards and gets ads filtered by Chrome after 30 days.
//
// The only page-side control Google documents is per-link: an anchor carrying
// data-google-vignette="false" never triggers a vignette.
// https://support.google.com/adsense/answer/17016693
//
// Stamping every anchor from one place keeps the opt-out complete — including
// links added by client-side navigation — instead of relying on every future
// link remembering the attribute. Note that this only covers the click trigger:
// the "additional triggers" (browser nav bar, article end, tab unhide, back
// button, idle) can only be switched off in the AdSense dashboard under
// Ads > Edit site > Overlay formats.
const ATTRIBUTE = "data-google-vignette";
// AdSense injects its own markup into the page; leave that DOM alone.
const AD_CONTAINERS = "ins, [id^='google_'], [id^='aswift_']";

function optOutAnchors(root) {
  if (!(root instanceof Element)) return;

  const anchors =
    root.tagName === "A" ? [root] : root.querySelectorAll(`a:not([${ATTRIBUTE}])`);

  for (const anchor of anchors) {
    if (anchor.hasAttribute(ATTRIBUTE) || anchor.closest(AD_CONTAINERS)) continue;
    anchor.setAttribute(ATTRIBUTE, "false");
  }
}

export default function VignetteOptOut() {
  useEffect(() => {
    optOutAnchors(document.body);

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          optOutAnchors(node);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
