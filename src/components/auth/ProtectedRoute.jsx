import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500">Checking authorization...</span>
        </div>
      </div>
    );
  }

  // Not signed in: redirect to login with return path
  if (!isAuthenticated || !user) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${returnUrl}`} replace />;
  }

  // Role validation
  if (allowedRoles && allowedRoles.length > 0) {
    // Map between formats ('doctor_admin' vs 'clinic_admin', etc.)
    const normalizedUserRole = user.role;
    const isAllowed = allowedRoles.some((r) => {
      if (r === normalizedUserRole) return true;
      if (r === 'clinic_admin' && normalizedUserRole === 'doctor_admin') return true;
      if (r === 'doctor_admin' && normalizedUserRole === 'clinic_admin') return true;
      if (r === 'receptionist' && normalizedUserRole === 'receptionist_manager') return true;
      if (r === 'receptionist_manager' && normalizedUserRole === 'receptionist') return true;
      if (r === 'super_admin' && normalizedUserRole === 'superadmin') return true;
      if (r === 'superadmin' && normalizedUserRole === 'super_admin') return true;
      return false;
    });

    if (!isAllowed) {
      return (
        <Navigate
          to={`/access-denied?attempted=${user.role}&required=${allowedRoles.join(',')}&from=${encodeURIComponent(location.pathname)}`}
          replace
        />
      );
    }
  }

  return children ? children : <Outlet />;
}

