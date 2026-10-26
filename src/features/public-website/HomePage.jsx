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
  ChevronRight,
  Activity,
  HeartPulse,
  Receipt,
  Package,
  BarChart3,
  Stethoscope,
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
      sampleClinic: 'Apex Dental & Maxillofacial Care'
    },
    orthopedic: {
      title: 'Orthopedic & Joint Care Centers',
      description: 'Pre/post-op rehab sessions, joint injection logs, physical therapy scheduling, and imaging report archives.',
      highlights: ['Surgical package & installment invoicing', 'Physiotherapy batch attendance', 'Implant and brace inventory tracking'],
      icon: Bone,
      sampleClinic: 'Pulse Orthopedics & Joint Care'
    },
    dermatology: {
      title: 'Dermatology & Aesthetic Clinics',
      description: 'Laser session packages, chemical peel schedules, trichology follow-ups, and patch test consent logs.',
      highlights: ['PRP & laser package session counters', 'Topical pharmacy prescription templates', 'Sensitive skin consent records'],
      icon: Sparkles,
      sampleClinic: 'DermaGlow Skin & Laser Center'
    },
    pediatrics: {
      title: 'Pediatrics & Child Wellness Hubs',
      description: 'WHO milestone growth charts, digital immunization cards, reminder alerts for booster shots, and parental phone updates.',
      highlights: ['Vaccination schedule & cold-chain batch tracking', 'Growth percentiles (height, weight, BMI)', 'Child-friendly queue and rapid walk-ins'],
      icon: Baby,
      sampleClinic: 'LittleCare Pediatrics Hub'
    },
    nursing_home: {
      title: '10–30 Bed Nursing Homes',
      description: 'Bed occupancy status, telemetry vitals, round-the-clock nurse shift handover notes, and sub-acute inpatient day billing.',
      highlights: ['Real-time bed occupancy grid (10-30 beds)', 'Daily doctor visit and nursing charge entries', 'Discharge summaries with verifiable QR code'],
      icon: Building2,
      sampleClinic: 'GreenHaven Recovery & Nursing Home'
    }
  };

  const featureCards = [
    { title: 'Appointment Scheduling', desc: 'Day, week, month, and list calendar views with zero double-booking conflicts.', icon: Calendar },
    { title: 'Walk-In Patient Registration', desc: 'Front-desk express registration with instant queue token generation.', icon: Clock },
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
    <div className="space-y-24 py-8">
      {/* 1. Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Multi-Tenant Clinic Management SaaS · 14-Day Free Trial</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Run Your Clinic Smarter. <br />
              <span className="text-blue-600">Spend Less Time on Paperwork.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Manage appointments, patient records, digital prescriptions, billing, and follow-ups from one simple platform. Give your front desk the tools it needs to serve patients faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Start 14-Day Free Trial
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Concise Benefit Statements */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Simple Bookings</span>
                </div>
                <p className="text-[11px] text-slate-500">Zero double-bookings</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Fast Registration</span>
                </div>
                <p className="text-[11px] text-slate-500">Walk-in queue tokens</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Digital Prescriptions</span>
                </div>
                <p className="text-[11px] text-slate-500">Print PDF & QR verified</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Follow-Up Alerts</span>
                </div>
                <p className="text-[11px] text-slate-500">WhatsApp reminders</p>
              </div>
            </div>
          </div>

          {/* Interactive Hero Dashboard Preview */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 blur-xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-slate-600 ml-2">Apex Dental Clinic · Downtown</span>
                  </div>
                  <Badge variant="Active">Today: 18 Visits</Badge>
                </div>

                {/* Metric Cards in preview */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-center">
                    <p className="text-[10px] uppercase font-bold text-blue-700">Waiting</p>
                    <p className="text-xl font-bold text-blue-900">3</p>
                  </div>
                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-center">
                    <p className="text-[10px] uppercase font-bold text-blue-700">In Chair</p>
                    <p className="text-xl font-bold text-blue-900">1</p>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-center">
                    <p className="text-[10px] uppercase font-bold text-emerald-700">Completed</p>
                    <p className="text-xl font-bold text-emerald-900">14</p>
                  </div>
                </div>

                {/* Live Queue Cards in preview */}
                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">Aarav Patel (PT-1041)</p>
                      <p className="text-slate-500">10:30 AM · Root Canal Therapy · Dr. Arvind Rao</p>
                    </div>
                    <Badge variant="In Progress">In Progress</Badge>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">Meera Deshmukh (PT-1042)</p>
                      <p className="text-slate-500">11:30 AM · Dental Consultation · Token #Q-02</p>
                    </div>
                    <Badge variant="Checked In">Waiting</Badge>
                  </div>
                </div>

                {/* WhatsApp simulated trigger */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-700">Automated WhatsApp Reminder Sent</span>
                  </div>
                  <button
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
                    className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Preview
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Branch: Downtown Dental Studio</span>
                  <Link to="/clinic/dashboard" className="text-blue-600 font-medium hover:underline">
                    Open Live Demo Workspace →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem & Solution Section */}
      <section id="transition" className="bg-white py-16 border-y border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">The Digital Transition</span>
            <h2 className="text-3xl font-extrabold text-slate-900">From Paper Registers to Seamless SaaS</h2>
            <p className="text-slate-600 text-sm">
              Independent clinics waste an estimated 14 hours per week on manual phone scheduling, paper charts, lost prescriptions, and disconnected billing spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                problem: 'Paper Registers & Double Bookings',
                solution: 'Conflict-Proof Digital Calendar',
                detail: 'Interactive day/week views with real-time doctor slot availability and automated double-booking warnings.'
              },
              {
                problem: 'Front Desk Queue Congestion',
                solution: 'Express Walk-In Registration',
                detail: 'Front-desk staff can register walk-ins in under 30 seconds and issue instant queue tokens.'
              },
              {
                problem: 'Lost Paper Prescriptions',
                solution: 'Digital PDF Rx with QR Verification',
                detail: 'Standardized A4 prescriptions with medication dosages, instructions, doctor signatures, and verifiable QR codes.'
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
                detail: 'Easily manage schedules, staff, and revenue across your main center and satellite clinics from a single login.'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 space-y-3 border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Traditional Pain
                  </span>
                  <span className="text-blue-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    ClinicOS Solution
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.solution}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  Replaces: <span className="line-through text-slate-400">{item.problem}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Solutions by Clinic Type */}
      <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Configurable Workflows</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Tailored for Your Specialty</h2>
          <p className="text-slate-600 text-sm">
            Whether you run a fast-paced dental studio, an orthopedic rehab center, or a local 24-bed nursing home, ClinicOS adapts to your operational rhythm.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Object.entries(specialtySolutions).map(([key, sol]) => {
            const Icon = sol.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === key
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sol.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Card */}
        {specialtySolutions[activeTab] && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="Active">{specialtySolutions[activeTab].sampleClinic}</Badge>
                <h3 className="text-2xl font-bold text-slate-900">{specialtySolutions[activeTab].title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{specialtySolutions[activeTab].description}</p>
                <div className="space-y-2 pt-2">
                  {specialtySolutions[activeTab].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex items-center gap-4">
                  <Link to="/clinics">
                    <Button variant="primary" size="md">
                      View Demo Clinic
                    </Button>
                  </Link>
                  <Link to="/register" className="text-xs font-semibold text-blue-600 hover:underline">
                    Setup your {activeTab} clinic in 3 minutes →
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preset Clinical Data</span>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="font-semibold text-slate-900">Configured Services</p>
                  <p className="text-slate-500">Includes preloaded specialty catalog with standard fees & durations.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="font-semibold text-slate-900">Rx Medication Sets</p>
                  <p className="text-slate-500">Pre-populated drug dosage frequencies, durations, and instructions.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="font-semibold text-slate-900">Automated Follow-Up Rules</p>
                  <p className="text-slate-500">Customized recovery timelines with pre-written WhatsApp templates.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Complete Features Grid (14 Features) */}
      <section id="features" className="bg-slate-900 text-white py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Comprehensive Capability</span>
            <h2 className="text-3xl font-extrabold text-white">14 Essential Modules Built For Clinic Scale</h2>
            <p className="text-slate-400 text-sm">
              Engineered with clean domain separation, ready for REST API backend deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/60 transition-colors space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link to="/features">
              <Button variant="outline" size="md" className="bg-transparent text-white border-slate-600 hover:bg-slate-800">
                Browse Full Features Explorer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. How It Works: 4 Simple Steps */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Fast Implementation</span>
          <h2 className="text-3xl font-extrabold text-slate-900">How ClinicOS Works in 4 Steps</h2>
          <p className="text-slate-600 text-sm">
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
            <Card key={idx} className="p-6 relative border-slate-200">
              <span className="text-3xl font-extrabold text-blue-600/30 block mb-2">{s.step}</span>
              <h3 className="text-base font-bold text-slate-900 mb-1">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Connected Clinics Directory Preview */}
      <section id="clinics" className="bg-slate-50 py-16 border-y border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Network Directory</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Connected Clinics on ClinicOS</h2>
              <p className="text-slate-600 text-sm mt-1">
                Explore published clinic profiles using realistic synthetic demo data.
              </p>
            </div>
            <Link to="/clinics">
              <Button variant="outline" size="sm">
                View All {clinics.length} Clinics <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinics.slice(0, 3).map((clinic) => (
              <Card key={clinic.id} className="overflow-hidden border-slate-200 flex flex-col hover:shadow-md transition-shadow">
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
                      {clinic.specialty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-xs">
                      ★ {clinic.rating} ({clinic.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1">{clinic.name}</h3>
                    <p className="text-xs text-blue-700 font-medium mt-0.5">{clinic.tagline}</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{clinic.description}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                      <p>📍 {clinic.city} · {clinic.branches.length} Branch{clinic.branches.length > 1 ? 'es' : ''}</p>
                      <p>🕒 {clinic.operatingHours}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <Link to={`/clinics/${clinic.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Clinic
                      </Button>
                    </Link>
                    <Link to={`/book-appointment?clinic=${clinic.id}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Book Slot
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call to Action Banner */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              Instant 14-Day Free Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Clinic Front Desk?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join specialty clinics and local healthcare facilities modernizing appointments, prescriptions, WhatsApp notifications, and billing.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" className="bg-white text-blue-800 hover:bg-slate-100 font-bold">
                  Start 14-Day Free Trial
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Compare Subscription Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

