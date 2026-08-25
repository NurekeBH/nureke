import type { NextConfig } from 'next';

/**
 * Статикалық экспорт: хостинг PHP-only, Node процесі жүрмейді (ADR-0002b).
 *
 * Салдары:
 *  — `headers()` бұл режимде жұмыс істемейді. Қауіпсіздік хедерлері
 *    `public/.htaccess` ішіне көшірілді. Оны өзгертсең, сол жерде өзгерт.
 *  — `/api/*` route handler жоқ. Лид формасы `public/api/leads.php`-ке кетеді.
 *  — `revalidate` мәні ескерілмейді: мазмұн `src/content/*` ішінде,
 *    ол билд кезінде статикаға айналады. Мазмұн өзгерсе — қайта билд.
 */
const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  // Слэшсіз таза URL: sitemap мен canonical солай жазылған.
  // Apache-та `.html`-ге айналдыруды .htaccess жасайды.
  trailingSlash: false,
};

export default nextConfig;
