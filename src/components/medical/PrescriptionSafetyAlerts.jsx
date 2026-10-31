import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  Info,
  CheckCircle2,
  FileCheck2,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function PrescriptionSafetyAlerts({
  warnings = [],
  patientName = 'Patient',
  onOverride,
  isOverridden = false,
  overrideReason = ''
}) {
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [customReason, setCustomReason] = useState(overrideReason || '');
  const [hasAcknowledged, setHasAcknowledged] = useState(isOverridden);

  if (!warnings || warnings.length === 0) {
    return (
      <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-semibold">Prescription Safety Verification Passed</span>
        </div>
        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full font-medium">
          No contraindications or duplicate classes flagged
        </span>
      </div>
    );
  }

  const criticalCount = warnings.filter((w) => w.severity === 'critical' || w.severity === 'allergy').length;
  const moderateCount = warnings.filter((w) => w.severity === 'moderate').length;
  const duplicateCount = warnings.filter((w) => w.severity === 'duplicate').length;

  const handleConfirmOverride = () => {
    if (onOverride) {
      onOverride(customReason);
    }
    setIsOverrideModalOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Alert Header Box */}
      <div
        className={`p-3.5 rounded-2xl border transition-all ${
          criticalCount > 0
            ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/80'
            : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/80'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start space-x-2.5">
            {criticalCount > 0 ? (
              <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Prescription Safety Alerts ({warnings.length})
                </h4>
                {criticalCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold uppercase">
                    {criticalCount} Critical
                  </span>
                )}
                {moderateCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold uppercase">
                    {moderateCount} Caution
                  </span>
                )}
                {duplicateCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white font-bold uppercase">
                    {duplicateCount} Duplicate
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                Potential medication risks flagged for {patientName}. Review clinical guidelines before dispensing.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isOverridden ? (
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold border border-emerald-300 dark:border-emerald-700">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Overridden with Clinical Justification</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsOverrideModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Override Warning...
              </button>
            )}
          </div>
        </div>

        {/* Warning cards list */}
        <div className="mt-3 space-y-2">
          {warnings.map((warning) => {
            const isCritical = warning.severity === 'critical' || warning.severity === 'allergy';
            return (
              <div
                key={warning.id}
                className={`p-3 rounded-xl border text-xs ${
                  isCritical
                    ? 'bg-white dark:bg-slate-900/90 border-rose-200 dark:border-rose-900/60'
                    : 'bg-white dark:bg-slate-900/90 border-amber-200 dark:border-amber-900/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                        warning.severity === 'allergy'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
                          : isCritical
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                      }`}
                    >
                      {warning.severity}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{warning.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Items: {warning.involvedItems?.join(', ')}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1.5">
                  {warning.description}
                </p>
                <div className="mt-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-[11px] text-blue-900 dark:text-blue-300 flex items-start space-x-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
                  <span><strong>Recommendation:</strong> {warning.clinicalRecommendation}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Demonstration Disclaimer */}
        <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 italic">
          ⚠️ <strong>Demonstration Advisory:</strong> Interaction flags and allergy warnings are simulated for UI evaluation. Clinical verification by a registered medical practitioner is required.
        </div>
      </div>

      {/* Override Reason Modal */}
      {isOverrideModalOpen && (
        <Modal
          isOpen={isOverrideModalOpen}
          onClose={() => setIsOverrideModalOpen(false)}
          title="Clinical Override of Medication Safety Warnings"
          size="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 dark:text-slate-300">
              To proceed with issuing this prescription despite flagged safety alerts, provide an auditable clinical rationale. This explanation will be logged in the electronic medical record.
            </p>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 dark:text-slate-200">
                Reason for Clinical Override (Required):
              </label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="e.g., Patient has previously tolerated this combination without adverse events; benefit outweighs risk under close supervision."
                className="w-full h-24 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="flex items-start space-x-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={hasAcknowledged}
                onChange={(e) => setHasAcknowledged(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                I confirm that I have reviewed the potential interactions and take clinical responsibility for overriding these alerts.
              </span>
            </label>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={() => setIsOverrideModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!customReason.trim() || !hasAcknowledged}
                onClick={handleConfirmOverride}
              >
                Log Override & Authorize
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
