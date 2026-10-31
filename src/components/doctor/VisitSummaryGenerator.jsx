import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  FileText,
  Printer,
  Sparkles,
  Stethoscope,
  Heart,
  Pill,
  Calendar,
  CheckCircle2,
  Building2,
  Share2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function VisitSummaryGenerator({ encounter, appointment, onComplete }) {
  const { currentUser, activeClinic, showToast, isPatientFriendlyMode } = useApp();

  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'doctor'

  // Underlying data
  const patientName = encounter?.patientName || appointment?.patientName || 'Aarav Patel';
  const doctorName = encounter?.doctorName || appointment?.doctorName || 'Dr. Aarav Mehta';
  const clinicName = activeClinic?.name || 'CityCare Family Clinic';
  const diagnosis = encounter?.diagnosis || 'Stage 1 Essential Hypertension & Sinus Tachycardia post-exertion';
  const treatmentPlan = encounter?.treatmentPlan || 'Lifestyle modifications, low-sodium DASH diet, 30 min daily brisk walking, morning Telmisartan 20mg.';
  const vitals = encounter?.vitals || { bp: '128/82 mmHg', pulse: '72 bpm', temp: '98.6 °F', weight: '71.5 kg' };
  const medications = encounter?.medications || [
    { name: 'Telmisartan 20mg', instructions: '1 tablet once daily morning after breakfast', duration: '30 days' },
    { name: 'CoQ10 100mg', instructions: '1 softgel daily after lunch', duration: '30 days' }
  ];
  const followUpDate = encounter?.followUpDate || '2026-11-27 (In 4 weeks)';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            Dual-Audience Clinical Summarizer
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Consultation-to-Patient Summary Generator
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Concurrently generates formal clinical records for electronic medical files and patient-friendly instructions for {patientName}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          {/* Tab Selector */}
          <div className="bg-white/15 backdrop-blur-md p-1 rounded-2xl border border-white/20 flex items-center">
            <button
              type="button"
              onClick={() => setActiveTab('patient')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'patient'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Patient-Friendly Summary
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('doctor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'doctor'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Clinical Record
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold"
          >
            <Printer className="w-3.5 h-3.5 mr-1" /> Print Summary
          </Button>
        </div>
      </div>

      {/* Main Rendered Document Box (Printable Area) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {activeTab === 'patient' ? 'Patient Care Takeaway Summary' : 'Physician Official Encounter Record'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeTab === 'patient' ? `Visit Summary for ${patientName}` : `Clinical Encounter #${encounter?.id || 'ENC-2026-881'}`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Consulting Clinician: {doctorName} · {clinicName} · Date: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Badge variant={activeTab === 'patient' ? 'success' : 'primary'} size="md">
            {activeTab === 'patient' ? 'Patient Copy' : 'Medical Records Copy'}
          </Badge>
        </div>

        {/* VIEW 1: PATIENT-FRIENDLY SUMMARY */}
        {activeTab === 'patient' && (
          <div className="space-y-6">
            {/* What Happened In Plain English */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 text-xs leading-relaxed space-y-1.5">
              <span className="font-extrabold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What We Reviewed Today
              </span>
              <p>
                We reviewed your blood pressure readings and the mild heart fluttering you noticed after evening workouts. Your resting blood pressure today was <strong>{vitals.bp}</strong> with a steady pulse of <strong>{vitals.pulse}</strong>, which shows great improvement compared to your previous visit.
              </p>
            </div>

            {/* What the Doctor Advised */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
                What Your Doctor Recommends
              </h4>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {treatmentPlan}
              </div>
            </div>

            {/* Medication Instructions in Plain Steps */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
                Your Medicines & Simple Instructions
              </h4>
              <div className="space-y-2">
                {medications.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 flex items-start gap-3 text-xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{m.name || m.drugName}</span>
                      <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5">{m.instructions}</p>
                      <span className="text-[10px] text-slate-400">Prescribed course: {m.duration || '30 days'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps & Follow Up */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-blue-900 dark:text-blue-200 text-xs block">
                  Next Follow-Up Appointment
                </span>
                <span className="text-blue-700 dark:text-blue-300">
                  Scheduled for {followUpDate} with {doctorName}
                </span>
              </div>
              <Badge variant="primary" size="md">
                Follow-up Booked ✓
              </Badge>
            </div>
          </div>
        )}

        {/* VIEW 2: DOCTOR CLINICAL RECORD */}
        {activeTab === 'doctor' && (
          <div className="space-y-5 text-xs">
            {/* Vitals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(vitals).map(([k, v]) => (
                <div key={k} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{k}</span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs">{v}</span>
                </div>
              ))}
            </div>

            {/* Clinical Diagnosis */}
            <div>
              <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                Clinical Diagnosis (ICD-11 / SNOMED)
              </span>
              <p className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200 font-bold">
                {diagnosis}
              </p>
            </div>

            {/* Clinical Findings */}
            <div>
              <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                Objective Examination & Auscultation
              </span>
              <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed">
                Cardiovascular: S1/S2 heard normal, regular rate & rhythm. No murmurs, clicks, or gallop. Chest: Vesicular breath sounds bilaterally, no crepitations or rhonchi. Abdomen: Soft, non-tender.
              </p>
            </div>

            {/* Prescribed Regimen */}
            <div>
              <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                Prescribed Drug Formulary
              </span>
              <div className="space-y-1.5">
                {medications.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 flex justify-between">
                    <span className="font-bold text-slate-900">{m.name || m.drugName}</span>
                    <span className="text-slate-500">{m.instructions}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan */}
            <div>
              <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                Treatment & Continuity Plan
              </span>
              <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                {treatmentPlan}
              </p>
            </div>
          </div>
        )}

        {/* Footer Validation */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
          <span>Electronically Signed & Authenticated by {doctorName} (Reg #MCI-44910)</span>
          <span>ClinicOS Health Journey Integrated</span>
        </div>
      </div>
    </div>
  );
}

