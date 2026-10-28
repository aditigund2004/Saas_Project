import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function PatientRegisterPage() {
  const navigate = useNavigate();
  const { registerPatient, isLoading } = useAuth();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [preferredCommunication, setPreferredCommunication] = useState('whatsapp');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});

  const markTouched = (field) => setTouched((p) => ({ ...p, [field]: true }));

  // Validation rules
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneClean = phone.replace(/\D/g, '');

  const errors = useMemo(() => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!phone.trim()) {
      errs.phone = 'Mobile contact number is required.';
    } else if (phoneClean.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    if (!agreeTerms) {
      errs.agreeTerms = 'You must accept the ClinicOS Terms of Service and Privacy Notice.';
    }
    return errs;
  }, [fullName, email, phone, phoneClean, password, confirmPassword, agreeTerms]);

  const isValid = Object.keys(errors).length === 0;

  // Password strength calculator
  const passwordStrength = useMemo(() => {
<<<<<<< HEAD
    if (!password) return { score: 0, label: 'None', color: 'bg-slate-200 dark:bg-slate-800' };
=======
    if (!password) return { score: 0, label: 'None', color: 'bg-slate-200' };
>>>>>>> origin/main
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true
    });
    setError('');

    if (!isValid) {
      setError('Please resolve the highlighted validation errors before proceeding.');
      return;
    }

    const res = await registerPatient({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dob,
      preferredCommunication,
      password,
      confirmPassword,
      agreeTerms
    });

    if (res.success && res.user) {
<<<<<<< HEAD
=======
      // Redirect to simulated verification screen with user context (Section 4)
>>>>>>> origin/main
      navigate(`/verify-email?email=${encodeURIComponent(res.user.email)}&token=${res.user.verificationToken || 'demo'}`);
    } else {
      setError(res.error || 'Registration failed. An account with this email may already exist.');
    }
  };

  return (
    <AuthLayout
      title="Create Patient Account"
      subtitle="Register to book appointments, track requests, and access prescriptions."
      badgeText="Patient Self-Service Registration"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Alert */}
        {error && (
<<<<<<< HEAD
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
=======
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
>>>>>>> origin/main
            <div className="flex-1 leading-relaxed">
              <span className="font-bold">Registration Alert:</span> {error}
              {error.includes('already registered') && (
                <div className="mt-1">
<<<<<<< HEAD
                  <Link to="/" className="font-bold underline text-blue-700 dark:text-blue-400">
                    Return to home &rarr;
=======
                  <Link to="/login" className="font-bold underline text-blue-700">
                    Click here to sign in with this email &rarr;
>>>>>>> origin/main
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1">
<<<<<<< HEAD
          <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
          <label className="text-[13px] font-semibold text-[#1E293B] block">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => markTouched('fullName')}
              placeholder="e.g. Ramesh Chandra"
<<<<<<< HEAD
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.fullName && errors.fullName ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
=======
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.fullName && errors.fullName ? 'border-red-300 bg-red-50/20' : 'border-[#E2E8F0]'
>>>>>>> origin/main
              }`}
            />
          </div>
          {touched.fullName && errors.fullName && (
<<<<<<< HEAD
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.fullName}</p>
=======
            <p className="text-[12px] text-red-600 font-medium">{errors.fullName}</p>
>>>>>>> origin/main
          )}
        </div>

        {/* Email & Mobile Number Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email */}
          <div className="space-y-1">
<<<<<<< HEAD
            <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
            <label className="text-[13px] font-semibold text-[#1E293B] block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => markTouched('email')}
                placeholder="name@domain.com"
<<<<<<< HEAD
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.email && errors.email ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
=======
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.email && errors.email ? 'border-red-300 bg-red-50/20' : 'border-[#E2E8F0]'
>>>>>>> origin/main
                }`}
              />
            </div>
            {touched.email && errors.email && (
<<<<<<< HEAD
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.email}</p>
=======
              <p className="text-[12px] text-red-600 font-medium">{errors.email}</p>
>>>>>>> origin/main
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
<<<<<<< HEAD
            <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
            <label className="text-[13px] font-semibold text-[#1E293B] block">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => markTouched('phone')}
                placeholder="+91 98765 00000"
<<<<<<< HEAD
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.phone && errors.phone ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
=======
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.phone && errors.phone ? 'border-red-300 bg-red-50/20' : 'border-[#E2E8F0]'
>>>>>>> origin/main
                }`}
              />
            </div>
            {touched.phone && errors.phone && (
<<<<<<< HEAD
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.phone}</p>
=======
              <p className="text-[12px] text-red-600 font-medium">{errors.phone}</p>
>>>>>>> origin/main
            )}
          </div>
        </div>

<<<<<<< HEAD
        {/* Optional Fields: DOB & Preferred Communication */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#1E293B] dark:text-slate-200 block">
              Date of Birth <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
        {/* Optional Fields: DOB & Preferred Communication (Section 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <label className="text-[13px] font-medium text-[#1E293B] block">
              Date of Birth <span className="text-[11px] text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
<<<<<<< HEAD
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              />
            </div>
          </div>

          <div className="space-y-1">
<<<<<<< HEAD
            <label className="text-xs font-medium text-[#1E293B] dark:text-slate-200 block">
              Reminders Method <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">(Optional)</span>
=======
            <label className="text-[13px] font-medium text-[#1E293B] block">
              Reminders Method <span className="text-[11px] text-slate-400 font-normal">(Optional)</span>
>>>>>>> origin/main
            </label>
            <select
              value={preferredCommunication}
              onChange={(e) => setPreferredCommunication(e.target.value)}
<<<<<<< HEAD
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
=======
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
>>>>>>> origin/main
            >
              <option value="whatsapp">WhatsApp (Recommended)</option>
              <option value="sms">SMS Text Message</option>
              <option value="email">Email Dispatch</option>
            </select>
          </div>
        </div>

        {/* Passwords Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Password */}
          <div className="space-y-1">
<<<<<<< HEAD
            <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
              Create Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
            <label className="text-[13px] font-semibold text-[#1E293B] block">
              Create Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => markTouched('password')}
                placeholder="••••••••"
<<<<<<< HEAD
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.password && errors.password ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
=======
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.password && errors.password ? 'border-red-300 bg-red-50/20' : 'border-[#E2E8F0]'
>>>>>>> origin/main
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
=======
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
>>>>>>> origin/main
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.password && errors.password && (
<<<<<<< HEAD
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.password}</p>
=======
              <p className="text-[12px] text-red-600 font-medium">{errors.password}</p>
>>>>>>> origin/main
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
<<<<<<< HEAD
            <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
=======
            <label className="text-[13px] font-semibold text-[#1E293B] block">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
>>>>>>> origin/main
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => markTouched('confirmPassword')}
                placeholder="••••••••"
<<<<<<< HEAD
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.confirmPassword && errors.confirmPassword ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
=======
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.confirmPassword && errors.confirmPassword ? 'border-red-300 bg-red-50/20' : 'border-[#E2E8F0]'
>>>>>>> origin/main
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
<<<<<<< HEAD
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
=======
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
>>>>>>> origin/main
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
<<<<<<< HEAD
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.confirmPassword}</p>
=======
              <p className="text-[12px] text-red-600 font-medium">{errors.confirmPassword}</p>
>>>>>>> origin/main
            )}
          </div>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-1 pt-0.5">
<<<<<<< HEAD
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Password Strength:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{passwordStrength.label}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1">
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-200 dark:bg-slate-800'}`} />
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-200 dark:bg-slate-800'}`} />
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-200 dark:bg-slate-800'}`} />
=======
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Password Strength:</span>
              <span className="font-bold text-slate-700">{passwordStrength.label}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex gap-1">
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-200'}`} />
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-200'}`} />
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-200'}`} />
>>>>>>> origin/main
            </div>
          </div>
        )}

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
<<<<<<< HEAD
          <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
