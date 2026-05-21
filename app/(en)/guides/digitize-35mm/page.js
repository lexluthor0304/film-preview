import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SourceList from "@/components/SourceList";
import {
  buildArticleSchema,
  buildFaqPageSchema,
  guideCitations,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/guides/digitize-35mm";
const title =
  "How to Digitize 35mm Film Negatives at Home (4 Methods Compared)";
const description =
  "Four practical ways to digitize 35mm film negatives at home — browser viewer, phone-and-invert, DSLR scanning, and flatbed scanner — with side-by-side comparisons of cost, speed, and quality.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  modifiedTime: `${siteConfig.lastUpdatedISO}T00:00:00Z`,
});

const sources = guideCitations[path];
const faqs = [
  {
    q: "What's the cheapest 35mm scanner that's actually good?",
    a: "A dedicated 35mm scanner in the Plustek OpticFilm 8200i class is the practical entry point for print-quality scans. Cheaper used scanners can work, but check current software support before buying because some older film scanners depend on legacy operating systems.",
  },
  {
    q: "Can I use my phone to scan 35mm negatives?",
    a: "Yes. The two free options are to point your phone at a backlit negative through a browser-based inverter like Negative Viewer for instant viewing, or to take a high-resolution still photo and invert it in Snapseed or Lightroom Mobile for shareable JPEGs.",
  },
  {
    q: "What resolution should I scan 35mm at?",
    a: "For web sharing, 1500 pixels on the long edge is enough. For 8x10 prints, aim for about 2400 pixels. For archival work, follow a digitization target from FADGI or scan at the highest true optical resolution your film scanner can deliver.",
  },
  {
    q: "What's the easiest way to invert and color-correct a digital scan?",
    a: "For occasional rolls, curves in a photo editor is fine. For everyday work, use a purpose-built negative inversion tool that can remove the orange mask, tune exposure and white balance, and export without uploading the image.",
  },
];

