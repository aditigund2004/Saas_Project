import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
  User,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Heart
} from 'lucide-react';

export function PatientLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [identifier, setIdentifier] = useState('aarav.patel@example.demo');
  const [password, setPassword] = useState('Patient@Demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please provide your registered email address or mobile phone.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    const res = await login({
      identifier: identifier.trim(),
      password,
      role: 'patient'
    });

    if (res.success && res.user) {
      if (redirectPath && redirectPath.startsWith('/patient')) {
        navigate(redirectPath);
      } else {
        navigate('/patient/dashboard');
      }
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials or register a new account.');
    }
  };

  return (
    <AuthLayout
      title="Patient Portal Sign In"
      subtitle="Access your medical consultations, appointments, and prescriptions."
      badgeText="Patient Portal Access"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{error}</div>
          </div>
        )}

        {/* Identifier (Email or Phone) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address or Mobile Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="patient@example.demo or +91 98765 43210"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password <span className="text-red-500">*</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Preloaded Demo Credentials Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Demo Patient Account
            </span>
            <button
              type="button"
              onClick={() => {
                setIdentifier('aarav.patel@example.demo');
                setPassword('Patient@Demo123');
              }}
              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Prefill
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Email: <span className="font-mono text-slate-700 dark:text-slate-300">aarav.patel@example.demo</span>
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center text-xs font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In to Patient Portal <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>

        {/* Register Option */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account yet?{' '}
            <Link
              to="/register/patient"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register Patient Account →
            </Link>
          </p>
        </div>

        <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/"
            className="text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            ← Return to Main Homepage
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

