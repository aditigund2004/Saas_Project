import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Users,
  AlertTriangle,
  Clock,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { NO_SHOW_ANALYTICS_DATA } from '../../demo-data/receptionOperationsData';

export function NoShowExplorer() {
  const { monthlyAttendanceRate, monthlyNoShowRate, monthlyCancellationRate, weekdayStats, peakNoShowSlots, recommendedInterventions } = NO_SHOW_ANALYTICS_DATA;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-blue-200" />
              Patient Attendance & Retention Analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              No-Show Pattern Explorer
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Analyze historical appointment drop-offs, uncover high-risk time slots, and evaluate preventive front-desk interventions.
            </p>
          </div>

          <Badge variant="success" size="lg" className="bg-white/20 text-white border-white/30 font-bold px-3 py-1.5 self-start sm:self-center">
            {monthlyAttendanceRate}% Attendance Rate
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Attendance</span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{monthlyAttendanceRate}%</div>
          <span className="text-[11px] text-slate-500">Attended consultation on time</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unnotified No-Shows</span>
          <div className="text-3xl font-black text-rose-500">{monthlyNoShowRate}%</div>
          <span className="text-[11px] text-slate-500">Missed appointment without notice</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Timely Cancellations</span>
          <div className="text-3xl font-black text-blue-500">{monthlyCancellationRate}%</div>
          <span className="text-[11px] text-slate-500">Rescheduled or cancelled &gt;4h in advance</span>
        </div>
      </div>

      {/* Weekday Breakdown Recharts */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Weekday Attendance & Drop-Off Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Compares scheduled vs attended vs no-show bookings by day of the week.
          </p>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekdayStats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, fontSize: 12, backgroundColor: '#0f172a', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="attended" name="Attended" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="noShow" name="No-Show" fill="#ef4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="cancelled" name="Cancelled" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peak No-Show Slots & Recommended Interventions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Peak No-Show Risk Time Windows
          </h4>
          <div className="space-y-2 text-xs">
            {peakNoShowSlots.map((slot, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 flex justify-between items-center"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{slot.slot}</span>
                  <span className="text-[11px] text-slate-500">{slot.reason}</span>
                </div>
                <Badge variant="warning" size="sm" className="bg-rose-500 text-white font-extrabold">
                  {slot.rate}% Drop
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" /> Recommended Front-Desk Interventions
          </h4>
          <div className="space-y-2 text-xs">
            {recommendedInterventions.map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 flex items-start gap-2 text-slate-800 dark:text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

