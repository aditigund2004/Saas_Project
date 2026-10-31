import React, { useState } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { formatINR, exportToCSV } from './referralUtils';
import {
  Calculator,
  Plus,
  Percent,
  DollarSign,
  Layers,
  Clock,
  Sparkles,
  CheckCircle2,
  Edit2,
  ToggleLeft,
  ToggleRight,
  Download,
  Info
} from 'lucide-react';

export function CommissionRulesPage() {
  const {
    commissionRules,
    addCommissionRule,
    updateCommissionRule,
    toggleCommissionRuleStatus
  } = useReferral();

  // Interactive Calculator State
  const [calcRuleId, setCalcRuleId] = useState(commissionRules[0]?.id || 'RULE-PERC-15');
  const [calcAmount, setCalcAmount] = useState(69990);
  const [calcTenureYears, setCalcTenureYears] = useState(1);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    partnerType: 'Healthcare Consultant',
    calculationType: 'Percentage',
    rateValue: 15,
    eligiblePlans: ['Starter Clinic Pro', 'Professional Multi-Specialty'],
    frequency: 'Recurring Annual',
    durationMonths: 12,
    minPayoutThreshold: 5000,
    isFirstPaymentOnly: false,
    description: ''
  });

  const selectedCalcRule = commissionRules.find((r) => r.id === calcRuleId) || commissionRules[0];

  // Dynamic Calculation
  const calculatedCommissionOneYear = selectedCalcRule?.calculationType === 'Percentage'
    ? Math.round(calcAmount * ((selectedCalcRule.rateValue || 15) / 100))
    : Number(selectedCalcRule?.rateValue || 10000);

  const calculatedTotalCommission = selectedCalcRule?.isFirstPaymentOnly
    ? calculatedCommissionOneYear
    : calculatedCommissionOneYear * calcTenureYears;

  const totalGrossRevenue = calcAmount * calcTenureYears;
  const netPlatformRevenue = totalGrossRevenue - calculatedTotalCommission;
  const effectiveCACPercentage = totalGrossRevenue > 0
    ? ((calculatedTotalCommission / totalGrossRevenue) * 100).toFixed(1)
    : 0;

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      partnerType: 'Healthcare Consultant',
      calculationType: 'Percentage',
      rateValue: 15,
      eligiblePlans: ['Professional Multi-Specialty'],
      frequency: 'Recurring Annual',
      durationMonths: 12,
      minPayoutThreshold: 5000,
      isFirstPaymentOnly: false,
      description: ''
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (rule) => {
    setSelectedRule(rule);
    setFormData({
      name: rule.name,
      partnerType: rule.partnerType,
      calculationType: rule.calculationType,
      rateValue: rule.rateValue,
      eligiblePlans: rule.eligiblePlans,
      frequency: rule.frequency,
      durationMonths: rule.durationMonths,
      minPayoutThreshold: rule.minPayoutThreshold,
      isFirstPaymentOnly: rule.isFirstPaymentOnly,
      description: rule.description
    });
    setIsEditOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addCommissionRule(formData);
    setIsAddOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedRule) return;
    updateCommissionRule(selectedRule.id, formData);
    setIsEditOpen(false);
  };

  const handlePlanToggle = (planName) => {
    setFormData((prev) => {
      const exists = prev.eligiblePlans.includes(planName);
      if (exists) {
        return { ...prev, eligiblePlans: prev.eligiblePlans.filter((p) => p !== planName) };
      }
      return { ...prev, eligiblePlans: [...prev.eligiblePlans, planName] };
    });
  };

  const handleExportCSV = () => {
    exportToCSV(
      'ClinicOS_Commission_Policies',
      commissionRules,
      [
        { label: 'Rule ID', key: 'id' },
        { label: 'Rule Name', key: 'name' },
        { label: 'Partner Category', key: 'partnerType' },
        { label: 'Type', key: 'calculationType' },
        { label: 'Rate/Value', key: 'rateValue' },
        { label: 'Frequency', key: 'frequency' },
        { label: 'Duration (Months)', key: 'durationMonths' },
        { label: 'Min Payout Threshold (INR)', key: 'minPayoutThreshold' },
        { label: 'First Payment Only', key: (r) => (r.isFirstPaymentOnly ? 'Yes' : 'No') },
        { label: 'Status', key: 'status' }
      ]
    );
  };

  const AVAILABLE_PLANS = [
    'Starter Clinic Pro',
    'Professional Multi-Specialty',
    'Enterprise Hospital Network'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Commercial Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Commission Rules & Policies
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure partner tier compensation structures, percentage incentives, flat bounty rewards, and payout limits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportCSV}
          >
            Export Policies CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={handleOpenAdd}
          >
            Create Rule
          </Button>
        </div>
      </div>

      <ReferralNav />

      {/* Interactive Commission Calculator Banner */}
      <Card className="p-5 border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Interactive Commission & Margin Calculator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Simulate partner payouts, net revenue retention, and CAC percentage instantly.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Real-Time Solver
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Controls Column */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Active Commission Policy:
              </label>
              <select
                value={calcRuleId}
                onChange={(e) => setCalcRuleId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {commissionRules.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Annual Subscription Amount:</span>
                <span className="text-blue-600 dark:text-blue-400">{formatINR(calcAmount)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Starter (₹14,999)</span>
                <span>Pro (₹69,990)</span>
                <span>Enterprise (₹1.5L+)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Customer Lifetime Projection:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setCalcTenureYears(yr)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      calcTenureYears === yr
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {yr} {yr === 1 ? 'Year' : 'Years'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Output Display Card (2 cols) */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Gross Subscription
              </span>
              <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                {formatINR(totalGrossRevenue)}
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Over {calcTenureYears} yr period
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 block">
                Affiliate Commission
              </span>
              <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {formatINR(calculatedTotalCommission)}
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block mt-0.5 font-medium">
                {selectedCalcRule?.calculationType === 'Percentage'
                  ? `${selectedCalcRule.rateValue}% ${selectedCalcRule.isFirstPaymentOnly ? '(Year 1 only)' : '(Recurring)'}`
                  : `Flat ₹${selectedCalcRule?.rateValue?.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-[11px] font-semibold text-blue-800 dark:text-blue-300 block">
                Net ClinicOS Revenue
              </span>
              <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {formatINR(netPlatformRevenue)}
              </div>
              <span className="text-[10px] text-blue-700 dark:text-blue-300 block mt-0.5">
                Retained platform ARR
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300 block">
                Effective Partner CAC
              </span>
              <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                {effectiveCACPercentage}%
              </div>
              <span className="text-[10px] text-purple-700 dark:text-purple-300 block mt-0.5">
                Acquisition cost ratio
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Rules Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commissionRules.map((rule) => (
          <Card
            key={rule.id}
            className={`p-5 transition-all ${
              rule.status === 'Active'
                ? 'border-slate-200 dark:border-slate-800'
                : 'opacity-70 border-dashed border-slate-300 dark:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {rule.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rule.status === 'Active'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {rule.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Applicable for: <strong className="text-slate-700 dark:text-slate-300">{rule.partnerType}</strong>
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block font-semibold">Compensation</span>
                <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {rule.calculationType === 'Percentage' ? `${rule.rateValue}%` : `₹${rule.rateValue.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">
              {rule.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
              <div>
                <span className="text-slate-400 block">Frequency:</span>
                <strong className="text-slate-700 dark:text-slate-200">{rule.frequency}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Duration:</span>
                <strong className="text-slate-700 dark:text-slate-200">{rule.durationMonths} Months</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Min Threshold:</span>
                <strong className="text-slate-700 dark:text-slate-200">{formatINR(rule.minPayoutThreshold)}</strong>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Eligible Plans:
              </span>
              <div className="flex flex-wrap gap-1">
                {rule.eligiblePlans.map((p) => (
                  <span
                    key={p}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => toggleCommissionRuleStatus(rule.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {rule.status === 'Active' ? (
                  <>
                    <ToggleRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Enabled</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5 text-slate-400" />
                    <span>Disabled</span>
                  </>
                )}
              </button>

              <Button
                variant="outline"
                size="sm"
                icon={Edit2}
                onClick={() => handleOpenEdit(rule)}
              >
                Configure Policy
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal: Create Rule */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create Commission Policy"
        size="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Policy Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Enterprise Consultant 18%"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Partner Category
              </label>
              <select
                value={formData.partnerType}
                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Healthcare Consultant">Healthcare Consultant</option>
                <option value="Hospital">Hospital</option>
                <option value="Affiliate Partner">Affiliate Partner</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Calculation Model
              </label>
              <select
                value={formData.calculationType}
                onChange={(e) => setFormData({ ...formData, calculationType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Percentage">Percentage (%)</option>
                <option value="Fixed">Fixed Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Rate / Bounty Value *
              </label>
              <input
                type="number"
                required
                min="1"
                max={formData.calculationType === 'Percentage' ? 100 : 100000}
                value={formData.rateValue}
                onChange={(e) => setFormData({ ...formData, rateValue: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Minimum Payout Threshold (₹)
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={formData.minPayoutThreshold}
                onChange={(e) => setFormData({ ...formData, minPayoutThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Eligible Subscription Plans:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {AVAILABLE_PLANS.map((plan) => (
                <label
                  key={plan}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-colors ${
                    formData.eligiblePlans.includes(plan)
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.eligiblePlans.includes(plan)}
                    onChange={() => handlePlanToggle(plan)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-semibold">{plan}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Policy Description & Terms
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Applicable on first-year contract value. Disbursed monthly."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Policy
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Rule */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit Commission Policy: ${selectedRule?.name}`}
        size="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Policy Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Rate / Value
              </label>
              <input
                type="number"
                required
                value={formData.rateValue}
                onChange={(e) => setFormData({ ...formData, rateValue: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Update Policy
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
