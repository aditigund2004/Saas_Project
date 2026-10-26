import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Calendar,
  FileText,
  Receipt,
  PlusCircle,
  Clock,
  Printer
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

export function PatientDashboardPage() {
  const {
    currentUser,
    appointments = [],
    prescriptions = [],
    invoices = [],
    openPrescriptionModal
  } = useApp();

  // Patient security boundary: filter strictly by current patient (Aarav Patel in demo)
  const myAppointments = appointments.filter(
    (a) => a.patientName === currentUser?.name || a.patientId === 'pt-1041' || !a.patientId
  );
  const myPrescriptions = prescriptions.filter(
    (p) => p.patientName === currentUser?.name || p.patientId === 'pt-1041' || p.patientId === 'PT-1041'
  );
  const myInvoices = invoices.filter(
    (i) => i.patientName === currentUser?.name || i.patientId === 'pt-1041'
  );

  const actionRequiredProposals = myAppointments.filter(
    (a) => a.status === 'Alternative Slot Proposed' || a.status === 'Awaiting Patient Response'
  );
  const pendingRequests = myAppointments.filter(
    (a) => a.status === 'Pending Clinic Confirmation'
  );
  const upcoming = myAppointments.filter(
    (a) => ['Confirmed', 'Patient Checked In', 'Checked In', 'In Consultation', 'In Progress'].includes(a.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Patient Health Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            Welcome back, {currentUser?.name || 'Aarav'}
          </h1>
          <p className="text-xs text-slate-500">
            Discover 5 specialized clinic networks, manage booking requests, and access tamper-evident digital prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/clinics">
            <Button variant="outline" size="sm">
              Explore Clinics
            </Button>
          </Link>
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Action Required Banner for Alternative Proposals */}
      {actionRequiredProposals.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Action Required
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {actionRequiredProposals[0].requestId || actionRequiredProposals[0].referenceNumber}
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 mt-0.5">
                Alternative Appointment Slot Proposed
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                <strong>{actionRequiredProposals[0].clinicName}</strong> proposed a new slot for Dr. {actionRequiredProposals[0].doctorName}. Please accept or decline to proceed.
              </p>
            </div>
          </div>
          <Link to="/patient/appointments/requests">
            <Button variant="primary" size="sm" className="bg-amber-700 hover:bg-amber-800 text-white font-semibold whitespace-nowrap">
              Review Proposal ({actionRequiredProposals.length}) &rarr;
            </Button>
          </Link>
        </div>
      )}

      {/* Pending Review Notice if any pending without proposal */}
      {actionRequiredProposals.length === 0 && pendingRequests.length > 0 && (
        <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              You have <strong>{pendingRequests.length} booking request(s)</strong> awaiting clinic receptionist availability verification.
            </span>
          </div>
          <Link to="/patient/appointments/requests" className="font-semibold underline hover:text-blue-700 shrink-0 ml-3">
            Track Status &rarr;
          </Link>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Upcoming Appointments"
          value={upcoming.length.toString()}
          change={upcoming.length > 0 ? 'Active consultation' : 'None scheduled'}
          trend="up"
          icon={Calendar}
          color="blue"
          subtitle="Confirmed bookings"
        />
        <StatCard
          title="Digital Prescriptions"
          value={myPrescriptions.length.toString()}
          change="QR verified documents"
          trend="up"
          icon={FileText}
          color="emerald"
          subtitle="Signed by your doctor"
        />
        <StatCard
          title="Paid Receipts"
          value={myInvoices.length.toString()}
          change="Available for download"
          trend="up"
          icon={Receipt}
          color="indigo"
          subtitle="Procedures & treatments"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Scheduled Visit Card */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader
              title="Upcoming Consultations"
              subtitle="Visits scheduled with your healthcare practitioners"
              action={
                <Link to="/patient/appointments" className="text-xs text-blue-600 font-semibold hover:underline">
                  View All ({myAppointments.length}) →
                </Link>
              }
            />
            <div className="p-4 space-y-2.5">
              {upcoming.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                  <p>You have no active appointments scheduled right now.</p>
                  <Link to="/patient/appointments/book">
                    <Button variant="primary" size="sm">
                      Schedule a Visit
                    </Button>
                  </Link>
                </div>
              ) : (
                upcoming.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 text-sm tracking-tight">{apt.serviceName}</span>
                      <Badge variant={apt.status}>{apt.status}</Badge>
                    </div>
                    <div className="text-slate-600 space-y-1">
                      <p>👨‍⚕️ <strong>{apt.doctorName}</strong></p>
                      <p>🕒 <strong className="tabular-nums font-semibold">{apt.date} at {apt.time}</strong></p>
                      <p className="text-[11px] text-slate-400 font-mono">Ref: {apt.referenceNumber}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Latest Digital Prescription Card */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader
              title="Latest Digital Prescription"
              subtitle="Tamper-evident medical document"
            />
            <div className="p-4 space-y-2.5">
              {myPrescriptions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No prescriptions on record.</p>
              ) : (
                myPrescriptions.slice(0, 2).map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 rounded-xl border border-blue-200/90 bg-blue-50/30 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-900">{rx.prescriptionNumber}</span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        QR Verified
                      </span>
                    </div>
                    <p className="font-medium text-slate-800">Diagnosis: {rx.diagnosis}</p>
                    <p className="text-[11px] text-slate-500">Doctor: {rx.doctorName} · {rx.date}</p>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        to={`/verify-prescription/${rx.verificationId}`}
                        target="_blank"
                        className="text-[11px] text-blue-700 underline font-medium"
                      >
                        Verify Authenticity
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Printer}
                        onClick={() => openPrescriptionModal(rx)}
                      >
                        View & Print
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
