import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export const FONT_SIZES = {
  small: { id: 'small', label: 'Small', px: '15px', scale: '0.88x', description: 'Compact display' },
  medium: { id: 'medium', label: 'Medium', px: '17px', scale: '1.0x', description: 'Default standard' },
  large: { id: 'large', label: 'Large', px: '19.5px', scale: '1.15x', description: 'High legibility' }
};

const ThemeContext = createContext({
  theme: 'dark',
  themePreference: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
  setThemePreference: () => {},
  fontSize: 'medium',
  setFontSize: () => {},
  cycleFontSize: () => {},
  fontSizes: FONT_SIZES
});

export function ThemeProvider({ children }) {
  // Theme preference ('light' | 'dark' | 'system')
  const [themePreference, setThemePreferenceState] = useState(() => {
    try {
      const savedPref = localStorage.getItem('clinicos_theme_preference');
      if (savedPref === 'light' || savedPref === 'dark' || savedPref === 'system') {
        return savedPref;
      }
      const legacySaved = localStorage.getItem('clinicos_theme');
      if (legacySaved === 'light' || legacySaved === 'dark') {
        return legacySaved;
      }
      return 'dark'; // Dark mode as the initial fallback
    } catch {
      return 'dark';
    }
  });

  // Track system preference matchMedia
  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemIsDark(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // Compute resolved active theme ('light' | 'dark')
  const resolvedTheme = useMemo(() => {
    if (themePreference === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    return themePreference;
  }, [themePreference, systemIsDark]);

  const isDark = resolvedTheme === 'dark';

  // Font size state ('small' | 'medium' | 'large')
  const [fontSize, setFontSizeState] = useState(() => {
    try {
      const saved = localStorage.getItem('clinicos_font_size');
      if (saved === 'small' || saved === 'medium' || saved === 'large') return saved;
      return 'medium';
    } catch {
      return 'medium';
    }
  });

  // Apply theme class, data-theme attribute, and meta theme-color
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem('clinicos_theme_preference', themePreference);
      localStorage.setItem('clinicos_theme', resolvedTheme);
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#080F1E' : '#F4F7FC');
      }
    } catch {
      // Storage access fail-safe
    }
  }, [themePreference, resolvedTheme, isDark]);

  // Apply font size class, style attribute, and persist in localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    root.classList.add(`font-size-${fontSize}`);
    root.setAttribute('data-font-size', fontSize);

    // Apply exact base font size on the root html element so all rem-based typography scales smoothly
    if (fontSize === 'small') {
      root.style.fontSize = '15px';
    } else if (fontSize === 'large') {
      root.style.fontSize = '19.5px';
    } else {
      root.style.fontSize = '17px';
    }

    try {
      localStorage.setItem('clinicos_font_size', fontSize);
    } catch {
      // Storage access fail-safe
    }
  }, [fontSize]);

  const setThemePreference = (pref) => {
    if (pref === 'light' || pref === 'dark' || pref === 'system') {
      setThemePreferenceState(pref);
    }
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light' || newTheme === 'system') {
      setThemePreferenceState(newTheme);
    }
  };

  const toggleTheme = () => {
    setThemePreferenceState((prev) => {
      const currentResolved = prev === 'system' ? (systemIsDark ? 'dark' : 'light') : prev;
      return currentResolved === 'dark' ? 'light' : 'dark';
    });
  };

  const setFontSize = (newSize) => {
    if (newSize === 'small' || newSize === 'medium' || newSize === 'large') {
      setFontSizeState(newSize);
    }
  };

  const cycleFontSize = () => {
    setFontSizeState((prev) => {
      if (prev === 'small') return 'medium';
      if (prev === 'medium') return 'large';
      return 'small';
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme,
        themePreference,
        isDark,
        setThemePreference,
        setTheme,
        toggleTheme,
        fontSize,
        setFontSize,
        cycleFontSize,
        fontSizes: FONT_SIZES
      }}
    >
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
