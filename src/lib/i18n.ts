/**
 * ТІЛДЕР.
 *
 * Барлық бет `/{lang}/...` түрінде тұрады: `/ru`, `/kk`, `/en`.
 * Түбір `/` — бос, оны `.htaccess` браузердің тіліне қарай бағыттайды
 * (сервер жағында, JS-сіз, жыпылықсыз).
 *
 * Неге орысша да префикспен: сайт әлі жарияланбаған, сондықтан ескі
 * URL-дарды сақтау міндеті жоқ. Ал үшеуі бірдей құрылымда болса, код та,
 * hreflang та, sitemap та қарапайым болады.
 */
export const LOCALES = ['ru', 'kk', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

/** Тілі белгісіз келушіге осы беріледі (бизнестің негізгі тілі). */
export const DEFAULT_LOCALE: Locale = 'ru';

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** Әр маршрут үш тілде де жасалады. */
export const localeParams = () => LOCALES.map((lang) => ({ lang }));

/**
 * Ішкі сілтеме. Барлық href осы арқылы өтуі керек — әйтпесе қазақша беттен
 * басып, орысша бетке түсіп қаласың.
 */
export const path = (lang: Locale, to = '/') => (to === '/' ? `/${lang}` : `/${lang}${to}`);

/**
 * hreflang: іздеу жүйесіне бір беттің басқа тілдегі нұсқаларын көрсетеді.
 * `x-default` — тілі сәйкес келмегендерге қайсысын беру керек.
 */
export function alternates(to = '/') {
  const languages: Record<string, string> = {};
  for (const lang of LOCALES) languages[lang] = path(lang, to);
  languages['x-default'] = path(DEFAULT_LOCALE, to);
  return languages;
}
