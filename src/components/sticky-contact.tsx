import { whatsappLink } from '@/content/site';

/**
 * В Казахстане WhatsApp — основной канал связи с бизнесом.
 * Кнопка видна всегда: это самый короткий путь «посетитель → диалог».
 */
export function StickyContact() {
  return (
    <a
      href={whatsappLink('Здравствуйте! Пишу с сайта — хочу обсудить проект.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-nur px-5 font-semibold text-on-nur shadow-fab transition-transform hover:scale-105"
    >
      <span aria-hidden>💬</span>
      <span className="hidden sm:inline">Написать в WhatsApp</span>
      <span className="sr-only sm:hidden">Написать в WhatsApp</span>
    </a>
  );
}
