import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Tag,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  Building2,
  Check,
  Activity
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function SubscriptionCheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { plans, activeClinic, upgradeClinicSubscription, showToast } = useApp();

  const planId = searchParams.get('plan') || 'professional';
  const selectedPlan = plans.find((p) => p.id === planId) || plans[1] || plans[0];

  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Pricing math
  const baseMonthly = selectedPlan?.monthlyPrice || 4499;
  const baseAnnual = selectedPlan?.annualPrice || baseMonthly * 10;
  const rawTotal = billingCycle === 'annual' ? baseAnnual : baseMonthly;
  const discountAmount = Math.round(rawTotal * appliedDiscount);
  const subtotal = rawTotal - discountAmount;
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'CLINICOS50' || code === 'FIRSTCLINIC' || code === 'SAVE50') {
      setAppliedDiscount(0.5);
      setCouponMessage('50% Special Founder Discount Applied!');
      showToast('Coupon CLINICOS50 applied: 50% discount!', 'success');
    } else if (code === 'WELCOME2026' || code === 'FIRSTCLINIC') {
      setAppliedDiscount(0.2);
      setCouponMessage('20% Welcome Clinic Discount Applied!');
      showToast('Coupon applied: 20% discount!', 'success');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid or expired coupon code. Try CLINICOS50');
      showToast('Invalid coupon code. Try CLINICOS50', 'error');
    }
  };

  const handleSimulatePayment = () => {
    if (!termsAccepted) {
      showToast('Please accept the Master SaaS Subscription Terms.', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      if (activeClinic) {
        upgradeClinicSubscription(activeClinic.id, selectedPlan.id);
      }
      showToast(`🎉 Subscription activated for ${selectedPlan.name}!`, 'success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Clinic<span className="text-blue-600">OS</span> Checkout
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Simulated 256-Bit SSL Checkout</span>
          </div>
        </div>

        {paymentSuccess ? (
          /* Payment Success Confirmation */
          <Card className="p-8 sm:p-12 border-slate-200 dark:border-slate-800 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Simulated Payment Successful
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Subscription Activated!
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your clinic is now on the <strong>{selectedPlan.name}</strong> ({billingCycle} billing). All multi-tenant features and online website publishing are live.
              </p>
            </div>

            <div className="max-w-sm mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span>Receipt Number:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">INV-2026-{Date.now().toString().slice(-4)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Amount Paid:</span>
                <span className="font-bold text-emerald-600">₹{grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Plan Duration:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {billingCycle === 'annual' ? '365 Days (1 Year)' : '30 Days'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link to="/app/dashboard">
                <Button variant="primary" size="lg" className="font-bold text-xs bg-blue-600 shadow-md">
                  Open Clinic Dashboard →
                </Button>
              </Link>
              <Link to="/app/website-builder">
                <Button variant="outline" size="lg" className="font-bold text-xs">
                  Customize Clinic Website
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          /* Checkout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Plan & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Billing Cycle Switch */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Select Billing Cycle
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    Annual saves 17%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      billingCycle === 'annual'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                      <span>Annual Billing</span>
                      <Check className={`w-3.5 h-3.5 text-blue-600 ${billingCycle === 'annual' ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">₹{baseAnnual.toLocaleString()} / year</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">2 months free</span>
                  </button>

                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                      <span>Monthly Billing</span>
                      <Check className={`w-3.5 h-3.5 text-blue-600 ${billingCycle === 'monthly' ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">₹{baseMonthly.toLocaleString()} / month</p>
                    <span className="text-[10px] text-slate-400">Standard monthly recurring</span>
                  </button>
                </div>
              </Card>

              {/* Payment Methods Simulation */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Simulated Payment Gateway
                  </h3>
                  <p className="text-xs text-slate-500">
                    No real money will be charged. This demonstrates full SaaS checkout UX.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'upi', label: 'UPI / QR Code', icon: Sparkles },
                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'netbanking', label: 'NetBanking', icon: Building2 }
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSel = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSel
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-bold'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px]">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'upi' ? (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 text-xs space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Virtual Payment Address (VPA) / UPI ID
                    </label>
                    <input
                      type="text"
                      defaultValue="doctor.name@okaxis"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900"
                    />
                  </div>
                ) : paymentMethod === 'card' ? (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 text-xs space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Card Number (Simulated)
                    </label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 text-xs space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Select Bank
                    </label>
                    <select className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400">
                    I agree to the SaaS Subscription Agreement and Clinic Data Processing Terms.
                  </label>
                </div>
              </Card>
            </div>

            {/* Right Column: Order Summary & Coupon */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedPlan.name}
                    </h3>
                    <p className="text-[11px] text-slate-500">{selectedPlan.tagline}</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                    {billingCycle}
                  </span>
                </div>

                {/* Coupon Box */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Promotional Discount Code
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Try: CLINICOS50"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs uppercase font-mono bg-white dark:bg-slate-900"
                    />
                    <Button variant="outline" size="sm" type="submit" className="text-xs">
                      Apply
                    </Button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-[11px] ${
                        appliedDiscount > 0 ? 'text-emerald-600 font-semibold' : 'text-rose-500'
                      }`}
                    >
                      {couponMessage}
                    </p>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Base Subscription ({billingCycle})</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₹{rawTotal.toLocaleString()}
                    </span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-semibold">
                      <span>Discount ({Math.round(appliedDiscount * 100)}%)</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>GST (18%)</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₹{gstAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-base font-extrabold text-slate-900 dark:text-white">
                    <span>Total Amount</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl cursor-pointer"
                >
                  {isProcessing ? 'Simulating Payment...' : `Simulate Payment of ₹${grandTotal.toLocaleString()} →`}
                </Button>

                <p className="text-[10px] text-center text-slate-400">
                  Safe demo mode. No charges are incurred.
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

