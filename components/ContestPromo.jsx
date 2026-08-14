"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

// A corner invite rather than a real modal: no backdrop, no focus trap, and the
// page stays fully usable behind it — the live camera preview is the reason
// people are here, so covering it would cost more than the invite is worth.
const STORAGE_KEY = "nv:contest-promo:v1";
// The contest runs weekly, so a dismissal means "not now", not "never" — but a
// month of silence is the least we owe someone who closed it.
const SNOOZE_MS = 30 * 24 * 60 * 60 * 1000;
// Let the page settle (and any camera permission prompt land) before it slides in.
const APPEAR_DELAY_MS = 1800;

function readDismissedAt() {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    // Safari in private mode throws on storage access; treat it as never seen.
    return 0;
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Nothing to do — the invite simply comes back on the next visit.
  }
}

export default function ContestPromo({ labels }) {
  // Starts hidden so the server-rendered markup matches the first client render;
  // localStorage is only readable after mount.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Date.now() - readDismissedAt() < SNOOZE_MS) return;
    const timer = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    rememberDismissal();
    setVisible(false);
  };

  return (
    <aside className="contest-promo" aria-labelledby="contest-promo-title">
      <div className="contest-promo__body">
        <p className="contest-promo__eyebrow">{labels.eyebrow}</p>
        <p className="contest-promo__title" id="contest-promo-title">
          {labels.title}
        </p>
        <p className="contest-promo__text">{labels.text}</p>
      </div>
      <a
        className="btn btn--primary btn--small contest-promo__cta"
        href={siteConfig.contestUrl}
        target="_blank"
        rel="noopener noreferrer"
        // Keep Auto ads from turning this outbound click into a full-screen vignette.
        data-google-vignette="false"
        onClick={dismiss}
      >
        {labels.cta}
      </a>
      <button
        type="button"
        className="contest-promo__close"
        onClick={dismiss}
        aria-label={labels.close}
      >
        ×
      </button>
    </aside>
  );
}
