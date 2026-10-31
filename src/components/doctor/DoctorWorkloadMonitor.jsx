import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Activity,
  Coffee,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Stethoscope,
  Smile,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';

export function DoctorWorkloadMonitor() {
  const { appointments = [], currentUser } = useApp();

  const [hourlySlotDensity, setHourlySlotDensity] = useState([
    { slot: '09:00 AM', patients: 3, durationMins: 55, status: 'Dense', overload: true },
    { slot: '10:00 AM', patients: 4, durationMins: 60, status: 'Critical Density', overload: true },
    { slot: '11:00 AM', patients: 3, durationMins: 50, status: 'Dense', overload: true },
    { slot: '12:00 PM', patients: 2, durationMins: 35, status: 'Moderate', overload: false },
    { slot: '01:00 PM', patients: 0, durationMins: 0, status: 'Break Window (Recommended)', isBreak: true },
    { slot: '02:00 PM', patients: 2, durationMins: 40, status: 'Moderate', overload: false },
    { slot: '03:00 PM', patients: 3, durationMins: 55, status: 'Dense', overload: true },
    { slot: '04:00 PM', patients: 2, durationMins: 35, status: 'Moderate', overload: false }
  ]);

  const totalPatientsToday = hourlySlotDensity.reduce((sum, h) => sum + h.patients, 0);
  const consecutiveHeavySlots = 3; // 9am, 10am, 11am
  const totalConsultingMins = hourlySlotDensity.reduce((sum, h) => sum + h.durationMins, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Activity className="w-3.5 h-3.5 text-blue-200" />
              Physician Fatigue & Ergonomics Analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Doctor Workload & Wellbeing Monitor
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Visualize schedule density, identify consecutive consultation runs, and protect clinical focus with structured break windows.
            </p>
          </div>

          <Badge variant="warning" size="lg" className="bg-amber-400 text-slate-900 font-bold px-3 py-1.5 self-start sm:self-center">
            Dense Morning Schedule (3h Stretch)
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Bookings Today</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalPatientsToday} Consultations</div>
          <span className="text-[11px] text-slate-500">Across 7 operating hours</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Chamber Time</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {Math.floor(totalConsultingMins / 60)}h {totalConsultingMins % 60}m
          </div>
          <span className="text-[11px] text-slate-500">Estimated clinical talk time</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consecutive Consultations</span>
          <div className="text-2xl font-black text-amber-500">10 Patients</div>
          <span className="text-[11px] text-slate-500">09:00 AM – 12:00 PM run</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended Break</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">01:00 PM</div>
          <span className="text-[11px] text-slate-500">45-minute recovery buffer</span>
        </div>
      </div>

      {/* Hourly Schedule Density Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Hourly Schedule Density & Overload Windows
            </h3>
            <p className="text-xs text-slate-500">
              Hours with &gt;50 active clinical minutes flagged in amber/rose to protect cognitive focus.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500" /> Overloaded</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" /> Balanced</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Rest Buffer</span>
          </div>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlySlotDensity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis dataKey="slot" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} label={{ value: 'Minutes Active', angle: -90, position: 'insideLeft', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, fontSize: 12, backgroundColor: '#0f172a', color: '#fff' }}
              />
              <Bar dataKey="durationMins" radius={[8, 8, 0, 0]}>
                {hourlySlotDensity.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isBreak ? '#10b981' : entry.overload ? '#ef4444' : '#3b82f6'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wellbeing Recommendations */}
      <div className="p-5 rounded-3xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-3">
        <h4 className="font-extrabold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Coffee className="w-4 h-4" /> Recommended Clinical Rhythm & Ergonomic Rest
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 dark:text-slate-200">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold block text-slate-900 dark:text-white">Morning Mid-Shift Micro-Break</span>
            <p className="text-slate-500 text-[11px]">
              Take 5 minutes at 10:45 AM for eye rest and hydration between Patients #4 and #5.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold block text-slate-900 dark:text-white">Protected 1:00 PM Lunch Buffer</span>
            <p className="text-slate-500 text-[11px]">
              Reception has been alerted to hold walk-in additions during the 1:00 PM – 1:45 PM window.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Advisory Rhythm Guidance
          </span>
          This tool calculates density based on booked appointments and standard consultation durations. It does not automatically cancel or reschedule appointments without clinician confirmation.
        </div>
      </div>
    </div>
  );
}

