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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Billing Ledger
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Patient Invoices & Receipts</h1>
          <p className="text-xs text-slate-500">
            Generate OPD bills, simulate digital collections, and maintain audit trails
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setCreateModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Create New Invoice
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by invoice number (e.g. INV-2026-0391) or patient..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 font-medium"
        >
          <option value="All">All Invoices</option>
          <option value="Paid">Fully Paid</option>
          <option value="Pending">Pending Payment</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
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
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    No matching invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const balance = inv.totalAmount - (inv.amountPaid || 0);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{inv.patientName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{inv.patientPhone}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600">
                        {inv.date}
                      </td>
                      <td className="px-4 py-3 max-w-xs truncate text-slate-700">
                        {inv.items.map((i) => i.description).join(', ')}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">
                        {formatCurrency(inv.totalAmount)}
                      </td>
                      <td className="px-4 py-3 font-mono text-emerald-700 font-semibold">
                        {formatCurrency(inv.amountPaid || 0)}
                      </td>
                      <td className="px-4 py-3">
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
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {inv.status !== 'Paid' && inv.status !== 'Refunded' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleOpenPay(inv)}
                              className="h-7 text-xs bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
                            >
                              <CreditCard className="w-3 h-3 mr-1" />
                              Simulate Pay
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewInvoice(inv)}
                            className="h-7 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                Generate Patient OPD Invoice
              </h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Select Patient</label>
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
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.patientIdNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Line Item Description *</label>
                <input
                  required
                  type="text"
                  value={newInv.itemDescription}
                  onChange={(e) => setNewInv({ ...newInv, itemDescription: e.target.value })}
                  placeholder="e.g. Endodontic Root Canal Therapy"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newInv.itemQuantity}
                    onChange={(e) => setNewInv({ ...newInv, itemQuantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Unit Fee (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newInv.unitPrice}
                    onChange={(e) => setNewInv({ ...newInv, unitPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Discount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newInv.discount}
                    onChange={(e) => setNewInv({ ...newInv, discount: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">GST Tax (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newInv.tax}
                    onChange={(e) => setNewInv({ ...newInv, tax: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between font-bold">
                <span>Net Total Amount:</span>
                <span className="font-mono text-blue-800">
                  {formatCurrency((Number(newInv.itemQuantity) * Number(newInv.unitPrice)) - Number(newInv.discount) + Number(newInv.tax))}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Simulate Patient Payment
                </h3>
                <p className="text-[11px] text-slate-500">Invoice: {selectedInvoice.invoiceNumber}</p>
              </div>
              <button onClick={() => setPayModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <strong>Simulated Transaction:</strong> This button simulates settlement in ClinicOS demo state. It does not initiate a real banking charge.
            </div>

            <form onSubmit={handleConfirmPay} className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Patient Balance Due:</span>
                <strong className="font-mono text-slate-900">
                  {formatCurrency(selectedInvoice.totalAmount - (selectedInvoice.amountPaid || 0))}
                </strong>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Payment Settlement Method</label>
                <select
                  value={paymentData.method}
                  onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium"
                >
                  <option value="UPI / Dynamic QR">UPI / Dynamic QR Scan</option>
                  <option value="POS Card Swipe">POS Credit / Debit Card Terminal</option>
                  <option value="OPD Counter Cash">OPD Counter Cash</option>
                  <option value="TPA Insurance Direct">TPA Cashless Insurance</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Amount to Record (₹)</label>
                <input
                  required
                  type="number"
                  min="1"
                  max={selectedInvoice.totalAmount}
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Clinic Tax Invoice Preview</h3>
                <span className="font-mono text-xs text-blue-700">{viewInvoice.invoiceNumber}</span>
              </div>
              <button onClick={() => setViewInvoice(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <div>
                  <div className="font-bold text-slate-900">{activeClinic.name}</div>
                  <div className="text-[11px] text-slate-500">{activeClinic.address}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Billed To:</div>
                  <div className="font-bold text-slate-800">{viewInvoice.patientName}</div>
                  <div className="text-[11px] text-slate-500">{viewInvoice.patientPhone}</div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {viewInvoice.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">{item.description}</div>
                      <div className="text-[10px] text-slate-400">Qty: {item.quantity} × {formatCurrency(item.unitPrice)}</div>
                    </div>
                    <div className="font-mono font-bold text-slate-900">{formatCurrency(item.total)}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(viewInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Discount:</span>
                  <span>-{formatCurrency(viewInvoice.discount)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>GST:</span>
                  <span>+{formatCurrency(viewInvoice.tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200 text-sm">
                  <span>Grand Total:</span>
                  <span>{formatCurrency(viewInvoice.totalAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-700">
                  <span>Amount Paid:</span>
                  <span>{formatCurrency(viewInvoice.amountPaid || 0)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
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

