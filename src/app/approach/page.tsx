import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { LeadForm } from '@/components/lead-form';
import { EXPERIENCE, RISK_REVERSAL, WHY_US } from '@/content/trust';
import { PROCESS } from '@/content/site';
import { PAYMENT_TERMS } from '@/content/pricing';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Как мы работаем — этапы, оплата и гарантии',
  description:
    'Оплата по этапам, рабочая сборка каждую неделю, фиксированная смета, передача исходного кода и 30 дней бесплатных исправлений. Как устроена работа над проектом.',
  alternates: { canonical: '/approach' },
};

export default function ApproachPage() {
  return (
    <>
      <Section eyebrow="Как мы работаем" title={EXPERIENCE.headline} titleAs="h1">
        <div className="max-w-3xl space-y-4">
          {EXPERIENCE.body.map((paragraph) => (
            <p key={paragraph} className="lede">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {EXPERIENCE.facts.map((fact) => (
            <div key={fact.label} className="card">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block text-xl font-bold text-nur">{fact.value}</span>
                <span className="mt-1 block text-sm text-muted">{fact.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        eyebrow="Ваш риск"
        title="Шесть вещей, которые защищают вас, а не нас"
        lede="Опыт — это слова, пока вы его не увидели. Поэтому условия работы устроены так, чтобы вы рисковали минимально и могли остановиться в любой момент."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RISK_REVERSAL.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Этапы" title="Как идёт проект">
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

      <Section eyebrow="Оплата" title="Как распределяются платежи">
        <div className="grid gap-5 md:grid-cols-3">
          {PAYMENT_TERMS.map((term) => (
            <div key={term.scope} className="card">
              <h3 className="h3">{term.scope}</h3>
              <p className="mt-3 leading-relaxed text-muted">{term.schedule}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Отличия" title="Чем мы отличаемся от студии из поиска">
        <div className="grid gap-5 sm:grid-cols-2">
          {WHY_US.map((item) => (
            <article key={item.title} className="card">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="lead" eyebrow="Следующий шаг" title="Разберём вашу задачу">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <p className="lede">
            Созвон на 25 минут: вы рассказываете, что происходит сейчас, мы задаём вопросы и
            говорим честно, можем ли помочь. Если задача не наша — скажем сразу.
          </p>
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
