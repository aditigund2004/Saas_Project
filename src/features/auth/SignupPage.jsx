import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
  UserPlus,
  LogIn,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Lock,
  Building2,
  Sparkles,
  Info
} from 'lucide-react';

export function SignupPage() {
  return (
    <AuthLayout
      title="Join ClinicOS Healthcare"
      subtitle="Choose how you want to access the multi-clinic network."
      badgeText="Public Onboarding"
    >
      <div className="space-y-4">
        {/* Option 1: Create a Patient Account (Section 4) */}
        <Link
          to="/register/patient"
          className="group block p-5 rounded-2xl border-2 border-blue-500 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-600 transition-all shadow-xs relative"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Create a Patient Account
                </h3>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Book specialty doctors across 5 independent clinics, track consultation requests, receive tamper-evident prescriptions, and review payment receipts.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-blue-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Instant client-side profile creation & free discovery</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Option 2: Sign In to Existing Account */}
        <Link
          to="/login"
          className="group block p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition-all shadow-xs"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <LogIn className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-slate-700 transition-colors">
                  Sign In to Existing Account
                </h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Already have a patient profile or seeded staff credentials? Sign in to jump right back into your clinical appointments or practice workspace.
              </p>
            </div>
          </div>
        </Link>

        {/* Explicit Policy Banner on Staff Registration (Section 4) */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Are you a Doctor, Receptionist, or Clinic Owner?</span>
          </div>
          <p className="text-[12px] text-amber-800 leading-relaxed">
            In compliance with healthcare security governance, <strong>Doctor/Admin</strong> and <strong>Receptionist</strong> accounts cannot be self-registered through public forms. Staff accounts are provisioned exclusively via clinic management invitation.
          </p>
          <div className="pt-1 flex items-center gap-3 font-semibold text-[11px]">
            <Link to="/login/doctor" className="text-blue-700 hover:underline">
              Doctor Sign In &rarr;
            </Link>
            <span className="text-amber-400">•</span>
            <Link to="/login/receptionist" className="text-blue-700 hover:underline">
              Front Desk Sign In &rarr;
            </Link>
            <span className="text-amber-400">•</span>
            <Link to="/demo-access" className="text-amber-900 underline">
              Demo Access Hub
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

