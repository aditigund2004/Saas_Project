import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SaaSFinanceNav } from './SaaSFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  CreditCard,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export function SaaSPaymentsPage() {
  const { saasPayments, formatCurrency, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPayments = saasPayments.filter((p) => {
    const matchesSearch =
      p.paymentReference.toLowerCase().includes(search.toLowerCase()) ||
      p.clinicName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Payment Reference,Clinic Name,Invoice Number,Amount,Payment Method,Date,Status']
        .concat(
          filteredPayments.map(
            (p) =>
              `"${p.paymentReference}","${p.clinicName}","${p.invoiceNumber}",${p.amount},"${p.paymentMethod}","${p.date}","${p.status}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_saas_payments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('SaaS payments ledger CSV exported.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Gateway Transactions</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Payment Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time gateway settlements, Razorpay/Stripe webhooks, UPI autopay debits, and corporate cards.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
          Export Payments (.CSV)
        </Button>
      </div>

      <SaaSFinanceNav />

      {/* Filter and Search */}
      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by transaction reference (e.g. rzp_pay_99812A), clinic, or invoice..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Transaction Statuses</option>
              <option value="Success">Success (Settled)</option>
              <option value="Failed">Failed Debits</option>
              <option value="Processing">In Gateway Processing</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader
          title={`Settled Gateway Transactions (${filteredPayments.length})`}
          subtitle="Showing bank batch reference numbers and payment provider clearance"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Payment Reference</th>
                <th className="p-3.5">Subscribing Clinic</th>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Settlement Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">{p.paymentReference}</td>
                  <td className="p-3.5 font-sans font-semibold text-slate-800">{p.clinicName}</td>
                  <td className="p-3.5 text-slate-600 font-sans">{p.invoiceNumber}</td>
                  <td className="p-3.5 font-bold text-slate-900">{formatCurrency(p.amount)}</td>
                  <td className="p-3.5 text-slate-700 font-sans">{p.paymentMethod}</td>
                  <td className="p-3.5 text-slate-500">{p.date}</td>
                  <td className="p-3.5 font-sans">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-sans">
                    {p.status === 'Failed' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-700 hover:bg-blue-50"
                        onClick={() => showToast(`Payment retry queued for ${p.paymentReference}`)}
                      >
                        Retry Debit
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => showToast(`Gateway receipt verified: ${p.paymentReference}`)}
                      >
                        Receipt
                      </Button>
                    )}
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

