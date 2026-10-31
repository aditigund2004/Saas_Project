import React, { useState } from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import {
  Building2,
  AlertTriangle,
  History,
  FileText
} from 'lucide-react';

export function ConsentDetailsModal({ isOpen, onClose, consent, onStatusChange }) {
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [targetStatus, setTargetStatus] = useState('Revoked');
  const [reasonNote, setReasonNote] = useState('');

  if (!consent) return null;

  const handleApplyStatusChange = () => {
    if (!reasonNote.trim()) return;
    onStatusChange(consent.id, targetStatus, reasonNote.trim());
    setIsChangingStatus(false);
    setReasonNote('');
  };

  const getStatusVariant = (st) => {
    switch (st) {
      case 'Granted':
        return 'Confirmed';
      case 'Pending':
        return 'Pending';
      case 'Revoked':
      case 'Rejected':
        return 'Cancelled';
      case 'Expired':
        return 'Completed';
      default:
        return 'Inactive';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Patient Consent Record: ${consent.id}`}
      size="lg"
    >
      <div className="space-y-5 text-sm">
        {/* Top Summary Banner */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">{consent.id}</span>
              <Badge variant={getStatusVariant(consent.status)}>{consent.status}</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{consent.clinicName}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Patient Reference</span>
            <p className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{consent.patientRef}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">({consent.patientPseudonym})</p>
          </div>
        </div>

        {/* Legal & Purpose Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
            <span className="text-xs uppercase font-bold text-slate-400">Consent Purpose</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{consent.purpose}</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
            <span className="text-xs uppercase font-bold text-slate-400">Legal Grounds</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{consent.legalBasis}</p>
          </div>
        </div>

        {/* Scope of Health Data Categories */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Authorized Health Data Categories
          </span>
          <div className="flex flex-wrap gap-2">
            {consent.dataCategories?.map((cat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Timestamps & Validity Term */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block">Recorded Date</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{consent.recordedDate}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Validity Expiry</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{consent.expiryDate || 'Indefinite'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Consent Mode</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5 block">{consent.consentMode || 'Direct Clinic'}</span>
          </div>
        </div>

        {/* History Audit Trail */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-400" />
            Consent Lifecycle Audit Trail
          </span>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {consent.history?.map((entry, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs flex items-start justify-between gap-3"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{entry.status}</span>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">{entry.notes}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">{entry.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Transition Action Panel */}
        {isChangingStatus ? (
          <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Record Simulated Consent Transition
              </span>
              <button
                type="button"
                onClick={() => setIsChangingStatus(false)}
                className="text-xs text-amber-700 dark:text-amber-300 underline font-semibold"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Status</label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  <option value="Granted">Granted (Patient Authorized)</option>
                  <option value="Revoked">Revoked (Patient Withdrawn)</option>
                  <option value="Expired">Expired (Term Elapsed)</option>
                  <option value="Rejected">Rejected (Declined by Patient)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Justification / Note <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Patient signed revocation form #WD-88"
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => setIsChangingStatus(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!reasonNote.trim()}
                onClick={handleApplyStatusChange}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
              >
                Apply & Record Audit Event
              </Button>
            </div>
          </div>
        ) : (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChangingStatus(true)}
              className="text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700"
            >
              Simulate Status Transition
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
