import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  Zap,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Edit2,
  Search,
  Eye,
  Activity
} from 'lucide-react';

export function EmailTriggersTab({
  triggers,
  templates,
  onToggleTrigger,
  onSaveTrigger,
  onRunTestTrigger
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTrigger, setEditingTrigger] = useState(null);
  const [triggerModalTab, setTriggerModalTab] = useState('view'); // 'view' | 'edit'

  const filteredTriggers = triggers.filter((trg) => {
    const matchesSearch =
      trg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trg.eventKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trg.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'enabled' ? trg.enabled : !trg.enabled);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search event triggers or keys..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Triggers ({triggers.length})</option>
            <option value="enabled">Enabled Only ({triggers.filter((t) => t.enabled).length})</option>
            <option value="disabled">Disabled Only ({triggers.filter((t) => !t.enabled).length})</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Showing <strong className="text-slate-700 dark:text-slate-200">{filteredTriggers.length}</strong> system event triggers
        </div>
      </div>

      {/* Triggers Table Card */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-12">#</th>
                <th className="py-3 px-4">Event Trigger & Key</th>
                <th className="py-3 px-4">Condition Description</th>
                <th className="py-3 px-4">Mapped Template</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Last Run</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTriggers.map((trg, idx) => {
                const mappedTemplate = templates.find((t) => t.id === trg.selectedTemplateId);
                const isTemplateMissing = !mappedTemplate;
                const isTemplateInactive = mappedTemplate && mappedTemplate.status !== 'active';

                return (
                  <tr
                    key={trg.id}
                    onClick={() => {
                      setEditingTrigger(trg);
                      setTriggerModalTab('view');
                    }}
                    className="hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    title="Click row to view trigger details and edit configuration"
                  >
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 dark:text-slate-400 text-xs">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{trg.name}</div>
                      <span className="font-mono text-xs text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/60 inline-block mt-0.5">
                        {trg.eventKey}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                        {trg.conditionDescription}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      {isTemplateMissing ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Template Missing
                        </span>
                      ) : (
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200 max-w-[180px] truncate" title={mappedTemplate.name}>
                            {mappedTemplate.name}
                          </div>
                          {isTemplateInactive && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded mt-0.5 border border-amber-200 dark:border-amber-800">
                              <AlertTriangle className="w-3 h-3" />
                              Template Inactive
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="capitalize font-mono text-xs text-slate-600 dark:text-slate-400">
                        {trg.recipientType.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleTrigger(trg.id);
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                          trg.enabled
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title="Click to toggle trigger"
                      >
                        {trg.enabled ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Enabled</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>Disabled</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs whitespace-nowrap">
                      {trg.lastTriggeredAt ? (
                        <div>
                          <span>{new Date(trg.lastTriggeredAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                          <span className="text-xs text-slate-400 block">{trg.totalTriggeredCount} fired</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 italic">Never</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Instant Test Execution */}
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Play}
                          className="h-8 text-xs px-2.5 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRunTestTrigger(trg.eventKey);
                          }}
                          title={`Simulate "${trg.eventKey}" event now`}
                        >
                          Simulate
                        </Button>

                        {/* Edit Trigger Configuration */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTrigger(trg);
                            setTriggerModalTab('edit');
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Configure Trigger & Map Template"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Trigger Details & Configuration Modal (Both View & Edit) */}
      {editingTrigger && (
        <Modal
          isOpen={Boolean(editingTrigger)}
          onClose={() => setEditingTrigger(null)}
          title={`Trigger: ${editingTrigger.name}`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Top Tabs: View Details vs Edit Configuration */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <button
                type="button"
                onClick={() => setTriggerModalTab('view')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  triggerModalTab === 'view'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                👁️ Trigger Overview & Metrics
              </button>
              <button
                type="button"
                onClick={() => setTriggerModalTab('edit')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  triggerModalTab === 'edit'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                ✏️ Edit Trigger Configuration
              </button>
            </div>

            {/* TAB 1: VIEW DETAILS */}
            {triggerModalTab === 'view' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white block">{editingTrigger.name}</span>
                      <span className="font-mono text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-xs border border-blue-200 dark:border-blue-900/60 inline-block mt-1">
                        Event Key: {editingTrigger.eventKey}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                        editingTrigger.enabled
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {editingTrigger.enabled ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{editingTrigger.enabled ? 'Enabled in Simulation' : 'Disabled'}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">{editingTrigger.description}</p>
                </div>

                {/* Metrics & Attributes Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 block mb-0.5 font-medium">Recipient Target</span>
                    <span className="font-semibold text-slate-900 dark:text-white capitalize">
                      {editingTrigger.recipientType.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 block mb-0.5 font-medium">Firing Activity</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {editingTrigger.totalTriggeredCount || 0} times dispatched
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Last: {editingTrigger.lastTriggeredAt ? new Date(editingTrigger.lastTriggeredAt).toLocaleString() : 'Never'}
                    </span>
                  </div>

                  <div className="col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 block mb-0.5 font-medium">Mapped Email Template</span>
                    {(() => {
                      const tpl = templates.find((t) => t.id === editingTrigger.selectedTemplateId);
                      return tpl ? (
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                            <span className="font-mono text-[11px] text-slate-500 block">{tpl.key} • {tpl.category}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            tpl.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {tpl.status}
                          </span>
                        </div>
                      ) : (
                        <span className="text-rose-500 font-bold">No template currently mapped</span>
                      );
                    })()}
                  </div>

                  <div className="col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 block mb-0.5 font-medium">Condition & Rules</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{editingTrigger.conditionDescription}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Play}
                    onClick={() => {
                      onRunTestTrigger(editingTrigger.eventKey);
                      setEditingTrigger(null);
                    }}
                  >
                    Simulate Event Now
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTrigger(null)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Edit2}
                      onClick={() => setTriggerModalTab('edit')}
                    >
                      Configure Settings
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EDIT CONFIGURATION */}
            {triggerModalTab === 'edit' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mapped Email Template
                  </label>
                  <select
                    value={editingTrigger.selectedTemplateId}
                    onChange={(e) =>
                      setEditingTrigger({
                        ...editingTrigger,
                        selectedTemplateId: e.target.value
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {templates.map((tpl) => (
                      <option key={tpl.id} value={tpl.id}>
                        {tpl.name} ({tpl.status}) - [{tpl.key}]
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Recipient Target
                  </label>
                  <select
                    value={editingTrigger.recipientType}
                    onChange={(e) =>
                      setEditingTrigger({
                        ...editingTrigger,
                        recipientType: e.target.value
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="hospital_admin">Hospital / Clinic Administrator</option>
                    <option value="doctor">Consulting Doctor / Specialist</option>
                    <option value="staff">Front Desk & Receptionist</option>
                    <option value="patient">Patient / Consumer</option>
                    <option value="platform_admin">Platform Superadmin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Condition Description
                  </label>
                  <input
                    type="text"
                    value={editingTrigger.conditionDescription}
                    onChange={(e) =>
                      setEditingTrigger({
                        ...editingTrigger,
                        conditionDescription: e.target.value
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editingTrigger.enabled}
                      onChange={(e) =>
                        setEditingTrigger({
                          ...editingTrigger,
                          enabled: e.target.checked
                        })
                      }
                      className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Enable Trigger in Real-Time Simulation
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTriggerModalTab('view')}
                  >
                    Back to Overview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onSaveTrigger(editingTrigger);
                      setEditingTrigger(null);
                    }}
                  >
                    Save Trigger
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
