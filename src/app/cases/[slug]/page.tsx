import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { LeadForm } from '@/components/lead-form';
import { CASES, getCase } from '@/content/cases';

export const revalidate = 3600;

export function generateStaticParams() {
  return CASES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  return {
    title: study.seoTitle,
    description: study.seoDescription,
    alternates: { canonical: `/cases/${study.slug}` },
    openGraph: { title: study.seoTitle, description: study.seoDescription },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-16 sm:py-20">
          <nav aria-label="Хлебные крошки" className="text-sm text-muted">
            <Link href="/cases" className="hover:text-body">
              Кейсы
            </Link>
            <span aria-hidden> / </span>
            <span className="text-body">{study.client}</span>
          </nav>

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
        <Section eyebrow="Результат" title="Что изменилось">
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

      <Section eyebrow="Задача" title="Что нужно было решить">
        <ul className="grid gap-4 sm:grid-cols-2">
          {study.problem.map((item) => (
            <li key={item} className="card leading-relaxed text-muted">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Решение" title="Что сделали">
        <div className="grid gap-5 lg:grid-cols-2">
          {study.solution.map((item) => (
            <article key={item.title} className="card">
              <h2 className="h3">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Стек" title="На чём это работает">
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
        <p className="mt-5 text-sm text-muted">Сроки: {study.timeline}</p>
      </Section>

      {study.testimonial && (
        <Section eyebrow="Отзыв" title="Что говорит клиент">
          <blockquote className="card border-nur/40">
            <p className="text-lg leading-relaxed">«{study.testimonial.quote}»</p>
            <footer className="mt-5 border-t border-line pt-4 text-sm text-muted">
              {study.testimonial.author} — {study.testimonial.role}
            </footer>
          </blockquote>
        </Section>
      )}

      <Section id="lead" eyebrow="Похожая задача?" title="Расскажите, что нужно вам">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">
            Опишите ситуацию своими словами. Вернёмся с вопросами и скажем честно, можем ли
            помочь и сколько это примерно стоит.
          </p>
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
