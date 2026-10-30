/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'Segoe UI', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#172b4d',
        muted: '#718096',
        brand: { DEFAULT: '#2563eb', dark: '#1d4ed8', light: '#eff6ff' },
      },
    },
  },
  plugins: [],
}
