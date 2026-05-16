import Link from "next/link";
import { defaultLocale, getDictionary, localizedPath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter({ locale = defaultLocale }) {
  const year = new Date().getFullYear();
  const { footer } = getDictionary(locale);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__col">
          <p className="site-footer__brand">{siteConfig.name}</p>
          <p className="site-footer__tagline">
            {footer.tagline}
          </p>
        </div>
        <div className="site-footer__col">
          <h2>{footer.tool}</h2>
          <ul>
            <li><Link href={localizedPath("/", locale)}>{footer.openViewer}</Link></li>
            <li><Link href={localizedPath("/how-to-use", locale)}>{footer.howToUse}</Link></li>
            <li><Link href={localizedPath("/faq", locale)}>{footer.faq}</Link></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h2>{footer.guides}</h2>
          <ul>
            <li><Link href={localizedPath("/guides/film-negatives", locale)}>{footer.filmNegatives}</Link></li>
            <li><Link href={localizedPath("/guides/digitize-35mm", locale)}>{footer.digitize35mm}</Link></li>
            <li><Link href={localizedPath("/guides/film-vs-digital", locale)}>{footer.filmVsDigital}</Link></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h2>{footer.about}</h2>
          <ul>
            <li><Link href={localizedPath("/about", locale)}>{footer.aboutSite}</Link></li>
            <li>
              <a href={siteConfig.publisher.url} rel="noopener noreferrer">
                {siteConfig.publisher.name}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__legal">
        © {year} {siteConfig.name}. {footer.builtBy}{" "}
        <a href={siteConfig.author.url} rel="noopener noreferrer">
          {siteConfig.author.name}
        </a>{" "}
        {footer.at} {siteConfig.publisher.name}.
      </div>
    </footer>
  );
}
