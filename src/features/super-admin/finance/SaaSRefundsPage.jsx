import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SaaSFinanceNav } from './SaaSFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  RotateCcw,
  Search,
  Filter,
  Download,
  AlertTriangle,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';

export function SaaSRefundsPage() {
  const { saasRefunds, requestSaaSRefund, clinics, formatCurrency, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [clinicId, setClinicId] = useState(clinics[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [originalPaymentRef, setOriginalPaymentRef] = useState('rzp_pay_99812A');

  const filteredRefunds = saasRefunds.filter((r) => {
    return (
      r.refundReference.toLowerCase().includes(search.toLowerCase()) ||
      r.clinicName.toLowerCase().includes(search.toLowerCase()) ||
      r.reason.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreateRefund = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      showToast('Please enter a valid refund amount.', 'error');
      return;
    }
    const targetClinic = clinics.find((c) => c.id === clinicId) || clinics[0];

    requestSaaSRefund({
      clinicId: targetClinic.id,
      clinicName: targetClinic.name,
      originalPaymentRef,
      amount: Number(amount),
      reason
    });

    setIsModalOpen(false);
    setAmount('');
    setReason('');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Refund Reference,Clinic Name,Original Payment Ref,Amount,Reason,Request Date,Status']
        .concat(
          filteredRefunds.map(
            (r) =>
              `"${r.refundReference}","${r.clinicName}","${r.originalPaymentRef}",${r.amount},"${r.reason}","${r.requestDate}","${r.status}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_saas_refunds_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
<<<<<<< HEAD
    showToast('SaaS refunds ledger CSV exported.', 'success');
=======
    showToast('SaaS refunds ledger CSV exported.');
>>>>>>> origin/main
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Payment Adjustments</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">SaaS Subscription Refunds</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Payment Adjustments</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Subscription Refunds</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Audit trail of customer subscription reversals, prorated downgrade credits, and billing adjustments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => setIsModalOpen(true)}>
<<<<<<< HEAD
            Issue SaaS Refund
=======
            + Issue SaaS Refund
>>>>>>> origin/main
          </Button>
        </div>
      </div>

      <SaaSFinanceNav />

      {/* Filter and Search */}
<<<<<<< HEAD
      <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
      <Card className="p-4 border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by refund reference (e.g. RFD-SAAS-55102), clinic name, or reason..."
<<<<<<< HEAD
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400"
=======
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
          />
        </div>
      </Card>

      {/* Table */}
<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
=======
      <Card>
>>>>>>> origin/main
        <CardHeader
          title={`Issued SaaS Refunds (${filteredRefunds.length})`}
          subtitle="Showing authorized reversals credited back to clinic merchant accounts"
        />
        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12 font-bold">#</th>
                <th className="p-4">Refund Reference</th>
                <th className="p-4">Subscribing Clinic</th>
                <th className="p-4">Original Gateway Ref</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Reason & Adjustment Context</th>
                <th className="p-4">Request Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
              {filteredRefunds.map((r, idx) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{r.refundReference}</td>
                  <td className="p-4 font-sans font-bold text-slate-800 dark:text-slate-200 text-sm">{r.clinicName}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{r.originalPaymentRef}</td>
                  <td className="p-4 font-bold text-rose-600 dark:text-rose-400 text-sm">{formatCurrency(r.amount)}</td>
                  <td className="p-4 font-sans text-slate-600 dark:text-slate-300 max-w-xs">{r.reason}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{r.requestDate}</td>
                  <td className="p-4 font-sans">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Refund Reference</th>
                <th className="p-3.5">Subscribing Clinic</th>
                <th className="p-3.5">Original Gateway Ref</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Reason & Adjustment Context</th>
                <th className="p-3.5">Request Date</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredRefunds.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">{r.refundReference}</td>
                  <td className="p-3.5 font-sans font-semibold text-slate-800">{r.clinicName}</td>
                  <td className="p-3.5 text-slate-500">{r.originalPaymentRef}</td>
                  <td className="p-3.5 font-bold text-rose-600">{formatCurrency(r.amount)}</td>
                  <td className="p-3.5 font-sans text-slate-600 max-w-xs">{r.reason}</td>
                  <td className="p-3.5 text-slate-500">{r.requestDate}</td>
                  <td className="p-3.5 font-sans">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
>>>>>>> origin/main
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Refund Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Process SaaS Subscription Refund"
          size="md"
        >
<<<<<<< HEAD
          <form onSubmit={handleCreateRefund} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
=======
          <form onSubmit={handleCreateRefund} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
>>>>>>> origin/main
                Subscribing Clinic Tenant *
              </label>
              <select
                value={clinicId}
                onChange={(e) => setClinicId(e.target.value)}
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
>>>>>>> origin/main
              >
                {clinics.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.subscriptionPlanId.toUpperCase()} Plan)
                  </option>
                ))}
              </select>
            </div>

<<<<<<< HEAD
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
=======
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
>>>>>>> origin/main
                  Refund Amount (INR) *
                </label>
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1500"
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
=======
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
>>>>>>> origin/main
                  Original Gateway Ref *
                </label>
                <input
                  required
                  type="text"
                  value={originalPaymentRef}
                  onChange={(e) => setOriginalPaymentRef(e.target.value)}
                  placeholder="e.g. rzp_pay_99812A"
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
>>>>>>> origin/main
                />
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
=======
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
>>>>>>> origin/main
                Reason for Reversal / Adjustment *
              </label>
              <textarea
                required
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain justification for SaaS credit or gateway reversal..."
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
=======
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
>>>>>>> origin/main
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Execute Simulated Refund
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
