import React from 'react';

/**
 * Animated ECG Heartbeat Waveform
 * Realistic clinical rhythm with P-Q-R-S-T complexes and continuous neon sweep.
 * Accessible with `aria-hidden="true"`.
 */
export function EcgWaveform({ variant = 'full', className = '', glow = true }) {
  if (variant === 'compact') {
    return (
      <div className={`relative flex items-center overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 240 40"
          className="w-full h-8 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ecg-compact-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
            </linearGradient>
            {glow && (
              <filter id="ecg-compact-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          {/* Background subtle guide grid */}
          <line x1="0" y1="20" x2="240" y2="20" stroke="#38bdf8" strokeOpacity="0.12" strokeDasharray="2 3" strokeWidth="0.8" />

          {/* Animated Waveform */}
          <path
            d="M0 20 H35 L42 20 L47 16 L53 25 L60 3 L67 33 L73 20 L80 20 L87 15 L95 20 H155 L162 20 L167 16 L173 25 L180 3 L187 33 L193 20 L200 20 L207 15 L215 20 H240"
            fill="none"
            stroke="url(#ecg-compact-gradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={glow ? 'url(#ecg-compact-glow)' : undefined}
            className="animate-ecg-sweep"
          />
        </svg>
      </div>
    );
  }

  // Full-width clinical telemetry line
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 80"
        className="w-full h-12 sm:h-16 overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ecg-full-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="15%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="85%" stopColor="#2563eb" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          {glow && (
            <filter id="ecg-full-glow" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Clinical Baseline Grid */}
        <line x1="0" y1="40" x2="1200" y2="40" stroke="#0ea5e9" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 6" />

        {/* Sweeping P-Q-R-S-T wave */}
        <path
          d="M0 40 H160 L180 40 L195 34 L208 47 L225 8 L244 68 L258 40 L275 40 L290 32 L310 40 H560 L580 40 L595 34 L608 47 L625 8 L644 68 L658 40 L675 40 L690 32 L710 40 H960 L980 40 L995 34 L1008 47 L1025 8 L1044 68 L1058 40 L1075 40 L1090 32 L1110 40 H1200"
          fill="none"
          stroke="url(#ecg-full-gradient)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={glow ? 'url(#ecg-full-glow)' : undefined}
          className="animate-ecg-sweep"
        />
      </svg>
    </div>
  );
}

