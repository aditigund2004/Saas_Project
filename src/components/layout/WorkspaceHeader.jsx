import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
<<<<<<< HEAD
import { useLocation, useNavigate } from 'react-router-dom';
=======
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
import {
  Bell,
  MessageSquare,
  Building2,
  ChevronDown,
  LogOut,
<<<<<<< HEAD
  CheckCircle,
  Menu
=======
  Sparkles,
  CheckCircle,
  Menu,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Package,
  CreditCard,
  User,
  Search,
  ExternalLink,
  LifeBuoy
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
} from 'lucide-react';

export function WorkspaceHeader({ onToggleSidebar }) {
  const {
    currentUser,
    currentRole,
    activeClinic,
    activeBranch,
    switchBranch,
<<<<<<< HEAD
    openWhatsAppModal,
    appointments = [],
    inventory = []
  } = useApp();
  const { logout, user: authUser } = useAuth();

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
=======
    showToast,
    openWhatsAppModal,
    appointments,
    inventory
  } = useApp();
  const { logout, loginAsDemoRole } = useAuth();

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

  const navigate = useNavigate();
  const location = useLocation();

  const roleLabels = {
<<<<<<< HEAD
    super_admin: { label: 'SaaS Superadmin', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    clinic_admin: { label: 'Clinic Doctor/Admin', color: 'bg-sky-50 text-sky-800 border-sky-200' },
    receptionist: { label: 'Receptionist/Manager', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    patient: { label: 'Patient Portal', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
=======
    super_admin: { label: 'SaaS Superadmin', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    clinic_admin: { label: 'Clinic Doctor/Admin', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    receptionist: { label: 'Receptionist/Manager', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    patient: { label: 'Patient Portal', color: 'bg-sky-50 text-sky-800 border-sky-200' }
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  };

  // Derive breadcrumbs from path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const workspaceTitle = pathParts[0] ? pathParts[0].toUpperCase() : 'WORKSPACE';
  const subPageTitle = pathParts[1]
<<<<<<< HEAD
    ? pathParts[1].replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
=======
    ? pathParts[1].replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    : 'Overview';

  // Live notification items
  const lowStock = inventory.filter((i) => i.currentStock <= i.minStockLevel);
  const waitingPatients = appointments.filter((a) => a.status === 'Checked In');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

<<<<<<< HEAD
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200/90 px-4 sm:px-6 py-2.5 shadow-2xs">
=======
  const handleDemoRoleSwitch = async (role, path) => {
    const result = await loginAsDemoRole(role);
    if (!result.success) {
      showToast(result.error || 'Could not switch demo account.', 'error');
      return;
    }
    setUserMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="workspace-header sticky top-9 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 shadow-2xs">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumbs / Role Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
<<<<<<< HEAD
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
=======
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
<<<<<<< HEAD
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <span className="font-semibold text-slate-900 tracking-tight">{workspaceTitle}</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-700 font-medium">{subPageTitle}</span>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
=======
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-900">{workspaceTitle}</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-700 font-semibold">{subPageTitle}</span>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              roleLabels[currentRole]?.color || 'bg-slate-100 text-slate-700'
            }`}
          >
            {roleLabels[currentRole]?.label}
          </span>

          {/* Branch Switcher for Clinic Roles */}
          {(currentRole === 'clinic_admin' || currentRole === 'receptionist' || currentRole === 'doctor' || currentRole === 'inventory' || currentRole === 'accountant') &&
            activeClinic?.branches?.length > 1 && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Branch: {activeBranch?.name || 'Main'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {branchDropdownOpen && (
<<<<<<< HEAD
                  <div className="absolute left-0 mt-1.5 w-64 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-fade-in">
=======
                  <div className="absolute left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-50">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Switch Active Branch
                    </div>
                    {activeClinic.branches.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          switchBranch(b.id);
                          setBranchDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                          b.id === activeBranch?.id ? 'text-blue-700 font-semibold bg-blue-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{b.name}</div>
                          <div className="text-[10px] text-slate-400">{b.city} · {b.operatingHours}</div>
                        </div>
                        {b.id === activeBranch?.id && <CheckCircle className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>

        {/* Center / Right: Global Search & Actions */}
        <div className="flex items-center gap-3">
<<<<<<< HEAD
=======
          <ThemeToggle />
          {/* WhatsApp Preview Modal Button */}
          <button
            onClick={() =>
              openWhatsAppModal({
                patient_name: 'Aarav Patel',
                clinic_name: activeClinic.name,
                appointment_date: '23 Oct 2026',
                appointment_time: '10:30 AM',
                doctor_name: 'Dr. Arvind Rao',
                appointment_reference: 'APT-2601',
                clinic_phone: activeClinic.phone
              })
            }
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            title="Preview WhatsApp integration templates & simulated delivery"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Messages</span>
          </button>

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
<<<<<<< HEAD
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative cursor-pointer"
=======
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 relative cursor-pointer"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {(lowStock.length > 0 || waitingPatients.length > 0) && (
<<<<<<< HEAD
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
=======
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
              )}
            </button>

            {notificationsOpen && (
<<<<<<< HEAD
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-xl border border-slate-200 p-3.5 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
                  <span>Operational Notifications</span>
                  <span className="text-[10px] text-blue-600 font-normal hover:underline cursor-pointer">Mark all read</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  {waitingPatients.slice(0, 2).map((a) => (
                    <div key={a.id} className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                      <p className="font-semibold text-slate-900">Patient Checked In: {a.patientName}</p>
=======
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
                  <span>Operational Notifications</span>
                  <span className="text-[10px] text-blue-600 font-normal cursor-pointer">Mark all read</span>
                </div>
                <div className="mt-2.5 space-y-2 text-xs">
                  {waitingPatients.slice(0, 2).map((a) => (
                    <div key={a.id} className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                      <p className="font-bold text-slate-900">Patient Checked In: {a.patientName}</p>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                      <p className="text-[11px] text-slate-500">Waiting for {a.doctorName} (Token: {a.queueNumber || '#Q-1'})</p>
                    </div>
                  ))}
                  {lowStock.slice(0, 2).map((item) => (
<<<<<<< HEAD
                    <div key={item.id} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                      <p className="font-semibold text-slate-900">Low Stock Alert: {item.name}</p>
                      <p className="text-[11px] text-slate-500">Remaining stock {item.currentStock} {item.unit} (Min: {item.minStockLevel})</p>
                    </div>
                  ))}
                  {waitingPatients.length === 0 && lowStock.length === 0 && (
                    <p className="text-center text-slate-400 py-3 text-xs">No pending notifications</p>
                  )}
=======
                    <div key={item.id} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                      <p className="font-bold text-slate-900">Low Stock Alert: {item.name}</p>
                      <p className="text-[11px] text-slate-500">Remaining stock {item.currentStock} {item.unit} (Min: {item.minStockLevel})</p>
                    </div>
                  ))}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                </div>
              </div>
            )}
          </div>

<<<<<<< HEAD
          {/* User Profile Info - Clean Avatar, Name, Role & Signout */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="flex items-center gap-2.5">
              <img
                src={
                  currentUser?.avatar ||
                  authUser?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                }
                alt={currentUser?.name || authUser?.name || 'User'}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-2xs"
              />
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-slate-800 line-clamp-1 leading-tight">
                  {currentUser?.name || authUser?.name}
                </p>
                <p className="text-[10px] text-slate-400 capitalize">
                  {currentRole === 'super_admin' ? 'Super Admin' : (roleLabels[currentRole]?.label || currentRole.replace('_', ' '))}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
=======
          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 shadow-2xs"
              />
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold text-slate-800 line-clamp-1">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-400 capitalize">{currentRole.replace('_', ' ')}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => handleDemoRoleSwitch('super_admin', '/superadmin/dashboard')}
                    className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <span>SaaS Superadmin</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDemoRoleSwitch('clinic_admin', '/clinic/dashboard')}
                    className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <span>Clinic Doctor/Admin</span>
                    <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDemoRoleSwitch('receptionist', '/reception/dashboard')}
                    className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <span>Receptionist/Manager</span>
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDemoRoleSwitch('patient', '/patient/dashboard')}
                    className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <span>Patient Portal</span>
                    <User className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <Link
                    to="/demo-access"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full text-left px-4 py-1.5 text-xs text-blue-700 hover:bg-blue-50 cursor-pointer flex items-center justify-between font-semibold"
                  >
                    <span>Demo Accounts Console</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  </Link>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out / Switch Persona
                  </button>
                </div>
              </div>
            )}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          </div>
        </div>
      </div>
    </header>
  );
}
