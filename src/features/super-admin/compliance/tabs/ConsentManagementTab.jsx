import React, { useState } from 'react';
import { Card, CardHeader } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import {
  FileCheck2,
  Search
} from 'lucide-react';

export function ConsentManagementTab({
  complianceData,
  selectedClinicScope,
  onOpenConsentModal
}) {
  const { consentRecords = [] } = complianceData;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [purposeFilter, setPurposeFilter] = useState('All');

  const filteredConsents = consentRecords.filter((c) => {
    const matchesScope =
      selectedClinicScope === 'All Clinics' || c.clinicName === selectedClinicScope || c.clinicId === selectedClinicScope;
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patientRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clinicName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesPurpose =
      purposeFilter === 'All'
        ? true
        : purposeFilter === 'EHR'
        ? c.purpose.includes('EHR') || c.purpose.includes('OPD')
        : purposeFilter === 'Diagnostics'
        ? c.purpose.includes('Diagnostics') || c.purpose.includes('Scan')
        : true;

    return matchesScope && matchesSearch && matchesStatus && matchesPurpose;
  });

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
    <div className="space-y-6">
      {/* Top Advisory Banner */}
      <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
        <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider text-[11px] text-blue-800 dark:text-blue-300">
            Multi-Tenant Patient Consent Ledger
          </span>
          <p className="leading-relaxed">
            Patient references displayed are pseudonymized fictional test tokens (e.g. PT-REF-4821) in compliance with DPDP privacy principles. Consent status changes trigger immediate administrative audit logging.
          </p>
        </div>
      </div>

      {/* Main Consent Table Card */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader
          title={`Patient Consent Records (${filteredConsents.length})`}
          subtitle="Real-time multi-tenant consent lifecycle oversight, validity windows, and health data categories"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search token or purpose..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 w-44 sm:w-56"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Statuses</option>
                <option value="Granted">Granted</option>
                <option value="Pending">Pending</option>
                <option value="Revoked">Revoked</option>
                <option value="Expired">Expired</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Purposes</option>
                <option value="EHR">EHR & Longitudinal</option>
                <option value="Diagnostics">Diagnostics & Imaging</option>
              </select>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                <th className="p-3.5">Record ID</th>
                <th className="p-3.5">Clinic Tenant</th>
                <th className="p-3.5">Patient Token</th>
                <th className="p-3.5">Consent Purpose</th>
                <th className="p-3.5">Data Scope</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Recorded</th>
                <th className="p-3.5">Validity Expiry</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredConsents.map((c, idx) => (
                <tr
                  key={c.id}
                  onClick={() => onOpenConsentModal(c)}
                  className="cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors"
                  title="Click to view details & lifecycle transition"
                >
                  <td className="p-3.5 text-center font-bold text-slate-500 dark:text-slate-400">{idx + 1}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{c.id}</td>
                  <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">{c.clinicName}</td>
                  <td className="p-3.5">
                    <span className="font-mono text-slate-700 dark:text-slate-300 block">{c.patientRef}</span>
                    <span className="text-[11px] text-slate-400">{c.patientPseudonym}</span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300 max-w-xs">{c.purpose}</td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {c.dataCategories?.slice(0, 2).map((cat, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {cat}
                        </span>
                      ))}
                      {(c.dataCategories?.length || 0) > 2 && (
                        <span className="text-[10px] text-slate-400 font-bold self-center">
                          +{c.dataCategories.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={getStatusVariant(c.status)}>{c.status}</Badge>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{c.recordedDate}</td>
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{c.expiryDate || 'Indefinite'}</td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsentModal(c);
                      }}
                      className="text-xs"
                    >
                      Details & Transition
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredConsents.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400">
                    No consent records match your filter criteria.
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
