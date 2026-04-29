import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__col">
          <p className="site-footer__brand">{siteConfig.name}</p>
          <p className="site-footer__tagline">
            A free, browser-based tool for previewing film negatives in real time.
          </p>
        </div>
        <div className="site-footer__col">
          <h2>Tool</h2>
          <ul>
            <li><Link href="/">Open viewer</Link></li>
            <li><Link href="/how-to-use">How to use</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h2>Guides</h2>
          <ul>
            <li><Link href="/guides/film-negatives">Film negatives explained</Link></li>
            <li><Link href="/guides/digitize-35mm">Digitize 35mm at home</Link></li>
            <li><Link href="/guides/film-vs-digital">Film vs. digital</Link></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h2>About</h2>
          <ul>
            <li><Link href="/about">About this site</Link></li>
            <li>
              <a href={siteConfig.publisher.url} rel="noopener noreferrer">
                {siteConfig.publisher.name}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__legal">
        © {year} {siteConfig.name}. Built by{" "}
        <a href={siteConfig.author.url} rel="noopener noreferrer">
          {siteConfig.author.name}
        </a>{" "}
        at {siteConfig.publisher.name}.
      </div>
    </footer>
  );
}
