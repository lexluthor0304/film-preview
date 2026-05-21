import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { localizedPath } from "@/lib/i18n";
import { buildArticleSchema } from "@/lib/schema";
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
  return (
    <>
      <JsonLd
        data={buildArticleSchema({
          title: content.title,
          description: content.metaDescription,
          path,
          locale,
          readTime: content.readTime,
        })}
      />
      <article className="container section">
        <h1>{content.title}</h1>
        <p className="meta-row">
          <span>{siteConfig.author.name}</span>
          <span>{siteConfig.lastUpdatedISO}</span>
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
        </div>

        <div className="cta-card">
          <span>{content.cta.text}</span>
          <Link href={localizedPath("/", locale)}>{content.cta.link}</Link>
        </div>
      </article>
    </>
  );
}