=======
          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
>>>>>>> origin/main
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
<<<<<<< HEAD
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-slate-300 dark:border-slate-700 cursor-pointer shrink-0"
            />
            <span className="leading-relaxed">
              I agree to the ClinicOS{' '}
              <Link to="/terms" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800">
                Terms of Service
              </Link>{' '}
              and acknowledge the{' '}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800">
=======
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-slate-300 cursor-pointer shrink-0"
            />
            <span className="leading-relaxed">
              I agree to the ClinicOS{' '}
              <Link to="/terms" className="text-blue-600 underline font-semibold hover:text-blue-800">
                Terms of Service
              </Link>{' '}
              and acknowledge the{' '}
              <Link to="/privacy" className="text-blue-600 underline font-semibold hover:text-blue-800">
>>>>>>> origin/main
                Patient Privacy Notice
              </Link>
              .
            </span>
          </label>
          {touched.agreeTerms && errors.agreeTerms && (
<<<<<<< HEAD
            <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">{errors.agreeTerms}</p>
          )}
        </div>

        {/* Submit Button */}
=======
            <p className="text-[12px] text-red-600 font-medium mt-1">{errors.agreeTerms}</p>
          )}
        </div>

        {/* Submit Button (Disabled state while invalid) */}
>>>>>>> origin/main
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 shadow-sm mt-3"
          disabled={isLoading || (!isValid && Object.keys(touched).length > 0)}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Demo Profile...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Complete Patient Registration <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>

        {/* Footer */}
<<<<<<< HEAD
        <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          Already registered?{' '}
          <Link to="/" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Return to home &rarr;
=======
        <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Sign in here &rarr;
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
