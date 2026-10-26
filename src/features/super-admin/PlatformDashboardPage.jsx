import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  CreditCard,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock3
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
export function PlatformDashboardPage() {
  const { clinics, plans } = useApp();
  const pendingClinics = clinics.filter(
    (clinic) => clinic.approvalStatus === 'Pending' || clinic.status === 'Pending'
  );
  const trialClinics = clinics.filter(
    (clinic) =>
      (clinic.isTrial || clinic.status === 'Trial') &&
      clinic.status !== 'Suspended' &&
      clinic.approvalStatus !== 'Pending' &&
      clinic.approvalStatus !== 'Rejected'
  );
  const activeClinics = clinics.filter(
    (clinic) =>
      clinic.status === 'Active' &&
      !clinic.isTrial &&
      clinic.approvalStatus !== 'Pending' &&
      clinic.approvalStatus !== 'Rejected'
  );
  const monthlyRevenue = activeClinics.reduce((total, clinic) => {
    const plan = plans.find((item) => item.id === clinic.subscriptionPlanId);
    return total + (plan?.monthlyPrice || 0);
  }, 0);
  const planCounts = plans.map((plan) => ({
    ...plan,
    tenantCount: clinics.filter((clinic) => clinic.subscriptionPlanId === plan.id).length
  }));
  const recentClinics = [...clinics].reverse().slice(0, 5);
  const getClinicStatus = (clinic) => {
    if (clinic.approvalStatus === 'Pending' || clinic.status === 'Pending') return 'Pending';
    if (clinic.approvalStatus === 'Rejected') return 'Rejected';
    if (clinic.status === 'Suspended') return 'Suspended';
    if (clinic.isTrial || clinic.status === 'Trial') return 'Trial';
    return clinic.status || 'Unknown';
  };
  const sampleRevenueTrend = [
    { month: 'May', mrr: 88000 },
    { month: 'Jun', mrr: 104000 },
    { month: 'Jul', mrr: 118000 },
    { month: 'Aug', mrr: 129000 },
    { month: 'Sep', mrr: 141000 },
    { month: 'Oct', mrr: 153978 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            SaaS administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Platform overview
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Monitor clinic tenants, review new applications, and manage plans from one workspace.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link to="/superadmin/clinics">
            <Button variant="outline" size="md" icon={Building2}>
              View tenants
            </Button>
          </Link>
          <Link to="/superadmin/plans">
            <Button variant="primary" size="md" icon={Sparkles}>
              Manage plans
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total tenants"
          value={clinics.length.toLocaleString('en-IN')}
          change={`${pendingClinics.length} awaiting review`}
          trend="neutral"
          icon={Building2}
          color="indigo"
          subtitle="Registered clinics and hospitals"
        />
        <StatCard
          title="Pending applications"
          value={pendingClinics.length.toLocaleString('en-IN')}
          change={pendingClinics.length ? 'Review needed' : 'All caught up'}
          trend="neutral"
          icon={Clock3}
          color="amber"
          subtitle="Tenant requests awaiting approval"
        />
        <StatCard
          title="Active trials"
          value={trialClinics.length.toLocaleString('en-IN')}
          change="Evaluation period"
          trend="neutral"
          icon={Sparkles}
          color="teal"
          subtitle="Tenants exploring the platform"
        />
        <StatCard
          title="Monthly plan value"
          value={`₹${monthlyRevenue.toLocaleString('en-IN')}`}
          change={`${activeClinics.length} active paid tenants`}
          trend="neutral"
          icon={CreditCard}
          color="emerald"
          subtitle="Based on active tenants and current plans"
        />
      </div>

      <Card>
        <CardHeader
          title="Applications to review"
          subtitle="Approve or reject tenant requests before granting workspace access."
          action={
            <Link to="/superadmin/clinics">
              <Button variant="outline" size="sm">
                Review tenants <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          }
        />
        <CardContent>
          {pendingClinics.length ? (
            <div className="divide-y divide-slate-100">
              {pendingClinics.slice(0, 5).map((clinic) => (
                <div key={clinic.id} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-900">{clinic.name}</span>
                      <span className="block truncate text-xs text-slate-500">
                        {clinic.ownerName || clinic.email || 'Contact details pending'}
                        {clinic.city ? ` · ${clinic.city}` : ''}
                      </span>
                    </span>
                  </div>
                  <Badge variant="Pending">Needs review</Badge>
                </div>
              ))}
              {pendingClinics.length > 5 && (
                <p className="pt-3 text-xs text-slate-500">
                  Showing 5 of {pendingClinics.length} applications. Open tenant management to review the rest.
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-7 text-center">
              <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-600" />
              <p className="mt-2 text-sm font-semibold text-slate-800">You’re all caught up</p>
              <p className="mt-1 text-xs text-slate-500">New tenant applications will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MRR & Clinic Growth Area Chart */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader
              title="Sample revenue trend"
              subtitle="Illustrative monthly revenue data for the prototype; not connected to billing."
            />
            <CardContent>
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sampleRevenueTrend}>
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
              title="Plan overview"
              subtitle="Tenant count based on current plan assignments."
              action={
                <Link to="/superadmin/plans">
                  <Button variant="outline" size="sm">Manage plans</Button>
                </Link>
              }
            />
            <CardContent className="space-y-3">
              {planCounts.map((plan) => (
                <div key={plan.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-bold text-slate-900">{plan.name}</span>
                    <span className="text-xs text-slate-500">₹{plan.monthlyPrice.toLocaleString('en-IN')} / month</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">
                    {plan.tenantCount} {plan.tenantCount === 1 ? 'tenant' : 'tenants'}
                  </span>
                </div>
              ))}
              {!planCounts.length && (
                <p className="py-6 text-center text-sm text-slate-500">No subscription plans are configured yet.</p>
              )}
              <p className="border-t border-slate-100 pt-3 text-center text-xs text-slate-500">
                Plan billing is separate from clinic patient invoices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Clinics Roster Table */}
      <Card>
        <CardHeader
          title="Recently added tenants"
          subtitle={`Latest ${recentClinics.length} of ${clinics.length} registered clinics.`}
          action={
            <Link to="/superadmin/clinics">
              <Button variant="outline" size="sm">
                View all tenants <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          }
        />
        <div className="overflow-x-auto">
          <table aria-label="Recently added clinic tenants" className="min-w-[680px] w-full text-left text-sm">
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
              {recentClinics.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{c.slug || 'No clinic code'}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-700">{c.specialty || 'Not specified'}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-800 font-medium">{c.ownerName || 'Not assigned'}</div>
                    <div className="text-[10px] text-slate-400">{c.email || 'No email provided'}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
                    {c.branches?.length ?? 0} Branch{c.branches?.length === 1 ? '' : 'es'}
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {c.subscriptionPlanId || 'Unassigned'} {getClinicStatus(c) === 'Trial' ? '(Trial)' : ''}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={getClinicStatus(c)}>{getClinicStatus(c)}</Badge>
                  </td>
                </tr>
              ))}
              {!clinics.length && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-slate-500">
                    No tenants registered yet. Register a clinic to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
