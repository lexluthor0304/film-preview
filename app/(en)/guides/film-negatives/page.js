import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/guides/film-negatives";
const title =
  "Film Negatives Explained: How They Work, How to Read Them, and How to View Them";
const description =
  "A practical guide to film negatives: what makes them look orange, how to identify 35mm vs 120 vs sheet film, how to read a strip with the naked eye, and the cheapest ways to convert negatives into positive images.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  modifiedTime: `${siteConfig.lastUpdatedISO}T00:00:00Z`,
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-04-29",
  dateModified: `${siteConfig.lastUpdatedISO}T00:00:00Z`,
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.publisher.name,
    url: siteConfig.publisher.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo512.png`,
    },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${path}` },
  articleSection: "Guides",
  inLanguage: "en",
};

export default function FilmNegativesGuide() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="container section">
        <h1>{title}</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Updated {siteConfig.lastUpdatedISO}</span>
          <span>9-minute read</span>
        </p>

        <div className="prose">
          <p>
            <strong>A film negative is a piece of transparent plastic that stores a
            photograph as the inverse of the scene it captured.</strong> What was
            bright in real life is dark on the film, what was dark is transparent,
            and the colors are flipped to their complements. To recover the actual
            image, every pixel has to be inverted — which is exactly what scanners,
            darkroom enlargers, and tools like{" "}
            <Link href="/">the Negative Viewer web app</Link> do.
          </p>

          <div className="toc">
            <h2>In this guide</h2>
            <ol>
              <li><a href="#what">What a film negative actually is</a></li>
              <li><a href="#orange">Why color negatives look orange</a></li>
              <li><a href="#types">Types of film negatives at a glance</a></li>
              <li><a href="#read">How to read a negative with the naked eye</a></li>
              <li><a href="#identify">How to identify what film a negative was shot on</a></li>
              <li><a href="#view">Cheapest ways to view a negative as a positive</a></li>
              <li><a href="#archive">How to store negatives safely</a></li>
              <li><a href="#faq">Frequently asked questions</a></li>
            </ol>
          </div>

          <h2 id="what">What a film negative actually is</h2>
          <p>
            A negative is a layered emulsion of light-sensitive silver-halide
            crystals, suspended in gelatin, coated onto a flexible plastic base
            (cellulose acetate today; cellulose nitrate before about 1950). When
            light hits the emulsion during exposure, it forms a latent image. Wet
            chemistry then converts that latent image into a stable pattern: in
            black-and-white film, dark metallic silver where the scene was bright;
            in color film, three layered dyes (cyan, magenta, yellow) where the
            scene had its complementary color.
          </p>
          <p>
            The result is an inverted image that, under transmitted light, looks
            like a photographic ghost: shadows are clear, highlights are opaque, and
            colors are swapped. This inversion is not a problem — it's a feature.
            Negatives are the master copy. Each negative can be projected through an
            enlarger or scanned to make many positive prints, with full control over
            cropping, contrast, and color.
          </p>

          <h2 id="orange">Why color negatives look orange</h2>
          <p>
            Hold up a roll of color negative film and you'll see two things: the
            inverted image, and a strong orange-amber base color. That orange is the{" "}
            <strong>color mask</strong>, an integral part of how color negative film
            reproduces accurate colors when printed. The mask compensates for the
            fact that the cyan and magenta dyes in the film aren't perfectly pure —
            they leak unwanted absorption that, without correction, would shift the
            print toward muddiness.
          </p>
          <p>
            Three practical consequences of the orange mask:
          </p>
          <ul>
            <li>
              When you invert a color negative in software, the inverted image looks
              slightly <em>blue-cyan</em>. That's the inverted orange mask, and it's
              normal.
            </li>
            <li>
              Black-and-white negatives have no mask, so they look like a clean
              gray-on-clear image and invert to a faithful black-and-white positive.
            </li>
            <li>
              Slide film (positive transparency film, e.g. Velvia, Provia, Ektachrome)
              has no orange mask either, because it produces the final image directly
              and does not need the masking trick.
            </li>
          </ul>

          <h2 id="types">Types of film negatives at a glance</h2>
          <table>
            <thead>
              <tr>
                <th>Format</th>
                <th>Frame size (mm)</th>
                <th>Frames per roll</th>
                <th>Common uses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>35mm (135)</td>
                <td>24 × 36</td>
                <td>24 or 36</td>
                <td>Most consumer cameras 1950–2010, modern hobbyists</td>
              </tr>
              <tr>
                <td>120 / medium format</td>
                <td>60 × 45 to 60 × 90</td>
                <td>8–16</td>
                <td>Pro studios, weddings, fine-art photography</td>
              </tr>
              <tr>
                <td>4×5 sheet film</td>
                <td>102 × 127</td>
                <td>1 per sheet</td>
                <td>Large-format landscape and architecture</td>
              </tr>
              <tr>
                <td>APS</td>
                <td>16.7 × 30.2</td>
                <td>15, 25, or 40</td>
                <td>Late-1990s consumer cameras</td>
              </tr>
              <tr>
                <td>110</td>
                <td>13 × 17</td>
                <td>12 or 24</td>
                <td>Pocket cameras 1972–early 2000s</td>
              </tr>
            </tbody>
          </table>
          <p>
            All five formats invert the same way and look identical to{" "}
            <Link href="/">Negative Viewer</Link>. The only difference is how big a
            backlight you need to fit the frame in your camera's view.
          </p>

          <h2 id="read">How to read a negative with the naked eye</h2>
          <p>
            With practice you can read a negative directly, without inverting it.
            Three rules of thumb:
          </p>
          <ol>
            <li>
              <strong>Dark on the film = bright in the scene.</strong> Faces show up
              as dark blobs, sky as opaque area, lamps as the densest spots on the
              negative.
            </li>
            <li>
              <strong>Color hue = complementary.</strong> Red sweater becomes cyan on
              the negative, green grass becomes magenta, blue sky becomes yellow.
              Skin tones turn a teal-green color.
            </li>
            <li>
              <strong>Contrast = compressed.</strong> A well-exposed negative looks
              less contrasty than the final print would. If a negative looks
              <em> very</em> dense and contrasty, it was probably overexposed; if it
              looks thin and pale, it was underexposed.
            </li>
          </ol>

          <h2 id="identify">How to identify what film a negative was shot on</h2>
          <p>
            Edge markings on the side of every roll record the manufacturer, film
            stock, and frame number. Common examples:
          </p>
          <ul>
            <li><strong>Kodak Gold 200, Ultramax 400, Portra 400/800, Ektar 100</strong> — orange-masked color negatives</li>
            <li><strong>Fujifilm Superia 200/400, Pro 400H</strong> — color negative with a slightly different mask tone</li>
            <li><strong>Ilford HP5 Plus 400, Delta 100, FP4 Plus, XP2</strong> — black-and-white</li>
            <li><strong>Kodak Tri-X 400, T-Max 100/400</strong> — black-and-white</li>
            <li><strong>Kodachrome, Ektachrome, Velvia, Provia</strong> — slide / positive film, not negatives</li>
          </ul>
          <p>
            The frame numbers run sequentially, so a strip with "1, 1A, 2, 2A …"
            tells you which exposure each frame is in the roll.
          </p>

          <h2 id="view">Cheapest ways to view a negative as a positive</h2>
          <p>
            You don't need a film scanner. Ranked by setup cost, from free to most
            expensive:
          </p>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Cost</th>
                <th>Speed per frame</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Browser tool like <Link href="/">Negative Viewer</Link> + phone
                  screen as backlight
                </td>
                <td>Free</td>
                <td>Real-time</td>
                <td>Triage, sharing, casual viewing</td>
              </tr>
              <tr>
                <td>Phone photo + invert in editor (Photos, Lightroom Mobile)</td>
                <td>Free</td>
                <td>~30 seconds</td>
                <td>Better quality stills, quick edits</td>
              </tr>
              <tr>
                <td>Mirrorless or DSLR + macro lens + lightbox ("DSLR scanning")</td>
                <td>Existing camera</td>
                <td>~2 minutes</td>
                <td>High-resolution archival work</td>
              </tr>
              <tr>
                <td>Flatbed scanner with film holder (Epson V550/V600)</td>
                <td>$250–$400</td>
                <td>~3 minutes</td>
                <td>Medium-format, slides, batches</td>
              </tr>
              <tr>
                <td>Dedicated film scanner (Plustek 8200, Pakon F135)</td>
                <td>$500+</td>
                <td>~30 seconds</td>
                <td>Highest 35mm scan quality</td>
              </tr>
            </tbody>
          </table>
          <p>
            For most people sorting through inherited family negatives, the first or
            second option is enough. See our practical comparison in{" "}
            <Link href="/guides/digitize-35mm">how to digitize 35mm at home</Link>.
          </p>

          <h2 id="archive">How to store negatives safely</h2>
          <p>
            Properly stored, color and B&W negatives last 50–100+ years. Three rules:
          </p>
          <ul>
            <li>
              <strong>Cool, dry, dark.</strong> Aim for under 21°C and under 50%
              relative humidity. Avoid attics and basements.
            </li>
            <li>
              <strong>Use archival sleeves.</strong> Polyethylene, polypropylene, or
              uncoated polyester sleeves are safe; PVC degrades and damages film.
            </li>
            <li>
              <strong>Don't touch the emulsion.</strong> Hold strips by the edges.
              Fingerprints leave acid that etches the gelatin over time.
            </li>
          </ul>

          <h2 id="faq">Frequently asked questions</h2>
          <div className="faq__item">
            <h3 className="faq__q">Are old negatives still readable?</h3>
            <p className="faq__a">
              Almost always. Even color negatives from the 1970s, often stored
              poorly, retain enough information to be inverted and color-corrected.
              The main failure mode is mold, which appears as fuzzy gray growth on
              the emulsion side and is difficult to clean.
            </p>
          </div>
          <div className="faq__item">
            <h3 className="faq__q">Can I just hold a negative up to a window and read it?</h3>
            <p className="faq__a">
              You can identify subjects and check exposure that way. To see the
              actual image as a positive, you need a software inversion. The fastest
              free option is{" "}
              <Link href="/">Negative Viewer</Link> in your browser.
            </p>
          </div>
          <div className="faq__item">
            <h3 className="faq__q">What is the difference between a negative and a slide?</h3>
            <p className="faq__a">
              A slide (or transparency) is positive film: held up to light, you see
              the photograph directly. A negative is inverted and needs to be
              processed to view. Slides were historically projected for viewing;
              negatives were printed.
            </p>
          </div>
          <div className="faq__item">
            <h3 className="faq__q">Why do my old negatives have a magenta or red tint?</h3>
            <p className="faq__a">
              Color negative film fades over time, especially the cyan dye, leaving a
              magenta cast. Cool, dark storage slows this dramatically. After
              digitizing, you can correct most age-related color shifts in any photo
              editor.
            </p>
          </div>
        </div>

        <div className="cta-card">
          <span>Try it on your own negatives:</span>
          <Link href="/">Open the viewer →</Link>
        </div>
      </article>
    </>
  );
}
