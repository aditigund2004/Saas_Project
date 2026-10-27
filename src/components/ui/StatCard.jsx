import React from 'react';
import { Card } from './Card';

export function StatCard({ title, value, change, trend = 'up', icon: Icon, color = 'blue', subtitle }) {
  const colorMap = {
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
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{subtitle}</p>}
    </Card>
  );
}
