/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ochre: { DEFAULT: '#EAA44B', soft: '#F2C580' },
        sage:  { DEFAULT: '#DAE3BB', soft: '#EAEFD3' },
        teal:  { DEFAULT: '#6799A3', soft: '#8CB3BC' },
        navy:  { DEFAULT: '#3A5173', soft: '#4F6A91' },
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
