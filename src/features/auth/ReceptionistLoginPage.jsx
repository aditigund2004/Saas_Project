import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
  UserCheck,
  Lock,
  Mail,
  Building2,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Clock,
  Users,
  ShieldCheck
} from 'lucide-react';

export function ReceptionistLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('priya.sharma@citycare.demo');
  const [password, setPassword] = useState('FrontDesk@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your assigned front-desk work email.');
      return;
    }
    if (!password) {
      setError('Please enter your staff password.');
      return;
    }

    const res = await login({
      identifier: email.trim(),
      password,
      role: 'receptionist_manager'
    });

    if (res.success && res.user) {
      if (redirectPath && redirectPath.startsWith('/reception')) {
        navigate(redirectPath);
      } else {
        navigate('/reception/dashboard');
      }
    } else {
      setError(res.error || 'Authentication failed. Please verify receptionist credentials.');
    }
  };

  return (
    <AuthLayout
      title="Front Desk & Reception Station"
      subtitle="Access walk-in ticketing, live waiting room queue, and appointment coordination."
      badgeText="Reception Operations Station"
      featureHighlights={[
        'Fast walk-in triage & automated queue token issuance (#Q-xx)',
        'Online booking request verification & alternative slot proposals',
        'Doctor schedule tracking & communication alert triggers',
        'Scoped clinic boundaries with zero exposure of sensitive corporate finance'
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Banner */}
        {error && (
<<<<<<< HEAD
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
=======
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
>>>>>>> origin/main
            <div className="flex-1 leading-relaxed">
              <span className="font-bold">Access Issue:</span> {error}
            </div>
          </div>
        )}

        {/* Work Email */}
<<<<<<< HEAD
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
=======
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-[#1E293B] block">
>>>>>>> origin/main
            Reception Work Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="frontdesk@clinic.demo"
<<<<<<< HEAD
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              required
            />
          </div>
        </div>

        {/* Password */}
<<<<<<< HEAD
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
=======
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-semibold text-[#1E293B]">
>>>>>>> origin/main
              Password <span className="text-red-500">*</span>
            </label>
            <Link
              to="/forgot-password"
<<<<<<< HEAD
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline"
=======
              className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
>>>>>>> origin/main
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••••••••••"
<<<<<<< HEAD
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
=======
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
>>>>>>> origin/main
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Clinic Receptionist Account Switchers */}
        <div className="space-y-1.5 pt-1">
<<<<<<< HEAD
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
=======
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
>>>>>>> origin/main
            Select Seeded Receptionist by Clinic:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setEmail('priya.sharma@citycare.demo')}
<<<<<<< HEAD
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 dark:hover:border-blue-700 text-left truncate cursor-pointer transition-colors"
            >
              <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">Priya Sharma</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">CityCare Family</span>
=======
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left truncate cursor-pointer"
            >
              <span className="font-bold text-slate-800 block truncate">Priya Sharma</span>
              <span className="text-[10px] text-slate-500">CityCare Family</span>
>>>>>>> origin/main
            </button>
            <button
              type="button"
              onClick={() => setEmail('aniket.verma@heartwell.demo')}
<<<<<<< HEAD
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 dark:hover:border-blue-700 text-left truncate cursor-pointer transition-colors"
            >
              <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">Aniket Verma</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">HeartWell Cardio</span>
=======
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left truncate cursor-pointer"
            >
              <span className="font-bold text-slate-800 block truncate">Aniket Verma</span>
              <span className="text-[10px] text-slate-500">HeartWell Cardio</span>
>>>>>>> origin/main
            </button>
            <button
              type="button"
              onClick={() => setEmail('sneha.nair@brightsmile.demo')}
<<<<<<< HEAD
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 dark:hover:border-blue-700 text-left truncate cursor-pointer transition-colors"
            >
              <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">Sneha Nair</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">BrightSmile Dental</span>
=======
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left truncate cursor-pointer"
            >
              <span className="font-bold text-slate-800 block truncate">Sneha Nair</span>
              <span className="text-[10px] text-slate-500">BrightSmile Dental</span>
>>>>>>> origin/main
            </button>
          </div>
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-2.5 shadow-sm mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Verifying Desk Station...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Sign In to Reception Desk <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>

        {/* Role Boundary Note (Section 7) */}
<<<<<<< HEAD
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">Scoped Role Access Boundaries:</span>
=======
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
          <span className="font-bold text-slate-800 block">Scoped Role Access Boundaries:</span>
>>>>>>> origin/main
          <span>
            Receptionists have operational permissions for appointments, queues, patient check-in, and billing. Clinical diagnosis, Rx alterations, and corporate finance remain strictly protected.
          </span>
        </div>

        {/* Navigation */}
<<<<<<< HEAD
        <div className="pt-2 text-center space-y-2 text-xs border-t border-slate-100 dark:border-slate-800">
          <Link to="/" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-block">
            &larr; Return to Home Page
=======
        <div className="pt-2 text-center space-y-2 text-xs border-t border-slate-100">
          <Link to="/login" className="font-semibold text-blue-600 hover:underline inline-block">
            &larr; Return to Main Login Page
>>>>>>> origin/main
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
