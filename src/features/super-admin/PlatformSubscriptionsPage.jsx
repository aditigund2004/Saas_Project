import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Layers, Calendar, RefreshCw, CreditCard, ArrowUpRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export function PlatformSubscriptionsPage() {
  const { clinics, plans, upgradeClinicSubscription, showToast } = useApp();
  const [changePlanModal, setChangePlanModal] = useState({ isOpen: false, clinic: null, targetPlanId: '' });

  const subscriptions = clinics.map((c) => {
    const plan = plans.find((p) => p.id === c.subscriptionPlanId);
    return {
      clinicId: c.id,
      clinicName: c.name,
      specialty: c.specialty,
      planId: c.subscriptionPlanId,
      planName: plan?.name || c.subscriptionPlanId,
      status: c.isTrial ? 'Trial' : c.status === 'Active' ? 'Active' : 'Suspended',
      renewalDate: '2026-11-20',
      amount: plan ? plan.monthlyPrice : 4999,
      cycle: 'Monthly',
      doctorsLimit: plan?.maxDoctors || 4,
      branchesLimit: plan?.maxBranches || 1
    };
  });

  const totalMRR = subscriptions
    .filter((s) => s.status === 'Active')
    .reduce((acc, s) => acc + s.amount, 0);

  const activeCount = subscriptions.filter((s) => s.status === 'Active').length;
  const trialCount = subscriptions.filter((s) => s.status === 'Trial').length;
  const arpu = activeCount > 0 ? Math.round(totalMRR / activeCount) : 0;

  const handleConfirmPlanChange = () => {
    if (!changePlanModal.clinic || !changePlanModal.targetPlanId) return;
    upgradeClinicSubscription(changePlanModal.clinic.clinicId, changePlanModal.targetPlanId);
    setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Revenue Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic SaaS Subscriptions</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor recurring plan billing cycles, trial conversions, and tier allocation simulations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={() => showToast('Subscription billing sync completed.')}
          >
            Sync Billing Cycle
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Paid Subs</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{activeCount} Clinics</div>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 inline-flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 100% on-time renewals
          </span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">14-Day Free Trials</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{trialCount} Clinics</div>
          <span className="text-[10px] text-slate-500 mt-1 block">In evaluation window</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recurring Run Rate (MRR)</span>
          <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">₹{totalMRR.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 block">Normalized monthly sum</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Revenue / Clinic</span>
          <div className="text-2xl font-extrabold text-purple-700 font-mono mt-1">₹{arpu.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Blended tier ARPU</span>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader
          title="Active Tenant Subscriptions"
          subtitle="All connected clinics, active plans, renewal schedules, and tier switching"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Clinic</th>
                <th className="p-3.5">Specialty</th>
                <th className="p-3.5">Active Tier</th>
                <th className="p-3.5">Doctor Limit</th>
                <th className="p-3.5">Billing Interval</th>
                <th className="p-3.5">Monthly Fee</th>
                <th className="p-3.5">Next Renewal</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscriptions.map((s) => (
                <tr key={s.clinicId} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">{s.clinicName}</td>
                  <td className="p-3.5 text-slate-600">{s.specialty}</td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {s.planName}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">
                    Up to {s.doctorsLimit} doctors
                  </td>
                  <td className="p-3.5 text-slate-600">{s.cycle}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">
                    ₹{s.amount.toLocaleString('en-IN')}/mo
                  </td>
                  <td className="p-3.5 text-slate-600 font-mono">{s.renewalDate}</td>
                  <td className="p-3.5">
                    <Badge variant={s.status}>{s.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-700 hover:bg-blue-50 border-blue-200 text-xs"
                      onClick={() =>
                        setChangePlanModal({
                          isOpen: true,
                          clinic: s,
                          targetPlanId: s.planId
                        })
                      }
                    >
                      Change Plan
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upgrade / Downgrade Plan Modal */}
      {changePlanModal.isOpen && (
        <Modal
          isOpen={changePlanModal.isOpen}
          onClose={() => setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' })}
          title={`Modify Subscription: ${changePlanModal.clinic?.clinicName}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Select a target SaaS tier for <strong>{changePlanModal.clinic?.clinicName}</strong>. This simulation adjusts branch & doctor quota entitlements immediately.
            </p>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Target Subscription Plan</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plans.map((p) => {
                  const isSelected = changePlanModal.targetPlanId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setChangePlanModal((prev) => ({ ...prev, targetPlanId: p.id }))}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{p.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="text-sm font-extrabold text-blue-700 font-mono mt-1">
                        ₹{p.monthlyPrice.toLocaleString('en-IN')}/mo
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {p.maxDoctors} Doctors · {p.maxBranches} Branch{p.maxBranches > 1 ? 'es' : ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
              ℹ️ <strong>Simulated Billing Note:</strong> Plan modifications take effect on the current billing cycle with prorated recalculation preview.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' })}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmPlanChange}>
                Confirm Plan Update
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
