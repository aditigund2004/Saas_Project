import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Edit2,
  Check,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Search,
  Sparkles,
  Save,
  X,
  AlertTriangle
} from 'lucide-react';

// Comprehensive catalog of all features provided across the ClinicOS platform
export const ALL_AVAILABLE_FEATURES = [
  // Scheduling & Reception Desk
  '14-Day Full Access Free Trial',
  'Up to 2 Doctor Schedules',
  'Up to 5 Doctor Profiles & Rotas',
  'Up to 10 Doctors & 3 Branches',
  'Unlimited Doctors & 10 Branches',
  'Single Branch Management',
  '2 Branch Operations & Switching',
  'Branch-Level Analytics & Switching',
  'Multi-Branch Consolidated Reporting',
  'Online & Walk-In Bookings',
  'Live Waiting Queue Management',
  'Receptionist Walk-In Express Mode',
  'Daily Reception Queue & Checklist',
  'Patient Self-Service Booking Portal',

  // Clinical EHR & Digital Prescriptions
  'Digital Prescriptions & Print PDF',
  'Clinical Prescription Composer & PDF Generator',
  'Full Digital Rx Builder with Drug Presets',
  'QR Verification Preview',
  'QR Authenticity Verification Portal',
  'Patient Medical History & Allergy Tracking',
  'Diagnostic Lab & Imaging Report Archival',
  'Custom Clinical Print Header Layouts',

  // Communications & Automated WhatsApp
  'Basic WhatsApp Confirmation Templates',
  'Automated SMS & WhatsApp Reminders',
  'Automated WhatsApp Reminders & Follow-Ups',
  'WhatsApp Business API Dedicated Webhook Adapter',
  'Automated Patient Recall & Follow-Up Reminders',

  // Practice Billing & Accounts
  'Billing, Invoicing & Daily Collections',
  'Billing, Invoicing & Expense Tracking',
  'Standard Financial & Patient Reports',
  'Custom Operational & Financial Reports',
  'Corporate Tax & Itemized Invoice Exports',

  // Clinical Pharmacy & Inventory
  'Clinical Inventory Alerts & Reorders',
  'Clinical Inventory & Low-Stock Alerts',
  'Automated Pharmacy & Consumables Restock',
  'Vendor Purchase Order & Supplier Tracker',

  // Specialty & Inpatient Facilities
  'Nursing Home Bed Occupancy Tracker (10-30 Beds)',
  'Advanced Role-Based Permissions',
  'Zero-Trust Security & Audit Log Registry',
  'Dedicated Email & Chat Support',
  'Priority 24/7 Support & Onboarding Specialist',
  'Telehealth & Virtual Consultation Infrastructure'
];

/**
 * Calculates annual pricing discounts and savings comparison
 */
export function calculateAnnualDiscount(monthlyPrice, annualPrice) {
  const safeMonthly = Math.max(0, Number(monthlyPrice) || 0);
  const safeAnnual = Math.max(0, Number(annualPrice) || 0);
  const standardAnnualCost = safeMonthly * 12;
  const savings = Math.max(0, standardAnnualCost - safeAnnual);
  const discountPercent = standardAnnualCost > 0 ? Math.round((savings / standardAnnualCost) * 100) : 0;
  const effectiveMonthly = safeAnnual > 0 ? Math.round(safeAnnual / 12) : safeMonthly;
  const monthlySavings = Math.max(0, safeMonthly - effectiveMonthly);

  return {
    standardAnnualCost,
    savings,
    discountPercent,
    effectiveMonthly,
    monthlySavings,
    hasDiscount: savings > 0
  };
}

/**
 * Dynamic Annual Pricing & Commitment Discount Calculator
 * Keeps Yearly pricing dynamically lower because the customer is committing to an annual plan.
 */
