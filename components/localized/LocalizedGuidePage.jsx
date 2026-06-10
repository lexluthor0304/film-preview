import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SourceList from "@/components/SourceList";
import { getDictionary, localizedPath } from "@/lib/i18n";
import {
  buildArticleSchema,
  buildFaqPageSchema,
  guideCitations,
} from "@/lib/schema";
import {
  getGuideSeo,
  getLocalizedGuideFaqs,
  getLocalizedSourceTitle,
} from "@/lib/guide-seo";
import { getPageDates } from "@/lib/page-dates";
import { siteConfig } from "@/lib/site-config";

function ContentTable({ table }) {
  return (
    <table>
      <thead>
        <tr>
          {table.headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row.join("-")}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function LocalizedGuidePage({ locale, content, path }) {
  const dictionary = getDictionary(locale);
  const guideSeo = getGuideSeo(path);
  const faqs = getLocalizedGuideFaqs(path, locale);
  const sources = guideCitations[path] || [];
  const dates = getPageDates(path);

  return (
    <>
      <JsonLd
        data={buildArticleSchema({
          title: content.title,
          description: content.metaDescription,
          path,
          locale,
          readTime: guideSeo.schemaReadTime,
          keywords: guideSeo.keywords,
          about: guideSeo.about,
        })}
      />
      {faqs.length > 0 && (
        <JsonLd data={buildFaqPageSchema({ faqs, path, locale })} />
      )}
      <article className="container section">
        <h1>{content.title}</h1>
        <p className="meta-row">
          <span>{siteConfig.author.name}</span>
          <span>{dates.modified}</span>
          <span>{content.readTime}</span>
        </p>

        <div className="prose">
          <p>
            <strong>{content.intro}</strong>
          </p>

          {content.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.table && <ContentTable table={section.table} />}
            </section>
          ))}

          {faqs.length > 0 && (
            <section id="faq">
              <h2>{dictionary.nav.faq}</h2>
              {faqs.map(({ q, a }) => (
                <div className="faq__item" key={q}>
                  <h3 className="faq__q">{q}</h3>
                  <p className="faq__a">{a}</p>
                </div>
              ))}
            </section>
          )}

          <SourceList
            sources={sources}
            title={getLocalizedSourceTitle(locale)}
          />
        </div>

        <div className="cta-card">
          <span>{content.cta.text}</span>
          <Link href={localizedPath("/", locale)}>{content.cta.link}</Link>
        </div>
      </article>
    </>
  );
}
