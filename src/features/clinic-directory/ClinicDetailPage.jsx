import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
<<<<<<< HEAD
=======
  Building2,
  Calendar,
  CheckCircle2,
  Stethoscope,
  Star,
>>>>>>> origin/main
  ArrowRight
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function ClinicDetailPage() {
  const { clinicSlug } = useParams();
  const { clinics, doctors } = useApp();
  const [activeTab, setActiveTab] = useState('services');

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const clinicDoctors = doctors.filter((d) => d.clinicId === clinic.id);

  return (
<<<<<<< HEAD
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 transition-colors">
=======
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
>>>>>>> origin/main
      {/* Clinic Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={clinic.image}
            alt={clinic.name}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-sm">
                {clinic.specialty} Practice
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs text-white">
                ★ {clinic.rating} ({clinic.reviewsCount} Patient Reviews)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{clinic.name}</h1>
            <p className="text-sm text-blue-300 font-medium">{clinic.tagline}</p>
            <p className="text-xs text-slate-300 line-clamp-2 max-w-xl">{clinic.description}</p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link to={`/book-appointment?clinic=${clinic.id}`}>
              <Button variant="primary" size="lg" className="shadow-lg">
                Book Consultation Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Navigation Tabs & Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab selector */}
<<<<<<< HEAD
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'services'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
=======
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
>>>>>>> origin/main
              }`}
            >
              Services & Pricing ({clinic.services.length})
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
<<<<<<< HEAD
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'doctors'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
=======
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
>>>>>>> origin/main
              }`}
            >
              Consulting Doctors ({clinicDoctors.length})
            </button>
            <button
              onClick={() => setActiveTab('branches')}
<<<<<<< HEAD
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'branches'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
=======
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'branches'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
>>>>>>> origin/main
              }`}
            >
              Branches & Locations ({clinic.branches.length})
            </button>
          </div>

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-4">
<<<<<<< HEAD
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Available Procedures & Consultations</h2>
              <div className="grid grid-cols-1 gap-3">
                {clinic.services.map((srv) => (
                  <Card key={srv.id} className="p-4 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{srv.name}</h3>
                        <Badge variant="Active">{srv.category}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{srv.description}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">Standard Duration: {srv.durationMinutes} mins</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
=======
              <h2 className="text-lg font-bold text-slate-900">Available Procedures & Consultations</h2>
              <div className="grid grid-cols-1 gap-3">
                {clinic.services.map((srv) => (
                  <Card key={srv.id} className="p-4 border-slate-200 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{srv.name}</h3>
                        <Badge variant="Active">{srv.category}</Badge>
                      </div>
                      <p className="text-xs text-slate-500">{srv.description}</p>
                      <p className="text-[11px] text-slate-400">Standard Duration: {srv.durationMinutes} mins</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-slate-900">
>>>>>>> origin/main
                        ₹{srv.fee.toLocaleString('en-IN')}
                      </div>
                      <Link to={`/book-appointment?clinic=${clinic.id}&service=${srv.id}`}>
                        <Button variant="outline" size="sm" className="mt-2">
                          Book Slot
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <div className="space-y-4">
<<<<<<< HEAD
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Practitioner Roster</h2>
              <div className="grid grid-cols-1 gap-4">
                {clinicDoctors.map((doc) => (
                  <Card key={doc.id} className="p-5 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start gap-4">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="space-y-1 flex-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{doc.name}</h3>
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">{doc.specialty}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{doc.qualifications} · {doc.experienceYears} Years Exp</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">{doc.bio}</p>
                      <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                        <span>🕒 {doc.workingHours}</span>
                        <span>•</span>
                        <span className="tabular-nums">Fee: ₹{doc.consultationFee.toLocaleString('en-IN')}</span>
=======
              <h2 className="text-lg font-bold text-slate-900">Practitioner Roster</h2>
              <div className="grid grid-cols-1 gap-4">
                {clinicDoctors.map((doc) => (
                  <Card key={doc.id} className="p-5 border-slate-200 flex flex-col sm:flex-row items-start gap-4">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="space-y-1 flex-1">
                      <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                      <p className="text-xs font-semibold text-blue-700">{doc.specialty}</p>
                      <p className="text-xs text-slate-500">{doc.qualifications} · {doc.experienceYears} Years Exp</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{doc.bio}</p>
                      <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span>🕒 {doc.workingHours}</span>
                        <span>•</span>
                        <span>Fee: ₹{doc.consultationFee.toLocaleString('en-IN')}</span>
>>>>>>> origin/main
                      </div>
                    </div>
                    <div className="shrink-0 sm:self-center">
                      <Link to={`/book-appointment?clinic=${clinic.id}&doctor=${doc.id}`}>
                        <Button variant="primary" size="sm">
                          Schedule Visit
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Branches Tab */}
          {activeTab === 'branches' && (
            <div className="space-y-4">
<<<<<<< HEAD
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Clinic Branch Locations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clinic.branches.map((b) => (
                  <Card key={b.id} className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{b.name}</h3>
                      {b.isMain && <Badge variant="Active">Primary Facility</Badge>}
                    </div>
                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
=======
              <h2 className="text-lg font-bold text-slate-900">Clinic Branch Locations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clinic.branches.map((b) => (
                  <Card key={b.id} className="p-5 border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900">{b.name}</h3>
                      {b.isMain && <Badge variant="Active">Primary Facility</Badge>}
                    </div>
                    <div className="space-y-1 text-xs text-slate-600">
>>>>>>> origin/main
                      <p>📍 {b.address}, {b.city}</p>
                      <p>📞 Phone: {b.phone}</p>
                      <p>🕒 Hours: {b.operatingHours}</p>
                    </div>
                    <div className="pt-2">
                      <Link to={`/book-appointment?clinic=${clinic.id}&branch=${b.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Select This Branch
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Clinic Information & Policies */}
        <div className="lg:col-span-4 space-y-6">
