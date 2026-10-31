import React from 'react';
import { MedicalParticles } from '../medical/MedicalParticles';
import { DnaHelixAnimation } from '../medical/DnaHelixAnimation';
import { AnatomicalHeartVisual } from '../medical/AnatomicalHeartVisual';

/**
 * Continuous seamless clinical ECG waveform track.
 * Mathematical repeat ensures 0 jump or stutter during infinite translation.
 */
function SeamlessEcgLine({ className = '', speed = 'normal', strokeColor = '#06b6d4' }) {
  // SVG path containing 4 clinical P-Q-R-S-T wave complexes spanning 1200 units
  const ecgPath =
    'M 0 40 H 45 Q 55 35 65 40 H 80 L 88 44 L 98 6 L 108 68 L 116 40 H 130 Q 145 28 160 40 H 300' +
    ' H 345 Q 355 35 365 40 H 380 L 388 44 L 398 6 L 408 68 L 416 40 H 430 Q 445 28 460 40 H 600' +
    ' H 645 Q 655 35 665 40 H 680 L 688 44 L 698 6 L 708 68 L 716 40 H 730 Q 745 28 760 40 H 900' +
    ' H 945 Q 955 35 965 40 H 980 L 988 44 L 998 6 L 1008 68 L 1016 40 H 1030 Q 1045 28 1060 40 H 1200';

  const trackClass = speed === 'fast' ? 'animate-ecg-track-fast' : 'animate-ecg-track';

  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className={trackClass}>
        {/* Track Segment 1 */}
        <div className="w-1/2 shrink-0">
          <svg viewBox="0 0 1200 80" className="w-full h-10 sm:h-16 overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`ecg-grad-${speed}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
                <stop offset="20%" stopColor={strokeColor} stopOpacity="0.75" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="80%" stopColor="#2563eb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
              </linearGradient>
              <filter id={`ecg-glow-${speed}`} x="-10%" y="-40%" width="120%" height="180%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dotted Grid Baseline */}
            <line
              x1="0"
              y1="40"
              x2="1200"
              y2="40"
              stroke="#0ea5e9"
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* Continuous P-Q-R-S-T wave */}
            <path
              d={ecgPath}
              fill="none"
              stroke={`url(#ecg-grad-${speed})`}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#ecg-glow-${speed})`}
            />
          </svg>
        </div>

        {/* Track Segment 2 (Duplicate for seamless infinite translate3d loop) */}
        <div className="w-1/2 shrink-0">
          <svg viewBox="0 0 1200 80" className="w-full h-10 sm:h-16 overflow-visible" preserveAspectRatio="none">
            <line
              x1="0"
              y1="40"
              x2="1200"
              y2="40"
              stroke="#0ea5e9"
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <path
              d={ecgPath}
              fill="none"
              stroke={`url(#ecg-grad-${speed})`}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#ecg-glow-${speed})`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Ambient Medical Motion Layer for Public Landing Page & User Role Workspaces.
 * Features:
 * - Flowing continuous ECG telemetry waveforms
 * - Animated heart bumping in the background with physiological dual-phase lub-dub rhythm
 * - Soft expanding cardiac radial glow
 * - 3D rotating DNA Helix structures & micro-cellular particles
 * Non-intrusive, zero pointer-events, fully accessible.
 */
