import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, Star, MapPin } from 'lucide-react';
import { EcgWaveform } from './EcgWaveform';

export function TrustedDoctorsInteractiveTicker({ doctors = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Motion physics state
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const baseSpeedRef = useRef(-0.75); // Negative = natural leftward drift
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startDragXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastMouseXRef = useRef(null);
  const velocityRef = useRef(0);

  // React state for UI feedback
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [trackProgress, setTrackProgress] = useState(30);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Fallback doctors list if not provided
  const doctorList = doctors.length > 0 ? doctors : [
    { name: 'Dr. Jasdeep Kaur Malhotra', spec: 'Dermatology', city: 'Delhi', rating: '4.9', patients: '1,420+' },
    { name: 'Dr. Ganesh Avhad Patil', spec: 'General Physician', city: 'Pune', rating: '5.0', patients: '2,180+' },
    { name: 'Dr. Ganesh Avhad', spec: 'General Physician', city: 'Kalyan East', rating: '4.8', patients: '980+' },
    { name: 'Dr. Raghuveer Meena', spec: 'ENT Specialist', city: 'Bundi', rating: '4.9', patients: '1,120+' },
    { name: 'Dr. Abhishek Bali', spec: 'Ayurveda Medicine', city: 'Jammu', rating: '4.9', patients: '860+' },
    { name: 'Dr. Aman Kumar', spec: 'General Physician', city: 'Bangalore', rating: '4.8', patients: '3,400+' },
    { name: 'Dr. Zain Asad', spec: 'General Physician', city: 'Lucknow', rating: '5.0', patients: '1,750+' },
    { name: 'Dr. Prince Mishra', spec: 'Pediatrics', city: 'Patna', rating: '4.9', patients: '2,900+' },
    { name: 'Dr. Aarti Solanki', spec: 'Dental Specialist', city: 'Ahmedabad', rating: '4.8', patients: '1,640+' },
    { name: 'Dr. Vikram Singh', spec: 'Orthopedics', city: 'Jaipur', rating: '5.0', patients: '2,200+' },
    { name: 'Dr. Aishwarya Singh', spec: 'General Physician', city: 'Mumbai', rating: '4.9', patients: '4,100+' }
  ];

  // Triplicate the list for seamless infinite looping
  const infiniteDoctors = [...doctorList, ...doctorList, ...doctorList];

  // Animation loop with cursor momentum and spring lerping
  useEffect(() => {
    let halfWidth = 0;

    const tick = () => {
      if (trackRef.current) {
        // Calculate half-width of content for seamless wrap
        const totalWidth = trackRef.current.scrollWidth;
        halfWidth = totalWidth / 3;

        if (!isDraggingRef.current) {
          // If user is hovering and moved cursor, apply velocity damping
          if (isHoveredRef.current) {
            targetOffsetRef.current += velocityRef.current;
            velocityRef.current *= 0.92; // Damping
            // Gentle base drift even when hovering
            targetOffsetRef.current += baseSpeedRef.current * 0.4;
          } else {
            // Normal continuous auto-flow
            targetOffsetRef.current += baseSpeedRef.current;
          }
        }

        // Spring lerp to target for liquid responsiveness
        offsetRef.current += (targetOffsetRef.current - offsetRef.current) * 0.15;

        // Seamless wrap around boundaries
        if (halfWidth > 0) {
          if (offsetRef.current <= -halfWidth) {
            offsetRef.current += halfWidth;
            targetOffsetRef.current += halfWidth;
          } else if (offsetRef.current >= 0) {
            offsetRef.current -= halfWidth;
            targetOffsetRef.current -= halfWidth;
          }

          // Calculate visual progress bar percentage (0% to 100%)
          const norm = Math.abs(offsetRef.current) % halfWidth;
          const pct = Math.min(Math.max((norm / halfWidth) * 100, 5), 95);
          setTrackProgress(pct);
        }

        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Cursor Move Handler: moving the cursor moves the cards!
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX;

    if (lastMouseXRef.current !== null) {
      const deltaX = currentX - lastMouseXRef.current;

      if (isDraggingRef.current) {
        // Direct tactile dragging
        targetOffsetRef.current += deltaX * 1.2;
        offsetRef.current += deltaX * 1.2;
        velocityRef.current = deltaX * 1.4;
      } else {
        // Cursor movement pushes the cards in real time!
        velocityRef.current = deltaX * 0.85;
        targetOffsetRef.current += deltaX * 0.6;
      }
    }

    lastMouseXRef.current = currentX;

    // Subtle magnetic steering: cursor position relative to container center
    const relX = (currentX - rect.left) / rect.width; // 0 to 1
    const steer = (relX - 0.5) * -1.8; // Move in direction of cursor gaze
    targetOffsetRef.current += steer;
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    setIsUserInteracting(true);
    lastMouseXRef.current = null;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    isDraggingRef.current = false;
    setIsUserInteracting(false);
    lastMouseXRef.current = null;
    velocityRef.current = 0;
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    startDragXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastMouseXRef.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Touch Support for mobile / touch devices
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.touches[0].clientX;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0 && isDraggingRef.current) {
      const currentX = e.touches[0].clientX;
      if (lastMouseXRef.current !== null) {
        const deltaX = currentX - lastMouseXRef.current;
        targetOffsetRef.current += deltaX * 1.2;
        offsetRef.current += deltaX * 1.2;
        velocityRef.current = deltaX * 1.2;
      }
      lastMouseXRef.current = currentX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    lastMouseXRef.current = null;
  }, []);

  return (
    <section
      aria-label="Doctors Network"
      className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative select-none"
    >
      {/* Background Ambient ECG Line & Watermark */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-25 dark:opacity-15 select-none">
        <EcgWaveform variant="compact" className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full" glow={false} />
      </div>

      {/* Header: Exact Match to Uploaded Image */}
      <div className="flex flex-col items-center justify-center space-y-1.5 text-center">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
          <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            TRUSTED BY DOCTORS ACROSS INDIA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium hidden sm:block">
          Move your cursor over the stream to steer doctor cards or drag to pan
        </p>
      </div>

      {/* Interactive Cursor-Driven Card Stream Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative overflow-hidden py-3 cursor-grab active:cursor-grabbing marquee-edge-mask transition-all duration-300 ${
          isUserInteracting ? 'ring-1 ring-blue-500/20 rounded-3xl' : ''
        }`}
      >
        {/* Dynamic Horizontal Moving Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-3.5 whitespace-nowrap will-change-transform"
          style={{ willChange: 'transform' }}
        >
          {infiniteDoctors.map((doc, idx) => {
            const initial = doc.name.split(' ')[1]?.[0] || doc.name[0] || 'D';
            const isCardActive = activeDoctor === `${doc.name}-${idx}`;

            return (
              <div
                key={`${doc.name}-${idx}`}
                onMouseEnter={() => setActiveDoctor(`${doc.name}-${idx}`)}
                onMouseLeave={() => setActiveDoctor(null)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800/90 border transition-all duration-200 shrink-0 shadow-xs group ${
                  isCardActive
                    ? 'border-blue-500 shadow-lg shadow-blue-500/15 -translate-y-1 scale-105 z-20 bg-blue-50/50 dark:bg-slate-800'
                    : 'border-slate-200/90 dark:border-slate-700/80 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {/* Doctor Initial Circle with Active Pulse */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isCardActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                  }`}
                >
                  {initial}
                </div>

                {/* Doctor Details */}
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {doc.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{doc.spec}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-slate-400" />
                      {doc.city}
                    </span>
                    {doc.rating && (
                      <>
                        <span>·</span>
                        <span className="text-amber-500 font-bold flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          {doc.rating}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Bottom Timeline Progress Track (matching the line in the screenshot) */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="relative h-1 bg-slate-200/80 dark:bg-slate-700/60 rounded-full overflow-hidden">
          {/* Active Flow Indicator Pill that tracks card movement */}
          <div
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full shadow-xs transition-all duration-75 ease-out"
            style={{
              left: `calc(${trackProgress}% - 48px)`
            }}
          />
        </div>
      </div>
    </section>
  );
}
