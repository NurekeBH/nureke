import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';
import { getDictionary } from '@/content';
import { getIndexableCases } from '@/content/cases';
import { LOCALES, alternates, path } from '@/lib/i18n';

// Статикалық экспорт: билд кезінде бір рет жасалады (ADR-0002b).
export const dynamic = 'force-static';

/**
 * Әр бет үш тілде де тұрады, әрі әрқайсысы `alternates` арқылы бір-біріне
 * сілтейді — сонда іздеу жүйесі оларды бөлек сайт емес, бір беттің үш
 * нұсқасы деп түсінеді.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    const t = getDictionary(lang);

    const routes: { to: string; priority: number }[] = [
      { to: '/', priority: 1 },
      { to: '/services', priority: 0.9 },
      { to: '/approach', priority: 0.8 },
      { to: '/pricing', priority: 0.8 },
      { to: '/contact', priority: 0.7 },
      ...t.services.map((service) => ({ to: `/services/${service.slug}`, priority: 0.9 })),
      // Дайындама кейстер sitemap-қа ЕШҚАШАН кірмейді (ADR-0003).
      ...getIndexableCases(lang).map((item) => ({ to: `/cases/${item.slug}`, priority: 0.8 })),
    ];

    if (getIndexableCases(lang).length > 0) {
      routes.push({ to: '/cases', priority: 0.8 });
    }

    for (const route of routes) {
      entries.push({
        url: `${SITE.url}${path(lang, route.to)}`,
        priority: route.priority,
        changeFrequency: 'monthly',
        alternates: {
          languages: Object.fromEntries(
            Object.entries(alternates(route.to)).map(([code, href]) => [code, `${SITE.url}${href}`]),
          ),
        },
      });
    }
  }

  return entries;
}
