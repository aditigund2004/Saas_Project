import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Users,
  Stethoscope,
  FileText,
  ShieldCheck,
  Smartphone,
  HeartPulse,
  Receipt,
  Package,
  BarChart3,
  Building2,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All 14 Modules' },
    { id: 'clinical', label: 'Clinical & Prescriptions' },
    { id: 'frontdesk', label: 'Front-Desk & Booking' },
    { id: 'operations', label: 'Billing & Operations' }
  ];

  const features = [
    {
      id: 'scheduling',
      category: 'frontdesk',
      title: 'Appointment Scheduling & Conflict Guard',
      desc: 'Intuitive day, week, month, and agenda calendar views. Features automated collision detection that alerts front desk staff if two appointments overlap for the same doctor.',
      icon: Calendar,
      bullets: ['Doctor-specific slot durations (15, 30, 45, 60 mins)', 'Multi-branch schedule filtering', 'Color-coded appointment lifecycle badges']
    },
    {
      id: 'walkin',
      category: 'frontdesk',
      title: 'Express Walk-In Patient Registration',
      desc: 'High-speed registration workflow tailored for front-desk receptionists. Register walk-in patients in 30 seconds without requiring them to download an app or create credentials.',
      icon: Clock,
      bullets: ['Automated queue token generation (e.g., #Q-01)', 'Quick doctor assignment', 'Duplicate contact warning detection']
    },
    {
      id: 'patients',
      category: 'clinical',
      title: 'Centralized Patient Medical Records',
      desc: 'Complete digital patient timeline preserving past consultations, diagnosed allergies, vitals history, and past prescriptions in one accessible dossier.',
      icon: Users,
      bullets: ['Prominent drug allergy alerts', 'Complete past visit chronology', 'Contact details & emergency numbers']
    },
    {
      id: 'prescriptions',
      category: 'clinical',
      title: 'Digital PDF Prescriptions Generator',
      desc: 'Structured clinical consultation workspace. Doctors quickly add medications with dosage frequencies, durations, and instructions. Produces crisp, print-ready A4 PDFs.',
      icon: FileText,
      bullets: ['Standardized drug dosage presets', 'Clinic & doctor registration headers', 'Digital doctor signature placeholder']
    },
    {
      id: 'qr-verification',
      category: 'clinical',
      title: 'QR Code Prescription Verification',
      desc: 'Tamper-evident verification badge printed on every digital prescription. Pharmacies and patients scan the QR code to verify doctor legitimacy on a dedicated public page.',
      icon: ShieldCheck,
      bullets: ['Cryptographic opaque hash identifier', 'Zero exposure of private patient notes in QR data', 'Public authenticity check screen']
    },
    {
      id: 'whatsapp',
      category: 'frontdesk',
      title: 'WhatsApp Booking Confirmations & Reminders',
      desc: 'Integration-ready messaging engine designed for WhatsApp Cloud API. Dispatches instant booking confirmations, 24-hour visit reminders, and post-procedure check-ins.',
      icon: Smartphone,
      bullets: ['Configurable template variables', 'Simulated delivery states (Pending, Sent, Delivered)', 'Retry queue for unreachable numbers']
    },
    {
      id: 'followups',
      category: 'clinical',
      title: 'Clinical Follow-Up Management',
      desc: 'Never lose a patient to missed care. Track surgical recovery checks, orthodontic aligner changes, suture removals, and chronic condition review dates.',
      icon: HeartPulse,
      bullets: ['Front-desk follow-up checklist', 'Direct WhatsApp follow-up reminder launcher', 'One-click follow-up appointment booking']
    },
    {
      id: 'billing',
      category: 'operations',
      title: 'Patient Invoicing & Partial Payments',
      desc: 'Itemized clinical invoicing with line items for procedures, materials, and consultations. Handles full or partial payments across cash, card, and UPI.',
      icon: Receipt,
      bullets: ['Line-item procedure pricing catalog', 'Printable invoice receipts', 'Outstanding balance tracking']
    },
    {
      id: 'expenses',
      category: 'operations',
      title: 'Clinic Expense Tracking',
      desc: 'Record clinic operational overheads including dental consumables, equipment servicing, utilities, biomedical waste disposal, and staff salaries.',
      icon: Receipt,
      bullets: ['Categorized operational expense logging', 'Monthly expense breakdowns', 'Net income calculations']
    },
    {
      id: 'inventory',
      category: 'operations',
      title: 'Consumables & Inventory Alerts',
      desc: 'Keep critical medical supplies in stock. Track units of local anesthetics, sterile gloves, suture kits, and endodontic files with automated low-stock warnings.',
      icon: Package,
      bullets: ['Minimum stock threshold alarms', 'Stock-in and usage adjustment entries', 'Supplier contact tracking']
    },
    {
      id: 'reports',
      category: 'operations',
      title: 'Daily & Monthly Analytics Dashboard',
      desc: 'Clear visual charts for clinic owners. Review weekly appointment completion rates, doctor consultation volumes, new patient registrations, and clinic revenue.',
      icon: BarChart3,
      bullets: ['Interactive Recharts area & bar charts', 'Doctor performance comparison', 'Walk-in vs online booking breakdown']
    },
    {
      id: 'multibranch',
      category: 'operations',
      title: 'Multi-Branch Tenant Architecture',
      desc: 'Run multiple clinic branches under a single unified organization. Easily switch between central and suburban satellite locations with tenant-isolated data.',
      icon: Building2,
      bullets: ['Instant branch switching bar', 'Branch-specific doctor rosters', 'Consolidated clinic owner reports']
    },
    {
      id: 'trial',
      category: 'operations',
      title: '14-Day Free SaaS Trial',
      desc: 'Onboard your clinic in 3 minutes. Test full functionality including calendar, prescriptions, and billing without upfront commitment.',
      icon: Sparkles,
      bullets: ['14-day full feature trial', 'Transparent plan upgrades', 'Synthetic demo data preloaded']
    },
    {
      id: 'nursing-home',
      category: 'clinical',
      title: '10–30 Bed Nursing Home Tracker',
      desc: 'Optional module for sub-acute community nursing homes. Monitor bed occupancy, inpatient day charges, doctor rounding visits, and nurse shift handovers.',
      icon: Layers,
      bullets: ['Visual bed status grid (Available, Occupied, Cleaning)', 'Daily inpatient bed tariff logging', 'Discharge summaries with QR check']
    }
  ];

  const filteredFeatures =
    selectedCategory === 'all'
      ? features
      : features.filter((f) => f.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16 animate-fade-in">
      {/* Header — Medonix Large Font Size & High-Contrast Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F0FDF4] text-[#166534] text-xs sm:text-sm font-extrabold border-2 border-[#DCFCE7] shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#15803D] animate-pulse" />
          <span>Complete Clinical & Practice Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Everything You Need to Run a Modern Specialty Clinic
        </h1>
        <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
          Explore all 14 core modules engineered for dental, orthopedic, dermatology, pediatric practices, and small local nursing homes.
        </p>

        {/* Filter Pills with Medonix High Contrast */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#15803D] text-white shadow-md shadow-blue-500/25 border-2 border-[#15803D] scale-102'
                    : 'bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Features with Medonix Hover Lift & High-Contrast Typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredFeatures.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.id}
              className="p-8 rounded-3xl bg-white border-2 border-slate-200/90 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-[#86EFAC] hover:-translate-y-2 transition-all duration-300 space-y-6"
            >
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex items-center justify-center shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight">{f.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed font-normal">{f.desc}</p>
                </div>
                <div className="pt-3 border-t-2 border-slate-100 space-y-2.5">
                  {f.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t-2 border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold">
                <Link to="/clinic/dashboard" className="text-[#15803D] hover:text-[#166534] flex items-center gap-1.5 transition-colors">
                  <span>Preview in Demo Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA with Deep Dark Surface & Contrasting White Text */}
      <div className="bg-slate-950 rounded-3xl p-10 sm:p-14 text-white text-center space-y-5 max-w-4xl mx-auto border-2 border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#15803D]/15 rounded-full blur-3xl pointer-events-none" />
        <h2
          style={{ color: '#ffffff' }}
          className="text-3xl sm:text-4xl font-black text-white !text-white tracking-tight relative z-10"
        >
          Start Your 14-Day Free Clinic Trial
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed relative z-10">
          No credit card required. Explore role cockpits for Clinic Admin, Receptionist, and Patients immediately.
        </p>
        <div className="pt-3 relative z-10">
          <Link to="/register/clinic">
            <Button
              variant="white"
              size="lg"
              className="h-13 px-8 text-base font-black rounded-2xl shadow-xl hover:scale-102 transition-all text-slate-950"
            >
              Get Started Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
