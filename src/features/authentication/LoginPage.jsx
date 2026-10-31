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
      color: 'bg-slate-50 dark:bg-[#172640] text-blue-600 dark:text-[#3B82F6] border-slate-200 dark:border-[#263B59] hover:border-blue-500 dark:hover:border-[#3B82F6] hover:bg-blue-50/50 dark:hover:bg-[#1c2e4d]'

    },
    {
      id: 'clinic_admin',
      title: '2. Clinic Doctor / Admin',
      desc: 'Dr. Arvind Rao, MDS (Clinical Consultations & Clinic Admin)',
      path: '/clinic/dashboard',
      icon: Stethoscope,
      color: 'bg-slate-50 dark:bg-[#172640] text-cyan-600 dark:text-[#22D3EE] border-slate-200 dark:border-[#263B59] hover:border-cyan-500 dark:hover:border-[#22D3EE] hover:bg-cyan-50/50 dark:hover:bg-[#1c2e4d]'

    },
    {
      id: 'receptionist',
      title: '3. Receptionist / Manager',
      desc: 'Shweta Kulkarni (Walk-In Tokens, Appointments & Front-Desk)',
      path: '/reception/dashboard',
      icon: UserCheck,
      color: 'bg-slate-50 dark:bg-[#172640] text-indigo-600 dark:text-[#818CF8] border-slate-200 dark:border-[#263B59] hover:border-indigo-500 dark:hover:border-[#818CF8] hover:bg-indigo-50/50 dark:hover:bg-[#1c2e4d]'

    },
    {
      id: 'patient',
      title: '4. Patient',
      desc: 'Aarav Patel (Doctor Discovery, Bookings, Rx & Billing)',
      path: '/patient/dashboard',
      icon: User,
      color: 'bg-slate-50 dark:bg-[#172640] text-emerald-600 dark:text-[#34D399] border-slate-200 dark:border-[#263B59] hover:border-emerald-500 dark:hover:border-[#34D399] hover:bg-emerald-50/50 dark:hover:bg-[#1c2e4d]'

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
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-black text-xl shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-[#F1F5F9]">
            Clinic<span className="text-[#3B82F6]">OS</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-[#F1F5F9] tracking-tight">
          Select a Demo Persona or Sign In
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] max-w-md mx-auto">

          Explore all 8 role workspaces instantly without entering passwords or setting up a database.
        </p>
      </div>

      {/* 8-Role Grid */}
      <Card className="p-6 border-slate-200 dark:border-[#263B59] space-y-4 bg-white dark:bg-[#111E33] shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#263B59] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider">

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
                <div className="p-2 rounded-lg bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-[#263B59] shadow-2xs mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-slate-900 dark:text-[#F1F5F9] flex items-center justify-between">
                    <span>{persona.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] truncate mt-0.5">{persona.desc}</div>

                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Manual Login Form */}
      <Card className="p-6 border-slate-200 dark:border-[#263B59] max-w-md mx-auto space-y-4 bg-white dark:bg-[#111E33]">
        <div className="text-center">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">Or simulate standard login</h3>

        </div>

        <form onSubmit={handleFormLogin} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-[#CBD5E1] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3 top-3" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1628] border border-slate-200 dark:border-[#263B59] text-slate-900 dark:text-[#F1F5F9] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] focus:outline-none"

              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-[#CBD5E1] block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3 top-3" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1628] border border-slate-200 dark:border-[#263B59] text-slate-900 dark:text-[#F1F5F9] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] focus:outline-none font-mono"

              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full font-bold">
            {submitting ? 'Authenticating...' : 'Sign In to Workspace'}
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 dark:text-[#94A3B8]">
          Want to register a new clinic?{' '}
          <Link to="/register" className="font-semibold text-[#22D3EE] hover:underline">

            Start Free Trial Onboarding
          </Link>
        </div>
      </Card>
    </div>
  );
}
