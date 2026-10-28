import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Stethoscope, Clock, CheckCircle2, Building2, HelpCircle } from 'lucide-react';
import { MedicalMotionBackground } from '../../components/layout/MedicalMotionBackground';

export function AuthLayout({
  title,
  subtitle,
  children,
  badgeText = 'Healthcare SaaS Platform',
  featureHighlights = [
    'Unified access across 5 specialty clinic networks',
    'Real-time doctor slot availability & conflict prevention',
    'Tamper-evident digital prescriptions with QR verification',
    'Zero backend requirement — 100% interactive client prototype'
  ]
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col justify-between text-slate-800 dark:text-slate-100 transition-colors relative overflow-hidden">
      <MedicalMotionBackground variant="auth" />
      <div className="relative z-10 flex flex-col justify-between flex-1">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left Column: Branding, Value Prop & Live System Highlights (Desktop) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Background Accent Graphics */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-white">
                    Clinic<span className="text-blue-400">OS</span>
                  </span>
                  <span className="block text-xs text-blue-300 font-semibold tracking-wider uppercase">
                    Healthcare SaaS
                  </span>
                </div>
              </Link>

              <div className="space-y-2.5">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wide">
                  {badgeText}
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  Modern outpatient clinical coordination & self-service.
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Connecting clinic owners, consulting physicians, receptionists, and patients into one integrated platform.
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="space-y-3 pt-2">
                {featureHighlights.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Live System Metric Preview */}
            <div className="relative z-10 pt-8 border-t border-slate-800/80 mt-6">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs flex items-center justify-between text-xs">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Demonstration Network
                  </div>
                  <div className="font-bold text-white text-sm">5 Active Specialty Clinics</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Simulated Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                  {title}
                </h1>
                {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
              </div>

              {/* Injected Form Body */}
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 ClinicOS Healthcare Platform. Frontend Prototype.</span>
          <div className="flex items-center gap-4">
            <Link to="/demo-access" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-blue-700 dark:text-blue-400">
              Demo Access Hub
            </Link>
            <Link to="/privacy" className="hover:text-slate-800 dark:hover:text-white">
              Privacy Notice
            </Link>
            <Link to="/terms" className="hover:text-slate-800 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-slate-800 dark:hover:text-white">
              Technical Support
            </Link>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
