import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { localizedPath } from "@/lib/i18n";
import { buildAboutPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export default function LocalizedAboutPage({ locale, content }) {
  return (
    <>
      <JsonLd data={buildAboutPageSchema({ title: content.title, locale })} />
      <article className="container section">
        <h1>{content.title}</h1>
        <p className="meta-row">
          <span>{siteConfig.author.name}</span>
          <span>{siteConfig.lastUpdatedISO}</span>
        </p>

        <div className="prose" style={{ maxWidth: "72ch" }}>
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
