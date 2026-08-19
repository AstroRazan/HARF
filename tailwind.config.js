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
          bg: '#F2EBE0',
          surface: '#FAF7F2',
          olive: '#6B7F5C',
          'olive-dark': '#546648',
          'olive-light': '#829772',
          clay: '#C0703A',
          'clay-dark': '#A35C2B',
          'clay-light': '#D68956',
          text: '#2C2C2A',
          muted: '#8A8681',
          border: '#E5DFD5',
          track: '#E8E2D7',
          card: '#FAF7F2'
        }
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        serif: ['"Amiri"', 'Georgia', 'serif']
      },
      borderRadius: {
        'card': '14px',
        'container': '24px'
      }
    },
  },
  plugins: [],
}
