import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { ShieldAlert, ArrowLeft, LogOut, ArrowRight, Home, Lock } from 'lucide-react';

export function AccessDeniedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  const query = new URLSearchParams(location.search);
  const attemptedRole = query.get('attempted') || role || 'current_user';
  const requiredRole = query.get('required') || 'authorized_personnel';
  const fromPath = query.get('from') || '';

  const getAuthorizedDashboard = () => {
    switch (role) {
      case 'superadmin':
        return '/superadmin/dashboard';
      case 'doctor_admin':
        return '/clinic/dashboard';
      case 'receptionist_manager':
        return '/reception/dashboard';
      case 'patient':
        return '/patient/dashboard';
      default:
        return '/login';
    }
  };

  const handleSignOutAndSwitch = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6 text-[#1E293B]">
      <ThemeToggle className="fixed right-4 top-4 z-[100] bg-white" />
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            403 · Access Denied
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Role Permission Boundary
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your current demonstration session does not hold the required authorization credentials to enter this protected clinical route.
          </p>
        </div>

        {/* Diagnostic Metadata Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <span className="text-slate-500">Active Identity:</span>
            <span className="font-bold text-slate-900">{user?.name || 'Anonymous Session'}</span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <span className="text-slate-500">Active Role:</span>
            <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {role ? role.toUpperCase() : 'SIGNED OUT'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Required Role:</span>
            <span className="font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
              {requiredRole.toUpperCase()}
            </span>
          </div>
          {fromPath && (
            <div className="pt-1 text-[11px] text-slate-400 font-mono truncate">
              Target URL: {fromPath}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Link to={getAuthorizedDashboard()} className="block">
            <Button variant="primary" size="md" className="w-full justify-center bg-blue-600 hover:bg-blue-700 font-bold">
              <Home className="w-4 h-4 mr-1.5" /> Return to My Authorized Workspace
            </Button>
          </Link>

          <Button
            variant="outline"
            size="md"
            className="w-full justify-center text-slate-700"
            onClick={handleSignOutAndSwitch}
          >
            <LogOut className="w-4 h-4 mr-1.5" /> Sign Out & Switch Account
          </Button>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100">
          Need to test other roles? Explore accounts on the{' '}
          <Link to="/demo-access" className="font-bold text-blue-600 underline">
            Demo Access Hub &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
