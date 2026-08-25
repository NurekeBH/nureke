import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { Faq } from '@/components/faq';
import { LeadForm } from '@/components/lead-form';
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
  const p = getDictionary(lang).pages.pricing;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: path(lang, '/pricing'), languages: alternates('/pricing') },
  };
}

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const p = t.pages.pricing;

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-16 sm:py-20">
          <h1 className="h1 max-w-3xl">{p.title}</h1>
          <p className="lede mt-6 max-w-2xl">{p.lede}</p>
        </div>
      </section>

      <Section eyebrow={p.packages.eyebrow} title={p.packages.title}>
        <div className="grid gap-5 lg:grid-cols-3">
          {t.packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`card flex flex-col ${pkg.featured ? 'border-nur/60 ring-1 ring-nur/30' : ''}`}
            >
              {pkg.featured && <p className="eyebrow">{t.common.mostChosen}</p>}
              <h2 className="h3 mt-1">{pkg.name}</h2>
              <p className="mt-1 text-sm text-muted">{pkg.for}</p>
              <p className="mt-5 text-2xl font-bold text-nur">{pkg.price}</p>
              <p className="mt-1 text-sm text-muted">
                {t.common.launch}: {pkg.duration}
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-muted">
                {pkg.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-nur">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                {t.common.support}: {pkg.support}
              </p>
              <Link className="btn-ghost mt-4" href={path(lang, `/services/${pkg.slug}`)}>
                {t.common.more}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={p.ifUndecided}
        title={`${t.discovery.name} — ${t.discovery.price}`}
        lede={t.discovery.pitch}
      >
        <div className="card border-nur/40">
          <p className="text-sm uppercase tracking-widest text-muted">{t.discovery.duration}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {t.discovery.items.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span aria-hidden className="text-nur">
                  ✓
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-nur-soft">{t.discovery.guarantee}</p>
        </div>
      </Section>

      <Section eyebrow={p.payment.eyebrow} title={p.payment.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {t.paymentTerms.map((term) => (
            <div key={term.scope} className="card">
              <h3 className="h3">{term.scope}</h3>
              <p className="mt-3 leading-relaxed text-muted">{term.schedule}</p>
            </div>
          ))}
        </div>
        <div className="card mt-5">
          <h3 className="h3">{p.importantTitle}</h3>
          <ul className="mt-4 space-y-3 text-muted">
            {p.important.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow={t.home.faq.eyebrow} title={t.home.faq.title}>
        <Faq items={t.faq} />
      </Section>

      <Section id="lead" eyebrow={p.lead.eyebrow} title={p.lead.title}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">{p.leadLede}</p>
          <LeadForm lang={lang} />
        </div>
      </Section>
    </>
  );
}
