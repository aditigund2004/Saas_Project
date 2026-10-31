import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  History,
  ShieldCheck,
  ShieldAlert,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Key,
  Building2,
  Sparkles,
  UserCheck,
  Lock
} from 'lucide-react';

export function PlatformActivityPage() {
  const { auditLogs = [], showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState(null);

  const shadowLogsCount = auditLogs.filter(
    (l) => l.action?.includes('[SHADOW MODE]') || l.isShadowMode
  ).length;

  const filteredLogs = auditLogs.filter((log) => {
    const actionStr = log.action || '';
    const userStr = log.user || log.actor || '';
    const detailsStr = log.details || log.target || '';
    const categoryStr = log.category || 'Security';

    const matchesSearch =
      actionStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detailsStr.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All'
        ? true
        : categoryFilter === 'Shadow'
        ? actionStr.includes('[SHADOW MODE]') || log.isShadowMode
        : categoryStr === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Timestamp,Action,User,IP Address,Category,Details']
        .concat(
          filteredLogs.map(
            (l) =>
              `"${l.timestamp}","${l.action?.replace(/"/g, '""')}","${(l.user || l.actor || '').replace(
                /"/g,
                '""'
              )}","${l.ip || l.ipAddress || ''}","${l.category || 'Security'}","${(
                l.details ||
                l.target ||
                ''
              ).replace(/"/g, '""')}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Audit log CSV exported.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Security & Governance</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Administrative Activity Log</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Immutable platform audit trail tracking administrative actions, tenant shadow sessions, and privileged role escalations.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="w-4 h-4 mr-1.5" />
          Export Audit Trail (.CSV)
        </Button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Logged Audit Events</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">{auditLogs.length} Records</div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1.5 block">Live compliance ledger</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Shadow Cockpit Sessions</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 tabular-nums flex items-center gap-1.5">
            <ShieldAlert className="w-5 h-5 text-amber-500 inline" />
            <span>{shadowLogsCount} Actions</span>
          </div>
          <span className="text-xs text-amber-600/90 dark:text-amber-400/90 font-semibold mt-1.5 block">Attributed to Super Admin ID</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Privileged Admins</span>
          <div className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1 tabular-nums">4 Active Keys</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 block">Hardware 2FA verified</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Retention Policy</span>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1 tabular-nums">365 Days</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 block">Immutable write-once log</span>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail by action, admin email, ticket ID, or details..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="All">All Categories ({auditLogs.length})</option>
              <option value="Shadow">🛡️ Privileged Shadow Mode ({shadowLogsCount})</option>
              <option value="Security">Security & Access</option>
              <option value="Billing">Billing & Subscriptions</option>
              <option value="Tenant">Tenant Management</option>
              <option value="Platform">Platform Configuration</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Activity Table */}
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardHeader
          title={`Administrative Audit Entries (${filteredLogs.length})`}
          subtitle="Chronological trail of superadmin operations with source IP timestamps & shadow mode tags"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-semibold">#</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Action Event</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
              {filteredLogs.map((log, idx) => {
                const isShadow = log.action?.includes('[SHADOW MODE]') || log.isShadowMode;
                return (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`transition-colors cursor-pointer group ${
                      isShadow
                        ? 'bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50/70 dark:hover:bg-amber-950/40'
                        : 'hover:bg-blue-50/60 dark:hover:bg-slate-800/60'
                    }`}
                    title="Click row to view read-only administrative audit record"
                  >
                    <td className="p-3.5 text-center font-mono font-bold text-slate-500 dark:text-slate-400 text-xs">{idx + 1}</td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3.5 font-bold font-sans text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {isShadow && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 px-1.5 py-0.5 rounded shadow-2xs">
                            <ShieldAlert className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            SHADOW
                          </span>
                        )}
                        <span>{log.action}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-sans">
                      <span className={`font-semibold ${isShadow ? 'text-amber-900 dark:text-amber-200' : 'text-slate-800 dark:text-slate-200'}`}>
                        {log.user || log.actor}
                      </span>
                    </td>
                    <td className="p-3.5 font-sans">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold ${
                          isShadow
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                            : log.category === 'Security'
                            ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                            : log.category === 'Billing'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        }`}
                      >
                        {isShadow ? 'Privileged' : (log.category || 'Security')}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400">{log.ip || log.ipAddress || '103.21.244.18'}</td>
                    <td className="p-3.5 font-sans text-slate-600 dark:text-slate-300 max-w-sm">
                      {log.details || log.target}
                    </td>
                  </tr>
                );
              })}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
                    No activity entries found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Read-Only Administrative Audit Record Modal */}
      {selectedLog && (
        <Modal
          isOpen={Boolean(selectedLog)}
          onClose={() => setSelectedLog(null)}
          title="Administrative Audit Entry — Read-Only"
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Immutable Audit Record</span>
                </span>
                <span className="font-mono text-slate-500 text-xs">{selectedLog.timestamp}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{selectedLog.action}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block mb-0.5 font-medium">Administrator</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedLog.user || selectedLog.actor}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block mb-0.5 font-medium">Category</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedLog.category || 'Security'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block mb-0.5 font-medium">Source IP Address</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedLog.ip || selectedLog.ipAddress || '103.21.244.18'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block mb-0.5 font-medium">Mode</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {selectedLog.action?.includes('[SHADOW MODE]') || selectedLog.isShadowMode ? 'Shadow Mode Session' : 'Standard Superadmin'}
                </span>
              </div>
              <div className="col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block mb-0.5 font-medium">Audit Trail Details</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {selectedLog.details || selectedLog.target}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedLog(null)}
              >
                Close Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
