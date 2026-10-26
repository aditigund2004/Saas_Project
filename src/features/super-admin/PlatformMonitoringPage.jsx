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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Infrastructure & Reliability
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Telemetry & System Health</h1>
          <p className="text-xs text-slate-500">
            Real-time multi-region health indicators, worker job daemons, API adapters, and security audit trail
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-emerald-700">All Clusters Operational (99.98% Uptime)</span>
        </div>
      </div>

      {/* SLA Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs uppercase font-semibold text-slate-500">Platform SLA (90d)</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">99.98%</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">0 unplanned outages</p>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs uppercase font-semibold text-slate-500">API Response Time (p95)</span>
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">38 ms</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Edge CDN in Mumbai & Bengaluru</p>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs uppercase font-semibold text-slate-500">Synthetic Error Rate</span>
            <AlertTriangle className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-900">0.01%</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Within 5-nines reliability objective</p>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs uppercase font-semibold text-slate-500">Prescription Signatures</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-900">100% Valid</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Tamper-evident hash verified</p>
        </Card>
      </div>

      {/* Two Column Section: Workers & Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Background Jobs */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-600" />
            Background Workers & Cron Daemons
          </h3>

          <Card className="divide-y divide-slate-100 border-slate-200">
            {backgroundJobs.map((job) => (
              <div key={job.id} className="p-3.5 space-y-1 hover:bg-slate-50 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{job.name}</span>
                  <Badge variant="success" size="sm">
                    {job.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Schedule: <strong>{job.schedule}</strong></span>
                  <span>Execution: <strong>{job.duration}</strong></span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>Last Run: {job.lastRun}</span>
                  <span>Processed: {job.processedRecords} records</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Third-Party Service Integrations */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            External Telemetry & Provider Adapters
          </h3>

          <Card className="divide-y divide-slate-100 border-slate-200">
            {integrations.map((int) => (
              <div key={int.id} className="p-3.5 space-y-1 hover:bg-slate-50 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{int.name}</span>
                    <span className="text-[10px] text-slate-400 block">{int.category} · {int.provider}</span>
                  </div>
                  <Badge variant="success" size="sm">
                    {int.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Adapter Latency: <strong>{int.latencyMs}ms</strong></span>
                  <span>90-Day Uptime: <strong>{int.uptime90d}%</strong></span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Audit Log Trail */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-700" />
          Platform Security & Tenant Audit Trail
        </h3>

        <Card className="overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Actor / Operator</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Action Performed</th>
                  <th className="px-4 py-3">Target Resource</th>
                  <th className="px-4 py-3">Origin IP</th>
                  <th className="px-4 py-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-500">{log.timestamp}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{log.actor}</td>
                    <td className="px-4 py-3 text-slate-600">{log.role}</td>
                    <td className="px-4 py-3 font-semibold text-blue-800">{log.action}</td>
                    <td className="px-4 py-3 text-slate-700">{log.target}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{log.ipAddress}</td>
                    <td className="px-4 py-3 text-right">
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

