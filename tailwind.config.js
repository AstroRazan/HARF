/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        harf: {
          bg: '#F1DEC4',
          backdrop: '#F1DEC4',
          surface: '#FDF8F0',
          card: '#FDF8F0',
          green: '#73976A',
          'green-deep': '#677E61',
          red: '#BD4444',
          'red-dark': '#A43939',
          'red-light': '#CF5A5A',
          sand: '#F1DEC4',
          text: '#2B2B26',
          muted: '#7A7468',
          border: '#E2D2BC',
          track: '#F1DEC4'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-display)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-body)', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'card': '14px',
        'container': '24px'
      }
    },
  },
  plugins: [],
}
