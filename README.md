# Nureke

Сайт продуктовой студии и внутренняя CRM.
Домен: **nureke.kz**

> Стратегия, исследование рынка, офферы и решения — в [`/docs`](docs/README.md).
> Начинать чтение оттуда, а не с кода.

## Стек

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 3 · Prisma 6 · PostgreSQL 16

Обоснование выбора: [ADR-0002](docs/decisions/0002-platform-architecture.md).
Правило: новые зависимости добавляются только с письменным обоснованием.

## Локальный запуск

```bash
cp .env.example .env
npm install                  # postinstall сам делает prisma generate
npm run db:push              # накатить схему (нужен DATABASE_URL)
npm run dev                  # http://localhost:3000
```

Без `DATABASE_URL` сайт всё равно работает: заявка уходит в Telegram, а в
режиме разработки просто пишется в консоль. Форма не должна ломаться из-за
того, что у разработчика не поднята база.

## Проверки перед пушем

```bash
npm run typecheck && npm run lint && npm run build
```

## Прод

```bash
cp .env.example .env         # заполнить POSTGRES_PASSWORD, контакты и токен бота
docker compose up -d --build
# сайт на порту 3003, база на 5433
```

Сборка использует `output: standalone`, поэтому вне Docker сервер поднимается
как `node .next/standalone/server.js`, а не `next start`.

## Переменные окружения

| Переменная | Обязательна | Зачем |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | да в проде | canonical, sitemap, Open Graph |
| `NEXT_PUBLIC_PHONE` / `_WHATSAPP` / `_TELEGRAM` / `_EMAIL` | да | контакты на сайте |
| `DATABASE_URL` | желательно | хранение заявок |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | желательно | мгновенное уведомление о заявке |

Если не настроено ни то ни другое, в проде форма честно вернёт ошибку и
попросит написать в WhatsApp — вместо того чтобы молча потерять заявку.

## Что уже готово (фаза P1)

- Главная, каталог услуг и три страницы услуг, «Как мы работаем», цены, контакты
- Форма заявки: валидация, honeypot, ограничение частоты, скоринг 0–100
- Запись заявки в базу + уведомление в Telegram
- SEO: метаданные, sitemap, robots, разметка Organization / Service / FAQPage
- Тёмная тема, mobile-first, липкая кнопка WhatsApp

Дальше по плану: [roadmap](docs/strategy/05-30-day-roadmap.md).

## Правила проекта

- Весь текст и цены живут в `src/content/`. В компонентах хардкода нет.
- **Раздела `/cases` нет намеренно.** Публичных клиентских кейсов пока не
  существует, а придумывать их запрещено — [ADR-0003](docs/decisions/0003-no-portfolio-strategy.md).
  Раздел появится после сдачи первого проекта.
- Никаких непроверяемых цифр в маркетинговых текстах.
