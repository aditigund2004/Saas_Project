import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Smartphone,
  Monitor,
  CheckCircle2,
  Lock,
  Star,
  Globe
} from 'lucide-react';
import { EcgWaveform } from './EcgWaveform';

export function ZeroCodeWebsiteBuilderShowcase({ demoClinic }) {
  const [activeTab, setActiveTab] = useState('modern');
  const [activeThemeColor, setActiveThemeColor] = useState('azure');
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [selectedSlot, setSelectedSlot] = useState('4:30 PM');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Brand Color Themes
  const themeColors = [
    { id: 'azure', name: 'Azure Modern', hex: '#2563eb', bg: 'bg-blue-600', ring: 'ring-blue-500', text: 'text-blue-600', border: 'border-blue-500' },
    { id: 'emerald', name: 'Emerald Care', hex: '#059669', bg: 'bg-emerald-600', ring: 'ring-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500' },
    { id: 'amethyst', name: 'Royal Specialist', hex: '#7c3aed', bg: 'bg-purple-600', ring: 'ring-purple-500', text: 'text-purple-600', border: 'border-purple-500' },
    { id: 'rose', name: 'Clinical Rose', hex: '#e11d48', bg: 'bg-rose-600', ring: 'ring-rose-500', text: 'text-rose-600', border: 'border-rose-500' }
  ];

  const currentTheme = themeColors.find((t) => t.id === activeThemeColor) || themeColors[0];

  // Templates metadata
  const templates = {
    modern: {
      id: 'modern',
      tabName: 'Modern Medical Template',
      eyebrow: 'TEMPLATE 1: MODERN CLINIC',
      title: 'High-conversion card layout for family clinics and dental studios.',
      desc: 'Automatically connects to your appointments calendar, staff roster, and consultation fee catalog.',
      img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      clinicName: 'CityCare Family Health Clinic',
      doctor: 'Dr. Sarah Williams (MBBS, MD)',
      specialty: 'Internal Medicine & Family Health',
      slots: ['10:00 AM', '11:30 AM', '4:30 PM', '6:00 PM']
    },
    minimal: {
      id: 'minimal',
      tabName: 'Minimal Private Practice',
      eyebrow: 'TEMPLATE 2: EDITORIAL MINIMAL',
      title: 'Clean editorial typography focused on patient trust and aesthetics.',
      desc: 'Elegant minimalist aesthetic tailored for dermatology, mental health, and private specialist consulting.',
      img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      clinicName: 'The Dermatology & Aesthetics Studio',
      doctor: 'Dr. Aparna Yashaswi (MD, DNB)',
      specialty: 'Consultant Dermatologist & Laser Surgeon',
      slots: ['11:00 AM', '01:00 PM', '05:00 PM', '07:30 PM']
    },
    premium: {
      id: 'premium',
      tabName: 'Premium Specialist Clinic',
      eyebrow: 'TEMPLATE 3: EXECUTIVE SPECIALIST',
      title: 'Prestigious dark-accented executive template for surgical and super-specialty hubs.',
      desc: 'Designed for cardiology clinics, orthopedics, IVF centers, and multi-surgeon clinical practices.',
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      clinicName: 'Apex Heart & Surgical Institute',
      doctor: 'Dr. Vikram Singh (MS, MCh)',
      specialty: 'Senior Consultant Cardio-Thoracic Surgeon',
      slots: ['09:30 AM', '12:00 PM', '04:00 PM', '06:30 PM']
    }
  };

  const activeTemplate = templates[activeTab];

  // 3D perspective tilt calculation
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section
      id="website-builder"
      aria-label="Zero-Code Website Builder"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative overflow-hidden transition-colors"
    >
      {/* Background Ambient ECG Line & Watermark */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-25 dark:opacity-10 select-none">
        <EcgWaveform variant="compact" className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full" glow={false} />
      </div>

      {/* Header: Exact Match to Uploaded Image */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          ZERO-CODE WEBSITE BUILDER
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Launch Your Clinic Website in{' '}
          <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
            3 Clicks
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Pick a template, choose your medical brand colors, and start accepting online patient appointments.
        </p>
      </div>

      {/* Interactive Controls Bar: Templates + Color Palette + Viewport Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-xs">
        {/* 3 Template Switcher Tabs (Exact Match to Image) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Object.values(templates).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-102'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.tabName}
            </button>
          ))}
        </div>

        {/* Right side controls: Color Swatches & Device Mode */}
        <div className="flex items-center gap-4">
          {/* Live Brand Palette Swatches */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden lg:inline">
              Brand Color:
            </span>
            {themeColors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveThemeColor(c.id)}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer border-2 ${
                  activeThemeColor === c.id
                    ? 'border-slate-900 dark:border-white scale-125 shadow-xs'
                    : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Device Viewport Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                viewportMode === 'desktop'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Desktop Browser Preview"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                viewportMode === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Mobile Screen Preview"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Builder Visual Frame: Interactive Studio Stage */}
      <div className="p-6 sm:p-10 rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Template Details & Action CTAs */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className={`text-xs font-mono font-extrabold uppercase tracking-wider ${currentTheme.text}`}>
                {activeTemplate.eyebrow}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                SEO Ready
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              {activeTemplate.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {activeTemplate.desc}
            </p>

            {/* Feature Checklist */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>24/7 Real-time appointment slot booking with instant confirmation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Branded custom clinic domain (e.g. clinicos.in/your-practice)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Integrated Google Maps directions and verified patient reviews</span>
              </div>
            </div>

            {/* CTAs Matching Uploaded Screenshot */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link to="/app/website-builder">
                <button
                  type="button"
                  className="btn-animated-primary px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all duration-300"
                >
                  <span>Open Website Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to={`/clinic/${demoClinic?.slug || 'citycare-family-clinic'}`}>
                <button
                  type="button"
                  className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                >
                  <span>Preview Live Site</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Browser Frame or Smartphone Screen */}
          <div className="lg:col-span-6 flex justify-center">
            {/* DESKTOP BROWSER MOCKUP */}
            {viewportMode === 'desktop' && (
              <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-900 relative transition-transform duration-300"
                style={{
                  transform: isHovering
                    ? `perspective(1000px) rotateX(${-(mousePos.y - 150) * 0.02}deg) rotateY(${
                        (mousePos.x - 200) * 0.02
                      }deg)`
                    : 'none'
                }}
              >
                {/* Browser Top Window Chrome with URL */}
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 max-w-xs mx-auto bg-white dark:bg-slate-900 py-1 px-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1 truncate">
                      <Lock className="w-2.5 h-2.5 text-emerald-500" />
                      https://clinicos.in/your-practice
                    </span>
                    <Globe className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                </div>

                {/* Simulated Live Clinic Website Inside Browser Frame */}
                <div className="relative aspect-16/10 overflow-hidden group">
                  <img
                    src={activeTemplate.img}
                    alt={activeTemplate.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  {/* Overlaid Live Booking Mini-Widget */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold text-xs bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-white/20">
                      {activeTemplate.clinicName}
                    </span>
                    <span className="font-bold text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      1-Click Publish
                    </span>
                  </div>

                  {/* Doctor Profile Card inside Preview */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 dark:border-slate-700 shadow-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {activeTemplate.doctor}
                        </div>
                        <div className="text-[10px] text-slate-500">{activeTemplate.specialty}</div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> 4.9 (128)
                      </span>
                    </div>

                    {/* Interactive Clickable Slot Picker */}
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Select Online Slot:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeTemplate.slots.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedSlot(s)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                              selectedSlot === s
                                ? `${currentTheme.bg} text-white shadow-xs scale-105`
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MOBILE SCREEN MOCKUP */}
            {viewportMode === 'mobile' && (
              <div className="w-72 rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-900 dark:border-slate-700 bg-slate-950 p-2 animate-page-enter">
                {/* Phone Notch */}
                <div className="w-24 h-4 bg-slate-900 mx-auto rounded-b-xl mb-1 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-slate-950 inline-block mr-2" />
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                </div>

                <div className="rounded-[28px] overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-white space-y-3 p-3">
                  <div className="aspect-video rounded-xl overflow-hidden relative">
                    <img src={activeTemplate.img} alt="Mobile preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-[9px] bg-black/70 text-white px-2 py-0.5 rounded">
                      clinicos.in/your-practice
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-600 font-bold block">{activeTemplate.clinicName}</span>
                    <span className="text-xs font-bold block">{activeTemplate.doctor}</span>
                    <span className="text-[10px] text-slate-400">{activeTemplate.specialty}</span>
                  </div>
                  <div className="pt-1">
                    <button
                      type="button"
                      className={`w-full py-2 rounded-xl text-white text-[11px] font-bold shadow-md cursor-pointer ${currentTheme.bg}`}
                    >
                      Book Appointment ({selectedSlot})
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
