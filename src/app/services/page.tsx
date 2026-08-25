import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { SERVICES } from '@/content/services';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Услуги — разработка, AI-автоматизация, мобильные приложения',
  description:
    'AI-ассистент продаж, Telegram Mini App, мобильные приложения на Flutter и CRM. Фиксированная смета, работа этапами, передача исходного кода.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Услуги"
      title="Три направления, в которых у нас есть продакшен-опыт"
      titleAs="h1"
      lede="Мы не берёмся за всё подряд. Беремся за то, что уже собирали и довели до работающего состояния."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="card group flex flex-col transition-colors hover:border-nur"
          >
            <h2 className="h3 group-hover:text-nur">{service.navTitle}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{service.promise}</p>
            <dl className="mt-6 flex items-end justify-between border-t border-line pt-4">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">Стоимость</dt>
                <dd className="mt-1 font-semibold text-nur">{service.priceFrom}</dd>
              </div>
              <div className="text-right">
                <dt className="text-xs uppercase tracking-widest text-muted">Срок</dt>
                <dd className="mt-1 font-semibold">{service.duration}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </Section>
  );
}
