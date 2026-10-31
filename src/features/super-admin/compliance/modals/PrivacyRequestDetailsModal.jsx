import React, { useState } from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import {
  Building2,
  ShieldCheck,
  History,
  AlertTriangle
} from 'lucide-react';

export function PrivacyRequestDetailsModal({ isOpen, onClose, request, onUpdateWorkflow }) {
  const [activeAction, setActiveAction] = useState(null); // 'reject' | 'escalate' | 'complete' | 'assign' | 'request_info'
  const [actionInput, setActionInput] = useState('');
  const [selectedReviewer, setSelectedReviewer] = useState(request?.assignedReviewer || 'Dr. Vikram Singhania (DPO)');

  if (!request) return null;

  const handleActionConfirm = () => {
    if (activeAction === 'reject') {
      if (!actionInput.trim()) return;
      onUpdateWorkflow(
        request.id,
        { status: 'Rejected', rejectionReason: actionInput.trim() },
        `Request Rejected: ${actionInput.trim()}`
      );
    } else if (activeAction === 'escalate') {
      if (!actionInput.trim()) return;
      onUpdateWorkflow(
        request.id,
        { status: 'Escalated', escalationReason: actionInput.trim() },
        `Request Escalated to Legal Counsel: ${actionInput.trim()}`
      );
    } else if (activeAction === 'assign') {
      onUpdateWorkflow(
        request.id,
        { assignedReviewer: selectedReviewer },
        `Assigned Reviewer set to ${selectedReviewer}`
      );
    } else if (activeAction === 'request_info') {
      if (!actionInput.trim()) return;
      onUpdateWorkflow(
        request.id,
        { status: 'Identity Verification Pending', reviewNotes: actionInput.trim() },
        `Requested additional information from Data Principal: ${actionInput.trim()}`
      );
    } else if (activeAction === 'complete') {
      onUpdateWorkflow(
        request.id,
        { status: 'Completed' },
        `Request marked Completed after multi-tenant verification & statutory review.`
      );
    }

    setActiveAction(null);
    setActionInput('');
  };

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Data Privacy Request: ${request.id}`}
      size="lg"
    >
      <div className="space-y-5 text-sm">
        {/* Top Status Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">{request.id}</span>
              <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
            </div>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1.5">
              <span>{request.requestType}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Target Completion Window</span>
            <p className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{request.targetDate}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Submitted: {request.submissionDate}</p>
          </div>
        </div>

        {/* Patient Reference & Verification Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400">Data Principal Reference</span>
            <p className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5">{request.patientRef}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">({request.patientPseudonym})</p>
          </div>

          <div>
            <span className="text-xs uppercase font-bold text-slate-400">Identity Verification Status</span>
            <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              {request.verificationStatus}
            </p>
          </div>
        </div>

        {/* Description & Review Notes */}
        <div className="space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Request Scope & Data Principal Stated Intent
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 leading-relaxed">
              {request.description}
            </p>
          </div>

          {request.retentionObligations && (
            <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1 text-[11px] text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Statutory Medical Record Retention Guard
              </span>
              <p className="leading-relaxed">{request.retentionObligations}</p>
            </div>
          )}
        </div>

        {/* Multi-Clinic Task Progress */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            Affected Tenant Clinics ({request.affectedTenants?.length || 1})
          </span>
          <div className="space-y-2">
            {request.affectedTenants?.map((tenant, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{tenant.clinicName}</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">{tenant.notes}</p>
                </div>
                <span className="px-2.5 py-1 rounded-md font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {tenant.taskStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Timeline */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-400" />
            Workflow Lifecycle Timeline
          </span>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {request.timeline?.map((event, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{event.title}</span>
                    <span className="text-slate-400">· {event.actor}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">{event.description}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">{event.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Action Sub-Panels (Assign, Reject, Escalate, Complete, Request Info) */}
        {activeAction && (
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase text-blue-900 dark:text-blue-200">
                {activeAction === 'reject' && 'Reject Request (Mandatory Reason)'}
                {activeAction === 'escalate' && 'Escalate to Legal Review (Mandatory Reason)'}
                {activeAction === 'assign' && 'Assign Primary Reviewer'}
                {activeAction === 'request_info' && 'Request Additional Documentation'}
                {activeAction === 'complete' && 'Confirm Request Completion & Scope Verification'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveAction(null);
                  setActionInput('');
                }}
                className="text-xs text-blue-600 dark:text-blue-400 underline font-semibold"
              >
                Cancel
              </button>
            </div>

            {activeAction === 'assign' ? (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Select Reviewer</label>
                <select
                  value={selectedReviewer}
                  onChange={(e) => setSelectedReviewer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                >
                  <option value="Dr. Vikram Singhania (DPO)">Dr. Vikram Singhania (Platform DPO)</option>
                  <option value="Adv. Meera Sen (Privacy Counsel)">Adv. Meera Sen (Legal Privacy Counsel)</option>
                  <option value="Dr. Neha Kapoor (Lead Practice Officer)">Dr. Neha Kapoor (Lead Practice Officer)</option>
                  <option value="Rahul Varma (Operations Lead)">Rahul Varma (Operations Lead)</option>
                </select>
              </div>
            ) : activeAction === 'complete' ? (
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  Confirm that all affected tenant tasks have been verified. For access requests, verify the download archive was compiled. For erasure/anonymization requests, verify non-clinical data was purged while preserving mandatory statutory retention records.
                </p>
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Justification / Action Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail the factual basis or instruction..."
                  value={actionInput}
                  onChange={(e) => setActionInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => setActiveAction(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={activeAction !== 'assign' && activeAction !== 'complete' && !actionInput.trim()}
                onClick={handleActionConfirm}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Confirm & Record Audit Log
              </Button>
            </div>
          </div>
        )}

        {/* Primary Action Button Toolbar */}
        {!activeAction && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {request.status === 'Submitted' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdateWorkflow(
                      request.id,
                      { status: 'Identity Verification Pending', verificationStatus: 'Verified via OTP (Aadhaar/Mobile Demo)' },
                      'Identity verification validated via OTP.'
                    )
                  }
                >
                  Mark Verification Complete
                </Button>
              )}

              {(request.status === 'Submitted' || request.status === 'Identity Verification Pending') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdateWorkflow(
                      request.id,
                      { status: 'Under Review' },
                      'Initiated formal DPO review.'
                    )
                  }
                >
                  Start Review
                </Button>
              )}

              {request.status === 'Under Review' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                    onClick={() =>
                      onUpdateWorkflow(
                        request.id,
                        { status: 'Approved' },
                        'Request approved by DPO; awaiting execution.'
                      )
                    }
                  >
                    Approve Request
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                    onClick={() => setActiveAction('reject')}
                  >
                    Reject Request
                  </Button>
                </>
              )}

              {request.status === 'Approved' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800"
                  onClick={() =>
                    onUpdateWorkflow(
                      request.id,
                      { status: 'Processing' },
                      'Processing started across tenant databases.'
                    )
                  }
                >
                  Start Processing
                </Button>
              )}

              {(request.status === 'Processing' || request.status === 'Awaiting Clinic Action') && (
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  onClick={() => setActiveAction('complete')}
                >
                  Mark Completed
                </Button>
              )}

              {request.status !== 'Completed' && request.status !== 'Rejected' && request.status !== 'Escalated' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                  onClick={() => setActiveAction('escalate')}
                >
                  Escalate
                </Button>
              )}

              <Button variant="ghost" size="sm" onClick={() => setActiveAction('assign')}>
                Assign Reviewer
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
