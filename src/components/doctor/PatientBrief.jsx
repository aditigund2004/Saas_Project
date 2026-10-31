import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Stethoscope,
  AlertTriangle,
  Clock,
  Heart,
  Pill,
  HelpCircle,
  FileText,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function PatientBrief({ appointmentId, onStartConsultation }) {
  const navigate = useNavigate();
  const {
    appointments = [],
    patients = [],
    encounters = [],
    visitBriefs = {},
    prescriptions = [],
    updateAppointmentStatus
  } = useApp();

  const apt =
    appointments.find((a) => a.id === appointmentId) ||
    appointments.find((a) => a.status === 'Checked In' || a.status === 'Patient Checked In' || a.status === 'In Progress' || a.status === 'In Consultation') ||
    appointments[0];

  const patient = patients.find((p) => p.id === apt?.patientId) || patients[0];
  const patientBrief = visitBriefs[apt?.id] || visitBriefs['apt-101'] || null;
  const pastEncounters = encounters.filter((e) => e.patientId === patient?.id);
  const latestEncounter = pastEncounters[0];

  const [expandedSections, setExpandedSections] = useState({
    reason: true,
    allergies: true,
    patientQuestions: true,
    vitals: true,
    history: false
  });

  const toggleSection = (sec) => {
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleStartConsultation = () => {
    if (apt) {
      updateAppointmentStatus(apt.id, 'In Consultation');
    }
    if (onStartConsultation) {
      onStartConsultation(apt);
    } else {
      navigate(`/clinic/consultations/${apt?.id || 'apt-101'}`);
    }
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Header Bar with Action */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 rounded-3xl shadow-xl border border-blue-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-black shrink-0 border-2 border-white/20 shadow-md">
              {patient?.name ? patient.name.slice(0, 2).toUpperCase() : 'AP'}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  Doctor's 60-Second Clinical Briefing
                </span>
                <Badge variant="primary" size="sm" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  Token: {apt?.queueNumber || 'Token #12'}
                </Badge>
                <Badge
                  variant={apt?.status === 'Checked In' ? 'success' : 'outline'}
                  size="sm"
                  className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                >
                  {apt?.status || 'Checked In'}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {patient?.name || 'Aarav Patel'}
              </h1>

              <div className="text-xs text-blue-100 flex flex-wrap gap-x-3 gap-y-0.5 pt-1">
                <span>Age: <strong>34 Yrs</strong></span>
                <span>Gender: <strong>Male</strong></span>
                <span>Blood: <strong className="text-rose-300">B+</strong></span>
                <span>Phone: <strong>{patient?.phone || '+91 98765 43210'}</strong></span>
                <span>Visit Type: <strong className="text-emerald-300">{apt?.serviceName || 'General Follow-up'}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartConsultation}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-lg shadow-emerald-500/30 text-sm px-5 py-3 cursor-pointer"
            >
              <Play className="w-4 h-4 mr-2 fill-current" /> Start Consultation Chamber
            </Button>
          </div>
        </div>
      </div>

      {/* Critical Allergy & Safety High-Alert Banner */}
      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-400 dark:border-rose-800 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5 animate-pulse" />
        <div className="space-y-0.5 text-xs">
          <span className="font-extrabold text-rose-900 dark:text-rose-200 uppercase tracking-wider text-[11px] block">
            Critical Clinical Alerts & Drug Contraindications
          </span>
          <div className="flex flex-wrap gap-2 pt-0.5">
            <Badge variant="warning" size="sm" className="bg-rose-600 text-white font-extrabold text-xs">
              ⚠️ ALLERGY: Penicillin (Severe Hives & Anaphylaxis Risk)
            </Badge>
            <Badge variant="warning" size="sm" className="bg-rose-500 text-white font-bold text-xs">
              ⚠️ ALLERGY: Sulfa Drugs (Erythema Multiforme)
            </Badge>
          </div>
        </div>
      </div>

      {/* 2-Column Clinical Density Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (Primary Presenting Brief & Patient Questions) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Reason for Today's Visit */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" /> Chief Complaint & Visit Purpose
              </span>
              <Badge variant="primary" size="sm">
                Patient Stated
              </Badge>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              "{patientBrief?.reasonForVisit || apt?.notes || 'Follow-up for mild blood pressure reading and occasional evening heart flutter after workouts.'}"
            </p>

            {patientBrief?.anatomyAnnotations && Object.keys(patientBrief.anatomyAnnotations).length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Targeted Body Region Logged
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.values(patientBrief.anatomyAnnotations).map((a, i) => (
                    <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <strong>{a.regionName}</strong>: {a.notes} ({a.severity})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Patient-Prepared Questions (From Before My Visit A2) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Patient-Prepared Questions ({patientBrief?.patientQuestions?.length || 3})
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Captured pre-visit
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {(patientBrief?.patientQuestions || [
                'Is my current blood pressure reading within the target range for my age group?',
                'Can I continue high-intensity cardio exercises or should I stay with brisk walking?',
                'Do I need to repeat my 2D Echocardiogram or lipid profile this quarter?'
              ]).map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 text-purple-950 dark:text-purple-200 flex items-start gap-2.5 font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Past Clinical Encounter Recap */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" /> Previous Encounter Summary (Last Visit)
            </span>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Dr. Aarav Mehta (CityCare Family Clinic)</span>
                <span className="text-slate-400 font-normal">2026-10-15</span>
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-semibold text-[11px]">
                Diagnosis: Stage 1 Essential Hypertension (diet-responsive)
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                Advised low-sodium DASH regimen, 30 min brisk daily walking. Started morning Telmisartan 20mg.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Vitals Snapshot, Current Meds, Reports) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Recent Vitals Strip */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Heart className="w-4 h-4" /> Recent Vital Signs
              </span>
              <span className="text-[10px] text-slate-400">Recorded Today</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Blood Pressure</span>
                <span className="text-base font-black text-rose-600 dark:text-rose-400">128/82</span>
                <span className="text-[9px] text-slate-500 block">mmHg (Optimal)</span>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Heart Rate</span>
                <span className="text-base font-black text-blue-600 dark:text-blue-400">72</span>
                <span className="text-[9px] text-slate-500 block">bpm (Regular)</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Weight / BMI</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">71.5 kg</span>
                <span className="text-[9px] text-slate-500 block">BMI: 23.4 (Normal)</span>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Oxygen SpO2</span>
                <span className="text-base font-black text-purple-600 dark:text-purple-400">99%</span>
                <span className="text-[9px] text-slate-500 block">Room air</span>
              </div>
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Pill className="w-4 h-4" /> Active Medication Regimen
            </span>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Telmisartan 20mg</span>
                  <span className="text-slate-400 block text-[11px]">1 Tab Daily (Morning post breakfast)</span>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">CoQ10 100mg</span>
                  <span className="text-slate-400 block text-[11px]">1 Softgel Daily (Post Lunch)</span>
                </div>
                <Badge variant="outline" size="sm">Cardioprotective</Badge>
              </div>
            </div>
          </div>

          {/* Relevant Diagnostic Labs */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-500" /> Recent Lab Reports (20-Oct-2026)
            </span>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Metropolis Lipid Panel</span>
                <span className="text-slate-500 text-[11px]">Cholesterol: 198 | LDL: 122 | HbA1c: 5.6%</span>
              </div>
              <Badge variant="success" size="sm">Verified</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

