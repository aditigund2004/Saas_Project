import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Search,
  Star,
  Clock,
  MapPin,
  Calendar,
  Stethoscope,
  Building2,
  ShieldCheck,
  CheckCircle2,
<<<<<<< HEAD
  DollarSign
=======
  DollarSign,
  List,
  LayoutGrid
>>>>>>> origin/main
} from 'lucide-react';

export function PatientDoctorsPage() {
  const { doctors, clinics, formatCurrency } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [clinicFilter, setClinicFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
<<<<<<< HEAD
=======
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
>>>>>>> origin/main

  const specialtiesList = [
    'All',
    'General Medicine',
    'Family Medicine',
    'Cardiology',
    'General Dentistry',
    'Orthodontics',
    'Endodontics',
    'Dermatology',
    'Orthopedics',
    'Physiotherapy'
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.clinicName && doc.clinicName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty =
      specialtyFilter === 'All' ||
      doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());

    const matchesClinic = clinicFilter === 'All' || doc.clinicId === clinicFilter;

    let matchesFee = true;
    if (feeFilter === 'under800') matchesFee = doc.consultationFee <= 800;
    if (feeFilter === '800to1000') matchesFee = doc.consultationFee > 700 && doc.consultationFee <= 1000;
    if (feeFilter === 'above1000') matchesFee = doc.consultationFee > 1000;

    return matchesSearch && matchesSpecialty && matchesClinic && matchesFee;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 uppercase tracking-wider">
              Cross-Clinic Provider Network
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">8 Verified Specialists</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Search Specialist Doctors</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare doctor credentials, patient ratings, clinic affiliations, and request direct consultations.
          </p>
        </div>

        <Link to="/patient/appointments/book">
          <Button variant="primary" size="md" icon={Calendar} className="shadow-md shadow-blue-500/20 font-bold">
            Guided Booking Wizard &rarr;
          </Button>
        </Link>
      </div>

      {/* Synthetic Demo Notice */}
      <div className="p-3.5 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs text-blue-950 dark:text-blue-200 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            <strong>Multi-Clinic Network:</strong> You can book with specialists across any of the 5 participating clinics. Medical records remain isolated per clinic.
          </span>
        </span>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold">
          Cross-Clinic Search
        </span>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by doctor name, specialty, clinical qualifications..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Clinic:</span>
            </div>
            <select
              value={clinicFilter}
              onChange={(e) => setClinicFilter(e.target.value)}
              className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-950 dark:text-slate-100 font-medium"
            >
              <option value="All">All 5 Clinics</option>
              {clinics.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
              <span>Fee:</span>
            </div>
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-950 dark:text-slate-100 font-medium"
            >
              <option value="All">All Tariffs</option>
              <option value="under800">Under ₹800</option>
              <option value="800to1000">₹800 - ₹1,000</option>
              <option value="above1000">Above ₹1,000</option>
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
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                specialtyFilter === spec
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

<<<<<<< HEAD
      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>Showing <strong className="text-slate-700 dark:text-slate-200">{filteredDoctors.length}</strong> doctor(s) matching your criteria</span>
        <Link to="/patient/clinics" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-xs">
          Browse by Clinic instead &rarr;
        </Link>
      </div>

      {/* Doctors Grid (3 col per row grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doc) => {
          const clinic = clinics.find((c) => c.id === doc.clinicId);

          return (
            <Card key={doc.id} className="p-6 rounded-3xl border-white/60 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-start gap-3.5">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base truncate">{doc.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{doc.rating || 4.9}</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">{doc.specialty}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{doc.qualifications}</p>
                  </div>
                </div>

                {/* Clinic Affiliation Pill */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold block">Practicing Clinic:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate block text-xs">
                      {clinic?.name || doc.clinicName}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{clinic?.city}</span>
                </div>

                {/* Experience & Fee */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold block">Experience</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{doc.experienceYears} Years</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold block">Consultation Tariff</span>
                    <span className="font-bold font-mono text-blue-600 dark:text-blue-400">₹{doc.consultationFee}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">Working Days: {doc.availableDays?.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800">
                <Link to={`/patient/doctors/${doc.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full font-medium">
                    View Profile
                  </Button>
                </Link>
                <Link
                  to={`/patient/appointments/book?clinicId=${doc.clinicId}&doctorId=${doc.id}`}
                  className="flex-1"
                >
                  <Button variant="primary" size="sm" className="w-full font-bold shadow-sm" icon={Calendar}>
                    Request Slot
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
=======
      {/* Results Count & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-700 dark:text-slate-200">{filteredDoctors.length}</strong> doctor(s) matching your criteria
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>

          <Link to="/patient/clinics" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-xs">
            Browse by Clinic instead &rarr;
          </Link>
        </div>
      </div>

      {/* Main Table Structure (Default) */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center w-12">#</th>
                  <th className="py-3.5 px-4">Doctor & Qualifications</th>
                  <th className="py-3.5 px-3">Specialty</th>
                  <th className="py-3.5 px-4">Practicing Facility</th>
                  <th className="py-3.5 px-3">Experience</th>
                  <th className="py-3.5 px-3">Rating</th>
                  <th className="py-3.5 px-3">Tariff</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No practitioners found matching your selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doc, idx) => {
                    const clinic = clinics.find((c) => c.id === doc.clinicId);

                    return (
                      <tr
                        key={doc.id}
                        className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                        onClick={() => navigate(`/patient/doctors/${doc.id}`)}
                      >
                        <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                          {idx + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={doc.avatar}
                              alt={doc.name}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                            />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {doc.name}
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                                {doc.qualifications}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-200/50 dark:border-blue-900/50 whitespace-nowrap">
                            {doc.specialty}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span>{clinic?.name || doc.clinicName}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-medium mt-0.5">
                            {clinic?.city}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          {doc.experienceYears} Years
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{doc.rating || 4.9}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
                            {formatCurrency(doc.consultationFee)}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/patient/doctors/${doc.id}`}>
                              <Button variant="outline" size="xs">
                                Profile
                              </Button>
                            </Link>
                            <Link to={`/patient/appointments/book?clinicId=${doc.clinicId}&doctorId=${doc.id}`}>
                              <Button variant="primary" size="xs" icon={Calendar} className="font-bold">
                                Book
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Specialist medical directory ({filteredDoctors.length} doctors)</span>
            <span>Click any row to open doctor credentials and schedule</span>
          </div>
        </div>
      ) : (
        /* Doctors Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDoctors.map((doc) => {
            const clinic = clinics.find((c) => c.id === doc.clinicId);

            return (
              <Card key={doc.id} className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base truncate">{doc.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{doc.rating || 4.9}</span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">{doc.specialty}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{doc.qualifications}</p>
                    </div>
                  </div>

                  {/* Clinic Affiliation Pill */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold block">Practicing Clinic:</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100 truncate block text-xs">
                        {clinic?.name || doc.clinicName}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{clinic?.city}</span>
                  </div>

                  {/* Experience & Fee */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold block">Experience</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{doc.experienceYears} Years</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold block">Consultation Tariff</span>
                      <span className="font-bold font-mono text-blue-600 dark:text-blue-400">₹{doc.consultationFee}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">Working Days: {doc.availableDays?.join(', ')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800">
                  <Link to={`/patient/doctors/${doc.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full font-medium">
                      View Profile
                    </Button>
                  </Link>
                  <Link
                    to={`/patient/appointments/book?clinicId=${doc.clinicId}&doctorId=${doc.id}`}
                    className="flex-1"
                  >
                    <Button variant="primary" size="sm" className="w-full font-bold shadow-sm" icon={Calendar}>
                      Request Slot
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
>>>>>>> origin/main
    </div>
  );
}
