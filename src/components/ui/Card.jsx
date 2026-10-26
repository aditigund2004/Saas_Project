import React from 'react';

export function Card({ children, className = '', hover = false, onClick }) {
  const isInteractive = hover || Boolean(onClick);
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200 ease-out max-w-full ${
        isInteractive
          ? 'hover:shadow-md hover:border-[#15803D]/40 hover:-translate-y-1 cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, icon: Icon, badge, className = '' }) {
  return (
    <div className={`p-4 sm:p-5.5 border-b border-slate-100 bg-slate-50/40 rounded-t-xl flex items-start justify-between gap-3 ${className}`}>
      <div className="min-w-0 flex items-start gap-3">
        {Icon && (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F0FDF4] text-[#15803D] flex items-center justify-center shrink-0 border border-[#DCFCE7] mt-0.5 shadow-2xs">
            <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-[#17211B] tracking-tight">{title}</h3>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 sm:p-5.5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-4 py-3 sm:px-5.5 sm:py-3.5 border-t border-slate-100/90 bg-slate-50/50 rounded-b-xl flex items-center justify-between text-xs text-slate-500 ${className}`}>
      {children}
    </div>
  );
}
