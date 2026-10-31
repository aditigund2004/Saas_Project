import React from 'react';

/**
 * Anatomical Heart Visual with Natural Cardiac Pulse
 * Renders an anatomical cardiac structure with aorta, pulmonary trunk, coronary arteries,
 * and a natural dual-phase systolic/diastolic contraction rhythm.
 */
export function AnatomicalHeartVisual({
  size = 'md',
  showBadge = false,
  className = '',
  videoSrc = null
}) {
  const sizeClasses = {
    xs: 'w-9 h-9',
    sm: 'w-16 h-16',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-52 h-52 sm:w-60 sm:h-60'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`} aria-hidden="true">
      {/* If an external video is available, render video */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className={`${sizeClasses[size] || sizeClasses.md} object-contain`}
        >
          <source src={videoSrc} type="video/webm" />
        </video>
      ) : (
        <div className="relative group">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/15 dark:bg-blue-600/20 blur-2xl animate-heart-glow pointer-events-none" />

          {/* Anatomical Heart SVG Graphic */}
          <svg
            viewBox="0 0 200 220"
            className={`${sizeClasses[size] || sizeClasses.md} animate-cardiac-pulse drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]`}
          >
            <defs>
              {/* Primary Ventricular Gradient */}
              <linearGradient id="heart-ventricle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />     {/* Sky Blue */}
                <stop offset="45%" stopColor="#2563eb" />    {/* Cobalt */}
                <stop offset="100%" stopColor="#1e3a8a" />   {/* Deep Navy */}
              </linearGradient>

              {/* Aorta & Arterial Trunk Gradient */}
              <linearGradient id="heart-aorta-grad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />     {/* Cyan */}
                <stop offset="60%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>

              {/* Vena Cava Gradient */}
              <linearGradient id="heart-cava-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>

              {/* Coronary Artery Glow */}
              <filter id="coronary-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Superior Vena Cava (Right upper column) */}
            <path
              d="M 68 20 C 68 12, 82 12, 82 20 L 82 55 C 82 62, 68 62, 68 55 Z"
              fill="url(#heart-cava-grad)"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />

            {/* Aortic Arch & 3 Brachiocephalic/Carotid Branches */}
            <path
              d="M 94 48 C 94 22, 134 20, 142 45 C 146 58, 138 78, 126 88"
              fill="none"
              stroke="url(#heart-aorta-grad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Branch 1: Brachiocephalic */}
            <line x1="108" y1="28" x2="104" y2="12" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            {/* Branch 2: Left Common Carotid */}
            <line x1="120" y1="26" x2="120" y2="10" stroke="#60a5fa" strokeWidth="5.5" strokeLinecap="round" />
            {/* Branch 3: Left Subclavian */}
            <line x1="131" y1="29" x2="135" y2="14" stroke="#93c5fd" strokeWidth="5" strokeLinecap="round" />

            {/* Pulmonary Trunk (Bifurcating cross) */}
            <path
              d="M 98 62 C 85 70, 75 88, 70 102 C 90 92, 115 88, 135 96 C 128 80, 118 70, 98 62 Z"
              fill="#0369a1"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />

            {/* Left Atrium & Right Atrium auricles */}
            <path
              d="M 52 82 C 45 92, 48 112, 60 118 C 72 122, 78 106, 75 92 C 72 82, 60 76, 52 82 Z"
              fill="#0284c7"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            <path
              d="M 132 86 C 145 92, 150 110, 142 122 C 132 126, 125 112, 126 98 Z"
              fill="#1d4ed8"
              stroke="#60a5fa"
              strokeWidth="1.2"
            />

            {/* Main Ventricle Body (Anatomical Apex pointing inferomedially to left) */}
            <path
              d="M 62 108 
                 C 48 126, 54 158, 75 182 
                 C 92 202, 108 214, 114 214 
                 C 120 214, 136 186, 148 160 
                 C 160 134, 156 108, 136 98 
                 C 114 88, 80 92, 62 108 Z"
              fill="url(#heart-ventricle-grad)"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeOpacity="0.8"
            />

            {/* Anterior Interventricular Sulcus / Coronary Artery System */}
            <path
              d="M 102 102 
                 Q 98 132, 108 162 
                 T 114 210"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#coronary-glow)"
              className="animate-pulse"
            />
            {/* Coronary Diagonal Branches */}
            <path
              d="M 104 126 Q 88 136, 78 144"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 106 148 Q 92 160, 84 172"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 106 138 Q 124 146, 138 152"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Cardiac Apex Energy Indicator */}
            <circle cx="114" cy="212" r="3.5" fill="#38bdf8" className="animate-ping" opacity="0.75" />
            <circle cx="114" cy="212" r="2" fill="#ffffff" />
          </svg>
        </div>
      )}
    </div>
  );
}

