import type { Locale } from '@/lib/i18n';
import type { Dictionary } from './dictionary';
import { ru } from './locales/ru';
import { kk } from './locales/kk';
import { en } from './locales/en';

export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { ru, kk, en };

export const getDictionary = (lang: Locale): Dictionary => DICTIONARIES[lang];

/** Мәзір. «Кейстер» тек жарияланған кейс болғанда ғана шығады. */
export function getNav(lang: Locale, hasCases: boolean) {
  const t = getDictionary(lang);
  return [
    { href: '/services', label: t.nav.services },
    ...(hasCases ? [{ href: '/cases', label: t.nav.cases }] : []),
    { href: '/approach', label: t.nav.approach },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/contact', label: t.nav.contact },
  ];
}

export const getService = (lang: Locale, slug: string) =>
  getDictionary(lang).services.find((service) => service.slug === slug);
