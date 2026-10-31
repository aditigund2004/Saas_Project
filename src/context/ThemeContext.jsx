import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  isHighContrast: false,
  toggleTheme: () => {},
  setTheme: (t) => {}
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('clinicos_theme');
      if (saved === 'dark' || saved === 'light' || saved === 'high-contrast') return saved;
      return 'light';
    } catch {
      return 'light';
    }
  });

  const isDark = theme === 'dark';
  const isHighContrast = theme === 'high-contrast';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'high-contrast');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'high-contrast') {
      root.classList.add('high-contrast');
    }

    try {
      localStorage.setItem('clinicos_theme', theme);
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          theme === 'dark' ? '#0b0f19' : theme === 'high-contrast' ? '#000000' : '#2563eb'
        );
      }
    } catch {
      // Storage fail-safe
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'high-contrast';
      return 'light';
    });
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light' || newTheme === 'high-contrast') {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, isHighContrast, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
