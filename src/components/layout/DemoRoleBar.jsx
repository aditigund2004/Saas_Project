import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  User,
  RotateCcw,
<<<<<<< HEAD
  Globe,
  Layout,
  ExternalLink
} from 'lucide-react';

export function DemoRoleBar() {
  const { currentRole, switchRole, resetDemoData, activeClinic, clinics } = useApp();
=======
  Globe
} from 'lucide-react';

export function DemoRoleBar() {
  const { currentRole, switchRole, resetDemoData, activeClinic } = useApp();
>>>>>>> origin/main
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicRoute =
<<<<<<< HEAD
    location.pathname === '/' ||
    location.pathname === '/pricing' ||
    location.pathname === '/features' ||
    location.pathname === '/faq' ||
    location.pathname === '/contact' ||
    location.pathname === '/about' ||
    location.pathname.startsWith('/clinic/');

  const targetClinicSlug = activeClinic?.slug || clinics[0]?.slug || 'citycare-family-clinic';
=======
    !location.pathname.startsWith('/superadmin') &&
    !location.pathname.startsWith('/platform') &&
    !location.pathname.startsWith('/clinic') &&
    !location.pathname.startsWith('/doctor') &&
    !location.pathname.startsWith('/reception') &&
    !location.pathname.startsWith('/patient');
>>>>>>> origin/main

  const personas = [
    {
      id: 'super_admin',
<<<<<<< HEAD
      label: 'Super Admin',
      path: '/superadmin/dashboard',
      icon: ShieldCheck,
      roleSubtitle: 'Platform SaaS'
    },
    {
      id: 'clinic_admin',
      label: 'Doctor / Clinic Owner',
      path: '/app/dashboard',
      icon: Stethoscope,
      roleSubtitle: 'Practice & Ops'
    },
    {
      id: 'receptionist',
      label: 'Front Desk Manager',
      path: '/app/frontdesk/dashboard',
      icon: UserCheck,
      roleSubtitle: 'Daily Reception'
    },
    {
      id: 'patient',
      label: 'Patient Portal',
=======
      label: 'SaaS Superadmin',
      path: '/superadmin/dashboard',
      icon: ShieldCheck,
      roleSubtitle: 'Platform Business'
    },
    {
      id: 'clinic_admin',
      label: 'Clinic Doctor/Admin',
      path: '/clinic/dashboard',
      icon: Stethoscope,
      roleSubtitle: 'Clinic & Clinical Ops'
    },
    {
      id: 'receptionist',
      label: 'Receptionist/Manager',
      path: '/reception/dashboard',
      icon: UserCheck,
      roleSubtitle: 'Front-Desk Desk'
    },
    {
      id: 'patient',
      label: 'Patient',
>>>>>>> origin/main
      path: '/patient/dashboard',
      icon: User,
      roleSubtitle: 'Self-Service'
    }
  ];

  const handleRoleSelect = (roleId, path) => {
    switchRole(roleId);
    navigate(path);
  };

  return (
    <div className="bg-slate-950 text-white text-xs px-3 sm:px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 sticky top-0 z-50 shadow-md">
      {/* Left indicator */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 font-bold px-2.5 py-0.5 rounded-full border border-blue-500/30 text-[11px]">
<<<<<<< HEAD
          <Sparkles className="w-3 h-3 text-blue-400" />
          DEMO ROLE SWITCHER
        </span>
        <span className="text-slate-400 hidden xl:inline text-[11px]">
          Multi-Tenant Persona Simulator:
=======
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          DEMO MODE · 4 Roles
        </span>
        <span className="text-slate-400 hidden xl:inline text-[11px]">
          Prototype navigation switcher (client-side state only):
>>>>>>> origin/main
        </span>
      </div>

      {/* Middle Persona Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
        <Link
          to="/"
<<<<<<< HEAD
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-medium text-xs whitespace-nowrap ${
            location.pathname === '/'
=======
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-medium text-[11px] whitespace-nowrap ${
            isPublicRoute
>>>>>>> origin/main
              ? 'bg-blue-600 text-white shadow-xs font-semibold'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
<<<<<<< HEAD
          SaaS Home
=======
          Marketing Site
>>>>>>> origin/main
        </Link>

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        {personas.map((r) => {
          const Icon = r.icon;
<<<<<<< HEAD
          const isActive =
            (r.id === 'super_admin' && (location.pathname.startsWith('/superadmin') || currentRole === 'super_admin')) ||
            (r.id === 'clinic_admin' && (location.pathname.startsWith('/app/dashboard') || location.pathname.startsWith('/clinic') || (currentRole === 'clinic_admin' && !location.pathname.startsWith('/app/frontdesk')))) ||
            (r.id === 'receptionist' && (location.pathname.startsWith('/app/frontdesk') || location.pathname.startsWith('/reception') || currentRole === 'receptionist')) ||
            (r.id === 'patient' && (location.pathname.startsWith('/patient') || currentRole === 'patient'));

=======
          const isActive = !isPublicRoute && currentRole === r.id;
>>>>>>> origin/main
          return (
            <button
              key={r.id}
              onClick={() => handleRoleSelect(r.id, r.path)}
<<<<<<< HEAD
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-semibold text-xs whitespace-nowrap cursor-pointer ${
=======
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-semibold text-[11px] whitespace-nowrap cursor-pointer ${
>>>>>>> origin/main
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
<<<<<<< HEAD
            >
              <Icon className="w-3.5 h-3.5" />
=======
              title={`Switch to ${r.label} (${r.roleSubtitle})`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
>>>>>>> origin/main
              <span>{r.label}</span>
            </button>
          );
        })}
<<<<<<< HEAD

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        {/* Website Studio shortcut */}
        <Link
          to="/app/website-builder"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-semibold text-xs whitespace-nowrap ${
            location.pathname.includes('website-builder')
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/60'
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-indigo-400" />
          <span>Website Studio</span>
        </Link>

        {/* Public Clinic Site shortcut */}
        <Link
          to={`/clinic/${targetClinicSlug}`}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-semibold text-xs whitespace-nowrap ${
            location.pathname.startsWith('/clinic/')
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          <span>Public Clinic Website</span>
        </Link>
      </div>

      {/* Right reset action */}
      <button
        onClick={resetDemoData}
        className="text-[11px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 cursor-pointer"
        title="Reset all demo data to seed defaults"
      >
        <RotateCcw className="w-3 h-3" />
        <span className="hidden sm:inline">Reset Demo</span>
      </button>
=======
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {!isPublicRoute && currentRole !== 'super_admin' && (
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400">
            Active Tenant: <strong className="text-white font-semibold truncate max-w-[120px]">{activeClinic.name}</strong>
          </span>
        )}

        <button
          onClick={resetDemoData}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700 hover:border-slate-600"
          title="Clear localStorage mutations and restore original synthetic demo state"
        >
          <RotateCcw className="w-3 h-3 text-amber-400" />
          <span>Reset Demo</span>
        </button>
      </div>
>>>>>>> origin/main
    </div>
  );
}
