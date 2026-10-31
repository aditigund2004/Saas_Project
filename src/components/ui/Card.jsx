import React from 'react';

export function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
<<<<<<< HEAD
      className={`bg-white dark:bg-[#111E33] rounded-xl border border-slate-200 dark:border-[#263B59] shadow-2xs text-slate-900 dark:text-[#F1F5F9] transition-colors ${
        hover
          ? 'duration-150 ease-out hover:shadow-xs hover:border-blue-400 dark:hover:border-[#3B82F6] cursor-pointer'
=======
      className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs text-slate-900 dark:text-slate-100 transition-colors ${
        hover
          ? 'duration-150 ease-out hover:shadow-xs hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer'
>>>>>>> origin/main
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
<<<<<<< HEAD
    <div className={`p-4 sm:p-5 border-b border-slate-200 dark:border-[#263B59] flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0 flex-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F1F5F9] tracking-tight truncate">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 dark:text-[#94A3B8] mt-1 line-clamp-2">{subtitle}</p>}
=======
    <div className={`p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{subtitle}</p>}
>>>>>>> origin/main
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 sm:p-5 ${className}`}>{children}</div>;
}
