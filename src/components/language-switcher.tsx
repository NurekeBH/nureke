'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, isLocale, type Locale } from '@/lib/i18n';

type Option = { lang: Locale; short: string; label: string };

/**
 * Тілді ауыстырғанда келуші ТУРА СОЛ бетте қалуы керек, басты бетке
 * лақтырылмауы керек. Сондықтан ағымдағы жолдағы бірінші сегмент
 * (тіл коды) ғана ауыстырылады: /kk/pricing → /en/pricing.
 */
function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join('/')}`;
  }
  return `/${next}`;
}

export function LanguageSwitcher({ current, options }: { current: Locale; options: Option[] }) {
  const pathname = usePathname() ?? `/${current}`;

  return (
    <div className="flex items-center rounded-xl border border-line p-0.5">
      {LOCALES.map((lang) => {
        const option = options.find((item) => item.lang === lang);
        if (!option) return null;
        const active = lang === current;

        return (
          <Link
            key={lang}
            href={swapLocale(pathname, lang)}
            hrefLang={lang}
            aria-current={active ? 'true' : undefined}
            title={option.label}
            className={`rounded-[10px] px-2 py-1.5 text-xs font-semibold transition-colors ${
              active ? 'bg-nur text-on-nur' : 'text-muted hover:text-body'
            }`}
          >
            {option.short}
          </Link>
        );
      })}
    </div>
  );
}
