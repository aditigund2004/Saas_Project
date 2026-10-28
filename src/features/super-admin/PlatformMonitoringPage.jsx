import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Activity,
  Server,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Globe,
  Database
} from 'lucide-react';

export function PlatformMonitoringPage() {
  const { backgroundJobs, auditLogs, integrations } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
              Infrastructure & Reliability
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Platform Telemetry & System Health</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

            Real-time multi-region health indicators, worker job daemons, API adapters, and security audit trail
          </p>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">All Clusters Operational (99.98% Uptime)</span>

        </div>
      </div>

      {/* SLA Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1.5">
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Platform SLA (90d)</span>
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">99.98%</div>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">0 unplanned outages</p>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1.5">
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">API Response Time (p95)</span>
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-300">38 ms</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Edge CDN in Mumbai & Bengaluru</p>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1.5">
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Synthetic Error Rate</span>
            <AlertTriangle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-900 dark:text-indigo-300">0.01%</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Within 5-nines reliability objective</p>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1.5">
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Prescription Signatures</span>
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-300 tabular-nums">100% Valid</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tamper-evident hash verified</p>

        </Card>
      </div>

      {/* Two Column Section: Workers & Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Background Jobs */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Background Workers & Cron Daemons
          </h3>

          <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            {backgroundJobs.map((job) => (
              <div key={job.id} className="p-4 space-y-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{job.name}</span>

                  <Badge variant="success" size="sm">
                    {job.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Schedule: <strong className="text-slate-700 dark:text-slate-300">{job.schedule}</strong></span>
                  <span>Execution: <strong className="text-slate-700 dark:text-slate-300">{job.duration}</strong></span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-0.5">

                  <span>Last Run: {job.lastRun}</span>
                  <span>Processed: {job.processedRecords} records</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Third-Party Service Integrations */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            External Telemetry & Provider Adapters
          </h3>

          <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            {integrations.map((int) => (
              <div key={int.id} className="p-4 space-y-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{int.name}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">{int.category} · {int.provider}</span>

                  </div>
                  <Badge variant="success" size="sm">
                    {int.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>Adapter Latency: <strong className="text-slate-700 dark:text-slate-300">{int.latencyMs}ms</strong></span>
                  <span>90-Day Uptime: <strong className="text-slate-700 dark:text-slate-300">{int.uptime90d}%</strong></span>

                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Audit Log Trail */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Platform Security & Tenant Audit Trail
        </h3>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3.5 py-3.5 text-center w-12 font-bold">#</th>
                  <th className="px-4 py-3.5">Timestamp</th>
                  <th className="px-4 py-3.5">Actor / Operator</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Action Performed</th>
                  <th className="px-4 py-3.5">Target Resource</th>
                  <th className="px-4 py-3.5">Origin IP</th>
                  <th className="px-4 py-3.5 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {auditLogs.map((log, idx) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-3.5 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-500 dark:text-slate-400 text-xs">{log.timestamp}</td>
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{log.actor}</td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 font-medium">{log.role}</td>
                    <td className="px-4 py-3.5 font-semibold text-blue-800 dark:text-blue-300">{log.action}</td>
                    <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">{log.target}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-500 dark:text-slate-400 text-xs">{log.ipAddress}</td>
                    <td className="px-4 py-3.5 text-right">

                      <Badge variant="success" size="sm">{log.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

