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
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in" role="dialog" aria-modal="true" aria-labelledby={title ? "modal-title" : undefined}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div
          className={`relative transform overflow-hidden rounded-2xl sm:rounded-3xl bg-white text-left shadow-2xl transition-all my-auto w-full max-h-[calc(100vh-2.5rem)] flex flex-col ${
            sizeClasses[size] || sizeClasses.md
          } border border-slate-200`}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 bg-slate-50/80 shrink-0">
              <h3 id="modal-title" className="text-base sm:text-lg font-bold text-[#17211B] tracking-tight">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
