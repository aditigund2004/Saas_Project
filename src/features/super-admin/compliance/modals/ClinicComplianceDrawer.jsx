import React from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { User } from 'lucide-react';

export function ClinicComplianceDrawer({ isOpen, onClose, clinicGovernance, onNavigateTab }) {
  if (!clinicGovernance) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Clinic Governance Cockpit: ${clinicGovernance.clinicName}`}
      size="lg"
    >
      <div className="space-y-5 text-sm">
        {/* Governance Status Summary Strip */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 dark:text-white">{clinicGovernance.clinicName}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {clinicGovernance.governanceStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Location: {clinicGovernance.city} · Tenant ID: {clinicGovernance.clinicId}
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400 uppercase font-bold text-[10px] block">ABDM Bridge Health</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              {clinicGovernance.sandboxHealth}
            </span>
          </div>
        </div>

        {/* 4 Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">ABHA Event Activity</span>
            <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block tabular-nums">
              {clinicGovernance.abhaEventCount.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Consents</span>
            <span className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5 block tabular-nums">
              {clinicGovernance.consentRecordsCount}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Open Privacy Requests</span>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5 block tabular-nums">
              {clinicGovernance.openPrivacyRequestsCount}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Retention Window</span>
            <span className="text-lg font-black text-slate-700 dark:text-slate-300 mt-0.5 block tabular-nums">
              {clinicGovernance.retentionPolicyDays / 365} Years
            </span>
          </div>
        </div>

        {/* Data Protection Officer (DPO) & Operational Config */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <User className="w-4 h-4 text-blue-600" />
            Designated Data Protection Lead & Contact
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">Designated Officer</span>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{clinicGovernance.dpoName}</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Official Privacy Channel</span>
              <p className="font-mono text-blue-600 dark:text-blue-400 mt-0.5">{clinicGovernance.dpoEmail}</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">FHIR Profile Binding</span>
              <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">{clinicGovernance.fhirProfile}</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Last Governance Audit</span>
              <p className="font-mono text-slate-700 dark:text-slate-300 mt-0.5">{clinicGovernance.lastAuditTimestamp}</p>
            </div>
          </div>
        </div>

        {/* Quick Deep-Dive Links */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onNavigateTab('consent');
              }}
            >
              View Clinic Consents
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onNavigateTab('privacy');
              }}
            >
              View Privacy Requests
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
