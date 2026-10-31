import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, MapPin, Video, User, ArrowRight, Stethoscope, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function FindDoctorPage() {
  const { doctors, clinics } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All'); // All, Video, In-Person

  const specialties = useMemo(() => {
    const s = new Set(['All']);
    doctors.forEach(doc => s.add(doc.specialty));
    return Array.from(s);
  }, [doctors]);

  const cities = useMemo(() => {
    const c = new Set(['All']);
    clinics.forEach(clinic => c.add(clinic.city));
    return Array.from(c);
  }, [clinics]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const clinic = clinics.find(c => c.id === doc.clinicId);
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
      const matchesCity = selectedCity === 'All' || (clinic && clinic.city === selectedCity);
      // For demo, all doctors support both types
      const matchesType = selectedType === 'All' || true; 

      return matchesSearch && matchesSpecialty && matchesCity && matchesType;
    });
  }, [doctors, clinics, searchQuery, selectedSpecialty, selectedCity, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 dark:text-[#22D3EE] uppercase tracking-wider">Doctor Discovery</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-[#F1F5F9] tracking-tight">
          Book Top Specialists Near You
        </h1>
        <p className="text-slate-600 dark:text-[#94A3B8] text-sm leading-relaxed">

          Search for doctors by specialty, location, or name. Choose between video consultations or in-person clinic visits.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#111E33] rounded-2xl border border-slate-200 dark:border-[#263B59] p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name or specialty..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

            />
          </div>

          {/* Specialty Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] font-medium"
            >
              {specialties.map((s) => (
                <option key={s} value={s} className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">{s === 'All' ? 'All Specialties' : s}</option>

              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] font-medium"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">{city === 'All' ? 'All Cities' : city}</option>

              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] font-medium"
            >
              <option value="All" className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">All Formats</option>
              <option value="Video" className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">Video Consult</option>
              <option value="In-Person" className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">In-Person</option>

            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Grid */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#F1F5F9]">
              {filteredDoctors.length} Doctors Available
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#94A3B8]">
              <span>Sort by:</span>
              <select className="bg-transparent font-bold text-slate-900 dark:text-[#F1F5F9] focus:outline-none cursor-pointer">
                <option className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">Most Popular</option>
                <option className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">Rating: High to Low</option>
                <option className="bg-white dark:bg-[#0D1729] text-slate-900 dark:text-[#F1F5F9]">Experience: High to Low</option>

              </select>
            </div>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#111E33] rounded-3xl border border-dashed border-slate-200 dark:border-[#263B59]">
              <User className="w-12 h-12 text-slate-400 dark:text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-[#F1F5F9]">No doctors found</h3>
              <p className="text-sm text-slate-500 dark:text-[#94A3B8]">Try adjusting your filters or search terms.</p>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => {
                const clinic = clinics.find(c => c.id === doctor.clinicId);
                return (
                  <Card key={doctor.id} className="p-0 overflow-hidden hover:shadow-lg transition-shadow group border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col">

                    <div className="p-5 flex-1 space-y-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img 
                            src={doctor.avatar} 
                            alt={doctor.name} 
                            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-[#263B59]"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-[#111E33] rounded-full shadow-sm" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9] group-hover:text-blue-600 dark:group-hover:text-[#3B82F6] transition-colors">
                              {doctor.name}
                            </h3>
                            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-[#3B82F6]" />
                          </div>
                          <p className="text-xs font-semibold text-blue-600 dark:text-[#22D3EE]">{doctor.specialty}</p>
                          <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] line-clamp-1">{doctor.qualifications}</p>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 dark:text-amber-400 pt-1">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{doctor.rating}</span>
                            <span className="text-slate-400 dark:text-[#94A3B8] font-normal">({doctor.reviewsCount} reviews)</span>

                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-[#CBD5E1]">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-[#94A3B8]" />
                          <span className="font-medium truncate">{clinic?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-[#CBD5E1]">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-[#94A3B8]" />
                          <span>{clinic?.locality}, {clinic?.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="font-semibold">Available {doctor.nextAvailableSlot || 'Today'}</span>

                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <div className="px-2 py-1 rounded-lg bg-blue-50 dark:bg-[#172640] border border-blue-200 dark:border-[#263B59] text-blue-700 dark:text-[#22D3EE] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-[#172640] border border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">

                          <Building2 className="w-3 h-3" />
                          In-Person
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-[#0D1729] border-t border-slate-200 dark:border-[#263B59] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] block uppercase font-bold tracking-wider">Fee starts from</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">₹{doctor.consultationFee}</span>

                      </div>
                      <Link to={`/book-doctor/${doctor.id}`}>
                        <Button variant="primary" size="sm" className="px-5">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
