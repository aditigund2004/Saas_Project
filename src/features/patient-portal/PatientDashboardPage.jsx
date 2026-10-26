import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { belongsToCurrentPatient } from './patientDataAccess';
import {
  Calendar,
  FileText,
  Receipt,
  PlusCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

export function PatientDashboardPage() {
  const {
    currentUser,
    appointments,
    prescriptions,
    invoices,
    openPrescriptionModal,
    activeClinic
  } = useApp();

  const myAppointments = appointments.filter((appointment) => belongsToCurrentPatient(appointment, currentUser));
  const myPrescriptions = prescriptions.filter((prescription) => belongsToCurrentPatient(prescription, currentUser));
  const myInvoices = invoices.filter((invoice) => belongsToCurrentPatient(invoice, currentUser));

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
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Patient Health Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
            Welcome back, {currentUser?.name || 'Aarav'}
          </h1>
          <p className="text-xs text-slate-500">
            Discover 5 specialized clinic networks, manage booking requests, and access tamper-evident digital prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/clinics">
            <Button variant="outline" size="md">
              Explore Clinics
            </Button>
          </Link>
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="md" icon={PlusCircle}>
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Action Required Banner for Alternative Proposals (Scenario 2, Scenario 4) */}
      {actionRequiredProposals.length > 0 && (
        <div className="p-4 bg-amber-50/90 border-2 border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Action Required
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {actionRequiredProposals[0].requestId || actionRequiredProposals[0].referenceNumber}
                </span>
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 mt-0.5">
                Alternative Appointment Slot Proposed
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                <strong>{actionRequiredProposals[0].clinicName}</strong> proposed a new slot for Dr. {actionRequiredProposals[0].doctorName}. Please accept or decline to proceed.
              </p>
            </div>
          </div>
          <Link to="/patient/appointments/requests">
            <Button variant="primary" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold whitespace-nowrap">
              Review Proposal ({actionRequiredProposals.length}) &rarr;
            </Button>
          </Link>
        </div>
      )}

      {/* Pending Review Notice if any pending without proposal */}
      {actionRequiredProposals.length === 0 && pendingRequests.length > 0 && (
        <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              You have <strong>{pendingRequests.length} booking request(s)</strong> awaiting clinic receptionist availability verification.
            </span>
          </div>
          <Link to="/patient/appointments/requests" className="font-bold underline hover:text-blue-700 shrink-0 ml-3">
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
          color="teal"
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
          color="blue"
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
            <div className="p-4 space-y-3">
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
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{apt.serviceName}</span>
                      <Badge variant={apt.status}>{apt.status}</Badge>
                    </div>
                    <div className="text-slate-600 space-y-1">
                      <p>👨‍⚕️ <strong>{apt.doctorName}</strong></p>
                      <p>🕒 <strong>{apt.date} at {apt.time}</strong></p>
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
            <div className="p-4 space-y-3">
              {myPrescriptions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No prescriptions on record.</p>
              ) : (
                myPrescriptions.slice(0, 2).map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 text-xs space-y-2"
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
