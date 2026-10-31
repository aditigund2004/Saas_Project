import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl'
  };

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto cursor-pointer"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
<<<<<<< HEAD
        className="fixed inset-0 w-full h-full min-h-dvh bg-[#080F1E]/80 backdrop-blur-xs transition-opacity duration-150"
=======
        className="fixed inset-0 w-full h-full min-h-dvh bg-slate-950/60 backdrop-blur-xs transition-opacity duration-150"
>>>>>>> origin/main
        aria-hidden="true"
      />

      <div
        className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center relative z-10 animate-fade-in"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
<<<<<<< HEAD
          className={`relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#111E33] text-left shadow-2xl transition-all sm:my-8 w-full ${
            sizeClasses[size] || sizeClasses.md
          } border border-slate-200 dark:border-[#263B59] cursor-default text-slate-900 dark:text-[#F1F5F9]`}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#263B59] px-5 sm:px-6 py-4 bg-slate-50/90 dark:bg-[#0D1729]/90">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-[#F1F5F9] tracking-tight min-w-0 flex-1 truncate mr-3">
=======
          className={`relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all sm:my-8 w-full ${
            sizeClasses[size] || sizeClasses.md
          } border border-slate-200 dark:border-slate-800 cursor-default`}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 sm:px-6 py-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
>>>>>>> origin/main
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
<<<<<<< HEAD
                className="rounded-lg p-1.5 text-slate-400 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#172640] hover:text-slate-900 dark:hover:text-[#F1F5F9] transition-colors cursor-pointer shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 shrink-0" />
              </button>
            </div>
          )}
          <div className="p-5 sm:p-6 text-slate-700 dark:text-[#CBD5E1]">{children}</div>
=======
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="p-5 sm:p-6 text-slate-800 dark:text-slate-200">{children}</div>
>>>>>>> origin/main
        </div>
      </div>
    </div>
  );
}
