import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export function DemoNotice({ message, className = '' }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-800 text-xs ${className}`}
    >
      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
      <span>
        <strong>Demo Mode:</strong> {message || 'Synthetic test data & frontend simulation. Ready for backend API connection.'}
      </span>
    </div>
  );
}

export function ToastContainer({ toast }) {
  if (!toast) return null;

  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';
  const isSuccess = toast.type === 'success' || !toast.type;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in max-w-sm">
      <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800">
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            isError
              ? 'bg-rose-500'
              : isWarning
              ? 'bg-amber-500'
              : isSuccess
              ? 'bg-emerald-500'
              : 'bg-blue-500'
          }`}
        />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action, icon: Icon }) {
  return (
    <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
      {Icon && (
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      {description && <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

