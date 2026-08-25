import { getDictionary } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Алдыңыздағы нәрсенің нақты жоба емес, дайындама екенін көрсететін белгі.
 * Тек дайындамалар әдейі қосылғанда ғана шығады — әйтпесе келуші оларды
 * мүлдем көрмейді. Сайтта «жасырын үлгі» деген күй болмайды.
 */
export function DraftBadge({ lang, className = '' }: { lang: Locale; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-nur-deep/60 bg-nur-deep/15 px-3 py-1 text-xs font-semibold text-nur-soft ${className}`}
    >
      <span aria-hidden>⚠</span>
      {getDictionary(lang).common.draftBadge}
    </span>
  );
}
