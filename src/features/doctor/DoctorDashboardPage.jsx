import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Calendar,
  Clock,
  UserCheck,
  Stethoscope,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  Play,
  RotateCcw
} from 'lucide-react';

export function DoctorDashboardPage() {
  const {
    currentUser,
    activeClinic,
    activeBranch,
    appointments,
    patients,
    prescriptions,
    encounters,
    updateAppointmentStatus,
    showToast
  } = useApp();

  const navigate = useNavigate();

  // Filter doctor's today appointments
  const todayStr = '2026-10-23';
  const doctorAppointments = appointments.filter(
    (apt) => apt.clinicId === activeClinic.id && apt.date === todayStr
  );

  const waitingPatients = doctorAppointments.filter((a) => a.status === 'Checked In' || a.status === 'Requested');
  const inProgressApt = doctorAppointments.find((a) => a.status === 'In Progress');
  const completedApts = doctorAppointments.filter((a) => a.status === 'Completed');
  const nextPatient = waitingPatients[0];

  const handleStartConsultation = (appointment) => {
    updateAppointmentStatus(appointment.id, 'In Progress');
    navigate(`/doctor/consultation/${appointment.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Doctor Clinical Workspace
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {activeClinic.name} · {activeBranch?.name}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome, {currentUser?.name || 'Dr. Arvind Rao'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Today's OPD Session: Friday, 23 Oct 2026 · Room 102
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/doctor/schedule">
            <Button variant="secondary" size="sm">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              Full Schedule
            </Button>
          </Link>
          <Link to="/doctor/consultation">
            <Button variant="primary" size="sm">
              <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
              Start New Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Today's Schedule</span>
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{doctorAppointments.length}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total booked patients</p>
        </Card>

        <Card className="p-4 border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-1.5">
            <span className="text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">Waiting in OPD</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-blue-900 dark:text-blue-100">{waitingPatients.length}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Checked in at front desk</p>
        </Card>

        <Card className="p-4 border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1.5">
            <span className="text-xs font-semibold uppercase text-amber-800 dark:text-amber-300">In Progress</span>
            <Play className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-amber-900 dark:text-amber-100">{inProgressApt ? 1 : 0}</div>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Inside operatory room</p>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1.5">
            <span className="text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Completed</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100">{completedApts.length}</div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Prescriptions issued</p>
        </Card>

        <Card className="p-4 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-1.5">
            <span className="text-xs font-semibold uppercase text-indigo-800 dark:text-indigo-300">Follow-Ups Due</span>
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-indigo-900 dark:text-indigo-100">4</div>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">This week</p>
        </Card>
      </div>

      {/* Hero "Next Patient" Callout Card */}
      {nextPatient ? (
        <Card className="p-5 border-2 border-blue-500 dark:border-blue-600 bg-gradient-to-r from-blue-500/10 via-white to-white dark:via-slate-900 dark:to-slate-900 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
                {nextPatient.queueNumber || '#Q-1'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide">Next Patient in Queue</span>
                  <Badge variant="teal" size="sm">{nextPatient.time}</Badge>
                  {nextPatient.isWalkIn && <Badge variant="warning" size="sm">Walk-In Express</Badge>}
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{nextPatient.patientName}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>Service: {nextPatient.serviceName}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {nextPatient.patientPhone}</span>
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => handleStartConsultation(nextPatient)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
            >
              <Play className="w-4 h-4 mr-1.5 fill-current" />
              Call In & Open Consultation
            </Button>
          </div>
        </Card>
      ) : inProgressApt ? (
        <Card className="p-5 border-2 border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase">Consultation Currently Active</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{inProgressApt.patientName}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">{inProgressApt.serviceName} · Started at {inProgressApt.time}</p>
            </div>
          </div>
          <Link to={`/doctor/consultation/${inProgressApt.id}`}>
            <Button variant="primary" size="md" className="bg-amber-600 hover:bg-amber-700 text-white">
              Resume Consultation Notes <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </Card>
      ) : (
        <Card className="p-6 text-center border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">OPD Queue is Clear!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
            All checked-in patients have been consulted or front desk has not assigned new tokens yet.
          </p>
        </Card>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Waiting Queue (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Waiting Patients Queue ({waitingPatients.length})
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Auto-synced with Reception Desk</span>
          </div>

          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                    <th className="px-4 py-3">Token #</th>
                    <th className="px-4 py-3">Patient Details</th>
                    <th className="px-4 py-3">Slot Time</th>
                    <th className="px-4 py-3">Service Reason</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {waitingPatients.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                        No patients currently waiting in queue.
                      </td>
                    </tr>
                  ) : (
                    waitingPatients.map((apt, idx) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                        <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400">
                          {apt.queueNumber || '#Q-1'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{apt.patientName}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{apt.patientPhone}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">
                          {apt.time}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                            {apt.serviceName}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={apt.status === 'Checked In' ? 'teal' : 'default'} size="sm">
                            {apt.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleStartConsultation(apt)}
                            className="text-xs hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-700 dark:hover:text-blue-400"
                          >
                            <Stethoscope className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                            Consult
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Today's Schedule Overview */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                All Today's Appointments ({doctorAppointments.length})
              </h3>
            </div>
            <Card className="p-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                {doctorAppointments.map((apt) => (
                  <div key={apt.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-slate-500 dark:text-slate-400 font-semibold w-16">
                        {apt.time}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{apt.patientName}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">({apt.referenceNumber})</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{apt.serviceName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          apt.status === 'Completed' ? 'success' :
                          apt.status === 'In Progress' ? 'warning' :
                          apt.status === 'Cancelled' ? 'danger' : 'teal'
                        }
                        size="sm"
                      >
                        {apt.status}
                      </Badge>
                      <Link to={`/doctor/consultation/${apt.id}`}>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Recent Clinical Records & Fast Tools */}
        <div className="space-y-5">
          {/* Recent Prescriptions Issued */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Recent Prescriptions
              </h3>
              <Link to="/doctor/prescriptions" className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline">
                View All
              </Link>
            </div>
            <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              {prescriptions.slice(0, 4).map((rx) => (
                <div key={rx.id} className="p-3.5 space-y-1 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{rx.patientName}</span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{rx.prescriptionNumber}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                    <strong className="text-slate-700 dark:text-slate-200">Dx: </strong>{rx.diagnosis}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-0.5">
                    <span>{rx.medications.length} Medications</span>
                    <Badge variant="success" size="sm" className="text-xs">Active Rx</Badge>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Clinical Quick Presets */}
          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Standard Prescribing Shortcuts</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Preset combinations automatically load into the Consultation Composer with single-click.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Acute Pulpitis Protocol</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Augmentin 625 + Ketorol-DT + Chlorhexidine</div>
                </div>
                <Badge variant="teal" size="sm">3 Drugs</Badge>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Post-Op Extraction Pack</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Amoxicillin 500 + Ibuprofen 400 + Pan-D</div>
                </div>
                <Badge variant="teal" size="sm">3 Drugs</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
