<<<<<<< HEAD
import React from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> origin/main
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
<<<<<<< HEAD
import { Clock, UserCheck, Stethoscope, Play, AlertCircle, Phone, ArrowRight } from 'lucide-react';
=======
import {
  Clock,
  UserCheck,
  Stethoscope,
  Play,
  AlertCircle,
  Phone,
  ArrowRight,
  Tv,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Sparkles,
  Wifi,
  DoorOpen,
  Calendar,
  X
} from 'lucide-react';
>>>>>>> origin/main

export function ClinicQueuePage() {
  const { appointments, activeClinic, updateAppointmentStatus, showToast } = useApp();

<<<<<<< HEAD
=======
  // TV Fullscreen lounge mode
  const [isTvMode, setIsTvMode] = useState(false);
  const [tvTime, setTvTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  // Doctor Delay Offset (+0, +15, +30, +45 mins)
  const [delayOffsetMins, setDelayOffsetMins] = useState(0);
  const [delayReason, setDelayReason] = useState('Emergency clinical procedure in operatory');

  // Live seconds clock for TV mode
  useEffect(() => {
    const timer = setInterval(() => {
      setTvTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio chime generator (Hospital double chime)
  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Two-tone Ding-Dong (C5 -> E5)
      playTone(523.25, 0, 0.4);
      playTone(659.25, 0.25, 0.6);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

>>>>>>> origin/main
  const todayApts = appointments.filter((a) => {
    const isClinicMatch = !activeClinic?.id || a.clinicId === activeClinic.id;
    const isDateMatch = a.date === '2026-10-27' || a.date === '2026-10-23' || a.date === new Date().toISOString().split('T')[0];
    const isStatusActive = a.status === 'Checked In' || a.status === 'In Progress' || a.status === 'In Consultation';
    return isClinicMatch && (isDateMatch || isStatusActive);
  });

  const waitingQueue = todayApts.filter((a) => a.status === 'Checked In');
  const inProgress = todayApts.filter((a) => a.status === 'In Progress' || a.status === 'In Consultation');
  const completed = todayApts.filter((a) => a.status === 'Completed');

  const handleCallPatient = (apt) => {
<<<<<<< HEAD
    updateAppointmentStatus(apt.id, 'In Consultation');
    showToast(`Called token ${apt.queueNumber || apt.referenceNumber || 'Q-1'} (${apt.patientName}) into operatory!`);
  };

  return (
    <div className="space-y-6">
=======
    playChime();
    updateAppointmentStatus(apt.id, 'In Consultation');
    showToast(`Token ${apt.queueNumber || apt.referenceNumber || 'Q-1'} (${apt.patientName}) called into Consultation Room!`);
  };

  // Base average wait + delay offset
  const computedAverageWait = 14 + delayOffsetMins;

  return (
    <div className="space-y-6">
      {/* Top Header */}
>>>>>>> origin/main
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 uppercase tracking-wide">
<<<<<<< HEAD
              OPD Flow Monitor
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Live Patient Waiting Queue</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time multi-operatory token tracking, waiting time indicators, and room call-in controls
          </p>
        </div>
=======
              OPD Flow & Waiting Lounge Monitor
            </span>
            {delayOffsetMins > 0 && (
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 animate-pulse">
                +{delayOffsetMins}m Schedule Buffer Active
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Live Patient Waiting Queue
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time multi-operatory token tracking, delay buffer offsets, and 1-click TV waiting lounge display.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Volume2}
            onClick={playChime}
            className="text-xs"
          >
            Test Chime
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Tv}
            onClick={() => setIsTvMode(true)}
            className="font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md"
          >
            Launch Public TV Mode
          </Button>
        </div>
      </div>

      {/* Doctor Delay Offset Buffer Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Physician Schedule Delay Offset:
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              (Informs front desk and recalibrates estimated wait times)
            </span>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5">
            {[0, 15, 30, 45].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => {
                  setDelayOffsetMins(mins);
                  showToast(mins === 0 ? 'Physician back on schedule (0 min delay).' : `Delay offset updated to +${mins} mins.`);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  delayOffsetMins === mins
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {mins === 0 ? 'On Time' : `+${mins}m`}
              </button>
            ))}
          </div>
        </div>

        {delayOffsetMins > 0 && (
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>
                <strong>Notice:</strong> Consulting doctor delayed by approx. {delayOffsetMins} minutes ({delayReason}). All patient estimates adjusted.
              </span>
            </div>
            <button
              onClick={() => showToast('Simulated WhatsApp schedule delay broadcast queued for waiting patients.')}
              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-600 hover:bg-amber-700 text-white cursor-pointer shadow-xs whitespace-nowrap ml-2"
            >
              Broadcast WhatsApp Alert
            </button>
          </div>
        )}
>>>>>>> origin/main
      </div>

      {/* Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center justify-between text-blue-800 dark:text-blue-300 mb-1">
            <span className="text-xs font-bold uppercase">Currently Waiting</span>
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-black text-blue-950 dark:text-blue-100">{waitingQueue.length} Patients</div>
<<<<<<< HEAD
          <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-1">Average wait time: 14 mins</p>
=======
          <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-1">
            Average wait time: ~{computedAverageWait} mins {delayOffsetMins > 0 ? `(+${delayOffsetMins}m buffer)` : ''}
          </p>
>>>>>>> origin/main
        </Card>

        <Card className="p-4 border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center justify-between text-amber-800 dark:text-amber-300 mb-1">
            <span className="text-xs font-bold uppercase">In Consultations</span>
            <Play className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-950 dark:text-amber-100">{inProgress.length} Operatories</div>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">Active doctor consultations</p>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 mb-1">
            <span className="text-xs font-bold uppercase">Completed Today</span>
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-950 dark:text-emerald-100">{completed.length} Consultations</div>
<<<<<<< HEAD
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">Prescriptions issued and bills settled</p>
=======
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">Prescriptions signed & invoices settled</p>
>>>>>>> origin/main
        </Card>
      </div>

      {/* Live Waiting Queue Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Queue Progression (Checked-In Order)
        </h3>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                  <th className="px-4 py-3">Token #</th>
                  <th className="px-4 py-3">Patient Name</th>
                  <th className="px-4 py-3">Assigned Doctor</th>
                  <th className="px-4 py-3">Scheduled Slot</th>
                  <th className="px-4 py-3">Procedure</th>
<<<<<<< HEAD
=======
                  <th className="px-4 py-3">Est. Wait</th>
>>>>>>> origin/main
                  <th className="px-4 py-3">Queue Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {waitingQueue.length === 0 ? (
                  <tr>
<<<<<<< HEAD
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
=======
                    <td colSpan={9} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
>>>>>>> origin/main
                      No patients currently waiting in the OPD queue.
                    </td>
                  </tr>
                ) : (
<<<<<<< HEAD
                  waitingQueue.map((apt, idx) => (
                    <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400 text-sm">
                        {apt.queueNumber || `#Q-${idx + 1}`}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{apt.patientName}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{apt.patientPhone}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                        {apt.doctorName}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                        {apt.time}
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                        {apt.serviceName}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="teal" size="sm">Waiting (Pos {idx + 1})</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleCallPatient(apt)}
                            className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                          >
                            <Play className="w-3 h-3 mr-1 fill-current" />
                            Call In
                          </Button>
                          <Link to={`/app/consultations/${apt.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                            >
                              <Stethoscope className="w-3 h-3 mr-1" />
                              Consult
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
=======
                  waitingQueue.map((apt, idx) => {
                    const patientEstWait = (idx + 1) * 12 + delayOffsetMins;
                    return (
                      <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400 text-sm">
                          {apt.queueNumber || `#Q-${idx + 1}`}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 dark:text-slate-100">{apt.patientName}</div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{apt.patientPhone}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                          {apt.doctorName || 'Dr. Arvind Rao'}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                          {apt.time || '10:30 AM'}
                        </td>
                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                          {apt.serviceName}
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-slate-700 dark:text-slate-300">
                          ~{patientEstWait} mins
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="teal" size="sm">Waiting (Pos {idx + 1})</Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleCallPatient(apt)}
                              className="h-7 text-xs bg-blue-600 hover:bg-blue-700 font-bold"
                            >
                              <Play className="w-3 h-3 mr-1 fill-current" />
                              Call In
                            </Button>
                            <Link to={`/app/consultations/${apt.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                              >
                                <Stethoscope className="w-3 h-3 mr-1" />
                                Consult
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
>>>>>>> origin/main
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Active Consultations in Progress Section */}
      {inProgress.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-amber-500" />
            Active Operatory Consultations ({inProgress.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inProgress.map((apt) => (
              <Card key={apt.id} className="p-4 border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{apt.patientName}</span>
                    <Badge variant="warning" size="sm">In Consultation</Badge>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
<<<<<<< HEAD
                    {apt.doctorName} · {apt.serviceName}
=======
                    {apt.doctorName} · {apt.serviceName} · Cabin 1
>>>>>>> origin/main
                  </div>
                </div>
                <Link to={`/app/consultations/${apt.id}`}>
                  <Button variant="primary" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs h-8">
                    Open Room <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
<<<<<<< HEAD
    </div>
  );
}

=======

      {/* Fullscreen TV Waiting Lounge Display Mode Modal */}
      {isTvMode && (
        <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col p-6 sm:p-10 select-none animate-fade-in">
          {/* TV Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg">
                {activeClinic?.name?.charAt(0) || 'C'}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {activeClinic?.name || 'CityCare Family Clinic'}
                </h2>
                <p className="text-xs text-slate-400">
                  Outpatient Department Token Flow · {activeClinic?.address || 'FC Road, Pune'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-mono font-black text-cyan-400">
                  {tvTime}
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">Live Hospital Clock</span>
              </div>

              <button
                type="button"
                onClick={() => setIsTvMode(false)}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
                title="Exit TV Mode"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* TV Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 py-8 items-start">
            {/* Left Column: Now Serving / Active Rooms */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping" />
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-emerald-400">
                    Now Serving In Consultation
                  </h3>
                </div>
                <Badge variant="success" size="lg" className="text-xs font-bold uppercase">
                  Proceed to Cabin
                </Badge>
              </div>

              {inProgress.length === 0 ? (
                <div className="p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2 text-slate-500">
                  <DoorOpen className="w-12 h-12 mx-auto text-slate-600" />
                  <p className="text-lg font-bold">Consultation Room is Preparing</p>
                  <p className="text-xs">Next patient token will be announced shortly.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {inProgress.map((apt, idx) => (
                    <div
                      key={apt.id}
                      className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-2 border-emerald-500/80 shadow-2xl flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                          Room / Cabin 0{idx + 1} · {apt.doctorName || 'Dr. Arvind Rao'}
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-white">
                          {apt.patientName}
                        </div>
                        <div className="text-xs text-slate-400">
                          {apt.serviceName}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-4xl sm:text-6xl font-mono font-black text-emerald-400 drop-shadow-md">
                          {apt.queueNumber || `#Q-${idx + 1}`}
                        </span>
                        <span className="block text-[11px] font-bold text-emerald-300 mt-1 uppercase">
                          Inside Operatory
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Physician Delay Announcement on TV */}
              {delayOffsetMins > 0 && (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/60 text-amber-300 text-xs flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold">Patient Advisory Notice: </span>
                    Consulting physician is attending an emergency procedure. Minor delay of approx. {delayOffsetMins} mins. We appreciate your patience.
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Next Up In Waiting Lounge */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-300">
                  Next In Queue
                </h3>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
                  {waitingQueue.length} Waiting
                </span>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {waitingQueue.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-sm">
                    Waiting lounge is currently clear.
                  </div>
                ) : (
                  waitingQueue.map((apt, idx) => (
                    <div
                      key={apt.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        idx === 0
                          ? 'bg-blue-950/40 border-blue-500/70 shadow-lg'
                          : 'bg-slate-900/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-mono font-bold text-slate-400 text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-white text-base">
                            {apt.patientName}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {apt.doctorName || 'Dr. Arvind Rao'} · {apt.serviceName}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-mono font-black text-cyan-400">
                          {apt.queueNumber || `#Q-${idx + 1}`}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-mono">
                          ~{(idx + 1) * 12 + delayOffsetMins}m wait
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* TV Bottom Marquee / Announcement Ticker */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-bold text-cyan-400 uppercase tracking-wider shrink-0 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800">
                Lounge Info
              </span>
              <p className="truncate">
                Please keep your previous medical records & test reports ready · Free Patient Wi-Fi: CityCare_Guest (Pass: clinic2026) · Drinking water and washroom available near counter.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                icon={Volume2}
                onClick={playChime}
                className="text-xs text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                Chime
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsTvMode(false)}
                className="text-xs"
              >
                Exit TV View
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
>>>>>>> origin/main
