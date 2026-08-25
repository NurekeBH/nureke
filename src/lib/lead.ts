import { z } from 'zod';
import { BUDGET_RANGES, PROJECT_TYPES } from '@/content/forms';

/** Форма өрістері — 4-еуден аспайды (docs/architecture/08). */
export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя').max(80),
  phone: z
    .string()
    .trim()
    .min(9, 'Укажите номер WhatsApp')
    .max(24)
    .regex(/^[+\d][\d\s()-]+$/, 'Номер выглядит некорректно'),
  projectType: z.enum(PROJECT_TYPES),
  budgetRange: z.enum(BUDGET_RANGES),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  pageUrl: z.string().trim().max(500).optional().or(z.literal('')),
  /**
   * Спам қақпаны: адам көрмейді, бот толтырады.
   * Мұнда әдейі шектеу қойылмайды — әйтпесе валидация қатесі ботқа қай
   * өріс ұстап тұрғанын айтып қояды. Шешім route ішінде қабылданады.
   */
  website: z.string().max(500).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

const BUDGET_SCORE: Record<LeadInput['budgetRange'], number> = {
  OVER_10M: 35,
  FROM_3M_TO_10M: 30,
  FROM_1M_TO_3M: 22,
  UNDER_1M: 8,
  UNKNOWN: 0,
};

const TYPE_SCORE: Record<LeadInput['projectType'], number> = {
  MOBILE: 20,
  CRM: 18,
  MINIAPP: 16,
  AI_AUTOMATION: 15,
  WEBSITE: 8,
  UNKNOWN: 4,
};

/**
 * Лид бағалау (0–100). docs/architecture/06-mvp-architecture.md.
 * Мақсаты — қайсысына бірінші қоңырау шалу керегін білу.
 */
export function scoreLead(input: LeadInput): { score: number; temperature: 'HOT' | 'WARM' | 'COLD' } {
  let score = BUDGET_SCORE[input.budgetRange] + TYPE_SCORE[input.projectType];

  const message = (input.message ?? '').trim();
  if (message.length >= 200) score += 20;
  else if (message.length >= 60) score += 12;
  else if (message.length > 0) score += 5;

  if ((input.company ?? '').trim().length > 0) score += 10;

  score = Math.min(100, score);
  // Ең жоғары нақты балл (company өрісінсіз) — 75, сондықтан шекаралар сәйкес.
  const temperature = score >= 60 ? 'HOT' : score >= 35 ? 'WARM' : 'COLD';
  return { score, temperature };
}
