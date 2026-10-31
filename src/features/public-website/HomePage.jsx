import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Smartphone,
  FileText,
  Users,
  Building2,
  Stethoscope,
  ChevronRight,
  ExternalLink,
  Play,
  X,
  MessageSquare,
  Star,
  Check,
  AlertTriangle,
  Globe,
  Sliders,
  Award,
  UserPlus,
  Palette,
  Rocket,
  Activity
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useApp } from '../../context/AppContext';

export function HomePage() {
  const { clinics, openWhatsAppModal } = useApp();
  const location = useLocation();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeBuilderTab, setActiveBuilderTab] = useState('modern');
  const [activeStep, setActiveStep] = useState(1);

  // Smooth scroll handler on hash change or route mount
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const el = document.getElementById(elementId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const demoClinic = clinics[0];

  const floatingDoctors = [
    {
      name: 'Dr. Sharath Nandib...',
      specialty: 'General Physician - Hyd...',
      url: 'clinicos.in/sharathearthclinic',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Azeezunnisa I',
      specialty: 'Homeopathy / BHMS - ...',
      url: 'clinicos.in/drazmeera',
      image: 'https://images.unsplash.com/photo-1594824813629-450f612d4d8c?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Aparna Yashaswi',
      specialty: 'Dermatology - ACTION ...',
      url: 'clinicos.in/aparnayashaswi',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr Avani Jain',
      specialty: 'Dental Surgeon',
      url: 'clinicos.in/dravani',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const trustedDoctors = [
    { name: 'Dr. Jasdeep Kaur Malhotra', spec: 'Dermatology', city: 'Delhi' },
    { name: 'Dr. Ganesh Avhad Patil', spec: 'General Physician', city: 'Pune' },
    { name: 'Dr. Ganesh Avhad', spec: 'General Physician', city: 'Kalyan East' },
    { name: 'Dr. Raghuveer Meena', spec: 'ENT Specialist', city: 'Bundi' },
    { name: 'Dr. Abhishek Bali', spec: 'Ayurveda Medicine', city: 'Jammu' },
    { name: 'Dr. Aman Kumar', spec: 'General Physician', city: 'Bangalore' },
    { name: 'Dr. Zain Asad', spec: 'General Physician', city: 'Lucknow' },
    { name: 'Dr. Prince Mishra', spec: 'Pediatrics', city: 'Patna' },
    { name: 'Dr. Aarti Solanki', spec: 'Dental Specialist', city: 'Ahmedabad' },
    { name: 'Dr. Vikram Singh', spec: 'Orthopedics', city: 'Jaipur' },
    { name: 'Dr. Aishwarya Singh', spec: 'General Physician', city: 'Mumbai' }
  ];

  const comparisons = [
    {
      without: 'Paper registers and lost prescription slips',
      with: '1-Click searchable digital patient charts & records'
    },
    {
      without: 'Missed phone calls during consultations and double bookings',
      with: '24/7 online appointment booking with real-time slot lock'
    },
    {
      without: 'Zero Google search presence or patient discovery',
      with: 'Personalized SEO-optimized clinic website on your custom URL'
    },
    {
      without: 'Manual handwriting that patients and pharmacies struggle to read',
      with: 'Digital A4 prescriptions with verified authenticity QR codes'
    },
    {
      without: 'Forgotten patient follow-ups and lost recurring visits',
      with: 'Automated WhatsApp reminders & post-consultation messages'
    },
    {
      without: 'Disconnected billing spreadsheets and manual collections',
      with: 'Integrated clinic invoices, daily collections, and GST receipts'
    }
  ];

  const howItWorksSteps = [
    {
      num: 1,
      icon: UserPlus,
      pill: '⏱ 30 seconds',
      title: 'Sign Up Free',
      description: 'Create your account in 30 seconds. No credit card, no complex forms.'
    },
    {
      num: 2,
      icon: Building2,
      pill: '📅 Timings · Fees',
      title: 'Setup Your Clinic',
      description: 'Add clinic details, timings, consultation fees. Everything auto-populates on your website.'
    },
    {
      num: 3,
      icon: Palette,
      pill: '🎨 6 themes',
      title: 'Customize Website',
      description: 'Pick a theme, add your photo, edit content. Your professional website is ready.'
    },
    {
      num: 4,
      icon: Rocket,
      pill: '🔗 clinicos.in/yourname',
      title: 'Go Live & Share',
      description: 'Share your link with patients. They book online, you manage from your dashboard.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8 transition-colors">
      {/* 1. Hero Section */}
      <section id="top" className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, CTAs & Reassurances */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Doctor Website & Clinic Software for Indian Doctors</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Your Practice, <br />
              Online in{' '}
              <span className="italic font-serif text-blue-600 dark:text-blue-400 underline decoration-blue-300 dark:decoration-blue-700 underline-offset-8">
                Minutes.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
              Professional doctor website, online appointment booking, digital prescriptions and clinic management — everything Indian doctors need to grow their practice with <strong>ClinicOS</strong>.
            </p>

            {/* Primary & Secondary CTAs with animations */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link to="/onboarding">
                <button className="btn-animated-primary px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl flex items-center gap-2 cursor-pointer">
                  <span>Start Free — 7 Days Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to={`/clinic/${demoClinic?.slug || 'citycare-family-clinic'}`}>
                <button className="btn-animated-secondary px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 font-bold text-sm shadow-xs flex items-center gap-2 cursor-pointer">
                  <span>See a sample website</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </Link>
            </div>

            {/* Video watch trigger link */}
            <div
              className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer pt-1 transition-transform hover:translate-x-0.5"
              onClick={() => setVideoModalOpen(true)}
            >
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span className="hover:underline">Watch: Same doctor, same day (1 min)</span>
            </div>

            {/* Reassurance Subtext */}
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2 font-medium">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 7-day free trial</span>
              <span>— no card needed</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>Website · Booking · Prescriptions · WhatsApp</span>
            </div>
          </div>

          {/* Right Column: Floating Live Doctor Preview Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-100 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">
              {/* WhatsApp Notification Floating Badge */}
              <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs text-slate-700 dark:text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-medium text-[11px]">Automated WhatsApp Reminder Sent</span>
              </div>

              {/* 2x2 Floating Doctor Cards Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {floatingDoctors.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-2 relative group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image with Live Pill */}
                    <div className="relative rounded-xl overflow-hidden aspect-square bg-slate-100">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-[9px] font-bold text-emerald-600 flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono truncate text-center backdrop-blur-2xs">
                        {doc.url}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {doc.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {doc.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Live URL Notification Pill */}
              <div className="mt-4 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                    Aparna Yashaswi
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono truncate">
                    Live at clinicos.in/aparnayashaswi
                  </span>
                </div>
                <Link
                  to={`/clinic/${demoClinic?.slug || 'citycare-family-clinic'}`}
                  className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0 ml-2"
                >
                  View Demo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. In The News Press Banner */}
      <section className="border-y border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs font-serif text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-sans text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <span>📰 IN THE NEWS</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              Hindustan Insider ↗
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              Prime News of India ↗
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              Eshn News ↗
            </span>
            <span className="text-[11px] font-sans font-mono text-slate-400">
              Oct 2026
            </span>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Ticker */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            TRUSTED BY DOCTORS ACROSS INDIA
          </span>
        </div>

        {/* Doctor Badges Row */}
        <div className="flex items-center gap-3 overflow-x-auto py-2 no-scrollbar">
          {trustedDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-2xs whitespace-nowrap shrink-0 hover:border-blue-400 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                {doc.name.split(' ')[1]?.[0] || 'Dr'}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {doc.name}
                </div>
                <div className="text-[10px] text-slate-400">
                  {doc.spec} · {doc.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS: Exact Match to Uploaded Image */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Header with pill, title and subtitle */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 inline-block shadow-2xs">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Online in{' '}
            <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
              4 simple steps
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
            From sign-up to your first online booking, it takes less than 5 minutes.
          </p>
        </div>

        {/* 4-Step Horizontal Timeline Workflow */}
        <div className="relative">
          {/* Connecting Track Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-[2px] bg-slate-200 dark:bg-slate-700/80 -z-0">
            {/* Animated Blue Progress Line based on activeStep */}
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
              style={{
                width:
                  activeStep === 1
                    ? '0%'
                    : activeStep === 2
                    ? '33%'
                    : activeStep === 3
                    ? '66%'
                    : '100%'
              }}
            />
          </div>

          {/* 4 Steps Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorksSteps.map((s) => {
              const Icon = s.icon;
              const isSelected = activeStep === s.num;
              const isPassed = activeStep > s.num;

              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  className={`flex flex-col items-center text-center space-y-3.5 p-3 sm:p-4 rounded-3xl transition-all duration-300 cursor-pointer group ${
                    isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                >
                  {/* Step Node Circle with Number Badge */}
                  <div className="relative">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/35 ring-8 ring-blue-100 dark:ring-blue-950/70 step-node-glow'
                          : isPassed
                          ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-400 shadow-md'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 shadow-xs group-hover:border-blue-400'
                      }`}
                    >
                      <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Number Badge Pill on top-right */}
                    <div
                      className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center absolute -top-1 -right-1 shadow-xs border-2 border-white dark:border-slate-900 transition-colors ${
                        isSelected
                          ? 'bg-blue-800 text-white'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isPassed ? '✓' : s.num}
                    </div>
                  </div>

                  {/* Timing / Theme Tag Pill */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {s.pill}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button Below the 4 Steps (Exact Match with Rich Animation) */}
        <div className="pt-6 flex flex-col items-center justify-center space-y-2.5">
          <Link to="/onboarding">
            <button className="btn-animated-primary px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-xl flex items-center gap-2 cursor-pointer transition-all duration-300">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Link>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            7-day free trial · no card needed
          </span>
        </div>
      </section>

      {/* 5. Side-by-Side Comparison: Without ClinicOS vs With ClinicOS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Clinical Workflow Comparison
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Clinics Upgrade to ClinicOS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Compare manual legacy clinic operations with modern automated SaaS practice management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* WITHOUT CLINICOS */}
          <div className="rounded-3xl p-6 sm:p-8 bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-extrabold text-sm uppercase tracking-wider pb-3 border-b border-rose-200 dark:border-rose-900/40">
              <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 flex items-center justify-center text-xs">✕</span>
              <span>Without ClinicOS</span>
            </div>
            <ul className="space-y-3.5">
              {comparisons.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-rose-900 dark:text-rose-200">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{c.without}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WITH CLINICOS */}
          <div className="rounded-3xl p-6 sm:p-8 bg-blue-50/70 dark:bg-blue-950/40 border-2 border-blue-500/80 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-extrabold text-sm uppercase tracking-wider pb-3 border-b border-blue-200 dark:border-blue-800">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">✓</span>
              <span>With ClinicOS</span>
            </div>
            <ul className="space-y-3.5">
              {comparisons.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-100 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{c.with}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Interactive Website Builder Preview Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Zero-Code Website Builder
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Launch Your Clinic Website in 3 Clicks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pick a template, choose your medical brand colors, and start accepting online patient appointments.
          </p>
        </div>

        {/* Builder Interactive Tabs */}
        <div className="flex items-center justify-center gap-2">
          {[
            { id: 'modern', name: 'Modern Medical Template' },
            { id: 'minimal', name: 'Minimal Private Practice' },
            { id: 'premium', name: 'Premium Specialist Clinic' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveBuilderTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeBuilderTab === t.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Builder Visual Frame */}
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-md">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                {activeBuilderTab === 'modern' ? 'Template 1: Modern Clinic' : activeBuilderTab === 'minimal' ? 'Template 2: Editorial Minimal' : 'Template 3: Executive Specialist'}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeBuilderTab === 'modern'
                  ? 'High-conversion card layout for family clinics and dental studios.'
                  : activeBuilderTab === 'minimal'
                  ? 'Clean editorial typography focused on patient trust and aesthetics.'
                  : 'Prestigious dark-accented executive template for surgical and super-specialty hubs.'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automatically connects to your appointments calendar, staff roster, and consultation fee catalog.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <Link to="/app/website-builder">
                  <Button variant="primary" size="md" className="text-xs font-bold bg-blue-600 text-white btn-animated-primary">
                    Open Website Studio →
                  </Button>
                </Link>
                <Link to={`/clinic/${demoClinic?.slug || 'citycare-family-clinic'}`}>
                  <Button variant="outline" size="md" className="text-xs font-semibold">
                    Preview Live Site
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 aspect-16/9 relative group">
              <img
                src={
                  activeBuilderTab === 'modern'
                    ? 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
                    : activeBuilderTab === 'minimal'
                    ? 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
                    : 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80'
                }
                alt="Template"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded">
                  clinicos.in/your-practice
                </span>
                <span className="font-bold text-[11px] bg-emerald-500 text-white px-2 py-0.5 rounded">
                  1-Click Publish
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 7. Core Platform Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            All-In-One SaaS Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Run Your Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Conflict-Proof Calendar',
              desc: 'Day & week views with real-time doctor availability and zero double-booking conflicts.',
              icon: Calendar
            },
            {
              title: 'WhatsApp Automation',
              desc: 'Instant booking confirmations, appointment reminders, and follow-up alerts sent to patients.',
              icon: Smartphone
            },
            {
              title: 'Digital Prescriptions',
              desc: 'Clean A4 prescription composer with dosage presets, drug library, and verified QR code.',
              icon: FileText
            },
            {
              title: 'Front-Desk Queue',
              desc: 'Speed-optimized reception station for walk-in patient check-in, token triage, and billing.',
              icon: Clock
            },
            {
              title: 'Patient Directory',
              desc: 'Full digital medical histories, allergies, past prescriptions, and consultation notes.',
              icon: Users
            },
            {
              title: 'Multi-Branch Support',
              desc: 'Manage central practice and satellite clinics with 1-click tenant workspace switching.',
              icon: Building2
            },
            {
              title: 'Billing & Invoicing',
              desc: 'Track consultation fees, procedure invoices, collections, and daily financial summaries.',
              icon: ShieldCheck
            },
            {
              title: 'SEO Clinic Website',
              desc: 'Rank on Google searches and allow patients to discover doctors and book slots 24/7.',
              icon: Globe
            }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="p-5 border-slate-200 dark:border-slate-800 space-y-2 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-1">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 8. Bottom High-Converting CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-slate-950 via-[#0B1528] to-blue-950 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Start Free · No Credit Card Required
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Get Your Doctor Website & Clinic Software Live Today with ClinicOS.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join thousands of Indian doctors who manage patient bookings, digital prescriptions, and front-desk operations on ClinicOS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link to="/onboarding">
              <button className="btn-animated-primary px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl flex items-center gap-2 cursor-pointer">
                <span>Start Free — 7 Days Trial</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
            <Link to="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-slate-700 hover:bg-slate-800 font-semibold text-xs px-5 py-3 rounded-2xl"
              >
                View Plans & Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal Simulation */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-sm">Same Doctor, Same Day (1 Min Walkthrough)</span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 border border-slate-800">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">ClinicOS Product Walkthrough Video</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Demonstrating how a patient books an appointment at 10 PM, the front desk confirms via WhatsApp at 9 AM, and the doctor issues a digital prescription in 45 seconds.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Link to="/onboarding" onClick={() => setVideoModalOpen(false)}>
                <Button variant="primary" size="sm" className="font-bold text-xs bg-blue-600 text-white btn-animated-primary">
                  Try ClinicOS Free →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
