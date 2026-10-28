import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Receipt, PlusCircle, Printer, Download, CreditCard, CheckCircle } from 'lucide-react';

export function ClinicBillingPage() {
  const { invoices, createInvoice, patients, activeClinic, activeBranch, showToast } = useApp();

  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // New Invoice Form
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');

  const [lineItemDesc, setLineItemDesc] = useState('Root Canal Treatment');
  const [lineItemPrice, setLineItemPrice] = useState(4500);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === selectedPatientId) || patients[0];

    const total = Math.max(0, lineItemPrice - discount);

    createInvoice({
      clinicId: activeClinic.id,
      branchId: activeBranch.id,
      patientId: patient.patientIdNumber,
      patientName: patient.name,
      patientPhone: patient.phone,
      date: '2026-10-23',
      dueDate: '2026-10-23',
      items: [{ id: `item-${Date.now()}`, description: lineItemDesc, quantity: 1, unitPrice: lineItemPrice, total: lineItemPrice }],
      subtotal: lineItemPrice,
      discount,
      tax: 0,
      totalAmount: total,
      amountPaid: total,
      status: 'Paid',
      paymentMethod
    });

    setIsNewInvoiceOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Financial Management</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Patient Invoices & Billing</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

            Issue procedure bills, record payments (Cash, UPI, Card), and manage outstanding balances.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={PlusCircle}
          onClick={() => setIsNewInvoiceOpen(true)}
        >
          Create Patient Invoice
        </Button>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

        <CardHeader
          title={`Invoices Ledger (${invoices.length})`}
          subtitle="All patient billing transactions for current practice"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12">#</th>

                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.map((inv, idx) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{inv.patientName}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{inv.patientId}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300 font-mono">{inv.date}</td>
                  <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">
                    ₹{inv.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 font-bold font-mono text-blue-700 dark:text-blue-400">
                    ₹{inv.amountPaid.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{inv.paymentMethod || 'Cash'}</td>

                  <td className="p-3.5">
                    <Badge variant={inv.status}>{inv.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Printer}
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      Print Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invoice Detail / Receipt Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice Receipt: ${selectedInvoice.invoiceNumber}`}
          size="md"
        >
          <div className="space-y-4 text-xs bg-white text-slate-900 p-2 rounded-xl">
            <div className="flex justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{activeClinic.name}</h3>
                <p className="text-xs text-slate-500">{activeBranch?.name}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-slate-900">{selectedInvoice.invoiceNumber}</p>
                <p className="text-xs text-slate-500">{selectedInvoice.date}</p>

              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p className="font-semibold text-slate-800">Billed To: {selectedInvoice.patientName}</p>
              <p className="text-slate-600">Phone: {selectedInvoice.patientPhone} · Patient ID: {selectedInvoice.patientId}</p>

            </div>

            {/* Line items table */}
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase text-xs font-bold text-slate-600">
                <tr>
                  <th className="p-2 text-center w-10">#</th>

                  <th className="p-2">Description</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoice.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 text-center font-mono font-medium text-slate-500 text-xs">{idx + 1}</td>
                    <td className="p-2 font-medium text-slate-800">{item.description}</td>
                    <td className="p-2 text-right font-mono font-bold text-slate-900">₹{item.total.toLocaleString('en-IN')}</td>

                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 pt-2 border-t border-slate-200 text-right">
              <p className="text-slate-600">Subtotal: ₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</p>
              {selectedInvoice.discount > 0 && (
                <p className="text-blue-700 font-semibold">Discount: -₹{selectedInvoice.discount.toLocaleString('en-IN')}</p>

              )}
              <p className="text-sm font-bold text-slate-900">Total Billed: ₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</p>
              <p className="text-xs font-semibold text-emerald-700">Amount Paid: ₹{selectedInvoice.amountPaid.toLocaleString('en-IN')} ({selectedInvoice.paymentMethod})</p>
            </div>

            <div className="pt-3 flex justify-between border-t border-slate-200">

              <Button variant="outline" size="sm" onClick={() => window.print()}>
                Print Receipt
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedInvoice(null)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Invoice Modal */}
      {isNewInvoiceOpen && (
        <Modal
          isOpen={isNewInvoiceOpen}
          onClose={() => setIsNewInvoiceOpen(false)}
          title="Create Patient Procedure Invoice"
          size="md"
        >
          <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Select Patient *</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                {patients.map((p) => (

                  <option key={p.id} value={p.id}>{p.name} ({p.patientIdNumber})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Procedure Description *</label>

                <input
                  required
                  type="text"
                  value={lineItemDesc}
                  onChange={(e) => setLineItemDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Standard Fee (INR) *</label>

                <input
                  required
                  type="number"
                  value={lineItemPrice}
                  onChange={(e) => setLineItemPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-white"

                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Discount (INR)</label>

                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"

                >
                  <option value="UPI / QR">UPI / QR Code</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between font-bold text-sm">
              <span className="text-slate-700 dark:text-slate-300">Total Payable:</span>
              <span className="font-mono text-blue-800 dark:text-blue-400">₹{Math.max(0, lineItemPrice - discount).toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">

              <Button variant="outline" size="sm" onClick={() => setIsNewInvoiceOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">Issue Invoice</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

