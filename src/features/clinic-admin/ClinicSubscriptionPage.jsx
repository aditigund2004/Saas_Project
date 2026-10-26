import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
<<<<<<< HEAD
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Sparkles,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  CreditCard,
  QrCode,
  Building2,
  Users,
  CheckCircle2,
  Tag
} from 'lucide-react';

export function ClinicSubscriptionPage() {
  const { activeClinic, plans, upgradeClinicSubscription, showToast } = useApp();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlanUpgrade, setSelectedPlanUpgrade] = useState(null);
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState('UPI Instant QR');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);

  const currentPlan = plans.find((p) => p.id === activeClinic.subscriptionPlanId) || plans[0] || {
    id: 'starter',
    name: 'Starter Clinic',
    monthlyPrice: 2499,
    annualPrice: 24990,
    maxDoctors: 2,
    maxBranches: 1,
    maxStaff: 4,
    features: []
  };

  const upgradeTargetPlan =
    plans.find((p) => p.id !== currentPlan.id && (p.isPopular || p.monthlyPrice > currentPlan.monthlyPrice)) ||
    plans.find((p) => p.id !== currentPlan.id) ||
    currentPlan;

  const handleRequestUpgrade = (plan) => {
    setSelectedPlanUpgrade(plan);
    setPaymentSuccessData(null);
    setIsUpgradeModalOpen(true);
  };

  const handlePayAndActivate = () => {
    if (!selectedPlanUpgrade) return;
    setIsProcessingPayment(true);

    const amount =
      billingCycle === 'Annual'
        ? selectedPlanUpgrade.annualPrice
        : selectedPlanUpgrade.monthlyPrice;

    // Simulate instant payment gateway handshake
    setTimeout(() => {
      setIsProcessingPayment(false);
      const res = upgradeClinicSubscription(activeClinic.id, selectedPlanUpgrade.id, {
        amount,
        paymentMethod,
        cycle: billingCycle
      });

      setPaymentSuccessData({
        plan: selectedPlanUpgrade,
        amount,
        cycle: billingCycle,
        invoice: res.invoice,
        paymentMethod
      });
    }, 600);
=======
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
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">SaaS Subscription Status</span>
<<<<<<< HEAD
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic Plan & Subscription Upgrades</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review tier limits, discounts, and upgrade or change your clinic plan immediately upon payment.
=======
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic Plan & 14-Day Free Trial</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review active tier limits, trial expiration countdown, and upgrade requests.
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
              {activeClinic.isTrial ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  14-Day Free Trial Active
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Paid Plan Active
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                ₹{currentPlan.monthlyPrice.toLocaleString('en-IN')}{' '}
                <span className="text-xs text-slate-500 font-normal">/ month</span>
              </h2>
              {currentPlan.discountPercent > 0 && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Tag className="w-2.5 h-2.5" /> {currentPlan.discountPercent}% Discount Applied
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Active quotas: <strong>{currentPlan.maxDoctors} Doctors</strong>,{' '}
              <strong>{currentPlan.maxBranches} Branches</strong>, and{' '}
              <strong>{currentPlan.maxStaff || 4} Receptionists</strong>. You can switch or upgrade tiers at any time; changes take effect immediately upon payment confirmation without admin permission required.
=======
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
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
<<<<<<< HEAD
            {upgradeTargetPlan && upgradeTargetPlan.id !== currentPlan.id && (
              <Button
                variant="primary"
                size="md"
                icon={Zap}
                onClick={() => handleRequestUpgrade(upgradeTargetPlan)}
              >
                Instant Upgrade to {upgradeTargetPlan.name}
              </Button>
            )}
=======
            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              onClick={() => handleRequestUpgrade(plans[2])}
            >
              Upgrade to Enterprise
            </Button>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
            <span className="font-bold text-slate-800">4 / {currentPlan.maxStaff || 4} Receptionists</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Upgrade Mode</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Instant Zero-Waiting
            </span>
=======
            <span className="font-bold text-slate-800">4 / {currentPlan.maxStaff} Receptionists</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Trial Status</span>
            <span className="font-bold text-blue-700">Full Access Mode</span>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          </div>
        </div>
      </Card>

<<<<<<< HEAD
      {/* Plan Comparison Grid with Discounts & Instant Upgrade */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Compare & Switch Subscription Tiers</h3>
            <p className="text-xs text-slate-500">
              Pick any tier. Complete simulated payment to activate higher quotas instantly with zero permission delays.
            </p>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200 shrink-0">
            ⚡ Self-Serve Instant Activation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((p) => {
            const isCurrent = p.id === activeClinic.subscriptionPlanId;
            const discount = p.discountPercent || 0;
            const originalPrice = p.originalMonthlyPrice || (discount > 0 ? Math.round(p.monthlyPrice / (1 - discount / 100)) : p.monthlyPrice);

            return (
              <Card
                key={p.id}
                className={`p-6 border flex flex-col justify-between relative transition-all ${
                  isCurrent
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {p.isPopular && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

=======
      {/* Plan Comparison Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Compare & Switch Subscription Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isCurrent = p.id === activeClinic.subscriptionPlanId;

            return (
              <Card key={p.id} className={`p-6 border flex flex-col justify-between ${isCurrent ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'}`}>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                    {isCurrent && <Badge variant="Active">Current</Badge>}
                  </div>
<<<<<<< HEAD

                  {/* Price Block */}
                  <div>
                    {discount > 0 && originalPrice > p.monthlyPrice && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-semibold text-slate-400 line-through font-mono">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {discount}% OFF
                        </span>
                      </div>
                    )}
                    <span className="text-2xl font-black text-slate-900">₹{p.monthlyPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400"> / month</span>
                  </div>

                  <p className="text-xs text-slate-500 min-h-[32px]">{p.tagline}</p>

                  <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 rounded-xl text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Doctors</span>
                      <span className="font-bold text-slate-800">{p.maxDoctors} Seats</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Branches</span>
                      <span className="font-bold text-slate-800">{p.maxBranches} Hubs</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {p.features.slice(0, 6).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
=======
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">₹{p.monthlyPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400"> / month</span>
                  </div>
                  <p className="text-xs text-slate-500 min-h-[32px]">{p.tagline}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {p.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  {isCurrent ? (
                    <Button variant="outline" size="sm" disabled className="w-full">
<<<<<<< HEAD
                      Current Active Plan
=======
                      Active Plan
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => handleRequestUpgrade(p)}
                    >
<<<<<<< HEAD
                      Switch to {p.name}
=======
                      Request Switch to {p.name}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

<<<<<<< HEAD
      {/* INSTANT UPGRADE & PAYMENT CHECKOUT MODAL (Requirement 29) */}
=======
      {/* Upgrade Request Modal */}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      {isUpgradeModalOpen && selectedPlanUpgrade && (
        <Modal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
<<<<<<< HEAD
          title={
            paymentSuccessData
              ? 'Plan Upgrade Confirmed'
              : `Instant Plan Switch: ${selectedPlanUpgrade.name}`
          }
          size="md"
        >
          {paymentSuccessData ? (
            /* SUCCESS VIEW */
            <div className="space-y-4 text-xs text-center py-2 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Subscription Upgraded Successfully!</h3>
                <p className="text-slate-600 mt-1">
                  Payment of <strong>₹{paymentSuccessData.amount.toLocaleString('en-IN')}</strong> confirmed via {paymentSuccessData.paymentMethod}.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Tier:</span>
                  <span className="font-bold text-emerald-900">{paymentSuccessData.plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor Quota:</span>
                  <span className="font-bold text-slate-800">{paymentSuccessData.plan.maxDoctors} Active Clinicians</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Branch Limit:</span>
                  <span className="font-bold text-slate-800">{paymentSuccessData.plan.maxBranches} Clinical Branches</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax Invoice:</span>
                  <span className="font-mono font-bold text-blue-700">{paymentSuccessData.invoice.invoiceNumber}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-blue-800 text-[11px] flex items-center gap-2 text-left">
                <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Zero admin permission needed. All higher quota allowances and digital features are unlocked immediately.</span>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsUpgradeModalOpen(false)}
              >
                Return to Clinic Dashboard
              </Button>
            </div>
          ) : (
            /* CHECKOUT & PAYMENT VIEW */
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-2.5 text-blue-900">
                <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Instant Activation · No Approval Required</p>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    Upon payment confirmation, your clinic workspace immediately switches to <strong>{selectedPlanUpgrade.name}</strong>.
                  </p>
                </div>
              </div>

              {/* Plan Comparison Summary */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Current Plan:</span>
                  <span className="text-slate-700">{currentPlan.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-blue-900 border-t border-slate-200/80 pt-1.5">
                  <span>Upgrading To:</span>
                  <span className="text-blue-700">{selectedPlanUpgrade.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-[11px]">
                  <div>
                    <span className="text-slate-400 block font-semibold">Doctor Quota</span>
                    <span className="font-bold text-slate-800">
                      {currentPlan.maxDoctors} → {selectedPlanUpgrade.maxDoctors} Doctors
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Branch Quota</span>
                    <span className="font-bold text-slate-800">
                      {currentPlan.maxBranches} → {selectedPlanUpgrade.maxBranches} Branches
                    </span>
                  </div>
                </div>
              </div>

              {/* Billing Cycle Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                  Select Billing Interval
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('Monthly')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      billingCycle === 'Monthly'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs text-slate-800">Monthly Billing</div>
                    <div className="text-sm font-black text-blue-800 font-mono mt-0.5">
                      ₹{selectedPlanUpgrade.monthlyPrice.toLocaleString('en-IN')}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingCycle('Annual')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      billingCycle === 'Annual'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-800">
                      <span>Annual Billing</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-extrabold">
                        2 Mo Free
                      </span>
                    </div>
                    <div className="text-sm font-black text-blue-800 font-mono mt-0.5">
                      ₹{selectedPlanUpgrade.annualPrice.toLocaleString('en-IN')}
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                  Payment Method (Simulated Instant Sandbox)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI Instant QR', 'Credit/Debit Card', 'Net Banking'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded-xl border text-center text-[11px] font-semibold cursor-pointer transition-all ${
                        paymentMethod === method
                          ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Action */}
              <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total To Pay Now</span>
                  <div className="text-lg font-black text-white font-mono">
                    ₹
                    {(billingCycle === 'Annual'
                      ? selectedPlanUpgrade.annualPrice
                      : selectedPlanUpgrade.monthlyPrice
                    ).toLocaleString('en-IN')}
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  icon={Zap}
                  disabled={isProcessingPayment}
                  onClick={handlePayAndActivate}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                >
                  {isProcessingPayment ? 'Processing Gateway...' : 'Pay & Activate Instantly'}
                </Button>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button variant="outline" size="sm" onClick={() => setIsUpgradeModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
=======
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
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        </Modal>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
