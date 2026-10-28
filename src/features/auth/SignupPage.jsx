import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MockAuthService } from '../../services/mockAuthService';
import { MedicalMotionBackground } from '../../components/layout/MedicalMotionBackground';
import { EcgWaveform } from '../../components/medical/EcgWaveform';
import { Button } from '../../components/ui/Button';
import {
  User,
  Phone,
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Activity
} from 'lucide-react';

export function SignupPage() {
  const navigate = useNavigate();
  const { onboardNewClinic, switchRole, showToast } = useApp();

  // Form State
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match. Please verify.');
      return;
    }
    setPasswordError('');

    setIsSubmitting(true);
    try {
      // Provision modern practice workspace with 14-day trial
      const newClinic = onboardNewClinic({
        clinicName: `${fullName}'s Practice`,
        ownerName: fullName,
        specialty: specialty || 'General Medicine & Family Clinic',
        doctorCount: 2,
        city: 'Mumbai',
        phone: whatsappNumber || '+91 98000 12345',
        email: email,
        planId: 'starter'
      });

      const clinicId = newClinic?.id || `clinic-${Date.now().toString().slice(-4)}`;
      const clinicName = newClinic?.name || `${fullName}'s Practice`;

      MockAuthService.registerDoctor({
        name: fullName,
        email: email,
        phone: whatsappNumber,
        clinicId,
        clinicName,
        password
      });

      if (showToast) {
        showToast(`Registration complete for ${fullName}! Opening login...`, 'success');
      }

      setTimeout(() => {
        navigate('/login/doctor', {
          state: {
            registered: true,
            email,
            password,
            doctorName: fullName,
            clinicName,
            clinicId
          }
        });
      }, 400);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors">
      {/* 1. Ambient Medical Motion Background with bilateral 3D DNA and glow */}
      <MedicalMotionBackground variant="auth" />

      {/* 2. Seamless ECG Heartbeat Waveform sweeping across the center background */}
      <EcgWaveform
        variant="full"
        glow={false}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-20 dark:opacity-30 pointer-events-none z-0"
      />

      {/* 3. Main Split Container */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10 py-6 sm:py-8">
        {/* Left Column: Branding, Value Proposition & Trust Checkpoints */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Brand Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:bg-blue-700 transition-colors">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Clinic<span className="text-blue-600 dark:text-blue-400">OS</span>
              </span>
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                Healthcare SaaS
              </span>
            </div>
          </Link>

          {/* Headline with blue accented suffix */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Start your digital <br />
            practice <span className="text-blue-600 dark:text-blue-400 font-serif italic">today.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
            Join thousands of doctors who manage their practice smarter with ClinicOS.
          </p>

          {/* 4 Value Checkmarks with cyan/blue circular icons */}
          <div className="space-y-3.5 pt-2">
            {[
              'Personal doctor website in 2 minutes',
              'Online appointment booking system',
              'Digital prescriptions & patient records',
              '14-day free trial, no credit card needed'
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Trust Endorsement Note */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            Trusted by 500+ doctors across India
          </div>
        </div>

        {/* Right Column: Pristine Floating Elevated Account Creation Card */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-7 sm:p-9 space-y-5 max-w-md mx-auto w-full backdrop-blur-xs relative z-10">
            {/* Card Heading */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create your account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Get started with your free 14-day trial
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your Full Name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Specialty Select Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Specialty
                </label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    required
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your specialty</option>
                    <option value="Dental & Orthodontics">Dental & Orthodontics</option>
                    <option value="Orthopedic & Joint Care">Orthopedic & Joint Care</option>
                    <option value="Dermatology & Cosmetology">Dermatology & Cosmetology</option>
                    <option value="Pediatrics & Child Care">Pediatrics & Child Care</option>
                    <option value="General Medicine & Family Clinic">General Medicine & Family Clinic</option>
                    <option value="Cardiology & Telemetry">Cardiology & Telemetry</option>
                    <option value="Physiotherapy & Rehabilitation">Physiotherapy & Rehabilitation</option>
                    <option value="10-30 Bed Nursing Home">10-30 Bed Nursing Home</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Create Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-400 focus:ring-red-500/30'
                        : confirmPassword && password === confirmPassword
                        ? 'border-emerald-400 focus:ring-emerald-500/30'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/30 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Match Status */}
                {confirmPassword && (
                  <div className="text-xs">
                    {password === confirmPassword ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Passwords match</span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400 font-medium">✕ Passwords do not match</span>
                    )}
                  </div>
                )}
                {passwordError && (
                  <div className="text-xs text-red-500 font-medium">{passwordError}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>{isSubmitting ? 'Creating your practice...' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Already have an account? Sign in */}
            <div className="text-center text-xs text-slate-600 dark:text-slate-400 pt-1">
              Already have an account?{' '}
              <Link to="/login/doctor" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Sign in
              </Link>
            </div>

            {/* Terms Disclaimer */}
            <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 leading-normal pt-1">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                Privacy Policy
              </Link>.
            </p>

            {/* Patient Portal Switcher */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <Link
                to="/register/patient"
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Register as a Patient for personal appointments &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

