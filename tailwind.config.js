/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ner: {
          teal: '#005f73',
          green: '#0a9396',
          sage: '#94d2bd',
          sand: '#e9d8a6',
          amber: '#ee9b00',
          orange: '#ca6702',
          rust: '#bb3e03',
          darkBg: '#0f172a',
          cardBg: '#f8fafc'
        }
      },
      fontSize: {
        'elderly-base': '1.25rem', // 20px base
        'elderly-lg': '1.5rem',    // 24px
        'elderly-xl': '2rem',      // 32px
        'elderly-2xl': '2.5rem',   // 40px
      }
    },
  },
  plugins: [],
}
