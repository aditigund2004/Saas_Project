import React, { useState, useMemo } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { formatINR, exportToCSV, getReferralStatusBadge } from './referralUtils';
import {
  Receipt,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Download,
  Eye,
  AlertCircle,
  Calendar,
  Building2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export function CommissionLedgerPage() {
  const {
    commissionLedger,
    affiliates,
    approveCommission,
    rejectCommission,
    reverseCommission
  } = useReferral();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [affiliateFilter, setAffiliateFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState('All');

  // Modals state
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isReverseOpen, setIsReverseOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [reverseReason, setReverseReason] = useState('');

  // Filtered Ledger
  const filteredLedger = useMemo(() => {
    return commissionLedger.filter((l) => {
      const matchSearch =
        searchTerm === '' ||
        l.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.referredHospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.subscriptionPlan.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || l.status === statusFilter;
      const matchAffiliate = affiliateFilter === 'All' || l.affiliateId === affiliateFilter;

      let matchDate = true;
      if (dateRangeFilter === 'Last30Days') {
        const d = new Date(l.transactionDate);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
        matchDate = d >= thirtyDaysAgo;
      } else if (dateRangeFilter === '2026') {
        matchDate = l.transactionDate.startsWith('2026');
      }

      return matchSearch && matchStatus && matchAffiliate && matchDate;
    });
  }, [commissionLedger, searchTerm, statusFilter, affiliateFilter, dateRangeFilter]);

  const handleOpenDetails = (txn) => {
    setSelectedTxn(txn);
    setIsDetailsOpen(true);
  };

  const handleOpenReject = (txn) => {
    setSelectedTxn(txn);
    setRejectReason('Trial incomplete or contract requirements not fulfilled.');
    setIsRejectOpen(true);
  };

  const handleOpenReverse = (txn) => {
    setSelectedTxn(txn);
    setReverseReason('Hospital requested full refund within 30-day onboarding satisfaction guarantee.');
    setIsReverseOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedTxn) {
      rejectCommission(selectedTxn.transactionId, rejectReason);
      setIsRejectOpen(false);
    }
  };

  const handleConfirmReverse = () => {
    if (selectedTxn) {
      reverseCommission(selectedTxn.transactionId, reverseReason);
      setIsReverseOpen(false);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(
      'ClinicOS_Commission_Ledger',
      filteredLedger,
      [
        { label: 'Transaction ID', key: 'transactionId' },
        { label: 'Affiliate Partner', key: 'affiliateName' },
        { label: 'Referred Hospital', key: 'referredHospital' },
        { label: 'Plan', key: 'subscriptionPlan' },
        { label: 'Eligible Amount (INR)', key: 'eligiblePaymentAmount' },
        { label: 'Commission Rule', key: 'commissionRule' },
        { label: 'Commission Amount (INR)', key: 'commissionAmount' },
        { label: 'Transaction Date', key: 'transactionDate' },
        { label: 'Commission Status', key: 'status' },
        { label: 'Notes', key: 'notes' }
      ]
    );
  };

  // Quick summary counts
  const pendingCount = commissionLedger.filter((l) => l.status === 'Pending').length;
  const approvedCount = commissionLedger.filter((l) => l.status === 'Approved').length;
  const paidCount = commissionLedger.filter((l) => l.status === 'Paid').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Financial Audit Trail
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Commission Ledger & Reconciliation
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Itemized attribution entries, status reconciliation, verification approvals, and simulated reversals.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={handleExportCSV}
        >
          Export Ledger (.CSV)
        </Button>
      </div>

      <ReferralNav />

      {/* Mini Status Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 block">
              Pending Validation
            </span>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-200">
              {pendingCount} Records
            </div>
          </div>
          <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 block">
              Approved
            </span>
            <div className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
              {approvedCount} Ready
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        </div>

        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-blue-800 dark:text-blue-300 block">
              Paid / Disbursed
            </span>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {paidCount} Settled
            </div>
          </div>
          <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
        </div>

        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300 block">
              Reversals & Refunds
            </span>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-200">
              {commissionLedger.filter((l) => l.status === 'Reversed').length} Simulated
            </div>
          </div>
          <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Txn ID, affiliate, hospital, or plan..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Rejected">Rejected</option>
              <option value="Reversed">Reversed</option>
            </select>

            <select
              value={affiliateFilter}
              onChange={(e) => setAffiliateFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Partners</option>
              {affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <select
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Dates</option>
              <option value="Last30Days">Last 30 Days</option>
              <option value="2026">Year 2026</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main Ledger Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-3">Affiliate Partner</th>
                <th className="py-3 px-3">Hospital Client</th>
                <th className="py-3 px-3">Plan & Payment</th>
                <th className="py-3 px-3">Commission Rule</th>
                <th className="py-3 px-3">Commission Amount</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLedger.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No ledger transactions match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLedger.map((txn) => (
                  <tr
                    key={txn.transactionId}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {txn.transactionId}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {txn.affiliateName}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {txn.affiliateId}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                        {txn.referredHospital}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {txn.referralId}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {txn.subscriptionPlan}
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {formatINR(txn.eligiblePaymentAmount)}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 max-w-[160px]">
                        {txn.commissionRule}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap font-bold text-emerald-600 dark:text-emerald-400">
                      {formatINR(txn.commissionAmount)}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                      {txn.transactionDate}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getReferralStatusBadge(
                          txn.status
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                        <span>{txn.status}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(txn)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="View Audit Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Status workflow buttons: strict validation against invalid transitions */}
                        {txn.status === 'Pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => approveCommission(txn.transactionId)}
                              className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-semibold text-[11px] border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
                              title="Approve Commission"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenReject(txn)}
                              className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 font-semibold text-[11px] border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                              title="Reject Commission"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {(txn.status === 'Approved' || txn.status === 'Paid') && (
                          <button
                            type="button"
                            onClick={() => handleOpenReverse(txn)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors cursor-pointer"
                            title="Simulate Commission Reversal"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: View Details */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={`Commission Record: ${selectedTxn?.transactionId}`}
        size="md"
      >
        {selectedTxn && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                  {selectedTxn.transactionId}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getReferralStatusBadge(selectedTxn.status)}`}>
                  {selectedTxn.status}
                </span>
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Hospital: <strong>{selectedTxn.referredHospital}</strong>
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Partner: <strong>{selectedTxn.affiliateName}</strong> ({selectedTxn.affiliateId})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[11px]">Eligible Payment:</span>
                <strong className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatINR(selectedTxn.eligiblePaymentAmount)}
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Plan: {selectedTxn.subscriptionPlan}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[11px]">Commission Calculated:</span>
                <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {formatINR(selectedTxn.commissionAmount)}
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Policy: {selectedTxn.commissionRule}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[11px] font-semibold mb-1">
                Audit Notes / History:
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                {selectedTxn.notes || 'Automated system entry recorded upon hospital conversion.'}
              </p>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Reject Commission with Reason */}
      <Modal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        title="Reject Commission Entry"
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              Rejecting commission <strong>{selectedTxn?.transactionId}</strong> will deduct ₹{selectedTxn?.commissionAmount?.toLocaleString('en-IN')} from the pending queue.
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Rejection Reason *
            </label>
            <textarea
              rows={3}
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRejectOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmReject}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Simulate Commission Reversal */}
      <Modal
        isOpen={isReverseOpen}
        onClose={() => setIsReverseOpen(false)}
        title="Simulate Commission Reversal"
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-purple-900 dark:text-purple-200 flex items-start gap-2">
            <RotateCcw className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong>Reversal Simulation:</strong> Simulates clawback of commission for {selectedTxn?.affiliateName} due to clinic subscription chargeback or refund.
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Reversal Reason / Reference
            </label>
            <textarea
              rows={3}
              value={reverseReason}
              onChange={(e) => setReverseReason(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsReverseOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmReverse}
            >
              Confirm Reversal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
