import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Stethoscope,
  UserCheck,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export function MainLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  // Staff roles have dedicated sign-in pages.
  const [activeTab, setActiveTab] = useState('patient');

  // Form State
  const [identifier, setIdentifier] = useState('aarav.patel@example.demo');
  const [password, setPassword] = useState('Demo@1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Errors & UI states
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ identifier: false, password: false });

  // Get return redirect if present
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    if (tab === 'doctor_admin') {
      navigate('/login/doctor' + (redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''));
    } else if (tab === 'receptionist_manager') {
      navigate('/login/receptionist' + (redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''));
    } else {
      setIdentifier(tab === 'superadmin' ? 'admin@clinicos.health' : 'aarav.patel@example.demo');
      setPassword('Demo@1234');
    }
  };

  const validate = () => {
    if (!identifier.trim()) return 'Please enter your registered email address or mobile number.';
    if (!password) return 'Please enter your account password.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ identifier: true, password: true });
    setError('');

    const validationErr = validate();
    if (validationErr) {
      setError(validationErr);
      return;
    }

    const res = await login({
      identifier: identifier.trim(),
      password,
      role: activeTab,
      rememberMe
    });

    if (res.success && res.user) {
      const destination = activeTab === 'superadmin' ? '/superadmin/dashboard' : '/patient/dashboard';
      const allowedPrefix = activeTab === 'superadmin' ? '/superadmin' : '/patient';
      if (redirectPath && redirectPath.startsWith(allowedPrefix)) {
        navigate(redirectPath);
      } else {
        navigate(destination);
      }
    } else {
      setError(res.error || 'Authentication failed. Please verify your demonstration credentials.');
    }
  };

  return (
    <AuthLayout
      title="Sign in to ClinicOS"
      subtitle="Access your medical consultations, appointments, and prescriptions."
      badgeText="Patient Portal Access"
    >
      {/* Account Type Selector (Section 8: Patient, Doctor/Admin, Receptionist) */}
      <div className="space-y-2">
        <label className="text-[13px] font-bold text-[#1E293B]">Select Your Account Role</label>
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => handleTabChange('patient')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'patient'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('superadmin')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'superadmin'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('doctor_admin')}
            className="py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('receptionist_manager')}
            className="py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Front Desk</span>
          </button>
        </div>
      </div>

      {/* Inline Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-bold">Login Issue:</span> {error}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Identifier Field */}
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-[#1E293B] block">
            Email Address or Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (error) setError('');
              }}
              onBlur={() => setTouched((p) => ({ ...p, identifier: true }))}
              placeholder="e.g. aarav.patel@example.demo or +91 98765 43210"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.identifier && !identifier.trim() ? 'border-red-300 bg-red-50/20' : 'border-[#E2E8F0]'
              }`}
            />
          </div>
          <p className="text-[12px] text-[#64748B]">Use seeded demo patient or your registered profile.</p>
        </div>

        {/* Password Field */}
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
              onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              placeholder="••••••••••••"
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.password && !password ? 'border-red-300 bg-red-50/20' : 'border-[#E2E8F0]'
              }`}
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

        {/* Remember Me */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-slate-300 cursor-pointer"
            />
            <span>Remember this device (Demo session)</span>
          </label>
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 shadow-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Sign In to Patient Portal <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Quick Prefill for Evaluator */}
      <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-2xl flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-blue-900 block">Default Seeded Patient</span>
          <span className="text-[11px] text-blue-700 font-mono">aarav.patel@example.demo</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setIdentifier('aarav.patel@example.demo');
            setPassword('Demo@1234');
            setError('');
          }}
          className="px-2.5 py-1 text-[11px] font-bold text-blue-800 bg-white border border-blue-300 rounded-lg shadow-2xs hover:bg-blue-50 cursor-pointer"
        >
          Prefill
        </button>
      </div>

      {/* Links & Demo Access Hub Link */}
      <div className="pt-2 text-center space-y-3 text-xs border-t border-slate-100">
        <p className="text-slate-600">
          Don't have a patient account yet?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-800 underline">
            Create a Patient Account
          </Link>
        </p>

        <div className="pt-1">
          <Link
            to="/demo-access"
            className="inline-flex items-center gap-1.5 font-bold text-[12px] text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-full transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Explore Demo Accounts Console (All 4 Roles) &rarr;
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
