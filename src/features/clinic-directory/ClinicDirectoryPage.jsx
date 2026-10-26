import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Star, Filter, ArrowRight, Stethoscope } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useApp } from '../../context/AppContext';

export function ClinicDirectoryPage() {
  const { clinics } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  const specialties = [
    'All',
    'General Medicine',
    'Family Medicine',
    'Cardiology',
    'Preventive Cardiac Care',
    'General Dentistry',
    'Orthodontics',
    'Dermatology',
    'Clinical Skin Care',
    'Orthopedics',
    'Physiotherapy'
  ];
  const cities = ['All', 'Mumbai', 'Bengaluru', 'Pune'];

<<<<<<< HEAD
  const filteredClinics = clinics.filter((c) => {
=======
  const filteredClinics = clinics.filter((c) =>
    c.approvalStatus !== 'Pending' &&
    c.approvalStatus !== 'Rejected' &&
    c.status !== 'Pending'
  ).filter((c) => {
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      (c.tagline && c.tagline.toLowerCase().includes(q)) ||
      (c.city && c.city.toLowerCase().includes(q)) ||
      (c.specialties && c.specialties.some((s) => s.toLowerCase().includes(q)));
    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      (c.specialties && c.specialties.includes(selectedSpecialty)) ||
      c.specialty === selectedSpecialty;
    const matchesCity = selectedCity === 'All' || c.city === selectedCity;
    return matchesSearch && matchesSpecialty && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Connected Clinics Directory</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Find and Book Verified Specialty Practices
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Browse published digital clinic profiles. Patients can schedule appointments directly online, explore available doctors, or request walk-in visits.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by clinic name, specialty, or area..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Specialty Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700 font-medium"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  Specialty: {s}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700 font-medium"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  Location: {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clinic Results Grid */}
      {filteredClinics.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Clinics Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No connected practices match your current search criteria. Try resetting your specialty or location filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedSpecialty('All');
              setSelectedCity('All');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <Card
              key={clinic.id}
              className="overflow-hidden border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-xs text-slate-800 shadow-xs">
                      {clinic.specialty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-xs">
                      ★ {clinic.rating} ({clinic.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1">{clinic.name}</h3>
                    <p className="text-xs text-blue-700 font-medium mt-0.5">{clinic.tagline}</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{clinic.description}</p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{clinic.address}, {clinic.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{clinic.branches.length} Registered Branch{clinic.branches.length > 1 ? 'es' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{clinic.services.length} Listed Clinical Services</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center gap-2">
                <Link to={`/clinics/${clinic.slug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </Link>
                <Link to={`/book-appointment?clinic=${clinic.id}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full">
                    Book Slot
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
