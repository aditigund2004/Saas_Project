import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  CreditCard,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Layers,
  CheckCircle2,
  AlertCircle
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
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export function PlatformDashboardPage() {
  const { clinics, plans } = useApp();

  const mrrData = [
    { month: 'May', mrr: 88000, clinics: 16 },
    { month: 'Jun', mrr: 104000, clinics: 19 },
    { month: 'Jul', mrr: 118000, clinics: 21 },
    { month: 'Aug', mrr: 129000, clinics: 23 },
    { month: 'Sep', mrr: 141000, clinics: 25 },
    { month: 'Oct', mrr: 153978, clinics: 28 }
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            SaaS Platform Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Platform Master Cockpit
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of multi-tenant clinic organizations, trial conversions, and platform revenue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/platform/clinics">
            <Button variant="outline" size="sm">
              Manage Clinics
            </Button>
          </Link>
          <Link to="/platform/plans">
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
          color="indigo"
          subtitle="Multi-tenant specialty clinics"
        />
        <StatCard
          title="Active 14-Day Trials"
          value="4"
          change="Conversion: 82%"
          trend="up"
          icon={Sparkles}
          color="teal"
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
          color="blue"
          subtitle="Across all clinic tenants"
        />
      </div>

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
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
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
                      contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="mrr"
                      stroke="#0d9488"
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
            <Link to="/platform/clinics">
              <Button variant="outline" size="sm">
                View All Clinics <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
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
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{c.slug}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-700">{c.specialty}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-800 font-medium">{c.ownerName}</div>
                    <div className="text-[10px] text-slate-400">{c.email}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
                    {c.branches.length} Branch{c.branches.length > 1 ? 'es' : ''}
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
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

