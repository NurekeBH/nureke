/**
 * «НАШИ КЛИЕНТЫ».
 *
 * Здесь НЕТ и не должно быть выдуманных названий компаний. Пока клиент не
 * дал письменного разрешения, указывается только отрасль и город —
 * это правда, и это не подставляет ни нас, ни его.
 *
 * Заготовки помечены `draft: true` и в проде скрыты — как и кейсы
 * (docs/decisions/0003-experience-led-positioning.md).
 *
 * Когда появится разрешение: заменить `name` на реальное название,
 * убрать `draft`. Логотип класть в /public/clients/ и указать в `logo`.
 */

export type Client = {
  /** Название компании — только с разрешения. Иначе отрасль. */
  name: string;
  industry: string;
  city: string;
  /** Путь к логотипу в /public. Нет логотипа — рисуется текстом. */
  logo?: string;
  draft?: boolean;
};

export const CLIENTS: readonly Client[] = [
  { name: 'Сеть стоматологий', industry: 'Медицина', city: 'Алматы', draft: true },
  { name: 'Оптовый поставщик продуктов', industry: 'Опт', city: 'Алматы', draft: true },
  { name: 'Служба доставки', industry: 'Логистика', city: 'Астана', draft: true },
  { name: 'Автосервис', industry: 'Авто', city: 'Алматы', draft: true },
  { name: 'Образовательный центр', industry: 'Образование', city: 'Шымкент', draft: true },
];

export const SHOW_DRAFT_CLIENTS =
  process.env.NEXT_PUBLIC_SHOW_DRAFT_CASES === 'true' || process.env.NODE_ENV === 'development';

export const VISIBLE_CLIENTS = CLIENTS.filter((item) => SHOW_DRAFT_CLIENTS || !item.draft);

export const hasClients = VISIBLE_CLIENTS.length > 0;

/** Хотя бы один из показываемых — заготовка. Тогда нужен бейдж. */
export const clientsAreDraft = VISIBLE_CLIENTS.some((item) => item.draft);
