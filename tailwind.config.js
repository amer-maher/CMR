/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        app: {
          bg: 'var(--bg)',
          card: 'var(--card)',
          primary: 'var(--primary)',
          accent: 'var(--accent)',
          text: 'var(--text)',
          border: 'var(--border)',
        },
      },
    },
  },
  plugins: [],
}

