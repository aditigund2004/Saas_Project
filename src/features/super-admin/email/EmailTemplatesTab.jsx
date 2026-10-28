import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  Plus,
  Search,
  Eye,
  Edit2,
  Copy,
  Trash2,
  Send,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export function EmailTemplatesTab({
  templates,
  triggers,
  onOpenCreate,
  onOpenEdit,
  onOpenPreview,
  onDuplicate,
  onToggleStatus,
  onDelete,
  onSendTest
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingTemplate, setDeletingTemplate] = useState(null);

  // Filter templates
  const filteredTemplates = templates.filter((tpl) => {
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tpl.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tpl.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || tpl.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || tpl.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates or keys..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"

          >
            <option value="all">All Categories ({templates.length})</option>
            <option value="Onboarding & Activation">Onboarding & Activation</option>
            <option value="Subscription & Billing">Subscription & Billing</option>
            <option value="Clinical & Operations">Clinical & Operations</option>
            <option value="System & Security">System & Security</option>
            <option value="Feature Announcements">Feature Announcements</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"

          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onOpenCreate}
          className="shadow-sm font-semibold shrink-0"
        >
          Create Template

        </Button>
      </div>

      {/* Templates Table Card */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-12">#</th>

                <th className="py-3 px-4">Template Name & Key</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Subject Line</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Trigger Hook</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTemplates.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 dark:text-slate-500">

                    No email templates matched the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredTemplates.map((tpl, idx) => {
                  const isActive = tpl.status === 'active';

                  return (
                    <tr key={tpl.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{tpl.name}</span>
                          {tpl.isPrebuilt && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">

                              Prebuilt
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded inline-block mt-0.5 border border-blue-100 dark:border-blue-900/50">

                          {tpl.key}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">

                          {tpl.category}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate" title={tpl.subject}>

                          {tpl.subject}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="capitalize text-slate-600 dark:text-slate-400 font-mono text-xs">

                          {tpl.recipientType.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {tpl.associatedTriggerKey ? (
                          <span className="font-mono text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            {tpl.associatedTriggerKey}
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 text-xs italic">Manual / Broadcast</span>

                        )}
                      </td>

                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => onToggleStatus(tpl.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'

                          }`}
                          title="Click to toggle active state"
                        >
                          {isActive ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />

                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-slate-400" />

                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {/* Preview Action */}
                          <button
                            type="button"
                            onClick={() => onOpenPreview(tpl)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Preview Desktop / Mobile Email"
                          >
                            <Eye className="w-4 h-4" />

                          </button>

                          {/* Test Send Simulation */}
                          <button
                            type="button"
                            onClick={() => onSendTest(tpl)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Send Test Simulation"
                          >
                            <Send className="w-4 h-4" />

                          </button>

                          {/* Edit Action */}
                          <button
                            type="button"
                            onClick={() => onOpenEdit(tpl)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit Template"
                          >
                            <Edit2 className="w-4 h-4" />

                          </button>

                          {/* Duplicate Action */}
                          <button
                            type="button"
                            onClick={() => onDuplicate(tpl.id)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Duplicate Template"
                          >
                            <Copy className="w-4 h-4" />

                          </button>

                          {/* Delete Action */}
                          <button
                            type="button"
                            onClick={() => setDeletingTemplate(tpl)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Delete Template"
                          >
                            <Trash2 className="w-4 h-4" />

                          </button>
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

      {/* Delete Confirmation Dialog */}
      {deletingTemplate && (
        <Modal
          isOpen={Boolean(deletingTemplate)}
          onClose={() => setDeletingTemplate(null)}
          title="Delete Email Template"
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-rose-950 dark:text-rose-100">
                  Delete "{deletingTemplate.name}"?
                </p>
                <p className="text-rose-800 dark:text-rose-300 text-xs mt-1">

                  Associated automated triggers will be unmapped. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">

              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeletingTemplate(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white"
                onClick={() => {
                  onDelete(deletingTemplate.id);
                  setDeletingTemplate(null);
                }}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

