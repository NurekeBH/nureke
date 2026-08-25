import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { LeadForm } from '@/components/lead-form';
import { SITE, whatsappLink } from '@/content/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Связаться с ${SITE.name}: WhatsApp, Telegram, почта. ${SITE.city}, Казахстан.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <Section eyebrow="Контакты" title="Как с нами связаться" titleAs="h1" lede="Самый быстрый способ — WhatsApp. Отвечаем в течение двух часов в рабочее время.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <a
            className="card flex items-center justify-between transition-colors hover:border-nur"
            href={whatsappLink('Здравствуйте! Хочу обсудить проект.')}
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

          <a className="card flex items-center justify-between transition-colors hover:border-nur" href={`mailto:${SITE.email}`}>
            <span>
              <span className="h3 block">Почта</span>
              <span className="mt-1 block text-muted">{SITE.email}</span>
            </span>
            <span aria-hidden className="text-nur">
              →
            </span>
          </a>

          <div className="card">
            <h2 className="h3">Где мы</h2>
            <p className="mt-2 text-muted">
              {SITE.city}, Казахстан. Работаем со всей республикой удалённо — встречи офлайн по
              Алматы, всё остальное по видеосвязи.
            </p>
          </div>
        </div>

        <LeadForm />
      </div>
    </Section>
  );
}
