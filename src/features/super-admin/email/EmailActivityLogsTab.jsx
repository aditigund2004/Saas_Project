import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  Search,
  Download,
  RotateCcw,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export function EmailActivityLogsTab({
  logs,
  onOpenPreview,
  onRetryLog
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.eventKey.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || l.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = [
      'Log ID',
      'Subject',
      'Recipient Name',
      'Recipient Email',
      'Hospital / Clinic',
      'Event Key',
      'Template Name',
      'Source',
      'Status',
      'Timestamp',
      'Failure Reason'
    ];

    const rows = filteredLogs.map((l) => [
      l.id,
      `"${l.subject.replace(/"/g, '""')}"`,
      `"${l.recipientName.replace(/"/g, '""')}"`,
      l.recipientEmail,
      `"${l.clinicName.replace(/"/g, '""')}"`,
      l.eventKey,
      `"${l.templateName.replace(/"/g, '""')}"`,
      l.source,
      l.status,
      l.timestamp,
      `"${(l.errorReason || '').replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_email_activity_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
<<<<<<< HEAD
    <div className="space-y-6">
      {/* Search, Filters & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
=======
    <div className="space-y-5">
      {/* Search, Filters & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
              placeholder="Search subject, recipient, clinic..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
              placeholder="Search subject, recipient, hospital..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
<<<<<<< HEAD
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
          >
            <option value="all">All Delivery Statuses</option>
            <option value="delivered">Delivered (Simulated)</option>
            <option value="failed">Failed</option>
            <option value="skipped">Skipped</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
<<<<<<< HEAD
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
          >
            <option value="all">All Sources</option>
            <option value="automation">Event Automations</option>
            <option value="campaign">Broadcast Campaigns</option>
            <option value="test_simulation">Test Simulations</option>
          </select>
        </div>

        {/* CSV Export Button */}
        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={handleExportCSV}
          className="font-semibold shrink-0"
        >
          Export CSV ({filteredLogs.length})
        </Button>
      </div>

      {/* Activity Logs Table */}
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
                <th className="py-3 px-4">Subject Line & Recipient</th>
                <th className="py-3 px-4">Hospital Facility</th>
                <th className="py-3 px-4">Trigger / Event</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 dark:text-slate-500">
=======
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
>>>>>>> origin/main
                    No activity records found matching the active filters.
                  </td>
                </tr>
              ) : (
<<<<<<< HEAD
                filteredLogs.map((log, idx) => {
=======
                filteredLogs.map((log) => {
>>>>>>> origin/main
                  const isDelivered = log.status === 'delivered';
                  const isFailed = log.status === 'failed';
                  const isSkipped = log.status === 'skipped';

                  return (
<<<<<<< HEAD
                    <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white max-w-sm truncate" title={log.subject}>
                          {log.subject}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{log.recipientName}</span>
                          <span>•</span>
                          <span className="font-mono">{log.recipientEmail}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{log.clinicName}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold">
                          {log.eventKey}
                        </span>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{log.templateName}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="capitalize text-slate-600 dark:text-slate-400 font-mono text-xs">
=======
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 max-w-sm truncate" title={log.subject}>
                          {log.subject}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-medium text-slate-700">{log.recipientName}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-500">{log.recipientEmail}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">{log.clinicName}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold">
                          {log.eventKey}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{log.templateName}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="capitalize text-slate-600 font-mono text-[11px]">
>>>>>>> origin/main
                          {log.source.replace('_', ' ')}
                        </span>
                      </td>

<<<<<<< HEAD
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {isDelivered && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
=======
                      <td className="py-3 px-4 whitespace-nowrap">
                        {isDelivered && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
>>>>>>> origin/main
                            Delivered (Simulated)
                          </span>
                        )}
                        {isFailed && (
                          <div>
<<<<<<< HEAD
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-800" title={log.errorReason}>
                              <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                              Failed
                            </span>
                            {log.errorReason && (
                              <div className="text-xs text-rose-600 dark:text-rose-400 max-w-xs truncate mt-0.5" title={log.errorReason}>
=======
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200" title={log.errorReason}>
                              <XCircle className="w-3 h-3 text-rose-600" />
                              Failed
                            </span>
                            {log.errorReason && (
                              <div className="text-[10px] text-rose-600 max-w-xs truncate mt-0.5" title={log.errorReason}>
>>>>>>> origin/main
                                {log.errorReason}
                              </div>
                            )}
                          </div>
                        )}
                        {isSkipped && (
                          <div>
<<<<<<< HEAD
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800" title={log.errorReason}>
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              Skipped
                            </span>
                            {log.errorReason && (
                              <div className="text-xs text-amber-700 dark:text-amber-400 max-w-xs truncate mt-0.5" title={log.errorReason}>
=======
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200" title={log.errorReason}>
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Skipped
                            </span>
                            {log.errorReason && (
                              <div className="text-[10px] text-amber-700 max-w-xs truncate mt-0.5" title={log.errorReason}>
>>>>>>> origin/main
                                {log.errorReason}
                              </div>
                            )}
                          </div>
                        )}
                      </td>

<<<<<<< HEAD
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs whitespace-nowrap">
=======
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
>>>>>>> origin/main
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                        {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>

<<<<<<< HEAD
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
=======
                      <td className="py-3 px-4 text-right whitespace-nowrap">
>>>>>>> origin/main
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Rendered Email */}
                          <button
                            type="button"
                            onClick={() =>
                              onOpenPreview({
                                id: log.templateId || 'log-preview',
                                key: log.eventKey,
                                name: log.templateName,
                                subject: log.subject,
                                htmlBody: log.renderedHtml || '<p>Simulated email content</p>',
                                textBody: log.renderedText || 'Simulated email content'
                              }, {
                                hospital_name: log.clinicName,
                                admin_name: log.recipientName,
                                recipientEmail: log.recipientEmail
                              })
                            }
<<<<<<< HEAD
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
=======
                            className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
>>>>>>> origin/main
                            title="Preview Dispatched Email"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Retry Failed Simulation */}
                          {(isFailed || isSkipped) && (
                            <button
                              type="button"
                              onClick={() => onRetryLog(log.id)}
<<<<<<< HEAD
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
=======
                              className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
>>>>>>> origin/main
                              title="Retry Simulation"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
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
    </div>
  );
}
