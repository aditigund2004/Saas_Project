import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { ScrollRevealCard } from '../../components/medical/ScrollRevealCard';
import { EcgWaveform } from '../../components/medical/EcgWaveform';


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
      a: 'ClinicOS connects with the WhatsApp Business Platform (via Meta Cloud API). The system uses pre-approved utility templates for confirmations, reminders, and follow-ups. In this frontend demo, message delivery is simulated.'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-16 transition-colors">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Transparent Healthcare SaaS Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Simple, Predictable Plans for Clinics of All Sizes
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">

          Start with a 14-day free trial. Move your clinic from paper registers to digital management with no upfront setup charges.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingInterval === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>

            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annual' : 'monthly')}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              billingInterval === 'annual' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label="Toggle annual or monthly billing"

          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                billingInterval === 'annual' ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingInterval === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">

              Save 20%
            </span>
          </span>
        </div>

        {/* ECG telemetry accent */}
        <EcgWaveform variant="compact" glow={true} className="max-w-md mx-auto pt-2 opacity-60 dark:opacity-75" />
      </div>

      {/* Pricing Cards */}
      <div
        className={`flex flex-wrap justify-center items-stretch gap-6 lg:gap-8 mx-auto ${
          plans.length >= 4 ? 'max-w-7xl' : 'max-w-6xl'
        }`}
      >
        {plans.map((plan, idx) => {

          const price =
            billingInterval === 'annual'
              ? Math.round(plan.annualPrice / 12)
              : plan.monthlyPrice;

          return (
            <ScrollRevealCard
              key={plan.id}
              delay={idx * 90}
              className={`w-full flex flex-col ${
                plans.length === 1
                  ? 'max-w-[420px]'
                  : plans.length === 2
                  ? 'md:w-[calc(50%-1.5rem)] max-w-[420px]'
                  : plans.length === 3
                  ? 'md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[380px]'
                  : 'md:w-[calc(50%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[340px]'
              }`}
            >
              <Card
                className={`p-6 sm:p-8 border flex flex-col justify-between relative h-full w-full ${
                  plan.isPopular
                    ? 'border-blue-500 dark:border-blue-500 shadow-xl ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 shadow-sm'
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
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="pt-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ month</span>
                  </div>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold mt-1">
                    Includes 14-Day Full Access Free Trial
                  </p>
                  {billingInterval === 'annual' && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-300 space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-slate-600 dark:text-slate-400">Billed annually:</span>
                        <span className="font-mono font-bold">₹{plan.annualPrice.toLocaleString('en-IN')}/yr</span>
                      </div>
                      {(plan.monthlyPrice * 12) > plan.annualPrice && (
                        <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 pt-1 border-t border-emerald-200/60 dark:border-emerald-800">
                          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                            <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            Customer Savings:
                          </span>
                          <span className="font-mono text-emerald-950 dark:text-emerald-200 font-extrabold">

                            Save ₹{((plan.monthlyPrice * 12) - plan.annualPrice).toLocaleString('en-IN')}/yr ({Math.round((((plan.monthlyPrice * 12) - plan.annualPrice) / (plan.monthlyPrice * 12)) * 100)}% OFF)
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Limits summary */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center text-xs">
                  <div>
                    <span className="block text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold">Doctors</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{plan.maxDoctors}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold">Branches</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{plan.maxBranches}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold">Staff Seats</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{plan.maxStaff}</span>

                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Included Features</p>
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link to={`/register/clinic?plan=${plan.id}`}>
                  <Button
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                  >
                    Start 14-Day Free Trial
                  </Button>
                </Link>
              </div>
            </Card>
          </ScrollRevealCard>

          );
        })}
      </div>

      {/* Demo notice on pricing */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
        <p className="font-semibold text-slate-700 dark:text-slate-300">Commercial Deployment Notice</p>

        <p className="mt-0.5">
          All subscription figures shown are configurable illustrative tiers. Production subscriptions integrate with Stripe, Razorpay, or your preferred payment gateway.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs">Got questions about onboarding or our trial? We’ve got answers.</p>

        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"

              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"

                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">

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

