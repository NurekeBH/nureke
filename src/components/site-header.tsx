import { getDictionary, getNav } from '@/content';
import { hasCases } from '@/content/cases';
import { LOCALES, type Locale } from '@/lib/i18n';
import { SiteHeaderNav } from './site-header-nav';

/**
 * Сервер бөлігі: сөздікті оқып, дайын жолдарды клиенттік бөлікке береді.
 * Себебі мәзірде useState керек (мобильді мәзір), ал үш тілдің сөздігін
 * клиентке жіберудің қажеті жоқ — тек көрінетін жолдар барады.
 */
export function SiteHeader({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <SiteHeaderNav
      lang={lang}
      nav={getNav(lang, hasCases(lang))}
      labels={{
        discussProject: t.common.discussProject,
        whatsappGreeting: t.common.whatsappGreeting,
        mainNav: t.a11y.mainNav,
        mobileNav: t.a11y.mobileNav,
        menu: t.a11y.menu,
      }}
      themeLabels={t.theme}
      languages={LOCALES.map((code) => {
        const dict = getDictionary(code);
        return { lang: code, short: dict.meta.short, label: dict.meta.label };
      })}
    />
  );
}
