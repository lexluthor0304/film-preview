import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildAboutPageSchema } from "@/lib/schema";
import { getPageDates } from "@/lib/page-dates";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "About Negative Viewer — A Privacy-First Online Film Negative Tool",
  description:
    "About Negative Viewer: who built it, how it works, the privacy commitments, and the tech stack behind the in-browser film negative converter.",
  path: "/about",
  type: "article",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildAboutPageSchema({ title: "About Negative Viewer" })} />
      <article className="container section">
        <h1>About Negative Viewer</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Last updated {getPageDates("/about").modified}</span>
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
            The page asks for your camera through the standard Web{" "}
            <code>getUserMedia</code> API and draws every frame with a WebGL2 shader
            (Canvas 2D on older browsers).
          </p>
          <p>
            For color negatives it measures the film-base color on a clear film edge,
            divides it out to remove the orange mask, and inverts the result as
            density with a print-like contrast curve, so the clear base turns black
            and the image tones fall into place. Black-and-white negatives use the
            same math and end in grayscale; slides are shown without inversion. Where
            the browser allows it, camera exposure and white balance are locked after
            calibration so the colors stay put.
          </p>
          <p>
            There is no neural network, no cloud processing, and no upload. The full
            source is small and lives in this site's repository.
          </p>

          <h2>Privacy commitments</h2>
          <ul>
            <li>
              <strong>No upload of your camera feed.</strong> Pixels are processed in
              your browser only. The site has no server endpoint that accepts video
              or photo data.
            </li>
            <li>
              <strong>No account, no email, no fingerprinting.</strong> Google
              Analytics records anonymous page views and feature use (for example,
              that the camera started or a frame was captured) so we can see what to
              improve. It never receives images or video.
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
              <strong>Web APIs</strong>: <code>getUserMedia</code> for camera access,
              a <code>WebGL2</code> shader (with a <code>Canvas 2D</code> fallback) for
              live processing, and <code>ImageCapture</code> for full-resolution stills
              where supported.
            </li>
            <li>
              <strong>Serwist</strong> service worker, so the viewer installs as an
              app and keeps working offline.
            </li>
            <li>
              <strong>Vercel</strong> for hosting and edge delivery.
            </li>
          </ul>

          <h2>Who built it</h2>
          <p>
            Negative Viewer is built and maintained by {siteConfig.author.name} at{" "}
            <a href={`${siteConfig.publisher.url}/en/`} rel="noopener noreferrer">
              {siteConfig.publisher.name}
            </a>{" "}
            ({siteConfig.publisher.legalName}) in Tokyo, which runs a darkroom that
            develops and scans film by hand and an{" "}
            <a href={siteConfig.publisher.shopUrl} rel="noopener noreferrer">
              online shop
            </a>{" "}
            for film, chemistry, and darkroom gear.
          </p>
          <p>
            The same team makes{" "}
            <a href={siteConfig.negativeConverterUrl} rel="noopener noreferrer">
              Negative Converter
            </a>{" "}
            for saved negative files and{" "}
            <a href={siteConfig.neoBoxUrl} rel="noopener noreferrer">
              NeoBox
            </a>
            , a 3D-printable strobe light box for camera-scanning 35mm and 120 film,
            released as open hardware. The project started as a tool for sorting
            through a box of family negatives and grew into a public site after a
            friend asked, "could you put that online?"
          </p>

          <h2>Roadmap</h2>
          <ul>
            <li>
              Continued integration with{" "}
              <a
                href={siteConfig.negativeConverterUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Negative Converter
              </a>{" "}
              for saved-file orange-mask removal.
            </li>
          </ul>

          <p>
            If you have a feature you want to see, the fastest path is to open an
            issue on the{" "}
            <a href={siteConfig.repositoryUrl} rel="noopener noreferrer">
              GitHub repository
            </a>
            .
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
