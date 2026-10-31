import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  Plus,
  Send,
  Eye,
  Edit2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function EmailCampaignsTab({
  campaigns,
  templates,
  clinics,
  plans,
  onOpenCreate,
  onOpenEdit,
  onOpenPreview,
  onExecuteSimulation
}) {
  const [confirmingExecution, setConfirmingExecution] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Product Feature Announcement Campaigns
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Design targeted feature announcements, preview templates, and simulate broadcast releases across clinics.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onOpenCreate}
          className="shadow-sm font-semibold shrink-0"
        >
          Create Announcement Campaign
        </Button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((cmp) => {
          const tpl = templates.find((t) => t.id === cmp.selectedTemplateId);
          const isCompleted = cmp.status === 'completed';
          const isDraft = cmp.status === 'draft';

          return (
            <Card
              key={cmp.id}
              className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                {/* Header: Title & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {cmp.name}
                    </h4>
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 inline-block mt-1">
                      Announcing: {cmp.featureName}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    {cmp.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {cmp.featureDescription}
                </p>

                {/* Audience & Target Scope */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Audience Targeting:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                      {cmp.targetAudience.type === 'all'
                        ? 'All Clinics'
                        : cmp.targetAudience.type === 'plans'
                        ? `Plans (${cmp.targetAudience.planIds.join(', ')})`
                        : `Selected Clinics (${cmp.targetAudience.clinicIds.length})`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Target Recipient Count:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {cmp.simulatedRecipientCount || clinics.length} Clinic(s)
                    </span>
                  </div>

                  {isCompleted && (
                    <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-400 font-semibold pt-1.5 border-t border-slate-200 dark:border-slate-700">
                      <span>Simulated Dispatched:</span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {cmp.totalSimulatedDelivered || cmp.simulatedRecipientCount} Delivered
                      </span>
                    </div>
                  )}
                </div>

                {/* Key Benefits */}
                {cmp.keyBenefits?.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Highlighted Value Points
                    </span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      {cmp.keyBenefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span className="truncate">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer: Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  {tpl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => onOpenPreview(tpl, { feature_name: cmp.featureName, feature_description: cmp.featureDescription })}
                      className="text-xs"
                    >
                      Preview Email
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    onClick={() => onOpenEdit(cmp)}
                    className="text-xs"
                  >
                    Edit
                  </Button>
                </div>

                {!isCompleted ? (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Send}
                    onClick={() => setConfirmingExecution(cmp)}
                    className="font-semibold"
                  >
                    Execute Simulation
                  </Button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Broadcast Simulation Complete
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Explicit Confirmation Dialog before Simulated Execution */}
      {confirmingExecution && (
        <Modal
          isOpen={Boolean(confirmingExecution)}
          onClose={() => setConfirmingExecution(null)}
          title="Confirm Campaign Simulation"
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-200 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  Simulate Broadcast: {confirmingExecution.name}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                You are about to simulate sending this feature announcement email for{' '}
                <strong className="text-slate-900 dark:text-white">{confirmingExecution.featureName}</strong> to{' '}
                <strong className="text-slate-900 dark:text-white">{confirmingExecution.simulatedRecipientCount || clinics.length} eligible clinic recipient(s)</strong>.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This will generate simulated activity log records, populate dynamic hospital variables, and mark the campaign as completed in the prototype.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmingExecution(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={() => {
                  onExecuteSimulation(confirmingExecution.id);
                  setConfirmingExecution(null);
                }}
              >
                Confirm & Run Simulation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
