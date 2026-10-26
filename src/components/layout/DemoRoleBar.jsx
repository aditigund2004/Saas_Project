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
  Globe
} from 'lucide-react';

export function DemoRoleBar() {
  const { currentRole, switchRole, resetDemoData, activeClinic } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicRoute =
    !location.pathname.startsWith('/superadmin') &&
    !location.pathname.startsWith('/platform') &&
    !location.pathname.startsWith('/clinic') &&
    !location.pathname.startsWith('/doctor') &&
    !location.pathname.startsWith('/reception') &&
    !location.pathname.startsWith('/patient');

  const personas = [
    {
      id: 'super_admin',
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
        <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          DEMO MODE · 4 Roles
        </span>
        <span className="text-slate-400 hidden xl:inline text-[11px]">
          Prototype navigation switcher (client-side state only):
        </span>
      </div>

      {/* Middle Persona Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
        <Link
          to="/"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-medium text-[11px] whitespace-nowrap ${
            isPublicRoute
              ? 'bg-[#15803D] text-white shadow-xs font-semibold'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Marketing Site
        </Link>

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        {personas.map((r) => {
          const Icon = r.icon;
          const isActive = !isPublicRoute && currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleRoleSelect(r.id, r.path)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-semibold text-[11px] whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title={`Switch to ${r.label} (${r.roleSubtitle})`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{r.label}</span>
            </button>
          );
        })}
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
    </div>
  );
}
