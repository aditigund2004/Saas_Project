import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ClinicFinanceNav } from './ClinicFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';

import {
  Receipt,
  PlusCircle,
  Search,
  Filter,
  Printer,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Building,
  User,
  Phone,
  Calendar,
  X

} from 'lucide-react';

export function ClinicInvoicesPage() {
  const {
    invoices = [],
    receipts = [],
    createInvoice,
    recordClinicPayment,
    patients = [],
    activeClinic,
    activeBranch,
    showToast,
    formatCurrency
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalInvoice, setPaymentModalInvoice] = useState(null);
  const [paymentMethodChoice, setPaymentMethodChoice] = useState('UPI QR');
  const [customPaymentAmount, setCustomPaymentAmount] = useState('');
  const [selectedReceiptForPrint, setSelectedReceiptForPrint] = useState(null);
  const [isReceiptsLedgerOpen, setIsReceiptsLedgerOpen] = useState(false);

  // Form state for creating a new invoice
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [itemDescription, setItemDescription] = useState('Consultation & Clinical Assessment');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemUnitPrice, setItemUnitPrice] = useState(800);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [invoiceStatusChoice, setInvoiceStatusChoice] = useState('Issued');
  const [initialPaymentMethod, setInitialPaymentMethod] = useState('UPI QR');
  const [markAsPaidNow, setMarkAsPaidNow] = useState(false);

  // Filter invoices for current clinic
  const clinicInvoices = invoices.filter((i) => !i.clinicId || i.clinicId === activeClinic?.id);

  const filteredInvoices = clinicInvoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.patientId && inv.patientId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBilled = clinicInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const totalCollected = clinicInvoices.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0);
  const totalOutstanding = Math.max(0, totalBilled - totalCollected);

  const handleOpenPaymentModal = (inv) => {
    setPaymentModalInvoice(inv);
    const due = Math.max(0, (Number(inv.totalAmount) || 0) - (Number(inv.amountPaid) || 0));
    setCustomPaymentAmount(due > 0 ? due.toString() : inv.totalAmount.toString());
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === selectedPatientId) || patients[0];
    const subtotal = itemQuantity * itemUnitPrice;
    const discounted = Math.max(0, subtotal - discountAmount);
    const tax = Math.round(discounted * (taxPercent / 100));
    const totalAmount = discounted + tax;
    const amountPaid = markAsPaidNow ? totalAmount : 0;
    const status = markAsPaidNow ? 'Paid' : invoiceStatusChoice;

    const newInv = createInvoice({
      clinicId: activeClinic?.id || 'clinic-1',
      branchId: activeBranch?.id || 'branch-1',
      patientId: patient?.patientIdNumber || 'PID-2026-001',
      patientName: patient?.name || 'Walk-in Patient',
      patientPhone: patient?.phone || '+91 98765 43210',
      date: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      items: [
        {
          id: `item-${Date.now()}`,
          description: itemDescription,
          quantity: Number(itemQuantity),
          unitPrice: Number(itemUnitPrice),
          total: subtotal
        }
      ],
      subtotal,
      discount: Number(discountAmount),
      tax,
      totalAmount,
      amountPaid,
      outstandingBalance: Math.max(0, totalAmount - amountPaid),
      status,
      paymentMethod: markAsPaidNow ? initialPaymentMethod : 'Unpaid'
    });

    if (markAsPaidNow) {
      recordClinicPayment(newInv.invoiceNumber, initialPaymentMethod, totalAmount);
    }

    setIsNewInvoiceOpen(false);
  };

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentModalInvoice) return;
    const due = Math.max(0, (Number(paymentModalInvoice.totalAmount) || 0) - (Number(paymentModalInvoice.amountPaid) || 0));
    const amountToPay = Number(customPaymentAmount) || due;

    if (amountToPay <= 0) {
      showToast('Payment amount must be greater than zero.', 'error');
      return;
    }
    if (amountToPay > due) {
      showToast(`Payment amount cannot exceed the balance due of ${formatCurrency(due)}.`, 'error');
      return;
    }

    const res = recordClinicPayment(paymentModalInvoice.invoiceNumber, paymentMethodChoice, amountToPay);
    setPaymentModalInvoice(null);
    if (res?.receipt) {
      setSelectedReceiptForPrint(res.receipt);
    }
  };

  return (
    <div className="space-y-6">
      {/* Scope Navigation */}
      <ClinicFinanceNav />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Patient Billing Master</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Patient Invoices & Bills</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Issue official tax invoices, manage patient dues, and print OPD receipt summaries.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsReceiptsLedgerOpen(true)}
            className="font-bold border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 hover:bg-emerald-100"
          >
            <Receipt className="w-4 h-4 mr-1.5" />
            Receipts Ledger ({receipts.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast('Exporting practice invoices CSV ledger...')}
          >
            <Download className="w-4 h-4 mr-1.5" />
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNewInvoiceOpen(true)}
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Create Patient Invoice
          </Button>
        </div>
      </div>

      {/* Mini Financial Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Patient Billings</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 tabular-nums">{formatCurrency(totalBilled)}</div>
          </div>
          <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Receipt className="w-5 h-5" />
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Collections Received</div>
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">{formatCurrency(totalCollected)}</div>
          </div>
          <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Outstanding Patient Dues</div>
            <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 tabular-nums">{formatCurrency(totalOutstanding)}</div>
          </div>
          <span className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Clock className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Invoices Master Table Card */}
      <Card padding="none" className="border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by invoice #, patient name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Draft', 'Issued', 'Partially Paid', 'Paid', 'Void'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-semibold">#</th>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Billing Date</th>
                <th className="p-3.5">Procedure / Items</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                    No patient invoices found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv, idx) => {
                  const balanceDue = (inv.totalAmount || 0) - (inv.amountPaid || 0);
                  const isFullyPaid = balanceDue <= 0 || inv.status === 'Paid';

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white text-xs">{inv.invoiceNumber}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{inv.patientName}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{inv.patientId}</div>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400 font-mono text-xs">{inv.date}</td>
                      <td className="p-3.5 max-w-[200px]">
                        <div className="truncate font-medium text-slate-800 dark:text-slate-200">
                          {inv.items?.[0]?.description || 'Clinical Care'}
                        </div>
                        {inv.items?.length > 1 && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                            +{inv.items.length - 1} other item(s)
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white tabular-nums">{formatCurrency(inv.totalAmount)}</td>
                      <td className="p-3.5 font-mono font-bold text-blue-700 dark:text-blue-400 tabular-nums">{formatCurrency(inv.amountPaid || 0)}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold border border-slate-200 dark:border-slate-700">
                          {inv.paymentMethod || 'Cash'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <Badge
                          variant={
                            inv.status === 'Paid'
                              ? 'success'
                              : inv.status === 'Partially Paid'
                              ? 'info'
                              : inv.status === 'Overdue'
                              ? 'error'
                              : 'warning'
                          }
                          size="sm"
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        {!isFullyPaid && (
                          <Button
                            variant="primary"
                            size="xs"
                            onClick={() => handleOpenPaymentModal(inv)}
                          >
                            <CreditCard className="w-3.5 h-3.5 mr-1" />
                            Collect ₹{balanceDue}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => setSelectedInvoice(inv)}
                        >
                          <Printer className="w-3.5 h-3.5 mr-1" />
                          Receipt
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create New Patient Invoice Modal */}
      <Modal
        isOpen={isNewInvoiceOpen}
        onClose={() => setIsNewInvoiceOpen(false)}
        title="Create Patient Tax Invoice"
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4 text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.patientIdNumber}) - {p.phone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Procedure / Item Description</label>
            <input
              type="text"
              required
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Root Canal Treatment, Ultrasonic Scaling, Orthopedic Consultation"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                required
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Unit Tariff (₹)</label>
              <input
                type="number"
                min="0"
                required
                value={itemUnitPrice}
                onChange={(e) => setItemUnitPrice(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Special Discount (₹)</label>
              <input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Healthcare GST (%)</label>
              <select
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value={0}>0% (Standard OPD Exempt)</option>
                <option value={5}>5% (Cosmetic / Lab Diagnostic)</option>
                <option value={12}>12% (Medical Device / Splint)</option>
                <option value={18}>18% (Aesthetic Procedure)</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between font-mono">
            <span className="text-slate-600 dark:text-slate-300 font-sans font-semibold">Net Total Payable:</span>
            <span className="text-lg font-black text-blue-700 dark:text-blue-400 tabular-nums">
              {formatCurrency(
                Math.max(0, itemQuantity * itemUnitPrice - discountAmount) * (1 + taxPercent / 100)
              )}
            </span>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={markAsPaidNow}
                onChange={(e) => setMarkAsPaidNow(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Collect payment immediately at billing counter</span>
            </label>

            {markAsPaidNow && (
              <div className="pl-6 pt-1">
                <label className="block text-slate-600 dark:text-slate-400 mb-1 text-xs font-semibold">Payment Method</label>
                <select
                  value={initialPaymentMethod}
                  onChange={(e) => setInitialPaymentMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                >
                  <option value="UPI QR">UPI Dynamic QR (PhonePe / GPay / Paytm)</option>
                  <option value="Debit / Credit Card">Point of Sale (POS) Card</option>
                  <option value="Cash">Cash at Counter</option>
                  <option value="Insurance TPA">Cashless Insurance / TPA Pre-auth</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" type="button" onClick={() => setIsNewInvoiceOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Generate & Issue Invoice
            </Button>
          </div>
        </form>
      </Modal>

      {/* Collect Balance Payment Modal */}
      <Modal
        isOpen={!!paymentModalInvoice}
        onClose={() => setPaymentModalInvoice(null)}
        title={`Record Payment for ${paymentModalInvoice?.invoiceNumber}`}
      >
        {paymentModalInvoice && (
          <form onSubmit={handleRecordPaymentSubmit} className="space-y-4 text-sm">
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Patient:</span>
                <span className="font-bold text-slate-900 dark:text-white">{paymentModalInvoice.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Billed:</span>
                <span className="font-mono text-slate-900 dark:text-white tabular-nums">{formatCurrency(paymentModalInvoice.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Already Paid:</span>
                <span className="font-mono text-slate-900 dark:text-white tabular-nums">{formatCurrency(paymentModalInvoice.amountPaid || 0)}</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-900 dark:text-blue-300">Balance Due Now:</span>
                <span className="font-black font-mono text-lg text-blue-700 dark:text-blue-400 tabular-nums">
                  {formatCurrency(paymentModalInvoice.totalAmount - (paymentModalInvoice.amountPaid || 0))}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Payment Amount (₹) *
              </label>
              <input
                required
                type="number"
                min="1"
                max={paymentModalInvoice.totalAmount - (paymentModalInvoice.amountPaid || 0)}
                value={customPaymentAmount}
                onChange={(e) => setCustomPaymentAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Supports partial payments or full settlement.
              </span>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Payment Method</label>
              <select
                value={paymentMethodChoice}
                onChange={(e) => setPaymentMethodChoice(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="UPI QR">UPI Dynamic QR</option>

                <option value="Debit / Credit Card">POS Terminal Card</option>
                <option value="Cash">Cash Currency</option>
                <option value="Net Banking">IMPS / NEFT Transfer</option>
              </select>
            </div>


            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setPaymentModalInvoice(null)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <CheckCircle className="w-4 h-4 mr-1.5" />
                Confirm Payment Receipt
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Printable Clinical Receipt Modal */}
      <Modal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        title="Official Patient Billing Receipt"
        size="lg"
      >
        {selectedInvoice && (
          <div className="space-y-6 text-sm p-2">
            {/* Printable Receipt Paper Container (Always crisp white paper for physical printing) */}
            <div className="p-6 bg-white border border-slate-300 rounded-xl shadow-xs space-y-5 text-slate-900">
              {/* Receipt Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-slate-900">{activeClinic?.name || 'Aegis Health Clinic'}</h2>
                      <p className="text-xs text-slate-500">
                        NABH Accredited Multi-Specialty Clinic · Reg No: MH-PUN-2024-89
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {activeBranch?.address || '102 Medical Enclave, FC Road, Pune - 411005'} · Phone: +91 20 2567 8900
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-mono text-xs font-bold uppercase">
                    Tax Receipt
                  </span>
                  <div className="mt-2 font-mono font-bold text-slate-900 text-sm">{selectedInvoice.invoiceNumber}</div>
                  <div className="text-xs text-slate-500 font-mono">Date: {selectedInvoice.date}</div>
                </div>
              </div>

              {/* Patient Details Row */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400">Patient Details</span>
                  <div className="font-bold text-slate-900 mt-0.5 text-sm">{selectedInvoice.patientName}</div>
                  <div className="text-slate-500 font-mono text-xs">ID: {selectedInvoice.patientId}</div>
                  <div className="text-slate-500 text-xs">{selectedInvoice.patientPhone}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-slate-400">Payment Status</span>
                  <div className="mt-1">
                    <Badge variant={selectedInvoice.status === 'Paid' ? 'success' : 'warning'} size="sm">
                      {selectedInvoice.status}
                    </Badge>
                  </div>
                  <div className="text-slate-500 text-xs mt-1 font-mono">Method: {selectedInvoice.paymentMethod || 'Cash'}</div>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 uppercase text-xs">
                  <tr>
                    <th className="p-2.5 text-center w-10">#</th>
                    <th className="p-2.5">Item & Procedure Description</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Rate</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(selectedInvoice.items || [
                    { description: 'Clinical Consultation', quantity: 1, unitPrice: selectedInvoice.totalAmount, total: selectedInvoice.totalAmount }
                  ]).map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 text-center font-mono font-medium text-slate-400 text-xs">{idx + 1}</td>
                      <td className="p-2.5 font-medium text-slate-800">{item.description}</td>
                      <td className="p-2.5 text-center text-slate-600">{item.quantity}</td>
                      <td className="p-2.5 text-right font-mono text-slate-600 tabular-nums">{formatCurrency(item.unitPrice)}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-slate-900 tabular-nums">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Summary */}
              <div className="border-t border-slate-200 pt-3 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono tabular-nums">{formatCurrency(selectedInvoice.subtotal || selectedInvoice.totalAmount)}</span>
                  </div>
                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-mono tabular-nums">-{formatCurrency(selectedInvoice.discount)}</span>
                    </div>
                  )}
                  {selectedInvoice.tax > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>GST:</span>
                      <span className="font-mono tabular-nums">+{formatCurrency(selectedInvoice.tax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                    <span>Total Amount:</span>
                    <span className="font-mono tabular-nums">{formatCurrency(selectedInvoice.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-blue-700 font-bold">
                    <span>Amount Paid:</span>
                    <span className="font-mono tabular-nums">{formatCurrency(selectedInvoice.amountPaid || 0)}</span>
                  </div>
                  {(selectedInvoice.totalAmount - (selectedInvoice.amountPaid || 0) > 0) && (
                    <div className="flex justify-between text-amber-700 font-bold">
                      <span>Balance Outstanding:</span>
                      <span className="font-mono tabular-nums">{formatCurrency(selectedInvoice.totalAmount - (selectedInvoice.amountPaid || 0))}</span>
                    </div>
                  )}
                </div>
              </div>


              {/* Footer Note */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Computer-generated clinical invoice. No signature required.</span>
                <span>ClinicOS Healthcare System</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  showToast(`Sending ${selectedInvoice.invoiceNumber} to local clinic thermal/A4 printer...`);
                }}
              >
                <Printer className="w-4 h-4 mr-1.5" />
                Print Official Invoice
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Receipts Ledger Modal */}
      {isReceiptsLedgerOpen && (
        <Modal
          isOpen={isReceiptsLedgerOpen}
          onClose={() => setIsReceiptsLedgerOpen(false)}
          title={`Clinic Payment Receipts Ledger (${receipts.length})`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-500 dark:text-slate-400">
              Authenticated payment settlement receipts issued across all counter and online collections.
            </p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-h-96">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <th className="p-3">Receipt #</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {receipts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slate-400">
                        No receipts generated yet.
                      </td>
                    </tr>
                  ) : (
                    receipts.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{r.receiptNumber}</td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">{r.patientName}</td>
                        <td className="p-3 font-mono text-slate-500">{r.invoiceNumber}</td>
                        <td className="p-3 font-mono">{r.date}</td>
                        <td className="p-3">{r.paymentMethod}</td>
                        <td className="p-3 font-bold font-mono text-emerald-600">{formatCurrency(r.amount)}</td>
                        <td className="p-3 text-right">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => {
                              setSelectedReceiptForPrint(r);
                            }}
                          >
                            <Printer className="w-3 h-3 mr-1" />
                            Print
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsReceiptsLedgerOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Generated Receipt Printable Modal */}
      {selectedReceiptForPrint && (
        <Modal
          isOpen={!!selectedReceiptForPrint}
          onClose={() => setSelectedReceiptForPrint(null)}
          title="Official Clinic Payment Receipt"
          size="md"
        >
          <div className="space-y-4 text-xs text-slate-800 dark:text-slate-200">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex justify-between items-start pb-3 border-b-2 border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {selectedReceiptForPrint.clinicName || activeClinic?.name || 'CityCare Family Practice'}
                  </h3>
                  <p className="text-[11px] text-slate-500">Official Outpatient Settlement Receipt</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedReceiptForPrint.receiptNumber}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    Date: {selectedReceiptForPrint.date}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-1">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedReceiptForPrint.patientName}</span>
                  <span className="block text-slate-500 text-[10px] font-mono">ID: {selectedReceiptForPrint.patientId}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Mode</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedReceiptForPrint.paymentMethod}</span>
                  <span className="block text-slate-500 text-[10px] font-mono">Ref: {selectedReceiptForPrint.paymentReference}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Amount Received:</span>
                <span className="text-lg font-black font-mono text-emerald-600">
                  {formatCurrency(selectedReceiptForPrint.amount)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>Issued by: {selectedReceiptForPrint.issuedBy || 'Cashier Counter'}</span>
                <span>Audit Verified</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedReceiptForPrint(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => window.print()}>
                <Printer className="w-3.5 h-3.5 mr-1" />
                Print / Save PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
