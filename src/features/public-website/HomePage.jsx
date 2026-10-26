import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Smartphone,
  Layers,
  Activity,
  HeartPulse,
  Receipt,
  Package,
  BarChart3,
  Stethoscope,
  Dna,
  Microscope,
  Smile,
  Baby,
  Bone
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useApp } from '../../context/AppContext';

export function HomePage() {
  const { clinics, openWhatsAppModal } = useApp();
  const [activeTab, setActiveTab] = useState('dental');

  const specialtySolutions = {
    dental: {
      title: 'Dental & Orthodontic Clinics',
      description: 'Single-sitting RCT tracking, clear aligner milestones, tooth-by-tooth diagnosis, and automated post-procedure WhatsApp follow-ups.',
      highlights: ['Digital IOPA & OPG attachment logs', 'Multi-tray aligner follow-up schedule', 'Consumables & anesthetic stock monitoring'],
      icon: Smile,
      sampleClinic: 'Apex Dental & Maxillofacial Care',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    },
    orthopedic: {
      title: 'Orthopedic & Joint Care Centers',
      description: 'Pre/post-op rehab sessions, joint injection logs, physical therapy scheduling, and imaging report archives.',
      highlights: ['Surgical package & installment invoicing', 'Physiotherapy batch attendance', 'Implant and brace inventory tracking'],
      icon: Bone,
      sampleClinic: 'Pulse Orthopedics & Joint Care',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    },
    dermatology: {
      title: 'Dermatology & Aesthetic Clinics',
      description: 'Laser session packages, chemical peel schedules, trichology follow-ups, and patch test consent logs.',
      highlights: ['PRP & laser package session counters', 'Topical pharmacy prescription templates', 'Sensitive skin consent records'],
      icon: Sparkles,
      sampleClinic: 'DermaGlow Skin & Laser Center',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    },
    pediatrics: {
      title: 'Pediatrics & Child Wellness Hubs',
      description: 'WHO milestone growth charts, digital immunization cards, reminder alerts for booster shots, and parental phone updates.',
      highlights: ['Vaccination schedule & cold-chain batch tracking', 'Growth percentiles (height, weight, BMI)', 'Child-friendly queue and rapid walk-ins'],
      icon: Baby,
      sampleClinic: 'LittleCare Pediatrics Hub',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
    },
    nursing_home: {
      title: '10–30 Bed Nursing Homes',
      description: 'Bed occupancy status, telemetry vitals, round-the-clock nurse shift handover notes, and sub-acute inpatient day billing.',
      highlights: ['Real-time bed occupancy grid (10-30 beds)', 'Daily doctor visit and nursing charge entries', 'Discharge summaries with verifiable QR code'],
      icon: Building2,
      sampleClinic: 'GreenHaven Recovery & Nursing Home',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80'
    }
  };

  const featureCards = [
    { title: 'Appointment Scheduling', desc: 'Day, week, month, and list calendar views with zero double-booking conflicts.', icon: Calendar },
    { title: 'Walk-In Patient Registration', desc: 'Front-desk express registration with instant queue token generation in 30 seconds.', icon: Clock },
    { title: 'Centralized Patient Records', desc: 'Secure medical histories, allergy alerts, past visits, and contact preferences.', icon: Users },
    { title: 'Doctor Availability & Rosters', desc: 'Flexible working hours, multi-branch schedules, and slot duration control.', icon: Stethoscope },
    { title: 'Digital PDF Prescriptions', desc: 'Clean A4 prescription generator with drug dosage presets & clinical advice.', icon: FileText },
    { title: 'QR Authenticity Verification', desc: 'Tamper-evident verification badge so pharmacies and patients verify legitimacy.', icon: ShieldCheck },
    { title: 'WhatsApp Booking Confirmations', desc: 'Automated booking confirmations, reminders, and follow-ups on patient mobile.', icon: Smartphone },
    { title: 'Patient Follow-Up Tracker', desc: 'Proactively manage recovery visits and ensure ongoing treatment compliance.', icon: HeartPulse },
    { title: 'Billing, Invoices & Expenses', desc: 'Itemized clinic invoices, partial payments, payment modes, and overhead tracking.', icon: Receipt },
    { title: 'Clinical Inventory Alerts', desc: 'Stock quantities, minimum stock triggers, and disposables replenishment logs.', icon: Package },
    { title: 'Daily & Monthly Analytics', desc: 'Visual charts for attendance, revenue trends, doctor performance, and no-shows.', icon: BarChart3 },
    { title: 'Multi-Branch Management', desc: 'Manage satellite clinics and central practices with seamless tenant switching.', icon: Building2 },
    { title: '14-Day Free SaaS Trial', desc: 'Instant onboarding for independent clinics without mandatory credit cards.', icon: Sparkles },
    { title: 'Nursing Home Bed Tracker', desc: 'Optional module for sub-acute 10–30 bed facilities and shift handovers.', icon: Layers }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24 py-4 sm:py-6 overflow-hidden w-full max-w-full">
      {/* 1. Medonix-Style Hero Section: High Contrast, Bold Typography & Glowing Ambient Lighting */}
      <section className="relative pt-6 sm:pt-14 pb-12 sm:pb-20">
        {/* Ambient background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-green-500/10 to-teal-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Headline, Subtitle, Badges, CTAs */}
            <div className="lg:col-span-7 space-y-7 animate-fade-in">
              {/* Medonix-Style Glowing Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F0FDF4] border-2 border-[#DCFCE7] text-[#166534] text-xs sm:text-sm font-extrabold shadow-sm hover:scale-102 transition-all">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#15803D]" />
                </span>
                <span className="tracking-wide">Next-Gen Healthcare SaaS Platform · 14-Day Full Free Access</span>
              </div>

              {/* Large, Punchy Headline with High Contrast */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
                Run Your Clinic Smarter. <br />
                <span className="bg-gradient-to-r from-[#15803D] via-[#166534] to-teal-700 bg-clip-text text-transparent">
                  Spend Less Time on Paperwork.
                </span>
              </h1>

              {/* Increased Font Size & High-Contrast Paragraph */}
              <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed font-normal">
                Manage appointments, electronic records, tamper-evident digital prescriptions, patient queue tokens, and itemized billing from one unified cockpit. Give your front desk the superpower to serve patients in seconds.
              </p>

              {/* Action Buttons with Glowing Elevation */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/register/clinic">
                  <Button
                    variant="primary"
                    size="lg"
                    className="h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-extrabold rounded-xl shadow-[0_10px_25px_-5px_rgba(21,128,61,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(21,128,61,0.45)] hover:scale-102 transition-all"
                  >
                    Start 14-Day Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-bold rounded-xl border-2 border-slate-300 hover:border-[#15803D] hover:text-[#15803D] bg-white shadow-xs hover:scale-102 transition-all"
                  >
                    Explore 14 Modules
                  </Button>
                </Link>
              </div>

              {/* Key Benefit Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t-2 border-slate-200/90">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D] shrink-0" />
                    <span>Conflict-Free</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Zero double-bookings</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D] shrink-0" />
                    <span>30s Check-In</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Walk-in queue tokens</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D] shrink-0" />
                    <span>QR Prescriptions</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Print PDF & QR verified</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D] shrink-0" />
                    <span>WhatsApp Alerts</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Automated reminders</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Medonix Glassmorphism Mockup with Floating Animations */}
            <div className="lg:col-span-5 relative">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#15803D] via-[#166534] to-teal-600 opacity-25 blur-2xl animate-glow-pulse" />

              {/* Floating Live Badge */}
              <div className="absolute -top-5 -right-3 z-20 animate-float">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Live System Ready
                </span>
              </div>

              {/* Interactive Cockpit Card */}
              <div className="relative bg-white rounded-3xl border-2 border-slate-200/90 shadow-2xl p-6 sm:p-7 space-y-5 transition-transform hover:-translate-y-1 duration-300">
                {/* Header Row */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block shadow-2xs" />
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block shadow-2xs" />
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block shadow-2xs" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-900 ml-2">Apex Dental Clinic · Downtown</span>
                  </div>
                  <Badge variant="Active">18 Visits Today</Badge>
                </div>

                {/* Metric Summary Counters */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 bg-[#F0FDF4] rounded-2xl border border-[#DCFCE7] text-center">
                    <p className="text-[11px] uppercase font-extrabold text-[#166534] tracking-wider">Waiting</p>
                    <p className="text-2xl font-black text-[#14532D] mt-0.5">3</p>
                  </div>
                  <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200 text-center">
                    <p className="text-[11px] uppercase font-extrabold text-indigo-700 tracking-wider">In Chair</p>
                    <p className="text-2xl font-black text-indigo-950 mt-0.5">1</p>
                  </div>
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                    <p className="text-[11px] uppercase font-extrabold text-emerald-700 tracking-wider">Completed</p>
                    <p className="text-2xl font-black text-emerald-950 mt-0.5">14</p>
                  </div>
                </div>

                {/* Queue Cards in live preview */}
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-2xl border-2 border-[#DCFCE7] bg-[#F0FDF4]/80 flex items-center justify-between text-xs sm:text-sm shadow-xs">
                    <div>
                      <p className="font-extrabold text-slate-950">Aarav Patel (PT-1041)</p>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">10:30 AM · Root Canal · Dr. Arvind Rao</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#15803D] text-white shadow-xs">
                      In Chair
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <p className="font-bold text-slate-900">Meera Deshmukh (PT-1042)</p>
                      <p className="text-xs text-slate-500 mt-0.5">11:30 AM · Dental Consultation · Token #Q-02</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Waiting
                    </span>
                  </div>
                </div>

                {/* WhatsApp Interactive Simulated Trigger */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-slate-800">Automated WhatsApp Reminder</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsAppModal({
                        patient_name: 'Meera Deshmukh',
                        clinic_name: 'Apex Dental Care',
                        appointment_date: 'Today',
                        appointment_time: '11:30 AM',
                        doctor_name: 'Dr. Arvind Rao',
                        appointment_reference: 'APT-2602'
                      })
                    }
                    className="px-3 py-1 rounded-lg text-xs font-extrabold text-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#86EFAC] transition-colors cursor-pointer"
                  >
                    Simulate ⚡
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Branch: Downtown Studio</span>
                  <Link to="/clinic/dashboard" className="text-[#15803D] hover:text-[#166534] transition-colors">
                    Open Practice Cockpit →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Medonix Metrics Strip: Large Numbers, High Contrast Opposite of Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 sm:p-10 rounded-3xl bg-slate-950 text-white shadow-2xl border-2 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">50+</span>
            <p className="text-base font-bold text-emerald-400">Specialty Clinics</p>
            <p className="text-xs text-slate-300 font-normal">Active practices running daily OPD</p>
          </div>
          <div className="space-y-1 relative z-10">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">30s</span>
            <p className="text-base font-bold text-teal-400">Fast Token Check-In</p>
            <p className="text-xs text-slate-300 font-normal">Express front-desk registration</p>
          </div>
          <div className="space-y-1 relative z-10">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">100%</span>
            <p className="text-base font-bold text-indigo-400">QR Tamper-Evident</p>
            <p className="text-xs text-slate-300 font-normal">Verifiable digital prescriptions</p>
          </div>
          <div className="space-y-1 relative z-10">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">99.9%</span>
            <p className="text-base font-bold text-emerald-400">SaaS Uptime SLA</p>
            <p className="text-xs text-slate-300 font-normal">Zero-friction high availability</p>
          </div>
        </div>
      </section>

      {/* 2.5 Biomedical & Hospital Field Visual Showcase Strip (Hospital Imagery, Microscopic Blood Cells, 3D DNA Helix) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] text-xs font-black uppercase tracking-wider">
              <HeartPulse className="w-4 h-4 text-[#15803D] animate-pulse" />
              <span>Biomedical & Hospital Field Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
              Built for Real Hospitals & Clinical Facilities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              From advanced inpatient wards and ICU monitoring to digital hematology and genomic health profiles, ClinicOS powers modern healthcare organizations.
            </p>
          </div>
          <Link to="/features" className="shrink-0">
            <Button variant="outline" size="md" className="font-bold border-2">
              Explore Clinical Infrastructure <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Showcase Card 1: Modern Hospital Facilities */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-200/90 bg-white hover:border-[#15803D] hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
                alt="Hospital Facility & Wards"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/95 backdrop-blur-xs text-slate-900 shadow-md flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#15803D]" />
                  Hospital Wings & ICU
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-black uppercase text-emerald-400 tracking-wider block">Clinical Inpatient</span>
                <h3 className="text-xl font-black text-white">Smart Hospital Facilities</h3>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Multi-floor hospital wards, real-time bed telemetry, sub-acute nursing care, and multi-branch emergency coordination.
              </p>
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> ICU Telemetry
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Bed Allocation
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> 24/7 Ward Rotas
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Discharge Slips
                </span>
              </div>
            </div>
          </div>

          {/* Showcase Card 2: DNA & Genomic Science */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-200/90 bg-white hover:border-[#15803D] hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80"
                alt="DNA Double Helix"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/95 backdrop-blur-xs text-slate-900 shadow-md flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5 text-teal-600" />
                  DNA & Genomics
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-black uppercase text-teal-400 tracking-wider block">Genomic Medicine</span>
                <h3 className="text-xl font-black text-white">DNA & Molecular Health</h3>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Molecular health records, hereditary allergy markers, pharmacogenomic drug-reaction warnings, and lab sequencing logs.
              </p>
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Molecular EMR
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Gene Markers
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Allergy Triggers
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Rx Safety Checks
                </span>
              </div>
            </div>
          </div>

          {/* Showcase Card 3: Microscopic Blood Cells (Hematology) */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-200/90 bg-white hover:border-[#15803D] hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
                alt="Microscopic Blood Cells"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/95 backdrop-blur-xs text-slate-900 shadow-md flex items-center gap-1.5">
                  <Microscope className="w-3.5 h-3.5 text-rose-600" />
                  Hematology Lab
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-black uppercase text-rose-400 tracking-wider block">Cellular Diagnostics</span>
                <h3 className="text-xl font-black text-white">Microscopic Blood Cells</h3>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Complete blood counts (CBC), erythrocyte sedimentation rates, automated lab analyzer sync, and critical hematology alert flags.
              </p>
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> CBC Telemetry
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Blood Panels
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Barcode Samples
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Critical Alerts
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem & Solution Bento Grid: Enhanced Card Padding, Typography & Hover Lift */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-extrabold text-[#166534] uppercase tracking-widest bg-[#F0FDF4] px-3.5 py-1.5 rounded-full border border-[#86EFAC]">
            Digital Transformation
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            From Paper Registers to Seamless SaaS
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            Independent clinics lose 14+ hours every week to manual phone calls, lost prescription notes, disorganized registers, and disconnected billing spreadsheets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              problem: 'Paper Registers & Double Bookings',
              solution: 'Conflict-Proof Digital Calendar',
              detail: 'Interactive day, week, and month calendar views with real-time doctor availability and automated double-booking warnings.'
            },
            {
              problem: 'Front Desk Queue Congestion',
              solution: 'Express Walk-In Registration',
              detail: 'Front-desk staff can register walk-ins in under 30 seconds and issue live patient queue tokens.'
            },
            {
              problem: 'Lost Paper Prescriptions',
              solution: 'Digital PDF Rx with QR Verification',
              detail: 'Standardized A4 prescriptions with drug dosages, instructions, doctor signatures, and verifiable QR codes.'
            },
            {
              problem: 'Missed Follow-Ups & Lost Revenue',
              solution: 'Automated WhatsApp Notifications',
              detail: 'Configurable booking confirmations, 24h reminders, and post-procedure check-ins sent directly to patient phones.'
            },
            {
              problem: 'Manual Paper Invoices & Spreadsheets',
              solution: 'Integrated Clinic Billing & Expenses',
              detail: 'Itemized invoices, partial payment tracking, expense categorizing, and printable receipts in one system.'
            },
            {
              problem: 'Multi-Branch Blind Spots',
              solution: 'Multi-Branch Tenant Architecture',
              detail: 'Easily manage schedules, staff, and revenue across your central clinic and satellite branches from one login.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#15803D] hover:-translate-y-2 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Traditional Pain
                </span>
                <span className="text-[#166534] bg-[#F0FDF4] border border-[#86EFAC] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  ClinicOS Solution
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">{item.solution}</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{item.detail}</p>
              <div className="pt-3 border-t-2 border-slate-100 text-xs font-semibold text-slate-400">
                Replaces: <span className="line-through text-slate-500">{item.problem}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Solutions by Specialty: Interactive Tabbed Workflows */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-extrabold text-[#166534] uppercase tracking-widest bg-[#F0FDF4] px-3.5 py-1.5 rounded-full border border-[#86EFAC]">
            Tailored Operations
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Configured for Your Medical Specialty
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            Whether you run a high-volume dental studio, an orthopedic recovery center, or a 24-bed nursing home, ClinicOS adapts to your clinical rhythm.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Object.entries(specialtySolutions).map(([key, sol]) => {
            const Icon = sol.icon;
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#15803D] text-white shadow-lg shadow-green-700/30 scale-102 border-2 border-[#15803D]'
                    : 'bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isSelected ? 'text-white' : 'text-[#15803D]'}`} />
                <span>{sol.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Showcase Box */}
        {specialtySolutions[activeTab] && (
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-10 lg:p-12 shadow-md animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F0FDF4] text-[#166534] border border-[#86EFAC]">
                  {specialtySolutions[activeTab].sampleClinic}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {specialtySolutions[activeTab].title}
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                  {specialtySolutions[activeTab].description}
                </p>
                <div className="space-y-3 pt-2">
                  {specialtySolutions[activeTab].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm sm:text-base font-bold text-slate-900">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link to="/clinics">
                    <Button variant="primary" size="md" className="font-bold text-sm h-11 px-6 shadow-md">
                      View Demo Clinic
                    </Button>
                  </Link>
                  <Link to="/register/clinic" className="text-sm font-bold text-[#15803D] hover:underline">
                    Setup your {activeTab} practice in 3 minutes →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {specialtySolutions[activeTab].image && (
                  <div className="rounded-3xl overflow-hidden h-48 sm:h-52 w-full relative shadow-lg border-2 border-slate-200">
                    <img
                      src={specialtySolutions[activeTab].image}
                      alt={specialtySolutions[activeTab].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                        Clinical Facility Preview
                      </span>
                      <span className="text-emerald-300 font-mono bg-slate-900/80 px-2 py-0.5 rounded-md">Live Ready</span>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 space-y-2.5">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                    Preset Clinical Configurations
                  </span>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-0.5 shadow-2xs">
                    <p className="font-extrabold text-slate-900 text-xs">Configured Services</p>
                    <p className="text-[11px] text-slate-600 font-medium">Includes specialty catalog with standard consultation fees & durations.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-0.5 shadow-2xs">
                    <p className="font-extrabold text-slate-900 text-xs">Rx Medication Sets</p>
                    <p className="text-[11px] text-slate-600 font-medium">Pre-populated drug dosage frequencies, durations, and clinical notes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. 14 Comprehensive Modules: Medonix Signature Deep-Dark Bento Grid with Ambient Glow */}
      <section className="bg-slate-950 text-white py-24 border-y-2 border-slate-800 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-950/70 border border-emerald-800/80 px-4 py-1.5 rounded-full">
              Comprehensive Capability
            </span>
            <h2
              style={{ color: '#ffffff' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white !text-white tracking-tight"
            >
              14 Essential Modules Built for Clinic Scale
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
              Engineered with clean domain separation, high reliability, and ready for multi-doctor practices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/70 hover:bg-slate-850 hover:-translate-y-2 transition-all duration-300 space-y-3 group shadow-lg"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#15803D] group-hover:text-white transition-all shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    {f.title}
                  </h3>
                  {/* High Contrast Light Slate Text Opposite to Dark Background */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">{f.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link to="/features">
              <Button
                variant="outline-white"
                size="lg"
                className="h-12 px-8 font-bold text-base hover:scale-102 transition-all shadow-lg"
              >
                Browse Full Features Explorer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. How It Works: 4 Simple Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-extrabold text-[#166534] uppercase tracking-widest bg-[#F0FDF4] px-3.5 py-1.5 rounded-full border border-[#86EFAC]">
            Fast Implementation
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            How ClinicOS Works in 4 Steps
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            Transition your practice smoothly from manual paper logbooks to digital healthcare management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Create Clinic Account',
              desc: 'Start your 14-day free trial. Select your specialty and setup clinic branding.'
            },
            {
              step: '02',
              title: 'Configure Doctors & Hours',
              desc: 'Add your practitioners, consultation fees, branch locations, and weekly time slots.'
            },
            {
              step: '03',
              title: 'Receive Bookings & Walk-Ins',
              desc: 'Patients discover your profile or walk into front desk for rapid 30-second token check-in.'
            },
            {
              step: '04',
              title: 'Manage Rx, WhatsApp & Reports',
              desc: 'Issue digital prescriptions with verifiable QR codes, trigger WhatsApp updates, and track clinic revenue.'
            }
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-xl hover:border-[#15803D] hover:-translate-y-2 transition-all duration-300 space-y-2"
            >
              <span className="text-5xl font-black text-emerald-600/35 block mb-3 font-mono">{s.step}</span>
              <h3 className="text-lg font-extrabold text-slate-950">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Connected Clinics Directory Preview */}
      <section className="bg-slate-100/80 py-20 border-y-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-[#166534] uppercase tracking-widest bg-[#F0FDF4] px-3.5 py-1.5 rounded-full border border-[#86EFAC]">
                Network Directory
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight mt-2">
                Connected Clinics on ClinicOS
              </h2>
              <p className="text-slate-700 text-base sm:text-lg mt-1 font-normal">
                Explore published clinic profiles using realistic synthetic demo data.
              </p>
            </div>
            <Link to="/clinics">
              <Button variant="outline" size="md" className="font-bold text-sm h-11 px-5 border-2">
                View All {clinics.length} Clinics <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {clinics.slice(0, 3).map((clinic) => (
              <div
                key={clinic.id}
                className="overflow-hidden rounded-3xl bg-white border-2 border-slate-200/90 flex flex-col hover:shadow-xl hover:border-[#15803D] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-slate-900 shadow-sm">
                      {clinic.specialty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-[#15803D] text-white shadow-sm">
                      ★ {clinic.rating} ({clinic.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-lg font-black text-slate-950 line-clamp-1">{clinic.name}</h3>
                    <p className="text-xs font-bold text-[#166534] mt-0.5">{clinic.tagline}</p>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">{clinic.description}</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 font-semibold space-y-1">
                      <p>📍 {clinic.city} · {clinic.branches.length} Branch{clinic.branches.length > 1 ? 'es' : ''}</p>
                      <p>🕒 {clinic.operatingHours}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Link to={`/clinics/${clinic.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full font-bold border-2">
                        View Clinic
                      </Button>
                    </Link>
                    <Link to={`/book-appointment?clinic=${clinic.id}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full font-bold shadow-md">
                        Book Slot
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Medonix Call to Action Banner: High Contrast Deep Navy with Radial Ambient Lighting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-[#062412] to-emerald-950 text-white p-10 sm:p-14 lg:p-16 shadow-2xl border-2 border-emerald-500/30 overflow-hidden">
          {/* Ambient lighting effects */}
          <div className="absolute inset-0 opacity-20 mix-blend-luminosity overflow-hidden pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"
              alt="Hospital Facility"
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Value proposition, Checkpoints, Buttons */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Instant 14-Day Free Access · No Credit Card Required</span>
              </div>

              <h2
                style={{ color: '#ffffff' }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white !text-white leading-tight"
              >
                Ready to Upgrade Your Clinic Front Desk?
              </h2>

              {/* High Contrast Light Slate Text Opposite to Dark Background */}
              <p style={{ color: '#e2e8f0' }} className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                Join specialty clinics and local healthcare facilities modernizing appointments, prescriptions, WhatsApp notifications, and billing.
              </p>

              {/* Quick Value Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div style={{ color: '#f8fafc' }} className="flex items-center gap-2.5 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Full multi-doctor scheduling</span>
                </div>
                <div style={{ color: '#f8fafc' }} className="flex items-center gap-2.5 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Verifiable QR digital prescriptions</span>
                </div>
                <div style={{ color: '#f8fafc' }} className="flex items-center gap-2.5 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Automated WhatsApp reminders</span>
                </div>
                <div style={{ color: '#f8fafc' }} className="flex items-center gap-2.5 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Itemized invoicing & collections</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to="/register/clinic">
                  <Button
                    variant="white"
                    size="lg"
                    className="h-13 px-8 text-base font-black rounded-2xl shadow-xl hover:scale-102 transition-all text-[#14532D] hover:bg-emerald-50"
                  >
                    Start 14-Day Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    variant="outline-white"
                    size="lg"
                    className="h-13 px-8 text-base font-bold rounded-2xl border-2 border-white/40 hover:border-white hover:scale-102 transition-all"
                  >
                    Compare Subscription Plans
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Sleek Simulated Live Clinic Card & Security Badge */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
                      <Activity className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Live Practice Cockpit</h4>
                      <p className="text-xs text-slate-400 font-medium">Ready in under 2 minutes</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ● Live Ready
                  </span>
                </div>

                {/* Module Indicators */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-200 font-medium">Front-Desk Walk-In Queue</span>
                    <span className="text-emerald-400 font-bold">Instant Token #Q-01</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-200 font-medium">WhatsApp Notification Webhook</span>
                    <span className="text-emerald-400 font-bold">Simulated Active</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-200 font-medium">Digital A4 Prescription Registry</span>
                    <span className="text-emerald-400 font-bold">QR Security Hash</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Multi-Tenant Architecture
                  </span>
                  <span>5 Demo Clinics Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
