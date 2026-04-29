import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="Negative Viewer home">
          <span className="brand-mark" aria-hidden="true">◐</span>
          <span className="brand-name">Negative Viewer</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link href="/how-to-use">How to use</Link>
          <Link href="/guides/film-negatives">Guides</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
