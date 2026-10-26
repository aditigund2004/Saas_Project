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
    clinicRefunds,
    invoices,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Clinical Governance & Adjustments</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Patient Refund Approvals</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict clinical admin review queue for patient advance refunds, cancellations, and billing corrections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => showToast('Exporting refund audit logs...')}
          >
            Export Log
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsNewRefundOpen(true)}
          >
            Initiate Refund Request
          </Button>
        </div>
      </div>

      {/* Security & Protocol Notice */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong>Restricted Clinical Action:</strong> Reception staff can submit refund requests, but only Doctor/Admin credentials can approve and process payouts to preserve fiscal integrity.
          </div>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-amber-600 text-white font-mono text-[10px] font-bold">
          Dual Authorization
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            {pendingRefunds.length} request(s) awaiting Doctor/Admin sign-off
          </div>
        </Card>

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
            Processed back to original patient payment instruments
          </div>
        </Card>

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
            Well within industry benchmark (&lt; 2.5%)
          </div>
        </Card>
      </div>

      {/* Refunds Table */}
      <Card padding="none">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by request ref, patient or invoice #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Pending Approval', 'Approved'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
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
            <tbody className="divide-y divide-slate-100">
              {filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No refund requests found matching criteria.
                  </td>
                </tr>
              ) : (
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
                          {r.approvalStatus}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        {isPending ? (
                          <Button
                            variant="primary"
                            size="xs"
                            icon={CheckCircle}
                            onClick={() => approveClinicRefund(r.id)}
                          >
                            Approve Refund
                          </Button>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-semibold">
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
        <form onSubmit={handleCreateRefundSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Target Patient Invoice</label>
            <select
              value={selectedInvoiceNumber}
              onChange={(e) => setSelectedInvoiceNumber(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.invoiceNumber}>
                  {inv.invoiceNumber} - {inv.patientName} (Paid: ₹{inv.amountPaid || inv.totalAmount})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Refund Amount (₹)</label>
            <input
              type="number"
              required
              min="50"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Clinical / Administrative Reason</label>
            <textarea
              rows={2}
              required
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Procedure cancelled due to patient elevated BP; rescheduled for observation..."
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Refund Destination Channel</label>
            <select
              value={refundChannel}
              onChange={(e) => setRefundChannel(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
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

