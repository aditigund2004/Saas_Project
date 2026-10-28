import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard,
  Building2,
  Users,
  Sparkles,
  Layers,
  BarChart3,
  CreditCard,
  ShieldCheck,
  Mail,
  LifeBuoy,
  Activity,
  History,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Award,
  Share2
} from 'lucide-react';
import { ToastContainer } from '../components/ui/DemoNotice';

export function SuperAdminLayout() {
  const { user, logout } = useAuth();
  const { clinics = [], toast } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking anywhere outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setNotificationsOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll on mobile drawer
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
    setProfileDropdownOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/superadmin', { replace: true });
  };

  const adminName = user?.name || 'Super Administrator';
  const adminEmail = user?.email || 'superadmin@admin.com';

  // Navigation structure dedicated strictly to Super Admin
  const navSections = [
    {
      title: 'Platform Cockpit',
      items: [
        { label: 'Overview', path: '/superadmin/dashboard', icon: LayoutDashboard },
        { label: 'Clinic Directory', path: '/superadmin/clinics', icon: Building2, badge: clinics.length || 5 },
        { label: 'User Management', path: '/superadmin/users', icon: Users }
      ]
    },
    {
      title: 'Commercial & Finance',
      items: [
        { label: 'Subscription Plans', path: '/superadmin/plans', icon: Sparkles },
        { label: 'Tenant Subscriptions', path: '/superadmin/subscriptions', icon: Layers },
        { label: 'Platform Analytics', path: '/superadmin/analytics', icon: BarChart3 },
        { label: 'SaaS Corporate Finance', path: '/superadmin/finance/overview', icon: CreditCard }
      ]
    },
    {
      title: 'Referral & Affiliates',
      items: [
        { label: 'Referral Dashboard', path: '/superadmin/referrals/dashboard', icon: LayoutDashboard },
        { label: 'Affiliate Partners', path: '/superadmin/referrals/partners', icon: Users },
        { label: 'Referral Codes', path: '/superadmin/referrals/codes', icon: Award },
        { label: 'Referral Tracking', path: '/superadmin/referrals/tracking', icon: Activity },
        { label: 'Commission Rules', path: '/superadmin/referrals/rules', icon: Layers },
        { label: 'Commission Ledger', path: '/superadmin/referrals/ledger', icon: CreditCard },
        { label: 'Payout Management', path: '/superadmin/referrals/payouts', icon: CreditCard },
        { label: 'Referral Reports', path: '/superadmin/referrals/reports', icon: BarChart3 }
      ]
    },
    {
      title: 'Governance & Comms',
      items: [
        { label: 'Workforce & Roles', path: '/superadmin/role-matrix', icon: ShieldCheck },
        { label: 'Email Management', path: '/superadmin/email', icon: Mail },
        { label: 'Support Tickets', path: '/superadmin/support', icon: LifeBuoy }
      ]
    },
    {
      title: 'System & Observability',
      items: [
        { label: 'Health & SLA', path: '/superadmin/platform', icon: Activity },
        { label: 'Administrative Activity', path: '/superadmin/activity', icon: History },
        { label: 'Platform Settings', path: '/superadmin/settings', icon: Settings }
      ]
    }
  ];

  // Derive current breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSubPage = pathParts[1]
    ? pathParts[1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Overview';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors">
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity duration-200"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. Dedicated Super Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-out shadow-2xl lg:shadow-xs ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-950/40">
          <Link to="/superadmin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Clinic<span className="text-blue-600 dark:text-blue-400">OS</span></span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Admin
                </span>
              </div>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                Multi-Tenant SaaS
              </span>
            </div>
          </Link>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Administrator Profile Card in Sidebar */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0">
              SA
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                {adminName}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span>Super Administrator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Navigation Items */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <span className="px-2.5 pt-1.5 pb-1 block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {section.title}
              </span>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isFinanceActive = item.path.includes('/finance') && location.pathname.includes('/finance');

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                          isActive || isFinanceActive
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold shadow-2xs border-l-2 border-blue-600 dark:border-blue-500'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 shrink-0 opacity-80" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 shrink-0">
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

        {/* Sidebar Footer: Quick Admin Sign Out */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Sign Out as Admin</span>
            </span>
            <span className="text-[10px] text-slate-400">Exit</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content & Top Header Area */}
      <div className="flex-1 lg:pl-[280px] flex flex-col min-w-0">
        {/* Dedicated Super Admin Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-slate-400 dark:text-slate-500">SUPERADMIN</span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{currentSubPage}</span>
            </div>
          </div>

          {/* Center: Quick Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clinics, subscriptions, invoices, audit logs..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Right: Operational Status, Notifications, Theme, Profile Dropdown */}
          <div className="flex items-center gap-2">
            {/* Live Platform SLA Pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Platform 99.98% SLA</span>
            </div>

            {/* Platform Notifications Button & Dropdown */}
            <div ref={notificationsRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen((prev) => !prev);
                  setProfileDropdownOpen(false);
                }}
                className={`p-2 rounded-xl border shadow-2xs transition-colors cursor-pointer relative ${
                  notificationsOpen
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-800'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
                aria-label="View notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell className="w-4 h-4" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute top-1.5 right-1.5" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 text-xs space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    <span>Platform Alerts</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400">Live Webhooks</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div
                      onClick={() => setNotificationsOpen(false)}
                      className="p-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-blue-900 dark:text-blue-200 block">New Tenant Subscription</span>
                      <span className="text-slate-600 dark:text-slate-400">Apex Specialty Care upgraded to Professional plan.</span>
                    </div>
                    <div
                      onClick={() => setNotificationsOpen(false)}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-slate-900 dark:text-slate-200 block">System SLA & Cluster</span>
                      <span className="text-slate-500 dark:text-slate-400">All multi-tenant database clusters operating at nominal latency.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => {
                toggleTheme();
                setNotificationsOpen(false);
                setProfileDropdownOpen(false);
              }}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer"
              aria-label="Toggle dark/light theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Administrator Profile Menu */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen((prev) => !prev);
                  setNotificationsOpen(false);
                }}
                className={`flex items-center gap-2 p-1.5 rounded-xl border shadow-2xs transition-colors cursor-pointer ${
                  profileDropdownOpen
                    ? 'bg-blue-50/70 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
                aria-expanded={profileDropdownOpen}
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                  SA
                </div>
                <div className="hidden md:block text-left pr-1">
                  <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {adminName}
                  </span>
                  <span className="block text-[9px] text-slate-400 leading-tight">
                    Super Admin
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in duration-150">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white">{adminName}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{adminEmail}</div>
                  </div>
                  <Link
                    to="/superadmin/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Platform Settings</span>
                  </Link>
                  <Link
                    to="/superadmin/platform"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span>System Observability</span>
                  </Link>
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 3. Main Outlet Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1720px] mx-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer toast={toast} />
    </div>
  );
}

