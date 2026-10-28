import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Activity,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function SuperAdminLoginPage() {
  const { login, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Redirect target
  const redirectPath = searchParams.get('redirect') || '/superadmin/dashboard';

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation & Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState(location.state?.error || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Every time the superadmin login page is opened, reset/logout so fresh credentials are required every time
  useEffect(() => {
    logout();
  }, []);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Administrator email is required.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid administrator email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required to authenticate.');
      isValid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await login({
        identifier: email.trim(),
        password: password,
        role: 'superadmin'
      });

      if (result.success && result.user) {
        // Successful login: navigate to destination
        navigate(redirectPath, { replace: true });
      } else {
        setAuthError(result.error || 'Invalid administrator credentials. Access denied.');
      }
    } catch {
      setAuthError('Authentication service encountered an unexpected error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans antialiased relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Mesh & Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Top Bar: Minimal Platform Identifier */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-500 transition-colors">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Clinic<span className="text-blue-400">OS</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-950 text-blue-300 border border-blue-800/80">
              Platform Admin Console
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <Link
            to="/login/doctor"
            className="text-slate-400 hover:text-slate-200 transition-colors hidden sm:block"
          >
            Clinician / Doctor Login &rarr;
          </Link>
          <Link
            to="/"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-auto">
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 backdrop-blur-xl space-y-6">
          {/* Header Title & Icon */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Super Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
              Dedicated administrative portal for platform governance, multi-tenant clinic operations, and global SaaS subscriptions.
            </p>
          </div>

          {/* Invalid Credentials / Access Denied Feedback Alert */}
          {authError && (
            <div
              role="alert"
              className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200 shadow-xs"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">
                <span className="font-bold text-red-300">Authentication Failed:</span> {authError}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold text-slate-300 tracking-wide"
              >
                Administrator Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                    if (authError) setAuthError('');
                  }}
                  placeholder="superadmin@admin.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-950/90 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 transition-all ${
                    emailError
                      ? 'border-red-500/80 focus:ring-red-500/50'
                      : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/30'
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-slate-300 tracking-wide"
                >
                  Password <span className="text-red-400">*</span>
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                    if (authError) setAuthError('');
                  }}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-slate-950/90 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 transition-all ${
                    passwordError
                      ? 'border-red-500/80 focus:ring-red-500/50'
                      : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 cursor-pointer"
                />
                <span className="text-xs text-slate-400">Remember this session</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting || isLoading}
              className="w-full justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 shadow-lg shadow-blue-600/25 transition-all mt-2 cursor-pointer"
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating Administrator...</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span>Sign In to Admin Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        ClinicOS Healthcare SaaS Cloud Platform &bull; Multi-Tenant Platform Administration
      </footer>
    </div>
  );
}
