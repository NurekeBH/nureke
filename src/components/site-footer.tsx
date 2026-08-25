import Link from 'next/link';
import { SITE, whatsappLink } from '@/content/site';
import { getDictionary, getNav } from '@/content';
import { hasCases } from '@/content/cases';
import { path, type Locale } from '@/lib/i18n';

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const nav = getNav(lang, hasCases(lang));

  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-nur" />
            {SITE.name}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t.site.tagline}</p>
          <p className="mt-3 text-sm text-muted">
            {t.site.city}, {t.site.country}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{t.nav.services}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {t.services.map((service) => (
              <li key={service.slug}>
                <Link href={path(lang, `/services/${service.slug}`)} className="hover:text-body">
                  {service.navTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.a11y.footerNav}>
          <h2 className="text-sm font-semibold">{t.nav.approach}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={path(lang, item.href)} className="hover:text-body">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">{t.nav.contact}</h2>
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
          © {new Date().getFullYear()} {SITE.legalName}
        </div>
      </div>
    </footer>
  );
}
