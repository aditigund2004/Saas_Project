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
const ALL_AVAILABLE_FEATURES = [
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
function calculateAnnualDiscount(monthlyPrice, annualPrice) {
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

  const handleMonthlyChange = (newVal) => {
    const safeMonthly = Math.max(0, Number(newVal) || 0);
    const pct = activeDiscountPercent > 0 ? activeDiscountPercent : 20;
    const newAnnual = Math.round((safeMonthly * 12) * (1 - pct / 100));
    onUpdatePrices({
      monthlyPrice: safeMonthly,
      annualPrice: newAnnual
    });
  };

  const handleDiscountChange = (newPct) => {
    const safePct = Math.min(100, Math.max(0, Number(newPct) || 0));
    setActiveDiscountPercent(safePct);
    const safeMonthly = Number(monthlyPrice) || 0;
    const newAnnual = Math.round((safeMonthly * 12) * (1 - safePct / 100));
    onUpdatePrices({
      monthlyPrice: safeMonthly,
      annualPrice: newAnnual
    });
  };

  const handleAnnualChange = (newAnnualVal) => {
    const safeAnnual = Math.max(0, Number(newAnnualVal) || 0);
    const safeMonthly = Number(monthlyPrice) || 0;
    const standard = safeMonthly * 12;
    const derived = standard > 0 ? Math.max(0, Math.min(100, Math.round(((standard - safeAnnual) / standard) * 100))) : 0;
    setActiveDiscountPercent(derived);
    onUpdatePrices({
      monthlyPrice: safeMonthly,
      annualPrice: safeAnnual
    });
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/75 dark:bg-blue-950/40 border border-blue-200/90 dark:border-blue-900/60 space-y-4">
      {/* Title & Commitment Advantage Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-200/70 dark:border-blue-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Dynamic Yearly Commitment Discount Calculator
            </h4>
            <p className="text-xs text-blue-800 dark:text-blue-300 mt-0.5">
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold font-mono self-start sm:self-auto shadow-xs">
          {activeDiscountPercent}% Discount
        </span>
      </div>

      {/* Inputs Grid: Monthly Price & Annual Billed Price in 2 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Column 1: Monthly Price */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Monthly Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
            <input
              type="number"
              min="0"
              value={monthlyPrice}
              onChange={(e) => handleMonthlyChange(e.target.value)}
              className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs"
              placeholder="e.g. 1999"
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
            12-month standard: ₹{standardAnnual.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Column 2: Annual Billed Price */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Annual Billed Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
            <input
              type="number"
              min="0"
              value={annualPrice}
              onChange={(e) => handleAnnualChange(e.target.value)}
              className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs"
              placeholder="e.g. 16792"
            />
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium block">
            Effective: ₹{discount.effectiveMonthly.toLocaleString('en-IN')}/mo (billed annually)
          </span>
        </div>
      </div>

      {/* Yearly Discount (% Less) Section in Place of Presets with 0-100% Slider Line */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-blue-200/80 dark:border-blue-900/60 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
            Yearly Discount (% Less)
          </label>
          <span className="text-sm font-extrabold text-blue-700 dark:text-blue-400 font-mono">
            {activeDiscountPercent}% OFF
          </span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={activeDiscountPercent}
            onChange={(e) => handleDiscountChange(e.target.value)}
            className="flex-1 accent-blue-600 cursor-pointer h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            title="Slide to dynamically adjust annual commitment discount up to 100%"
          />
          <div className="relative w-20 shrink-0">
            <input
              type="number"
              min="0"
              max="100"
              value={activeDiscountPercent}
              onChange={(e) => handleDiscountChange(e.target.value)}
              className="w-full px-2.5 py-2 text-center font-bold text-sm rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 font-mono bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">%</span>
          </div>
        </div>

        {/* Milestone Tick Marks & Quick Selection */}
        <div className="flex justify-between items-center text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 pt-0.5 px-0.5">
          <button type="button" onClick={() => handleDiscountChange(0)} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">0%</button>
          <button type="button" onClick={() => handleDiscountChange(20)} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">20%</button>
          <button type="button" onClick={() => handleDiscountChange(40)} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">40%</button>
          <button type="button" onClick={() => handleDiscountChange(60)} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">60%</button>
          <button type="button" onClick={() => handleDiscountChange(80)} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">80%</button>
          <button type="button" onClick={() => handleDiscountChange(100)} className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-colors">100%</button>
        </div>
      </div>

      {/* Live Calculated Savings Card */}
      <div className="p-4 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-950 dark:text-emerald-200 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-300 font-black text-sm shadow-xs mt-0.5">
              %
            </div>
            <div className="space-y-0.5">
              <div className="font-extrabold text-emerald-950 dark:text-white flex items-center gap-2 text-sm">
                <span>Customer Saves:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono text-base tabular-nums">
                  ₹{discount.savings.toLocaleString('en-IN')}/year
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold">
                  {activeDiscountPercent}% LESS
                </span>
              </div>
              <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                Yearly Commitment Rate:{' '}
                <strong className="font-mono text-emerald-950 dark:text-white font-bold">
                  ₹{discount.effectiveMonthly.toLocaleString('en-IN')}/month
                </strong>{' '}
                (Customer pays <strong className="text-emerald-950 dark:text-white">₹{discount.monthlySavings.toLocaleString('en-IN')}/mo less</strong> than the ₹{Number(monthlyPrice).toLocaleString('en-IN')}/mo month-to-month rate).
              </div>
            </div>
          </div>

          <div className="sm:text-right sm:border-l sm:border-emerald-200 dark:sm:border-emerald-900 sm:pl-4 shrink-0">
            <span className="block text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400">
              Yearly Commitment Rate
            </span>
            <div className="font-mono text-xs mt-0.5">
              <span className="line-through text-slate-400">
                ₹{discount.standardAnnualCost.toLocaleString('en-IN')}
              </span>
              <span className="text-emerald-950 dark:text-emerald-200 font-bold ml-1.5 text-base">
                ➔ ₹{annualPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 block mt-0.5">
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

  const [editingPlan, setEditingPlan] = useState(null);
  const [isCreatingNewPlan, setIsCreatingNewPlan] = useState(false);
  const [newPlanData, setNewPlanData] = useState(INITIAL_NEW_PLAN);
  const [deletingPlan, setDeletingPlan] = useState(null);
  const [featureSearch, setFeatureSearch] = useState('');
  const [customFeatureText, setCustomFeatureText] = useState('');

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

  const handleOpenDeleteModal = (plan) => {
    setDeletingPlan(plan);
  };

  const handleCloseDeleteModal = () => {
    setDeletingPlan(null);
  };

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

  const handleSaveNewPlan = (e) => {
    e?.preventDefault();
    if (!newPlanData.name.trim()) {
      showToast('Please provide a name for the new plan.', 'error');
      return;
    }

    const cleanId = (newPlanData.id.trim() || newPlanData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
    
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

  const filteredCatalog = ALL_AVAILABLE_FEATURES.filter((f) =>
    f.toLowerCase().includes(featureSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Plan Architect</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Subscription Tier Pricing & Limits
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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
            className="shadow-xs font-bold"
          >
            Create New Plan
          </Button>
        </div>
      </div>

      {/* Plans Grid: 2 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {plans.map((plan) => {
          const discountInfo = calculateAnnualDiscount(plan.monthlyPrice, plan.annualPrice);

          return (
            <Card
              key={plan.id}
              className="p-5 sm:p-6 border-slate-200/90 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm group relative"
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Header: Title, ID Badge & Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight truncate">
                      {plan.name}
                    </h3>
                    <span className="text-xs uppercase font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 font-mono inline-block mt-1">
                      ID: {plan.id}
                    </span>
                  </div>

                  {/* Header Actions: Edit & Delete */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(plan)}
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                      title={`Edit ${plan.name} features & pricing`}
                      aria-label={`Edit ${plan.name}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenDeleteModal(plan)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                      title={`Delete ${plan.name}`}
                      aria-label={`Delete ${plan.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tagline */}
                {plan.tagline && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {plan.tagline}
                  </p>
                )}

                {/* Pricing: Month-to-Month & Yearly Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-800">
                  {/* Month-to-Month Rate */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Month-to-Month
                      </span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums mt-1.5">
                        ₹{plan.monthlyPrice.toLocaleString('en-IN')}<span className="text-sm text-slate-500 dark:text-slate-400 font-normal">/mo</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 block">Standard monthly billing</span>
                  </div>

                  {/* Yearly Commitment Rate & Discount */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                          Yearly Commitment
                        </span>
                        {discountInfo.hasDiscount && (
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-mono">
                            {discountInfo.discountPercent}% OFF
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300 font-mono tabular-nums">
                          ₹{discountInfo.effectiveMonthly.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">/mo</span>
                        {discountInfo.hasDiscount && (
                          <span className="line-through text-slate-400 text-xs font-mono tabular-nums ml-1">
                            ₹{plan.monthlyPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                    {discountInfo.hasDiscount ? (
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-2 block">
                        ₹{plan.annualPrice.toLocaleString('en-IN')}/yr (Save ₹{discountInfo.savings.toLocaleString('en-IN')})
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
                        ₹{plan.annualPrice.toLocaleString('en-IN')}/year
                      </span>
                    )}
                  </div>
                </div>

                {/* Capacity Limits: Doctors & Branches */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Doctor Seats
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm tabular-nums mt-0.5 block">
                      {plan.maxDoctors} Active Doctors
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Branch Limit
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm tabular-nums mt-0.5 block">
                      {plan.maxBranches} Clinic Branches
                    </span>
                  </div>
                </div>

                {/* Features List (in 2 columns for easy scanning) */}
                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Included Features ({plan.features?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(plan)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      + Edit Checklist
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {plan.features?.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Edit Plan Trigger & Delete */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 font-semibold flex items-center justify-center gap-1.5"
                  onClick={() => handleOpenEditModal(plan)}
                >
                  <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Edit Plan & Features</span>
                </Button>
                <button
                  type="button"
                  onClick={() => handleOpenDeleteModal(plan)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
                  title={`Delete ${plan.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          );
        })}
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
          <div className="space-y-6 text-sm">
            {/* Basic Parameters */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Basic Parameters & Thresholds
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Max Doctors</label>
                  <input
                    type="number"
                    value={editingPlan.maxDoctors}
                    onChange={(e) => setEditingPlan({ ...editingPlan, maxDoctors: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Max Branches</label>
                  <input
                    type="number"
                    value={editingPlan.maxBranches}
                    onChange={(e) => setEditingPlan({ ...editingPlan, maxBranches: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Max Staff Seats</label>
                  <input
                    type="number"
                    value={editingPlan.maxStaff || 10}
                    onChange={(e) => setEditingPlan({ ...editingPlan, maxStaff: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline / Best For</label>
                <input
                  type="text"
                  value={editingPlan.tagline || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, tagline: e.target.value })}
                  placeholder="e.g. Best for solo practitioners & startup dental/specialty clinics"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editPlanIsPopular"
                  checked={Boolean(editingPlan.isPopular)}
                  onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor="editPlanIsPopular" className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none cursor-pointer">
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
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Feature Checklist (Click to add or remove from plan)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Currently <strong>{editingPlan.features?.length || 0} features active</strong> in this tier.
                  </p>
                </div>

                {/* Search in Features */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={featureSearch}
                    onChange={(e) => setFeatureSearch(e.target.value)}
                    placeholder="Search available features..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-2 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40">
                {filteredCatalog.map((featName) => {
                  const isChecked = editingPlan.features.includes(featName);

                  return (
                    <div
                      key={featName}
                      onClick={() => handleToggleEditingFeature(featName)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                        isChecked
                          ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-400 dark:border-blue-800 text-blue-950 dark:text-blue-200 font-semibold shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isChecked ? (
                          <CheckSquare className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        ) : (
                          <Square className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600 shrink-0" />
                        )}
                        <span className="text-xs leading-tight truncate">{featName}</span>
                      </div>

                      <span
                        className={`text-xs px-2 py-0.5 rounded font-mono shrink-0 ${
                          isChecked ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
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
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                    Custom Added Features ({editingPlan.features.filter((f) => !ALL_AVAILABLE_FEATURES.includes(f)).length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {editingPlan.features
                      .filter((f) => !ALL_AVAILABLE_FEATURES.includes(f))
                      .map((customFeat) => (
                        <span
                          key={customFeat}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{customFeat}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleEditingFeature(customFeat)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                            title="Remove feature"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
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
          <form onSubmit={handleSaveNewPlan} className="space-y-6 text-sm">
            {/* Basic Parameters */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Plan Identification & Limits
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
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
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Plan Identifier / Slug (Unique)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. specialty-day-care"
                    value={newPlanData.id}
                    onChange={(e) => setNewPlanData({ ...newPlanData, id: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Max Doctors</label>
                  <input
                    type="number"
                    min="1"
                    value={newPlanData.maxDoctors}
                    onChange={(e) => setNewPlanData({ ...newPlanData, maxDoctors: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Max Branches</label>
                  <input
                    type="number"
                    min="1"
                    value={newPlanData.maxBranches}
                    onChange={(e) => setNewPlanData({ ...newPlanData, maxBranches: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Max Staff Seats</label>
                  <input
                    type="number"
                    min="1"
                    value={newPlanData.maxStaff}
                    onChange={(e) => setNewPlanData({ ...newPlanData, maxStaff: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newPlanData.isPopular}
                      onChange={(e) => setNewPlanData({ ...newPlanData, isPopular: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Mark as Popular</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Best for growing clinics expanding doctors and multi-chair operations"
                  value={newPlanData.tagline}
                  onChange={(e) => setNewPlanData({ ...newPlanData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Feature Checklist (Select features provided in this tier)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Currently <strong>{newPlanData.features?.length || 0} features selected</strong> for this new tier.
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={featureSearch}
                    onChange={(e) => setFeatureSearch(e.target.value)}
                    placeholder="Search features..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-2 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40">
                {filteredCatalog.map((featName) => {
                  const isChecked = newPlanData.features.includes(featName);

                  return (
                    <div
                      key={featName}
                      onClick={() => handleToggleNewPlanFeature(featName)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                        isChecked
                          ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-400 dark:border-blue-800 text-blue-950 dark:text-blue-200 font-semibold shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isChecked ? (
                          <CheckSquare className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        ) : (
                          <Square className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600 shrink-0" />
                        )}
                        <span className="text-xs leading-tight truncate">{featName}</span>
                      </div>

                      <span
                        className={`text-xs px-2 py-0.5 rounded font-mono shrink-0 ${
                          isChecked ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
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
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                    Custom Added Features ({newPlanData.features.filter((f) => !ALL_AVAILABLE_FEATURES.includes(f)).length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {newPlanData.features
                      .filter((f) => !ALL_AVAILABLE_FEATURES.includes(f))
                      .map((customFeat) => (
                        <span
                          key={customFeat}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{customFeat}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleNewPlanFeature(customFeat)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                            title="Remove feature"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
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
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-sm text-rose-900 dark:text-rose-200 space-y-1">
                <p className="font-bold text-base text-rose-950 dark:text-rose-100">
                  Permanently delete "{deletingPlan.name}"?
                </p>
                <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
                  This will remove the tier (ID: <span className="font-mono font-bold">{deletingPlan.id}</span>, ₹{deletingPlan.monthlyPrice.toLocaleString('en-IN')}/mo) from the active plan architect and self-service pricing directory.
                </p>
              </div>
            </div>

            {/* Check if any clinics use this plan */}
            {(() => {
              const attached = clinics.filter((c) => c.subscriptionPlanId === deletingPlan.id);
              if (attached.length > 0) {
                return (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-950 dark:text-amber-100">
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
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No registered clinics are currently subscribed to this tier. It can be safely removed.
                </p>
              );
            })()}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
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
