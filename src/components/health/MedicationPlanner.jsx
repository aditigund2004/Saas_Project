import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Pill,
  Sun,
  Sunset,
  Moon,
  Clock,
  CheckCircle2,
  XCircle,
  BellRing,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function MedicationPlanner() {
  const {
    medicationSchedule = [],
    updateMedicationStatus,
    weeklyAdherence = [],
    isPatientFriendlyMode
  } = useApp();

  const [activeSlotFilter, setActiveSlotFilter] = useState('All');

  // Time slots
  const slots = [
    { key: 'Morning', label: 'Morning', icon: Sun, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { key: 'Afternoon', label: 'Afternoon', icon: Sun, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40' },
    { key: 'Evening', label: 'Evening', icon: Sunset, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
    { key: 'Bedtime', label: 'Bedtime', icon: Moon, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' }
  ];

  const totalDoses = medicationSchedule.length;
  const takenDoses = medicationSchedule.filter((m) => m.status === 'taken').length;
  const progressPercent = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;

  const filteredMeds = activeSlotFilter === 'All'
    ? medicationSchedule
    : medicationSchedule.filter((m) => m.timeSlot === activeSlotFilter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Adherence Progress Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Pill className="w-3.5 h-3.5 text-blue-200" />
              Daily Patient Medication Routine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Medication Day Planner
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Track prescribed morning, afternoon, evening, and bedtime doses with one-click status logging.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[200px]">
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
              Today's Adherence Score
            </span>
            <div className="text-3xl font-black text-white mt-0.5">
              {progressPercent}%
            </div>
            <span className="text-xs text-blue-100">
              {takenDoses} of {totalDoses} doses logged
            </span>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Adherence Streak Tracker */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
              7-Day Adherence Streak & Consistency
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            96% Weekly Success Rate
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weeklyAdherence.map((day, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center transition-all ${
                day.percentage === 100
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                {day.day}
              </span>
              <span className="text-xs font-semibold block">{day.date}</span>
              <div className="mt-1 flex items-center justify-center">
                {day.percentage === 100 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span className="text-[11px] font-bold text-amber-600">{day.percentage}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slot Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => setActiveSlotFilter('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSlotFilter === 'All'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300'
          }`}
        >
          All Slots ({totalDoses})
        </button>
        {slots.map((s) => {
          const count = medicationSchedule.filter((m) => m.timeSlot === s.key).length;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveSlotFilter(s.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSlotFilter === s.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300'
              }`}
            >
              <s.icon className="w-3.5 h-3.5" />
              <span>{s.label} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Medication Cards List */}
      <div className="space-y-4">
        {filteredMeds.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Pill className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200">No medications in this time slot</h4>
            <p className="text-xs text-slate-500 mt-1">Switch to 'All Slots' to review your complete routine.</p>
          </div>
        ) : (
          filteredMeds.map((med) => {
            const isTaken = med.status === 'taken';
            const isSkipped = med.status === 'skipped';
            const isSnoozed = med.status === 'snoozed';

            return (
              <div
                key={med.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isTaken
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : isSkipped
                    ? 'bg-slate-100/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-75'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Pill Info */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                        isTaken
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      <Pill className="w-6 h-6" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {med.timeSlot} · {med.scheduledTime}
                        </span>
                        <Badge variant="outline" size="sm">
                          {med.category}
                        </Badge>
                        {isTaken && (
                          <Badge variant="success" size="sm">
                            Taken at {med.takenAt || '08:35 AM'}
                          </Badge>
                        )}
                        {isSkipped && (
                          <Badge variant="neutral" size="sm">
                            Skipped
                          </Badge>
                        )}
                        {isSnoozed && (
                          <Badge variant="warning" size="sm">
                            Snoozed 30m
                          </Badge>
                        )}
                      </div>

                      <h3 className={`font-extrabold text-slate-900 dark:text-white ${isPatientFriendlyMode ? 'text-xl' : 'text-base'}`}>
                        {med.name} <span className="text-slate-500 font-semibold text-sm">({med.dosage})</span>
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {med.instructions}
                      </p>

                      <div className="text-[11px] text-slate-400 pt-1">
                        Prescribed by {med.prescribedBy} · {med.pillsRemaining} pills left ({med.refillsLeft} refills)
                      </div>
                    </div>
                  </div>

                  {/* Right Status Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <Button
                      variant={isTaken ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => updateMedicationStatus(med.id, 'taken')}
                      className={`font-bold text-xs ${isTaken ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                      {isTaken ? 'Taken ✓' : 'Mark Taken'}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMedicationStatus(med.id, 'snoozed')}
                      className="font-bold text-xs"
                    >
                      <BellRing className="w-3.5 h-3.5 mr-1 text-amber-500" />
                      Snooze
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMedicationStatus(med.id, 'skipped')}
                      className="font-bold text-xs text-slate-500 hover:text-rose-600"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Clinical Safety & Prescription Integrity Notice
          </span>
          This Medication Day Planner is an organizational reminder tool based on authorized doctor prescriptions. It does not generate automatic clinical advice or alter drug dosages. Always consult your attending doctor before changing any medicine schedules.
        </div>
      </div>
    </div>
  );
}
