import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages, Check, ChevronDown } from 'lucide-react';

export function LanguageSwitcher({ variant = 'dropdown', className = '', showLabel = false }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'hi', label: 'हिंदी', short: 'HI' },
    { code: 'mr', label: 'मराठी', short: 'MR' }
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false);
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

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#172640] border border-slate-200 dark:border-[#263B59] ${className}`}
        role="group"
        aria-label="Language selection"
      >
        {languages.map((l) => {
          const isActive = language === l.code;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#111E33] text-blue-600 dark:text-[#22D3EE] shadow-xs'
                  : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9]'
              }`}
            >
              {l.short}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] bg-white dark:bg-[#111E33] hover:bg-slate-50 dark:hover:bg-[#172640] border border-slate-200 dark:border-[#263B59] shadow-2xs transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-[#3B82F6] shrink-0" />
        <span className="hidden sm:inline font-semibold">{currentLang.short}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 dark:text-[#94A3B8] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-[#22D3EE]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-[#111E33] shadow-xl border border-slate-200 dark:border-[#263B59] p-1.5 z-50 animate-fade-in"
          role="menu"
        >
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#94A3B8]">
            Language
          </div>
          {languages.map((l) => {
            const isActive = language === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-[#172640] text-blue-600 dark:text-[#22D3EE] font-bold'
                    : 'text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640]/60 hover:text-slate-900 dark:hover:text-[#F1F5F9]'
                }`}
                role="menuitem"
              >
                <span>{l.label}</span>
                {isActive && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-[#22D3EE] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
