import Link from 'next/link';
import { Section } from '@/components/section';
import { Faq } from '@/components/faq';
import { LeadForm } from '@/components/lead-form';
import { FAQ, PROBLEMS, PROCESS, SITE, TECH_STACK, whatsappLink } from '@/content/site';
import { SERVICES } from '@/content/services';
import { HONEST_START, RISK_REVERSAL, WHY_US } from '@/content/trust';
import { PACKAGES, DISCOVERY } from '@/content/pricing';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-nur/15 blur-[120px]"
        />
        <div className="container-page relative py-20 sm:py-28">
          <p className="eyebrow animate-rise">Продуктовая студия · {SITE.city}</p>
          <h1 className="h1 mt-5 max-w-4xl animate-rise">
            Мы не делаем сайты. Мы собираем системы, которые{' '}
            <span className="text-nur">приносят деньги</span>.
          </h1>
          <p className="lede mt-6 max-w-2xl animate-rise">
            AI-ассистент, который отвечает клиентам за 5 секунд. Магазин внутри Telegram без
            комиссии площадки. Мобильное приложение с рабочим backend. Запуск — от двух недель.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary"
              href={whatsappLink('Здравствуйте! Хочу обсудить проект.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Обсудить проект
            </a>
            <Link className="btn-ghost" href="#lead">
              Оставить заявку на сайте
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            Отвечаем в WhatsApp в течение двух часов. Без звонков-продаж.
          </p>
        </div>
      </section>

      {/* 2 — Trust bar */}
      <div className="border-b border-line bg-surface/40">
        <div className="container-page flex flex-wrap items-center gap-x-7 gap-y-3 py-5">
          <span className="text-xs uppercase tracking-widest text-muted">Работаем на</span>
          {TECH_STACK.map((tech) => (
            <span key={tech} className="text-sm font-medium text-muted">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 3 — Проблема */}
      <Section
        eyebrow="Знакомо?"
        title="Три ситуации, из-за которых бизнес теряет деньги каждый день"
        lede="Если узнали хотя бы одну — задача решается технически, и обычно быстрее, чем кажется."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((problem) => (
            <article key={problem.title} className="card">
              <h3 className="h3">{problem.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{problem.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 4 — Услуги */}
      <Section
        eyebrow="Услуги"
        title="Что мы делаем"
        lede="Мы сознательно делаем только три вещи. Каждая из них решает конкретную задачу: не терять заявки, начать продавать онлайн, получить собственный продукт."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="card group flex flex-col transition-colors hover:border-nur"
            >
              <h3 className="h3 group-hover:text-nur">{service.navTitle}</h3>
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

      {/* 5 — Честный старт: вместо портфолио — снятие риска */}
      <Section eyebrow="Честно" title={HONEST_START.title}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-4">
            {HONEST_START.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <div className="card border-nur/40">
              <p className="eyebrow">{HONEST_START.pilot.title}</p>
              <p className="mt-3 leading-relaxed">{HONEST_START.pilot.body}</p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {RISK_REVERSAL.slice(0, 4).map((item) => (
              <li key={item.title} className="card">
                <h3 className="h3">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link className="btn-ghost" href="/approach">
            Подробнее о том, как мы работаем
          </Link>
        </div>
      </Section>

      {/* 6 — Процесс */}
      <Section eyebrow="Процесс" title="Как идёт работа" lede="Никаких «мы вам позвоним через месяц». Каждый этап заканчивается тем, что можно открыть и проверить.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((step) => (
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
      <Section eyebrow="Почему мы" title="Четыре причины, которые можно проверить">
        <div className="grid gap-5 sm:grid-cols-2">
          {WHY_US.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 8 — Пакеты */}
      <Section
        eyebrow="Стоимость"
        title="С чего начинают клиенты"
        lede="Это ориентиры. Точная цена — после Discovery, когда понятен объём."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className={`card flex flex-col ${pkg.featured ? 'border-nur/60 ring-1 ring-nur/30' : ''}`}
            >
              {pkg.featured && <p className="eyebrow">Чаще всего выбирают</p>}
              <h3 className="h3 mt-1">{pkg.name}</h3>
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
              <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                Поддержка: {pkg.support}
              </p>
              <Link className="btn-ghost mt-4" href={pkg.href}>
                Подробнее
              </Link>
            </article>
          ))}
        </div>

        <div className="card mt-5 border-nur/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Если ещё не решили</p>
              <h3 className="h3 mt-2">
                {DISCOVERY.name} — {DISCOVERY.price} за {DISCOVERY.duration}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{DISCOVERY.pitch}</p>
              <p className="mt-3 text-sm text-nur-soft">{DISCOVERY.guarantee}</p>
            </div>
            <Link className="btn-primary shrink-0" href="/pricing">
              Что входит
            </Link>
          </div>
        </div>
      </Section>

      {/* 9 — FAQ */}
      <Section eyebrow="Вопросы" title="Отвечаем заранее">
        <Faq items={FAQ} />
      </Section>

      {/* 10 — Форма */}
      <Section id="lead" eyebrow="Начнём" title="Расскажите про задачу">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="lede">
              Опишите ситуацию своими словами — этого достаточно. Мы вернёмся с вопросами и
              скажем честно, можем ли помочь и сколько это примерно стоит.
            </p>
            <ul className="mt-7 space-y-4 text-muted">
              <li className="flex gap-3">
                <span aria-hidden className="text-nur">
                  1
                </span>
                <span>Отвечаем в WhatsApp в течение двух часов в рабочее время.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-nur">
                  2
                </span>
                <span>Задаём вопросы про бизнес, а не про количество страниц.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-nur">
                  3
                </span>
                <span>Если задача не наша — скажем прямо и подскажем, к кому идти.</span>
              </li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
