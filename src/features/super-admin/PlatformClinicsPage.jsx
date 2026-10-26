import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Search,
  Building2,
  ShieldAlert,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  ExternalLink,
  PlusCircle,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  User,
  Stethoscope,
  Layers,
  Calendar,
  Clock,
  Check,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function PlatformClinicsPage() {
  const { clinics, setClinics, setDoctors, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [statusModal, setStatusModal] = useState({ isOpen: false, clinic: null, targetStatus: '' });

  // Provision New Clinic Modal State
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);

  const initialFormState = {
    name: 'Zenith Advanced Heart & Wellness Clinic',
    specialty: 'Cardiology',
    tagline: 'Comprehensive Outpatient Cardiovascular Diagnostic & Rehab Center',
    ownerName: 'Dr. Vikram Singhal, MD, DM',
    qualifications: 'MBBS, MD (Med), DM (Cardiology)',
    experienceYears: 14,
    email: 'admin@zenithheart.demo',
    phone: '+91 98201 88990',
    city: 'Mumbai',
    locality: 'Bandra West',
    address: 'Plot 42, Bandra Reclamation, Near Lilavati Hub',
    branchName: 'Bandra Flagship Center',
    branchCode: 'BW-01',
    operatingHours: 'Mon - Sat: 08:30 AM - 08:00 PM',
    doctorCount: 4,
    consultationFee: 1200,
    consultationFeeRange: '₹800 - ₹1,500',
    subscriptionPlanId: 'professional',
    status: 'Active',
    description: 'Specialized cardiac clinic equipped with 12-lead ECG, 2D Echocardiography, Stress Test and outpatient clinical monitoring.'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // Quick Prefill Templates
  const handleApplyTemplate = (type) => {
    if (type === 'cardiology') {
      setFormData(initialFormState);
    } else if (type === 'dental') {
      setFormData({
        name: 'SmileCraft Aesthetic Dental Care',
        specialty: 'Dental',
        tagline: 'Digital Implantology, Orthodontics & Cosmetic Dentistry',
        ownerName: 'Dr. Neha Kapoor, MDS',
        qualifications: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics)',
        experienceYears: 11,
        email: 'care@smilecraft.demo',
        phone: '+91 98450 77112',
        city: 'Bengaluru',
        locality: 'Indiranagar',
        address: '88 Lotus Arcade, 100ft Road, Indiranagar',
        branchName: 'Indiranagar Studio',
        branchCode: 'SC-01',
        operatingHours: 'Tue - Sun: 10:00 AM - 08:00 PM',
        doctorCount: 3,
        consultationFee: 800,
        consultationFeeRange: '₹500 - ₹1,200',
        subscriptionPlanId: 'growth',
        status: 'Active',
        description: 'Advanced dental practice featuring intraoral 3D scanning, laser teeth whitening, and specialized invisalign aligner treatments.'
      });
    } else if (type === 'pediatrics') {
      setFormData({
        name: 'LittleSteps Child Health Center',
        specialty: 'Pediatrics',
        tagline: 'Holistic Child Health, Vaccination & Developmental Pediatrics',
        ownerName: 'Dr. Priya Sen, MD (Pediatrics)',
        qualifications: 'MBBS, MD (Pediatrics), DCH',
        experienceYears: 12,
        email: 'clinic@littlesteps.demo',
        phone: '+91 98110 33445',
        city: 'Delhi',
        locality: 'Vasant Vihar',
        address: 'A-14 Commercial Block, Vasant Vihar',
        branchName: 'Vasant Vihar Hub',
        branchCode: 'LS-01',
        operatingHours: 'Mon - Sat: 09:00 AM - 07:00 PM',
        doctorCount: 2,
        consultationFee: 900,
        consultationFeeRange: '₹600 - ₹1,100',
        subscriptionPlanId: 'starter',
        status: 'Trial',
        description: 'Warm and child-friendly pediatric outpatient center providing milestone tracking, WHO immunization schedules, and infant nutrition counseling.'
      });
    }
    setFormErrors({});
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Clinic name is required';
    if (!formData.ownerName.trim()) errs.ownerName = 'Administrator / Chief Doctor name is required';
    if (!formData.email.trim()) errs.email = 'Administrator email is required';
    if (!formData.phone.trim()) errs.phone = 'Contact phone number is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegisterClinic = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fix the highlighted validation errors.', 'error');
      return;
    }

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const clinicId = `clinic-${slug}-${Date.now().toString().slice(-4)}`;
    const branchId = `branch-${clinicId}-main`;

    const newClinic = {
      id: clinicId,
      slug,
      name: formData.name.trim(),
      tagline: formData.tagline.trim() || `${formData.specialty} Care Excellence`,
      specialty: formData.specialty,
      specialties: [formData.specialty],
      description: formData.description.trim() || `Modern outpatient healthcare center offering specialized ${formData.specialty.toLowerCase()} care.`,
      logo: '🏥',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      address: formData.address.trim(),
      locality: formData.locality?.trim() || formData.city,
      city: formData.city.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      ownerName: formData.ownerName.trim(),
      status: formData.status,
      subscriptionPlanId: formData.subscriptionPlanId,
      trialEndsAt: formData.status === 'Trial' ? new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10) : '2027-10-24',
      isTrial: formData.status === 'Trial',
      operatingHours: formData.operatingHours.trim() || 'Mon - Sat: 08:30 AM - 08:00 PM',
      bookingPolicy: '15-minute grace period for scheduled slots. Prior appointment recommended.',
      consultationFeeRange: formData.consultationFeeRange.trim() || `₹${formData.consultationFee} - ₹${formData.consultationFee * 1.5}`,
      rating: 5.0,
      reviewsCount: 1,
      branches: [
        {
          id: branchId,
          clinicId,
          name: formData.branchName.trim() || `${formData.name.trim()} (Main Hub)`,
          code: formData.branchCode.trim() || 'MAIN',
          address: formData.address.trim(),
          city: formData.city.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          operatingHours: formData.operatingHours.trim() || 'Mon - Sat: 08:30 AM - 08:00 PM',
          isMain: true,
          activeDoctorsCount: parseInt(formData.doctorCount) || 1
        }
      ],
      services: [
        {
          id: `srv-${clinicId}-1`,
          name: `${formData.specialty} Specialist Consultation`,
          durationMinutes: 30,
          fee: parseInt(formData.consultationFee) || 800,
          category: 'Consultation',
          description: `Detailed clinical diagnosis and treatment evaluation by ${formData.ownerName}.`
        },
        {
          id: `srv-${clinicId}-2`,
          name: 'Follow-up Consultation',
          durationMinutes: 15,
          fee: Math.round((parseInt(formData.consultationFee) || 800) * 0.6),
          category: 'Follow-up',
          description: 'Medication review and symptom progression check.'
        }
      ]
    };

    // Also register default lead doctor so clinical encounters work smoothly
    const leadDoctor = {
      id: `doc-${clinicId}-lead`,
      doctorIdNumber: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      clinicId,
      branchIds: [branchId],
      name: formData.ownerName.trim(),
      specialty: formData.specialty,
      qualifications: formData.qualifications.trim() || 'MBBS, MD',
      experienceYears: parseInt(formData.experienceYears) || 10,
      consultationFee: parseInt(formData.consultationFee) || 800,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      bio: `Chief medical director at ${formData.name}.`,
      rating: 5.0,
      reviewsCount: 1,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      workingHours: '09:00 AM - 07:00 PM',
      slotDurationMinutes: 30,
      status: 'Active'
    };

    const updatedClinics = [newClinic, ...clinics];
    setClinics(updatedClinics);
    localStorage.setItem('clinipulse_clinics', JSON.stringify(updatedClinics));

    if (setDoctors) {
      setDoctors((prev) => {
        const updatedDocs = [leadDoctor, ...prev];
        localStorage.setItem('clinipulse_doctors', JSON.stringify(updatedDocs));
        return updatedDocs;
      });
    }

    showToast(`🎉 Clinic "${newClinic.name}" registered and provisioned on ${newClinic.subscriptionPlanId.toUpperCase()} plan!`, 'success');
    setIsProvisionModalOpen(false);
    setSearchQuery('');
  };

  const filteredClinics = clinics.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChangeConfirm = () => {
    if (!statusModal.clinic || !statusModal.targetStatus) return;

    const updated = clinics.map((c) =>
      c.id === statusModal.clinic.id ? { ...c, status: statusModal.targetStatus } : c
    );

    setClinics(updated);
    localStorage.setItem('clinipulse_clinics', JSON.stringify(updated));

    showToast(`Clinic ${statusModal.clinic.name} updated to ${statusModal.targetStatus}`);
    setStatusModal({ isOpen: false, clinic: null, targetStatus: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Tenant Directory</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Clinic Tenant Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervise all multi-tenant healthcare clinics, active trials, branch allocations, and operational statuses.
          </p>
        </div>

        {/* Action Button: Opens In-App Clinic Registration Modal */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setFormData(initialFormState);
              setFormErrors({});
              setIsProvisionModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Provision New Clinic</span>
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinic by name, owner doctor, specialty, or city..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by clinic account status"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700 font-medium"
            >
              <option value="All">All Statuses ({clinics.length})</option>
              <option value="Active">Active Accounts</option>
              <option value="Trial">14-Day Free Trials</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Clinics Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Clinic Name</th>
                <th className="p-3.5">Specialty</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Branches</th>
                <th className="p-3.5">SaaS Plan</th>
                <th className="p-3.5">Trial Expiry</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClinics.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.city} · {c.address}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {c.specialty}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{c.ownerName}</div>
                    <div className="text-[10px] text-slate-400">{c.email}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
                    {c.branches?.length || 1}
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {c.subscriptionPlanId}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                    {c.isTrial ? '14 Days Demo' : 'Subscribed'}
                  </td>
                  <td className="p-3.5">
                    <Badge variant={c.status}>{c.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClinic(c)}
                      >
                        Details
                      </Button>

                      {c.status === 'Active' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-rose-600 hover:bg-rose-50 border-rose-200"
                          onClick={() =>
                            setStatusModal({ isOpen: true, clinic: c, targetStatus: 'Suspended' })
                          }
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-700 hover:bg-blue-50 border-blue-200"
                          onClick={() =>
                            setStatusModal({ isOpen: true, clinic: c, targetStatus: 'Active' })
                          }
                        >
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredClinics.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 text-xs">
                    No clinics match your search criteria. Click "+ Provision New Clinic" to register one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL: PROVISION & REGISTER NEW CLINIC */}
      {isProvisionModalOpen && (
        <Modal
          isOpen={isProvisionModalOpen}
          onClose={() => setIsProvisionModalOpen(false)}
          title="Register & Provision New Clinic Tenant"
          size="lg"
        >
          <form onSubmit={handleRegisterClinic} className="space-y-4 text-xs">
            {/* Quick Prefill Bar */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-950 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Quick Prefill Demo Clinic Template:
                </span>
                <span className="text-[10px] text-blue-700 font-medium">1-Click Auto-Populate</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('cardiology')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 shadow-2xs transition-colors cursor-pointer"
                >
                  Cardiology Center (Zenith)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('dental')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 shadow-2xs transition-colors cursor-pointer"
                >
                  Dental Studio (SmileCraft)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('pediatrics')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 shadow-2xs transition-colors cursor-pointer"
                >
                  Pediatric Clinic (LittleSteps)
                </button>
              </div>
            </div>

            {/* Section 1: Establishment Identity */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5 text-xs">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                1. Clinic Establishment Identity
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-slate-700 block">
                    Clinic Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Zenith Advanced Heart & Wellness Clinic"
                    className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      formErrors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {formErrors.name && <p className="text-[10px] text-red-600 font-medium">{formErrors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Primary Specialty</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dental">Dental & Orthodontics</option>
                    <option value="Dermatology">Dermatology & Cosmetology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Orthopedics">Orthopedics & Sports Medicine</option>
                    <option value="Pediatrics">Pediatrics & Neonatology</option>
                    <option value="ENT">ENT & Head-Neck</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Psychiatry">Psychiatry & Behavioral Health</option>
                    <option value="Gynecology">Gynecology & Obstetrics</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Clinic Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Premier Cardiovascular Diagnostic Center"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Clinical Leadership & Contact */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5 text-xs">
                <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                2. Clinical Leadership & Administration
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    Chief Administrator / Lead Doctor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Patel, MBBS, MD"
                    className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      formErrors.ownerName ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {formErrors.ownerName && <p className="text-[10px] text-red-600 font-medium">{formErrors.ownerName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Doctor Qualifications</label>
                  <input
                    type="text"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    placeholder="e.g. MBBS, MD, DM (Cardiology)"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    Official Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. admin@zenithheart.demo"
                    className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      formErrors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {formErrors.email && <p className="text-[10px] text-red-600 font-medium">{formErrors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98201 88990"
                    className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      formErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {formErrors.phone && <p className="text-[10px] text-red-600 font-medium">{formErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Primary Branch Location */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                3. Primary Branch Location
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      formErrors.city ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-slate-700 block">
                    Full Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Plot 42, Bandra Reclamation, Near Lilavati Hub"
                    className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      formErrors.address ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Branch Code</label>
                  <input
                    type="text"
                    value={formData.branchCode}
                    onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                    placeholder="e.g. MAIN"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-slate-700 block">Operating Hours</label>
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                    placeholder="e.g. Mon - Sat: 08:30 AM - 08:00 PM"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: SaaS Subscription & Commercial Terms */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5 text-xs">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                4. SaaS Subscription Plan & Account Status
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">SaaS Plan Tier</label>
                  <select
                    value={formData.subscriptionPlanId}
                    onChange={(e) => setFormData({ ...formData, subscriptionPlanId: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="starter">Starter Clinic (₹2,499/mo)</option>
                    <option value="growth">Growth Practice (₹4,499/mo)</option>
                    <option value="professional">Professional Multi-Specialty (₹7,999/mo)</option>
                    <option value="enterprise">Enterprise Healthcare (₹16,999/mo)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Active">Active (Paid Account)</option>
                    <option value="Trial">14-Day Free Demo Trial</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    min="100"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: parseInt(e.target.value) || 500 })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-bold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Clinic and its chief doctor will be instantly provisioned.
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsProvisionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Provision Clinic Tenant
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Clinic Details Drawer / Modal */}
      {selectedClinic && (
        <Modal
          isOpen={!!selectedClinic}
          onClose={() => setSelectedClinic(null)}
          title={`Clinic Tenant: ${selectedClinic.name}`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Specialty:</span>
                <p className="font-bold text-slate-900">{selectedClinic.specialty}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Administrator:</span>
                <p className="font-bold text-slate-900">{selectedClinic.ownerName}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Contact Email:</span>
                <p className="font-bold text-slate-900">{selectedClinic.email}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Phone:</span>
                <p className="font-bold text-slate-900">{selectedClinic.phone}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">Configured Branches ({selectedClinic.branches?.length || 1})</h4>
              <div className="space-y-2">
                {selectedClinic.branches?.map((b) => (
                  <div key={b.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{b.name} ({b.code})</p>
                      <p className="text-[11px] text-slate-500">{b.address}, {b.city}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {b.operatingHours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link to={`/clinics/${selectedClinic.slug}`} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                Open Public Profile <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Button variant="outline" size="sm" onClick={() => setSelectedClinic(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Status Confirmation Modal */}
      {statusModal.isOpen && (
        <Modal
          isOpen={statusModal.isOpen}
          onClose={() => setStatusModal({ isOpen: false, clinic: null, targetStatus: '' })}
          title={`Confirm Status Change: ${statusModal.targetStatus}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to change the status of <strong>{statusModal.clinic?.name}</strong> to{' '}
              <strong className="text-slate-900">{statusModal.targetStatus}</strong>?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusModal({ isOpen: false, clinic: null, targetStatus: '' })}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleStatusChangeConfirm}>
                Confirm Change
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
