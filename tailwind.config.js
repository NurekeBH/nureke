/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Нақты мәндер — src/app/globals.css ішінде, екі тақырып үшін бөлек.
      // Мұнда тек сілтеме тұр. `<alpha-value>` болмаса `nur/40` жұмыс істемейді.
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        body: 'rgb(var(--c-body) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        'on-nur': 'rgb(var(--c-on-nur) / <alpha-value>)',
        nur: {
          DEFAULT: 'rgb(var(--c-nur) / <alpha-value>)',
          soft: 'rgb(var(--c-nur-soft) / <alpha-value>)',
          deep: 'rgb(var(--c-nur-deep) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1160px' },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { rise: 'rise .5s ease-out both' },
    },
  },
  plugins: [],
};
