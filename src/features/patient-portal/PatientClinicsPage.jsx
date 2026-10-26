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
<<<<<<< HEAD
=======
  const publicClinics = clinics.filter(
    (clinic) =>
      clinic.approvalStatus !== 'Pending' &&
      clinic.approvalStatus !== 'Rejected' &&
      clinic.status !== 'Pending'
  );
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

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

<<<<<<< HEAD
  const filteredClinics = clinics.filter((c) => {
=======
  const filteredClinics = publicClinics.filter((c) => {
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Healthcare Network
            </span>
            <span className="text-xs text-slate-400 font-mono">5 Demonstration Clinics</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
            Discover Participating Clinics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare accredited private clinics, explore verified medical specialties, review consultation fees, and submit booking requests.
          </p>
        </div>

        <Link to="/patient/appointments/book">
          <Button variant="primary" size="sm" icon={Calendar}>
            Book Appointment Wizard &rarr;
          </Button>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <Card className="p-4 bg-white border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by clinic name, specialty, treatment or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>City:</span>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              {citiesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium ml-2">
              <span>Fee:</span>
            </div>
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="p-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              <option value="All">All Fee Ranges</option>
              <option value="budget">Under ₹800</option>
              <option value="mid">₹800 - ₹1,200</option>
              <option value="specialist">Specialist (₹1,000+)</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium ml-2">
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Specialty:
          </span>
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong>{sortedClinics.length}</strong> accredited clinic(s) matching your criteria</span>
        <span className="text-[11px] text-blue-600 font-medium">Deterministic synthetic demonstration data</span>
      </div>

      {/* Clinic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedClinics.map((clinic) => {
          const clinicDocs = doctors.filter((d) => d.clinicId === clinic.id);

          return (
            <Card
              key={clinic.id}
              className="flex flex-col justify-between overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div>
                {/* Clinic Header Banner */}
                <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-2xs">
                    <span className="text-base">{clinic.logo || '🏥'}</span>
                    <span className="text-blue-700 font-mono text-[11px] uppercase font-semibold">{clinic.specialty}</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{clinic.rating || 4.9}</span>
                    <span className="text-slate-400 text-[10px]">({clinic.reviewsCount || 100}+)</span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h2 className="text-lg font-black tracking-tight leading-tight drop-shadow-xs">
                      {clinic.name}
                    </h2>
                    <p className="text-[11px] text-slate-200 truncate mt-0.5">
                      {clinic.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 space-y-3.5">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {clinic.description}
                  </p>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {(clinic.specialties || [clinic.specialty]).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Metadata Row: Location & Hours */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    <div className="flex items-start gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] truncate">
                        {clinic.locality ? `${clinic.locality}, ` : ''}{clinic.city}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] truncate font-mono">
                        {clinic.operatingHours?.split(',')[0] || 'Mon - Sat: 09:00 - 19:00'}
                      </span>
                    </div>
                  </div>

                  {/* Sample Doctors Available */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Consulting Physicians ({clinicDocs.length}):
                    </span>
                    <div className="space-y-1">
                      {clinicDocs.slice(0, 2).map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <img src={doc.avatar} alt={doc.name} className="w-5 h-5 rounded-full object-cover" />
                            <span className="font-semibold text-slate-900 text-[11px]">{doc.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-blue-700 font-bold">
                            ₹{doc.consultationFee}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fee Range & Next Available Slot */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Consultation Range</span>
                      <span className="font-bold font-mono text-slate-900 text-sm">
                        {clinic.consultationFeeRange || '₹500 - ₹1,200'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Next Demo Slot</span>
                      <span className="font-semibold text-emerald-600 text-xs flex items-center gap-1 justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                        {clinic.nextAvailableSlot || 'Today Available'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-2 border-t border-slate-100 flex items-center gap-2 bg-slate-50/50">
                <Link to={`/patient/clinics/${clinic.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Clinic Profile
                  </Button>
                </Link>
                <Link to={`/patient/appointments/book?clinicId=${clinic.id}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full text-xs" icon={Calendar}>
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
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
