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
    showToast('SaaS refunds ledger CSV exported.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Payment Adjustments</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">SaaS Subscription Refunds</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Audit trail of customer subscription reversals, prorated downgrade credits, and billing adjustments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => setIsModalOpen(true)}>
            Issue SaaS Refund
          </Button>
        </div>
      </div>

      <SaaSFinanceNav />

      {/* Filter and Search */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by refund reference (e.g. RFD-SAAS-55102), clinic name, or reason..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400"
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <CardHeader
          title={`Issued SaaS Refunds (${filteredRefunds.length})`}
          subtitle="Showing authorized reversals credited back to clinic merchant accounts"
        />
        <div className="overflow-x-auto">
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
          <form onSubmit={handleCreateRefund} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Subscribing Clinic Tenant *
              </label>
              <select
                value={clinicId}
                onChange={(e) => setClinicId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {clinics.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.subscriptionPlanId.toUpperCase()} Plan)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Refund Amount (INR) *
                </label>
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Original Gateway Ref *
                </label>
                <input
                  required
                  type="text"
                  value={originalPaymentRef}
                  onChange={(e) => setOriginalPaymentRef(e.target.value)}
                  placeholder="e.g. rzp_pay_99812A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Reason for Reversal / Adjustment *
              </label>
              <textarea
                required
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain justification for SaaS credit or gateway reversal..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
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
