import React from 'react';
import { Card } from './Card';

export function StatCard({ title, value, change, trend = 'up', icon: Icon, color = 'blue', subtitle }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border border-rose-100',
    slate: 'bg-slate-50 text-slate-700 border border-slate-100'
  };

  return (
    <Card className="p-4 sm:p-5 transition-all duration-200 hover:border-slate-300">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">{title}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
        <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</div>
        {change && (
          <span
            className={`text-xs font-medium inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
              trend === 'up'
                ? 'text-emerald-700 bg-emerald-50 font-semibold'
                : trend === 'down'
                ? 'text-rose-700 bg-rose-50 font-semibold'
                : 'text-slate-600 bg-slate-100'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-400 mt-1 line-clamp-1">{subtitle}</p>}
    </Card>
  );
}
