export type Package = {
  name: string;
  for: string;
  price: string;
  duration: string;
  support: string;
  href: string;
  featured?: boolean;
  items: readonly string[];
};

export const PACKAGES: readonly Package[] = [
  {
    name: 'Starter',
    for: 'Нужно перестать терять заявки',
    price: 'от 650 000 ₸',
    duration: '2 недели',
    support: 'от 80 000 ₸ / мес',
    href: '/services/ai-automation',
    items: [
      'AI-ассистент в WhatsApp или Telegram',
      'До 5 сценариев диалога',
      'Заявки попадают в CRM',
      'Дашборд по обращениям',
      '30 дней бесплатных доработок',
    ],
  },
  {
    name: 'Growth',
    for: 'Нужен свой канал продаж',
    price: 'от 1 500 000 ₸',
    duration: '4 недели',
    support: 'от 120 000 ₸ / мес',
    href: '/services/telegram-miniapp',
    featured: true,
    items: [
      'Магазин внутри Telegram',
      'Каталог, корзина, заказы',
      'Оплата и доставка',
      'Админ-панель и отчёты',
      'Бот-уведомления клиентам',
      'Перенос каталога',
    ],
  },
  {
    name: 'Platform',
    for: 'Нужен полноценный продукт',
    price: 'от 3 500 000 ₸',
    duration: '8–10 недель',
    support: 'от 200 000 ₸ / мес',
    href: '/services/mobile-development',
    items: [
      'Приложение iOS и Android (Flutter)',
      'Собственный backend и база данных',
      'Админ-панель',
      'Авторизация, платежи, push',
      'Публикация в App Store и Google Play',
      'Передача исходного кода',
    ],
  },
];

export const DISCOVERY = {
  name: 'Discovery Sprint',
  price: '350 000 ₸',
  duration: '5 рабочих дней',
  pitch:
    'Не знаете, что именно нужно и сколько это стоит? За пять дней разбираем ваш процесс и отдаём документ, с которым можно идти к любому подрядчику.',
  items: [
    'Карта бизнес-процесса и точки, где теряются деньги',
    'Техническое задание (PRD)',
    'Сценарии пользователей и карта экранов',
    'Архитектура и обоснование технологий',
    'Состав MVP с приоритетами',
    'Смета и график с точностью ±15%',
  ],
  guarantee:
    'Документ принадлежит вам без всяких условий. Если начнёте проект с нами в течение месяца — сумма засчитывается в стоимость.',
} as const;

export const PAYMENT_TERMS = [
  { scope: 'До 1 млн ₸', schedule: '70% старт · 30% сдача' },
  { scope: '1–4 млн ₸', schedule: '50% старт · 30% демо · 20% сдача' },
  { scope: 'Свыше 4 млн ₸', schedule: '40% старт · 20% этап 1 · 20% этап 2 · 20% сдача' },
] as const;
