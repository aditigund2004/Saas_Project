import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import {
  UserPlus,
  LogIn,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Heart,
  Users,
  Clock3
} from 'lucide-react';

export function SignupPage() {
  return (
    <AuthLayout
      title="Join ClinicOS Healthcare"
      subtitle="Choose how you want to access the multi-clinic network."
      badgeText="Public Onboarding"
    >
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
              </div>
            </div>
          </div>
        </Link>

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
            </div>
          </div>
        </Link>

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
        </div>
      </div>
    </AuthLayout>
  );
}
