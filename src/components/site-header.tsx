'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NAV, SITE, whatsappLink } from '@/content/site';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight" onClick={() => setOpen(false)}>
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-nur shadow-[0_0_16px_4px_rgb(var(--c-nur)/0.45)]" />
          <span>{SITE.name}</span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-body">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            className="btn-primary hidden md:inline-flex"
            href={whatsappLink('Здравствуйте! Хочу обсудить проект.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Обсудить проект
          </a>

          <button
            type="button"
            className="btn-ghost px-3 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Меню</span>
            <span aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Мобильная навигация" className="border-t border-line bg-ink md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-3 text-base text-body hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              className="btn-primary mt-2"
              href={whatsappLink('Здравствуйте! Хочу обсудить проект.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Обсудить проект
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
