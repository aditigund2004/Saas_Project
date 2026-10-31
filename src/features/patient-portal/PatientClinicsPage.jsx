import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Calendar,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export function PatientClinicsPage() {
  const { clinics, doctors } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');

  // Specialties across all clinics
  const specialtiesList = [
    'All',
    'General Medicine',
    'Family Medicine',
    'Cardiology',
    'General Dentistry',
    'Orthodontics',
    'Dermatology',
    'Orthopedics',
    'Physiotherapy'
  ];

  // Cities
  const citiesList = ['All', 'Pune', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Navi Mumbai'];

  const filteredClinics = clinics.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.locality && c.locality.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.specialties && c.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      c.specialty.toLowerCase() === selectedSpecialty.toLowerCase() ||
      (c.specialties && c.specialties.some((s) => s.toLowerCase() === selectedSpecialty.toLowerCase()));

    const matchesCity = selectedCity === 'All' || c.city.toLowerCase() === selectedCity.toLowerCase();

    let matchesFee = true;
    if (feeFilter === 'budget') {
      // Under ₹800
      matchesFee = c.services?.some((s) => s.fee <= 800);
    } else if (feeFilter === 'mid') {
      // ₹800 - ₹1,200
      matchesFee = c.services?.some((s) => s.fee > 700 && s.fee <= 1200);
    } else if (feeFilter === 'specialist') {
      // Above ₹1,000
      matchesFee = c.services?.some((s) => s.fee >= 1000);
    }

    return matchesSearch && matchesSpecialty && matchesCity && matchesFee;
  });

  // Sorting
  const sortedClinics = [...filteredClinics].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'reviews') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    return 0; // relevance default
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60">
              Healthcare Network
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">5 Demonstration Clinics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 tracking-tight">
            Discover Participating Clinics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare accredited private clinics, explore verified medical specialties, review consultation fees, and submit booking requests.
          </p>
        </div>

        <Link to="/patient/appointments/book">
          <Button variant="primary" size="md" icon={Calendar} className="shadow-md shadow-blue-500/20">
            Book Appointment Wizard &rarr;
          </Button>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <Card className="p-4 sm:p-5 bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by clinic name, specialty, treatment or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>City:</span>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {citiesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
              <span>Fee:</span>
            </div>
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="All">All Fee Ranges</option>
              <option value="budget">Under ₹800</option>
              <option value="mid">₹800 - ₹1,200</option>
              <option value="specialist">Specialist (₹1,000+)</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
            Specialty:
          </span>
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>Showing <strong className="text-slate-700 dark:text-slate-200">{sortedClinics.length}</strong> accredited clinic(s) matching your criteria</span>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Deterministic synthetic demonstration data</span>
      </div>

      {/* Clinic Cards Grid (3 col per row grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedClinics.map((clinic) => {
          const clinicDocs = doctors.filter((d) => d.clinicId === clinic.id);

          return (
            <Card
              key={clinic.id}
              className="rounded-3xl border-white/60 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                {/* Clinic Header Banner */}
                <div className="relative h-36 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-3 py-1 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 shadow-sm">
                    <span className="text-base">{clinic.logo || '🏥'}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-xs uppercase font-bold">{clinic.specialty}</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-900/90 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{clinic.rating || 4.9}</span>
                    <span className="text-slate-400 text-xs">({clinic.reviewsCount || 100}+)</span>
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <h2 className="text-xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
                      {clinic.name}
                    </h2>
                    <p className="text-xs text-slate-200 truncate mt-0.5">
                      {clinic.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {clinic.description}
                  </p>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {(clinic.specialties || [clinic.specialty]).map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50 text-xs font-bold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Metadata Row: Location & Hours */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="truncate">
                        {clinic.locality ? `${clinic.locality}, ` : ''}{clinic.city}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate font-mono">
                        {clinic.operatingHours?.split(',')[0] || 'Mon - Sat: 09:00 - 19:00'}
                      </span>
                    </div>
                  </div>

                  {/* Sample Doctors Available */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      Consulting Physicians ({clinicDocs.length}):
                    </span>
                    <div className="space-y-1.5">
                      {clinicDocs.slice(0, 2).map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img src={doc.avatar} alt={doc.name} className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{doc.name}</span>
                          </div>
                          <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">
                            ₹{doc.consultationFee}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fee Range & Next Available Slot */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 block font-semibold uppercase tracking-wider">Consultation Range</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-slate-100 text-base">
                        {clinic.consultationFeeRange || '₹500 - ₹1,200'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 dark:text-slate-500 block font-semibold uppercase tracking-wider">Next Demo Slot</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1.5 justify-end mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                        {clinic.nextAvailableSlot || 'Today Available'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                <Link to={`/patient/clinics/${clinic.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full font-medium">
                    View Clinic Profile
                  </Button>
                </Link>
                <Link to={`/patient/appointments/book?clinicId=${clinic.id}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full font-bold shadow-sm" icon={Calendar}>
                    Request Booking
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

