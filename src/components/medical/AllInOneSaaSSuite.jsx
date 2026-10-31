import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Smartphone,
  FileText,
  Clock,
  Users,
  Building2,
  ShieldCheck,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { EcgWaveform } from './EcgWaveform';

export function AllInOneSaaSSuite() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ctaMousePos, setCtaMousePos] = useState({ x: 0, y: 0, isHover: false });

  const features = [
    {
      id: 'calendar',
      title: 'Conflict-Proof Calendar',
      desc: 'Day & week views with real-time doctor availability and zero double-booking conflicts.',
      icon: Calendar,
      tag: 'Zero Double Bookings',
      detail: 'Smart slot holding locks patient booking in real-time, synchronizing appointments across website, walk-ins, and emergency slots with zero overlap.',
      metric: 'Real-time slot lock'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Automation',
      desc: 'Instant booking confirmations, appointment reminders, and follow-up alerts sent to patients.',
      icon: Smartphone,
      tag: 'Automated Reminders',
      detail: 'Automated 24h & 2h advance appointment alerts, clinic location pins, digital prescription download links, and post-visit follow-up instructions.',
      metric: '98% Patient Reach'
    },
    {
      id: 'prescriptions',
      title: 'Digital Prescriptions',
      desc: 'Clean A4 prescription composer with dosage presets, drug library, and verified QR code.',
      icon: FileText,
      tag: 'Verified Legal Rx',
      detail: 'Built-in 10,000+ Indian drug formulary, automated drug allergy and interaction warnings, branded clinic letterheads, and public QR verification.',
      metric: 'Tamper-Proof QR'
    },
    {
      id: 'queue',
      title: 'Front-Desk Queue',
      desc: 'Speed-optimized reception station for walk-in patient check-in, token triage, and billing.',
      icon: Clock,
      tag: 'Live Token Screen',
      detail: 'Under 30-second patient triage, instant printable token tickets, doctor consultation status board, and waiting room digital display sync.',
      metric: '<30s Patient Triage'
    },
    {
      id: 'patients',
      title: 'Patient Directory',
      desc: 'Full digital medical histories, allergies, past prescriptions, and consultation notes.',
      icon: Users,
      tag: 'Unified Health Record',
      detail: 'Complete longitudinal patient charts across OPD visits, lab report uploads, past vital trends, chronic disease tracking, and family member accounts.',
      metric: '1-Click Search'
    },
    {
      id: 'branches',
      title: 'Multi-Branch Support',
      desc: 'Manage central practice and satellite clinics with 1-click tenant workspace switching.',
      icon: Building2,
      tag: 'Multi-Clinic Roster',
      detail: 'Shared or isolated patient charts, cross-clinic doctor scheduling, role-based staff permissions, and unified executive financial analytics.',
      metric: 'Consolidated Reporting'
    },
    {
      id: 'billing',
      title: 'Billing & Invoicing',
      desc: 'Track consultation fees, procedure invoices, collections, and daily financial summaries.',
      icon: ShieldCheck,
      tag: 'GST Audit-Proof',
      detail: 'Itemized consultation & lab receipts, automated GST calculations, split payments (UPI, Cash, Card, Insurance), and automated daily cash drawer tally.',
      metric: 'Instant GST Receipts'
    },
    {
      id: 'website',
      title: 'SEO Clinic Website',
      desc: 'Rank on Google searches and allow patients to discover doctors and book slots 24/7.',
      icon: Globe,
      tag: 'Google Search Rank',
      detail: 'Blazing-fast personalized clinic portal on clinicos.in/your-practice, structured medical schema markup for Google Maps, and verified patient reviews.',
      metric: '3.8x Local Discovery'
    }
  ];

  // Mouse move handler for feature cards
  const handleCardMouseMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredCard(idx);
  };

  // Mouse move handler for CTA banner
  const handleCtaMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCtaMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHover: true
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 7. Core Platform Features */}
      <section
        id="features"
        aria-label="All-In-One SaaS Suite"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative overflow-hidden transition-colors"
      >
        {/* Background Ambient ECG Line & Watermark */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-20 select-none">
          <EcgWaveform variant="compact" className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full" glow={false} />
        </div>

        {/* Section Header: Exact Match to Uploaded Image */}
        <div className="text-center max-w-xl mx-auto space-y-2.5">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            ALL-IN-ONE SAAS SUITE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Everything You Need to Run Your Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Click on any module to inspect real-time clinical capabilities and workflow integrations.
          </p>
        </div>

        {/* 8 Feature Cards Grid (2 rows of 4 cards on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isHovered = hoveredCard === i;
            const isSelected = selectedFeature?.id === f.id;

            return (
              <div
                key={f.id}
                onMouseMove={(e) => handleCardMouseMove(e, i)}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedFeature(isSelected ? null : f)}
                className={`relative p-6 rounded-3xl cursor-pointer select-none transition-all duration-300 border overflow-hidden ${
                  isSelected
                    ? 'bg-blue-50/90 dark:bg-slate-800 border-2 border-blue-500 shadow-xl shadow-blue-500/15 -translate-y-1.5 scale-102'
                    : isHovered
                    ? 'bg-white dark:bg-slate-900 border-blue-400/80 dark:border-blue-500/60 shadow-xl shadow-blue-500/10 -translate-y-1.5 scale-101'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Dynamic Cursor Spotlight Effect */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                    style={{
                      background: `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.12), transparent 75%)`
                    }}
                  />
                )}

                <div className="space-y-3.5 relative z-10">
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isHovered || isSelected
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/35 scale-110'
                          : 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60'
                      }`}
                    >
                      <Icon className="w-5 h-5 transition-transform duration-300" />
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide transition-colors ${
                        isHovered || isSelected
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {f.metric}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{f.title}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  {/* Hover Quick Action Indicator */}
                  <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1">
                      {isSelected ? 'Click to minimize' : 'Explore workflow'}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Feature Live Deep-Dive Drawer */}
        {selectedFeature && (
          <div className="animate-page-enter p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-indigo-500/10 border-2 border-blue-500/50 dark:border-blue-500/40 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-200/60 dark:border-blue-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                  <selectedFeature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {selectedFeature.title} · Live Architecture Overview
                  </h4>
                  <p className="text-xs text-slate-500">{selectedFeature.tag}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs"
              >
                Close View ✕
              </button>
            </div>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedFeature.detail}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    ✓ Integrated into Single Workspace
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    ⚡ Instant Sync Across Reception & Doctor
                  </span>
                </div>
              </div>
              <div className="flex justify-start md:justify-end">
                <Link to="/onboarding">
                  <button
                    type="button"
                    className="btn-animated-primary px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Test In Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 8. Bottom High-Converting CTA Banner (Exact Match to Image with Ambient Light Motion) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onMouseMove={handleCtaMouseMove}
          onMouseLeave={() => setCtaMousePos((prev) => ({ ...prev, isHover: false }))}
          className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-slate-950 via-[#0B1528] to-blue-950 text-white shadow-2xl relative overflow-hidden border border-slate-800/90 transition-all duration-300 group"
        >
          {/* Dynamic Ambient Cursor Spotlight in CTA Background */}
          {ctaMousePos.isHover && (
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                background: `radial-gradient(circle 280px at ${ctaMousePos.x}px ${ctaMousePos.y}px, rgba(37, 99, 235, 0.18), transparent 70%)`
              }}
            />
          )}

          {/* Glowing Ambient Mesh Accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left Column: Eyebrow, Headline, Subtext */}
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Start Free · No Credit Card Required
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Get Your Doctor Website & Clinic Software Live Today with{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  ClinicOS.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Join thousands of Indian doctors who manage patient bookings, digital prescriptions, and front-desk operations on ClinicOS.
              </p>

              {/* Trust Telemetry Metrics */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  7-Day Full Access
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Setup in 5 Minutes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Cancel Anytime
                </span>
              </div>
            </div>

            {/* Right Column: CTA Buttons Matching Exact Image */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0">
              <Link to="/onboarding">
                <button
                  type="button"
                  className="btn-animated-primary px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-blue-500/40 active:scale-[0.98]"
                >
                  <span>Start Free — 7 Days Trial</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </Link>
              <Link to="/pricing">
                <button
                  type="button"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 font-bold text-sm backdrop-blur-xs transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm hover:scale-102"
                >
                  <span>View Plans & Pricing</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
