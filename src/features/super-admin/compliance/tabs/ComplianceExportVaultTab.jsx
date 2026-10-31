import React, { useState } from 'react';
import { Card, CardHeader } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import {
  Download,
  PlusCircle,
  ShieldCheck,
  Search,
  CheckCircle2
} from 'lucide-react';

export function ComplianceExportVaultTab({
  complianceData,
  selectedClinicScope,
  onOpenGenerateModal,
  onOpenManifestModal,
  onDownloadFile
}) {
  const { exportJobs = [] } = complianceData;

  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState('All');

  const filteredJobs = exportJobs.filter((job) => {
    const matchesScope =
      selectedClinicScope === 'All Clinics' ||
      job.clinicScope === selectedClinicScope ||
      job.clinicScope === 'All Clinics';

    const matchesSearch =
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.reportType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFormat = formatFilter === 'All' || job.format === formatFilter;

    return matchesScope && matchesSearch && matchesFormat;
  });

  return (
    <div className="space-y-6">
      {/* Top Vault Advisory Banner */}
      <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-2.5 max-w-3xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-800 dark:text-emerald-300">
              Compliance Export Vault & Evidence Repository
            </span>
            <p className="leading-relaxed">
              Generate real downloadable CSV and JSON audits from your active multi-tenant datasets. Each export is accompanied by a SHA-256 client transmission checksum and metadata manifest for regulatory record-keeping.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onOpenGenerateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Generate Vault Export</span>
        </Button>
      </div>

      {/* Main Export Table Card */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader
          title={`Compiled Export Vault Packages (${filteredJobs.length})`}
          subtitle="Downloadable compliance dossiers with cryptographic transmission verification"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter export jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 w-40 sm:w-52"
                />
              </div>

              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Formats</option>
                <option value="CSV">CSV Spreadsheets</option>
                <option value="JSON">Structured JSON</option>
              </select>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                <th className="p-3.5">Export Job ID</th>
                <th className="p-3.5">Report Package Name</th>
                <th className="p-3.5">Report Type</th>
                <th className="p-3.5">Scope</th>
                <th className="p-3.5">Format</th>
                <th className="p-3.5 text-right">Records</th>
                <th className="p-3.5">Created At</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredJobs.map((job, idx) => (
                <tr
                  key={job.id}
                  onClick={() => onOpenManifestModal(job)}
                  className="cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors"
                  title="Click to view evidence, manifest & SHA-256 integrity hash"
                >
                  <td className="p-3.5 text-center font-bold text-slate-500 dark:text-slate-400">{idx + 1}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{job.id}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 dark:text-white block">{job.reportName}</span>
                    <span className="text-[11px] text-slate-400 font-mono truncate max-w-xs block">
                      SHA-256: {job.checksumSha256?.slice(0, 16)}...
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">{job.reportType}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">{job.clinicScope}</td>
                  <td className="p-3.5 font-mono font-bold">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {job.format}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {job.recordCount}
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{job.createdAt}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {job.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenManifestModal(job)}
                        className="text-xs"
                      >
                        Evidence & Hash
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownloadFile(job)}
                        className="text-xs text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 font-bold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400">
                    No export vault jobs found matching your filters. Click "Generate Vault Export" to compile one.
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
