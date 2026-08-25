import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { VISIBLE_CASES, hasCases } from '@/content/cases';
import { DraftBadge } from '@/components/draft-badge';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Кейсы — проекты и результаты',
  description: 'Проекты, которые мы собрали: задача клиента, решение, технологии и результат.',
  alternates: { canonical: '/cases' },
  // Пока в списке есть заготовки, отдавать его поисковикам нельзя.
  robots: VISIBLE_CASES.some((item) => item.draft) ? { index: false, follow: false } : undefined,
};

export default function CasesPage() {
  // Пустой раздел портфолио хуже отсутствующего: он выглядит как заброшенный сайт.
  if (!hasCases) notFound();

  return (
    <Section
      eyebrow="Кейсы"
      title="Что мы уже собрали"
      titleAs="h1"
      lede="Задача клиента, что сделали, на чём и что изменилось. Без придуманных процентов."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {VISIBLE_CASES.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="card group flex flex-col transition-colors hover:border-nur"
          >
            {item.draft && <DraftBadge className="mb-4" />}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="rounded-full border border-line px-3 py-1">{item.industry}</span>
              <span className="rounded-full border border-line px-3 py-1">{item.year}</span>
            </div>
            <h2 className="h3 mt-4 group-hover:text-nur">{item.title}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{item.summary}</p>
            <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
              {item.client} · {item.timeline}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
