import React from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
  FileCode,
  RotateCcw,
  Building2
} from 'lucide-react';

export function FhirResourceModal({ isOpen, onClose, resource, onRevalidate }) {
  if (!resource) return null;

  const isPassed = resource.validationStatus === 'Demo Validation Passed';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`FHIR Resource: ${resource.resourceType} (${resource.id})`}
      size="lg"
    >
      <div className="space-y-4 text-sm">
        {/* Resource Meta Banner */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 dark:text-white">{resource.resourceType} Profile</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  isPassed
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                }`}
              >
                {resource.validationStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{resource.clinicName}</span>
              <span>· Version: {resource.fhirVersion}</span>
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400 uppercase font-bold text-[10px] block">Standard Profile</span>
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 mt-0.5 block">{resource.profileStandard}</span>
          </div>
        </div>

        {/* Validation Issues & Suggested Actions */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2 text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Demo Validation Finding ({resource.issuesCount} Issues Detected)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{resource.validationIssues}</p>
          </div>
          {resource.suggestedAction && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px] block mb-0.5">
                Suggested Corrective Action:
              </span>
              <p className="text-slate-600 dark:text-slate-400">{resource.suggestedAction}</p>
            </div>
          )}
        </div>

        {/* JSON Payload Inspection View */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-slate-400" />
              Serialized Mock FHIR R4 JSON Payload
            </span>
            <span className="text-[11px] font-mono text-slate-400">Validated: {resource.lastValidated}</span>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-64 leading-relaxed border border-slate-800">
            {resource.samplePayload}
          </pre>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRevalidate(resource.id)}
            className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-run Simulated Validation</span>
          </Button>

          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
