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
    clinicPayments,
    invoices,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Patient Collections Ledger</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Collections & Cashier Log</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready log of all patient payments collected via UPI, POS Cards, Cash, and TPA Insurance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => showToast('Exporting collections ledger to Excel / CSV...')}
          >
            Export Ledger
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsRecordModalOpen(true)}
          >
            Record Counter Payment
          </Button>
        </div>
      </div>

      {/* Payment Channel Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Collections</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
            {formatCurrency(totalCollected)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            {clinicPayments.length} total transactions recorded
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>UPI Dynamic QR</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <QrCode className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-purple-700">
            {formatCurrency(upiTotal)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            {totalCollected > 0 ? ((upiTotal / totalCollected) * 100).toFixed(0) : 0}% of all practice volume
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>POS / Credit Card</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-blue-700">
            {formatCurrency(cardTotal)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            Swiped on clinic POS terminals
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Cash at Counter</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-emerald-700">
            {formatCurrency(cashTotal)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            Subject to daily cash deposit
          </div>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card padding="none">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by payment ref, patient or invoice #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {['All', 'UPI', 'Card', 'Cash', 'Insurance'].map((method) => (
              <button
                key={method}
                onClick={() => setMethodFilter(method)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  methodFilter === method
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
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
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{p.paymentReference}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{p.patientName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{p.patientId}</div>
                    </td>
                    <td className="p-3.5 font-mono text-blue-600 font-semibold">{p.invoiceNumber}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">{p.date}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 text-sm">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="p-3.5">
                      <Badge variant="success">Completed</Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="outline"
                        size="xs"
                        icon={Printer}
                        onClick={() => showToast(`Printing collection voucher ${p.paymentReference}...`)}
                      >
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
        <form onSubmit={handleRecordSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Select Patient Invoice</label>
            <select
              value={selectedInvoiceNumber}
              onChange={(e) => setSelectedInvoiceNumber(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
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
            <label className="block text-slate-700 font-semibold mb-1">Payment Method</label>
            <select
              value={payMethod}
              onChange={(e) => setPayMethod(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="UPI QR">UPI Dynamic QR (Instant settlement)</option>
              <option value="Card (POS)">Card Swipe / Tap (PineLabs POS)</option>
              <option value="Cash">Cash Currency</option>
              <option value="Net Banking">IMPS / NEFT Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Amount (Leave empty for full outstanding balance)
            </label>
            <input
              type="number"
              min="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsRecordModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={CheckCircle2}>
              Confirm Collection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

