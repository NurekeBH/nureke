'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SITE, whatsappLink } from '@/content/site';
import { path, type Locale } from '@/lib/i18n';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';

type NavItem = { href: string; label: string };
type LangOption = { lang: Locale; short: string; label: string };

export function SiteHeaderNav({
  lang,
  nav,
  labels,
  themeLabels,
  languages,
}: {
  lang: Locale;
  nav: NavItem[];
  labels: { discussProject: string; whatsappGreeting: string; mainNav: string; mobileNav: string; menu: string };
  themeLabels: { auto: string; light: string; dark: string };
  languages: LangOption[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={path(lang)}
          className="flex items-center gap-2 font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-nur shadow-[0_0_16px_4px_rgb(var(--c-nur)/0.45)]" />
          <span>{SITE.name}</span>
        </Link>

        <nav aria-label={labels.mainNav} className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={path(lang, item.href)}
              className="text-sm text-muted transition-colors hover:text-body"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={lang} options={languages} />
          <ThemeToggle labels={themeLabels} />

          <a
            className="btn-primary hidden lg:inline-flex"
            href={whatsappLink(labels.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.discussProject}
          </a>

          <button
            type="button"
            className="btn-ghost px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{labels.menu}</span>
            <span aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={labels.mobileNav} className="border-t border-line bg-ink lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={path(lang, item.href)}
                className="rounded-lg px-2 py-3 text-base text-body hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              className="btn-primary mt-2"
              href={whatsappLink(labels.whatsappGreeting)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels.discussProject}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
