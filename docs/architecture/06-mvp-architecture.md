# 06 — Studio Platform MVP Architecture

> Status: PROPOSED · Date: 2026-08-25 · Owner: Senior Developer Agent

## SUMMARY

Studio платформасы = **1 деплой бірлігі**: SEO-ға жарамды публикалық сайт +
жабық CRM/proposal панелі. Стек: **Next.js 16 (App Router) full-stack +
Prisma + PostgreSQL**, жеке repo-да, жеке docker-compose-пен.

Себебі: сайт SEO-ны талап етеді (SSR/ISR), ал CRM кішкентай (≈10 кесте).
Екеуіне екі бөлек сервис — бос overhead. Бір Next.js қосымшасы ең жылдам
ақшаға апарады.

---

## OPTIONS CONSIDERED

Толық талдау: [ADR-0002](../decisions/0002-platform-architecture.md).
Қысқаша: Next.js full-stack таңдалды, себебі CRM қарапайым CRUD, ал сайтқа
SSR/ISR міндетті. Бөлек backend сервис — бұл көлемге ерте оптимизация.

## STACK

| Қабат | Таңдау | Неге |
|---|---|---|
| Frontend + Backend | **Next.js 16 (App Router), React 19, TypeScript** | admin-де бар — команда біледі; SSR/ISR SEO үшін міндетті |
| Стиль | **Tailwind CSS** | admin-де бар, жылдам |
| DB | **PostgreSQL 16** (бар инстанс, `studio` схемасы) | бар инфрақұрылым, реляциялық деректер |
| ORM | **Prisma 6** | backend-те бар, migration жүйесі сенімді |
| Auth (admin) | **Auth.js (credentials) + bcrypt** | 1–3 пайдаланушы, артық нәрсе керек емес |
| Email/хабарлама | **Telegram Bot API** (лид → чат) + Resend (email) | Telegram бот бар, лид туралы 5 секундта білу керек |
| AI | **Anthropic Claude API** (`claude-sonnet-5`) | AI-консультант + proposal генерациясы |
| Analytics | **Plausible немесе GA4 + өз event логы** | conversion өлшеу |
| Деплой | **Docker + Nginx** (бар compose-қа сервис қосу) | бар инфрақұрылым, қосымша шығын жоқ |
| Файлдар | локалды volume → кейін S3-үйлесімді | ерте оптимизация жасамаймыз |

**Стек таңдау принципі:** жаңа технология ҚОСПАЙМЫЗ. Тек командада бар
және продакшнда тексерілген нәрсе. Жылдамдық > сән.

---

## DIRECTORY LAYOUT

```
/src
  /app
    /(marketing)                  ← публикалық, SSG/ISR
      page.tsx                    Home
      /services  /services/[slug] Қызмет беттері (SEO)
      /approach                   Қалай жұмыс істейміз (кейстің орнына)
      /pricing  /contact
      /kz/[city]                  Қала беттері (SEO, P5)
    /(app)                        ← жабық, auth керек (P2+)
      /crm                        Lead pipeline
      /leads/[id]                 Лид карточкасы
      /proposals/[id]             Ұсыныс редакторы
    /api                          Route handlers
      /leads  /calculator  /ai-consultant
  /components  /content  /lib
/prisma/schema.prisma
/docs                             стратегия, зерттеу, шешімдер
/templates                        кейін: қайта пайдаланылатын шаблондар
```

> `/cases` бөлімі **әдейі жоқ** — жарияланатын клиенттік кейс болмағанда ол
> бос бет немесе өтірік болар еді. Бірінші клиент тапсырылған соң ашылады
> ([ADR-0003](../decisions/0003-no-portfolio-strategy.md)).

## DATA MODEL (MVP — 6 кесте жеткілікті)

