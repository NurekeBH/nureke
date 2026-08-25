'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import {
  THEME_COLOR,
  THEME_STORAGE_KEY,
  themeByClock,
  type Theme,
  type ThemePreference,
} from '@/lib/theme';

const ORDER: readonly ThemePreference[] = ['auto', 'light', 'dark'];

const ICON: Record<ThemePreference, string> = { auto: '◐', light: '☀', dark: '☾' };

/**
 * Таңдау localStorage-де тұр, React күйінде емес. Себебі оны бет боялғанға
 * дейін layout.tsx ішіндегі inline скрипт те оқиды — екеуіне ортақ көз керек.
 * Мұндағы useSyncExternalStore тек ТҮЙМЕНІҢ БЕЙНЕСІН қоймамен үндестіреді.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Басқа қойындыда ауыстырса, мұндағы түйме де жаңарады.
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'auto';
  } catch {
    // Жеке режимде localStorage лақтыруы мүмкін.
    return 'auto';
  }
}

// Билд кезінде localStorage жоқ, сондықтан HTML-ге `auto` жазылады. Клиент
// гидратациядан кейін нақты мәнді өзі оқып, түймені жаңартады.
const readPreferenceOnServer = (): ThemePreference => 'auto';

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

export function ThemeToggle({ labels }: { labels: Record<ThemePreference, string> }) {
  const preference = useSyncExternalStore(subscribe, readPreference, readPreferenceOnServer);

  useEffect(() => {
    /**
     * Бет ашық тұрғанда да 07:00 мен 19:00-де өзі ауысуы керек.
     *
     * Таңдауды React күйінен емес, қоймадан оқиды — әрі тәуелділік тізімі
     * бос. Себебі тақырыпты қолдану React рендерінің ретіне тәуелді болса,
     * гидратация сәтінде бір кадрға қате тақырып жарқ етіп кетуі мүмкін.
     * Ал inline скрипт оны әлдеқашан дұрыс қойып қойған — оны қайта
     * «түзетудің» қажеті жоқ.
     */
    const timer = window.setInterval(() => {
      if (readPreference() !== 'auto') return;
      applyTheme(themeByClock());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const cycle = useCallback(() => {
    const next = ORDER[(ORDER.indexOf(readPreference()) + 1) % ORDER.length];
    try {
      if (next === 'auto') localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Сақтай алмасақ та тақырып осы сеанста ауысады.
    }
    applyTheme(next === 'auto' ? themeByClock() : next);
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <button
      type="button"
      onClick={cycle}
      title={labels[preference]}
      aria-label={labels[preference]}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line
                 text-lg leading-none text-muted transition-colors
                 hover:border-nur hover:text-nur"
    >
      <span aria-hidden>{ICON[preference]}</span>
    </button>
  );
}
