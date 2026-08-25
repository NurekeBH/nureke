import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

// Статикалық экспорт: билд кезінде бір рет жасалады (ADR-0002b).
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // CRM и персональные ссылки на КП индексировать нельзя.
        // `/_not-found` — служебный маршрут Next: копия страницы 404,
        // которую статический экспорт всё равно кладёт файлом.
        // `/_next/` НЕ закрываем — Google нужны CSS и JS, чтобы отрисовать
        // страницу; без них ранжирование падает.
        disallow: ['/api/', '/crm', '/crm/', '/p/', '/_not-found'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
