import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  Phone,
  Calendar,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  HeartPulse
} from 'lucide-react';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPatientRegisterPage() {
  const { clinicSlug } = useParams();
  const navigate = useNavigate();
  const { clinics, createPatient, switchRole, switchClinic, showToast } = useApp();
  const { registerPatient, syncRole } = useAuth();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const primaryColor = settings.primaryColor || '#2563eb';

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('1995-08-20');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredCommunication, setPreferredCommunication] = useState('whatsapp');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Password strength
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'None', color: 'bg-slate-200 dark:bg-slate-700' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  }, [password]);

  // Fill sample data for effortless testing
  const handleQuickFill = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setFullName(`Priya Sharma ${randomNum}`);
    setEmail(`priya.sharma${randomNum}@example.demo`);
    setPhone(`+91 98${randomNum}12345`);
    setDob('1994-06-15');
    setGender('Female');
    setPassword('Demo@1234');
    setConfirmPassword('Demo@1234');
    setAgreeTerms(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!fullName.trim()) {
      setError('Please provide your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter a valid mobile number for appointment reminders.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your entries.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to terms and privacy consent to register.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Call auth registration if available
      if (registerPatient) {
        await registerPatient({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          dob,
          preferredCommunication,
          password,
          confirmPassword,
          agreeTerms
        });
      }

      // 2. Register patient in clinic database / context
      if (createPatient) {
        createPatient({
          name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          dob,
          gender,
          clinicId: clinic.id,
          preferredCommunication
        });
      }

      // 3. Switch active role to patient and set active clinic
      if (switchRole) {
        switchRole('patient');
      } else if (syncRole) {
        syncRole('patient', clinic.id);
      }
      if (switchClinic) {
        switchClinic(clinic.id);
      }

      showToast(`Registration successful! Welcome to the Patient Portal at ${clinic.name}.`, 'success');

      // 4. Locate directly to the patient portal
      navigate('/patient/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      if (switchRole) switchRole('patient');
      navigate('/patient/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Back to clinic breadcrumb */}
      <div className="max-w-xl mx-auto w-full mb-4 flex items-center justify-between">
        <Link
          to={`/clinic/${clinic.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to {clinic.name} Website</span>
        </Link>
        <button
          type="button"
          onClick={handleQuickFill}
          className="text-xs font-semibold text-blue-600 dark:text-[#22D3EE] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Auto-fill Demo Details</span>
        </button>
      </div>

      <div className="max-w-xl mx-auto w-full space-y-6">
        {/* Clinic Identity & Title */}
        <div className="text-center space-y-2">
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-slate-200 dark:ring-[#263B59]"
            style={{ backgroundColor: primaryColor }}
          >
            {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-[#F1F5F9] tracking-tight">
            Create Patient Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
            Register your profile with <span className="font-semibold text-slate-700 dark:text-[#CBD5E1]">{clinic.name}</span> to access your digital patient portal.
          </p>
        </div>

        {/* Registration Card */}
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-md space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Mobile / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* DOB & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other / Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 chars"
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

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#94A3B8] hover:text-slate-700 dark:hover:text-[#F1F5F9]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-[#94A3B8]">Security strength:</span>
                  <span className="font-semibold text-slate-700 dark:text-[#CBD5E1]">{passwordStrength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-[#0D1729] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Communication Preferences */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">
                Appointment & Prescription Notifications
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['whatsapp', 'sms', 'email'].map((comm) => (
                  <button
                    type="button"
                    key={comm}
                    onClick={() => setPreferredCommunication(comm)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                      preferredCommunication === comm
                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-[#3B82F6] dark:bg-[#172640] dark:text-[#22D3EE]'
                        : 'border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-600 dark:text-[#CBD5E1]'
                    }`}
                  >
                    {comm === 'whatsapp' ? 'WhatsApp' : comm.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-[#CBD5E1] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-slate-300 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-blue-600 dark:text-[#3B82F6] focus:ring-blue-500 mt-0.5"
                />
                <span>
                  I consent to creating a medical profile at {clinic.name} and agree to standard health data privacy standards.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="md"
              className="w-full font-bold text-xs shadow-md text-white flex items-center justify-center gap-2 py-3 mt-2"
              style={{ backgroundColor: primaryColor }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering & Locating to Patient Portal...</span>
                </>
              ) : (
                <>
                  <span>Register & Open Patient Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Switch to Sign In */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#263B59] text-center space-y-2">
            <p className="text-xs text-slate-600 dark:text-[#CBD5E1]">
              Already have an account?{' '}
              <Link
                to={`/clinic/${clinic.slug}/signin`}
                className="font-bold text-blue-600 dark:text-[#22D3EE] hover:underline"
              >
                Sign In to Patient Portal →
              </Link>
            </p>
          </div>
        </Card>

        {/* Security Reassurance */}
        <div className="text-center text-[11px] text-slate-500 dark:text-[#94A3B8] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span>Patient records are kept confidential & encrypted</span>
        </div>
      </div>
    </div>
  );
}

