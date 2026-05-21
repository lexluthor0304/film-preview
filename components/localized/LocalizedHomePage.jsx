import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NegativeViewer from "@/components/NegativeViewer";
import { getDictionary, localizedPath } from "@/lib/i18n";
import {
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
} from "@/lib/schema";

export default function LocalizedHomePage({ locale, content }) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={buildSoftwareApplicationSchema({
          path: "/",
          locale,
          description: content.metaDescription,
          featureList: content.features.map((feature) => feature.title),
        })}
      />
      <JsonLd data={buildFaqPageSchema({ faqs: content.faqs, path: "/", locale })} />

      <section className="hero container">
        <p className="hero__eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <NegativeViewer labels={dictionary.viewer} />
        <p className="hero__lede">{content.lede}</p>
        <p className="hero__after-lede">
          {content.afterLede.before}
          <Link href={localizedPath("/how-to-use", locale)}>
            {content.afterLede.guide}
          </Link>
          {content.afterLede.middle}
          <Link href={localizedPath("/faq", locale)}>{content.afterLede.faq}</Link>
          {content.afterLede.after}
        </p>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2>{content.whatTitle}</h2>
          <div className="prose">
            {content.whatParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{content.reasonsTitle}</h2>
          <div className="feature-grid">
            {content.features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2>{content.stepsTitle}</h2>
          <ol className="steps prose" style={{ maxWidth: "72ch" }}>
            {content.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p>
            {content.deeperGuide.before}
            <Link href={localizedPath("/how-to-use", locale)}>
              {content.deeperGuide.link}
            </Link>
            {content.deeperGuide.after}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{content.faqTitle}</h2>
          <div className="prose" style={{ maxWidth: "72ch" }}>
            {content.faqs.map(({ q, a }) => (
              <div className="faq__item" key={q}>
                <h3 className="faq__q">{q}</h3>
                <p className="faq__a">{a}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.25rem" }}>
            {content.moreFaq.before}
            <Link href={localizedPath("/faq", locale)}>{content.moreFaq.link}</Link>
            {content.moreFaq.after}
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2>{content.readNextTitle}</h2>
          <div className="feature-grid">
            {content.readNext.map((card) => (
              <div className="feature-card" key={card.href}>
                <h3>
                  <Link href={localizedPath(card.href, locale)}>{card.title}</Link>
                </h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
