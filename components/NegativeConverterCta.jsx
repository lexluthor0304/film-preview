import { siteConfig } from "@/lib/site-config";

export default function NegativeConverterCta({ eyebrow, title, text, linkText }) {
  return (
    <aside className="negative-converter-cta" aria-label={title}>
      <div className="negative-converter-cta__copy">
        {eyebrow && <p className="negative-converter-cta__eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <a
        className="btn btn--primary negative-converter-cta__link"
        href={siteConfig.negativeConverterUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    </aside>
  );
}
