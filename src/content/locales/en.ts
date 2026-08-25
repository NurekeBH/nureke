import type { Dictionary } from '../dictionary';

/**
 * ENGLISH DICTIONARY.
 *
 * The type comes from ru.ts: a missing key breaks the build.
 *
 * Prices stay in ₸ on purpose. That is the currency the studio actually
 * invoices in; printing a converted USD figure would go stale the moment
 * the rate moves and would be a number we cannot stand behind
 * (see docs/strategy/00-business-concept.md — no unverifiable numbers).
 */
export const en: Dictionary = {
  meta: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    label: 'English',
    short: 'EN',
  },

  site: {
    tagline: 'Digital systems that make money',
    description:
      'A product studio in Kazakhstan. We build AI sales automation, mobile apps, Telegram Mini Apps and CRMs — systems that bring in leads and revenue, not websites that merely exist.',
    city: 'Almaty',
    country: 'Kazakhstan',
  },

  nav: {
    services: 'Services',
    cases: 'Case studies',
    approach: 'How we work',
    pricing: 'Pricing',
    contact: 'Contact',
  },

  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    menu: 'Menu',
    breadcrumbs: 'Breadcrumbs',
    languageSwitcher: 'Site language',
    footerNav: 'Footer navigation',
  },

  theme: {
    auto: 'Theme: follows the time of day. Click to choose manually',
    light: 'Theme: light. Click to switch',
    dark: 'Theme: dark. Click to return to automatic',
  },

  common: {
    discussProject: 'Discuss a project',
    leaveRequest: 'Send a request',
    whatsappGreeting: 'Hello! I would like to discuss a project.',
    more: 'Read more',
    whatIncluded: "What's included",
    price: 'Price',
    duration: 'Timeline',
    launch: 'Launch',
    support: 'Support',
    mostChosen: 'Most popular',
    workingOn: 'Built with',
    answerNote: 'We reply on WhatsApp within two hours. No sales calls.',
    draftBadge: 'SAMPLE — placeholder, not a real project',
    writeWhatsapp: 'Message on WhatsApp',
  },

  home: {
    eyebrow: 'Product studio',
    yearsSuffix: 'years in development',
    titleLead: "We don't build websites. We build systems that",
    titleAccent: 'make money',
    titleTail: '.',
    lede:
      'An AI assistant that answers customers in 5 seconds. A store inside Telegram with no marketplace commission. A mobile app with a real backend. Launch in as little as two weeks.',
    problems: {
      eyebrow: 'Sound familiar?',
      title: 'Three situations that cost businesses money every single day',
      lede: 'If you recognise even one, it is a solvable technical problem — usually faster than you expect.',
    },
    services: {
      eyebrow: 'Services',
      title: 'What we do',
      lede:
        'We deliberately do only three things. Each solves one concrete problem: stop losing leads, start selling online, own your product.',
    },
    experience: { eyebrow: 'Experience', more: 'More on how we work' },
    process: {
      eyebrow: 'Process',
      title: 'How the work runs',
      lede: 'No "we will call you in a month". Every stage ends with something you can open and check.',
    },
    whyUs: { eyebrow: 'Why us', title: 'Four reasons you can verify' },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Where clients start',
      lede: 'These are reference points. The exact quote comes after Discovery, once the scope is clear.',
      ifUndecided: 'Still deciding?',
    },
    faq: { eyebrow: 'Questions', title: 'Answered upfront' },
    lead: {
      eyebrow: "Let's start",
      title: 'Tell us about the problem',
      lede:
        'Describe the situation in your own words — that is enough. We will come back with questions and tell you honestly whether we can help and roughly what it costs.',
      points: [
        'We reply on WhatsApp within two hours during business hours.',
        'We ask about your business, not about the number of pages.',
        'If it is not our kind of problem, we say so and point you to someone better.',
      ],
    },
  },

  problems: [
    {
      title: 'Leads get lost in WhatsApp',
      body: 'A customer writes at 21:40 and hears back the next morning. By then they have messaged three competitors. Nobody counts how many leads walked away.',
    },
    {
      title: 'The marketplace takes your margin',
      body: 'Sales happen, but the commission keeps growing and the customer base belongs to the platform, not to you. With no channel of your own, there is nobody to sell to twice.',
    },
    {
      title: 'The contractor disappeared',
      body: 'A freelancer built half of it and vanished. The code will not open, there is no documentation, and the business already runs on that system.',
    },
  ],

  process: [
    { step: '01', title: 'Discovery', body: 'We map the business process and work out where the money leaks. You get a spec, an architecture and an exact quote.', duration: '5 days' },
    { step: '02', title: 'Design and prototype', body: 'Screens and flows. You click through a prototype before the first line of code is written.', duration: '3–7 days' },
    { step: '03', title: 'Development', body: 'We work in stages. Every week there is a working build you can open and try.', duration: '2–8 weeks' },
    { step: '04', title: 'QA', body: 'Checklist testing: mobile, desktop, payments, forms, security, load.', duration: '2–5 days' },
    { step: '05', title: 'Launch', body: 'Deployment, domain, analytics, training for your team. We hand over the source code.', duration: '1–3 days' },
    { step: '06', title: 'Support', body: 'Monitoring, improvements, updates. The system keeps evolving instead of going stale.', duration: 'monthly' },
  ],

  experience: {
    headline: "The studio is new. The experience isn't.",
    body: [
      'The Nureke Systems brand is recent, and we will not pretend there is a twenty-year-old company behind it. What is behind it is 15 years of development work: web, mobile apps, backend, internal business systems.',
      'That difference shows on the very first call. We ask where exactly your money is leaking rather than how many pages you need — because we have seen the same problems solved properly and solved expensively.',
    ],
    facts: [
      { value: '15 years', label: 'in development' },
      { value: 'Web · Mobile · Backend', label: 'full cycle in one team' },
      { value: 'Almaty', label: 'working across Kazakhstan' },
    ],
  },

  riskReversal: [
    { title: 'Staged payments, not everything upfront', body: 'The project is split into stages. If a stage does not deliver, you stop and pay nothing further. The most you risk is the cost of one stage, not the whole project.' },
    { title: 'A working build every week', body: 'You do not wait two months to see a result. Every week you get a link you can open and try. If something is going the wrong way, you see it in week two rather than at the end.' },
    { title: 'The Discovery document is yours', body: 'After the Discovery Sprint you hold the spec, the architecture and the quote. Even if you take it to a different contractor, the document stays yours, unconditionally.' },
    { title: 'The code is handed to you', body: 'On full payment you receive the source code and every access credential. No technical lock-in: if you want to change teams, you can.' },
    { title: 'A fixed quote', body: 'Price and timeline are fixed before we start and do not move unless the scope moves. Anything beyond scope is quoted separately rather than appearing as a surprise at the end.' },
    { title: '30 days of free fixes', body: 'For a month after handover we fix anything that does not work the way we agreed. No invoices, no arguing over whether it is a bug or a new feature.' },
  ],

  whyUs: [
    { title: '15 years of practice, not a first project', body: 'Behind us: web, mobile apps and server systems for businesses. We have seen where projects like yours usually break, and we design for it from the start instead of patching it later.' },
    { title: 'You talk to the person writing the code', body: 'Not to an account manager who will "pass it to the dev team". Scoping, estimating and building are done by one person who owns the result.' },
    { title: 'Backend, mobile and admin — one team', body: 'No need to hire three contractors and referee between them. The server side, the app and the admin panel are built together rather than glued together at the end.' },
    { title: 'Money first, polish second', body: 'We ask where you lose customers and what that costs. If an off-the-shelf tool configured for 20 000 ₸ solves it, we will say so instead of selling you a build.' },
  ],

  faq: [
    { q: 'What does it cost, and what drives the price?', a: 'An AI bot with CRM integration starts at 650 000 ₸. A Telegram store starts at 1 500 000 ₸. A mobile app starts at 3 500 000 ₸. Price depends on the number of flows and integrations, not on the number of pages. The exact quote comes after Discovery.' },
    { q: 'How quickly can you launch?', a: 'AI bot — 10–14 days. Telegram Mini App — 3–5 weeks. Mobile app MVP — 6–10 weeks. Timelines are fixed in the contract along with the stages.' },
    { q: 'Who owns the code?', a: 'You do. On full payment we hand over the source code and every access credential. You are not technically tied to us — that is a matter of principle.' },
    { q: "What if I don't know exactly what I need?", a: 'That is what the Discovery Sprint is for — 5 days and 350 000 ₸. You walk away with a spec, an architecture, user flows and a quote. The document is yours: build it with us or with anyone else. If you start the project with us within a month, the fee counts towards it.' },
    { q: 'What are the payment terms?', a: 'Projects under 1M ₸ — 70/30. From 1M to 4M ₸ — 50% to start, 30% at demo, 20% on delivery. Above 4M ₸ — four stages of 40/20/20/20. We do not start without a deposit.' },
    { q: 'What is your experience?', a: '15 years of development: web, mobile apps, server systems and internal business tools. The Nureke Systems brand is new; the experience behind it is not. We are preparing the case studies for publication — some projects are under NDA, others need client sign-off. On a call we will work through your problem: the questions we ask usually show more than pictures in a portfolio.' },
    { q: 'Is there a warranty?', a: '30 days of free fixes after handover. Plus staged delivery: if the first stage does not convince you, you are not obliged to continue.' },
  ],

  packages: [
    {
      name: 'Starter',
      for: 'You need to stop losing leads',
      price: 'from 650 000 ₸',
      duration: '2 weeks',
      support: 'from 80 000 ₸ / month',
      slug: 'ai-automation',
      featured: false,
      items: [
        'AI assistant in WhatsApp or Telegram',
        'Up to 5 conversation flows',
        'Leads land in your CRM',
        'Dashboard of incoming enquiries',
        '30 days of free adjustments',
      ],
    },
    {
      name: 'Growth',
      for: 'You need a sales channel of your own',
      price: 'from 1 500 000 ₸',
      duration: '4 weeks',
      support: 'from 120 000 ₸ / month',
      slug: 'telegram-miniapp',
      featured: true,
      items: [
        'A store inside Telegram',
        'Catalogue, cart, orders',
        'Payments and delivery',
        'Admin panel and reports',
        'Bot notifications for customers',
        'Catalogue migration',
      ],
    },
    {
      name: 'Platform',
      for: 'You need a full product',
      price: 'from 3 500 000 ₸',
      duration: '8–10 weeks',
      support: 'from 200 000 ₸ / month',
      slug: 'mobile-development',
      featured: false,
      items: [
        'iOS and Android app (Flutter)',
        'Your own backend and database',
        'Admin panel',
        'Auth, payments, push',
        'Publishing to the App Store and Google Play',
        'Source code handover',
      ],
    },
  ],

  discovery: {
    name: 'Discovery Sprint',
    price: '350 000 ₸',
    duration: '5 working days',
    pitch:
      'Not sure what you need or what it should cost? In five days we map your process and hand you a document you can take to any contractor.',
    items: [
      'A map of the business process and where money leaks',
      'Technical specification (PRD)',
      'User flows and a screen map',
      'Architecture and the reasoning behind the technology',
      'MVP scope with priorities',
      'Quote and schedule accurate to ±15%',
    ],
    guarantee:
      'The document is yours unconditionally. If you start the project with us within a month, the fee counts towards the price.',
  },

  paymentTerms: [
    { scope: 'Under 1M ₸', schedule: '70% to start · 30% on delivery' },
    { scope: '1–4M ₸', schedule: '50% to start · 30% at demo · 20% on delivery' },
    { scope: 'Above 4M ₸', schedule: '40% to start · 20% stage 1 · 20% stage 2 · 20% on delivery' },
  ],

  pages: {
    service: {
      fitFor: { eyebrow: 'This is for you if', title: 'Does this sound like your situation?' },
      cost: { eyebrow: 'What it costs the business' },
      scope: {
        eyebrow: 'Scope of work',
        title: "What's included — and what isn't",
        included: 'Included in the price',
        notIncluded: 'Not included',
        notIncludedNote:
          'We always write this down upfront so there are no unpleasant surprises halfway through.',
      },
      timeline: { eyebrow: 'Schedule', title: 'How the work is spread out' },
      packages: { eyebrow: 'Packages', title: 'Options and pricing', best: 'Best value' },
      faq: { eyebrow: 'Questions', title: 'What people usually ask' },
      lead: {
        eyebrow: 'Next step',
        title: "Let's talk through your problem",
        lede:
          'Write a couple of sentences about what is happening right now. That is enough for us to come back with specific questions and a price range.',
      },
      launchTime: 'Time to launch',
      discussWhatsapp: 'Discuss on WhatsApp',
      whatsappInterest: 'Hello! I am interested in:',
      priceFrom: 'Price from',
    },
    services: {
      title: 'Three directions instead of a list of thirty',
      lede:
        'We have deliberately limited ourselves to three areas. A studio that does everything usually does nothing well — and you need a result, not a long price list.',
      seoTitle: 'Services — development, AI automation, mobile apps',
      seoDescription:
        'AI sales automation, Telegram Mini Apps and mobile applications. Three directions, a fixed quote, staged payments.',
    },
    approach: {
      eyebrow: 'How we work',
      risk: {
        eyebrow: 'Your risk',
        title: 'Six things that protect you, not us',
        lede:
          'Experience is just words until you have seen it. So the terms are arranged so that you risk as little as possible and can stop at any point.',
      },
      stages: { eyebrow: 'Stages', title: 'How a project runs' },
      payment: { eyebrow: 'Payment', title: 'How payments are split' },
      difference: { eyebrow: 'Difference', title: 'How we differ from the studio you found in search results' },
      next: { eyebrow: 'Next step', title: "Let's work through your problem" },
      nextLede:
        'A 25-minute call: you describe what is happening now, we ask questions and tell you honestly whether we can help. If it is not our kind of problem, we say so straight away.',
      seoTitle: 'How we work — stages, payment, guarantees',
      seoDescription:
        'Staged payments, a working build every week, a fixed quote and source code handover. How a project actually runs.',
    },
    pricing: {
      lede:
        'Below are the reference points clients start from. The exact quote is fixed after Discovery and does not change unless the scope does.',
      leadLede:
        'Describe the problem and we will come back with a price and timeline range. If it is not our kind of problem, we say so right away rather than after three meetings.',
      title: 'Clear prices, no "we will clarify as we go"',
      packages: { eyebrow: 'Packages', title: 'Where clients start' },
      ifUndecided: 'Still deciding?',
      payment: { eyebrow: 'Payment', title: 'How clients pay' },
      importantTitle: 'What else matters',
      important: [
        'Work starts after the deposit — that condition protects both sides.',
        'Anything outside the agreed scope is quoted separately, with its own price and timeline.',
        'The source code is handed over on full payment.',
        '30 days of free fixes after handover.',
        'Support contracts run for a minimum of 6 months.',
      ],
      lead: { eyebrow: "Let's start", title: 'Let us price your project' },
      seoTitle: 'Development pricing — packages and payment terms',
      seoDescription:
        'AI bot from 650 000 ₸, Telegram Mini App from 1 500 000 ₸, mobile app from 3 500 000 ₸. Staged payments, fixed quote.',
    },
    contact: {
      whereBody:
        'We work remotely across the whole country — in-person meetings in Almaty, everything else over video.',
      eyebrow: 'Contact',
      title: 'How to reach us',
      lede: 'The fastest way is WhatsApp. We reply within two hours during business hours.',
      phone: 'Phone',
      email: 'Email',
      whereWeAre: 'Where we are',
      seoTitle: 'Contact',
      seoDescription: 'Reach us on WhatsApp, Telegram or by email. We reply within two hours.',
    },
    cases: {
      eyebrow: 'Case studies',
      title: 'What we have built',
      lede: "The client's problem, what we did, what it runs on and what changed. No invented percentages.",
      seoTitle: 'Case studies — projects and results',
      seoDescription: "Projects we have built: the client's problem, the solution, the technology and the result.",
      result: 'Result',
      whatChanged: 'What changed',
      task: 'Problem',
      whatToSolve: 'What had to be solved',
      solution: 'Solution',
      whatWeDid: 'What we did',
      stack: 'Stack',
      whatItRunsOn: 'What it runs on',
      timeline: 'Timeline',
      testimonial: 'Testimonial',
      whatClientSays: 'What the client says',
      similarTask: 'Similar problem?',
      tellUs: 'Tell us what you need',
      similarLede:
        'Describe the situation in your own words. We will come back with questions and tell you honestly whether we can help and roughly what it costs.',
    },
    notFound: {
      title: 'This page does not exist',
      lede: 'The link may be out of date. Have a look at our services, or message us and we will point you in the right direction.',
      home: 'Go home',
      toServices: 'To services',
    },
  },

  clientsStrip: {
    eyebrow: 'Our clients',
    title: 'Who we work with',
      note:
      'We publish company names only with the client\u2019s written consent. Where we do not have it yet, we name the industry and the city.',
},

  forms: {
    formTitle: "Let's discuss your project",
    formSubtitle: 'We reply on WhatsApp within two hours. No sales calls, no mailing lists.',
    successTitle: 'Request received',
    successBody:
      'We will message you on WhatsApp within two hours during business hours. If it is urgent, message us now and we will reply sooner.',
    messageOptional: '— optional',
    honeypot: 'Do not fill in this field',
    networkError: 'The connection seems to have dropped. Message us on WhatsApp and we will reply right away.',
    required: '*',
    name: 'Your name',
    namePlaceholder: 'What should we call you',
    company: 'Company',
    companyPlaceholder: 'Optional',
    phone: 'WhatsApp',
    projectType: 'What you need',
    budget: 'Budget',
    message: 'Describe the problem',
    messagePlaceholder:
      'For example: enquiries come in on WhatsApp and our manager cannot keep up in the evenings',
    submit: 'Send request',
    sending: 'Sending…',
    success: 'Request received. We will reply on WhatsApp within two hours.',
    error: 'Could not send. Message us on WhatsApp — it is faster.',
    consent: 'By submitting the form you agree to your contact details being processed so we can reply.',
    projectTypes: {
      AI_AUTOMATION: 'AI bot and automation',
      MOBILE: 'Mobile app',
      MINIAPP: 'Telegram Mini App',
      WEBSITE: 'Website / landing page',
      CRM: 'CRM or admin panel',
      UNKNOWN: 'Not sure yet',
    },
    budgets: {
      UNDER_1M: 'under 1M ₸',
      FROM_1M_TO_3M: '1–3M ₸',
      FROM_3M_TO_10M: '3–10M ₸',
      OVER_10M: 'over 10M ₸',
      UNKNOWN: 'not decided yet',
    },
  },

  services: [
    {
      slug: 'ai-automation',
      title: 'AI sales assistant for WhatsApp and Telegram',
      navTitle: 'AI automation',
      promise:
        'Leads stop falling through the cracks. The bot replies in 5 seconds at any hour, works out what the customer needs and creates the deal in your CRM.',
      seoTitle: 'AI bot for business in Kazakhstan — WhatsApp lead automation',
      seoDescription:
        'We deploy an AI assistant in WhatsApp and Telegram: answers 24/7, qualifies the customer and creates a deal in your CRM. Live in 14 days. Almaty, Astana, all of Kazakhstan.',
      priceFrom: '650 000 ₸',
      duration: '10–14 days',
      fitFor: [
        'Enquiries arrive on WhatsApp and Instagram Direct and a manager answers an hour later',
        'Evening and weekend messages sit unanswered until Monday',
        'Nobody knows exactly how many enquiries came in or how many of them bought',
        'Managers spend half the day on the same questions: price, address, timelines',
      ],
      cost: {
        problem: 'A customer who waits more than 15 minutes goes to a competitor.',
        math:
          'If you get 200 enquiries a month, lose 15% of them to slow replies, and one customer is worth 40 000 ₸, that is 1 200 000 ₸ of revenue missed every month.',
      },
      includes: [
        'An AI assistant in WhatsApp and/or Telegram, trained on your knowledge base',
        'Flows: pricing, availability, booking, delivery, order status, objections',
        'Automatic qualification and a 0–100 lead score',
        'Deal creation in your CRM (Bitrix24, amoCRM or ours)',
        'Escalation rules: when the bot hands the conversation to a human',
        'Dashboard: enquiry volume, response time, conversion to deal',
        'Training for your team and 30 days of free adjustments',
      ],
      notIncluded: [
        'The cost of a WhatsApp Business API number (paid to the provider directly)',
        'Writing the knowledge base from scratch — we structure your material, we do not invent it',
        'Voice calls (scoped separately)',
      ],
      timeline: [
        { week: 'Days 1–3', work: 'Reviewing real conversations, collecting the knowledge base, writing flows' },
        { week: 'Days 4–8', work: 'Building the assistant, connecting channels and the CRM' },
        { week: 'Days 9–12', work: 'Testing against real enquiries, tuning' },
        { week: 'Days 13–14', work: 'Launch, team training, dashboard hookup' },
      ],
      packages: [
        { name: 'Start', price: '650 000 ₸', body: 'One channel, up to 5 flows, leads into a spreadsheet or a basic CRM.', featured: false },
        { name: 'Growth', price: '1 200 000 ₸', body: 'WhatsApp + Telegram, knowledge base (RAG), integration with your CRM, dashboard.', featured: true },
        { name: 'Custom', price: 'from 2 000 000 ₸', body: 'Integration with 1C or ERP, multiple departments, complex routing.', featured: false },
      ],
      recurring: 'Support, hosting and improvements from 80 000 ₸ a month.',
      faq: [
        { q: 'Will the bot sound robotic?', a: 'No. The assistant runs on a large language model and answers in your tone of voice. It knows your pricing and your rules, and anything it does not know it hands to a human instead of inventing an answer.' },
        { q: 'What if the customer wants a real person?', a: 'The conversation switches to a manager at any point. We tune the switching rules to you: by keyword, by deal size, by customer sentiment.' },
        { q: 'Do I need a separate number?', a: 'For the WhatsApp Business API, yes — a number not tied to regular WhatsApp. We help you set it up. Telegram does not need a separate number.' },
        { q: 'How soon will I see results?', a: 'The first handled enquiries come in week two. The effect on conversion is assessed honestly on day 30, once there is enough data.' },
      ],
    },
    {
      slug: 'mobile-development',
      title: 'Mobile app for a business or a startup',
      navTitle: 'Mobile apps',
      promise:
        'iOS and Android from one codebase, a real backend and an admin panel. Not a throwaway prototype, but a system you can grow for years.',
      seoTitle: 'Mobile app development in Almaty and Kazakhstan — Flutter, MVP',
      seoDescription:
        'We build mobile apps in Flutter: iOS and Android from one codebase, your own backend, admin panel, payments and push. MVP in 6–10 weeks, staged payments.',
      priceFrom: '3 500 000 ₸',
      duration: '6–10 weeks',
      fitFor: [
        'You have a product idea and need an MVP to show an investor or test demand',
        'The business has outgrown messenger threads and customers need an app of their own',
        'A previous contractor never got the project into the stores',
        'You need logic, not a showcase: payments, wallet, balances, access levels',
      ],
      cost: {
        problem: 'An app built "just to try" cannot be grown — it gets rewritten a year later.',
        math:
          'A rewrite costs more than the original build: you pay twice and lose six months. Getting the architecture right at the start is not a luxury, it is the cheaper option.',
      },
      includes: [
        'A Flutter app: iOS and Android from one codebase',
        'Backend API (NestJS + PostgreSQL) — your own server, not a BaaS',
        'Admin panel: users, content, orders, analytics',
        'Auth: SMS, Telegram OTP or email',
        'Payments and push notifications',
        'Publishing to the App Store and Google Play',
        'The source code and the whole infrastructure are handed to you',
      ],
      notIncluded: [
        'Apple ($99/year) and Google ($25 one-off) developer accounts',
        'Server and SMS gateway costs',
        'App marketing (ASO scoped separately)',
      ],
      timeline: [
        { week: 'Week 1', work: 'Discovery: flows, screens, architecture, data model' },
        { week: 'Weeks 2–3', work: 'Design of the key screens and a clickable prototype' },
        { week: 'Weeks 4–7', work: 'Development: backend, app, admin panel. A build every week' },
        { week: 'Weeks 8–9', work: 'QA, fixes, store preparation' },
        { week: 'Week 10', work: 'Publishing, analytics, handover' },
      ],
      packages: [
        { name: 'MVP Core', price: '3 500 000 ₸', body: 'One key flow, auth, backend, admin panel, publishing.', featured: false },
        { name: 'MVP Plus', price: '6 000 000 ₸', body: 'Plus payments, wallet, profiles, notifications, extended analytics.', featured: true },
        { name: 'Platform', price: 'from 9 000 000 ₸', body: 'Marketplace or fintech logic: multiple roles, balances, payouts, KYC.', featured: false },
      ],
      recurring: 'Support, store-compliance updates and monitoring from 200 000 ₸ a month.',
      faq: [
        { q: 'Why Flutter rather than separate iOS and Android?', a: 'One team and one codebase instead of two: development is roughly twice as cheap and twice as fast, and for business apps the interface is indistinguishable from native. If your project genuinely needs native code, we will say so honestly at Discovery.' },
        { q: 'What is in the MVP and what is not?', a: 'The MVP contains the one flow that creates value and everything it cannot work without. The rest goes into release two. The list is fixed in the contract — both what is in and what is out.' },
        { q: 'What if the App Store rejects the app?', a: 'Publishing is our responsibility. We go through review and fix the findings until approval; that is included in the price.' },
        { q: 'How do I know you can deliver?', a: 'There are 15 years of development behind us — web, mobile and server systems. But you do not have to take that on faith: start with a Discovery Sprint. In five days you get a spec, an architecture and a quote, and you see how we think before paying for a build. After that: staged payments and a working build every week.' },
      ],
    },
    {
      slug: 'telegram-miniapp',
      title: 'A store and service inside Telegram',
      navTitle: 'Telegram Mini App',
      promise:
        'Your own sales channel without marketplace commission. The customer opens your store inside Telegram — no install, no sign-up.',
      seoTitle: 'Telegram Mini App development in Kazakhstan — store and bot, end to end',
      seoDescription:
        'We build Telegram Mini Apps: catalogue, cart, payments, delivery, admin panel and bot notifications. Live in 3–5 weeks. Almaty, Astana.',
      priceFrom: '1 500 000 ₸',
      duration: '3–5 weeks',
      fitFor: [
        'You sell through Kaspi or Instagram and hand commission to the platform',
        'The customer base belongs to the marketplace, not to you',
        'Dealers and wholesalers send orders as spreadsheets and voice notes',
        'You need to start selling quickly without a mobile app budget',
      ],
      cost: {
        problem: 'Platform commission is a tax on every sale, and it never stops.',
        math:
          'At 8 000 000 ₸ of monthly turnover and 10% commission you hand over 800 000 ₸ every month. A channel of your own pays for itself in under three months — and stays yours.',
      },
      includes: [
        'A Mini App inside Telegram: catalogue, search, product page, cart',
        'Checkout, payment and delivery calculation',
        'Bot: order status notifications, broadcasts, support',
        'Admin panel: products, stock, orders, customers, reports',
        'Sales and traffic-source analytics',
        'Catalogue migration from your current system or spreadsheet',
      ],
      notIncluded: [
        'Payment provider fees',
        'Product photography and copywriting',
        'Advertising and traffic acquisition',
      ],
      timeline: [
        { week: 'Week 1', work: 'Catalogue structure, order flows, design' },
        { week: 'Weeks 2–3', work: 'Building the Mini App, the bot and the admin panel' },
        { week: 'Week 4', work: 'Payments, delivery, catalogue migration, testing' },
        { week: 'Week 5', work: 'Launch, training, analytics' },
      ],
      packages: [
        { name: 'Store Lite', price: '1 500 000 ₸', body: 'Catalogue, cart, checkout, bot notifications, a simple admin panel.', featured: false },
        { name: 'Store Pro', price: '2 800 000 ₸', body: 'Plus online payment, delivery zones, promo codes, a full admin panel and reports.', featured: true },
        { name: 'B2B portal', price: 'from 4 000 000 ₸', body: 'Dealer accounts, individual pricing, stock levels, order history and credit limits.', featured: false },
      ],
      recurring: 'Hosting, support and improvements from 120 000 ₸ a month.',
      faq: [
        { q: 'Why Telegram rather than a normal online store?', a: 'The customer installs nothing and signs up for nothing — they are already in Telegram. You also get a direct channel to them: unlike email, notifications actually arrive.' },
        { q: 'Which payment methods can you connect?', a: 'Cards through a local provider, Kaspi transfer by invoice, cash on delivery. The exact set depends on your legal entity and provider.' },
        { q: 'Can we build a full app later?', a: 'Yes. The backend and admin panel stay the same — a mobile app connects to the existing API. That is a deliberate part of the architecture.' },
      ],
    },
  ],

  clients: [
    { name: 'Dental clinic chain', industry: 'Healthcare', city: 'Almaty', draft: true },
    { name: 'Wholesale food supplier', industry: 'Wholesale', city: 'Almaty', draft: true },
    { name: 'Delivery service', industry: 'Logistics', city: 'Astana', draft: true },
    { name: 'Car service centre', industry: 'Automotive', city: 'Almaty', draft: true },
    { name: 'Education centre', industry: 'Education', city: 'Shymkent', draft: true },
  ],
};
