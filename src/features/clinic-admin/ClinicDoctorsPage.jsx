import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { doctorService } from '../../services/doctorService';
import {
  Stethoscope,
  PlusCircle,
  Clock,
  Calendar,
  Mail,
  Phone,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Award,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  UserCheck,
  ShieldAlert,
  Activity,
  FileText
} from 'lucide-react';

export function ClinicDoctorsPage() {
  const { doctors, appointments, activeClinic, addDoctor, updateDoctor, toggleDoctorStatus, deleteDoctor, showToast } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isViewEditModalOpen, setIsViewEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteTargetDoctor, setDeleteTargetDoctor] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form State for Add Doctor
  const [newDoctorForm, setNewDoctorForm] = useState({
    name: '',
    specialty: '',
    qualifications: '',
    registrationNumber: '',
    experienceYears: 5,
    consultationFee: 800,
    email: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    workingHours: '09:00 AM - 05:00 PM',
    appointmentDurationMinutes: 30,
    breaks: '01:00 PM - 02:00 PM',
    branchIds: [activeClinic?.branches?.[0]?.id || ''],
    status: 'Active',
    bio: ''
  });

  // Edit Doctor Form State
  const [editDoctorForm, setEditDoctorForm] = useState(null);

  // Clinic doctors filtered by active clinic
  const clinicDoctors = useMemo(() => {
    return doctors.filter((d) => d.clinicId === activeClinic.id);
  }, [doctors, activeClinic.id]);

  // Unique specialties for filter dropdown
  const specialties = useMemo(() => {
    const set = new Set(clinicDoctors.map((d) => d.specialty).filter(Boolean));
    return Array.from(set);
  }, [clinicDoctors]);

  // Filtered & Sorted Doctors
  const filteredDoctors = useMemo(() => {
    let result = clinicDoctors.filter((doc) => {
      const matchSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.doctorIdNumber && doc.doctorIdNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (doc.registrationNumber && doc.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchSpecialty = selectedSpecialty === 'ALL' || doc.specialty === selectedSpecialty;
      const matchBranch = selectedBranch === 'ALL' || doc.branchIds.includes(selectedBranch);
      const matchStatus = selectedStatus === 'ALL' || (doc.status || 'Active') === selectedStatus;

      return matchSearch && matchSpecialty && matchBranch && matchStatus;
    });

    result.sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      if (sortBy === 'fee_low') return a.consultationFee - b.consultationFee;
      if (sortBy === 'fee_high') return b.consultationFee - a.consultationFee;
      if (sortBy === 'exp_high') return (b.experienceYears || 0) - (a.experienceYears || 0);
      return 0;
    });

    return result;
  }, [clinicDoctors, searchTerm, selectedSpecialty, selectedBranch, selectedStatus, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDoctors.length / pageSize) || 1;
  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDoctors.slice(start, start + pageSize);
  }, [filteredDoctors, currentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('ALL');
    setSelectedBranch('ALL');
    setSelectedStatus('ALL');
    setSortBy('name_asc');
    setCurrentPage(1);
  };

  // Open View/Edit Modal
  const handleOpenViewEdit = (doctor, tab = 'overview') => {
    setSelectedDoctor(doctor);
    setEditDoctorForm({
      name: doctor.name,
      specialty: doctor.specialty,
      qualifications: doctor.qualifications,
      registrationNumber: doctor.registrationNumber,
      experienceYears: doctor.experienceYears || 0,
      consultationFee: doctor.consultationFee || 0,
      email: doctor.email,
      phone: doctor.phone,
      avatar: doctor.avatar,
      availableDays: doctor.availableDays || [],
      workingHours: doctor.workingHours || '',
      appointmentDurationMinutes: doctor.appointmentDurationMinutes || 30,
      breaks: doctor.breaks || '',
      branchIds: doctor.branchIds || [],
      status: doctor.status || 'Active',
      bio: doctor.bio || ''
    });
    setActiveTab(tab);
    setIsViewEditModalOpen(true);
  };

  // Save Doctor Edits
  const handleSaveDoctorEdits = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !editDoctorForm) return;

    if (!editDoctorForm.name.trim() || !editDoctorForm.email.trim()) {
      showToast('Doctor name and email are required fields', 'error');
      return;
    }

    updateDoctor(selectedDoctor.id, editDoctorForm);
    setSelectedDoctor({ ...selectedDoctor, ...editDoctorForm });
    showToast(`Dr. ${editDoctorForm.name}'s profile updated successfully.`);
    setIsViewEditModalOpen(false);
  };

  // Handle Add Doctor Submit
  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    if (!newDoctorForm.name.trim() || !newDoctorForm.email.trim() || !newDoctorForm.specialty.trim()) {
      showToast('Please fill all mandatory fields (Name, Email, Specialty)', 'error');
      return;
    }

    addDoctor(newDoctorForm);
    setIsAddModalOpen(false);
    // Reset form
    setNewDoctorForm({
      name: '',
      specialty: '',
      qualifications: '',
      registrationNumber: '',
      experienceYears: 5,
      consultationFee: 800,
      email: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      workingHours: '09:00 AM - 05:00 PM',
      appointmentDurationMinutes: 30,
      breaks: '01:00 PM - 02:00 PM',
      branchIds: [activeClinic?.branches?.[0]?.id || ''],
      status: 'Active',
      bio: ''
    });
  };

  // Handle Delete Click with Safety Check
  const handleDeleteClick = (doctor) => {
    setDeleteTargetDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  // Doctor's active appointments for safety check
  const deleteSafetyInfo = useMemo(() => {
    if (!deleteTargetDoctor) return { hasUpcoming: false, count: 0, activeAppointments: [] };
    return doctorService.checkDoctorAppointments(deleteTargetDoctor.id, appointments);
  }, [deleteTargetDoctor, appointments]);

  const confirmDeleteDoctor = () => {
    if (!deleteTargetDoctor) return;
    const res = deleteDoctor(deleteTargetDoctor.id);
    if (res.success) {
      setIsDeleteModalOpen(false);
      setDeleteTargetDoctor(null);
    }
  };

  const handleDeactivateInstead = () => {
    if (!deleteTargetDoctor) return;
    toggleDoctorStatus(deleteTargetDoctor.id, 'Inactive');
    setIsDeleteModalOpen(false);
    setDeleteTargetDoctor(null);
    showToast(`Dr. ${deleteTargetDoctor.name} has been deactivated. Historical records and scheduled slots preserved.`, 'info');
  };

  // Appointments linked to the currently viewed doctor
  const doctorAppointments = useMemo(() => {
    if (!selectedDoctor) return [];
<<<<<<< HEAD
    return appointments.filter((a) => a.doctorId === selectedDoctor.id);
  }, [selectedDoctor, appointments]);
=======
    return appointments.filter((a) => a.doctorId === selectedDoctor.id && a.clinicId === activeClinic?.id);
  }, [selectedDoctor, appointments, activeClinic?.id]);
