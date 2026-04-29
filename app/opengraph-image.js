import { ImageResponse } from "next/og";

export const alt = "Negative Viewer — Online Film Negative Viewer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2a1810 60%, #c1432b 120%)",
          color: "#faf8f4",
          padding: "70px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: "#faf8f4",
              color: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            ◐
          </div>
          <span style={{ letterSpacing: "0.04em" }}>
            negativeviewer.tokugai.com
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 24,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#f0d8b0",
              opacity: 0.85,
            }}
          >
            Free · Browser-based · No upload
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              maxWidth: 1000,
            }}
          >
            Online film negative viewer that turns negatives into positives in
            real time.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
          }}
        >
          <span style={{ opacity: 0.85 }}>
            35mm · 120 · 4×5 — straight from your camera
          </span>
          <span
            style={{
              padding: "12px 22px",
              border: "2px solid #faf8f4",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Open the viewer →
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
