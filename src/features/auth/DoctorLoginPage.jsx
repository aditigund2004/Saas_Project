import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
<<<<<<< HEAD
  Stethoscope,
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  Lock,
  Mail,
  Building2,
  AlertCircle,
  ArrowRight,
  Eye,
<<<<<<< HEAD
  EyeOff,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles
=======
  EyeOff
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
} from 'lucide-react';

export function DoctorLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, switchClinic } = useAuth();

  const [email, setEmail] = useState('aarav.mehta@citycare.demo');
  const [password, setPassword] = useState('Doctor@Demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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
      // Check if doctor belongs to multiple clinics (Section 6)
      if (res.user.memberships && res.user.memberships.length > 1) {
        setMultipleClinicsUser(res.user);
        setSelectedClinicId(res.user.activeClinicId || res.user.memberships[0].clinicId);
        return;
      }

      // Single clinic membership: auto-selected & redirect
      if (redirectPath && redirectPath.startsWith('/clinic')) {
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
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Multiple Clinic Affiliations Detected</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              Dr. {multipleClinicsUser.name} holds clinical consulting privileges at more than one facility. Select your active practice workspace for this session:
            </p>
          </div>

          <div className="space-y-2.5">
            {multipleClinicsUser.memberships.map((m) => (
              <label
                key={m.clinicId}
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedClinicId === m.clinicId
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 hover:bg-slate-50'
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
                    <div className="font-bold text-xs text-slate-900">{m.clinicName}</div>
                    <div className="text-[11px] text-slate-500">{m.branchName || 'Main Hub'}</div>
                  </div>
                </div>
                {m.isPrimary && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
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
          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <span className="font-bold">Access Blocked:</span> {error}
              </div>
            </div>
          )}

          {/* Work Email */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-[#1E293B] block">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-[#1E293B]">
                Password <span className="text-red-500">*</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
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
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

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
                Authenticating Doctor...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Sign In as Doctor / Admin <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>

          {/* Public Signup Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Staff Account Policy:</span>
            <span>
              Doctor and clinician accounts cannot be created via public registration. Privileged credentials are provisioned exclusively through clinic administration.
            </span>
          </div>

          {/* Navigation Links */}
          <div className="pt-2 text-center space-y-2 text-xs border-t border-slate-100">
            <Link to="/login" className="font-semibold text-blue-600 hover:underline inline-block">
              &larr; Return to Main Login Page
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
