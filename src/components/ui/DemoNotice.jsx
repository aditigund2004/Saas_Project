import React from 'react';
import { Sparkles, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

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

  const typeConfig = {
    success: {
      style: 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border-emerald-300 dark:border-emerald-800 shadow-emerald-500/10',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    info: {
      style: 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border-blue-300 dark:border-blue-800 shadow-blue-500/10',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    warning: {
      style: 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border-amber-300 dark:border-amber-800 shadow-amber-500/10',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    error: {
      style: 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border-rose-300 dark:border-rose-800 shadow-rose-500/10',
      icon: AlertCircle,
      iconColor: 'text-rose-600 dark:text-rose-400'
    }
  };

  const config = typeConfig[toast.type] || typeConfig.success;
  const IconComponent = config.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-toast-enter max-w-sm pointer-events-none">
      <div
        className={`pointer-events-auto px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md flex items-center gap-3 text-sm font-medium ${config.style}`}
      >
        <IconComponent className={`w-4 h-4 shrink-0 ${config.iconColor}`} />
        <span className="leading-snug">{toast.message}</span>
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action, icon: Icon, className = '' }) {
  return (
    <div className={`text-center py-12 px-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 ${className}`}>
      {Icon && (
        <div className="w-14 h-14 mx-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3.5 transition-transform duration-200 hover:scale-105">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 tracking-tight">{title}</h4>
      {description && <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1.5 leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
