import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { Faq } from '@/components/faq';
import { LeadForm } from '@/components/lead-form';
import { SERVICES, getService } from '@/content/services';
import { SITE, whatsappLink } from '@/content/site';
import type { ProjectTypeValue } from '@/content/forms';

export const revalidate = 3600;

/** Какой тип задачи подставить в форму, чтобы клиент не выбирал вручную. */
const FORM_DEFAULTS: Record<string, ProjectTypeValue> = {
  'ai-automation': 'AI_AUTOMATION',
  'mobile-development': 'MOBILE',
  'telegram-miniapp': 'MINIAPP',
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.seoTitle, description: service.seoDescription },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    offers: { '@type': 'Offer', priceCurrency: 'KZT', description: `Стоимость от ${service.priceFrom}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* 1 — Обещание */}
      <section className="border-b border-line">
        <div className="container-page py-16 sm:py-20">
          <nav aria-label="Хлебные крошки" className="text-sm text-muted">
            <Link href="/services" className="hover:text-body">
              Услуги
            </Link>
            <span aria-hidden> / </span>
            <span className="text-body">{service.navTitle}</span>
          </nav>
          <h1 className="h1 mt-6 max-w-4xl">{service.title}</h1>
          <p className="lede mt-6 max-w-2xl">{service.promise}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Стоимость</p>
              <p className="mt-1 text-xl font-bold text-nur">{service.priceFrom}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Срок запуска</p>
              <p className="mt-1 text-xl font-bold">{service.duration}</p>
            </div>
            <a
              className="btn-primary"
              href={whatsappLink(`Здравствуйте! Интересует: ${service.navTitle}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Обсудить в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2 — Кому подходит */}
      <Section eyebrow="Это для вас, если" title="Узнаёте свою ситуацию?">
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

      {/* 3 — Цена проблемы */}
      <Section eyebrow="Сколько это стоит бизнесу" title={service.cost.problem}>
        <div className="card border-nur/40">
          <p className="text-lg leading-relaxed">{service.cost.math}</p>
        </div>
      </Section>

      {/* 4 — Что входит / что нет */}
      <Section eyebrow="Состав работ" title="Что входит — и что не входит">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card">
            <h3 className="h3">Входит в стоимость</h3>
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
            <h3 className="h3">Не входит</h3>
            <p className="mt-2 text-sm text-muted">
              Мы всегда пишем это заранее — чтобы не было неприятных сюрпризов в середине проекта.
            </p>
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

      {/* 5 — График */}
      <Section eyebrow="График" title="Как распределяется работа">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.timeline.map((item) => (
            <li key={item.week} className="card">
              <p className="text-sm font-bold text-nur">{item.week}</p>
              <p className="mt-2 leading-relaxed text-muted">{item.work}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 — Пакеты */}
      <Section eyebrow="Пакеты" title="Варианты и стоимость">
        <div className="grid gap-5 lg:grid-cols-3">
          {service.packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`card flex flex-col ${pkg.featured ? 'border-nur/60 ring-1 ring-nur/30' : ''}`}
            >
              {pkg.featured && <p className="eyebrow">Оптимальный выбор</p>}
              <h3 className="h3 mt-1">{pkg.name}</h3>
              <p className="mt-4 text-2xl font-bold text-nur">{pkg.price}</p>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{pkg.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">{service.recurring}</p>
      </Section>

      {/* 7 — FAQ */}
      <Section eyebrow="Вопросы" title="Что обычно спрашивают">
        <Faq items={service.faq} />
      </Section>

      {/* 8 — Форма */}
      <Section id="lead" eyebrow="Следующий шаг" title="Обсудим вашу задачу">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">
            Напишите пару предложений о том, что происходит сейчас. Этого достаточно, чтобы мы
            вернулись с конкретными вопросами и вилкой по стоимости.
          </p>
          <LeadForm defaultProjectType={FORM_DEFAULTS[service.slug] ?? 'UNKNOWN'} />
        </div>
      </Section>
    </>
  );
}
