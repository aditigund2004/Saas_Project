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
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ScrollRevealCard } from '../../components/medical/ScrollRevealCard';
import { EcgWaveform } from '../../components/medical/EcgWaveform';


export function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Modules' },
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
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12 transition-colors">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Features Explorer</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Run a Modern Specialty Clinic
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">

          Explore all 14 core modules engineered for dental, orthopedic, dermatology, pediatric practices, and small local nursing homes.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'

              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ECG telemetry accent */}
        <EcgWaveform variant="compact" glow={true} className="max-w-md mx-auto pt-2 opacity-60 dark:opacity-75" />

      </div>

      {/* Grid of features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((f, idx) => {
          const Icon = f.icon;
          return (
            <ScrollRevealCard key={f.id} delay={(idx % 3) * 80} className="h-full">
              <Card className="p-6 border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow h-full">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{f.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    {f.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <Link to="/clinic/dashboard" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1">
                    Preview in Demo Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </ScrollRevealCard>

          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 max-w-4xl mx-auto shadow-xl">

        <h2 className="text-2xl sm:text-3xl font-bold">Start Your 14-Day Free Clinic Trial</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          No credit card required. Explore role dashboards for Clinic Admin, Receptionist, and Patients immediately.
        </p>
        <div className="pt-2">
          <Link to="/register/clinic">
            <Button variant="primary" size="lg">
              Get Started Now <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

