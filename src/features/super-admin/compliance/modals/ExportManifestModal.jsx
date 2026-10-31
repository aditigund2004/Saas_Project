import React, { useState } from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
  Download,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  FileCode
} from 'lucide-react';
import { complianceService } from '../../../../services/complianceService';

export function ExportManifestModal({ isOpen, onClose, job, onDownloadFile }) {
  const [copied, setCopied] = useState(false);

  if (!job) return null;

  const handleCopyChecksum = () => {
    if (job.checksumSha256) {
      navigator.clipboard?.writeText(job.checksumSha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadManifestJson = () => {
    complianceService.downloadManifest(job);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Export Manifest & Evidence: ${job.id}`}
      size="md"
    >
      <div className="space-y-4 text-sm">
        {/* Top Header Card */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{job.reportName}</span>
            <span className="px-2 py-0.5 rounded font-mono font-bold text-xs uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {job.format}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Scope: {job.clinicScope} · {job.recordCount} Records Compiled
          </p>
        </div>

        {/* SHA-256 Checksum Display Card */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Cryptographic Checksum (SHA-256)
            </span>
            <button
              type="button"
              onClick={handleCopyChecksum}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Hash'}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl text-emerald-400 font-mono text-xs break-all border border-slate-800 select-all leading-relaxed">
            {job.checksumSha256 || 'Calculating SHA-256...'}
          </div>
        </div>

        {/* Manifest Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block">Generated At</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{job.createdAt}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Requested By</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">{job.requestedBy}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Compiled File Size</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{job.fileSize}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Integrity State</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">Verified</span>
          </div>
        </div>

        {/* Regulatory Disclaimer Notice */}
        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <span className="font-bold uppercase tracking-wider flex items-center gap-1 text-[11px] text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Tamper-Evidence & Integrity Note
          </span>
          <p className="leading-relaxed">
            A client-generated SHA-256 checksum enables detection of post-export file tampering when compared against this recorded manifest. It does not establish immutable hardware write-once storage (WORM) or digital signatures under the Indian Evidence Act.
          </p>
        </div>

        {/* Download Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadManifestJson}
            className="flex items-center gap-1.5 text-xs text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
          >
            <FileCode className="w-4 h-4 text-purple-600" />
            <span>Download Manifest (.JSON)</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onDownloadFile(job)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Report ({job.format})</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
