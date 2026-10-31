import React, { useState } from 'react';
import {
  CheckCircle2,
  FileText,
  Calendar,
  Globe,
  FileCheck2,
  MessageSquare,
  Receipt,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  Layers,
  Columns
} from 'lucide-react';
import { EcgWaveform } from './EcgWaveform';

export function ClinicalWorkflowComparison() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'matrix'
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, cardSide: null });

  const comparisonData = [
    {
      id: 'records',
      category: 'Records',
      icon: FileText,
      without: 'Paper registers and lost prescription slips',
      withoutDetail: 'Manual physical folders get misplaced, tear over time, and require 10-15 mins of hunting per patient.',
      with: '1-Click searchable digital patient charts & records',
      withDetail: 'Instant unified patient timeline across past consultations, lab reports, and drug allergies in under 2 seconds.',
      metric: '15m → 2s Search',
      impact: 'Zero Record Loss'
    },
    {
      id: 'appointments',
      category: 'Appointments',
      icon: Calendar,
      without: 'Missed phone calls during consultations and double bookings',
      withoutDetail: 'Receptionists answering constant phone calls disrupts the doctor and creates overcrowded, chaotic waiting rooms.',
      with: '24/7 online appointment booking with real-time slot lock',
      withDetail: 'Automated self-service patient booking with live token numbers, automated slot holding, and zero duplicate bookings.',
      metric: '24/7 Live Booking',
      impact: '+42% Booking Rate'
    },
    {
      id: 'presence',
      category: 'Online Presence',
      icon: Globe,
      without: 'Zero Google search presence or patient discovery',
      withoutDetail: 'Relying exclusively on word-of-mouth leaves your clinic invisible to patients searching for specialists nearby.',
      with: 'Personalized SEO-optimized clinic website on your custom URL',
      withDetail: 'A high-converting, professional clinic portal indexed on Google with verified patient reviews and 1-click booking.',
      metric: '3.8x Local Reach',
      impact: 'Custom Domain'
    },
    {
      id: 'prescriptions',
      category: 'Prescriptions',
      icon: FileCheck2,
      without: 'Manual handwriting that patients and pharmacies struggle to read',
      withoutDetail: 'Illegible handwriting causes pharmacy dispensing errors, incorrect dosages, and frequent patient confusion.',
      with: 'Digital A4 prescriptions with verified authenticity QR codes',
      withDetail: 'Clean printed or PDF prescriptions with tamper-proof QR verification, branded clinic letterhead, and safety checks.',
      metric: '100% Legible Rx',
      impact: 'QR Authenticated'
    },
    {
      id: 'followups',
      category: 'Follow-ups',
      icon: MessageSquare,
      without: 'Forgotten patient follow-ups and lost recurring visits',
      withoutDetail: 'Chronic disease patients forget follow-up appointments, leading to dropped care continuity and lost practice revenue.',
      with: 'Automated WhatsApp reminders & post-consultation messages',
      withDetail: 'Automated appointment reminders, medication schedule alerts, and digital visit summaries sent directly to WhatsApp.',
      metric: '78% Return Rate',
      impact: 'Automated WhatsApp'
    },
    {
      id: 'billing',
      category: 'Billing',
      icon: Receipt,
      without: 'Disconnected billing spreadsheets and manual collections',
      withoutDetail: 'Cash leakages, unrecorded discounts, and stressful end-of-month reconciliation across multiple notebooks.',
      with: 'Integrated clinic invoices, daily collections, and GST receipts',
      withDetail: 'Instant OPD billing, multiple payment methods (UPI, Cash, Card), daily cash drawer reconciliation, and 1-click GST exports.',
      metric: '100% Reconciled',
      impact: 'GST Audit-Proof'
    }
  ];

  const filteredData =
    activeCategory === 'all'
      ? comparisonData
      : comparisonData.filter((item) => item.id === activeCategory);

  // Dynamic cursor spotlight per card
  const handleMouseMove = (e, side) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      cardSide: side
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, cardSide: null });
  };

  return (
    <section
      id="comparison"
      aria-label="Clinical Workflow Comparison"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 relative overflow-hidden transition-colors"
    >
      {/* Background Ambient Medical Elements: ECG & Watermark */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-30 dark:opacity-15 select-none">
        <EcgWaveform variant="compact" className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full" glow={false} />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-rose-400/10 dark:bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Header (Exact Match to Uploaded Image) */}
      <div className="text-center max-w-2xl mx-auto space-y-3 relative">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          CLINICAL WORKFLOW COMPARISON
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Why Clinics Upgrade to{' '}
          <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
            ClinicOS
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          Compare manual legacy clinic operations with modern automated SaaS practice management.
        </p>

        {/* Category Filter Pills & View Mode Switcher */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Workflows (6)' },
            { id: 'records', label: 'Records' },
            { id: 'appointments', label: 'Appointments' },
            { id: 'presence', label: 'Online Presence' },
            { id: 'prescriptions', label: 'Prescriptions' },
            { id: 'followups', label: 'WhatsApp Follow-ups' },
            { id: 'billing', label: 'Billing & GST' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* View Mode Toggle: Dual Cards vs Matrix View */}
          <div className="hidden sm:inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ml-2">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Side-by-side cards view"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Matrix row transformation view"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: SIDE-BY-SIDE DUAL CARDS (Enhanced Direct Upgrade of Screenshot) */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
          {/* Synchronized Bridge Indicator between columns on desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-blue-500 shadow-xl items-center justify-center text-blue-600 font-bold text-xs pointer-events-none">
            VS
          </div>

          {/* LEFT: WITHOUT CLINICOS */}
          <div
            onMouseMove={(e) => handleMouseMove(e, 'without')}
            onMouseLeave={handleMouseLeave}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-rose-50/80 via-white to-rose-50/40 dark:from-rose-950/20 dark:via-slate-900/60 dark:to-rose-950/10 border-2 border-rose-200/90 dark:border-rose-900/60 shadow-lg relative overflow-hidden transition-all duration-300 group hover:shadow-xl"
          >
            {/* Dynamic Cursor Spotlight for Without card */}
            {mousePos.cardSide === 'without' && (
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                  background: `radial-gradient(circle 160px at ${mousePos.x}px ${mousePos.y}px, rgba(244, 63, 94, 0.08), transparent 80%)`
                }}
              />
            )}

            {/* Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-200/80 dark:border-rose-900/50">
              <div className="flex items-center gap-2.5 text-rose-700 dark:text-rose-400 font-black text-sm uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-rose-200 dark:bg-rose-900/80 flex items-center justify-center text-xs font-black shadow-xs">
                  ✕
                </span>
                <span>WITHOUT CLINICOS</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Legacy Manual Bottlenecks
              </span>
            </div>

            {/* List of Legacy Pain Points with Paired Hover Synchronization */}
            <ul className="space-y-4 pt-5">
              {filteredData.map((c, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <li
                    key={c.id}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? 'bg-rose-100/70 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 shadow-xs scale-101'
                        : 'hover:bg-rose-50/60 dark:hover:bg-rose-950/20 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✕
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-bold text-rose-950 dark:text-rose-200 leading-snug">
                          {c.without}
                        </div>
                        <p className="text-[11px] text-rose-700/80 dark:text-rose-300/70 leading-relaxed font-normal">
                          {c.withoutDetail}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT: WITH CLINICOS (Crown Jewel of the Platform) */}
          <div
            onMouseMove={(e) => handleMouseMove(e, 'with')}
            onMouseLeave={handleMouseLeave}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-blue-50/90 via-white to-blue-50/50 dark:from-blue-950/40 dark:via-slate-900/80 dark:to-blue-950/20 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 relative overflow-hidden transition-all duration-300 group hover:shadow-blue-500/30"
          >
            {/* Dynamic Cursor Spotlight for With card */}
            {mousePos.cardSide === 'with' && (
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                  background: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.12), transparent 80%)`
                }}
              />
            )}

            {/* Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2.5 text-blue-700 dark:text-blue-300 font-black text-sm uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                  ✓
                </span>
                <span>WITH CLINICOS</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-600 text-white shadow-xs">
                Next-Gen Medical SaaS
              </span>
            </div>

            {/* List of Modern Upgrades with Quantified Metrics */}
            <ul className="space-y-4 pt-5">
              {filteredData.map((c, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <li
                    key={c.id}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? 'bg-blue-100/70 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-700 shadow-sm scale-101'
                        : 'hover:bg-blue-50/70 dark:hover:bg-blue-950/30 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 fill-emerald-100 dark:fill-emerald-950" />
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {c.with}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 shrink-0">
                            {c.impact}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {c.withDetail}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* MODE 2: MATRIX ROW TRANSFORMATION VIEW */}
      {viewMode === 'matrix' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 animate-page-enter">
          <div className="grid grid-cols-12 gap-4 p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <div className="col-span-12 sm:col-span-5 text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <span>✕ Legacy Operation</span>
            </div>
            <div className="hidden sm:block sm:col-span-1 text-center text-slate-400">
              →
            </div>
            <div className="col-span-12 sm:col-span-6 text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
              <span>✓ ClinicOS Transformation</span>
            </div>
          </div>

          {filteredData.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-12 gap-4 p-4 sm:p-5 items-center hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors"
            >
              {/* Legacy Side */}
              <div className="col-span-12 sm:col-span-5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✕
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-rose-950 dark:text-rose-200">
                    {c.without}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                  {c.withoutDetail}
                </p>
              </div>

              {/* Arrow Bridge */}
              <div className="hidden sm:flex sm:col-span-1 items-center justify-center text-blue-500 font-bold">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* ClinicOS Upgrade Side */}
              <div className="col-span-12 sm:col-span-6 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {c.with}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 shrink-0">
                    {c.metric}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                  {c.withDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EXECUTIVE IMPACT & ROI BANNER (Below Comparison) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="group relative p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-blue-400/80 dark:hover:border-blue-500/80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              2.5 hrs / day
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-800/60">
                Verified
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Saved in administrative overhead
            </div>
          </div>
        </div>

        <div className="group relative p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-emerald-400/80 dark:hover:border-emerald-500/80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              +35% Revenue
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                Growth
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              From online discovery & WhatsApp follow-ups
            </div>
          </div>
        </div>

        <div className="group relative p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-purple-400/80 dark:hover:border-purple-500/80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              100% Retrievable
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
                EHR
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Audit-ready digital prescriptions & records
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
