import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Check,
  RotateCcw,
  Building2,
  AlertTriangle,
  X,
  Tag,
  CheckSquare,
  Square
} from 'lucide-react';

const STANDARD_FEATURE_CATALOG = [
  '14-Day Full Access Free Trial',
  'Up to 2 Doctor Schedules',
  'Up to 5 Doctor Profiles & Rotas',
  'Up to 10 Doctors & 3 Branches',
  'Unlimited Doctors & 10 Branches',
  'Single Branch Management',
  '2 Branch Operations & Switching',
  'Branch-Level Analytics & Switching',
  'Online & Walk-In Bookings',
  'Daily Reception Queue & Checklist',
  'Receptionist Walk-In Express Mode',
  'Live Waiting Queue Management',
  'Digital Prescriptions & Print PDF',
  'Clinical Prescription Composer & PDF Generator',
  'Full Digital Rx Builder with Drug Presets',
  'QR Code Authenticity Verification Portal',
  'Basic WhatsApp Confirmation Templates',
  'Automated SMS & WhatsApp Reminders',
  'Automated WhatsApp Reminders & Follow-Ups',
  'Post-Op WhatsApp Recovery Follow-Ups',
  'WhatsApp Business API Dedicated Webhook Adapter',
  'Billing, Invoicing & Daily Collections',
  'Billing, Invoicing & Expense Tracking',
  'Clinical Inventory Alerts & Reorders',
  'Clinical Inventory & Low-Stock Alerts',
  'Automated Pharmacy & Consumables Restock',
  'Standard Financial & Patient Reports',
  'Custom Operational & Financial Reports',
  'Multi-Branch Consolidated Reporting',
  'Advanced Role-Based Permissions',
  'Nursing Home Bed Occupancy Tracker (10-30 Beds)',
  'Doctor Commission & Revenue Split Analytics',
  'Dedicated Email & Chat Support',
  'Custom SLA & 24/7 Priority Emergency Support'
];

