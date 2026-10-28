import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
<<<<<<< HEAD
  Bar
=======
  Bar,
  PieChart,
  Pie,
  Cell
>>>>>>> origin/main
} from 'recharts';
import { TrendingUp, Users, Building2, Sparkles } from 'lucide-react';

export function PlatformReportsPage() {
<<<<<<< HEAD
=======
  const conversionData = [
    { name: 'Completed Free Trials', value: 34, color: '#0d9488' },
    { name: 'Converted to Paid Plan', value: 28, color: '#2563eb' },
    { name: 'Churned / Inactive', value: 6, color: '#f43f5e' }
  ];

>>>>>>> origin/main
  const specialtyDistribution = [
    { specialty: 'Dental', clinics: 12 },
    { specialty: 'Orthopedics', clinics: 6 },
    { specialty: 'Dermatology', clinics: 5 },
    { specialty: 'Pediatrics', clinics: 3 },
    { specialty: 'Nursing Homes', clinics: 2 }
  ];

  return (
    <div className="space-y-6">
      <div>
<<<<<<< HEAD
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Business Intelligence</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Platform Analytics & Growth Reports</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Business Intelligence</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Platform Analytics & Growth Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
          Illustrative platform metrics for clinic registrations, 14-day trial-to-paid conversions, and specialty adoption.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Trial Conversion Rate"
          value="82.3%"
          change="+4.1% vs Q2"
          trend="up"
          icon={Sparkles}
          color="teal"
          subtitle="Clinics adopting paid plans after 14-day trial"
        />
        <StatCard
          title="Average Revenue Per Clinic"
          value="₹6,415"
          change="Blended monthly ARPU"
          trend="up"
          icon={TrendingUp}
          color="emerald"
          subtitle="Across Starter, Pro, and Enterprise"
        />
        <StatCard
          title="Active Clinic Branches"
          value="42"
          change="1.5 branches per clinic avg"
          trend="up"
          icon={Building2}
          color="indigo"
          subtitle="Multi-branch deployments"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specialty Distribution Bar Chart */}
<<<<<<< HEAD
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
        <Card>
>>>>>>> origin/main
          <CardHeader
            title="Clinic Distribution by Medical Specialty"
            subtitle="Dental and Orthopedics lead initial commercial adoption"
          />
          <CardContent>
<<<<<<< HEAD
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                  <XAxis dataKey="specialty" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} />
                  <Tooltip
                    formatter={(v) => [`${v} Clinics`, 'Count']}
                    contentStyle={{ borderRadius: '12px', fontSize: '13px', backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                  />
                  <Bar dataKey="clinics" fill="#2563EB" radius={[6, 6, 0, 0]} />
=======
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="specialty" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v) => [`${v} Clinics`, 'Count']}
                    contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="clinics" fill="#0d9488" radius={[6, 6, 0, 0]} />
>>>>>>> origin/main
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
<<<<<<< HEAD
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
        <Card>
>>>>>>> origin/main
          <CardHeader
            title="14-Day Trial Funnel Health"
            subtitle="Conversion performance across demo cohorts"
          />
          <CardContent className="space-y-4">
<<<<<<< HEAD
            <div className="p-4 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900 flex items-center justify-between text-sm">
              <div>
                <p className="font-bold text-blue-900 dark:text-blue-200">Total Trial Signups (All-time)</p>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">Self-serve 14-day onboarding initiated</p>
              </div>
              <span className="text-2xl font-extrabold text-blue-900 dark:text-blue-200 tabular-nums">34 Clinics</span>
            </div>

            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900 flex items-center justify-between text-sm">
              <div>
                <p className="font-bold text-emerald-900 dark:text-emerald-200">Paid Plan Conversions</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Converted within 14 days of free trial</p>
              </div>
              <span className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 tabular-nums">28 Clinics (82%)</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Average Front-Desk Walk-Ins Logged</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Per active clinic practice each day</p>
              </div>
              <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 tabular-nums">18.4 Visits</span>
=======
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-blue-900">Total Trial Signups (All-time)</p>
                <p className="text-[11px] text-blue-700">Self-serve 14-day onboarding initiated</p>
              </div>
              <span className="text-xl font-extrabold text-blue-900">34 Clinics</span>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-blue-900">Paid Plan Conversions</p>
                <p className="text-[11px] text-blue-700">Converted within 14 days of free trial</p>
              </div>
              <span className="text-xl font-extrabold text-blue-900">28 Clinics (82%)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">Average Front-Desk Walk-Ins Logged</p>
                <p className="text-[11px] text-slate-500">Per active clinic practice each day</p>
              </div>
              <span className="text-xl font-extrabold text-slate-800">18.4 Visits</span>
>>>>>>> origin/main
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