export default function DigitizeGuide() {
  return (
    <>
      <JsonLd
        data={buildArticleSchema({
          title,
          description,
          path,
          readTime: "PT8M",
          keywords: [
            "digitize 35mm negatives",
            "scan film negatives",
            "DSLR scanning",
            "flatbed scanner",
            "negative viewer",
          ],
          about: ["film scanning", "35mm negatives", "camera scanning"],
        })}
      />
      <JsonLd data={buildFaqPageSchema({ faqs, path })} />
      <article className="container section">
        <h1>{title}</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Updated {siteConfig.lastUpdatedISO}</span>
          <span>8-minute read</span>
        </p>

        <div className="prose">
          <p>
            <strong>The fastest, cheapest way to digitize 35mm film negatives at
            home is to point your phone camera at the backlit negative through a
            browser-based inverter.</strong> The highest-quality way is to photograph
            it with a mirrorless camera and macro lens. Most people end up using both,
            for different jobs. This guide compares four methods so you can pick the
            right one for your roll.
          </p>

          <div className="toc">
            <h2>In this guide</h2>
            <ol>
              <li><a href="#decision">Quick decision table</a></li>
              <li><a href="#m1">Method 1 — Browser viewer (free, fastest)</a></li>
              <li><a href="#m2">Method 2 — Phone photo + invert (free, better quality)</a></li>
              <li><a href="#m3">Method 3 — DSLR / mirrorless "scanning" (best quality)</a></li>
              <li><a href="#m4">Method 4 — Flatbed scanner (best for batches)</a></li>
              <li><a href="#tips">General tips that apply to every method</a></li>
              <li><a href="#faq">Frequently asked questions</a></li>
            </ol>
          </div>

          <h2 id="decision">Quick decision table</h2>
          <table>
            <thead>
              <tr>
                <th>Goal</th>
                <th>Recommended method</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>"I just want to see what's on these old negatives."</td>
                <td>Browser viewer</td>
                <td>Free, real-time, zero setup</td>
              </tr>
              <tr>
                <td>"I want shareable JPEGs of family photos."</td>
                <td>Phone photo + invert</td>
                <td>Good enough for screens; one tap per frame</td>
              </tr>
              <tr>
                <td>"I want archival-grade scans of a great roll."</td>
                <td>DSLR / mirrorless scanning</td>
                <td>24+ MP, full RAW control, fastest per-frame for quality</td>
              </tr>
              <tr>
                <td>"I have hundreds of negatives to get through."</td>
                <td>Flatbed scanner</td>
                <td>Batch holder, walk-away workflow</td>
              </tr>
              <tr>
                <td>"I have 6×6 medium-format frames."</td>
                <td>Flatbed or DSLR</td>
                <td>The bigger frame demands more resolution per frame</td>
              </tr>
            </tbody>
          </table>

          <h2 id="m1">Method 1 — Browser viewer (free, fastest)</h2>
          <p>
            <strong>Cost: $0. Time per frame: real-time. Quality: viewing only.</strong>
          </p>
          <p>
            Use a browser-based negative viewer like{" "}
            <Link href="/">Negative Viewer</Link>. Hold the negative against any
            even backlight (a second phone showing a white image works perfectly),
            grant camera permission, and the page inverts your camera feed live. Tap
            "Save photo" to download the current frame as a PNG.
          </p>
          <p>
            <strong>What you need:</strong> a phone or laptop with a working camera
            and a backlight. That's it.
          </p>
          <p>
            <strong>Strengths:</strong> instant; nothing to install; no upload, so
            it works for sensitive personal images; pairs well with sliding a strip
            across the backlight to triage 36 frames in a minute.
          </p>
          <p>
            <strong>Limits:</strong> not high-resolution enough to print large; the
            color is approximate (faithful inversion, but the orange mask leaves a
            slight blue cast that you'd correct later).
          </p>

          <h2 id="m2">Method 2 — Phone photo + invert in an editor (free, better quality)</h2>
          <p>
            <strong>Cost: $0. Time per frame: ~30 seconds. Quality: good for
            screens.</strong>
          </p>
          <p>
            Take a still photo of the backlit negative with your phone, then invert
            it in a free editor like Snapseed, Lightroom Mobile, GIMP, or Photoshop
            Express. Apple Photos is useful for crop and exposure after the inversion,
            but it is not the cleanest place to do the initial negative-to-positive
            conversion.
          </p>
          <p>
            <strong>How to invert in a few common apps:</strong>
          </p>
          <ul>
            <li>
              <strong>Snapseed (free):</strong> Tools → Curves → drag the white point
              to the bottom-left corner and the black point to the top-right.
            </li>
            <li>
              <strong>Lightroom Mobile (free tier):</strong> Light → Curves → flip the
              endpoints. Then drop temperature and tint to fight the orange mask.
            </li>
            <li>
              <strong>Photoshop / GIMP (desktop):</strong> Image → Adjustments →
              Invert (Cmd/Ctrl + I).
            </li>
          </ul>
          <p>
            <strong>Strengths:</strong> better resolution and dynamic range than a
            live video frame; you can edit further (crop, dust removal, color).
          </p>
          <p>
            <strong>Limits:</strong> manual per-frame; on color negatives, white
            balance always needs work after the inversion.
          </p>

          <h2 id="m3">Method 3 — DSLR / mirrorless scanning (best quality)</h2>
          <p>
            <strong>Cost: existing gear. Time per frame: ~2 minutes. Quality:
            archival.</strong>
          </p>
          <p>
            "DSLR scanning" means photographing the backlit negative with a digital
            camera. A 24 MP or higher sensor with a true 1:1 macro lens can capture
            enough detail for serious 35mm work, especially when the camera, holder,
            and light source are aligned carefully.
          </p>
          <p>
            <strong>The minimum kit:</strong>
          </p>
          <ul>
            <li>Mirrorless or DSLR camera (any 20+ MP body works)</li>
            <li>Macro lens with 1:1 reproduction (Sigma 70mm 2.8 Art is a popular pick)</li>
            <li>A copy stand <em>or</em> tripod with the camera pointed straight down</li>
            <li>A high-CRI light source (NEEWER 660 RGB or a Kaiser Slimlite are common)</li>
            <li>A film holder (Negative Supply, Lomography DigitaLIZA, or 3D-printed)</li>
            <li>
              Inversion software: free curves in any RAW editor, or our free
              browser tool{" "}
              <a
                href="https://negative-converter.tokugai.com/"
                rel="noopener noreferrer"
              >
                Negative Converter
              </a>{" "}
              for one-click inversion with orange-mask correction
            </li>
          </ul>
          <p>
            <strong>Workflow:</strong> shoot RAW, lock white balance to your light's
            color temperature, expose so the brightest part of the histogram (the
            unexposed film base) sits ~3 stops below clipping. Invert and color
            correct in Lightroom, or drop the JPEG export into{" "}
            <a
              href="https://negative-converter.tokugai.com/"
              rel="noopener noreferrer"
            >
              Negative Converter
            </a>{" "}
            for instant inversion plus orange-mask correction.
          </p>
          <p>
            <strong>Strengths:</strong> highest fidelity; you keep RAW originals
            for future re-edits; handles 35mm through 4×5 by changing the holder.
          </p>
          <p>
            <strong>Limits:</strong> upfront learning curve; color correction is the
            hardest part of the whole hobby.
          </p>

          <h2 id="m4">Method 4 — Flatbed scanner (best for batches)</h2>
          <p>
            <strong>Cost: scanner purchase. Time per frame: ~3 minutes. Quality:
            good for web, softer than a careful camera scan.</strong>
          </p>
          <p>
            An Epson V600-class flatbed with the included film holder is the classic
            batch workflow. Load multiple 35mm frames, run an automatic multi-frame
            scan, and walk away. The scanner driver can invert and correct color,
            giving you ready-to-use JPEGs.
          </p>
          <p>
            <strong>Strengths:</strong> hands-off batch scanning; one device handles
            35mm, 120, and even 4×5; software handles dust removal (Digital ICE)
            for color negatives.
          </p>
          <p>
            <strong>Limits:</strong> per-frame sharpness is lower than DSLR scanning
            — fine for sharing online, soft if you want a 16×20 print; setup is
            slow if you only scan a few frames at a time.
          </p>

          <h2 id="tips">General tips that apply to every method</h2>
          <ul>
            <li>
              <strong>Clean the negative first.</strong> A rocket blower removes 90%
              of dust. A microfiber cloth handles the rest. Compressed-air cans
              sometimes spray propellant droplets — avoid them.
            </li>
            <li>
              <strong>Hold the camera and the negative parallel.</strong> Even small
              tilts cause one corner to go soft. A copy stand fixes this for free.
            </li>
            <li>
              <strong>Use a neutral, even light.</strong> A cheap warm LED can create
              color problems before you even invert the file. A phone or tablet
              screen with a full-white image is a practical free backlight for quick
              previews.
            </li>
            <li>
              <strong>Save TIFF or PNG masters.</strong> JPEG re-saves accumulate
              compression damage. Edit on the master and export JPEGs for sharing.
            </li>
            <li>
              <strong>Color-correct after inverting.</strong> The orange mask on
              color negatives leaves a faint cast on the inverted image. Fix it with
              a quick white-balance adjustment instead of trying to compensate
              upstream.
            </li>
          </ul>

          <h2 id="faq">Frequently asked questions</h2>
          {faqs.map(({ q, a }) => (
            <div className="faq__item" key={q}>
              <h3 className="faq__q">{q}</h3>
              <p className="faq__a">
                {q === "Can I use my phone to scan 35mm negatives?" ? (
                  <>
                    Yes. The two free options are: (1) point your phone at a backlit
                    negative through a browser-based inverter like{" "}
                    <Link href="/">Negative Viewer</Link> for instant viewing, or (2)
                    take a high-resolution still photo of the backlit negative and
                    invert it in Snapseed or Lightroom Mobile for shareable JPEGs.
                  </>
                ) : q ===
                  "What's the easiest way to invert and color-correct a digital scan?" ? (
                  <>
                    For occasional rolls, curves in a photo editor is fine. For
                    everyday work, drop the camera-scan JPEG into{" "}
                    <a
                      href="https://negative-converter.tokugai.com/"
                      rel="noopener noreferrer"
                    >
                      Negative Converter
                    </a>{" "}
                    for orange-mask correction, exposure control, white balance, and
                    local export without uploading your image.
                  </>
                ) : (
                  a
                )}
              </p>
            </div>
          ))}

          <SourceList sources={sources} />
        </div>

        <div className="cta-card">
          <span>Want to start with the free option?</span>
          <Link href="/">Open Negative Viewer →</Link>
        </div>
      </article>
    </>
  );
}
