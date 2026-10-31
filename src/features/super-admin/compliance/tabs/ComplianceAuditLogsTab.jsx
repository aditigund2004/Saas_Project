import React, { useState } from 'react';
import { Card, CardHeader } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Modal } from '../../../../components/ui/Modal';
import {
  History,
  Search
} from 'lucide-react';

export function ComplianceAuditLogsTab({
  complianceData,
  selectedClinicScope
}) {
  const { complianceAuditLogs = [] } = complianceData;

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredLogs = complianceAuditLogs.filter((log) => {
    const matchesScope =
      selectedClinicScope === 'All Clinics' ||
      log.clinicName === selectedClinicScope ||
      log.clinicId === selectedClinicScope ||
      log.clinicId === 'all-tenants';

    const matchesSearch =
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actorRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.affectedResourceRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    const matchesOutcome = outcomeFilter === 'All' || log.outcome === outcomeFilter;

    return matchesScope && matchesSearch && matchesCategory && matchesOutcome;
  });

  return (
    <div className="space-y-6">
      {/* Audit Transparency Banner */}
      <div className="p-3.5 bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
        <History className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-white">
            Administrative & Governance Audit Trail
          </span>
          <p className="leading-relaxed">
            All consent transitions, privacy fulfillment milestones, FHIR validations, and export jobs are chronologically indexed. In a live production deployment, this stream feeds into immutable WORM storage.
          </p>
        </div>
      </div>

      {/* Main Audit Table Card */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader
          title={`Indexed Audit Events (${filteredLogs.length})`}
          subtitle="Chronological log of actor actions, resource state alterations, and automated bridge webhooks"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search event, actor, or ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 w-44 sm:w-56"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Categories</option>
                <option value="Consent Activity">Consent Activity</option>
                <option value="Privacy Requests">Privacy Requests</option>
                <option value="ABHA Integration Events">ABHA Integration Events</option>
                <option value="FHIR Validation Events">FHIR Validation Events</option>
                <option value="Export Activity">Export Activity</option>
                <option value="Administrative Actions">Administrative Actions</option>
              </select>

              <select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Outcomes</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Warning">Warning</option>
              </select>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                <th className="p-3.5">Event ID</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Tenant Clinic</th>
                <th className="p-3.5">Actor Reference</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Action Event</th>
                <th className="p-3.5">Affected Resource</th>
                <th className="p-3.5">Outcome</th>
                <th className="p-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredLogs.map((log, idx) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedEvent(log)}
                  className="cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors"
                  title="Click to inspect audit event record"
                >
                  <td className="p-3.5 text-center font-bold text-slate-500 dark:text-slate-400">{idx + 1}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{log.id}</td>
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">{log.clinicName}</td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-xs">{log.actorRef}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{log.actorType}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {log.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white max-w-xs">{log.action}</td>
                  <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400">{log.affectedResourceRef}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        log.outcome === 'Success'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : log.outcome === 'Failed'
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                      }`}
                    >
                      {log.outcome}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(log);
                      }}
                      className="text-xs"
                    >
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400">
                    No compliance audit entries match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Audit Event Detail Inspection Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={`Audit Record Details: ${selectedEvent.id}`}
          size="md"
        >
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">{selectedEvent.action}</span>
              <p className="text-xs text-slate-500">
                Timestamp: {selectedEvent.timestamp} · Correlation ID: {selectedEvent.correlationId}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 font-bold block">Actor & Role</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedEvent.actorRef}</span>
                <span className="text-slate-400 text-[10px]">({selectedEvent.actorType})</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 font-bold block">Tenant Clinic</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedEvent.clinicName}</span>
                <span className="text-slate-400 text-[10px] font-mono">{selectedEvent.clinicId}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-slate-400">Audit Narrative</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 leading-relaxed">
                {selectedEvent.details}
              </p>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Affected Target:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{selectedEvent.affectedResourceRef}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
