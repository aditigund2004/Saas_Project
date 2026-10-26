import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Layers,
  Calendar,
  RefreshCw,
  CreditCard,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Check,
  X,
  Eye,
  Sliders,
  Settings2,
  HelpCircle,
  FileText,
  Building2,
  Activity
} from 'lucide-react';
import {
  DEFAULT_FEATURE_CATALOG,
  QUANTITY_ADDONS,
  DEFAULT_USAGE_THRESHOLDS,
  getThresholdStatus
} from '../../services/subscriptionService.js';

export function PlatformSubscriptionsPage() {
  const {
    clinics,
    plans,
    upgradeClinicSubscription,
    approvalRequests = [],
    approveSubscriptionRequest,
    rejectSubscriptionRequest,
    requestMoreInfo,
    featureCatalog = DEFAULT_FEATURE_CATALOG,
    updateFeaturePrice,
    thresholdConfigs = DEFAULT_USAGE_THRESHOLDS,
    updateThresholdConfig,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals' | 'tenants' | 'pricing_config'
  const [approvalFilter, setApprovalFilter] = useState('all'); // 'all' | 'Pending Approval' | 'Approved' | 'Rejected'

  // Modals
  const [changePlanModal, setChangePlanModal] = useState({ isOpen: false, clinic: null, targetPlanId: '' });
  const [detailModal, setDetailModal] = useState({ isOpen: false, request: null });
  const [rejectionModal, setRejectionModal] = useState({ isOpen: false, request: null, reason: '' });
  const [editPriceModal, setEditPriceModal] = useState({ isOpen: false, feature: null, newPrice: '' });

  // Map tenants subscriptions
  const subscriptions = clinics.map((c) => {
    const isCustom = c.isCustomPlan || c.subscriptionPlanId === 'custom';
    const plan = plans.find((p) => p.id === c.subscriptionPlanId);
    return {
      clinicId: c.id,
      clinicName: c.name,
      specialty: c.specialty,
      planId: c.subscriptionPlanId,
      planName: isCustom ? 'Bespoke Custom Plan' : plan?.name || c.subscriptionPlanId,
      isCustom,
      status: c.subscriptionStatus || (c.isTrial ? 'Trial' : c.status === 'Active' ? 'Active' : 'Suspended'),
      renewalDate: '2026-11-20',
      amount: isCustom
        ? c.customPlanDetails?.displayPrice || c.customPlanDetails?.monthlyCost || 3499
        : plan ? plan.monthlyPrice : 4999,
      cycle: 'Monthly',
      doctorsLimit: isCustom ? (c.customPlanDetails?.quantities?.extra_doctors || 2) + 2 : plan?.maxDoctors || 4,
      branchesLimit: isCustom ? (c.customPlanDetails?.quantities?.extra_branches || 0) + 1 : plan?.maxBranches || 1
    };
  });

  const totalMRR = subscriptions
    .filter((s) => s.status === 'Active')
    .reduce((acc, s) => acc + s.amount, 0);

  const activeCount = subscriptions.filter((s) => s.status === 'Active').length;
  const trialCount = subscriptions.filter((s) => s.status === 'Trial').length;
  const pendingApprovalsCount = approvalRequests.filter((r) => r.status === 'Pending Approval').length;
  const arpu = activeCount > 0 ? Math.round(totalMRR / activeCount) : 0;

  // Filtered approval requests
  const filteredRequests = approvalRequests.filter((r) => {
    if (approvalFilter === 'all') return true;
    return r.status === approvalFilter;
  });

  const handleConfirmPlanChange = () => {
    if (!changePlanModal.clinic || !changePlanModal.targetPlanId) return;
    upgradeClinicSubscription(changePlanModal.clinic.clinicId, changePlanModal.targetPlanId);
    setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' });
  };

  const handleApprove = (req) => {
    approveSubscriptionRequest(req.id, 'Approved by Platform Super Admin.');
    if (detailModal.isOpen) setDetailModal({ isOpen: false, request: null });
  };

  const handleRejectSubmit = () => {
    if (!rejectionModal.request) return;
    rejectSubscriptionRequest(rejectionModal.request.id, rejectionModal.reason || 'Governance criteria not met.');
    setRejectionModal({ isOpen: false, request: null, reason: '' });
    if (detailModal.isOpen) setDetailModal({ isOpen: false, request: null });
  };

  const handlePriceUpdateSubmit = () => {
    if (!editPriceModal.feature || !editPriceModal.newPrice) return;
    updateFeaturePrice(editPriceModal.feature.id, editPriceModal.newPrice);
    setEditPriceModal({ isOpen: false, feature: null, newPrice: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider">
            Governance & Revenue Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Subscription Architecture & Approvals
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Super Admin workflow for reviewing custom hospital plan requests, threshold violations, and modular feature pricing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={() => showToast('Subscription billing & threshold status synchronized.')}
          >
            Sync All Metrics
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Approvals</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 flex items-center gap-2">
            <span>{pendingApprovalsCount}</span>
            {pendingApprovalsCount > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping inline-block" />
            )}
          </div>
          <span className="text-[10px] text-amber-700 font-semibold mt-1 block">
            Custom plans & threshold reviews
          </span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Paid Subs</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{activeCount} Clinics</div>
          <span className="text-[10px] text-[#15803D] font-semibold mt-1 inline-flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 100% on-time renewals
          </span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Run Rate (MRR)</span>
          <div className="text-2xl font-extrabold text-[#15803D] font-mono mt-1">₹{totalMRR.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Normalized monthly recurring sum</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Revenue / Clinic</span>
          <div className="text-2xl font-extrabold text-purple-700 font-mono mt-1">₹{arpu.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Blended tier ARPU</span>
        </Card>
      </div>

      {/* Tab Navigation Controls */}
      <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'approvals'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Subscription Approvals & Threshold Requests</span>
          {pendingApprovalsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
              {pendingApprovalsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tenants')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tenants'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Active Tenant Subscriptions ({subscriptions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pricing_config')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'pricing_config'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>Feature-Based Pricing & Threshold Policy</span>
        </button>
      </div>

      {/* TAB 1: Subscription Approvals & Threshold Requests */}
      {activeTab === 'approvals' && (
        <Card className="space-y-4">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Super Admin Approval Queue
              </h3>
              <p className="text-xs text-slate-500">
                Review and approve custom plan quotes or quota expansion requests before additional limits are provisioned.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              {['all', 'Pending Approval', 'Approved', 'Rejected'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setApprovalFilter(status)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    approvalFilter === status
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All Requests' : status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Hospital / Clinic</th>
                  <th className="p-3.5">Request Type</th>
                  <th className="p-3.5">Requested Tier</th>
                  <th className="p-3.5">Features & Capacity</th>
                  <th className="p-3.5">Requested Monthly</th>
                  <th className="p-3.5">Submitted On</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No approval requests matching the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => {
                    const isPending = req.status === 'Pending Approval';
                    const isThresholdViolation = req.requestType === 'Usage Threshold Exceeded';

                    return (
                      <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5">
                          <div className="font-extrabold text-slate-900">{req.clinicName}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{req.clinicId}</div>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              isThresholdViolation
                                ? 'bg-red-50 text-red-800 border border-red-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {req.requestType}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-800">
                          {req.requestedTier}
                        </td>
                        <td className="p-3.5 text-slate-600">
                          <span className="font-semibold text-slate-900">
                            {req.selectedFeatures?.length || 0} Modules
                          </span>
                          {req.quantities?.extra_doctors > 0 && (
                            <span className="block text-[11px] text-slate-500 font-mono">
                              +{req.quantities.extra_doctors} Extra Doctors
                            </span>
                          )}
                          {req.quantities?.extra_branches > 0 && (
                            <span className="block text-[11px] text-slate-500 font-mono">
                              +{req.quantities.extra_branches} Extra Branches
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono font-black text-slate-900">
                          ₹{req.requestedMonthlyCost?.toLocaleString('en-IN')}/mo
                          {req.currentCost > 0 && (
                            <span className="block text-[10px] text-slate-400 font-normal">
                              Prev: ₹{req.currentCost}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                          {req.submissionDate}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              req.status === 'Approved'
                                ? 'bg-emerald-100 text-[#14532D] border border-emerald-300'
                                : req.status === 'Rejected'
                                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                                : req.status === 'More Info Requested'
                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs h-8 px-2.5"
                              onClick={() => setDetailModal({ isOpen: true, request: req })}
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" /> View Details
                            </Button>

                            {isPending && (
                              <>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="text-xs h-8 px-2.5 bg-[#15803D] hover:bg-[#166534] font-bold"
                                  onClick={() => handleApprove(req)}
                                >
                                  <Check className="w-3.5 h-3.5 mr-1" /> Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="text-xs h-8 px-2 bg-rose-600 hover:bg-rose-700 font-bold"
                                  onClick={() => setRejectionModal({ isOpen: true, request: req, reason: '' })}
                                >
                                  <X className="w-3.5 h-3.5" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 2: Active Tenant Subscriptions */}
      {activeTab === 'tenants' && (
        <Card>
          <CardHeader
            title="Active Tenant Subscriptions"
            subtitle="All connected clinics, active plans, renewal schedules, and tier switching"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Clinic</th>
                  <th className="p-3.5">Specialty</th>
                  <th className="p-3.5">Active Tier</th>
                  <th className="p-3.5">Doctor Limit</th>
                  <th className="p-3.5">Billing Interval</th>
                  <th className="p-3.5">Monthly Fee</th>
                  <th className="p-3.5">Next Renewal</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.map((s) => (
                  <tr key={s.clinicId} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-900">{s.clinicName}</td>
                    <td className="p-3.5 text-slate-600">{s.specialty}</td>
                    <td className="p-3.5">
                      <span
                        className={`uppercase text-[10px] font-bold px-2 py-0.5 rounded border ${
                          s.isCustom
                            ? 'text-purple-800 bg-purple-50 border-purple-200'
                            : 'text-[#166534] bg-[#DCFCE7] border-[#86EFAC]'
                        }`}
                      >
                        {s.planName}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">Up to {s.doctorsLimit} doctors</td>
                    <td className="p-3.5 text-slate-600">{s.cycle}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      ₹{s.amount.toLocaleString('en-IN')}/mo
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono">{s.renewalDate}</td>
                    <td className="p-3.5">
                      <Badge variant={s.status}>{s.status}</Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#15803D] hover:bg-[#F0FDF4] border-[#86EFAC] text-xs"
                        onClick={() =>
                          setChangePlanModal({
                            isOpen: true,
                            clinic: s,
                            targetPlanId: s.planId
                          })
                        }
                      >
                        Change Plan
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: Feature-Based Pricing & Threshold Policy */}
      {activeTab === 'pricing_config' && (
        <div className="space-y-6">
          {/* Feature Price Configuration Table */}
          <Card className="space-y-4">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Modular Feature-Based Price Registry
                </h3>
                <p className="text-xs text-slate-500">
                  Configurable monthly baseline prices and included capacity thresholds for each module.
                </p>
              </div>
              <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#86EFAC]">
                11 Modular Units
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Module ID</th>
                    <th className="p-3.5">Feature Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Monthly Price (₹)</th>
                    <th className="p-3.5">Included Usage Allowance</th>
                    <th className="p-3.5">Classification</th>
                    <th className="p-3.5 text-right">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {featureCatalog.map((feat) => (
                    <tr key={feat.id} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">{feat.id}</td>
                      <td className="p-3.5 font-bold text-slate-900">{feat.name}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {feat.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-black text-[#14532D]">
                        ₹{feat.monthlyPrice}/mo
                      </td>
                      <td className="p-3.5 text-slate-600">{feat.includedLimit}</td>
                      <td className="p-3.5">
                        {feat.isCore ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            Core Clinical
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                            Optional Addon
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2.5"
                          onClick={() => setEditPriceModal({ isOpen: true, feature: feat, newPrice: feat.monthlyPrice })}
                        >
                          Configure Price
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Usage Threshold Policy Rules */}
          <Card className="p-5 space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Usage Threshold & Over-Limit Governance Policy
              </h3>
              <p className="text-xs text-slate-500">
                Rules governing threshold percentages, warning alerts, and automated Super Admin review requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-[#14532D]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  <span>Normal Usage (&lt; 80%)</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Tenants operate without restriction. Metrics display clean green status indicators across all dashboard reports.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Approaching Limit (80% – 99%)</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Warning notifications displayed on clinic dashboard. Clinic owner advised to request quota expansion.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Exceeded (&gt; 100%)</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Triggers Super Admin Approval Workflow. Excess capacity cannot be billed or expanded silently without explicit platform authorization.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* View Request Details Modal */}
      {detailModal.isOpen && detailModal.request && (
        <Modal
          isOpen={detailModal.isOpen}
          onClose={() => setDetailModal({ isOpen: false, request: null })}
          title={`Subscription Request Details: ${detailModal.request.clinicName}`}
          size="lg"
        >
          <div className="space-y-5 text-xs max-h-[75vh] overflow-y-auto pr-1">
            {/* Header Status Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Reference: {detailModal.request.id}
                </span>
                <h4 className="text-base font-black text-slate-900">{detailModal.request.clinicName}</h4>
                <p className="text-[11px] text-slate-500">Submitted: {detailModal.request.submissionDate}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Requested Monthly Fee</span>
                <span className="text-2xl font-black text-[#14532D] font-mono">
                  ₹{detailModal.request.requestedMonthlyCost?.toLocaleString('en-IN')}/mo
                </span>
              </div>
            </div>

            {/* Justification & Clinic Context */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-800 block">Clinic Request Context & Rationale:</span>
              <p className="text-slate-600 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                {detailModal.request.reason}
              </p>
            </div>

            {/* Itemized Feature Breakdown */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block">Configured Modular Features:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {detailModal.request.selectedFeatures?.map((fId) => {
                  const feat = featureCatalog.find((f) => f.id === fId);
                  return (
                    <div key={fId} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">{feat?.name || fId}</span>
                        <span className="text-[10px] text-slate-400">{feat?.category || 'Feature'}</span>
                      </div>
                      <span className="font-mono font-bold text-[#15803D]">
                        ₹{feat?.monthlyPrice || 299}/mo
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantities & Capacity Addons */}
            {detailModal.request.quantities && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">Capacity Addons:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Extra Doctors</span>
                    <strong className="text-slate-800 text-sm">{detailModal.request.quantities.extra_doctors || 0}</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Extra Branches</span>
                    <strong className="text-slate-800 text-sm">{detailModal.request.quantities.extra_branches || 0}</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Extra Storage</span>
                    <strong className="text-slate-800 text-sm">{detailModal.request.quantities.extra_storage || 0} x 10GB</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">WhatsApp Packs</span>
                    <strong className="text-slate-800 text-sm">{detailModal.request.quantities.extra_whatsapp || 0} x 500</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDetailModal({ isOpen: false, request: null })}
              >
                Close
              </Button>

              {detailModal.request.status === 'Pending Approval' ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      requestMoreInfo(detailModal.request.id, 'Super Admin requested hospital facility verification documents.');
                      setDetailModal({ isOpen: false, request: null });
                    }}
                  >
                    Request More Info
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setRejectionModal({ isOpen: true, request: detailModal.request, reason: '' })}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-[#15803D] hover:bg-[#166534] font-bold"
                    onClick={() => handleApprove(detailModal.request)}
                  >
                    Approve Subscription Request
                  </Button>
                </div>
              ) : (
                <span className="font-bold text-slate-500">
                  Decision Recorded: {detailModal.request.status}
                </span>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Reason Modal */}
      {rejectionModal.isOpen && rejectionModal.request && (
        <Modal
          isOpen={rejectionModal.isOpen}
          onClose={() => setRejectionModal({ isOpen: false, request: null, reason: '' })}
          title={`Reject Subscription Request: ${rejectionModal.request.clinicName}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Specify the governance reason for declining this subscription request. The decision will be recorded in the audit trail.
            </p>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Reason for Rejection *</label>
              <textarea
                rows={3}
                value={rejectionModal.reason}
                onChange={(e) => setRejectionModal((prev) => ({ ...prev, reason: e.target.value }))}
                placeholder="e.g. Clinic failed facility licensing check or requested unsupported volume tier."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRejectionModal({ isOpen: false, request: null, reason: '' })}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRejectSubmit}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Feature Price Modal */}
      {editPriceModal.isOpen && editPriceModal.feature && (
        <Modal
          isOpen={editPriceModal.isOpen}
          onClose={() => setEditPriceModal({ isOpen: false, feature: null, newPrice: '' })}
          title={`Configure Feature Price: ${editPriceModal.feature.name}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Adjust the baseline monthly price for <strong>{editPriceModal.feature.name}</strong>. Dynamic custom quotes will recalculate based on this value.
            </p>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Monthly Price (INR) *</label>
              <input
                type="number"
                min="0"
                value={editPriceModal.newPrice}
                onChange={(e) => setEditPriceModal((prev) => ({ ...prev, newPrice: e.target.value }))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-[#15803D] focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditPriceModal({ isOpen: false, feature: null, newPrice: '' })}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-[#15803D] hover:bg-[#166534] font-bold"
                onClick={handlePriceUpdateSubmit}
              >
                Save Feature Price
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Standard Plan Modification Modal */}
      {changePlanModal.isOpen && (
        <Modal
          isOpen={changePlanModal.isOpen}
          onClose={() => setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' })}
          title={`Modify Subscription: ${changePlanModal.clinic?.clinicName}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Select a target SaaS tier for <strong>{changePlanModal.clinic?.clinicName}</strong>. This simulation adjusts branch & doctor quota entitlements immediately.
            </p>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Target Subscription Plan</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plans.map((p) => {
                  const isSelected = changePlanModal.targetPlanId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setChangePlanModal((prev) => ({ ...prev, targetPlanId: p.id }))}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#15803D] bg-[#F0FDF4] ring-2 ring-[#15803D]/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{p.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#15803D]" />}
                      </div>
                      <div className="text-sm font-extrabold text-[#15803D] font-mono mt-1">
                        ₹{p.monthlyPrice.toLocaleString('en-IN')}/mo
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {p.maxDoctors} Doctors · {p.maxBranches} Branch{p.maxBranches > 1 ? 'es' : ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' })}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-[#15803D] hover:bg-[#166534] font-bold"
                onClick={handleConfirmPlanChange}
              >
                Confirm Plan Update
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
