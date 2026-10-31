import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2, Building2, Sparkles, ChevronRight } from 'lucide-react';
import { MedicalMotionBackground } from '../../components/layout/MedicalMotionBackground';
import { EcgWaveform } from '../../components/medical/EcgWaveform';

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
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
  const [showClinicsModal, setShowClinicsModal] = useState(false);

  // 3D perspective tilt & cursor spotlight
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative offset from card center (-1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relX = (x - centerX) / centerX;
    const relY = (y - centerY) / centerY;

    // Gentle 3D tilt maximum 3 degrees
    setTilt({
      x: -relY * 2.5,
      y: relX * 2.5
    });

    setSpotlight({ x, y, visible: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, visible: false }));
  }, []);

  const specialtyClinics = [
    { name: 'CityCare Family Clinic', spec: 'Internal Medicine & OPD', city: 'Mumbai', doctor: 'Dr. Aarav Mehta' },
    { name: 'HeartWell Cardiology Centre', spec: 'Cardiology & Telemetry', city: 'Mumbai', doctor: 'Dr. Rohan Deshmukh' },
    { name: 'BrightSmile Dental Studio', spec: 'Dental Surgery & Implants', city: 'Bangalore', doctor: 'Dr. Isha Shah' },
    { name: 'SkinSpring Dermatology Clinic', spec: 'Dermatology & Aesthetics', city: 'Pune', doctor: 'Dr. Ananya Rao' },
    { name: 'MoveWell Orthopedics Hub', spec: 'Orthopedics & Joint Care', city: 'Delhi', doctor: 'Dr. Vikram Patil' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col justify-between text-slate-800 dark:text-slate-100 transition-colors relative overflow-hidden select-none">
      <MedicalMotionBackground variant="auth" />

      <div className="relative z-10 flex flex-col justify-between flex-1">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
          {/* Main Card with 3D Tilt and Spotlight */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-slate-200/90 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] relative animate-modal-enter group"
          >
            {/* Dynamic Cursor Spotlight Effect */}
            {spotlight.visible && (
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-30"
                style={{
                  background: `radial-gradient(circle 320px at ${spotlight.x}px ${spotlight.y}px, rgba(37, 99, 235, 0.12), transparent 75%)`
                }}
              />
            )}

            {/* Left Column: Living Medical Command Console (Desktop) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
              {/* Background Accent Auroras */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Ambient Flowing ECG Telemetry Line at Left Column Base */}
              <div className="absolute bottom-28 left-0 right-0 pointer-events-none opacity-20 overflow-hidden">
                <EcgWaveform variant="compact" glow={false} />
              </div>

              <div className="relative z-10 space-y-6">
                {/* Logo with Living Cardiac Pulse */}
                <Link to="/" className="inline-flex items-center gap-3 group/logo">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30 relative">
                    <span className="absolute inset-0 rounded-2xl bg-blue-400/30 animate-cardiac-glow pointer-events-none" />
                    <Activity className="w-6 h-6 animate-cardiac-pulse" />
                  </div>
                  <div>
                    <span className="text-xl font-black tracking-tight text-white group-hover/logo:text-blue-300 transition-colors">
                      Clinic<span className="text-blue-400">OS</span>
                    </span>
                    <span className="block text-[11px] text-blue-300 font-bold tracking-wider uppercase">
                      Healthcare SaaS
                    </span>
                  </div>
                </Link>

                {/* Badge & Value Prop */}
                <div className="space-y-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wide shadow-2xs">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    {badgeText}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                    Modern outpatient clinical coordination & self-service.
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Connecting clinic owners, consulting physicians, receptionists, and patients into one integrated platform.
                  </p>
                </div>

                {/* Highlights Checklist with Interactive Hover Shifting */}
                <div className="space-y-3 pt-2">
                  {featureHighlights.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-default group/item"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Live System Metric Preview */}
              <div className="relative z-10 pt-6 border-t border-slate-800/80 mt-6">
                <div
                  onClick={() => setShowClinicsModal((prev) => !prev)}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-between text-xs cursor-pointer transition-all duration-200 group/net hover:border-blue-500/60 shadow-md"
                  title="Click to view all 5 simulated specialty clinics"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Demonstration Network</span>
                    </div>
                    <div className="font-extrabold text-white text-sm mt-0.5 group-hover/net:text-blue-300 transition-colors">
                      5 Active Specialty Clinics
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-xl shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Simulated Ready
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover/net:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Expanded Specialty Clinics Popover Drawer */}
                {showClinicsModal && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] text-slate-400 font-bold uppercase">
                      <span>Live Demo Clinics</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowClinicsModal(false);
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                      {specialtyClinics.map((sc, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-800/60 text-[11px] flex items-center justify-between">
                          <div>
                            <span className="font-bold text-white block">{sc.name}</span>
                            <span className="text-slate-400 text-[10px]">{sc.spec} · {sc.city}</span>
                          </div>
                          <span className="text-[10px] text-blue-400 font-semibold">{sc.doctor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                  {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{subtitle}</p>}
                </div>

                {/* Injected Form Body */}
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <footer className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs">
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
