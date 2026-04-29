import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "About Negative Viewer — A Privacy-First Online Film Negative Tool",
  description:
    "About Negative Viewer: who built it, how it works, the privacy commitments, and the tech stack behind the in-browser film negative converter.",
  path: "/about",
  type: "article",
  modifiedTime: `${siteConfig.lastUpdatedISO}T00:00:00Z`,
});

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Negative Viewer",
  url: `${siteConfig.url}/about`,
  isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  about: {
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: siteConfig.url,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <article className="container section">
        <h1>About Negative Viewer</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Last updated {siteConfig.lastUpdatedISO}</span>
        </p>

        <div className="prose" style={{ maxWidth: "72ch" }}>
          <h2>Why this exists</h2>
          <p>
            Most people who own film negatives don't own a film scanner. Dedicated
            negative scanners cost hundreds of dollars, take minutes per frame, and
            sit unused most of the year. Meanwhile, the device in your pocket has a
            camera that is more than capable of <em>previewing</em> a negative — what
            it lacks is the software to invert the image in real time.
          </p>
          <p>
            Negative Viewer is that software, written as a small web app so that you
            don't have to install anything. Hold a negative against any backlight,
            point your phone at it, and the positive image appears on the screen
            within a frame.
          </p>

          <h2>How it works</h2>
          <p>
            The tool requests permission to use your device camera through the
            standard Web <code>getUserMedia</code> API. Each video frame is drawn to
            an HTML Canvas, every pixel's red, green, and blue channels are subtracted
            from 255 (a standard color inversion), and the result is drawn back to
            the screen at the camera's native frame rate. There is no neural network,
            no cloud processing, and no upload. The full source is small and lives in
            this site's repository.
          </p>

          <h2>Privacy commitments</h2>
          <ul>
            <li>
              <strong>No upload of your camera feed.</strong> Pixels are processed in
              your browser only. The site has no server endpoint that accepts video
              or photo data.
            </li>
            <li>
              <strong>No account, no email, no fingerprinting.</strong> The only
              first-party data we collect is anonymous Google Analytics page-view
              counts, which we use to decide what to improve.
            </li>
            <li>
              <strong>Ads, declared.</strong> The site shows Google AdSense ads.
              AdSense uses cookies — you can opt out at{" "}
              <a
                href="https://adssettings.google.com"
                rel="nofollow noopener noreferrer"
              >
                Google Ad Settings
              </a>
              .
            </li>
          </ul>

          <h2>Tech stack</h2>
          <ul>
            <li>
              <strong>Next.js 15</strong> with the App Router for static-generated
              pages and a single client component for the live viewer.
            </li>
            <li>
              <strong>React 19</strong> for the UI.
            </li>
            <li>
              <strong>Web APIs</strong>: <code>getUserMedia</code> for camera access,{" "}
              <code>Canvas 2D</code> for pixel-level inversion,{" "}
              <code>requestAnimationFrame</code> for the render loop.
            </li>
            <li>
              <strong>Vercel</strong> for hosting and edge delivery.
            </li>
          </ul>

          <h2>Who built it</h2>
          <p>
            Built and maintained by {siteConfig.author.name}, a developer based at{" "}
            <a href={siteConfig.publisher.url} rel="noopener noreferrer">
              tokugai.com
            </a>
            . The project started as a tool for sorting through a box of family
            negatives and grew into a public site after a friend asked, "could you
            put that online?"
          </p>

          <h2>Roadmap</h2>
          <ul>
            <li>An optional in-browser orange-mask remover for color negatives.</li>
            <li>Crop and rotate before saving, so the PNG is closer to ready-to-share.</li>
            <li>An EXIF-stripping export option for sensitive archival work.</li>
          </ul>

          <p>
            If you have a feature you want to see, the fastest path is to open an
            issue on the GitHub repository.
          </p>
        </div>

        <div className="cta-card">
          <span>Ready?</span>
          <Link href="/">Open the viewer →</Link>
        </div>
      </article>
    </>
  );
}
