import React from 'react';
import { Card } from '../../components/ui/Card';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Legal Terms</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last Revised: October 2026</p>
      </div>

      <Card className="p-8 border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. SaaS Platform License</h2>
          <p>
            CliniPulse grants subscribing healthcare clinics, authorized practitioners, receptionists, and registered patients access to digital appointment management, prescription generation, inventory tracking, and operational analytics in accordance with their selected subscription tier.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Free Trial Conditions</h2>
          <p>
            Eligible independent specialty clinics may access the 14-day free trial without immediate payment obligation. At the expiration of the 14-day trial period, continuing access requires selecting a Starter, Professional, or Enterprise subscription.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Clinical Responsibility Disclaimer</h2>
          <p>
            CliniPulse is an administrative and clinical workflow tool. All medical diagnoses, drug prescriptions, dosages, treatment plans, and emergency procedures remain the sole professional responsibility of the licensed consulting doctor. CliniPulse does not generate automated medical advice or replace clinical judgment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. QR Code & Verification Authenticity</h2>
          <p>
            Verification QR codes provide digital validation of prescription existence within the issuing clinic's records. In demo mode, verification displays sample validation status and is explicitly labeled as not connected to a live hospital registry.
          </p>
        </section>
      </Card>
    </div>
  );
}

