import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  UserCheck,
<<<<<<< HEAD
  CheckCircle2,
  MessageSquare,
  ClipboardList
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader } from '../../components/ui/Card';
=======
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Phone,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function ReceptionDashboardPage() {
  const {
<<<<<<< HEAD
    activeClinic = {},
    appointments = [],
    updateAppointmentStatus,
    followUps = [],
=======
    activeClinic,
    activeBranch,
    appointments,
    updateAppointmentStatus,
    followUps,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Front Desk Station
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-700">{activeClinic?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
=======
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Front Desk Station
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-700">{activeClinic?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            Reception Control Center
          </h1>
          <p className="text-xs text-slate-500">
            Speed-optimized for multi-clinic booking triage, slot availability verification, walk-ins, and doctor queue.
          </p>
        </div>

<<<<<<< HEAD
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/reception/requests">
            <Button variant="outline" size="sm" icon={ClipboardList} className="font-semibold border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100">
=======
        <div className="flex items-center gap-2">
          <Link to="/reception/requests">
            <Button variant="outline" size="md" icon={ClipboardList} className="font-bold border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              Review Requests ({pendingRequests.length})
            </Button>
          </Link>
          <Link to="/reception/walk-ins">
<<<<<<< HEAD
            <Button variant="primary" size="sm" icon={Clock} className="font-semibold">
=======
            <Button variant="primary" size="md" icon={Clock} className="bg-blue-700 hover:bg-blue-800 font-bold">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              + Fast Walk-In Token
            </Button>
          </Link>
          <Link to="/reception/appointments/new">
<<<<<<< HEAD
            <Button variant="outline" size="sm" icon={Calendar}>
=======
            <Button variant="outline" size="md" icon={Calendar}>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
            color={pendingRequests.length > 0 ? 'amber' : 'blue'}
=======
            color={pendingRequests.length > 0 ? 'amber' : 'teal'}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            subtitle="Patient booking requests"
          />
        </Link>
        <StatCard
          title="Waiting Room Lounge"
          value={waitingPatients.length.toString()}
          change={waitingPatients.length > 0 ? 'Patients seated' : 'Lounge clear'}
          trend="up"
          icon={UserCheck}
<<<<<<< HEAD
          color="blue"
=======
          color="teal"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          subtitle="Checked in and ready"
        />
        <StatCard
          title="Consulting Right Now"
          value={inProgress.length.toString()}
          change="In doctor room"
          trend="up"
          icon={Clock}
<<<<<<< HEAD
          color="indigo"
=======
          color="blue"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
          <Card>
            <CardHeader
              title={`Waiting Room & Active Consultations (${waitingPatients.length + inProgress.length})`}
              subtitle="Patients currently at the clinic"
              action={
                <Link to="/reception/walk-ins" className="text-xs text-blue-600 font-semibold hover:underline">
                  + Issue Token
                </Link>
              }
            />
<<<<<<< HEAD
            <div className="p-4 space-y-2.5">
=======
            <div className="p-4 space-y-3">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              {waitingPatients.length === 0 && inProgress.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Waiting room is currently clear. No patients awaiting doctors.
                </div>
              ) : (
                <>
                  {inProgress.map((apt) => (
                    <div
                      key={apt.id}
<<<<<<< HEAD
                      className="p-3.5 rounded-xl border border-blue-200/90 bg-blue-50/40 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{apt.patientName}</span>
                          <span className="font-mono text-slate-400 font-semibold text-[10px] tabular-nums">{apt.queueNumber || '#Q-01'}</span>
=======
                      className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{apt.patientName}</span>
                          <span className="font-mono text-slate-400 font-bold text-[10px]">{apt.queueNumber || '#Q-01'}</span>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                          <Badge variant="In Progress">In Doctor Room</Badge>
                        </div>
                        <p className="text-slate-600 mt-0.5">{apt.doctorName} · {apt.serviceName}</p>
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
<<<<<<< HEAD
                      className="p-3.5 rounded-xl border border-blue-200/80 bg-blue-50/20 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{apt.patientName}</span>
                          <span className="font-mono text-blue-800 font-semibold text-[11px] bg-blue-100 px-1.5 py-0.5 rounded tabular-nums">
=======
                      className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/30 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{apt.patientName}</span>
                          <span className="font-mono text-blue-800 font-bold text-[11px] bg-blue-100 px-1.5 py-0.5 rounded">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                            {apt.queueNumber || '#Q-02'}
                          </span>
                          <Badge variant="Checked In">Waiting</Badge>
                        </div>
<<<<<<< HEAD
                        <p className="text-slate-600 mt-0.5">Assigned: {apt.doctorName} · Time: <span className="tabular-nums">{apt.time}</span></p>
=======
                        <p className="text-slate-600 mt-0.5">Assigned: {apt.doctorName} · Time: {apt.time}</p>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
          <Card>
            <CardHeader
              title={`Online Booking Requests (${pendingRequests.length})`}
              subtitle="Requires receptionist slot verification or alternative proposal"
              action={
                <Link to="/reception/requests" className="text-xs text-blue-600 font-semibold hover:underline">
                  Open Requests Workspace &rarr;
                </Link>
              }
            />
            <div className="p-4 space-y-2.5">
              {proposedAlternatives.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span><strong>{proposedAlternatives.length} alternative proposals</strong> currently awaiting patient confirmation.</span>
                  </div>
                  <Link to="/reception/requests">
<<<<<<< HEAD
                    <Button variant="secondary" size="sm">View</Button>
=======
                    <Button variant="secondary" size="xs">View</Button>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                  </Link>
                </div>
              )}

              {pendingRequests.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No pending online requests awaiting front-desk approval.</p>
              ) : (
                pendingRequests.slice(0, 3).map((req) => (
                  <div key={req.id} className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
<<<<<<< HEAD
                        <span className="font-semibold text-slate-900">{req.patientName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{req.requestId || req.referenceNumber}</span>
                        <Badge variant="Requested">Awaiting Review</Badge>
                      </div>
                      <p className="text-slate-600">Requested: <span className="tabular-nums">{req.requestedDate || req.date}</span> at <span className="tabular-nums">{req.requestedTime || req.time}</span> · {req.doctorName}</p>
=======
                        <span className="font-bold text-slate-900">{req.patientName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{req.requestId || req.referenceNumber}</span>
                        <Badge variant="warning">Awaiting Review</Badge>
                      </div>
                      <p className="text-slate-600">Requested: {req.requestedDate || req.date} at {req.requestedTime || req.time} · {req.doctorName}</p>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
          <Card className="p-4 border-slate-200/90 bg-white space-y-3">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Fast Shortcuts</span>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/reception/walk-ins">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-medium">
=======
          <Card className="p-4 border-slate-200 bg-gradient-to-br from-blue-50/50 to-white space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fast Shortcuts</span>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/reception/walk-ins">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                  ⚡ Walk-In Express
                </Button>
              </Link>
              <Link to="/reception/patients/new">
<<<<<<< HEAD
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-medium">
=======
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                  👤 Register Patient
                </Button>
              </Link>
              <Link to="/reception/follow-ups">
<<<<<<< HEAD
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-medium">
=======
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                  📞 Follow-Up Queue
                </Button>
              </Link>
              <Link to="/reception/tasks">
<<<<<<< HEAD
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-medium">
=======
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                  📋 Daily Tasks
                </Button>
              </Link>
            </div>
          </Card>

          {/* Follow-up tasks due today */}
          <Card>
            <CardHeader
              title="Follow-Ups Due Today"
              subtitle="Proactive post-procedure reminders"
              action={
                <Link to="/reception/follow-ups" className="text-xs text-blue-600 font-semibold hover:underline">
                  All ({followUps.length})
                </Link>
              }
            />
<<<<<<< HEAD
            <div className="p-4 space-y-2.5">
              {pendingFollowUps.slice(0, 3).map((f) => (
                <div key={f.id} className="p-3 rounded-xl border border-slate-200/90 bg-white text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{f.patientName}</span>
                    <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 tabular-nums">
=======
            <div className="p-4 space-y-3">
              {pendingFollowUps.slice(0, 3).map((f) => (
                <div key={f.id} className="p-3 rounded-xl border border-slate-200 bg-white text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{f.patientName}</span>
                    <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                      Due: {f.dueDate}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">{f.reason}</p>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Doctor: {f.doctorName}</span>
                    <button
                      onClick={() =>
                        openWhatsAppModal({
                          patient_name: f.patientName,
<<<<<<< HEAD
                          clinic_name: activeClinic?.name || 'Clinic',
=======
                          clinic_name: activeClinic.name,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                          appointment_date: f.dueDate,
                          appointment_time: '11:00 AM',
                          doctor_name: f.doctorName,
                          appointment_reference: 'REV-FOLLOWUP',
<<<<<<< HEAD
                          clinic_phone: activeClinic?.phone || ''
=======
                          clinic_phone: activeClinic.phone
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                        })
                      }
                      className="text-emerald-700 hover:text-emerald-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
<<<<<<< HEAD
                      <MessageSquare className="w-3 h-3 text-emerald-600" /> Send WhatsApp
=======
                      <MessageSquare className="w-3 h-3" /> Send WhatsApp
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
<<<<<<< HEAD
=======

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
