import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  ShieldCheck,
  Printer,
  QrCode,
  Heart,
  Phone,
  AlertTriangle,
  Pill,
  Calendar,
  Building2,
  Activity,
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function HealthPassport() {
  const { currentUser, patients, activePatientId, isPatientFriendlyMode } = useApp();

  const patient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Verified Digital Health ID
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Personal Health Passport
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            An emergency-ready digital health card containing allergies, chronic conditions, and emergency proxy contacts.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => window.print()}
          className="font-bold shadow-md shadow-blue-500/20"
        >
          <Printer className="w-4 h-4 mr-1.5" /> Print Health Passport
        </Button>
      </div>

      {/* Modern Digital Health Card (Printable layout) */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-500/30 relative overflow-hidden">
        {/* Holographic Watermark glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Card Top Brand & Status */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight block">
                  Clinic<span className="text-blue-400">OS</span> Digital Passport
                </span>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">
                  Universal Patient Identifier
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Demo Card
              </div>
            </div>
          </div>

          {/* Profile Identity & QR Block */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-8 flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-black shrink-0 border-2 border-white/20 shadow-md">
                {patient?.name ? patient.name.slice(0, 2).toUpperCase() : 'AP'}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                  Patient Full Name
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  {patient?.name || 'Aarav Patel'}
                </h2>
                <div className="text-xs text-blue-100 flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
                  <span>ID: <strong className="text-white font-mono">{patient?.patientIdNumber || 'PT-1041'}</strong></span>
                  <span>DOB: <strong className="text-white">{patient?.dob || '1992-06-14'}</strong></span>
                  <span>Blood: <strong className="text-white">{patient?.bloodGroup || 'B+'}</strong></span>
                  <span>Gender: <strong className="text-white">{patient?.gender || 'Male'}</strong></span>
                </div>
              </div>
            </div>

            {/* Simulated QR Identifier */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shadow-inner">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
              <span className="text-[9px] text-blue-200 mt-1.5 uppercase tracking-wider font-semibold">
                Scan for Verified Summary
              </span>
              <span className="text-[8px] text-slate-400 font-mono">DEMO-SECURE-KEY-8821</span>
            </div>
          </div>

          {/* Critical Clinical Vitals & Alerts Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Allergies Alert */}
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300 block mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> High-Risk Allergies
              </span>
              <div className="space-y-0.5 text-xs font-bold text-white">
                {patient?.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((al, idx) => <div key={idx}>• {al}</div>)
                ) : (
                  <div>• Penicillin (Anaphylactic sensitivity)</div>
                )}
              </div>
            </div>

            {/* Current Medications */}
            <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 block mb-1 flex items-center gap-1">
                <Pill className="w-3.5 h-3.5" /> Ongoing Medications
              </span>
              <div className="space-y-0.5 text-xs font-semibold text-white">
                <div>• Telmisartan 20mg (Daily AM)</div>
                <div>• Vitamin D3 60k (Weekly)</div>
              </div>
            </div>

            {/* Emergency Proxy */}
            <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Emergency Contact
              </span>
              <div className="text-xs font-bold text-white">
                {patient?.emergencyContact || 'Sunita Patel (Spouse) — +91 98765 43219'}
              </div>
            </div>
          </div>

          {/* Footer Card Validation */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-blue-300/80">
            <span>Primary Care: CityCare Family Practice · Dr. Aarav Mehta</span>
            <span className="italic">All credentials and QR codes are synthetic demonstration artifacts.</span>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Offline & Emergency Accessibility
          </span>
          This Digital Health Passport is rendered client-side and can be printed or saved to PDF for carrying in a physical wallet or presenting during hospital admissions.
        </div>
      </div>
    </div>
  );
}

