import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, LogOut, Clock, AlertTriangle, Eye, Sparkles } from 'lucide-react';

export function ShadowModeBanner() {
  const { shadowSession, exitShadowMode } = useAuth();
  const { logAuditEvent, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    if (!shadowSession?.expiresAt) return;

    const checkTimer = () => {
      const expiry = new Date(shadowSession.expiresAt).getTime();
      const remainingMs = expiry - Date.now();

      if (remainingMs <= 0) {
        setTimeLeft('00:00');
        handleExit(true);
      } else {
        const totalSecs = Math.floor(remainingMs / 1000);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        setIsExpiringSoon(remainingMs < 5 * 60 * 1000); // under 5 minutes
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 1000);
    return () => clearInterval(interval);
  }, [shadowSession]);

  if (!shadowSession) return null;

  const handleExit = (isAutoExpired = false) => {
    const clinicName = shadowSession.targetClinic?.name || 'Clinic';
    const adminName = shadowSession.superAdminName || 'Super Admin';

    if (logAuditEvent) {
      logAuditEvent({
        action: isAutoExpired ? 'Shadow Mode Expired (Auto-Terminated)' : 'Shadow Mode Terminated',
        category: 'Security',
        details: isAutoExpired
          ? `Privileged shadow session for clinic "${clinicName}" timed out after ${shadowSession.durationMinutes || 30} mins.`
          : `Super Admin ${adminName} manually closed emergency shadow session for clinic "${clinicName}".`,
      });
    }

    exitShadowMode();

    if (showToast) {
      showToast(
        isAutoExpired
          ? `⚠️ Shadow Mode expired. Restored Super Admin privileges.`
          : `✅ Exited Shadow Mode. Welcome back, Super Admin.`,
        isAutoExpired ? 'warning' : 'info'
      );
    }

    navigate('/superadmin/clinics');
  };

  const roleLabel =
    shadowSession.targetRole === 'doctor_admin'
      ? 'Lead Doctor'
      : shadowSession.targetRole === 'receptionist_manager'
      ? 'Receptionist'
      : 'Clinic Administrator';

  return (
    <aside
      aria-label="Tenant Impersonation Emergency Cockpit"
      className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 dark:from-amber-700 dark:via-amber-800 dark:to-amber-950 text-white shadow-md border-b-2 border-amber-400/50 backdrop-blur-md px-3 sm:px-6 py-2 transition-all"
    >
      <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left: Indicator & Tenant Context */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-lg text-amber-200 font-extrabold uppercase tracking-wider text-[11px] border border-amber-300/40 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            <span>Emergency Support Cockpit</span>
          </div>

          <div className="text-white flex items-center gap-1.5">
            <span>
              Viewing <strong className="text-amber-100 font-bold underline decoration-amber-300 underline-offset-2">{shadowSession.targetClinic?.name}</strong> as <span className="font-semibold text-amber-200">{roleLabel}</span>
            </span>
          </div>

          {/* Quick Perspective Switching */}
          <div className="flex items-center gap-1 bg-black/25 p-1 rounded-lg border border-amber-300/30">
            <button
              type="button"
              onClick={() => navigate('/clinic/dashboard')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                location.pathname === '/clinic/dashboard'
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'text-amber-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Administrator Page
            </button>
            <button
              type="button"
              onClick={() => navigate('/clinic/consultations')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                location.pathname.startsWith('/clinic/consultations')
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'text-amber-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Doctor Page
            </button>
          </div>
        </div>

        {/* Center / Administrative Meta & Expiry Timer */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-amber-100/90 w-full md:w-auto justify-between md:justify-center">
          <div className="hidden lg:flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-md border border-amber-400/20 text-[11px]">
            <span className="text-amber-300 font-semibold">Admin:</span>
            <span className="font-mono font-medium text-white">{shadowSession.superAdminName}</span>
            <span className="text-amber-300/70">({shadowSession.superAdminId})</span>
          </div>

          {shadowSession.reason && (
            <div className="hidden xl:flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-md border border-amber-400/20 text-[11px] max-w-xs truncate" title={shadowSession.reason}>
              <span className="text-amber-300 font-semibold">Ticket:</span>
              <span className="text-white truncate">{shadowSession.reason}</span>
            </div>
          )}

          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs font-bold transition-colors ${
              isExpiringSoon
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-black/25 text-amber-100 border border-amber-300/30'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-200" />
            <span>Expires in:</span>
            <span className="text-white tabular-nums">{timeLeft || '--:--'}</span>
          </div>
        </div>

        {/* Right: Exit Action Button */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => handleExit(false)}
            className="flex items-center gap-1.5 bg-white hover:bg-amber-50 active:bg-amber-100 text-amber-950 font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer hover:scale-[1.02] text-xs"
            title="Terminate shadow mode and return to Super Admin console"
          >
            <LogOut className="w-3.5 h-3.5 text-amber-800" />
            <span>Exit Shadow Mode</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

