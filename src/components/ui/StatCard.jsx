import React from 'react';
import { Card } from './Card';

export function StatCard({ title, value, change, trend = 'up', icon: Icon, color = 'blue', subtitle }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border-indigo-800',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800',
    teal: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-800',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800',
    rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-[#172640] dark:text-[#CBD5E1] dark:border-[#263B59]'
  };

  return (
    <Card className="p-4 sm:p-5 transition-all duration-150 hover:border-blue-400 dark:hover:border-[#3B82F6]">
      <div className="flex items-center justify-between gap-3 min-w-0">
        <span className="text-xs font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider truncate flex-1 min-w-0">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-4 h-4 shrink-0" />
          </div>
        )}
      </div>
      <div className="mt-2.5 flex items-baseline gap-2 flex-wrap min-w-0">
        <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums truncate">
          {value}
        </div>
        {change && (
          <span
            className={`text-xs font-medium inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md shrink-0 ${
              trend === 'up'
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/70 dark:border-emerald-800/80 font-semibold'
                : trend === 'down'
                ? 'text-rose-700 bg-rose-50 border border-rose-200 dark:text-rose-300 dark:bg-rose-950/70 dark:border-rose-800/80 font-semibold'
                : 'text-slate-700 bg-slate-100 border border-slate-200 dark:text-[#CBD5E1] dark:bg-[#172640] dark:border-[#263B59]'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 line-clamp-1">{subtitle}</p>}
    </Card>
  );
}
