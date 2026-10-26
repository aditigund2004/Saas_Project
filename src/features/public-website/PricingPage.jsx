import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Settings2,
  Sliders,
  ShieldCheck,
  Info,
  Building2,
  Users,
  Activity,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../context/AppContext';
import {
  DEFAULT_FEATURE_CATALOG,
  QUANTITY_ADDONS,
  calculateCustomPlanPrice
} from '../../services/subscriptionService.js';

export function PricingPage() {
  const { plans, featureCatalog = DEFAULT_FEATURE_CATALOG } = useApp();
  const [billingInterval, setBillingInterval] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  // Custom Plan Modal Calculator State
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([
    'patient_management',
    'doctor_staff_management',
    'appointment_scheduling',
    'digital_prescriptions_qr',
    'whatsapp_notifications'
  ]);
  const [quantities, setQuantities] = useState({
    extra_doctors: 1,
    extra_branches: 0,
    extra_storage: 1,
    extra_whatsapp: 0
  });

  const customQuote = useMemo(() => {
    return calculateCustomPlanPrice(selectedFeatures, quantities, billingInterval, featureCatalog);
  }, [selectedFeatures, quantities, billingInterval, featureCatalog]);

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
  };

  const updateQuantity = (key, delta) => {
    setQuantities((prev) => {
      const current = prev[key] || 0;
      return { ...prev, [key]: Math.max(0, current + delta) };
    });
  };

  // The 3 standard primary subscription plans
  const displayStandardPlans = plans.filter((p) => ['starter', 'growth', 'professional'].includes(p.id));

  const faqs = [
    {
      q: 'How does the 14-day free trial work?',
      a: 'You get full access to all features (including calendar, digital prescriptions, WhatsApp message simulation, and billing) for 14 days without entering a credit card. You can invite your front desk staff and doctors to test the entire workflow.'
    },
    {
      q: 'How does "Customize Your Plan" work?',
      a: 'If your hospital has specific requirements (such as needing multi-branch coordination and inventory without marketing email suites), you can select individual features, configure doctor and branch quotas, and submit a tailored specification. Super Admin evaluates and approves the bespoke subscription tier.'
    },
    {
      q: 'Can I add multiple branches later?',
      a: 'Yes. The Growth plan supports 2 branches, Professional supports 4 branches, and our Customize Your Plan option allows configuring as many satellite clinics as your healthcare network requires.'
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
      a: 'No. Onboarding is completely self-serve with zero upfront charges. Custom plan configurations are reviewed by platform governance with transparent, itemized feature pricing.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 w-full">
      {/* Header — Large Font & High Contrast Green Healthcare Theme */}
      <div className="text-center max-w-3xl mx-auto space-y-5 animate-fade-in">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F0FDF4] text-[#166534] text-xs sm:text-sm font-extrabold border-2 border-[#DCFCE7] shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#15803D] animate-pulse" />
          <span>Transparent Healthcare SaaS Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Simple, Predictable Plans for Clinics of All Sizes
        </h1>
        <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
          Start with a 14-day free trial on our three standard tiers, or customize a bespoke feature package tailored to your hospital network.
        </p>

        {/* Monthly vs Annual Toggle with Pill Animation */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <span className={`text-sm font-extrabold transition-colors ${billingInterval === 'monthly' ? 'text-slate-950' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annual' : 'monthly')}
            className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer shadow-inner ${
              billingInterval === 'annual' ? 'bg-[#15803D]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                billingInterval === 'annual' ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm font-extrabold flex items-center gap-2 transition-colors ${billingInterval === 'annual' ? 'text-slate-950' : 'text-slate-400'}`}>
            <span>Annual Commitment</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shadow-2xs">
              Save 15%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid — 3 Standard Plans + 4th Option "Customize Your Plan" */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
        {displayStandardPlans.map((plan) => {
          const price =
            billingInterval === 'annual'
              ? Math.round(plan.annualPrice / 12)
              : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`p-7 sm:p-8 rounded-3xl bg-white border-2 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-2.5 ${
                plan.isPopular
                  ? 'border-[#15803D] shadow-2xl ring-4 ring-[#15803D]/15'
                  : 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#DCFCE7]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-black bg-[#15803D] text-white shadow-md uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-black text-slate-950 tracking-tight">{plan.name}</h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1.5 min-h-[36px]">{plan.tagline}</p>
                </div>

                <div className="pt-2 pb-4 border-b-2 border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">/ month</span>
                  </div>
                  <p className="text-xs text-[#166534] font-extrabold mt-1">
                    Includes 14-Day Full Free Access
                  </p>
                  {billingInterval === 'annual' && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between font-bold">
                      <span className="text-slate-600">Billed yearly:</span>
                      <span className="font-mono text-emerald-900 font-black">₹{plan.annualPrice.toLocaleString('en-IN')}/yr</span>
                    </div>
                  )}
                </div>

                {/* Limits Summary Matrix */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-slate-50 text-center text-xs border border-slate-100">
                  <div>
                    <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Doctors</span>
                    <span className="font-black text-slate-950 text-sm">{plan.maxDoctors}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Branches</span>
                    <span className="font-black text-slate-950 text-sm">{plan.maxBranches}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Staff</span>
                    <span className="font-black text-slate-950 text-sm">{plan.maxStaff}</span>
                  </div>
                </div>

                {/* Included Features List */}
                <div className="space-y-2.5">
                  <p className="text-xs font-black text-slate-950 uppercase tracking-wider">Included Features</p>
                  {plan.features.slice(0, 7).map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                      <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link to={`/register/clinic?plan=${plan.id}`}>
                  <Button
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full h-11 text-xs sm:text-sm font-black shadow-md hover:scale-102 transition-all"
                  >
                    Start 14-Day Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Option 4: Customize Your Plan Card */}
        <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4]/40 border-2 border-[#15803D] shadow-xl flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-2.5">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1 rounded-full text-xs font-black bg-emerald-800 text-white shadow-md uppercase tracking-wider flex items-center gap-1.5">
              <Settings2 className="w-3.5 h-3.5 text-emerald-300" />
              Tailored Architecture
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-black text-slate-950 tracking-tight">Customize Your Plan</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1.5 min-h-[36px]">
                Build a bespoke package tailored to your exact doctor count, branches, and modular capabilities.
              </p>
            </div>

            <div className="pt-2 pb-4 border-b-2 border-slate-100">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight font-mono">
                  ₹{customQuote.displayPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  {billingInterval === 'annual' ? '/ mo (annual)' : '/ month (est.)'}
                </span>
              </div>
              <p className="text-xs text-[#166534] font-extrabold mt-1">
                Dynamic Pricing with Super Admin Approval
              </p>
              <div className="mt-2.5 p-2.5 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-xs text-[#14532D] font-bold">
                {selectedFeatures.length} Modular Features Configured
              </div>
            </div>

            {/* Matrix preview */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-emerald-50/70 text-center text-xs border border-emerald-200">
              <div>
                <span className="block text-emerald-700 text-[10px] uppercase font-bold tracking-wider">Features</span>
                <span className="font-black text-[#14532D] text-sm">Modular</span>
              </div>
              <div>
                <span className="block text-emerald-700 text-[10px] uppercase font-bold tracking-wider">Quota</span>
                <span className="font-black text-[#14532D] text-sm">Custom</span>
              </div>
              <div>
                <span className="block text-emerald-700 text-[10px] uppercase font-bold tracking-wider">Review</span>
                <span className="font-black text-amber-700 text-xs">Governance</span>
              </div>
            </div>

            {/* Custom Highlights List */}
            <div className="space-y-2.5">
              <p className="text-xs font-black text-slate-950 uppercase tracking-wider">Custom Architecture Perks</p>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>Individually priced selectable features</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>Custom doctor & branch scale sliders</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>Transparent dynamic order breakdown</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>Instant 14-day evaluation sandbox</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full h-11 text-xs sm:text-sm font-bold border-2 border-[#15803D] text-[#15803D] hover:bg-[#F0FDF4]"
            >
              Open Interactive Price Calculator
            </Button>
            <Link to="/register/clinic?plan=custom" className="block w-full">
              <Button
                variant="primary"
                size="lg"
                className="w-full h-11 text-xs sm:text-sm font-black shadow-md hover:scale-102 transition-all"
              >
                Register with Custom Plan &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Custom Plan Modal Calculator */}
      {isCustomModalOpen && (
        <Modal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          title="Interactive Custom Plan Price Calculator"
          size="lg"
        >
          <div className="space-y-6 text-xs max-h-[75vh] overflow-y-auto pr-1">
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#86EFAC] text-[#14532D] space-y-1">
              <span className="font-bold text-sm block">Live Healthcare SaaS Pricing Simulator</span>
              <p className="text-xs text-[#166534]">
                Toggle features on/off and fine-tune capacity addons. The estimated subscription total updates dynamically.
              </p>
            </div>

            {/* Feature Selection */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Select Individual Features (11 Available)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureCatalog.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                        isChecked
                          ? 'border-[#15803D] bg-white shadow-2xs'
                          : 'border-slate-200 bg-slate-50 opacity-75'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFeature(feat.id)}
                        className="w-4 h-4 text-[#15803D] rounded border-slate-300 focus:ring-[#15803D] mt-0.5 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-900 truncate">{feat.name}</span>
                          <span className="font-mono font-bold text-[#15803D]">₹{feat.monthlyPrice}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{feat.description}</p>
                        <span className="text-[10px] text-[#166534] font-semibold mt-1 block">
                          {feat.includedLimit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Capacity Addons */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-sm text-slate-900">Scale Add-ons</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUANTITY_ADDONS.map((addon) => {
                  const qty = quantities[addon.id] || 0;
                  return (
                    <div
                      key={addon.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-slate-900 block truncate">{addon.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono">+₹{addon.unitPrice} {addon.unitLabel}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(addon.id, -1)}
                          disabled={qty <= addon.min}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold w-5 text-center text-slate-900">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(addon.id, 1)}
                          disabled={qty >= addon.max}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Total Box */}
            <div className="p-4 rounded-2xl bg-[#062412] text-white flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  Live Dynamic Quotation ({selectedFeatures.length} features selected)
                </span>
                <div className="text-2xl font-black text-emerald-300 font-mono">
                  ₹{customQuote.displayPrice.toLocaleString('en-IN')}{' '}
                  <span className="text-xs text-slate-300 font-normal">/ month</span>
                </div>
              </div>

              <Link to="/register/clinic?plan=custom">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="bg-[#15803D] hover:bg-[#166534] font-bold text-xs shadow-md"
                >
                  Proceed with Custom Plan &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}

      {/* Commercial Deployment Notice */}
      <div className="p-5 rounded-3xl bg-slate-100/80 border-2 border-slate-200 text-center text-sm text-slate-600 max-w-2xl mx-auto font-medium">
        <p className="font-bold text-slate-900">Commercial Deployment Notice</p>
        <p className="mt-1">
          All subscription plans include a fully functional 14-day free trial. Custom plan specifications are reviewed by platform governance with transparent, feature-based invoices.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-8 pt-4">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-base font-normal">Got questions about onboarding or our trial? We’ve got answers.</p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between text-base font-bold text-slate-950 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#15803D]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-700 leading-relaxed border-t-2 border-slate-100 pt-4 font-normal animate-fade-in">
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
