import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import {
  UserPlus,
  LogIn,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export function SignupPage() {
  return (
    <AuthLayout
      title="Join ClinicOS Healthcare"
      subtitle="Choose how you want to access the multi-clinic network."
      badgeText="Public Onboarding"
    >
      <div className="space-y-4">
        {/* Option 1: Register a New Clinic / Hospital */}
        <Link
          to="/register/clinic"
          className="group block p-4 sm:p-5 rounded-2xl border-2 border-blue-600 bg-blue-50/50 hover:bg-blue-50/90 hover:border-blue-700 transition-all shadow-xs relative"
        >
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Register a New Clinic
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white uppercase tracking-wider shadow-2xs">
                    14-Day Free Trial
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Onboard your clinic, polyclinic, or hospital. Set up OPD schedules, invite consulting doctors, automate reception queues, and start issuing digital prescriptions.
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-blue-700">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Self-serve 4-step onboarding
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Instant clinic admin workspace
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Option 2: Create a Patient Account */}
        <Link
          to="/register/patient"
          className="group block p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition-all shadow-xs relative"
        >
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                    Create a Patient Account
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                    Patient Portal
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-teal-600 transition-transform shrink-0" />
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Book specialty doctors across 5 independent clinics, track consultation requests, receive tamper-evident prescriptions, and review payment receipts.
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-[11px] font-bold text-teal-700">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span>Instant client-side profile creation & free appointment booking</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Option 3: Sign In to Existing Account */}
        <Link
          to="/login"
          className="group block p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition-all shadow-xs"
        >
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-slate-700 transition-colors">
                  Sign In to Existing Account
                </h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Already registered your clinic, hold a patient profile, or have seeded staff credentials? Sign in to jump right back into your clinical appointments or practice workspace.
              </p>
            </div>
          </div>
        </Link>

        {/* Policy Notice for Staff vs Clinic Owners */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Are you an Invited Doctor or Receptionist?</span>
          </div>
          <p className="text-[11px] sm:text-[12px] text-amber-800 leading-relaxed">
            Individual <strong>Doctor</strong> and <strong>Receptionist</strong> accounts cannot be self-registered publicly without an invitation. Staff accounts are provisioned exclusively by clinic administrators after clinic onboarding.
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3 font-semibold text-[11px]">
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

