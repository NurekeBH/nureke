import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { LeadForm } from '@/components/lead-form';
import { DraftBadge } from '@/components/draft-badge';
import { getDictionary } from '@/content';
import { getAllCases, getCase } from '@/content/cases';
import { LOCALES, alternates, isLocale, path } from '@/lib/i18n';

export const revalidate = 3600;

// Статикалық экспорт: тек осы тізімдегі slug-тар бар, қалғаны 404.
export const dynamicParams = false;

export function generateStaticParams() {
  // Барлық slug беріледі, бірақ бұл «бәрі жарияланады» дегенді БІЛДІРМЕЙДІ:
  // төмендегі getCase() тек көрінетіндердің ішінен іздейді, сондықтан
  // дайындама notFound() арқылы сүзіліп қалады (ADR-0003).
  // Кейс жоқ тілде тізім бос — ол тілде бет мүлдем жасалмайды.
  return LOCALES.flatMap((lang) => getAllCases(lang).map((item) => ({ lang, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const study = getCase(lang, slug);
  if (!study) return {};
  return {
    title: study.seoTitle,
    description: study.seoDescription,
    alternates: {
      canonical: path(lang, `/cases/${study.slug}`),
      languages: alternates(`/cases/${study.slug}`),
    },
    openGraph: { title: study.seoTitle, description: study.seoDescription },
    // Дайындаманы іздеу жүйесі сайтта қосулы тұрса да көрмейді.
    robots: study.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const study = getCase(lang, slug);
  if (!study) notFound();

  const t = getDictionary(lang);
  const c = t.pages.cases;

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-16 sm:py-20">
          <nav aria-label={t.a11y.breadcrumbs} className="text-sm text-muted">
            <Link href={path(lang, '/cases')} className="hover:text-body">
              {c.eyebrow}
            </Link>
            <span aria-hidden> / </span>
            <span className="text-body">{study.client}</span>
          </nav>

          {study.draft && <DraftBadge lang={lang} className="mt-6" />}

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-nur/50 px-3 py-1 font-semibold text-nur">
              {study.clientNote}
            </span>
            <span className="rounded-full border border-line px-3 py-1 text-muted">{study.industry}</span>
            <span className="rounded-full border border-line px-3 py-1 text-muted">{study.year}</span>
          </div>

          <h1 className="h1 mt-6 max-w-4xl">{study.title}</h1>
          <p className="lede mt-6 max-w-3xl">{study.summary}</p>
        </div>
      </section>

      {study.results.length > 0 && (
        <Section eyebrow={c.result} title={c.whatChanged}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {study.results.map((item) => (
              <div key={item.label} className="card">
                <div className="text-3xl font-bold text-nur">{item.value}</div>
                <div className="mt-2 text-sm leading-relaxed text-muted">{item.label}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow={c.task} title={c.whatToSolve}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {study.problem.map((item) => (
            <li key={item} className="card leading-relaxed text-muted">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow={c.solution} title={c.whatWeDid}>
        <div className="grid gap-5 lg:grid-cols-2">
          {study.solution.map((item) => (
            <article key={item.title} className="card">
              <h2 className="h3">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.stack} title={c.whatItRunsOn}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {study.tech.map((group) => (
            <div key={group.group} className="card">
              <h2 className="text-sm uppercase tracking-widest text-muted">{group.group}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-elevated px-3 py-1 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          {c.timeline}: {study.timeline}
        </p>
      </Section>

      {study.testimonial && (
        <Section eyebrow={c.testimonial} title={c.whatClientSays}>
          <blockquote className="card border-nur/40">
            <p className="text-lg leading-relaxed">«{study.testimonial.quote}»</p>
            <footer className="mt-5 border-t border-line pt-4 text-sm text-muted">
              {study.testimonial.author} — {study.testimonial.role}
            </footer>
          </blockquote>
        </Section>
      )}

      <Section id="lead" eyebrow={c.similarTask} title={c.tellUs}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">{c.similarLede}</p>
          <LeadForm lang={lang} />
        </div>
      </Section>
    </>
  );
}
