/**
 * Тілге ТӘУЕЛСІЗ деректер: байланыс, домен, стек.
 *
 * Аударылатын мәтіннің бәрі `src/content/locales/*.ts` ішінде. Мұнда тек
 * үш тілде де бірдей болатын нәрсе тұр — телефон нөмірі аударылмайды.
 */
export const SITE = {
  name: 'Nureke Systems',
  legalName: 'Nureke Systems',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nureke.kz',
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+7 700 000 00 00',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '77000000000',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM ?? 'nureke',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'hello@nureke.kz',
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
