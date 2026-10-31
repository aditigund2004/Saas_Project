import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Pill,
  Calendar,
  Sparkles,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function CareContinuityTracker({ patientName = 'Aarav Patel', role = 'doctor' }) {
  const { showToast } = useApp();

  const [careSteps, setCareSteps] = useState([
    {
      id: 'step-1',
      title: 'Consultation Finalized',
      subtitle: 'Dr. Aarav Mehta (CityCare Family Practice)',
      date: '2026-10-27',
      status: 'completed',
      category: 'Clinical Visit',
      notes: 'Initial clinical assessment concluded with Stage 1 Hypertension protocol.'
    },
    {
      id: 'step-2',
      title: 'Digital Prescription Issued & Signed',
      subtitle: 'Telmisartan 20mg (30-day course) & CoQ10',
      date: '2026-10-27',
      status: 'completed',
      category: 'Pharmacy',
      notes: 'Dispensed and QR-verified via partner pharmacy.'
    },
    {
      id: 'step-3',
      title: 'Recommended Diagnostic Tests',
      subtitle: 'Lipid Panel & 12-Lead ECG Evaluation',
      date: '2026-10-20',
      status: 'completed',
      category: 'Diagnostics',
      notes: 'Metropolis Diagnostics panel submitted. Cholesterol 198 mg/dL, normal ECG.'
    },
    {
      id: 'step-4',
      title: 'Remote Blood Pressure Home Logging',
      subtitle: '3x Weekly Morning Measurements',
      date: 'Ongoing this month',
      status: 'in_progress',
      category: 'Self-Monitoring',
      notes: 'Patient logging 128/82 mmHg via Medication Day Planner.'
    },
    {
      id: 'step-5',
      title: 'Cardiology Specialist Referral (Optional Review)',
      subtitle: 'Dr. Rohan Deshmukh (HeartWell Cardiology)',
      date: 'Pending patient review',
      status: 'pending',
      category: 'Specialist Referral',
      notes: 'Second Opinion Pack prepared for exercise-induced tachycardia consultation.'
    },
    {
      id: 'step-6',
      title: '30-Day Medication & Lifestyle Review',
      subtitle: 'Follow-Up Consultation with Dr. Aarav Mehta',
      date: 'Due: 2026-11-27',
      status: 'pending',
      category: 'Follow-Up',
      notes: 'Check potassium, blood pressure stability, and exercise tolerance.'
    }
  ]);

  const handleToggleStep = (stepId) => {
    setCareSteps((prev) =>
      prev.map((s) => {
        if (s.id === stepId) {
          const nextStatus = s.status === 'completed' ? 'in_progress' : 'completed';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    showToast('Care continuity milestone updated');
  };

  const completedCount = careSteps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / careSteps.length) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-blue-200" />
              Connected Care Pathway
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Care Continuity Tracker
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              End-to-end clinical journey for {patientName}: from initial consultation through diagnostics, medication adherence, and follow-up milestones.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[190px]">
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
              Care Pathway Completion
            </span>
            <div className="text-3xl font-black text-white mt-0.5">
              {progressPercent}%
            </div>
            <span className="text-xs text-blue-100">
              {completedCount} of {careSteps.length} milestones reached
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

      {/* Visual Pathway Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Longitudinal Clinical Pathway Milestones
            </h3>
            <p className="text-xs text-slate-500">
              {role === 'doctor' ? 'Click any milestone status to advance clinical workflow state.' : 'Track your remaining health steps and follow-up schedules.'}
            </p>
          </div>
          <Badge variant="primary" size="sm">
            Active Care Episode
          </Badge>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-900/60 space-y-6">
          {careSteps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';

            return (
              <div key={step.id} className="relative group">
                {/* Node icon */}
                <div
                  onClick={() => role === 'doctor' && handleToggleStep(step.id)}
                  className={`absolute -left-[31px] sm:-left-[39px] top-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center shadow-xs transition-transform ${
                    isDone
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : isInProgress
                      ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-950 dark:text-blue-300 animate-pulse'
                      : 'bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-800'
                  } ${role === 'doctor' ? 'cursor-pointer hover:scale-110' : ''}`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : isInProgress ? (
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                      : isInProgress
                      ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-xs'
                      : 'bg-slate-50/60 dark:bg-slate-850 border-slate-200 dark:border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant={isDone ? 'success' : isInProgress ? 'primary' : 'neutral'}
                          size="sm"
                        >
                          {isDone ? 'Completed' : isInProgress ? 'In Progress' : 'Pending Action'}
                        </Badge>
                        <span className="text-[11px] font-bold text-slate-400">{step.category}</span>
                        <span className="text-[10px] text-slate-400">· {step.date}</span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {step.subtitle}
                      </p>
                      <p className="text-[11px] text-slate-500 pt-0.5">{step.notes}</p>
                    </div>

                    {role === 'doctor' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStep(step.id)}
                        className="text-xs font-bold self-start sm:self-center shrink-0"
                      >
                        {isDone ? 'Reopen Step' : 'Mark Completed ✓'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

