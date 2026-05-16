import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { defaultLocale, getDictionary, localizedPath } from "@/lib/i18n";

export default function SiteHeader({ locale = defaultLocale }) {
  const dictionary = getDictionary(locale);
  const { nav } = dictionary;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href={localizedPath("/", locale)}
          className="site-header__brand"
          aria-label={nav.homeAria}
        >
          <span className="brand-mark" aria-hidden="true">◐</span>
          <span className="brand-name">Negative Viewer</span>
        </Link>
        <nav className="site-nav" aria-label={nav.primaryAria}>
          <Link href={localizedPath("/how-to-use", locale)}>{nav.howToUse}</Link>
          <Link href={localizedPath("/guides/film-negatives", locale)}>
            {nav.guides}
          </Link>
          <Link href={localizedPath("/faq", locale)}>{nav.faq}</Link>
          <Link href={localizedPath("/about", locale)}>{nav.about}</Link>
        </nav>
        <LanguageSwitcher
          currentLocale={locale}
          label={dictionary.languageLabel}
        />
      </div>
    </header>
  );
}
