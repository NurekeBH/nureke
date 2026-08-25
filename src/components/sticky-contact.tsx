import { whatsappLink } from '@/content/site';
import { getDictionary } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Қазақстанда WhatsApp — бизнеспен байланыстың негізгі арнасы.
 * Түйме әрқашан көрінеді: бұл «келуші → диалог» дегеннің ең қысқа жолы.
 */
export function StickyContact({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <a
      href={whatsappLink(t.common.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-nur px-5 font-semibold text-on-nur shadow-fab transition-transform hover:scale-105"
    >
      <span aria-hidden>💬</span>
      <span className="hidden sm:inline">{t.common.writeWhatsapp}</span>
      <span className="sr-only sm:hidden">{t.common.writeWhatsapp}</span>
    </a>
  );
}
