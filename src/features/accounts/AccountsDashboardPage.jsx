import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  CreditCard,
  Receipt,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Plus,
  ArrowRight,
  QrCode,
  DollarSign
} from 'lucide-react';

export function AccountsDashboardPage() {
  const { invoices, expenses, formatCurrency, activeClinic } = useApp();

  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);
  const outstanding = totalBilled - totalCollected;
  const collectionRatio = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const refundedInvoices = invoices.filter((i) => i.status === 'Refunded');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Financial Administration
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {activeClinic.name} · Accounting Desk
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Accounts & Billing Command Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            OPD cash collections, UPI QR settlements, accounts receivable, and expense auditing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/accounts/invoices">
            <Button variant="primary" size="sm" className="font-semibold shadow-sm">
              <Plus className="w-4 h-4 mr-1.5" />
              Create Patient Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Total Billed MTD</span>
            <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white truncate">{formatCurrency(totalBilled)}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{invoices.length} invoices generated</p>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Total Collected</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-emerald-950 dark:text-emerald-100 truncate">{formatCurrency(totalCollected)}</div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Realized in OPD bank accounts</p>
        </Card>

        <Card className="p-4 border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase text-amber-800 dark:text-amber-300">Outstanding Due</span>
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-amber-950 dark:text-amber-100 truncate">{formatCurrency(outstanding)}</div>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Pending patient balances</p>
        </Card>

        <Card className="p-4 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-sm">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <span className="text-xs font-semibold uppercase text-indigo-800 dark:text-indigo-300">Collection Rate</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-indigo-900 dark:text-indigo-100">{collectionRatio}%</div>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">Target: &gt; 90%</p>
        </Card>

        <Card className="p-4 border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 col-span-2 lg:col-span-1 shadow-sm">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-2">
            <span className="text-xs font-semibold uppercase text-rose-800 dark:text-rose-300">Operating Expenses</span>
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-rose-950 dark:text-rose-100 truncate">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">Supplies, rent, salaries</p>
        </Card>
      </div>

      {/* Two Column Layout: Recent Invoices & Payment Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Recent Patient Invoices & Collections
            </h3>
            <Link to="/accounts/invoices" className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline">
              View All Invoices
            </Link>
          </div>

          <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            {invoices.slice(0, 5).map((inv) => (
              <div key={inv.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span>{inv.patientName}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">({inv.invoiceNumber})</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {inv.items.map((it) => it.description).join(', ')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {formatCurrency(inv.totalAmount)}
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    <Badge
                      variant={
                        inv.status === 'Paid' ? 'success' :
                        inv.status === 'Partially Paid' ? 'warning' : 'danger'
                      }
                      size="sm"
                    >
                      {inv.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right Column: Payment Settlement Methods */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Settlement Channels
          </h3>

          <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 space-y-3.5 shadow-sm">
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
                <div className="flex items-center gap-2.5">
                  <QrCode className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Dynamic UPI & QR</span>
                </div>
                <span className="font-bold font-mono text-blue-900 dark:text-blue-300">58% volume</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">POS Card Swipe</span>
                </div>
                <span className="font-bold font-mono text-indigo-900 dark:text-indigo-300">26% volume</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Direct OPD Cash</span>
                </div>
                <span className="font-bold font-mono text-emerald-900 dark:text-emerald-300">16% volume</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <div className="font-bold text-slate-700 dark:text-slate-300">Simulated Gateway Notice:</div>
              <p>
                All payment buttons trigger client-side demo mutations. No real financial credit cards or bank accounts are touched.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
