import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ClinicFinanceNav } from './ClinicFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  CreditCard,
  Search,
  Download,
  Printer,
  CheckCircle2,
  PlusCircle,
  QrCode,
  DollarSign,
  Building,
  Calendar
} from 'lucide-react';

export function ClinicPaymentsPage() {
  const {
    clinicPayments = [],
    invoices = [],
    recordClinicPayment,
    showToast,
    formatCurrency,
    activeClinic
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Form state
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState(
    invoices.find((i) => (i.totalAmount - (i.amountPaid || 0)) > 0)?.invoiceNumber || invoices[0]?.invoiceNumber || ''
  );
  const [payMethod, setPayMethod] = useState('UPI QR');
  const [customAmount, setCustomAmount] = useState('');

  const filteredPayments = clinicPayments.filter((p) => {
    const matchesSearch =
      p.paymentReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMethod =
      methodFilter === 'All' || p.paymentMethod.toLowerCase().includes(methodFilter.toLowerCase());

    return matchesSearch && matchesMethod;
  });

  const totalCollected = clinicPayments.reduce((sum, p) => sum + p.amount, 0);

  const upiTotal = clinicPayments
    .filter((p) => p.paymentMethod.includes('UPI'))
    .reduce((sum, p) => sum + p.amount, 0);

  const cardTotal = clinicPayments
    .filter((p) => p.paymentMethod.toLowerCase().includes('card') || p.paymentMethod.toLowerCase().includes('pos'))
    .reduce((sum, p) => sum + p.amount, 0);

  const cashTotal = clinicPayments
    .filter((p) => p.paymentMethod.toLowerCase().includes('cash'))
    .reduce((sum, p) => sum + p.amount, 0);

  const handleRecordSubmit = (e) => {
    e.preventDefault();
    const inv = invoices.find((i) => i.invoiceNumber === selectedInvoiceNumber);
    if (!inv) return;

    const amt = customAmount ? Number(customAmount) : inv.totalAmount - (inv.amountPaid || 0);
    recordClinicPayment(selectedInvoiceNumber, payMethod, amt);
    setIsRecordModalOpen(false);
    setCustomAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Scope Navigation */}
      <ClinicFinanceNav />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Patient Collections Ledger</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Collections & Cashier Log</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Audit-ready log of all patient payments collected via UPI, POS Cards, Cash, and TPA Insurance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast('Exporting collections ledger to Excel / CSV...')}
          >
            <Download className="w-4 h-4 mr-1.5" />
            Export Ledger
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsRecordModalOpen(true)}
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Record Counter Payment
          </Button>
        </div>
      </div>

      {/* Payment Channel Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Total Collections</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(totalCollected)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            {clinicPayments.length} total transactions recorded
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>UPI Dynamic QR</span>
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <QrCode className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-purple-700 dark:text-purple-400 tabular-nums">
            {formatCurrency(upiTotal)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            {totalCollected > 0 ? ((upiTotal / totalCollected) * 100).toFixed(0) : 0}% of all practice volume
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>POS / Credit Card</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-blue-700 dark:text-blue-400 tabular-nums">
            {formatCurrency(cardTotal)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Swiped on clinic POS terminals
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Cash at Counter</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {formatCurrency(cashTotal)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Subject to daily cash deposit
          </div>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card padding="none" className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by payment ref, patient or invoice #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {['All', 'UPI', 'Card', 'Cash', 'Insurance'].map((method) => (
              <button
                key={method}
                onClick={() => setMethodFilter(method)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  methodFilter === method
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-semibold">#</th>
                <th className="p-3.5">Payment Ref</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Transaction Date</th>
                <th className="p-3.5">Amount Collected</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white text-xs">{p.paymentReference}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{p.patientName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{p.patientId}</div>
                    </td>
                    <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold text-xs">{p.invoiceNumber}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold border border-blue-200 dark:border-blue-800">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400 font-mono text-xs">{p.date}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="p-3.5">
                      <Badge variant="success" size="sm">Completed</Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => showToast(`Printing collection voucher ${p.paymentReference}...`)}
                      >
                        <Printer className="w-3.5 h-3.5 mr-1" />
                        Print Slip
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Record Counter Payment Modal */}
      <Modal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        title="Record Counter Patient Collection"
      >
        <form onSubmit={handleRecordSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Select Patient Invoice</label>
            <select
              value={selectedInvoiceNumber}
              onChange={(e) => setSelectedInvoiceNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              {invoices.map((inv) => {
                const due = (inv.totalAmount || 0) - (inv.amountPaid || 0);
                return (
                  <option key={inv.id} value={inv.invoiceNumber}>
                    {inv.invoiceNumber} - {inv.patientName} ({inv.status} - Due: ₹{due})
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Payment Method</label>
            <select
              value={payMethod}
              onChange={(e) => setPayMethod(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              <option value="UPI QR">UPI Dynamic QR (Instant settlement)</option>
              <option value="Card (POS)">Card Swipe / Tap (PineLabs POS)</option>
              <option value="Cash">Cash Currency</option>
              <option value="Net Banking">IMPS / NEFT Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Amount (Leave empty for full outstanding balance)
            </label>
            <input
              type="number"
              min="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsRecordModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Confirm Collection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
