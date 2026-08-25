import { DraftBadge } from '@/components/draft-badge';
import { getDictionary } from '@/content';
import type { Locale } from '@/lib/i18n';

export function ClientsStrip({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const showDrafts =
    process.env.NEXT_PUBLIC_SHOW_DRAFT_CASES === 'true' || process.env.NODE_ENV === 'development';
  const clients = t.clients.filter((client) => showDrafts || !client.draft);

  if (clients.length === 0) return null;
  const anyDraft = clients.some((client) => client.draft);

  return (
    <section className="border-y border-line bg-surface/40">
      <div className="container-page py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted">{t.clientsStrip.eyebrow}</h2>
          {anyDraft && <DraftBadge lang={lang} />}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {clients.map((client) => (
            <li
              key={`${client.name}-${client.city}`}
              className="rounded-xl border border-line bg-elevated px-4 py-4 text-center"
            >
              <span className="block text-sm font-semibold leading-snug">{client.name}</span>
              <span className="mt-1 block text-xs text-muted">
                {client.industry} · {client.city}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-muted">{t.clientsStrip.note}</p>
      </div>
    </section>
  );
}
