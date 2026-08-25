import Link from 'next/link';
import { NAV, SITE, whatsappLink } from '@/content/site';
import { SERVICES } from '@/content/services';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-nur" />
            {SITE.name}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{SITE.tagline}</p>
          <p className="mt-3 text-sm text-muted">{SITE.city}, Казахстан</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Услуги</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-body">
                  {service.navTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Разделы</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-body">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Связаться</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a className="hover:text-body" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp {SITE.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-body" href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer">
                Telegram @{SITE.telegram}
              </a>
            </li>
            <li>
              <a className="hover:text-body" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page py-6 text-xs text-muted">
          © {new Date().getFullYear()} {SITE.legalName}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
