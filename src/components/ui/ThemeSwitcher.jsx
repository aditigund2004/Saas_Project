import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export function ThemeSwitcher({ variant = 'segmented', className = '' }) {
  const { themePreference, setThemePreference, isDark, theme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const options = [
    {
      id: 'light',
      label: 'Light',
      fullLabel: 'Light Mode',
      desc: 'Clean soft white & cool blue',
      icon: Sun,
      iconColor: 'text-amber-500'
    },
    {
      id: 'dark',
      label: 'Dark',
      fullLabel: 'Dark Mode',
      desc: 'Midnight navy & electric blue',
      icon: Moon,
      iconColor: 'text-blue-400'
    },
    {
      id: 'system',
      label: 'System',
      fullLabel: 'System Default',
      desc: 'Match operating system appearance',
      icon: Monitor,
      iconColor: 'text-cyan-400'
    }
  ];

  // 1. Segmented Control Variant (Default for Topbar Header)
  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#0B1628] border border-slate-200 dark:border-[#263B59] transition-colors relative ${className}`}
        role="group"
        aria-label="Theme selector"
      >
        {options.map((opt) => {
          const isSelected = themePreference === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setThemePreference(opt.id)}
              className={`relative px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'bg-white dark:bg-[#172640] text-blue-600 dark:text-[#22D3EE] shadow-xs font-bold border border-slate-200/80 dark:border-[#263B59]'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-200/50 dark:hover:bg-[#111E33]'
              }`}
              title={`${opt.fullLabel} (${opt.desc})`}
              aria-label={opt.fullLabel}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? opt.iconColor : 'opacity-70'}`} />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Dropdown Variant (Icon button that opens a floating panel)
  const currentOpt = options.find((o) => o.id === themePreference) || options[1];
  const CurrentIcon = isDark ? Moon : Sun;

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-2 rounded-xl text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] bg-white dark:bg-[#111E33] hover:bg-slate-100 dark:hover:bg-[#172640] border border-slate-200 dark:border-[#263B59] transition-all cursor-pointer flex items-center justify-center shadow-2xs"
        aria-label={`Theme: ${currentOpt.fullLabel}. Click to change theme`}
        title={`Active Theme: ${currentOpt.fullLabel} (Click to change)`}
      >
        <CurrentIcon className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-amber-500'}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#111E33] shadow-xl border border-slate-200 dark:border-[#263B59] p-1.5 z-50 animate-fade-in text-slate-800 dark:text-[#CBD5E1]">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-[#94A3B8] uppercase tracking-wider border-b border-slate-100 dark:border-[#263B59] mb-1">
            Theme Appearance
          </div>

          <div className="space-y-0.5">
            {options.map((opt) => {
              const isSelected = themePreference === opt.id;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setThemePreference(opt.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-[#172640] text-blue-700 dark:text-[#22D3EE] font-bold border border-blue-200 dark:border-[#263B59]'
                      : 'text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640]/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${opt.iconColor}`} />
                    <div>
                      <div className="font-semibold">{opt.fullLabel}</div>
                      <div className="text-[10px] text-slate-500 dark:text-[#94A3B8] font-normal">{opt.desc}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-[#22D3EE] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

