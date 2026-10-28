import React from 'react';
import { useApp } from '../../../context/AppContext';
import { SaaSFinanceNav } from './SaaSFinanceNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import {
  TrendingUp,
  Download,
  Info
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function SaaSFinanceOverviewPage() {
  const {
    saasInvoices = [],
    saasPayments = [],
    saasRefunds = [],
    saasExpenses = [],
    clinics = [],
    plans = [],
    showToast,
    formatCurrency
  } = useApp();

<<<<<<< HEAD
  const activePaidClinics = clinics.filter((c) => c.status === 'Active' && !c.isTrial).length;
  const trialClinics = clinics.filter((c) => c.isTrial).length;

=======
  // Financial Metric Calculations
  const activePaidClinics = clinics.filter((c) => c.status === 'Active' && !c.isTrial).length;
  const trialClinics = clinics.filter((c) => c.isTrial).length;

  // MRR: Normalized monthly value of active recurring subscriptions
>>>>>>> origin/main
  const calculatedMRR = clinics
    .filter((c) => c.status === 'Active' && !c.isTrial)
    .reduce((acc, c) => {
      const plan = plans.find((p) => p.id === c.subscriptionPlanId);
      return acc + (plan?.monthlyPrice || 4999);
    }, 0);

  const calculatedARR = calculatedMRR * 12;

<<<<<<< HEAD
=======
  // Cash Collected MTD: Sum of successful payment transactions
>>>>>>> origin/main
  const totalCashCollected = saasPayments
    .filter((p) => p.status === 'Success')
    .reduce((acc, p) => acc + p.amount, 0);

<<<<<<< HEAD
=======
  // Outstanding Invoices: Invoices pending or overdue
>>>>>>> origin/main
  const totalOutstanding = saasInvoices
    .filter((i) => i.status === 'Pending' || i.status === 'Overdue' || i.status === 'Failed')
    .reduce((acc, i) => acc + i.amount, 0);

<<<<<<< HEAD
=======
  // Total Refunds MTD
>>>>>>> origin/main
  const totalRefunds = saasRefunds
    .filter((r) => r.status === 'Completed')
    .reduce((acc, r) => acc + r.amount, 0);

<<<<<<< HEAD
=======
  // Total Company Operating Costs MTD
>>>>>>> origin/main
  const totalCompanyExpenses = saasExpenses
    .filter((e) => e.paymentStatus === 'Paid')
    .reduce((acc, e) => acc + e.amount, 0);

<<<<<<< HEAD
  const netSaaSMargin = totalCashCollected - totalRefunds - totalCompanyExpenses;

=======
  // Net Operating Margin for SaaS Company
  const netSaaSMargin = totalCashCollected - totalRefunds - totalCompanyExpenses;

  // Trend data for MRR trajectory chart
>>>>>>> origin/main
  const mrrTrendData = [
    { month: 'May 2026', mrr: 84000, collections: 82000 },
    { month: 'Jun 2026', mrr: 102000, collections: 99000 },
    { month: 'Jul 2026', mrr: 118000, collections: 115000 },
    { month: 'Aug 2026', mrr: 132000, collections: 130000 },
    { month: 'Sep 2026', mrr: 144000, collections: 141000 },
    { month: 'Oct 2026', mrr: calculatedMRR, collections: totalCashCollected }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Corporate Treasury</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">SaaS Finance Cockpit</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Corporate Treasury</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">SaaS Finance Cockpit</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Normalized recurring revenue (ARR/MRR), cash collected, failed payment recovery, and SaaS operating expenses.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
<<<<<<< HEAD
          onClick={() => showToast('Financial overview CSV report generated.', 'success')}
=======
          onClick={() => showToast('Financial overview PDF report generated.')}
>>>>>>> origin/main
        >
          Export Treasury Summary (.CSV)
        </Button>
      </div>

      <SaaSFinanceNav />

      {/* Metric Definitions & GAAP Explanations Accordion Notice */}
<<<<<<< HEAD
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/90 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
          <Info className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Documented Financial Definitions (Isolated Accounting Architecture):</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white block font-bold mb-1 text-sm">MRR vs Invoiced Amount:</strong>
            MRR is the normalized recurring run rate of active paid accounts. Invoiced amount reflects billing milestones and may include multi-month or annual advances.
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white block font-bold mb-1 text-sm">ARR vs Cash Collections:</strong>
            ARR (Annual Run Rate = MRR × 12) projects 12-month forward revenue. Cash collected represents actual bank deposits settled through payment gateways.
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white block font-bold mb-1 text-sm">Operating Margin vs Profit:</strong>
=======
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Documented Financial Definitions (Do Not Equate Accounting Concepts):</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-600">
          <div className="p-3 rounded-lg bg-white border border-slate-200/90">
            <strong className="text-slate-900 block font-semibold mb-1">MRR vs Invoiced Amount:</strong>
            MRR is the normalized recurring run rate of active paid accounts. Invoiced amount reflects billing milestones and may include multi-month or annual advances.
          </div>
          <div className="p-3 rounded-lg bg-white border border-slate-200/90">
            <strong className="text-slate-900 block font-semibold mb-1">ARR vs Cash Collections:</strong>
            ARR (Annual Run Rate = MRR × 12) projects 12-month forward revenue. Cash collected represents actual bank deposits settled through payment gateways.
          </div>
          <div className="p-3 rounded-lg bg-white border border-slate-200/90">
            <strong className="text-slate-900 block font-semibold mb-1">Operating Margin vs Profit:</strong>
>>>>>>> origin/main
            SaaS margin here subtracts cloud hosting, developer tooling, and API gateway reserves from net collected software subscriptions.
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Monthly Run Rate (MRR)</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight tabular-nums mt-1">
            {formatCurrency(calculatedMRR)}
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1.5 inline-flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% MoM growth
          </span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Annualized Run Rate (ARR)</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums mt-1">
            {formatCurrency(calculatedARR)}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 block">Projected 12-month baseline</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Cash Collected MTD</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums mt-1">
            {formatCurrency(totalCashCollected)}
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 block">Settled bank deposits</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Outstanding Dues</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-amber-400 tracking-tight tabular-nums mt-1">
            {formatCurrency(totalOutstanding)}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 block">Pending & failed auto-debits</span>
=======
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Monthly Run Rate (MRR)</span>
          <div className="text-2xl font-bold text-blue-700 tracking-tight tabular-nums mt-1">
            {formatCurrency(calculatedMRR)}
          </div>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 inline-flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% MoM growth
          </span>
        </Card>

        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Annualized Run Rate (ARR)</span>
          <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums mt-1">
            {formatCurrency(calculatedARR)}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Projected 12-month baseline</span>
        </Card>

        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cash Collected MTD</span>
          <div className="text-2xl font-bold text-emerald-700 tracking-tight tabular-nums mt-1">
            {formatCurrency(totalCashCollected)}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Settled bank deposits</span>
        </Card>

        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Outstanding Dues</span>
          <div className="text-2xl font-bold text-amber-700 tracking-tight tabular-nums mt-1">
            {formatCurrency(totalOutstanding)}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Pending & failed auto-debits</span>
>>>>>>> origin/main
        </Card>
      </div>

      {/* Second Row: Unit Economics & Churn */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Active Paying Clinics</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums mt-1">{activePaidClinics} Tenants</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">Excluding {trialClinics} free trial clinics</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Refunds Issued MTD</span>
          <div className="text-2xl font-bold text-rose-700 dark:text-rose-400 tracking-tight tabular-nums mt-1">{formatCurrency(totalRefunds)}</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block tabular-nums">{saasRefunds.length} total reversals</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Company Operating Costs</span>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight tabular-nums mt-1">{formatCurrency(totalCompanyExpenses)}</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">AWS, APM, Twilio, legal retainers</span>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Net SaaS Cash Margin</span>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums mt-1">{formatCurrency(netSaaSMargin)}</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">Positive unit margin</span>
=======
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Active Paying Clinics</span>
          <div className="text-xl font-bold text-slate-900 tracking-tight tabular-nums mt-1">{activePaidClinics} Tenants</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Excluding {trialClinics} free trial clinics</span>
        </Card>

        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Refunds Issued MTD</span>
          <div className="text-xl font-bold text-rose-700 tracking-tight tabular-nums mt-1">{formatCurrency(totalRefunds)}</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block tabular-nums">{saasRefunds.length} total reversals</span>
        </Card>

        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Company Operating Costs</span>
          <div className="text-xl font-bold text-slate-800 tracking-tight tabular-nums mt-1">{formatCurrency(totalCompanyExpenses)}</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">AWS, APM, Twilio, legal retainers</span>
        </Card>

        <Card className="p-4 sm:p-5 border-slate-200/90">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Net SaaS Cash Margin</span>
          <div className="text-xl font-bold text-emerald-700 tracking-tight tabular-nums mt-1">{formatCurrency(netSaaSMargin)}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">Positive unit margin</span>
>>>>>>> origin/main
        </Card>
      </div>

      {/* Chart: MRR Growth Trajectory */}
<<<<<<< HEAD
      <Card className="p-5 sm:p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">Monthly Recurring Revenue Trajectory (May – Oct 2026)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Comparing normalized MRR against actual settled cash collections</p>
          </div>
          <span className="text-xs text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 tabular-nums">
=======
      <Card className="p-5 sm:p-6 border-slate-200/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm tracking-tight">Monthly Recurring Revenue Trajectory (May – Oct 2026)</h3>
            <p className="text-xs text-slate-500">Comparing normalized MRR against actual settled cash collections</p>
          </div>
          <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 tabular-nums">
>>>>>>> origin/main
            ARR Run Rate: {formatCurrency(calculatedARR)}
          </span>
        </div>

<<<<<<< HEAD
        <div className="h-72 w-full pt-2">
=======
        <div className="h-64 w-full">
>>>>>>> origin/main
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mrrTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="collGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803D" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#15803D" stopOpacity={0.0} />
                </linearGradient>
              </defs>
<<<<<<< HEAD
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 13, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                contentStyle={{ borderRadius: 12, backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: 13 }}
=======
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
>>>>>>> origin/main
              />
              <Area type="monotone" dataKey="mrr" stroke="#2563EB" strokeWidth={2.5} fill="url(#mrrGrad)" name="Normalized MRR" />
              <Area type="monotone" dataKey="collections" stroke="#15803D" strokeWidth={2} fill="url(#collGrad)" name="Settled Collections" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
