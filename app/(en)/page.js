import Link from "next/link";
import NegativeViewer from "@/components/NegativeViewer";
import JsonLd from "@/components/JsonLd";
import {
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Online Film Negative Viewer — Convert Negatives to Positive in Your Browser",
  description:
    "Free online film negative viewer. Use your phone or laptop camera to instantly convert 35mm, 120, and 4×5 negatives to positive images — no scanner, no upload, no install.",
  path: "/",
});

const homeFaqs = [
  {
    q: "Is this online film negative viewer free?",
    a: "Yes. Negative Viewer is free to use, requires no account, and runs entirely in your browser. The image processing happens on your device — your camera feed is never uploaded.",
  },
  {
    q: "What kinds of film negatives does it work with?",
    a: "Any color or black-and-white negative film: 35mm, 120/medium format, 4×5 large format, APS, and old roll film. Hold the negative against a bright, even light source like a phone screen showing a blank white image, a lightbox, or an overcast sky.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. The viewer is a web app. It runs in any modern browser (Chrome, Edge, Safari, Firefox) on phones, tablets, and laptops. The first time you press Start, your browser will ask permission to use the camera.",
  },
  {
    q: "Does it correct the orange mask on color negatives?",
    a: "The current version performs a real-time RGB inversion, which is the core operation a film scanner does. Color negatives still carry a slight orange cast from the film base — for finished images, fine-tune white balance in Photos, Lightroom, or any photo editor after saving.",
  },
];

const featureList = [
  "Real-time negative-to-positive conversion",
  "Works on phone, tablet, and laptop browsers",
  "Privacy-first: video never leaves your device",
  "Save the inverted image as a PNG with one click",
  "Works with 35mm, 120, 4×5, and APS negatives",
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={buildSoftwareApplicationSchema({
          description: siteConfig.description,
          featureList,
        })}
      />
      <JsonLd data={buildFaqPageSchema({ faqs: homeFaqs, path: "/" })} />

      <section className="hero container">
        <p className="hero__eyebrow">Free · Browser-based · No upload</p>
        <h1>Online film negative viewer that turns negatives into positives in real time</h1>
        <NegativeViewer />
        <p className="hero__lede">
          Hold a film negative in front of your phone or laptop camera. Negative Viewer
          inverts the colors live, so you can preview 35mm, 120, and 4×5 negatives
          instantly — no scanner, no app to install, and no images uploaded anywhere.
        </p>
        <p className="hero__after-lede">
          New here? Read the{" "}
          <Link href="/how-to-use">30-second how-to guide</Link> or jump to the{" "}
          <Link href="/faq">FAQ</Link>.
        </p>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2>What this tool does</h2>
          <div className="prose">
            <p>
              A film negative stores an image with all its colors inverted — bright
              skin tones look dark, blue skies look orange, and shadows are
              transparent. To see the actual photograph, every pixel needs to be
              flipped: red becomes cyan, green becomes magenta, blue becomes yellow.
              That is exactly what a film scanner does, and it is what this web app
              does in real time using your camera.
            </p>
            <p>
              <strong>You do not need a scanner</strong>. You only need a backlight
              (a phone screen showing a white image works), a roll or strip of
              negatives, and a device with a camera and a modern browser. Press{" "}
              <em>Start camera</em>, point it at the negative, and see the photo as it
              was meant to be seen.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Why people use Negative Viewer</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Privacy by design</h3>
              <p>
                Camera frames are inverted on your device with the Canvas API. No
                video, photo, or pixel ever leaves your browser.
              </p>
            </div>
            <div className="feature-card">
              <h3>Free, forever</h3>
              <p>
                No sign-up, no trial, no usage cap. The site is supported by
                lightweight ads, not your data.
              </p>
            </div>
            <div className="feature-card">
              <h3>Works on any device</h3>
              <p>
                Phone, tablet, laptop, Chromebook, iPad — anywhere a modern browser
                can request camera permission.
              </p>
            </div>
            <div className="feature-card">
              <h3>Instant preview</h3>
              <p>
                See the positive image at the same frame rate as your camera. Pan
                across a strip of 36 frames in seconds.
              </p>
            </div>
            <div className="feature-card">
              <h3>One-click save</h3>
              <p>
                Press <em>Save photo</em> to download the current frame as a PNG.
                Useful for sharing a quick reference shot of an old negative.
              </p>
            </div>
            <div className="feature-card">
              <h3>Made for film shooters</h3>
              <p>
                Designed for hobbyist film photographers, archivists, and anyone who
                inherited a shoebox of family negatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2>Use it in three steps</h2>
          <ol className="steps prose" style={{ maxWidth: "72ch" }}>
            <li>
              <h3>Set up a backlight</h3>
              <p>
                Open a blank white image on a second phone, a tablet, or a computer
                screen at full brightness. A daylight window or a tracing-paper
                lightbox also works. Even illumination is the key.
              </p>
            </li>
            <li>
              <h3>Hold the negative against the light</h3>
              <p>
                Place the negative emulsion-side away from the camera (the duller side
                faces the camera) and as close to the light source as practical to
                eliminate reflections.
              </p>
            </li>
            <li>
              <h3>Press Start camera and aim</h3>
              <p>
                Allow camera access when prompted. Move closer or farther until a
                single frame fills the viewport. Tap <em>Save photo</em> to download
                a PNG of the current preview.
              </p>
            </li>
          </ol>
          <p>
            For a deeper walkthrough — including focus tips, color cast cleanup, and
            how to handle whole rolls — read the full{" "}
            <Link href="/how-to-use">how-to-use guide</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Frequently asked questions</h2>
          <div className="prose" style={{ maxWidth: "72ch" }}>
            {homeFaqs.map(({ q, a }) => (
              <div className="faq__item" key={q}>
                <h3 className="faq__q">{q}</h3>
                <p className="faq__a">{a}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.25rem" }}>
            More questions answered on the <Link href="/faq">full FAQ page</Link>.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2>Read next</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3><Link href="/guides/film-negatives">Film negatives, explained</Link></h3>
              <p>
                What a negative is, why it looks orange, and how to read one with the
                naked eye.
              </p>
            </div>
            <div className="feature-card">
              <h3><Link href="/guides/digitize-35mm">Digitize 35mm at home</Link></h3>
              <p>
                Four ways to digitize 35mm film negatives — and which one is best for
                your goal and budget.
              </p>
            </div>
            <div className="feature-card">
              <h3><Link href="/guides/film-vs-digital">Film vs. digital photography</Link></h3>
              <p>
                A practical, side-by-side comparison of film and digital across cost,
                resolution, dynamic range, and the look.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
