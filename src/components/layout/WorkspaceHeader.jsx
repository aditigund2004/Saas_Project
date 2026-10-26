import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  Building2,
  ChevronDown,
  LogOut,
  CheckCircle2,
  Menu,
  Search,
  PanelLeftClose,
  PanelLeft,
  X,
  ArrowRight,
  Calendar,
  Users,
  FileText,
  Clock,
  Stethoscope,
  Receipt,
  Settings,
  AlertTriangle,
  Package,
  Activity,
  Check
} from 'lucide-react';

export function WorkspaceHeader({ onToggleSidebar, isSidebarCollapsed = false, onToggleCollapse }) {
  const {
    currentUser,
    currentRole,
    activeClinic,
    activeBranch,
    switchBranch,
    appointments = [],
    inventory = [],
    notifications = [],
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications
  } = useApp();
  const { logout, user: authUser } = useAuth();

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Local read states for dynamic operational alerts
  const [readAlertIds, setReadAlertIds] = useState(() => new Set());

  const searchInputRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const branchRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Keyboard shortcut listener: Press "/" to focus search, "Escape" to close popups
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSearchFocused(false);
        setNotificationsOpen(false);
        setProfileDropdownOpen(false);
        setBranchDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dismiss dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notificationsOpen && notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (profileDropdownOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (branchDropdownOpen && branchRef.current && !branchRef.current.contains(e.target)) {
        setBranchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [notificationsOpen, profileDropdownOpen, branchDropdownOpen]);

  const roleLabels = {
    super_admin: { label: 'SaaS Superadmin', displayTitle: 'Super Admin', color: 'bg-slate-100 text-slate-800 border-slate-300' },
    clinic_admin: { label: 'Clinic Doctor/Admin', displayTitle: 'Doctor / Clinic Admin', color: 'bg-[#F0FDF4] text-[#166534] border-[#86EFAC]' },
    receptionist: { label: 'Receptionist/Manager', displayTitle: 'Receptionist / Manager', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    patient: { label: 'Patient Portal', displayTitle: 'Verified Patient', color: 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC]' }
  };

  // Derive breadcrumbs from path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const workspaceTitle = pathParts[0] ? pathParts[0].toUpperCase() : 'WORKSPACE';
  const subPageTitle = pathParts[1]
    ? pathParts[1].replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Overview';

  // Build unified, hospital-relevant notifications list
  const lowStock = inventory.filter((i) => i.currentStock <= i.minStockLevel);
  const waitingPatients = appointments.filter((a) => a.status === 'Checked In');

  // Filter stored notifications for current user/role
  const contextNotifs = (notifications || []).filter((n) => {
    if (!n.recipientRole || n.recipientRole === 'all') return true;
    return n.recipientRole === currentRole;
  }).map((n) => ({
    id: n.id,
    title: n.title,
    message: n.message,
    time: n.createdAt ? 'Recent' : '15m ago',
    type: n.type || 'appointment',
    read: n.read || readAlertIds.has(n.id)
  }));

  // Build operational items
  const operationalItems = [];

  if (currentRole === 'receptionist' || currentRole === 'clinic_admin') {
    waitingPatients.forEach((a) => {
      const id = `op-wait-${a.id}`;
      operationalItems.push({
        id,
        title: `Patient Checked In: ${a.patientName}`,
        message: `Waiting for ${a.doctorName} (Token ${a.queueNumber || '#Q-01'})`,
        time: '5m ago',
        type: 'queue',
        read: readAlertIds.has(id)
      });
    });
  }

  if (currentRole === 'clinic_admin' || currentRole === 'super_admin') {
    lowStock.slice(0, 3).forEach((item) => {
      const id = `op-stock-${item.id}`;
      operationalItems.push({
        id,
        title: `Low Stock: ${item.name}`,
        message: `Remaining: ${item.currentStock} ${item.unit} (Min limit: ${item.minStockLevel})`,
        time: '25m ago',
        type: 'stock',
        read: readAlertIds.has(id)
      });
    });
  }

  if (currentRole === 'patient') {
    const p1 = 'patient-notif-confirmed';
    operationalItems.push({
      id: p1,
      title: 'Appointment Confirmed',
      message: 'CityCare Family Clinic · Dr. Aarav Mehta (General Consultation)',
      time: '1h ago',
      type: 'appointment',
      read: readAlertIds.has(p1)
    });
    const p2 = 'patient-notif-rx';
    operationalItems.push({
      id: p2,
      title: 'Digital Prescription Available',
      message: 'Consultation Rx #RX-2026-89 with QR code ready to download',
      time: '2h ago',
      type: 'medical',
      read: readAlertIds.has(p2)
    });
  }

  // Combine items
  const combinedNotifications = [...operationalItems, ...contextNotifs];

  // If list is completely empty, provide fallback hospital alerts
  const displayList = combinedNotifications.length > 0 ? combinedNotifications : [
    {
      id: 'fb-1',
      title: 'System Operational Status',
      message: 'All 5 specialty clinic nodes and WhatsApp webhooks functioning normally',
      time: '10m ago',
      type: 'system',
      read: readAlertIds.has('fb-1')
    }
  ];

  const unreadCount = displayList.filter((n) => !n.read).length;

  const handleMarkItemRead = (item) => {
    setReadAlertIds((prev) => new Set(prev).add(item.id));
    if (typeof markNotificationAsRead === 'function') {
      markNotificationAsRead(item.id);
    }
  };

  const handleMarkAllRead = () => {
    const allIds = displayList.map((n) => n.id);
    setReadAlertIds(new Set(allIds));
    if (typeof markAllNotificationsAsRead === 'function') {
      markAllNotificationsAsRead();
    }
  };

  const handleDismissAll = () => {
    const allIds = displayList.map((n) => n.id);
    setReadAlertIds(new Set(allIds));
    if (typeof clearAllNotifications === 'function') {
      clearAllNotifications();
    }
    setNotificationsOpen(false);
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const designationName =
    currentRole === 'super_admin'
      ? 'Super Admin'
      : (roleLabels[currentRole]?.displayTitle || roleLabels[currentRole]?.label || currentRole.replace('_', ' '));

  // Quick navigation shortcuts for global search
  const quickNavLinks = [
    { name: 'Appointments Calendar', path: currentRole === 'receptionist' ? '/reception/appointments' : '/clinic/appointments', icon: Calendar, role: 'all' },
    { name: 'Live Patient Queue', path: currentRole === 'receptionist' ? '/reception/queue' : '/clinic/queue', icon: Clock, role: 'all' },
    { name: 'Patient Directory', path: currentRole === 'receptionist' ? '/reception/patients' : '/clinic/patients', icon: Users, role: 'all' },
    { name: 'Doctor Consultations', path: '/clinic/consultations', icon: Stethoscope, role: 'clinic_admin' },
    { name: 'Digital Prescriptions', path: '/clinic/prescriptions', icon: FileText, role: 'clinic_admin' },
    { name: 'Billing & Invoicing', path: '/clinic/billing', icon: Receipt, role: 'all' },
    { name: 'Settings & Profile', path: '/clinic/settings', icon: Settings, role: 'all' }
  ];

  const filteredQuickNav = quickNavLinks.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Category Icon Resolver
  const getCategoryIcon = (type) => {
    switch (type) {
      case 'queue':
        return <Clock className="w-4.5 h-4.5 text-emerald-700" />;
      case 'stock':
        return <AlertTriangle className="w-4.5 h-4.5 text-amber-700" />;
      case 'medical':
        return <FileText className="w-4.5 h-4.5 text-green-700" />;
      case 'billing':
        return <Receipt className="w-4.5 h-4.5 text-teal-700" />;
      default:
        return <Calendar className="w-4.5 h-4.5 text-[#15803D]" />;
    }
  };

  const getCategoryBg = (type) => {
    switch (type) {
      case 'queue':
        return 'bg-emerald-100 border-emerald-200';
      case 'stock':
        return 'bg-amber-100 border-amber-200';
      case 'medical':
        return 'bg-green-100 border-green-200';
      case 'billing':
        return 'bg-teal-100 border-teal-200';
      default:
        return 'bg-[#DCFCE7] border-[#86EFAC]';
    }
  };

  return (
    <header
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 h-18 sm:h-20 shadow-xs flex items-center transition-all w-full"
      style={{ position: 'sticky', top: 0, zIndex: 30 }}
    >
      <div className="flex items-center justify-between gap-4 sm:gap-6 w-full">
        {/* Left Section: Sidebar Toggle, Prominent Breadcrumbs, Role Badge & Branch Switcher */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden h-11 w-11 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-[#F0FDF4] hover:border-[#86EFAC] border border-[#E2E8F0] cursor-pointer transition-colors shrink-0 shadow-2xs"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:text-[#15803D] hover:bg-[#F0FDF4] hover:border-[#86EFAC] border border-[#E2E8F0] transition-colors cursor-pointer shadow-2xs shrink-0"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle Sidebar"
            >
              {isSidebarCollapsed ? (
                <PanelLeft className="w-5 h-5 text-slate-700" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-slate-700" />
              )}
            </button>
          )}

          {/* Clean, High-Context Breadcrumbs with Increased Font Size */}
          <div className="hidden sm:flex items-center gap-2.5 text-sm sm:text-base font-semibold">
            <span className="font-black text-[#17211B] tracking-tight">{workspaceTitle}</span>
            <span className="text-slate-300 font-normal text-base sm:text-lg">/</span>
            <span className="text-[#15803D] font-extrabold tracking-tight">{subPageTitle}</span>
          </div>

          {/* Prominent Role Status Pill */}
          <span
            className={`hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-2xs shrink-0 ${
              roleLabels[currentRole]?.color || 'bg-slate-100 text-slate-700'
            }`}
          >
            {roleLabels[currentRole]?.label}
          </span>

          {/* Branch Switcher for Clinic Roles */}
          {(currentRole === 'clinic_admin' || currentRole === 'receptionist' || currentRole === 'doctor' || currentRole === 'inventory' || currentRole === 'accountant') &&
            activeClinic?.branches?.length > 1 && (
              <div className="relative hidden xl:block shrink-0" ref={branchRef}>
                <button
                  onClick={() => {
                    setBranchDropdownOpen(!branchDropdownOpen);
                    setNotificationsOpen(false);
                    setProfileDropdownOpen(false);
                  }}
                  className="h-11 flex items-center gap-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-50/90 hover:bg-[#F0FDF4] hover:border-[#86EFAC] border border-[#E2E8F0] transition-colors cursor-pointer shadow-2xs"
                >
                  <Building2 className="w-4 h-4 text-[#15803D]" />
                  <span>Branch: {activeBranch?.name || 'Main'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {branchDropdownOpen && (
                  <div className="absolute left-0 mt-2.5 w-68 rounded-2xl bg-white shadow-xl border border-[#E2E8F0] py-2 z-50 animate-modal-enter">
                    <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Switch Facility Branch
                    </div>
                    {activeClinic.branches.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          switchBranch(b.id);
                          setBranchDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between hover:bg-[#F0FDF4] transition-colors cursor-pointer ${
                          b.id === activeBranch?.id ? 'font-extrabold text-[#15803D] bg-[#F0FDF4]/70' : 'text-slate-700'
                        }`}
                      >
                        <span className="truncate">{b.name}</span>
                        {b.id === activeBranch?.id && <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D] shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>

        {/* Right Section: Aligned Height Controls (Search, Notification Bell & User Profile) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Matched Global Search Bar - Increased Height (h-11 sm:h-12) & Larger Font */}
          <div className="relative">
            <div
              className={`h-11 sm:h-12 flex items-center gap-3 px-4 rounded-xl sm:rounded-2xl border transition-all duration-200 w-52 sm:w-68 md:w-80 lg:w-96 shadow-2xs ${
                searchFocused
                  ? 'bg-white border-[#15803D] ring-3 ring-[#15803D]/15 shadow-sm'
                  : 'bg-slate-50/90 hover:bg-white hover:border-slate-300 border-[#E2E8F0]'
              }`}
            >
              <Search className={`w-4.5 h-4.5 shrink-0 transition-colors ${searchFocused ? 'text-[#15803D]' : 'text-slate-400'}`} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patients, appointments, queue..."
                className="bg-transparent text-xs sm:text-sm font-semibold text-[#17211B] w-full focus:outline-none placeholder:text-slate-400"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center text-xs bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg font-mono font-bold text-slate-400 shadow-2xs">
                  /
                </kbd>
              )}
            </div>

            {/* Quick Search Popover Dropdown */}
            {searchFocused && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setSearchFocused(false)}
                />
                <div className="absolute right-0 sm:left-0 sm:right-auto mt-2.5 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-[#E2E8F0] p-3 z-50 animate-modal-enter text-xs sm:text-sm">
                  <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Quick Navigation</span>
                    <span>Jump to Module</span>
                  </div>
                  <div className="mt-1.5 space-y-1 max-h-68 overflow-y-auto">
                    {filteredQuickNav.map((link) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.path}
                          type="button"
                          onClick={() => {
                            navigate(link.path);
                            setSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-[#F0FDF4] hover:text-[#166534] transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 font-bold text-slate-800 group-hover:text-[#166534]">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#DCFCE7] flex items-center justify-center text-slate-600 group-hover:text-[#15803D]">
                              <Icon className="w-4.5 h-4.5" />
                            </div>
                            <span>{link.name}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#15803D]" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Redesigned Notification Bell (Matched Height h-11 sm:h-12 w-11 sm:w-12) */}
          <div className="relative shrink-0" ref={notificationsRef}>
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
                setBranchDropdownOpen(false);
                setSearchFocused(false);
              }}
              className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl sm:rounded-2xl border border-[#E2E8F0] bg-white hover:bg-[#F0FDF4] hover:border-[#86EFAC] hover:text-[#15803D] text-[#17211B] relative transition-all duration-200 cursor-pointer shadow-2xs focus:outline-none focus:ring-3 focus:ring-[#15803D]/20"
              aria-label="View notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-105" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full text-[11px] font-black bg-[#15803D] text-white flex items-center justify-center ring-2 ring-white shadow-xs animate-in zoom-in-75">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {/* Anchored, Generous Dropdown Panel (400px Width, No Clamping) */}
            {notificationsOpen && (
              <div
                style={{ width: '400px', minWidth: '340px', maxWidth: 'calc(100vw - 32px)' }}
                className="absolute right-0 top-full mt-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl z-50 overflow-hidden animate-modal-enter text-left"
              >
                {/* Panel Header */}
                <div className="px-5 py-4 bg-white border-b border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-black text-[#17211B] tracking-tight">Notifications</span>
                    {unreadCount > 0 ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]/40">
                        {unreadCount} New
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                        All read
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="text-xs font-bold text-[#15803D] hover:text-[#166534] hover:underline cursor-pointer transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications Scrollable List */}
                <div className="max-h-[380px] overflow-y-auto divide-y divide-[#F1F5F9]">
                  {displayList.length === 0 ? (
                    <div className="py-12 px-5 text-center">
                      <div className="w-14 h-14 rounded-full bg-[#F0FDF4] text-[#15803D] mx-auto flex items-center justify-center mb-3 border border-[#DCFCE7]">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <p className="text-base font-bold text-[#17211B]">All caught up!</p>
                      <p className="text-xs sm:text-sm text-[#475569] mt-1">No unread notifications at this time.</p>
                    </div>
                  ) : (
                    displayList.map((item) => {
                      const isUnread = !item.read;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleMarkItemRead(item)}
                          className={`p-4 flex items-start gap-3.5 transition-colors cursor-pointer group ${
                            isUnread
                              ? 'bg-[#F0FDF4] hover:bg-[#DCFCE7]/50'
                              : 'bg-white hover:bg-slate-50'
                          }`}
                        >
                          {/* Category Badge Icon */}
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${getCategoryBg(
                              item.type
                            )}`}
                          >
                            {getCategoryIcon(item.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-xs sm:text-sm leading-snug line-clamp-1 ${
                                  isUnread ? 'font-black text-[#17211B]' : 'font-semibold text-slate-700'
                                }`}
                              >
                                {item.title}
                              </p>
                              <span className="text-[11px] text-slate-400 font-semibold shrink-0">
                                {item.time}
                              </span>
                            </div>
                            <p className="text-xs text-[#475569] mt-1 line-clamp-2 leading-relaxed">
                              {item.message}
                            </p>
                          </div>

                          {/* Unread Indicator Dot */}
                          {isUnread && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] shrink-0 mt-1.5 shadow-2xs" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Panel Footer */}
                <div className="px-5 py-3 bg-slate-50/90 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
                    <span>Real-time practice alerts</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDismissAll}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                  >
                    Dismiss all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill - Aligned Height (h-11 sm:h-12) & Larger Font */}
          <div className="relative shrink-0" ref={profileRef}>
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
                setBranchDropdownOpen(false);
                setSearchFocused(false);
              }}
              className="h-11 sm:h-12 flex items-center gap-3 px-3 sm:px-3.5 rounded-xl sm:rounded-2xl border border-[#E2E8F0] bg-white hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer select-none shadow-2xs focus:outline-none focus:ring-3 focus:ring-[#15803D]/20"
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
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl object-cover border border-[#E2E8F0] shadow-2xs shrink-0"
              />
              <span className="text-xs sm:text-sm font-black text-[#17211B] line-clamp-1 max-w-[140px] hidden sm:block">
                {currentUser?.name || authUser?.name}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  profileDropdownOpen ? 'rotate-180 text-[#15803D]' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-white shadow-2xl border border-[#E2E8F0] p-3 z-50 animate-modal-enter">
                {/* Profile & Designation Information Card */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm font-black text-[#17211B] leading-tight">
                    {currentUser?.name || authUser?.name}
                  </p>
                  <p className="text-xs text-[#475569] mt-1 truncate font-medium">
                    {currentUser?.email || authUser?.email || 'admin@clinicos.demo'}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#E2E8F0]/80 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Designation
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-[#F0FDF4] text-[#166534] border border-[#DCFCE7]">
                      {designationName}
                    </span>
                  </div>
                </div>

                {/* Actions: Log Out */}
                <div className="pt-2.5 pb-0.5">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4.5 h-4.5 text-rose-600" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
