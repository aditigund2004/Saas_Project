import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BarChart3, Download, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export function AccountsReportsPage() {
  const { invoices, expenses, formatCurrency, showToast, activeClinic } = useApp();

  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netSurplus = totalCollected - totalExpenses;

  const handleExportCSV = () => {
    showToast('Simulated financial export complete. Downloaded: clinicos-financial-oct2026.csv');
  };

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Financial Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Accounts & Tax Reports</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Financial Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Accounts & Tax Reports</h1>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Consolidated income statement, GST reconciliation breakdown, and cash collection auditing
          </p>
        </div>

<<<<<<< HEAD
        <Button variant="primary" size="sm" onClick={handleExportCSV} className="font-semibold shadow-sm">
          <Download className="w-4 h-4 mr-1.5" />
=======
        <Button variant="primary" size="sm" onClick={handleExportCSV}>
          <Download className="w-3.5 h-3.5 mr-1" />
>>>>>>> origin/main
          Export Audit Report (CSV)
        </Button>
      </div>

      {/* Financial Statement Summary Card */}
<<<<<<< HEAD
      <Card className="p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900 space-y-4 shadow-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
=======
      <Card className="p-6 border-slate-200 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
>>>>>>> origin/main
          Month-to-Date Financial Statement Summary (October 2026)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<<<<<<< HEAD
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Gross Billed</span>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{formatCurrency(totalBilled)}</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60">
            <span className="text-xs text-emerald-800 dark:text-emerald-300 uppercase font-bold tracking-wider">Realized Collections</span>
            <div className="text-xl font-black text-emerald-950 dark:text-emerald-100 mt-1.5">{formatCurrency(totalCollected)}</div>
          </div>
          <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60">
            <span className="text-xs text-rose-800 dark:text-rose-300 uppercase font-bold tracking-wider">Operational Costs</span>
            <div className="text-xl font-black text-rose-950 dark:text-rose-100 mt-1.5">{formatCurrency(totalExpenses)}</div>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
            <span className="text-xs text-blue-800 dark:text-blue-300 uppercase font-bold tracking-wider">Net Operating Surplus</span>
            <div className="text-xl font-black text-blue-950 dark:text-blue-100 mt-1.5">{formatCurrency(netSurplus)}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
=======
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">Gross Billed</span>
            <div className="text-xl font-black text-slate-900 mt-1">{formatCurrency(totalBilled)}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] text-emerald-800 uppercase font-semibold">Realized Collections</span>
            <div className="text-xl font-black text-emerald-950 mt-1">{formatCurrency(totalCollected)}</div>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
            <span className="text-[11px] text-rose-800 uppercase font-semibold">Operational Costs</span>
            <div className="text-xl font-black text-rose-950 mt-1">{formatCurrency(totalExpenses)}</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-[11px] text-blue-800 uppercase font-semibold">Net Operating Surplus</span>
            <div className="text-xl font-black text-blue-950 mt-1">{formatCurrency(netSurplus)}</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
>>>>>>> origin/main
          <span>Formulas Documented: Net Surplus = (Total Collected Receipts) - (Total Operating Expenditures).</span>
          <Badge variant="teal" size="sm">Audited Demo Data</Badge>
        </div>
      </Card>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
