import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MockAuthService, SEEDED_DEMO_USERS } from '../../services/mockAuthService';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Activity,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  User,
  ArrowRight,
  Building2,
  Sparkles,
  Info,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowLeft
} from 'lucide-react';

export function DemoAccessPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [filterRole, setFilterRole] = useState('all');

  const registeredPatients = MockAuthService.getRegisteredPatients();
  const allUsers = [...SEEDED_DEMO_USERS, ...registeredPatients];

  const handleInstantSignIn = async (account) => {
    const res = await login({
      identifier: account.email,
      password: 'DemoPassword123',
      role: account.role,
      clinicId: account.activeClinicId
    });

    if (res.success) {
      if (account.role === 'superadmin') {
        navigate('/superadmin/dashboard');
      } else if (account.role === 'doctor_admin') {
        navigate('/clinic/dashboard');
      } else if (account.role === 'receptionist_manager') {
        navigate('/reception/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    }
  };

  const filtered = allUsers.filter((u) => {
    if (filterRole === 'all') return true;
    return u.role === filterRole;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case 'superadmin':
        return <Badge variant="purple">SaaS Superadmin</Badge>;
      case 'doctor_admin':
        return <Badge variant="info">Doctor / Admin</Badge>;
      case 'receptionist_manager':
        return <Badge variant="warning">Receptionist / Front Desk</Badge>;
      case 'patient':
        return <Badge variant="success">Patient</Badge>;
      default:
        return <Badge variant="default">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#15803D] flex items-center justify-center text-white font-black text-sm">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 tracking-tight">ClinicOS</span>
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Prototype Testing Utility
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Demo Access & Accounts Console
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            1-click test identities across all 4 roles and 5 demonstration clinics for rapid stakeholder evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Standard Login
            </Button>
          </Link>
          <Link to="/register/patient">
            <Button variant="primary" size="sm" className="bg-[#15803D] hover:bg-[#166534] font-bold">
              + New Patient Registration
            </Button>
          </Link>
        </div>
      </div>

      {/* Strict Prototype Notice (Section 8, 9) */}
      <div className="max-w-6xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Evaluation Testing Facility Only</span>
        </div>
        <p className="text-amber-800 leading-relaxed">
          This console is designed strictly for demonstration and investor previews. It allows evaluators to simulate authentication across all 4 system roles without manual password typing. In a production environment, privileged Superadmin and Staff credentials must be secured behind hardware-backed identity providers and server-enforced access controls.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Accounts' },
          { id: 'superadmin', label: '1. Superadmin' },
          { id: 'doctor_admin', label: '2. Doctor / Admin (5 Clinics)' },
          { id: 'receptionist_manager', label: '3. Receptionists (5 Clinics)' },
          { id: 'patient', label: '4. Patients' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilterRole(t.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterRole === t.id ? 'bg-[#15803D] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Accounts Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((acc) => {
          const isSuperadmin = acc.role === 'superadmin';
          const primaryClinic = acc.memberships[0]?.clinicName || (acc.activeClinicId ? 'Assigned Practice' : 'Global Platform');

          return (
            <Card
              key={acc.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between hover:shadow-md ${
                isSuperadmin
                  ? 'border-purple-200 bg-purple-50/20'
                  : acc.role === 'doctor_admin'
                  ? 'border-blue-200 bg-blue-50/20'
                  : acc.role === 'receptionist_manager'
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                      alt={acc.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">{acc.name}</h3>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{acc.email}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {getRoleBadge(acc.role)}
                  {acc.memberships.length > 1 && (
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                      {acc.memberships.length} Clinics Assigned
                    </span>
                  )}
                </div>

                {/* Clinic Membership Info */}
                <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                    <span className="truncate">{primaryClinic}</span>
                  </div>
                  {acc.phone && (
                    <div className="text-[11px] text-slate-400 font-mono">
                      Phone: {acc.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* 1-Click Sign In Trigger */}
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">Demo Password: Any 4+ chars</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleInstantSignIn(acc)}
                  className="font-bold text-xs"
                >
                  1-Click Test Sign In &rarr;
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

