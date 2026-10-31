import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronRight, ChevronLeft, Check, HelpCircle } from 'lucide-react';
import { useAuth, toAuthRole } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export function RoleProductTour() {
  const auth = useAuth();
  const app = useApp();
  const role = auth?.user?.role || toAuthRole(app?.currentRole) || 'patient';
  const storageKey = `clinicos_tour_completed_${role}`;

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Check if tour was previously completed
  useEffect(() => {
    try {
      const completed = localStorage.getItem(storageKey);
      if (!completed) {
        // Automatically open for first-time visitors with a gentle delay
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, [storageKey]);

  // Steps customized for the 4 roles
  const steps = React.useMemo(() => {
    if (role === 'doctor_admin' || role === 'clinic_admin') {
      return [
        {
          title: 'Welcome to ClinicOS Doctor & Admin Workspace',
          description: 'This is your complete clinical command center. Here you can manage live consultations, patient waiting queues, prescriptions, and clinic operations.',
          highlight: 'Command Center'
        },
        {
          title: 'Global Command Palette (Ctrl+K / Cmd+K)',
          description: 'Press Ctrl+K anytime to search patients, jump to any clinical workflow, or execute quick actions without touching your mouse.',
          highlight: 'Keyboard Navigation'
        },
        {
          title: 'Clinical Consultation Chamber with AI & Voice Dictation',
          description: 'Prescribe medications with automated drug-drug interaction & allergy safety checks, or use real-time speech dictation (en-IN) to record complaints and findings.',
          highlight: 'EHR & Prescription CDSS'
        },
        {
          title: 'Real-Time Cross-Tab Queue Synchronization',
          description: 'Open the Receptionist dashboard in another browser tab and check in a patient. Your queue and appointments update automatically via BroadcastChannel.',
          highlight: 'Instant Live Sync'
        }
      ];
    }

    if (role === 'receptionist_manager' || role === 'receptionist') {
      return [
        {
          title: 'Welcome to Clinic Front-Desk Cockpit',
          description: 'Streamline patient registrations, waiting queues, and doctor scheduling from a unified reception console.',
          highlight: 'Front-Desk Operations'
        },
        {
          title: 'Express Walk-In Ticketing (<30 Seconds)',
          description: 'Register arriving patients rapidly and issue sequential queue tokens (#W-104) with thermal receipt printing.',
          highlight: 'Rapid Intake'
        },
        {
          title: 'Interactive Conflict-Guarded Booking',
          description: 'Schedule appointments with real-time double-booking prevention. Slot collisions are flagged instantly.',
          highlight: 'Smart Scheduling'
        }
      ];
    }

    if (role === 'superadmin') {
      return [
        {
          title: 'Welcome to SaaS Platform Superadmin',
          description: 'Manage clinic tenants, subscription plans, MRR/ARR financial trends, and platform telemetry across all clinics.',
          highlight: 'Multi-Tenant SaaS'
        },
        {
          title: 'Affiliate & Referral Commission Engine',
          description: 'Track referral codes, commission rules, partner conversions, and manage automated affiliate payouts.',
          highlight: 'Growth & Affiliates'
        },
        {
          title: 'Corporate SaaS Finance Suite',
          description: 'Review B2B platform subscription invoices, recurring MRR ledgers, and operational SaaS expenses.',
          highlight: 'SaaS Accounting'
        }
      ];
    }

    // Patient Portal
    return [
      {
        title: 'Welcome to Your Patient Health Portal',
        description: 'Easily book appointments with verified specialists, view clinical visit records, and access digital prescriptions.',
        highlight: 'Patient Self-Service'
      },
      {
        title: 'Multilingual Support (English, Hindi, Marathi)',
        description: 'Switch between English, हिंदी (Hindi), and मराठी (Marathi) to view your prescriptions and appointment notices in your preferred language.',
        highlight: 'Trilingual Portal'
      },
      {
        title: 'Interactive Vitals & Health Charts',
        description: 'Track your blood pressure, heart rate, body temperature, and blood oxygen levels over time with reference indicators.',
        highlight: 'Health Analytics'
      }
    ];
  }, [role]);

  const handleFinish = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(storageKey, 'true');
    } catch {}
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={handleRestart}
        className="fixed bottom-5 left-5 z-40 p-2.5 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all flex items-center space-x-1.5 text-xs font-bold"
        title="Start Guided Product Tour"
      >
        <Sparkles className="w-4 h-4" />
        <span className="hidden sm:inline">Product Tour</span>
      </button>
    );
  }

  const step = steps[currentStep] || steps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-blue-200 dark:border-blue-900 max-w-md w-full p-6 space-y-4 relative">
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          aria-label="Close Tour"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs font-bold text-slate-400">{step.highlight}</span>
        </div>

        {/* Title & Body */}
        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
            {step.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center space-x-1.5 py-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStep
                  ? 'w-6 bg-blue-600'
                  : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleFinish}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
          >
            Skip Walkthrough
          </button>

          <div className="flex items-center space-x-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-0.5" /> Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center shadow-sm"
              >
                Next <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center shadow-sm"
              >
                <Check className="w-4 h-4 mr-1" /> Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

