import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ALargeSmall, Check, ChevronDown } from 'lucide-react';

export function FontSizeSwitcher({ variant = 'dropdown', className = '', showLabel = false }) {
  const { fontSize, setFontSize, cycleFontSize } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const sizeOptions = [
    {
      id: 'small',
      label: 'Small',
      tag: 'Compact (15px)',
      previewClass: 'text-[12px] font-normal',
      badge: 'S'
    },
    {
      id: 'medium',
      label: 'Medium',
      tag: 'Default (17px)',
      previewClass: 'text-[14px] font-medium',
      badge: 'M'
    },
    {
      id: 'large',
      label: 'Large',
      tag: 'Enlarged (19.5px)',
      previewClass: 'text-[17px] font-bold',
      badge: 'L'
    }
  ];

  // 1. Segmented Control Variant (ideal for Settings and accessibility sections)
  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 ${className}`}
        role="group"
        aria-label="Font size selector"
      >
        {sizeOptions.map((opt) => {
          const isSelected = fontSize === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFontSize(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-slate-200/60 dark:ring-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="font-mono text-[11px] opacity-75">{opt.badge}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Quick-Cycle Button Variant (compact 1-click switcher like theme toggle)
  if (variant === 'cycle') {
    const currentOpt = sizeOptions.find((o) => o.id === fontSize) || sizeOptions[1];
    return (
      <button
        type="button"
        onClick={cycleFontSize}
        className={`relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer flex items-center justify-center ${className}`}
        title={`Current font size: ${currentOpt.label}. Click to cycle.`}
        aria-label={`Change font size (Current: ${currentOpt.label})`}
      >
        <ALargeSmall className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 text-white font-mono font-bold text-[9px] flex items-center justify-center leading-none shadow-xs">
          {currentOpt.badge}
        </span>
      </button>
    );
  }

  // 3. Dropdown Menu Variant (Default - sleek and detailed)
  const currentOption = sizeOptions.find((o) => o.id === fontSize) || sizeOptions[1];

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change application text size"
      >
        <ALargeSmall className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="font-medium text-xs">
          {showLabel ? `Text: ${currentOption.label}` : currentOption.label}
        </span>
        <span className="px-1 py-0.2 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-750 text-slate-500 dark:text-slate-400">
          {currentOption.badge}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Text Size & Legibility
            </span>
          </div>

          <div className="p-1.5 space-y-1">
            {sizeOptions.map((opt) => {
              const isSelected = fontSize === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setFontSize(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {opt.badge}
                    </span>
                    <div>
                      <div className="text-xs leading-tight flex items-center gap-1.5">
                        <span>{opt.label}</span>
                        <span className={`text-slate-400 text-[11px] font-serif ${opt.previewClass}`}>
                          Aa
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 leading-tight block">
                        {opt.tag}
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 mt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 rounded-b-xl">
            <span className="text-[10px] text-slate-400 block leading-tight">
              Applies across all pages, charts, tables, and portals.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
