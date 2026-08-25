import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { Faq } from '@/components/faq';
import { LeadForm } from '@/components/lead-form';
import { SITE, whatsappLink } from '@/content/site';
import { getDictionary, getService } from '@/content';
import { LOCALES, alternates, isLocale, path } from '@/lib/i18n';

export const revalidate = 3600;

// Статикалық экспорт: тек осы тізімдегі slug-тар бар, қалғаны 404.
export const dynamicParams = false;

/** Формада тапсырма түрін алдын ала таңдап қоямыз — клиент қолмен іздемесін. */
const FORM_DEFAULTS: Record<string, string> = {
  'ai-automation': 'AI_AUTOMATION',
  'mobile-development': 'MOBILE',
  'telegram-miniapp': 'MINIAPP',
};

export function generateStaticParams() {
  // slug-тар үш тілде де бірдей: URL аударылмайды, тек мазмұн аударылады.
  return LOCALES.flatMap((lang) =>
    getDictionary(lang).services.map((service) => ({ lang, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const service = getService(lang, slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: path(lang, `/services/${service.slug}`),
      languages: alternates(`/services/${service.slug}`),
    },
    openGraph: { title: service.seoTitle, description: service.seoDescription },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const service = getService(lang, slug);
  if (!service) notFound();

  const t = getDictionary(lang);
  const s = t.pages.service;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KZT',
      description: `${s.priceFrom} ${service.priceFrom}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="border-b border-line">
        <div className="container-page py-16 sm:py-20">
          <nav aria-label={t.a11y.breadcrumbs} className="text-sm text-muted">
            <Link href={path(lang, '/services')} className="hover:text-body">
              {t.nav.services}
            </Link>
            <span aria-hidden> / </span>
            <span className="text-body">{service.navTitle}</span>
          </nav>
          <h1 className="h1 mt-6 max-w-4xl">{service.title}</h1>
          <p className="lede mt-6 max-w-2xl">{service.promise}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">{t.common.price}</p>
              <p className="mt-1 text-xl font-bold text-nur">{service.priceFrom}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">{s.launchTime}</p>
              <p className="mt-1 text-xl font-bold">{service.duration}</p>
            </div>
            <a
              className="btn-primary"
              href={whatsappLink(`${s.whatsappInterest} ${service.navTitle}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.discussWhatsapp}
            </a>
          </div>
        </div>
      </section>

      <Section eyebrow={s.fitFor.eyebrow} title={s.fitFor.title}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.fitFor.map((item) => (
            <li key={item} className="card flex gap-3">
              <span aria-hidden className="text-nur">
                ✓
              </span>
              <span className="leading-relaxed text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow={s.cost.eyebrow} title={service.cost.problem}>
        <div className="card border-nur/40">
          <p className="text-lg leading-relaxed">{service.cost.math}</p>
        </div>
      </Section>

      <Section eyebrow={s.scope.eyebrow} title={s.scope.title}>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card">
            <h3 className="h3">{s.scope.included}</h3>
            <ul className="mt-4 space-y-3 text-muted">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="text-nur">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="h3">{s.scope.notIncluded}</h3>
            <p className="mt-2 text-sm text-muted">{s.scope.notIncludedNote}</p>
            <ul className="mt-4 space-y-3 text-muted">
              {service.notIncluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="text-muted">
                    —
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow={s.timeline.eyebrow} title={s.timeline.title}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.timeline.map((item) => (
            <li key={item.week} className="card">
              <p className="text-sm font-bold text-nur">{item.week}</p>
              <p className="mt-2 leading-relaxed text-muted">{item.work}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow={s.packages.eyebrow} title={s.packages.title}>
        <div className="grid gap-5 lg:grid-cols-3">
          {service.packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`card flex flex-col ${pkg.featured ? 'border-nur/60 ring-1 ring-nur/30' : ''}`}
            >
              {pkg.featured && <p className="eyebrow">{s.packages.best}</p>}
              <h3 className="h3 mt-1">{pkg.name}</h3>
              <p className="mt-4 text-2xl font-bold text-nur">{pkg.price}</p>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{pkg.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">{service.recurring}</p>
      </Section>

      <Section eyebrow={s.faq.eyebrow} title={s.faq.title}>
        <Faq items={service.faq} />
      </Section>

      <Section id="lead" eyebrow={s.lead.eyebrow} title={s.lead.title}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">{s.lead.lede}</p>
          <LeadForm lang={lang} defaultProjectType={FORM_DEFAULTS[service.slug] ?? 'UNKNOWN'} />
        </div>
      </Section>
    </>
  );
}
