/**
 * Видимая пометка, что перед вами заготовка, а не реальный проект.
 * Показывается только если черновики принудительно включены — иначе
 * посетитель их вообще не видит. Скрытых «примеров» на сайте не бывает.
 */
export function DraftBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-nur-deep/60 bg-nur-deep/15 px-3 py-1 text-xs font-semibold text-nur-soft ${className}`}
    >
      <span aria-hidden>⚠</span>
      ПРИМЕР — заготовка, не реальный проект
    </span>
  );
}
