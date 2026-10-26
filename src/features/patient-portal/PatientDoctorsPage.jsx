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
  DollarSign
} from 'lucide-react';

export function PatientDoctorsPage() {
  const { doctors, clinics, formatCurrency } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [clinicFilter, setClinicFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Cross-Clinic Provider Network
            </span>
            <span className="text-xs text-slate-400 font-mono">8 Verified Specialists</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Search Specialist Doctors</h1>
          <p className="text-xs text-slate-500">
            Compare doctor credentials, patient ratings, clinic affiliations, and request direct consultations.
          </p>
        </div>

        <Link to="/patient/appointments/book">
          <Button variant="primary" size="sm" icon={Calendar}>
            Guided Booking Wizard &rarr;
          </Button>
        </Link>
      </div>

      {/* Synthetic Demo Notice */}
      <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Multi-Clinic Network:</strong> You can book with specialists across any of the 5 participating clinics. Medical records remain isolated per clinic.
          </span>
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold">
          Cross-Clinic Search
        </span>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by doctor name, specialty, clinical qualifications..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Clinic:</span>
            </div>
            <select
              value={clinicFilter}
              onChange={(e) => setClinicFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 font-medium"
            >
              <option value="All">All 5 Clinics</option>
              {clinics.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium ml-2">
              <span>Fee:</span>
            </div>
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 font-medium"
            >
              <option value="All">All Tariffs</option>
              <option value="under800">Under ₹800</option>
              <option value="800to1000">₹800 - ₹1,000</option>
              <option value="above1000">Above ₹1,000</option>
            </select>
          </div>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Specialty:
          </span>
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                specialtyFilter === spec
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong>{filteredDoctors.length}</strong> doctor(s) matching your criteria</span>
        <Link to="/patient/clinics" className="text-blue-600 hover:underline font-semibold">
          Browse by Clinic instead &rarr;
        </Link>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDoctors.map((doc) => {
          const clinic = clinics.find((c) => c.id === doc.clinicId);

          return (
            <Card key={doc.id} className="p-4 border-slate-200 hover:border-blue-300 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{doc.rating || 4.9}</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-blue-700 truncate">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.qualifications}</p>
                  </div>
                </div>

                {/* Clinic Affiliation Pill */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 border border-blue-100 text-xs">
                  <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Practicing Clinic:</span>
                    <span className="font-bold text-slate-900 truncate block text-[11px]">
                      {clinic?.name || doc.clinicName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{clinic?.city}</span>
                </div>

                {/* Experience & Fee */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-lg">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Experience</span>
                    <span className="font-medium text-slate-900">{doc.experienceYears} Years</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Consultation Tariff</span>
                    <span className="font-bold font-mono text-blue-700">₹{doc.consultationFee}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Working Days: {doc.availableDays?.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100">
                <Link to={`/patient/doctors/${doc.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Profile
                  </Button>
                </Link>
                <Link
                  to={`/patient/appointments/book?clinicId=${doc.clinicId}&doctorId=${doc.id}`}
                  className="flex-1"
                >
                  <Button variant="primary" size="sm" className="w-full text-xs" icon={Calendar}>
                    Request Slot
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
