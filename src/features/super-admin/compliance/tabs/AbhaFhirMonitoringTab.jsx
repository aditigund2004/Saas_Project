import React, { useState } from 'react';
import { Card, CardHeader } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import {
  FileCode,
  ShieldAlert,
  Search
} from 'lucide-react';

export function AbhaFhirMonitoringTab({
  complianceData,
  selectedClinicScope,
  onOpenClinicDrawer,
  onOpenFhirModal,
  onRevalidateFhir
}) {
  const { clinicGovernance = [], fhirResources = [] } = complianceData;

  const [searchQuery, setSearchQuery] = useState('');
  const [abdmStatusFilter, setAbdmStatusFilter] = useState('All');
  const [fhirFilter, setFhirFilter] = useState('All');

  // Filter ABHA records by clinic scope & query
  const filteredAbhaClinics = clinicGovernance.filter((c) => {
    const matchesScope =
      selectedClinicScope === 'All Clinics' || c.clinicName === selectedClinicScope || c.clinicId === selectedClinicScope;
    const matchesQuery =
      c.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clinicId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = abdmStatusFilter === 'All' || c.abdmStatus === abdmStatusFilter;
    return matchesScope && matchesQuery && matchesStatus;
  });

  // Filter FHIR resources
  const filteredFhirResources = fhirResources.filter((r) => {
    const matchesScope =
      selectedClinicScope === 'All Clinics' || r.clinicName === selectedClinicScope || r.clinicId === selectedClinicScope;
    const matchesType = fhirFilter === 'All' || r.resourceType === fhirFilter;
    return matchesScope && matchesType;
  });

  // Aggregated activity metrics
  const totalEvents = filteredAbhaClinics.reduce((sum, c) => sum + (c.abhaEventCount || 0), 0);
  const configuredCount = filteredAbhaClinics.filter((c) => c.abdmStatus === 'Configured').length;
  const issuesCount = filteredAbhaClinics.filter((c) => c.abdmStatus === 'Connection Issue').length;

  return (
    <div className="space-y-6">
      {/* Disclaimer Alert */}
      <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-800 dark:text-amber-300">
            Simulated Sandbox Environment
          </span>
          <p className="leading-relaxed">
            The event metrics, health probe latencies, and validation results below represent frontend test simulations in ClinicOS. They do not claim live government National Health Authority (NHA) production gateway certification or verified external statutory audits.
          </p>
        </div>
      </div>

      {/* Activity KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Simulated ABHA Operations
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
            {totalEvents.toLocaleString()}
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1 block">
            Across {filteredAbhaClinics.length} scoped clinics
          </span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Configured Bridges
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
            {configuredCount} / {filteredAbhaClinics.length}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            {Math.round((configuredCount / (filteredAbhaClinics.length || 1)) * 100)}% active integration rate
          </span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Active Connection Alerts
          </span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
            {issuesCount} Clinics
          </div>
          <span className="text-xs text-amber-600/90 dark:text-amber-400/90 font-semibold mt-1 block">
            Handshake / TLS latency
          </span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            FHIR Profile Conformance
          </span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 tabular-nums">
            R4 v4.0.1
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            NRCES Draft Artifact Standard
          </span>
        </Card>
      </div>

      {/* Section 1: ABHA Monitoring Table */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader
          title="ABDM-Related Integration Monitoring"
          subtitle="Status of Ayushman Bharat Digital Mission mock bridge configurations, sandbox activity, and connectivity health"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter clinic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 w-40 sm:w-52"
                />
              </div>
              <select
                value={abdmStatusFilter}
                onChange={(e) => setAbdmStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Integration Statuses</option>
                <option value="Configured">Configured</option>
                <option value="Pending Configuration">Pending Configuration</option>
                <option value="Connection Issue">Connection Issue</option>
                <option value="Not Configured">Not Configured</option>
              </select>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                <th className="p-3.5">Clinic ID</th>
                <th className="p-3.5">Clinic Tenant</th>
                <th className="p-3.5">Integration Status</th>
                <th className="p-3.5 text-right">Simulated ABHA Count</th>
                <th className="p-3.5">Bridge Health</th>
                <th className="p-3.5">DPO Contact</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredAbhaClinics.map((clinic, idx) => (
                <tr
                  key={clinic.clinicId}
                  onClick={() => onOpenClinicDrawer(clinic)}
                  className="cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors"
                  title="Click to inspect clinic compliance cockpit"
                >
                  <td className="p-3.5 text-center font-bold text-slate-500 dark:text-slate-400">{idx + 1}</td>
                  <td className="p-3.5 font-mono text-slate-500">{clinic.clinicId}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 dark:text-white block">{clinic.clinicName}</span>
                    <span className="text-[11px] text-slate-400">{clinic.city}</span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        clinic.abdmStatus === 'Configured'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : clinic.abdmStatus === 'Connection Issue'
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                          : clinic.abdmStatus === 'Pending Configuration'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {clinic.abdmStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {clinic.abhaEventCount.toLocaleString()}
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono text-slate-600 dark:text-slate-300">{clinic.sandboxHealth}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-slate-700 dark:text-slate-300 block truncate max-w-xs">{clinic.dpoName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{clinic.dpoEmail}</span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenClinicDrawer(clinic);
                      }}
                      className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 text-xs"
                    >
                      Inspect Cockpit
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredAbhaClinics.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    No clinics match the selected ABHA filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Section 2: FHIR Interoperability Indicators */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader
          title="FHIR Interoperability Indicators & Profiles"
          subtitle="Mock validation checks for Indian NRCES health artifact standard conformity (Patient, Encounter, Observation, DiagnosticReport)"
          action={
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Filter Resource:</span>
              <select
                value={fhirFilter}
                onChange={(e) => setFhirFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Resources</option>
                <option value="Patient">Patient</option>
                <option value="DiagnosticReport">DiagnosticReport</option>
                <option value="Encounter">Encounter</option>
                <option value="MedicationRequest">MedicationRequest</option>
                <option value="Observation">Observation</option>
              </select>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                <th className="p-3.5">Resource Type</th>
                <th className="p-3.5">Clinic Tenant</th>
                <th className="p-3.5">Profile Standard</th>
                <th className="p-3.5">Validation Status</th>
                <th className="p-3.5">Last Check</th>
                <th className="p-3.5">Validation Finding</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredFhirResources.map((res, idx) => {
                const isPassed = res.validationStatus === 'Demo Validation Passed';
                return (
                  <tr
                    key={res.id}
                    onClick={() => onOpenFhirModal(res)}
                    className="cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors"
                    title="Click to view FHIR payload & schema details"
                  >
                    <td className="p-3.5 text-center font-bold text-slate-500 dark:text-slate-400">{idx + 1}</td>
                    <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">
                      <div className="flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-purple-600" />
                        <span>{res.resourceType}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">{res.clinicName}</td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">{res.profileStandard}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          isPassed
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        }`}
                      >
                        {res.validationStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono">{res.lastValidated}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300 max-w-xs truncate" title={res.validationIssues}>
                      {res.validationIssues}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenFhirModal(res)}
                          className="text-xs"
                        >
                          Payload View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRevalidateFhir(res.id)}
                          className="text-xs text-blue-600 dark:text-blue-400"
                        >
                          Re-validate
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredFhirResources.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    No FHIR resources match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
