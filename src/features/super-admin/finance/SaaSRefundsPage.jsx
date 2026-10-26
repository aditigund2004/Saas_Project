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
    showToast('SaaS refunds ledger CSV exported.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Payment Adjustments</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Subscription Refunds</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of customer subscription reversals, prorated downgrade credits, and billing adjustments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => setIsModalOpen(true)}>
            + Issue SaaS Refund
          </Button>
        </div>
      </div>

      <SaaSFinanceNav />

      {/* Filter and Search */}
      <Card className="p-4 border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by refund reference (e.g. RFD-SAAS-55102), clinic name, or reason..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader
          title={`Issued SaaS Refunds (${filteredRefunds.length})`}
          subtitle="Showing authorized reversals credited back to clinic merchant accounts"
        />
        <div className="overflow-x-auto">
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
          <form onSubmit={handleCreateRefund} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Subscribing Clinic Tenant *
              </label>
              <select
                value={clinicId}
                onChange={(e) => setClinicId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                {clinics.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.subscriptionPlanId.toUpperCase()} Plan)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Refund Amount (INR) *
                </label>
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Original Gateway Ref *
                </label>
                <input
                  required
                  type="text"
                  value={originalPaymentRef}
                  onChange={(e) => setOriginalPaymentRef(e.target.value)}
                  placeholder="e.g. rzp_pay_99812A"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Reason for Reversal / Adjustment *
              </label>
              <textarea
                required
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain justification for SaaS credit or gateway reversal..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
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

