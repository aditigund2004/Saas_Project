import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2 } from 'lucide-react';

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
    <div className="auth-layout min-h-screen bg-[#F8FAFC] flex flex-col justify-between text-[#1E293B]">
      {/* Top Banner / Prototype Environment Notice */}
      <div className="bg-blue-50 text-blue-800 text-[11px] py-1.5 px-4 text-center font-medium border-b border-blue-200/80 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          <strong>Prototype Environment:</strong> Simulated authentication. No real passwords or sensitive patient records are transmitted or stored.
        </span>
        <Link to="/demo-access" className="underline font-bold text-blue-700 ml-1 hover:text-blue-900">
          Demo Access Hub &rarr;
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
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
                  <span className="block text-[10px] text-blue-300 font-semibold tracking-wider uppercase">
                    Healthcare SaaS
                  </span>
                </div>
              </Link>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wide">
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
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Demonstration Network
                  </div>
                  <div className="font-bold text-white text-sm">5 Active Specialty Clinics</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Simulated Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-[28px] font-black text-[#1E293B] tracking-tight leading-snug">
                  {title}
                </h1>
                {subtitle && <p className="text-sm text-[#64748B]">{subtitle}</p>}
              </div>

              {/* Injected Form Body */}
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="py-4 text-center text-xs text-[#64748B] border-t border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 ClinicOS Healthcare Platform. Frontend Prototype.</span>
          <div className="flex items-center gap-4">
            <Link to="/demo-access" className="hover:text-blue-600 font-semibold text-blue-700">
              Demo Access Hub
            </Link>
            <Link to="/privacy" className="hover:text-slate-800">
              Privacy Notice
            </Link>
            <Link to="/terms" className="hover:text-slate-800">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-slate-800">
              Technical Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
