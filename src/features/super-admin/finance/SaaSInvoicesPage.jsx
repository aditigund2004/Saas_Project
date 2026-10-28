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
<<<<<<< HEAD
    showToast('SaaS invoices CSV exported.', 'success');
=======
    showToast('SaaS invoices CSV exported.');
>>>>>>> origin/main
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Receivables & Invoicing</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">SaaS Subscription Invoices</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Receivables & Invoicing</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Subscription Invoices</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            B2B invoices billed to clinic organizations for monthly/annual platform access and branch capacity.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
          Export Invoices CSV
        </Button>
      </div>

      <SaaSFinanceNav />

      {/* Filter and Search Bar */}
<<<<<<< HEAD
      <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice number (e.g. SINV-2026-1081), clinic name, or tier plan..."
<<<<<<< HEAD
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400"
=======
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
<<<<<<< HEAD
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-950 font-medium text-slate-700 dark:text-slate-200"
=======
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-700"
>>>>>>> origin/main
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
<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
      <Card>
>>>>>>> origin/main
        <CardHeader
          title={`Subscription Invoices (${filteredInvoices.length})`}
          subtitle="All corporate SaaS subscription charges with automated gateway collection status"
        />
        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12 font-bold">#</th>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Subscribing Clinic</th>
                <th className="p-4">SaaS Tier Plan</th>
                <th className="p-4">Billing Period</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
              {filteredInvoices.map((inv, idx) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{inv.invoiceNumber}</td>
                  <td className="p-4 font-sans font-bold text-slate-800 dark:text-slate-200 text-sm">{inv.clinicName}</td>
                  <td className="p-4 font-sans">
                    <span className="uppercase text-xs font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                      {inv.planName}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 font-sans text-xs">{inv.billingPeriod}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{inv.issueDate}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{inv.dueDate}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{formatCurrency(inv.amount)}</td>
                  <td className="p-4 font-sans">
                    <Badge variant={inv.status}>{inv.status}</Badge>
                  </td>
                  <td className="p-4 text-right font-sans">
                    <div className="flex items-center justify-end gap-2">
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3.5">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Clinic Tenant</span>
                <p className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{selectedInvoice.clinicName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">ID: {selectedInvoice.clinicId}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Subscription Tier</span>
                <p className="font-bold text-blue-700 dark:text-blue-400 text-base mt-0.5">{selectedInvoice.planName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
=======
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
>>>>>>> origin/main
                  {selectedInvoice.tierLimitDoctors} Doctors · {selectedInvoice.tierLimitBranches} Branch
                </p>
              </div>
              <div>
<<<<<<< HEAD
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Billing Window</span>
                <p className="font-semibold text-slate-900 dark:text-slate-200 mt-0.5">{selectedInvoice.billingPeriod}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Payment Status</span>
                <div className="mt-0.5">
=======
                <span className="text-[10px] uppercase font-bold text-slate-400">Billing Window</span>
                <p className="font-bold text-slate-900">{selectedInvoice.billingPeriod}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Payment Status</span>
                <div>
>>>>>>> origin/main
                  <Badge variant={selectedInvoice.status}>{selectedInvoice.status}</Badge>
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-between font-mono">
              <span className="font-sans text-slate-700 dark:text-slate-300 font-semibold text-sm">Total Subscription Payable:</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">{formatCurrency(selectedInvoice.amount)}</span>
            </div>

            {selectedInvoice.status === 'Paid' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5 text-xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
=======
            <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between font-mono">
              <span className="font-sans text-slate-700 font-semibold">Total Subscription Payable:</span>
              <span className="text-base font-extrabold text-slate-900">{formatCurrency(selectedInvoice.amount)}</span>
            </div>

            {selectedInvoice.status === 'Paid' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
>>>>>>> origin/main
                <span>
                  Settled on {selectedInvoice.paidAt || selectedInvoice.issueDate} via{' '}
                  <strong>{selectedInvoice.paymentMethod}</strong>.
                </span>
              </div>
            )}

<<<<<<< HEAD
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
=======
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
>>>>>>> origin/main
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
<<<<<<< HEAD
                  onClick={() => showToast('Simulated tax invoice PDF downloaded.', 'info')}
=======
                  onClick={() => showToast('Simulated tax invoice PDF downloaded.')}
>>>>>>> origin/main
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
<<<<<<< HEAD
          <div className="space-y-4 text-sm">
            <p className="text-slate-600 dark:text-slate-300">
              Simulate an automated bank settlement or gateway webhook for{' '}
              <strong className="text-slate-900 dark:text-white">{payModal.invoice?.clinicName}</strong> ({formatCurrency(payModal.invoice?.amount)}).
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
=======
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Simulate an automated bank settlement or gateway webhook for{' '}
              <strong>{payModal.invoice?.clinicName}</strong> ({formatCurrency(payModal.invoice?.amount)}).
            </p>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
>>>>>>> origin/main
                Settlement Channel / Gateway
              </label>
              <select
                value={payModal.method}
                onChange={(e) => setPayModal((prev) => ({ ...prev, method: e.target.value }))}
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
>>>>>>> origin/main
              >
                <option value="Razorpay / UPI Autopay">Razorpay / UPI Autopay</option>
                <option value="Corporate Credit Card">Corporate Credit Card (Visa/Mastercard)</option>
                <option value="NEFT / Bank Transfer">NEFT / Bank Transfer</option>
                <option value="Direct Debit Mandate">Direct Debit Mandate</option>
              </select>
            </div>

<<<<<<< HEAD
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
=======
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
>>>>>>> origin/main
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
<<<<<<< HEAD
=======

>>>>>>> origin/main
