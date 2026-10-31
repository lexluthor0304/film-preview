import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NegativeConverterCta from "@/components/NegativeConverterCta";
import SourceList from "@/components/SourceList";
import { getClusterGuide } from "@/lib/cluster-guides";
import { getLocalizedSourceTitle } from "@/lib/guide-seo";
import { getDictionary, localizedPath } from "@/lib/i18n";
import {
  getLocalizedClusterGuide,
  getLocalizedClusterGuideUi,
} from "@/lib/localized-cluster-guides";
import { getPageDates } from "@/lib/page-dates";
import { buildArticleSchema, buildFaqPageSchema } from "@/lib/schema";
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

// Translated long-tail guide; structure mirrors ClusterGuidePage, and sources
// and read time come from the English guide.
export default function LocalizedClusterGuidePage({ locale, path }) {
  const guide = getLocalizedClusterGuide(locale, path);
  const english = getClusterGuide(path);
  const ui = getLocalizedClusterGuideUi(locale);
  const dictionary = getDictionary(locale);
  const dates = getPageDates(path, locale);

  return (
    <>
      <JsonLd
        data={buildArticleSchema({
          title: guide.title,
          description: guide.description,
          path,
          locale,
          readTime: english.readTime,
          keywords: guide.keywords,
          about: guide.about,
          citations: english.sources,
        })}
      />
      <JsonLd data={buildFaqPageSchema({ faqs: guide.faqs, path, locale })} />
      <article className="container section">
        <h1>{guide.title}</h1>
        <p className="meta-row">
          <span>{siteConfig.author.name}</span>
          <span>{dates.modified}</span>
          <span>{guide.displayReadTime}</span>
        </p>

        <figure className="seo-figure">
          <Image
            src="/negative-viewer-before-after.png"
            width={1200}
            height={675}
            alt={ui.figureAlt}
          />
          <figcaption>{ui.figureCaption}</figcaption>
        </figure>

        <div className="prose">
          <p>
            <strong>{guide.lede}</strong>
          </p>

          {guide.converterCta && <NegativeConverterCta {...guide.converterCta} />}

          {guide.sections.map((section) => (
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

          <section id="faq">
            <h2>{dictionary.nav.faq}</h2>
            {guide.faqs.map(({ q, a }) => (
              <div className="faq__item" key={q}>
                <h3 className="faq__q">{q}</h3>
                <p className="faq__a">{a}</p>
              </div>
            ))}
          </section>

          <SourceList
            sources={english.sources}
            title={getLocalizedSourceTitle(locale)}
          />
        </div>

        <div className="cta-card">
          <span>{guide.cta.text}</span>
          <Link href={localizedPath("/", locale)}>{guide.cta.link}</Link>
        </div>
      </article>
    </>
  );
}
