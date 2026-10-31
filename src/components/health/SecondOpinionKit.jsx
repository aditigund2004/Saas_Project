import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  FileText,
  Printer,
  Sparkles,
  Stethoscope,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Download,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SecondOpinionKit() {
  const { currentUser, prescriptions, appointments, encounters, showToast } = useApp();

  const [includedSections, setIncludedSections] = useState({
    consultationSummary: true,
    diagnoses: true,
    prescriptions: true,
    labReports: true,
    customQuestions: true
  });

  const [specialistQuestions, setSpecialistQuestions] = useState([
    'Do you agree with the diagnosis of Stage 1 Essential Hypertension and sinus tachycardia?',
    'Are there alternative non-pharmacological therapies or dietary protocols you would suggest?',
    'Would a stress echocardiogram or 24-hour ambulatory Holter monitor be advisable in this case?'
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  const toggleSection = (key) => {
    setIncludedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    setSpecialistQuestions((prev) => [...prev, newQuestion.trim()]);
    setNewQuestion('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Stethoscope className="w-3.5 h-3.5 text-blue-200" />
            Specialist Referral & Second Opinion Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Second Opinion Preparation Kit
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Bundle your verified clinical summaries, diagnoses, lab investigations, and key specialist questions into a professional, printable second-opinion dossier.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => window.print()}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold self-start md:self-center"
        >
          <Printer className="w-4 h-4 mr-1.5" /> Print Second Opinion Pack
        </Button>
      </div>

      {/* Assembly Checklist */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
          Customize Sections to Include in Dossier
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-semibold">
          {[
            { id: 'consultationSummary', label: 'Consultation Summary' },
            { id: 'diagnoses', label: 'Recorded Diagnoses' },
            { id: 'prescriptions', label: 'Prescriptions' },
            { id: 'labReports', label: 'Diagnostic Labs' },
            { id: 'customQuestions', label: 'Specialist Questions' }
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => toggleSection(sec.id)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                includedSections[sec.id]
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {includedSections[sec.id] ? '✓ ' : '+ '}
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Second Opinion Dossier Preview (Printable View) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Dossier Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Independent Clinical Review Dossier
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Patient Case Packet: {currentUser?.name || 'Aarav Patel'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Primary Physician: Dr. Aarav Mehta (CityCare Family Clinic) · Age: 34 · Blood Group: B+
            </p>
          </div>
          <Badge variant="primary" size="md">
            Prepared for External Specialist
          </Badge>
        </div>

        {/* Section 1: Diagnoses & Clinical Encounter */}
        {includedSections.diagnoses && (
          <div className="space-y-2">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
              1. Primary Diagnoses & Presenting Complaint
            </h4>
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">
                Stage 1 Essential Hypertension (diet responsive) with post-exertional sinus tachycardia
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Patient experiences mild evening flutter after 30-min brisk runs. Resting blood pressure in clinic: 128/82 mmHg. Pulse 72 bpm. Normal S1/S2 heart sounds, no murmur.
              </p>
            </div>
          </div>
        )}

        {/* Section 2: Current Prescriptions */}
        {includedSections.prescriptions && (
          <div className="space-y-2">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
              2. Ongoing Pharmacological Protocol
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <span className="font-bold text-slate-900 dark:text-white block">Telmisartan 20mg</span>
                <span className="text-slate-500 text-[11px]">1 Tablet Daily Morning · Started 4 months ago</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <span className="font-bold text-slate-900 dark:text-white block">Coenzyme Q10 100mg</span>
                <span className="text-slate-500 text-[11px]">1 Softgel Daily Post Lunch · Cardioprotective supplement</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Diagnostic Lab Parameters */}
        {includedSections.labReports && (
          <div className="space-y-2">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
              3. Recent Investigations Summary (20-Oct-2026)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">Total Cholesterol</span>
                <span className="font-extrabold text-slate-900 dark:text-white">198 mg/dL</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">LDL-C</span>
                <span className="font-extrabold text-blue-600">122 mg/dL</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">HbA1c</span>
                <span className="font-extrabold text-emerald-600">5.6%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">Resting BP</span>
                <span className="font-extrabold text-slate-900 dark:text-white">128/82 mmHg</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Questions for Second Opinion Doctor */}
        {includedSections.customQuestions && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
              4. Key Questions Prepared for the Consulting Specialist
            </h4>
            <div className="space-y-2 text-xs">
              {specialistQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">{q}</p>
                </div>
              ))}
            </div>

            {/* Add question inline */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add another question for the second opinion specialist..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <Button variant="outline" size="sm" onClick={handleAddQuestion} className="font-bold">
                Add
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
          <span>Prepared via ClinicOS Connected Patient Portal</span>
          <span>Authenticity Verified · Ready for Physical or Digital Review</span>
        </div>
      </div>
    </div>
  );
}

