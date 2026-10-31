import React, { useState } from 'react';
import {
  broadcastService,
  BROADCAST_TYPES,
  SEVERITY_LEVELS,
} from '../../../../services/broadcastService';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
  Radio,
  Clock,
  Smartphone,
  Mail,
  RotateCcw,
  PowerOff,
  Trash2,
  Send
} from 'lucide-react';

export function BroadcastDetailsModal({
  isOpen,
  onClose,
  broadcast,
  onUpdated,
  onOpenTestSimulator,
  showToast,
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !broadcast) return null;

  const broadcastType = BROADCAST_TYPES[broadcast.type] || BROADCAST_TYPES.announcement;
  const severityLevel = SEVERITY_LEVELS[broadcast.severity] || SEVERITY_LEVELS.info;
  const isLive = broadcast.status === 'active';

  const handleToggleStatus = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (isLive) {
        const updated = broadcastService.deactivateBroadcast(broadcast.id);
        showToast(`Broadcast "${broadcast.title}" has been deactivated.`);
        if (onUpdated) onUpdated(updated);
      } else {
        const updated = broadcastService.reactivateBroadcast(broadcast.id);
        showToast(`Broadcast "${broadcast.title}" is now broadcasting live!`);
        if (onUpdated) onUpdated(updated);
      }
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete broadcast "${broadcast.id}"?`)) {
      broadcastService.deleteBroadcast(broadcast.id);
      showToast(`Broadcast ${broadcast.id} permanently deleted.`);
      if (onUpdated) onUpdated();
      onClose();
    }
  };

  const stats = broadcast.stats || {
    inAppImpressions: 0,
    inAppDismissals: 0,
    emailsDispatched: 0,
    emailsDelivered: 0,
    emailsOpened: 0,
    whatsAppDispatched: 0,
    whatsAppDelivered: 0,
    whatsAppRead: 0,
    targetClinicsCount: 5,
    targetRecipientsCount: 42,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Global Broadcast & Emergency Advisory Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Status & Banner Overview */}
        <div className={`p-4 rounded-xl border ${
          broadcast.severity === 'critical'
            ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900'
            : broadcast.severity === 'warning'
            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900'
            : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 font-bold">
                  {broadcast.id}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${broadcastType.badgeClass}`}>
                  {broadcastType.label}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${severityLevel.badgeClass}`}>
                  {severityLevel.label}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  broadcast.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : broadcast.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  Status: {broadcast.status}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-1">
                {broadcast.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Created by {broadcast.createdBy} • Author Role: {broadcast.authorRole || 'Platform Ops'} • {new Date(broadcast.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0">
              <Button
                variant={isLive ? 'outline' : 'primary'}
                size="sm"
                onClick={handleToggleStatus}
                disabled={isProcessing}
                className={isLive ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}
              >
                {isLive ? (
                  <>
                    <PowerOff className="w-3.5 h-3.5 mr-1" /> End Broadcast
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reactivate Live
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Maintenance Window if applicable */}
        {broadcast.maintenanceWindow && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold">Scheduled Maintenance Window: </span>
                <span>{broadcast.maintenanceWindow}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-200/50 dark:bg-amber-900/50 font-bold text-xs whitespace-nowrap">
              Downtime: {broadcast.expectedDowntime || '30 Mins'}
            </span>
          </div>
        )}

        {/* Advisory Message Text */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Advisory Content & Broadcast Message
          </label>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
            {broadcast.message}
          </div>
        </div>

        {/* Multi-Channel Delivery Stats */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Multi-Channel Dispatch Analytics & Reach
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* In-App */}
            <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-1">
              <div className="flex items-center justify-between text-xs text-blue-700 dark:text-blue-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-4 h-4" /> In-App Banner
                </span>
                <span className="text-[10px] uppercase font-semibold">
                  {broadcast.channels?.includes('in_app') ? 'Enabled' : 'Off'}
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white pt-1">
                {stats.inAppImpressions} <span className="text-xs font-normal text-slate-500">Impressions</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {stats.inAppDismissals} staff dismissed • {stats.inAppImpressions - stats.inAppDismissals} active
              </p>
            </div>

            {/* Email Blast */}
            <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
              <div className="flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> Email Blast
                </span>
                <span className="text-[10px] uppercase font-semibold">
                  {broadcast.channels?.includes('email') ? 'Sent' : 'Off'}
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white pt-1">
                {stats.emailsDelivered} <span className="text-xs font-normal text-slate-500">Delivered</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {stats.emailsOpened} opened ({stats.emailsDelivered > 0 ? Math.round((stats.emailsOpened / stats.emailsDelivered) * 100) : 0}% open rate)
              </p>
            </div>

            {/* WhatsApp */}
            <div className="p-3.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 space-y-1">
              <div className="flex items-center justify-between text-xs text-teal-700 dark:text-teal-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" /> WhatsApp API
                </span>
                <span className="text-[10px] uppercase font-semibold">
                  {broadcast.channels?.includes('whatsapp') ? 'Dispatched' : 'Off'}
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white pt-1">
                {stats.whatsAppDelivered} <span className="text-xs font-normal text-slate-500">Confirmed</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {stats.whatsAppRead} read receipts received
              </p>
            </div>
          </div>
        </div>

        {/* Target Audience Metadata */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Target Tenant Clinics:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {broadcast.targetAudience?.clinicScope === 'all'
                ? 'All 5 Tenant Clinics'
                : `${broadcast.targetAudience?.selectedClinicIds?.length || 1} Selected Clinics`}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Eligible Subscription Tiers:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {broadcast.targetAudience?.tierScope === 'all'
                ? 'All Tiers (Enterprise, Professional, Starter)'
                : broadcast.targetAudience?.selectedTiers?.join(', ') || 'All'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Target Healthcare Personas:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {broadcast.targetAudience?.roleScope === 'all'
                ? 'All Roles (Admins, Doctors, Receptionists, Patients)'
                : broadcast.targetAudience?.selectedRoles?.join(', ') || 'Staff'}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete Broadcast
          </Button>

          <div className="flex items-center gap-2">
            {onOpenTestSimulator && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenTestSimulator(broadcast);
                }}
              >
                <Send className="w-3.5 h-3.5 mr-1" /> Test Dispatch
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
