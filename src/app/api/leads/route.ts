import { NextResponse } from 'next/server';
import { leadSchema, scoreLead } from '@/lib/lead';
import { notifyNewLead } from '@/lib/telegram';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Слишком много попыток. Напишите нам в WhatsApp — так быстрее.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректный запрос.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: firstIssue?.message ?? 'Проверьте заполнение формы.' },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Ловушка сработала — это бот. Отвечаем как при успехе, чтобы он не подбирал обход.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const { score, temperature } = scoreLead(lead);

  let savedId: string | null = null;
  if (prisma) {
    try {
      const created = await prisma.lead.create({
        data: {
          name: lead.name,
          company: lead.company || null,
          phone: lead.phone,
          message: lead.message || null,
          pageUrl: lead.pageUrl || null,
          projectType: lead.projectType,
          budgetRange: lead.budgetRange,
          source: 'WEBSITE',
          score,
          temperature,
          status: 'NEW',
          nextAction: 'Написать в WhatsApp',
          nextActionAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
        select: { id: true },
      });
      savedId = created.id;
    } catch (error) {
      // База недоступна — это не повод терять заявку. Идём дальше в Telegram.
      console.error('[leads] db write failed', error);
    }
  }

  const notified = await notifyNewLead(lead, { score, temperature, id: savedId });

  if (!savedId && !notified) {
    if (process.env.NODE_ENV === 'production') {
      // В проде это означает, что заявку сохранить негде. Говорим честно, а не молча теряем.
      console.error('[leads] LOST LEAD, no sink available', JSON.stringify({ ...lead, score, temperature }));
      return NextResponse.json(
        { ok: false, error: 'Не удалось принять заявку. Напишите нам в WhatsApp — ответим сразу.' },
        { status: 503 },
      );
    }
    // Локальная разработка без базы и бота: форму нужно уметь проверить.
    console.warn('[leads] dev mode, no sink configured:', JSON.stringify({ ...lead, score, temperature }));
  }

  return NextResponse.json({ ok: true });
}