export function PlatformPlansPage() {
  const { plans, clinics, createPlan, updatePlan, deletePlan, resetPlans, showToast } = useApp();

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [deletingPlan, setDeletingPlan] = useState(null);
  const [fallbackPlanId, setFallbackPlanId] = useState('');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form state for creating a plan
  const [createForm, setCreateForm] = useState({
    name: '',
    id: '',
    tagline: '',
    monthlyPrice: 3499,
    originalMonthlyPrice: 4499,
    discountPercent: 20,
    annualPrice: 34990,
    maxDoctors: 3,
    maxBranches: 1,
    maxStaff: 5,
    isPopular: false,
    features: [
      '14-Day Full Access Free Trial',
      'Online & Walk-In Bookings',
      'Digital Prescriptions & Print PDF',
      'QR Code Authenticity Verification Portal',
      'Basic WhatsApp Confirmation Templates'
    ]
  });
  const [newFeatureText, setNewFeatureText] = useState('');

  // Form state for editing a plan
  const [editForm, setEditForm] = useState(null);
  const [editFeatureText, setEditFeatureText] = useState('');

  // Open Edit Modal
  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    const discount = plan.discountPercent !== undefined ? plan.discountPercent : 15;
    const origPrice = plan.originalMonthlyPrice || (discount > 0 ? Math.round(plan.monthlyPrice / (1 - discount / 100)) : plan.monthlyPrice);

    setEditForm({
      name: plan.name,
      tagline: plan.tagline || '',
      monthlyPrice: plan.monthlyPrice,
      originalMonthlyPrice: origPrice,
      discountPercent: discount,
      annualPrice: plan.annualPrice,
      maxDoctors: plan.maxDoctors,
      maxBranches: plan.maxBranches,
      maxStaff: plan.maxStaff || 4,
      isPopular: Boolean(plan.isPopular),
      features: [...plan.features]
    });
    setEditFeatureText('');
  };

  // Open Delete Modal
  const handleOpenDelete = (plan) => {
    setDeletingPlan(plan);
    const otherPlans = plans.filter((p) => p.id !== plan.id);
    setFallbackPlanId(otherPlans[0]?.id || '');
  };

  // Handle Create Submit
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!createForm.name.trim()) {
      showToast('Please enter a valid plan name.', 'error');
      return;
    }
    const created = createPlan(createForm);
    if (created) {
      setIsCreateModalOpen(false);
      setCreateForm({
        name: '',
        id: '',
        tagline: '',
        monthlyPrice: 3499,
        originalMonthlyPrice: 4499,
        discountPercent: 20,
        annualPrice: 34990,
        maxDoctors: 3,
        maxBranches: 1,
        maxStaff: 5,
        isPopular: false,
        features: [
          '14-Day Full Access Free Trial',
          'Online & Walk-In Bookings',
          'Digital Prescriptions & Print PDF',
          'QR Code Authenticity Verification Portal',
          'Basic WhatsApp Confirmation Templates'
        ]
      });
      setNewFeatureText('');
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      showToast('Please enter a valid plan name.', 'error');
      return;
    }
    updatePlan(editingPlan.id, editForm);
    setEditingPlan(null);
    setEditForm(null);
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = () => {
    if (!deletingPlan) return;
    const res = deletePlan(deletingPlan.id, fallbackPlanId);
    if (res.success) {
      setDeletingPlan(null);
    }
  };

  // Toggle Feature in Create Form
  const toggleCreateFeature = (feature) => {
    setCreateForm((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature]
      };
    });
  };

  // Toggle Feature in Edit Form
  const toggleEditFeature = (feature) => {
    setEditForm((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature]
      };
    });
  };

  // Add custom feature to create form
  const handleAddCreateFeature = () => {
    if (newFeatureText.trim()) {
      const feat = newFeatureText.trim();
      if (!createForm.features.includes(feat)) {
        setCreateForm((prev) => ({
          ...prev,
          features: [...prev.features, feat]
        }));
      }
      setNewFeatureText('');
    }
  };

  // Add custom feature to edit form
  const handleAddEditFeature = () => {
    if (editFeatureText.trim()) {
      const feat = editFeatureText.trim();
      if (!editForm.features.includes(feat)) {
        setEditForm((prev) => ({
          ...prev,
          features: [...prev.features, feat]
        }));
      }
      setEditFeatureText('');
    }
  };

  // Statistics
  const popularPlan = plans.find((p) => p.isPopular) || plans[0];
  const clinicsOnPlans = clinics.reduce((acc, c) => {
    acc[c.subscriptionPlanId] = (acc[c.subscriptionPlanId] || 0) + 1;
    return acc;
  }, {});

  const deletingPlanSubscribers = deletingPlan
    ? clinics.filter((c) => c.subscriptionPlanId === deletingPlan.id)
    : [];

  // All known features union
  const allAvailableFeatures = Array.from(
    new Set([
      ...STANDARD_FEATURE_CATALOG,
      ...plans.flatMap((p) => p.features || []),
      ...(createForm.features || []),
      ...(editForm?.features || [])
    ])
  );

  return (
    <div className="space-y-6">
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Plan Architect</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Subscription Tier Pricing & Limits
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure promotional discounts, quotas, feature check buttons, and manage each tier individually.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={() => setIsResetConfirmOpen(true)}
            title="Restore initial default plans"
          >
            Reset Defaults
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Plan
          </Button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Tiers</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{plans.length} Plans</div>
          <span className="text-[10px] text-blue-600 font-medium mt-0.5 block">Configured in catalog</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Featured Tier</span>
          <div className="text-base font-extrabold text-blue-700 mt-1 truncate">
            {popularPlan ? popularPlan.name : 'None'}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
            {popularPlan?.discountPercent ? `${popularPlan.discountPercent}% Promotional Discount` : 'Active'}
          </span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subscribed Clinics</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{clinics.length} Tenants</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">Active & trial accounts</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pricing Range</span>
          <div className="text-base font-extrabold text-slate-900 mt-1">
            ₹{plans.length > 0 ? Math.min(...plans.map((p) => p.monthlyPrice || 0)).toLocaleString('en-IN') : 0} – ₹
            {plans.length > 0 ? Math.max(...plans.map((p) => p.monthlyPrice || 0)).toLocaleString('en-IN') : 0}
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Per clinic/month</span>
        </Card>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => {
          const subscriberCount = clinicsOnPlans[plan.id] || 0;
          const discount = plan.discountPercent !== undefined ? plan.discountPercent : 20;
          const originalPrice = plan.originalMonthlyPrice || (discount > 0 ? Math.round(plan.monthlyPrice / (1 - discount / 100)) : plan.monthlyPrice);

          return (
            <Card
              key={plan.id}
              className={`p-6 border flex flex-col justify-between relative transition-all duration-200 ${
                plan.isPopular
                  ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-600 text-white shadow-sm uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{plan.name}</h3>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                      ID: {plan.id}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                    {subscriberCount} {subscriberCount === 1 ? 'Clinic' : 'Clinics'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 min-h-[36px] line-clamp-2 leading-relaxed">
                  {plan.tagline || 'ClinicOS multi-specialty healthcare practice tier.'}
                </p>

                {/* Pricing Block with Discount */}
                <div className="pt-3 pb-3 border-y border-slate-100 space-y-1.5">
                  <div className="flex items-center gap-2">
                    {discount > 0 && originalPrice > plan.monthlyPrice && (
                      <span className="text-xs font-semibold text-slate-400 line-through font-mono">
                        ₹{originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Tag className="w-2.5 h-2.5 text-emerald-600" /> {discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{plan.monthlyPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Annual: ₹{plan.annualPrice.toLocaleString('en-IN')}/yr</span>
                  </div>
                </div>

                {/* Quotas */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 text-center text-xs">
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-bold tracking-wider">Doctors</span>
                    <span className="font-extrabold text-slate-800">{plan.maxDoctors}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-bold tracking-wider">Branches</span>
                    <span className="font-extrabold text-slate-800">{plan.maxBranches}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-bold tracking-wider">Staff</span>
                    <span className="font-extrabold text-slate-800">{plan.maxStaff || 4}</span>
                  </div>
                </div>

                {/* Features List with Checkmarks */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Included Features ({plan.features.length})
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold">Enabled</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600 leading-tight">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Card Actions Footer */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Edit2}
                  className="flex-1"
                  onClick={() => handleOpenEdit(plan)}
                >
                  Edit Plan
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 shrink-0"
                  onClick={() => handleOpenDelete(plan)}
                  title={`Delete ${plan.name} individually`}
                >
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* CREATE PLAN MODAL WITH DISCOUNT & FEATURE CHECK BUTTONS */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Subscription Plan"
          size="lg"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daycare Surgical Center"
                  value={createForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const autoId = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                    setCreateForm((prev) => ({
                      ...prev,
                      name,
                      id: prev.id === '' || prev.id.startsWith('plan-') ? autoId : prev.id
                    }));
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Plan Identifier / Slug *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. daycare-surgical"
                  value={createForm.id}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, id: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Tagline / Summary Description
              </label>
              <input
                type="text"
                placeholder="e.g. Ideal for multi-operating daycare and specialized short-stay centers"
                value={createForm.tagline}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pricing & Discount Controls (Requirement 25) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800 uppercase flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-600" /> Plan Pricing & Discount Configuration
                </span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                  {createForm.discountPercent}% Discount Applied
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={createForm.discountPercent}
                    onChange={(e) => {
                      const disc = Math.max(0, Math.min(90, Number(e.target.value)));
                      const orig = Number(createForm.originalMonthlyPrice) || 4499;
                      const discounted = Math.round(orig * (1 - disc / 100));
                      setCreateForm((prev) => ({
                        ...prev,
                        discountPercent: disc,
                        monthlyPrice: discounted,
                        annualPrice: discounted * 10
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Quick discount chips */}
                  <div className="flex gap-1 mt-1">
                    {[10, 15, 20, 25, 30].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          const orig = Number(createForm.originalMonthlyPrice) || 4499;
                          const discounted = Math.round(orig * (1 - d / 100));
                          setCreateForm((prev) => ({
                            ...prev,
                            discountPercent: d,
                            monthlyPrice: discounted,
                            annualPrice: discounted * 10
                          }));
                        }}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                          createForm.discountPercent === d
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {d}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Original Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={createForm.originalMonthlyPrice}
                    onChange={(e) => {
                      const orig = Number(e.target.value);
                      const disc = Number(createForm.discountPercent) || 0;
                      const discounted = Math.round(orig * (1 - disc / 100));
                      setCreateForm((prev) => ({
                        ...prev,
                        originalMonthlyPrice: orig,
                        monthlyPrice: discounted,
                        annualPrice: discounted * 10
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Regular catalog price</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Discounted Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="50"
                    value={createForm.monthlyPrice}
                    onChange={(e) => {
                      const mPrice = Number(e.target.value);
                      setCreateForm((prev) => ({
                        ...prev,
                        monthlyPrice: mPrice,
                        annualPrice: mPrice * 10
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-emerald-400 bg-emerald-50/40 text-xs font-black font-mono text-emerald-900 focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 block">What clinic pays / month</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Annual Price (INR ₹)</span>
                  <div className="text-xs font-extrabold text-slate-800 font-mono">
                    ₹{createForm.annualPrice.toLocaleString('en-IN')}/year
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCreateForm((prev) => ({ ...prev, annualPrice: Number(prev.monthlyPrice) * 10 }))
                  }
                  className="text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Sync to 10x (2 Months Free)
                </button>
              </div>
            </div>

            {/* Quota Limits */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Max Doctors</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={createForm.maxDoctors}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, maxDoctors: Number(e.target.value) }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Max Branches</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="50"
                  value={createForm.maxBranches}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, maxBranches: Number(e.target.value) }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Max Staff</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={createForm.maxStaff}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, maxStaff: Number(e.target.value) }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="createPopular"
                checked={createForm.isPopular}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, isPopular: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="createPopular" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Mark as Most Popular (Highlighted on public pricing page)
              </label>
            </div>

            {/* Feature Checklist Section (Requirement 28 - Check buttons for including features) */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase">
                    Select Features With Check Buttons ({createForm.features.length} Included)
                  </label>
                  <p className="text-[10px] text-slate-500">
                    Click each check button to include or exclude that capability in this plan.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCreateForm((prev) => ({ ...prev, features: [...STANDARD_FEATURE_CATALOG] }))
                    }
                    className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setCreateForm((prev) => ({ ...prev, features: [] }))}
                    className="text-[10px] text-slate-500 font-bold hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Check button features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                {allAvailableFeatures.map((feature, idx) => {
                  const isChecked = createForm.features.includes(feature);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleCreateFeature(feature)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-blue-50/80 border-blue-400 text-blue-900 font-semibold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-[11px] leading-tight">{feature}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Feature */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Type a custom feature name..."
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCreateFeature();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddCreateFeature}>
                  + Add Feature
                </Button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={Plus}>
                Create Plan
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* EDIT PLAN MODAL WITH DISCOUNT & FEATURE CHECK BUTTONS */}
      {editingPlan && editForm && (
        <Modal
          isOpen={Boolean(editingPlan)}
          onClose={() => setEditingPlan(null)}
          title={`Edit Subscription Plan: ${editingPlan.name}`}
          size="lg"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Plan Identifier / Slug (Read-only)
                </label>
                <input
                  type="text"
                  disabled
                  value={editingPlan.id}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-xs font-mono font-semibold text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Tagline / Summary Description
              </label>
              <input
                type="text"
                value={editForm.tagline}
                onChange={(e) => setEditForm((prev) => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pricing & Discount Controls (Requirement 25) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800 uppercase flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-600" /> Plan Pricing & Discount Configuration
                </span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                  {editForm.discountPercent}% Discount Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={editForm.discountPercent}
                    onChange={(e) => {
                      const disc = Math.max(0, Math.min(90, Number(e.target.value)));
                      const orig = Number(editForm.originalMonthlyPrice) || editForm.monthlyPrice;
                      const discounted = Math.round(orig * (1 - disc / 100));
                      setEditForm((prev) => ({
                        ...prev,
                        discountPercent: disc,
                        monthlyPrice: discounted,
                        annualPrice: discounted * 10
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Quick chips */}
                  <div className="flex gap-1 mt-1">
                    {[10, 15, 20, 25, 30].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          const orig = Number(editForm.originalMonthlyPrice) || editForm.monthlyPrice;
                          const discounted = Math.round(orig * (1 - d / 100));
                          setEditForm((prev) => ({
                            ...prev,
                            discountPercent: d,
                            monthlyPrice: discounted,
                            annualPrice: discounted * 10
                          }));
                        }}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                          editForm.discountPercent === d
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {d}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Original Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={editForm.originalMonthlyPrice}
                    onChange={(e) => {
                      const orig = Number(e.target.value);
                      const disc = Number(editForm.discountPercent) || 0;
                      const discounted = Math.round(orig * (1 - disc / 100));
                      setEditForm((prev) => ({
                        ...prev,
                        originalMonthlyPrice: orig,
                        monthlyPrice: discounted,
                        annualPrice: discounted * 10
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Catalog baseline</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Discounted Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="50"
                    value={editForm.monthlyPrice}
                    onChange={(e) => {
                      const mPrice = Number(e.target.value);
                      setEditForm((prev) => ({
                        ...prev,
                        monthlyPrice: mPrice,
                        annualPrice: mPrice * 10
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-emerald-400 bg-emerald-50/40 text-xs font-black font-mono text-emerald-900 focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 block">Effective billing rate</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Annual Price (INR ₹)</span>
                  <div className="text-xs font-extrabold text-slate-800 font-mono">
                    ₹{editForm.annualPrice.toLocaleString('en-IN')}/year
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, annualPrice: Number(prev.monthlyPrice) * 10 }))
                  }
                  className="text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Sync to 10x (2 Months Free)
                </button>
              </div>
            </div>

            {/* Quotas */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Max Doctors</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={editForm.maxDoctors}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, maxDoctors: Number(e.target.value) }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Max Branches</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="50"
                  value={editForm.maxBranches}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, maxBranches: Number(e.target.value) }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Max Staff</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={editForm.maxStaff}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, maxStaff: Number(e.target.value) }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="editPopular"
                checked={editForm.isPopular}
                onChange={(e) => setEditForm((prev) => ({ ...prev, isPopular: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="editPopular" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Mark as Most Popular (Highlighted with badge)
              </label>
            </div>

            {/* Feature Checklist Section (Requirement 28 - Check buttons for including features) */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase">
                    Included Features With Check Buttons ({editForm.features.length} Selected)
                  </label>
                  <p className="text-[10px] text-slate-500">
                    Toggle check buttons to include or exclude features from this specific tier.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditForm((prev) => ({ ...prev, features: [...STANDARD_FEATURE_CATALOG] }))
                    }
                    className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setEditForm((prev) => ({ ...prev, features: [] }))}
                    className="text-[10px] text-slate-500 font-bold hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Check button features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                {allAvailableFeatures.map((feature, idx) => {
                  const isChecked = editForm.features.includes(feature);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleEditFeature(feature)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-blue-50/80 border-blue-400 text-blue-900 font-semibold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-[11px] leading-tight">{feature}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Feature */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Type a custom feature name..."
                  value={editFeatureText}
                  onChange={(e) => setEditFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEditFeature();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddEditFeature}>
                  + Add Feature
                </Button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingPlan(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE PLAN CONFIRMATION MODAL */}
      {deletingPlan && (
        <Modal
          isOpen={Boolean(deletingPlan)}
          onClose={() => setDeletingPlan(null)}
          title={`Delete Plan: ${deletingPlan.name}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Permanent Plan Removal</p>
                <p className="text-[11px] text-red-700 mt-0.5">
                  Are you sure you want to delete <strong>{deletingPlan.name}</strong> (ID: {deletingPlan.id})? This tier will be removed from pricing catalogs and tenant options.
                </p>
              </div>
            </div>

            {deletingPlanSubscribers.length > 0 ? (
              <div className="space-y-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <p className="font-bold flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-700" />
                  {deletingPlanSubscribers.length} Clinic(s) currently subscribed to this tier:
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
                  {deletingPlanSubscribers.map((c) => (
                    <li key={c.id}>
                      <strong>{c.name}</strong> ({c.city} - {c.specialty})
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-amber-200/80">
                  <label className="block text-[11px] font-bold text-amber-900 mb-1">
                    Migrate subscribed clinics to fallback plan:
                  </label>
                  <select
                    value={fallbackPlanId}
                    onChange={(e) => setFallbackPlanId(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold"
                  >
                    {plans
                      .filter((p) => p.id !== deletingPlan.id)
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (₹{p.monthlyPrice.toLocaleString('en-IN')}/mo)
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ) : (
              <p className="text-slate-600 leading-relaxed">
                There are currently <strong>0 clinics</strong> enrolled in this plan. It can be safely deleted immediately.
              </p>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setDeletingPlan(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={handleDeleteConfirm}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* RESET DEFAULT PLANS CONFIRMATION */}
      {isResetConfirmOpen && (
        <Modal
          isOpen={isResetConfirmOpen}
          onClose={() => setIsResetConfirmOpen(false)}
          title="Restore Default Subscription Tiers"
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              This will reset the plan catalog back to the initial standard ClinicOS tiers: <strong>Starter Clinic</strong>, <strong>Growth Practice</strong>, <strong>Professional Multi-Specialty</strong>, and <strong>Enterprise / Nursing Home</strong>.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setIsResetConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  resetPlans();
                  setIsResetConfirmOpen(false);
                }}
              >
                Restore Defaults
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
