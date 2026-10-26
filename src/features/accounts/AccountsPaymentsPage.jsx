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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Settlement Ledger
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payment Transactions Log</h1>
          <p className="text-xs text-slate-500">
            Realized settlements recorded across dynamic UPI, card swipes, cash counters, and cashless TPA
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search payments by patient name or invoice number..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Receipt / Ref</th>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Amount Received</th>
                <th className="px-4 py-3">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-700">
                    RCP-{p.id.slice(-5)}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-blue-700">
                    {p.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {p.patientName}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600">
                    {p.date}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                      {p.paymentMethod || 'UPI QR Scan'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-700 text-sm">
                    {formatCurrency(p.amountPaid)}
                  </td>
                  <td className="px-4 py-3">
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

