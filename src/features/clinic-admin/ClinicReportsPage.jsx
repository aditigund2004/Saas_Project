import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Practice Performance Analytics
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">Operational & Financial Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time consultation completion rates, procedure revenue breakdowns, and patient attendance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs">
            {['Day', 'Week', 'Month'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  timeRange === t ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600'
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
          <Card>
            <CardHeader
              title="Daily Attendance & Visit Outcomes"
              subtitle="Completed visits vs cancellations and no-shows"
            />
            <CardContent>
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
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
          <Card className="h-full flex flex-col justify-between">
            <CardHeader
              title="Revenue by Procedure Group"
              subtitle="Clinical department contributions"
            />
            <CardContent className="space-y-3">
              {procedureBreakdown.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{p.name}</span>
                    <span className="block text-[11px] text-slate-500">{p.count} Patients treated</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{p.revenue.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <p className="text-[11px] text-slate-400 text-center pt-2">
                Reports update automatically as appointments and invoices are marked completed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

