import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Permanently fixed to 'light' (Modern Green Healthcare Theme)
  const theme = 'light';

  useEffect(() => {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
    try {
      localStorage.removeItem('clinicos_public_theme');
      localStorage.removeItem('theme');
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    // Theme is locked to Modern Green Healthcare theme as per design specification
  };

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: 'light', toggleTheme: () => {} };
  }
  return context;
}
