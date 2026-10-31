import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Pill,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  MessageSquare,
  Sparkles,
  Info,
  Calendar,
  Flame,
  Activity,
  RotateCcw,
  Plus,
  Send,
  HelpCircle,
  Lock,
  ArrowRight,
  Filter,
  CheckCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MedicineInfoModal } from './MedicineInfoModal';

export function PatientRemindersPage() {
  const {
    currentUser,
    prescriptions = [],
    medicationReminders = [],
    doseLogs = [],
    markDoseTaken,
    markDoseMissed,
    resetDoseStatus,
    toggleMedicationReminder,
    updateReminderPreferences,
    sendMedicationWhatsAppReminder,
    openWhatsAppModal,
    activeClinic
  } = useApp();

  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'config' | 'history'
  const [selectedMedicineForInfo, setSelectedMedicineForInfo] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const [historyFilter, setHistoryFilter] = useState('All');

  // Filter doses for current patient (pt-1041 demo patient)
  const myDoses = doseLogs.filter(
    (d) => d.patientId === 'pt-1041' || d.patientId === currentUser?.id
  );

  const myReminders = medicationReminders.filter(
    (r) => r.patientId === 'pt-1041' || r.patientId === currentUser?.id
  );

  // Adherence metrics
  const takenCount = myDoses.filter((d) => d.status === 'taken').length;
  const missedCount = myDoses.filter((d) => d.status === 'missed').length;
  const totalDoses = myDoses.length;
  const completedOrMissed = takenCount + missedCount;
  const adherenceRate = completedOrMissed > 0 ? Math.round((takenCount / completedOrMissed) * 100) : 100;

  // Group doses by time of day
  const timesOfDay = ['Morning', 'Afternoon', 'Evening', 'Bedtime'];
  const dosesByTime = timesOfDay.reduce((acc, tod) => {
    acc[tod] = myDoses.filter((d) => d.timeOfDay === tod);
    return acc;
  }, {});

  const handleOpenEditModal = (reminder) => {
    setEditingReminder({
      ...reminder,
      morningTime: reminder.reminderTimes?.morning || '08:30 AM',
      afternoonTime: reminder.reminderTimes?.afternoon || '01:30 PM',
      eveningTime: reminder.reminderTimes?.evening || '08:30 PM',
      bedtimeTime: reminder.reminderTimes?.bedtime || '10:00 PM',
      whatsappPhone: reminder.whatsappPhone || currentUser?.phone || '+91 98765 43210',
      whatsappEnabled: reminder.channels?.whatsapp ?? true,
      inAppEnabled: reminder.channels?.inApp ?? true
    });
  };

  const handleSaveReminderPreferences = (e) => {
    e.preventDefault();
    if (!editingReminder) return;

    const reminderTimes = {};
    if (editingReminder.reminderTimes?.morning) reminderTimes.morning = editingReminder.morningTime;
    if (editingReminder.reminderTimes?.afternoon) reminderTimes.afternoon = editingReminder.afternoonTime;
    if (editingReminder.reminderTimes?.evening) reminderTimes.evening = editingReminder.eveningTime;
    if (editingReminder.reminderTimes?.bedtime) reminderTimes.bedtime = editingReminder.bedtimeTime;

    updateReminderPreferences(editingReminder.id, {
      enabled: editingReminder.enabled,
      reminderTimes,
      channels: {
        whatsapp: editingReminder.whatsappEnabled,
        inApp: editingReminder.inAppEnabled
      },
      whatsappPhone: editingReminder.whatsappPhone
    });

    setEditingReminder(null);
  };

  const filteredHistory = myDoses.filter((d) => {
    if (historyFilter === 'Taken') return d.status === 'taken';
    if (historyFilter === 'Missed') return d.status === 'missed';
    if (historyFilter === 'Pending') return d.status === 'pending';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-900/60 uppercase tracking-wider font-mono">
              Clinical Adherence Hub
            </span>
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-900/60 font-mono">
              WhatsApp Integrated
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1.5">
            Prescription Medication Reminders
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Automated dosing alerts derived strictly from your doctor's orders. Log daily intake, track adherence, and inspect clinical drug monographs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            icon={MessageSquare}
            className="text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold"
            onClick={() => {
              const dose = myDoses[0] || myReminders[0];
              if (dose) {
                sendMedicationWhatsAppReminder(dose);
              }
            }}
          >
            Preview WhatsApp Reminder
          </Button>
          <Link to="/patient/prescriptions">
            <Button variant="secondary" size="md" icon={Calendar}>
              My Prescriptions &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Strict Clinical Safety Notice: Protected Dosages */}
      <div className="p-4 sm:p-4.5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/70 text-amber-950 dark:text-amber-200 flex items-start gap-3.5 shadow-2xs">
        <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-amber-900 dark:text-amber-100">
              Doctor-Prescribed Dosages Are Protected & Immutable
            </span>
            <span className="text-[10px] font-mono font-bold bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full uppercase">
              Clinical Guardrail
            </span>
          </div>
          <p className="text-amber-850 dark:text-amber-300 leading-relaxed">
            Clinipulse strictly enforces patient safety regulations: prescribed dosages, medication strengths, and dosing frequencies are derived directly from your attending physician's signed digital prescription and <strong>cannot be modified automatically</strong> or altered by patients. You can customize alert timings, notification channels, and log adherence; any adjustment to your dosage requires a physician consultation.
          </p>
        </div>
      </div>

      {/* Adherence Scoreboard Cards (3 col per row grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Today's Adherence Rate */}
<<<<<<< HEAD
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-[#111E33] border border-[#263B59] shadow-lg shadow-black/20 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-transparent pointer-events-none" />
          <Activity className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-bold uppercase tracking-wider">Today's Adherence</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-800/60 flex items-center justify-center">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="relative z-10 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#F1F5F9] font-mono">
              {adherenceRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              {takenCount} of {totalDoses} doses taken
            </span>
          </div>
          <div className="relative z-10 w-full bg-[#0D1729] h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
=======
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />
          <Activity className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-600/[0.05] dark:text-emerald-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider">Today's Adherence</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="relative z-10 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
              {adherenceRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {takenCount} of {totalDoses} doses taken
            </span>
          </div>
          <div className="relative z-10 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
>>>>>>> origin/main
              style={{ width: `${(takenCount / Math.max(totalDoses, 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Adherence Streak */}
<<<<<<< HEAD
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-[#111E33] border border-[#263B59] shadow-lg shadow-black/20 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none" />
          <Flame className="absolute -bottom-2 -right-2 w-20 h-20 text-amber-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-bold uppercase tracking-wider">Adherence Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-800/60 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="relative z-10 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#F1F5F9] font-mono">
              5 Days
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-700/60">
              Optimal Regimen 🔥
            </span>
          </div>
          <p className="relative z-10 text-[11px] text-[#94A3B8]">
=======
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />
          <Flame className="absolute -bottom-2 -right-2 w-20 h-20 text-amber-600/[0.05] dark:text-amber-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider">Adherence Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div className="relative z-10 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
              5 Days
            </span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-300/80 dark:border-amber-700/60">
              Optimal Regimen 🔥
            </span>
          </div>
          <p className="relative z-10 text-[11px] text-slate-500 dark:text-slate-400">
>>>>>>> origin/main
            Zero missed doses on active antibiotic and maintenance regimen
          </p>
        </div>

        {/* Metric 3: Active Reminders & WhatsApp Delivery */}
<<<<<<< HEAD
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-[#111E33] border border-[#263B59] shadow-lg shadow-black/20 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-emerald-500/5 to-transparent pointer-events-none" />
          <MessageSquare className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-bold uppercase tracking-wider">Active Alerts & WhatsApp</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-800/60 flex items-center justify-center">
=======
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-emerald-500/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />
          <MessageSquare className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-600/[0.05] dark:text-emerald-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider">Active Alerts & WhatsApp</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center">
>>>>>>> origin/main
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </div>
          </div>
          <div className="relative z-10 flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
<<<<<<< HEAD
              <span className="text-2xl sm:text-3xl font-extrabold text-[#F1F5F9] font-mono">
                {myReminders.filter((r) => r.enabled).length}
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">
                active
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-800/60">
=======
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                {myReminders.filter((r) => r.enabled).length}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                active
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-800/60">
>>>>>>> origin/main
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              WhatsApp Live
            </span>
          </div>
<<<<<<< HEAD
          <p className="relative z-10 text-[11px] text-[#94A3B8] truncate">
=======
          <p className="relative z-10 text-[11px] text-slate-500 dark:text-slate-400 truncate">
>>>>>>> origin/main
            {myReminders.map((r) => r.medicationName.split(' ')[0]).join(', ')} · {currentUser?.phone || '+91 98765 43210'}
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
<<<<<<< HEAD
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#263B59] pb-3">
=======
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
>>>>>>> origin/main
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'today'
<<<<<<< HEAD
                ? 'bg-[#3B82F6] text-white shadow-sm'
                : 'bg-[#111E33] text-[#CBD5E1] border border-[#263B59] hover:bg-[#172640] hover:text-[#F1F5F9]'
=======
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
>>>>>>> origin/main
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Today's Dose Schedule</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
              {myDoses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'config'
<<<<<<< HEAD
                ? 'bg-[#3B82F6] text-white shadow-sm'
                : 'bg-[#111E33] text-[#CBD5E1] border border-[#263B59] hover:bg-[#172640] hover:text-[#F1F5F9]'
=======
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
>>>>>>> origin/main
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Prescription Reminders</span>
<<<<<<< HEAD
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#172640] text-[#22D3EE] font-mono">
=======
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
>>>>>>> origin/main
              {myReminders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'history'
<<<<<<< HEAD
                ? 'bg-[#3B82F6] text-white shadow-sm'
                : 'bg-[#111E33] text-[#CBD5E1] border border-[#263B59] hover:bg-[#172640] hover:text-[#F1F5F9]'
=======
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
>>>>>>> origin/main
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Adherence Log</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
          Schedule Date: {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* TAB 1: TODAY'S DOSE SCHEDULE */}
      {activeTab === 'today' && (
        <div className="space-y-6">
          {timesOfDay.map((tod) => {
            const dosesInPeriod = dosesByTime[tod] || [];
            if (dosesInPeriod.length === 0) return null;

            return (
              <div key={tod} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>{tod} Doses</span>
                  <span className="text-slate-400 font-mono">({dosesInPeriod.length})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dosesInPeriod.map((dose) => {
                    const isTaken = dose.status === 'taken';
                    const isMissed = dose.status === 'missed';
                    const isPending = dose.status === 'pending';

                    return (
                      <Card
                        key={dose.id}
                        className={`p-4 sm:p-5 border transition-all ${
                          isTaken
                            ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                            : isMissed
                            ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/10'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-900/50">
                                🕒 {dose.scheduledTime}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                                Ref: {dose.prescriptionNumber}
                              </span>
                            </div>

                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 pt-1">
                              {dose.medicationName}
                            </h3>

                            {/* Prescribed Dosage Lock Pill */}
                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono">
                                <Lock className="w-3 h-3 text-slate-400" />
                                Prescribed Dose: {dose.dosage}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>{dose.instructions}</span>
                            </p>
                          </div>

                          {/* Status Badge */}
                          <div className="shrink-0 text-right">
                            {isTaken && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800 font-mono">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                Taken {dose.takenAt ? `(${dose.takenAt})` : ''}
                              </span>
                            )}
                            {isMissed && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-800 font-mono">
                                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                                Missed
                              </span>
                            )}
                            {isPending && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-800 font-mono">
                                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                                Scheduled
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dose Actions Footer */}
                        <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedMedicineForInfo({
                                name: dose.medicationName,
                                dosage: dose.dosage,
                                doctorName: dose.doctorName
                              })}
                              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5" /> Drug Info
                            </button>

                            <button
                              type="button"
                              onClick={() => sendMedicationWhatsAppReminder(dose)}
                              className="text-xs font-semibold text-[#128C7E] dark:text-emerald-400 hover:underline flex items-center gap-1 px-2 py-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                              title="Test sending WhatsApp dose reminder"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            {isPending && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => markDoseMissed(dose.id)}
                                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 font-semibold transition-all cursor-pointer text-xs"
                                >
                                  Mark Missed
                                </button>
                                <button
                                  type="button"
                                  onClick={() => markDoseTaken(dose.id)}
                                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer text-xs"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Mark Taken
                                </button>
                              </>
                            )}

                            {!isPending && (
                              <button
                                type="button"
                                onClick={() => resetDoseStatus(dose.id)}
                                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                              >
                                <RotateCcw className="w-3 h-3" /> Revert
                              </button>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: PRESCRIPTION REMINDER CONFIGURATIONS */}
      {activeTab === 'config' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Active Prescription Dosing Configurations ({myReminders.length})
              </p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Each reminder below is linked directly to your doctor's electronic prescription slip.
              </p>
            </div>
            <Link to="/patient/prescriptions">
              <Button variant="outline" size="sm">
                View Official Prescriptions &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myReminders.map((reminder) => (
              <Card key={reminder.id} className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50">
                        {reminder.prescriptionNumber}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {reminder.doctorName}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mt-1">
                      {reminder.medicationName}
                    </h3>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reminder.enabled}
                      onChange={(e) => toggleMedicationReminder(reminder.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                  </label>
                </div>

                {/* Prescribed Dose Card Guardrail */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      Doctor Prescribed Dosage (Locked):
                    </span>
                    <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                      {reminder.prescribedDosage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Frequency:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                      {reminder.prescribedFrequency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Duration:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {reminder.duration}
                    </span>
                  </div>
                </div>

                {/* Notification Schedule & Channels */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">
                    Reminder Notification Schedule:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {Object.entries(reminder.reminderTimes).map(([tod, time]) => (
                      <span
                        key={tod}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold border border-blue-200 dark:border-blue-900/50"
                      >
                        {tod.toUpperCase()}: {time}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      WhatsApp: {reminder.channels?.whatsapp ? 'Enabled' : 'Disabled'}
                    </span>
                    <span className="font-mono text-[11px]">
                      {reminder.whatsappPhone || currentUser?.phone}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedMedicineForInfo({
                      name: reminder.medicationName,
                      dosage: reminder.prescribedDosage,
                      doctorName: reminder.doctorName
                    })}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" /> Medicine Safety Monograph
                  </button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditModal(reminder)}
                    >
                      Edit Times
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => sendMedicationWhatsAppReminder(reminder)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1 text-[#25D366]" /> Test WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ADHERENCE LOG */}
      {activeTab === 'history' && (
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Chronological Regimen Adherence Log
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Official audit log of doses taken, missed, or pending confirmation.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {['All', 'Taken', 'Missed', 'Pending'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setHistoryFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    historyFilter === f
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-200 dark:border-slate-800 tracking-wider">
                <tr>
                  <th className="px-4 py-3 sm:px-5">Scheduled Time</th>
                  <th className="px-4 py-3 sm:px-5">Medication & Dose</th>
                  <th className="px-4 py-3 sm:px-5">Prescription</th>
                  <th className="px-4 py-3 sm:px-5">Status</th>
                  <th className="px-4 py-3 sm:px-5">Recorded Timestamp</th>
                  <th className="px-4 py-3 sm:px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                {filteredHistory.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 sm:px-5 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {d.scheduledTime} ({d.timeOfDay})
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{d.medicationName}</span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Dose: {d.dosage}</span>
                    </td>
                    <td className="px-4 py-3 sm:px-5 font-mono text-blue-600 dark:text-blue-400">
                      {d.prescriptionNumber}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      {d.status === 'taken' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800 font-mono">
                          Taken
                        </span>
                      )}
                      {d.status === 'missed' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-800 font-mono">
                          Missed
                        </span>
                      )}
                      {d.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-800 font-mono">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-slate-500 dark:text-slate-400 font-mono">
                      {d.takenAt ? `Taken at ${d.takenAt}` : d.missedAt ? `Missed at ${d.missedAt}` : 'Awaiting confirmation'}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-right">
                      {d.status === 'pending' ? (
                        <Button variant="outline" size="sm" onClick={() => markDoseTaken(d.id)}>
                          Take
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => resetDoseStatus(d.id)}>
                          Undo
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* EDIT REMINDER MODAL */}
      {editingReminder && (
        <Modal
          isOpen={!!editingReminder}
          onClose={() => setEditingReminder(null)}
          title={`Configure Reminders: ${editingReminder.medicationName}`}
        >
          <form onSubmit={handleSaveReminderPreferences} className="space-y-4 text-xs">
            {/* Prescribed Dose Guarantee Notice */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  🔒 Prescribed Dosage: {editingReminder.prescribedDosage}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Frequency: {editingReminder.prescribedFrequency} · {editingReminder.duration}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-mono">
                Locked Dose
              </span>
            </div>

            {/* Notification Times */}
            <div className="space-y-3">
              <label className="font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wider text-[11px]">
                Customize Scheduled Reminder Alert Times
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {editingReminder.reminderTimes?.morning && (
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      Morning Alert Time
                    </label>
                    <input
                      type="text"
                      value={editingReminder.morningTime}
                      onChange={(e) => setEditingReminder({ ...editingReminder, morningTime: e.target.value })}
                      placeholder="e.g. 08:30 AM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 font-mono text-xs font-bold"
                    />
                  </div>
                )}

                {editingReminder.reminderTimes?.afternoon && (
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      Afternoon Alert Time
                    </label>
                    <input
                      type="text"
                      value={editingReminder.afternoonTime}
                      onChange={(e) => setEditingReminder({ ...editingReminder, afternoonTime: e.target.value })}
                      placeholder="e.g. 01:30 PM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 font-mono text-xs font-bold"
                    />
                  </div>
                )}

                {editingReminder.reminderTimes?.evening && (
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      Evening Alert Time
                    </label>
                    <input
                      type="text"
                      value={editingReminder.eveningTime}
                      onChange={(e) => setEditingReminder({ ...editingReminder, eveningTime: e.target.value })}
                      placeholder="e.g. 08:30 PM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 font-mono text-xs font-bold"
                    />
                  </div>
                )}

                {editingReminder.reminderTimes?.bedtime && (
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      Bedtime Alert Time
                    </label>
                    <input
                      type="text"
                      value={editingReminder.bedtimeTime}
                      onChange={(e) => setEditingReminder({ ...editingReminder, bedtimeTime: e.target.value })}
                      placeholder="e.g. 10:00 PM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 font-mono text-xs font-bold"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Channels & WhatsApp Phone */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                Notification Delivery Channels
              </span>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingReminder.whatsappEnabled}
                  onChange={(e) => setEditingReminder({ ...editingReminder, whatsappEnabled: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  Dispatch WhatsApp Business reminder message
                </span>
              </label>

              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                  Recipient WhatsApp Mobile Number
                </label>
                <input
                  type="text"
                  value={editingReminder.whatsappPhone}
                  onChange={(e) => setEditingReminder({ ...editingReminder, whatsappPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={() => setEditingReminder(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save Reminder Preferences
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* DRUG INFORMATION MODAL */}
      <MedicineInfoModal
        isOpen={!!selectedMedicineForInfo}
        onClose={() => setSelectedMedicineForInfo(null)}
        medicineName={selectedMedicineForInfo?.name}
        prescribedDosage={selectedMedicineForInfo?.dosage}
        doctorName={selectedMedicineForInfo?.doctorName}
      />
    </div>
  );
}

