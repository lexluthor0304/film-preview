import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/guides/film-vs-digital";
const title = "Film vs. Digital Photography: A Practical Comparison (2026)";
const description =
  "Film vs. digital photography compared on resolution, dynamic range, cost per frame, archival lifespan, and the so-called film look — with concrete numbers and clear recommendations for each goal.";

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
    logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo512.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${path}` },
  articleSection: "Guides",
  inLanguage: "en",
};

export default function FilmVsDigitalGuide() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="container section">
        <h1>{title}</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Updated {siteConfig.lastUpdatedISO}</span>
          <span>7-minute read</span>
        </p>

        <div className="prose">
          <p>
            <strong>For most working photographers, modern digital cameras outresolve
            35mm film, match or exceed its dynamic range, and cost less per frame
            after the first few hundred shots.</strong> Film still wins on three
            things: archival lifespan of the original, the specific way film grain
            looks, and the discipline of a finite roll. This guide compares both,
            with numbers, so you can decide which one suits the work you're doing.
          </p>

          <div className="toc">
            <h2>In this guide</h2>
            <ol>
              <li><a href="#tldr">Quick verdict by use case</a></li>
              <li><a href="#resolution">Resolution: how much detail each captures</a></li>
              <li><a href="#dr">Dynamic range</a></li>
              <li><a href="#cost">Cost per frame</a></li>
              <li><a href="#archival">Archival lifespan</a></li>
              <li><a href="#look">"The film look" — what it actually is</a></li>
              <li><a href="#workflow">Workflow and turnaround time</a></li>
              <li><a href="#faq">Frequently asked questions</a></li>
            </ol>
          </div>

          <h2 id="tldr">Quick verdict by use case</h2>
          <table>
            <thead>
              <tr>
                <th>Use case</th>
                <th>Better choice</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Daily shooting and learning</td>
                <td>Digital</td>
                <td>Free per frame, instant feedback</td>
              </tr>
              <tr>
                <td>Wedding and event work</td>
                <td>Digital (with film as bonus)</td>
                <td>Reliability and turnaround</td>
              </tr>
              <tr>
                <td>Portrait and editorial portfolio</td>
                <td>Either</td>
                <td>Film for the look; digital for the budget</td>
              </tr>
              <tr>
                <td>Landscape and architecture, large prints</td>
                <td>Medium-format film or high-resolution digital</td>
                <td>Both deliver wall-print quality; film cheaper if you already own a 6×7</td>
              </tr>
              <tr>
                <td>Street photography</td>
                <td>Film (point-and-shoot or rangefinder)</td>
                <td>Discipline and finite roll force better edits</td>
              </tr>
              <tr>
                <td>Long-term family archive</td>
                <td>Film negatives + digital scans</td>
                <td>Negatives last a century; digital backups are easier to share</td>
              </tr>
            </tbody>
          </table>

          <h2 id="resolution">Resolution: how much detail each captures</h2>
          <p>
            "Resolution" in film is fuzzy because it depends on the film stock, the
            scanner, and the lens. The widely-quoted approximations:
          </p>
          <ul>
            <li><strong>35mm color negative (Portra 400, Ektar 100):</strong> ~12–18 megapixels equivalent when scanned at 4000 dpi.</li>
            <li><strong>35mm black-and-white slow film (Acros 100, T-Max 100):</strong> ~18–24 megapixels equivalent.</li>
            <li><strong>120 medium format (6×7):</strong> ~50–80 megapixels equivalent.</li>
            <li><strong>4×5 sheet film:</strong> ~200+ megapixels equivalent.</li>
          </ul>
          <p>
            Modern full-frame digital sensors hit 24, 45, or 61 MP at far lower
            noise. So 35mm film no longer beats digital on raw detail — it loses to
            a $1,500 mirrorless body. Medium and large-format film still hold an
            edge against everything except the most expensive digital backs.
          </p>

          <h2 id="dr">Dynamic range</h2>
          <p>
            Dynamic range is the ratio between the brightest and darkest tones a
            medium can record. Higher = more highlight and shadow detail.
          </p>
          <ul>
            <li><strong>Color negative film:</strong> ~13 stops (one of film's strongest cards — it tolerates overexposure exceptionally well).</li>
            <li><strong>Slide film:</strong> ~5–6 stops (the narrowest of any common medium).</li>
            <li><strong>Black-and-white negative film:</strong> ~10–12 stops.</li>
            <li><strong>Modern full-frame digital sensor:</strong> 13–15 stops at base ISO.</li>
          </ul>
          <p>
            Practical takeaway: digital matches color negative for highlight latitude
            and beats slide film by a wide margin. The myth that film has more
            dynamic range than digital was true in 2008; it isn't in 2026.
          </p>

          <h2 id="cost">Cost per frame</h2>
          <table>
            <thead>
              <tr>
                <th>Medium</th>
                <th>Film + dev + scan, per frame</th>
                <th>Digital, per frame</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>35mm color, lab dev + scan</td>
                <td>$0.80–$1.50</td>
                <td>~$0 (after camera)</td>
              </tr>
              <tr>
                <td>35mm B&W, home dev + DSLR scan</td>
                <td>$0.30–$0.50</td>
                <td>~$0</td>
              </tr>
              <tr>
                <td>120 medium format, lab dev + scan</td>
                <td>$1.50–$3.00</td>
                <td>~$0</td>
              </tr>
              <tr>
                <td>4×5 sheet, home dev</td>
                <td>$3–$6</td>
                <td>~$0</td>
              </tr>
            </tbody>
          </table>
          <p>
            Digital costs are concentrated in the body and lenses; film costs scale
            with how much you shoot. The break-even depends on volume: shoot a roll
            of 36 a week and a digital body pays for itself in 12–18 months.
          </p>

          <h2 id="archival">Archival lifespan</h2>
          <p>
            A properly stored color negative lasts 100+ years. Black-and-white silver
            negatives last several centuries. Digital files can theoretically last
            forever, but only if actively migrated across drives and formats — bit-rot
            and obsolete file formats kill more digital archives than fire kills film
            ones.
          </p>
          <p>
            The realistic strategy for personal archives: keep the negatives, scan
            the keepers to digital, and back the digital up to two locations. That
            gives you the durability of film with the shareability of digital.
          </p>

          <h2 id="look">"The film look" — what it actually is</h2>
          <p>
            What people mean by "film look" is usually a combination of four things:
          </p>
          <ul>
            <li>
              <strong>Highlight roll-off.</strong> Negatives compress bright tones
              gradually instead of clipping. Digital can simulate this in raw
              processing.
            </li>
            <li>
              <strong>Grain that varies with exposure.</strong> Film grain is
              correlated with image content; digital noise is not, and looks more
              uniform.
            </li>
            <li>
              <strong>Color cross-processing.</strong> Each film stock has a unique
              dye response. Kodak Portra renders skin tones differently from Fuji
              Pro 400H. Digital film-emulation profiles get close but rarely identical.
            </li>
            <li>
              <strong>Imperfect lenses.</strong> A 1970s 50mm lens has more vignetting,
              softer edges, and warmer color than a modern equivalent. The look
              attributed to the film is partly the lens.
            </li>
          </ul>
          <p>
            Digital can mimic the first three with the right LUT or RAW preset. The
            fourth requires using a vintage lens — which any modern mirrorless body
            supports cheaply with adapters.
          </p>

          <h2 id="workflow">Workflow and turnaround time</h2>
          <ul>
            <li><strong>Digital:</strong> shoot, import to Lightroom, edit, export. Same day.</li>
            <li><strong>Film, lab-developed:</strong> shoot, mail or drop off the roll, wait 3–10 days for scans, edit, export.</li>
            <li><strong>Film, home-developed:</strong> shoot, develop (~30–60 min), dry (1–2 hours), scan or photograph each frame (~1 minute on a flatbed, ~15 seconds with{" "}
              <Link href="/">Negative Viewer</Link> for triage), edit, export.</li>
          </ul>

          <h2 id="faq">Frequently asked questions</h2>
          <div className="faq__item">
            <h3 className="faq__q">Is film photography making a comeback?</h3>
            <p className="faq__a">
              Yes — film sales rose every year from 2018 through the early 2020s,
              and Kodak reintroduced Ektachrome and Gold 200 in 120 format on the
              back of that demand. The community is small but stable, with active
              labs in most large cities and a healthy used-camera market.
            </p>
          </div>
          <div className="faq__item">
            <h3 className="faq__q">Is film photography really more expensive than digital?</h3>
            <p className="faq__a">
              Long-term, yes. A digital body that you'll use for a decade costs
              $1,000–$2,000 once. The same money buys 700–1,400 35mm rolls (about
              25,000–50,000 frames). If you shoot more than that across the body's
              lifetime, digital is cheaper per frame.
            </p>
          </div>
          <div className="faq__item">
            <h3 className="faq__q">Why do photographers still shoot film?</h3>
            <p className="faq__a">
              Three common reasons: the look is hard to replicate exactly, the
              process forces slower and more deliberate shooting, and a finite roll
              of 36 frames is its own creative constraint. None of these is about
              the file being technically better.
            </p>
          </div>
          <div className="faq__item">
            <h3 className="faq__q">Can I shoot film and still preview shots quickly?</h3>
            <p className="faq__a">
              Yes — that's exactly what tools like{" "}
              <Link href="/">Negative Viewer</Link> are for. After developing, you
              hold the negative against any backlight and the browser inverts it in
              real time, so you can sort and pick keepers before sitting down at a
              full scanner.
            </p>
          </div>
        </div>

        <div className="cta-card">
          <span>Shooting film? Preview rolls in your browser:</span>
          <Link href="/">Open Negative Viewer →</Link>
        </div>
      </article>
    </>
  );
}
