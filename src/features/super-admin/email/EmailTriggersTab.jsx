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
  Search
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
<<<<<<< HEAD
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
=======
    <div className="space-y-5">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search event triggers or keys..."
<<<<<<< HEAD
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
<<<<<<< HEAD
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
          >
            <option value="all">All Triggers ({triggers.length})</option>
            <option value="enabled">Enabled Only ({triggers.filter((t) => t.enabled).length})</option>
            <option value="disabled">Disabled Only ({triggers.filter((t) => !t.enabled).length})</option>
          </select>
        </div>

<<<<<<< HEAD
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Showing <strong className="text-slate-700 dark:text-slate-200">{filteredTriggers.length}</strong> system event triggers
=======
        <div className="text-xs text-slate-500">
          Showing <strong>{filteredTriggers.length}</strong> system event triggers
>>>>>>> origin/main
        </div>
      </div>

      {/* Triggers Table Card */}
<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-12">#</th>
=======
      <Card className="border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
>>>>>>> origin/main
                <th className="py-3 px-4">Event Trigger & Key</th>
                <th className="py-3 px-4">Condition Description</th>
                <th className="py-3 px-4">Mapped Template</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Last Run</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTriggers.map((trg, idx) => {
=======
            <tbody className="divide-y divide-slate-100">
              {filteredTriggers.map((trg) => {
>>>>>>> origin/main
                const mappedTemplate = templates.find((t) => t.id === trg.selectedTemplateId);
                const isTemplateMissing = !mappedTemplate;
                const isTemplateInactive = mappedTemplate && mappedTemplate.status !== 'active';

                return (
<<<<<<< HEAD
                  <tr key={trg.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{trg.name}</div>
                      <span className="font-mono text-xs text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/60 inline-block mt-0.5">
=======
                  <tr key={trg.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{trg.name}</div>
                      <span className="font-mono text-[10px] text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 inline-block mt-0.5">
>>>>>>> origin/main
                        {trg.eventKey}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
<<<<<<< HEAD
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
=======
                      <p className="text-[11px] text-slate-600 leading-tight">
>>>>>>> origin/main
                        {trg.conditionDescription}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      {isTemplateMissing ? (
<<<<<<< HEAD
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                          <AlertTriangle className="w-3.5 h-3.5" />
=======
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
>>>>>>> origin/main
                          Template Missing
                        </span>
                      ) : (
                        <div>
<<<<<<< HEAD
                          <div className="font-medium text-slate-800 dark:text-slate-200 max-w-[180px] truncate" title={mappedTemplate.name}>
                            {mappedTemplate.name}
                          </div>
                          {isTemplateInactive && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded mt-0.5 border border-amber-200 dark:border-amber-800">
                              <AlertTriangle className="w-3 h-3" />
=======
                          <div className="font-medium text-slate-800 max-w-[180px] truncate" title={mappedTemplate.name}>
                            {mappedTemplate.name}
                          </div>
                          {isTemplateInactive && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded mt-0.5 border border-amber-200">
                              <AlertTriangle className="w-2.5 h-2.5" />
>>>>>>> origin/main
                              Template Inactive
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
<<<<<<< HEAD
                      <span className="capitalize font-mono text-xs text-slate-600 dark:text-slate-400">
=======
                      <span className="capitalize font-mono text-[11px] text-slate-600">
>>>>>>> origin/main
                        {trg.recipientType.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => onToggleTrigger(trg.id)}
<<<<<<< HEAD
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                          trg.enabled
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
=======
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          trg.enabled
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
>>>>>>> origin/main
                        }`}
                        title="Click to toggle trigger"
                      >
                        {trg.enabled ? (
                          <>
<<<<<<< HEAD
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
=======
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
>>>>>>> origin/main
                            <span>Enabled</span>
                          </>
                        ) : (
                          <>
<<<<<<< HEAD
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
=======
                            <XCircle className="w-3 h-3 text-slate-400" />
>>>>>>> origin/main
                            <span>Disabled</span>
                          </>
                        )}
                      </button>
                    </td>

<<<<<<< HEAD
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs whitespace-nowrap">
                      {trg.lastTriggeredAt ? (
                        <div>
                          <span>{new Date(trg.lastTriggeredAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                          <span className="text-xs text-slate-400 block">{trg.totalTriggeredCount} fired</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 italic">Never</span>
=======
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {trg.lastTriggeredAt ? (
                        <div>
                          <span>{new Date(trg.lastTriggeredAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                          <span className="text-[10px] text-slate-400 block">{trg.totalTriggeredCount} fired</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Never</span>
>>>>>>> origin/main
                      )}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Instant Test Execution */}
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Play}
<<<<<<< HEAD
                          className="h-8 text-xs px-2.5 font-semibold"
=======
                          className="h-7 text-[11px] px-2 font-semibold"
>>>>>>> origin/main
                          onClick={() => onRunTestTrigger(trg.eventKey)}
                          title={`Simulate "${trg.eventKey}" event now`}
                        >
                          Simulate
                        </Button>

                        {/* Edit Trigger Configuration */}
                        <button
                          type="button"
                          onClick={() => setEditingTrigger(trg)}
<<<<<<< HEAD
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Configure Trigger & Map Template"
                        >
                          <Edit2 className="w-4 h-4" />
=======
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Configure Trigger & Map Template"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
>>>>>>> origin/main
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

      {/* Edit Trigger Modal */}
      {editingTrigger && (
        <Modal
          isOpen={Boolean(editingTrigger)}
          onClose={() => setEditingTrigger(null)}
          title={`Configure Trigger: ${editingTrigger.name}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
<<<<<<< HEAD
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">{editingTrigger.name}</span>
              <span className="font-mono text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-xs">
                Event Key: {editingTrigger.eventKey}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{editingTrigger.description}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">{editingTrigger.name}</span>
              <span className="font-mono text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded text-[10px]">
                Event Key: {editingTrigger.eventKey}
              </span>
              <p className="text-[11px] text-slate-600 mt-1">{editingTrigger.description}</p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
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
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
              >
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name} ({tpl.status}) - [{tpl.key}]
                  </option>
                ))}
              </select>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
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
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
              >
                <option value="hospital_admin">Hospital / Clinic Administrator</option>
                <option value="doctor">Consulting Doctor / Specialist</option>
                <option value="staff">Front Desk & Receptionist</option>
                <option value="patient">Patient / Consumer</option>
                <option value="platform_admin">Platform Superadmin</option>
              </select>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
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
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
              />
            </div>

            <div className="flex items-center pt-2">
<<<<<<< HEAD
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
=======
              <label className="flex items-center gap-2 cursor-pointer select-none">
>>>>>>> origin/main
                <input
                  type="checkbox"
                  checked={editingTrigger.enabled}
                  onChange={(e) =>
                    setEditingTrigger({
                      ...editingTrigger,
                      enabled: e.target.checked
                    })
                  }
<<<<<<< HEAD
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
=======
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-800">
>>>>>>> origin/main
                  Enable Trigger in Real-Time Simulation
                </span>
              </label>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
=======
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
>>>>>>> origin/main
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingTrigger(null)}
              >
                Cancel
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
        </Modal>
      )}
    </div>
  );
}
