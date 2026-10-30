import { useState, useEffect } from 'react'
import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, BookOpen, CalendarCheck2, CalendarDays, CalendarPlus, ChevronDown, ChevronLeft,
  ChevronRight, CircleHelp, ClipboardList, Clock, CreditCard, Eye, FileBarChart, HeartPulse, LayoutDashboard, LogOut, Mail, Menu,
  MessageSquare, MoreHorizontal, Palette, Pill, Plus, Search, Settings, ShieldCheck, ShoppingBag, Stethoscope, Store, User, UserCheck, UserPlus, Users, X,
} from 'lucide-react'
import { useStore } from './Store'
import { WhatsAppIcon } from './whatsapp'
import { getThemeById } from './themeConfig'

const superNavigation = [
  { label: 'Dashboard', to: '/super-admin/dashboard', icon: LayoutDashboard },
  { label: 'Organizations', to: '/super-admin/organizations', icon: Users },
  { label: 'Subscription plans', to: '/super-admin/plans', icon: CreditCard },
  { label: 'Subscriptions', to: '/super-admin/subscriptions', icon: Activity },
  { label: 'Email Notifications', to: '/super-admin/emails', icon: Mail },
  { label: 'Billing & invoices', to: '/super-admin/billing', icon: FileBarChart },
  { label: 'Reports', to: '/super-admin/reports', icon: FileBarChart },
  { label: 'Notifications', to: '/super-admin/notifications', icon: Bell },
  { label: 'Settings', to: '/super-admin/settings', icon: Settings },
]

const doctorNavigation = [
  { label: 'Dashboard', to: '/clinic/dashboard', icon: LayoutDashboard },
  { label: 'My Appointments', to: '/clinic/appointments', icon: CalendarDays },
  { label: 'Patient Records', to: '/clinic/patients', icon: Users },
  { label: 'Consultation Notes', to: '/clinic/notes', icon: ClipboardList },
  { label: 'Appointment History', to: '/clinic/history', icon: Clock },
  { label: 'Availability / Schedule', to: '/clinic/schedule', icon: CalendarCheck2 },
  { label: 'Health Articles', to: '/clinic/blog', icon: BookOpen },
  { label: 'Pharmacy Management', to: '/clinic/pharmacy', icon: Store },
  { label: 'Appearance / Theme Settings', to: '/clinic/appearance', icon: Palette },
  { label: 'Notifications', to: '/clinic/notifications', icon: Bell },
  { label: 'Profile / Settings', to: '/clinic/settings', icon: Settings },
]

const clinicAdminNavigation = [
  { label: 'Dashboard', to: '/clinic/dashboard', icon: LayoutDashboard },
  { label: 'Patients', to: '/clinic/patients', icon: Users },
  { label: 'Appointments', to: '/clinic/appointments', icon: CalendarDays },
  { label: 'Doctors and Staff', to: '/clinic/staff', icon: Stethoscope },
  { label: 'Services', to: '/clinic/services', icon: Activity },
  { label: 'Health Blog Management', to: '/clinic/blog', icon: BookOpen },
  { label: 'Appearance / Theme Settings', to: '/clinic/appearance', icon: Palette },
  { label: 'Billing', to: '/clinic/billing', icon: CreditCard },
  { label: 'Reports', to: '/clinic/reports', icon: FileBarChart },
  { label: 'Subscription', to: '/clinic/subscription', icon: ShieldCheck },
  { label: 'Settings', to: '/clinic/settings', icon: Settings },
]

// Backward-compatible alias for clinicNavigation
const clinicNavigation = doctorNavigation

const patientNavigation = [
  { label: 'Dashboard', to: '/patient/dashboard', icon: LayoutDashboard },
  { label: 'Book Appointment', to: '/patient/book-appointment', icon: CalendarPlus },
  { label: 'My Appointments', to: '/patient/appointments', icon: CalendarDays },
  { label: 'My Medical Records', to: '/patient/medical-records', icon: ClipboardList },
  { label: 'Prescriptions', to: '/patient/prescriptions', icon: Pill },
  { label: 'Medicine Store', to: '/patient/medicine-store', icon: ShoppingBag },
  { label: 'WhatsApp Messages', to: '/patient/whatsapp', icon: WhatsAppIcon },
  { label: 'Billing / Payments', to: '/patient/billing', icon: CreditCard },
  { label: 'Notifications', to: '/patient/notifications', icon: Bell },
  { label: 'Profile / Settings', to: '/patient/profile', icon: Settings },
]

