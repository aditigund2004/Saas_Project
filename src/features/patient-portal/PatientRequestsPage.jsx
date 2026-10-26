import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { belongsToCurrentPatient } from './patientDataAccess';
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
    formatCurrency,
    showToast
  } = useApp();

  const [simulateConflictMode, setSimulateConflictMode] = useState(false);
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState(null);

  // Filter requests for patient: Pending Clinic Confirmation, Alternative Slot Proposed, Awaiting Patient Response, Rejected
  const requestStatuses = [
    'Pending Clinic Confirmation',
    'Alternative Slot Proposed',
    'Awaiting Patient Response',
    'Rejected'
  ];

  const myRequests = appointments.filter((a) => {
    const isPatientMatch = belongsToCurrentPatient(a, currentUser);

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
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200 text-xs text-blue-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-slate-900 block text-xs">
              Demo Acceptance Scenario Testing (Scenario 4)
            </strong>
            <p className="text-[11px] text-slate-600 max-w-xl">
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
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border cursor-pointer ${
              simulateConflictMode
                ? 'bg-red-600 text-white border-red-700 shadow-xs ring-2 ring-red-400/30'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {simulateConflictMode ? '⚠️ Concurrency Conflict Active' : 'Normal Slot Validation'}
          </button>
        </div>
      </div>

      {/* Requests List */}
      {myRequests.length === 0 ? (
        <Card className="p-12 text-center space-y-3 border-dashed border-2 border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center font-bold text-xl">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">No Pending Booking Requests</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All your appointment requests have either been confirmed or completed. You can browse clinics to book a new appointment.
          </p>
          <div className="pt-2">
            <Link to="/patient/appointments/book">
              <Button variant="primary" size="sm" icon={PlusCircle}>
                Request New Appointment
              </Button>
            </Link>
          </div>
        </Card>
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
                    ? 'border-blue-400 ring-1 ring-blue-400/40 shadow-xs bg-white'
                    : 'border-slate-200'
                }`}
              >
                {/* Header Row */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-slate-900 text-sm">{req.clinicName}</h3>
                        <span className="font-mono text-[10px] text-slate-400">{req.requestId || req.referenceNumber}</span>
                      </div>
                      <p className="text-xs text-blue-700 font-medium">
                        Dr. {req.doctorName} · <span className="text-slate-600">{req.serviceName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        hasAlternativeProposed
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : req.status === 'Pending Clinic Confirmation' || req.status === 'Requested'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* Request Content Body */}
                <div className="p-5 space-y-4 text-xs">
                  {/* ALTERNATIVE PROPOSAL CARD (Section H) */}
                  {hasAlternativeProposed && latestAlt && (
                    <div className="p-4 rounded-xl bg-blue-50/90 border border-blue-200 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-blue-950 text-xs">
                            Alternative Appointment Slot Proposed
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            "Your requested appointment time is unavailable. The clinic has proposed an alternative appointment. Please review the new time and confirm whether it works for you."
                          </p>
                        </div>
                      </div>

                      {/* Comparison Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 bg-white/90 rounded-lg border border-slate-200 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Original Requested Slot</span>
                          <span className="font-mono font-bold text-slate-700 line-through block text-xs">
                            {req.requestedDate} at {req.requestedTime}
                          </span>
                          <span className="text-[10px] text-red-600 font-semibold">Unavailable</span>
                        </div>

                        <div className="p-3 bg-white rounded-lg border-2 border-blue-500 space-y-1 shadow-2xs">
                          <span className="text-[10px] uppercase font-bold text-blue-600 block">Proposed Alternative Slot</span>
                          <span className="font-mono font-extrabold text-blue-900 text-sm block">
                            {latestAlt.proposedDate} at {latestAlt.proposedTime}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-semibold">Ready for Your Confirmation</span>
                        </div>
                      </div>

                      {/* Reason from Receptionist */}
                      <div className="p-2.5 rounded-lg bg-white/80 border border-blue-100 text-[11px] text-slate-700">
                        <span className="font-bold text-blue-950">Receptionist Note: </span>
                        <span>{latestAlt.reason}</span>
                      </div>

                      {/* Accept / Decline Action Buttons */}
                      <div className="flex items-center justify-end gap-2.5 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={XCircle}
                          onClick={() => handleDeclineAlternative(req.id)}
                          className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Decline Alternative
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={CheckCircle2}
                          onClick={() => handleAcceptAlternative(req.id)}
                          className="text-xs shadow-xs"
                        >
                          Accept Alternative Slot &rarr;
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Standard Pending Details */}
                  {req.status === 'Pending Clinic Confirmation' && (
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Awaiting Clinic Availability Verification:</strong> Reception is verifying Dr. {req.doctorName}'s procedure rota for <strong>{req.requestedDate} at {req.requestedTime}</strong>. You will be notified immediately upon confirmation.
                      </div>
                    </div>
                  )}

                  {/* Rejected Details */}
                  {req.status === 'Rejected' && (
                    <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 text-red-900 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>Request Closed</span>
                      </div>
                      <p className="text-[11px]">
                        {req.rejectionReason || 'The alternative slot was declined or the clinic could not accommodate this booking.'}
                      </p>
                      <div className="pt-2">
                        <Link to={`/patient/appointments/book?clinicId=${req.clinicId}&doctorId=${req.doctorId}`}>
                          <Button variant="outline" size="xs">
                            Submit a New Request &rarr;
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Request Summary Metadata Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-semibold uppercase text-[10px]">Requested Date</span>
                      <span className="font-mono text-slate-800 font-bold">{req.requestedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold uppercase text-[10px]">Preferred Time</span>
                      <span className="font-mono text-slate-800 font-bold">{req.requestedTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold uppercase text-[10px]">Consultation Tariff</span>
                      <span className="font-mono font-bold text-blue-700">{formatCurrency(req.consultationFee || 600)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold uppercase text-[10px]">Request Reference</span>
                      <span className="font-mono text-slate-800">{req.requestId}</span>
                    </div>
                  </div>

                  {/* Patient Preferences Note if present */}
                  {req.patientAlternativePreferences && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex justify-between">
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
