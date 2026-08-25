import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { getDictionary } from '@/content';
import { alternates, isLocale, localeParams, path } from '@/lib/i18n';

export const revalidate = 3600;

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = getDictionary(lang).pages.services;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: path(lang, '/services'), languages: alternates('/services') },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <Section
      eyebrow={t.nav.services}
      title={t.pages.services.title}
      titleAs="h1"
      lede={t.pages.services.lede}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {t.services.map((service) => (
          <Link
            key={service.slug}
            href={path(lang, `/services/${service.slug}`)}
            className="card group flex flex-col transition-colors hover:border-nur"
          >
            <h2 className="h3 group-hover:text-nur">{service.navTitle}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{service.promise}</p>
            <dl className="mt-6 flex items-end justify-between border-t border-line pt-4">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">{t.common.price}</dt>
                <dd className="mt-1 font-semibold text-nur">{service.priceFrom}</dd>
              </div>
              <div className="text-right">
                <dt className="text-xs uppercase tracking-widest text-muted">{t.common.duration}</dt>
                <dd className="mt-1 font-semibold">{service.duration}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </Section>
  );
}
