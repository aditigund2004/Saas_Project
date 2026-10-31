import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  broadcastService,
  BROADCAST_TYPES,
} from '../../services/broadcastService';
import {
  AlertTriangle,
  Wrench,
  Sparkles,
  ShieldAlert,
  Megaphone,
  X,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Radio,
  Clock,
  Building2,
  Users,
  Smartphone,
  Mail
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function GlobalBroadcastBanner() {
  const { user: authUser } = useAuth();
  const { currentRole, activeClinic, showToast } = useApp();

  const [broadcasts, setBroadcasts] = useState(() => {
    const role = currentRole || authUser?.role || 'clinic_admin';
    const clinicId = activeClinic?.id || 'clinic-citycare';
    const clinicTier = activeClinic?.subscriptionPlanId || 'professional';
    const userId = authUser?.id || `user-${role}`;
    return broadcastService.getActiveBroadcastsForUser({ role, clinicId, clinicTier, userId });
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = useState(null);

  const refreshBroadcasts = () => {
    const role = currentRole || authUser?.role || 'clinic_admin';
    const clinicId = activeClinic?.id || 'clinic-citycare';
    const clinicTier = activeClinic?.subscriptionPlanId || 'professional';
    const userId = authUser?.id || `user-${role}`;

    const activeList = broadcastService.getActiveBroadcastsForUser({
      role,
      clinicId,
      clinicTier,
      userId,
    });

    setBroadcasts(activeList);
    setCurrentIndex((prev) => (prev >= activeList.length ? 0 : prev));
  };

  useEffect(() => {
    window.addEventListener('clinipulse_broadcast_update', refreshBroadcasts);
    refreshBroadcasts();
    return () => {
      window.removeEventListener('clinipulse_broadcast_update', refreshBroadcasts);
    };
  }, [currentRole, activeClinic, authUser]);

  const currentBroadcast = broadcasts[currentIndex] || null;

  // Record impression once when broadcast changes
  useEffect(() => {
    if (currentBroadcast?.id) {
      broadcastService.recordImpression(currentBroadcast.id);
    }
  }, [currentBroadcast?.id]);

  if (!currentBroadcast) {
    return null;
  }

  const broadcastType = BROADCAST_TYPES[currentBroadcast.type] || BROADCAST_TYPES.announcement;
  const isCritical = currentBroadcast.severity === 'critical';
  const isWarning = currentBroadcast.severity === 'warning';

  const handleDismiss = (e) => {
    e.stopPropagation();
    const userId = authUser?.id || `user-${currentRole}`;
    broadcastService.dismissBroadcast(currentBroadcast.id, userId);
    showToast(`Notice dismissed. You can review past advisories in the Broadcast Hub.`);
    refreshBroadcasts();
  };

  const handleOpenDetails = (broadcast) => {
    setSelectedBroadcast(broadcast);
    setDetailsModalOpen(true);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % broadcasts.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + broadcasts.length) % broadcasts.length);
  };

  // Icon mapping
  const renderIcon = () => {
    switch (currentBroadcast.type) {
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-white shrink-0 animate-bounce" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-white shrink-0" />;
      case 'feature':
        return <Sparkles className="w-4 h-4 text-white shrink-0" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-white shrink-0" />;
      default:
        return <Megaphone className="w-4 h-4 text-white shrink-0" />;
    }
  };

  // Color scheme
  let bgStyles = 'bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 text-white';
  let badgeStyles = 'bg-white/20 text-white border-white/30';
  let pulseDot = 'bg-emerald-400';

  if (isCritical) {
    bgStyles = 'bg-gradient-to-r from-rose-700 via-red-600 to-red-800 text-white shadow-md shadow-red-900/30';
    badgeStyles = 'bg-white/20 text-white border-white/30 font-bold';
    pulseDot = 'bg-white animate-ping';
  } else if (isWarning) {
    bgStyles = 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md shadow-amber-900/20';
    badgeStyles = 'bg-black/20 text-white border-white/30';
    pulseDot = 'bg-amber-300';
  }

  return (
    <>
      <aside 
        aria-label="Platform Global Broadcast"
        className={`relative z-40 px-3 sm:px-6 py-2.5 transition-all duration-300 ${bgStyles} border-b border-white/10`}
      >
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left section: Pulse & Type Badge */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseDot}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${pulseDot}`} />
              </span>
              <div className="p-1 rounded-md bg-white/10 hidden sm:flex items-center justify-center">
                {renderIcon()}
              </div>
            </div>

            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border shrink-0 ${badgeStyles}`}>
              {currentBroadcast.type === 'maintenance' ? 'System Maintenance' : broadcastType.label}
            </span>

            {/* Title & Preview Text */}
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <span className="font-bold truncate hidden md:inline">
                {currentBroadcast.title}
              </span>
              <span className="text-white/90 truncate font-medium">
                {currentBroadcast.maintenanceWindow ? `[${currentBroadcast.maintenanceWindow}] ` : ''}
                {currentBroadcast.message}
              </span>
            </div>
          </div>

          {/* Right section: Controls, CTA, Dismiss */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {broadcasts.length > 1 && (
              <div className="hidden lg:flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-[11px] text-white/90">
                <button
                  onClick={handlePrev}
                  className="hover:text-white p-0.5 rounded hover:bg-white/10 cursor-pointer"
                  title="Previous broadcast"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span>
                  {currentIndex + 1} of {broadcasts.length}
                </span>
                <button
                  onClick={handleNext}
                  className="hover:text-white p-0.5 rounded hover:bg-white/10 cursor-pointer"
                  title="Next broadcast"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => handleOpenDetails(currentBroadcast)}
              className="px-2.5 py-1 rounded bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs shadow-sm flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{currentBroadcast.ctaText || 'View Advisory'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <button
              onClick={handleDismiss}
              className="p-1 rounded hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Dismiss banner"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Full Advisory Detail Modal */}
      {selectedBroadcast && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          title="Platform Broadcast & Emergency Advisory"
          size="lg"
        >
          <div className="space-y-5">
            {/* Header Card */}
            <div className={`p-4 rounded-xl ${
              selectedBroadcast.severity === 'critical'
                ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-100'
                : selectedBroadcast.severity === 'warning'
                ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-100'
                : 'bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-sky-950 dark:text-sky-100'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  selectedBroadcast.severity === 'critical' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 font-bold">
                      {selectedBroadcast.id}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-slate-800 shadow-2xs">
                      {selectedBroadcast.type}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-800 shadow-2xs text-rose-600">
                      Severity: {selectedBroadcast.severity?.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug">
                    {selectedBroadcast.title}
                  </h3>
                  <p className="text-xs opacity-75">
                    Published by {selectedBroadcast.createdBy} ({selectedBroadcast.authorRole}) • {new Date(selectedBroadcast.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Maintenance Window Box if applicable */}
            {selectedBroadcast.maintenanceWindow && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Scheduled Maintenance Window:</span>
                  <span className="underline">{selectedBroadcast.maintenanceWindow}</span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  Estimated Downtime: <strong>{selectedBroadcast.expectedDowntime || '30 Minutes'}</strong>. Background offline queueing will preserve all electronic medical records without loss.
                </p>
              </div>
            )}

            {/* Message Body */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line">
              {selectedBroadcast.message}
            </div>

            {/* Multi-Channel Distribution Matrix */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Multi-Channel Dispatch Verified
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className={`p-3 rounded-lg border flex items-center gap-2.5 ${
                  selectedBroadcast.channels?.includes('in_app')
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  <Radio className="w-4 h-4 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">In-App Banner</p>
                    <p className="text-[11px] opacity-80">
                      {selectedBroadcast.channels?.includes('in_app') ? 'Live on Top Bar' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border flex items-center gap-2.5 ${
                  selectedBroadcast.channels?.includes('email')
                    ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  <Mail className="w-4 h-4 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">Email Blast</p>
                    <p className="text-[11px] opacity-80">
                      {selectedBroadcast.channels?.includes('email')
                        ? `${selectedBroadcast.stats?.emailsDelivered || 42} Delivered`
                        : 'Not Dispatched'}
                    </p>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border flex items-center gap-2.5 ${
                  selectedBroadcast.channels?.includes('whatsapp')
                    ? 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">WhatsApp API</p>
                    <p className="text-[11px] opacity-80">
                      {selectedBroadcast.channels?.includes('whatsapp')
                        ? `${selectedBroadcast.stats?.whatsAppDelivered || 38} Delivered`
                        : 'Not Dispatched'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience Metadata */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-medium">Target Clinics:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {selectedBroadcast.targetAudience?.clinicScope === 'all'
                    ? 'All 5 Registered Tenant Clinics'
                    : `${selectedBroadcast.targetAudience?.selectedClinicIds?.length || 1} Selected Clinics`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-medium">Designated Roles:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {selectedBroadcast.targetAudience?.roleScope === 'all'
                    ? 'All Healthcare Staff (Admins, Doctors, Receptionists, Patients)'
                    : selectedBroadcast.targetAudience?.selectedRoles?.join(', ') || 'Staff'}
                </span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleDismiss({ stopPropagation: () => {} });
                  setDetailsModalOpen(false);
                }}
              >
                Dismiss from My Screen
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setDetailsModalOpen(false)}
              >
                Understood / Acknowledge
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
