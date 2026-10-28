import React from 'react';
import { Card } from '../../components/ui/Card';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-8 transition-colors">
      <div className="space-y-3">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Privacy & Healthcare Security</span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Notice & Tenant Data Protection</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Effective Date: October 2026 · ClinicOS SaaS Architecture Specification</p>
      </div>

      <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            1. Strict Tenant Isolation
          </h2>
          <p>
            ClinicOS is engineered with multi-tenant architecture principles. Each clinic organization is provisioned with an isolated tenant boundary. Doctor schedules, registered patient dossiers, clinical diagnosis notes, and financial billing invoices cannot be viewed or accessed by other clinic tenants.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            2. Minimal Data Exposure in QR Prescriptions
          </h2>
          <p>
            Digital prescriptions generated within the platform embed an opaque cryptographic verification hash (e.g., <code className="text-blue-700 dark:text-blue-400 font-mono">v_apex_8812a</code>). The public QR code scanner displays solely the authenticity verification status, doctor credentials, and issuing date. Sensitive medical histories, diagnoses, and personal contact notes are never baked into unencrypted public QR payloads.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            3. Patient Consent & WhatsApp Messaging
          </h2>
          <p>
            Automated WhatsApp appointment confirmations and reminders are dispatched only to patients who provide voluntary opt-in contact numbers at the front desk or during online self-booking. Templates comply with Meta WhatsApp Cloud API utility message standards and offer instant STOP/CANCEL options.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            4. Synthetic Demo Mode Environment
          </h2>
          <p>
            In the current frontend development mode, all clinics, practitioners, patients, and appointments consist exclusively of synthetic dummy data. Real protected health information (PHI) should never be entered into this demonstration workspace until real backend encryption and certified database layers are attached.
          </p>
        </section>
      </Card>
    </div>
  );
}
