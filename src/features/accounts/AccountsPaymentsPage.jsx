import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CreditCard, Search, Calendar, QrCode, DollarSign } from 'lucide-react';

export function AccountsPaymentsPage() {
  const { invoices, formatCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const paidInvoices = invoices.filter((i) => i.amountPaid > 0);

  const filteredPayments = paidInvoices.filter((p) =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Settlement Ledger
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Payment Transactions Log</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Realized settlements recorded across dynamic UPI, card swipes, cash counters, and cashless TPA
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search payments by patient name or invoice number..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-bold">#</th>
                <th className="px-4 py-3">Receipt / Ref</th>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Amount Received</th>
                <th className="px-4 py-3">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPayments.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-700 dark:text-slate-300">
                    RCP-{p.id.slice(-5)}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-700 dark:text-blue-400">
                    {p.invoiceNumber}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white text-sm">
                    {p.patientName}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                    {p.date}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs">
                      {p.paymentMethod || 'UPI QR Scan'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                    {formatCurrency(p.amountPaid)}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="success" size="sm">Settled</Badge>
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
