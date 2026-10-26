import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
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
  History,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

export function WorkspaceSidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }) {
  const {
    currentRole,
    activeClinic,
    appointments = [],
    notifications = [],
    currentUser,
    openWhatsAppModal
  } = useApp();
  const location = useLocation();

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

  // Grouped Navigation Architecture
  const navGroupsByRole = {
    // Role 1: SaaS Superadmin
    super_admin: [
      {
        title: 'Overview',
        items: [
          { label: 'Platform Dashboard', path: '/superadmin/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Tenants & Plans',
        items: [
          { label: 'Clinics Directory', path: '/superadmin/clinics', icon: Building2 },
          { label: 'Subscription Plans', path: '/superadmin/plans', icon: Sparkles },
          { label: 'Tenant Subscriptions', path: '/superadmin/subscriptions', icon: Layers }
        ]
      },
      {
        title: 'Finance & Access',
        items: [
          { label: 'SaaS Corporate Finance', path: '/superadmin/finance/overview', icon: CreditCard },
          { label: 'Workforce & Role Matrix', path: '/superadmin/role-matrix', icon: ShieldCheck }
        ]
      },
      {
        title: 'Communications',
        items: [
          { label: 'Email Management', path: '/superadmin/email', icon: Mail },
          { label: 'Support Tickets', path: '/superadmin/support', icon: LifeBuoy }
        ]
      },
      {
        title: 'Governance & System',
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
        title: 'Overview',
        items: [
          { label: 'Clinic Dashboard', path: '/clinic/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Clinical Operations',
        items: [
          { label: 'Appointments Calendar', path: '/clinic/appointments', icon: Calendar },
          { label: 'Live Patient Queue', path: '/clinic/queue', icon: Clock },
          { label: 'Doctor Consultations', path: '/clinic/consultations', icon: Stethoscope },
          { label: 'Digital Prescriptions', path: '/clinic/prescriptions', icon: FileText }
        ]
      },
      {
        title: 'Patient Care',
        items: [
          { label: 'Patients Directory', path: '/clinic/patients', icon: Users },
          { label: 'Patient Feedback', path: '/clinic/feedback', icon: MessageSquareHeart }
        ]
      },
      {
        title: 'Practice Management',
        items: [
          { label: 'Doctor Management', path: '/clinic/doctors', icon: Stethoscope },
          { label: 'Staff & Permissions', path: '/clinic/staff', icon: UserCheck },
          { label: 'Doctor Schedules & Rota', path: '/clinic/schedules', icon: Calendar },
          { label: 'Pharmacy & Inventory', path: '/clinic/inventory', icon: Package }
        ]
      },
      {
        title: 'Finance & Subscriptions',
        items: [
          { label: 'Clinic Practice Finance', path: '/clinic/finance/overview', icon: Receipt },
          { label: 'SaaS Subscription', path: '/clinic/subscription', icon: Sparkles }
        ]
      },
      {
        title: 'Analytics & Settings',
        items: [
          { label: 'Clinic Reports', path: '/clinic/reports', icon: BarChart3 },
          { label: 'Platform Support', path: '/clinic/support', icon: LifeBuoy },
          { label: 'Clinic Settings', path: '/clinic/settings', icon: Settings }
        ]
      }
    ],

    // Role 3: Clinic Receptionist/Manager
    receptionist: [
      {
        title: 'Overview',
        items: [
          { label: 'Reception Dashboard', path: '/reception/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Desk Operations',
        items: [
          { label: 'Booking Requests', path: '/reception/requests', icon: Clock, badge: pendingRequestsCount },
          { label: 'Live Patient Queue', path: '/reception/queue', icon: Users },
          { label: 'Express Walk-In Counter', path: '/reception/walk-ins', icon: UserCheck }
        ]
      },
      {
        title: 'Scheduling & Roster',
        items: [
          { label: 'Appointments Schedule', path: '/reception/appointments', icon: Calendar },
          { label: 'Doctor Availability', path: '/reception/schedule', icon: Calendar }
        ]
      },
      {
        title: 'Patients & Comms',
        items: [
          { label: 'Patient Registration', path: '/reception/patients', icon: UserPlus },
          { label: 'Communication & Alerts', path: '/reception/communication', icon: Bell }
        ]
      },
      {
        title: 'Operations & Billing',
        items: [
          { label: 'Stock Refill Requests', path: '/reception/stock-requests', icon: Package },
          { label: 'Billing & Payments', path: '/reception/billing', icon: Receipt },
          { label: 'Platform Support', path: '/reception/support', icon: LifeBuoy }
        ]
      }
    ],

    // Role 4: Patient
    patient: [
      {
        title: 'Overview',
        items: [
          { label: 'Health Overview', path: '/patient/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Bookings & Care',
        items: [
          { label: 'Book Appointment', path: '/patient/appointments/book', icon: PlusCircle },
          { label: 'Booking Requests', path: '/patient/appointments/requests', icon: Clock, badge: patientRequestsCount },
          { label: 'My Appointments', path: '/patient/appointments', icon: Calendar }
        ]
      },
      {
        title: 'Discovery',
        items: [
          { label: 'Explore Clinics', path: '/patient/clinics', icon: Building2 },
          { label: 'Find Specialists', path: '/patient/doctors', icon: Stethoscope }
        ]
      },
      {
        title: 'Medical Records',
        items: [
          { label: 'Visit Records', path: '/patient/records', icon: FileText },
          { label: 'Digital Prescriptions', path: '/patient/prescriptions', icon: FileText },
          { label: 'Invoices & Receipts', path: '/patient/bills', icon: Receipt }
        ]
      },
      {
        title: 'Alerts & Profile',
        items: [
          { label: 'Notifications', path: '/patient/notifications', icon: Bell, badge: unreadNotificationsCount },
          { label: 'Submit Feedback', path: '/patient/feedback', icon: MessageSquareHeart },
          { label: 'My Profile', path: '/patient/profile', icon: Settings }
        ]
      }
    ]
  };

  const currentGroups = navGroupsByRole[currentRole] || navGroupsByRole.clinic_admin;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white text-slate-700 flex flex-col transition-all duration-200 ease-out border-r-2 border-slate-200 shadow-sm select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-68'}`}
      >
        {/* Workspace Brand / Header - Synchronized Height (h-18 sm:h-20) */}
        <div className="h-18 sm:h-20 px-4 sm:px-5 border-b border-[#E2E8F0] bg-slate-50/50 flex items-center justify-between shrink-0">
          <Link
            to="/"
            className={`flex items-center gap-3 group overflow-hidden ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
            title="ClinicOS Healthcare Platform"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#15803D] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-[#166534] transition-colors shrink-0">
              <Activity className="w-5.5 h-5.5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 animate-fade-in">
                <span className="text-xl font-black tracking-tight text-slate-950 block truncate">
                  Clinic<span className="text-[#15803D]">OS</span>
                </span>
                <span className="block text-xs text-[#166534] font-extrabold tracking-wider uppercase truncate">
                  Healthcare SaaS
                </span>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items (Grouped with Category Headings) */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto overflow-x-hidden">
          {currentGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {/* Group Heading (Hidden in collapsed mode) */}
              {!isCollapsed ? (
                <div className="px-3 pt-2.5 pb-1 text-[12px] sm:text-[12.5px] font-black text-slate-600 uppercase tracking-wider truncate">
                  {group.title}
                </div>
              ) : (
                <div className="my-2 border-t border-slate-100" />
              )}

              {/* Group Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isCustomActive =
                    (item.path.includes('/finance') && location.pathname.includes('/finance')) ||
                    (item.path === '/clinic/consultations' && location.pathname.startsWith('/clinic/consultations')) ||
                    (item.path === '/patient/clinics' && location.pathname.startsWith('/patient/clinics'));

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={isCollapsed ? item.label : undefined}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) => {
                        const isCurrent = isActive || isCustomActive;
                        return `group relative flex items-center rounded-xl text-[14.5px] sm:text-[15px] font-bold transition-all duration-150 ${
                          isCollapsed
                            ? 'justify-center p-2.5 mx-auto'
                            : 'justify-between px-3.5 py-2.5 sm:py-3'
                        } ${
                          isCurrent
                            ? 'bg-[#DCFCE7] text-[#166534] font-bold border-l-4 border-[#15803D]'
                            : 'text-[#17211B] hover:text-[#166534] hover:bg-[#F0FDF4] font-medium'
                        }`;
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-5 h-5 shrink-0 transition-colors ${
                            location.pathname === item.path || isCustomActive
                              ? 'text-[#15803D]'
                              : 'text-slate-400 group-hover:text-[#166534]'
                          }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {/* Count Badge */}
                      {item.badge > 0 && (
                        <>
                          {!isCollapsed ? (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 border ${
                                location.pathname === item.path || isCustomActive
                                  ? 'bg-[#15803D] text-white border-transparent'
                                  : 'bg-amber-100 text-amber-900 border-amber-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
                          )}
                        </>
                      )}

                      {/* Tooltip on Hover for Compact Mode */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
                          {item.label}
                          {item.badge > 0 && ` (${item.badge})`}
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* WhatsApp Messaging Simulator */}
        <div className="px-3 pt-2.5 pb-2 border-t border-slate-100">
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
            title={isCollapsed ? 'WhatsApp Messages' : 'Preview WhatsApp integration templates & simulated delivery'}
            className={`w-full flex items-center rounded-xl text-sm font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all cursor-pointer group ${
              isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2.5'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-105 transition-transform" />
              {!isCollapsed && <span className="truncate">WhatsApp Messages</span>}
            </div>
            {!isCollapsed && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />}
          </button>
        </div>

        {/* Footer / Tenant Context Info & Desktop Collapse Toggle */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 text-xs shrink-0">
          {!isCollapsed ? (
            <>
              {currentRole !== 'super_admin' && (
                <div className="mb-2 px-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tenant Workspace</div>
                  <div className="text-sm font-extrabold text-slate-900 truncate">{activeClinic?.name}</div>
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                <Link
                  to="/clinics"
                  className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-[#15803D] px-1 py-1 rounded-lg transition-colors hover:bg-[#F0FDF4]"
                >
                  <span>Public Directory</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>
                {onToggleCollapse && (
                  <button
                    onClick={onToggleCollapse}
                    title="Collapse Sidebar"
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  title="Expand Sidebar"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  <PanelLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
