import React from 'react';

export function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#111E33] rounded-xl border border-slate-200 dark:border-[#263B59] shadow-2xs text-slate-900 dark:text-[#F1F5F9] transition-colors max-w-full ${
        hover
          ? 'duration-150 ease-out hover:shadow-xs hover:border-blue-400 dark:hover:border-[#3B82F6] cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`p-4 sm:p-5 border-b border-slate-200 dark:border-[#263B59] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${className}`}>
      <div className="min-w-0 flex-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F1F5F9] tracking-tight truncate">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] mt-0.5 line-clamp-2">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0 flex items-center gap-2 flex-wrap">{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 sm:p-5 max-w-full ${className}`}>{children}</div>;
}
