import React, { useState } from 'react';
import { backupVaultService } from '../../../../services/backupVaultService';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
  Database,
  FileCheck,
  Server,
  Play
} from 'lucide-react';

export function TriggerSnapshotModal({ isOpen, onClose, onCreated, showToast }) {
  const [type, setType] = useState('full_cluster');
  const [notes, setNotes] = useState('Pre-deployment baseline snapshot before weekly maintenance window.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleRunSnapshot = async () => {
    setIsProcessing(true);
    setProgress(20);

    setTimeout(() => setProgress(50), 300);
    setTimeout(() => setProgress(80), 600);

    setTimeout(async () => {
      try {
        const created = await backupVaultService.triggerOnDemandSnapshot({
          type,
          notes,
        });

        setProgress(100);
        setIsProcessing(false);
        showToast(`✅ Snapshot "${created.id}" created and replicated to geo-standby!`);
        if (onCreated) onCreated(created);
        onClose();
      } catch (err) {
        console.error(err);
        setIsProcessing(false);
        showToast('Failed to trigger snapshot.', 'error');
      }
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Initiate On-Demand Vault Snapshot"
      size="md"
    >
      <div className="space-y-5">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Capture an immediate, non-blocking cluster snapshot. WAL delta logs will be synced
          and replicated to the secondary geo-standby cluster in real-time.
        </p>

        {/* Snapshot Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Select Backup Scope
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setType('full_cluster')}
              className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                type === 'full_cluster'
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 font-bold shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Server className="w-5 h-5 text-blue-600" />
              <span>Full Cluster</span>
              <span className="text-[10px] text-slate-400 font-normal">DB + Scans</span>
            </button>

            <button
              type="button"
              onClick={() => setType('database')}
              className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                type === 'database'
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Database className="w-5 h-5 text-indigo-600" />
              <span>PostgreSQL DB</span>
              <span className="text-[10px] text-slate-400 font-normal">Relational Data</span>
            </button>

            <button
              type="button"
              onClick={() => setType('scans')}
              className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                type === 'scans'
                  ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-900 dark:text-teal-200 font-bold shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <FileCheck className="w-5 h-5 text-teal-600" />
              <span>Medical Scans</span>
              <span className="text-[10px] text-slate-400 font-normal">DICOM S3 Blobs</span>
            </button>
          </div>
        </div>

        {/* Reason / Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Snapshot Reason / Audit Note
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Pre-upgrade baseline or compliance drill"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
          />
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="space-y-1.5 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-200">
              <span>Streaming WAL & Replicating to Standby...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunSnapshot}
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isProcessing ? 'Snapshotting...' : 'Execute Snapshot'}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
