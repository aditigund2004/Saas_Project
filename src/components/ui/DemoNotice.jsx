import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export function DemoNotice({ message, className = '' }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-850 dark:text-amber-300 text-xs ${className}`}
    >
      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
      <span>
        <strong>Demo Mode:</strong> {message || 'Synthetic test data & frontend simulation. Ready for backend API connection.'}
      </span>
    </div>
  );
}

export function ToastContainer({ toast }) {
  if (!toast) return null;

  const typeStyles = {
    success: 'bg-slate-900 dark:bg-slate-800 text-white border-slate-700 dark:border-slate-600',
    info: 'bg-blue-900 dark:bg-blue-950 text-white border-blue-700 dark:border-blue-600',
    warning: 'bg-amber-900 dark:bg-amber-950 text-white border-amber-700 dark:border-amber-600',
    error: 'bg-rose-900 dark:bg-rose-950 text-white border-rose-700 dark:border-rose-600'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in max-w-sm">
      <div
        className={`px-4 py-3 rounded-xl border shadow-xl flex items-center gap-3 text-sm font-medium ${
          typeStyles[toast.type] || typeStyles.success
        }`}
      >
        <Info className="w-4 h-4 shrink-0 text-blue-400" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action, icon: Icon, className = '' }) {
  return (
    <div className={`text-center py-12 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 ${className}`}>
      {Icon && (
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
      {description && <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
