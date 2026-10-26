import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function DarkModeToggle() {
  const { toggleTheme, isDark } = useApp();

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`group relative flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border select-none hover:scale-105 active:scale-95 backdrop-blur-md ${
          isDark
            ? 'bg-slate-800/95 hover:bg-slate-700/95 text-amber-300 border-slate-600/80 shadow-black/40'
            : 'bg-white/95 hover:bg-slate-50/95 text-slate-800 border-slate-200/90 shadow-slate-900/10'
        }`}
      >
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDark
              ? 'bg-amber-400/20 text-amber-400 rotate-180'
              : 'bg-indigo-50 text-indigo-600 rotate-0 group-hover:bg-indigo-100'
          }`}
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 transition-transform" />
          ) : (
            <Moon className="w-3.5 h-3.5 transition-transform" />
          )}
        </div>
        <span className="text-xs font-bold tracking-tight pr-1">
          <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'} Mode</span>
          <span className="sm:hidden">{isDark ? 'Light' : 'Dark'}</span>
        </span>
      </button>
    </div>
  );
}
