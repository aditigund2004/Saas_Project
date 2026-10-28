import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RotateCcw, Search, CheckCircle2, AlertTriangle } from 'lucide-react';

export function AccountsRefundsPage() {
  const { invoices, requestRefund, formatCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const refunded = invoices.filter((i) => i.status === 'Refunded');
  const paidInvoices = invoices.filter((i) => i.status === 'Paid');

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Payment Reversals
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Refund Audit & Processing</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Payment Reversals
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Refund Audit & Processing</h1>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Audit trail of patient payment cancellations, treatment plan revisions, and simulated reversals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 space-y-1.5 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total Refunded Invoices</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{refunded.length}</div>
          <p className="text-xs text-slate-400 dark:text-slate-500">Processed through accounting desk</p>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 space-y-1.5 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Reversed Financial Amount</span>
          <div className="text-2xl font-black text-rose-700 dark:text-rose-400">
            {formatCurrency(refunded.reduce((acc, curr) => acc + curr.totalAmount, 0))}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">Simulated reversal transactions</p>
=======
        <Card className="p-4 border-slate-200 bg-slate-50 space-y-1">
          <span className="text-xs text-slate-500 uppercase font-semibold">Total Refunded Invoices</span>
          <div className="text-2xl font-black text-slate-900">{refunded.length}</div>
          <p className="text-[11px] text-slate-400">Processed through accounting desk</p>
        </Card>

        <Card className="p-4 border-slate-200 bg-slate-50 space-y-1">
          <span className="text-xs text-slate-500 uppercase font-semibold">Reversed Financial Amount</span>
          <div className="text-2xl font-black text-rose-700">
            {formatCurrency(refunded.reduce((acc, curr) => acc + curr.totalAmount, 0))}
          </div>
          <p className="text-[11px] text-slate-400">Simulated reversal transactions</p>
>>>>>>> origin/main
        </Card>
      </div>

      {/* Eligible Paid Invoices that can be refunded */}
<<<<<<< HEAD
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Paid Invoices Available for Demonstration Refund</h3>
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-3 py-3 text-center w-12 font-bold">#</th>
                  <th className="px-4 py-3">Invoice #</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Services</th>
                  <th className="px-4 py-3">Paid Amount</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paidInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                      No paid invoices available.
                    </td>
                  </tr>
                ) : (
                  paidInvoices.map((inv, idx) => (
                    <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-700 dark:text-blue-400">{inv.invoiceNumber}</td>
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white text-sm">{inv.patientName}</td>
                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 max-w-xs">{inv.items.map((i) => i.description).join(', ')}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">{formatCurrency(inv.amountPaid)}</td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => requestRefund(inv.id, 'Treatment cancelled by patient')}
                          className="h-8 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-800"
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-1" />
                          Simulate Refund
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
=======
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Paid Invoices Available for Demonstration Refund</h3>
        <Card className="overflow-hidden border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Services</th>
                <th className="px-4 py-3">Paid Amount</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paidInvoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                    No paid invoices available.
                  </td>
                </tr>
              ) : (
                paidInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3 font-semibold">{inv.patientName}</td>
                    <td className="px-4 py-3 text-slate-600">{inv.items.map((i) => i.description).join(', ')}</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700">{formatCurrency(inv.amountPaid)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => requestRefund(inv.id, 'Treatment cancelled by patient')}
                        className="h-7 text-xs text-rose-700 hover:bg-rose-50 border-rose-200"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Simulate Refund
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
>>>>>>> origin/main
        </Card>
      </div>

      {/* Refunded History Table */}
      {refunded.length > 0 && (
<<<<<<< HEAD
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Completed Refund Audit Log</h3>
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-3 py-3 text-center w-12 font-bold">#</th>
                    <th className="px-4 py-3">Invoice #</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Refund Amount</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {refunded.map((inv, idx) => (
                    <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-700 dark:text-slate-300">{inv.invoiceNumber}</td>
                      <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-200 text-sm">{inv.patientName}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-rose-700 dark:text-rose-400 text-sm">{formatCurrency(inv.totalAmount)}</td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <Badge variant="danger" size="sm">Refund Settled</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
=======
        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-slate-900">Completed Refund Audit Log</h3>
          <Card className="overflow-hidden border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Invoice #</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Refund Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {refunded.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold text-slate-700">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3">{inv.patientName}</td>
                    <td className="px-4 py-3 font-mono font-bold text-rose-700">{formatCurrency(inv.totalAmount)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="danger" size="sm">Refund Settled</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
>>>>>>> origin/main
          </Card>
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
