import React from 'react';
import { MedicalParticles } from '../medical/MedicalParticles';
import { DnaHelixAnimation } from '../medical/DnaHelixAnimation';

/**
 * Ambient Medical Motion Layer for Public Website & User Role Workspaces
 * Renders the rotating 3D DNA Helix design, subtle floating particles, and soft radial medical-glow gradients.
 * Non-intrusive, zero pointer-events, fully accessible.
 */
export function MedicalMotionBackground({ variant = 'public' }) {
  const isWorkspace = variant === 'workspace';
  const isAuth = variant === 'auth';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Soft Cyan/Blue Ambient Radial Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-indigo-600/10 dark:bg-indigo-600/15 blur-3xl" />

      {/* Floating Micro-particles and Cells */}
      <MedicalParticles />

      {/* Rotating 3D DNA Helix in Background - Left Side */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-700 ${
          isWorkspace
            ? 'top-20 left-6 sm:left-12 lg:left-72 w-60 sm:w-72 h-[600px] lg:h-[720px] opacity-20 dark:opacity-30'
            : isAuth
            ? 'top-16 left-8 sm:left-16 w-64 sm:w-80 h-[640px] opacity-25 dark:opacity-35'
            : 'top-8 sm:top-12 left-4 sm:left-8 lg:left-16 xl:left-24 w-64 sm:w-80 lg:w-96 h-[640px] lg:h-[780px] opacity-30 dark:opacity-45'
        }`}
      >
        <DnaHelixAnimation className="w-full h-full" />
      </div>

      {/* Rotating 3D DNA Helix in Background - Right Side */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-700 ${
          isWorkspace
            ? 'top-20 right-6 sm:right-12 lg:right-24 w-60 sm:w-72 h-[600px] lg:h-[720px] opacity-25 dark:opacity-35'
            : isAuth
            ? 'top-16 right-8 sm:right-16 w-64 sm:w-80 h-[640px] opacity-25 dark:opacity-35'
            : 'top-8 sm:top-12 right-4 sm:right-8 lg:right-24 xl:right-32 w-64 sm:w-80 lg:w-96 h-[640px] lg:h-[780px] opacity-35 dark:opacity-50'
        }`}
      >
        <DnaHelixAnimation className="w-full h-full" />
      </div>
    </div>
  );
}
