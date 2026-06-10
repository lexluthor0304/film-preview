import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const title = `Page not found | ${siteConfig.name}`;
const description =
  "This Negative Viewer page does not exist. Open the live film negative viewer or browse the film scanning guides.";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.defaultOgImagePath}`,
        width: 1200,
        height: 675,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteConfig.url}${siteConfig.defaultOgImagePath}`],
  },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#faf8f4",
        color: "#1a1a1a",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <section style={{ maxWidth: "40rem" }}>
        <p style={{ fontSize: "0.875rem", textTransform: "uppercase" }}>404</p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: "0 0 1rem" }}>
          Page not found
        </h1>
        <p style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          The page you opened is not part of Negative Viewer. Start with the live
          browser tool or one of the film negative guides.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "#a83420", fontWeight: 700 }}>
            Open Negative Viewer
          </Link>
        </p>
      </section>
    </main>
  );
}
