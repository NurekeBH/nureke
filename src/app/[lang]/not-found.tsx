'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { getDictionary } from '@/content';
import { DEFAULT_LOCALE, isLocale, path, type Locale } from '@/lib/i18n';

/**
 * Next `not-found.tsx`-ке `params` бермейді, сондықтан мұнда тілді
 * маршруттан білу мүмкін емес. Оны layout қойып кеткен `<html lang>`
 * атрибутынан оқимыз.
 *
 * Бұл — бет ішінде `notFound()` шақырылғанда көрінетін нұсқа. Ал Apache
 * ешбір файлға сәйкес келмеген сұрауға `out/404.html` береді, ол үш тілде
 * бірдей — келушінің тілі белгісіз болғандықтан (scripts/build-404.mjs).
 */
// Тіл бет жүктелгеннен кейін өзгермейді, сондықтан жазылу — бос функция.
const subscribe = () => () => {};

function readLang(): Locale {
  const attr = document.documentElement.lang;
  return isLocale(attr) ? attr : DEFAULT_LOCALE;
}

// Билд кезінде document жоқ.
const readLangOnServer = (): Locale => DEFAULT_LOCALE;

export default function NotFound() {
  const lang = useSyncExternalStore(subscribe, readLang, readLangOnServer);

  const t = getDictionary(lang).pages.notFound;

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h2 mt-4">{t.title}</h1>
      <p className="lede mt-4 max-w-md">{t.lede}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link className="btn-primary" href={path(lang)}>
          {t.home}
        </Link>
        <Link className="btn-ghost" href={path(lang, '/services')}>
          {t.toServices}
        </Link>
      </div>
    </div>
  );
}
