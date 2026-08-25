import { DraftBadge } from '@/components/draft-badge';
import { VISIBLE_CLIENTS, clientsAreDraft, hasClients } from '@/content/clients';

export function ClientsStrip() {
  if (!hasClients) return null;

  return (
    <section className="border-y border-line bg-surface/40">
      <div className="container-page py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted">Наши клиенты</h2>
          {clientsAreDraft && <DraftBadge />}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {VISIBLE_CLIENTS.map((client) => (
            <li
              key={`${client.name}-${client.city}`}
              className="rounded-xl border border-line bg-elevated px-4 py-4 text-center"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  className="mx-auto h-8 w-auto max-w-full object-contain opacity-80"
                  loading="lazy"
                />
              ) : (
                <span className="block text-sm font-semibold leading-snug">{client.name}</span>
              )}
              <span className="mt-1 block text-xs text-muted">
                {client.industry} · {client.city}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-muted">
          Названия компаний публикуем только с письменного согласия клиента. Там, где согласия
          пока нет, указываем отрасль и город.
        </p>
      </div>
    </section>
  );
}