>>>>>>> origin/main

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Clinical Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Doctor & Specialist Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Clinical Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Doctor & Specialist Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Manage practicing clinicians, medical registration council numbers, working days, and consultation fees for <strong>{activeClinic.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => doctorService.exportToCSV(filteredDoctors)}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Doctor
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
<<<<<<< HEAD
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
=======
      <Card className="p-4 border-slate-200 bg-white space-y-3">
>>>>>>> origin/main
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, specialty, reg no., ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
<<<<<<< HEAD
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-blue-500 bg-slate-50/50"
>>>>>>> origin/main
            />
          </div>

          {/* Specialty Filter */}
          <div>
            <select
              value={selectedSpecialty}
              onChange={(e) => {
                setSelectedSpecialty(e.target.value);
                setCurrentPage(1);
              }}
<<<<<<< HEAD
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
=======
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
>>>>>>> origin/main
            >
              <option value="ALL">All Specialties</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Branch Filter */}
          <div>
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setCurrentPage(1);
              }}
<<<<<<< HEAD
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
=======
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
>>>>>>> origin/main
            >
              <option value="ALL">All Branches</option>
              {activeClinic.branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
<<<<<<< HEAD
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
=======
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
>>>>>>> origin/main
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
              <option value="Invitation Pending">Invitation Pending</option>
            </select>
          </div>
        </div>

        {/* Secondary controls row */}
<<<<<<< HEAD
        <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
=======
        <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-2 text-slate-500">
>>>>>>> origin/main
            <span>
              Showing <strong>{filteredDoctors.length}</strong> doctor{filteredDoctors.length === 1 ? '' : 's'}
            </span>
            {(searchTerm || selectedSpecialty !== 'ALL' || selectedBranch !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                onClick={handleResetFilters}
<<<<<<< HEAD
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium ml-2 cursor-pointer"
=======
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium ml-2 cursor-pointer"
>>>>>>> origin/main
              >
                <RotateCcw className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <span className="text-slate-400 dark:text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-blue-500"
=======
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-blue-500"
>>>>>>> origin/main
            >
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="fee_low">Consultation Fee (Low-High)</option>
              <option value="fee_high">Consultation Fee (High-Low)</option>
              <option value="exp_high">Experience (Highest First)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Doctor Listing: Desktop Table & Mobile Cards */}
      {filteredDoctors.length === 0 ? (
<<<<<<< HEAD
        <Card className="p-12 text-center border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">No doctors match your criteria</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
=======
        <Card className="p-12 text-center border-slate-200 bg-white">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No doctors match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
>>>>>>> origin/main
            Try adjusting your search keywords, clearing status filters, or onboard a new clinician to your practice.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
              Add Doctor
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
<<<<<<< HEAD
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="px-3.5 py-3.5 text-center w-12">#</th>
=======
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
>>>>>>> origin/main
                  <th className="px-4 py-3.5">Doctor & Specialty</th>
                  <th className="px-4 py-3.5">Reg. Number</th>
                  <th className="px-4 py-3.5">Assigned Branches</th>
                  <th className="px-4 py-3.5">Fee & Duration</th>
                  <th className="px-4 py-3.5">Working Days</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
<<<<<<< HEAD
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedDoctors.map((doc, idx) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-3.5 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
=======
              <tbody className="divide-y divide-slate-100">
                {paginatedDoctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
>>>>>>> origin/main
                    {/* Doctor Info */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
<<<<<<< HEAD
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer" onClick={() => handleOpenViewEdit(doc, 'overview')}>
                              {doc.name}
                            </span>
                            <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                              {doc.doctorIdNumber || 'DOC'}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">{doc.specialty}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">{doc.qualifications}</p>
=======
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs hover:text-blue-700 cursor-pointer" onClick={() => handleOpenViewEdit(doc, 'overview')}>
                              {doc.name}
                            </span>
                            <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {doc.doctorIdNumber || 'DOC'}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-blue-700">{doc.specialty}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{doc.qualifications}</p>
>>>>>>> origin/main
                        </div>
                      </div>
                    </td>

                    {/* Reg Number */}
                    <td className="px-4 py-3.5">
<<<<<<< HEAD
                      <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">{doc.registrationNumber || 'N/A'}</span>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{doc.experienceYears || 5} yrs experience</p>
=======
                      <span className="font-mono text-slate-700 text-xs">{doc.registrationNumber || 'N/A'}</span>
                      <p className="text-[10px] text-slate-400">{doc.experienceYears || 5} yrs experience</p>
>>>>>>> origin/main
                    </td>

                    {/* Assigned Branches */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {doc.branchIds.map((bId) => {
                          const branch = activeClinic.branches.find((b) => b.id === bId);
                          return (
<<<<<<< HEAD
                            <span key={bId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              <Building2 className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
=======
                            <span key={bId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 border border-slate-200">
                              <Building2 className="w-2.5 h-2.5 text-blue-600" />
>>>>>>> origin/main
                              {branch?.name || bId}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* Fee & Duration */}
                    <td className="px-4 py-3.5">
<<<<<<< HEAD
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                        ₹{(doc.consultationFee || 0).toLocaleString('en-IN')}
                      </span>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{doc.appointmentDurationMinutes || 30} mins slot</p>
=======
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        ₹{(doc.consultationFee || 0).toLocaleString('en-IN')}
                      </span>
                      <p className="text-[10px] text-slate-400">{doc.appointmentDurationMinutes || 30} mins slot</p>
>>>>>>> origin/main
                    </td>

                    {/* Working Days */}
                    <td className="px-4 py-3.5">
<<<<<<< HEAD
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {(doc.availableDays || []).join(', ')}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">{doc.workingHours}</p>
=======
                      <p className="text-xs text-slate-700 font-medium">
                        {(doc.availableDays || []).join(', ')}
                      </p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{doc.workingHours}</p>
>>>>>>> origin/main
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <Badge variant={doc.status || 'Active'}>
                        {doc.status || 'Active'}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenViewEdit(doc, 'overview')}
                          title="View Profile & Roster"
<<<<<<< HEAD
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
=======
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
>>>>>>> origin/main
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenViewEdit(doc, 'professional')}
                          title="Edit Details"
<<<<<<< HEAD
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
=======
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
>>>>>>> origin/main
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(doc)}
                          title="Remove Doctor"
<<<<<<< HEAD
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
=======
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
>>>>>>> origin/main
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (Shown on small screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
            {paginatedDoctors.map((doc) => (
<<<<<<< HEAD
              <Card key={doc.id} className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
=======
              <Card key={doc.id} className="p-4 border-slate-200 bg-white space-y-3">
>>>>>>> origin/main
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
<<<<<<< HEAD
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{doc.name}</h3>
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">{doc.specialty}</p>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{doc.doctorIdNumber || 'DOC'}</span>
=======
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{doc.name}</h3>
                      <p className="text-xs font-semibold text-blue-700">{doc.specialty}</p>
                      <span className="text-[10px] font-mono text-slate-400">{doc.doctorIdNumber || 'DOC'}</span>
>>>>>>> origin/main
                    </div>
                  </div>
                  <Badge variant={doc.status || 'Active'}>{doc.status || 'Active'}</Badge>
                </div>

<<<<<<< HEAD
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Reg. No:</span>
                    <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{doc.registrationNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Consultation Fee:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">₹{(doc.consultationFee || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Available Days:</span>
                    <span className="text-slate-800 dark:text-slate-200">{(doc.availableDays || []).join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Branches: {doc.branchIds.length}</span>
=======
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Reg. No:</span>
                    <span className="font-mono font-medium text-slate-800">{doc.registrationNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Consultation Fee:</span>
                    <span className="font-mono font-bold text-slate-900">₹{(doc.consultationFee || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Available Days:</span>
                    <span className="text-slate-800">{(doc.availableDays || []).join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">Branches: {doc.branchIds.length}</span>
>>>>>>> origin/main
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="xs" onClick={() => handleOpenViewEdit(doc, 'overview')}>
                      View / Edit
                    </Button>
                    <button
                      onClick={() => handleDeleteClick(doc)}
<<<<<<< HEAD
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
=======
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
>>>>>>> origin/main
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
<<<<<<< HEAD
            <div className="flex items-center justify-between px-2 py-3 text-xs text-slate-500 dark:text-slate-400">
=======
            <div className="flex items-center justify-between px-2 py-3 text-xs text-slate-500">
>>>>>>> origin/main
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* ADD DOCTOR MODAL */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Onboard Consulting Doctor"
          size="lg"
        >
          <form onSubmit={handleAddDoctorSubmit} className="space-y-4 text-xs">
<<<<<<< HEAD
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl text-blue-800 dark:text-blue-300 flex items-start gap-2.5">
              <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Licensed Practitioner Onboarding</p>
                <p className="text-[11px] text-blue-700 dark:text-blue-300">
=======
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 flex items-start gap-2.5">
              <Stethoscope className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Licensed Practitioner Onboarding</p>
                <p className="text-[11px] text-blue-700">
>>>>>>> origin/main
                  Fill in clinical qualification credentials, medical council registration, roster days, and consulting fee.
                </p>
              </div>
            </div>

            {/* Section 1: Personal Details */}
<<<<<<< HEAD
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">1. Personal Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Doctor Full Name *</label>
=======
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">1. Personal Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Doctor Full Name *</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    required
                    placeholder="Dr. Rajesh Mehra, MDS"
                    value={newDoctorForm.name}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, name: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address (Login ID) *</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email Address (Login ID) *</label>
>>>>>>> origin/main
                  <input
                    type="email"
                    required
                    placeholder="rajesh.mehra@clinic.demo"
                    value={newDoctorForm.email}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, email: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    placeholder="+91 98201 00000"
                    value={newDoctorForm.phone}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, phone: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Profile Photo URL</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Profile Photo URL</label>
>>>>>>> origin/main
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newDoctorForm.avatar}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, avatar: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
>>>>>>> origin/main
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Professional Details */}
<<<<<<< HEAD
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">2. Professional Credentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Clinical Specialty *</label>
=======
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">2. Professional Credentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Clinical Specialty *</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oral & Maxillofacial Surgery"
                    value={newDoctorForm.specialty}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, specialty: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Academic Qualifications</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Academic Qualifications</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    placeholder="BDS, MDS, FICOI"
                    value={newDoctorForm.qualifications}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, qualifications: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">State Medical/Dental Council Reg. No</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">State Medical/Dental Council Reg. No</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    placeholder="e.g. MDC-2018-09121"
                    value={newDoctorForm.registrationNumber}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, registrationNumber: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Years of Practice Experience</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Years of Practice Experience</label>
>>>>>>> origin/main
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={newDoctorForm.experienceYears}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, experienceYears: Number(e.target.value) })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Professional Biography</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Professional Biography</label>
>>>>>>> origin/main
                  <textarea
                    rows={2}
                    placeholder="Special interests, clinical achievements, patient care philosophy..."
                    value={newDoctorForm.bio}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, bio: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
>>>>>>> origin/main
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Clinic Assignment & Schedule */}
<<<<<<< HEAD
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">3. Roster & Consultation Fee</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Consultation Fee (₹ INR) *</label>
=======
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">3. Roster & Consultation Fee</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Consultation Fee (₹ INR) *</label>
>>>>>>> origin/main
                  <input
                    type="number"
                    required
                    min="0"
                    step="50"
                    value={newDoctorForm.consultationFee}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, consultationFee: Number(e.target.value) })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Slot Duration</label>
                  <select
                    value={newDoctorForm.appointmentDurationMinutes}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, appointmentDurationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Slot Duration</label>
                  <select
                    value={newDoctorForm.appointmentDurationMinutes}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, appointmentDurationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
>>>>>>> origin/main
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                  </select>
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Initial Account Status</label>
                  <select
                    value={newDoctorForm.status}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                  <label className="block font-medium text-slate-700 mb-1">Initial Account Status</label>
                  <select
                    value={newDoctorForm.status}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
>>>>>>> origin/main
                  >
                    <option value="Active">Active</option>
                    <option value="Invitation Pending">Invitation Pending</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Assigned Clinic Branches</label>
                <div className="flex flex-wrap gap-2">
                  {activeClinic.branches.map((b) => (
                    <label key={b.id} className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
=======
                <label className="block font-medium text-slate-700 mb-1">Assigned Clinic Branches</label>
                <div className="flex flex-wrap gap-2">
                  {activeClinic.branches.map((b) => (
                    <label key={b.id} className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50">
>>>>>>> origin/main
                      <input
                        type="checkbox"
                        checked={newDoctorForm.branchIds.includes(b.id)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...newDoctorForm.branchIds, b.id]
                            : newDoctorForm.branchIds.filter((id) => id !== b.id);
                          setNewDoctorForm({ ...newDoctorForm, branchIds: updated });
                        }}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <label key={day} className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
=======
                <label className="block font-medium text-slate-700 mb-1">Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <label key={day} className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50">
>>>>>>> origin/main
                      <input
                        type="checkbox"
                        checked={newDoctorForm.availableDays.includes(day)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...newDoctorForm.availableDays, day]
                            : newDoctorForm.availableDays.filter((d) => d !== day);
                          setNewDoctorForm({ ...newDoctorForm, availableDays: updated });
                        }}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Onboard Doctor
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* VIEW & EDIT DOCTOR MULTI-TAB MODAL */}
      {/* ========================================================================= */}
      {isViewEditModalOpen && selectedDoctor && editDoctorForm && (
        <Modal
          isOpen={isViewEditModalOpen}
          onClose={() => setIsViewEditModalOpen(false)}
          title={`Doctor Profile: ${selectedDoctor.name}`}
          size="xl"
        >
          <div className="space-y-4">
            {/* Header info badge */}
<<<<<<< HEAD
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <img
                src={editDoctorForm.avatar || selectedDoctor.avatar}
                alt={selectedDoctor.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{selectedDoctor.name}</h3>
                  <Badge variant={editDoctorForm.status}>{editDoctorForm.status}</Badge>
                </div>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">{selectedDoctor.specialty}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
=======
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={editDoctorForm.avatar || selectedDoctor.avatar}
                alt={selectedDoctor.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 truncate">{selectedDoctor.name}</h3>
                  <Badge variant={editDoctorForm.status}>{editDoctorForm.status}</Badge>
                </div>
                <p className="text-xs font-semibold text-blue-700">{selectedDoctor.specialty}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
>>>>>>> origin/main
                  <span className="font-mono">ID: {selectedDoctor.doctorIdNumber || selectedDoctor.id}</span>
                  <span>•</span>
                  <span>Reg: {selectedDoctor.registrationNumber || 'Pending'}</span>
                </div>
              </div>

              {/* Quick Status Selector */}
              <div className="shrink-0 text-right">
<<<<<<< HEAD
                <label className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold mb-1">Status</label>
=======
                <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Status</label>
>>>>>>> origin/main
                <select
                  value={editDoctorForm.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setEditDoctorForm({ ...editDoctorForm, status: newStatus });
                  }}
<<<<<<< HEAD
                  className="px-2.5 py-1 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-blue-500 font-medium"
=======
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-blue-500 font-medium"
>>>>>>> origin/main
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Invitation Pending">Invitation Pending</option>
                </select>
              </div>
            </div>

            {/* Navigation Tabs */}
<<<<<<< HEAD
            <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-medium space-x-1 overflow-x-auto">
=======
            <div className="flex border-b border-slate-200 text-xs font-medium space-x-1 overflow-x-auto">
>>>>>>> origin/main
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'professional', label: 'Professional Details' },
                { id: 'schedule', label: 'Schedule & Roster' },
                { id: 'branches', label: 'Assigned Branches' },
                { id: 'appointments', label: `Appointments (${doctorAppointments.length})` },
                { id: 'activity', label: 'Activity History' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
<<<<<<< HEAD
                      ? 'border-blue-600 text-blue-700 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
=======
                      ? 'border-blue-600 text-blue-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
>>>>>>> origin/main
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <form onSubmit={handleSaveDoctorEdits} className="text-xs space-y-4">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
<<<<<<< HEAD
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Consultation Fee</span>
                      <p className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5">₹{(editDoctorForm.consultationFee || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Slot Duration</span>
                      <p className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5">{editDoctorForm.appointmentDurationMinutes || 30} mins</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Experience</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{editDoctorForm.experienceYears || 0} Years</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Bookings</span>
                      <p className="text-sm font-bold font-mono text-blue-700 dark:text-blue-400 mt-0.5">
=======
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Consultation Fee</span>
                      <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">₹{(editDoctorForm.consultationFee || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Slot Duration</span>
                      <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">{editDoctorForm.appointmentDurationMinutes || 30} mins</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Experience</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{editDoctorForm.experienceYears || 0} Years</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Bookings</span>
                      <p className="text-sm font-bold font-mono text-blue-700 mt-0.5">
>>>>>>> origin/main
                        {doctorAppointments.filter((a) => !['Cancelled', 'Completed', 'No-show'].includes(a.status)).length} slots
                      </p>
                    </div>
                  </div>

<<<<<<< HEAD
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                    <h4 className="font-bold text-slate-800 dark:text-white">Biography & Background</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
=======
                  <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-2">
                    <h4 className="font-bold text-slate-800">Biography & Background</h4>
                    <p className="text-slate-600 leading-relaxed text-xs">
>>>>>>> origin/main
                      {editDoctorForm.bio || 'No biography recorded for this practitioner yet.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<<<<<<< HEAD
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                      <h4 className="font-bold text-slate-800 dark:text-white">Contact Details</h4>
                      <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {editDoctorForm.email}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {editDoctorForm.phone || 'N/A'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                      <h4 className="font-bold text-slate-800 dark:text-white">Roster Summary</h4>
                      <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Days: {editDoctorForm.availableDays.join(', ')}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Hours: {editDoctorForm.workingHours}
=======
                    <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                      <h4 className="font-bold text-slate-800">Contact Details</h4>
                      <p className="text-slate-600 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-blue-600" /> {editDoctorForm.email}
                      </p>
                      <p className="text-slate-600 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-blue-600" /> {editDoctorForm.phone || 'N/A'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                      <h4 className="font-bold text-slate-800">Roster Summary</h4>
                      <p className="text-slate-600 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" /> Days: {editDoctorForm.availableDays.join(', ')}
                      </p>
                      <p className="text-slate-600 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> Hours: {editDoctorForm.workingHours}
>>>>>>> origin/main
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROFESSIONAL DETAILS */}
              {activeTab === 'professional' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
<<<<<<< HEAD
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
=======
                    <label className="block font-medium text-slate-700 mb-1">Full Name</label>
>>>>>>> origin/main
                    <input
                      type="text"
                      value={editDoctorForm.name}
                      onChange={(e) => setEditDoctorForm({ ...editDoctorForm, name: e.target.value })}
<<<<<<< HEAD
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Specialty</label>
=======
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Specialty</label>
>>>>>>> origin/main
                    <input
                      type="text"
                      value={editDoctorForm.specialty}
                      onChange={(e) => setEditDoctorForm({ ...editDoctorForm, specialty: e.target.value })}
<<<<<<< HEAD
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Degrees & Qualifications</label>
=======
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Degrees & Qualifications</label>
>>>>>>> origin/main
                    <input
                      type="text"
                      value={editDoctorForm.qualifications}
                      onChange={(e) => setEditDoctorForm({ ...editDoctorForm, qualifications: e.target.value })}
<<<<<<< HEAD
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">State Council Reg. Number</label>
=======
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">State Council Reg. Number</label>
>>>>>>> origin/main
                    <input
                      type="text"
                      value={editDoctorForm.registrationNumber}
                      onChange={(e) => setEditDoctorForm({ ...editDoctorForm, registrationNumber: e.target.value })}
<<<<<<< HEAD
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Years of Practice Experience</label>
=======
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Years of Practice Experience</label>
>>>>>>> origin/main
                    <input
                      type="number"
                      value={editDoctorForm.experienceYears}
                      onChange={(e) => setEditDoctorForm({ ...editDoctorForm, experienceYears: Number(e.target.value) })}
<<<<<<< HEAD
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Consultation Fee (INR)</label>
=======
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Consultation Fee (INR)</label>
>>>>>>> origin/main
                    <input
                      type="number"
                      value={editDoctorForm.consultationFee}
                      onChange={(e) => setEditDoctorForm({ ...editDoctorForm, consultationFee: Number(e.target.value) })}
<<<<<<< HEAD
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Biography</label>
=======
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-700 mb-1">Biography</label>
>>>>>>> origin/main
                    <textarea
                      rows={3}
                      value={editDoctorForm.bio}
                      onChange={(e) => setEditDoctorForm({ ...editDoctorForm, bio: e.target.value })}
<<<<<<< HEAD
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
>>>>>>> origin/main
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: SCHEDULE & ROSTER */}
              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
<<<<<<< HEAD
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Working Hours</label>
=======
                      <label className="block font-medium text-slate-700 mb-1">Working Hours</label>
>>>>>>> origin/main
                      <input
                        type="text"
                        value={editDoctorForm.workingHours}
                        onChange={(e) => setEditDoctorForm({ ...editDoctorForm, workingHours: e.target.value })}
<<<<<<< HEAD
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
>>>>>>> origin/main
                        placeholder="e.g. 09:30 AM - 01:30 PM, 04:30 PM - 07:30 PM"
                      />
                    </div>
                    <div>
<<<<<<< HEAD
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Daily Breaks & Lunch</label>
=======
                      <label className="block font-medium text-slate-700 mb-1">Daily Breaks & Lunch</label>
>>>>>>> origin/main
                      <input
                        type="text"
                        value={editDoctorForm.breaks || ''}
                        onChange={(e) => setEditDoctorForm({ ...editDoctorForm, breaks: e.target.value })}
<<<<<<< HEAD
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
>>>>>>> origin/main
                        placeholder="e.g. 01:30 PM - 03:00 PM"
                      />
                    </div>
                    <div>
<<<<<<< HEAD
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Appointment Slot Duration</label>
                      <select
                        value={editDoctorForm.appointmentDurationMinutes}
                        onChange={(e) => setEditDoctorForm({ ...editDoctorForm, appointmentDurationMinutes: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-blue-500"
=======
                      <label className="block font-medium text-slate-700 mb-1">Appointment Slot Duration</label>
                      <select
                        value={editDoctorForm.appointmentDurationMinutes}
                        onChange={(e) => setEditDoctorForm({ ...editDoctorForm, appointmentDurationMinutes: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
>>>>>>> origin/main
                      >
                        <option value={15}>15 Minutes</option>
                        <option value={30}>30 Minutes</option>
                        <option value={45}>45 Minutes</option>
                        <option value={60}>60 Minutes</option>
                      </select>
                    </div>
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">Rostered Working Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <label key={day} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
=======
                    <label className="block font-medium text-slate-700 mb-1.5">Rostered Working Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <label key={day} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50">
>>>>>>> origin/main
                          <input
                            type="checkbox"
                            checked={editDoctorForm.availableDays.includes(day)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...editDoctorForm.availableDays, day]
                                : editDoctorForm.availableDays.filter((d) => d !== day);
                              setEditDoctorForm({ ...editDoctorForm, availableDays: updated });
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ASSIGNED BRANCHES */}
              {activeTab === 'branches' && (
                <div className="space-y-3">
<<<<<<< HEAD
                  <p className="text-slate-600 dark:text-slate-300">
=======
                  <p className="text-slate-600">
>>>>>>> origin/main
                    Assign which branches within <strong>{activeClinic.name}</strong> Dr. {selectedDoctor.name} accepts appointments at:
                  </p>
                  <div className="space-y-2">
                    {activeClinic.branches.map((b) => (
<<<<<<< HEAD
                      <label key={b.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
=======
                      <label key={b.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
>>>>>>> origin/main
                        <input
                          type="checkbox"
                          checked={editDoctorForm.branchIds.includes(b.id)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...editDoctorForm.branchIds, b.id]
                              : editDoctorForm.branchIds.filter((id) => id !== b.id);
                            setEditDoctorForm({ ...editDoctorForm, branchIds: updated });
                          }}
                          className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
<<<<<<< HEAD
                            <span className="font-bold text-slate-800 dark:text-white">{b.name}</span>
                            {b.isMain && <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 px-1.5 py-0.5 rounded font-semibold">Main Facility</span>}
                          </div>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">{b.address}, {b.city}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Operating Hours: {b.operatingHours}</p>
=======
                            <span className="font-bold text-slate-800">{b.name}</span>
                            {b.isMain && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-semibold">Main Facility</span>}
                          </div>
                          <p className="text-[11px] text-slate-400">{b.address}, {b.city}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Operating Hours: {b.operatingHours}</p>
>>>>>>> origin/main
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div className="space-y-3">
                  {doctorAppointments.length === 0 ? (
<<<<<<< HEAD
                    <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="font-bold text-slate-700 dark:text-slate-300">No appointments scheduled</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">This clinician has no active or past patient visits recorded in the system.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px]">
                          <tr>
                            <th className="p-2.5 text-center w-10 font-semibold">#</th>
=======
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100">
                      <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="font-bold text-slate-700">No appointments scheduled</p>
                      <p className="text-[11px] text-slate-400">This clinician has no active or past patient visits recorded in the system.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px]">
                          <tr>
>>>>>>> origin/main
                            <th className="p-2.5">Ref No</th>
                            <th className="p-2.5">Patient</th>
                            <th className="p-2.5">Service</th>
                            <th className="p-2.5">Date & Time</th>
                            <th className="p-2.5">Status</th>
                          </tr>
                        </thead>
<<<<<<< HEAD
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {doctorAppointments.map((apt, idx) => (
                            <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td className="p-2.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                              <td className="p-2.5 font-mono text-slate-700 dark:text-slate-300">{apt.referenceNumber}</td>
                              <td className="p-2.5 font-semibold text-slate-900 dark:text-white">{apt.patientName}</td>
                              <td className="p-2.5 text-slate-600 dark:text-slate-300">{apt.serviceName}</td>
                              <td className="p-2.5 text-slate-600 dark:text-slate-300">{apt.date} at {apt.time}</td>
=======
                        <tbody className="divide-y divide-slate-100">
                          {doctorAppointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-slate-50">
                              <td className="p-2.5 font-mono text-slate-700">{apt.referenceNumber}</td>
                              <td className="p-2.5 font-semibold text-slate-900">{apt.patientName}</td>
                              <td className="p-2.5 text-slate-600">{apt.serviceName}</td>
                              <td className="p-2.5 text-slate-600">{apt.date} at {apt.time}</td>
>>>>>>> origin/main
                              <td className="p-2.5">
                                <Badge variant={apt.status}>{apt.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: ACTIVITY HISTORY */}
              {activeTab === 'activity' && (
                <div className="space-y-2">
                  {(selectedDoctor.activityHistory || [
                    { id: '1', action: 'Doctor registered in clinic database', timestamp: selectedDoctor.createdAt || '2025-01-10', actor: 'System' }
                  ]).map((act) => (
<<<<<<< HEAD
                    <div key={act.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{act.action}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">By {act.actor} • {act.timestamp}</p>
=======
                    <div key={act.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">{act.action}</p>
                        <p className="text-[10px] text-slate-400">By {act.actor} • {act.timestamp}</p>
>>>>>>> origin/main
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Modal footer */}
<<<<<<< HEAD
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
=======
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
>>>>>>> origin/main
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(selectedDoctor)}
<<<<<<< HEAD
                  className="text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40 hover:bg-rose-50 dark:hover:bg-rose-950/20"
=======
                  className="text-rose-600 border-rose-200 hover:bg-rose-50"
>>>>>>> origin/main
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove Doctor
                </Button>

                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsViewEditModalOpen(false)}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* DELETE DOCTOR SAFETY CHECK MODAL */}
      {/* ========================================================================= */}
      {isDeleteModalOpen && deleteTargetDoctor && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Remove Doctor Profile"
          size="md"
        >
          <div className="space-y-4 text-xs">
            {deleteSafetyInfo.hasUpcoming ? (
              /* SAFETY WARNING: ACTIVE APPOINTMENTS EXIST */
              <div className="space-y-3">
<<<<<<< HEAD
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-200">Active Scheduled Appointments Detected</h4>
                    <p className="mt-0.5 text-amber-700 dark:text-amber-300">
=======
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900">Active Scheduled Appointments Detected</h4>
                    <p className="mt-0.5 text-amber-700">
>>>>>>> origin/main
                      Dr. <strong>{deleteTargetDoctor.name}</strong> currently has <strong>{deleteSafetyInfo.count}</strong> upcoming patient booking(s).
                    </p>
                  </div>
                </div>

<<<<<<< HEAD
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                  <p className="font-bold text-slate-800 dark:text-white">Linked Active Bookings:</p>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {deleteSafetyInfo.activeAppointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between text-[11px] p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{apt.patientName}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-mono">{apt.date} • {apt.time}</span>
=======
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <p className="font-bold text-slate-800">Linked Active Bookings:</p>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {deleteSafetyInfo.activeAppointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between text-[11px] p-1.5 rounded bg-white border border-slate-200">
                        <span className="font-medium text-slate-800">{apt.patientName}</span>
                        <span className="text-slate-500 font-mono">{apt.date} • {apt.time}</span>
>>>>>>> origin/main
                        <Badge variant={apt.status}>{apt.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

<<<<<<< HEAD
                <p className="text-slate-600 dark:text-slate-300">
                  Deleting this doctor would orphan these active bookings and affect clinical records. <strong>We strongly recommend deactivating this account instead</strong>, which preserves historical data and blocks new appointments.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
=======
                <p className="text-slate-600">
                  Deleting this doctor would orphan these active bookings and affect clinical records. <strong>We strongly recommend deactivating this account instead</strong>, which preserves historical data and blocks new appointments.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100">
>>>>>>> origin/main
                  <Button variant="outline" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleDeactivateInstead}>
                    <UserCheck className="w-3.5 h-3.5 mr-1" /> Deactivate Account Instead
                  </Button>
                </div>
              </div>
            ) : (
              /* SAFE TO DELETE */
              <div className="space-y-3">
<<<<<<< HEAD
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-rose-900 dark:text-rose-200">Confirm Doctor Removal</h4>
                    <p className="mt-0.5 text-rose-700 dark:text-rose-300">
=======
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-rose-900">Confirm Doctor Removal</h4>
                    <p className="mt-0.5 text-rose-700">
>>>>>>> origin/main
                      Are you sure you want to permanently remove Dr. <strong>{deleteTargetDoctor.name}</strong> from <strong>{activeClinic.name}</strong>?
                    </p>
                  </div>
                </div>

<<<<<<< HEAD
                <p className="text-slate-600 dark:text-slate-300">
                  No upcoming appointments were found for this doctor. This profile will be deleted from your clinic roster.
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
=======
                <p className="text-slate-600">
                  No upcoming appointments were found for this doctor. This profile will be deleted from your clinic roster.
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
>>>>>>> origin/main
                  <Button variant="outline" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger" size="sm" onClick={confirmDeleteDoctor}>
                    Confirm Deletion
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
