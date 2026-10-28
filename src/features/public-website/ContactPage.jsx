import React, { useState } from 'react';
<<<<<<< HEAD
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
=======
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
>>>>>>> origin/main
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';

export function ContactPage() {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    clinicName: '',
    specialty: 'Dental',
    inquiryType: 'Free Trial Setup',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your message has been received.');
    }, 700);
  };

  return (
<<<<<<< HEAD
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12 transition-colors">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Contact & Inquiries</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Talk to Our Clinic Solutions Team
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
=======
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Contact & Inquiries</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Talk to Our Clinic Solutions Team
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
>>>>>>> origin/main
          Have questions about multi-branch deployments, WhatsApp Business API compliance, or setting up your 14-day free trial? We’re here to help.
        </p>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Inquiries</h3>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Email Support</p>
                  <p className="text-slate-500 dark:text-slate-400">support@clinicos.demo</p>
                  <p className="text-slate-500 dark:text-slate-400">onboarding@clinicos.demo</p>
=======
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Direct Inquiries</h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Email Support</p>
                  <p className="text-slate-500">support@clinipulse.demo</p>
                  <p className="text-slate-500">onboarding@clinipulse.demo</p>
>>>>>>> origin/main
                </div>
              </div>

              <div className="flex items-start gap-3">
<<<<<<< HEAD
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Phone & WhatsApp Hotline</p>
                  <p className="text-slate-500 dark:text-slate-400">+91 (022) 8800-CLINI</p>
                  <p className="text-slate-500 dark:text-slate-400">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
=======
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Phone & WhatsApp Hotline</p>
                  <p className="text-slate-500">+91 (022) 8800-CLINI</p>
                  <p className="text-slate-500">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
>>>>>>> origin/main
                </div>
              </div>

              <div className="flex items-start gap-3">
<<<<<<< HEAD
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Product Engineering Headquarters</p>
                  <p className="text-slate-500 dark:text-slate-400">Level 7, Healthcare Tech Tower, BKC</p>
                  <p className="text-slate-500 dark:text-slate-400">Mumbai 400051, India</p>
=======
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Product Engineering Headquarters</p>
                  <p className="text-slate-500">Level 7, Healthcare Tech Tower, BKC</p>
                  <p className="text-slate-500">Mumbai 400051, India</p>
>>>>>>> origin/main
                </div>
              </div>
            </div>
          </Card>

<<<<<<< HEAD
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-blue-900 text-white space-y-3">
=======
          <Card className="p-6 border-slate-200 bg-blue-900 text-white space-y-3">
>>>>>>> origin/main
            <h4 className="font-bold text-sm text-blue-200">14-Day Free Trial Notice</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              You can test the entire platform right now without contacting sales! Click "Start 14-Day Free Trial" to access preloaded demo accounts across all 4 user roles.
            </p>
          </Card>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
<<<<<<< HEAD
          <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
=======
          <Card className="p-8 border-slate-200">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
>>>>>>> origin/main
                  Thank you, <strong>{form.fullName}</strong>. Your inquiry regarding <strong>{form.clinicName || 'your clinic'}</strong> has been simulated successfully. An onboarding specialist will reach out to <strong>{form.email}</strong>.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< HEAD
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Submit an Inquiry</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Please provide your clinic details below.</p>
=======
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Submit an Inquiry</h3>
                  <p className="text-xs text-slate-500">Please provide your clinic details below.</p>
>>>>>>> origin/main
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
=======
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
>>>>>>> origin/main
                    <input
                      required
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Dr. Name or Practice Manager"
<<<<<<< HEAD
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
                    />
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email Address *</label>
=======
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email Address *</label>
>>>>>>> origin/main
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="doctor@clinicname.demo"
<<<<<<< HEAD
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
                    />
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Phone Number *</label>
=======
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone Number *</label>
>>>>>>> origin/main
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98000 00000"
<<<<<<< HEAD
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
                    />
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Clinic / Organization Name *</label>
=======
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic / Organization Name *</label>
>>>>>>> origin/main
                    <input
                      required
                      type="text"
                      value={form.clinicName}
                      onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                      placeholder="Apex Specialty Center"
<<<<<<< HEAD
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
                    />
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Clinic Specialty</label>
                    <select
                      value={form.specialty}
                      onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic Specialty</label>
                    <select
                      value={form.specialty}
                      onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
                    >
                      <option value="Dental">Dental & Orthodontics</option>
                      <option value="Orthopedics">Orthopedics & Joint Care</option>
                      <option value="Dermatology">Dermatology & Skin Center</option>
                      <option value="Pediatrics">Pediatrics & Neonatal Care</option>
                      <option value="Nursing Home">Nursing Home (10-30 Beds)</option>
                      <option value="General">General / Multi-Specialty</option>
                    </select>
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Inquiry Purpose</label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Purpose</label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
                    >
                      <option value="Free Trial Setup">Free Trial Onboarding Assistance</option>
                      <option value="Multi-Branch Pricing">Multi-Branch Chain Deployment</option>
                      <option value="WhatsApp Business API">WhatsApp Cloud API Integration</option>
<<<<<<< HEAD
                      <option value="Billing & Invoicing">Billing & Tax Invoice Setup</option>
=======
                      <option value="Billing & Invoicing">Billing & Tally/Quickbooks Export</option>
>>>>>>> origin/main
                      <option value="General Inquiry">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
<<<<<<< HEAD
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Message or Specific Requirements</label>
=======
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message or Specific Requirements</label>
>>>>>>> origin/main
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your current clinic setup, number of doctors, and what problems you want to solve..."
<<<<<<< HEAD
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
                  />
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={submitting}
                    icon={Send}
                    className="w-full sm:w-auto"
                  >
                    {submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