<<<<<<< HEAD
          <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Contact & Hours</h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{clinic.address}, {clinic.city}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{clinic.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{clinic.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
=======
          <Card className="p-6 border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact & Hours</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{clinic.address}, {clinic.city}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{clinic.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{clinic.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
>>>>>>> origin/main
                <span>{clinic.operatingHours}</span>
              </div>
            </div>
          </Card>

<<<<<<< HEAD
          <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-3 bg-blue-50/50 dark:bg-blue-950/20">
            <h3 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Patient Booking Policy
            </h3>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              {clinic.bookingPolicy}
            </p>
            <div className="pt-1 text-[11px] text-blue-700 dark:text-blue-400">
=======
          <Card className="p-6 border-slate-200 space-y-3 bg-blue-50/50">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Patient Booking Policy
            </h3>
            <p className="text-xs text-blue-800 leading-relaxed">
              {clinic.bookingPolicy}
            </p>
            <div className="pt-1 text-[11px] text-blue-700">
>>>>>>> origin/main
              ✓ Instant confirmation via SMS / WhatsApp notification
            </div>
          </Card>

<<<<<<< HEAD
          <Card className="p-6 border-slate-200 dark:border-slate-800 text-center space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Are you a healthcare provider?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Move your own clinic to ClinicOS with a 14-day free trial.
            </p>
            <Link to="/register/clinic" className="block">
=======
          <Card className="p-6 border-slate-200 text-center space-y-3">
            <h4 className="font-bold text-sm text-slate-900">Are you a healthcare provider?</h4>
            <p className="text-xs text-slate-500">
              Move your own clinic to CliniPulse with a 14-day free trial.
            </p>
            <Link to="/register" className="block">
>>>>>>> origin/main
              <Button variant="outline" size="sm" className="w-full">
                Register Your Clinic
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
