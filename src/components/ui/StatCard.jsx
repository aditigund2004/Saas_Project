import React from 'react';
import { Card } from './Card';

export function StatCard({ title, value, change, trend = 'up', icon: Icon, color = 'emerald', subtitle }) {
  const colorMap = {
    emerald: 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]',
    green: 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]',
    blue: 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border border-rose-100',
    teal: 'bg-teal-50 text-teal-700 border border-teal-100',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  return (
    <Card className="p-4 sm:p-5 hover:border-[#15803D]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider truncate">{title}</span>
        {Icon && (
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${colorMap[color] || colorMap.emerald}`}>
            <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2 flex-wrap">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17211B] tracking-tight tabular-nums">{value}</div>
        {change && (
          <span
            className={`text-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${
              trend === 'up'
                ? 'text-[#166534] bg-[#DCFCE7] border-[#DCFCE7] font-bold'
                : trend === 'down'
                ? 'text-rose-800 bg-rose-50 border-rose-200 font-bold'
                : 'text-slate-700 bg-slate-100 border-slate-200 font-medium'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed line-clamp-1">{subtitle}</p>}
    </Card>
  );
}
