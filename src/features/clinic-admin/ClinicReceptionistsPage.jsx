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
    category: 'Reports'
  }
];

export function ClinicReceptionistsPage() {
  const {
    receptionists,
    activeClinic,
    addReceptionist,
    updateReceptionist,
    toggleReceptionistStatus,
    deleteReceptionist,
    showToast
  } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedShift, setSelectedShift] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

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

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBranch('ALL');
    setSelectedShift('ALL');
    setSelectedStatus('ALL');
    setSortBy('name_asc');
    setCurrentPage(1);
  };

  // Open View/Edit Modal
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
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Front Desk & Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Receptionist Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
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
      <Card className="p-4 border-slate-200 bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, email, phone, staff ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-blue-500 bg-slate-50/50"
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
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
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
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
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
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
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
        <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <span>
              Showing <strong>{filteredReceptionists.length}</strong> staff member{filteredReceptionists.length === 1 ? '' : 's'}
            </span>
            {(searchTerm || selectedBranch !== 'ALL' || selectedShift !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium ml-2 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-blue-500"
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
        <Card className="p-12 text-center border-slate-200 bg-white">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No receptionists match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
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
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="px-4 py-3.5">Staff & Contact</th>
                  <th className="px-4 py-3.5">Assigned Branches</th>
                  <th className="px-4 py-3.5">Shift & Schedule</th>
                  <th className="px-4 py-3.5">Permissions Summary</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedReceptionists.map((rec) => {
                  const hasFeedbackAccess = (rec.permissions || []).includes('view_patient_feedback');
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Staff Info */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={rec.avatar}
                            alt={rec.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className="font-bold text-slate-900 text-xs hover:text-blue-700 cursor-pointer"
                                onClick={() => handleOpenViewEdit(rec, 'overview')}
                              >
                                {rec.name}
                              </span>
                              <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {rec.staffIdNumber || 'REC'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">{rec.email}</p>
                            <p className="text-[10px] text-slate-400">{rec.phone}</p>
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
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 border border-slate-200"
                              >
                                <Building2 className="w-2.5 h-2.5 text-blue-600" />
                                {branch?.name || bId}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      {/* Shift & Schedule */}
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-semibold text-slate-800">{rec.shift}</p>
                        <p className="text-[10px] text-slate-400">{(rec.workingDays || []).join(', ')}</p>
                      </td>

                      {/* Permissions Summary */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-[240px]">
                          {hasFeedbackAccess ? (
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
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenViewEdit(rec, 'permissions')}
                            title="Configure Permissions"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(rec)}
                            title="Remove Staff"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
                <Card key={rec.id} className="p-4 border-slate-200 bg-white space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.avatar}
                        alt={rec.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{rec.name}</h3>
                        <p className="text-xs text-slate-500">{rec.email}</p>
                        <span className="text-[10px] font-mono text-slate-400">{rec.staffIdNumber || 'REC'}</span>
                      </div>
                    </div>
                    <Badge variant={rec.status || 'Active'}>{rec.status || 'Active'}</Badge>
                  </div>

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
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">Branches: {rec.branchIds?.length || 1}</span>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="xs" onClick={() => handleOpenViewEdit(rec, 'permissions')}>
                        Permissions
                      </Button>
                      <button
                        onClick={() => handleDeleteClick(rec)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
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
            <div className="flex items-center justify-between px-2 py-3 text-xs text-slate-500">
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
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Front-Desk Staff Onboarding</p>
                <p className="text-[11px] text-blue-700">
                  Provision new desk staff accounts, configure shifts, and explicitly define role permissions.
                </p>
              </div>
            </div>

            {/* Section 1: Personal Details */}
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">1. Staff Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Staff Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Sharma"
                    value={newRecForm.name}
                    onChange={(e) => setNewRecForm({ ...newRecForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email (Login ID) *</label>
                  <input
                    type="email"
                    required
                    placeholder="pooja.sharma@clinic.demo"
                    value={newRecForm.email}
                    onChange={(e) => setNewRecForm({ ...newRecForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98201 00000"
                    value={newRecForm.phone}
                    onChange={(e) => setNewRecForm({ ...newRecForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Custom Staff ID</label>
                  <input
                    type="text"
                    placeholder="e.g. REC-205"
                    value={newRecForm.staffIdNumber}
                    onChange={(e) => setNewRecForm({ ...newRecForm, staffIdNumber: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Shift & Branch */}
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">2. Shift & Branch Assignment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Shift Timing</label>
                  <select
                    value={newRecForm.shift}
                    onChange={(e) => setNewRecForm({ ...newRecForm, shift: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
                  >
                    <option value="Morning (08:00 - 16:00)">Morning (08:00 - 16:00)</option>
                    <option value="Evening (12:00 - 20:00)">Evening (12:00 - 20:00)</option>
                    <option value="Full Day (09:00 - 18:00)">Full Day (09:00 - 18:00)</option>
                    <option value="Night (20:00 - 08:00)">Night (20:00 - 08:00)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Account Status</label>
                  <select
                    value={newRecForm.status}
                    onChange={(e) => setNewRecForm({ ...newRecForm, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Invitation Pending">Invitation Pending</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Assigned Clinic Branches</label>
                <div className="flex flex-wrap gap-2">
                  {activeClinic.branches.map((b) => (
                    <label key={b.id} className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50">
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
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">3. Granular Permissions</h4>
                <span className="text-[11px] text-blue-600 font-semibold">{newRecForm.permissions.length} Enabled</span>
              </div>

              <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                {ALL_PERMISSIONS.map((perm) => {
                  const isChecked = newRecForm.permissions.includes(perm.id);
                  return (
                    <label
                      key={perm.id}
                      className={`flex items-start gap-3 p-2 rounded-lg border transition-colors cursor-pointer ${
                        perm.isSpecial
                          ? isChecked
                            ? 'bg-emerald-50/70 border-emerald-300'
                            : 'bg-white border-amber-200'
                          : isChecked
                          ? 'bg-white border-blue-200'
                          : 'bg-white border-slate-200'
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
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
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
                  <span className="font-mono">ID: {selectedReceptionist.staffIdNumber}</span>
                  <span>•</span>
                  <span>Joined: {selectedReceptionist.joiningDate || '2025-02-01'}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div className="shrink-0 text-right">
                <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Status</label>
                <select
                  value={editRecForm.status}
                  onChange={(e) => setEditRecForm({ ...editRecForm, status: e.target.value })}
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-blue-500 font-medium"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Invitation Pending">Invitation Pending</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 text-xs font-medium space-x-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'permissions', label: `Permissions (${editRecForm.permissions.length})` },
                { id: 'schedule', label: 'Shift & Branch' },
                { id: 'activity', label: 'Activity History' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
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
                      <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editRecForm.name}
                        onChange={(e) => setEditRecForm({ ...editRecForm, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editRecForm.email}
                        onChange={(e) => setEditRecForm({ ...editRecForm, email: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editRecForm.phone}
                        onChange={(e) => setEditRecForm({ ...editRecForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Staff ID</label>
                      <input
                        type="text"
                        value={editRecForm.staffIdNumber}
                        onChange={(e) => setEditRecForm({ ...editRecForm, staffIdNumber: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Feedback Access Highlight Card */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    editRecForm.permissions.includes('view_patient_feedback')
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
                  <p className="text-slate-600">
                    Configure granular permissions assigned to <strong>{selectedReceptionist.name}</strong>. Changes take effect on the next session.
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
                                ? 'bg-emerald-50/70 border-emerald-300'
                                : 'bg-amber-50/50 border-amber-200'
                              : isChecked
                              ? 'bg-slate-50 border-slate-300'
                              : 'bg-white border-slate-200'
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
                              <span className={`font-semibold ${perm.isSpecial ? 'text-emerald-900 font-bold' : 'text-slate-800'}`}>
                                {perm.label}
                              </span>
                              <Badge variant={isChecked ? 'Active' : 'Inactive'}>
                                {isChecked ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">{perm.description}</p>
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
                    <label className="block font-medium text-slate-700 mb-1">Shift Timing</label>
                    <select
                      value={editRecForm.shift}
                      onChange={(e) => setEditRecForm({ ...editRecForm, shift: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-blue-500 bg-white"
                    >
                      <option value="Morning (08:00 - 16:00)">Morning (08:00 - 16:00)</option>
                      <option value="Evening (12:00 - 20:00)">Evening (12:00 - 20:00)</option>
                      <option value="Full Day (09:00 - 18:00)">Full Day (09:00 - 18:00)</option>
                      <option value="Night (20:00 - 08:00)">Night (20:00 - 08:00)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Working Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <label key={day} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50">
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
                    <label className="block font-medium text-slate-700 mb-1">Assigned Clinic Branches</label>
                    <div className="space-y-2">
                      {activeClinic.branches.map((b) => (
                        <label key={b.id} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
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
                            <span className="font-semibold text-slate-800">{b.name}</span>
                            <span className="text-[11px] text-slate-400 block">{b.address}</span>
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
                    <div key={act.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">{act.action}</p>
                        <p className="text-[10px] text-slate-400">By {act.actor} • {act.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(selectedReceptionist)}
                  className="text-rose-600 border-rose-200 hover:bg-rose-50"
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
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900">Remove Staff Member</h4>
                <p className="mt-0.5 text-amber-700">
                  Are you sure you want to remove <strong>{deleteTargetReceptionist.name}</strong> from <strong>{activeClinic.name}</strong>?
                </p>
              </div>
            </div>

            <p className="text-slate-600">
              Removing a receptionist will revoke their desk session immediately. To preserve historical check-in audit logs and shift records, you can choose to <strong>Deactivate Account</strong> instead of permanent deletion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100">
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

