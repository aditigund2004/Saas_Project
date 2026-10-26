import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SaaSFinanceNav } from './SaaSFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  Receipt,
  Search,
  Filter,
  Download,
  CreditCard,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export function SaaSInvoicesPage() {
  const { saasInvoices, recordSaaSPayment, formatCurrency, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [payModal, setPayModal] = useState({ isOpen: false, invoice: null, method: 'Razorpay / UPI Autopay' });

  const filteredInvoices = saasInvoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.clinicName.toLowerCase().includes(search.toLowerCase()) ||
      inv.planName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSimulatePayment = () => {
    if (!payModal.invoice) return;
    recordSaaSPayment(payModal.invoice.invoiceNumber, payModal.method);
    setPayModal({ isOpen: false, invoice: null, method: 'Razorpay / UPI Autopay' });
    setSelectedInvoice(null);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Invoice Number,Clinic Name,Plan,Billing Period,Issue Date,Due Date,Amount,Status,Payment Method']
        .concat(
          filteredInvoices.map(
            (i) =>
              `"${i.invoiceNumber}","${i.clinicName}","${i.planName}","${i.billingPeriod}","${i.issueDate}","${i.dueDate}",${i.amount},"${i.status}","${i.paymentMethod || 'N/A'}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_saas_invoices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('SaaS invoices CSV exported.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Receivables & Invoicing</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Subscription Invoices</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            B2B invoices billed to clinic organizations for monthly/annual platform access and branch capacity.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
          Export Invoices CSV
        </Button>
      </div>

      <SaaSFinanceNav />

      {/* Filter and Search Bar */}
      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice number (e.g. SINV-2026-1081), clinic name, or tier plan..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Invoices ({saasInvoices.length})</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending">Pending Payment</option>
              <option value="Overdue">Overdue</option>
              <option value="Failed">Failed Auto-Debits</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader
          title={`Subscription Invoices (${filteredInvoices.length})`}
          subtitle="All corporate SaaS subscription charges with automated gateway collection status"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Subscribing Clinic</th>
                <th className="p-3.5">SaaS Tier Plan</th>
                <th className="p-3.5">Billing Period</th>
                <th className="p-3.5">Issue Date</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="p-3.5 font-sans font-semibold text-slate-800">{inv.clinicName}</td>
                  <td className="p-3.5 font-sans">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {inv.planName}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500 font-sans">{inv.billingPeriod}</td>
                  <td className="p-3.5 text-slate-500">{inv.issueDate}</td>
                  <td className="p-3.5 text-slate-500">{inv.dueDate}</td>
                  <td className="p-3.5 font-bold text-slate-900">{formatCurrency(inv.amount)}</td>
                  <td className="p-3.5 font-sans">
                    <Badge variant={inv.status}>{inv.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right font-sans">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedInvoice(inv)}
                      >
                        Drawer
                      </Button>
                      {inv.status !== 'Paid' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setPayModal({ isOpen: true, invoice: inv, method: 'Razorpay / UPI Autopay' })}
                        >
                          Simulate Pay
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

      {/* Invoice Detail Drawer / Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Subscription Invoice: ${selectedInvoice.invoiceNumber}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Clinic Tenant</span>
                <p className="font-bold text-slate-900">{selectedInvoice.clinicName}</p>
                <p className="text-[11px] text-slate-500">ID: {selectedInvoice.clinicId}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Subscription Tier</span>
                <p className="font-bold text-blue-700">{selectedInvoice.planName}</p>
                <p className="text-[11px] text-slate-500">
                  {selectedInvoice.tierLimitDoctors} Doctors · {selectedInvoice.tierLimitBranches} Branch
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Billing Window</span>
                <p className="font-bold text-slate-900">{selectedInvoice.billingPeriod}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Payment Status</span>
                <div>
                  <Badge variant={selectedInvoice.status}>{selectedInvoice.status}</Badge>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between font-mono">
              <span className="font-sans text-slate-700 font-semibold">Total Subscription Payable:</span>
              <span className="text-base font-extrabold text-slate-900">{formatCurrency(selectedInvoice.amount)}</span>
            </div>

            {selectedInvoice.status === 'Paid' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Settled on {selectedInvoice.paidAt || selectedInvoice.issueDate} via{' '}
                  <strong>{selectedInvoice.paymentMethod}</strong>.
                </span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {selectedInvoice.status !== 'Paid' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setPayModal({ isOpen: true, invoice: selectedInvoice, method: 'Razorpay / UPI Autopay' });
                  }}
                >
                  Simulate Settlement
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Simulated tax invoice PDF downloaded.')}
                >
                  Download PDF Receipt
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Payment Simulation Modal */}
      {payModal.isOpen && (
        <Modal
          isOpen={payModal.isOpen}
          onClose={() => setPayModal({ isOpen: false, invoice: null, method: 'Razorpay / UPI Autopay' })}
          title={`Simulate Settlement: ${payModal.invoice?.invoiceNumber}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Simulate an automated bank settlement or gateway webhook for{' '}
              <strong>{payModal.invoice?.clinicName}</strong> ({formatCurrency(payModal.invoice?.amount)}).
            </p>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Settlement Channel / Gateway
              </label>
              <select
                value={payModal.method}
                onChange={(e) => setPayModal((prev) => ({ ...prev, method: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                <option value="Razorpay / UPI Autopay">Razorpay / UPI Autopay</option>
                <option value="Corporate Credit Card">Corporate Credit Card (Visa/Mastercard)</option>
                <option value="NEFT / Bank Transfer">NEFT / Bank Transfer</option>
                <option value="Direct Debit Mandate">Direct Debit Mandate</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPayModal({ isOpen: false, invoice: null, method: 'Razorpay / UPI Autopay' })}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSimulatePayment}>
                Confirm Payment Simulation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

