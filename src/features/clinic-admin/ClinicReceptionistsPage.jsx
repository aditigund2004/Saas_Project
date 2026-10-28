import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { receptionistService } from '../../services/receptionistService';
import {
  Users,
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
  Shield,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  UserCheck,
  KeyRound,
  MessageSquareHeart,
  Lock
} from 'lucide-react';

const ALL_PERMISSIONS = [
  {
    id: 'register_patients',
    label: 'Register Patients',
    description: 'Create new patient profiles, intake forms, and walk-in records.',
    category: 'Front Desk'
  },
  {
    id: 'manage_appointments',
    label: 'Manage Appointments',
    description: 'Book, reschedule, and cancel calendar slots across doctors.',
    category: 'Front Desk'
  },
  {
    id: 'check_in_patients',
    label: 'Check-In Counter',
    description: 'Mark arriving patients as Checked-In and assign queue tokens.',
    category: 'Front Desk'
  },
  {
    id: 'view_patient_feedback',
    label: 'Access Patient Feedback (Confidential)',
    description: 'View patient feedback submissions, satisfaction ratings, and clinic comments.',
    category: 'Quality & Feedback',
    isSpecial: true
  },
  {
<<<<<<< HEAD
    id: 'manage_inventory',
    label: 'Inventory Restock Counter',
    description: 'Log consumable stock receipts, adjustments, and dispense requests.',
    category: 'Supplies'
  },
  {
    id: 'export_daily_reports',
    label: 'Export Desk Reports',
    description: 'Generate daily footfall, check-in, and collection CSV exports.',
=======
    id: 'update_feedback_status',
    label: 'Update Feedback Status',
    description: 'Mark patient feedback as Reviewed, Resolved, or Reopened.',
    category: 'Quality & Feedback'
  },
  {
    id: 'add_internal_notes',
    label: 'Add Internal Notes on Feedback',
    description: 'Add confidential internal staff notes on patient feedback threads.',
    category: 'Quality & Feedback'
  },
  {
    id: 'view_reports',
    label: 'View Operational Reports',
    description: 'View daily front-desk summary reports and appointment tallies.',
>>>>>>> origin/main
    category: 'Reports'
  }
];

export function ClinicReceptionistsPage() {
  const {
    receptionists,
<<<<<<< HEAD
    addReceptionist,
    updateReceptionist,
    deleteReceptionist,
    toggleReceptionistStatus,
    activeClinic,
    showToast
  } = useApp();

  // Search & Filters
=======
    activeClinic,
    addReceptionist,
    updateReceptionist,
    toggleReceptionistStatus,
    deleteReceptionist,
    showToast
  } = useApp();

  // Search & Filter State
>>>>>>> origin/main
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedShift, setSelectedShift] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('name_asc');
<<<<<<< HEAD

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
=======
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
>>>>>>> origin/main

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReceptionist, setSelectedReceptionist] = useState(null);
  const [isViewEditModalOpen, setIsViewEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteTargetReceptionist, setDeleteTargetReceptionist] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form State for Add Receptionist
  const [newRecForm, setNewRecForm] = useState({
    name: '',
    email: '',
    phone: '',
    staffIdNumber: '',
    shift: 'Full Day (09:00 - 18:00)',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    branchIds: [activeClinic?.branches?.[0]?.id || ''],
    permissions: ['register_patients', 'manage_appointments', 'check_in_patients'],
    status: 'Active',
    joiningDate: new Date().toISOString().slice(0, 10),
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  });

  // Edit Receptionist Form State
  const [editRecForm, setEditRecForm] = useState(null);

  // Filter receptionists belonging to active clinic
  const clinicReceptionists = useMemo(() => {
    return receptionists.filter((r) => r.clinicId === activeClinic.id);
  }, [receptionists, activeClinic.id]);

  // Filtered & Sorted receptionists
  const filteredReceptionists = useMemo(() => {
    let result = clinicReceptionists.filter((rec) => {
      const matchSearch =
        rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.phone.includes(searchTerm) ||
        (rec.staffIdNumber && rec.staffIdNumber.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchBranch = selectedBranch === 'ALL' || rec.branchIds.includes(selectedBranch);
      const matchShift = selectedShift === 'ALL' || rec.shift.includes(selectedShift);
      const matchStatus = selectedStatus === 'ALL' || (rec.status || 'Active') === selectedStatus;

      return matchSearch && matchBranch && matchShift && matchStatus;
    });

    result.sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      if (sortBy === 'date_newest') return (b.joiningDate || '').localeCompare(a.joiningDate || '');
      if (sortBy === 'date_oldest') return (a.joiningDate || '').localeCompare(b.joiningDate || '');
      return 0;
    });

    return result;
  }, [clinicReceptionists, searchTerm, selectedBranch, selectedShift, selectedStatus, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredReceptionists.length / pageSize) || 1;
  const paginatedReceptionists = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReceptionists.slice(start, start + pageSize);
  }, [filteredReceptionists, currentPage, pageSize]);

