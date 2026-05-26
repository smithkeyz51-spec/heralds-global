/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        agency: {
          black: '#0A0A0A',
          white: '#F5F5F0',
          gray: '#2A2A2A',
          accent: '#E0E0D8',
        },
        meridian: {
          navy: '#0D1B3E',
          navyLight: '#1A2F5C',
          gold: '#C9A96E',
          goldLight: '#E4C98A',
          cream: '#F8F4EC',
        },
        autos: {
          black: '#080808',
          gold: '#D4A017',
          goldBright: '#F0C040',
          carbon: '#1A1A1A',
          silver: '#C0C0C0',
        },
        receipt: {
          paper: '#FFF9F0',
          ink: '#1A1A1A',
          faint: '#E8E2D6',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
        condensed: ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
