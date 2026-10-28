<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> origin/main
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
  Stethoscope,
  Lock,
  Mail,
  Building2,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function DoctorLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, switchClinic } = useAuth();

<<<<<<< HEAD
  const regState = location.state || {};
  const [email, setEmail] = useState(() => regState.email || 'aarav.mehta@citycare.demo');
  const [password, setPassword] = useState(() => regState.password || 'Doctor@Demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [registeredInfo, setRegisteredInfo] = useState(() => {
    if (regState.registered) {
      return {
        doctorName: regState.doctorName || 'Doctor',
        clinicName: regState.clinicName || 'Clinic Practice',
        clinicId: regState.clinicId
      };
    }
    return null;
  });

  // Keep state updated if navigated with location.state
  useEffect(() => {
    if (location.state?.registered) {
      if (location.state.email) setEmail(location.state.email);
      if (location.state.password) setPassword(location.state.password);
      setRegisteredInfo({
        doctorName: location.state.doctorName || 'Doctor',
        clinicName: location.state.clinicName || 'Clinic Practice',
        clinicId: location.state.clinicId
      });
    }
  }, [location.state]);
=======
  const [email, setEmail] = useState('aarav.mehta@citycare.demo');
  const [password, setPassword] = useState('Doctor@Demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
>>>>>>> origin/main

  // Multi-clinic selection state (Section 6)
  const [multipleClinicsUser, setMultipleClinicsUser] = useState(null);
  const [selectedClinicId, setSelectedClinicId] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your registered clinic work email.');
      return;
    }
    if (!password) {
      setError('Please enter your staff password.');
      return;
    }

    const res = await login({
      identifier: email.trim(),
      password,
      role: 'doctor_admin'
    });

    if (res.success && res.user) {
<<<<<<< HEAD
      if (registeredInfo?.clinicId) {
        switchClinic(registeredInfo.clinicId);
      }
=======
>>>>>>> origin/main
      // Check if doctor belongs to multiple clinics (Section 6)
      if (res.user.memberships && res.user.memberships.length > 1) {
        setMultipleClinicsUser(res.user);
        setSelectedClinicId(res.user.activeClinicId || res.user.memberships[0].clinicId);
        return;
      }

<<<<<<< HEAD
      // Single clinic membership: auto-selected & redirect to clinic owner / doctor dashboard
      if (redirectPath && (redirectPath.startsWith('/clinic') || redirectPath.startsWith('/app'))) {
=======
      // Single clinic membership: auto-selected & redirect
      if (redirectPath && redirectPath.startsWith('/clinic')) {
>>>>>>> origin/main
        navigate(redirectPath);
      } else {
        navigate('/clinic/dashboard');
      }
    } else {
      setError(res.error || 'Authentication failed. Please verify doctor credentials.');
    }
  };

  const handleClinicSelectionConfirm = () => {
    if (!selectedClinicId) return;
    switchClinic(selectedClinicId);
    navigate('/clinic/dashboard');
  };

  return (
    <AuthLayout
      title="Clinician & Medical Admin Login"
      subtitle="Access operatory schedules, live patient queue, and clinical consultations."
      badgeText="Doctor / Clinic Admin Suite"
      featureHighlights={[
        'Full EHR consultation room & electronic prescription builder',
        'Operatory calendars, appointment rotas, and live patient queue',
        'Staff management, permitted billing, and inventory control',
        'Multi-clinic tenant isolation with restricted data boundaries'
      ]}
    >
      {/* Multi-Clinic Selection Modal / Screen (Section 6) */}
      {multipleClinicsUser ? (
        <div className="space-y-5 animate-in fade-in duration-200">
<<<<<<< HEAD
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-sm">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Multiple Clinic Affiliations Detected</span>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
=======
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Multiple Clinic Affiliations Detected</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
>>>>>>> origin/main
              Dr. {multipleClinicsUser.name} holds clinical consulting privileges at more than one facility. Select your active practice workspace for this session:
            </p>
          </div>

          <div className="space-y-2.5">
            {multipleClinicsUser.memberships.map((m) => (
              <label
                key={m.clinicId}
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedClinicId === m.clinicId
<<<<<<< HEAD
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
=======
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 hover:bg-slate-50'
>>>>>>> origin/main
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="clinicMembership"
                    value={m.clinicId}
                    checked={selectedClinicId === m.clinicId}
                    onChange={() => setSelectedClinicId(m.clinicId)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
<<<<<<< HEAD
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{m.clinicName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{m.branchName || 'Main Hub'}</div>
                  </div>
                </div>
                {m.isPrimary && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
=======
                    <div className="font-bold text-xs text-slate-900">{m.clinicName}</div>
                    <div className="text-[11px] text-slate-500">{m.branchName || 'Main Hub'}</div>
                  </div>
                </div>
                {m.isPrimary && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
>>>>>>> origin/main
                    Primary
                  </span>
                )}
              </label>
            ))}
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold"
            onClick={handleClinicSelectionConfirm}
          >
            Launch Clinic Workspace <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      ) : (
        /* Regular Login Form */
        <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< HEAD
          {/* Registration Success Welcome Banner */}
          {registeredInfo && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Registration Complete!</span>
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Welcome, <strong>{registeredInfo.doctorName}</strong>. Your clinic practice <strong>{registeredInfo.clinicName}</strong> has been registered with a 14-day free trial. Your credentials are ready below. Click <strong>Sign In as Doctor / Admin</strong> to open your clinic owner dashboard.
              </p>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
=======
          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
>>>>>>> origin/main
              <div className="flex-1 leading-relaxed">
                <span className="font-bold">Access Blocked:</span> {error}
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
              Clinic Work Email <span className="text-red-500">*</span>
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
                placeholder="doctor@clinic.demo"
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

<<<<<<< HEAD
=======
          {/* Quick Doctor Account Switchers */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Quick Test Credentials (5 Clinics + Multi-Clinic):
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setEmail('aarav.mehta@citycare.demo')}
                className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left truncate cursor-pointer"
              >
                <span className="font-bold text-slate-800 block truncate">Dr. Aarav Mehta</span>
                <span className="text-[10px] text-slate-500">CityCare Family</span>
              </button>
              <button
                type="button"
                onClick={() => setEmail('rohan.deshmukh@heartwell.demo')}
                className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left truncate cursor-pointer"
              >
                <span className="font-bold text-slate-800 block truncate">Dr. Rohan Deshmukh</span>
                <span className="text-[10px] text-slate-500">HeartWell Cardio</span>
              </button>
              <button
                type="button"
                onClick={() => setEmail('isha.shah@brightsmile.demo')}
                className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left truncate cursor-pointer"
              >
                <span className="font-bold text-slate-800 block truncate">Dr. Isha Shah</span>
                <span className="text-[10px] text-slate-500">BrightSmile Dental</span>
              </button>
              <button
                type="button"
                onClick={() => setEmail('sanjay.kulkarni@clinicos.demo')}
                className="p-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-left truncate cursor-pointer"
              >
                <span className="font-bold text-amber-900 block truncate">Dr. Sanjay (Multi-Clinic)</span>
                <span className="text-[10px] text-amber-700">CityCare & BrightSmile</span>
              </button>
            </div>
          </div>

>>>>>>> origin/main
          {/* Submit CTA */}
          <Button
            type="submit"
            variant="primary"
            size="md"
<<<<<<< HEAD
            className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 shadow-sm mt-3 cursor-pointer"
=======
            className="w-full justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-2.5 shadow-sm mt-2"
>>>>>>> origin/main
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Authenticating Doctor...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Sign In as Doctor / Admin <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>

<<<<<<< HEAD
          {/* Registration & Trial Plan Setup Option */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-slate-50 dark:from-slate-800/80 dark:via-blue-950/30 dark:to-slate-800/60 border border-blue-200/90 dark:border-blue-900/60 text-xs space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block text-xs">
                  New Doctor or Clinic Practice?
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Get your customized clinic website and management suite in 5 minutes.
                </span>
              </div>
            </div>

            <Link
              to="/onboarding"
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 hover:text-white dark:hover:text-white border border-blue-300 dark:border-blue-700 hover:border-blue-600 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs group cursor-pointer"
            >
              <span>Register & Setup 14-Day Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-medium">
                No credit card required · Instant online setup · Cancel anytime
              </span>
=======
          {/* Public Signup Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
            <span className="font-bold text-slate-800 block">Staff Account Policy:</span>
            <span>
              Doctor and clinician accounts cannot be created via public registration. Privileged credentials are provisioned exclusively through clinic administration.
            </span>
            <div className="pt-0.5">
              <Link to="/register/clinic" className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1">
                Setting up a new clinic? Register Clinic Practice &rarr;
              </Link>
>>>>>>> origin/main
            </div>
          </div>

          {/* Navigation Links */}
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
      )}
    </AuthLayout>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
