import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  Heart
} from 'lucide-react';

const FLOATING_DOCTORS = [
  {
    id: 'sharath',
    name: 'Dr. Sharath Nandib...',
    fullName: 'Dr. Sharath Nandibewoor',
    specialty: 'General Physician - Hyd...',
    fullSpecialty: 'General Physician · MBBS, MD · Hyderabad',
    url: 'clinicos.in/sharathearthclinic',
    badge: 'OPD Active',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'azeezunnisa',
    name: 'Azeezunnisa I',
    fullName: 'Dr. Azeezunnisa Irfan',
    specialty: 'Homeopathy / BHMS - ...',
    fullSpecialty: 'Homeopathy Specialist · BHMS · Bangalore',
    url: 'clinicos.in/drazmeera',
    badge: 'Online Booking',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
    color: 'from-teal-600 to-emerald-600'
  },
  {
    id: 'aparna',
    name: 'Aparna Yashaswi',
    fullName: 'Dr. Aparna Yashaswi',
    specialty: 'Dermatology - ACTION ...',
    fullSpecialty: 'Consultant Dermatologist · MD · Delhi',
    url: 'clinicos.in/aparnayashaswi',
    badge: 'Verified Practice',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'avani',
    name: 'Dr Avani Jain',
    fullName: 'Dr. Avani Jain',
    specialty: 'Dental Surgeon',
    fullSpecialty: 'Dental Surgeon & Orthodontics · BDS, MDS · Mumbai',
    url: 'clinicos.in/dravani',
    badge: 'Smart Prescriptions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    color: 'from-sky-600 to-blue-700'
  }
];

