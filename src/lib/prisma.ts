import { PrismaClient } from '@/generated/prisma';

/**
 * Prisma клиенті МІНДЕТТІ ЕМЕС.
 * DATABASE_URL қойылмаса — сайт жұмыс істей береді, лид Telegram арқылы
 * жетеді. Лидті жоғалтқаннан гөрі базасыз жұмыс істеген артық.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient | null = process.env.DATABASE_URL
  ? (globalForPrisma.prisma ??= new PrismaClient())
  : null;

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma;
}
