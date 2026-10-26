import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Briefcase,
  FileText,
  PlusCircle,
  Building2,
  CreditCard,
  Receipt,
  Package,
  BarChart3,
  Sparkles,
  Settings,
  UserPlus,
  UserCheck,
  Clock,
  CheckSquare,
  Shield,
<<<<<<< HEAD
  ShieldCheck,
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  Layers,
  Activity,
  X,
  ExternalLink,
  MessageSquareHeart,
<<<<<<< HEAD
  MessageSquare,
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  LifeBuoy,
  Bell,
  TrendingUp,
  History,
  ShieldAlert
} from 'lucide-react';

export function WorkspaceSidebar({ isOpen, onClose }) {
<<<<<<< HEAD
  const { currentRole, activeClinic, appointments = [], notifications = [], currentUser } = useApp();
=======
  const {
    currentRole,
    activeClinic,
    appointments = [],
    notifications = [],
    currentUser,
    isNotificationForCurrentUser
  } = useApp();
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  const location = useLocation();

  // Badges calculation
  const pendingRequestsCount = appointments.filter(
    (a) => (a.clinicId === activeClinic?.id || !a.clinicId) && (a.status === 'Pending Clinic Confirmation' || a.status === 'Requested')
  ).length;

  const patientRequestsCount = appointments.filter(
    (a) =>
<<<<<<< HEAD
      (a.patientName === currentUser?.name || a.patientId === currentUser?.id || !a.patientId) &&
      (a.status === 'Pending Clinic Confirmation' || a.status === 'Alternative Slot Proposed' || a.status === 'Awaiting Patient Response')
  ).length;

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
=======
      (a.patientId === currentUser?.id ||
        a.patientEmail?.toLowerCase() === currentUser?.email?.toLowerCase() ||
        (!a.patientId && a.patientName === currentUser?.name)) &&
      (a.status === 'Pending Clinic Confirmation' || a.status === 'Alternative Slot Proposed' || a.status === 'Awaiting Patient Response')
  ).length;

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.read && isNotificationForCurrentUser(notification)
  ).length;
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

  const navConfigs = {
    // Role 1: SaaS Superadmin
    super_admin: [
      { label: 'Platform Dashboard', path: '/superadmin/dashboard', icon: LayoutDashboard },
      { label: 'Clinics Directory', path: '/superadmin/clinics', icon: Building2 },
      { label: 'Subscription Plans', path: '/superadmin/plans', icon: Sparkles },
      { label: 'Tenant Subscriptions', path: '/superadmin/subscriptions', icon: Layers },
      { label: 'SaaS Corporate Finance', path: '/superadmin/finance/overview', icon: CreditCard },
<<<<<<< HEAD
      { label: 'Workforce & Role Matrix', path: '/superadmin/role-matrix', icon: ShieldCheck },
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      { label: 'Support Tickets', path: '/superadmin/support', icon: LifeBuoy },
      { label: 'Platform Health & SLA', path: '/superadmin/platform', icon: Activity },
      { label: 'Administrative Activity', path: '/superadmin/activity', icon: History },
      { label: 'Platform Settings', path: '/superadmin/settings', icon: Settings }
    ],

    // Role 2: Clinic Doctor/Admin
    clinic_admin: [
      { label: 'Clinic Dashboard', path: '/clinic/dashboard', icon: LayoutDashboard },
      { label: 'Appointments Calendar', path: '/clinic/appointments', icon: Calendar },
      { label: 'Live Patient Queue', path: '/clinic/queue', icon: Clock },
      { label: 'Patients Directory', path: '/clinic/patients', icon: Users },
      { label: 'Doctor Consultations', path: '/clinic/consultations', icon: Stethoscope },
      { label: 'Digital Prescriptions', path: '/clinic/prescriptions', icon: FileText },
      { label: 'Doctor Management', path: '/clinic/doctors', icon: Stethoscope },
      { label: 'Staff & Permissions', path: '/clinic/staff', icon: UserCheck },
      { label: 'Doctor Schedules & Rota', path: '/clinic/schedules', icon: Calendar },
      { label: 'Pharmacy & Inventory', path: '/clinic/inventory', icon: Package },
      { label: 'Clinic Practice Finance', path: '/clinic/finance/overview', icon: Receipt },
      { label: 'Patient Feedback', path: '/clinic/feedback', icon: MessageSquareHeart },
      { label: 'Clinic Reports', path: '/clinic/reports', icon: BarChart3 },
      { label: 'SaaS Subscription', path: '/clinic/subscription', icon: Sparkles },
      { label: 'Platform Support', path: '/clinic/support', icon: LifeBuoy },
      { label: 'Clinic Settings', path: '/clinic/settings', icon: Settings }
    ],

    // Role 3: Clinic Receptionist/Manager
    receptionist: [
      { label: 'Reception Dashboard', path: '/reception/dashboard', icon: LayoutDashboard },
      { label: 'Booking Requests', path: '/reception/requests', icon: Clock, badge: pendingRequestsCount },
      { label: 'Appointments Schedule', path: '/reception/appointments', icon: Calendar },
      { label: 'Express Walk-In Counter', path: '/reception/walk-ins', icon: UserCheck },
      { label: 'Live Patient Queue', path: '/reception/queue', icon: Users },
      { label: 'Patient Registration', path: '/reception/patients', icon: UserPlus },
      { label: 'Doctor Availability', path: '/reception/schedule', icon: Calendar },
      { label: 'Communication & Alerts', path: '/reception/communication', icon: Bell },
      { label: 'Stock Refill Requests', path: '/reception/stock-requests', icon: Package },
      { label: 'Billing & Payments', path: '/reception/billing', icon: Receipt },
      { label: 'Platform Support', path: '/reception/support', icon: LifeBuoy }
    ],

    // Role 4: Patient
    patient: [
      { label: 'Health Overview', path: '/patient/dashboard', icon: LayoutDashboard },
      { label: 'Explore Clinics', path: '/patient/clinics', icon: Building2 },
      { label: 'Find Specialists', path: '/patient/doctors', icon: Stethoscope },
      { label: 'Book Appointment', path: '/patient/appointments/book', icon: PlusCircle },
      { label: 'Booking Requests', path: '/patient/appointments/requests', icon: Clock, badge: patientRequestsCount },
      { label: 'My Appointments', path: '/patient/appointments', icon: Calendar },
      { label: 'Visit Records', path: '/patient/records', icon: FileText },
      { label: 'Digital Prescriptions', path: '/patient/prescriptions', icon: FileText },
      { label: 'Invoices & Receipts', path: '/patient/bills', icon: Receipt },
      { label: 'Notifications', path: '/patient/notifications', icon: Bell, badge: unreadNotificationsCount },
      { label: 'Submit Feedback', path: '/patient/feedback', icon: MessageSquareHeart },
      { label: 'My Profile', path: '/patient/profile', icon: Settings }
    ]
  };

  const navItems = navConfigs[currentRole] || navConfigs.clinic_admin;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
