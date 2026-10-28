import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  MessageSquare,
  ClipboardList
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function ReceptionDashboardPage() {
  const {
    activeClinic = {},
    appointments = [],
    updateAppointmentStatus,
    followUps = [],
    openWhatsAppModal
  } = useApp();

  const todayStr = '2026-10-23';
  const clinicAppointments = appointments.filter((a) => a.clinicId === activeClinic?.id || !a.clinicId);

  const todaysAppointments = clinicAppointments.filter((a) => (a.confirmedDate || a.date) === todayStr);

  const waitingPatients = todaysAppointments.filter((a) => a.status === 'Checked In' || a.status === 'Patient Checked In');
  const inProgress = todaysAppointments.filter((a) => a.status === 'In Progress' || a.status === 'In Consultation');
  const completedToday = todaysAppointments.filter((a) => a.status === 'Completed');
  const pendingRequests = clinicAppointments.filter(
    (a) => a.status === 'Pending Clinic Confirmation' || a.status === 'Requested'
  );
  const proposedAlternatives = clinicAppointments.filter(
    (a) => a.status === 'Alternative Slot Proposed' || a.status === 'Awaiting Patient Response'
  );

  const pendingFollowUps = followUps.filter((f) => f.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Front Desk Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Front Desk Station
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{activeClinic?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Reception Control Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">

            Speed-optimized for multi-clinic booking triage, slot availability verification, walk-ins, and doctor queue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/reception/requests">
            <Button variant="outline" size="sm" icon={ClipboardList} className="font-semibold border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/60">

              Review Requests ({pendingRequests.length})
            </Button>
          </Link>
          <Link to="/reception/walk-ins">
            <Button variant="primary" size="sm" icon={Clock} className="font-semibold">
              + Fast Walk-In Token
            </Button>
          </Link>
          <Link to="/reception/appointments/new">
            <Button variant="outline" size="sm" icon={Calendar}>
              Book Slot
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/reception/requests" className="block transition-transform hover:-translate-y-0.5">
          <StatCard
            title="Pending Online Requests"
            value={pendingRequests.length.toString()}
            change={pendingRequests.length > 0 ? 'Requires slot check' : 'All caught up'}
            trend="up"
            icon={ClipboardList}
            color={pendingRequests.length > 0 ? 'amber' : 'blue'}
            subtitle="Patient booking requests"
          />
        </Link>
        <StatCard
          title="Waiting Room Lounge"
          value={waitingPatients.length.toString()}
          change={waitingPatients.length > 0 ? 'Patients seated' : 'Lounge clear'}
          trend="up"
          icon={UserCheck}
          color="blue"
          subtitle="Checked in and ready"
        />
        <StatCard
          title="Consulting Right Now"
          value={inProgress.length.toString()}
          change="In doctor room"
          trend="up"
          icon={Clock}
          color="indigo"
          subtitle="Visits actively underway"
        />
        <StatCard
          title="Completed Today"
          value={completedToday.length.toString()}
          change="Visits resolved"
          trend="up"
          icon={CheckCircle2}
          color="emerald"
          subtitle="Checkouts & billing finished"
        />
      </div>

      {/* Main Grid: Waiting Room Queue & Pending Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Waiting Lounge & Active Consultations */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">

            <CardHeader
              title={`Waiting Room & Active Consultations (${waitingPatients.length + inProgress.length})`}
              subtitle="Patients currently at the clinic"
              action={
                <Link to="/reception/walk-ins" className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">

                  + Issue Token
                </Link>
              }
            />
            <div className="p-4 space-y-3">
              {waitingPatients.length === 0 && inProgress.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-400 dark:text-slate-500">

                  Waiting room is currently clear. No patients awaiting doctors.
                </div>
              ) : (
                <>
                  {inProgress.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3.5 rounded-xl border border-blue-200/90 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/40 flex items-center justify-between text-sm"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{apt.patientName}</span>
                          <span className="font-mono text-slate-400 dark:text-slate-500 font-semibold text-xs tabular-nums">{apt.queueNumber || '#Q-01'}</span>
                          <Badge variant="In Progress" size="sm">In Doctor Room</Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-xs">{apt.doctorName} · {apt.serviceName}</p>

                      </div>

                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                      >
                        Complete Visit
                      </Button>
                    </div>
                  ))}

                  {waitingPatients.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3.5 rounded-xl border border-blue-200/80 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-950/30 flex items-center justify-between text-sm"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{apt.patientName}</span>
                          <span className="font-mono text-blue-800 dark:text-blue-300 font-semibold text-xs bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded-md tabular-nums">
                            {apt.queueNumber || '#Q-02'}
                          </span>
                          <Badge variant="Checked In" size="sm">Waiting</Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-xs">Assigned: {apt.doctorName} · Time: <span className="tabular-nums font-mono">{apt.time}</span></p>

                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateAppointmentStatus(apt.id, 'In Progress')}
                      >
                        Call Into Room
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Card>

          {/* Pending Online Requests needing Reception Review */}
          <Card className="border-slate-200 dark:border-slate-800">

            <CardHeader
              title={`Online Booking Requests (${pendingRequests.length})`}
              subtitle="Requires receptionist slot verification or alternative proposal"
              action={
                <Link to="/reception/requests" className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">

                  Open Requests Workspace &rarr;
                </Link>
              }
            />
            <div className="p-4 space-y-3">
              {proposedAlternatives.length > 0 && (
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />

                    <span><strong>{proposedAlternatives.length} alternative proposals</strong> currently awaiting patient confirmation.</span>
                  </div>
                  <Link to="/reception/requests">
                    <Button variant="secondary" size="sm">View</Button>
                  </Link>
                </div>
              )}

              {pendingRequests.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">No pending online requests awaiting front-desk approval.</p>
              ) : (
                pendingRequests.slice(0, 3).map((req) => (
                  <div key={req.id} className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/30 flex items-center justify-between text-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{req.patientName}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{req.requestId || req.referenceNumber}</span>
                        <Badge variant="Requested" size="sm">Awaiting Review</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Requested: <span className="tabular-nums font-mono">{req.requestedDate || req.date}</span> at <span className="tabular-nums font-mono">{req.requestedTime || req.time}</span> · {req.doctorName}</p>

                    </div>

                    <div className="flex items-center gap-2">
                      <Link to="/reception/requests">
                        <Button
                          variant="primary"
                          size="sm"
                        >
                          Review & Verify
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Follow-up Reminders & Daily Task Checklist */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Actions Bar */}
          <Card className="p-4 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Fast Shortcuts</span>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/reception/walk-ins">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">

                  ⚡ Walk-In Express
                </Button>
              </Link>
              <Link to="/reception/patients/new">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">

                  👤 Register Patient
                </Button>
              </Link>
              <Link to="/reception/follow-ups">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">

                  📞 Follow-Up Queue
                </Button>
              </Link>
              <Link to="/reception/tasks">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">

                  📋 Daily Tasks
                </Button>
              </Link>
            </div>
          </Card>

          {/* Follow-up tasks due today */}
          <Card className="border-slate-200 dark:border-slate-800">

            <CardHeader
              title="Follow-Ups Due Today"
              subtitle="Proactive post-procedure reminders"
              action={
                <Link to="/reception/follow-ups" className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">

                  All ({followUps.length})
                </Link>
              }
            />
            <div className="p-4 space-y-3">
              {pendingFollowUps.slice(0, 3).map((f) => (
                <div key={f.id} className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{f.patientName}</span>
                    <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 tabular-nums">
                      Due: {f.dueDate}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{f.reason}</p>
                  <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400 dark:text-slate-500">Doctor: {f.doctorName}</span>

                    <button
                      onClick={() =>
                        openWhatsAppModal({
                          patient_name: f.patientName,
                          clinic_name: activeClinic?.name || 'Clinic',
                          appointment_date: f.dueDate,
                          appointment_time: '11:00 AM',
                          doctor_name: f.doctorName,
                          appointment_reference: 'REV-FOLLOWUP',
                          clinic_phone: activeClinic?.phone || ''
                        })
                      }
                      className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Send WhatsApp

                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