<<<<<<< HEAD
  // Handle Filter Reset
=======
>>>>>>> origin/main
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBranch('ALL');
    setSelectedShift('ALL');
    setSelectedStatus('ALL');
    setSortBy('name_asc');
    setCurrentPage(1);
  };

  // Open View/Edit Modal
<<<<<<< HEAD
  const handleOpenViewEdit = (receptionist, initialTab = 'overview') => {
    setSelectedReceptionist(receptionist);
    setEditRecForm({
      name: receptionist.name || '',
      email: receptionist.email || '',
      phone: receptionist.phone || '',
      staffIdNumber: receptionist.staffIdNumber || '',
      shift: receptionist.shift || 'Full Day (09:00 - 18:00)',
      workingDays: receptionist.workingDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      branchIds: receptionist.branchIds || [activeClinic?.branches?.[0]?.id || ''],
      permissions: receptionist.permissions || [],
      status: receptionist.status || 'Active',
      avatar: receptionist.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    });
    setActiveTab(initialTab);
    setIsViewEditModalOpen(true);
  };

  // Submit Edit Receptionist
  const handleSaveReceptionistEdits = (e) => {
    e.preventDefault();
=======
  const handleOpenViewEdit = (receptionist, tab = 'overview') => {
    setSelectedReceptionist(receptionist);
    setEditRecForm({
      name: receptionist.name,
      email: receptionist.email,
      phone: receptionist.phone,
      staffIdNumber: receptionist.staffIdNumber,
      shift: receptionist.shift,
      workingDays: receptionist.workingDays || [],
      branchIds: receptionist.branchIds || [],
      permissions: receptionist.permissions || [],
      status: receptionist.status || 'Active',
      joiningDate: receptionist.joiningDate,
      avatar: receptionist.avatar
    });
    setActiveTab(tab);
    setIsViewEditModalOpen(true);
  };

  // Save Receptionist Edits
  const handleSaveReceptionistEdits = (e) => {
    e.preventDefault();
    if (!selectedReceptionist || !editRecForm) return;

>>>>>>> origin/main
    if (!editRecForm.name.trim() || !editRecForm.email.trim()) {
      showToast('Staff name and email are required fields', 'error');
      return;
    }

    updateReceptionist(selectedReceptionist.id, editRecForm);
    setSelectedReceptionist({ ...selectedReceptionist, ...editRecForm });
    showToast(`Staff record for ${editRecForm.name} updated successfully.`);
    setIsViewEditModalOpen(false);
  };

  // Submit Add Receptionist
  const handleAddReceptionistSubmit = (e) => {
    e.preventDefault();
    if (!newRecForm.name.trim() || !newRecForm.email.trim()) {
      showToast('Please provide Name and Email', 'error');
      return;
    }

    addReceptionist(newRecForm);
    setIsAddModalOpen(false);
    // Reset Form
    setNewRecForm({
      name: '',
      email: '',
      phone: '',
      staffIdNumber: '',
      shift: 'Full Day (09:00 - 18:00)',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      branchIds: [activeClinic?.branches?.[0]?.id || ''],
      permissions: ['register_patients', 'manage_appointments', 'check_in_patients'],
      status: 'Active',
      joiningDate: new Date().toISOString().slice(0, 10),
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    });
  };

  // Toggle permission helper
  const togglePermissionInEdit = (permId) => {
    if (!editRecForm) return;
    const exists = editRecForm.permissions.includes(permId);
    const updated = exists
      ? editRecForm.permissions.filter((p) => p !== permId)
      : [...editRecForm.permissions, permId];
    setEditRecForm({ ...editRecForm, permissions: updated });
  };

  const togglePermissionInAdd = (permId) => {
    const exists = newRecForm.permissions.includes(permId);
    const updated = exists
      ? newRecForm.permissions.filter((p) => p !== permId)
      : [...newRecForm.permissions, permId];
    setNewRecForm({ ...newRecForm, permissions: updated });
  };

  // Delete Receptionist
  const handleDeleteClick = (receptionist) => {
    setDeleteTargetReceptionist(receptionist);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteReceptionist = () => {
    if (!deleteTargetReceptionist) return;
    deleteReceptionist(deleteTargetReceptionist.id);
    setIsDeleteModalOpen(false);
    setDeleteTargetReceptionist(null);
  };

  const handleDeactivateInstead = () => {
    if (!deleteTargetReceptionist) return;
    toggleReceptionistStatus(deleteTargetReceptionist.id, 'Inactive');
    setIsDeleteModalOpen(false);
    setDeleteTargetReceptionist(null);
    showToast(`${deleteTargetReceptionist.name} deactivated. Desk access paused.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Front Desk & Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Receptionist Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Front Desk & Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Receptionist Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Manage front-desk staff, shift rosters, branch assignments, and granular access permissions (including confidential patient feedback).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => receptionistService.exportToCSV(filteredReceptionists)}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Receptionist
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
<<<<<<< HEAD
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
=======
      <Card className="p-4 border-slate-200 bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
>>>>>>> origin/main
            <input
              type="text"
              placeholder="Search by name, email, phone, staff ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
<<<<<<< HEAD
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-blue-500 bg-slate-50/50"
>>>>>>> origin/main
            />
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
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
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

          {/* Shift Filter */}
          <div>
            <select
              value={selectedShift}
              onChange={(e) => {
                setSelectedShift(e.target.value);
                setCurrentPage(1);
              }}
<<<<<<< HEAD
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
=======
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
>>>>>>> origin/main
            >
              <option value="ALL">All Shifts</option>
              <option value="Morning">Morning Shift</option>
              <option value="Evening">Evening Shift</option>
              <option value="Full Day">Full Day Shift</option>
              <option value="Night">Night Shift</option>
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
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
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
            <span>
              Showing <strong className="text-slate-700 dark:text-slate-200">{filteredReceptionists.length}</strong> staff member{filteredReceptionists.length === 1 ? '' : 's'}
=======
        <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <span>
              Showing <strong>{filteredReceptionists.length}</strong> staff member{filteredReceptionists.length === 1 ? '' : 's'}
>>>>>>> origin/main
            </span>
            {(searchTerm || selectedBranch !== 'ALL' || selectedShift !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                onClick={handleResetFilters}
<<<<<<< HEAD
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium ml-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear filters
=======
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium ml-2 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Clear filters
>>>>>>> origin/main
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <span className="text-slate-400 dark:text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-blue-500"
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
              <option value="date_newest">Joining Date (Newest)</option>
              <option value="date_oldest">Joining Date (Oldest)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Receptionist Listing: Desktop Table & Mobile Cards */}
      {filteredReceptionists.length === 0 ? (
<<<<<<< HEAD
        <Card className="p-12 text-center border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No receptionists match your filter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
=======
        <Card className="p-12 text-center border-slate-200 bg-white">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No receptionists match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
>>>>>>> origin/main
            Try adjusting your search criteria, reset active shift filters, or onboard a new receptionist.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
              Add Receptionist
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
<<<<<<< HEAD
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-xs">
                <tr>
                  <th className="px-3.5 py-3.5 text-center w-12 font-semibold">#</th>
=======
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
>>>>>>> origin/main
                  <th className="px-4 py-3.5">Staff & Contact</th>
                  <th className="px-4 py-3.5">Assigned Branches</th>
                  <th className="px-4 py-3.5">Shift & Schedule</th>
                  <th className="px-4 py-3.5">Permissions Summary</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
<<<<<<< HEAD
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedReceptionists.map((rec, idx) => {
                  const hasFeedbackAccess = (rec.permissions || []).includes('view_patient_feedback');
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3.5 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
=======
              <tbody className="divide-y divide-slate-100">
                {paginatedReceptionists.map((rec) => {
                  const hasFeedbackAccess = (rec.permissions || []).includes('view_patient_feedback');
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
>>>>>>> origin/main
                      {/* Staff Info */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={rec.avatar}
                            alt={rec.name}
<<<<<<< HEAD
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
=======
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
>>>>>>> origin/main
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span
<<<<<<< HEAD
                                className="font-bold text-slate-900 dark:text-white text-xs hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
=======
                                className="font-bold text-slate-900 text-xs hover:text-blue-700 cursor-pointer"
>>>>>>> origin/main
                                onClick={() => handleOpenViewEdit(rec, 'overview')}
                              >
                                {rec.name}
                              </span>
<<<<<<< HEAD
                              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {rec.staffIdNumber || 'REC'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{rec.email}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{rec.phone}</p>
=======
                              <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {rec.staffIdNumber || 'REC'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">{rec.email}</p>
                            <p className="text-[10px] text-slate-400">{rec.phone}</p>
>>>>>>> origin/main
                          </div>
                        </div>
                      </td>

                      {/* Branches */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(rec.branchIds || []).map((bId) => {
                            const branch = activeClinic.branches.find((b) => b.id === bId);
                            return (
                              <span
                                key={bId}
<<<<<<< HEAD
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                <Building2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
=======
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 border border-slate-200"
                              >
                                <Building2 className="w-2.5 h-2.5 text-blue-600" />
>>>>>>> origin/main
                                {branch?.name || bId}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      {/* Shift & Schedule */}
                      <td className="px-4 py-3.5">
<<<<<<< HEAD
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{rec.shift}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{(rec.workingDays || []).join(', ')}</p>
=======
                        <p className="text-xs font-semibold text-slate-800">{rec.shift}</p>
                        <p className="text-[10px] text-slate-400">{(rec.workingDays || []).join(', ')}</p>
>>>>>>> origin/main
                      </td>

                      {/* Permissions Summary */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-[240px]">
                          {hasFeedbackAccess ? (
<<<<<<< HEAD
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              Feedback Access
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs">
                              <Lock className="w-3 h-3" /> Feedback Restricted
                            </span>
                          )}
                          <span className="text-xs text-slate-400 dark:text-slate-500">
=======
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Feedback Access
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[10px]">
                              <Lock className="w-2.5 h-2.5" /> Feedback Restricted
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
>>>>>>> origin/main
                            {rec.permissions?.length || 0} permissions total
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <Badge variant={rec.status || 'Active'}>
                          {rec.status || 'Active'}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenViewEdit(rec, 'overview')}
                            title="View Staff Profile"
<<<<<<< HEAD
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
=======
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
>>>>>>> origin/main
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenViewEdit(rec, 'permissions')}
                            title="Configure Permissions"
<<<<<<< HEAD
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
=======
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
>>>>>>> origin/main
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(rec)}
                            title="Remove Staff"
<<<<<<< HEAD
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
=======
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
>>>>>>> origin/main
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
            {paginatedReceptionists.map((rec) => {
              const hasFeedbackAccess = (rec.permissions || []).includes('view_patient_feedback');
              return (
<<<<<<< HEAD
                <Card key={rec.id} className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
=======
                <Card key={rec.id} className="p-4 border-slate-200 bg-white space-y-3">
>>>>>>> origin/main
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.avatar}
                        alt={rec.name}
<<<<<<< HEAD
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">{rec.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{rec.email}</p>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{rec.staffIdNumber || 'REC'}</span>
=======
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{rec.name}</h3>
                        <p className="text-xs text-slate-500">{rec.email}</p>
                        <span className="text-[10px] font-mono text-slate-400">{rec.staffIdNumber || 'REC'}</span>
>>>>>>> origin/main
                      </div>
                    </div>
                    <Badge variant={rec.status || 'Active'}>{rec.status || 'Active'}</Badge>
                  </div>

<<<<<<< HEAD
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span>Shift:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{rec.shift}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span>Feedback Access:</span>
                      {hasFeedbackAccess ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Granted
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-xs">Restricted</span>
=======
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Shift:</span>
                      <span className="font-medium text-slate-800">{rec.shift}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Feedback Access:</span>
                      {hasFeedbackAccess ? (
                        <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Granted
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Restricted</span>
>>>>>>> origin/main
                      )}
                    </div>
                  </div>

<<<<<<< HEAD
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400 dark:text-slate-500">Branches: {rec.branchIds?.length || 1}</span>
=======
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">Branches: {rec.branchIds?.length || 1}</span>
>>>>>>> origin/main
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="xs" onClick={() => handleOpenViewEdit(rec, 'permissions')}>
                        Permissions
                      </Button>
                      <button
                        onClick={() => handleDeleteClick(rec)}
<<<<<<< HEAD
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 cursor-pointer"
=======
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
>>>>>>> origin/main
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
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
      {/* ADD RECEPTIONIST MODAL */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Onboard Receptionist & Front Desk Staff"
          size="lg"
        >
          <form onSubmit={handleAddReceptionistSubmit} className="space-y-4 text-xs">
<<<<<<< HEAD
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-xl text-blue-800 dark:text-blue-300 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Front-Desk Staff Onboarding</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
=======
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Front-Desk Staff Onboarding</p>
                <p className="text-[11px] text-blue-700">
>>>>>>> origin/main
                  Provision new desk staff accounts, configure shifts, and explicitly define role permissions.
                </p>
              </div>
            </div>

            {/* Section 1: Personal Details */}
<<<<<<< HEAD
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">1. Staff Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Staff Full Name *</label>
=======
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">1. Staff Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Staff Full Name *</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Sharma"
                    value={newRecForm.name}
                    onChange={(e) => setNewRecForm({ ...newRecForm, name: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Email (Login ID) *</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email (Login ID) *</label>
>>>>>>> origin/main
                  <input
                    type="email"
                    required
                    placeholder="pooja.sharma@clinic.demo"
                    value={newRecForm.email}
                    onChange={(e) => setNewRecForm({ ...newRecForm, email: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
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
                    value={newRecForm.phone}
                    onChange={(e) => setNewRecForm({ ...newRecForm, phone: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Custom Staff ID</label>
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Custom Staff ID</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    placeholder="e.g. REC-205"
                    value={newRecForm.staffIdNumber}
                    onChange={(e) => setNewRecForm({ ...newRecForm, staffIdNumber: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500 font-mono"
=======
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
>>>>>>> origin/main
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Shift & Branch */}
<<<<<<< HEAD
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">2. Shift & Branch Assignment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Shift Timing</label>
                  <select
                    value={newRecForm.shift}
                    onChange={(e) => setNewRecForm({ ...newRecForm, shift: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
=======
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">2. Shift & Branch Assignment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Shift Timing</label>
                  <select
                    value={newRecForm.shift}
                    onChange={(e) => setNewRecForm({ ...newRecForm, shift: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
>>>>>>> origin/main
                  >
                    <option value="Morning (08:00 - 16:00)">Morning (08:00 - 16:00)</option>
                    <option value="Evening (12:00 - 20:00)">Evening (12:00 - 20:00)</option>
                    <option value="Full Day (09:00 - 18:00)">Full Day (09:00 - 18:00)</option>
                    <option value="Night (20:00 - 08:00)">Night (20:00 - 08:00)</option>
                  </select>
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Account Status</label>
                  <select
                    value={newRecForm.status}
                    onChange={(e) => setNewRecForm({ ...newRecForm, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
=======
                  <label className="block font-medium text-slate-700 mb-1">Account Status</label>
                  <select
                    value={newRecForm.status}
                    onChange={(e) => setNewRecForm({ ...newRecForm, status: e.target.value })}
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
                        checked={newRecForm.branchIds.includes(b.id)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...newRecForm.branchIds, b.id]
                            : newRecForm.branchIds.filter((id) => id !== b.id);
                          setNewRecForm({ ...newRecForm, branchIds: updated });
                        }}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Granular Permissions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
<<<<<<< HEAD
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">3. Granular Permissions</h4>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{newRecForm.permissions.length} Enabled</span>
              </div>

              <div className="space-y-2 border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-800/40">
=======
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">3. Granular Permissions</h4>
                <span className="text-[11px] text-blue-600 font-semibold">{newRecForm.permissions.length} Enabled</span>
              </div>

              <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
>>>>>>> origin/main
                {ALL_PERMISSIONS.map((perm) => {
                  const isChecked = newRecForm.permissions.includes(perm.id);
                  return (
                    <label
                      key={perm.id}
<<<<<<< HEAD
                      className={`flex items-start gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer ${
                        perm.isSpecial
                          ? isChecked
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                            : 'bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-900/50'
                          : isChecked
                          ? 'bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-900'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
=======
                      className={`flex items-start gap-3 p-2 rounded-lg border transition-colors cursor-pointer ${
                        perm.isSpecial
                          ? isChecked
                            ? 'bg-emerald-50/70 border-emerald-300'
                            : 'bg-white border-amber-200'
                          : isChecked
                          ? 'bg-white border-blue-200'
                          : 'bg-white border-slate-200'
>>>>>>> origin/main
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePermissionInAdd(perm.id)}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
<<<<<<< HEAD
                          <span className={`font-semibold ${perm.isSpecial ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                            {perm.label}
                          </span>
                          {perm.isSpecial && (
                            <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> High Privacy Toggle
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{perm.description}</p>
=======
                          <span className={`font-semibold ${perm.isSpecial ? 'text-emerald-900' : 'text-slate-800'}`}>
                            {perm.label}
                          </span>
                          {perm.isSpecial && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full flex items-center gap-1">
                              <ShieldCheck className="w-2.5 h-2.5" /> High Privacy Toggle
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">{perm.description}</p>
>>>>>>> origin/main
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
=======
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
>>>>>>> origin/main
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Provision Account
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* VIEW & EDIT RECEPTIONIST MODAL */}
      {/* ========================================================================= */}
      {isViewEditModalOpen && selectedReceptionist && editRecForm && (
        <Modal
          isOpen={isViewEditModalOpen}
          onClose={() => setIsViewEditModalOpen(false)}
          title={`Staff Profile: ${selectedReceptionist.name}`}
          size="lg"
        >
          <div className="space-y-4">
            {/* Staff Header Badge */}
<<<<<<< HEAD
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <img
                src={editRecForm.avatar || selectedReceptionist.avatar}
                alt={selectedReceptionist.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{selectedReceptionist.name}</h3>
                  <Badge variant={editRecForm.status}>{editRecForm.status}</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{editRecForm.email}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mt-0.5">
=======
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={editRecForm.avatar || selectedReceptionist.avatar}
                alt={selectedReceptionist.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 truncate">{selectedReceptionist.name}</h3>
                  <Badge variant={editRecForm.status}>{editRecForm.status}</Badge>
                </div>
                <p className="text-xs text-slate-500">{editRecForm.email}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
>>>>>>> origin/main
                  <span className="font-mono">ID: {selectedReceptionist.staffIdNumber}</span>
                  <span>•</span>
                  <span>Joined: {selectedReceptionist.joiningDate || '2025-02-01'}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div className="shrink-0 text-right">
<<<<<<< HEAD
                <label className="block text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold mb-1">Status</label>
                <select
                  value={editRecForm.status}
                  onChange={(e) => setEditRecForm({ ...editRecForm, status: e.target.value })}
                  className="px-2.5 py-1 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-blue-500 font-medium"
=======
                <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Status</label>
                <select
                  value={editRecForm.status}
                  onChange={(e) => setEditRecForm({ ...editRecForm, status: e.target.value })}
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

            {/* Tabs */}
<<<<<<< HEAD
            <div className="flex border-b border-slate-200 dark:border-slate-700 text-xs font-medium space-x-1">
=======
            <div className="flex border-b border-slate-200 text-xs font-medium space-x-1">
>>>>>>> origin/main
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'permissions', label: `Permissions (${editRecForm.permissions.length})` },
                { id: 'schedule', label: 'Shift & Branch' },
                { id: 'activity', label: 'Activity History' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
<<<<<<< HEAD
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
=======
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
>>>>>>> origin/main
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSaveReceptionistEdits} className="text-xs space-y-4">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
<<<<<<< HEAD
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
=======
                      <label className="block font-medium text-slate-700 mb-1">Full Name</label>
>>>>>>> origin/main
                      <input
                        type="text"
                        value={editRecForm.name}
                        onChange={(e) => setEditRecForm({ ...editRecForm, name: e.target.value })}
<<<<<<< HEAD
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
=======
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Email Address</label>
>>>>>>> origin/main
                      <input
                        type="email"
                        value={editRecForm.email}
                        onChange={(e) => setEditRecForm({ ...editRecForm, email: e.target.value })}
<<<<<<< HEAD
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
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
                        value={editRecForm.phone}
                        onChange={(e) => setEditRecForm({ ...editRecForm, phone: e.target.value })}
<<<<<<< HEAD
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Staff ID</label>
=======
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Staff ID</label>
>>>>>>> origin/main
                      <input
                        type="text"
                        value={editRecForm.staffIdNumber}
                        onChange={(e) => setEditRecForm({ ...editRecForm, staffIdNumber: e.target.value })}
<<<<<<< HEAD
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500 font-mono"
=======
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
>>>>>>> origin/main
                      />
                    </div>
                  </div>

                  {/* Feedback Access Highlight Card */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    editRecForm.permissions.includes('view_patient_feedback')
<<<<<<< HEAD
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      {editRecForm.permissions.includes('view_patient_feedback') ? (
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      )}
                      <div>
                        <p className="font-bold text-xs">Patient Feedback Access Permission</p>
                        <p className="text-xs opacity-80">
=======
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      {editRecForm.permissions.includes('view_patient_feedback') ? (
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400" />
                      )}
                      <div>
                        <p className="font-bold text-xs">Patient Feedback Access Permission</p>
                        <p className="text-[11px] opacity-80">
>>>>>>> origin/main
                          {editRecForm.permissions.includes('view_patient_feedback')
                            ? 'This receptionist can review confidential patient feedback and quality scores.'
                            : 'Patient feedback viewing is disabled for this user.'}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => togglePermissionInEdit('view_patient_feedback')}
                    >
                      {editRecForm.permissions.includes('view_patient_feedback') ? 'Revoke Access' : 'Grant Access'}
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 2: PERMISSIONS */}
              {activeTab === 'permissions' && (
                <div className="space-y-3">
<<<<<<< HEAD
                  <p className="text-slate-600 dark:text-slate-300">
                    Configure granular permissions assigned to <strong className="text-slate-900 dark:text-white">{selectedReceptionist.name}</strong>. Changes take effect on the next session.
=======
                  <p className="text-slate-600">
                    Configure granular permissions assigned to <strong>{selectedReceptionist.name}</strong>. Changes take effect on the next session.
>>>>>>> origin/main
                  </p>

                  <div className="space-y-2">
                    {ALL_PERMISSIONS.map((perm) => {
                      const isChecked = editRecForm.permissions.includes(perm.id);
                      return (
                        <label
                          key={perm.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                            perm.isSpecial
                              ? isChecked
<<<<<<< HEAD
                                ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                                : 'bg-amber-50/50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
                              : isChecked
                              ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-300 dark:border-slate-600'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
=======
                                ? 'bg-emerald-50/70 border-emerald-300'
                                : 'bg-amber-50/50 border-amber-200'
                              : isChecked
                              ? 'bg-slate-50 border-slate-300'
                              : 'bg-white border-slate-200'
>>>>>>> origin/main
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePermissionInEdit(perm.id)}
                            className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
<<<<<<< HEAD
                              <span className={`font-semibold ${perm.isSpecial ? 'text-emerald-900 dark:text-emerald-300 font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
=======
                              <span className={`font-semibold ${perm.isSpecial ? 'text-emerald-900 font-bold' : 'text-slate-800'}`}>
>>>>>>> origin/main
                                {perm.label}
                              </span>
                              <Badge variant={isChecked ? 'Active' : 'Inactive'}>
                                {isChecked ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </div>
<<<<<<< HEAD
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{perm.description}</p>
=======
                            <p className="text-[11px] text-slate-500 mt-0.5">{perm.description}</p>
>>>>>>> origin/main
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: SHIFT & BRANCH */}
              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  <div>
<<<<<<< HEAD
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Shift Timing</label>
                    <select
                      value={editRecForm.shift}
                      onChange={(e) => setEditRecForm({ ...editRecForm, shift: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-blue-500"
=======
                    <label className="block font-medium text-slate-700 mb-1">Shift Timing</label>
                    <select
                      value={editRecForm.shift}
                      onChange={(e) => setEditRecForm({ ...editRecForm, shift: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
>>>>>>> origin/main
                    >
                      <option value="Morning (08:00 - 16:00)">Morning (08:00 - 16:00)</option>
                      <option value="Evening (12:00 - 20:00)">Evening (12:00 - 20:00)</option>
                      <option value="Full Day (09:00 - 18:00)">Full Day (09:00 - 18:00)</option>
                      <option value="Night (20:00 - 08:00)">Night (20:00 - 08:00)</option>
                    </select>
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Working Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <label key={day} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
=======
                    <label className="block font-medium text-slate-700 mb-1">Working Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <label key={day} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50">
>>>>>>> origin/main
                          <input
                            type="checkbox"
                            checked={editRecForm.workingDays.includes(day)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...editRecForm.workingDays, day]
                                : editRecForm.workingDays.filter((d) => d !== day);
                              setEditRecForm({ ...editRecForm, workingDays: updated });
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Assigned Clinic Branches</label>
                    <div className="space-y-2">
                      {activeClinic.branches.map((b) => (
                        <label key={b.id} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
=======
                    <label className="block font-medium text-slate-700 mb-1">Assigned Clinic Branches</label>
                    <div className="space-y-2">
                      {activeClinic.branches.map((b) => (
                        <label key={b.id} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
>>>>>>> origin/main
                          <input
                            type="checkbox"
                            checked={editRecForm.branchIds.includes(b.id)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...editRecForm.branchIds, b.id]
                                : editRecForm.branchIds.filter((id) => id !== b.id);
                              setEditRecForm({ ...editRecForm, branchIds: updated });
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <div>
<<<<<<< HEAD
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{b.name}</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 block">{b.address}</span>
=======
                            <span className="font-semibold text-slate-800">{b.name}</span>
                            <span className="text-[11px] text-slate-400 block">{b.address}</span>
>>>>>>> origin/main
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ACTIVITY HISTORY */}
              {activeTab === 'activity' && (
                <div className="space-y-2">
                  {(selectedReceptionist.activityHistory || [
                    { id: '1', action: 'Receptionist desk account provisioned', timestamp: selectedReceptionist.createdAt || '2025-02-01', actor: 'Clinic Administrator' }
                  ]).map((act) => (
<<<<<<< HEAD
                    <div key={act.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{act.action}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">By {act.actor} • {act.timestamp}</p>
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

              {/* Footer */}
<<<<<<< HEAD
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
=======
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
>>>>>>> origin/main
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(selectedReceptionist)}
<<<<<<< HEAD
                  className="text-rose-600 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40"
=======
                  className="text-rose-600 border-rose-200 hover:bg-rose-50"
>>>>>>> origin/main
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove Staff
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
      {/* DELETE RECEPTIONIST MODAL */}
      {/* ========================================================================= */}
      {isDeleteModalOpen && deleteTargetReceptionist && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Remove Receptionist Profile"
          size="md"
        >
          <div className="space-y-4 text-xs">
<<<<<<< HEAD
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-200">Remove Staff Member</h4>
                <p className="mt-0.5 text-amber-700 dark:text-amber-300">
=======
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900">Remove Staff Member</h4>
                <p className="mt-0.5 text-amber-700">
>>>>>>> origin/main
                  Are you sure you want to remove <strong>{deleteTargetReceptionist.name}</strong> from <strong>{activeClinic.name}</strong>?
                </p>
              </div>
            </div>

<<<<<<< HEAD
            <p className="text-slate-600 dark:text-slate-300">
              Removing a receptionist will revoke their desk session immediately. To preserve historical check-in audit logs and shift records, you can choose to <strong>Deactivate Account</strong> instead of permanent deletion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
=======
            <p className="text-slate-600">
              Removing a receptionist will revoke their desk session immediately. To preserve historical check-in audit logs and shift records, you can choose to <strong>Deactivate Account</strong> instead of permanent deletion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100">
>>>>>>> origin/main
              <Button variant="outline" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" size="sm" onClick={handleDeactivateInstead}>
                <UserCheck className="w-3.5 h-3.5 mr-1" /> Deactivate Instead
              </Button>
              <Button variant="danger" size="sm" onClick={confirmDeleteReceptionist}>
                Confirm Removal
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
