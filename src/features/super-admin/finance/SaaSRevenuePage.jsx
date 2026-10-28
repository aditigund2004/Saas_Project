import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SaaSFinanceNav } from './SaaSFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export function SaaSRevenuePage() {
  const { plans, clinics, saasInvoices, formatCurrency, showToast } = useApp();
  const [periodFilter, setPeriodFilter] = useState('All');

  // Plan Distribution Breakdown
  const planBreakdown = plans.map((p) => {
    const clinicsOnPlan = clinics.filter((c) => c.subscriptionPlanId === p.id && c.status === 'Active');
    const mrrContribution = clinicsOnPlan.length * p.monthlyPrice;
    return {
      id: p.id,
      name: p.name,
      clinicCount: clinicsOnPlan.length,
      monthlyPrice: p.monthlyPrice,
      mrr: mrrContribution,
      color: p.id === 'enterprise' ? '#172554' : p.id === 'professional' ? '#2563EB' : p.id === 'growth' ? '#3B82F6' : '#93C5FD'
    };
  });

  const totalMRR = planBreakdown.reduce((acc, p) => acc + p.mrr, 0);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Plan Name,Active Clinics,Monthly Price,MRR Contribution,Share %']
        .concat(
          planBreakdown.map(
            (p) =>
              `"${p.name}",${p.clinicCount},${p.monthlyPrice},${p.mrr},"${((p.mrr / (totalMRR || 1)) * 100).toFixed(1)}%"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_saas_revenue_by_plan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
<<<<<<< HEAD
    showToast('SaaS revenue breakdown CSV exported.', 'success');
=======
    showToast('SaaS revenue breakdown CSV exported.');
>>>>>>> origin/main
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Revenue Operations</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">SaaS Revenue & Plan Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Revenue Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Revenue & Plan Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            MRR distribution across subscription tiers, annual vs monthly mix, customer retention, and churn indicators.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
          Export Revenue CSV
        </Button>
      </div>

      <SaaSFinanceNav />

      {/* Cohort KPIs */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Gross Subscription MRR</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 font-mono mt-1">{formatCurrency(totalMRR)}</div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1.5 block">Across 4 active tier tiers</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Trial-to-Paid Conversion</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">82.4%</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 block">14-day evaluation cohort</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Monthly Churn Rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">1.8%</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 block">Industry best (&lt; 2.5% target)</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Annual Billing Mix</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-400 mt-1">38% Annual</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 block">Upfront annual subscriptions</span>
=======
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Subscription MRR</span>
          <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">{formatCurrency(totalMRR)}</div>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 block">Across 4 active tier tiers</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trial-to-Paid Conversion</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">82.4%</div>
          <span className="text-[10px] text-slate-500 mt-1 block">14-day evaluation cohort</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Churn Rate</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">1.8%</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Industry best (&lt; 2.5% target)</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Annual Billing Mix</span>
          <div className="text-2xl font-extrabold text-purple-700 mt-1">38% Annual</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Upfront annual subscriptions</span>
>>>>>>> origin/main
        </Card>
      </div>

      {/* Chart: Revenue Contribution by Plan */}
<<<<<<< HEAD
      <Card className="p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">MRR Contribution by Subscription Tier</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Gross monthly revenue generated by each active plan</p>
          </div>
          <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">Total: {formatCurrency(totalMRR)}/mo</span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={planBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 13, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Monthly Revenue']}
                contentStyle={{ borderRadius: 12, backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: 13 }}
=======
      <Card className="p-6 border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">MRR Contribution by Subscription Tier</h3>
            <p className="text-xs text-slate-500">Gross monthly revenue generated by each active plan</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700">Total: {formatCurrency(totalMRR)}/mo</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={planBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Monthly Revenue']}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
>>>>>>> origin/main
              />
              <Bar dataKey="mrr" radius={[8, 8, 0, 0]}>
                {planBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Table: Plan Economics & Retention Table */}
<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
      <Card>
>>>>>>> origin/main
        <CardHeader
          title="SaaS Plan Performance & Entitlements"
          subtitle="Pricing points, active clinic tenant counts, and monthly recurring contribution"
        />
        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12 font-bold">#</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4">Monthly Fee</th>
                <th className="p-4">Annual Fee (20% off)</th>
                <th className="p-4">Active Clinics</th>
                <th className="p-4">MRR Contribution</th>
                <th className="p-4">Revenue Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {planBreakdown.map((p, idx) => {
                const sharePercent = totalMRR > 0 ? ((p.mrr / totalMRR) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white text-base">{p.name}</td>
                    <td className="p-4 font-mono text-slate-700 dark:text-slate-300 font-semibold">{formatCurrency(p.monthlyPrice)}/mo</td>
                    <td className="p-4 font-mono text-slate-500 dark:text-slate-400">{formatCurrency(p.monthlyPrice * 10)}/yr</td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{p.clinicCount} Clinics</td>
                    <td className="p-4 font-mono font-bold text-blue-700 dark:text-blue-400 text-base">{formatCurrency(p.mrr)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-20 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: `${sharePercent}%` }} />
                        </div>
                        <span className="font-mono text-xs text-slate-600 dark:text-slate-300 font-bold">{sharePercent}%</span>
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Plan Tier</th>
                <th className="p-3.5">Monthly Fee</th>
                <th className="p-3.5">Annual Fee (20% off)</th>
                <th className="p-3.5">Active Clinics</th>
                <th className="p-3.5">MRR Contribution</th>
                <th className="p-3.5">Revenue Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {planBreakdown.map((p) => {
                const sharePercent = totalMRR > 0 ? ((p.mrr / totalMRR) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-900">{p.name}</td>
                    <td className="p-3.5 font-mono text-slate-700">{formatCurrency(p.monthlyPrice)}/mo</td>
                    <td className="p-3.5 font-mono text-slate-500">{formatCurrency(p.monthlyPrice * 10)}/yr</td>
                    <td className="p-3.5 font-semibold text-slate-800">{p.clinicCount} Clinics</td>
                    <td className="p-3.5 font-mono font-bold text-blue-700">{formatCurrency(p.mrr)}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${sharePercent}%` }} />
                        </div>
                        <span className="font-mono text-[11px] text-slate-600">{sharePercent}%</span>
>>>>>>> origin/main
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
