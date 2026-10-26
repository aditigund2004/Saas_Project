import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
<<<<<<< HEAD
import { Receipt, Download, CreditCard, CheckCircle2, QrCode, X } from 'lucide-react';
=======
import { Download, CreditCard, X } from 'lucide-react';
import { belongsToCurrentPatient } from './patientDataAccess';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

export function PatientBillingPage() {
  const { invoices, currentUser, showToast, recordInvoicePayment, formatCurrency } = useApp();
  const [payModalInvoice, setPayModalInvoice] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('UPI / QR Scan');

<<<<<<< HEAD
  const myInvoices = invoices.filter(
    (i) => i.patientName === currentUser?.name || i.patientId === 'pt-1041' || i.patientId === 'pt-1042'
  );
  const displayInvoices = myInvoices.length > 0 ? myInvoices : invoices.slice(0, 3);
=======
  const myInvoices = invoices.filter((invoice) =>
    belongsToCurrentPatient(invoice, currentUser)
  );
  const displayInvoices = myInvoices;
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

  const handleConfirmPay = (e) => {
    e.preventDefault();
    if (!payModalInvoice) return;
    const balance = payModalInvoice.totalAmount - (payModalInvoice.amountPaid || 0);
    recordInvoicePayment(payModalInvoice.id, balance > 0 ? balance : payModalInvoice.totalAmount, selectedMethod);
    setPayModalInvoice(null);
  };

  return (
    <div className="space-y-6">
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
        <CardHeader
          title={`All Patient Invoices (${displayInvoices.length})`}
          subtitle="Showing all documented consultation & procedure charges"
        />
        <div className="overflow-x-auto">
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
<<<<<<< HEAD
              {displayInvoices.map((inv) => (
=======
              {displayInvoices.length === 0 ? (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={8}>
                    No invoices are linked to this account yet.
                  </td>
                </tr>
              ) : displayInvoices.map((inv) => (
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
            </tbody>
          </table>
        </div>
      </Card>

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
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <strong>Simulated Demo Gateway:</strong> No money will be charged. This updates client-side demo state.
            </div>

            <form onSubmit={handleConfirmPay} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold">
                <span>Total Due:</span>
                <span className="font-mono text-blue-900">
                  {formatCurrency(payModalInvoice.totalAmount - (payModalInvoice.amountPaid || 0))}
                </span>
              </div>

              <div>
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

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="secondary" size="sm" type="button" onClick={() => setPayModalInvoice(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                  Simulate Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
