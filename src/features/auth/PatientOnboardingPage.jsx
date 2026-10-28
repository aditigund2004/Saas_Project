import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Activity,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Stethoscope,
  Heart,
  Calendar,
  Sparkles,
  ShieldCheck,
  User,
  AlertCircle
} from 'lucide-react';

export function PatientOnboardingPage() {
  const navigate = useNavigate();
  const { user, updateProfile, isLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  // Optional profile info (Step 2)
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || 'B+');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '');
  const [allergies, setAllergies] = useState(user?.allergies || '');

  const handleSaveProfile = async () => {
    await updateProfile({
      bloodGroup,
      emergencyContact,
      allergies
    });
    setCurrentStep(3);
  };

  const handleFinishOnboarding = () => {
    navigate('/patient/dashboard');
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
=======
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
>>>>>>> origin/main
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            <Activity className="w-5 h-5" />
          </div>
<<<<<<< HEAD
          <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">
            Clinic<span className="text-blue-600 dark:text-blue-400">OS</span>
          </span>
        </Link>

        {/* Skip button available at all times */}
        <button
          onClick={handleFinishOnboarding}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:underline cursor-pointer"
=======
          <span className="text-base font-black text-slate-900 tracking-tight">
            Clinic<span className="text-blue-600">OS</span>
          </span>
        </Link>

        {/* Skip button available at all times (Section 4) */}
        <button
          onClick={handleFinishOnboarding}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
>>>>>>> origin/main
        >
          Skip Onboarding &rarr;
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8">
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: 'Welcome' },
            { num: 2, label: 'Health Profile' },
            { num: 3, label: '5 Clinics' },
            { num: 4, label: 'Ready' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= s.num
                    ? 'bg-blue-600 text-white shadow-xs'
<<<<<<< HEAD
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
=======
                    : 'bg-slate-200 text-slate-500'
>>>>>>> origin/main
                }`}
              >
                {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:inline ${
<<<<<<< HEAD
                  currentStep >= s.num ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
=======
                  currentStep >= s.num ? 'text-slate-900' : 'text-slate-400'
>>>>>>> origin/main
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: Welcome to ClinicOS */}
        {currentStep === 1 && (
<<<<<<< HEAD
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-sm">
=======
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
>>>>>>> origin/main
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
<<<<<<< HEAD
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                Step 1 of 4 · Welcome
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome to ClinicOS, {user?.name || 'Aarav'}!
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
=======
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Step 1 of 4 · Welcome
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome to ClinicOS, {user?.name || 'Aarav'}!
              </h1>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
>>>>>>> origin/main
                Your demonstration patient account is activated. You can now discover specialized doctors across 5 independent clinics, request consultations, and access verified digital prescriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
<<<<<<< HEAD
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="font-bold text-xs text-slate-900 dark:text-white">5 Specialty Clinics</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">General, Cardiology, Dental, Skin, and Orthopedics.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="font-bold text-xs text-slate-900 dark:text-white">Smart Scheduling</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Real-time slot check with alternative proposals.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="font-bold text-xs text-slate-900 dark:text-white">QR Prescriptions</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tamper-evident medical records with instant lookup.</p>
=======
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-xs text-slate-900">5 Specialty Clinics</h2>
                <p className="text-[11px] text-slate-500">General, Cardiology, Dental, Skin, and Orthopedics.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-xs text-slate-900">Smart Scheduling</h2>
                <p className="text-[11px] text-slate-500">Real-time slot check with alternative proposals.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-xs text-slate-900">QR Prescriptions</h2>
                <p className="text-[11px] text-slate-500">Tamper-evident medical records with instant lookup.</p>
>>>>>>> origin/main
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleFinishOnboarding}
<<<<<<< HEAD
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold cursor-pointer"
=======
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
>>>>>>> origin/main
              >
                Skip straight to dashboard
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={() => setCurrentStep(2)}
                className="bg-blue-600 hover:bg-blue-700 font-bold"
              >
                Continue Setup <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Optional Health Profile */}
        {currentStep === 2 && (
<<<<<<< HEAD
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                Step 2 of 4 · Optional Profile Information
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Enhance Your Patient Chart
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
=======
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Step 2 of 4 · Optional Profile Information
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Enhance Your Patient Chart
              </h1>
              <p className="text-xs text-slate-500">
>>>>>>> origin/main
                These optional clinical markers assist consulting physicians during your outpatient visits.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
=======
                <label className="font-semibold text-slate-700 block mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                >
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>

              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Emergency Contact</label>
=======
                <label className="font-semibold text-slate-700 block mb-1">Emergency Contact</label>
>>>>>>> origin/main
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g. +91 98765 99999 (Ritu Patel - Spouse)"
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Known Drug Allergies</label>
=======
                <label className="font-semibold text-slate-700 block mb-1">Known Drug Allergies</label>
>>>>>>> origin/main
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, NSAIDs, Sulfa drugs (or None)"
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>
            </div>

<<<<<<< HEAD
            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
=======
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
>>>>>>> origin/main
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentStep(3)}>
                  Skip
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveProfile}
                  className="bg-blue-600 hover:bg-blue-700 font-bold"
                  disabled={isLoading}
                >
                  Save & Continue <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Discover Clinics & Doctors */}
        {currentStep === 3 && (
<<<<<<< HEAD
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                Step 3 of 4 · Multi-Clinic Discovery
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Discover 5 Specialty Clinics
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
=======
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Step 3 of 4 · Multi-Clinic Discovery
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Discover 5 Specialty Clinics
              </h1>
              <p className="text-xs text-slate-500">
>>>>>>> origin/main
                You are not locked into one clinic. You can schedule appointments across all participating clinics freely.
              </p>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {[
                { name: 'CityCare Family Clinic', spec: 'General & Family Medicine', fee: '₹550–₹600', city: 'Mumbai' },
                { name: 'HeartWell Cardiology Centre', spec: 'Interventional Cardiology & Preventive', fee: '₹1,200', city: 'Mumbai' },
                { name: 'BrightSmile Dental Studio', spec: 'General Dentistry & Orthodontics', fee: '₹750–₹800', city: 'Bengaluru' },
                { name: 'SkinSpring Dermatology Clinic', spec: 'Clinical Dermatology & Cosmetology', fee: '₹950', city: 'Pune' },
                { name: 'MoveWell Orthopedic & Physio', spec: 'Orthopedics & Sports Rehab', fee: '₹700–₹1,100', city: 'Navi Mumbai' }
              ].map((c, i) => (
<<<<<<< HEAD
                <div key={i} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between text-xs">
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">{c.name}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{c.spec} · {c.city}</p>
                  </div>
                  <span className="font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-lg text-xs">
=======
                <div key={i} className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div>
                    <h2 className="font-bold text-slate-900">{c.name}</h2>
                    <p className="text-[11px] text-slate-500">{c.spec} · {c.city}</p>
                  </div>
                  <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg text-[11px]">
>>>>>>> origin/main
                    {c.fee}
                  </span>
                </div>
              ))}
            </div>

<<<<<<< HEAD
            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
=======
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
>>>>>>> origin/main
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentStep(4)}
                className="bg-blue-600 hover:bg-blue-700 font-bold"
              >
                Proceed to Booking Setup <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Ready to Book */}
        {currentStep === 4 && (
<<<<<<< HEAD
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
=======
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
>>>>>>> origin/main
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
<<<<<<< HEAD
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Step 4 of 4 · Setup Complete
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                You're All Set, {user?.name || 'Aarav'}!
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
=======
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Step 4 of 4 · Setup Complete
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                You're All Set, {user?.name || 'Aarav'}!
              </h1>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
>>>>>>> origin/main
                Your profile is active. You can now book your first consultation or explore your health overview dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link to="/patient/appointments/book" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  <Calendar className="w-4 h-4 mr-1.5" /> Book First Consultation
                </Button>
              </Link>

              <Link to="/patient/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full">
                  Go to Health Dashboard &rarr;
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

<<<<<<< HEAD
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 pb-4">
=======
      <div className="text-center text-xs text-slate-400 pb-4">
>>>>>>> origin/main
        ClinicOS Multi-Tenant Healthcare SaaS &bull; Synthetic Demo Environment
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
