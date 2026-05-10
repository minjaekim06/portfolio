/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cobalt: {
          DEFAULT: '#0047AB',
          bright: '#1F4FFF',
          50: '#E6EEFF',
          100: '#B8CDFF',
          400: '#3B6BFF',
          500: '#1F4FFF',
          600: '#0047AB',
          700: '#003585',
          900: '#001A4D',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Instrument Serif', 'serif'],
        serif: ['Instrument Serif', 'Fraunces', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
