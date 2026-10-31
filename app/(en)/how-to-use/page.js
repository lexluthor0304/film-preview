import Link from "next/link";
import NegativeViewer from "@/components/NegativeViewer";
import JsonLd from "@/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { getPageDates } from "@/lib/page-dates";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "How to Use the Negative Viewer (Step-by-Step Guide)",
  description:
    "Step-by-step guide to converting film negatives to positives in your browser. Lighting setup, framing, focus tips, and how to save the result as a PNG.",
  path: "/how-to-use",
  type: "article",
});

const steps = [
  {
    name: "Set up an even backlight",
    text: "Open a fully white image on a second phone, tablet, or computer screen at maximum brightness. Alternatives: a small lightbox, a piece of frosted glass on a window during daylight, or a tracing-paper diffuser over a desk lamp. Even, diffuse light is what matters — point sources create hot spots that ruin the preview.",
  },
  {
    name: "Hold the negative against the light",
    text: "Place the negative directly against the lit surface with the shiny base side facing the camera and the duller emulsion side toward the light, so the picture reads the right way round. Keep it flat — gentle pressure with two fingers along the edges of the strip works for 35mm.",
  },
  {
    name: "Open the viewer and grant camera access",
    text: "Open negativeviewer.tokugai.com on the device you'll point at the negative. Press Start camera. Your browser will ask permission to use the camera the first time — grant it. The site uses HTTPS, which is required for camera access.",
  },
  {
    name: "Frame and focus on the negative",
    text: "Move the camera close enough that one negative frame roughly fills the viewport. On phones, tap the screen to lock focus on the negative — autofocus will sometimes hunt for the backlight instead. Brace your elbows or use a small tripod for sharper results.",
  },
  {
    name: "Let the viewer remove the orange cast",
    text: "Keep a little clear film edge in the frame when you start. The viewer finds the orange film base, removes the cast automatically and holds that correction; the status line reads “Film base estimated · held”. If it can't find the base, press Calibrate, drag over a clear edge, then Use this sample. For black-and-white negatives or slides, set Film to B&W negative or Positive (slide) in Adjust first. A warm or dim backlight still tints the preview, so use a white screen at full brightness.",
  },
  {
    name: "Capture and save the frames you want",
    text: "Press Capture to add the current frame to the Captured frames gallery under the viewer, then save it as a PNG or share it. Freeze frame holds the picture still while you adjust it. For a whole roll, slide the strip across without moving the camera, capture each frame, then press Save all.",
  },
];

export default function HowToUsePage() {
  return (
    <>
      <JsonLd
        data={buildHowToSchema({
          title: "How to use Negative Viewer to convert film negatives to positive images",
          description:
            "A six-step guide for using a browser-based negative viewer to preview and digitize film negatives in real time.",
          steps,
          tools: [
            "A device with a camera and a modern browser",
            "A second screen or lightbox to act as backlight",
            "Film negatives to view",
          ],
        })}
      />
      <article className="container section">
        <h1>How to use the Negative Viewer (step-by-step)</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Last updated {getPageDates("/how-to-use").modified}</span>
          <span>3-minute read</span>
        </p>

        <div className="prose">
          <p>
            <strong>Short answer:</strong> open Negative Viewer in your browser, hold
            a film negative against an even backlight, point your camera at it, and
            press <em>Start camera</em>. The site inverts the colors live and shows
            you the positive image. Total setup time is under one minute.
          </p>

          <div className="callout">
            <strong>Skip to the tool:</strong> the live viewer is available on{" "}
            <Link href="/">the home page</Link>, and also embedded below this guide.
          </div>

          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.name} id={`step-${i + 1}`}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>

          <h2>Tips for sharper results</h2>
          <ul>
            <li>
              <strong>Use the rear camera, not the front camera.</strong> Rear
              cameras have higher resolution and better optics. The viewer asks for
              the environment-facing camera by default.
            </li>
            <li>
              <strong>Brace the camera.</strong> Even a small tripod or a stack of
              books that lets the phone rest still will outperform handheld for
              detail.
            </li>
            <li>
              <strong>Clean the negative first.</strong> Use a microfiber cloth or a
              rocket blower. Dust looks like white specks on the positive preview.
            </li>
            <li>
              <strong>Keep the camera lens parallel to the negative.</strong> Any
              tilt becomes a keystone distortion in the saved image.
            </li>
            <li>
              <strong>Fine-tune keepers afterwards.</strong> The live correction is
              made for viewing. Adjust a saved PNG in any photo editor; for
              archive-quality files, photograph the negative at full resolution and
              convert it with Negative Converter.
            </li>
          </ul>

          <h2>Browser compatibility</h2>
          <table>
            <thead>
              <tr>
                <th>Browser</th>
                <th>Camera access</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chrome (desktop and Android)</td>
                <td>Supported</td>
                <td>Requires HTTPS. Permission stored per origin.</td>
              </tr>
              <tr>
                <td>Safari (iOS 11+ and macOS)</td>
                <td>Supported</td>
                <td>
                  Permission must be granted on every new visit unless you add the
                  site to the home screen.
                </td>
              </tr>
              <tr>
                <td>Edge</td>
                <td>Supported</td>
                <td>Same behavior as Chrome.</td>
              </tr>
              <tr>
                <td>Firefox (desktop and Android)</td>
                <td>Supported</td>
                <td>Granular per-camera selection if multiple devices are attached.</td>
              </tr>
              <tr>
                <td>In-app browsers (Instagram, WeChat, LINE)</td>
                <td>Often blocked</td>
                <td>
                  Open the link in Chrome or Safari directly if the camera will not
                  start.
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Common problems</h2>
          <h3>Camera won't start</h3>
          <p>
            The two usual causes are: the page isn't on HTTPS (camera access requires
            it), or the browser remembered an earlier denial. In Chrome, click the
            lock icon in the address bar and re-allow the camera. In Safari iOS, go
            to Settings → Safari → Camera and confirm "Ask" or "Allow."
          </p>
          <h3>The image is dark</h3>
          <p>
            Increase backlight brightness. A phone screen at 50% brightness is rarely
            enough; push it to 100%. If a guide rail or window frame intrudes into
            the camera's view, it dilutes the average exposure.
          </p>
          <h3>The image is sharp but the colors look weird</h3>
          <p>
            Check that <em>Film</em> matches what you are viewing: a slide in Color
            negative mode looks like a negative. Then keep a clear film edge in view
            and choose <em>Find film base again</em> in Adjust, or press{" "}
            <em>Calibrate</em> to sample the edge by hand. Our{" "}
            <Link href="/guides/film-negatives">guide on film negatives</Link>{" "}
            explains why color negatives are orange in the first place.
          </p>
        </div>

        <h2>Try it now</h2>
        <NegativeViewer />

        <div className="cta-card">
          <span>Got more questions?</span>
          <Link href="/faq">Read the full FAQ →</Link>
        </div>
      </article>
    </>
  );
}
