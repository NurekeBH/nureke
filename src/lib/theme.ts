/**
 * Тақырыпты таңдау ережесі — БІР ЖЕРДЕ.
 *
 * Оны екі нәрсе қолданады: layout.tsx ішіндегі inline скрипт (бет
 * боялғанға дейін жүреді) және theme-toggle.tsx. Екеуі бөлек жазылса,
 * сағат шекарасында олар келіспей қалып, бет жыпылықтайтын еді.
 */

export type Theme = 'light' | 'dark';

/** `auto` — уақытқа қарай. Қалғаны — келуші өзі таңдаған, ол басым. */
export type ThemePreference = 'auto' | Theme;

export const THEME_STORAGE_KEY = 'nureke-theme';

/** Жарық тақырып осы аралықта: [7:00, 19:00). Келушінің жергілікті уақыты. */
export const LIGHT_FROM_HOUR = 7;
export const LIGHT_UNTIL_HOUR = 19;

/** Браузердің мекенжай жолағы да тақырыппен бірге боялады. */
export const THEME_COLOR: Record<Theme, string> = {
  light: '#FBFAF9',
  dark: '#0A0B0D',
};

export function themeByClock(now: Date = new Date()): Theme {
  const hour = now.getHours();
  return hour >= LIGHT_FROM_HOUR && hour < LIGHT_UNTIL_HOUR ? 'light' : 'dark';
}

/**
 * `<head>` ішіне тікелей қойылатын скрипт. Ол React жүктелгенге ДЕЙІН,
 * бет боялғанға дейін жүруі керек — әйтпесе келуші алдымен қараңғы бетті
 * көреді де, содан кейін ол жарыққа секіреді (FOUC).
 *
 * Сондықтан бұл — жалаң жол. Импорт та, JSX те жоқ. Ережелер жоғарыдағы
 * тұрақтылардан құрастырылады, қолмен қайталанбайды.
 */
export const themeBootstrapScript = `(function(){try{
var s=localStorage.getItem('${THEME_STORAGE_KEY}');
var t=(s==='light'||s==='dark')?s:((function(h){return h>=${LIGHT_FROM_HOUR}&&h<${LIGHT_UNTIL_HOUR}})(new Date().getHours())?'light':'dark');
document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
