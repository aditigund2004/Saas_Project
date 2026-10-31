import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Clock,
  Calendar,
  Building2,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Info,
  RefreshCw,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

export function PatientRequestsPage() {
  const {
    appointments,
    respondToAlternativeSlot,
    currentUser,
    familyMembers = [],
    formatCurrency,
    showToast
  } = useApp();

  const [simulateConflictMode, setSimulateConflictMode] = useState(false);
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Filter requests for patient: Pending Clinic Confirmation, Alternative Slot Proposed, Awaiting Patient Response, Rejected
  const requestStatuses = [
    'Pending Clinic Confirmation',
    'Alternative Slot Proposed',
    'Awaiting Patient Response',
    'Rejected'
  ];

  const myRequests = appointments.filter((a) => {
    const isPatientMatch =
      a.patientName === currentUser?.name ||
      a.patientId === 'pt-1041' ||
      a.patientId === currentUser?.id ||
      !a.patientId ||
      familyMembers.some((fm) => fm.name === a.patientName);

    const isRequestStatus =
      requestStatuses.includes(a.status) ||
      (a.status === 'Requested');

    return isPatientMatch && isRequestStatus;
  });

  const handleAcceptAlternative = (appointmentId) => {
    const res = respondToAlternativeSlot(appointmentId, true, simulateConflictMode);
    if (res.conflict) {
      showToast('Scenario 4 Verified: Concurrency conflict detected! Slot was consumed. Receptionist notified.', 'error');
    }
  };

  const handleDeclineAlternative = (appointmentId) => {
    respondToAlternativeSlot(appointmentId, false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Appointment Coordination
            </span>
            <span className="text-xs text-slate-400 font-mono">{myRequests.length} Active Request(s)</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Booking Requests & Slot Responses
          </h1>
          <p className="text-xs text-slate-500">
            Track verification status, review proposed alternative slots, and respond to receptionist availability updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/appointments">
            <Button variant="outline" size="sm">
              &larr; Confirmed Appointments
            </Button>
          </Link>
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              New Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive Scenario 4 Demonstration Helper Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-blue-900/50 text-sm text-blue-950 dark:text-blue-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block text-sm">
              Demo Acceptance Scenario Testing (Scenario 4)
            </strong>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Toggle <strong>"Simulate Concurrency Conflict"</strong> below to test what happens if another patient books the proposed slot before acceptance. The system will detect the conflict, prevent double-booking, and return the request to the receptionist!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setSimulateConflictMode(!simulateConflictMode);
              showToast(
                !simulateConflictMode
                  ? 'Simulated Conflict Mode ENABLED: Accepting alternative will trigger concurrency conflict!'
                  : 'Simulated Conflict Mode DISABLED: Normal availability check active.'
              );
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer ${
              simulateConflictMode
                ? 'bg-red-600 text-white border-red-700 shadow-sm ring-2 ring-red-400/30'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {simulateConflictMode ? '⚠️ Concurrency Conflict Active' : 'Normal Slot Validation'}
          </button>
        </div>
      </div>

      {/* Requests List */}
      {myRequests.length === 0 ? (
        <Card className="p-12 text-center space-y-3.5 border-dashed border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center font-bold text-xl">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">No Pending Booking Requests</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            All your appointment requests have either been confirmed or completed. You can browse clinics to book a new appointment.
          </p>
          <div className="pt-2">
            <Link to="/patient/appointments/book">
              <Button variant="primary" size="md" icon={PlusCircle}>
                Request New Appointment
              </Button>
            </Link>
          </div>
        </Card>
      ) : viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center w-12">#</th>
                  <th className="py-3.5 px-4">Request Ref & Clinic</th>
                  <th className="py-3.5 px-4">Doctor & Specialty</th>
                  <th className="py-3.5 px-3">Service</th>
                  <th className="py-3.5 px-3">Requested Slot</th>
                  <th className="py-3.5 px-4">Alternative Offered</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {myRequests.map((req, idx) => {
                  const hasAlternative =
                    req.status === 'Alternative Slot Proposed' ||
                    req.status === 'Awaiting Patient Response';
                  const latestAlt = req.proposedAlternatives?.[0];

                  return (
                    <tr
                      key={req.id}
                      className={`hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors group ${
                        hasAlternative ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {req.clinicName}
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                          {req.requestId || req.referenceNumber || req.id}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                          Dr. {req.doctorName}
                        </div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          Consulting Physician
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {req.serviceName}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                          {req.requestedDate}
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {req.requestedTime}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {hasAlternative && latestAlt ? (
                          <div className="p-2 rounded-lg bg-blue-100/70 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 space-y-1">
                            <div className="font-bold">
                              {latestAlt.date} at {latestAlt.time}
                            </div>
                            <div className="flex items-center gap-1.5 pt-0.5">
                              <Button
                                variant="primary"
                                size="xs"
                                onClick={() => handleAcceptAlternative(req.id)}
                                className="text-[11px] font-bold"
                              >
                                Accept Slot
                              </Button>
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => handleDeclineAlternative(req.id)}
                                className="text-[11px]"
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                            None pending
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${
                            hasAlternative
                              ? 'bg-blue-600 text-white shadow-xs'
                              : req.status === 'Pending Clinic Confirmation' || req.status === 'Requested'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => setSelectedRequestForDetail(req)}
                          className="text-xs"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Displaying {myRequests.length} appointment booking requests</span>
            <span>All responses sync with clinic front desk in real-time</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {myRequests.map((req) => {
            const hasAlternativeProposed =
              req.status === 'Alternative Slot Proposed' ||
              req.status === 'Awaiting Patient Response';

            const latestAlt = req.proposedAlternatives?.[0];

            return (
              <Card
                key={req.id}
                className={`overflow-hidden border transition-all ${
                  hasAlternativeProposed
                    ? 'border-blue-400 dark:border-blue-500/70 ring-1 ring-blue-400/40 shadow-sm bg-white dark:bg-slate-900/90'
                    : 'border-slate-200 dark:border-slate-800 dark:bg-slate-900/90'
                }`}
              >
                {/* Header Row */}
                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{req.clinicName}</h3>
                        <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{req.requestId || req.referenceNumber}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                          Dr. {req.doctorName} · <span className="text-slate-600 dark:text-slate-400">{req.serviceName}</span>
                        </span>
                        {req.relationship && req.relationship !== 'Self' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            For {req.patientName} ({req.relationship})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        hasAlternativeProposed
                          ? 'bg-blue-600 text-white shadow-sm'
                          : req.status === 'Pending Clinic Confirmation' || req.status === 'Requested'
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* Request Content Body */}
                <div className="p-5 space-y-4 text-sm">
                  {/* ALTERNATIVE PROPOSAL CARD */}
                  {hasAlternativeProposed && latestAlt && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/90 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-3.5">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-blue-950 dark:text-blue-200 text-sm">
                            Alternative Appointment Slot Proposed
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            "Your requested appointment time is unavailable. The clinic has proposed an alternative appointment. Please review the new time and confirm whether it works for you."
                          </p>
                        </div>
                      </div>

                      {/* Comparison Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        <div className="p-3.5 bg-white/90 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                          <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Original Requested Slot</span>
                          <span className="font-mono font-bold text-slate-700 dark:text-slate-300 line-through block text-sm">
                            {req.requestedDate} at {req.requestedTime}
                          </span>
                          <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Unavailable</span>
                        </div>

                        <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border-2 border-blue-500 dark:border-blue-400 space-y-1 shadow-sm">
                          <span className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400 block">Proposed Alternative Slot</span>
                          <span className="font-mono font-extrabold text-blue-900 dark:text-blue-200 text-base block">
                            {latestAlt.proposedDate} at {latestAlt.proposedTime}
                          </span>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Ready for Your Confirmation</span>
                        </div>
                      </div>

                      {/* Reason from Receptionist */}
                      <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-blue-950 dark:text-blue-200">Receptionist Note: </span>
                        <span>{latestAlt.reason}</span>
                      </div>

                      {/* Accept / Decline Action Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={XCircle}
                          onClick={() => handleDeclineAlternative(req.id)}
                          className="text-xs text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        >
                          Decline Alternative
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={CheckCircle2}
                          onClick={() => handleAcceptAlternative(req.id)}
                          className="text-xs shadow-md shadow-blue-500/20 font-bold"
                        >
                          Accept Alternative Slot &rarr;
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Standard Pending Details */}
                  {req.status === 'Pending Clinic Confirmation' && (
                    <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-sm flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Awaiting Clinic Availability Verification:</strong> Reception is verifying Dr. {req.doctorName}'s procedure rota for <strong>{req.requestedDate} at {req.requestedTime}</strong>. You will be notified immediately upon confirmation.
                      </div>
                    </div>
                  )}

                  {/* Rejected Details */}
                  {req.status === 'Rejected' && (
                    <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200 text-sm space-y-1.5">
                      <div className="font-bold flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        <span>Request Closed</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {req.rejectionReason || 'The alternative slot was declined or the clinic could not accommodate this booking.'}
                      </p>
                      <div className="pt-2">
                        <Link to={`/patient/appointments/book?clinicId=${req.clinicId}&doctorId=${req.doctorId}`}>
                          <Button variant="outline" size="sm">
                            Submit a New Request &rarr;
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Request Summary Metadata Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block font-semibold uppercase text-xs">Requested Date</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{req.requestedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block font-semibold uppercase text-xs">Preferred Time</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{req.requestedTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block font-semibold uppercase text-xs">Consultation Tariff</span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{formatCurrency(req.consultationFee || 600)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block font-semibold uppercase text-xs">Request Reference</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">{req.requestId}</span>
                    </div>
                  </div>

                  {/* Patient Preferences Note if present */}
                  {req.patientAlternativePreferences && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex justify-between">
                      <span>
                        <strong>Alternate Preference Provided:</strong> {req.patientAlternativePreferences.secondPreferredDate || 'Flexible'} ({req.patientAlternativePreferences.preferredTimeOfDay})
                      </span>
                      {req.patientAlternativePreferences.noteForReceptionist && (
                        <span className="italic truncate max-w-xs">"{req.patientAlternativePreferences.noteForReceptionist}"</span>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

