import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Users,
  Stethoscope,
  Sparkles,
  Printer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Eye,
  Award,
  ArrowRight
} from 'lucide-react';
import { DEMO_TREATMENT_OPTIONS_COMPARISON } from '../../demo-data/clinicalComparisonData';
import { useApp } from '../../context/AppContext';

export function SharedDecisionMaking() {
  const { showToast } = useApp();
  const [viewMode, setViewMode] = useState('patient_presentation'); // 'doctor' | 'patient_presentation'
  const [selectedOption, setSelectedOption] = useState('opt-a');

  const { condition, patientName, options } = DEMO_TREATMENT_OPTIONS_COMPARISON;
  const optA = options[0];
  const optB = options[1];

  const handleSelectOption = (optId) => {
    setSelectedOption(optId);
    showToast(`Shared decision logged: Selected ${optId === 'opt-a' ? 'Option A' : 'Option B'}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-blue-200" />
            Patient-Physician Collaborative Consultation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Shared Decision-Making Screen
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Review therapeutic pathways side-by-side with {patientName} to align clinical evidence with personal patient preferences.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          {/* Mode Switcher */}
          <div className="bg-white/15 backdrop-blur-md p-1 rounded-2xl border border-white/20 flex items-center">
            <button
              type="button"
              onClick={() => setViewMode('patient_presentation')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'patient_presentation'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Patient Screen View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('doctor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'doctor'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Clinical View
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

      {/* Condition Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Clinical Subject</span>
          <span className="font-extrabold text-slate-900 dark:text-white text-sm">{condition}</span>
        </div>
        <Badge variant="primary" size="md">
          Patient: {patientName}
        </Badge>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OPTION A */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-5 ${
            selectedOption === 'opt-a'
              ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500 shadow-md ring-2 ring-emerald-400/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="success" size="md">
                {optA.recommendationLevel}
              </Badge>
              {selectedOption === 'opt-a' && (
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Agreed Pathway
                </span>
              )}
            </div>

            <div>
              <h3 className={`font-black text-slate-900 dark:text-white ${viewMode === 'patient_presentation' ? 'text-xl' : 'text-base'}`}>
                {optA.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {optA.tagline}
              </p>
            </div>

            {/* Expected Benefits */}
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Expected Clinical Benefits
              </span>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {optA.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations & Considerations */}
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Limitations & Monitoring
              </span>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {optA.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Patient Preference Alignment */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Patient Preference Fit
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">{optA.patientPreferencesMatch}</p>
            </div>
          </div>

          <Button
            variant={selectedOption === 'opt-a' ? 'primary' : 'outline'}
            size="md"
            onClick={() => handleSelectOption('opt-a')}
            className={`w-full font-bold ${selectedOption === 'opt-a' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
          >
            {selectedOption === 'opt-a' ? 'Selected & Agreed Protocol ✓' : 'Select Option A Protocol'}
          </Button>
        </div>

        {/* OPTION B */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-5 ${
            selectedOption === 'opt-b'
              ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-500 shadow-md ring-2 ring-blue-400/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" size="md">
                {optB.recommendationLevel}
              </Badge>
              {selectedOption === 'opt-b' && (
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Agreed Pathway
                </span>
              )}
            </div>

            <div>
              <h3 className={`font-black text-slate-900 dark:text-white ${viewMode === 'patient_presentation' ? 'text-xl' : 'text-base'}`}>
                {optB.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {optB.tagline}
              </p>
            </div>

            {/* Expected Benefits */}
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Expected Clinical Benefits
              </span>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {optB.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations & Considerations */}
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Limitations & Monitoring
              </span>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {optB.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Patient Preference Alignment */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Patient Preference Fit
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">{optB.patientPreferencesMatch}</p>
            </div>
          </div>

          <Button
            variant={selectedOption === 'opt-b' ? 'primary' : 'outline'}
            size="md"
            onClick={() => handleSelectOption('opt-b')}
            className={`w-full font-bold ${selectedOption === 'opt-b' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            {selectedOption === 'opt-b' ? 'Selected & Agreed Protocol ✓' : 'Select Option B Protocol'}
          </Button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Shared Decision Making Protocol
          </span>
          All comparative options are authored by the attending physician for structured patient discussion. No automated algorithms determine patient clinical treatment.
        </div>
      </div>
    </div>
  );
}

