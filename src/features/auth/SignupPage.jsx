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
      <div className="space-y-5 animate-fade-in">
        {/* Option 1: Register a New Clinic / Hospital */}
        <Link
          to="/register/clinic"
          className="group block p-5 sm:p-6 rounded-3xl border-2 border-[#15803D] bg-[#F0FDF4]/70 hover:bg-[#F0FDF4] hover:border-[#166534] transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 relative"
        >
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#15803D] text-white flex items-center justify-center shrink-0 shadow-md shadow-green-700/25 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-black text-slate-950 group-hover:text-[#15803D] transition-colors">
                    Register a New Clinic
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#15803D] text-white uppercase tracking-wider shadow-2xs">
                    14-Day Free Trial
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#15803D] group-hover:translate-x-1.5 transition-transform shrink-0" />
              </div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed font-normal">
                Onboard your clinic, polyclinic, or hospital. Set up OPD schedules, invite consulting doctors, automate reception queues, and start issuing digital prescriptions.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-[#166534]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                  Self-serve 4-step onboarding
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Instant clinic admin workspace
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Option 2: Create a Patient Account */}
        <Link
          to="/register/patient"
          className="group block p-5 sm:p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-teal-400 hover:bg-teal-50/30 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 relative"
        >
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-black text-slate-950 group-hover:text-teal-700 transition-colors">
                    Create a Patient Account
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-50 text-teal-800 border border-teal-300">
                    Patient Portal
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1.5 group-hover:text-teal-600 transition-transform shrink-0" />
              </div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed font-normal">
                Book specialty doctors across 5 independent clinics, track consultation requests, receive tamper-evident prescriptions, and review payment receipts.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-teal-800">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span>Instant client-side profile creation & free appointment booking</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Option 3: Sign In to Existing Account */}
        <Link
          to="/login"
          className="group block p-5 sm:p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
        >
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <LogIn className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-black text-slate-950 group-hover:text-slate-700 transition-colors">
                  Sign In to Existing Account
                </h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1.5 transition-transform shrink-0" />
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                Already registered your clinic, hold a patient profile, or have seeded staff credentials? Sign in to jump right back into your clinical appointments or practice cockpit.
              </p>
            </div>
          </div>
        </Link>

        {/* Policy Notice for Staff vs Clinic Owners */}
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border-2 border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-black text-amber-950">
            <ShieldCheck className="w-4.5 h-4.5 text-amber-700 shrink-0" />
            <span>Are you an Invited Doctor or Receptionist?</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
            Individual <strong>Doctor</strong> and <strong>Receptionist</strong> accounts cannot be self-registered publicly without an invitation. Staff accounts are provisioned exclusively by clinic administrators after clinic onboarding.
          </p>
          <div className="pt-1.5 flex flex-wrap items-center gap-3 font-bold text-xs">
            <Link to="/login/doctor" className="text-[#15803D] hover:underline">
              Doctor Sign In &rarr;
            </Link>
            <span className="text-amber-400">•</span>
            <Link to="/login/receptionist" className="text-[#15803D] hover:underline">
              Front Desk Sign In &rarr;
            </Link>
            <span className="text-amber-400">•</span>
            <Link to="/demo-access" className="text-amber-950 underline font-black">
              Demo Access Hub
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
