import React, { useState, useMemo } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { formatINR, exportToCSV, getReferralStatusBadge } from './referralUtils';
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Download,
  Eye,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  FileCheck2,
  Ban
} from 'lucide-react';

export function PayoutManagementPage() {
  const {
    payouts,
    affiliates,
    approvePayout,
    rejectPayout,
    markPayoutPaid
  } = useReferral();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [affiliateFilter, setAffiliateFilter] = useState('All');

  // Modals state
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [paymentRefInput, setPaymentRefInput] = useState('');

  // Filtered Payouts
  const filteredPayouts = useMemo(() => {
    return payouts.filter((p) => {
      const matchSearch =
        searchTerm === '' ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.paymentReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || p.payoutStatus === statusFilter;
      const matchAffiliate = affiliateFilter === 'All' || p.affiliateId === affiliateFilter;

      return matchSearch && matchStatus && matchAffiliate;
    });
  }, [payouts, searchTerm, statusFilter, affiliateFilter]);

  const handleOpenReview = (payout) => {
    setSelectedPayout(payout);
    setIsReviewOpen(true);
  };

  const handleOpenReject = (payout) => {
    setSelectedPayout(payout);
    setRejectReason('Bank account verification mismatch or tax compliance documentation required.');
    setIsRejectOpen(true);
  };

  const handleOpenMarkPaid = (payout) => {
    setSelectedPayout(payout);
    setPaymentRefInput(`CMS-NEFT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsMarkPaidOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedPayout) {
      rejectPayout(selectedPayout.id, rejectReason);
      setIsRejectOpen(false);
    }
  };

  const handleConfirmMarkPaid = () => {
    if (selectedPayout) {
      markPayoutPaid(selectedPayout.id, paymentRefInput);
      setIsMarkPaidOpen(false);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(
      'ClinicOS_Affiliate_Payouts',
      filteredPayouts,
      [
        { label: 'Payout ID', key: 'id' },
        { label: 'Affiliate Partner', key: 'affiliateName' },
        { label: 'Requested Amount (INR)', key: 'requestedAmount' },
        { label: 'Request Date', key: 'requestDate' },
        { label: 'Payment Method', key: 'paymentMethod' },
        { label: 'Account / Bank Details', key: 'accountDetails' },
        { label: 'Status', key: 'payoutStatus' },
        { label: 'Approved By', key: 'approvedBy' },
        { label: 'Approval Date', key: 'approvalDate' },
        { label: 'Payment Reference (UTR)', key: 'paymentReference' },
        { label: 'Disbursed Date', key: 'processedDate' },
        { label: 'Notes', key: 'notes' }
      ]
    );
  };

  const totalDisbursed = payouts
    .filter((p) => p.payoutStatus === 'Paid')
    .reduce((sum, p) => sum + p.requestedAmount, 0);

  const pendingApprovalAmount = payouts
    .filter((p) => p.payoutStatus === 'Pending')
    .reduce((sum, p) => sum + p.requestedAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Settlement Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Payout Management & Disbursements
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Authorize partner withdrawals, review NEFT/UPI banking profiles, and simulate bank settlement UTR dispatch.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={handleExportCSV}
        >
          Export Payouts CSV
        </Button>
      </div>

      <ReferralNav />

      {/* Prominent Demo Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Simulated Payout Operations:</strong> All actions on this page are strictly frontend demonstrations. Approving or marking a payout as paid updates the mock ledger and generates simulated UTR reference codes. No real bank accounts or money transfers are affected.
        </div>
      </div>

      {/* Top Payout KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
            Total Payout Requests
          </span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {payouts.length}
          </div>
          <span className="text-[11px] text-slate-400">Lifetime volume</span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase">
            Pending Superadmin Review
          </span>
          <div className="text-2xl font-bold text-amber-900 dark:text-amber-200 mt-1">
            {formatINR(pendingApprovalAmount)}
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-400">
            {payouts.filter((p) => p.payoutStatus === 'Pending').length} requests waiting
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase">
            Total Disbursed (Paid)
          </span>
          <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-200 mt-1">
            {formatINR(totalDisbursed)}
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
            {payouts.filter((p) => p.payoutStatus === 'Paid').length} completed cycles
          </span>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <span className="text-xs font-semibold text-blue-800 dark:text-blue-300 uppercase">
            Scheduled / Approved
          </span>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
            {payouts.filter((p) => p.payoutStatus === 'Approved').length} Batches
          </div>
          <span className="text-[11px] text-blue-700 dark:text-blue-400">
            Ready for UTR confirmation
          </span>
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
              placeholder="Search by payout ID, affiliate, UTR, or payment method..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Payout Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={affiliateFilter}
              onChange={(e) => setAffiliateFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Affiliates</option>
              {affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Main Payouts Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Payout ID</th>
                <th className="py-3 px-3">Affiliate Partner</th>
                <th className="py-3 px-3">Requested Amount</th>
                <th className="py-3 px-3">Request Date</th>
                <th className="py-3 px-3">Payment Method</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Approved By</th>
                <th className="py-3 px-3">Payment Reference / UTR</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPayouts.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No payout records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPayouts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {p.id}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {p.affiliateName}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.affiliateId}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {formatINR(p.requestedAmount)}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Prior Bal: {formatINR(p.availableBalanceBefore)}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                      {p.requestDate}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {p.paymentMethod}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getReferralStatusBadge(
                          p.payoutStatus
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                        <span>{p.payoutStatus}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                      <div>{p.approvedBy || 'Pending'}</div>
                      {p.approvalDate && (
                        <div className="text-[10px] text-slate-400">{p.approvalDate}</div>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <code className="text-[11px] font-mono text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[170px]">
                        {p.paymentReference}
                      </code>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenReview(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Review Payout & Banking"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {p.payoutStatus === 'Pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => approvePayout(p.id)}
                              className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-semibold text-[11px] border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
                              title="Approve Payout"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenReject(p)}
                              className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 font-semibold text-[11px] border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                              title="Reject Payout"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {p.payoutStatus === 'Approved' && (
                          <button
                            type="button"
                            onClick={() => handleOpenMarkPaid(p)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer"
                            title="Enter Demo UTR & Mark Paid"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Paid</span>
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

      {/* Modal: Review Payout Details */}
      <Modal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        title={`Payout Review: ${selectedPayout?.id}`}
        size="md"
      >
        {selectedPayout && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                  {selectedPayout.id}
                </span>
                <div className="text-slate-900 dark:text-white font-bold text-sm mt-0.5">
                  {selectedPayout.affiliateName}
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[11px] block">Requested Payout</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {formatINR(selectedPayout.requestedAmount)}
                </span>
              </div>
            </div>

            {/* Banking Details */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Disbursement Destination Details</span>
              </h4>
              <div className="text-slate-700 dark:text-slate-300 font-mono text-[11px] p-2 rounded bg-slate-100 dark:bg-slate-800">
                {selectedPayout.accountDetails}
              </div>
              <div className="text-[11px] text-slate-500">
                Method: <strong>{selectedPayout.paymentMethod}</strong> • Requested on {selectedPayout.requestDate}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[11px] font-semibold mb-1">
                Audit Log & References:
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                {selectedPayout.notes}
              </p>
              {selectedPayout.paymentReference && selectedPayout.paymentReference !== 'Awaiting Authorization' && (
                <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                  Payment Reference: <strong className="text-blue-600 dark:text-blue-400">{selectedPayout.paymentReference}</strong>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              {selectedPayout.payoutStatus === 'Pending' && (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setIsReviewOpen(false);
                      handleOpenReject(selectedPayout);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      approvePayout(selectedPayout.id);
                      setIsReviewOpen(false);
                    }}
                  >
                    Approve Payout
                  </Button>
                </>
              )}
              {selectedPayout.payoutStatus === 'Approved' && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                    setIsReviewOpen(false);
                    handleOpenMarkPaid(selectedPayout);
                  }}
                >
                  Mark as Paid
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReviewOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Reject Payout */}
      <Modal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        title="Reject Payout Request"
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              Rejecting payout <strong>{selectedPayout?.id}</strong> will restore ₹{selectedPayout?.requestedAmount?.toLocaleString('en-IN')} back to {selectedPayout?.affiliateName}&apos;s available balance.
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

      {/* Modal: Mark Demo Payout as Paid (Enter Demo UTR) */}
      <Modal
        isOpen={isMarkPaidOpen}
        onClose={() => setIsMarkPaidOpen(false)}
        title="Disburse Payout & Record UTR Reference"
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>Simulate Bank Settlement:</strong> Disburses ₹{selectedPayout?.requestedAmount?.toLocaleString('en-IN')} to {selectedPayout?.affiliateName} and generates audit trail confirmation.
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Demo UTR / Bank Reference Number *
            </label>
            <input
              type="text"
              required
              value={paymentRefInput}
              onChange={(e) => setPaymentRefInput(e.target.value)}
              placeholder="e.g. CMS-NEFT-20260408-9821"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Auto-generated demo reference format. You can customize before finalizing.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMarkPaidOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={handleConfirmMarkPaid}
            >
              Confirm Disbursement (Simulated)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
