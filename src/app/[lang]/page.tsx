import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { Faq } from '@/components/faq';
import { LeadForm } from '@/components/lead-form';
import { ClientsStrip } from '@/components/clients-strip';
import { TECH_STACK, whatsappLink } from '@/content/site';
import { getDictionary } from '@/content';
import { isLocale, localeParams, path } from '@/lib/i18n';

export const revalidate = 3600;

export function generateStaticParams() {
  return localeParams();
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-nur/15 blur-[120px]"
        />
        <div className="container-page relative py-20 sm:py-28">
          <p className="eyebrow animate-rise">
            {t.home.eyebrow} · {t.site.city} · 15 {t.home.yearsSuffix}
          </p>
          <h1 className="h1 mt-5 max-w-4xl animate-rise">
            {t.home.titleLead} <span className="text-nur">{t.home.titleAccent}</span>
            {t.home.titleTail}
          </h1>
          <p className="lede mt-6 max-w-2xl animate-rise">{t.home.lede}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary"
              href={whatsappLink(t.common.whatsappGreeting)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.common.discussProject}
            </a>
            <Link className="btn-ghost" href="#lead">
              {t.common.leaveRequest}
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">{t.common.answerNote}</p>
        </div>
      </section>

      {/* 2 — Стек */}
      <div className="border-b border-line bg-surface/40">
        <div className="container-page flex flex-wrap items-center gap-x-7 gap-y-3 py-5">
          <span className="text-xs uppercase tracking-widest text-muted">{t.common.workingOn}</span>
          {TECH_STACK.map((tech) => (
            <span key={tech} className="text-sm font-medium text-muted">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <ClientsStrip lang={lang} />

      {/* 3 — Проблема */}
      <Section eyebrow={t.home.problems.eyebrow} title={t.home.problems.title} lede={t.home.problems.lede}>
        <div className="grid gap-5 md:grid-cols-3">
          {t.problems.map((problem) => (
            <article key={problem.title} className="card">
              <h3 className="h3">{problem.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{problem.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 4 — Услуги */}
      <Section eyebrow={t.home.services.eyebrow} title={t.home.services.title} lede={t.home.services.lede}>
        <div className="grid gap-5 md:grid-cols-3">
          {t.services.map((service) => (
            <Link
              key={service.slug}
              href={path(lang, `/services/${service.slug}`)}
              className="card group flex flex-col transition-colors hover:border-nur"
            >
              <h3 className="h3 group-hover:text-nur">{service.navTitle}</h3>
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

      {/* 5 — Опыт вместо портфолио, пока кейсы готовятся (ADR-0003) */}
      <Section eyebrow={t.home.experience.eyebrow} title={t.experience.headline}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-4">
            {t.experience.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <dl className="grid gap-4 pt-2 sm:grid-cols-3">
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
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {t.riskReversal.slice(0, 4).map((item) => (
              <li key={item.title} className="card">
                <h3 className="h3">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link className="btn-ghost" href={path(lang, '/approach')}>
            {t.home.experience.more}
          </Link>
        </div>
      </Section>

      {/* 6 — Процесс */}
      <Section eyebrow={t.home.process.eyebrow} title={t.home.process.title} lede={t.home.process.lede}>
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

      {/* 7 — Почему мы */}
      <Section eyebrow={t.home.whyUs.eyebrow} title={t.home.whyUs.title}>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.whyUs.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 8 — Пакеты */}
      <Section eyebrow={t.home.pricing.eyebrow} title={t.home.pricing.title} lede={t.home.pricing.lede}>
        <div className="grid gap-5 lg:grid-cols-3">
          {t.packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`card flex flex-col ${pkg.featured ? 'border-nur/60 ring-1 ring-nur/30' : ''}`}
            >
              {pkg.featured && <p className="eyebrow">{t.common.mostChosen}</p>}
              <h3 className="h3 mt-1">{pkg.name}</h3>
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

        <div className="card mt-5 border-nur/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{t.home.pricing.ifUndecided}</p>
              <h3 className="h3 mt-2">
                {t.discovery.name} — {t.discovery.price} / {t.discovery.duration}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{t.discovery.pitch}</p>
              <p className="mt-3 text-sm text-nur-soft">{t.discovery.guarantee}</p>
            </div>
            <Link className="btn-primary shrink-0" href={path(lang, '/pricing')}>
              {t.common.whatIncluded}
            </Link>
          </div>
        </div>
      </Section>

      {/* 9 — FAQ */}
      <Section eyebrow={t.home.faq.eyebrow} title={t.home.faq.title}>
        <Faq items={t.faq} />
      </Section>

      {/* 10 — Форма */}
      <Section id="lead" eyebrow={t.home.lead.eyebrow} title={t.home.lead.title}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="lede">{t.home.lead.lede}</p>
            <ul className="mt-7 space-y-4 text-muted">
              {t.home.lead.points.map((point, index) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="text-nur">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <LeadForm lang={lang} />
        </div>
      </Section>
    </>
  );
}
