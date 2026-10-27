import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  Building2,
  ChevronDown,
  LogOut,
  CheckCircle,
  Menu
} from 'lucide-react';

export function WorkspaceHeader({ onToggleSidebar, sidebarOpen }) {
  const {
    currentUser,
    currentRole,
    activeClinic,
    activeBranch,
    switchBranch,
    appointments = [],
    inventory = [],
    notifications = []
  } = useApp();
  const { logout, user: authUser } = useAuth();

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const roleLabels = {
    super_admin: { label: 'SaaS Superadmin', shortLabel: 'Super Admin', displayTitle: 'Super Admin', color: 'bg-blue-50/90 text-blue-700 border-blue-200/80' },
    clinic_admin: { label: 'Clinic Doctor/Admin', shortLabel: 'Clinic Admin', displayTitle: 'Doctor / Clinic Admin', color: 'bg-sky-50/90 text-sky-700 border-sky-200/80' },
    receptionist: { label: 'Receptionist/Manager', shortLabel: 'Reception', displayTitle: 'Receptionist / Manager', color: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80' },
    patient: { label: 'Patient Portal', shortLabel: 'Patient', displayTitle: 'Verified Patient', color: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80' }
  };

  // Derive breadcrumbs from path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const workspaceTitle = pathParts[0] ? pathParts[0].toUpperCase() : 'WORKSPACE';
  const subPageTitle = pathParts[1]
    ? pathParts[1].replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Overview';

  // Live notification items
  const hasClinicOperations = currentRole === 'clinic_admin' || currentRole === 'receptionist';
  const lowStock = hasClinicOperations
    ? inventory.filter((i) => i.clinicId === activeClinic?.id && i.currentStock <= i.minStockLevel)
    : [];
  const waitingPatients = hasClinicOperations
    ? appointments.filter((a) => a.status === 'Checked In' && a.clinicId === activeClinic?.id)
    : [];
  const visibleNotifications = notifications.filter((notification) =>
    (notification.recipientRole === currentRole || notification.recipientRole === 'all') &&
    (!notification.recipientUserId || notification.recipientUserId === currentUser?.id) &&
    (!notification.clinicId || notification.clinicId === activeClinic?.id)
  );

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const designationName =
    currentRole === 'super_admin'
      ? 'Super Admin'
      : (roleLabels[currentRole]?.displayTitle || roleLabels[currentRole]?.label || currentRole.replace('_', ' '));

  return (
    <header className="workspace-header sticky top-0 z-50 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 shadow-2xs">
      <div className="flex items-center justify-between gap-4 h-full">
        {/* Left: Mobile Toggle & Breadcrumbs / Role Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Navigation Sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="workspace-navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <span className="font-semibold text-slate-900 tracking-tight">{workspaceTitle}</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-700 font-medium">{subPageTitle}</span>
          </div>

          <span
            className={`max-w-[6rem] truncate whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-semibold sm:max-w-none sm:px-2.5 sm:py-0.5 sm:text-[11px] ${
              roleLabels[currentRole]?.color || 'bg-slate-100 text-slate-700'
            }`}
            title={roleLabels[currentRole]?.label}
          >
            <span className="sm:hidden">{roleLabels[currentRole]?.shortLabel}</span>
            <span className="hidden sm:inline">{roleLabels[currentRole]?.label}</span>
          </span>

          {/* Branch Switcher for Clinic Roles */}
          {(currentRole === 'clinic_admin' || currentRole === 'receptionist' || currentRole === 'doctor' || currentRole === 'inventory' || currentRole === 'accountant') &&
            activeClinic?.branches?.length > 1 && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setBranchDropdownOpen(!branchDropdownOpen);
                    setNotificationsOpen(false);
                    setProfileDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Branch: {activeBranch?.name || 'Main'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {branchDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setBranchDropdownOpen(false)}
                    />
                    <div className="absolute left-0 mt-1.5 w-64 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-fade-in">
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
                  </>
                )}
              </div>
            )}
        </div>

        {/* Center / Right: Global Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
                setBranchDropdownOpen(false);
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {(visibleNotifications.some((notification) => !notification.read) || lowStock.length > 0 || waitingPatients.length > 0) && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-1rem))] rounded-xl bg-white shadow-xl border border-slate-200 p-3.5 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
                    <span>Operational Notifications</span>
                    <span className="text-[10px] text-blue-600 font-normal hover:underline cursor-pointer">Mark all read</span>
                  </div>
                  <div className="mt-2 space-y-2 text-xs">
                    {visibleNotifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                        <p className="font-semibold text-slate-900">{notification.title}</p>
                        <p className="text-[11px] text-slate-500">{notification.message}</p>
                      </div>
                    ))}
                    {waitingPatients.slice(0, 2).map((a) => (
                      <div key={a.id} className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                        <p className="font-semibold text-slate-900">Patient Checked In: {a.patientName}</p>
                        <p className="text-[11px] text-slate-500">Waiting for {a.doctorName} (Token: {a.queueNumber || '#Q-1'})</p>
                      </div>
                    ))}
                    {lowStock.slice(0, 2).map((item) => (
                      <div key={item.id} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                        <p className="font-semibold text-slate-900">Low Stock Alert: {item.name}</p>
                        <p className="text-[11px] text-slate-500">Remaining stock {item.currentStock} {item.unit} (Min: {item.minStockLevel})</p>
                      </div>
                    ))}
                    {visibleNotifications.length === 0 && waitingPatients.length === 0 && lowStock.length === 0 && (
                      <p className="text-center text-slate-400 py-3 text-xs">No pending notifications</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Info - Interactive Dropdown */}
          <div className="relative pl-1 border-l border-slate-200">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
                setBranchDropdownOpen(false);
              }}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer select-none border border-transparent hover:border-slate-200"
              aria-label="User profile menu"
              aria-expanded={profileDropdownOpen}
            >
              <img
                src={
                  currentUser?.avatar ||
                  authUser?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                }
                alt={currentUser?.name || authUser?.name || 'User'}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-2xs shrink-0"
              />
              <span className="text-xs font-semibold text-slate-800 line-clamp-1 max-w-[150px] hidden sm:block">
                {currentUser?.name || authUser?.name}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  profileDropdownOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-[min(16rem,calc(100vw-1rem))] rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-fade-in">
                  {/* Profile & Designation Information Card */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser?.name || authUser?.name}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {currentUser?.email || authUser?.email || 'admin@clinicos.demo'}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Designation
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50/90 text-blue-700 border border-blue-200/80">
                        {designationName}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Log Out */}
                  <div className="pt-2 pb-0.5">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
