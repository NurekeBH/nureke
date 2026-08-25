import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { DraftBadge } from '@/components/draft-badge';
import { getDictionary } from '@/content';
import { getVisibleCases, hasCases } from '@/content/cases';
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
  const p = getDictionary(lang).pages.cases;
  const cases = getVisibleCases(lang);
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: path(lang, '/cases'), languages: alternates('/cases') },
    // Тізімде дайындама бар болса, оны іздеу жүйесіне беруге болмайды.
    robots: cases.some((item) => item.draft) ? { index: false, follow: false } : undefined,
  };
}

export default async function CasesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  // Бос портфолио бөлімі тастанды сайттың белгісі — ол кейс жоқтығынан да жаман.
  if (!hasCases(lang)) notFound();

  const t = getDictionary(lang);
  const p = t.pages.cases;

  return (
    <Section eyebrow={p.eyebrow} title={p.title} titleAs="h1" lede={p.lede}>
      <div className="grid gap-5 md:grid-cols-2">
        {getVisibleCases(lang).map((item) => (
          <Link
            key={item.slug}
            href={path(lang, `/cases/${item.slug}`)}
            className="card group flex flex-col transition-colors hover:border-nur"
          >
            {item.draft && <DraftBadge lang={lang} className="mb-4" />}
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
