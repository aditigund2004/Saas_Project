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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Financial Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Accounts & Tax Reports</h1>
          <p className="text-xs text-slate-500">
            Consolidated income statement, GST reconciliation breakdown, and cash collection auditing
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleExportCSV}>
          <Download className="w-3.5 h-3.5 mr-1" />
          Export Audit Report (CSV)
        </Button>
      </div>

      {/* Financial Statement Summary Card */}
      <Card className="p-6 border-slate-200 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
          Month-to-Date Financial Statement Summary (October 2026)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <span>Formulas Documented: Net Surplus = (Total Collected Receipts) - (Total Operating Expenditures).</span>
          <Badge variant="teal" size="sm">Audited Demo Data</Badge>
        </div>
      </Card>
    </div>
  );
}

