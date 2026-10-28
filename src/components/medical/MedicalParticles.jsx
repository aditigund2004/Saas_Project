import React from 'react';

/**
 * Floating Medical Particles
 * Subtle microscopic cell visuals and molecular drift elements.
 * Built with lightweight CSS keyframes for 60fps performance without JavaScript animation loops.
 */
export function MedicalParticles({ className = '' }) {
  // Pre-configured positions and animations for deterministic, non-flashing rendering
  const particles = [
    { id: 1, top: '12%', left: '8%', size: 14, type: 'cell', delay: '0s', duration: '14s' },
    { id: 2, top: '24%', left: '85%', size: 18, type: 'cell', delay: '2s', duration: '18s' },
    { id: 3, top: '45%', left: '4%', size: 10, type: 'cross', delay: '1s', duration: '12s' },
    { id: 4, top: '65%', left: '92%', size: 12, type: 'cross', delay: '3s', duration: '16s' },
    { id: 5, top: '80%', left: '15%', size: 22, type: 'bokeh', delay: '4s', duration: '20s' },
    { id: 6, top: '18%', left: '50%', size: 8, type: 'node', delay: '2.5s', duration: '15s' },
    { id: 7, top: '75%', left: '78%', size: 16, type: 'cell', delay: '1.5s', duration: '17s' },
    { id: 8, top: '38%', left: '96%', size: 20, type: 'bokeh', delay: '5s', duration: '22s' },
    { id: 9, top: '88%', left: '42%', size: 10, type: 'cross', delay: '0.5s', duration: '13s' },
    { id: 10, top: '55%', left: '22%', size: 12, type: 'node', delay: '3.5s', duration: '19s' },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-particle opacity-40 dark:opacity-50"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.type === 'cell' && (
            <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-400 dark:text-cyan-300">
              <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.35" />
            </svg>
          )}

          {p.type === 'cross' && (
            <svg viewBox="0 0 20 20" className="w-full h-full text-blue-500 dark:text-blue-400">
              <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}

          {p.type === 'node' && (
            <div className="w-full h-full rounded-full bg-cyan-400/30 dark:bg-cyan-300/40 border border-cyan-400/60 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
          )}

          {p.type === 'bokeh' && (
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600/10 to-cyan-400/20 blur-xs" />
          )}
        </div>
      ))}
    </div>
  );
}

