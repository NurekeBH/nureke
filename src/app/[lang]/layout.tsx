import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { SITE } from '@/content/site';
import { getDictionary } from '@/content';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { StickyContact } from '@/components/sticky-contact';
import { THEME_COLOR, themeBootstrapScript } from '@/lib/theme';
import { alternates, isLocale, localeParams, path, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export const viewport: Viewport = {
  // Браузердің мекенжай жолағының түсі. Мұнда билд кезіндегі бастапқы мән
  // тұрады; тақырып ауысқанда оны theme-toggle.tsx жаңартып отырады.
  themeColor: THEME_COLOR.dark,
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return localeParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} — ${t.site.tagline}`,
      template: `%s — ${SITE.name}`,
    },
    description: t.site.description,
    alternates: {
      canonical: path(lang),
      // Іздеу жүйесіне бір беттің басқа тілдегі нұсқаларын көрсетеді.
      languages: alternates(),
    },
    openGraph: {
      type: 'website',
      locale: t.meta.ogLocale,
      url: `${SITE.url}${path(lang)}`,
      siteName: SITE.name,
      title: `${SITE.name} — ${t.site.tagline}`,
      description: t.site.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE.name} — ${t.site.tagline}`,
      description: t.site.description,
    },
    robots: { index: true, follow: true },
  };
}

function organizationSchema(lang: Locale) {
  const t = getDictionary(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: `${SITE.url}${path(lang)}`,
    description: t.site.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: t.site.city,
      addressCountry: 'KZ',
    },
    areaServed: 'KZ',
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    // suppressHydrationWarning — төмендегі скрипт <html>-ге data-theme қояды,
    // ол React гидратациялағанға дейін болады. Онсыз React сәйкессіздік деп
    // ескерту жазады. Айырма әдейі: тақырып клиентте ғана белгілі болады.
    <html lang={t.meta.htmlLang} suppressHydrationWarning>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(lang)) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-nur focus:px-4 focus:py-2 focus:text-on-nur"
        >
          {t.a11y.skipToContent}
        </a>
        <SiteHeader lang={lang} />
        <main id="main">{children}</main>
        <SiteFooter lang={lang} />
        <StickyContact lang={lang} />
      </body>
    </html>
  );
}
