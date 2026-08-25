import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { LeadForm } from '@/components/lead-form';
import { SITE, whatsappLink } from '@/content/site';
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
  const p = getDictionary(lang).pages.contact;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: path(lang, '/contact'), languages: alternates('/contact') },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const p = t.pages.contact;

  return (
    <Section eyebrow={p.eyebrow} title={p.title} titleAs="h1" lede={p.lede}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <a
            className="card flex items-center justify-between transition-colors hover:border-nur"
            href={whatsappLink(t.common.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <span className="h3 block">WhatsApp</span>
              <span className="mt-1 block text-muted">{SITE.phone}</span>
            </span>
            <span aria-hidden className="text-nur">
              →
            </span>
          </a>

          <a
            className="card flex items-center justify-between transition-colors hover:border-nur"
            href={`https://t.me/${SITE.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <span className="h3 block">Telegram</span>
              <span className="mt-1 block text-muted">@{SITE.telegram}</span>
            </span>
            <span aria-hidden className="text-nur">
              →
            </span>
          </a>

          <a
            className="card flex items-center justify-between transition-colors hover:border-nur"
            href={`mailto:${SITE.email}`}
          >
            <span>
              <span className="h3 block">{p.email}</span>
              <span className="mt-1 block text-muted">{SITE.email}</span>
            </span>
            <span aria-hidden className="text-nur">
              →
            </span>
          </a>

          <div className="card">
            <h2 className="h3">{p.whereWeAre}</h2>
            <p className="mt-2 text-muted">
              {t.site.city}, {t.site.country}. {p.whereBody}
            </p>
          </div>
        </div>

        <LeadForm lang={lang} />
      </div>
    </Section>
  );
}
