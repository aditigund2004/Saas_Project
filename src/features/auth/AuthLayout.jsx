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
    <div className="relative min-h-screen bg-[#F5F8F6] flex flex-col justify-between text-[#17211B] w-full max-w-full overflow-x-clip">
      {/* Top Banner / Disclaimer */}
      <div className="relative z-10 bg-[#062412] text-slate-200 text-xs py-2.5 px-4 text-center font-bold border-b border-emerald-950 flex items-center justify-center gap-2 shrink-0">
        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        <span>
          <strong className="text-white">Prototype Environment:</strong> Simulated authentication. No real passwords or sensitive patient records are transmitted or stored.
        </span>
        <Link to="/demo-access" className="underline font-extrabold text-[#4ade80] ml-2 hover:text-[#86efac]">
          Demo Access Hub &rarr;
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-5 lg:p-6 w-full">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto animate-fade-in">
          {/* Left Column: Modern Green Healthcare Visual Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#062412] via-[#0b3b24] to-[#14532d] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle healthcare ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#15803D] flex items-center justify-center text-white font-black text-xl shadow-md shadow-green-900/40">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight text-white" style={{ color: '#ffffff' }}>
                    Clinic<span className="text-[#4ade80]">OS</span>
                  </span>
                  <span className="block text-[10px] text-emerald-300 font-extrabold tracking-wider uppercase">
                    Healthcare SaaS
                  </span>
                </div>
              </Link>

              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-[#4ade80] border border-emerald-400/30 uppercase tracking-wider">
                  {badgeText}
                </span>
                <h2
                  style={{ color: '#ffffff' }}
                  className="text-2xl lg:text-3xl font-black text-white !text-white leading-tight tracking-tight"
                >
                  Modern outpatient clinical coordination & self-service.
                </h2>
                <p style={{ color: '#e2e8f0' }} className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  Connecting clinic owners, consulting physicians, receptionists, and patients into one integrated platform.
                </p>
              </div>

              {/* Highlights Checklist with High-Contrast White Text */}
              <div className="space-y-2.5 pt-2">
                {featureHighlights.map((feat, i) => (
                  <div key={i} style={{ color: '#f8fafc' }} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-100">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#4ade80] shrink-0 mt-0.5" />
                    <span style={{ color: '#f8fafc' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Live System Metric Preview */}
            <div className="relative z-10 pt-6 border-t border-emerald-800/40 mt-6">
              <div className="p-3.5 rounded-2xl bg-[#031c0e]/80 border border-emerald-800/60 backdrop-blur-xs flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Demonstration Network
                  </div>
                  <div className="font-extrabold text-white text-sm sm:text-base" style={{ color: '#ffffff' }}>
                    5 Active Specialty Clinics
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-900/60 border border-emerald-600/40 px-2.5 py-1 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                    Simulated Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Background with High-Contrast Dark Slate Text */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white">
            <div className="max-w-lg w-full mx-auto space-y-5 sm:space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211B] tracking-tight leading-tight">
                  {title}
                </h1>
                {subtitle && <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed">{subtitle}</p>}
              </div>

              {/* Injected Form Body */}
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Help Bar */}
      <div className="relative z-10 border-t border-[#E2E8F0] bg-white/90 backdrop-blur-xs py-3 px-4 text-center text-xs text-[#475569] flex flex-wrap items-center justify-center gap-4 shrink-0">
        <span>&copy; {new Date().getFullYear()} ClinicOS Healthcare Platform</span>
        <span>&bull;</span>
        <Link to="/about" className="hover:text-[#15803D] transition-colors font-medium">
          About
        </Link>
        <span>&bull;</span>
        <Link to="/contact" className="hover:text-[#15803D] transition-colors font-medium">
          Support Contact
        </Link>
        <span>&bull;</span>
        <Link to="/pricing" className="hover:text-[#15803D] transition-colors font-medium">
          SaaS Pricing Plans
        </Link>
      </div>
    </div>
  );
}
