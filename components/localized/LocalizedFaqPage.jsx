import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NegativeConverterCta from "@/components/NegativeConverterCta";
import { getDictionary, localizedPath } from "@/lib/i18n";
import { buildFaqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export default function LocalizedFaqPage({ locale, content }) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <JsonLd data={buildFaqPageSchema({ faqs: content.faqs, locale })} />
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
          {content.negativeConverterCta && (
            <NegativeConverterCta {...content.negativeConverterCta} />
          )}
        </div>

        <div className="cta-card">
          <span>{content.ctaText}</span>
          <Link href={localizedPath("/", locale)}>{content.ctaLink}</Link>
        </div>
      </article>
    </>
  );
}