const receptionistNavigation = [
  { label: 'Dashboard', to: '/receptionist/dashboard', icon: LayoutDashboard },
  { label: 'Patients', to: '/receptionist/patients', icon: Users },
  { label: 'Appointments', to: '/receptionist/appointments', icon: CalendarDays },
  { label: 'Appointment Booking', to: '/receptionist/book-appointment', icon: CalendarPlus },
  { label: 'Check-in / Patient Queue', to: '/receptionist/queue', icon: UserCheck },
  { label: 'Doctor Availability', to: '/receptionist/doctors', icon: Stethoscope },
  { label: 'WhatsApp Messages', to: '/receptionist/whatsapp', icon: WhatsAppIcon },
  { label: 'Billing', to: '/receptionist/billing', icon: CreditCard },
  { label: 'Notifications', to: '/receptionist/notifications', icon: Bell },
  { label: 'Profile / Settings', to: '/receptionist/profile', icon: Settings },
]

export function DoctorProtectedRoute({ children }) {
  const { currentUser } = useStore()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to={`/login?portal=clinic&redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  // Deny patient role from accessing doctor or clinic admin workspace
  if (currentUser.role === 'patient') {
    return <Navigate to="/patient/dashboard" replace />
  }

  return children
}

export function PatientProtectedRoute({ children }) {
  const { currentUser } = useStore()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to={`/login?portal=patient&redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  // Ensure non-patient roles redirect appropriately
  if (currentUser.role && currentUser.role !== 'patient' && currentUser.role !== 'super_admin') {
    return <Navigate to={currentUser.role === 'receptionist' ? '/receptionist/dashboard' : '/clinic/dashboard'} replace />
  }

  return children
}

export function ReceptionistProtectedRoute({ children }) {
  const { currentUser } = useStore()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to={`/login?portal=receptionist&redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  // Deny patient role from accessing receptionist workspace
  if (currentUser.role === 'patient') {
    return <Navigate to="/patient/dashboard" replace />
  }

  return children
}

export function AppLayout({ children, portal = 'clinic' }) {
  const { activeClinic, currentUser, logoutUser, data, previewThemeId, setPreviewThemeId, setClinicTheme, notify } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const isSuper = portal === 'super'
  const isPatient = portal === 'patient'
  const isReceptionist = portal === 'receptionist'

  const clinicForUser = (currentUser?.clinicId && data.clinics.find(c => c.id === currentUser.clinicId)) || activeClinic
  const activeThemeId = isSuper ? 'medical-blue' : (previewThemeId || clinicForUser?.theme || 'medical-blue')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeThemeId)
  }, [activeThemeId])

  const title = isSuper
    ? 'Platform workspace'
    : isPatient
    ? 'Personal care & health records'
    : isReceptionist
    ? `${activeClinic?.name} · Front Desk`
    : activeClinic?.name

  const isClinicAdminOnly = currentUser?.role === 'clinic_admin' && currentUser?.title === 'Clinic Administrator'
  const links = isSuper
    ? superNavigation
    : isPatient
    ? patientNavigation
    : isReceptionist
    ? receptionistNavigation
    : isClinicAdminOnly
    ? clinicAdminNavigation
    : clinicNavigation

  const patientUnreadCount = isPatient && currentUser
    ? (data.patientNotifications || []).filter(
        (n) => (!currentUser.email || n.patientEmail?.toLowerCase() === currentUser.email?.toLowerCase()) && !n.read
      ).length
    : 0

  const receptionistUnreadCount = isReceptionist
    ? (data.receptionistNotifications || []).filter((n) => !n.read).length
    : 0

  const doctorUnreadCount = !isSuper && !isPatient && !isReceptionist
    ? (data.doctorNotifications || []).filter(
        (n) => (!n.clinicId || n.clinicId === activeClinic?.id) && !n.read
      ).length
    : 0

  const whatsappReadyCount = isReceptionist
    ? (data.whatsappMessages || []).filter((m) => m.clinicId === activeClinic?.id && m.status === 'Ready to Send').length
    : 0

  const patientWhatsappReadyCount = isPatient && currentUser
    ? (data.whatsappMessages || []).filter(
        (m) =>
          ((m.patientEmail && m.patientEmail.toLowerCase() === currentUser.email?.toLowerCase()) ||
           (m.patientName && m.patientName.toLowerCase() === currentUser.name?.toLowerCase())) &&
          m.status === 'Ready to Send'
      ).length
    : 0

  const patientActiveOrdersCount = isPatient && currentUser
    ? (data.medicineOrders || []).filter(
        (o) =>
          ((o.patientEmail && o.patientEmail.toLowerCase() === currentUser.email?.toLowerCase()) ||
           (o.patientName && o.patientName.toLowerCase() === currentUser.name?.toLowerCase())) &&
          o.status !== 'Delivered' &&
          o.status !== 'Cancelled'
      ).length
    : 0

  const userDisplayName = isSuper
    ? 'Alex Morgan'
    : isPatient
    ? currentUser?.name || 'Emma Wilson'
    : isReceptionist
    ? currentUser?.name || 'Ava Robinson'
    : currentUser?.name || activeClinic?.owner || 'Dr. Maya Patel'

  const userRoleDisplay = isSuper
    ? 'Super admin'
    : isPatient
    ? 'Patient'
    : isReceptionist
    ? 'Receptionist'
    : 'Doctor (Clinic Admin)'

  const userInitials = isSuper
    ? 'SA'
    : isPatient
    ? (currentUser?.name || 'Emma Wilson')
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'EW'
    : isReceptionist
    ? (currentUser?.name || 'Ava Robinson')
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'AR'
    : (currentUser?.name || activeClinic?.owner || 'Doctor')
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'DC'

  return (
    <div className="app-shell flex flex-col min-h-screen" data-theme={activeThemeId}>
      {previewThemeId && !isSuper && (
        <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-4 py-2.5 text-xs font-medium text-white shadow-lg">
          <div className="flex items-center gap-2">
            <Eye size={16} className="animate-pulse" />
            <span>
              Live Workspace Preview: <strong>{getThemeById(previewThemeId).name}</strong> — {getThemeById(previewThemeId).tagline}
            </span>
            <span className="hidden rounded bg-black/25 px-2 py-0.5 text-[10px] sm:inline">
              Unsaved · Testing mode
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setClinicTheme(clinicForUser.id, previewThemeId)
              }}
              className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow transition hover:bg-slate-100"
            >
              Apply to Clinic
            </button>
            <button
              onClick={() => setPreviewThemeId(null)}
              className="rounded-lg bg-black/25 px-3 py-1 text-xs font-medium text-white transition hover:bg-black/40"
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-1">
        {mobileOpen && <button className="fixed inset-0 z-30 bg-slate-900/30 md:hidden" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
        <aside className={`sidebar flex min-h-screen flex-col px-4 py-6 ${mobileOpen ? '!fixed !inset-y-0 !left-0 !z-40 !flex !w-[260px] !shadow-xl' : ''}`}>
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md ${
            isPatient ? 'bg-emerald-600 shadow-emerald-200' :
            isReceptionist ? 'bg-teal-600 shadow-teal-200' :
            isSuper ? 'bg-violet-600 shadow-violet-200' :
            'bg-blue-600 shadow-blue-200'
          }`}>
            {isPatient ? <HeartPulse size={21} /> : isReceptionist ? <UserCheck size={21} /> : isSuper ? <ShieldCheck size={21} /> : <Stethoscope size={21} />}
          </div>
          <div className="brand-copy">
            <div className="brand-font text-[17px] font-extrabold tracking-tight text-slate-800">Clinic<span className="text-blue-600">OS</span></div>
            <div className="workspace-label mt-0.5 text-[9px] font-bold uppercase tracking-[.14em] text-slate-400">
              {isPatient || isReceptionist ? 'HEALTHCARE SAAS' : isSuper ? 'Platform admin' : 'Clinic workspace'}
            </div>
          </div>
          {mobileOpen && <button className="ml-auto btn-ghost md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>}
        </div>
        <div className="workspace-label mb-2 px-3 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">
          {isPatient ? 'Patient portal' : isReceptionist ? 'Receptionist portal' : isSuper ? 'Workspace' : 'Doctor portal'}
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-slate-600 ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} strokeWidth={1.9} />
              <span className="sidebar-label flex-1">{label}</span>
              {label === 'Medicine Store' && isPatient && patientActiveOrdersCount > 0 && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white shadow-sm" title={`${patientActiveOrdersCount} active delivery order(s)`}>
                  {patientActiveOrdersCount}
                </span>
              )}
              {label === 'WhatsApp Messages' && isReceptionist && whatsappReadyCount > 0 && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white shadow-sm">
                  {whatsappReadyCount}
                </span>
              )}
              {label === 'WhatsApp Messages' && isPatient && patientWhatsappReadyCount > 0 && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white shadow-sm">
                  {patientWhatsappReadyCount}
                </span>
              )}
              {label === 'Notifications' && isPatient && patientUnreadCount > 0 && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                  {patientUnreadCount}
                </span>
              )}
              {label === 'Notifications' && isReceptionist && receptionistUnreadCount > 0 && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                  {receptionistUnreadCount}
                </span>
              )}
              {label === 'Notifications' && !isSuper && !isPatient && !isReceptionist && doctorUnreadCount > 0 && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                  {doctorUnreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {isReceptionist && (
          <div className="mt-auto space-y-3 pt-4">
            <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-900">
                <UserCheck size={15} className="text-teal-600" /> Front Desk Operations
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-teal-800/80">
                {activeClinic?.name} · Reception, check-ins, appointments, and billing.
              </p>
            </div>
            <button
              onClick={() => {
                logoutUser()
                navigate('/login')
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        )}

        {isPatient && (
          <div className="mt-auto space-y-3 pt-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
                <HeartPulse size={15} className="text-emerald-600" /> Need Assistance?
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-emerald-800/80">
                Contact your clinic directly or call our 24/7 patient support line.
              </p>
            </div>
            <button
              onClick={() => {
                logoutUser()
                navigate('/login')
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        )}

        {!isSuper && !isPatient && !isReceptionist && (
          <div className="mt-auto space-y-3 pt-4">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
                <Stethoscope size={15} className="text-blue-600" /> Doctor (Clinic Admin)
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-blue-800/80">
                {activeClinic?.name} · Practice owner & attending physician.
              </p>
            </div>
            <button
              onClick={() => {
                logoutUser()
                navigate('/login')
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        )}
        {isSuper && <div className="mt-auto border-t border-slate-100 px-3 pt-4 text-[11px] text-slate-400">ClinicOS platform · Demo</div>}
      </aside>
      <div className="main-area flex min-h-screen flex-col">
        <header className="topbar sticky top-0 z-20 flex items-center justify-between px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button className="btn-ghost !hidden max-sm:!inline-flex" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={19} /></button>
            <div className="hidden min-w-[190px] items-center gap-2 text-[12px] text-slate-500 sm:flex">
              <span className="font-medium text-slate-700">
                {isSuper ? 'Platform admin' : isPatient ? 'Patient Portal' : isReceptionist ? 'Reception Desk' : activeClinic?.initials || 'Clinic'}
              </span>
              <ChevronRight size={13} />
              <span className="truncate">{title}</span>
            </div>
            <div className="relative hidden w-[240px] md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input className="form-input !rounded-lg !border-transparent !bg-slate-50 !py-2 !pl-9 !text-xs focus:!border-blue-200" placeholder={isPatient ? "Search doctors, records..." : isReceptionist ? "Search patients, queue, doctors..." : "Search anything..."} aria-label="Search" />
              <kbd className="absolute right-2.5 top-[7px] rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] text-slate-400">⌘ K</kbd>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {isReceptionist && <ClinicSwitcher />}
            <button
              className="relative btn-ghost"
              aria-label="Notifications"
              onClick={() => {
                if (isPatient) navigate('/patient/notifications')
                else if (isReceptionist) navigate('/receptionist/notifications')
                else if (isSuper) navigate('/super-admin/notifications')
                else navigate('/clinic/notifications')
              }}
            >
              <Bell size={18} />
              {(isPatient ? patientUnreadCount > 0 : isReceptionist ? receptionistUnreadCount > 0 : isSuper ? true : doctorUnreadCount > 0) && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>
            <div className="relative">
              <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50" onClick={() => setProfileOpen(!profileOpen)} aria-label="Profile menu">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${
                  isPatient ? 'bg-emerald-100 text-emerald-800' :
                  isReceptionist ? 'bg-teal-100 text-teal-800' :
                  isSuper ? 'bg-violet-100 text-violet-700' :
                  'bg-indigo-100 text-indigo-700'
                }`}>
                  {userInitials}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-semibold text-slate-700">{userDisplayName}</span>
                  <span className="block text-[10px] text-slate-400">{userRoleDisplay}</span>
                </span>
                <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 z-30 w-52 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl">
                  {isPatient ? (
                    <>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/patient/profile') }}>
                        <User size={14} /> My Profile & Preferences
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/patient/medicine-store') }}>
                        <ShoppingBag size={14} className="text-emerald-600" /> Medicine Store
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/patient/whatsapp') }}>
                        <WhatsAppIcon size={14} className="text-[#25D366]" /> WhatsApp Messages
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/patient/billing') }}>
                        <CreditCard size={14} /> Billing & Invoices
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50" onClick={() => { setProfileOpen(false); logoutUser(); navigate('/login') }}>
                        <LogOut size={14} /> Sign out
                      </button>
                    </>
                  ) : isReceptionist ? (
                    <>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/receptionist/profile') }}>
                        <User size={14} /> My Profile & Shift
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/receptionist/queue') }}>
                        <UserCheck size={14} /> Waiting Queue
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/receptionist/billing') }}>
                        <CreditCard size={14} /> Billing & Invoices
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50" onClick={() => { setProfileOpen(false); logoutUser(); navigate('/login') }}>
                        <LogOut size={14} /> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate(isSuper ? '/super-admin/settings' : '/clinic/settings') }}>
                        <Settings size={14} /> Account settings
                      </button>
                      {!isSuper && (
                        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/clinic/appearance') }}>
                          <Palette size={14} className="text-blue-600" /> Appearance / Themes
                        </button>
                      )}
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50" onClick={() => { setProfileOpen(false); navigate('/') }}>
                        <LogOut size={14} /> Exit demo workspace
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-100 px-8 py-4 text-[11px] text-slate-400">© 2026 ClinicOS Healthcare SaaS · Built for better care, together.</footer>
      </div>
      </div>
    </div>
  )
}

function ClinicSwitcher() {
  const { data, activeClinic, setActiveClinic, notify } = useStore()
  return (
    <label className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-600">
      <span className="hidden text-[10px] text-slate-400 sm:inline">DEMO</span>
      <select aria-label="Select clinic organization" value={activeClinic?.id || ''} className="max-w-[120px] bg-transparent text-xs font-semibold outline-none sm:max-w-[150px]" onChange={(event) => { setActiveClinic(event.target.value); notify('Workspace switched successfully') }}>
        {(data?.clinics || []).map((clinic) => <option key={clinic.id} value={clinic.id}>{clinic.name}</option>)}
      </select>
    </label>
  )
}

export function PageHeading({ eyebrow, title, description, action }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
    <div><div className="mb-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-blue-600">{eyebrow}</div><h1 className="brand-font text-[25px] font-bold tracking-tight text-slate-800 sm:text-[28px]">{title}</h1>{description && <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-500">{description}</p>}</div>
    {action && <div className="flex items-center gap-2">{action}</div>}
  </div>
}

export function StatCard({ label, value, change, icon: Icon = Activity, tone = 'blue', detail }) {
  const palettes = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-amber-50 text-amber-600',
    purple: 'bg-violet-50 text-violet-600',
    rose: 'bg-rose-50 text-rose-600',
    teal: 'bg-teal-50 text-teal-600',
  }
  return <div className="card p-5">
    <div className="flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${palettes[tone] || palettes.blue}`}><Icon size={19} /></div>{change && <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700"><ArrowUpRight size={12} />{change}</span>}</div>
    <div className="mt-4 text-[12px] font-medium text-slate-500">{label}</div><div className="mt-1 brand-font text-[25px] font-bold tracking-tight text-slate-800">{value}</div>{detail && <div className="mt-1 text-[10px] text-slate-400">{detail}</div>}
  </div>
}

export function Panel({ title, subtitle, action, children, className = '' }) {
  return <section className={`card min-w-0 ${className}`}><div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="text-[13px] font-semibold text-slate-800">{title}</h2>{subtitle && <p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p>}</div>{action}</div><div className="p-5">{children}</div></section>
}

export function Badge({ children, tone }) {
  const value = String(children || '')
  const style = tone || (/paid|active|confirmed|completed|checked in/i.test(value) ? 'green' : /trial|scheduled|pending|processing|waiting/i.test(value) ? 'blue' : /past due|cancel|suspend|inactive|no-show|expired/i.test(value) ? 'rose' : /in progress/i.test(value) ? 'amber' : 'gray')
  const palettes = { green: 'bg-emerald-50 text-emerald-700', blue: 'bg-blue-50 text-blue-700', rose: 'bg-rose-50 text-rose-700', gray: 'bg-slate-100 text-slate-600', amber: 'bg-amber-50 text-amber-700' }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${palettes[style] || palettes.gray}`}><span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${style === 'green' ? 'bg-emerald-500' : style === 'rose' ? 'bg-rose-500' : style === 'amber' ? 'bg-amber-500' : style === 'blue' ? 'bg-blue-500' : 'bg-slate-400'}`} />{children}</span>
}

export function DataTable({ columns, rows, searchPlaceholder = 'Search records...', emptyText = 'No matching records found.', onRowClick }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: '', direction: 1 })
  const [page, setPage] = useState(1)
  const pageSize = 8
  const filtered = rows.filter((row) => Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(query.toLowerCase())))
  const sorted = sort.key ? [...filtered].sort((left, right) => {
    const leftValue = left[sort.key]
    const rightValue = right[sort.key]
    return String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true }) * sort.direction
  }) : filtered
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const visibleRows = sorted.slice((page - 1) * pageSize, page * pageSize)
  return <div>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-full max-w-[280px]"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input className="form-input !py-2 !pl-9 !text-xs" placeholder={searchPlaceholder} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} /></div>
      <span className="text-[11px] text-slate-400">{filtered.length} records</span>
    </div>
    <div className="overflow-x-auto"><table className="w-full min-w-[660px] border-collapse text-left"><thead><tr>{columns.map((column) => <th key={column.key} className="border-b border-slate-100 px-3 pb-3 text-[10px] font-semibold uppercase tracking-[.08em] text-slate-400">{column.label && <button className="inline-flex items-center gap-1 hover:text-slate-700" onClick={() => setSort((current) => ({ key: column.key, direction: current.key === column.key ? current.direction * -1 : 1 }))}>{column.label}{sort.key === column.key && <span>{sort.direction === 1 ? '↑' : '↓'}</span>}</button>}</th>)}</tr></thead>
      <tbody>{visibleRows.map((row, index) => <tr key={row.id || row.invoice || row.name || index} className={`table-row border-b border-slate-50 last:border-0 ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick?.(row)}>{columns.map((column) => <td key={column.key} className="px-3 py-3.5 text-[12px] text-slate-600">{column.render ? column.render(row[column.key], row) : row[column.key]}</td>)}</tr>)}</tbody>
    </table></div>
    {!filtered.length && <div className="py-10 text-center text-xs text-slate-400">{emptyText}</div>}
    {filtered.length > 0 && <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400"><span>Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}</span><div className="flex items-center gap-1"><button aria-label="Previous page" disabled={page === 1} className="rounded border border-slate-200 p-1.5 disabled:opacity-40" onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft size={13} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} aria-label={`Page ${pageNumber}`} className={`rounded px-2.5 py-1 ${pageNumber === page ? 'bg-blue-600 text-white' : 'border border-slate-200'}`} onClick={() => setPage(pageNumber)}>{pageNumber}</button>)}<button aria-label="Next page" disabled={page === pageCount} className="rounded border border-slate-200 p-1.5 disabled:opacity-40" onClick={() => setPage((current) => Math.min(pageCount, current + 1))}><ChevronRight size={13} /></button></div></div>}
  </div>
}

export function Modal({ title, onClose, children, wide = false }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div role="dialog" aria-modal="true" aria-label={title} className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${wide ? 'max-w-2xl' : 'max-w-lg'}`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4"><h2 className="text-[15px] font-semibold text-slate-800">{title}</h2><button className="btn-ghost" onClick={onClose} aria-label="Close dialog"><X size={18} /></button></div>
      <div className="p-6">{children}</div>
    </div>
  </div>
}

export function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return <div role="status" className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-slate-900">✓</span>{toast}</div>
}

export function PrimaryButton({ children, onClick, icon: Icon = Plus, type = 'button' }) {
  return <button type={type} className="btn btn-primary" onClick={onClick}>{Icon && <Icon size={15} />}{children}</button>
}

export function Trend({ value, negative = false }) {
  const Icon = negative ? ArrowDownRight : ArrowUpRight
  return <span className={`inline-flex items-center text-[10px] font-semibold ${negative ? 'text-rose-600' : 'text-emerald-600'}`}><Icon size={13} />{value}</span>
}

export function SimpleMenuButton({ label = 'More actions' }) {
  return <button className="btn-ghost" aria-label={label}><MoreHorizontal size={17} /></button>
}

export { WhatsAppIcon } from './whatsapp'
 