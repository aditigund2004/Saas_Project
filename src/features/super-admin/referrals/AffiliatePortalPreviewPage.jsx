import React, { useState, useMemo } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { StatCard } from '../../../components/ui/StatCard';
import { Modal } from '../../../components/ui/Modal';
import { formatINR, copyToClipboard, getReferralStatusBadge } from './referralUtils';
import { useApp } from '../../../context/AppContext';
import {
  Users,
  Copy,
  Check,
  CreditCard,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Sparkles
} from 'lucide-react';

export function AffiliatePortalPreviewPage() {
  const {
    affiliates,
    referrals,
    commissionLedger,
    payouts,
    requestPayout
  } = useReferral();
  const { showToast } = useApp() || { showToast: () => {} };

  // Superadmin view: switch which affiliate is being previewed
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(
    affiliates[0]?.id || 'AFF-101'
  );

  const [activeTab, setActiveTab] = useState('referrals'); // 'referrals' | 'commissions' | 'payouts'
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('Bank Transfer (NEFT/IMPS)');
  const [payoutNotes, setPayoutNotes] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentAffiliate =
    affiliates.find((a) => a.id === selectedAffiliateId) || affiliates[0];

  // Referrals belonging to this affiliate
  const affiliateReferrals = useMemo(() => {
    return referrals.filter((r) => r.affiliateId === currentAffiliate?.id);
  }, [referrals, currentAffiliate]);

  // Commissions belonging to this affiliate
  const affiliateCommissions = useMemo(() => {
    return commissionLedger.filter((l) => l.affiliateId === currentAffiliate?.id);
  }, [commissionLedger, currentAffiliate]);

  // Payouts belonging to this affiliate
  const affiliatePayouts = useMemo(() => {
    return payouts.filter((p) => p.affiliateId === currentAffiliate?.id);
  }, [payouts, currentAffiliate]);

  const referralUrl = `https://clinicos.app/register/clinic?ref=${currentAffiliate?.referralCode || 'PARTNER'}`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(referralUrl);
    if (success) {
      setCopiedLink(true);
      showToast('Referral invitation link copied to clipboard!', 'success');
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      showToast('Could not copy link. Please copy manually.', 'error');
    }
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(currentAffiliate?.referralCode);
    if (success) {
      setCopiedCode(true);
      showToast(`Referral code "${currentAffiliate?.referralCode}" copied!`, 'success');
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      showToast('Could not copy code. Please copy manually.', 'error');
    }
  };

  const handlePayoutSubmit = (e) => {
    e.preventDefault();
    const amountNum = Number(payoutAmount);
    if (!amountNum || amountNum <= 0) {
      showToast('Please enter a valid payout amount.', 'error');
      return;
    }
    if (amountNum > currentAffiliate.availableBalance) {
      showToast(
        `Requested amount exceeds available balance of ${formatINR(currentAffiliate.availableBalance)}`,
        'error'
      );
      return;
    }

    requestPayout({
      affiliateId: currentAffiliate.id,
      amount: amountNum,
      paymentMethod: payoutMethod,
      notes: payoutNotes
    });

    setPayoutAmount('');
    setPayoutNotes('');
    setIsPayoutModalOpen(false);
  };

  const convRate =
    affiliateReferrals.length > 0
      ? Math.round(
          (affiliateReferrals.filter((r) => r.referralStatus === 'Converted').length /
            affiliateReferrals.length) *
            100
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Top Super Admin Simulator Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-950 text-white border border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold tracking-tight">
                Affiliate Partner Portal
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-800 text-indigo-200 border border-indigo-700 uppercase tracking-wider">
                Simulated Partner View
              </span>
            </div>
            <p className="text-xs text-indigo-300">
              This preview demonstrates the exact self-service portal experience for external healthcare affiliates.
            </p>
          </div>
        </div>

        {/* Affiliate Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-indigo-300">Preview As:</span>
          <select
            value={selectedAffiliateId}
            onChange={(e) => setSelectedAffiliateId(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {affiliates.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.partnerType})
              </option>
            ))}
          </select>
        </div>
      </div>

      <ReferralNav />

      {/* Affiliate Welcome & Shareable Link Card */}
      <Card className="p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Welcome back
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-0.5 tracking-tight">
              {currentAffiliate?.name}
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-xl">
              {currentAffiliate?.company} • Partner Tier: <strong>{currentAffiliate?.partnerType}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            <Button
              variant="white"
              size="sm"
              icon={Wallet}
              onClick={() => setIsPayoutModalOpen(true)}
              disabled={currentAffiliate?.availableBalance <= 0}
            >
              Request Payout
            </Button>
          </div>
        </div>

        {/* Referral Code & URL pill container */}
        <div className="mt-4 pt-4 border-t border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-blue-100 font-semibold">Your Referral Code:</span>
            <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 font-mono font-bold">
              <span>{currentAffiliate?.referralCode}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1 hover:text-blue-200 transition-colors cursor-pointer"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-blue-100 font-semibold shrink-0">Direct Link:</span>
            <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 font-mono text-[11px] truncate max-w-md">
              <span className="truncate">{referralUrl}</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1 hover:text-blue-200 transition-colors shrink-0 cursor-pointer"
                title="Copy Link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Partner Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-bold block">Total Referrals</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {affiliateReferrals.length}
          </div>
          <span className="text-[10px] text-slate-400">Hospitals onboarded</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-bold block">Converted</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {affiliateReferrals.filter((r) => r.referralStatus === 'Converted').length}
          </div>
          <span className="text-[10px] text-slate-400">Paid subscriptions</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-bold block">Conversion Rate</span>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {convRate}%
          </div>
          <span className="text-[10px] text-slate-400">Lead yield</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-bold block">Total Earnings</span>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {formatINR(currentAffiliate?.totalCommissionEarned || 0)}
          </div>
          <span className="text-[10px] text-slate-400">Lifetime accrued</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-bold block">Pending</span>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            {formatINR(currentAffiliate?.pendingCommission || 0)}
          </div>
          <span className="text-[10px] text-slate-400">Under verification</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-bold block">Total Paid</span>
          <div className="text-xl font-bold text-slate-700 dark:text-slate-300 mt-1">
            {formatINR(currentAffiliate?.paidCommission || 0)}
          </div>
          <span className="text-[10px] text-slate-400">Disbursed via bank</span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <span className="text-[11px] text-emerald-800 dark:text-emerald-300 uppercase font-bold block">Available Balance</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {formatINR(currentAffiliate?.availableBalance || 0)}
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300">Ready for payout</span>
        </div>
      </div>

      {/* Tabbed History Section */}
      <Card className="overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
          <button
            type="button"
            onClick={() => setActiveTab('referrals')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'referrals'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Referred Hospitals ({affiliateReferrals.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('commissions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'commissions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Commission Ledger ({affiliateCommissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payouts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'payouts'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Payout History ({affiliatePayouts.length})
          </button>
        </div>

        {/* Tab 1: Referrals */}
        {activeTab === 'referrals' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Hospital Name</th>
                  <th className="py-2.5 px-3">City</th>
                  <th className="py-2.5 px-3">Registered Date</th>
                  <th className="py-2.5 px-3">Subscription Plan</th>
                  <th className="py-2.5 px-3">Commission</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {affiliateReferrals.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-slate-500">
                      No referrals registered under this partner yet.
                    </td>
                  </tr>
                ) : (
                  affiliateReferrals.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                        {r.hospitalName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{r.city}</td>
                      <td className="py-2.5 px-3 text-slate-500">{r.registrationDate}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {r.subscriptionPlan}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                        {formatINR(r.commissionAmount)}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getReferralStatusBadge(r.referralStatus)}`}>
                          <span>{r.referralStatus}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Commissions */}
        {activeTab === 'commissions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Txn ID</th>
                  <th className="py-2.5 px-3">Hospital</th>
                  <th className="py-2.5 px-3">Payment Amount</th>
                  <th className="py-2.5 px-3">Commission</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {affiliateCommissions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-slate-500">
                      No commission records yet.
                    </td>
                  </tr>
                ) : (
                  affiliateCommissions.map((c) => (
                    <tr key={c.transactionId} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-mono text-blue-600 dark:text-blue-400">
                        {c.transactionId}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {c.referredHospital}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        {formatINR(c.eligiblePaymentAmount)}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                        {formatINR(c.commissionAmount)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{c.transactionDate}</td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getReferralStatusBadge(c.status)}`}>
                          <span>{c.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Payouts */}
        {activeTab === 'payouts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Payout ID</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Requested Date</th>
                  <th className="py-2.5 px-3">Payment Method</th>
                  <th className="py-2.5 px-3">Reference / UTR</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {affiliatePayouts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-slate-500">
                      No payout requests filed by this partner.
                    </td>
                  </tr>
                ) : (
                  affiliatePayouts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-mono text-blue-600 dark:text-blue-400">
                        {p.id}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                        {formatINR(p.requestedAmount)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{p.requestDate}</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        {p.paymentMethod}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        {p.paymentReference}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getReferralStatusBadge(p.payoutStatus)}`}>
                          <span>{p.payoutStatus}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal: Request Payout Simulation */}
      <Modal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        title="Request Commission Payout"
        size="md"
      >
        <form onSubmit={handlePayoutSubmit} className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
            Available Balance for Withdrawal:{' '}
            <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {formatINR(currentAffiliate?.availableBalance)}
            </strong>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Requested Amount (₹) *
            </label>
            <input
              type="number"
              required
              min="1000"
              max={currentAffiliate?.availableBalance}
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              placeholder={`Max: ${currentAffiliate?.availableBalance}`}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Settlement Method
            </label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer (NEFT/IMPS)</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Notes / Instructions
            </label>
            <textarea
              rows={2}
              value={payoutNotes}
              onChange={(e) => setPayoutNotes(e.target.value)}
              placeholder="e.g. Monthly settlement for March hospital leads"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPayoutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Submit Payout Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
