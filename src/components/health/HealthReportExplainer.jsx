import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  FileText,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Info,
  Calendar,
  Building2,
  Stethoscope
} from 'lucide-react';
import { DEMO_REPORT_EXPLANATIONS } from '../../demo-data/reportExplanationData';
import { useApp } from '../../context/AppContext';

export function HealthReportExplainer() {
  const { isPatientFriendlyMode } = useApp();
  const [selectedReportId, setSelectedReportId] = useState(DEMO_REPORT_EXPLANATIONS[0].id);
  const [displayMode, setDisplayMode] = useState('simple'); // 'medical' | 'simple'

  const activeReport = DEMO_REPORT_EXPLANATIONS.find((r) => r.id === selectedReportId) || DEMO_REPORT_EXPLANATIONS[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-200" />
              Educational Patient Literacy Guide
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Explain My Health Report
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Translate dense medical terminology and lab parameters into clear, reassuring everyday language with questions prepared for your doctor.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex items-center self-start md:self-center">
            <button
              type="button"
              onClick={() => setDisplayMode('simple')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                displayMode === 'simple'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Easy-to-Understand
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('medical')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                displayMode === 'medical'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Medical Terminology
            </button>
          </div>
        </div>
      </div>

      {/* Select Report Pill Tabs */}
      <div className="flex flex-wrap gap-2">
        {DEMO_REPORT_EXPLANATIONS.map((rep) => (
          <button
            key={rep.id}
            type="button"
            onClick={() => setSelectedReportId(rep.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-2 ${
              selectedReportId === rep.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{rep.title}</span>
          </button>
        ))}
      </div>

      {/* Active Report Header & Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary" size="sm">
                {activeReport.category}
              </Badge>
              <span className="text-[11px] text-slate-400 font-semibold">
                {activeReport.lab} · {activeReport.date}
              </span>
            </div>
            <h3 className={`font-black text-slate-900 dark:text-white ${isPatientFriendlyMode ? 'text-2xl' : 'text-xl'}`}>
              {activeReport.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Mode: {displayMode === 'simple' ? 'Plain Everyday Language' : 'Clinical Medical Standards'}
            </span>
          </div>
        </div>

        {/* Big Reassuring Summary Box */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            displayMode === 'simple'
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100'
              : 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/80 text-blue-950 dark:text-blue-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-extrabold text-sm">
              {displayMode === 'simple' ? 'Takeaway Summary in Plain Words' : 'Clinical Diagnostic Interpretation'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            {displayMode === 'simple' ? activeReport.summarySimple : activeReport.summaryMedical}
          </p>
        </div>

        {/* Detailed Parameters Breakdown */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider text-xs">
            Individual Test Parameters & Educational Meanings
          </h4>

          <div className="space-y-3">
            {activeReport.parameters.map((param, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 hover:border-blue-300 transition-all text-xs space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                      {param.name}
                    </span>
                    <Badge
                      variant={
                        param.status.includes('Optimal') || param.status.includes('Normal') || param.status.includes('Good')
                          ? 'success'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {param.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Your Value</span>
                      <span className="font-black text-blue-600 dark:text-blue-400 text-sm">
                        {param.value}
                      </span>
                    </div>
                    <div className="border-l border-slate-200 dark:border-slate-700 pl-3">
                      <span className="text-[10px] text-slate-400 block font-semibold">Target Range</span>
                      <span className="font-bold text-slate-600 dark:text-slate-300 text-xs">
                        {param.normalRange}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Explanation text toggled */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs pt-1">
                  {displayMode === 'simple' ? param.simpleDesc : param.medicalDesc}
                </p>

                {/* Suggested prompt for doctor */}
                {param.questionsForDoctor && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-blue-600 dark:text-blue-400 font-semibold">Ask your doctor: </strong>
                      "{param.questionsForDoctor}"
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Questions to Ask Doctor */}
        {activeReport.doctorQuestions && (
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-2">
            <h4 className="font-extrabold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Recommended Follow-Up Questions For Your Doctor
            </h4>
            <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
              {activeReport.doctorQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="font-medium">{q}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explicit Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Educational Disclaimer & Non-Diagnostic Boundary
          </span>
          This explainer provides predefined educational definitions to help patients understand common clinical lab vocabulary. It is not an artificial intelligence diagnostic engine, does not interpret symptoms, and does not replace the professional clinical judgment of your licensed physician.
        </div>
      </div>
    </div>
  );
}

