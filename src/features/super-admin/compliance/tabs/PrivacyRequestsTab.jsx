import React, { useState } from 'react';
import { Card, CardHeader } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import {
  Lock,
  Search
} from 'lucide-react';

export function PrivacyRequestsTab({
  complianceData,
  selectedClinicScope,
  onOpenRequestModal
}) {
  const { privacyRequests = [] } = complianceData;

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRequests = privacyRequests.filter((r) => {
    const matchesScope =
      selectedClinicScope === 'All Clinics' || r.clinicName === selectedClinicScope || r.clinicId === selectedClinicScope;
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.patientRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.patientPseudonym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.clinicName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || r.requestType === typeFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesScope && matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadgeVariant = (st) => {
    switch (st) {
      case 'Completed':
      case 'Approved':
        return 'Confirmed';
      case 'Processing':
      case 'Under Review':
        return 'In Progress';
      case 'Identity Verification Pending':
      case 'Awaiting Clinic Action':
        return 'Pending';
      case 'Rejected':
        return 'Cancelled';
      case 'Escalated':
        return 'Requested';
      default:
        return 'Inactive';
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Guard Notice */}
      <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
        <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider text-[11px] text-indigo-800 dark:text-indigo-300">
            DPDP Act & Patient Rights Fulfillment Cockpit
          </span>
          <p className="leading-relaxed">
            Requests undergo structured verification and statutory review. For erasure and anonymization requests, medical retention requirements (e.g. 3-year NMC OPD guidelines) are evaluated before clinical chart expungement.
          </p>
        </div>
      </div>

      {/* Main Privacy Requests Table Card */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader
          title={`Data Principal Privacy Workflows (${filteredRequests.length})`}
          subtitle="Management of patient rights requests: access copies, demographic corrections, erasure review, and consent revocations"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search request or patient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 w-44 sm:w-56"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Request Types</option>
                <option value="Access or copy of personal data">Access / Data Copy</option>
                <option value="Correction of personal data">Correction</option>
                <option value="Erasure request">Erasure Review</option>
                <option value="Consent withdrawal">Consent Withdrawal</option>
                <option value="Anonymization request">Anonymization</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-semibold"
              >
                <option value="All">All Workflow Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Identity Verification Pending">Identity Verification Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Awaiting Clinic Action">Awaiting Clinic Action</option>
                <option value="Approved">Approved</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
                <option value="Escalated">Escalated</option>
              </select>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                <th className="p-3.5">Request ID</th>
                <th className="p-3.5">Clinic Tenant</th>
                <th className="p-3.5">Data Principal</th>
                <th className="p-3.5">Request Type</th>
                <th className="p-3.5">Submission Date</th>
                <th className="p-3.5">Reviewer</th>
                <th className="p-3.5">Workflow Status</th>
                <th className="p-3.5">Target SLA</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredRequests.map((req, idx) => (
                <tr
                  key={req.id}
                  onClick={() => onOpenRequestModal(req)}
                  className="cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors"
                  title="Click to process DPDP privacy workflow"
                >
                  <td className="p-3.5 text-center font-bold text-slate-500 dark:text-slate-400">{idx + 1}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{req.id}</td>
                  <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">{req.clinicName}</td>
                  <td className="p-3.5">
                    <span className="font-mono text-slate-700 dark:text-slate-300 block">{req.patientRef}</span>
                    <span className="text-[11px] text-slate-400">{req.patientPseudonym}</span>
                  </td>
                  <td className="p-3.5 font-medium text-blue-700 dark:text-blue-300">{req.requestType}</td>
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{req.submissionDate}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300 max-w-xs truncate">{req.assignedReviewer}</td>
                  <td className="p-3.5">
                    <Badge variant={getStatusBadgeVariant(req.status)}>{req.status}</Badge>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{req.targetDate}</td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenRequestModal(req);
                      }}
                      className="text-xs"
                    >
                      Process Workflow
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400">
                    No privacy requests found matching filter criteria.
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
