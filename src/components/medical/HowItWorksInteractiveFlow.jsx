import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  Building2,
  Palette,
  Rocket,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { EcgWaveform } from './EcgWaveform';

export function HowItWorksInteractiveFlow() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('Cardiology & Medicine');
  const [activeShift, setActiveShift] = useState('morning');
  const [previewTheme, setPreviewTheme] = useState('azure');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, cardIndex: null });
  const [stepTimerProgress, setStepTimerProgress] = useState(0);

  const timerFrameRef = useRef(null);
  const lastStepTimeRef = useRef(Date.now());
  const STEP_DURATION = 4200; // 4.2 seconds per step for natural reading rhythm

  // Step definitions matching the original workflow
  const steps = [
    {
      num: 1,
      icon: UserPlus,
      pill: '⏱ 30 seconds',
      title: 'Sign Up Free',
      description: 'Create your account in 30 seconds. No credit card, no complex forms.',
      subtitle: 'Instant onboarding with mobile OTP',
      tag: 'Zero Credit Card'
    },
    {
      num: 2,
      icon: Building2,
      pill: '📅 Timings · Fees',
      title: 'Setup Your Clinic',
      description: 'Add clinic details, timings, consultation fees. Everything auto-populates on your website.',
      subtitle: 'Automated OPD schedules & slot rules',
      tag: 'Smart Queue'
    },
    {
      num: 3,
      icon: Palette,
      pill: '🎨 6 themes',
      title: 'Customize Website',
      description: 'Pick a theme, add your photo, edit content. Your professional website is ready.',
      subtitle: 'One-click branded medical themes',
      tag: 'Mobile Ready'
    },
    {
      num: 4,
      icon: Rocket,
      pill: '🔗 clinicos.in/yourname',
      title: 'Go Live & Share',
      description: 'Share your link with patients. They book online, you manage from your dashboard.',
      subtitle: 'Instant booking link & QR dispatch',
      tag: 'Direct Booking'
    }
  ];

  // Natural flow: smooth timer progress & auto-cycling
  useEffect(() => {
    lastStepTimeRef.current = Date.now();

    const updateProgress = () => {
      if (!isPaused) {
        const elapsed = Date.now() - lastStepTimeRef.current;
        const progress = Math.min((elapsed / STEP_DURATION) * 100, 100);
        setStepTimerProgress(progress);

        if (elapsed >= STEP_DURATION) {
          setActiveStep((prev) => (prev % 4) + 1);
          lastStepTimeRef.current = Date.now();
          setStepTimerProgress(0);
        }
      }
      timerFrameRef.current = requestAnimationFrame(updateProgress);
    };

    timerFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (timerFrameRef.current) cancelAnimationFrame(timerFrameRef.current);
    };
  }, [isPaused]);

  // When active step changes manually, reset progress timer
  const handleSelectStep = (stepNum) => {
    setActiveStep(stepNum);
    lastStepTimeRef.current = Date.now();
    setStepTimerProgress(0);
  };

  const handleNextStep = () => {
    handleSelectStep((activeStep % 4) + 1);
  };

  const handlePrevStep = () => {
    handleSelectStep(activeStep === 1 ? 4 : activeStep - 1);
  };

  // Dynamic cursor position tracking per card
  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, cardIndex: index });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, cardIndex: null });
  };

  // Copy link simulator
  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText?.('https://clinicos.in/dr-sarah-williams');
    setTimeout(() => setCopiedLink(false), 2400);
  };

  // Theme swatches for Step 3
  const themePresets = [
    { id: 'azure', name: 'Azure Modern', color: '#2563eb', bg: 'bg-blue-600', ring: 'ring-blue-500' },
    { id: 'emerald', name: 'Emerald Wellness', color: '#059669', bg: 'bg-emerald-600', ring: 'ring-emerald-500' },
    { id: 'amethyst', name: 'Royal Specialist', color: '#7c3aed', bg: 'bg-purple-600', ring: 'ring-purple-500' }
  ];

  return (
    <section
      id="how-it-works"
      aria-label="How ClinicOS Works"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 relative overflow-hidden transition-colors"
    >
      {/* Background Ambient Medical Elements: ECG & Watermark */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-35 dark:opacity-20 select-none">
        <EcgWaveform variant="compact" className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full" glow={false} />
        {/* Soft radial glow centers */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Header with pill, title and subtitle (matching image) */}
      <div className="text-center max-w-xl mx-auto space-y-3.5 relative">
        <div className="inline-flex items-center gap-2">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            HOW IT WORKS
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Online in{' '}
          <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
            4 simple steps
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          From sign-up to your first online booking, it takes less than 5 minutes.
        </p>

        {/* Natural Flow Status Pill */}
        <div className="pt-1 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2.5 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer"
            title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                <span className="font-medium">Paused (Click to auto-flow)</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-blue-500" />
                <span className="font-medium">Auto-Flow Active (Hover to pause)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4-Step Horizontal Timeline Workflow */}
      <div className="relative pt-2">
        {/* Connecting Track Line for Desktop */}
        <div className="hidden lg:block absolute top-[52px] left-[11%] right-[11%] h-[3px] bg-slate-200/90 dark:bg-slate-800/90 rounded-full overflow-hidden -z-0">
          {/* Base dotted indicator */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

          {/* Animated Blue Progress Line based on activeStep */}
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full relative"
            style={{
              width:
                activeStep === 1
                  ? '0%'
                  : activeStep === 2
                  ? '33.33%'
                  : activeStep === 3
                  ? '66.66%'
                  : '100%'
            }}
          >
            {/* Luminous Sweep Runner along the active segment */}
            <div className="absolute inset-0 bg-white/40 animate-timeline-beam" />
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isSelected = activeStep === s.num;
            const isPassed = activeStep > s.num;
            const isHovered = mousePos.cardIndex === index;

            // Micro-perspective tilt
            const tiltStyle =
              isHovered && mousePos.cardIndex === index
                ? {
                    transform: `perspective(800px) rotateX(${
                      -(mousePos.y - 120) * 0.04
                    }deg) rotateY(${(mousePos.x - 120) * 0.04}deg) translateY(-6px)`,
                    transition: 'transform 100ms ease-out'
                  }
                : {
                    transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)'
                  };

            return (
              <div
                key={s.num}
                onClick={() => handleSelectStep(s.num)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                style={tiltStyle}
                className={`relative flex flex-col items-center text-center p-5 rounded-3xl cursor-pointer select-none transition-all duration-300 group ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-2 border-blue-500/80 dark:border-blue-500/90 shadow-xl shadow-blue-500/15'
                    : 'bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 shadow-xs hover:shadow-lg'
                }`}
              >
                {/* Dynamic Cursor Spotlight Effect */}
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
                    style={{
                      background: `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.12), transparent 80%)`
                    }}
                  />
                )}

                {/* Step Node Circle with Number Badge */}
                <div className="relative mb-3.5">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40 ring-8 ring-blue-100 dark:ring-blue-950/80 step-node-glow scale-105'
                        : isPassed
                        ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-400 shadow-md group-hover:scale-105'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 shadow-xs group-hover:border-blue-400 group-hover:scale-105'
                    }`}
                  >
                    <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />

                    {/* Photon bead on current active node */}
                    {isSelected && (
                      <span className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full bg-cyan-400 animate-photon pointer-events-none" />
                    )}
                  </div>

                  {/* Number Badge Pill on top-right */}
                  <div
                    className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center absolute -top-1 -right-1 shadow-xs border-2 border-white dark:border-slate-900 transition-colors ${
                      isSelected
                        ? 'bg-blue-800 text-white'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                  </div>
                </div>

                {/* Timing / Theme Tag Pill */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 shadow-2xs font-bold scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {s.pill}
                </span>

                {/* Title */}
                <h3 className="mt-3 text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                  {s.description}
                </p>

                {/* Active Step Micro Progress Bar (Timer) */}
                {isSelected && !isPaused && (
                  <div className="w-full mt-4 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-100 linear"
                      style={{ width: `${stepTimerProgress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Journey: Interactive Live Step Simulator */}
      <div className="bg-gradient-to-b from-slate-50/80 to-blue-50/40 dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-500">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Interactive Journey Simulator · Step {activeStep} of 4
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeStep === 1 && 'Instant Doctor Account Provisioning'}
              {activeStep === 2 && 'Automated OPD Schedule & Rules Engine'}
              {activeStep === 3 && 'Zero-Code Branded Clinic Website'}
              {activeStep === 4 && 'Launch Live Link & WhatsApp Dispatch'}
            </h4>
          </div>

          {/* Step Navigation Arrows */}
          <div className="flex items-center gap-2 self-end lg:self-center">
            <button
              type="button"
              onClick={handlePrevStep}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shadow-xs transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-500 px-1 font-mono">
              0{activeStep} / 04
            </span>
            <button
              type="button"
              onClick={handleNextStep}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shadow-xs transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Step Content Showcase */}
        <div className="pt-6">
          {/* STEP 1 SIMULATOR */}
          {activeStep === 1 && (
            <div className="animate-page-enter grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Start in seconds by choosing your clinical specialty. ClinicOS instantly tailors your drug formulary, vitals templates, and consultation workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Cardiology & Medicine', 'Dental Studio', 'Pediatrics & Child Care', 'General OPD'].map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSelectedSpecialty(spec)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSpecialty === spec
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> OTP Authenticated
                  </span>
                  <span>•</span>
                  <span>No credit card required</span>
                  <span>•</span>
                  <span>HIPAA & DISHA Compliant</span>
                </div>
              </div>

              {/* Mock Doctor ID Card */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                    SW
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">Dr. Sarah Williams</h5>
                    <p className="text-xs text-slate-500">{selectedSpecialty}</p>
                  </div>
                </div>
                <div className="text-[11px] bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 p-2.5 rounded-xl border border-blue-200/60 dark:border-blue-900/50 flex items-center justify-between">
                  <span>Workspace URL:</span>
                  <span className="font-mono font-bold">clinicos.in/dr-sarah</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 SIMULATOR */}
          {activeStep === 2 && (
            <div className="animate-page-enter grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Define your practice timings and fees once. Your patient portal immediately enables real-time slot booking, live token numbering, and automated queue tracking.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveShift('morning')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeShift === 'morning'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    🌅 Morning Shift (09:30 AM - 01:30 PM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveShift('evening')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeShift === 'evening'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    🌆 Evening Shift (04:30 PM - 08:30 PM)
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 block">In-Clinic Consultation Fee</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">₹500 / visit</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 block">Telemedicine Video Consult</span>
                    <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">₹800 / session</span>
                  </div>
                </div>
              </div>

              {/* Mock Live Token Display */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500 uppercase">Live Queue Token</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Active OPD
                  </span>
                </div>
                <div className="text-center py-2">
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    TOKEN #08
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    Serving: Aarav Patel (12m elapsed)
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 text-center bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
                  Next in line: Token #09 (Pooja Rao)
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 SIMULATOR */}
          {activeStep === 3 && (
            <div className="animate-page-enter grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Personalize your clinic’s online storefront. Select your primary brand color to match your clinic aesthetics with zero coding required.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Brand Color:</span>
                  {themePresets.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPreviewTheme(t.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        previewTheme === t.id
                          ? 'border-slate-900 dark:border-white shadow-md scale-105'
                          : 'border-slate-200 dark:border-slate-700 hover:scale-102'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${t.bg}`} />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    📱 Mobile Ready
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    🔍 SEO Optimized
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    ⭐ Patient Reviews
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    🗺 Google Maps
                  </div>
                </div>
              </div>

              {/* Dynamic Theme Preview Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
                <div
                  className={`p-3 text-white text-xs font-bold flex items-center justify-between ${
                    previewTheme === 'azure'
                      ? 'bg-blue-600'
                      : previewTheme === 'emerald'
                      ? 'bg-emerald-600'
                      : 'bg-purple-600'
                  }`}
                >
                  <span>Apex Heart & Health Clinic</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">★ 4.9 (128)</span>
                </div>
                <div className="p-4 space-y-2.5">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Book Online Appointment
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">Today, 4:30 PM</span>
                    <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">Tomorrow, 10:00 AM</span>
                  </div>
                  <button
                    type="button"
                    className={`w-full py-1.5 rounded-lg text-white text-xs font-bold shadow-xs cursor-pointer ${
                      previewTheme === 'azure'
                        ? 'bg-blue-600'
                        : previewTheme === 'emerald'
                        ? 'bg-emerald-600'
                        : 'bg-purple-600'
                    }`}
                  >
                    Confirm Booking (₹500)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 SIMULATOR */}
          {activeStep === 4 && (
            <div className="animate-page-enter grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your website and booking engine are immediately live. Share your branded link across WhatsApp, Google Business, and reception QR stands.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    https://clinicos.in/dr-sarah-williams
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                    💬 WhatsApp Direct Share
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
                    📍 Google Profile Ready
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800">
                    🖨 Reception QR Stand
                  </span>
                </div>
              </div>

              {/* Mock QR Code Card */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md text-center space-y-2.5">
                <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-700 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <QrCode className="w-12 h-12 text-slate-800 dark:text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Scan to Book Online
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Instant Patient Check-in
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button Below the 4 Steps (Exact Match with Rich Motion & Subtext) */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-3">
        <Link to="/onboarding">
          <button
            type="button"
            className="btn-animated-primary px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-xl flex items-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-blue-500/30 active:scale-[0.98]"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </Link>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          7-day free trial · no card needed
        </span>
      </div>
    </section>
  );
}
