"use client";

import { usePathname } from "next/navigation";
import {
  defaultLocale,
  localeOptions,
  localizedPath,
  stripLocalePrefix,
} from "@/lib/i18n";

export default function LanguageSwitcher({ currentLocale = defaultLocale, label }) {
  const pathname = usePathname() || "/";
  const basePath = stripLocalePrefix(pathname);

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">{label}</span>
      <select
        value={currentLocale}
        onChange={(event) => {
          window.location.href = localizedPath(basePath, event.target.value);
        }}
      >
        {localeOptions.map((locale) => (
          <option value={locale.code} key={locale.code}>
            {locale.label}
          </option>
        ))}
      </select>
    </label>
  );
}
