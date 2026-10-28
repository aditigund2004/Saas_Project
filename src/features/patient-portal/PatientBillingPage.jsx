import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
<<<<<<< HEAD
import { DemoPatientSwitcher } from '../../components/patient/DemoPatientSwitcher';
import { Receipt, Download, CreditCard, CheckCircle2, QrCode, X, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PatientBillingPage() {
  const {
    invoices = [],
    currentUser,
    activePatientId,
    patients = [],
    showToast,
    recordInvoicePayment,
    formatCurrency
  } = useApp();

  const [payModalInvoice, setPayModalInvoice] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('UPI / QR Scan');

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  const myInvoices = invoices.filter(
    (i) =>
      i.patientId === activePatient?.id ||
      i.patientId === activePatient?.patientIdNumber ||
      i.patientName === activePatient?.name
  );

  const displayInvoices = myInvoices;

  const totalBilled = displayInvoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0);
  const totalPaid = displayInvoices.reduce((sum, inv) => sum + (Number(inv.amountPaid) || 0), 0);
  const totalOutstanding = Math.max(0, totalBilled - totalPaid);

  const handleOpenPay = (inv) => {
    setPayModalInvoice(inv);
    const due = Math.max(0, (Number(inv.totalAmount) || 0) - (Number(inv.amountPaid) || 0));
    setPayAmount(due.toString());
  };
=======
import { Receipt, Download, CreditCard, CheckCircle2, QrCode, X } from 'lucide-react';

export function PatientBillingPage() {
  const { invoices, currentUser, showToast, recordInvoicePayment, formatCurrency } = useApp();
  const [payModalInvoice, setPayModalInvoice] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('UPI / QR Scan');

  const myInvoices = invoices.filter(
    (i) => i.patientName === currentUser?.name || i.patientId === 'pt-1041' || i.patientId === 'pt-1042'
  );
  const displayInvoices = myInvoices.length > 0 ? myInvoices : invoices.slice(0, 3);
>>>>>>> origin/main

  const handleConfirmPay = (e) => {
    e.preventDefault();
    if (!payModalInvoice) return;
<<<<<<< HEAD
    const due = Math.max(0, (Number(payModalInvoice.totalAmount) || 0) - (Number(payModalInvoice.amountPaid) || 0));
    const amountToPay = Number(payAmount) || due;

    if (amountToPay <= 0) {
      showToast('Payment amount must be greater than zero.', 'error');
      return;
    }
    if (amountToPay > due) {
      showToast(`Amount cannot exceed the remaining due of ${formatCurrency(due)}.`, 'error');
      return;
    }

    recordInvoicePayment(payModalInvoice.invoiceNumber || payModalInvoice.id, amountToPay, selectedMethod);
=======
    const balance = payModalInvoice.totalAmount - (payModalInvoice.amountPaid || 0);
    recordInvoicePayment(payModalInvoice.id, balance > 0 ? balance : payModalInvoice.totalAmount, selectedMethod);
>>>>>>> origin/main
    setPayModalInvoice(null);
  };

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      {/* 1. Demo Patient Switcher */}
      <DemoPatientSwitcher />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 uppercase tracking-wider">
            Patient Financial Statement
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            My Clinical Invoices & Bills
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review detailed OPD procedure billing, outstanding balances, and access official settlement receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/receipts">
            <Button variant="primary" size="sm" className="font-bold">
              <Receipt className="w-4 h-4 mr-1.5" />
              View Receipts Ledger
            </Button>
          </Link>
        </div>
      </div>

      {/* Financial Health Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Billed Charges</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {formatCurrency(totalBilled)}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Across {displayInvoices.length} clinical invoices</p>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Amount Paid</div>
          <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-1">
            {formatCurrency(totalPaid)}
          </div>
          <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">Settled via digital/cash payments</p>
        </Card>

        <Card className={`p-4 ${totalOutstanding > 0 ? 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30' : 'border-slate-200 dark:border-slate-800'}`}>
          <div className={`text-xs font-bold uppercase tracking-wider ${totalOutstanding > 0 ? 'text-amber-800 dark:text-amber-300' : 'text-slate-400'}`}>
            Outstanding Due
          </div>
          <div className={`text-2xl font-black mt-1 ${totalOutstanding > 0 ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-white'}`}>
            {formatCurrency(totalOutstanding)}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {totalOutstanding > 0 ? 'Payable at clinic reception or online' : 'All accounts fully settled'}
          </p>
        </Card>
      </div>

      {/* Invoices List */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
            Payments & Receipts
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">My Clinical Invoices & Receipts</h1>
          <p className="text-xs text-slate-500">
            Download tax invoices and receipts for insurance reimbursements or simulate instant online settlement
          </p>
        </div>
      </div>

      <Card>
>>>>>>> origin/main
        <CardHeader
          title={`All Patient Invoices (${displayInvoices.length})`}
          subtitle="Showing all documented consultation & procedure charges"
        />
        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12">#</th>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items / Procedures</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Outstanding Due</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No invoices recorded for this patient.
                  </td>
                </tr>
              ) : (
                displayInvoices.map((inv, idx) => {
                  const paid = Number(inv.amountPaid) || 0;
                  const balance = Math.max(0, (Number(inv.totalAmount) || 0) - paid);

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="p-4 font-mono font-bold text-blue-700 dark:text-blue-400">{inv.invoiceNumber}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{inv.date}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                        {inv.items?.map((it) => it.description).join(', ') || 'Consultation'}
                      </td>
                      <td className="p-4 font-bold font-mono text-slate-900 dark:text-slate-100">
                        {formatCurrency(inv.totalAmount)}
                      </td>
                      <td className="p-4 font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(paid)}
                      </td>
                      <td className="p-4 font-bold font-mono text-amber-600 dark:text-amber-400">
                        {balance > 0 ? formatCurrency(balance) : '₹0'}
                      </td>
                      <td className="p-4">
                        <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Partially Paid' ? 'warning' : 'default'}>
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {balance > 0 ? (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleOpenPay(inv)}
                              className="text-xs font-bold shadow-sm"
                            >
                              <CreditCard className="w-3.5 h-3.5 mr-1" />
                              Pay Dues
                            </Button>
                          ) : (
                            <Link to="/patient/receipts">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs font-semibold"
                              >
                                <Receipt className="w-3.5 h-3.5 mr-1" />
                                View Receipt
                              </Button>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Items / Procedures</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="p-3.5 text-slate-600 font-mono">{inv.date}</td>
                  <td className="p-3.5 text-slate-700 font-medium">
                    {inv.items?.map((it) => it.description).join(', ') || 'Consultation'}
                  </td>
                  <td className="p-3.5 font-bold font-mono text-slate-900">
                    {formatCurrency(inv.totalAmount)}
                  </td>
                  <td className="p-3.5 font-bold font-mono text-blue-700">
                    {formatCurrency(inv.amountPaid || 0)}
                  </td>
                  <td className="p-3.5 text-slate-600">{inv.paymentMethod || 'Online UPI'}</td>
                  <td className="p-3.5">
                    <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Partially Paid' ? 'warning' : 'default'}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.status !== 'Paid' && inv.status !== 'Refunded' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setPayModalInvoice(inv)}
                          className="text-xs bg-blue-600 hover:bg-blue-700"
                        >
                          <CreditCard className="w-3 h-3 mr-1" />
                          Pay Now (Simulate)
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => showToast(`Downloaded tax receipt ${inv.invoiceNumber}.pdf`)}
                          className="text-xs"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Receipt PDF
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
>>>>>>> origin/main
            </tbody>
          </table>
        </div>
      </Card>

<<<<<<< HEAD
      {/* Simulated Pay Modal with Partial / Full Payment Support */}
      {payModalInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setPayModalInvoice(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Simulate Patient Payment
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{payModalInvoice.invoiceNumber}</p>
              </div>
              <button onClick={() => setPayModalInvoice(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
=======
      {/* Simulated Pay Modal */}
      {payModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Simulate Patient Payment
                </h3>
                <p className="text-[11px] text-slate-500">{payModalInvoice.invoiceNumber}</p>
              </div>
              <button onClick={() => setPayModalInvoice(null)} className="text-slate-400 hover:text-slate-600">
>>>>>>> origin/main
                <X className="w-4 h-4" />
              </button>
            </div>

<<<<<<< HEAD
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-200">
              <strong>Interactive Demo Simulation:</strong> Recording this payment will update the invoice's outstanding balance and immediately generate a verified receipt in your portal.
            </div>

            <form onSubmit={handleConfirmPay} className="space-y-3.5 text-sm">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between font-bold">
                <span className="text-slate-700 dark:text-slate-300">Remaining Due:</span>
                <span className="font-mono text-blue-700 dark:text-blue-400 text-base">
=======
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <strong>Simulated Demo Gateway:</strong> No money will be charged. This updates client-side demo state.
            </div>

            <form onSubmit={handleConfirmPay} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold">
                <span>Total Due:</span>
                <span className="font-mono text-blue-900">
>>>>>>> origin/main
                  {formatCurrency(payModalInvoice.totalAmount - (payModalInvoice.amountPaid || 0))}
                </span>
              </div>

              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block text-xs uppercase tracking-wider">
                  Payment Amount (₹) *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  max={payModalInvoice.totalAmount - (payModalInvoice.amountPaid || 0)}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 text-sm font-mono font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  You can pay the full amount or enter a partial payment amount.
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block text-xs uppercase tracking-wider">Choose Payment Method</label>
                <div className="space-y-2">
                  {['UPI / GooglePay / PhonePe', 'Debit / Credit Card', 'Net Banking', 'Cash at Front Desk'].map((m) => (
                    <label
                      key={m}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedMethod === m
                          ? 'border-blue-500 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xs">{m}</span>
=======
                <label className="font-semibold text-slate-700 mb-1 block">Choose Payment Method</label>
                <div className="space-y-1.5">
                  {['UPI / GooglePay / PhonePe', 'Debit / Credit Card', 'Net Banking'].map((m) => (
                    <label
                      key={m}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${
                        selectedMethod === m ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-bold' : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{m}</span>
>>>>>>> origin/main
                      <input
                        type="radio"
                        name="payMethod"
                        checked={selectedMethod === m}
                        onChange={() => setSelectedMethod(m)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

<<<<<<< HEAD
              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline" size="sm" type="button" onClick={() => setPayModalInvoice(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm">
                  Confirm Payment & Generate Receipt
=======
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="secondary" size="sm" type="button" onClick={() => setPayModalInvoice(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                  Simulate Payment
>>>>>>> origin/main
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
