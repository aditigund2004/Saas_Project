import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Receipt,
  Search,
  Plus,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Printer,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export function AccountsInvoicesPage() {
  const {
    invoices,
    createInvoice,
    recordInvoicePayment,
    requestRefund,
    formatCurrency,
    patients,
    activeClinic
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [viewInvoice, setViewInvoice] = useState(null);

  // New Invoice Form
  const [newInv, setNewInv] = useState({
    patientId: patients[0]?.id || 'pt-1042',
    patientName: patients[0]?.name || 'Aarav Patel',
    patientPhone: patients[0]?.phone || '+91 98765 43210',
    itemDescription: 'Comprehensive Consultation & Intraoral Diagnostic Radiovisiography',
    itemQuantity: 1,
    unitPrice: 1500,
    discount: 0,
    tax: 0
  });

  // Payment Form
  const [paymentData, setPaymentData] = useState({
    amount: 1500,
    method: 'UPI / QR Scan'
  });

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.patientPhone && inv.patientPhone.includes(searchTerm));
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const qty = Number(newInv.itemQuantity) || 1;
    const price = Number(newInv.unitPrice) || 1000;
    const subtotal = qty * price;
    const discount = Number(newInv.discount) || 0;
    const tax = Number(newInv.tax) || 0;
    const totalAmount = subtotal - discount + tax;

    createInvoice({
      patientId: newInv.patientId,
      patientName: newInv.patientName,
      patientPhone: newInv.patientPhone,
      date: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      items: [
        {
          id: `item-${Date.now()}`,
          description: newInv.itemDescription,
          quantity: qty,
          unitPrice: price,
          total: subtotal
        }
      ],
      subtotal,
      discount,
      tax,
      totalAmount,
      amountPaid: 0,
      status: 'Pending'
    });

    setCreateModalOpen(false);
  };

  const handleOpenPay = (invoice) => {
    setSelectedInvoice(invoice);
    const balanceDue = invoice.totalAmount - (invoice.amountPaid || 0);
    setPaymentData({
      amount: balanceDue > 0 ? balanceDue : invoice.totalAmount,
      method: 'UPI / Dynamic QR'
    });
    setPayModalOpen(true);
  };

  const handleConfirmPay = (e) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    recordInvoicePayment(
      selectedInvoice.id,
      paymentData.amount,
      paymentData.method
    );
    setPayModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Billing Ledger
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Patient Invoices & Receipts</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

            Generate OPD bills, simulate digital collections, and maintain audit trails
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setCreateModalOpen(true)} className="font-semibold shadow-sm">
          <Plus className="w-4 h-4 mr-1.5" />

          Create New Invoice
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by invoice number (e.g. INV-2026-0391) or patient..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

        >
          <option value="All">All Invoices</option>
          <option value="Paid">Fully Paid</option>
          <option value="Pending">Pending Payment</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-bold">#</th>

                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Date Billed</th>
                <th className="px-4 py-3">Services / Items</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Paid So Far</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">

                    No matching invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv, idx) => {
                  const balance = inv.totalAmount - (inv.amountPaid || 0);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-700 dark:text-blue-400">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{inv.patientName}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">{inv.patientPhone}</div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                        {inv.date}
                      </td>
                      <td className="px-4 py-3.5 max-w-xs truncate text-slate-700 dark:text-slate-300">
                        {inv.items.map((i) => i.description).join(', ')}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-white text-sm">
                        {formatCurrency(inv.totalAmount)}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                        {formatCurrency(inv.amountPaid || 0)}
                      </td>
                      <td className="px-4 py-3.5">

                        <Badge
                          variant={
                            inv.status === 'Paid' ? 'success' :
                            inv.status === 'Partially Paid' ? 'warning' :
                            inv.status === 'Refunded' ? 'danger' : 'default'
                          }
                          size="sm"
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">

                        <div className="flex items-center justify-end gap-1.5">
                          {inv.status !== 'Paid' && inv.status !== 'Refunded' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleOpenPay(inv)}
                              className="h-8 text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100"
                            >
                              <CreditCard className="w-3.5 h-3.5 mr-1" />

                              Simulate Pay
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewInvoice(inv)}
                            className="h-8 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                            title="View Invoice Receipt"
                          >
                            <Eye className="w-4 h-4" />

                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Invoice Modal */}
      {createModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setCreateModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Generate Patient OPD Invoice
              </h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Select Patient</label>

                <select
                  value={newInv.patientId}
                  onChange={(e) => {
                    const selected = patients.find((p) => p.id === e.target.value);
                    if (selected) {
                      setNewInv({
                        ...newInv,
                        patientId: selected.id,
                        patientName: selected.name,
                        patientPhone: selected.phone
                      });
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.patientIdNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Line Item Description *</label>

                <input
                  required
                  type="text"
                  value={newInv.itemDescription}
                  onChange={(e) => setNewInv({ ...newInv, itemDescription: e.target.value })}
                  placeholder="e.g. Endodontic Root Canal Therapy"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Quantity</label>

                  <input
                    type="number"
                    min="1"
                    value={newInv.itemQuantity}
                    onChange={(e) => setNewInv({ ...newInv, itemQuantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Unit Fee (₹)</label>

                  <input
                    type="number"
                    min="0"
                    value={newInv.unitPrice}
                    onChange={(e) => setNewInv({ ...newInv, unitPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Discount (₹)</label>

                  <input
                    type="number"
                    min="0"
                    value={newInv.discount}
                    onChange={(e) => setNewInv({ ...newInv, discount: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">GST Tax (₹)</label>

                  <input
                    type="number"
                    min="0"
                    value={newInv.tax}
                    onChange={(e) => setNewInv({ ...newInv, tax: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex justify-between items-center font-bold">
                <span className="text-slate-700 dark:text-slate-300">Net Total Amount:</span>
                <span className="font-mono text-blue-800 dark:text-blue-300 text-sm">

                  {formatCurrency((Number(newInv.itemQuantity) * Number(newInv.unitPrice)) - Number(newInv.discount) + Number(newInv.tax))}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

                <Button variant="secondary" size="sm" type="button" onClick={() => setCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Generate Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Simulation Modal */}
      {payModalOpen && selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setPayModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Simulate Patient Payment
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Invoice: {selectedInvoice.invoiceNumber}</p>
              </div>
              <button onClick={() => setPayModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs text-amber-900 dark:text-amber-300">
              <strong>Simulated Transaction:</strong> This button simulates settlement in ClinicOS demo state. It does not initiate a real banking charge.
            </div>

            <form onSubmit={handleConfirmPay} className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Patient Balance Due:</span>
                <strong className="font-mono text-slate-900 dark:text-white text-sm">

                  {formatCurrency(selectedInvoice.totalAmount - (selectedInvoice.amountPaid || 0))}
                </strong>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Payment Settlement Method</label>
                <select
                  value={paymentData.method}
                  onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

                >
                  <option value="UPI / Dynamic QR">UPI / Dynamic QR Scan</option>
                  <option value="POS Card Swipe">POS Credit / Debit Card Terminal</option>
                  <option value="OPD Counter Cash">OPD Counter Cash</option>
                  <option value="TPA Insurance Direct">TPA Cashless Insurance</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Amount to Record (₹)</label>

                <input
                  required
                  type="number"
                  min="1"
                  max={selectedInvoice.totalAmount}
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

                <Button variant="secondary" size="sm" type="button" onClick={() => setPayModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                  Confirm Simulated Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Detail / Receipt Modal */}
      {viewInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setViewInvoice(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Clinic Tax Invoice Preview</h3>
                <span className="font-mono text-xs text-blue-700 dark:text-blue-400">{viewInvoice.invoiceNumber}</span>
              </div>
              <button onClick={() => setViewInvoice(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{activeClinic.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activeClinic.address}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-500 dark:text-slate-400">Billed To:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{viewInvoice.patientName}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{viewInvoice.patientPhone}</div>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {viewInvoice.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.description}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Qty: {item.quantity} × {formatCurrency(item.unitPrice)}</div>
                    </div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">{formatCurrency(item.total)}</div>

                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(viewInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Discount:</span>
                  <span>-{formatCurrency(viewInvoice.discount)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>GST:</span>
                  <span>+{formatCurrency(viewInvoice.tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1.5 border-t border-slate-200 dark:border-slate-700 text-sm">
                  <span>Grand Total:</span>
                  <span>{formatCurrency(viewInvoice.totalAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-700 dark:text-emerald-400 text-sm">

                  <span>Amount Paid:</span>
                  <span>{formatCurrency(viewInvoice.amountPaid || 0)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">

              <Button variant="secondary" size="sm" onClick={() => setViewInvoice(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

