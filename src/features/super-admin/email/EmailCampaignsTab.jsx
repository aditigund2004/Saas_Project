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

      {/* Broadcast Announcement Campaigns Table */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Campaign Directory Table</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Click any row to open campaign overview and edit parameters</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Campaigns: <strong>{campaigns.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                <th className="py-3 px-4">Campaign Name & Feature</th>
                <th className="py-3 px-4">Target Audience Scope</th>
                <th className="py-3 px-4">Recipients</th>
                <th className="py-3 px-4">Template</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 dark:text-slate-500">
                    No announcement campaigns created yet.
                  </td>
                </tr>
              ) : (
                campaigns.map((cmp, idx) => {
                  const tpl = templates.find((t) => t.id === cmp.selectedTemplateId);
                  const isCompleted = cmp.status === 'completed';

                  return (
                    <tr
                      key={cmp.id}
                      onClick={() => onOpenEdit(cmp)}
                      className="hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                      title="Click row to view campaign overview and edit settings"
                    >
                      <td className="py-3.5 px-3 text-center font-bold text-slate-500 dark:text-slate-400 text-xs">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {cmp.name}
                        </div>
                        <span className="font-semibold text-[11px] text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/60 inline-block mt-0.5">
                          Announcing: {cmp.featureName}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 dark:text-slate-200 capitalize">
                          {cmp.targetAudience.type === 'all'
                            ? 'All Registered Clinics'
                            : cmp.targetAudience.type === 'plans'
                            ? `Plans (${cmp.targetAudience.planIds.join(', ')})`
                            : `Clinics (${cmp.targetAudience.clinicIds.length})`}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {cmp.simulatedRecipientCount || clinics.length} Clinic(s)
                      </td>

                      <td className="py-3.5 px-4">
                        {tpl ? (
                          <div className="max-w-[150px] truncate" title={tpl.name}>
                            <span className="font-medium text-slate-800 dark:text-slate-200">{tpl.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono block">{tpl.key}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Default</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 ${
                            isCompleted
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                          <span>{cmp.status}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {tpl && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenPreview(tpl, { feature_name: cmp.featureName, feature_description: cmp.featureDescription });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Preview Email"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEdit(cmp);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit Campaign"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {!isCompleted && (
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={Send}
                              className="h-8 text-xs px-2.5 font-semibold"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmingExecution(cmp);
                              }}
                              title="Execute Simulation"
                            >
                              Execute
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((cmp, idx) => {
          const tpl = templates.find((t) => t.id === cmp.selectedTemplateId);
          const isCompleted = cmp.status === 'completed';
          const isDraft = cmp.status === 'draft';

          return (
            <Card
              key={cmp.id}
              onClick={() => onOpenEdit(cmp)}
              className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-4 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer group"
              title="Click card to view campaign overview and edit settings"
            >
              <div className="space-y-3">
                {/* Header: Title & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-bold font-mono text-xs border border-blue-200 dark:border-blue-800 shrink-0 mt-0.5">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cmp.name}
                      </h4>
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 inline-block mt-1">
                        Announcing: {cmp.featureName}
                      </span>
                    </div>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPreview(tpl, { feature_name: cmp.featureName, feature_description: cmp.featureDescription });
                      }}
                      className="text-xs"
                    >
                      Preview Email
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEdit(cmp);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmingExecution(cmp);
                    }}
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
