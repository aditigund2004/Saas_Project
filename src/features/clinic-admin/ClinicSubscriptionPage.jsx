import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Sparkles,
  Check,
  Clock,
  Download,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Settings2,
  TrendingUp,
  Building2,
  Users,
  Activity,
  Layers,
  Info,
  CheckCircle2
} from 'lucide-react';
import {
  DEFAULT_FEATURE_CATALOG,
  QUANTITY_ADDONS,
  DEFAULT_USAGE_THRESHOLDS,
  getThresholdStatus
} from '../../services/subscriptionService.js';

export function ClinicSubscriptionPage() {
  const {
    activeClinic,
    plans,
    featureCatalog = DEFAULT_FEATURE_CATALOG,
    thresholdConfigs = DEFAULT_USAGE_THRESHOLDS,
    submitApprovalRequest,
    showToast
  } = useApp();

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlanUpgrade, setSelectedPlanUpgrade] = useState(null);
  const [quotaRequestModal, setQuotaRequestModal] = useState({ isOpen: false, metric: null, requestedAmount: 500, reason: '' });

  const isCustomPlan = activeClinic.isCustomPlan || activeClinic.subscriptionPlanId === 'custom';
  const isPendingApproval = activeClinic.subscriptionStatus === 'Pending Approval' || activeClinic.status === 'Pending Approval';

  const standardPlans = plans.filter((p) => ['starter', 'growth', 'professional'].includes(p.id));
  const currentPlan = isCustomPlan
    ? {
        name: 'Bespoke Custom Plan',
        monthlyPrice: activeClinic.customPlanDetails?.displayPrice || activeClinic.customPlanDetails?.monthlyCost || 3499,
        tagline: 'Tailored modular feature set and capacity limits configured for this facility',
        maxDoctors: (activeClinic.customPlanDetails?.quantities?.extra_doctors || 2) + 2,
        maxBranches: (activeClinic.customPlanDetails?.quantities?.extra_branches || 0) + 1,
        maxStaff: 8
      }
    : plans.find((p) => p.id === activeClinic.subscriptionPlanId) || plans[1];

  // Calculated Real-Time Usage Metrics for Threshold Evaluation
  const usageMetrics = [
    {
      key: 'doctors',
      name: 'Doctor Consultation Seats',
      current: activeClinic.branches?.[0]?.activeDoctorsCount || 4,
      limit: currentPlan.maxDoctors || 5,
      unit: 'Doctors'
    },
    {
      key: 'branches',
      name: 'Active Hospital Branches',
      current: activeClinic.branches?.length || 1,
      limit: currentPlan.maxBranches || 2,
      unit: 'Branches'
    },
    {
      key: 'appointments',
      name: 'Monthly Appointments Booked',
      current: 1420,
      limit: 1500,
      unit: 'Slots'
    },
    {
      key: 'whatsapp',
      name: 'WhatsApp Notifications Sent',
      current: 1120, // Exceeded to demonstrate approval workflow
      limit: 1000,
      unit: 'Messages'
    },
    {
      key: 'emails',
      name: 'Transactional Email Alerts',
      current: 1800,
      limit: 2500,
      unit: 'Emails'
    },
    {
      key: 'patients',
      name: 'Registered Patient Records',
      current: 3900,
      limit: 5000,
      unit: 'Patients'
    },
    {
      key: 'storage',
      name: 'Cloud Medical Document Storage',
      current: 18.5,
      limit: 20,
      unit: 'GB'
    }
  ];

  const handleRequestUpgrade = (plan) => {
    setSelectedPlanUpgrade(plan);
    setIsUpgradeModalOpen(true);
  };

  const handleConfirmUpgrade = () => {
    setIsUpgradeModalOpen(false);
    submitApprovalRequest({
      clinicId: activeClinic.id,
      clinicName: activeClinic.name,
      requestType: 'Standard Plan Switch',
      requestedTier: selectedPlanUpgrade?.name,
      currentCost: currentPlan.monthlyPrice,
      requestedMonthlyCost: selectedPlanUpgrade?.monthlyPrice,
      reason: `Clinic requested switch to ${selectedPlanUpgrade?.name}.`
    });
    showToast(`Upgrade request for ${selectedPlanUpgrade?.name} submitted for Super Admin review.`);
  };

  const handleQuotaUpgradeSubmit = () => {
    if (!quotaRequestModal.metric) return;
    submitApprovalRequest({
      clinicId: activeClinic.id,
      clinicName: activeClinic.name,
      requestType: 'Usage Threshold Exceeded',
      requestedTier: `Quota Expansion: ${quotaRequestModal.metric.name}`,
      currentCost: currentPlan.monthlyPrice,
      requestedMonthlyCost: currentPlan.monthlyPrice + 299,
      reason: quotaRequestModal.reason || `Usage exceeded allowed capacity on ${quotaRequestModal.metric.name} (${quotaRequestModal.metric.current} / ${quotaRequestModal.metric.limit}). Requested +${quotaRequestModal.requestedAmount} ${quotaRequestModal.metric.unit}.`
    });
    setQuotaRequestModal({ isOpen: false, metric: null, requestedAmount: 500, reason: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider">
            SaaS Subscription Status
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Clinic Subscription & Usage Thresholds
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor active tier entitlement limits, usage thresholds, custom plan specifications, and Super Admin approvals.
          </p>
        </div>
      </div>

      {/* Pending Approval Banner (Shown if custom plan or quota upgrade is awaiting Super Admin) */}
      {isPendingApproval && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 text-amber-950 space-y-2 animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-black text-sm">
              Custom Plan Specification · Pending Super Admin Approval
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase ml-auto">
              Under Review
            </span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed font-normal">
            Your customized feature configuration (₹{currentPlan.monthlyPrice.toLocaleString('en-IN')}/mo) has been submitted to platform governance. You have full 14-day free trial sandbox access across all clinical modules while approval is processed.
          </p>
        </div>
      )}

      {/* Current Active Plan Banner */}
      <Card className="p-6 sm:p-8 border-[#15803D] bg-gradient-to-r from-[#F0FDF4] via-white to-[#F0FDF4] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#15803D] text-white uppercase tracking-wider">
                Current Plan: {currentPlan.name}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                14-Day Free Access Active
              </span>
              {isCustomPlan && (
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-200">
                  Custom Feature Architecture
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              ₹{currentPlan.monthlyPrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-slate-500 font-normal">/ month (Billed post-trial)</span>
            </h2>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              {currentPlan.tagline}. Full access to doctor rotas, digital PDF prescriptions, QR authenticity validation, and billing collections.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              className="bg-[#15803D] hover:bg-[#166534] font-bold"
              onClick={() => handleRequestUpgrade(plans[2])}
            >
              Upgrade / Switch Tier
            </Button>
          </div>
        </div>

        {/* Current Limits Quick Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Doctor Seats</span>
            <span className="font-bold text-slate-800">{usageMetrics[0].current} / {usageMetrics[0].limit} Configured</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Branches</span>
            <span className="font-bold text-slate-800">{activeClinic.branches.length} / {currentPlan.maxBranches} Active</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Staff Access</span>
            <span className="font-bold text-slate-800">4 / {currentPlan.maxStaff || 8} Receptionists</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Trial Status</span>
            <span className="font-bold text-[#166534]">Full Access Active</span>
          </div>
        </div>
      </Card>

      {/* Feature Usage Thresholds Dashboard */}
      <Card className="space-y-5">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Live Usage Thresholds & Quota Monitoring
            </h3>
            <p className="text-xs text-slate-500">
              Real-time utilization tracking. Exceeding a configured threshold requires Super Admin capacity approval without silent overcharges.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Policy: Strict Approval Gate
          </span>
        </div>

        <div className="p-4 sm:p-5 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {usageMetrics.map((metric) => {
              const status = getThresholdStatus(metric.current, metric.limit);

              return (
                <div
                  key={metric.key}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    status.isExceeded
                      ? 'border-red-300 bg-red-50/30'
                      : status.status === 'Approaching Limit'
                      ? 'border-amber-300 bg-amber-50/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{metric.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          status.variant === 'danger'
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : status.variant === 'warning'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-[#14532D] border border-emerald-300'
                        }`}
                      >
                        {status.status}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-black text-slate-950 font-mono">
                        {metric.current} / {metric.limit}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{metric.unit}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          status.isExceeded
                            ? 'bg-rose-600'
                            : status.status === 'Approaching Limit'
                            ? 'bg-amber-500'
                            : 'bg-[#15803D]'
                        }`}
                        style={{ width: `${Math.min(100, status.percentage)}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-snug">
                      {status.description}
                    </p>
                  </div>

                  {/* If Exceeded or Approaching: Action Button to Request Quota Upgrade */}
                  {(status.isExceeded || status.status === 'Approaching Limit') && (
                    <div className="pt-3 mt-3 border-t border-slate-100">
                      <Button
                        variant={status.isExceeded ? 'danger' : 'outline'}
                        size="sm"
                        className="w-full text-xs font-bold"
                        onClick={() =>
                          setQuotaRequestModal({
                            isOpen: true,
                            metric,
                            requestedAmount: metric.key === 'whatsapp' ? 500 : 2,
                            reason: `Clinic capacity expansion requested for ${metric.name}.`
                          })
                        }
                      >
                        Request Quota Approval &rarr;
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Plan Comparison Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Compare Standard Subscription Tiers</h3>
            <p className="text-xs text-slate-500">Switch between standard plans or customize a tailored tier</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standardPlans.map((p) => {
            const isCurrent = p.id === activeClinic.subscriptionPlanId && !isCustomPlan;

            return (
              <Card
                key={p.id}
                className={`p-6 border-2 flex flex-col justify-between ${
                  isCurrent ? 'border-[#15803D] ring-2 ring-[#15803D]/20 bg-[#F0FDF4]/30' : 'border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                    {isCurrent && <Badge variant="Active">Current</Badge>}
                  </div>
                  <div>
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      ₹{p.monthlyPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400"> / month</span>
                  </div>
                  <p className="text-xs text-slate-500 min-h-[32px]">{p.tagline}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {p.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  {isCurrent ? (
                    <Button variant="outline" size="sm" disabled className="w-full">
                      Active Plan
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full bg-[#15803D] hover:bg-[#166534] font-bold"
                      onClick={() => handleRequestUpgrade(p)}
                    >
                      Request Switch to {p.name}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Upgrade Request Modal */}
      {isUpgradeModalOpen && selectedPlanUpgrade && (
        <Modal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          title={`Confirm Plan Switch: ${selectedPlanUpgrade.name}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              You are requesting to switch <strong>{activeClinic.name}</strong> to the{' '}
              <strong>{selectedPlanUpgrade.name}</strong> (₹{selectedPlanUpgrade.monthlyPrice.toLocaleString('en-IN')}/month).
            </p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p className="font-semibold text-slate-800">Entitlements:</p>
              <p className="text-slate-600">• Up to {selectedPlanUpgrade.maxDoctors} doctors & {selectedPlanUpgrade.maxBranches} branches</p>
              <p className="text-slate-600">• Full WhatsApp notification triggers</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsUpgradeModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-[#15803D] hover:bg-[#166534] font-bold"
                onClick={handleConfirmUpgrade}
              >
                Submit Switch Request
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Quota Upgrade Request Modal */}
      {quotaRequestModal.isOpen && quotaRequestModal.metric && (
        <Modal
          isOpen={quotaRequestModal.isOpen}
          onClose={() => setQuotaRequestModal({ isOpen: false, metric: null, requestedAmount: 500, reason: '' })}
          title={`Request Quota Expansion: ${quotaRequestModal.metric.name}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Your usage on <strong>{quotaRequestModal.metric.name}</strong> has reached{' '}
              <strong>{quotaRequestModal.metric.current} / {quotaRequestModal.metric.limit} {quotaRequestModal.metric.unit}</strong>. Request additional capacity to prevent operational throttling.
            </p>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Requested Extra Capacity ({quotaRequestModal.metric.unit})
              </label>
              <input
                type="number"
                min="1"
                value={quotaRequestModal.requestedAmount}
                onChange={(e) => setQuotaRequestModal((prev) => ({ ...prev, requestedAmount: Number(e.target.value) }))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Operational Justification</label>
              <textarea
                rows={2}
                value={quotaRequestModal.reason}
                onChange={(e) => setQuotaRequestModal((prev) => ({ ...prev, reason: e.target.value }))}
                placeholder="e.g. Higher seasonal OPD footfall and WhatsApp reminder volume."
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuotaRequestModal({ isOpen: false, metric: null, requestedAmount: 500, reason: '' })}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-[#15803D] hover:bg-[#166534] font-bold"
                onClick={handleQuotaUpgradeSubmit}
              >
                Submit Approval Request
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
