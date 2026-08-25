import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
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
  const t = getDictionary(lang).pages.approach;
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    alternates: { canonical: path(lang, '/approach'), languages: alternates('/approach') },
  };
}

export default async function ApproachPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const p = t.pages.approach;

  return (
    <>
      <Section eyebrow={p.eyebrow} title={t.experience.headline} titleAs="h1">
        <div className="max-w-3xl space-y-4">
          {t.experience.body.map((paragraph) => (
            <p key={paragraph} className="lede">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {t.experience.facts.map((fact) => (
            <div key={fact.label} className="card">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block text-xl font-bold text-nur">{fact.value}</span>
                <span className="mt-1 block text-sm text-muted">{fact.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow={p.risk.eyebrow} title={p.risk.title} lede={p.risk.lede}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.riskReversal.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={p.stages.eyebrow} title={p.stages.title}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.process.map((step) => (
            <li key={step.step} className="card">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-nur">{step.step}</span>
                <span className="text-xs text-muted">{step.duration}</span>
              </div>
              <h3 className="h3 mt-3">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
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
      </Section>

      <Section eyebrow={p.difference.eyebrow} title={p.difference.title}>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.whyUs.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="lead" eyebrow={p.next.eyebrow} title={p.next.title}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">{p.nextLede}</p>
          <LeadForm lang={lang} />
        </div>
      </Section>
    </>
  );
}
