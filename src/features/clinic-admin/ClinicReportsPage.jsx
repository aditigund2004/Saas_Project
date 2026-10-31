import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, BarChart3, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export function ClinicReportsPage() {
  const { activeClinic, activeBranch, showToast } = useApp();
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('Month'); // 'Day', 'Week', 'Month'

  const procedureBreakdown = [
    { name: 'Endodontics / Root Canal', revenue: 64000, count: 14 },
    { name: 'Orthodontics & Aligners', revenue: 85000, count: 8 },
    { name: 'Prophylaxis & Hygiene', revenue: 28000, count: 16 },
    { name: 'Consultations & OPG', revenue: 18400, count: 23 }
  ];

  const dailyAttendance = [
    { day: 'Mon', completed: 14, cancelled: 1, noShow: 0 },
    { day: 'Tue', completed: 18, cancelled: 2, noShow: 1 },
    { day: 'Wed', completed: 16, cancelled: 0, noShow: 0 },
    { day: 'Thu', completed: 20, cancelled: 1, noShow: 1 },
    { day: 'Fri', completed: 19, cancelled: 2, noShow: 0 },
    { day: 'Sat', completed: 22, cancelled: 1, noShow: 1 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Practice Performance Analytics
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Operational & Financial Reports</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time consultation completion rates, procedure revenue breakdowns, and patient attendance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 text-xs">
            {['Day', 'Week', 'Month'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  timeRange === t ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => showToast('Clinic financial report exported (CSV format).')}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance Completion Rate"
          value="93.8%"
          change="Only 2 no-shows"
          trend="up"
          icon={CheckCircle2}
          color="teal"
          subtitle="Visits attended as booked"
        />
        <StatCard
          title="Gross Procedure Revenue"
          value="₹1,95,400"
          change="+14.2% vs prior period"
          trend="up"
          icon={TrendingUp}
          color="emerald"
          subtitle="Clinical procedures & scans"
        />
        <StatCard
          title="Operational Overheads"
          value="₹27,500"
          change="Consumables & utilities"
          trend="down"
          icon={BarChart3}
          color="blue"
          subtitle="Recorded clinic expenses"
        />
        <StatCard
          title="Net Practice Income"
          value="₹1,67,900"
          change="Before doctor profit split"
          trend="up"
          icon={TrendingUp}
          color="indigo"
          subtitle="Gross revenue minus expenses"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Breakdown Bar Chart */}
        <div className="lg:col-span-7">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader
              title="Daily Attendance & Visit Outcomes"
              subtitle="Completed visits vs cancellations and no-shows"
            />
            <CardContent>
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1f2937' : '#f1f5f9'} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#111827' : '#ffffff',
                        borderColor: isDark ? '#1f2937' : '#e2e8f0',
                        color: isDark ? '#f8fafc' : '#0f172a',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="completed" name="Completed Visits" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cancelled" name="Cancelled" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="noShow" name="No-Show" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Procedure Revenue Distribution */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col justify-between border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader
              title="Revenue by Procedure Group"
              subtitle="Clinical department contributions"
            />
            <CardContent className="space-y-3">
              {procedureBreakdown.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">{p.count} Patients treated</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    ₹{p.revenue.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center pt-2">
                Reports update automatically as appointments and invoices are marked completed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