export function MedicalMotionBackground({ variant = 'public' }) {
  const isWorkspace = variant === 'workspace';
  const isAuth = variant === 'auth';
  const isPublic = variant === 'public';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none" aria-hidden="true">
      {/* Ambient Radial Medical Glows */}
      <div className="absolute -top-32 -left-32 w-96 sm:w-[480px] h-96 sm:h-[480px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />
      <div className="absolute top-1/4 -right-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-96 sm:w-[450px] h-96 sm:h-[450px] rounded-full bg-indigo-600/10 dark:bg-indigo-600/15 blur-3xl" />

      {/* Floating Micro-particles and Cells */}
      <MedicalParticles />

      {/* ========================================================================= */}
      {/* 1. ANIMATED HEART BUMPING IN BACKGROUND                                   */}
      {/* ========================================================================= */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-700 ${
          isWorkspace
            ? 'top-[26%] right-8 sm:right-16 lg:right-32 w-48 sm:w-60 h-48 sm:h-60 opacity-15 dark:opacity-20'
            : isAuth
            ? 'top-[28%] right-10 sm:right-24 w-44 sm:w-56 h-44 sm:h-56 opacity-15 dark:opacity-25'
            : 'top-[16%] right-4 sm:right-12 lg:right-[15%] xl:right-[18%] w-56 sm:w-72 lg:w-84 h-56 sm:h-72 lg:h-84 opacity-25 dark:opacity-40'
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center animate-medical-float">
          {/* Dual Concentric Cardiac Pulsing Auroras */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-400/25 blur-3xl animate-cardiac-glow pointer-events-none" />
          <div
            className="absolute w-52 h-52 sm:w-68 sm:h-68 rounded-full bg-blue-600/25 dark:bg-blue-500/35 blur-2xl animate-cardiac-glow pointer-events-none"
            style={{ animationDelay: '0.12s' }}
          />

          {/* Anatomical Heart with Natural Dual-phase Lub-Dub Pulse */}
          <div className="relative animate-cardiac-pulse">
            <AnatomicalHeartVisual size="lg" className="scale-110 sm:scale-125 drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTINUOUS FLOWING ECG LINES                                           */}
      {/* ========================================================================= */}
      {/* Upper ECG Telemetry Line (Sweeps across the upper/hero mid-section) */}
      <div
        className={`absolute left-0 right-0 pointer-events-none transition-opacity duration-700 ${
          isWorkspace
            ? 'top-[38%] opacity-15 dark:opacity-25'
            : isAuth
            ? 'top-[42%] opacity-15 dark:opacity-25'
            : 'top-[27%] sm:top-[28%] opacity-25 dark:opacity-45'
        }`}
      >
        <SeamlessEcgLine speed="normal" strokeColor="#06b6d4" />
      </div>

      {/* Lower ECG Telemetry Line (Sweeps across lower section with dynamic cadence) */}
      {isPublic && (
        <div className="absolute left-0 right-0 bottom-[16%] sm:bottom-[20%] opacity-20 dark:opacity-35 pointer-events-none">
          <SeamlessEcgLine speed="fast" strokeColor="#3b82f6" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ROTATING 3D DNA HELICES (Edge Visual Anchors)                          */}
      {/* ========================================================================= */}
      {/* Left DNA Helix */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-700 ${
          isWorkspace
            ? 'top-20 left-6 sm:left-12 lg:left-72 w-60 sm:w-72 h-[600px] lg:h-[720px] opacity-20 dark:opacity-30'
            : isAuth
            ? 'top-16 left-8 sm:left-16 w-64 sm:w-80 h-[640px] opacity-25 dark:opacity-35'
            : 'top-8 sm:top-12 left-4 sm:left-8 lg:left-14 xl:left-20 w-64 sm:w-80 lg:w-96 h-[640px] lg:h-[780px] opacity-25 dark:opacity-40'
        }`}
      >
        <DnaHelixAnimation className="w-full h-full" />
      </div>

      {/* Right DNA Helix */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-700 ${
          isWorkspace
            ? 'top-20 right-6 sm:right-12 lg:right-24 w-60 sm:w-72 h-[600px] lg:h-[720px] opacity-25 dark:opacity-35'
            : isAuth
            ? 'top-16 right-8 sm:right-16 w-64 sm:w-80 h-[640px] opacity-25 dark:opacity-35'
            : 'top-8 sm:top-12 right-4 sm:right-8 lg:right-20 xl:right-28 w-64 sm:w-80 lg:w-96 h-[640px] lg:h-[780px] opacity-30 dark:opacity-45'
        }`}
      >
        <DnaHelixAnimation className="w-full h-full" />
      </div>
    </div>
  );
}
