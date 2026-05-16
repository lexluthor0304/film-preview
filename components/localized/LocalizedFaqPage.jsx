import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getDictionary, localizedPath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export default function LocalizedFaqPage({ locale, content }) {
  const dictionary = getDictionary(locale);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: dictionary.htmlLang,
    mainEntity: content.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <article className="container section">
        <h1>{content.title}</h1>
        <p className="meta-row">
          <span>{siteConfig.author.name}</span>
          <span>{siteConfig.lastUpdatedISO}</span>
        </p>

        <div className="prose" style={{ maxWidth: "72ch" }}>
          <p>
            {content.intro}{" "}
            <Link href={localizedPath("/how-to-use", locale)}>
              {dictionary.nav.howToUse}
            </Link>
            .
          </p>
          {content.faqs.map(({ q, a }) => (
            <div className="faq__item" key={q}>
              <h3 className="faq__q">{q}</h3>
              <p className="faq__a">{a}</p>
            </div>
          ))}
        </div>

        <div className="cta-card">
          <span>{content.ctaText}</span>
          <Link href={localizedPath("/", locale)}>{content.ctaLink}</Link>
        </div>
      </article>
    </>
  );
}
