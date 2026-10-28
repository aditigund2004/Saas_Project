import React from 'react';
import { Card } from './Card';

export function StatCard({ title, value, change, trend = 'up', icon: Icon, color = 'blue', subtitle }) {
  const colorMap = {
<<<<<<< HEAD
    blue: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    amber: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    rose: 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    slate: 'bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  };

  return (
    <Card className="p-4 sm:p-5 transition-all duration-150 hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight tabular-nums">
          {value}
        </div>
        {change && (
          <span
            className={`text-xs font-medium inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
              trend === 'up'
                ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/50 font-semibold'
                : trend === 'down'
                ? 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/50 font-semibold'
                : 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
=======
    blue: 'bg-blue-50/90 text-blue-700 border border-blue-200/60',
    indigo: 'bg-violet-50/90 text-violet-700 border border-violet-200/60',
    emerald: 'bg-emerald-50/90 text-emerald-700 border border-emerald-200/60',
    amber: 'bg-amber-50/90 text-amber-800 border border-amber-200/60',
    rose: 'bg-rose-50/90 text-rose-700 border border-rose-200/60',
    slate: 'bg-slate-100/90 text-slate-700 border border-slate-200/60'
  };

  return (
    <Card className="p-4 sm:p-5 transition-all duration-200 hover:border-slate-300">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">{title}</span>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2.5 flex-wrap">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums font-display">{value}</div>
        {change && (
          <span
            className={`text-xs font-semibold inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full border ${
              trend === 'up'
                ? 'text-emerald-700 bg-emerald-50/90 border-emerald-200/60'
                : trend === 'down'
                ? 'text-rose-700 bg-rose-50/90 border-rose-200/60'
                : 'text-slate-600 bg-slate-100/90 border-slate-200/60'
>>>>>>> origin/main
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
          </span>
        )}
      </div>
<<<<<<< HEAD
      {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-1">{subtitle}</p>}
=======
      {subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{subtitle}</p>}
>>>>>>> origin/main
    </Card>
  );
}
