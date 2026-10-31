import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Building2,
  Users
} from 'lucide-react';
import { CAPACITY_HEATMAP_DATA } from '../../demo-data/receptionOperationsData';

export function CapacityHeatmap() {
  const [selectedDay, setSelectedDay] = useState('All');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Heatmap color mapper
  const getCellBg = (val) => {
    if (val >= 90) return 'bg-rose-500 text-white font-black';
    if (val >= 75) return 'bg-amber-400 text-slate-900 font-bold';
    if (val >= 50) return 'bg-blue-400 text-white font-semibold';
    if (val >= 35) return 'bg-blue-200 dark:bg-blue-900 text-slate-800 dark:text-blue-100';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-400';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5 text-blue-200" />
              Facility Load Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Clinic Capacity Heatmap
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Hourly patient density, chamber occupancy, and peak vs quiet windows across the weekly clinical rota.
            </p>
          </div>

          {/* Legend */}
          <div className="bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center gap-3 text-xs font-bold self-start sm:self-center">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-md bg-slate-200 inline-block" /> Quiet (&lt;35%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-md bg-blue-400 inline-block" /> Moderate</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-md bg-amber-400 inline-block" /> High (75%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-md bg-rose-500 inline-block" /> Peak (90%+)</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-center text-xs">
          <thead>
            <tr>
              <th className="p-3 text-left font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                Time Window
              </th>
              {days.map((d) => (
                <th key={d} className="p-3 font-extrabold text-slate-800 dark:text-slate-200 text-xs">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {CAPACITY_HEATMAP_DATA.map((row) => (
              <tr key={row.hour} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                <td className="p-3 text-left font-bold text-slate-700 dark:text-slate-300">
                  {row.hour}
                </td>
                {days.map((d) => {
                  const val = row[d];
                  return (
                    <td key={d} className="p-2">
                      <div
                        className={`w-full py-2 rounded-xl transition-transform hover:scale-105 cursor-pointer ${getCellBg(
                          val
                        )}`}
                        title={`${d} at ${row.hour}: ${val}% capacity`}
                      >
                        {val}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategic Operational Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-1.5 text-xs text-amber-950 dark:text-amber-100">
          <span className="font-extrabold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Peak Hour Overload Alerts
          </span>
          <p>
            Daily 10:00 AM – 11:00 AM consistently hits 95–100% capacity. Reception is advised to propose 02:00 PM slots for walk-in preventive checks.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-1.5 text-xs text-blue-950 dark:text-blue-100">
          <span className="font-extrabold text-sm text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" /> Optimal Walk-In Buffer
          </span>
          <p>
            1:00 PM – 2:30 PM offers lowest waiting times across all 6 operational days (&lt;45% utilization). Ideal for expedited phlebotomy and dressings.
          </p>
        </div>
      </div>
    </div>
  );
}

