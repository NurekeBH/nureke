import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE } from '@/content/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { StickyContact } from '@/components/sticky-contact';
import { THEME_COLOR, themeBootstrapScript } from '@/lib/theme';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Браузердің мекенжай жолағының түсі. Мұнда билд кезіндегі бастапқы мән
  // тұрады; тақырып ауысқанда оны theme-toggle.tsx жаңартып отырады.
  themeColor: THEME_COLOR.dark,
  width: 'device-width',
  initialScale: 1,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.city,
    addressCountry: 'KZ',
  },
  areaServed: 'KZ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — төмендегі скрипт <html>-ге data-theme қояды,
    // ол React гидратациялағанға дейін болады. Онсыз React сәйкессіздік деп
    // ескерту жазады. Айырма әдейі: тақырып клиентте ғана белгілі болады.
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/*
          Тақырыпты бет боялғанға ДЕЙІН қоямыз. Бұл жай ыңғайлылық емес:
          кешіктірсек, келуші алдымен қараңғы бетті көріп, содан кейін ол
          жарыққа секіреді. Сондықтан бұл — бөлек файл емес, тікелей осында
          тұрған кішкене скрипт (сыртқы файл жүктелгенше бет боялып үлгереді).
        */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-nur focus:px-4 focus:py-2 focus:text-on-nur"
        >
          К содержанию
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyContact />
      </body>
    </html>
  );
}
