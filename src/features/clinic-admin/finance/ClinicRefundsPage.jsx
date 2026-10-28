import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ClinicFinanceNav } from './ClinicFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  RotateCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  PlusCircle,
  Search,
  ShieldCheck,
  User,
  Receipt,
  Download
} from 'lucide-react';

export function ClinicRefundsPage() {
  const {
<<<<<<< HEAD
    clinicRefunds = [],
    invoices = [],
=======
    clinicRefunds,
    invoices,
>>>>>>> origin/main
    requestClinicRefund,
    approveClinicRefund,
    showToast,
    formatCurrency
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isNewRefundOpen, setIsNewRefundOpen] = useState(false);

  // New Refund Form
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState(invoices[0]?.invoiceNumber || '');
  const [refundReason, setRefundReason] = useState('Patient cancelled advance procedure appointment');
  const [refundAmount, setRefundAmount] = useState(1500);
  const [refundChannel, setRefundChannel] = useState('Original UPI Source');

  const filteredRefunds = clinicRefunds.filter((r) => {
    const matchesSearch =
      r.requestReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.approvalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingRefunds = clinicRefunds.filter((r) => r.approvalStatus === 'Pending Approval');
  const totalPendingAmount = pendingRefunds.reduce((sum, r) => sum + r.amount, 0);

  const approvedRefunds = clinicRefunds.filter((r) => r.approvalStatus === 'Approved');
  const totalApprovedAmount = approvedRefunds.reduce((sum, r) => sum + r.amount, 0);

  const handleCreateRefundSubmit = (e) => {
    e.preventDefault();
    const inv = invoices.find((i) => i.invoiceNumber === selectedInvoiceNumber);

    requestClinicRefund({
      patientId: inv?.patientId || 'PID-2026-001',
      patientName: inv?.patientName || 'Patient',
      invoiceNumber: selectedInvoiceNumber,
      amount: Number(refundAmount),
      reason: refundReason,
      refundMethod: refundChannel
    });

    setIsNewRefundOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Scope Navigation */}
      <ClinicFinanceNav />

      {/* Page Header */}
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Clinical Governance & Adjustments</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Patient Refund Approvals</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Clinical Governance & Adjustments</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Patient Refund Approvals</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Strict clinical admin review queue for patient advance refunds, cancellations, and billing corrections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
<<<<<<< HEAD
            onClick={() => showToast('Exporting refund audit logs...')}
          >
            <Download className="w-4 h-4 mr-1.5" />
=======
            icon={Download}
            onClick={() => showToast('Exporting refund audit logs...')}
          >
>>>>>>> origin/main
            Export Log
          </Button>
          <Button
            variant="primary"
            size="sm"
<<<<<<< HEAD
            onClick={() => setIsNewRefundOpen(true)}
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
=======
            icon={PlusCircle}
            onClick={() => setIsNewRefundOpen(true)}
          >
>>>>>>> origin/main
            Initiate Refund Request
          </Button>
        </div>
      </div>

      {/* Security & Protocol Notice */}
<<<<<<< HEAD
      <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
=======
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
>>>>>>> origin/main
          <div>
            <strong>Restricted Clinical Action:</strong> Reception staff can submit refund requests, but only Doctor/Admin credentials can approve and process payouts to preserve fiscal integrity.
          </div>
        </div>
<<<<<<< HEAD
        <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-amber-600 text-white font-mono text-xs font-bold">
=======
        <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-amber-600 text-white font-mono text-[10px] font-bold">
>>>>>>> origin/main
          Dual Authorization
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
<<<<<<< HEAD
        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Pending Review</span>
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {formatCurrency(totalPendingAmount)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
=======
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Pending Review</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-amber-700">
            {formatCurrency(totalPendingAmount)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
>>>>>>> origin/main
            {pendingRefunds.length} request(s) awaiting Doctor/Admin sign-off
          </div>
        </Card>

<<<<<<< HEAD
        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Approved & Settled</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {formatCurrency(totalApprovedAmount)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
=======
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Approved & Settled</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-emerald-700">
            {formatCurrency(totalApprovedAmount)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
>>>>>>> origin/main
            Processed back to original patient payment instruments
          </div>
        </Card>

<<<<<<< HEAD
        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Refund Rate</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <RotateCcw className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
            0.8%
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
=======
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Refund Rate</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <RotateCcw className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
            0.8%
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
>>>>>>> origin/main
            Well within industry benchmark (&lt; 2.5%)
          </div>
        </Card>
      </div>

      {/* Refunds Table */}
<<<<<<< HEAD
      <Card padding="none" className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
=======
      <Card padding="none">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
>>>>>>> origin/main
            <input
              type="text"
              placeholder="Search by request ref, patient or invoice #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
              className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
=======
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
>>>>>>> origin/main
            {['All', 'Pending Approval', 'Approved'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
<<<<<<< HEAD
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
=======
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
>>>>>>> origin/main
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-semibold">#</th>
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="p-3.5">Refund Ref</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Original Invoice</th>
                <th className="p-3.5">Reason for Refund</th>
                <th className="p-3.5">Payout Method</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Date Requested</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
=======
            <tbody className="divide-y divide-slate-100">
              {filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
>>>>>>> origin/main
                    No refund requests found matching criteria.
                  </td>
                </tr>
              ) : (
<<<<<<< HEAD
                filteredRefunds.map((r, idx) => {
                  const isPending = r.approvalStatus === 'Pending Approval';
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white text-xs">{r.requestReference}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{r.patientName}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{r.patientId}</div>
                      </td>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold text-xs">{r.invoiceNumber}</td>
                      <td className="p-3.5 max-w-[200px]">
                        <div className="truncate text-slate-700 dark:text-slate-300">{r.reason}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                          {r.refundMethod || 'Original Source'}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                        {formatCurrency(r.amount)}
                      </td>
                      <td className="p-3.5 text-slate-500 dark:text-slate-400 font-mono text-xs">{r.requestedAt}</td>
                      <td className="p-3.5">
                        <Badge variant={isPending ? 'warning' : 'success'} size="sm">
=======
                filteredRefunds.map((r) => {
                  const isPending = r.approvalStatus === 'Pending Approval';
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{r.requestReference}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{r.patientName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{r.patientId}</div>
                      </td>
                      <td className="p-3.5 font-mono text-blue-600 font-semibold">{r.invoiceNumber}</td>
                      <td className="p-3.5 max-w-[200px]">
                        <div className="truncate text-slate-700">{r.reason}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                          {r.refundMethod || 'Original Source'}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-amber-700 text-sm">
                        {formatCurrency(r.amount)}
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">{r.requestedAt}</td>
                      <td className="p-3.5">
                        <Badge variant={isPending ? 'warning' : 'success'}>
>>>>>>> origin/main
                          {r.approvalStatus}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        {isPending ? (
                          <Button
                            variant="primary"
                            size="xs"
<<<<<<< HEAD
                            onClick={() => approveClinicRefund(r.id)}
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                            Approve Refund
                          </Button>
                        ) : (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
=======
                            icon={CheckCircle}
                            onClick={() => approveClinicRefund(r.id)}
                          >
                            Approve Refund
                          </Button>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-semibold">
>>>>>>> origin/main
                            ✓ Authorized on {r.approvedAt || '2026-10-23'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Refund Request Modal */}
      <Modal
        isOpen={isNewRefundOpen}
        onClose={() => setIsNewRefundOpen(false)}
        title="Initiate Patient Refund Request"
      >
<<<<<<< HEAD
        <form onSubmit={handleCreateRefundSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Patient Invoice</label>
            <select
              value={selectedInvoiceNumber}
              onChange={(e) => setSelectedInvoiceNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
=======
        <form onSubmit={handleCreateRefundSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Target Patient Invoice</label>
            <select
              value={selectedInvoiceNumber}
              onChange={(e) => setSelectedInvoiceNumber(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
>>>>>>> origin/main
            >
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.invoiceNumber}>
                  {inv.invoiceNumber} - {inv.patientName} (Paid: ₹{inv.amountPaid || inv.totalAmount})
                </option>
              ))}
            </select>
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Refund Amount (₹)</label>
=======
            <label className="block text-slate-700 font-semibold mb-1">Refund Amount (₹)</label>
>>>>>>> origin/main
            <input
              type="number"
              required
              min="50"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
<<<<<<< HEAD
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
=======
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
>>>>>>> origin/main
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Clinical / Administrative Reason</label>
=======
            <label className="block text-slate-700 font-semibold mb-1">Clinical / Administrative Reason</label>
>>>>>>> origin/main
            <textarea
              rows={2}
              required
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
<<<<<<< HEAD
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
=======
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
>>>>>>> origin/main
              placeholder="e.g. Procedure cancelled due to patient elevated BP; rescheduled for observation..."
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Refund Destination Channel</label>
            <select
              value={refundChannel}
              onChange={(e) => setRefundChannel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
=======
            <label className="block text-slate-700 font-semibold mb-1">Refund Destination Channel</label>
            <select
              value={refundChannel}
              onChange={(e) => setRefundChannel(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
>>>>>>> origin/main
            >
              <option value="Original UPI Source">Original UPI Source (Automated reversed credit)</option>
              <option value="NEFT / Bank Transfer">NEFT / RTGS Bank Transfer</option>
              <option value="Cash Counter">Cash Counter Payout</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsNewRefundOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit for Approval
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
