import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../context/AppContext';
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
  Sparkles,
  MapPin,
  HeartPulse,
  Droplet,
  Users
} from 'lucide-react';

export function PatientRegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { registerPatient, isLoading } = useAuth();
  const { createPatient, activeClinic, showToast } = useApp();

  const initName = searchParams.get('name') || location.state?.name || '';
  const initPhone = searchParams.get('phone') || location.state?.phone || '';
  const initEmail = searchParams.get('email') || location.state?.email || '';

  // Form State - Standardized Patient Dossier Schema
  const [fullName, setFullName] = useState(initName);
  const [email, setEmail] = useState(initEmail);
  const [phone, setPhone] = useState(initPhone);
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1995-05-15');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [allergies, setAllergies] = useState('None');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [address, setAddress] = useState('FC Road, Pune, Maharashtra');
  const [medicalHistory, setMedicalHistory] = useState('No known chronic conditions.');
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
    if (!password) return { score: 0, label: 'None', color: 'bg-slate-200 dark:bg-slate-800' };
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

    const patientPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      gender,
      dob: dob || '1995-05-15',
      bloodGroup,
      allergies,
      address: address.trim(),
      emergencyContact: emergencyContact.trim(),
      medicalHistory: medicalHistory.trim(),
      preferredCommunication,
      password,
      confirmPassword,
      agreeTerms
    };

    // 1. Register with Auth Service
    const authRes = await registerPatient(patientPayload);

    // 2. Synchronize into AppContext clinical patient roster & activePatientId
    const newPt = createPatient({
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      gender,
      dob: dob || '1995-05-15',
      bloodGroup: bloodGroup || 'B+',
      allergies: allergies && allergies.toLowerCase() !== 'none'
        ? allergies.split(',').map((a) => a.trim()).filter(Boolean)
        : [],
      emergencyContact: emergencyContact.trim() || `${fullName.trim()} Family (+91 98765 00000)`,
      address: address.trim() || `${activeClinic?.city || 'Pune'}, Maharashtra`,
      medicalHistory: medicalHistory.trim() || 'No chronic medical history noted.',
      preferredCommunication,
      status: 'Active'
    });

    localStorage.setItem('clinipulse_role', 'patient');
    showToast(`Patient profile created for ${newPt.name} (ID: ${newPt.patientIdNumber})`);

    if (authRes.success && authRes.user) {
      navigate(`/verify-email?email=${encodeURIComponent(authRes.user.email)}&token=${authRes.user.verificationToken || 'demo'}`);
    } else {
      // If mockAuth encountered email duplicate, still give access since patient record is synchronized
      navigate('/patient');
    }
  };

  return (
    <AuthLayout
      title="Create Patient Account"
      subtitle="Complete your healthcare registration to book doctor consultations, track requests, and access digital prescriptions."
      badgeText="Patient Self-Service Registration"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span className="font-bold">Registration Alert:</span> {error}
              {error.includes('already registered') && (
                <div className="mt-1">
                  <Link to="/" className="font-bold underline text-blue-700 dark:text-blue-400">
                    Return to home &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 1: Personal & Contact Dossier */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3.5">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-200/60 dark:border-slate-800">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Personal & Contact Information
            </span>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => markTouched('fullName')}
                placeholder="e.g. Aarav Patel"
                className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.fullName && errors.fullName ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
                }`}
              />
            </div>
            {touched.fullName && errors.fullName && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Email & Mobile Number Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => markTouched('email')}
                  placeholder="name@domain.com"
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.email && errors.email ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
                  }`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => markTouched('phone')}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.phone && errors.phone ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
                  }`}
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Clinical Demographics (Gender, DOB, Blood Group, Allergies) */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3.5">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-200/60 dark:border-slate-800">
            <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Clinical & Medical Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Gender */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Blood Group
              </label>
              <div className="relative">
                <Droplet className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Allergies & Emergency Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Known Drug Allergies
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g. Penicillin, Sulfa drugs, None"
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Emergency Contact (Name & Phone)
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="e.g. Sunita Patel (Spouse) - +91 98765 43219"
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Address & Communication */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Residential Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 402 Sunrise Heights, Bandra West, Mumbai"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
                Reminders & Notification Channel
              </label>
              <select
                value={preferredCommunication}
                onChange={(e) => setPreferredCommunication(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="whatsapp">WhatsApp (Instant Doctor Updates)</option>
                <option value="sms">SMS Text Dispatch</option>
                <option value="email">Email Communications</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Passwords Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
              Create Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => markTouched('password')}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.password && errors.password ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1E293B] dark:text-slate-200 block">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => markTouched('confirmPassword')}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 rounded-xl border text-sm text-[#1E293B] dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.confirmPassword && errors.confirmPassword ? 'border-red-300 dark:border-red-700 bg-red-50/20' : 'border-[#E2E8F0] dark:border-slate-700'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-1 pt-0.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Password Strength:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{passwordStrength.label}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1">
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-200 dark:bg-slate-800'}`} />
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-200 dark:bg-slate-800'}`} />
              <div className={`h-full flex-1 transition-all ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-200 dark:bg-slate-800'}`} />
            </div>
          </div>
        )}

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-slate-300 dark:border-slate-700 cursor-pointer shrink-0"
            />
            <span className="leading-relaxed">
              I agree to the ClinicOS{' '}
              <Link to="/terms" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800">
                Terms of Service
              </Link>{' '}
              and acknowledge the{' '}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800">
                Patient Privacy Notice
              </Link>
              .
            </span>
          </label>
          {touched.agreeTerms && errors.agreeTerms && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">{errors.agreeTerms}</p>
          )}
        </div>

        {/* Submit Button */}
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
              Registering Patient Profile...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Complete Patient Registration <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>

        {/* Footer */}
        <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          Already registered?{' '}
          <Link to="/" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Return to home &rarr;
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
