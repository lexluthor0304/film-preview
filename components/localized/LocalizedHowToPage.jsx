import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NegativeViewer from "@/components/NegativeViewer";
import { getDictionary, localizedPath } from "@/lib/i18n";
import { buildHowToSchema } from "@/lib/schema";
import { getPageDates } from "@/lib/page-dates";
import { siteConfig } from "@/lib/site-config";

export default function LocalizedHowToPage({ locale, content }) {
  const dictionary = getDictionary(locale);
  const dates = getPageDates("/how-to-use");

  return (
    <>
      <JsonLd
        data={buildHowToSchema({
          title: content.title,
          description: content.metaDescription,
          locale,
          steps: content.steps,
        })}
      />
      <article className="container section">
        <h1>{content.title}</h1>
        <p className="meta-row">
          <span>{siteConfig.author.name}</span>
          <span>{dates.modified}</span>
          <span>{content.readTime}</span>
        </p>

        <div className="prose">
          <p>{content.intro}</p>

          <div className="callout">
            <strong>{content.callout.label}</strong> {content.callout.text}
          </div>

          <ol className="steps">
            {content.steps.map((step, index) => (
              <li key={step.name} id={`step-${index + 1}`}>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>

          <h2>{content.tipsTitle}</h2>
          <ul>
            {content.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          <h2>{content.browserTitle}</h2>
          <table>
            <thead>
              <tr>
                {content.browserHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.browserRows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h2>{content.problemsTitle}</h2>
          {content.problems.map((problem) => (
            <section key={problem.title}>
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </section>
          ))}
        </div>

        <h2>{content.tryTitle}</h2>
        <NegativeViewer labels={dictionary.viewer} />

        <div className="cta-card">
          <span>{content.cta.text}</span>
          <Link href={localizedPath("/faq", locale)}>{content.cta.link}</Link>
        </div>
      </article>
    </>
  );
}
