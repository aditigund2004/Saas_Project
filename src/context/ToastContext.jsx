import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, RotateCcw } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({
      id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title,
      message,
      type = 'info',
      durationMs = 4500,
      actionLabel,
      onAction,
      undoAction,
      undoDurationMs = 5000
    }) => {
      const finalDuration = undoAction ? undoDurationMs : durationMs;
      const newToast = {
        id,
        title,
        message,
        type,
        durationMs: finalDuration,
        actionLabel: undoAction ? (actionLabel || 'Undo') : actionLabel,
        onAction: undoAction || onAction,
        createdAt: Date.now()
      };

      setToasts((prev) => [...prev.slice(-4), newToast]);

      if (finalDuration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, finalDuration);
      }

      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Render Viewport */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';
          const isError = toast.type === 'error';

          let Icon = Info;
          let borderClass = 'border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
          let iconColor = 'text-blue-600 dark:text-blue-400';

          if (isSuccess) {
            Icon = CheckCircle2;
            borderClass = 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900';
            iconColor = 'text-emerald-600 dark:text-emerald-400';
          } else if (isWarning) {
            Icon = AlertTriangle;
            borderClass = 'border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900';
            iconColor = 'text-amber-600 dark:text-amber-400';
          } else if (isError) {
            Icon = AlertCircle;
            borderClass = 'border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900';
            iconColor = 'text-rose-600 dark:text-rose-400';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start space-x-3 transition-all transform animate-in slide-in-from-bottom-5 duration-200 ${borderClass}`}
              role="alert"
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 min-w-0">
                {toast.title && <p className="text-sm font-semibold text-slate-900 dark:text-white">{toast.title}</p>}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{toast.message}</p>
                {toast.onAction && (
                  <div className="mt-2 flex items-center space-x-2">
                    <button
                      onClick={() => {
                        toast.onAction?.();
                        removeToast(toast.id);
                      }}
                      className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      {toast.actionLabel || 'Undo'}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
