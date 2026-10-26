import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Sparkles, Check, Clock, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export function ClinicSubscriptionPage() {
  const { activeClinic, plans, showToast } = useApp();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlanUpgrade, setSelectedPlanUpgrade] = useState(null);

  const currentPlan = plans.find((p) => p.id === activeClinic.subscriptionPlanId) || plans[1];

  const handleRequestUpgrade = (plan) => {
    setSelectedPlanUpgrade(plan);
    setIsUpgradeModalOpen(true);
  };

  const handleConfirmUpgrade = () => {
    setIsUpgradeModalOpen(false);
    showToast(`Upgrade request for ${selectedPlanUpgrade?.name} initiated. Checkout gateway integration pending.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">SaaS Subscription Status</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic Plan & 14-Day Free Trial</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review active tier limits, trial expiration countdown, and upgrade requests.
          </p>
        </div>
      </div>

      {/* Current Active Plan Banner */}
      <Card className="p-6 sm:p-8 border-blue-500 bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wider">
                Current Plan: {currentPlan.name}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                14-Day Free Trial Active
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              ₹{currentPlan.monthlyPrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-slate-500 font-normal">/ month (Billed after trial ends)</span>
            </h2>
            <p className="text-xs text-slate-600 max-w-xl">
              Trial Expiration Date: <strong>06 November 2026 (14 Days Remaining)</strong>. Your clinic currently has active access to multi-branch scheduling, digital PDF prescriptions, QR authenticity validation, and WhatsApp confirmation previews.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              onClick={() => handleRequestUpgrade(plans[2])}
            >
              Upgrade to Enterprise
            </Button>
          </div>
        </div>

        {/* Current Limits Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Doctor Seats</span>
            <span className="font-bold text-slate-800">2 / {currentPlan.maxDoctors} Configured</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Branches</span>
            <span className="font-bold text-slate-800">{activeClinic.branches.length} / {currentPlan.maxBranches} Active</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Staff Access</span>
            <span className="font-bold text-slate-800">4 / {currentPlan.maxStaff} Receptionists</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Trial Status</span>
            <span className="font-bold text-blue-700">Full Access Mode</span>
          </div>
        </div>
      </Card>

      {/* Plan Comparison Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Compare & Switch Subscription Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isCurrent = p.id === activeClinic.subscriptionPlanId;

            return (
              <Card key={p.id} className={`p-6 border flex flex-col justify-between ${isCurrent ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                    {isCurrent && <Badge variant="Active">Current</Badge>}
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">₹{p.monthlyPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400"> / month</span>
                  </div>
                  <p className="text-xs text-slate-500 min-h-[32px]">{p.tagline}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {p.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
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
                      className="w-full"
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
              <p className="font-semibold text-slate-800">Includes:</p>
              <p className="text-slate-600">• Up to {selectedPlanUpgrade.maxDoctors} doctors & {selectedPlanUpgrade.maxBranches} branches</p>
              <p className="text-slate-600">• Full WhatsApp notification triggers</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsUpgradeModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmUpgrade}>
                Confirm Switch Request
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

