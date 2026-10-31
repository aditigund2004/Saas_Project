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
  Heart,
  DoorOpen,
  Coffee,
  Tv,
  HelpCircle,
  Pill
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
          { label: 'Clinic Digital Twin', path: '/superadmin/digital-twin', icon: Sparkles },
          { label: 'Multi-Clinic Analytics', path: '/superadmin/comparison', icon: BarChart3 },
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

    // Role 2: Clinic Doctor/Admin
    clinic_admin: [
      {
        section: 'MAIN',
        items: [
          { label: 'Overview', path: '/clinic/dashboard', icon: LayoutDashboard },
          { label: 'Command Center', path: '/clinic/command-center', icon: Activity },
          { label: 'Appointments', path: '/clinic/appointments', icon: Calendar },
          { label: 'Prescriptions', path: '/clinic/prescriptions', icon: FileText },
          { label: 'Certificates', path: '/clinic/certificates', icon: Award },
          { label: 'Patients', path: '/clinic/patients', icon: Users }
        ]
      },
      {
        section: 'CLINICAL WORKSPACE',
        items: [
          { label: "60-Sec Patient Brief", path: '/clinic/patient-brief', icon: Stethoscope },
          { label: 'Health Change Detector', path: '/clinic/health-comparison', icon: Heart },
          { label: 'Shared Decision Making', path: '/clinic/shared-decision', icon: Users },
          { label: 'Care Continuity', path: '/clinic/care-continuity', icon: Sparkles },
          { label: 'Workload & Wellbeing', path: '/clinic/workload', icon: Coffee },
          { label: 'Visit Summaries', path: '/clinic/summaries', icon: FileText }
        ]
      },
      {
        section: 'MANAGE',
        items: [
          { label: 'My Website', path: '/app/my-website', icon: Globe },
          { label: 'Clinics', path: '/clinic/branches', icon: Building2 },
          { label: 'Staff Management', path: '/clinic/staff', icon: Users },
          { label: 'Virtual Consulting', path: '/clinic/virtual-consulting', icon: Video },
          { label: 'Reviews', path: '/clinic/feedback', icon: Star },
          { label: 'Analytics', path: '/clinic/reports', icon: BarChart3 },
          { label: 'Online Payments', path: '/clinic/finance/invoices', icon: CreditCard },
          { label: 'Referrals & Rewards', path: '/clinic/referrals', icon: Award }
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
          { label: 'Patient Arrival Radar', path: '/reception/radar', icon: Clock },
          { label: 'Live Patient Queue', path: '/reception/queue', icon: Users },
          { label: 'Smart Queue Balancer', path: '/reception/queue-balancer', icon: Sparkles },
          { label: 'Express Walk-In Counter', path: '/reception/walk-ins', icon: UserCheck }
        ]
      },
      {
        section: 'Clinic Operations',
        items: [
          { label: 'Room & Resource Board', path: '/reception/rooms', icon: DoorOpen },
          { label: 'Capacity Heatmap', path: '/reception/capacity', icon: Calendar },
          { label: 'No-Show Explorer', path: '/reception/no-shows', icon: BarChart3 },
          { label: 'End-of-Day Handover', path: '/reception/handover', icon: CheckSquare }
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
          { label: 'Billing & Invoices', path: '/reception/billing', icon: Receipt },
          { label: 'Platform Support', path: '/reception/support', icon: LifeBuoy }
        ]
      }
    ],

    // Role 4: Patient Portal
    patient: [
      {
        section: 'My Connected Journey',
        items: [
          { label: 'Overview', path: '/patient/dashboard', icon: LayoutDashboard },
          { label: 'Living Health Journey', path: '/patient/journey', icon: Activity },
          { label: 'Before My Visit Brief', path: '/patient/visit-prep', icon: Stethoscope },
          { label: 'Waiting Lounge', path: '/patient/waiting-room', icon: Tv },
          { label: 'Medication Day Planner', path: '/patient/medications', icon: Pill },
          { label: 'Family Care Circle', path: '/patient/family', icon: Users },
          { label: 'Digital Health Passport', path: '/patient/passport', icon: ShieldCheck }
        ]
      },
      {
        section: 'Insights & Transparency',
        items: [
          { label: 'Explain Health Report', path: '/patient/report-explainer', icon: HelpCircle },
          { label: 'Daily Recovery Journal', path: '/patient/recovery', icon: Heart },
          { label: 'Second Opinion Kit', path: '/patient/second-opinion', icon: FileText },
          { label: 'Data Transparency', path: '/patient/privacy', icon: Shield },
          { label: 'Communication Settings', path: '/patient/preferences', icon: Settings }
        ]
      },
      {
        section: 'Consultations & Bookings',
        items: [
          { label: 'Virtual Consulting', path: '/patient/virtual-consulting', icon: Video },
          { label: 'My Appointments', path: '/patient/appointments', icon: Calendar },
          { label: 'Booking Requests', path: '/patient/appointments/requests', icon: Clock, badge: patientRequestsCount },
          { label: 'Book Appointment', path: '/patient/appointments/book', icon: PlusCircle }
        ]
      },
      {
        section: 'Clinical & Billing Records',
        items: [
          { label: 'My Prescriptions', path: '/patient/prescriptions', icon: FileText },
          { label: 'My Invoices', path: '/patient/invoices', icon: Receipt },
          { label: 'My Receipts', path: '/patient/receipts', icon: Receipt },
          { label: 'Visit History', path: '/patient/records', icon: FileText }
        ]
      },
      {
        section: 'Care & Account',
        items: [
          { label: 'My Feedback', path: '/patient/feedback', icon: MessageSquareHeart },
          { label: 'My Profile', path: '/patient/profile', icon: Settings },
          { label: 'Notifications', path: '/patient/notifications', icon: Bell, badge: unreadNotificationsCount },
          { label: 'Explore Clinics', path: '/patient/clinics', icon: Building2 }
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex flex-col transition-transform duration-200 ease-out border-r border-slate-200/90 dark:border-slate-800 shadow-2xl lg:shadow-2xs ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Brand / Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:bg-blue-700 transition-colors">
              <Activity className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                Clinic<span className="text-blue-600 dark:text-blue-400">OS</span>
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
                Healthcare SaaS
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Profile Pill & Active Clinic (Matching Reference Image) */}
        {(currentRole === 'clinic_admin' || currentRole === 'doctor_admin') && (
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 space-y-3 shrink-0">
            {/* Doctor Info */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold text-sm flex items-center justify-center shrink-0">
                {(currentUser?.name?.replace(/^(Dr\.|Doctor)\s*/i, '') || activeClinic?.ownerName || 'N')[0]}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {currentUser?.name?.replace(/^(Dr\.|Doctor)\s*/i, '') || activeClinic?.ownerName?.replace(/^(Dr\.|Doctor)\s*/i, '') || 'Nikhilesh'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {activeClinic?.specialty || 'Neurology'}
                </div>
              </div>
            </div>

            {/* Active Clinic Dropdown */}
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                ACTIVE CLINIC
              </span>
              <div className="p-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs cursor-pointer hover:border-blue-400 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {activeClinic?.name || 'All Clinics'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Partitioned Navigation Items */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
          {sections.map((sectionGroup, sIdx) => (
            <div key={sectionGroup.section || sIdx} className="space-y-1">
              {sectionGroup.section && (
                <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
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
                        className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:translate-x-0.5 transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className="w-[18px] h-[18px] shrink-0 text-blue-600 group-hover:scale-105 transition-transform" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
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
                        `group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                          isActive || isCustomActive
                            ? 'bg-blue-50/90 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-bold shadow-2xs border-l-[3px] border-blue-600 dark:border-blue-400 translate-x-0.5'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/75 dark:hover:bg-slate-800/60 hover:translate-x-0.5'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-[18px] h-[18px] shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 shrink-0 border border-amber-200 dark:border-amber-800 shadow-2xs">
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

        {/* Footer / Tenant Context Info */}
        <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 text-xs shrink-0">
          {currentRole !== 'super_admin' && (
            <div className="mb-2 px-1">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Tenant Workspace</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{activeClinic?.name}</div>
            </div>
          )}
          <Link
            to="/clinics"
            className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-1 py-1 rounded-lg transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
          >
            <span>Public Clinic Directory</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          </Link>

          <button
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
              logout();
              navigate('/');
            }}
            className="w-full mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 px-1 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </span>
            <span className="text-[10px] text-slate-400">Exit Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
