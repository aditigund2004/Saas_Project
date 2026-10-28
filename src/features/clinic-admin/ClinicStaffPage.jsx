import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MockAuthService } from '../../services/mockAuthService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  Send,
  Building2,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Stethoscope,
  Briefcase,
  Award,
  Filter,
  Check,
  X,
  ExternalLink,
  UserPlus,
  AlertTriangle,
  FileText,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ROLE_CONFIG = {
  doctor: {
    label: 'Doctor / Clinician',
    color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: Stethoscope,
    badgeVariant: 'primary'
  },
  receptionist: {
    label: 'Receptionist / Front Desk',
    color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    icon: UserCheck,
    badgeVariant: 'warning'
  },
  nurse: {
    label: 'Clinical Nurse',
    color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: Award,
    badgeVariant: 'success'
  },
  inventory: {
    label: 'Pharmacist / Inventory',
    color: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    icon: Briefcase,
    badgeVariant: 'info'
  },
  accountant: {
    label: 'Accountant / Billing',
    color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    icon: ShieldCheck,
    badgeVariant: 'warning'
  },
  admin: {
    label: 'Clinic Operations Manager',
    color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    icon: Shield,
    badgeVariant: 'primary'
  }
};

export function ClinicStaffPage() {
  const {
    staffMembers,
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    toggleStaffStatus,
    activeClinic,
    currentUser,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'doctor' | 'receptionist' | 'other' | 'invitations'
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Form state for adding/editing staff
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'doctor',
    department: 'General Medicine',
    branchId: activeClinic?.branches?.[0]?.id || 'branch-citycare-main',
    shift: '09:00 - 17:00',
    qualifications: '',
    registrationNumber: '',
    experienceYears: 5,
    consultationFee: 500,
    status: 'Active',
    notes: ''
  });

  // Invitations state
  const [invitations, setInvitations] = useState(() =>
    MockAuthService.getStaffInvitations(activeClinic?.id)
  );

  // Role counters
  const counts = useMemo(() => {
    const total = staffMembers.length;
    const doctors = staffMembers.filter((s) => s.role === 'doctor').length;
    const receptionists = staffMembers.filter((s) => s.role === 'receptionist').length;
    const others = staffMembers.filter((s) => s.role !== 'doctor' && s.role !== 'receptionist').length;
    const active = staffMembers.filter((s) => s.status === 'Active').length;
    return { total, doctors, receptionists, others, active };
  }, [staffMembers]);

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return staffMembers.filter((s) => {
      // Role tab filter
      if (activeTab === 'doctor' && s.role !== 'doctor') return false;
      if (activeTab === 'receptionist' && s.role !== 'receptionist') return false;
      if (activeTab === 'other' && (s.role === 'doctor' || s.role === 'receptionist')) return false;

      // Branch filter
      if (branchFilter !== 'all') {
        const matchesBranch = s.branchIds?.includes(branchFilter) || s.branchId === branchFilter;
        if (!matchesBranch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = s.name?.toLowerCase().includes(q);
        const matchEmail = s.email?.toLowerCase().includes(q);
        const matchPhone = s.phone?.toLowerCase().includes(q);
        const matchDept = s.department?.toLowerCase().includes(q);
        const matchRole = s.role?.toLowerCase().includes(q);
        const matchQual = s.qualifications?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchDept && !matchRole && !matchQual) {
          return false;
        }
      }

      return true;
    });
  }, [staffMembers, activeTab, branchFilter, statusFilter, searchTerm]);

  // Handle open Add Modal
  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'doctor',
      department: 'General Medicine',
      branchId: activeClinic?.branches?.[0]?.id || 'branch-citycare-main',
      shift: '09:00 - 17:00',
      qualifications: 'MBBS, MD',
      registrationNumber: `MDC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      experienceYears: 5,
      consultationFee: 500,
      status: 'Active',
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  // Handle open View Modal
  const handleOpenView = (staff) => {
    setSelectedStaff(staff);
    setIsViewModalOpen(true);
  };

  // Handle open Edit Modal
  const handleOpenEdit = (staff) => {
    setSelectedStaff(staff);
    setFormData({
      name: staff.name || '',
      email: staff.email || '',
      phone: staff.phone || '',
      role: staff.role || 'doctor',
      department: staff.department || '',
      branchId: staff.branchIds?.[0] || activeClinic?.branches?.[0]?.id || 'branch-citycare-main',
      shift: staff.shift || '09:00 - 17:00',
      qualifications: staff.qualifications || '',
      registrationNumber: staff.registrationNumber || '',
      experienceYears: staff.experienceYears || 5,
      consultationFee: staff.consultationFee || 500,
      status: staff.status || 'Active',
      notes: staff.notes || ''
    });
    setIsEditModalOpen(true);
  };

  // Handle open Delete Modal
  const handleOpenDelete = (staff) => {
    setSelectedStaff(staff);
    setIsDeleteModalOpen(true);
  };

  // Submit Add
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Name and email are required.', 'error');
      return;
    }

    addStaffMember({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role,
      department: formData.department.trim() || (formData.role === 'doctor' ? 'General Medicine' : 'Administration'),
      branchIds: [formData.branchId],
      shift: formData.shift,
      qualifications: formData.qualifications.trim(),
      registrationNumber: formData.registrationNumber.trim(),
      experienceYears: Number(formData.experienceYears) || 5,
      consultationFee: Number(formData.consultationFee) || 500,
      status: formData.status,
      notes: formData.notes.trim()
    });

    setIsAddModalOpen(false);
  };

  // Submit Edit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedStaff) return;

    updateStaffMember(selectedStaff.id, {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role,
      department: formData.department.trim(),
      branchIds: [formData.branchId],
      shift: formData.shift,
      qualifications: formData.qualifications.trim(),
      registrationNumber: formData.registrationNumber.trim(),
      experienceYears: Number(formData.experienceYears) || 5,
      consultationFee: Number(formData.consultationFee) || 500,
      status: formData.status,
      notes: formData.notes.trim()
    });

    setIsEditModalOpen(false);
    setSelectedStaff(null);
  };

  // Submit Delete
  const handleDeleteConfirm = () => {
    if (!selectedStaff) return;
    const res = deleteStaffMember(selectedStaff.id);
    if (res?.success) {
      setIsDeleteModalOpen(false);
      setSelectedStaff(null);
    }
  };

  // Helper: check if staff is primary clinic owner
  const isPrimaryOwner = (staff) => {
    if (!staff) return false;
    return (
      staff.id === 'stf-1' ||
      staff.name?.toLowerCase().includes('aarav mehta') ||
      staff.email?.toLowerCase() === currentUser?.email?.toLowerCase()
    );
  };

  // Handle Simulated Invitation Status Change
  const handleInvitationStatusChange = (id, newStatus) => {
    MockAuthService.updateStaffInvitationStatus(id, newStatus);
    setInvitations(MockAuthService.getStaffInvitations(activeClinic?.id));
    showToast(`Invitation status changed to ${newStatus}.`);
  };

  // Get Branch Name
  const getBranchName = (branchIds) => {
    if (!branchIds || branchIds.length === 0) return 'Main Clinic Hub';
    const found = activeClinic?.branches?.find((b) => branchIds.includes(b.id));
    return found ? found.name : 'Main Clinic Hub';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 uppercase tracking-wide flex items-center gap-1.5">
              <Shield className="w-3 h-3" /> Clinic Workforce & Governance
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {activeClinic?.name || 'CityCare Family Clinic'}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Staff & Team Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Doctor as Clinic Owner can add, view profiles, update roles, and manage other doctors, receptionists, and clinical staff.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={handleOpenAdd} className="shadow-xs font-bold">
            <Plus className="w-4 h-4 mr-1.5" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => setActiveTab('all')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Staff</span>
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{counts.total}</div>
          <span className="text-[10px] text-slate-400">Across all departments</span>
        </div>

        <div
          onClick={() => setActiveTab('doctor')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'doctor'
              ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Doctors</span>
            <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{counts.doctors}</div>
          <span className="text-[10px] text-slate-400">Clinicians & specialists</span>
        </div>

        <div
          onClick={() => setActiveTab('receptionist')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'receptionist'
              ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Receptionists</span>
            <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{counts.receptionists}</div>
          <span className="text-[10px] text-slate-400">Front desk & intake</span>
        </div>

        <div
          onClick={() => setActiveTab('other')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'other'
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Nursing & Other</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{counts.others}</div>
          <span className="text-[10px] text-slate-400">Nurses, pharmacy & ops</span>
        </div>

        <div className="p-3.5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Duty</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{counts.active}</div>
          <span className="text-[10px] text-slate-400">Ready for patient care</span>
        </div>
      </div>

      {/* Tabs and Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            All Staff ({counts.total})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('doctor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'doctor'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Doctors ({counts.doctors})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('receptionist')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'receptionist'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Receptionists ({counts.receptionists})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('other')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'other'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Nurses & Operations ({counts.others})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('invitations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'invitations'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Simulated Invitations ({invitations.length})
          </button>
        </div>
      </div>

      {/* Search and Filters Bar (for staff roster tabs) */}
      {activeTab !== 'invitations' && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, department, role, qualification..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
            >
              <option value="all">All Branches</option>
              {activeClinic?.branches?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              )) || <option value="branch-citycare-main">Main Clinic Hub</option>}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>

            {(searchTerm || branchFilter !== 'all' || statusFilter !== 'all') && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => {
                  setSearchTerm('');
                  setBranchFilter('all');
                  setStatusFilter('all');
                }}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      )}

      {/* TAB: STAFF ROSTER TABLE */}
      {activeTab !== 'invitations' && (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Staff Member</th>
                  <th className="px-4 py-3.5">Role & Department</th>
                  <th className="px-4 py-3.5">Branch Location</th>
                  <th className="px-4 py-3.5">Contact Details</th>
                  <th className="px-4 py-3.5">Shift Timing</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        <p className="font-semibold text-slate-600 dark:text-slate-400">No staff members found.</p>
                        <p className="text-xs text-slate-400">
                          Try adjusting your search criteria or add a new team member.
                        </p>
                        <Button variant="primary" size="xs" onClick={handleOpenAdd} className="mt-2 font-bold">
                          <Plus className="w-3.5 h-3.5 mr-1" /> Add Staff Member
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((staff) => {
                    const roleInfo = ROLE_CONFIG[staff.role] || {
                      label: staff.role,
                      color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
                      icon: Users
                    };
                    const RoleIcon = roleInfo.icon;
                    const isOwner = isPrimaryOwner(staff);

                    return (
                      <tr
                        key={staff.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Member Name & Avatar */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                              {staff.name
                                .replace('Dr. ', '')
                                .split(' ')
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                                {staff.name}
                                {isOwner && (
                                  <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded-md font-extrabold border border-amber-300 dark:border-amber-800">
                                    Owner
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <span>Joined {staff.joinedDate || '2025'}</span>
                                {staff.qualifications && (
                                  <>
                                    <span>•</span>
                                    <span className="font-medium text-slate-600 dark:text-slate-400">
                                      {staff.qualifications}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role & Department */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${roleInfo.color}`}
                            >
                              <RoleIcon className="w-3 h-3" />
                              {roleInfo.label.split(' / ')[0]}
                            </span>
                            <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                              {staff.department}
                            </div>
                          </div>
                        </td>

                        {/* Branch */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{getBranchName(staff.branchIds)}</span>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-0.5">
                            <div className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[160px]">{staff.email}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{staff.phone}</span>
                            </div>
                          </div>
                        </td>

                        {/* Shift Timing */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{staff.shift || '09:00 - 18:00'}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          <button
                            type="button"
                            title="Click to toggle status"
                            onClick={() =>
                              toggleStaffStatus(
                                staff.id,
                                staff.status === 'Active' ? 'On Leave' : 'Active'
                              )
                            }
                            className="cursor-pointer"
                          >
                            <Badge
                              variant={
                                staff.status === 'Active'
                                  ? 'success'
                                  : staff.status === 'On Leave'
                                  ? 'warning'
                                  : 'default'
                              }
                              size="sm"
                            >
                              {staff.status}
                            </Badge>
                          </button>
                        </td>

                        {/* Actions: View Profile, Edit, Delete */}
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenView(staff)}
                              title="View Profile"
                              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenEdit(staff)}
                              title="Edit Staff Member"
                              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {!isOwner && (
                              <button
                                type="button"
                                onClick={() => handleOpenDelete(staff)}
                                title="Remove Staff Member"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB: SIMULATED INVITATIONS */}
      {activeTab === 'invitations' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sm block">Governed Staff Provisioning:</span>
              <p className="leading-relaxed">
                ClinicOS security prevents public self-signup for Receptionists and Doctors. Clinic Administrators invite staff members here. Once dispatched, staff can simulate acceptance and log in using their provisioned credentials.
              </p>
            </div>
          </div>

          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Invited Staff Member</th>
                    <th className="px-4 py-3">Assigned Role</th>
                    <th className="px-4 py-3">Branch Location</th>
                    <th className="px-4 py-3">Invited By / Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {invitations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                        No pending staff invitations on record. Click "+ Add Staff Member" to add team members.
                      </td>
                    </tr>
                  ) : (
                    invitations.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{inv.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{inv.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 uppercase">
                            {inv.role === 'receptionist_manager' ? 'Receptionist / Front Desk' : 'Doctor / Clinician'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">
                          {inv.branchName || 'Main Hub'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-800 dark:text-slate-200 font-medium">{inv.invitedBy}</div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500">{inv.invitedAt}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              inv.status === 'Accepted'
                                ? 'success'
                                : inv.status === 'Pending'
                                ? 'warning'
                                : 'default'
                            }
                          >
                            {inv.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                          {inv.status === 'Pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => handleInvitationStatusChange(inv.id, 'Accepted')}
                                className="text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100"
                              >
                                Simulate Accept
                              </Button>
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => handleInvitationStatusChange(inv.id, 'Cancelled')}
                                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {inv.status === 'Accepted' && (
                            <Link to="/login/receptionist">
                              <Button variant="ghost" size="xs" className="text-blue-600 dark:text-blue-400 font-semibold">
                                Test Login &rarr;
                              </Button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: VIEW STAFF PROFILE                               */}
      {/* ========================================================= */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedStaff(null);
        }}
        title="Staff Member Profile"
        size="lg"
      >
        {selectedStaff && (
          <div className="space-y-5 p-1">
            {/* Header / Avatar Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 border border-blue-100 dark:border-slate-700">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md">
                  {selectedStaff.name
                    .replace('Dr. ', '')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">
                      {selectedStaff.name}
                    </h2>
                    {isPrimaryOwner(selectedStaff) && (
                      <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                        Clinic Owner
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                    {selectedStaff.department}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedStaff.qualifications || 'Registered Clinical Staff'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    selectedStaff.status === 'Active'
                      ? 'success'
                      : selectedStaff.status === 'On Leave'
                      ? 'warning'
                      : 'default'
                  }
                  size="md"
                >
                  {selectedStaff.status}
                </Badge>
              </div>
            </div>

            {/* Profile Grid Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact Info Card */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact & Location
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" /> Email:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {selectedStaff.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone:
                    </span>
                    <span className="font-mono font-medium text-slate-900 dark:text-white">
                      {selectedStaff.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> Assigned Branch:
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {getBranchName(selectedStaff.branchIds)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Shift Hours:
                    </span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {selectedStaff.shift || '09:00 - 18:00'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined Date:
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {selectedStaff.joinedDate || '2025-01-15'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Credentials Card */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Professional Credentials
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-slate-400" /> Primary Role:
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {selectedStaff.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-slate-400" /> Registration / License:
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {selectedStaff.registrationNumber || 'MED-REG-VERIFIED'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Experience:
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {selectedStaff.experienceYears || 5} Years Clinical Practice
                    </span>
                  </div>
                  {selectedStaff.role === 'doctor' && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400" /> Consultation Fee:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{selectedStaff.consultationFee || 500}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> System Access:
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Authorized & Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Responsibilities & Privileges */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                ClinicOS Operational Privileges
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                {selectedStaff.role === 'doctor' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Conduct in-clinic & virtual patient consultations and video calls.
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Compose digital prescriptions with tamper-evident QR code authenticity verification.
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Issue medical fitness certificates and view full longitudinal patient charts.
                    </li>
                  </>
                )}
                {selectedStaff.role === 'receptionist' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Operate front desk check-in counter and assign queue tokens.
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Register walk-in patients and manage appointment booking requests.
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Collect consultation fees and generate patient receipts.
                    </li>
                  </>
                )}
                {selectedStaff.role !== 'doctor' && selectedStaff.role !== 'receptionist' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Access departmental modules (pharmacy inventory, nursing triage, billing audits).
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Collaborate within {activeClinic?.name} clinical workflow under owner oversight.
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleOpenEdit(selectedStaff);
                }}
                className="font-semibold"
              >
                <Edit className="w-3.5 h-3.5 mr-1.5" />
                Edit Profile
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedStaff(null);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ========================================================= */}
      {/* MODAL 2: ADD STAFF MEMBER                                 */}
      {/* ========================================================= */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Staff Member"
        size="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 p-1 text-xs">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-200 flex items-start gap-2">
            <UserPlus className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              Doctor as clinic owner can add doctors, receptionists, nurses, and support personnel. Adding a doctor automatically lists them in the clinic appointment schedule and booking page.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Neha Kulkarni or Rahul Sharma"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Permitted Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => {
                  const role = e.target.value;
                  let defaultDept = formData.department;
                  if (role === 'doctor') defaultDept = 'General Medicine';
                  if (role === 'receptionist') defaultDept = 'Front Desk Administration';
                  if (role === 'nurse') defaultDept = 'Clinical Nursing';
                  if (role === 'inventory') defaultDept = 'Pharmacy & Inventory';
                  if (role === 'accountant') defaultDept = 'Billing & Accounts';
                  if (role === 'admin') defaultDept = 'Operations Management';
                  setFormData({ ...formData, role, department: defaultDept });
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="doctor">Doctor / Clinician</option>
                <option value="receptionist">Receptionist / Front Desk</option>
                <option value="nurse">Clinical Nurse</option>
                <option value="inventory">Pharmacist / Medical Store</option>
                <option value="accountant">Accountant / Billing</option>
                <option value="admin">Clinic Operations Manager</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Work Email Address *
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@citycare.demo"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98220 00000"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Department / Specialization
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Pediatrics, Cardiology, Front Desk"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Assigned Branch *
              </label>
              <select
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                {activeClinic?.branches?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                )) || <option value="branch-citycare-main">Main Clinic Hub</option>}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Qualifications / Degree
              </label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                placeholder="e.g. MBBS, MD or B.Sc"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Registration / License No
              </label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                placeholder="e.g. MDC-2024-8819"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Shift Timing
              </label>
              <input
                type="text"
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                placeholder="e.g. 09:00 - 17:00"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {formData.role === 'doctor' && (
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Consultation Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                  placeholder="500"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Account Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active (Duty Ready)</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="font-bold">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add to Clinic Roster
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================= */}
      {/* MODAL 3: EDIT STAFF MEMBER                                */}
      {/* ========================================================= */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStaff(null);
        }}
        title="Edit Staff Member"
        size="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4 p-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Permitted Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="doctor">Doctor / Clinician</option>
                <option value="receptionist">Receptionist / Front Desk</option>
                <option value="nurse">Clinical Nurse</option>
                <option value="inventory">Pharmacist / Medical Store</option>
                <option value="accountant">Accountant / Billing</option>
                <option value="admin">Clinic Operations Manager</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Work Email Address *
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Department / Specialization
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Assigned Branch
              </label>
              <select
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                {activeClinic?.branches?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                )) || <option value="branch-citycare-main">Main Clinic Hub</option>}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Qualifications / Degree
              </label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Registration / License No
              </label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Shift Timing
              </label>
              <input
                type="text"
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {formData.role === 'doctor' && (
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Consultation Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedStaff(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="font-bold">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================= */}
      {/* MODAL 4: DELETE CONFIRMATION                              */}
      {/* ========================================================= */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStaff(null);
        }}
        title="Remove Staff Member"
        size="sm"
      >
        {selectedStaff && (
          <div className="space-y-4 p-1 text-xs">
            {isPrimaryOwner(selectedStaff) ? (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Cannot Remove Clinic Owner
                </div>
                <p>
                  <strong>{selectedStaff.name}</strong> is registered as the primary clinic owner/administrator and cannot be removed from the clinic directory.
                </p>
                <div className="flex justify-end pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setSelectedStaff(null);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl text-red-900 dark:text-red-200">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block text-sm">Confirm Removal</span>
                    <p className="leading-relaxed">
                      Are you sure you want to remove <strong>{selectedStaff.name}</strong> ({selectedStaff.role}) from {activeClinic?.name}?
                    </p>
                    <p className="text-[11px] text-red-700 dark:text-red-300">
                      They will immediately lose access to clinic operations, appointments, and front desk queues.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setSelectedStaff(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleDeleteConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Confirm Remove
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
