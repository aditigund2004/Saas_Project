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
<<<<<<< HEAD
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
=======
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
<<<<<<< HEAD
          className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 w-full ${sizeClasses[size] || sizeClasses.md} border border-slate-200`}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Close dialog"
=======
          className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full ${sizeClasses[size]} border border-slate-200`}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
<<<<<<< HEAD
          <div className="p-5 sm:p-6">{children}</div>
=======
          <div className="p-6">{children}</div>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
