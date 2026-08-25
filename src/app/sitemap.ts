import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';
import { SERVICES } from '@/content/services';
import { CASES, hasCases } from '@/content/cases';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/services', '/approach', '/pricing', '/contact', ...(hasCases ? ['/cases'] : [])].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const caseRoutes = CASES.map((item) => ({
    url: `${SITE.url}/cases/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseRoutes];
}
