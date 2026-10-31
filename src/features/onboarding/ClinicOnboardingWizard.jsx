import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Stethoscope,
  Calendar,
  Clock,
  Layout,
  CreditCard,
  ShieldCheck,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  Activity,
  Eye,
  EyeOff,
  Lock,
  AlertCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TEMPLATE_METADATA } from '../website-builder/websiteBuilderDefaults';
import { MockAuthService } from '../../services/mockAuthService';

export function ClinicOnboardingWizard() {
  const navigate = useNavigate();
  const { plans, onboardNewClinic, switchClinic, switchRole, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step1Error, setStep1Error] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Account
    doctorName: 'Dr. Siddharth Sen',
    email: 'siddharth@senclinic.demo',
    phone: '+91 98230 45678',
    password: 'password123',
    confirmPassword: 'password123',

    // Step 2: Clinic
    clinicName: 'Sen Specialty Care & Diagnostics',
    tagline: 'Comprehensive Outpatient & Preventive Care',
    specialty: 'General Medicine',
    city: 'Pune',
    address: 'Suite 204, Meditech Plaza, Senapati Bapat Road',

    // Step 3: Services
    primaryService: 'General Consultation',
    primaryFee: 600,
    followUpFee: 350,

    // Step 4: Doctor Profile
    qualifications: 'MBBS, MD (Internal Medicine)',
    experienceYears: 12,
    registrationNumber: 'MMC-2012-08942',

    // Step 5: Working Hours
    operatingHours: 'Mon - Sat: 09:30 AM - 08:00 PM',
    slotDurationMinutes: 30,

    // Step 6: Website Template
    template: 'modern',

    // Step 7: Subscription Plan
    planId: 'professional'
  });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const stepsList = [
    { num: 1, title: 'Account', desc: 'Doctor credentials' },
    { num: 2, title: 'Clinic Details', desc: 'Name & location' },
    { num: 3, title: 'Services', desc: 'Consultation offerings' },
    { num: 4, title: 'Doctor Profile', desc: 'Medical credentials' },
    { num: 5, title: 'Hours & Roster', desc: 'Daily schedule' },
    { num: 6, title: 'Website Template', desc: 'Choose theme' },
    { num: 7, title: 'Review & Activate', desc: 'Launch clinic' }
  ];

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.doctorName?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
        setStep1Error('Please fill in all required account fields.');
        return;
      }
      if (!formData.password) {
        setStep1Error('Please create a password for your account.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setStep1Error('Passwords do not match. Please verify both password fields.');
        return;
      }
      setStep1Error('');
    }
    setStep((prev) => prev + 1);
  };

  const handleFinishOnboarding = () => {
    // 1. Create the new clinic practice
    let newClinic = null;
    if (onboardNewClinic) {
      newClinic = onboardNewClinic({
        clinicName: formData.clinicName || `${formData.doctorName}'s Clinic`,
        ownerName: formData.doctorName,
        specialty: formData.specialty || 'General Practice',
        doctorCount: 3,
        city: formData.city || 'Mumbai',
        address: formData.address || 'Suite 204, Meditech Plaza',
        phone: formData.phone,
        email: formData.email,
        planId: formData.planId || 'professional'
      });
    }

    const clinicId = newClinic?.id || `clinic-${Date.now().toString().slice(-4)}`;
    const clinicName = formData.clinicName || `${formData.doctorName}'s Practice`;

    // 2. Register doctor in authentication service so login credentials work
    MockAuthService.registerDoctor({
      name: formData.doctorName,
      email: formData.email,
      phone: formData.phone,
      clinicId,
      clinicName,
      password: formData.password
    });

    if (showToast) {
      showToast(`🎉 Registration complete for ${formData.doctorName}! Opening doctor login...`, 'success');
    }

    // 3. Open the login page and pass the credentials for login
    navigate('/login/doctor', {
      state: {
        registered: true,
        email: formData.email,
        password: formData.password,
        doctorName: formData.doctorName,
        clinicName: clinicName,
        clinicId: clinicId
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with Logo */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Clinic<span className="text-blue-600">OS</span>
            </span>
          </Link>
          <span className="text-xs font-semibold text-slate-500">
            Clinic Setup Wizard · 14-Day Free Trial
          </span>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {stepsList.map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div
                key={s.num}
                onClick={() => isDone && setStep(s.num)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  isDone
                    ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 cursor-pointer'
                    : isCurrent
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? '✓' : s.num}
                </div>
                <div className="text-[10px] font-bold text-slate-800 dark:text-slate-200 truncate hidden sm:block">
                  {s.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Wizard Form Card */}
        <Card className="p-6 sm:p-10 border-slate-200 dark:border-slate-800 space-y-6">
          {/* Step 1: Account */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 1 of 7</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Doctor & Clinic Owner Account
                </h2>
                <p className="text-xs text-slate-500">
                  You will use these credentials to access your Doctor Admin dashboard.
                </p>
              </div>

              {step1Error && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium">{step1Error}</div>
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Doctor Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.doctorName}
                    onChange={(e) => {
                      handleChange('doctorName', e.target.value);
                      if (step1Error) setStep1Error('');
                    }}
                    placeholder="Dr. Siddharth Sen"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address (Login ID) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        handleChange('email', e.target.value);
                        if (step1Error) setStep1Error('');
                      }}
                      placeholder="doctor@clinic.demo"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Phone (for OTP & WhatsApp Alerts) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        handleChange('phone', e.target.value);
                        if (step1Error) setStep1Error('');
                      }}
                      placeholder="+91 98230 45678"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Create Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Create Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => {
                          handleChange('password', e.target.value);
                          if (step1Error) setStep1Error('');
                        }}
                        placeholder="••••••••••••"
                        className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          handleChange('confirmPassword', e.target.value);
                          if (step1Error) setStep1Error('');
                        }}
                        placeholder="••••••••••••"
                        className={`w-full pl-4 pr-10 py-2.5 rounded-xl border text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formData.confirmPassword && formData.password !== formData.confirmPassword
                            ? 'border-red-400 dark:border-red-600 focus:ring-red-400'
                            : formData.confirmPassword && formData.password === formData.confirmPassword
                            ? 'border-emerald-400 dark:border-emerald-600 focus:ring-emerald-400'
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Match Indicator */}
                    {formData.confirmPassword && (
                      <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                        {formData.password === formData.confirmPassword ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Passwords match
                          </span>
                        ) : (
                          <span className="text-red-500 dark:text-red-400 font-medium flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500" /> Passwords do not match
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Clinic Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 2 of 7</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Clinic Identity & Location
                </h2>
                <p className="text-xs text-slate-500">
                  This information will be displayed on your patient-facing clinic website.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Clinic Practice Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clinicName}
                    onChange={(e) => handleChange('clinicName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Medical Specialty *
                    </label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => handleChange('specialty', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General Medicine">General Medicine</option>
                      <option value="Dental & Orthodontics">Dental & Orthodontics</option>
                      <option value="Dermatology & Cosmetology">Dermatology & Cosmetology</option>
                      <option value="Orthopedics & Joint Care">Orthopedics & Joint Care</option>
                      <option value="Pediatrics & Child Wellness">Pediatrics & Child Wellness</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="ENT & Head-Neck">ENT & Head-Neck</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Street Address & Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services & Fees */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 3 of 7</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Consultation Services & Charges
                </h2>
                <p className="text-xs text-slate-500">
                  Patients will see these consultation charges when booking online.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Service Name
                  </label>
                  <input
                    type="text"
                    value={formData.primaryService}
                    onChange={(e) => handleChange('primaryService', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      New Patient Consultation Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.primaryFee}
                      onChange={(e) => handleChange('primaryFee', Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Follow-up Checkup Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.followUpFee}
                      onChange={(e) => handleChange('followUpFee', Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Doctor Profile */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 4 of 7</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Medical Qualifications & Credentials
                </h2>
                <p className="text-xs text-slate-500">
                  Build patient confidence with verified degrees and registration numbers.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Degrees & Qualifications *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.qualifications}
                    placeholder="e.g. MBBS, MD, Fellowship in Cardiology"
                    onChange={(e) => handleChange('qualifications', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Years of Clinical Experience
                    </label>
                    <input
                      type="number"
                      value={formData.experienceYears}
                      onChange={(e) => handleChange('experienceYears', Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      State / National Medical Council Reg No *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.registrationNumber}
                      placeholder="e.g. MCI-2015-8942"
                      onChange={(e) => handleChange('registrationNumber', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Working Hours */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 5 of 7</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Clinic Schedule & Slot Timings
                </h2>
                <p className="text-xs text-slate-500">
                  Configure when patients can book slots on your digital calendar.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Operating Schedule *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.operatingHours}
                    onChange={(e) => handleChange('operatingHours', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Default Consultation Slot Duration
                  </label>
                  <select
                    value={formData.slotDurationMinutes}
                    onChange={(e) => handleChange('slotDurationMinutes', Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value={15}>15 Minutes (Express / Follow-up)</option>
                    <option value={20}>20 Minutes (Standard Clinic)</option>
                    <option value={30}>30 Minutes (Comprehensive Consultation)</option>
                    <option value={45}>45 Minutes (Specialty / Procedure)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Website Template Selection */}
          {step === 6 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 6 of 7</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Select Clinic Website Template
                </h2>
                <p className="text-xs text-slate-500">
                  Choose the design template for your patient-facing website. You can customize colors and copy anytime in the builder.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(TEMPLATE_METADATA).map(([key, meta]) => (
                  <div
                    key={key}
                    onClick={() => handleChange('template', key)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      formData.template === key
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{meta.name}</span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                          {meta.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{meta.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                      Best for: {meta.recommendedFor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Plan Selection & Summary */}
          {step === 7 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 7 of 7</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Review & Start 14-Day Free Trial
                </h2>
                <p className="text-xs text-slate-500">
                  Full access with zero credit card required during trial.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Doctor & Practice</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.doctorName} · {formData.clinicName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Specialty & City</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formData.specialty} ({formData.city})</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Website Template</span>
                  <span className="font-bold text-blue-600 uppercase">{formData.template} Medical Template</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Selected Plan</span>
                  <span className="font-bold text-emerald-600">Professional Practice (14-Day Free Access)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero billing today. You can simulate checkout or upgrade plans from the subscription dashboard at any time.</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            {step > 1 ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep(step - 1)}
                className="text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Previous
              </Button>
            ) : (
              <Link to="/login/doctor">
                <Button variant="ghost" size="md" className="text-xs text-slate-500 cursor-pointer">
                  Cancel
                </Button>
              </Link>
            )}

            {step < 7 ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNextStep}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleFinishOnboarding}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
              >
                Launch Clinic Workspace & Website →
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

