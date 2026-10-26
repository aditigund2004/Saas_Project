import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toAuthRole } from '../../services/roleMapping';
import { HeartPulse, ShieldCheck } from 'lucide-react';

export function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
        <section
          className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10"
          role="status"
          aria-live="polite"
        >
          <span className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <HeartPulse className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="mx-auto mb-4 block h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600 motion-reduce:animate-none" aria-hidden="true" />
          <h1 className="text-lg font-bold tracking-tight text-slate-900">Getting your workspace ready</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            We’re securely checking your account. This should only take a moment.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            Your account is protected
          </span>
        </section>
      </main>
    );
  } 

  // Not signed in: redirect to login with return path
  if (!isAuthenticated || !user) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${returnUrl}`} replace />;
  }

  // Role validation
  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some((role) => toAuthRole(role) === user.role);

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
