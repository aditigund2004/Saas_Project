import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Bone, Sparkles, Baby, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function SolutionsPage() {
  const specialties = [
    {
      id: 'dental',
      title: 'Dental & Maxillofacial Practices',
      subtitle: 'From single-sitting RCT to multi-tray clear aligner programs',
      icon: Smile,
      workflows: [
        'Multi-sitting Endodontic Tracking: Log working lengths, apex locator readings, and obturation status.',
        'Orthodontic Aligner Stages: Track patient tray numbers (e.g. Tray 14/28) and automated interval checkups.',
        'Oral Hygiene & Scaling Recalls: Automated WhatsApp recall every 6 months for prophylaxis.',
        'Dental Material Consumables: Low-stock alerts for articaine cartridges, composite kits, and NiTi files.'
      ],
      sampleClinic: 'Apex Dental & Maxillofacial Care',
      slug: 'apex-dental-care'
    },
    {
      id: 'orthopedic',
      title: 'Orthopedic & Joint Care Clinics',
      subtitle: 'Post-op rehabilitation, joint injections, and mobility recovery',
      icon: Bone,
      workflows: [
        'Joint Injection Protocols: Record viscosupplementation/PRP joint injection sites and lot numbers.',
        'Physiotherapy Batch Booking: Schedule weekly rehabilitation courses with multi-session tracking.',
        'Pre & Post-Operative Documentation: Attach digital X-ray references and ROM (Range of Motion) metrics.',
        'Orthopedic Splints & Braces: Track clinical inventory of immobilization splints, knee braces, and crutches.'
      ],
      sampleClinic: 'Pulse Orthopedics & Joint Care',
      slug: 'pulse-orthopedics'
    },
    {
      id: 'dermatology',
      title: 'Dermatology & Aesthetic Centers',
      subtitle: 'Laser packages, clinical trichology, and topical regimens',
      icon: Sparkles,
      workflows: [
        'Aesthetic Laser Packages: Manage multi-session packages (Session 3 of 6) with automatic balance deduction.',
        'Clinical Dermatology Rx: Prescribe compounded topical ointments, retinoids, and oral antibiotics with clear instructions.',
        'Patch Test & Procedure Consents: Standardized consent notes for chemical peels, microneedling, and PRP.',
        'Cosmeceutical Stock Tracking: Monitor medical sunscreen, peel solutions, and sterile mesotherapy vials.'
      ],
      sampleClinic: 'DermaGlow Skin & Laser Center',
      slug: 'dermaglow-clinic'
    },
    {
      id: 'pediatrics',
      title: 'Pediatrics & Child Healthcare Hubs',
      subtitle: 'WHO developmental percentiles and digital immunization schedules',
      icon: Baby,
      workflows: [
        'WHO Growth Milestone Tracking: Record weight, height, and head circumference percentiles on each visit.',
        'Immunization Management: Track mandatory and optional pediatric vaccines with batch numbers and booster dates.',
        'Fast Child-Friendly Walk-Ins: Rapid token issuance to minimize waiting room anxiety for infants.',
        'Pediatric Weight-Based Dosage Prescriptions: Clean A4 prescriptions with clear liquid formulation instructions.'
      ],
      sampleClinic: 'LittleCare Pediatrics Hub',
      slug: 'littlecare-pediatrics'
    },
    {
      id: 'nursing-home',
      title: 'Local Nursing Homes (10–30 Beds)',
      subtitle: 'Sub-acute recovery, palliative care, and telemetry bed management',
      icon: Building2,
      workflows: [
        'Visual Bed Occupancy Grid: Interactive status for 10–30 inpatient beds (Occupied, Available, Sanitization).',
        'Daily Inpatient Tariff Billing: Automated daily bed charge calculation with nursing care add-ons.',
        'Doctor Rounding Notes: Doctors record daily clinical progress notes and update medication orders.',
        'Discharge Summary with QR Verification: Tamper-evident digital discharge summaries with follow-up instructions.'
      ],
      sampleClinic: 'GreenHaven Recovery & Nursing Home',
      slug: 'greenhaven-nursing-home'
    }
  ];

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12 sm:space-y-16 transition-colors">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Tailored SaaS Workflows</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Specialty Solutions Designed Around Your Clinical Day
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          ClinicOS avoids rigid one-size-fits-all schemas. Each clinic customizes services, consultation durations, medication presets, and operational templates.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {specialties.map((spec) => {
          const Icon = spec.icon;


          return (
            <div
              key={spec.id}
              id={spec.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{spec.title}</h2>
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mt-1">{spec.subtitle}</p>
                  </div>
                  <div className="space-y-3 pt-2">
                    {spec.workflows.map((wf, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

                        <span>{wf}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Link to={`/clinics/${spec.slug}`}>
                      <Button variant="primary" size="md">
                        Preview Demo Profile
                      </Button>
                    </Link>
                    <Link to="/register/clinic">

                      <Button variant="outline" size="md">
                        Start 14-Day Free Trial
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sample Active Profile</span>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{spec.sampleClinic}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Configured with preloaded service fees, doctors, and sample appointments in this demo.</p>
                    <div className="pt-2">
                      <Link to="/clinic/dashboard" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">

                        Open Admin Dashboard <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

