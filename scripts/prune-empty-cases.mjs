/**
 * Билдтен кейін: жарияланған кейс жоқ болса, /cases беттерін өшіру.
 *
 * МӘСЕЛЕ (ADR-0002b, ашық мәселе). Кейс жоқта `cases/page.tsx` пен
 * `cases/[slug]/page.tsx` `notFound()` шақырады, бірақ `output: 'export'`
 * ол беттерді бәрібір файлға жазып қояды. Нәтижесі: Apache оларды 200-мен
 * береді. Мазмұны — 404 беті, кейс мазмұны ағып кетпейді (ADR-0003 бұзылмаған),
 * бірақ іздеу жүйесі бос бетті «бар» деп көреді.
 *
 * НЕГЕ БЕТ ЖАСАЛМАЙТЫНДАЙ ЕТІП ТҮЗЕТУГЕ БОЛМАЙДЫ. `generateStaticParams()`
 * бос тізім қайтарса, билд құлайды:
 *   Error: Page "/cases/[slug]" is missing "generateStaticParams()"
 *          so it cannot be used with "output: export" config.
 * Сондықтан беттер жасалады да, содан кейін өшіріледі.
 *
 * НЕГЕ МӘТІН ІЗДЕУ АРҚЫЛЫ ЕМЕС. Бұрын «404 маркері бар HTML-дерді өшіру»
 * жолы сыналған және жарамсыз болған: маркер Next-тің әр бетінің
 * RSC-жүктемесінде отыр, сүзгі 14 беттің бәрін өшіріп жіберген.
 * Мұнда мәтін мүлдем ізделмейді — шешімді `hasCases` береді, ал ол
 * қосымшаның өзі қолданатын `src/content/cases.ts`-тен тікелей оқылады.
 * Яғни логика екі жерде қайталанбайды: кейс қосылса, скрипт өзі тоқтайды.
 *
 * ПАПКА ДА ӨШІРІЛЕДІ. Тек `cases.html` өшірілсе, `out/cases/` папкасы қалады
 * да, `.htaccess`-тегі `!-d` шарты сәйкес келмей, Apache `Options -Indexes`
 * салдарынан 404 емес, 403 қайтарады.
 */
import { rm, access, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');

const exists = async (p) => access(p).then(() => true, () => false);

if (!(await exists(OUT))) {
  console.error('prune-empty-cases: out/ жоқ. Алдымен `npm run build`.');
  process.exit(1);
}

/**
 * `.env` файлдарын Next-тің тәртібімен жүктейміз.
 *
 * Бұл МІНДЕТТІ. Next `.env`-ті өзі оқиды, ал жалаң Node оқымайды. Онсыз:
 * иесі `.env` ішіне `NEXT_PUBLIC_SHOW_DRAFT_CASES="true"` деп қояды →
 * Next кейс беттерін ШЫН мазмұнмен жасайды → бұл скрипт айнымалыны көрмей,
 * «кейс жоқ» деп сол беттерді үнсіз өшіреді. Тексерілген: дәл солай болатын.
 *
 * Тәртіп (жоғарыдан төмен): нақты орта → .env.production.local → .env.local
 * → .env.production → .env. Жоғарыдағы жеңеді, сондықтан бар кілт қайта
 * жазылмайды. `next build` әрқашан production болғандықтан тізім осындай.
 */
for (const file of ['.env.production.local', '.env.local', '.env.production', '.env']) {
  const path = join(ROOT, file);
  if (!(await exists(path))) continue;
  const parsed = parseEnv(await readFile(path, 'utf8'));
  for (const [key, value] of Object.entries(parsed)) {
    if (!(key in process.env)) process.env[key] = value;
  }
}

// Қосымшамен бір көз: SHOW_DRAFTS та, draft сүзгісі де сол файлда.
// Импорт ЕНВ жүктелгеннен КЕЙІН болуы керек — cases.ts оны модуль
// жүктелген сәтте оқиды, сондықтан жоғары шығаруға болмайды.
const { hasCases, CASES, VISIBLE_CASES } = await import('../src/content/cases.ts');

if (hasCases) {
  console.log(
    `prune-empty-cases: ${VISIBLE_CASES.length}/${CASES.length} кейс көрінеді — /cases қалдырылды.`,
  );
  process.exit(0);
}

// Барлығы 404 беті: тізім беті, оның RSC-жүктемесі және slug беттерінің папкасы.
const targets = ['cases.html', 'cases.txt', 'cases'];
const removed = [];

for (const name of targets) {
  const path = join(OUT, name);
  if (!(await exists(path))) continue;
  await rm(path, { recursive: true, force: true });
  removed.push(name);
}

// 404 беті болмаса, .htaccess-тегі ErrorDocument бос жерге сілтейді.
if (!(await exists(join(OUT, '404.html')))) {
  console.error('prune-empty-cases: out/404.html жоқ — ErrorDocument жұмыс істемейді.');
  process.exit(1);
}

console.log(
  removed.length
    ? `prune-empty-cases: жарияланған кейс жоқ — өшірілді: ${removed.join(', ')} (енді /cases → 404).`
    : 'prune-empty-cases: өшіретін ештеңе жоқ.',
);
