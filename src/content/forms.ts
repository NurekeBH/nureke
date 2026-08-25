/** Подписи полей формы. Вынесены отдельно, чтобы zod не попадал в клиентский бандл. */

export const PROJECT_TYPES = ['AI_AUTOMATION', 'MOBILE', 'MINIAPP', 'WEBSITE', 'CRM', 'UNKNOWN'] as const;
export const BUDGET_RANGES = ['UNDER_1M', 'FROM_1M_TO_3M', 'FROM_3M_TO_10M', 'OVER_10M', 'UNKNOWN'] as const;

export type ProjectTypeValue = (typeof PROJECT_TYPES)[number];
export type BudgetRangeValue = (typeof BUDGET_RANGES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectTypeValue, string> = {
  AI_AUTOMATION: 'AI-бот и автоматизация',
  MOBILE: 'Мобильное приложение',
  MINIAPP: 'Telegram Mini App',
  WEBSITE: 'Сайт / лендинг',
  CRM: 'CRM или админ-панель',
  UNKNOWN: 'Пока не знаю',
};

export const BUDGET_LABELS: Record<BudgetRangeValue, string> = {
  UNDER_1M: 'до 1 млн ₸',
  FROM_1M_TO_3M: '1–3 млн ₸',
  FROM_3M_TO_10M: '3–10 млн ₸',
  OVER_10M: 'более 10 млн ₸',
  UNKNOWN: 'ещё не определён',
};
