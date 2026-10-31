/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'Segoe UI', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#172b4d',
        muted: '#718096',
        brand: { DEFAULT: '#2563eb', dark: '#1d4ed8', light: '#eff6ff' },
        'main-bg': 'var(--bg-main)',
        'secondary-bg': 'var(--bg-secondary)',
        'sidebar-bg': 'var(--bg-sidebar)',
        'topbar-bg': 'var(--bg-topbar)',
        'card-bg': 'var(--bg-card)',
        'card-elevated': 'var(--bg-card-elevated)',
        'hover-bg': 'var(--bg-hover)',
        'input-bg': 'var(--bg-input)',
        'primary-text': 'var(--text-primary)',
        'secondary-text': 'var(--text-secondary)',
        'muted-text': 'var(--text-muted)',
        'disabled-text': 'var(--text-disabled)',
        'primary-blue': 'var(--primary-blue)',
        'cyan-accent': 'var(--cyan-accent)',
        'theme-border': 'var(--border-theme)',
        'theme-divider': 'var(--divider-theme)',
        'slate-850': '#111E33',
      },
    },
  },
  plugins: [],
}
