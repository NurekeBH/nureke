/**
 * Билдтен кейінгі екі жұмыс.
 *
 * 1. ЖАРИЯЛАНҒАН КЕЙС ЖОҚ ТІЛДЕ `/cases` беттерін өшіру.
 *
 *    Кейс жоқта беттер `notFound()` шақырады, бірақ `output: 'export'` оларды
 *    бәрібір файлға жазып қояды да, Apache оларды 200-мен береді. Мазмұны —
 *    404 беті, кейс мазмұны ағып кетпейді (ADR-0003 бұзылмаған), бірақ іздеу
 *    жүйесі бос бетті «бар» деп көреді.
 *
 *    Кодта түзетуге болмайды: `generateStaticParams()` бос тізім қайтарса,
 *    билд құлайды («missing generateStaticParams … with output: export»).
 *
 *    Мәтін ІЗДЕЛМЕЙДІ. Бұрын сыналған «404 маркері бар HTML-дерді өшіру» жолы
 *    жарамсыз болған: маркер әр беттің RSC-жүктемесінде отыр, сүзгі барлық
 *    бетті өшіріп жіберген. Мұнда шешімді `hasCases(lang)` береді, ал ол
 *    қосымшаның өзі қолданатын `src/content/cases.ts`-тен тікелей оқылады.
 *
 * 2. ҮШ ТІЛДЕГІ 404 БЕТІН ЖАСАУ.
 *
 *    Apache ешбір файлға сәйкес келмеген сұрауға `out/404.html` береді.
 *    Ол сәтте келушінің тілі белгісіз — `/kk/joq` та, `/joq` та сол бетке
 *    түседі. Сондықтан ол әдейі үш тілде: әуежай маңдайшасы сияқты.
 */
import { rm, access, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');

const exists = async (p) => access(p).then(() => true, () => false);

if (!(await exists(OUT))) {
  console.error('postbuild: out/ жоқ. Алдымен `npm run build`.');
  process.exit(1);
}

/**
 * Билд манифесті — `src/app/build-manifest/route.ts` жазады.
 *
 * Скрипт TS файлдарды ТІКЕЛЕЙ оқымайды. Бұрын оқитын, бірақ ол тек Node 22-де
 * жұмыс істейді (типті өзі алып тастайды): Node 20-да билд
 * `ERR_UNKNOWN_FILE_EXTENSION` деп құлайтын. Енді шешімді қосымшаның өзі
 * билд кезінде JSON-ға жазады да, мұнда жалаң Node оқиды.
 *
 * Қосымша ұтыс: `.env` файлдарын қолмен талдаудың қажеті жоқ — манифестті
 * Next жазады, ал ол `.env`-ті өзі оқып қойған. Бұрын мұнда сол логика
 * қайталанып тұрған, әрі ұмытылса үнсіз қате беретін.
 */
const MANIFEST = join(OUT, 'build-manifest');

if (!(await exists(MANIFEST))) {
  console.error('postbuild: out/build-manifest жоқ — src/app/build-manifest/route.ts өшіп қалған ба?');
  process.exit(1);
}

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
const LOCALES = manifest.locales;

// ── 1. Кейс жоқ тілдерде /cases өшіріледі ───────────────────────────────────
for (const lang of LOCALES) {
  const cases = manifest.cases[lang];
  if (cases.has) {
    console.log(`postbuild: ${lang} — ${cases.visible}/${cases.total} кейс көрінеді, /cases қалдырылды.`);
    continue;
  }

  // Папка да өшіріледі: тек cases.html өшірілсе, Apache 404 емес, 403 қайтарады
  // (`.htaccess` ішіндегі DirectorySlash/-Indexes ескертпесін қара).
  const removed = [];
  for (const name of [`${lang}/cases.html`, `${lang}/cases.txt`, `${lang}/cases`]) {
    const path = join(OUT, name);
    if (!(await exists(path))) continue;
    await rm(path, { recursive: true, force: true });
    removed.push(name);
  }
  console.log(
    removed.length
      ? `postbuild: ${lang} — жарияланған кейс жоқ, өшірілді: ${removed.join(', ')}`
      : `postbuild: ${lang} — өшіретін ештеңе жоқ.`,
  );
}

// ── 2. Тілі белгісіз келушіге арналған 404 ──────────────────────────────────
const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const blocks = LOCALES.map((lang) => {
  const t = manifest.notFound[lang];
  return `    <section lang="${lang}">
      <h2>${esc(t.title)}</h2>
      <p><a href="/${lang}">${esc(t.home)}</a> · <a href="/${lang}/services">${esc(t.toServices)}</a></p>
    </section>`;
}).join('\n');

// Бет өз бетінше тұрады: CSS те, JS те сыртқы файлға тәуелді емес. Себебі
// 404 кез келген жолда шығады, ал салыстырмалы жолдар ол жерде сынуы мүмкін.
const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 — Nureke Systems</title>
<style>
:root { color-scheme: dark light; --bg:#0A0B0D; --fg:#E8EAED; --muted:#9BA1AA; --nur:#FFB020; --line:#262A32; }
@media (prefers-color-scheme: light) {
  :root { --bg:#FBFAF9; --fg:#1A1C20; --muted:#61656C; --nur:#B45309; --line:#E4E1DC; }
}
* { box-sizing: border-box; }
body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:var(--bg); color:var(--fg); padding:24px;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Noto Sans',Arial,sans-serif; }
main { width:100%; max-width:520px; text-align:center; }
.code { color:var(--nur); font-size:12px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; }
section { padding:20px 0; border-top:1px solid var(--line); }
section:first-of-type { border-top:0; }
h2 { margin:0 0 10px; font-size:18px; font-weight:600; }
p { margin:0; color:var(--muted); font-size:14px; }
a { color:var(--nur); text-decoration:none; }
a:hover { text-decoration:underline; }
</style>
</head>
<body>
  <main>
    <p class="code">404</p>
${blocks}
  </main>
</body>
</html>
`;

await writeFile(join(OUT, '404.html'), html, 'utf8');
console.log('postbuild: out/404.html жасалды (үш тілде).');

// Манифест — ішкі билд деректері, серверге жүктелмеуі керек.
await rm(MANIFEST, { force: true });
console.log('postbuild: build-manifest өшірілді (серверге жүктелмейді).');
