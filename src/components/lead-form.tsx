'use client';

import { useState } from 'react';
import { BUDGET_LABELS, PROJECT_TYPE_LABELS, type ProjectTypeValue } from '@/content/forms';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Полей ровно столько, сколько нужно для квалификации, и ни одним больше:
 * каждое лишнее поле стоит нам примерно 7% конверсии
 * (docs/architecture/08-sitemap-and-ux-flow.md).
 */
export function LeadForm({ defaultProjectType = 'UNKNOWN', compact = false }: {
  defaultProjectType?: ProjectTypeValue;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      projectType: String(formData.get('projectType') ?? 'UNKNOWN'),
      budgetRange: String(formData.get('budgetRange') ?? 'UNKNOWN'),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
      pageUrl: typeof window === 'undefined' ? '' : window.location.href,
    };

    try {
      // Статикалық сайт — Node route жоқ, өтінімді PHP қабылдайды (ADR-0002b).
      const response = await fetch('/api/leads.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setError(result.error ?? 'Не удалось отправить. Напишите нам в WhatsApp.');
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      setError('Похоже, пропала связь. Напишите нам в WhatsApp — ответим сразу.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="card text-center">
        <p className="text-3xl" aria-hidden>
          ✅
        </p>
        <h3 className="h3 mt-4">Заявка принята</h3>
        <p className="mt-3 text-muted">
          Напишем в WhatsApp в течение двух часов в рабочее время. Если вопрос срочный —
          пишите прямо сейчас, ответим быстрее.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" noValidate>
      {!compact && <h3 className="h3">Обсудим проект</h3>}
      {!compact && (
        <p className="mt-2 text-sm text-muted">
          Ответим в WhatsApp в течение двух часов. Без звонков-продаж и рассылок.
        </p>
      )}

      <div className={`mt-6 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label className="label" htmlFor="lead-name">
            Имя *
          </label>
          <input id="lead-name" name="name" className="field" required autoComplete="name" placeholder="Как к вам обращаться" />
        </div>

        <div>
          <label className="label" htmlFor="lead-phone">
            WhatsApp *
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            className="field"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 700 000 00 00"
          />
        </div>

        <div>
          <label className="label" htmlFor="lead-type">
            Что нужно
          </label>
          <select id="lead-type" name="projectType" className="field" defaultValue={defaultProjectType}>
            {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="lead-budget">
            Бюджет
          </label>
          <select id="lead-budget" name="budgetRange" className="field" defaultValue="UNKNOWN">
            {Object.entries(BUDGET_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="lead-message">
          Коротко о задаче <span className="text-muted/70">— не обязательно</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          className="field resize-y"
          placeholder="Например: заявки приходят в WhatsApp, менеджер не успевает отвечать вечером"
        />
      </div>

      {/* Ловушка для ботов: люди этого поля не видят. */}
      <div aria-hidden className="hidden">
        <label htmlFor="lead-website">Не заполняйте это поле</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-nur-deep/50 bg-nur-deep/10 px-4 py-3 text-sm text-nur-soft">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
      </button>

      <p className="mt-3 text-center text-xs text-muted">
        Отправляя форму, вы соглашаетесь на обработку контактных данных для связи по вашему запросу.
      </p>
    </form>
  );
}
