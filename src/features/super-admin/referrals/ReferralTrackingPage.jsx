import React, { useState, useMemo } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { formatINR, exportToCSV, getReferralStatusBadge } from './referralUtils';
import {
  GitBranch,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  AlertCircle,
  Building2,
  Calendar,
  Sparkles,
  CreditCard,
  PlayCircle,
  RotateCcw
} from 'lucide-react';

export function ReferralTrackingPage() {
  const { referrals, updateReferralStatus, advanceReferralStage } = useReferral();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);

  // Filtered referrals
  const filteredReferrals = useMemo(() => {
    return referrals.filter((r) => {
      const matchSearch =
        searchTerm === '' ||
        r.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.referralCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || r.referralStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [referrals, searchTerm, statusFilter]);

  const handleOpenTimeline = (refItem) => {
    setSelectedReferral(refItem);
    setIsTimelineModalOpen(true);
  };

  const handleAdvanceStage = (refId) => {
    advanceReferralStage(refId);
    // Refresh modal target from latest state
    setTimeout(() => {
      setSelectedReferral((prev) => {
        if (!prev) return null;
        return referrals.find((r) => r.id === prev.id) || prev;
      });
    }, 50);
  };

  const handleExportCSV = () => {
    exportToCSV(
      'ClinicOS_Referral_Tracking',
      filteredReferrals,
      [
        { label: 'Referral ID', key: 'id' },
        { label: 'Hospital Name', key: 'hospitalName' },
        { label: 'City', key: 'city' },
        { label: 'Hospital Email', key: 'hospitalEmail' },
        { label: 'Affiliate Partner', key: 'affiliateName' },
        { label: 'Referral Code', key: 'referralCode' },
        { label: 'Registration Date', key: 'registrationDate' },
        { label: 'Plan', key: 'subscriptionPlan' },
        { label: 'Subscription Amount (INR)', key: 'subscriptionAmount' },
        { label: 'Subscription Status', key: 'subscriptionStatus' },
        { label: 'Commission Amount (INR)', key: 'commissionAmount' },
        { label: 'Referral Lifecycle Status', key: 'referralStatus' }
      ]
    );
  };

  // Full 7 standard stages definition for reference
  const ALL_STAGES = [
    { step: 1, title: 'Referral link opened', desc: 'Partner attribution link opened from promotion or direct invite' },
    { step: 2, title: 'Hospital registered', desc: 'Doctor administrator registered clinic account with credentials' },
    { step: 3, title: 'Trial started', desc: '14-day fully featured clinical evaluation workspace active' },
    { step: 4, title: 'Subscription selected', desc: 'Selected clinical tier (Starter, Professional, or Enterprise)' },
    { step: 5, title: 'Payment marked successful', desc: 'Demo transaction simulated with banking reference' },
    { step: 6, title: 'Referral marked converted', desc: 'Attributed conversion finalized and recorded in platform database' },
    { step: 7, title: 'Commission marked pending', desc: 'Accrued to Superadmin Ledger awaiting review & payout' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Conversion Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Referral Tracking & Lifecycle
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            End-to-end attribution timeline: from campaign link visit and 14-day trial evaluation to subscription payment conversion.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={handleExportCSV}
        >
          Export Tracking CSV
        </Button>
      </div>

      <ReferralNav />

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hospital name, city, partner, or code..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Registered', 'Trial', 'Converted', 'Rejected', 'Expired'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tracking Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Referral ID</th>
                <th className="py-3 px-3">Hospital / Clinic Tenant</th>
                <th className="py-3 px-3">Affiliate & Code</th>
                <th className="py-3 px-3">Registered Date</th>
                <th className="py-3 px-3">Subscription Tier</th>
                <th className="py-3 px-3">Sub Status</th>
                <th className="py-3 px-3">Commission</th>
                <th className="py-3 px-3">Referral Status</th>
                <th className="py-3 px-4 text-right">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredReferrals.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No hospital referrals match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredReferrals.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => handleOpenTimeline(r)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {r.id}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {r.hospitalName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {r.city} • <span className="text-slate-400">{r.hospitalEmail}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {r.affiliateName}
                      </div>
                      <code className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                        {r.referralCode}
                      </code>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                      {r.registrationDate}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {r.subscriptionPlan}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {formatINR(r.subscriptionAmount)}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          r.subscriptionStatus === 'Active'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                            : r.subscriptionStatus === 'Trial'
                            ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {r.subscriptionStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap font-bold text-emerald-600 dark:text-emerald-400">
                      {formatINR(r.commissionAmount)}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getReferralStatusBadge(
                          r.referralStatus
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                        <span>{r.referralStatus}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenTimeline(r);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 font-medium text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Timeline</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Drawer / Modal: Referral Lifecycle Timeline */}
      <Modal
        isOpen={isTimelineModalOpen}
        onClose={() => setIsTimelineModalOpen(false)}
        title={`Referral Timeline: ${selectedReferral?.hospitalName}`}
        size="lg"
      >
        {selectedReferral && (
          <div className="space-y-4">
            {/* Disclaimer Banner */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Interactive Demonstration Simulation:</strong> These conversion milestones reflect simulated mock events. Real SaaS billing subscriptions operate via payment gateways in production.
              </div>
            </div>

            {/* Overview Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Affiliate Partner:</span>
                <strong className="text-slate-900 dark:text-white">{selectedReferral.affiliateName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Referral Code:</span>
                <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">{selectedReferral.referralCode}</code>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Subscription Plan:</span>
                <strong className="text-slate-900 dark:text-white">{selectedReferral.subscriptionPlan}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Eligible Commission:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{formatINR(selectedReferral.commissionAmount)}</strong>
              </div>
            </div>

            {/* 7-Step Visual Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Attribution & Conversion Milestones
              </h4>

              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {ALL_STAGES.map((st) => {
                  const achieved = selectedReferral.timeline.find((t) => t.step === st.step);
                  const isCurrent = !achieved && selectedReferral.timeline.length + 1 === st.step;

                  return (
                    <div key={st.step} className="relative flex items-start gap-3 text-xs">
                      {/* Step Circle */}
                      <span
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white dark:ring-slate-900 ${
                          achieved
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {achieved ? '✓' : st.step}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h5
                            className={`font-bold ${
                              achieved
                                ? 'text-slate-900 dark:text-white'
                                : isCurrent
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {st.step}. {st.title}
                          </h5>
                          {achieved && (
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">
                              {achieved.date}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {achieved ? achieved.desc : st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions in drawer */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {selectedReferral.timeline.length < 7 && selectedReferral.referralStatus !== 'Rejected' && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={PlayCircle}
                    onClick={() => handleAdvanceStage(selectedReferral.id)}
                  >
                    Simulate Next Stage (Stage {selectedReferral.timeline.length + 1})
                  </Button>
                )}

                {selectedReferral.referralStatus !== 'Converted' && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      updateReferralStatus(selectedReferral.id, 'Converted');
                      setIsTimelineModalOpen(false);
                    }}
                  >
                    Mark Converted Now
                  </Button>
                )}

                {selectedReferral.referralStatus !== 'Rejected' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      updateReferralStatus(selectedReferral.id, 'Rejected');
                      setIsTimelineModalOpen(false);
                    }}
                  >
                    Mark Rejected
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTimelineModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
