import React from 'react';

export function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
<<<<<<< HEAD
      className={`bg-white rounded-xl border border-slate-200/90 shadow-2xs ${
        hover
          ? 'transition-all duration-200 ease-out hover:shadow-xs hover:border-slate-300 cursor-pointer'
          : ''
=======
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm ${
        hover ? 'transition-all duration-200 hover:shadow-md hover:border-slate-300 cursor-pointer' : ''
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
<<<<<<< HEAD
    <div className={`p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
=======
    <div className={`p-5 border-b border-slate-100 flex items-start justify-between gap-4 ${className}`}>
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    </div>
  );
}

export function CardContent({ children, className = '' }) {
<<<<<<< HEAD
  return <div className={`p-4 sm:p-5 ${className}`}>{children}</div>;
}
=======
  return <div className={`p-5 ${className}`}>{children}</div>;
}

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