```prisma
model Lead {
  id            String   @id @default(cuid())
  name          String
  company       String?
  phone         String
  email         String?
  source        LeadSource        // WEBSITE | CALCULATOR | AI_CONSULTANT | OUTBOUND | REFERRAL
  projectType   ProjectType?      // WEBSITE | MOBILE | CRM | AI | MINIAPP | OTHER
  budgetRange   String?
  deadline      String?
  message       String?
  score         Int      @default(0)   // 0-100
  temperature   Temperature           // HOT | WARM | COLD
  status        PipelineStatus        // NEW → QUALIFIED → DISCOVERY → PROPOSAL →
                                      // NEGOTIATION → WON | LOST → PROJECT →
                                      // DELIVERED → SUPPORT
  nextAction    String?
  nextActionAt  DateTime?
  ownerId       String?
  activities    Activity[]
  proposals     Proposal[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Activity {                       // әр әрекет журналы
  id        String   @id @default(cuid())
  leadId    String
  type      String                     // CALL | MESSAGE | EMAIL | MEETING | NOTE | STATUS_CHANGE
  body      String
  createdAt DateTime @default(now())
}

model Proposal {
  id            String   @id @default(cuid())
  leadId        String
  publicToken   String   @unique       // клиентке сілтеме
  title         String
  problem       String                 // Client Problem
  understanding String                 // Our Understanding
  solution      String                 // Proposed Solution
  scope         Json                   // features in/out
  techStack     Json
  timeline      Json                   // milestones
  priceKzt      Int
  paymentPlan   Json
  supportPlan   String?
  status        String                 // DRAFT | SENT | VIEWED | ACCEPTED | REJECTED
  viewedAt      DateTime?
  createdAt     DateTime @default(now())
}

model CaseStudy {                       // портфолио, SEO-мен
  id       String @id @default(cuid())
  slug     String @unique
  client   String
  industry String
  problem  String
  solution String
  tech     String[]
  result   String
  timeline String
  published Boolean @default(false)
}

model Service {                          // қызмет беттері, SEO контент
  id       String @id @default(cuid())
  slug     String @unique
  title    String
  seoTitle String
  seoDesc  String
  body     String                        // MDX
  priceFrom Int
}

model AiSession {                        // AI-консультант диалогтары
  id        String   @id @default(cuid())
  leadId    String?
  messages  Json
  summary   Json?                        // Project Summary / Recommended Solution / ...
  createdAt DateTime @default(now())
}
```

**Ескерту:** `User` кестесі MVP-де қажет емес — 1–2 админ үшін
env-тегі credentials жеткілікті. Команда өскенде қосылады.

---

## LEAD SCORING (автоматты, 0–100)

```
Бюджет:      >5 млн ₸ = 35 · 2–5 млн = 25 · 1–2 млн = 15 · <1 млн = 5 · белгісіз = 0
Мерзім:      <1 ай = 20 · 1–3 ай = 15 · >3 ай = 5 · «қарап жүрміз» = 0
ЛПР:         иесі/директор = 20 · менеджер = 10 · белгісіз = 0
Проблема:    нақты сипатталған = 15 · жалпы = 5
Көз:         REFERRAL = 10 · AI_CONSULTANT = 8 · CALCULATOR = 6 · WEBSITE = 4 · OUTBOUND = 2

HOT ≥ 70  ·  WARM 40–69  ·  COLD < 40
```
HOT лид келгенде → Telegram-ға дереу push + `nextActionAt = +2 сағат`.

---

## SECURITY BASELINE (MVP-де де міндетті)

- Барлық лид формасында rate limit + honeypot өрісі (спам)
- Zod валидациясы әр Route Handler-де
- Prisma параметрленген сұраныстар (raw SQL жоқ)
- Admin бөлімі middleware-мен қорғалады, cookie `httpOnly` + `secure`
- Secrets тек env-те, repo-ға ешқашан кірмейді
- AI Consultant: prompt injection-ға қарсы — клиент мәтіні әрқашан
  «деректер» ретінде беріледі, нұсқау ретінде емес; құрал шақыруы жоқ
- Публикалық Proposal сілтемесі — random token, индекстелмейді (`noindex`)

---

## PERFORMANCE / SEO BASELINE

- Marketing беттері — SSG/ISR (`revalidate: 3600`), CRM — dynamic
- LCP < 2,0 с, CLS < 0,1, Lighthouse ≥ 90
- `next/image`, WebP, шрифт subset (кириллица + латын)
- `sitemap.xml`, `robots.txt`, `hreflang` (kk/ru/en)
- Schema.org: `Organization`, `Service`, `FAQPage`, `BreadcrumbList`
- Әр қызмет бетінде: H1 + проблема + шешім + баға + кейс + FAQ + CTA

---

## PHASING

| Фаза | Не жасалады | Мерзім |
|---|---|---|
| **P1** | Marketing сайт (Home, 3 қызмет, Approach, Pricing, Contact) + лид форма + Telegram хабарлама | 4–6 күн |
| **P2** | CRM pipeline + Lead scoring + Activity журналы | 3–4 күн |
| **P3** | Proposal генератор (шаблон + публикалық сілтеме) | 3 күн |
| **P4** | Project calculator | 2 күн |
| **P5** | SEO беттері (қызмет × қала) + мазмұн | 3 күн |
| **P6** | AI Consultant (Claude API) | 3 күн |

**P1 бітпей P4-ке өтпейміз.** Әр фаза деплой болып, лид қабылдай алуы керек.
