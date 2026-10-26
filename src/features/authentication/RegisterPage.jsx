import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
<<<<<<< HEAD
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Activity, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Building2, Stethoscope, Users, Check } from 'lucide-react';
=======
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Activity, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const selectedPlanParam = searchParams.get('plan') || 'professional';

<<<<<<< HEAD
  const { onboardNewClinic, showToast, plans } = useApp();
=======
  const { onboardNewClinic } = useApp();
  const { registerTenant, isLoading } = useAuth();
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Info, 2: Capacity, 3: Plan, 4: Success Screen

  const [form, setForm] = useState({
<<<<<<< HEAD
    clinicName: 'Metro Multispecialty Dental Center',
    ownerName: 'Dr. Rajesh Patel, MDS',
    specialty: 'Dental',
    doctorCount: 4,
    branchCount: 1,
    city: 'Mumbai',
    phone: '+91 98200 12345',
    email: 'admin@metrodental.demo',
=======
    clinicName: '',
    ownerName: '',
    specialty: 'Dental',
    doctorCount: 1,
    branchCount: 1,
    city: '',
    phone: '',
    email: '',
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    planId: selectedPlanParam
  });

  const [createdClinic, setCreatedClinic] = useState(null);
<<<<<<< HEAD

  const plansList = plans && plans.length > 0 ? plans.map((p) => ({
    id: p.id,
    name: p.name,
    price: `₹${p.monthlyPrice.toLocaleString('en-IN')}/mo`,
    desc: `Up to ${p.maxDoctors} Doctors · ${p.maxBranches} Branch${p.maxBranches > 1 ? 'es' : ''}`,
    popular: p.isPopular
  })) : [
=======
  const [error, setError] = useState('');
  const goToCapacityStep = () => {
    setError('');
    if (
      !form.clinicName.trim() ||
      !form.ownerName.trim() ||
      !form.city.trim() ||
      !form.phone.trim() ||
      !form.email.trim()
    ) {
      setError('Please complete all clinic and administrator details before continuing.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Enter a valid administrator email address.');
      return;
    }
    setStep(2);
  };

  const plans = [
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    { id: 'starter', name: 'Starter Clinic', price: '₹2,499/mo', desc: 'Up to 2 Doctors · 1 Branch' },
    { id: 'growth', name: 'Growth Practice', price: '₹4,499/mo', desc: 'Up to 5 Doctors · 2 Branches' },
    { id: 'professional', name: 'Professional Multi-Specialty', price: '₹7,999/mo', desc: 'Up to 12 Doctors · 4 Branches', popular: true },
    { id: 'enterprise', name: 'Enterprise Healthcare', price: '₹16,999/mo', desc: 'Unlimited Doctors · 10 Branches' }
  ];

<<<<<<< HEAD
  const handleFinishOnboarding = () => {
    const newClinic = onboardNewClinic({
=======
  const handleFinishOnboarding = async () => {
    setError('');
    if (!form.clinicName.trim() || !form.ownerName.trim() || !form.city.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Complete the required clinic and administrator details before submitting.');
      setStep(1);
      return;
    }
    const account = await registerTenant({
      clinicName: form.clinicName,
      ownerName: form.ownerName,
      specialty: form.specialty,
      doctorCount: Number(form.doctorCount),
      branchCount: Number(form.branchCount),
      city: form.city,
      phone: form.phone,
      email: form.email,
      planId: form.planId
    });
    if (!account.success || !account.user) {
      setError(account.error || 'Clinic registration could not be submitted.');
      return;
    }

    const newClinic = onboardNewClinic({
      clinicId: account.user.activeClinicId,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      clinicName: form.clinicName,
      ownerName: form.ownerName,
      specialty: form.specialty,
      doctorCount: form.doctorCount,
<<<<<<< HEAD
      city: form.city,
      phone: form.phone,
      email: form.email,
=======
      branchCount: form.branchCount,
      city: form.city,
      phone: form.phone,
      email: form.email,
      ownerEmail: account.user.email,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      planId: form.planId
    });
    setCreatedClinic(newClinic);
    setStep(4);
  };

  const handleLaunchWorkspace = () => {
<<<<<<< HEAD
    navigate('/clinic/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
=======
    navigate('/login/doctor');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 sm:space-y-8">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Clinic<span className="text-blue-600">OS</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
<<<<<<< HEAD
          Simulated Clinic Onboarding Flow
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Experience how a new healthcare clinic sets up its digital operating system in under 2 minutes.
        </p>
      </div>

      {/* Step Indicators */}
      {step < 4 && (
        <div className="flex items-center justify-center gap-3 text-xs font-semibold">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            <span>1</span> <span>Clinic Details</span>
          </div>
          <span className="text-slate-300">➔</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            <span>2</span> <span>Scale & Staff</span>
          </div>
          <span className="text-slate-300">➔</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            <span>3</span> <span>Subscription Tier</span>
=======
          Register Your Clinic & Administrator Account
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Submit your tenant application for super-admin review. Clinic access is enabled only after approval.
        </p>
      </div>

      {error && (
        <div role="alert" aria-live="assertive" className="flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-sm text-red-800">
          <ShieldCheck className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          {error}
        </div>
      )}

      {/* Step Indicators */}
      {step < 4 && (
        <div
          aria-label={`Step ${step} of 3`}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-900">Step {step} of 3</span>
            <span className="text-sm font-medium text-slate-600">
              {step === 1 ? 'Clinic details' : step === 2 ? 'Clinic size' : 'Choose a plan'}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
              aria-hidden="true"
            />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          </div>
        </div>
      )}

      {/* Step 1: Basic Clinic Information */}
      {step === 1 && (
<<<<<<< HEAD
        <Card className="p-6 sm:p-8 border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 1: Clinic Profile & Admin Name</h2>
            <p className="text-xs text-slate-500">Provide the primary establishment details for OPD stationery</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Clinic Name *</label>
              <input
                required
                type="text"
                value={form.clinicName}
                onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                placeholder="e.g. Apex Multispecialty Dental Center"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
        <Card className="p-5 sm:p-8 border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Clinic and administrator details</h2>
            <p className="mt-1 text-sm text-slate-600">Tell us about your clinic and who will manage its account.</p>
          </div>

          <div className="space-y-5 text-sm">
            <div>
              <label htmlFor="clinic-name" className="font-semibold text-slate-800 block mb-1.5">Clinic name <span className="text-red-600">*</span></label>
              <input
                id="clinic-name"
                required
                type="text"
                autoComplete="organization"
                value={form.clinicName}
                onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                placeholder="e.g. Apex Multispecialty Dental Center"
                className="min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 block mb-1">Owner Doctor / Administrator Name *</label>
                <input
                  required
                  type="text"
                  value={form.ownerName}
                  onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                  placeholder="Dr. Rajesh Patel, MDS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Specialty</label>
                <select
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-medium"
=======
                <label htmlFor="owner-name" className="font-semibold text-slate-800 block mb-1.5">Administrator name <span className="text-red-600">*</span></label>
                <input
                  id="owner-name"
                  required
                  type="text"
                  autoComplete="name"
                  value={form.ownerName}
                  onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                  placeholder="Dr. Rajesh Patel, MDS"
                  className="min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label htmlFor="clinic-specialty" className="font-semibold text-slate-800 block mb-1.5">Clinic specialty</label>
                <select
                  id="clinic-specialty"
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                >
                  <option value="Dental">Dental & Orthodontics</option>
                  <option value="Orthopedics">Orthopedics & Spine Care</option>
                  <option value="Dermatology">Dermatology & Cosmetology</option>
                  <option value="Pediatrics">Pediatrics & Child Care</option>
                  <option value="General">General OPD & Family Medicine</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 block mb-1">Primary City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Official Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                <label htmlFor="clinic-city" className="font-semibold text-slate-800 block mb-1.5">City <span className="text-red-600">*</span></label>
                <input
                  id="clinic-city"
                  required
                  type="text"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Mumbai"
                  className="min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label htmlFor="clinic-phone" className="font-semibold text-slate-800 block mb-1.5">Clinic phone <span className="text-red-600">*</span></label>
                <input
                  id="clinic-phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div>
                <h3 className="font-bold text-slate-900">Administrator sign-in</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Use your email to identify the account. After approval, demo sign-in accepts any password with at least 4 characters.
                </p>
              </div>
              <div>
                <label htmlFor="admin-email" className="font-semibold text-slate-800 block mb-1.5">Administrator email <span className="text-red-600">*</span></label>
                <input
                  id="admin-email"
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@yourclinic.com"
                  className="min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
<<<<<<< HEAD
            <Button variant="primary" size="md" onClick={() => setStep(2)} className="font-bold">
=======
            <Button variant="primary" size="lg" onClick={goToCapacityStep} className="w-full font-bold sm:w-auto">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              Next: Scale & Capacity <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Scale & Capacity */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 2: Doctor Rostering & Branches</h2>
            <p className="text-xs text-slate-500">Configure clinic capacity and operational branches</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Number of Attending Doctors</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={form.doctorCount}
                  onChange={(e) => setForm({ ...form, doctorCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Seats provisioned for clinical notes & prescriptions</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Operational Branch Locations</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.branchCount}
                  onChange={(e) => setForm({ ...form, branchCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Separate OPD reception desks and stock stores</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Automatic Provisioning
              </span>
              <p className="text-[11px] text-blue-700">
                ClinicOS will automatically configure starter service tariffs, daily appointment slots, and WhatsApp reminder templates for {form.doctorCount} doctors.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="secondary" size="md" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="primary" size="md" onClick={() => setStep(3)} className="font-bold">
              Next: Select Plan <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Plan Selection */}
      {step === 3 && (
        <Card className="p-6 sm:p-8 border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 3: Select SaaS Subscription Tier</h2>
            <p className="text-xs text-slate-500">Every plan includes an instant 14-day full access free trial</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
<<<<<<< HEAD
            {plansList.map((p) => (
=======
            {plans.map((p) => (
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              <label
                key={p.id}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  form.planId === p.id
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{p.name}</span>
                    {p.popular && <Badge variant="teal" size="sm">Most Popular</Badge>}
                  </div>
                  <div className="text-base font-black text-blue-800 font-mono">{p.price}</div>
                  <p className="text-[11px] text-slate-500 mt-1">{p.desc}</p>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="text-blue-700 font-semibold">14-Day Free Access</span>
                  <input
                    type="radio"
                    name="planSelect"
                    checked={form.planId === p.id}
                    onChange={() => setForm({ ...form, planId: p.id })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="secondary" size="md" onClick={() => setStep(2)}>
              Back
            </Button>
<<<<<<< HEAD
            <Button variant="primary" size="md" onClick={handleFinishOnboarding} className="bg-blue-600 hover:bg-blue-700 font-bold">
              Provision Simulated Clinic <Sparkles className="w-4 h-4 ml-1.5" />
=======
            <Button variant="primary" size="md" onClick={handleFinishOnboarding} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 font-bold">
              {isLoading ? 'Submitting...' : 'Submit for Approval'} <Sparkles className="w-4 h-4 ml-1.5" />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Simulated Setup Success Screen */}
      {step === 4 && createdClinic && (
        <Card className="p-8 border-2 border-blue-500 shadow-xl space-y-6 text-center bg-gradient-to-b from-blue-50/40 to-white">
          <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
<<<<<<< HEAD
              Simulated Provisioning Complete
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-2">
              Welcome to ClinicOS, {form.clinicName}!
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your multi-tenant clinic partition has been initialized with {form.doctorCount} clinicians, digital prescriptions, and 14-day {form.planId.toUpperCase()} trial access.
=======
              Pending Super-Admin Approval
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-2">
              Registration submitted for {form.clinicName}
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your tenant and administrator account are awaiting review. You can sign in to the clinic workspace after a super-admin approves this application.
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </p>
          </div>

          {/* Provisioning summary table */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border border-slate-200 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Tenant Identifier:</span>
              <span className="font-bold text-slate-800">{createdClinic.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Plan Tier:</span>
<<<<<<< HEAD
              <span className="font-bold text-blue-700">{form.planId.toUpperCase()} (Trial)</span>
=======
              <span className="font-bold text-blue-700">{form.planId.toUpperCase()} (After Approval)</span>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Admin Doctor:</span>
              <span className="font-bold text-slate-800">{form.ownerName}</span>
            </div>
            <div className="flex justify-between">
<<<<<<< HEAD
              <span className="text-slate-500">Trial Period:</span>
              <span className="font-bold text-emerald-700">14 Days Active</span>
=======
              <span className="text-slate-500">Application Status:</span>
              <span className="font-bold text-amber-700">Pending Review</span>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl max-w-md mx-auto text-[11px] text-amber-900 text-left">
<<<<<<< HEAD
            <strong>Demonstration Notice:</strong> This is a client-side prototype. No credit card was charged and no legal account was created.
=======
            <strong>Approval notice:</strong> Super-admin approval is required before this administrator can access tenant modules.
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleLaunchWorkspace}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6"
            >
<<<<<<< HEAD
              Launch Clinic Administrator Workspace <ArrowRight className="w-4 h-4 ml-2" />
=======
              Go to Doctor / Admin Sign In <ArrowRight className="w-4 h-4 ml-2" />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
