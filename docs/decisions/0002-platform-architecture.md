# ADR-0002 — Studio платформасының стегі мен құрылымы

**Status:** ✅ ACCEPTED
**Date:** 2026-08-25 · **Updated:** 2026-08-25 (жеке repo-ға көшу)

## Context
Студияға SEO-ға жарамды публикалық сайт + жабық CRM/proposal панелі керек.
Сұрақ: қандай стекпен және қандай құрылымда құру?

## Options Considered

| # | Нұсқа | + | − | Шешім |
|---|---|---|---|---|
| A | **Next.js full-stack** (App Router) + Prisma + PostgreSQL, бір деплой бірлігі | SSR/ISR SEO үшін дайын, CRM қарапайым CRUD — артық сервис керек емес, ops арзан | Route Handlers-те ауыр backend логика ыңғайсыз | ✅ **ТАҢДАЛДЫ** |
| B | Бөлек backend (NestJS) + бөлек frontend | Backend күшті | Екі сервис, екі деплой, екі есе ops — CRM көлеміне мүлдем сәйкес емес | ❌ |
| C | Дайын CMS/конструктор (Tilda, WordPress) | Ең жылдам старт | AI-консультант, CRM, калькулятор — бәрі шектеулі. Өз өнімімізді сата алмаймыз | ❌ |

## Decision
**A нұсқасы.** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 3
+ Prisma 6 + PostgreSQL 16. Өз repo, өз docker-compose, өз базасы.

## Reason
- Studio CRM — CRUD-ы басым, күрделі транзакциялық логикасы жоқ жүйе.
  Оған бөлек backend сервис көтеру — ерте оптимизация.
- Сайтқа SSR/ISR міндетті: SEO — негізгі inbound көзі болады.
- Бір деплой бірлігі = бір Dockerfile, бір compose, бір мониторинг.
  Founder жалғыз кезеңде ops уақыты — тікелей сату уақытының шығыны.
- Стек командаға таныс → үйрену уақыты нөл.

## Consequences
- Егер CRM күрделенсе (команда 5+, көп рөл, ауыр есептеу) — кейін бөлек
  backend сервиске бөліп шығаруға болады. Prisma схемасы бөлек тұрғандықтан
  көшу қиын емес. Ол шешім керек болғанда ADR-0002b болып жазылады.
- `output: standalone` → продта `node .next/standalone/server.js`,
  `next start` емес.

## Ережелер
- **Жаңа технология қосылмайды.** Тек Next.js, Prisma, PostgreSQL, Tailwind,
  zod. Жаңа тәуелділік — жазбаша негіздемемен.
- Барлық мәтін мен баға `src/content/` ішінде. Компонентте hardcode жоқ.
- Marketing беттері статикалық (ISR), тек `/api` динамикалық.
