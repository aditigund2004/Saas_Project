import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
<<<<<<< HEAD
import { Button } from '../../components/ui/Button';
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
import {
  UserPlus,
  LogIn,
  ArrowRight,
  ShieldCheck,
<<<<<<< HEAD
  Stethoscope,
  Lock,
  Building2,
  Sparkles,
  Info
=======
  Building2,
  Stethoscope,
  Heart,
  Users,
  Clock3
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
} from 'lucide-react';

export function SignupPage() {
  return (
    <AuthLayout
      title="Join ClinicOS Healthcare"
      subtitle="Choose how you want to access the multi-clinic network."
      badgeText="Public Onboarding"
    >
<<<<<<< HEAD
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
=======
      <div className="space-y-6">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">What brings you to ClinicOS?</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Choose an account type to get started. You can explore the demo without creating an account.
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/register/patient"
          className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition-transform group-hover:scale-105">
              <UserPlus className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-extrabold text-slate-900 transition-colors group-hover:text-blue-700">
                  Create a Patient Account
                </h3>
                <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Find a clinic, request an appointment, and keep your visit details in one place.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-700">
                <Clock3 className="h-4 w-4" />
                <span>Quick sign-up · Browse clinics for free</span>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              </div>
            </div>
          </div>
        </Link>

<<<<<<< HEAD
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
=======
        <Link
          to="/register/clinic"
          className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 transition-transform group-hover:scale-105">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-extrabold text-slate-900 transition-colors group-hover:text-indigo-700">
                  Register a Clinic
                </h3>
                <ArrowRight className="h-5 w-5 shrink-0 text-indigo-600 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Submit your clinic details and create an administrator profile. You can sign in after the super-admin approves your application.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-indigo-700">
                <ShieldCheck className="h-4 w-4" />
                <span>Approval required before clinic access</span>
              </div>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </div>
          </div>
        </Link>

<<<<<<< HEAD
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
=======
        <div className="grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Users className="h-4 w-4 text-slate-600" />
              <span>Already have a ClinicOS account?</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Sign in to continue to your patient or staff workspace.
            </p>
            <Link
              to="/login"
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              <LogIn className="h-4 w-4" />
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="sm:col-span-2">
            <p className="mb-2 text-xs font-semibold text-slate-600">
              Joining an existing clinic? Choose your workspace:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                to="/login/doctor"
                className="flex min-h-11 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-blue-600" />
                  Doctor / Admin
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login/receptionist"
                className="flex min-h-11 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Front desk
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Your clinic administrator provides staff accounts.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/demo-access" className="text-sm font-semibold text-blue-700 hover:underline">
            Explore demo accounts instead
          </Link>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        </div>
      </div>
    </AuthLayout>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