<<<<<<< HEAD
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
=======
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          onClick={onClose}
        />
      )}

      <aside
<<<<<<< HEAD
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white text-slate-700 flex flex-col transition-transform duration-200 ease-out border-r border-slate-200/90 shadow-2xs ${
=======
        className={`fixed top-9 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800 ${
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Brand / Header */}
<<<<<<< HEAD
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:bg-blue-700 transition-colors">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900">
                Clinic<span className="text-blue-600">OS</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
=======
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white">
                Clinic<span className="text-blue-400">OS</span>
              </span>
              <span className="block text-[10px] text-blue-400 font-semibold tracking-wider uppercase">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                Healthcare SaaS
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
<<<<<<< HEAD
            className="lg:hidden text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Close sidebar"
=======
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isCustomActive =
              (item.path.includes('/finance') && location.pathname.includes('/finance')) ||
              (item.path === '/clinic/consultations' && location.pathname.startsWith('/clinic/consultations')) ||
              (item.path === '/patient/clinics' && location.pathname.startsWith('/patient/clinics'));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
<<<<<<< HEAD
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive || isCustomActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs border-l-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0 opacity-80" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 shrink-0 border border-amber-200">
=======
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive || isCustomActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 shrink-0">
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / Tenant Context Info */}
<<<<<<< HEAD
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 text-xs">
          {currentRole !== 'super_admin' && (
            <div className="mb-2 px-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tenant Workspace</div>
              <div className="text-xs font-semibold text-slate-800 truncate">{activeClinic?.name}</div>
=======
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-xs">
          {currentRole !== 'super_admin' && (
            <div className="mb-2 px-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Tenant Workspace</div>
              <div className="text-xs font-semibold text-slate-300 truncate">{activeClinic.name}</div>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
            </div>
          )}
          <Link
            to="/clinics"
<<<<<<< HEAD
            className="flex items-center justify-between text-[11px] text-slate-500 hover:text-blue-600 px-1 py-1 rounded-lg transition-colors hover:bg-slate-100/80"
          >
            <span>Public Clinic Directory</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
=======
            className="flex items-center justify-between text-[11px] text-slate-400 hover:text-blue-400 px-1 py-1 rounded transition-colors"
          >
            <span>Public Clinic Directory</span>
            <ExternalLink className="w-3 h-3" />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          </Link>
        </div>
      </aside>
    </>
  );
}
