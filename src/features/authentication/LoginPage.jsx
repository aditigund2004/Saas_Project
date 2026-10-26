import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Activity,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  User,
  Sparkles,
  ArrowRight,
  Package,
  CreditCard,
  LifeBuoy,
  Lock,
  Mail
} from 'lucide-react';

export function LoginPage() {
  const { switchRole, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('doctor@apexdentalcare.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [submitting, setSubmitting] = useState(false);

  const demoPersonas = [
    {
      id: 'super_admin',
      title: '1. SaaS Superadmin',
      desc: 'Vikramaditya Singhania (Platform Owner & SaaS Operations)',
      path: '/superadmin/dashboard',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
    },
    {
      id: 'clinic_admin',
      title: '2. Clinic Doctor / Admin',
      desc: 'Dr. Arvind Rao, MDS (Clinical Consultations & Clinic Admin)',
      path: '/clinic/dashboard',
      icon: Stethoscope,
      color: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
    },
    {
      id: 'receptionist',
      title: '3. Receptionist / Manager',
      desc: 'Shweta Kulkarni (Walk-In Tokens, Appointments & Front-Desk)',
      path: '/reception/dashboard',
      icon: UserCheck,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300'
    },
    {
      id: 'patient',
      title: '4. Patient',
      desc: 'Aarav Patel (Doctor Discovery, Bookings, Rx & Billing)',
      path: '/patient/dashboard',
      icon: User,
      color: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100 hover:border-sky-300'
    }
  ];

  const handleQuickLogin = (roleId, path) => {
    switchRole(roleId);
    showToast(`Logged in as demo persona: ${roleId.replace('_', ' ').toUpperCase()}`);
    navigate(path);
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      switchRole('clinic_admin');
      showToast('Logged in as Clinic Administrator. Opening Dashboard...');
      navigate('/clinic/dashboard');
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Clinic<span className="text-blue-600">OS</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Select a Demo Persona or Sign In
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Explore all 8 role workspaces instantly without entering passwords or setting up a database.
        </p>
      </div>

      {/* 8-Role Grid */}
      <Card className="p-6 border-slate-200 space-y-4 bg-gradient-to-br from-slate-50 to-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1-Click Demo Persona Launchpad (8 Experiences)
            </h2>
          </div>
          <Badge variant="teal" size="sm">Frontend Sandbox</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {demoPersonas.map((persona) => {
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                onClick={() => handleQuickLogin(persona.id, persona.path)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all text-left cursor-pointer ${persona.color}`}
              >
                <div className="p-2 rounded-lg bg-white/80 shadow-2xs mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                    <span>{persona.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                  <div className="text-[11px] text-slate-600 truncate mt-0.5">{persona.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Manual Login Form */}
      <Card className="p-6 border-slate-200 max-w-md mx-auto space-y-4">
        <div className="text-center">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Or simulate standard login</h3>
        </div>

        <form onSubmit={handleFormLogin} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full font-bold">
            {submitting ? 'Authenticating...' : 'Sign In to Workspace'}
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Want to register a new clinic?{' '}
          <Link to="/register" className="font-semibold text-blue-700 hover:underline">
            Start Free Trial Onboarding
          </Link>
        </div>
      </Card>
    </div>
  );
}
