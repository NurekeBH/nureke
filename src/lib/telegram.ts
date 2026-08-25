import { BUDGET_LABELS, PROJECT_TYPE_LABELS } from '@/content/forms';
import type { LeadInput } from './lead';

const TELEGRAM_API = 'https://api.telegram.org';

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Жаңа лид туралы Telegram-ға дереу хабарлама.
 * Сәтсіз болса — қате лақтырмайды, тек логқа жазады: пайдаланушыға
 * әрқашан «қабылданды» деп жауап беруіміз керек.
 */
export async function notifyNewLead(
  lead: LeadInput,
  meta: { score: number; temperature: string; id: string | null },
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const heat = meta.temperature === 'HOT' ? '🔥' : meta.temperature === 'WARM' ? '🟡' : '⚪️';
  const lines = [
    `${heat} <b>Новая заявка — ${escapeHtml(meta.temperature)} (${meta.score}/100)</b>`,
    '',
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    lead.company ? `<b>Компания:</b> ${escapeHtml(lead.company)}` : null,
    `<b>WhatsApp:</b> ${escapeHtml(lead.phone)}`,
    `<b>Задача:</b> ${escapeHtml(PROJECT_TYPE_LABELS[lead.projectType])}`,
    `<b>Бюджет:</b> ${escapeHtml(BUDGET_LABELS[lead.budgetRange])}`,
    lead.message ? `\n<b>Сообщение:</b>\n${escapeHtml(lead.message)}` : null,
    lead.pageUrl ? `\n<i>Страница: ${escapeHtml(lead.pageUrl)}</i>` : null,
    meta.id ? `<i>ID: ${escapeHtml(meta.id)}</i>` : '<i>⚠️ В базу не записано</i>',
    '',
    '⏱ Ответить в течение 2 часов.',
  ].filter(Boolean);

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error('[telegram] sendMessage failed', response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('[telegram] sendMessage error', error);
    return false;
  }
}
