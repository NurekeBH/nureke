/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0B0D',
        surface: '#131519',
        elevated: '#1A1D23',
        line: '#262A32',
        body: '#E8EAED',
        muted: '#9BA1AA',
        nur: {
          DEFAULT: '#FFB020',
          soft: '#FFCF6B',
          deep: '#F07C1B',
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
