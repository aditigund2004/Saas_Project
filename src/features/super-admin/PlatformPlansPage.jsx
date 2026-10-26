import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Sparkles, Edit2, Check, Save } from 'lucide-react';

export function PlatformPlansPage() {
  const { plans, setPlans, showToast } = useApp();
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [planList, setPlanList] = useState(plans);

  const handleUpdate = (planId, field, value) => {
    setPlanList((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = () => {
    setPlans(planList);
    localStorage.setItem('clinipulse_plans', JSON.stringify(planList));
    setEditingPlanId(null);
    showToast('Subscription plan limits & pricing saved across ClinicOS.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Plan Architect</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Subscription Tier Pricing & Limits</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure pricing points, doctor thresholds, branch limits, and features available to clinics.
          </p>
        </div>

        {editingPlanId ? (
          <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
            Save All Changes
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            icon={Edit2}
            onClick={() => setEditingPlanId('all')}
          >
            Edit Plan Parameters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {planList.map((plan) => {
          const isEditing = editingPlanId === 'all' || editingPlanId === plan.id;

          return (
            <Card key={plan.id} className="p-6 border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    ID: {plan.id}
                  </span>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase">Monthly Price (INR)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={plan.monthlyPrice}
                        onChange={(e) => handleUpdate(plan.id, 'monthlyPrice', Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="text-xl font-extrabold text-slate-900">
                        ₹{plan.monthlyPrice.toLocaleString('en-IN')}/mo
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase">Annual Price (INR)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={plan.annualPrice}
                        onChange={(e) => handleUpdate(plan.id, 'annualPrice', Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-mono focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="text-xs font-semibold text-slate-600 font-mono">
                        ₹{plan.annualPrice.toLocaleString('en-IN')}/year
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Max Doctors</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={plan.maxDoctors}
                          onChange={(e) => handleUpdate(plan.id, 'maxDoctors', Number(e.target.value))}
                          className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-bold"
                        />
                      ) : (
                        <span className="font-bold text-slate-800">{plan.maxDoctors} Doctors</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Max Branches</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={plan.maxBranches}
                          onChange={(e) => handleUpdate(plan.id, 'maxBranches', Number(e.target.value))}
                          className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-bold"
                        />
                      ) : (
                        <span className="font-bold text-slate-800">{plan.maxBranches} Branches</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Features</span>
                  <div className="space-y-1.5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {isEditing && (
                <Button variant="primary" size="sm" className="w-full" onClick={handleSave}>
                  Save Plan
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

