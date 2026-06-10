import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NegativeConverterCta from "@/components/NegativeConverterCta";
import { buildFaqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Negative Viewer FAQ — Online Film Negative Conversion Questions Answered",
  description:
    "Answers to common questions about using a browser-based film negative viewer: privacy, supported film formats, color accuracy, browser support, and saving the result.",
  path: "/faq",
  type: "article",
  modifiedTime: `${siteConfig.lastUpdatedISO}T00:00:00Z`,
});

const faqs = [
  {
    q: "What is a film negative viewer?",
    a: "A film negative viewer is a tool that inverts the colors of a film negative so the original photograph becomes visible. Traditional viewers were physical lightboxes plus a magnifying loupe. Online viewers like Negative Viewer use your device camera and a software color inversion to do the same job in real time, so you can see the positive image without a scanner.",
  },
  {
    q: "Is Negative Viewer really free?",
    a: "Yes. The site has been free since launch and stays free. There is no account, no trial, and no per-image fee. Lightweight ads support the hosting cost.",
  },
  {
    q: "Does the site upload my camera feed or photos?",
    a: "No. Every frame is inverted locally in your browser using the HTML Canvas API. The video stream never leaves your device. Saving a photo creates a PNG on your device only — nothing is sent to any server.",
  },
  {
    q: "What film formats does the viewer work with?",
    a: "Any film negative you can light from behind: 35mm color and black-and-white, 120 / medium format (6×4.5, 6×6, 6×7, 6×9), 4×5 and 8×10 sheet film, APS, Disc film, and 110. The viewer just inverts pixels — the format only matters for how big a backlight you need.",
  },
  {
    q: "Will it work with slides or positive film?",
    a: "Slides are already positive, so inverting them produces a negative-looking image. For previewing slides, you don't need this tool — just hold them up to a light. We may add a 'pass-through' mode in a future release.",
  },
  {
    q: "Why does my preview have a blue or cyan cast?",
    a: "Color negative film has an orange base mask that helps with color reproduction during printing. When the image is inverted, that orange becomes a faint blue. This is expected and easy to correct: open the saved PNG in any photo editor, drop the temperature a few hundred kelvin, and adjust tint. Black-and-white negatives have no mask, so they look neutral after inversion.",
  },
  {
    q: "What kind of light should I use behind the negative?",
    a: "Anything bright, white, and even. The best at-home options, in order: another phone or tablet displaying a fully white image at full brightness, a tracing-paper diffuser over a desk lamp, an overcast sky through a window, a dedicated lightbox. Avoid warm yellow LEDs, candles, or screens with low brightness — they add a strong color cast.",
  },
  {
    q: "Why is my camera not starting?",
    a: "Three common causes. (1) You denied camera permission earlier. Click the lock icon in the address bar and re-allow camera access. (2) You opened the link inside an in-app browser like Instagram or WeChat. Open it in Safari or Chrome directly. (3) You're on HTTP. Camera access requires HTTPS — the site is on HTTPS, but a misconfigured proxy can downgrade it.",
  },
  {
    q: "How do I save a photo?",
    a: "Press the Save photo button while the camera is running. Your browser downloads the current preview as a PNG named negative-viewer-<timestamp>.png. On iOS, the file goes to your Downloads (Files app). On Android, to your Downloads folder. On desktop, wherever your browser saves files.",
  },
  {
    q: "Can I batch-process a whole roll?",
    a: "Yes — manually. Lay the roll flat on the backlight, slide it across to bring each frame into view, and press Save photo for each frame. There is no automated batch endpoint because that would require server upload, which we deliberately avoid.",
  },
  {
    q: "Can I process negatives I already photographed or scanned?",
    a: "Yes. Negative Viewer is best for live camera preview. If you already have image files, open Negative Converter to convert saved negatives and export finished positives.",
  },
  {
    q: "How is this different from just using my phone's camera with a Lightroom invert preset?",
    a: "Lightroom or any RAW workflow gives you better final image quality because it works on a high-bit-depth still photo. Negative Viewer is faster — you see the positive while you're still pointing the camera, which is useful for sorting through a stack of unknown negatives or for sharing a quick reference shot. Use both: Negative Viewer to triage, a real workflow for keepers.",
  },
  {
    q: "Does it work on a Chromebook or iPad?",
    a: "Yes, on any Chromebook with a working camera and on any iPad with iPadOS 14+. Both Safari and Chrome on iPadOS support the underlying getUserMedia API.",
  },
  {
    q: "How do I align the negative correctly?",
    a: "Hold the negative emulsion side (the duller surface) facing the camera, and the shiny base side facing the backlight. If you hold it the opposite way, the live preview will look mirrored. Most users figure this out in under ten seconds by trying both orientations.",
  },
  {
    q: "Will adding more features cost money in the future?",
    a: "The core live viewer will always be free. For saved-file orange-mask removal, use Negative Converter. Future viewer features such as perspective correction or frame-by-frame export would be free unless they require server-side processing.",
  },
  {
    q: "I have feedback or a bug to report. Where do I send it?",
    a: "The fastest channel is GitHub: open an issue on the repository linked from the About page. We read every report.",
  },
];

const negativeConverterCta = {
  eyebrow: "Orange-mask removal",
  title: "Already photographed or scanned your negatives?",
  text: "Use Negative Converter when you want to work from image files, remove the orange mask, tune exposure, and export finished positives after this quick preview.",
  linkText: "Open Negative Converter",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={buildFaqPageSchema({ faqs })} />
      <article className="container section">
        <h1>Frequently asked questions</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Last updated {siteConfig.lastUpdatedISO}</span>
        </p>

        <div className="prose" style={{ maxWidth: "72ch" }}>
          <p>
            Everything we hear most often, with direct, no-fluff answers. New to the
            tool? Start with the <Link href="/how-to-use">how-to-use guide</Link>{" "}
            instead.
          </p>
          {faqs.map(({ q, a }) => (
            <div className="faq__item" key={q}>
              <h3 className="faq__q">{q}</h3>
              <p className="faq__a">{a}</p>
            </div>
          ))}
          <NegativeConverterCta {...negativeConverterCta} />
        </div>

        <div className="cta-card">
          <span>Ready to try it?</span>
          <Link href="/">Open the viewer →</Link>
        </div>
      </article>
    </>
  );
}
