import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  History,
  ShieldCheck,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Key,
  Building2,
  Sparkles,
  UserCheck
} from 'lucide-react';

export function PlatformActivityPage() {
  const { auditLogs = [], showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Timestamp,Action,User,IP Address,Category,Details']
        .concat(
          filteredLogs.map(
            (l) => `"${l.timestamp}","${l.action}","${l.user}","${l.ip}","${l.category}","${l.details}"`
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
            Immutable platform audit trail tracking administrative actions, role escalations, and tenant changes.
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
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Privileged Admins</span>
          <div className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1 tabular-nums">4 Active Keys</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 block">Hardware 2FA verified</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Security Alerts</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">0 Anomalies</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 block">Zero unauthorized escalations</span>
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
              placeholder="Search audit trail by action, admin email, or specific details..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="All">All Categories</option>
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
          subtitle="Chronological trail of superadmin operations with source IP timestamps"
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
              {filteredLogs.map((log, idx) => (
                <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3.5 font-bold font-sans text-slate-900 dark:text-white">{log.action}</td>
                  <td className="p-3.5 font-sans">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{log.user}</span>
                  </td>
                  <td className="p-3.5 font-sans">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold ${
                        log.category === 'Security'
                          ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                          : log.category === 'Billing'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      }`}
                    >
                      {log.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400">{log.ip}</td>
                  <td className="p-3.5 font-sans text-slate-600 dark:text-slate-300 max-w-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
