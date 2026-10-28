import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Activity, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Building2, Stethoscope, Users, Check } from 'lucide-react';

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const selectedPlanParam = searchParams.get('plan') || 'professional';

  const { onboardNewClinic, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Info, 2: Capacity, 3: Plan, 4: Success Screen

  const [form, setForm] = useState({
    clinicName: 'Metro Multispecialty Dental Center',
    ownerName: 'Dr. Rajesh Patel, MDS',
    specialty: 'Dental',
    doctorCount: 4,
    branchCount: 1,
    city: 'Mumbai',
    phone: '+91 98200 12345',
    email: 'admin@metrodental.demo',
    planId: selectedPlanParam
  });

  const [createdClinic, setCreatedClinic] = useState(null);

  const plans = [
    { id: 'starter', name: 'Starter Clinic', price: '₹2,499/mo', desc: 'Up to 2 Doctors · 1 Branch' },
    { id: 'growth', name: 'Growth Practice', price: '₹4,499/mo', desc: 'Up to 5 Doctors · 2 Branches' },
    { id: 'professional', name: 'Professional Multi-Specialty', price: '₹7,999/mo', desc: 'Up to 12 Doctors · 4 Branches', popular: true },
    { id: 'enterprise', name: 'Enterprise Healthcare', price: '₹16,999/mo', desc: 'Unlimited Doctors · 10 Branches' }
  ];

  const handleFinishOnboarding = () => {
    const newClinic = onboardNewClinic({
      clinicName: form.clinicName,
      ownerName: form.ownerName,
      specialty: form.specialty,
      doctorCount: form.doctorCount,
      city: form.city,
      phone: form.phone,
      email: form.email,
      planId: form.planId
    });
    setCreatedClinic(newClinic);
    setStep(4);
  };

  const handleLaunchWorkspace = () => {
    navigate('/clinic/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
<<<<<<< HEAD
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Clinic<span className="text-blue-600 dark:text-blue-400">OS</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Simulated Clinic Onboarding Flow
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
=======
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Clinic<span className="text-blue-600">OS</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Simulated Clinic Onboarding Flow
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
>>>>>>> origin/main
          Experience how a new healthcare clinic sets up its digital operating system in under 2 minutes.
        </p>
      </div>

      {/* Step Indicators */}
      {step < 4 && (
        <div className="flex items-center justify-center gap-3 text-xs font-semibold">
<<<<<<< HEAD
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            <span>1</span> <span>Clinic Details</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">➔</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            <span>2</span> <span>Scale & Staff</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">➔</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
=======
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            <span>1</span> <span>Clinic Details</span>
          </div>
          <span className="text-slate-300">➔</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            <span>2</span> <span>Scale & Staff</span>
          </div>
          <span className="text-slate-300">➔</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
>>>>>>> origin/main
            <span>3</span> <span>Subscription Tier</span>
          </div>
        </div>
      )}

      {/* Step 1: Basic Clinic Information */}
      {step === 1 && (
<<<<<<< HEAD
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Step 1: Clinic Profile & Admin Name</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Provide the primary establishment details for OPD stationery</p>
=======
        <Card className="p-6 sm:p-8 border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 1: Clinic Profile & Admin Name</h2>
            <p className="text-xs text-slate-500">Provide the primary establishment details for OPD stationery</p>
>>>>>>> origin/main
          </div>

          <div className="space-y-4 text-xs">
            <div>
<<<<<<< HEAD
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Clinic Name *</label>
=======
              <label className="font-semibold text-slate-700 block mb-1">Clinic Name *</label>
>>>>>>> origin/main
              <input
                required
                type="text"
                value={form.clinicName}
                onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                placeholder="e.g. Apex Multispecialty Dental Center"
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Owner Doctor / Administrator Name *</label>
=======
                <label className="font-semibold text-slate-700 block mb-1">Owner Doctor / Administrator Name *</label>
>>>>>>> origin/main
                <input
                  required
                  type="text"
                  value={form.ownerName}
                  onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                  placeholder="Dr. Rajesh Patel, MDS"
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Clinic Specialty</label>
                <select
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Specialty</label>
                <select
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-medium"
>>>>>>> origin/main
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
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Primary City</label>
=======
                <label className="font-semibold text-slate-700 block mb-1">Primary City</label>
>>>>>>> origin/main
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Clinic Official Phone</label>
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Official Phone</label>
>>>>>>> origin/main
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
                />
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
=======
          <div className="flex justify-end pt-4 border-t border-slate-100">
>>>>>>> origin/main
            <Button variant="primary" size="md" onClick={() => setStep(2)} className="font-bold">
              Next: Scale & Capacity <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Scale & Capacity */}
      {step === 2 && (
<<<<<<< HEAD
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Step 2: Doctor Rostering & Branches</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure clinic capacity and operational branches</p>
=======
        <Card className="p-6 sm:p-8 border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 2: Doctor Rostering & Branches</h2>
            <p className="text-xs text-slate-500">Configure clinic capacity and operational branches</p>
>>>>>>> origin/main
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
<<<<<<< HEAD
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Number of Attending Doctors</label>
=======
                <label className="font-semibold text-slate-700 block mb-1">Number of Attending Doctors</label>
>>>>>>> origin/main
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={form.doctorCount}
                  onChange={(e) => setForm({ ...form, doctorCount: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-bold"
                />
                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">Seats provisioned for clinical notes & prescriptions</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Operational Branch Locations</label>
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Seats provisioned for clinical notes & prescriptions</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Operational Branch Locations</label>
>>>>>>> origin/main
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.branchCount}
                  onChange={(e) => setForm({ ...form, branchCount: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-bold"
                />
                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">Separate OPD reception desks and stock stores</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Automatic Provisioning
              </span>
              <p className="text-xs text-blue-700 dark:text-blue-300">
=======
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
>>>>>>> origin/main
                ClinicOS will automatically configure starter service tariffs, daily appointment slots, and WhatsApp reminder templates for {form.doctorCount} doctors.
              </p>
            </div>
          </div>

<<<<<<< HEAD
          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
=======
          <div className="flex justify-between pt-4 border-t border-slate-100">
>>>>>>> origin/main
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
<<<<<<< HEAD
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Step 3: Select SaaS Subscription Tier</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Every plan includes an instant 14-day full access free trial</p>
=======
        <Card className="p-6 sm:p-8 border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 3: Select SaaS Subscription Tier</h2>
            <p className="text-xs text-slate-500">Every plan includes an instant 14-day full access free trial</p>
>>>>>>> origin/main
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {plans.map((p) => (
              <label
                key={p.id}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  form.planId === p.id
<<<<<<< HEAD
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-600'
=======
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
>>>>>>> origin/main
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
<<<<<<< HEAD
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</span>
                    {p.popular && <Badge variant="teal" size="sm">Most Popular</Badge>}
                  </div>
                  <div className="text-base font-black text-blue-800 dark:text-blue-300 font-mono">{p.price}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.desc}</p>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <span className="text-blue-700 dark:text-blue-400 font-semibold">14-Day Free Access</span>
=======
                    <span className="font-bold text-xs text-slate-900">{p.name}</span>
                    {p.popular && <Badge variant="teal" size="sm">Most Popular</Badge>}
                  </div>
                  <div className="text-base font-black text-blue-800 font-mono">{p.price}</div>
                  <p className="text-[11px] text-slate-500 mt-1">{p.desc}</p>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="text-blue-700 font-semibold">14-Day Free Access</span>
>>>>>>> origin/main
                  <input
                    type="radio"
                    name="planSelect"
                    checked={form.planId === p.id}
                    onChange={() => setForm({ ...form, planId: p.id })}
<<<<<<< HEAD
                    className="text-blue-600 focus:ring-blue-500 cursor-pointer"
=======
                    className="text-blue-600 focus:ring-blue-500"
>>>>>>> origin/main
                  />
                </div>
              </label>
            ))}
          </div>

<<<<<<< HEAD
          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
=======
          <div className="flex justify-between pt-4 border-t border-slate-100">
>>>>>>> origin/main
            <Button variant="secondary" size="md" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button variant="primary" size="md" onClick={handleFinishOnboarding} className="bg-blue-600 hover:bg-blue-700 font-bold">
              Provision Simulated Clinic <Sparkles className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Simulated Setup Success Screen */}
      {step === 4 && createdClinic && (
<<<<<<< HEAD
        <Card className="p-8 border-2 border-blue-500 dark:border-blue-600 shadow-xl space-y-6 text-center bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
=======
        <Card className="p-8 border-2 border-blue-500 shadow-xl space-y-6 text-center bg-gradient-to-b from-blue-50/40 to-white">
>>>>>>> origin/main
          <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
<<<<<<< HEAD
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider bg-blue-100/70 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Simulated Provisioning Complete
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight pt-2">
              Welcome to ClinicOS, {form.clinicName}!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
=======
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              Simulated Provisioning Complete
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-2">
              Welcome to ClinicOS, {form.clinicName}!
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
>>>>>>> origin/main
              Your multi-tenant clinic partition has been initialized with {form.doctorCount} clinicians, digital prescriptions, and 14-day {form.planId.toUpperCase()} trial access.
            </p>
          </div>

          {/* Provisioning summary table */}
<<<<<<< HEAD
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1.5">
              <span className="text-slate-500 dark:text-slate-400">Tenant Identifier:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{createdClinic.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1.5">
              <span className="text-slate-500 dark:text-slate-400">Plan Tier:</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">{form.planId.toUpperCase()} (Trial)</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1.5">
              <span className="text-slate-500 dark:text-slate-400">Admin Doctor:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{form.ownerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Trial Period:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">14 Days Active</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl max-w-md mx-auto text-xs text-amber-900 dark:text-amber-300 text-left">
=======
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border border-slate-200 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Tenant Identifier:</span>
              <span className="font-bold text-slate-800">{createdClinic.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Plan Tier:</span>
              <span className="font-bold text-blue-700">{form.planId.toUpperCase()} (Trial)</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Admin Doctor:</span>
              <span className="font-bold text-slate-800">{form.ownerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Trial Period:</span>
              <span className="font-bold text-emerald-700">14 Days Active</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl max-w-md mx-auto text-[11px] text-amber-900 text-left">
>>>>>>> origin/main
            <strong>Demonstration Notice:</strong> This is a client-side prototype. No credit card was charged and no legal account was created.
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleLaunchWorkspace}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6"
            >
              Launch Clinic Administrator Workspace <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
