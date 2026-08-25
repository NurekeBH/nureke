/**
 * ПОРТФОЛИО.
 *
 * Инфраструктура готова, контент заполняется владельцем. Пока массив пуст:
 *  — ссылка «Кейсы» не появляется в меню,
 *  — страницы /cases и /cases/[slug] отдают 404,
 *  — в sitemap ничего не добавляется.
 * Как только здесь появится первый объект — всё включится само.
 *
 * ПРАВИЛА ЗАПОЛНЕНИЯ (docs/decisions/0003-experience-led-positioning.md):
 *  1. Клиента можно называть только с его письменного разрешения.
 *     Нет разрешения — пишем отрасль: «сеть стоматологий, Алматы».
 *  2. Цифры результата — только те, которые клиент подтвердил.
 *     Нет подтверждённых цифр — описываем, что изменилось в процессе,
 *     без процентов. Придуманный «рост продаж на 300%» запрещён.
 *  3. `tech` — то, что реально использовалось.
 *  4. `problem` пишется словами клиента, а не терминами.
 *
 * ШАБЛОН — скопировать и заполнить:
 *
 * {
 *   slug: 'setevaya-stomatologiya-crm',
 *   client: 'Сеть стоматологий',
 *   clientNote: 'Алматы, 4 филиала',       // или имя клиента с разрешения
 *   industry: 'Медицина',
 *   year: '2025',
 *   title: 'CRM и запись пациентов вместо переписки в WhatsApp',
 *   seoTitle: '...',                        // 50–60 символов
 *   seoDescription: '...',                  // 140–160 символов
 *   summary: 'Одним абзацем: что было, что сделали, что стало.',
 *   problem: ['Пункт 1', 'Пункт 2'],
 *   solution: [{ title: '...', body: '...' }],
 *   tech: [{ group: 'Backend', items: ['NestJS', 'PostgreSQL'] }],
 *   results: [{ value: '...', label: '...' }],   // только подтверждённое
 *   timeline: '6 недель',
 *   testimonial: { quote: '...', author: '...', role: '...' },  // необязательно
 * }
 */

export type CaseStudy = {
  slug: string;
  client: string;
  clientNote: string;
  industry: string;
  year: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  problem: readonly string[];
  solution: readonly { title: string; body: string }[];
  tech: readonly { group: string; items: readonly string[] }[];
  results: readonly { value: string; label: string }[];
  timeline: string;
  testimonial?: { quote: string; author: string; role: string };
};

export const CASES: readonly CaseStudy[] = [];

export const hasCases = CASES.length > 0;

export const getCase = (slug: string) => CASES.find((item) => item.slug === slug);
