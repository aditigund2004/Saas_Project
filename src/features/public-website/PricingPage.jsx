import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';

export function PricingPage() {
  const { plans } = useApp();
  const [billingInterval, setBillingInterval] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How does the 14-day free trial work?',
      a: 'You get full access to all features (including calendar, digital prescriptions, WhatsApp message simulation, and billing) for 14 days without entering a credit card. You can invite your front desk staff and doctors to test the entire workflow.'
    },
    {
      q: 'Can I add multiple branches later?',
      a: 'Yes. The Professional plan supports up to 3 branches, and the Enterprise plan supports up to 10 branches. You can upgrade seamlessly as your clinic opens satellite centers.'
    },
    {
      q: 'How is WhatsApp messaging integrated?',
      a: 'CliniPulse connects with the WhatsApp Business Platform (via Meta Cloud API). The system uses pre-approved utility templates for confirmations, reminders, and follow-ups. In this frontend demo, message delivery is simulated.'
    },
    {
      q: 'Is prescription QR verification valid offline?',
      a: 'The printed QR code points to your clinic’s secure public verification URL. When scanned by a pharmacy or patient smartphone, the verification page checks the authoritative cryptographic record on the server.'
    },
    {
      q: 'Do you charge a setup or onboarding fee?',
      a: 'No. Onboarding is completely self-serve. Enterprise plans include an assigned implementation specialist for clinical catalog data migration.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Transparent Healthcare SaaS Pricing</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Simple, Predictable Plans for Clinics of All Sizes
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Start with a 14-day free trial. Move your clinic from paper registers to digital management with no upfront setup charges.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingInterval === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annual' : 'monthly')}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              billingInterval === 'annual' ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                billingInterval === 'annual' ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingInterval === 'annual' ? 'text-slate-900' : 'text-slate-400'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => {
          const price =
            billingInterval === 'annual'
              ? Math.round(plan.annualPrice / 12)
              : plan.monthlyPrice;

          return (
            <Card
              key={plan.id}
              className={`p-8 border flex flex-col justify-between relative ${
                plan.isPopular
                  ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/20'
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="pt-2 pb-4 border-b border-slate-100">
<<<<<<< HEAD
                  {plan.discountPercent > 0 && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-400 line-through font-mono">
                        ₹{(plan.originalMonthlyPrice || Math.round(plan.monthlyPrice / (1 - (plan.discountPercent || 20) / 100))).toLocaleString('en-IN')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {plan.discountPercent}% DISCOUNT
                      </span>
                    </div>
                  )}
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <p className="text-[11px] text-blue-700 font-semibold mt-1">
                    Includes 14-Day Full Access Free Trial
                  </p>
                  {billingInterval === 'annual' && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Billed annually at ₹{plan.annualPrice.toLocaleString('en-IN')}/yr
                    </p>
                  )}
                </div>

                {/* Limits summary */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 text-center text-xs">
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">Doctors</span>
                    <span className="font-bold text-slate-800">{plan.maxDoctors}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">Branches</span>
                    <span className="font-bold text-slate-800">{plan.maxBranches}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">Staff Seats</span>
                    <span className="font-bold text-slate-800">{plan.maxStaff}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Included Features</p>
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
<<<<<<< HEAD
                <Link to={`/register/clinic?plan=${plan.id}`}>
                  <Button
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <span>Start 14-Day Free Trial</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
=======
                <Link to={`/register?plan=${plan.id}`}>
                  <Button
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                  >
                    Start 14-Day Free Trial
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Demo notice on pricing */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 max-w-2xl mx-auto">
        <p className="font-semibold text-slate-700">Commercial Deployment Notice</p>
        <p className="mt-0.5">
          All subscription figures shown are configurable illustrative tiers. Production subscriptions integrate with Stripe, Razorpay, or your preferred payment gateway.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-xs">Got questions about onboarding or our trial? We’ve got answers.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-slate-900 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