export function HeroInteractiveShowcase({ demoClinic, onOpenWhatsApp }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [activeDoctorIndex, setActiveDoctorIndex] = useState(2); // Aparna Yashaswi by default
  const [isHovered, setIsHovered] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Dynamic Telemetry State (Heart Rate breathes between 71 and 74 BPM)
  const [bpm, setBpm] = useState(72);
  const [isBpmPulsing, setIsBpmPulsing] = useState(false);

  // Auto-cycle through the 4 doctor cards when user is not manually hovering
  useEffect(() => {
    if (isHovered || isManualOverride) return;

    const interval = setInterval(() => {
      setActiveDoctorIndex((prev) => (prev + 1) % FLOATING_DOCTORS.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isHovered, isManualOverride]);

  // Subtle natural telemetry BPM fluctuation
  useEffect(() => {
    const bpmInterval = setInterval(() => {
      setBpm((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 70 && next <= 75 ? next : 72;
      });
      setIsBpmPulsing(true);
      setTimeout(() => setIsBpmPulsing(false), 300);
    }, 2400);

    return () => clearInterval(bpmInterval);
  }, []);

  // Smooth mouse move handler for 3D tilt and cursor spotlight
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle calibrated tilt angles (-6 to +6 degrees)
    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;

    setTilt({ x: rotateX, y: rotateY });
    setCursorPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsManualOverride(false);
    // Smooth reset
    setTilt({ x: 0, y: 0 });
  };

  const handleDoctorHover = (index) => {
    setActiveDoctorIndex(index);
    setIsManualOverride(true);
  };

  const activeDoc = FLOATING_DOCTORS[activeDoctorIndex] || FLOATING_DOCTORS[2];
  const sampleClinicSlug = demoClinic?.slug || 'citycare-family-clinic';

  const handleCardClick = (doc) => {
    navigate(`/clinic/${sampleClinicSlug}`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative select-none"
      style={{
        perspective: '1200px'
      }}
    >
      {/* Dynamic Background Glow Halo responding to cursor */}
      <div
        className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-2xl opacity-60 dark:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{
          transform: `translate3d(${tilt.y * 1.5}px, ${-tilt.x * 1.5}px, 0)`
        }}
      />

      {/* Main Container Card with 3D Parallax Tilt */}
      <div
        className="relative p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-white/95 via-blue-50/40 to-indigo-50/50 dark:from-slate-900/95 dark:via-blue-950/30 dark:to-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-900/10 dark:shadow-slate-950/50 backdrop-blur-md overflow-hidden transition-all"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 120ms ease-out' : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {/* Dynamic Cursor Spotlight Layer */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(420px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(37, 99, 235, 0.12), transparent 75%)`
            }}
          />
        )}

        {/* 1. Floating Top Telemetry & WhatsApp Notification Badges */}
        <div className="relative z-10 mb-4 flex items-center justify-between gap-2 flex-wrap">
          {/* Automated WhatsApp Pill Button */}
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-500/80 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all duration-200 cursor-pointer active:scale-95"
            title="Click to simulate Automated WhatsApp Patient Notification"
          >
            <div className="relative">
              <Smartphone className="w-3.5 h-3.5 text-emerald-500 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
            </div>
            <span className="font-medium text-[11px] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
              Automated WhatsApp Reminder Sent
            </span>
          </button>

          {/* Live Telemetry Heart Rate Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 text-[11px] font-bold shadow-2xs transition-all duration-200 ${
              isBpmPulsing ? 'scale-105 border-cyan-400 text-cyan-600 dark:text-cyan-300 shadow-cyan-500/20' : ''
            }`}
            title="Real-time cardiac rhythm telemetry simulator"
          >
            <Heart
              className={`w-3.5 h-3.5 text-cyan-500 fill-cyan-500/30 transition-transform ${
                isBpmPulsing ? 'scale-125 text-rose-500 fill-rose-500' : 'animate-cardiac-pulse'
              }`}
            />
            <span className="tabular-nums font-mono">{bpm} BPM</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold">Live Telemetry</span>
          </div>
        </div>

        {/* 2. 2x2 Interactive Doctor Cards Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5">
          {FLOATING_DOCTORS.map((doc, idx) => {
            const isActive = activeDoctorIndex === idx;

            return (
              <div
                key={doc.id}
                onMouseEnter={() => handleDoctorHover(idx)}
                onClick={() => handleCardClick(doc)}
                className={`p-3 rounded-2xl bg-white dark:bg-slate-800/90 border transition-all duration-300 flex flex-col justify-between space-y-2 relative group cursor-pointer ${
                  isActive
                    ? 'border-blue-500 dark:border-blue-400 shadow-xl shadow-blue-500/20 -translate-y-1.5 scale-[1.02] ring-2 ring-blue-500/30 dark:ring-blue-400/20 z-20'
                    : 'border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 opacity-90 hover:opacity-100 z-10'
                }`}
                title={`Click to preview ${doc.fullName}'s live clinic website`}
              >
                {/* Photo container with Live Indicator & URL Overlay */}
                <div className="relative rounded-xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-750">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';
                    }}
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                      isActive ? 'scale-108' : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Pulsing Live Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 shadow-sm backdrop-blur-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Live
                  </div>

                  {/* Active Selection Glow Ring */}
                  {isActive && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[8px] font-extrabold uppercase tracking-wider shadow-sm animate-fade-in">
                      Active
                    </div>
                  )}

                  {/* URL Overlay Bar */}
                  <div
                    className={`absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 rounded-lg text-[9px] font-mono truncate text-center backdrop-blur-md transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600/90 text-white font-bold shadow-xs translate-y-0'
                        : 'bg-black/60 text-slate-100 group-hover:bg-black/75'
                    }`}
                  >
                    {isActive ? (
                      <span className="flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3 shrink-0" />
                        <span className="truncate">{doc.url}</span>
                      </span>
                    ) : (
                      doc.url
                    )}
                  </div>
                </div>

                {/* Doctor Identity & Specialty */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-xs font-bold truncate transition-colors ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-900 dark:text-white group-hover:text-blue-600'
                      }`}
                    >
                      {doc.name}
                    </h4>
                    {isActive && (
                      <ArrowRight className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
                    {doc.specialty}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Bottom Live URL Notification Pill (Dynamically Morphing) */}
        <div className="relative z-10 mt-4 p-3 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center justify-between gap-2 text-xs transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate transition-all duration-200">
                {activeDoc.fullName || activeDoc.name}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate hidden sm:inline">
                Live at {activeDoc.url}
              </span>
            </div>
          </div>

          <Link
            to={`/clinic/${sampleClinicSlug}`}
            className="group shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all duration-150 active:scale-95 border border-blue-200/80 dark:border-blue-800/60"
          >
            <span>View Demo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

