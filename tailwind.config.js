/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ochre: '#EAA44B',
        sage: '#DAE3BB',
        teal: '#6799A3',
        navy: '#3A5173',
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
