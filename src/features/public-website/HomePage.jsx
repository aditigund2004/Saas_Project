import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Play,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import { HeroInteractiveShowcase } from '../../components/medical/HeroInteractiveShowcase';
import { TrustedDoctorsInteractiveTicker } from '../../components/medical/TrustedDoctorsInteractiveTicker';
import { HowItWorksInteractiveFlow } from '../../components/medical/HowItWorksInteractiveFlow';
import { ClinicalWorkflowComparison } from '../../components/medical/ClinicalWorkflowComparison';
import { ZeroCodeWebsiteBuilderShowcase } from '../../components/medical/ZeroCodeWebsiteBuilderShowcase';
import { AllInOneSaaSSuite } from '../../components/medical/AllInOneSaaSSuite';

export function HomePage() {
  const { clinics, openWhatsAppModal } = useApp();
  const location = useLocation();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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

          {/* Right Column: Floating Live Doctor Preview Cards with Interactive 3D Motion & Cursor Parallax */}
          <div className="lg:col-span-5 relative">
            <HeroInteractiveShowcase
              demoClinic={demoClinic}
              onOpenWhatsApp={() => openWhatsAppModal()}
            />
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

      {/* 3. Social Proof Ticker: Interactive Doctor Stream with Cursor Parallax & Dynamic Flow */}
      <TrustedDoctorsInteractiveTicker doctors={trustedDoctors} />

      {/* 4. HOW IT WORKS: Dynamic Interactive Flow with Motion & Cursor Parallax */}
      <HowItWorksInteractiveFlow />

      {/* 5. Clinical Workflow Comparison: Interactive Side-by-Side & Matrix Transformation */}
      <ClinicalWorkflowComparison />

      {/* 6. Interactive Zero-Code Website Builder Preview Showcase */}
      <ZeroCodeWebsiteBuilderShowcase demoClinic={demoClinic} />

      {/* 7. Core Platform Features & 8. Bottom High-Converting CTA Banner */}
      <AllInOneSaaSSuite />

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

            <div className="aspect-video rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 overflow-hidden relative shadow-inner">
              <video
                src="/clinicos-walkthrough.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black rounded-2xl"
              >
                <source src="/clinicos-walkthrough.mp4" type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
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
