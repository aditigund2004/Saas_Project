import React, { useState } from 'react';
import { backupVaultService } from '../../../../services/backupVaultService';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
  Download,
  FileArchive,
  Lock,
  Users,
  FileText,
  CreditCard,
  Calendar
} from 'lucide-react';

export function ExportMigrationModal({
  isOpen,
  onClose,
  clinics = [],
  appState = {},
  selectedClinicId: initialClinicId,
  onExportSuccess,
  showToast,
}) {
  const [selectedClinicId, setSelectedClinicId] = useState(
    initialClinicId || clinics[0]?.id || 'clinic-citycare'
  );
  const [encryptionPassword, setEncryptionPassword] = useState('');
  const [includeFhir, setIncludeFhir] = useState(true);
  const [includeCsv, setIncludeCsv] = useState(true);
  const [includeClinicalNotes, setIncludeClinicalNotes] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  if (!isOpen) return null;

  const currentClinic =
    clinics.find((c) => c.id === selectedClinicId) || clinics[0] || {
      id: 'clinic-citycare',
      name: 'CityCare Family Clinic',
    };

  // Record counts for this clinic
  const clinicPatients = (appState.patients || []).filter(
    (p) => !p.clinicId || p.clinicId === selectedClinicId
  );
  const clinicAppointments = (appState.appointments || []).filter(
    (a) => !a.clinicId || a.clinicId === selectedClinicId
  );
  const clinicPrescriptions = (appState.prescriptions || []).filter(
    (pr) => !pr.clinicId || pr.clinicId === selectedClinicId
  );
  const clinicInvoices = (appState.invoices || []).filter(
    (inv) => !inv.clinicId || inv.clinicId === selectedClinicId
  );

  const handleStartExport = async () => {
    setIsExporting(true);
    setExportProgress(15);

    try {
      // Step-by-step progress simulation while building zip
      setTimeout(() => setExportProgress(45), 250);
      setTimeout(() => setExportProgress(75), 500);

      setTimeout(async () => {
        try {
          const result = await backupVaultService.generateClinicMigrationZip({
            clinic: currentClinic,
            clinicId: selectedClinicId,
            appState,
            options: {
              password: encryptionPassword.trim() || undefined,
              includeFhir,
              includeCsv,
              includeClinicalNotes,
            },
          });

          setExportProgress(100);
          setIsExporting(false);
          showToast(
            `✅ Data Portability Archive "${result.filename}" successfully compiled and downloaded!`
          );

          if (onExportSuccess) {
            onExportSuccess(result);
          }
          onClose();
        } catch (err) {
          console.error(err);
          setIsExporting(false);
          showToast('Failed to compile migration zip archive.', 'error');
        }
      }, 700);
    } catch (err) {
      console.error(err);
      setIsExporting(false);
      showToast('Export failed.', 'error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Tenant Data Portability & Migration Archive"
      size="lg"
    >
      <div className="space-y-5">
        {/* Banner */}
        <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
          <FileArchive className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">
              Full Tenant Portability Export (DPDP Act 2023 & NMC Compliant)
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              Generates an offline archive containing the clinic's full patient records,
              invoices, appointments, and prescriptions with cryptographic SHA-256 manifest.
            </p>
          </div>
        </div>

        {/* Clinic Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Select Tenant Clinic Organization
          </label>
          <select
            value={selectedClinicId}
            onChange={(e) => setSelectedClinicId(e.target.value)}
            disabled={isExporting}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
          >
            {clinics.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.city || 'India'}) • Plan: {c.subscriptionPlanId || 'Professional'}
              </option>
            ))}
          </select>
        </div>

        {/* Data Scope Preview Cards */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Target Data Entities to Compile in .ZIP
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {clinicPatients.length}
              </div>
              <p className="text-[11px] text-slate-500">Patient Records</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <Calendar className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {clinicAppointments.length}
              </div>
              <p className="text-[11px] text-slate-500">Appointments</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <FileText className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {clinicPrescriptions.length}
              </div>
              <p className="text-[11px] text-slate-500">Prescriptions</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <CreditCard className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {clinicInvoices.length}
              </div>
              <p className="text-[11px] text-slate-500">Invoices</p>
            </div>
          </div>
        </div>

        {/* Export Options & Checkboxes */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Export Format & Interoperability Standards
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFhir}
                onChange={(e) => setIncludeFhir(e.target.checked)}
                className="rounded text-blue-600"
              />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">HL7 FHIR R4</p>
                <p className="text-[10px] text-slate-400">Interoperable Bundle</p>
              </div>
            </label>

            <label className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCsv}
                onChange={(e) => setIncludeCsv(e.target.checked)}
                className="rounded text-blue-600"
              />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Relational CSV</p>
                <p className="text-[10px] text-slate-400">SQL table tables</p>
              </div>
            </label>

            <label className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeClinicalNotes}
                onChange={(e) => setIncludeClinicalNotes(e.target.checked)}
                className="rounded text-blue-600"
              />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Clinical SOAP</p>
                <p className="text-[10px] text-slate-400">Vitals & allergies</p>
              </div>
            </label>
          </div>
        </div>

        {/* Security & Password Protection */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            Archive Encryption Passphrase (Optional AES-256)
          </label>
          <input
            type="password"
            value={encryptionPassword}
            onChange={(e) => setEncryptionPassword(e.target.value)}
            placeholder="Leave empty for unencrypted ZIP or enter secure clinic migration passphrase"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
          />
          <p className="text-[11px] text-slate-400">
            If specified, the manifest header will require this key for hospital IT decryption.
          </p>
        </div>

        {/* Progress Bar when exporting */}
        {isExporting && (
          <div className="space-y-1.5 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-200">
              <span>Compiling ZIP Archive & Calculating SHA-256...</span>
              <span>{exportProgress}%</span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleStartExport}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating ZIP...' : 'Export & Download .ZIP Archive'}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
