import React, { useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
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
  ShieldCheck,
  Layers,
  Activity,
  X,
  ExternalLink,
  MessageSquare,
  MessageSquareHeart,
  LifeBuoy,
  Bell,
  Mail,
  TrendingUp,
  History,
  ShieldAlert,
  Globe,
  Video,
  Award,
  Star,
  LogOut,
  ChevronDown,
  ShoppingBag,
  BookOpen,
  PhoneCall
} from 'lucide-react';

export function WorkspaceSidebar({ isOpen, onClose }) {
  const {
    currentRole,
    activeClinic,
    appointments = [],
    notifications = [],
    currentUser,
    openWhatsAppModal
  } = useApp();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Badges calculation
  const pendingRequestsCount = appointments.filter(
    (a) => (a.clinicId === activeClinic?.id || !a.clinicId) && (a.status === 'Pending Clinic Confirmation' || a.status === 'Requested')
  ).length;

  const patientRequestsCount = appointments.filter(
    (a) =>
      (a.patientName === currentUser?.name || a.patientId === currentUser?.id || !a.patientId) &&
      (a.status === 'Pending Clinic Confirmation' || a.status === 'Alternative Slot Proposed' || a.status === 'Awaiting Patient Response')
  ).length;

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Lock body scroll when mobile sidebar drawer is open to prevent background scrolling artifacts
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Automatically close sidebar when navigation route changes on mobile screens
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
  }, [location.pathname]);

  const navConfigs = {
    // Role 1: SaaS Superadmin
    super_admin: [
      {
        section: 'Core Platform',
        items: [
          { label: 'Platform Dashboard', path: '/superadmin/dashboard', icon: LayoutDashboard },
          { label: 'Clinics Directory', path: '/superadmin/clinics', icon: Building2 }
        ]
      },
      {
        section: 'Commercial & Finance',
        items: [
          { label: 'Subscription Plans', path: '/superadmin/plans', icon: Sparkles },
          { label: 'Tenant Subscriptions', path: '/superadmin/subscriptions', icon: Layers },
          { label: 'SaaS Corporate Finance', path: '/superadmin/finance/overview', icon: CreditCard }
        ]
      },
      {
        section: 'Governance & Comms',
        items: [
          { label: 'Workforce & Role Matrix', path: '/superadmin/role-matrix', icon: ShieldCheck },
          { label: 'Email Management', path: '/superadmin/email', icon: Mail },
          { label: 'Support Tickets', path: '/superadmin/support', icon: LifeBuoy }
        ]
      },
      {
        section: 'System & Observability',
        items: [
          { label: 'Platform Health & SLA', path: '/superadmin/platform', icon: Activity },
          { label: 'Administrative Activity', path: '/superadmin/activity', icon: History },
          { label: 'Platform Settings', path: '/superadmin/settings', icon: Settings }
        ]
      }
    ],

    // Role 2: Clinic Doctor/Admin (Exact match to reference layout)
    clinic_admin: [
      {
        section: 'MAIN',
        items: [
          { label: 'Overview', path: '/clinic/dashboard', icon: LayoutDashboard },
          { label: 'Appointments', path: '/clinic/appointments', icon: Calendar },
          { label: 'Prescriptions', path: '/clinic/prescriptions', icon: FileText },
          { label: 'Certificates', path: '/clinic/certificates', icon: Award },
          { label: 'Patients', path: '/clinic/patients', icon: Users }
        ]
      },
      {
        section: 'MANAGE',
        items: [
          { label: 'My Website', path: '/app/my-website', icon: Globe },
          { label: 'Clinics', path: '/clinic/branches', icon: Building2 },
          { label: 'Telemedicine', path: '/clinic/telemedicine', icon: Video },
          { label: 'WhatsApp', path: '/clinic/whatsapp', icon: MessageSquare },
          { label: 'Reviews', path: '/clinic/feedback', icon: Star },
          { label: 'Analytics', path: '/clinic/reports', icon: BarChart3 },
          { label: 'Online Payments', path: '/clinic/finance/invoices', icon: CreditCard }
        ]
      },
      {
        section: 'ACCOUNT',
        items: [
          {
            label: 'View My Website',
            path: `/clinic/${activeClinic?.slug || 'citycare-family-clinic'}`,
            icon: ExternalLink,
            external: true
          },
          { label: 'Billing & Subscription', path: '/clinic/subscription', icon: Sparkles },
          { label: 'Help & Support', path: '/clinic/support', icon: LifeBuoy }
        ]
      }
    ],

    // Role 3: Clinic Receptionist/Manager
    receptionist: [
      {
        section: 'Front Desk & Queue',
        items: [
          { label: 'Reception Dashboard', path: '/reception/dashboard', icon: LayoutDashboard },
          { label: 'Live Patient Queue', path: '/reception/queue', icon: Users },
          { label: 'Express Walk-In Counter', path: '/reception/walk-ins', icon: UserCheck }
        ]
      },
      {
        section: 'Appointments & Scheduling',
        items: [
          { label: 'Booking Requests', path: '/reception/requests', icon: Clock, badge: pendingRequestsCount },
          { label: 'Appointments Schedule', path: '/reception/appointments', icon: Calendar },
          { label: 'Doctor Availability', path: '/reception/schedule', icon: Calendar }
        ]
      },
      {
        section: 'Patient Care & Billing',
        items: [
          { label: 'Patient Registration', path: '/reception/patients', icon: UserPlus },
          { label: 'Billing & Invoices', path: '/reception/billing', icon: Receipt }
        ]
      },
      {
        section: 'Coordination & Help',
        items: [
          { label: 'Communication & Alerts', path: '/reception/communication', icon: Bell },
          { label: 'Stock Refill Requests', path: '/reception/stock-requests', icon: Package },
          { label: 'Platform Support', path: '/reception/support', icon: LifeBuoy }
        ]
      }
    ],

    // Role 4: Patient
    patient: [
      {
        section: 'My Health Hub',
        items: [
          { label: 'Health Overview', path: '/patient/dashboard', icon: LayoutDashboard },
          { label: 'My Appointments', path: '/patient/appointments', icon: Calendar },
          { label: 'Booking Requests', path: '/patient/appointments/requests', icon: Clock, badge: patientRequestsCount },
          { label: 'Emergency Helpline', path: '/patient/emergency', icon: PhoneCall, badge: 'SOS' }
        ]
      },
      {
        section: 'Pharmacy & Health Education',
        items: [
          { label: 'Buy Medicines (Pharmacy)', path: '/patient/pharmacy', icon: ShoppingBag, badge: 'Store' },
          { label: 'Health Education Guides', path: '/patient/education', icon: BookOpen },
          { label: 'Health Packages', path: '/patient/packages', icon: Package }
        ]
      },
      {
        section: 'Find & Schedule Care',
        items: [
          { label: 'Book Appointment', path: '/patient/appointments/book', icon: PlusCircle },
          { label: 'Explore Clinics', path: '/patient/clinics', icon: Building2 },
          { label: 'Find Specialists', path: '/patient/doctors', icon: Stethoscope }
        ]
      },
      {
        section: 'Medical & Billing Records',
        items: [
          { label: 'Visit Records', path: '/patient/records', icon: FileText },
          { label: 'Digital Prescriptions', path: '/patient/prescriptions', icon: FileText },
          { label: 'Dosing Reminders', path: '/patient/reminders', icon: Clock },
          { label: 'Invoices & Receipts', path: '/patient/bills', icon: Receipt }
        ]
      },
      {
        section: 'Communication & Account',
        items: [
          { label: 'Clinic Inquiries', path: '/patient/queries', icon: MessageSquare },
          { label: 'Family Members', path: '/patient/family', icon: Users },
          { label: 'Notifications', path: '/patient/notifications', icon: Bell, badge: unreadNotificationsCount },
          { label: 'Submit Feedback', path: '/patient/feedback', icon: MessageSquareHeart },
          { label: 'My Profile', path: '/patient/profile', icon: Settings }
        ]
      }
    ]
  };

  const sections = navConfigs[currentRole] || navConfigs.clinic_admin;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 w-full h-full min-h-dvh z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-white dark:bg-[#0A1222] text-slate-700 dark:text-[#CBD5E1] flex flex-col transition-transform duration-200 ease-out border-r border-slate-200 dark:border-[#263B59] shadow-2xl lg:shadow-2xs ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Brand / Header */}
        <div className="h-16 px-4 border-b border-slate-200 dark:border-[#263B59] flex items-center justify-between shrink-0 bg-slate-50/80 dark:bg-[#080F1E]/60">
          <Link to="/" className="flex items-center gap-2.5 group min-w-0 flex-1">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:bg-blue-700 transition-colors shrink-0">
              <Activity className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white truncate block">
                Clinic<span className="text-blue-600 dark:text-blue-400">OS</span>
              </span>
              <span className="block text-xs text-slate-500 dark:text-[#94A3B8] font-semibold tracking-wider uppercase truncate">
                Healthcare SaaS
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#172640] cursor-pointer shrink-0 ml-2"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Profile Pill & Active Clinic (Matching Reference Image) */}
        {(currentRole === 'clinic_admin' || currentRole === 'doctor_admin') && (
          <div className="p-3.5 border-b border-slate-200 dark:border-[#263B59] space-y-3 shrink-0 bg-slate-50/50 dark:bg-[#080F1E]/30">
            {/* Doctor Info */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold text-sm flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                {(currentUser?.name?.replace(/^(Dr\.|Doctor)\s*/i, '') || activeClinic?.ownerName || 'N')[0]}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {currentUser?.name?.replace(/^(Dr\.|Doctor)\s*/i, '') || activeClinic?.ownerName?.replace(/^(Dr\.|Doctor)\s*/i, '') || 'Nikhilesh'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#94A3B8] truncate">
                  {activeClinic?.specialty || 'Neurology'}
                </div>
              </div>
            </div>

            {/* Active Clinic Dropdown */}
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] block">
                ACTIVE CLINIC
              </span>
              <div className="p-2 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#111E33] flex items-center justify-between text-xs cursor-pointer hover:border-blue-400 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-[#F1F5F9] truncate">
                    {activeClinic?.name || 'All Clinics'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-[#94A3B8] shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Partitioned Navigation Items */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
          {sections.map((sectionGroup, sIdx) => (
            <div key={sectionGroup.section || sIdx} className="space-y-1">
              {sectionGroup.section && (
                <div className="px-2.5 pt-2 pb-1 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-[#94A3B8] uppercase">
                    {sectionGroup.section}
                  </span>
                </div>
              )}
              <div className="space-y-0.5">
                {sectionGroup.items.map((item) => {
                  const Icon = item.icon;
                  const isCustomActive =
                    (item.path.includes('/finance') && location.pathname.includes('/finance')) ||
                    (item.path === '/clinic/consultations' && location.pathname.startsWith('/clinic/consultations')) ||
                    (item.path === '/patient/clinics' && location.pathname.startsWith('/patient/clinics')) ||
                    (item.path === '/superadmin/email' && location.pathname.startsWith('/superadmin/email'));

                  if (item.external) {
                    return (
                      <a
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-[#CBD5E1] hover:text-blue-600 dark:hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-[#172640]/70 transition-all min-h-[2.5rem]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            <Icon className="w-[18px] h-[18px] shrink-0 text-blue-500 dark:text-blue-400" />
                          </div>
                          <span className="truncate flex-1 min-w-0">{item.label}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-[#94A3B8] shrink-0 ml-2" />
                      </a>
                    );
                  }

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 min-h-[2.5rem] ${
                          isActive || isCustomActive
                            ? 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#172640] dark:text-[#3B82F6] font-bold shadow-2xs border-l-2 border-[#1D4ED8] dark:border-[#3B82F6]'
                            : 'text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-[#EFF6FF] dark:hover:bg-[#172640]/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <Icon className="w-[18px] h-[18px] shrink-0 opacity-85" />
                        </div>
                        <span className="truncate flex-1 min-w-0">{item.label}</span>
                      </div>
                      {Boolean(item.badge) && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 ml-2 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* WhatsApp Messaging Simulator */}
        <div className="px-3 pt-2.5 pb-2 border-t border-slate-200 dark:border-[#263B59] shrink-0">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
              openWhatsAppModal({
                patient_name: 'Aarav Patel',
                clinic_name: activeClinic?.name || 'CityCare Family Clinic',
                appointment_date: '23 Oct 2026',
                appointment_time: '10:30 AM',
                doctor_name: 'Dr. Aarav Mehta',
                appointment_reference: 'APT-2601',
                clinic_phone: activeClinic?.phone || '+91 98200 11223'
              });
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 dark:border-emerald-800/80 transition-colors cursor-pointer group min-h-[2.5rem]"
            title="Preview WhatsApp integration templates & simulated delivery"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <MessageSquare className="w-[18px] h-[18px] text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform" />
              </div>
              <span className="truncate flex-1 min-w-0">WhatsApp Messages</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0 ml-2" />
          </button>
        </div>

        {/* Footer / Tenant Context Info */}
        <div className="p-3.5 border-t border-slate-200 dark:border-[#263B59] bg-slate-50/80 dark:bg-[#080F1E]/90 text-xs shrink-0 text-slate-500 dark:text-[#94A3B8]">
          {currentRole !== 'super_admin' && (
            <div className="mb-2 px-1">
              <div className="text-xs text-slate-400 dark:text-[#94A3B8] uppercase font-bold tracking-wider">Tenant Workspace</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-[#F1F5F9] truncate">{activeClinic?.name}</div>
            </div>
          )}
          <Link
            to="/clinics"
            className="flex items-center justify-between text-xs text-slate-700 dark:text-[#CBD5E1] hover:text-blue-600 dark:hover:text-blue-400 px-1 py-1 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-[#172640]"
          >
            <span>Public Clinic Directory</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-[#94A3B8]" />
          </Link>

          <button
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
              logout();
              navigate('/');
            }}
            className="w-full mt-2 pt-2 border-t border-slate-200 dark:border-[#263B59] flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-[#CBD5E1] hover:text-rose-600 dark:hover:text-rose-400 px-1 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-[#94A3B8]">Exit Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
