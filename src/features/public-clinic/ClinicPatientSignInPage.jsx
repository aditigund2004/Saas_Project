import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  ChevronLeft
} from 'lucide-react';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPatientSignInPage() {
  const { clinicSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { clinics, switchRole, switchClinic, showToast } = useApp();
  const { login, syncRole, user } = useAuth();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const primaryColor = settings.primaryColor || '#2563eb';

  // Form State
  const [identifier, setIdentifier] = useState('aarav.patel@example.demo');
  const [password, setPassword] = useState('Demo@1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle direct sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please provide your registered email address or mobile number.');
      return;
    }
    if (!password) {
      setError('Please provide your patient account password.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Authenticate with login
      if (login) {
        const res = await login({
          identifier: identifier.trim(),
          password,
          role: 'patient',
          clinicId: clinic.id,
          rememberMe
        });

        if (!res.success) {
          setError(res.error || 'Invalid credentials. Please verify your demonstration email and password.');
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Switch app context to patient role and target clinic
      if (switchRole) {
        switchRole('patient');
      } else if (syncRole) {
        syncRole('patient', clinic.id);
      }
      if (switchClinic) {
        switchClinic(clinic.id);
      }

      showToast(`Welcome back! You are now viewing the Patient Portal for ${clinic.name}.`, 'success');

      // 3. Locate directly to the patient portal
      navigate('/patient/dashboard');
    } catch (err) {
      console.error('Sign in error:', err);
      // Fallback switch and navigate
      if (switchRole) switchRole('patient');
      navigate('/patient/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick 1-click Demo Patient Login
  const handleQuickDemoLogin = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      if (switchRole) {
        switchRole('patient');
      } else if (syncRole) {
        syncRole('patient', clinic.id);
      }
      if (switchClinic) {
        switchClinic(clinic.id);
      }

      if (login) {
        await login({
          identifier: 'aarav.patel@example.demo',
          password: 'Demo@1234',
          role: 'patient',
          clinicId: clinic.id,
          rememberMe: true
        });
      }

      showToast(`Signed in as Aarav Patel (Patient). Welcome to your Patient Portal!`, 'success');
      navigate('/patient/dashboard');
    } catch (err) {
      console.error(err);
      if (switchRole) switchRole('patient');
      navigate('/patient/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Back to clinic breadcrumb */}
      <div className="max-w-md mx-auto w-full mb-4">
        <Link
          to={`/clinic/${clinic.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to {clinic.name} Website</span>
        </Link>
      </div>

      <div className="max-w-md mx-auto w-full space-y-6">
        {/* Clinic Identity Card */}
        <div className="text-center space-y-2">
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-slate-200 dark:ring-[#263B59]"
            style={{ backgroundColor: primaryColor }}
          >
            {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-[#F1F5F9] tracking-tight">
            Patient Portal Sign In
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
            Sign in to access your consultations, prescriptions, invoices, and appointments at{' '}
            <span className="font-semibold text-slate-700 dark:text-[#CBD5E1]">{clinic.name}</span>.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-[#172640] border border-blue-200 dark:border-[#263B59] shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 dark:text-[#22D3EE] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Instant Demonstration Access
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
              Verified Patient
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
            Test the patient experience right away without typing credentials.
          </p>
          <Button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isSubmitting}
            variant="primary"
            size="sm"
            className="w-full font-bold text-xs shadow-md text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: primaryColor }}
          >
            <User className="w-4 h-4" />
            <span>1-Click Sign In as Aarav Patel → Enter Patient Portal</span>
          </Button>
        </div>

        {/* Main Sign In Card */}
        <Card className="p-6 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-md space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email / Mobile Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com or mobile"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-blue-600 dark:text-[#22D3EE] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#94A3B8] hover:text-slate-700 dark:hover:text-[#F1F5F9]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-blue-600 dark:text-[#3B82F6] focus:ring-blue-500"
                />
                <span className="text-slate-700 dark:text-[#CBD5E1]">Keep me signed in</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-mono">Demo: Demo@1234</span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="md"
              className="w-full font-bold text-xs shadow-md text-white flex items-center justify-center gap-2 py-3"
              style={{ backgroundColor: primaryColor }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Locating to Patient Portal...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Open Patient Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Switch to Registration */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#263B59] text-center space-y-2">
            <p className="text-xs text-slate-600 dark:text-[#CBD5E1]">
              New patient at {clinic.name}?{' '}
              <Link
                to={`/clinic/${clinic.slug}/register`}
                className="font-bold text-blue-600 dark:text-[#22D3EE] hover:underline"
              >
                Create an Account →
              </Link>
            </p>
            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 dark:text-[#94A3B8]">
              <Link
                to={`/clinic/${clinic.slug}/book-appointment`}
                className="hover:underline text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#CBD5E1]"
              >
                Book as Guest
              </Link>
              <span>•</span>
              <Link to="/login/doctor" className="hover:underline text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#CBD5E1]">
                Staff & Doctor Login
              </Link>
            </div>
          </div>
        </Card>

        {/* Security Reassurance */}
        <div className="text-center text-[11px] text-slate-500 dark:text-[#94A3B8] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span>256-Bit Encrypted Healthcare Patient Portal</span>
        </div>
      </div>
    </div>
  );
}

