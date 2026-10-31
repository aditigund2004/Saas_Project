import React from 'react';
import { StatCard } from '../../../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../../../components/ui/Card';
import {
  Building2,
  FileCheck2,
  Lock,
  History,
  FileSpreadsheet,
  ArrowRight,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export function ComplianceOverviewTab({
  complianceData,
  selectedClinicScope,
  onNavigateTab,
  onSelectClinic
}) {
  const { clinicGovernance = [], consentRecords = [], privacyRequests = [], complianceAuditLogs = [], exportJobs = [] } =
    complianceData;

  // Filter dataset by active clinic scope if specified
  const filteredClinics =
    selectedClinicScope === 'All Clinics'
      ? clinicGovernance
      : clinicGovernance.filter((c) => c.clinicName === selectedClinicScope || c.clinicId === selectedClinicScope);

  const filteredConsents =
    selectedClinicScope === 'All Clinics'
      ? consentRecords
      : consentRecords.filter((c) => c.clinicName === selectedClinicScope || c.clinicId === selectedClinicScope);

  const filteredPrivacyReqs =
    selectedClinicScope === 'All Clinics'
      ? privacyRequests
      : privacyRequests.filter((r) => r.clinicName === selectedClinicScope || r.clinicId === selectedClinicScope);

  const filteredAuditLogs =
    selectedClinicScope === 'All Clinics'
      ? complianceAuditLogs
      : complianceAuditLogs.filter((l) => l.clinicName === selectedClinicScope || l.clinicId === selectedClinicScope);

  const filteredExports =
    selectedClinicScope === 'All Clinics'
      ? exportJobs
      : exportJobs.filter((e) => e.clinicScope === selectedClinicScope || e.clinicScope === 'All Clinics');

  // KPI Calculations
  const totalClinics = filteredClinics.length;
  const abdmConfiguredCount = filteredClinics.filter((c) => c.abdmStatus === 'Configured').length;
  const pendingConsentsCount = filteredConsents.filter((c) => c.status === 'Pending').length;
  const openPrivacyReqCount = filteredPrivacyReqs.filter((r) => r.status !== 'Completed' && r.status !== 'Rejected').length;
  const totalAuditEventsCount = filteredAuditLogs.length;
  const readyExportsCount = filteredExports.filter((e) => e.status === 'Ready').length;

  // Governance Status Distribution
  const statusCounts = {
    Configured: filteredClinics.filter((c) => c.governanceStatus === 'Configured').length,
    'Pending Review': filteredClinics.filter((c) => c.governanceStatus === 'Pending Review').length,
    'Action Required': filteredClinics.filter((c) => c.governanceStatus === 'Action Required').length,
    'Not Configured': filteredClinics.filter((c) => c.governanceStatus === 'Not Configured').length
  };

  const chartData = [
    { name: 'Configured', count: statusCounts.Configured, color: '#10B981' },
    { name: 'Pending Review', count: statusCounts['Pending Review'], color: '#3B82F6' },
    { name: 'Action Required', count: statusCounts['Action Required'], color: '#F59E0B' },
    { name: 'Not Configured', count: statusCounts['Not Configured'], color: '#94A3B8' }
  ];

  // Recent compliance activities
  const recentActivities = filteredAuditLogs.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Scope Pill Banner */}
      <div className="p-3 bg-slate-100/80 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Current Scope:</span>
          <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
            {selectedClinicScope} ({filteredClinics.length} Tenant Clinics)
          </span>
        </div>
        <div className="text-slate-500 dark:text-slate-400">
          Showing real-time governance metrics and simulated ABDM/FHIR indicators.
        </div>
      </div>

      {/* Summary KPI Cards Grid (Clickable to jump to tabs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div onClick={() => onNavigateTab('monitoring')} className="cursor-pointer group">
          <StatCard
            title="Total Clinics"
            value={totalClinics}
            change="+2 this quarter"
            trend="up"
            icon={Building2}
            color="blue"
            subtitle="Registered tenant clinics"
          />
        </div>

        <div onClick={() => onNavigateTab('monitoring')} className="cursor-pointer group">
          <StatCard
            title="ABDM Bridge"
            value={`${abdmConfiguredCount}/${totalClinics}`}
            change={`${Math.round((abdmConfiguredCount / (totalClinics || 1)) * 100)}%`}
            trend="up"
            icon={Activity}
            color="emerald"
            subtitle="Simulated bridge active"
          />
        </div>

        <div onClick={() => onNavigateTab('consent')} className="cursor-pointer group">
          <StatCard
            title="Pending Consents"
            value={pendingConsentsCount}
            change={pendingConsentsCount > 0 ? 'Requires action' : 'All clear'}
            trend={pendingConsentsCount > 0 ? 'down' : 'up'}
            icon={FileCheck2}
            color="amber"
            subtitle="Consent requests pending"
          />
        </div>

        <div onClick={() => onNavigateTab('privacy')} className="cursor-pointer group">
          <StatCard
            title="Privacy Requests"
            value={openPrivacyReqCount}
            change="15-day target SLA"
            trend="up"
            icon={Lock}
            color="indigo"
            subtitle="Open DPDP workflows"
          />
        </div>

        <div onClick={() => onNavigateTab('audit')} className="cursor-pointer group">
          <StatCard
            title="Audit Events"
            value={totalAuditEventsCount}
            change="Live ledger"
            trend="up"
            icon={History}
            color="slate"
            subtitle="Governance audit trail"
          />
        </div>

        <div onClick={() => onNavigateTab('export')} className="cursor-pointer group">
          <StatCard
            title="Ready Vault Exports"
            value={readyExportsCount}
            change="Checksum verified"
            trend="up"
            icon={FileSpreadsheet}
            color="emerald"
            subtitle="Downloadable reports"
          />
        </div>
      </div>

      {/* Main Governance Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Governance Status Distribution */}
        <Card className="lg:col-span-7 border-slate-200 dark:border-slate-800">
          <CardHeader
            title="Tenant Governance Tracking Status Distribution"
            subtitle="Application readiness tracking across configured tenant clinics (Not official statutory certifications)"
            action={
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {totalClinics} Clinics Monitored
              </span>
            }
          />
          <CardContent className="space-y-5">
            {/* Horizontal / Bar representation */}
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Status Legend Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">Configured</span>
                <span className="text-xl font-black text-emerald-700 dark:text-emerald-400 mt-1 block">
                  {statusCounts.Configured} Clinics
                </span>
                <span className="text-[10px] text-emerald-600/80 mt-0.5 block">ABDM & DPO assigned</span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
                <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 block">Pending Review</span>
                <span className="text-xl font-black text-blue-700 dark:text-blue-400 mt-1 block">
                  {statusCounts['Pending Review']} Clinics
                </span>
                <span className="text-[10px] text-blue-600/80 mt-0.5 block">Onboarding checklist</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block">Action Required</span>
                <span className="text-xl font-black text-amber-700 dark:text-amber-400 mt-1 block">
                  {statusCounts['Action Required']} Clinics
                </span>
                <span className="text-[10px] text-amber-600/80 mt-0.5 block">Connection/DPO alert</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Not Configured</span>
                <span className="text-xl font-black text-slate-600 dark:text-slate-400 mt-1 block">
                  {statusCounts['Not Configured']} Clinics
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Inactive Bridge</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Recent Regulatory & Consent Activity */}
        <Card className="lg:col-span-5 border-slate-200 dark:border-slate-800 flex flex-col">
          <CardHeader
            title="Recent Compliance Operations"
            subtitle="Live feed of simulated privacy requests, consent transitions, and audit events"
            action={
              <button
                onClick={() => onNavigateTab('audit')}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            }
          />
          <CardContent className="flex-1 overflow-y-auto space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 dark:text-white truncate">{act.action}</span>
                  <span className="font-mono text-[10px] text-slate-400 shrink-0">{act.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{act.details}</p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <button
                    type="button"
                    onClick={() => {
                      const clinic = clinicGovernance.find(
                        (c) => c.clinicName === act.clinicName || c.clinicId === act.clinicId
                      );
                      if (clinic && onSelectClinic) onSelectClinic(clinic);
                    }}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer text-left"
                  >
                    {act.clinicName}
                  </button>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                    {act.category}
                  </span>
                </div>
              </div>
            ))}

            {recentActivities.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                No recent activity recorded for current scope.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
