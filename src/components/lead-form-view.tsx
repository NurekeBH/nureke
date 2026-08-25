'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'done' | 'error';

export type LeadFormLabels = {
  formTitle: string;
  formSubtitle: string;
  successTitle: string;
  successBody: string;
  name: string;
  namePlaceholder: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  messageOptional: string;
  messagePlaceholder: string;
  honeypot: string;
  submit: string;
  sending: string;
  error: string;
  networkError: string;
  consent: string;
  required: string;
  projectTypes: Record<string, string>;
  budgets: Record<string, string>;
};

/**
 * Өріс саны сұрыптауға жеткілікті мөлшерде, бірден артық емес: әр артық
 * өріс бізге шамамен 7% конверсия тұрады
 * (docs/architecture/08-sitemap-and-ux-flow.md).
 */
export function LeadFormView({
  labels,
  defaultProjectType = 'UNKNOWN',
  compact = false,
}: {
  labels: LeadFormLabels;
  defaultProjectType?: string;
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
      // Жол тілге тәуелсіз: endpoint үшеуіне ортақ.
      const response = await fetch('/api/leads.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setError(result.error ?? labels.error);
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      setError(labels.networkError);
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="card text-center">
        <p className="text-3xl" aria-hidden>
          ✅
        </p>
        <h3 className="h3 mt-4">{labels.successTitle}</h3>
        <p className="mt-3 text-muted">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" noValidate>
      {!compact && <h3 className="h3">{labels.formTitle}</h3>}
      {!compact && <p className="mt-2 text-sm text-muted">{labels.formSubtitle}</p>}

      <div className={`mt-6 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label className="label" htmlFor="lead-name">
            {labels.name} {labels.required}
          </label>
          <input
            id="lead-name"
            name="name"
            className="field"
            required
            autoComplete="name"
            placeholder={labels.namePlaceholder}
          />
        </div>

        <div>
          <label className="label" htmlFor="lead-phone">
            {labels.phone} {labels.required}
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
            {labels.projectType}
          </label>
          <select id="lead-type" name="projectType" className="field" defaultValue={defaultProjectType}>
            {Object.entries(labels.projectTypes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="lead-budget">
            {labels.budget}
          </label>
          <select id="lead-budget" name="budgetRange" className="field" defaultValue="UNKNOWN">
            {Object.entries(labels.budgets).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="lead-message">
          {labels.message} <span className="text-muted/70">{labels.messageOptional}</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          className="field resize-y"
          placeholder={labels.messagePlaceholder}
        />
      </div>

      {/* Боттарға арналған қақпан: адамдар бұл өрісті көрмейді. */}
      <div aria-hidden className="hidden">
        <label htmlFor="lead-website">{labels.honeypot}</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-nur-deep/50 bg-nur-deep/10 px-4 py-3 text-sm text-nur-soft">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'sending'}>
        {status === 'sending' ? labels.sending : labels.submit}
      </button>

      <p className="mt-3 text-center text-xs text-muted">{labels.consent}</p>
    </form>
  );
}
