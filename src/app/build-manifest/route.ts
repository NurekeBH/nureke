import { getDictionary } from '@/content';
import { hasCases, getVisibleCases, getAllCases } from '@/content/cases';
import { LOCALES } from '@/lib/i18n';

/**
 * БИЛД МАНИФЕСТІ — postbuild скрипті үшін.
 *
 * Неге бұл керек. `scripts/postbuild.mjs` кейс бар-жоғын білуі керек, ал ол
 * білім `src/content/*.ts` ішінде. Бұрын скрипт сол TS файлдарды ТІКЕЛЕЙ
 * импорттайтын — бірақ ол тек Node 22-де жұмыс істейді (типті өзі алып
 * тастайды). Node 20-да билд `ERR_UNKNOWN_FILE_EXTENSION` деп құлайтын.
 *
 * Логиканы скриптте қайталау да жарамайды — сонда бір ереже екі жерде
 * тұрып, ертең алшақтайды.
 *
 * Сондықтан қосымшаның ӨЗІ билд кезінде осы шағын JSON-ды жазады, ал скрипт
 * оны жалаң Node-пен оқиды. Бір көз сақталады, Node нұсқасына тәуелділік
 * жоғалады.
 *
 * Бұл файл серверге ЖҮКТЕЛМЕЙДІ: postbuild оны оқығаннан кейін өшіреді.
 */
export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    locales: LOCALES,
    cases: Object.fromEntries(
      LOCALES.map((lang) => [
        lang,
        { has: hasCases(lang), visible: getVisibleCases(lang).length, total: getAllCases(lang).length },
      ]),
    ),
    notFound: Object.fromEntries(
      LOCALES.map((lang) => {
        const t = getDictionary(lang).pages.notFound;
        return [lang, { title: t.title, home: t.home, toServices: t.toServices }];
      }),
    ),
  });
}
