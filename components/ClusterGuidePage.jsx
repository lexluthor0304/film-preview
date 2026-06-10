import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import NegativeConverterCta from "@/components/NegativeConverterCta";
import SourceList from "@/components/SourceList";
import { buildArticleSchema, buildFaqPageSchema } from "@/lib/schema";
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

export default function ClusterGuidePage({ guide, path }) {
  const dates = getPageDates(path);

  return (
    <>
      <JsonLd
        data={buildArticleSchema({
          title: guide.title,
          description: guide.description,
          path,
          readTime: guide.readTime,
          keywords: guide.keywords,
          about: guide.about,
          citations: guide.sources,
        })}
      />
      <JsonLd data={buildFaqPageSchema({ faqs: guide.faqs, path })} />
      <article className="container section">
        <h1>{guide.title}</h1>
        <p className="meta-row">
          <span>By {siteConfig.author.name}</span>
          <span>Updated {dates.modified}</span>
          <span>{guide.displayReadTime}</span>
        </p>

        <figure className="seo-figure">
          <Image
            src="/negative-viewer-before-after.png"
            width={1200}
            height={675}
            alt="A generated before and after comparison showing a film negative inverted into a positive preview"
          />
          <figcaption>
            Browser preview is best for fast selection; final scans still need a
            higher-resolution capture workflow.
          </figcaption>
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
            <h2>Frequently asked questions</h2>
            {guide.faqs.map(({ q, a }) => (
              <div className="faq__item" key={q}>
                <h3 className="faq__q">{q}</h3>
                <p className="faq__a">{a}</p>
              </div>
            ))}
          </section>

          <SourceList sources={guide.sources} />
        </div>

        <div className="cta-card">
          <span>Want to check a real negative now?</span>
          <Link href="/">Open Negative Viewer</Link>
        </div>
      </article>
    </>
  );
}