function AnnualPricingCalculator({
  monthlyPrice,
  annualPrice,
  onUpdatePrices
}) {
  const standardAnnual = (Number(monthlyPrice) || 0) * 12;
  const initialDiscount = standardAnnual > 0
    ? Math.max(0, Math.round(((standardAnnual - (Number(annualPrice) || 0)) / standardAnnual) * 100))
    : 20;

  const [activeDiscountPercent, setActiveDiscountPercent] = useState(initialDiscount || 20);

  // Sync state if external prices change
  useEffect(() => {
    if (standardAnnual > 0 && annualPrice) {
      const derived = Math.max(0, Math.round(((standardAnnual - Number(annualPrice)) / standardAnnual) * 100));
      setActiveDiscountPercent(derived);
    }
  }, [monthlyPrice, annualPrice, standardAnnual]);

  const discount = calculateAnnualDiscount(monthlyPrice, annualPrice);

  const presets = [
    { label: '0% (Standard)', pct: 0 },
    { label: '10% OFF', pct: 10 },
    { label: '15% OFF', pct: 15 },
    { label: '17% OFF (2 Mo Free)', pct: 17 },
    { label: '20% OFF', pct: 20 },
    { label: '25% OFF', pct: 25 },
    { label: '30% OFF', pct: 30 },
    { label: '35% OFF', pct: 35 },
    { label: '40% OFF', pct: 40 }
  ];

  // Handler: When user changes Monthly Price -> dynamically update Annual Price using current discount %
  const handleMonthlyChange = (newVal) => {
    const safeMonthly = Math.max(0, Number(newVal) || 0);
    const pct = activeDiscountPercent > 0 ? activeDiscountPercent : 20;
    const newAnnual = Math.round((safeMonthly * 12) * (1 - pct / 100));
    onUpdatePrices({
      monthlyPrice: safeMonthly,
      annualPrice: newAnnual
    });
  };

  // Handler: When user changes Discount Percentage (slider, input, or preset) -> dynamically calculate lower Yearly Price
  const handleDiscountChange = (newPct) => {
    const safePct = Math.min(80, Math.max(0, Number(newPct) || 0));
    setActiveDiscountPercent(safePct);
    const safeMonthly = Number(monthlyPrice) || 0;
    const newAnnual = Math.round((safeMonthly * 12) * (1 - safePct / 100));
    onUpdatePrices({
      monthlyPrice: safeMonthly,
      annualPrice: newAnnual
    });
  };

  // Handler: When user types custom Annual Price -> dynamically derive the Discount %
  const handleAnnualChange = (newAnnualVal) => {
    const safeAnnual = Math.max(0, Number(newAnnualVal) || 0);
    const safeMonthly = Number(monthlyPrice) || 0;
    const standard = safeMonthly * 12;
    const derived = standard > 0 ? Math.max(0, Math.round(((standard - safeAnnual) / standard) * 100)) : 0;
    setActiveDiscountPercent(derived);
    onUpdatePrices({
      monthlyPrice: safeMonthly,
      annualPrice: safeAnnual
    });
  };

  // Handler: When user enters the target monthly rate for yearly commitment (e.g. ₹1,399 instead of ₹1,999)
  const handleEffectiveMonthlyChange = (newEffVal) => {
    const safeEff = Math.max(0, Number(newEffVal) || 0);
    const newAnnual = safeEff * 12;
    const safeMonthly = Number(monthlyPrice) || 0;
    const standard = safeMonthly * 12;
    const derived = standard > 0 ? Math.max(0, Math.round(((standard - newAnnual) / standard) * 100)) : 0;
    setActiveDiscountPercent(derived);
    onUpdatePrices({
      monthlyPrice: safeMonthly,
      annualPrice: newAnnual
    });
  };

  return (
    <div className="p-4 rounded-xl bg-blue-50/75 border border-blue-200/90 space-y-4">
      {/* Title & Commitment Advantage Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-blue-200/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Dynamic Yearly Commitment Discount Calculator
            </h4>
            <p className="text-[11px] text-blue-800">
              Yearly plans are dynamically discounted because clinics commit for 1 full year upfront.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold font-mono self-start sm:self-auto shadow-2xs">
          {activeDiscountPercent}% Commitment Discount
        </span>
      </div>

      {/* Inputs Grid: 3 Interactive Control Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Column 1: Monthly Price */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-slate-700">
            Monthly Price (Month-to-Month)
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
            <input
              type="number"
              min="0"
              value={monthlyPrice}
              onChange={(e) => handleMonthlyChange(e.target.value)}
              className="w-full pl-6 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-2xs"
              placeholder="e.g. 1999"
            />
          </div>
          <span className="text-[10px] text-slate-500 font-medium block">
            12-month standard: ₹{standardAnnual.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Column 2: Dynamic Discount Slider & Number Box */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold text-blue-900">
              Yearly Discount (% Less)
            </label>
            <span className="text-xs font-extrabold text-blue-700 font-mono">
              {activeDiscountPercent}% OFF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={activeDiscountPercent}
              onChange={(e) => handleDiscountChange(e.target.value)}
              className="flex-1 accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              title="Slide to dynamically adjust annual commitment discount"
            />
            <div className="relative w-16">
              <input
                type="number"
                min="0"
                max="60"
                value={activeDiscountPercent}
                onChange={(e) => handleDiscountChange(e.target.value)}
                className="w-full px-2 py-1 text-center font-bold text-xs rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 font-mono bg-white"
              />
            </div>
          </div>
          <span className="text-[10px] text-blue-700 font-medium block">
            Dynamically reduces annual cost
          </span>
        </div>

        {/* Column 3: Annual Billed Price */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-slate-700">
            Annual Billed Price (Yearly Commit)
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
            <input
              type="number"
              min="0"
              value={annualPrice}
              onChange={(e) => handleAnnualChange(e.target.value)}
              className="w-full pl-6 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-2xs"
              placeholder="e.g. 16792"
            />
          </div>
          <span className="text-[10px] text-emerald-700 font-medium block">
            Effective: ₹{discount.effectiveMonthly.toLocaleString('en-IN')}/mo (billed annually)
          </span>
        </div>
      </div>

      {/* Quick Discount Preset Pills */}
      <div>
        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
          Quick Commitment Discount Presets (Auto-Calculates Lower Yearly Price):
        </label>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => {
            const isMatch = Math.abs(activeDiscountPercent - p.pct) <= 0.5;
            return (
              <button
                key={p.pct}
                type="button"
                onClick={() => handleDiscountChange(p.pct)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                  isMatch
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Calculated Savings Card: Highlights Why Yearly Commitment is Less */}
      <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 font-black text-sm shadow-2xs mt-0.5">
              %
            </div>
            <div className="space-y-0.5">
              <div className="font-extrabold text-emerald-950 flex items-center gap-2">
                <span>Customer Saves:</span>
                <span className="text-emerald-700 font-mono text-base tabular-nums">
                  ₹{discount.savings.toLocaleString('en-IN')}/year
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold">
                  {activeDiscountPercent}% LESS
                </span>
              </div>
              <div className="text-[11px] text-emerald-800 font-medium">
                Yearly Commitment Rate:{' '}
                <strong className="font-mono text-emerald-950 font-bold">
                  ₹{discount.effectiveMonthly.toLocaleString('en-IN')}/month
                </strong>{' '}
                (Customer pays <strong className="text-emerald-950">₹{discount.monthlySavings.toLocaleString('en-IN')}/mo less</strong> than the ₹{Number(monthlyPrice).toLocaleString('en-IN')}/mo month-to-month rate).
              </div>
            </div>
          </div>

          <div className="sm:text-right sm:border-l sm:border-emerald-200 sm:pl-4 shrink-0">
            <span className="block text-[10px] uppercase font-bold text-emerald-700">
              Yearly Commitment Rate
            </span>
            <div className="font-mono text-xs mt-0.5">
              <span className="line-through text-slate-400">
                ₹{discount.standardAnnualCost.toLocaleString('en-IN')}
              </span>
              <span className="text-emerald-950 font-bold ml-1.5 text-sm">
                ➔ ₹{annualPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 block">
              1-year full upfront commitment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const INITIAL_NEW_PLAN = {
  id: '',
  name: '',
  tagline: 'Ideal for specialized practices requiring expanded capacity and digital workflows',
  monthlyPrice: 3999,
  annualPrice: 38390, // 20% discount default
  maxDoctors: 4,
  maxBranches: 2,
  maxStaff: 6,
  isPopular: false,
  features: [
    '14-Day Full Access Free Trial',
    'Up to 5 Doctor Profiles & Rotas',
    'Single Branch Management',
    'Online & Walk-In Bookings',
    'Digital Prescriptions & Print PDF',
    'Basic WhatsApp Confirmation Templates',
    'Billing, Invoicing & Daily Collections',
    'Daily Reception Queue & Checklist'
  ]
};

export function PlatformPlansPage() {
  const { plans = [], setPlans, clinics = [], showToast } = useApp();

  // Active Plan Editor Modal State
  const [editingPlan, setEditingPlan] = useState(null);

  // New Plan Creation Modal State
  const [isCreatingNewPlan, setIsCreatingNewPlan] = useState(false);
  const [newPlanData, setNewPlanData] = useState(INITIAL_NEW_PLAN);

  // Delete Plan Confirmation Modal State
  const [deletingPlan, setDeletingPlan] = useState(null);

  // Search filter & custom feature input state for modals
  const [featureSearch, setFeatureSearch] = useState('');
  const [customFeatureText, setCustomFeatureText] = useState('');

  // Open Edit Modal for a specific plan
  const handleOpenEditModal = (plan) => {
    setEditingPlan({
      ...plan,
      features: [...(plan.features || [])]
    });
    setFeatureSearch('');
    setCustomFeatureText('');
  };

  const handleCloseEditModal = () => {
    setEditingPlan(null);
    setFeatureSearch('');
    setCustomFeatureText('');
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setNewPlanData({
      ...INITIAL_NEW_PLAN,
      id: `plan-${Date.now().toString().slice(-4)}`,
      features: [...INITIAL_NEW_PLAN.features]
    });
    setFeatureSearch('');
    setCustomFeatureText('');
    setIsCreatingNewPlan(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreatingNewPlan(false);
    setFeatureSearch('');
    setCustomFeatureText('');
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (plan) => {
    setDeletingPlan(plan);
  };

  const handleCloseDeleteModal = () => {
    setDeletingPlan(null);
  };

  // Confirm Plan Deletion
  const handleConfirmDelete = () => {
    if (!deletingPlan) return;
    if (plans.length <= 1) {
      showToast('Cannot delete the last remaining plan on the platform.', 'error');
      handleCloseDeleteModal();
      return;
    }

    const updated = plans.filter((p) => p.id !== deletingPlan.id);
    setPlans(updated);
    localStorage.setItem('clinipulse_plans', JSON.stringify(updated));

    showToast(`Subscription plan "${deletingPlan.name}" was successfully removed.`, 'info');
    handleCloseDeleteModal();
    if (editingPlan && editingPlan.id === deletingPlan.id) {
      handleCloseEditModal();
    }
  };

  // Toggle feature for editing plan
  const handleToggleEditingFeature = (featureName) => {
    if (!editingPlan) return;
    const exists = editingPlan.features.includes(featureName);
    const updatedFeatures = exists
      ? editingPlan.features.filter((f) => f !== featureName)
      : [...editingPlan.features, featureName];

    setEditingPlan({
      ...editingPlan,
      features: updatedFeatures
    });
  };

  // Toggle feature for new plan
  const handleToggleNewPlanFeature = (featureName) => {
    const exists = newPlanData.features.includes(featureName);
    const updatedFeatures = exists
      ? newPlanData.features.filter((f) => f !== featureName)
      : [...newPlanData.features, featureName];

    setNewPlanData({
      ...newPlanData,
      features: updatedFeatures
    });
  };

  // Add custom feature typed by user
  const handleAddCustomFeatureToCurrent = (isForNewPlan = false) => {
    if (!customFeatureText.trim()) return;
    const text = customFeatureText.trim();

    if (isForNewPlan) {
      if (!newPlanData.features.includes(text)) {
        setNewPlanData({
          ...newPlanData,
          features: [...newPlanData.features, text]
        });
        showToast(`Added custom feature "${text}"`, 'success');
      }
    } else if (editingPlan) {
      if (!editingPlan.features.includes(text)) {
        setEditingPlan({
          ...editingPlan,
          features: [...editingPlan.features, text]
        });
        showToast(`Added "${text}" to ${editingPlan.name}`, 'success');
      }
    }
    setCustomFeatureText('');
  };

  // Save changes to edited plan
  const handleSaveEditModal = () => {
    if (!editingPlan) return;
    const updatedList = plans.map((p) =>
      p.id === editingPlan.id ? { ...editingPlan } : p
    );

    setPlans(updatedList);
    localStorage.setItem('clinipulse_plans', JSON.stringify(updatedList));

    showToast(`Plan "${editingPlan.name}" updated successfully with ${editingPlan.features.length} features!`, 'success');
    handleCloseEditModal();
  };

  // Save newly created plan
  const handleSaveNewPlan = (e) => {
    e?.preventDefault();
    if (!newPlanData.name.trim()) {
      showToast('Please provide a name for the new plan.', 'error');
      return;
    }

    const cleanId = (newPlanData.id.trim() || newPlanData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
    
    // Check ID conflict
    if (plans.some((p) => p.id === cleanId)) {
      showToast(`A plan with ID "${cleanId}" already exists. Please choose a different ID.`, 'error');
      return;
    }

    const planToInsert = {
      ...newPlanData,
      id: cleanId,
      monthlyPrice: Number(newPlanData.monthlyPrice) || 0,
      annualPrice: Number(newPlanData.annualPrice) || 0,
      maxDoctors: Number(newPlanData.maxDoctors) || 1,
      maxBranches: Number(newPlanData.maxBranches) || 1,
      maxStaff: Number(newPlanData.maxStaff) || 2
    };

    const updatedList = [...plans, planToInsert];
    setPlans(updatedList);
    localStorage.setItem('clinipulse_plans', JSON.stringify(updatedList));

    showToast(`🎉 New tier "${planToInsert.name}" created and published to platform!`, 'success');
    handleCloseCreateModal();
  };

  // Filter features based on search
  const filteredCatalog = ALL_AVAILABLE_FEATURES.filter((f) =>
    f.toLowerCase().includes(featureSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Plan Architect</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Subscription Tier Pricing & Limits
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure pricing tiers, dynamic annual commitment discounts, doctor thresholds, and feature entitlements.
          </p>
        </div>

        {/* Primary Action: Create New Plan */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={handleOpenCreateModal}
            className="shadow-xs font-semibold"
          >
            + Create New Plan
          </Button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {plans.map((plan) => {
          const discountInfo = calculateAnnualDiscount(plan.monthlyPrice, plan.annualPrice);

          return (
            <Card
              key={plan.id}
              className="p-5 sm:p-6 border-slate-200/90 flex flex-col justify-between space-y-5 hover:border-slate-300 transition-all shadow-2xs group relative"
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white shadow-2xs uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Header: Title, ID Badge & Pencil / Delete Icons */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono inline-block mt-1">
                      ID: {plan.id}
                    </span>
                  </div>

                  {/* Header Actions: Edit & Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(plan)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer"
                      title={`Edit ${plan.name} features & pricing`}
                      aria-label={`Edit ${plan.name}`}
                    >
                      <Edit2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenDeleteModal(plan)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 transition-colors cursor-pointer"
                      title={`Delete ${plan.name}`}
                      aria-label={`Delete ${plan.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tagline */}
                {plan.tagline && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {plan.tagline}
                  </p>
                )}

                {/* Pricing & Limits */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {/* Month-to-Month Rate */}
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Month-to-Month Plan
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight tabular-nums mt-0.5">
                      ₹{plan.monthlyPrice.toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-normal">/mo</span>
                    </div>
                  </div>

                  {/* Yearly Commitment Rate & Discount */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Yearly Commitment Plan
                      </span>
                      {discountInfo.hasDiscount && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                          {discountInfo.discountPercent}% LESS
                        </span>
                      )}
                    </div>

                    {/* Effective monthly when committed annually */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-emerald-800 font-mono tabular-nums">
                        ₹{discountInfo.effectiveMonthly.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">/ month</span>
                      {discountInfo.hasDiscount && (
                        <span className="line-through text-slate-400 text-xs font-mono tabular-nums ml-1">
                          ₹{plan.monthlyPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Customer Discount Highlight Pill */}
                    {discountInfo.hasDiscount ? (
                      <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200/90 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            Yearly Commitment Savings
                          </span>
                          <span className="text-[10px] font-bold text-emerald-900 font-mono">
                            Save ₹{discountInfo.savings.toLocaleString('en-IN')}/yr
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-700/90 flex items-center justify-between">
                          <span>Annual billed total:</span>
                          <span className="font-mono font-bold">₹{plan.annualPrice.toLocaleString('en-IN')}/year</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-400">
                        ₹{plan.annualPrice.toLocaleString('en-IN')}/year (Standard annual rate)
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100/80">
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Max Doctors
                      </span>
                      <span className="font-semibold text-slate-800 text-xs tabular-nums">
                        {plan.maxDoctors} Doctors
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Max Branches
                      </span>
                      <span className="font-semibold text-slate-800 text-xs tabular-nums">
                        {plan.maxBranches} Branches
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Features ({plan.features?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(plan)}
                      className="text-[10px] font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      + Checklist
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {plan.features?.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Edit Plan Trigger & Delete */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 font-semibold flex items-center justify-center gap-1.5"
                  onClick={() => handleOpenEditModal(plan)}
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Edit Plan & Features</span>
                </Button>
                <button
                  type="button"
                  onClick={() => handleOpenDeleteModal(plan)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer shrink-0"
                  title={`Delete ${plan.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          );
        })}

        {/* Add New Plan Dashed Card */}
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="p-6 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl bg-slate-50/60 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center group cursor-pointer min-h-[400px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:border-blue-400 group-hover:bg-blue-50 flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition-colors shadow-2xs mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
            + Add New Subscription Tier
          </h3>
          <p className="text-xs text-slate-500 max-w-[200px] mt-1 leading-relaxed">
            Configure custom doctor thresholds, branch limits, dynamic annual discount rates, and tailored features.
          </p>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. EDIT PLAN & FEATURE CHECKLIST MODAL */}
      {/* ========================================================= */}
      {editingPlan && (
        <Modal
          isOpen={Boolean(editingPlan)}
          onClose={handleCloseEditModal}
          title={`Edit Plan: ${editingPlan.name}`}
          size="xl"
        >
          <div className="space-y-6 text-xs">
            {/* Basic Parameters */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Basic Parameters & Thresholds
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Max Doctors</label>
                  <input
                    type="number"
                    value={editingPlan.maxDoctors}
                    onChange={(e) => setEditingPlan({ ...editingPlan, maxDoctors: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Max Branches</label>
                  <input
                    type="number"
                    value={editingPlan.maxBranches}
                    onChange={(e) => setEditingPlan({ ...editingPlan, maxBranches: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Max Staff Seats</label>
                  <input
                    type="number"
                    value={editingPlan.maxStaff || 10}
                    onChange={(e) => setEditingPlan({ ...editingPlan, maxStaff: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tagline / Best For</label>
                <input
                  type="text"
                  value={editingPlan.tagline || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, tagline: e.target.value })}
                  placeholder="e.g. Best for solo practitioners & startup dental/specialty clinics"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editPlanIsPopular"
                  checked={Boolean(editingPlan.isPopular)}
                  onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor="editPlanIsPopular" className="text-xs font-semibold text-slate-700 select-none cursor-pointer">
                  Highlight as "Most Popular" plan on marketing and pricing pages
                </label>
              </div>
            </div>

            {/* Dynamic Annual Pricing & Commitment Discount Calculator */}
            <AnnualPricingCalculator
              monthlyPrice={editingPlan.monthlyPrice}
              annualPrice={editingPlan.annualPrice}
              onUpdatePrices={({ monthlyPrice: m, annualPrice: a }) => {
                setEditingPlan({
                  ...editingPlan,
                  monthlyPrice: m,
                  annualPrice: a
                });
              }}
            />

            {/* Feature Checklist Section */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Feature Checklist (Click to add or remove from plan)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Currently <strong>{editingPlan.features?.length || 0} features active</strong> in this tier.
                  </p>
                </div>

                {/* Search in Features */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={featureSearch}
                    onChange={(e) => setFeatureSearch(e.target.value)}
                    placeholder="Search available features..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Add Custom Feature Row */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeatureText}
                  onChange={(e) => setCustomFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomFeatureToCurrent(false);
                    }
                  }}
                  placeholder="Type a new custom feature to add to this plan..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  onClick={() => handleAddCustomFeatureToCurrent(false)}
                >
                  Add Feature
                </Button>
              </div>

              {/* Checklist Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/50">
                {filteredCatalog.map((featName) => {
                  const isChecked = editingPlan.features.includes(featName);

                  return (
                    <div
                      key={featName}
                      onClick={() => handleToggleEditingFeature(featName)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                        isChecked
                          ? 'bg-blue-50/90 border-blue-400 text-blue-950 font-semibold shadow-2xs'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                        <span className="text-xs leading-tight truncate">{featName}</span>
                      </div>

                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                          isChecked ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isChecked ? 'Included' : 'Off'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Custom features currently attached */}
              {editingPlan.features.filter((f) => !ALL_AVAILABLE_FEATURES.includes(f)).length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Custom Added Features ({editingPlan.features.filter((f) => !ALL_AVAILABLE_FEATURES.includes(f)).length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {editingPlan.features
                      .filter((f) => !ALL_AVAILABLE_FEATURES.includes(f))
                      .map((customFeat) => (
                        <span
                          key={customFeat}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{customFeat}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleEditingFeature(customFeat)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                            title="Remove feature"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:bg-rose-50"
                icon={Trash2}
                onClick={() => {
                  handleOpenDeleteModal(editingPlan);
                }}
              >
                Delete This Plan
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCloseEditModal}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" icon={Save} onClick={handleSaveEditModal}>
                  Save Plan Changes
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* 2. CREATE NEW PLAN MODAL */}
      {/* ========================================================= */}
      {isCreatingNewPlan && (
        <Modal
          isOpen={isCreatingNewPlan}
          onClose={handleCloseCreateModal}
          title="Create New Subscription Plan"
          size="xl"
        >
          <form onSubmit={handleSaveNewPlan} className="space-y-6 text-xs">
            {/* Basic Parameters */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Plan Identification & Limits
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Plan Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Specialty Day Care"
                    value={newPlanData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      setNewPlanData({
                        ...newPlanData,
                        name,
                        id: slug
                      });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Plan Identifier / Slug (Unique)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. specialty-day-care"
                    value={newPlanData.id}
                    onChange={(e) => setNewPlanData({ ...newPlanData, id: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Max Doctors</label>
                  <input
                    type="number"
                    min="1"
                    value={newPlanData.maxDoctors}
                    onChange={(e) => setNewPlanData({ ...newPlanData, maxDoctors: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Max Branches</label>
                  <input
                    type="number"
                    min="1"
                    value={newPlanData.maxBranches}
                    onChange={(e) => setNewPlanData({ ...newPlanData, maxBranches: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Max Staff Seats</label>
                  <input
                    type="number"
                    min="1"
                    value={newPlanData.maxStaff}
                    onChange={(e) => setNewPlanData({ ...newPlanData, maxStaff: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newPlanData.isPopular}
                      onChange={(e) => setNewPlanData({ ...newPlanData, isPopular: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="text-[11px] font-bold text-slate-700">Mark as Popular</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tagline / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Best for growing clinics expanding doctors and multi-chair operations"
                  value={newPlanData.tagline}
                  onChange={(e) => setNewPlanData({ ...newPlanData, tagline: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Dynamic Annual Pricing & Commitment Discount Calculator */}
            <AnnualPricingCalculator
              monthlyPrice={newPlanData.monthlyPrice}
              annualPrice={newPlanData.annualPrice}
              onUpdatePrices={({ monthlyPrice: m, annualPrice: a }) => {
                setNewPlanData({
                  ...newPlanData,
                  monthlyPrice: m,
                  annualPrice: a
                });
              }}
            />

            {/* Feature Checklist Section */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Feature Checklist (Select features provided in this tier)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Currently <strong>{newPlanData.features?.length || 0} features selected</strong> for this new tier.
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={featureSearch}
                    onChange={(e) => setFeatureSearch(e.target.value)}
                    placeholder="Search features..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Add Custom Feature Row */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeatureText}
                  onChange={(e) => setCustomFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomFeatureToCurrent(true);
                    }
                  }}
                  placeholder="Type a new custom feature to add to this tier..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  onClick={() => handleAddCustomFeatureToCurrent(true)}
                >
                  Add Feature
                </Button>
              </div>

              {/* Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/50">
                {filteredCatalog.map((featName) => {
                  const isChecked = newPlanData.features.includes(featName);

                  return (
                    <div
                      key={featName}
                      onClick={() => handleToggleNewPlanFeature(featName)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                        isChecked
                          ? 'bg-blue-50/90 border-blue-400 text-blue-950 font-semibold shadow-2xs'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                        <span className="text-xs leading-tight truncate">{featName}</span>
                      </div>

                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                          isChecked ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isChecked ? 'Included' : 'Off'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Custom features preview */}
              {newPlanData.features.filter((f) => !ALL_AVAILABLE_FEATURES.includes(f)).length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Custom Added Features ({newPlanData.features.filter((f) => !ALL_AVAILABLE_FEATURES.includes(f)).length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {newPlanData.features
                      .filter((f) => !ALL_AVAILABLE_FEATURES.includes(f))
                      .map((customFeat) => (
                        <span
                          key={customFeat}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{customFeat}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleNewPlanFeature(customFeat)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                            title="Remove feature"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" type="button" onClick={handleCloseCreateModal}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" icon={Plus}>
                Create & Publish Plan
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* 3. DELETE PLAN CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {deletingPlan && (
        <Modal
          isOpen={Boolean(deletingPlan)}
          onClose={handleCloseDeleteModal}
          title="Delete Subscription Tier"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-xs text-rose-900 space-y-1">
                <p className="font-bold text-sm text-rose-950">
                  Permanently delete "{deletingPlan.name}"?
                </p>
                <p className="text-rose-800 leading-relaxed">
                  This will remove the tier (ID: <span className="font-mono font-bold">{deletingPlan.id}</span>, ₹{deletingPlan.monthlyPrice.toLocaleString('en-IN')}/mo) from the active plan architect and self-service pricing directory.
                </p>
              </div>
            </div>

            {/* Check if any clinics use this plan */}
            {(() => {
              const attached = clinics.filter((c) => c.subscriptionPlanId === deletingPlan.id);
              if (attached.length > 0) {
                return (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-950">
                      ⚠️ {attached.length} Active Clinic(s) Assigned
                    </span>
                    <p className="leading-relaxed">
                      The following clinic(s) currently utilize this tier:{' '}
                      <strong>{attached.map((c) => c.name).join(', ')}</strong>. Deleting this tier will not disrupt their clinical operations, but their subscription tier should be upgraded or updated in Tenant Management.
                    </p>
                  </div>
                );
              }
              return (
                <p className="text-xs text-slate-500">
                  No registered clinics are currently subscribed to this tier. It can be safely removed.
                </p>
              );
            })()}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white border-transparent"
                icon={Trash2}
                onClick={handleConfirmDelete}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
