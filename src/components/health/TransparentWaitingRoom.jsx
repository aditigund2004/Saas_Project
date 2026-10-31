import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Clock,
  UserCheck,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tv,
  ArrowRight,
  ShieldCheck,
  Users,
  Building2,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function TransparentWaitingRoom({ appointmentId = 'apt-101' }) {
  const { appointments, currentUser, activeClinic, showToast, isPatientFriendlyMode } = useApp();

  const myAppointment = appointments.find((a) => a.id === appointmentId) || appointments[0];

  // Derive queue position from appointments
  const waitingApts = appointments.filter(
    (a) => a.status === 'Checked In' || a.status === 'Patient Checked In'
  );
  const inConsultationApts = appointments.filter(
    (a) => a.status === 'In Progress' || a.status === 'In Consultation'
  );

  const currentlyServing = inConsultationApts[0] || {
    queueNumber: 'Token #11',
    patientName: 'Kavita Joshi',
    room: 'Consultation Room 1'
  };

  const isCheckedIn = myAppointment?.status === 'Checked In' || myAppointment?.status === 'Patient Checked In';
  const isInConsultation = myAppointment?.status === 'In Progress' || myAppointment?.status === 'In Consultation';
  const isCompleted = myAppointment?.status === 'Completed';

  // Calculate my position
  const myQueueIndex = waitingApts.findIndex((a) => a.id === myAppointment?.id);
  const peopleAhead = myQueueIndex >= 0 ? myQueueIndex : 1;
  const estimatedWaitMins = Math.max(2, (peopleAhead + 1) * 7);

  const [simulatedPulse, setSimulatedPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedPulse((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Tv className="w-3.5 h-3.5 text-blue-200" />
              Live Clinic Queue Status
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Transparent Waiting Lounge
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Live updates on your queue token, doctor schedule, and real-time room readiness.
            </p>
          </div>

          <Badge
            variant={isInConsultation ? 'success' : isCheckedIn ? 'primary' : 'warning'}
            size="lg"
            className="self-start sm:self-center bg-white/20 text-white font-bold px-3 py-1.5 backdrop-blur-md border border-white/30"
          >
            {isInConsultation
              ? 'Doctor is Calling You!'
              : isCheckedIn
              ? 'Checked In · Waiting Comfortably'
              : 'Awaiting Reception Check-In'}
          </Badge>
        </div>
      </div>

      {/* Main Token Stage */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm text-center relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-md mx-auto space-y-6">
          {/* Token Card */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Your Assigned Token Number
            </span>
            <div className="text-5xl sm:text-6xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
              {myAppointment?.queueNumber || 'Token #12'}
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {myAppointment?.patientName || currentUser?.name || 'Aarav Patel'}
            </p>
          </div>

          {/* Currently Serving vs Estimated Wait */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="text-left border-r border-slate-200 dark:border-slate-700 pr-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Currently Serving
              </span>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {currentlyServing.queueNumber || 'Token #11'}
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                In Consultation Room 1
              </span>
            </div>

            <div className="text-left pl-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Estimated Wait
              </span>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                ~{isInConsultation ? '0' : estimatedWaitMins} Mins
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {isInConsultation
                  ? 'Please enter chamber'
                  : `${peopleAhead} patient(s) ahead of you`}
              </span>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="space-y-2 text-left pt-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Consultation Journey Status
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div
                className={`p-2.5 rounded-xl border font-bold ${
                  isCheckedIn || isInConsultation || isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                1. Check-In Done
              </div>

              <div
                className={`p-2.5 rounded-xl border font-bold ${
                  isInConsultation || isCompleted
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : isCheckedIn
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 animate-pulse'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                2. In Queue
              </div>

              <div
                className={`p-2.5 rounded-xl border font-bold ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : isInConsultation
                    ? 'bg-emerald-500 text-white border-emerald-600 animate-bounce'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                3. Consultation
              </div>
            </div>
          </div>

          {/* Doctor Briefing Strip */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-left flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white block">
                  Dr. {myAppointment?.doctorName || 'Aarav Mehta'}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {activeClinic?.name || 'CityCare Family Practice'} · On Duty
                </span>
              </div>
            </div>

            <span className="font-bold text-blue-600 dark:text-blue-400">
              Room 101
            </span>
          </div>
        </div>
      </div>

      {/* Reassurance Footer */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Real-Time Front Desk & Queue Synchronization
          </span>
          Your waiting status is linked in real-time to the receptionist check-in desk and the doctor's consultation monitor. When your turn arrives, an audio chime will sound and your name will be announced on the lounge screens.
        </div>
      </div>
    </div>
  );
}

