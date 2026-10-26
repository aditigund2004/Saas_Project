import React from 'react';
import { Card } from '../../components/ui/Card';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Privacy & Healthcare Security</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Notice & Tenant Data Protection</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026 · CliniPulse SaaS Architecture Specification</p>
      </div>

      <Card className="p-8 border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            1. Strict Tenant Isolation
          </h2>
          <p>
            CliniPulse is engineered with multi-tenant architecture principles. Each clinic organization is provisioned with an isolated tenant boundary. Doctor schedules, registered patient dossiers, clinical diagnosis notes, and financial billing invoices cannot be viewed or accessed by other clinic tenants.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            2. Minimal Data Exposure in QR Prescriptions
          </h2>
          <p>
            Digital prescriptions generated within the platform embed an opaque cryptographic verification hash (e.g., <code className="text-blue-700">v_apex_8812a</code>). The public QR code scanner displays solely the authenticity verification status, doctor credentials, and issuing date. Sensitive medical histories, diagnoses, and personal contact notes are never baked into unencrypted public QR payloads.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            3. Patient Consent & WhatsApp Messaging
          </h2>
          <p>
            Automated WhatsApp appointment confirmations and reminders are dispatched only to patients who provide voluntary opt-in contact numbers at the front desk or during online self-booking. Templates comply with Meta WhatsApp Cloud API utility message standards and offer instant STOP/CANCEL options.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
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

