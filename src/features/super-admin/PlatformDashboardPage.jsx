import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  CreditCard,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function PlatformDashboardPage() {
  const { clinics = [] } = useApp();

  const mrrData = [
    { month: 'May', mrr: 88000, clinics: 16 },
    { month: 'Jun', mrr: 104000, clinics: 19 },
    { month: 'Jul', mrr: 118000, clinics: 21 },
    { month: 'Aug', mrr: 129000, clinics: 23 },
    { month: 'Sep', mrr: 141000, clinics: 25 },
    { month: 'Oct', mrr: 153978, clinics: 28 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SaaS Platform Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Platform Master Cockpit
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            SaaS Platform Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Platform Master Cockpit
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Overview of multi-tenant clinic organizations, trial conversions, and platform revenue.
          </p>
        </div>

<<<<<<< HEAD
        <div className="flex items-center gap-3">
=======
        <div className="flex items-center gap-2">
>>>>>>> origin/main
          <Link to="/superadmin/clinics">
            <Button variant="outline" size="sm">
              Manage Clinics
            </Button>
          </Link>
          <Link to="/superadmin/plans">
            <Button variant="primary" size="sm">
              Configure Plans
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Clinics"
          value="28"
          change="3 new this week"
          trend="up"
          icon={Building2}
          color="blue"
          subtitle="Multi-tenant specialty clinics"
        />
        <StatCard
          title="Active 14-Day Trials"
          value="4"
          change="Conversion: 82%"
          trend="up"
          icon={Sparkles}
          color="amber"
          subtitle="Clinics evaluating platform"
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value="₹1,53,978"
          change="+18.4% vs last month"
          trend="up"
          icon={CreditCard}
          color="emerald"
          subtitle="SaaS subscription MRR"
        />
        <StatCard
          title="Registered Platform Users"
          value="1,420"
          change="Doctors, Staff & Patients"
          trend="up"
          icon={Users}
          color="indigo"
          subtitle="Across all clinic tenants"
        />
      </div>

      {/* Platform Workforce & RBAC Quick Spotlight */}
<<<<<<< HEAD
      <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 text-white shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <ShieldCheck className="w-4.5 h-4.5" />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Zero-Trust Architecture · 48 Platform Personnel
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Workforce Headcount & Role Access Control Matrix
          </h3>
          <p className="text-sm text-slate-300 dark:text-slate-400 max-w-2xl leading-relaxed">
=======
      <div className="bg-slate-900 rounded-xl p-5 text-white shadow-2xs border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Zero-Trust Architecture · 48 Platform Personnel
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Workforce Headcount & Role Access Control Matrix
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
>>>>>>> origin/main
            Live monitoring across <strong className="text-white">14 Developers</strong>, <strong className="text-white">6 QA Testers</strong>, <strong className="text-white">4 DevOps SRE</strong>, <strong className="text-white">3 Security/HIPAA</strong>, and <strong className="text-white">7 Support Specialists</strong> powering the ClinicOS SaaS cloud.
          </p>
        </div>

        <Link
          to="/superadmin/role-matrix"
<<<<<<< HEAD
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors shrink-0 cursor-pointer"
=======
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
>>>>>>> origin/main
        >
          <span>Open Role Matrix & Personnel</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

<<<<<<< HEAD
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MRR & Clinic Growth Area Chart */}
        <div className="lg:col-span-8">
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
      {/* Charts Section (Cards connected with zero gap) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* MRR & Clinic Growth Area Chart */}
        <div className="lg:col-span-8">
          <Card className="lg:rounded-r-none lg:border-r-0 h-full">
>>>>>>> origin/main
            <CardHeader
              title="Platform Growth & Subscription Revenue"
              subtitle="Monthly Recurring Revenue (INR) across the last 6 months"
            />
            <CardContent>
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mrrData}>
                    <defs>
                      <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
<<<<<<< HEAD
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 13, fill: '#64748B' }}
=======
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
>>>>>>> origin/main
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'MRR']}
<<<<<<< HEAD
                      contentStyle={{ borderRadius: '12px', fontSize: '13px', backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
=======
                      contentStyle={{ borderRadius: '12px', fontSize: '13px', borderColor: '#e2e8f0' }}
>>>>>>> origin/main
                    />
                    <Area
                      type="monotone"
                      dataKey="mrr"
                      stroke="#2563EB"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#mrrGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Tier Distribution */}
        <div className="lg:col-span-4">
<<<<<<< HEAD
          <Card className="h-full flex flex-col justify-between border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
          <Card className="lg:rounded-l-none h-full flex flex-col justify-between">
>>>>>>> origin/main
            <CardHeader
              title="Active Subscription Tiers"
              subtitle="Clinic distribution across plans"
            />
            <CardContent className="space-y-4">
              <div className="space-y-3">
<<<<<<< HEAD
                <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-blue-900 dark:text-blue-300">Professional Plan</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">₹6,999/mo (Up to 10 Doctors)</span>
                  </div>
                  <span className="text-base font-bold text-blue-800 dark:text-blue-300 tabular-nums">14 Clinics</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">Starter Plan</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">₹2,499/mo (Up to 2 Doctors)</span>
                  </div>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 tabular-nums">8 Clinics</span>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-indigo-900 dark:text-indigo-300">Enterprise Plan</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">₹14,999/mo (10-30 Bed Facilities)</span>
                  </div>
                  <span className="text-base font-bold text-indigo-800 dark:text-indigo-300 tabular-nums">4 Clinics</span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-amber-900 dark:text-amber-300">Active 14-Day Free Trials</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">In evaluation period</span>
                  </div>
                  <span className="text-base font-bold text-amber-800 dark:text-amber-300 tabular-nums">4 Trials</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 dark:text-slate-500 text-center">
=======
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-blue-900 text-base">Professional Plan</span>
                    <span className="block text-slate-500 text-xs">₹6,999/mo (Up to 10 Doctors)</span>
                  </div>
                  <span className="text-base font-bold text-blue-800 tabular-nums">14 Clinics</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-slate-900 text-base">Starter Plan</span>
                    <span className="block text-slate-500 text-xs">₹2,499/mo (Up to 2 Doctors)</span>
                  </div>
                  <span className="text-base font-bold text-slate-800 tabular-nums">8 Clinics</span>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-indigo-900 text-base">Enterprise Plan</span>
                    <span className="block text-slate-500 text-xs">₹14,999/mo (10-30 Bed Facilities)</span>
                  </div>
                  <span className="text-base font-bold text-indigo-800 tabular-nums">4 Clinics</span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-100 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-amber-900 text-base">Active 14-Day Free Trials</span>
                    <span className="block text-slate-500 text-xs">In evaluation period</span>
                  </div>
                  <span className="text-base font-bold text-amber-800 tabular-nums">4 Trials</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 text-center font-medium">
>>>>>>> origin/main
                Platform billing is separate from clinic patient invoices.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Clinics Roster Table */}
<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
      <Card>
>>>>>>> origin/main
        <CardHeader
          title="Registered Clinic Tenants"
          subtitle="Showing active clinics, trial status, and owners"
          action={
            <Link to="/superadmin/clinics">
              <Button variant="outline" size="sm">
<<<<<<< HEAD
                View All Clinics <ArrowRight className="w-4 h-4 ml-1.5" />
=======
                View All Clinics <ArrowRight className="w-3.5 h-3.5 ml-1" />
>>>>>>> origin/main
              </Button>
            </Link>
          }
        />
        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12 font-bold">#</th>
                <th className="p-4">Clinic Name & Code</th>
                <th className="p-4">Specialty</th>
                <th className="p-4">Owner / Administrator</th>
                <th className="p-4">Branches</th>
                <th className="p-4">Current Plan</th>
                <th className="p-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {clinics.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900 dark:text-white text-base">{c.name}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">{c.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{c.specialty}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-800 dark:text-slate-200 font-medium">{c.ownerName}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{c.email}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                    {c.branches?.length || 1} Branch{(c.branches?.length || 1) > 1 ? 'es' : ''}
                  </td>
                  <td className="p-4">
                    <span className="uppercase text-xs font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                      {c.subscriptionPlanId} {c.isTrial ? '(Trial)' : ''}
                    </span>
                  </td>
                  <td className="p-4">
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Clinic Name & Code</th>
                <th className="p-3.5">Specialty</th>
                <th className="p-3.5">Owner / Administrator</th>
                <th className="p-3.5">Branches</th>
                <th className="p-3.5">Current Plan</th>
                <th className="p-3.5">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clinics.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{c.slug}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-700">{c.specialty}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-800 font-medium">{c.ownerName}</div>
                    <div className="text-[10px] text-slate-400">{c.email}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700 tabular-nums">
                    {c.branches?.length || 1} Branch{(c.branches?.length || 1) > 1 ? 'es' : ''}
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {c.subscriptionPlanId} {c.isTrial ? '(Trial)' : ''}
                    </span>
                  </td>
                  <td className="p-3.5">
>>>>>>> origin/main
                    <Badge variant={c.status}>{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
