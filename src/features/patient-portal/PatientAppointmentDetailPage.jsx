import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Printer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  FileText,
  ShieldCheck,
  User,
  History
} from 'lucide-react';

export function PatientAppointmentDetailPage() {
  const { appointmentId } = useParams();
  const {
    appointments,
    clinics,
    doctors,
    respondToAlternativeSlot,
    formatCurrency,
    showToast
  } = useApp();
  const navigate = useNavigate();

  const apt = appointments.find((a) => a.id === appointmentId) || appointments[0];

  if (!apt) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Appointment Record Not Found</h2>
        <Link to="/patient/appointments">
          <Button variant="outline" size="sm">
            &larr; Return to My Appointments
          </Button>
        </Link>
      </div>
    );
  }

  const clinic = clinics.find((c) => c.id === apt.clinicId);
  const doctor = doctors.find((d) => d.id === apt.doctorId);
  const hasAlternative =
    apt.status === 'Alternative Slot Proposed' ||
    apt.status === 'Awaiting Patient Response';
  const latestAlt = apt.proposedAlternatives?.[0];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link to="/patient/appointments" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Appointments
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500 font-mono">{apt.referenceNumber || apt.requestId}</span>
      </div>

      {/* Top Status Header Card */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                {apt.requestId ? `Request: ${apt.requestId}` : `Ref: ${apt.referenceNumber}`}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{apt.clinicName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {apt.serviceName}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase font-mono ${
                apt.status === 'Confirmed'
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : apt.status === 'Patient Checked In' || apt.status === 'Checked In'
                  ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : apt.status === 'In Consultation'
                  ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                  : hasAlternative
                  ? 'bg-blue-600 text-white shadow-sm'
                  : apt.status === 'Completed'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              {apt.status}
            </span>

            <Button
              variant="outline"
              size="md"
              icon={Printer}
              onClick={() => showToast(`Printing official appointment slip for ${apt.referenceNumber || apt.requestId}...`)}
            >
              Print Slip
            </Button>
          </div>
        </div>

        {/* Alternative Proposal Banner if pending response */}
        {hasAlternative && latestAlt && (
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/90 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 space-y-3.5 mt-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-extrabold text-blue-950 dark:text-blue-200 text-sm">
                  Clinic Proposed An Alternative Slot
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  "Your requested appointment time is unavailable. The clinic has proposed an alternative appointment. Please review the new time and confirm whether it works for you."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-3 bg-white/90 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold block uppercase">Original Requested Slot</span>
                <span className="font-mono text-slate-600 dark:text-slate-400 line-through text-sm font-bold">
                  {apt.requestedDate} at {apt.requestedTime}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-blue-500 dark:border-blue-400 shadow-sm">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block uppercase">Proposed Alternative Slot</span>
                <span className="font-mono text-blue-900 dark:text-blue-200 text-base font-extrabold">
                  {latestAlt.proposedDate} at {latestAlt.proposedTime}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/40">
              <strong>Reception Note:</strong> {latestAlt.reason}
            </p>

            <div className="flex justify-end gap-2.5 pt-1">
              <Button
                variant="outline"
                size="sm"
                icon={XCircle}
                onClick={() => respondToAlternativeSlot(apt.id, false)}
                className="text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs"
              >
                Decline Alternative
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={() => respondToAlternativeSlot(apt.id, true)}
                className="text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Accept Alternative Slot &rarr;
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Two Column Layout: Visit Summary & Clinic vs Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Doctor & Clinic Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visit Details Card */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">
            <CardHeader
              title="Consultation Details"
              subtitle="Scheduled appointment parameters and clinical tariff"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Consulting Doctor</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base block">{apt.doctorName}</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">{doctor?.specialty}</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Appointment Date & Time</span>
                <span className="font-bold font-mono text-slate-900 dark:text-slate-100 text-base block">
                  {apt.confirmedDate || apt.date} at {apt.confirmedTime || apt.time}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">Duration: {apt.durationMinutes || 30} mins</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Consultation Fee</span>
                <span className="font-bold font-mono text-blue-600 dark:text-blue-400 text-base block">
                  {formatCurrency(apt.consultationFee || doctor?.consultationFee || 600)}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">Payable at clinic reception</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Consultation Mode</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base block">
                  {apt.consultationType || 'In-person OPD'}
                </span>
                {apt.queueNumber && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">Token: {apt.queueNumber}</span>
                )}
              </div>
            </div>

            {apt.notes && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <strong className="block text-slate-900 dark:text-slate-100 mb-1">Clinical / Booking Notes:</strong>
                <span>{apt.notes}</span>
              </div>
            )}
          </Card>

          {/* Clinic Information */}
          {clinic && (
            <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">
              <CardHeader
                title="Practicing Clinic Details"
                subtitle="Arrival directions and reception contact"
              />
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{clinic.logo}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{clinic.name}</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400">{clinic.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{clinic.address}, {clinic.city}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-mono">{clinic.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-mono">{clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{clinic.email}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column (1 Col): Response History & Audit Trail */}
        <div className="space-y-6">
          <Card padding="none" className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Lifecycle Audit Trail
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Timestamped appointment events</p>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-sm">
              {(apt.responseHistory || [
                { id: '1', action: 'Booking request created', timestamp: apt.createdAt?.slice(0, 10), actor: 'Patient' }
              ]).map((entry, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-900 pb-3 last:pb-0 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{entry.action}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{entry.timestamp} · {entry.actor}</div>
                  {entry.notes && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 pt-0.5 italic">"{entry.notes}"</p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Need to Reschedule?</span>
            <p className="leading-relaxed">
              You can contact the clinic reception directly at <strong className="text-slate-800 dark:text-slate-200">{clinic?.phone}</strong> or cancel and submit a new request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

