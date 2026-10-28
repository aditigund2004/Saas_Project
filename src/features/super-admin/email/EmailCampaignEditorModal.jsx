import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import {
  Save,
  Plus,
  X,
  AlertCircle
} from 'lucide-react';

export function EmailCampaignEditorModal({
  isOpen,
  onClose,
  campaign,
  templates = [],
  clinics = [],
  plans = [],
  onSave
}) {
  const isEditing = Boolean(campaign?.id);

  const [formData, setFormData] = useState({
    id: campaign?.id || `cmp-${Date.now().toString().slice(-6)}`,
    name: campaign?.name || '',
    featureName: campaign?.featureName || '',
    featureDescription: campaign?.featureDescription || '',
    keyBenefits: campaign?.keyBenefits || ['Saves front-desk triage time', 'Automated instant WhatsApp delivery'],
    releaseDate: campaign?.releaseDate || 'November 15, 2026',
    actionUrl: campaign?.actionUrl || 'https://clinicos.app/dashboard',
    selectedTemplateId: campaign?.selectedTemplateId || (templates[0]?.id || ''),
    targetAudience: campaign?.targetAudience || {
      type: 'all',
      planIds: [],
      clinicIds: [],
      roles: ['hospital_admin']
    },
    status: campaign?.status || 'draft',
    newBenefitInput: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  // Calculate matching recipient clinics count
  const calculateRecipients = () => {
    if (formData.targetAudience.type === 'all') return clinics.length;
    if (formData.targetAudience.type === 'plans') {
      if (formData.targetAudience.planIds.length === 0) return 0;
      return clinics.filter((c) => formData.targetAudience.planIds.includes(c.subscriptionPlanId || 'starter')).length;
    }
    if (formData.targetAudience.type === 'clinics') {
      return formData.targetAudience.clinicIds.length;
    }
    return clinics.length;
  };

  const recipientCount = calculateRecipients();

  const handleAddBenefit = () => {
    if (!formData.newBenefitInput.trim()) return;
    setFormData({
      ...formData,
      keyBenefits: [...formData.keyBenefits, formData.newBenefitInput.trim()],
      newBenefitInput: ''
    });
  };

  const handleRemoveBenefit = (index) => {
    setFormData({
      ...formData,
      keyBenefits: formData.keyBenefits.filter((_, i) => i !== index)
    });
  };

  const handleTogglePlan = (planId) => {
    const exists = formData.targetAudience.planIds.includes(planId);
    const updated = exists
      ? formData.targetAudience.planIds.filter((id) => id !== planId)
      : [...formData.targetAudience.planIds, planId];

    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        planIds: updated
      }
    });
  };

  const handleToggleClinic = (clinicId) => {
    const exists = formData.targetAudience.clinicIds.includes(clinicId);
    const updated = exists
      ? formData.targetAudience.clinicIds.filter((id) => id !== clinicId)
      : [...formData.targetAudience.clinicIds, clinicId];

    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        clinicIds: updated
      }
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Campaign name is required.');
      return;
    }
    if (!formData.featureName.trim()) {
      setErrorMsg('Feature name is required.');
      return;
    }

    onSave({
      ...formData,
      simulatedRecipientCount: recipientCount,
      createdAt: campaign?.createdAt || new Date().toISOString()
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit Campaign: ${campaign.name}` : 'Create New Feature Announcement Campaign'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />

            <span>{errorMsg}</span>
          </div>
        )}

        {/* Campaign Info */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3.5">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
            Campaign Overview & Feature Details
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

                Campaign Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Online Appointment Booking Rollout"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

                Feature Name Announced <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.featureName}
                onChange={(e) => setFormData({ ...formData, featureName: e.target.value })}
                placeholder="e.g. Online Patient Self-Booking Portal"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

              Feature Description
            </label>
            <textarea
              rows={2}
              value={formData.featureDescription}
              onChange={(e) => setFormData({ ...formData, featureDescription: e.target.value })}
              placeholder="Explain how this clinical feature benefits doctors, receptionists, and patients..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

                Release / Availability Date
              </label>
              <input
                type="text"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                placeholder="e.g. November 1, 2026"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

                Call to Action URL
              </label>
              <input
                type="text"
                value={formData.actionUrl}
                onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                placeholder="https://clinicos.app/features/booking"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"

              />
            </div>
          </div>

          {/* Key Benefits */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

              Key Value Highlights (Bullets in Email)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newBenefitInput}
                onChange={(e) => setFormData({ ...formData, newBenefitInput: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBenefit();
                  }
                }}
                placeholder="Add a bullet point benefit..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

              />
              <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={handleAddBenefit}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {formData.keyBenefits.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60"

                >
                  <span>• {b}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(i)}
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />

                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Template & Audience Targeting */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Audience Filtering & Template
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">

              {recipientCount} Eligible Clinic(s)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

                Announcement Template
              </label>
              <select
                value={formData.selectedTemplateId}
                onChange={(e) => setFormData({ ...formData, selectedTemplateId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

              >
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name} ({tpl.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">

                Target Audience Scope
              </label>
              <select
                value={formData.targetAudience.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetAudience: {
                      ...formData.targetAudience,
                      type: e.target.value
                    }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

              >
                <option value="all">All Registered Clinics ({clinics.length})</option>
                <option value="plans">Filter by Subscription Tiers</option>
                <option value="clinics">Specific Selected Clinics Only</option>
              </select>
            </div>
          </div>

          {/* Sub-Filter: By Plans */}
          {formData.targetAudience.type === 'plans' && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">

                Eligible Subscription Plans:
              </label>
              <div className="flex flex-wrap gap-2">
                {plans.map((p) => {
                  const isChecked = formData.targetAudience.planIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleTogglePlan(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-blue-400'

                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-Filter: By Clinics */}
          {formData.targetAudience.type === 'clinics' && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Clinics to Receive Announcement:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950">

                {clinics.map((c) => {
                  const isChecked = formData.targetAudience.clinicIds.includes(c.id);
                  return (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs"

                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleClinic(c.id)}
                        className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{c.name}</span>

                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">

          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" size="sm" type="submit" icon={Save}>
            Save Campaign
          </Button>
        </div>
      </form>
    </Modal>
  );
}
