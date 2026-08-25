import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { Faq } from '@/components/faq';
import { LeadForm } from '@/components/lead-form';
import { DISCOVERY, PACKAGES, PAYMENT_TERMS } from '@/content/pricing';
import { FAQ } from '@/content/site';
import { HONEST_START } from '@/content/trust';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Цены — стоимость разработки и внедрения',
  description:
    'AI-бот от 650 000 ₸, Telegram-магазин от 1 500 000 ₸, мобильное приложение от 3 500 000 ₸. Фиксированная смета, оплата по этапам, поддержка помесячно.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-16 sm:py-20">
          <h1 className="h1 max-w-3xl">Понятные цены и никаких «уточним в процессе»</h1>
          <p className="lede mt-6 max-w-2xl">
            Ниже — ориентиры, с которых начинают клиенты. Точная смета фиксируется после Discovery
            и не меняется, если не меняется объём работ.
          </p>
        </div>
      </section>

      <Section eyebrow="Пакеты" title="С чего начинают">
        <div className="grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className={`card flex flex-col ${pkg.featured ? 'border-nur/60 ring-1 ring-nur/30' : ''}`}
            >
              {pkg.featured && <p className="eyebrow">Чаще всего выбирают</p>}
              <h2 className="h3 mt-1">{pkg.name}</h2>
              <p className="mt-1 text-sm text-muted">{pkg.for}</p>
              <p className="mt-5 text-2xl font-bold text-nur">{pkg.price}</p>
              <p className="mt-1 text-sm text-muted">Запуск: {pkg.duration}</p>
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
              <p className="mt-5 border-t border-line pt-4 text-sm text-muted">Поддержка: {pkg.support}</p>
              <Link className="btn-ghost mt-4" href={pkg.href}>
                Подробнее
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Если не решили" title={`${DISCOVERY.name} — ${DISCOVERY.price}`} lede={DISCOVERY.pitch}>
        <div className="card border-nur/40">
          <p className="text-sm uppercase tracking-widest text-muted">{DISCOVERY.duration}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {DISCOVERY.items.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span aria-hidden className="text-nur">
                  ✓
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-nur-soft">{DISCOVERY.guarantee}</p>
        </div>
      </Section>

      <Section eyebrow="Запуск" title={HONEST_START.pilot.title}>
        <div className="card max-w-3xl border-nur/40">
          <p className="text-lg leading-relaxed">{HONEST_START.pilot.body}</p>
          <p className="mt-4 text-sm text-muted">
            Условие простое: после сдачи вы разрешаете опубликовать кейс и записываете короткий
            отзыв. Коммерческие детали, которые вы попросите не раскрывать, в кейс не попадают.
          </p>
        </div>
      </Section>

      <Section eyebrow="Оплата" title="Как платят">
        <div className="grid gap-5 md:grid-cols-3">
          {PAYMENT_TERMS.map((term) => (
            <div key={term.scope} className="card">
              <h3 className="h3">{term.scope}</h3>
              <p className="mt-3 leading-relaxed text-muted">{term.schedule}</p>
            </div>
          ))}
        </div>
        <div className="card mt-5">
          <h3 className="h3">Что ещё важно знать</h3>
          <ul className="mt-4 space-y-3 text-muted">
            <li>Работа начинается после предоплаты — это условие для обеих сторон.</li>
            <li>Задачи вне согласованного объёма оформляются отдельно, со своей сметой и сроком.</li>
            <li>Исходный код передаётся после полной оплаты.</li>
            <li>30 дней бесплатных исправлений после сдачи.</li>
            <li>Договор на поддержку — минимум 6 месяцев.</li>
          </ul>
        </div>
      </Section>

      <Section eyebrow="Вопросы" title="Отвечаем заранее">
        <Faq items={FAQ} />
      </Section>

      <Section id="lead" eyebrow="Начнём" title="Посчитаем вашу задачу">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">
            Опишите задачу — вернёмся с вилкой по стоимости и сроку. Если задача не наша, скажем
            об этом сразу, а не после трёх встреч.
          </p>
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
