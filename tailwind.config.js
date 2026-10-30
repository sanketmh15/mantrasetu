/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        vermilion: {
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
        },
        temple: {
          gold: '#d97706',
          dark: '#1c1917',
          stone: '#292524',
          card: '#201d1b',
        }
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
        serifDev: ['"Rozha One"', '"Noto Serif Devanagari"', 'serif'],
      }
    },
  },
  plugins: [],
}

