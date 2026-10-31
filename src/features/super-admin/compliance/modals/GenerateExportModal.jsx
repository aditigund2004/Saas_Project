import React, { useState } from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { Download, FileSpreadsheet, FileCode } from 'lucide-react';

export function GenerateExportModal({ isOpen, onClose, clinics = [], onGenerate }) {
  const [reportName, setReportName] = useState('Q4 Regulatory Compliance Audit Ledger');
  const [reportType, setReportType] = useState('Administrative Audit Log');
  const [clinicScope, setClinicScope] = useState('All Clinics');
  const [dateRange, setDateRange] = useState('2026-07-01 to 2026-10-29');
  const [format, setFormat] = useState('CSV');
  const [description, setDescription] = useState('Comprehensive multi-tenant export compiled for external compliance review.');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportName.trim()) return;

    setIsGenerating(true);
    // Simulate brief compilation progress
    setTimeout(async () => {
      await onGenerate({
        reportName: reportName.trim(),
        reportType,
        clinicScope,
        dateRange,
        format,
        description: description.trim()
      });
      setIsGenerating(false);
      onClose();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Compliance Report Export"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Compliance Guard Disclaimer */}
        <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-xs text-blue-900 dark:text-blue-200">
          <strong>Export Vault Notice:</strong> Generated reports compile records from current tenant states. Each export includes a client-calculated SHA-256 integrity checksum and JSON manifest.
        </div>

        {/* Report Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            Report Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Report Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Report Category</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
            >
              <option value="Administrative Audit Log">Administrative Audit Log</option>
              <option value="Consent Activity Report">Consent Activity Report</option>
              <option value="Privacy Request Report">Privacy Request Report</option>
              <option value="FHIR Validation Summary">FHIR Validation Summary</option>
              <option value="Clinic Governance Summary">Clinic Governance Summary</option>
            </select>
          </div>

          {/* Clinic Scope */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Tenant Scope</label>
            <select
              value={clinicScope}
              onChange={(e) => setClinicScope(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
            >
              <option value="All Clinics">All Clinics (Platform Scope)</option>
              {clinics.map((c) => (
                <option key={c.id || c.clinicId} value={c.name || c.clinicName}>
                  {c.name || c.clinicName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Audited Date Range Window</label>
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            placeholder="e.g. 2026-07-01 to 2026-10-29"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-medium"
          />
        </div>

        {/* Format Selector: CSV or JSON */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Export Format</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('CSV')}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                format === 'CSV'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Standard CSV</p>
                <p className="text-[11px] text-slate-400">Excel & spreadsheet compliant</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormat('JSON')}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                format === 'JSON'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileCode className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Structured JSON</p>
                <p className="text-[11px] text-slate-400">Includes metadata & manifest</p>
              </div>
            </button>
          </div>
        </div>

        {/* Optional Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Optional Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isGenerating || !reportName.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                <span>Compiling Dataset...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate Vault Export</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
