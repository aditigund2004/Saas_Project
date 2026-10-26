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
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function MainLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  // Tab: 'patient' | 'doctor_admin' | 'receptionist_manager' | 'superadmin'
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
    } else if (tab === 'superadmin') {
      setIdentifier('admin@clinicos.health');
      setPassword('SuperAdmin@Demo123');
    } else {
      setIdentifier('aarav.patel@example.demo');
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
      role: activeTab === 'superadmin' ? 'superadmin' : 'patient',
      rememberMe
    });

    if (res.success && res.user) {
      const userRole = res.user.role;
      if (userRole === 'superadmin' || userRole === 'super_admin') {
        navigate('/superadmin/dashboard');
      } else if (userRole === 'doctor_admin' || userRole === 'clinic_admin') {
        navigate('/clinic/dashboard');
      } else if (userRole === 'receptionist_manager' || userRole === 'receptionist') {
        navigate('/reception/dashboard');
      } else {
        if (redirectPath && redirectPath.startsWith('/patient')) {
          navigate(redirectPath);
        } else {
          navigate('/patient/dashboard');
        }
      }
    } else {
      setError(res.error || 'Authentication failed. Please verify your demonstration credentials.');
    }
  };

  return (
    <AuthLayout
      title={activeTab === 'superadmin' ? 'Superadmin Platform Sign In' : 'Sign in to ClinicOS'}
      subtitle={
        activeTab === 'superadmin'
          ? 'Enterprise governance, multi-tenant administration, and platform workforce analytics.'
          : 'Access your medical consultations, appointments, and prescriptions.'
      }
      badgeText={activeTab === 'superadmin' ? 'SaaS Superadmin Access' : 'Patient Portal Access'}
    >
      {/* Account Type Selector (4 Distinct Tabs in Clean 2x2 Grid with Full Legibility) */}
      <div className="space-y-2">
        <label className="text-sm font-black text-slate-950 block">Select Your Account Role</label>
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border-2 border-slate-200">
          <button
            type="button"
            onClick={() => handleTabChange('patient')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'patient'
                ? 'bg-white text-[#15803D] shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Patient Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('doctor_admin')}
            className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Stethoscope className="w-4 h-4 shrink-0 text-[#15803D]" />
            <span>Clinic Doctor</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('receptionist_manager')}
            className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Front Desk</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('superadmin')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'superadmin'
                ? 'bg-[#15803D] text-white shadow-md shadow-green-700/25'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Super Admin</span>
          </button>
        </div>
      </div>

      {/* Inline Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-xs text-red-900 flex items-start gap-3 animate-fade-in font-medium">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-extrabold text-red-950">Login Issue:</span> {error}
          </div>
        </div>
      )}

      {/* Form with Perfect Icon Clearance & Alignment */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Identifier Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-extrabold text-slate-900 block">
            Email Address or Account Identifier <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400 z-10">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (error) setError('');
              }}
              placeholder={activeTab === 'superadmin' ? 'admin@clinicos.health' : 'aarav.patel@example.demo'}
              className={`w-full pr-4 py-3 bg-white border-2 rounded-2xl text-sm font-bold text-slate-950 placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/15 transition-all ${
                touched.identifier && !identifier.trim() ? 'border-red-500' : 'border-slate-200'
              }`}
              style={{ paddingLeft: '2.85rem' }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-extrabold text-slate-900">
              Password <span className="text-red-500">*</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-[#15803D] hover:text-[#166534] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400 z-10">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••••••••••"
              className={`w-full py-3 bg-white border-2 rounded-2xl text-sm font-bold text-slate-950 placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/15 transition-all ${
                touched.password && !password ? 'border-red-500' : 'border-slate-200'
              }`}
              style={{ paddingLeft: '2.85rem', paddingRight: '2.85rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 flex items-center p-1 text-slate-400 hover:text-slate-600 cursor-pointer z-10"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4.5 h-4.5 text-[#15803D] rounded-md border-2 border-slate-300 focus:ring-[#15803D] focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-slate-700 font-bold">Keep me signed in for demonstration</span>
          </label>
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center h-12 text-sm font-black shadow-lg shadow-green-700/25 hover:scale-102 transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {activeTab === 'superadmin' ? 'Sign In as SaaS Superadmin' : 'Sign In to Patient Portal'}{' '}
              <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          )}
        </Button>
      </form>

      {/* Quick Prefill for Evaluator */}
      <div className="p-3.5 bg-[#F0FDF4] border-2 border-[#86EFAC] rounded-2xl flex items-center justify-between text-xs">
        <div>
          <span className="font-black text-[#14532D] block text-xs">
            {activeTab === 'superadmin' ? 'Default Seeded Superadmin' : 'Default Seeded Patient'}
          </span>
          <span className="text-xs text-[#166534] font-mono font-bold">
            {activeTab === 'superadmin' ? 'admin@clinicos.health' : 'aarav.patel@example.demo'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (activeTab === 'superadmin') {
              setIdentifier('admin@clinicos.health');
              setPassword('SuperAdmin@Demo123');
            } else {
              setIdentifier('aarav.patel@example.demo');
              setPassword('Demo@1234');
            }
            setError('');
          }}
          className="px-3 py-1.5 text-xs font-black text-[#166534] bg-white border border-[#86EFAC] rounded-xl shadow-xs hover:bg-[#F0FDF4] cursor-pointer"
        >
          Prefill
        </button>
      </div>

      {/* Links & Demo Access Hub Link */}
      <div className="pt-2 text-center space-y-3 text-xs border-t-2 border-slate-100">
        <p className="text-slate-600 font-medium">
          Want to onboard a facility?{' '}
          <Link to="/register/clinic" className="font-black text-[#15803D] hover:text-[#166534] underline">
            Register New Clinic
          </Link>
          <span className="mx-2 text-slate-300">|</span>
          <Link to="/signup" className="font-bold text-slate-700 hover:text-slate-950 underline">
            Patient Signup
          </Link>
        </p>

        <div className="pt-1">
          <Link
            to="/demo-access"
            className="inline-flex items-center gap-2 font-black text-xs text-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#86EFAC] px-4 py-2 rounded-full transition-all shadow-2xs hover:scale-102"
          >
            <Sparkles className="w-4 h-4 text-[#15803D] animate-pulse" />
            Explore Demo Accounts Console (All 4 Roles) &rarr;
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
