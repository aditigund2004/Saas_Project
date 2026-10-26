import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  CreditCard,
  Sparkles,
<<<<<<< HEAD
  ShieldCheck,
  ArrowRight
=======
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Layers,
  CheckCircle2,
  AlertCircle
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
  ResponsiveContainer
} from 'recharts';

export function PlatformDashboardPage() {
  const { clinics = [] } = useApp();
=======
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export function PlatformDashboardPage() {
  const { clinics, plans } = useApp();
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

  const mrrData = [
    { month: 'May', mrr: 88000, clinics: 16 },
    { month: 'Jun', mrr: 104000, clinics: 19 },
    { month: 'Jul', mrr: 118000, clinics: 21 },
    { month: 'Aug', mrr: 129000, clinics: 23 },
    { month: 'Sep', mrr: 141000, clinics: 25 },
    { month: 'Oct', mrr: 153978, clinics: 28 }
  ];

  return (
<<<<<<< HEAD
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            SaaS Platform Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
=======
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            SaaS Platform Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            Platform Master Cockpit
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of multi-tenant clinic organizations, trial conversions, and platform revenue.
          </p>
        </div>

        <div className="flex items-center gap-2">
<<<<<<< HEAD
          <Link to="/superadmin/clinics">
=======
          <Link to="/platform/clinics">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            <Button variant="outline" size="sm">
              Manage Clinics
            </Button>
          </Link>
<<<<<<< HEAD
          <Link to="/superadmin/plans">
=======
          <Link to="/platform/plans">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
          color="blue"
=======
          color="indigo"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          subtitle="Multi-tenant specialty clinics"
        />
        <StatCard
          title="Active 14-Day Trials"
          value="4"
          change="Conversion: 82%"
          trend="up"
          icon={Sparkles}
<<<<<<< HEAD
          color="amber"
=======
          color="teal"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
          color="indigo"
=======
          color="blue"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          subtitle="Across all clinic tenants"
        />
      </div>

<<<<<<< HEAD
      {/* Platform Workforce & RBAC Quick Spotlight */}
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
            Live monitoring across <strong className="text-white">14 Developers</strong>, <strong className="text-white">6 QA Testers</strong>, <strong className="text-white">4 DevOps SRE</strong>, <strong className="text-white">3 Security/HIPAA</strong>, and <strong className="text-white">7 Support Specialists</strong> powering the ClinicOS SaaS cloud.
          </p>
        </div>

        <Link
          to="/superadmin/role-matrix"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <span>Open Role Matrix & Personnel</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MRR & Clinic Growth Area Chart */}
        <div className="lg:col-span-8">
          <Card>
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
<<<<<<< HEAD
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
=======
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'MRR']}
<<<<<<< HEAD
                      contentStyle={{ borderRadius: '12px', fontSize: '12px', borderColor: '#e2e8f0' }}
=======
                      contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                    />
                    <Area
                      type="monotone"
                      dataKey="mrr"
<<<<<<< HEAD
                      stroke="#2563EB"
=======
                      stroke="#0d9488"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
          <Card className="h-full flex flex-col justify-between">
            <CardHeader
              title="Active Subscription Tiers"
              subtitle="Clinic distribution across plans"
            />
            <CardContent className="space-y-4">
              <div className="space-y-3">
<<<<<<< HEAD
                <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-blue-900">Professional Plan</span>
                    <span className="block text-slate-500 text-[10px]">₹6,999/mo (Up to 10 Doctors)</span>
                  </div>
                  <span className="text-sm font-bold text-blue-800 tabular-nums">14 Clinics</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">Starter Plan</span>
                    <span className="block text-slate-500 text-[10px]">₹2,499/mo (Up to 2 Doctors)</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 tabular-nums">8 Clinics</span>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-indigo-900">Enterprise Plan</span>
                    <span className="block text-slate-500 text-[10px]">₹14,999/mo (10-30 Bed Facilities)</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-800 tabular-nums">4 Clinics</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-amber-900">Active 14-Day Free Trials</span>
                    <span className="block text-slate-500 text-[10px]">In evaluation period</span>
                  </div>
                  <span className="text-sm font-bold text-amber-800 tabular-nums">4 Trials</span>
=======
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-blue-900">Professional Plan</span>
                    <span className="block text-slate-500 text-[10px]">₹6,999/mo (Up to 10 Doctors)</span>
                  </div>
                  <span className="text-base font-extrabold text-blue-800">14 Clinics</span>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-blue-900">Starter Plan</span>
                    <span className="block text-slate-500 text-[10px]">₹2,499/mo (Up to 2 Doctors)</span>
                  </div>
                  <span className="text-base font-extrabold text-blue-800">8 Clinics</span>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-purple-900">Enterprise Plan</span>
                    <span className="block text-slate-500 text-[10px]">₹14,999/mo (10-30 Bed Nursing Homes)</span>
                  </div>
                  <span className="text-base font-extrabold text-purple-800">4 Clinics</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-amber-900">Active 14-Day Free Trials</span>
                    <span className="block text-slate-500 text-[10px]">In evaluation period</span>
                  </div>
                  <span className="text-base font-extrabold text-amber-800">4 Trials</span>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 text-center">
                Platform billing is separate from clinic patient invoices.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Clinics Roster Table */}
      <Card>
        <CardHeader
          title="Registered Clinic Tenants"
          subtitle="Showing active clinics, trial status, and owners"
          action={
<<<<<<< HEAD
            <Link to="/superadmin/clinics">
=======
            <Link to="/platform/clinics">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              <Button variant="outline" size="sm">
                View All Clinics <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
<<<<<<< HEAD
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
=======
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900">{c.name}</div>
=======
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.name}</div>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                    <div className="text-[10px] text-slate-400 font-mono">{c.slug}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-700">{c.specialty}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-800 font-medium">{c.ownerName}</div>
                    <div className="text-[10px] text-slate-400">{c.email}</div>
                  </td>
<<<<<<< HEAD
                  <td className="p-3.5 font-semibold text-slate-700 tabular-nums">
                    {c.branches?.length || 1} Branch{(c.branches?.length || 1) > 1 ? 'es' : ''}
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
=======
                  <td className="p-3.5 font-semibold text-slate-700">
                    {c.branches.length} Branch{c.branches.length > 1 ? 'es' : ''}
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                      {c.subscriptionPlanId} {c.isTrial ? '(Trial)' : ''}
                    </span>
                  </td>
                  <td className="p-3.5">
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
<<<<<<< HEAD
=======

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
