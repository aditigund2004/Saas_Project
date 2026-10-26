import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Activity,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Users,
  Check,
  Sliders,
  Settings2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  Clock,
  Plus,
  Minus,
  Lock,
  Hourglass,
  RotateCcw,
  Info,
  ChevronRight
} from 'lucide-react';
import {
  DEFAULT_FEATURE_CATALOG,
  QUANTITY_ADDONS,
  calculateCustomPlanPrice
} from '../../services/subscriptionService.js';

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const selectedPlanParam = searchParams.get('plan') || 'professional';

  const {
    onboardNewClinic,
    featureCatalog = DEFAULT_FEATURE_CATALOG,
    approvalRequests = [],
    approveSubscriptionRequest,
    switchRole,
    showToast
  } = useApp();

  const navigate = useNavigate();

  // Wizard Steps: 1: Clinic Profile, 2: Capacity, 3: Plan Selection & Custom Builder, 4: Submission & Approval State
  const [step, setStep] = useState(searchParams.get('step') ? Number(searchParams.get('step')) : 1);

  const [form, setForm] = useState({
    clinicName: 'Metro Multispecialty Dental Center',
    ownerName: 'Dr. Rajesh Patel, MDS',
    specialty: 'Dental',
    doctorCount: 4,
    branchCount: 1,
    city: 'Mumbai',
    phone: '+91 98200 12345',
    email: 'admin@metrodental.demo',
    planId: selectedPlanParam
  });

  // Custom Plan Builder State
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

  const [billingInterval, setBillingInterval] = useState('monthly');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [createdClinic, setCreatedClinic] = useState(null);

  // The 3 standard subscription plans from product requirements
  const standardPlans = [
    {
      id: 'starter',
      name: 'Starter Clinic',
      price: '₹2,499',
      annualPrice: '₹24,990',
      period: '/ month',
      desc: 'Best for solo practitioners & startup dental / specialty clinics',
      limits: 'Up to 2 Doctors · 1 Branch',
      features: [
        'Up to 2 Doctor Consultation Seats',
        'Single Branch Operations',
        'Online & Walk-In Calendar Booking',
        'Tamper-Evident QR Digital Prescriptions',
        'Daily Reception Walk-in Queue',
        'Standard Financial & Patient Reports'
      ],
      popular: false
    },
    {
      id: 'growth',
      name: 'Growth Practice',
      price: '₹4,499',
      annualPrice: '₹44,990',
      period: '/ month',
      desc: 'Ideal for expanding multi-doctor practices and growing footfall',
      limits: 'Up to 5 Doctors · 2 Branches',
      features: [
        'Up to 5 Doctor Consultation Profiles',
        '2 Branch Operations & Instant Switching',
        'Automated WhatsApp Booking Reminders',
        'Itemized Billing & Tax Invoicing',
        'Clinical Inventory & Stock Triggers',
        'Direct Email & Chat Support'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Multi-Specialty',
      price: '₹7,999',
      annualPrice: '₹69,990',
      period: '/ month',
      desc: 'Complete operational cockpit for high-volume multi-specialty polyclinics',
      limits: 'Up to 12 Doctors · 4 Branches',
      features: [
        'Up to 12 Doctors & 4 Branch Networks',
        'Multi-Branch Switching & Central Patient Chart',
        'Automated WhatsApp Confirmations & Follow-Ups',
        'Full Digital Rx Builder with Drug Presets',
        'QR Authenticity Verification Portal',
        'Departmental Revenue Analytics & Audit Trail'
      ],
      popular: true
    }
  ];

  // Dynamic Custom Price Calculation
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
      const next = Math.max(0, current + delta);
      return { ...prev, [key]: next };
    });
  };

  const handleFinishOnboarding = () => {
    const isCustom = form.planId === 'custom';

    const customPlanDetails = isCustom
      ? {
          selectedFeatures: customQuote.selectedFeatures,
          quantities,
          billingInterval,
          displayPrice: customQuote.displayPrice,
          netMonthly: customQuote.netMonthly,
          annualTotal: customQuote.annualTotal,
          discountAmount: customQuote.discountAmount,
          itemizedBreakdown: customQuote.itemizedBreakdown
        }
      : null;

    const newClinic = onboardNewClinic({
      clinicName: form.clinicName,
      ownerName: form.ownerName,
      specialty: form.specialty,
      doctorCount: form.doctorCount,
      branchCount: form.branchCount,
      city: form.city,
      phone: form.phone,
      email: form.email,
      planId: form.planId,
      isCustomPlan: isCustom,
      customPlanDetails
    });

    setCreatedClinic(newClinic);
    setStep(4);
  };

  const handleLaunchWorkspace = () => {
    navigate('/clinic/dashboard');
  };

  // Find matching approval request for this clinic
  const matchingRequest = useMemo(() => {
    if (!createdClinic) return null;
    return approvalRequests.find(
      (r) => r.clinicId === createdClinic.id || r.clinicName === form.clinicName
    );
  }, [approvalRequests, createdClinic, form.clinicName]);

  const approvalStatus = matchingRequest?.status || 'Pending Approval';
  const isApproved = approvalStatus === 'Approved';

  const handleCheckApprovalStatus = () => {
    if (isApproved) {
      showToast('🎉 Application Approved! Your custom plan entitlements are active.');
    } else {
      showToast('⏳ Status Checked: Application is currently awaiting Super Admin review.');
    }
  };

  const handleSimulateSuperAdminApproval = () => {
    if (matchingRequest?.id) {
      approveSubscriptionRequest(matchingRequest.id, 'Approved via Instant Simulation.');
      showToast('🎉 Approved! The custom plan specification is now active.');
    } else {
      showToast('Approval request verified.');
    }
  };

  const handleGoToSuperAdminConsole = () => {
    switchRole('super_admin');
    navigate('/superadmin/subscriptions');
  };

  const categories = ['all', 'Clinical Core', 'Operations', 'Communications', 'Infrastructure'];
  const filteredCatalog =
    activeCategoryFilter === 'all'
      ? featureCatalog
      : featureCatalog.filter((f) => f.category === activeCategoryFilter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 w-full">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#15803D] text-white flex items-center justify-center font-black text-xl shadow-md shadow-green-700/20">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Clinic<span className="text-[#15803D]">OS</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hospital & Clinic Registration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Provision your hospital partition, choose one of the three standard plans, or customize a bespoke feature bundle with dynamic pricing.
        </p>
      </div>

      {/* Step Indicators */}
      {step < 4 && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs font-semibold flex-wrap">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
              step >= 1 ? 'bg-[#15803D] text-white shadow-xs font-bold' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span>1</span> <span>Clinic Details</span>
          </button>
          <span className="text-slate-300">➔</span>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
              step >= 2 ? 'bg-[#15803D] text-white shadow-xs font-bold' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span>2</span> <span>Scale & Staff</span>
          </button>
          <span className="text-slate-300">➔</span>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
              step >= 3 ? 'bg-[#15803D] text-white shadow-xs font-bold' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span>3</span> <span>Subscription & Customization</span>
          </button>
        </div>
      )}

      {/* Step 1: Basic Clinic Information */}
      {step === 1 && (
        <Card className="p-6 sm:p-8 border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 1: Clinic Profile & Admin Name</h2>
            <p className="text-xs text-slate-500">Provide the primary establishment details for OPD stationery</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Clinic Name *</label>
              <input
                required
                type="text"
                value={form.clinicName}
                onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                placeholder="e.g. Metro Multispecialty Dental Center"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#15803D] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Owner Doctor / Administrator Name *</label>
                <input
                  required
                  type="text"
                  value={form.ownerName}
                  onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                  placeholder="Dr. Rajesh Patel, MDS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Specialty</label>
                <select
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-medium"
                >
                  <option value="Dental">Dental & Orthodontics</option>
                  <option value="Orthopedics">Orthopedics & Spine Care</option>
                  <option value="Dermatology">Dermatology & Cosmetology</option>
                  <option value="Pediatrics">Pediatrics & Child Care</option>
                  <option value="General">General OPD & Family Medicine</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Primary City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Official Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button variant="primary" size="md" onClick={() => setStep(2)} className="font-bold">
              Next: Scale & Capacity <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Scale & Capacity */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 2: Doctor Rostering & Branches</h2>
            <p className="text-xs text-slate-500">Configure clinic capacity and operational branches</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Active Consulting Doctors</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={form.doctorCount}
                  onChange={(e) => setForm({ ...form, doctorCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Seats provisioned for clinical notes & prescriptions</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Operational Branch Locations</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={form.branchCount}
                  onChange={(e) => setForm({ ...form, branchCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Separate OPD reception desks and stock stores</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#14532D] space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                Automatic Provisioning
              </span>
              <p className="text-[11px] text-[#166534]">
                ClinicOS will automatically configure starter service tariffs, daily appointment slots, and WhatsApp reminder templates for {form.doctorCount} doctors.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="secondary" size="md" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="primary" size="md" onClick={() => setStep(3)} className="font-bold">
              Next: Select Plan <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Plan Selection & Custom Builder */}
      {step === 3 && (
        <div className="space-y-6">
          <Card className="p-6 sm:p-8 border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Step 3: Choose Plan or Customize Architecture
                </h2>
                <p className="text-xs text-slate-500">
                  Select one of the 3 existing standard tiers or customize a bespoke feature package.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] shrink-0">
                14-Day Free Trial Included
              </span>
            </div>

            {/* The 4 Options (3 Standard Plans + 4th Customize Your Plan) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Plan 1, 2, 3: Standard Plans */}
              {standardPlans.map((p) => {
                const isSelected = form.planId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setForm({ ...form, planId: p.id })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#15803D] bg-[#F0FDF4]/70 shadow-md ring-2 ring-[#15803D]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-slate-900">{p.name}</span>
                        {p.popular && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#15803D] text-white">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-[#14532D] font-mono">{p.price}</span>
                        <span className="text-[10px] text-slate-500">{p.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug min-h-[30px]">{p.desc}</p>
                      <div className="text-[10px] font-bold text-slate-700 bg-slate-100 p-1.5 rounded-lg">
                        {p.limits}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-[#166534] font-semibold">Standard Tier</span>
                      <input
                        type="radio"
                        name="planSelect"
                        checked={isSelected}
                        onChange={() => setForm({ ...form, planId: p.id })}
                        className="text-[#15803D] focus:ring-[#15803D] cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}

              {/* Option 4: Customize Your Plan */}
              <div
                onClick={() => setForm({ ...form, planId: 'custom' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                  form.planId === 'custom'
                    ? 'border-[#15803D] bg-gradient-to-b from-[#F0FDF4] to-white shadow-md ring-2 ring-[#15803D]/20'
                    : 'border-dashed border-emerald-400 bg-emerald-50/20 hover:border-[#15803D] hover:bg-[#F0FDF4]/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                      <Settings2 className="w-3.5 h-3.5 text-[#15803D]" />
                      Customize Your Plan
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-[#166534] border border-[#86EFAC]">
                      Bespoke
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-[#15803D] font-mono">
                      ₹{customQuote.displayPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {billingInterval === 'annual' ? '/ mo (annual)' : '/ mo'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug min-h-[30px]">
                    Configure modular features, custom doctor capacity, and submit for Super Admin approval.
                  </p>
                  <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
                    {selectedFeatures.length} features selected
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-[#15803D] font-bold">Configure Below ➔</span>
                  <input
                    type="radio"
                    name="planSelect"
                    checked={form.planId === 'custom'}
                    onChange={() => setForm({ ...form, planId: 'custom' })}
                    className="text-[#15803D] focus:ring-[#15803D] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Dedicated Custom Plan Builder Section (Shown when Customize Your Plan is active) */}
            {form.planId === 'custom' && (
              <div className="pt-4 border-t-2 border-emerald-100 space-y-6 animate-fade-in">
                <div className="bg-[#F0FDF4] border-2 border-[#86EFAC] rounded-3xl p-5 sm:p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200 pb-3">
                    <div>
                      <span className="text-[11px] font-black uppercase text-[#15803D] tracking-wider block">
                        Plan Customizing Details
                      </span>
                      <h3 className="text-lg font-black text-slate-900">
                        Modular Architecture & Feature-Based Pricing
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Choose required modules individually with transparent monthly costs and usage limits.
                      </p>
                    </div>

                    {/* Billing Frequency Switch */}
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
                      <span className={`text-xs font-bold ${billingInterval === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>
                        Monthly
                      </span>
                      <button
                        type="button"
                        onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annual' : 'monthly')}
                        className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                          billingInterval === 'annual' ? 'bg-[#15803D]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                            billingInterval === 'annual' ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className={`text-xs font-bold ${billingInterval === 'annual' ? 'text-[#15803D]' : 'text-slate-400'}`}>
                        Annual (-15%)
                      </span>
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
                          activeCategoryFilter === cat
                            ? 'bg-[#15803D] text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cat === 'all' ? 'All Modular Features (11)' : cat}
                      </button>
                    ))}
                  </div>

                  {/* Feature Selection Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {filteredCatalog.map((feat) => {
                      const isChecked = selectedFeatures.includes(feat.id);

                      return (
                        <div
                          key={feat.id}
                          onClick={() => toggleFeature(feat.id)}
                          className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                            isChecked
                              ? 'border-[#15803D] bg-white shadow-xs'
                              : 'border-slate-200 bg-white/70 hover:border-slate-300 opacity-80'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFeature(feat.id)}
                            className="w-4.5 h-4.5 text-[#15803D] rounded border-slate-300 focus:ring-[#15803D] mt-0.5 cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="font-black text-xs text-slate-900">{feat.name}</span>
                              <span className="font-mono font-black text-xs text-[#14532D]">
                                ₹{feat.monthlyPrice}/mo
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                              {feat.description}
                            </p>
                            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                {feat.category}
                              </span>
                              <span className="text-[#166534] font-semibold">
                                {feat.includedLimit}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Capacity Add-ons / Scale Counters */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Custom Capacity & Scale Inputs</h4>
                      <p className="text-[11px] text-slate-500">Scale seats, branches, and storage quotas for your practice</p>
                    </div>
                    <span className="text-xs font-bold text-slate-500">Incremental Unit Pricing</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {QUANTITY_ADDONS.map((addon) => {
                      const qty = quantities[addon.id] || 0;

                      return (
                        <div
                          key={addon.id}
                          className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 truncate">{addon.name}</div>
                            <div className="text-[11px] text-[#166534] font-mono font-semibold">
                              +₹{addon.unitPrice} {addon.unitLabel}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 bg-white border border-slate-200 px-2 py-1 rounded-lg shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(addon.id, -1);
                              }}
                              disabled={qty <= addon.min}
                              className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold w-6 text-center text-slate-900">{qty}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(addon.id, 1);
                              }}
                              disabled={qty >= addon.max}
                              className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Price Breakdown & Order Summary */}
                <div className="p-5 rounded-3xl bg-[#062412] text-white border-2 border-emerald-500/30 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/80 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 block">
                        Live Dynamic Price Review
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-white">
                        Estimated Custom Plan Total
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
                        ₹{customQuote.displayPrice.toLocaleString('en-IN')}{' '}
                        <span className="text-xs text-emerald-200/80 font-normal">
                          {billingInterval === 'annual' ? '/ month (billed annually)' : '/ month'}
                        </span>
                      </div>
                      {customQuote.discountAmount > 0 && (
                        <span className="text-[11px] text-emerald-400 font-bold">
                          Multi-module bundle discount applied: -₹{customQuote.discountAmount}/mo
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-200">
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Features Selected</span>
                      <strong className="text-white text-sm">{selectedFeatures.length} Modules</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Feature Base Fee</span>
                      <strong className="text-white text-sm font-mono">₹{customQuote.featuresSubtotal}/mo</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Add-ons Total</span>
                      <strong className="text-white text-sm font-mono">₹{customQuote.addonsSubtotal}/mo</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Next Step</span>
                      <strong className="text-amber-400 text-xs font-bold">Super Admin Review</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-[11px] text-emerald-200 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Super Admin Approval Notice:</strong> After selecting Submit below, your custom plan specification will be transmitted to the Super Admin governance queue. You will wait on the approval holding status screen while platform administration evaluates and approves your custom limits.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <Button variant="secondary" size="md" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleFinishOnboarding}
                className="bg-[#15803D] hover:bg-[#166534] font-bold text-sm shadow-md"
              >
                {form.planId === 'custom' ? (
                  <span className="flex items-center gap-1.5">
                    Submit Customized Plan for Super Admin Approval <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Provision 14-Day Free Trial <Sparkles className="w-4 h-4 ml-1" />
                  </span>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Step 4: Submission State & Waiting for Super Admin Approval Screen */}
      {step === 4 && createdClinic && (
        form.planId === 'custom' ? (
          /* ====================================================================
             DEDICATED "WAIT FOR SUPER ADMIN APPROVAL" COCKPIT SCREEN
             ==================================================================== */
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-7 bg-white relative overflow-hidden">
              {/* Ambient Top Glow */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400" />

              {/* Status Header */}
              <div className="text-center space-y-3 pt-2">
                <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                  {isApproved ? (
                    <CheckCircle2 className="w-10 h-10 text-[#15803D]" />
                  ) : (
                    <Clock className="w-10 h-10 text-amber-600 animate-pulse" />
                  )}
                </div>

                <div className="space-y-1">
                  <span
                    className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                      isApproved
                        ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isApproved ? 'bg-[#15803D]' : 'bg-amber-500 animate-ping'
                      }`}
                    />
                    {isApproved
                      ? 'Plan Approved by Super Admin'
                      : 'Waiting for Super Admin Approval'}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-1">
                    {isApproved
                      ? `🎉 Custom Plan Approved, ${form.clinicName}!`
                      : `Application Submitted — Waiting for Super Admin Approval`}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                    {isApproved
                      ? 'Platform governance has approved your customized subscription specification. Your facility is now fully active with custom quotas and verified clinical entitlements.'
                      : `Your customized subscription specification for ${form.clinicName} has been recorded (Request #${matchingRequest?.id || 'REQ-APPR-2026'}). It is now queued for Super Admin governance evaluation.`}
                  </p>
                </div>
              </div>

              {/* 3-Stage Governance Workflow Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                {/* Stage 1 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0 font-bold">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">1. Specification Submitted</span>
                    <span className="text-[11px] text-slate-500">Custom features & capacity logged</span>
                  </div>
                </div>

                {/* Stage 2 */}
                <div
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isApproved
                      ? 'bg-white border-slate-200'
                      : 'bg-amber-50 border-amber-300 ring-2 ring-amber-300/30'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold ${
                      isApproved
                        ? 'bg-[#15803D] text-white'
                        : 'bg-amber-500 text-white animate-pulse'
                    }`}
                  >
                    {isApproved ? <Check className="w-4 h-4" /> : <Hourglass className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">2. Super Admin Review</span>
                    <span className={`text-[11px] font-semibold ${isApproved ? 'text-[#166534]' : 'text-amber-800'}`}>
                      {isApproved ? 'Approved by Platform Governance' : 'Waiting in Approval Queue'}
                    </span>
                  </div>
                </div>

                {/* Stage 3 */}
                <div
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isApproved
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-slate-100 border-slate-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold ${
                      isApproved ? 'bg-[#15803D] text-white' : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {isApproved ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">3. Entitlements Activated</span>
                    <span className="text-[11px] text-slate-500">
                      {isApproved ? 'All modular quotas provisioned' : 'Awaiting sign-off'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submitted Custom Plan Details Review Card */}
              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Submitted Custom Plan Specification
                    </span>
                    <h4 className="text-base font-black text-slate-900">{form.clinicName}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Estimated Monthly Fee</span>
                    <span className="text-xl sm:text-2xl font-black text-[#14532D] font-mono">
                      ₹{customQuote.displayPrice.toLocaleString('en-IN')}{' '}
                      <span className="text-xs text-slate-500 font-normal">/ month</span>
                    </span>
                  </div>
                </div>

                {/* Selected Features Summary Grid */}
                <div>
                  <span className="font-bold text-slate-800 block mb-2">
                    Configured Modular Modules ({customQuote.selectedFeatures.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {customQuote.selectedFeatures.map((feat) => (
                      <div
                        key={feat.id}
                        className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block">{feat.name}</span>
                          <span className="text-[10px] text-[#166534] font-medium">{feat.includedLimit}</span>
                        </div>
                        <span className="font-mono font-bold text-[#14532D]">₹{feat.monthlyPrice}/mo</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Configured Scale Add-ons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold">Extra Doctors</span>
                    <strong className="text-slate-800 font-mono text-sm">+{quantities.extra_doctors} Seats</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold">Extra Branches</span>
                    <strong className="text-slate-800 font-mono text-sm">+{quantities.extra_branches} Locations</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold">Storage Quota</span>
                    <strong className="text-slate-800 font-mono text-sm">+{quantities.extra_storage * 10} GB</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold">WhatsApp Pack</span>
                    <strong className="text-slate-800 font-mono text-sm">+{quantities.extra_whatsapp * 500} Msgs</strong>
                  </div>
                </div>

                {/* Metadata & Reference */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                  <span>Application Reference: <strong>{matchingRequest?.id || 'REQ-APPR-2026'}</strong></span>
                  <span>Primary Admin: <strong>{form.ownerName}</strong></span>
                  <span>Specialty Hub: <strong>{form.specialty} ({form.city})</strong></span>
                </div>
              </div>

              {/* Real-time Status Actions & Testing Accelerators */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    className="font-bold border-2 border-slate-300 hover:border-slate-400"
                    onClick={handleCheckApprovalStatus}
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" />
                    Check Approval Status
                  </Button>

                  {!isApproved && (
                    <Button
                      variant="primary"
                      size="md"
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md"
                      onClick={handleSimulateSuperAdminApproval}
                    >
                      <Sparkles className="w-4 h-4 mr-1.5" />
                      Simulate 1-Click Super Admin Approval
                    </Button>
                  )}

                  {isApproved && (
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-[#15803D] hover:bg-[#166534] font-black shadow-lg shadow-green-700/25 px-8"
                      onClick={handleLaunchWorkspace}
                    >
                      Launch Approved Clinic Workspace &rarr;
                    </Button>
                  )}
                </div>

                {/* Secondary navigation & Evaluator Switcher */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">
                    Want to review this application in the Super Admin queue?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleGoToSuperAdminConsole}
                      className="font-bold text-[#15803D] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      Open Super Admin Approvals &rarr;
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={handleLaunchWorkspace}
                      className="font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Preview Workspace in Sandbox
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          /* Standard Tier Provisioning Success Screen */
          <Card className="p-8 border-2 border-[#15803D] shadow-xl space-y-6 text-center bg-gradient-to-b from-[#F0FDF4] to-white animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-[#15803D] text-white flex items-center justify-center font-bold text-2xl shadow-md mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#166534] uppercase tracking-wider bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#DCFCE7]">
                Simulated Provisioning Complete · 14-Day Free Access
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-2">
                Welcome to ClinicOS, {form.clinicName}!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your clinic partition has been initialized with {form.doctorCount} clinicians, digital prescriptions, and 14-day free trial access.
              </p>
            </div>

            {/* Provisioning summary table */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border border-slate-200 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Tenant Identifier:</span>
                <span className="font-bold text-slate-800">{createdClinic.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Selected Tier:</span>
                <span className="font-bold text-[#166534]">{form.planId.toUpperCase()} Tier</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Subscription Status:</span>
                <span className="font-bold text-emerald-700">Active Trial (14 Days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Admin Doctor:</span>
                <span className="font-bold text-slate-800">{form.ownerName}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl max-w-md mx-auto text-[11px] text-amber-900 text-left leading-relaxed">
              <strong>Prototype Notice:</strong> This is a client-side prototype. No credit card was charged and standard 14-day evaluation access is active.
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                className="px-8 font-black"
                onClick={handleLaunchWorkspace}
              >
                Launch Clinic Workspace &rarr;
              </Button>
            </div>
          </Card>
        )
      )}
    </div>
  );
}
