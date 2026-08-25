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
        disallow: ['/api/', '/crm', '/crm/', '/p/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
