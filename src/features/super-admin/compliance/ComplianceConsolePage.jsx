import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import {
  ShieldCheck,
  Activity,
  FileCheck2,
  Lock,
  History,
  FileSpreadsheet,
  Building2,
  RotateCcw
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { complianceService } from '../../../services/complianceService';

// Tabs
import { ComplianceOverviewTab } from './tabs/ComplianceOverviewTab';
import { AbhaFhirMonitoringTab } from './tabs/AbhaFhirMonitoringTab';
import { ConsentManagementTab } from './tabs/ConsentManagementTab';
import { PrivacyRequestsTab } from './tabs/PrivacyRequestsTab';
import { ComplianceAuditLogsTab } from './tabs/ComplianceAuditLogsTab';
import { ComplianceExportVaultTab } from './tabs/ComplianceExportVaultTab';

// Modals
import { ConsentDetailsModal } from './modals/ConsentDetailsModal';
import { PrivacyRequestDetailsModal } from './modals/PrivacyRequestDetailsModal';
import { FhirResourceModal } from './modals/FhirResourceModal';
import { ClinicComplianceDrawer } from './modals/ClinicComplianceDrawer';
import { GenerateExportModal } from './modals/GenerateExportModal';
import { ExportManifestModal } from './modals/ExportManifestModal';

export function ComplianceConsolePage() {
  const { tab: urlTab } = useParams();
  const navigate = useNavigate();
  const { clinics = [], showToast } = useApp();

  // Active Tab derived from route
  const activeTab = urlTab || 'overview';

  // Cross-Clinic Scope Filter
  const [selectedClinicScope, setSelectedClinicScope] = useState('All Clinics');

  // Service State
  const [complianceData, setComplianceData] = useState(() => complianceService.getData());

  // Modal / Drawer States
  const [selectedConsent, setSelectedConsent] = useState(null);
  const [selectedPrivacyReq, setSelectedPrivacyReq] = useState(null);
  const [selectedFhirResource, setSelectedFhirResource] = useState(null);
  const [selectedClinicGov, setSelectedClinicGov] = useState(null);
  const [isGenerateExportOpen, setIsGenerateExportOpen] = useState(false);
  const [selectedExportJob, setSelectedExportJob] = useState(null);

  const handleTabChange = (newTab) => {
    navigate(`/superadmin/compliance/${newTab}`);
  };

  // Consent Status Change
  const handleConsentStatusChange = (consentId, newStatus, reason) => {
    const res = complianceService.updateConsentStatus(consentId, newStatus, reason);
    if (res.success) {
      setComplianceData(complianceService.getData());
      setSelectedConsent(null);
      showToast(`Consent record updated to "${newStatus}" and audit event logged.`, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  // Privacy Request Workflow Transition
  const handleUpdatePrivacyWorkflow = (requestId, updates, transitionNote) => {
    const res = complianceService.updatePrivacyRequest(requestId, updates, transitionNote);
    if (res.success) {
      setComplianceData(complianceService.getData());
      setSelectedPrivacyReq(res.request);
      showToast(`Privacy workflow transition recorded. Audit ledger updated.`, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  // Revalidate FHIR Resource
  const handleRevalidateFhir = (resourceId) => {
    const res = complianceService.revalidateFhirResource(resourceId);
    if (res.success) {
      setComplianceData(complianceService.getData());
      if (selectedFhirResource && selectedFhirResource.id === resourceId) {
        setSelectedFhirResource(res.resource);
      }
      showToast(`FHIR R4 resource validated. Schema verification passed.`, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  // Generate Vault Export
  const handleGenerateExport = async (config) => {
    const res = await complianceService.generateExportJob(config);
    if (res.success) {
      setComplianceData(complianceService.getData());
      showToast(`Export "${res.job.reportName}" compiled with SHA-256 integrity checksum.`, 'success');
    } else {
      showToast('Failed to compile compliance export.', 'error');
    }
  };

  // Download Report File
  const handleDownloadFile = (job) => {
    const ok = complianceService.downloadReportFile(job);
    if (ok) {
      showToast(`Report ${job.id} downloaded successfully as ${job.format}.`, 'success');
    } else {
      showToast('Could not initiate file download.', 'error');
    }
  };

  // Reset Demo State
  const handleResetDemoData = () => {
    const fresh = complianceService.resetData();
    setComplianceData(fresh);
    showToast('Reset all compliance demo records back to baseline state.', 'info');
  };

  const tabs = [
    { id: 'overview', label: 'Compliance Overview', icon: ShieldCheck },
    {
      id: 'monitoring',
      label: 'ABHA & FHIR Monitoring',
      icon: Activity,
      count: complianceData.clinicGovernance?.length || 0
    },
    {
      id: 'consent',
      label: 'Consent Management',
      icon: FileCheck2,
      count: complianceData.consentRecords?.filter((c) => c.status === 'Pending').length || 0,
      highlightCount: true
    },
    {
      id: 'privacy',
      label: 'Data Privacy Requests',
      icon: Lock,
      count: complianceData.privacyRequests?.filter((r) => r.status !== 'Completed' && r.status !== 'Rejected').length || 0,
      highlightCount: true
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: History,
      count: complianceData.complianceAuditLogs?.length || 0
    },
    {
      id: 'export',
      label: 'Compliance Export Vault',
      icon: FileSpreadsheet,
      count: complianceData.exportJobs?.length || 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header with Scope Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Governance & Regulatory Intelligence
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              Operational Oversight Layer
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Healthcare Regulatory & Data Compliance Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Centralized multi-tenant interface for data governance, simulated ABHA bridge monitoring, FHIR indicators, patient consent, and DPDP privacy fulfillment.
          </p>
        </div>

        {/* Header Right Actions: Scope Selector & Reset */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedClinicScope}
              onChange={(e) => setSelectedClinicScope(e.target.value)}
              aria-label="Cross-Clinic Scope"
              className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All Clinics">All Clinics (Platform Multi-Tenant)</option>
              {clinics.map((c) => (
                <option key={c.id || c.clinicId} value={c.name || c.clinicName}>
                  {c.name || c.clinicName}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDemoData}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            title="Reset mock data to initial baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </Button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <nav className="flex space-x-2 sm:space-x-4 min-w-max pb-px" aria-label="Compliance Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/20 rounded-t-lg'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      tab.highlightCount && tab.count > 0
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold'
                        : isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab View */}
      <div>
        {activeTab === 'overview' && (
          <ComplianceOverviewTab
            complianceData={complianceData}
            selectedClinicScope={selectedClinicScope}
            onNavigateTab={handleTabChange}
            onSelectClinic={(c) => setSelectedClinicGov(c)}
          />
        )}

        {activeTab === 'monitoring' && (
          <AbhaFhirMonitoringTab
            complianceData={complianceData}
            selectedClinicScope={selectedClinicScope}
            onOpenClinicDrawer={(c) => setSelectedClinicGov(c)}
            onOpenFhirModal={(r) => setSelectedFhirResource(r)}
            onRevalidateFhir={handleRevalidateFhir}
          />
        )}

        {activeTab === 'consent' && (
          <ConsentManagementTab
            complianceData={complianceData}
            selectedClinicScope={selectedClinicScope}
            onOpenConsentModal={(c) => setSelectedConsent(c)}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyRequestsTab
            complianceData={complianceData}
            selectedClinicScope={selectedClinicScope}
            onOpenRequestModal={(r) => setSelectedPrivacyReq(r)}
          />
        )}

        {activeTab === 'audit' && (
          <ComplianceAuditLogsTab
            complianceData={complianceData}
            selectedClinicScope={selectedClinicScope}
          />
        )}

        {activeTab === 'export' && (
          <ComplianceExportVaultTab
            complianceData={complianceData}
            selectedClinicScope={selectedClinicScope}
            onOpenGenerateModal={() => setIsGenerateExportOpen(true)}
            onOpenManifestModal={(job) => setSelectedExportJob(job)}
            onDownloadFile={handleDownloadFile}
          />
        )}
      </div>

      {/* Modal & Drawer Containers */}
      <ConsentDetailsModal
        isOpen={!!selectedConsent}
        onClose={() => setSelectedConsent(null)}
        consent={selectedConsent}
        onStatusChange={handleConsentStatusChange}
      />

      <PrivacyRequestDetailsModal
        isOpen={!!selectedPrivacyReq}
        onClose={() => setSelectedPrivacyReq(null)}
        request={selectedPrivacyReq}
        onUpdateWorkflow={handleUpdatePrivacyWorkflow}
      />

      <FhirResourceModal
        isOpen={!!selectedFhirResource}
        onClose={() => setSelectedFhirResource(null)}
        resource={selectedFhirResource}
        onRevalidate={handleRevalidateFhir}
      />

      <ClinicComplianceDrawer
        isOpen={!!selectedClinicGov}
        onClose={() => setSelectedClinicGov(null)}
        clinicGovernance={selectedClinicGov}
        onNavigateTab={handleTabChange}
      />

      <GenerateExportModal
        isOpen={isGenerateExportOpen}
        onClose={() => setIsGenerateExportOpen(false)}
        clinics={clinics}
        onGenerate={handleGenerateExport}
      />

      <ExportManifestModal
        isOpen={!!selectedExportJob}
        onClose={() => setSelectedExportJob(null)}
        job={selectedExportJob}
        onDownloadFile={handleDownloadFile}
      />
    </div>
  );
}
