import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MockAuthService } from '../../services/mockAuthService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Shield,
  X,
  CheckCircle2,
  Clock,
  UserCheck,
  Send,
  Building2,
  AlertCircle,
  ExternalLink,
  Ban
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ClinicStaffPage() {
  const { staffMembers, inviteStaffMember, updateStaffRole, activeClinic, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'invitations'
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Invitations state (Section 13)
  const [invitations, setInvitations] = useState(() =>
    MockAuthService.getStaffInvitations(activeClinic?.id)
  );

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'receptionist_manager',
    branchId: activeClinic?.branches?.[0]?.id || 'branch-main',
    department: 'Front Desk Administration',
    shift: '09:00 - 18:00'
  });

  const filteredStaff = staffMembers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvite = (e) => {
    e.preventDefault();
    const created = MockAuthService.createStaffInvitation({
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      clinicId: activeClinic?.id || 'clinic-citycare',
      clinicName: activeClinic?.name || 'CityCare Family Clinic',
      branchId: newStaff.branchId,
      branchName: activeClinic?.branches?.find((b) => b.id === newStaff.branchId)?.name || 'Main Hub',
      invitedBy: 'Dr. Aarav Mehta (Clinic Admin)'
    });

    // Also add to staff members roster
    inviteStaffMember({
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role === 'receptionist_manager' ? 'receptionist' : 'doctor',
      department: newStaff.department,
      shift: newStaff.shift
    });

    setInvitations(MockAuthService.getStaffInvitations(activeClinic?.id));
    setModalOpen(false);
    showToast(`Staff invitation dispatched to ${newStaff.email}.`);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'receptionist_manager',
      branchId: activeClinic?.branches?.[0]?.id || 'branch-main',
      department: 'Front Desk Administration',
      shift: '09:00 - 18:00'
    });
  };

  const handleStatusChange = (id, newStatus) => {
    MockAuthService.updateStaffInvitationStatus(id, newStatus);
    setInvitations(MockAuthService.getStaffInvitations(activeClinic?.id));
    showToast(`Invitation marked as ${newStatus}.`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'Pending':
        return <Badge variant="warning">Pending Response</Badge>;
      case 'Expired':
        return <Badge variant="default">Expired</Badge>;
      case 'Cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 uppercase tracking-wide">
              Team & Permissions
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{activeClinic?.name}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Staff & Role Provisioning</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">

            Provision Receptionist/Manager and clinician privileges. Public self-signup is strictly blocked for staff.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Invite Staff Member
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">

        <button
          type="button"
          onClick={() => setActiveTab('roster')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'roster'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'

          }`}
        >
          Active Staff Roster ({filteredStaff.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('invitations')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'invitations'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'

          }`}
        >
          Simulated Staff Invitations ({invitations.length})
        </button>
      </div>

      {/* TAB 1: ACTIVE STAFF ROSTER */}
      {activeTab === 'roster' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team member by name, email, department, or role..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-3 py-3 text-center w-12 font-semibold">#</th>

                    <th className="px-4 py-3">Staff Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Shift Timing</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Role Privileges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStaff.map((staff, idx) => (
                    <tr key={staff.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 dark:text-white">{staff.name}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">Joined {staff.joinedDate}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 uppercase">
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">
                        {staff.department}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-slate-800 dark:text-slate-200">{staff.email}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{staff.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-mono">

                        {staff.shift}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="success" size="sm">{staff.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <select
                          value={staff.role}
                          onChange={(e) => updateStaffRole(staff.id, e.target.value)}
                          className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"

                        >
                          <option value="doctor">Doctor</option>
                          <option value="receptionist">Receptionist</option>
                          <option value="inventory">Inventory Staff</option>
                          <option value="accountant">Accountant</option>
                          <option value="admin">Clinic Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: INVITATIONS & PROVISIONING (Section 13) */}
      {activeTab === 'invitations' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />

            <div className="space-y-1">
              <span className="font-bold text-sm block">Governed Staff Provisioning (Section 13):</span>
              <p className="leading-relaxed">
                ClinicOS security prevents public self-signup for Receptionists and Doctors. Clinic Administrators invite staff members here. Once dispatched, staff can simulate acceptance and log in using their provisioned credentials.
              </p>
            </div>
          </div>

          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-3 py-3 text-center w-12 font-semibold">#</th>

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
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">

                        No staff invitations on record. Click "+ Invite Staff Member" to dispatch an invite.
                      </td>
                    </tr>
                  ) : (
                    invitations.map((inv, idx) => (
                      <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
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
                          {getStatusBadge(inv.status)}
                        </td>
                        <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                          {inv.status === 'Pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => handleStatusChange(inv.id, 'Accepted')}
                                className="text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100"

                              >
                                Simulate Accept
                              </Button>
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => handleStatusChange(inv.id, 'Cancelled')}
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

      {/* Invite Modal (Section 13) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Invite Staff Member to ClinicOS
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1">

                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Full Name *</label>

                <input
                  required
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="e.g. Kavita Deshpande"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"

                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Work Email Address *</label>

                  <input
                    required
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    placeholder="staff@clinic.demo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Contact Phone Number</label>

                  <input
                    type="text"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono focus:ring-2 focus:ring-blue-500"

                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Permitted Role *</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-blue-500"

                  >
                    <option value="receptionist_manager">Receptionist / Front Desk Manager</option>
                    <option value="doctor_admin">Doctor / Medical Clinician</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Assigned Branch *</label>
                  <select
                    value={newStaff.branchId}
                    onChange={(e) => setNewStaff({ ...newStaff, branchId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-blue-500"

                  >
                    {activeClinic?.branches?.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    )) || <option value="branch-main">Main Clinic Hub</option>}
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />

                <span>
                  Inviting a staff member registers them with restricted permissions under {activeClinic?.name}. They will be able to sign in via the dedicated Staff Login portal.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold">
                  <Send className="w-3.5 h-3.5 mr-1" /> Dispatch Staff Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


