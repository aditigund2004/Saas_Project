import React, { useState } from 'react';
import {
  broadcastService,
  BROADCAST_TYPES,
  SEVERITY_LEVELS,
  AVAILABLE_ROLES,
  AVAILABLE_TIERS,
  AVAILABLE_CLINICS,
} from '../../../../services/broadcastService';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
  Radio,
  Send,
  Clock,
  Sparkles,
  Smartphone,
  Mail,
  Users,
  CheckCircle2,
  CheckCheck,
  Eye
} from 'lucide-react';

export function CreateBroadcastModal({ isOpen, onClose, onCreated, showToast }) {
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('maintenance');
  const [severity, setSeverity] = useState('warning');
  const [message, setMessage] = useState('');
  const [maintenanceWindow, setMaintenanceWindow] = useState('Sunday, Nov 2, 2026 • 02:00 AM – 02:30 AM IST');
  const [expectedDowntime, setExpectedDowntime] = useState('30 Minutes');
  const [ctaText, setCtaText] = useState('View Guidelines');
  const [ctaUrl, setCtaUrl] = useState('#');

  // Channels
  const [inAppChannel, setInAppChannel] = useState(true);
  const [emailChannel, setEmailChannel] = useState(true);
  const [whatsAppChannel, setWhatsAppChannel] = useState(false);

  // Audience
  const [clinicScope, setClinicScope] = useState('all');
  const [selectedClinicIds, setSelectedClinicIds] = useState(AVAILABLE_CLINICS.map((c) => c.id));
  const [tierScope, setTierScope] = useState('all');
  const [selectedTiers, setSelectedTiers] = useState(['enterprise', 'professional', 'starter']);
  const [roleScope, setRoleScope] = useState('all');
  const [selectedRoles, setSelectedRoles] = useState(['clinic_admin', 'doctor', 'receptionist']);

  // Schedule
  const [scheduleType, setScheduleType] = useState('immediate');
  const [scheduledStart, setScheduledStart] = useState('');
  const [scheduledEnd, setScheduledEnd] = useState('');

  // Device Preview tab
  const [previewDevice, setPreviewDevice] = useState('in_app'); // 'in_app' | 'whatsapp' | 'email'
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Toggle helpers
  const toggleClinic = (id) => {
    setSelectedClinicIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleTier = (id) => {
    setSelectedTiers((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleRole = (id) => {
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Estimate audience count
  const estimatedClinics = clinicScope === 'all' ? 5 : selectedClinicIds.length;
  const estimatedStaffPerClinic = roleScope === 'all' ? 8 : selectedRoles.length * 2.5;
  const totalEstimatedAudience = Math.round(estimatedClinics * estimatedStaffPerClinic);

  const handleSubmit = (targetStatus = 'active') => {
    if (!title.trim()) {
      showToast('Please provide a broadcast title.', 'error');
      return;
    }
    if (!message.trim()) {
      showToast('Please provide broadcast content message.', 'error');
      return;
    }

    const selectedChannels = [];
    if (inAppChannel) selectedChannels.push('in_app');
    if (emailChannel) selectedChannels.push('email');
    if (whatsAppChannel) selectedChannels.push('whatsapp');

    if (selectedChannels.length === 0) {
      showToast('Please select at least one dispatch channel (In-App, Email, or WhatsApp).', 'error');
      return;
    }

    setIsSubmitting(true);

    const newBroadcast = {
      title,
      type,
      severity,
      message,
      maintenanceWindow: type === 'maintenance' ? maintenanceWindow : undefined,
      expectedDowntime: type === 'maintenance' ? expectedDowntime : undefined,
      ctaText: ctaText.trim() || undefined,
      ctaUrl: ctaUrl.trim() || undefined,
      channels: selectedChannels,
      status: targetStatus,
      scheduleType,
      scheduledStart: scheduleType === 'scheduled' && scheduledStart ? scheduledStart : new Date().toISOString(),
      scheduledEnd: scheduledEnd ? scheduledEnd : undefined,
      targetAudience: {
        clinicScope,
        selectedClinicIds: clinicScope === 'all' ? AVAILABLE_CLINICS.map((c) => c.id) : selectedClinicIds,
        tierScope,
        selectedTiers: tierScope === 'all' ? ['enterprise', 'professional', 'starter'] : selectedTiers,
        roleScope,
        selectedRoles: roleScope === 'all' ? ['clinic_admin', 'doctor', 'receptionist', 'patient'] : selectedRoles,
      },
      createdBy: 'Super Admin (Operations)',
      authorRole: 'Platform Administrator',
    };

    setTimeout(() => {
      const created = broadcastService.createBroadcast(newBroadcast);
      setIsSubmitting(false);
      showToast(`✅ Global Broadcast "${created.title}" ${targetStatus === 'active' ? 'dispatched successfully!' : 'saved as draft.'}`);
      if (onCreated) onCreated(created);
      onClose();
    }, 500);
  };

  // Quick preset loader
  const handleLoadPreset = (presetType) => {
    if (presetType === 'maintenance') {
      setTitle('Scheduled Platform Upgrade: Sunday 2:00 AM IST (ABDM M3)');
      setType('maintenance');
      setSeverity('warning');
      setMessage('ClinicOS will undergo a scheduled maintenance window this Sunday at 02:00 AM IST. Offline prescription caching will be active. Expected duration: 30 minutes.');
      setMaintenanceWindow('Sunday, 02:00 AM – 02:30 AM IST');
      setExpectedDowntime('30 Minutes');
      setCtaText('View Offline Protocol');
      setInAppChannel(true);
      setEmailChannel(true);
      setWhatsAppChannel(true);
      setClinicScope('all');
      setRoleScope('all');
    } else if (presetType === 'emergency') {
      setTitle('🚨 Epidemic Surveillance Advisory: Respiratory Screening Protocol');
      setType('emergency');
      setSeverity('critical');
      setMessage('Urgent NHA notification: Mandatory point-of-care rapid screening required for all presenting febrile respiratory patients. Register cases under ABDM Surveillance ID.');
      setCtaText('NHA Guidelines');
      setInAppChannel(true);
      setEmailChannel(false);
      setWhatsAppChannel(true);
      setRoleScope('specific');
      setSelectedRoles(['doctor', 'clinic_admin']);
    } else if (presetType === 'feature') {
      setTitle('✨ Feature Announcement: Enterprise AI Diagnostic Copilot Live');
      setType('feature');
      setSeverity('info');
      setMessage('Enterprise Tier clinics now have real-time ICD-10 diagnostic search assistance enabled directly inside doctor digital consultation rooms.');
      setCtaText('Documentation');
      setInAppChannel(true);
      setEmailChannel(true);
      setWhatsAppChannel(false);
      setTierScope('specific');
      setSelectedTiers(['enterprise']);
      setRoleScope('specific');
      setSelectedRoles(['doctor', 'clinic_admin']);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Global Broadcast & Emergency Alert"
      size="xl"
    >
      <div className="space-y-6">
        {/* Quick Presets Bar */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Quick Presets:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleLoadPreset('maintenance')}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-medium text-slate-800 dark:text-slate-200 shadow-2xs cursor-pointer"
            >
              🛠️ Platform Upgrade
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('emergency')}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-medium text-rose-700 dark:text-rose-300 shadow-2xs cursor-pointer"
            >
              🚨 Emergency Health
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('feature')}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-medium text-indigo-700 dark:text-indigo-300 shadow-2xs cursor-pointer"
            >
              ✨ Feature Release
            </button>
          </div>
        </div>

        {/* 2-Column Split: Left Form Controls, Right Multi-Channel Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Title & Type */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Broadcast Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scheduled Platform Upgrade Sunday 2:00 AM IST"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Announcement Category
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
                  >
                    {Object.values(BROADCAST_TYPES).map((bt) => (
                      <option key={bt.id} value={bt.id}>
                        {bt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Severity Priority
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
                  >
                    {Object.values(SEVERITY_LEVELS).map((sl) => (
                      <option key={sl.id} value={sl.id}>
                        {sl.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Maintenance Window Fields (conditional) */}
            {type === 'maintenance' && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Scheduled Maintenance Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Maintenance Window (IST)
                    </label>
                    <input
                      type="text"
                      value={maintenanceWindow}
                      onChange={(e) => setMaintenanceWindow(e.target.value)}
                      placeholder="Sunday 2:00 AM – 2:30 AM IST"
                      className="w-full px-2.5 py-1.5 rounded border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Estimated Downtime
                    </label>
                    <input
                      type="text"
                      value={expectedDowntime}
                      onChange={(e) => setExpectedDowntime(e.target.value)}
                      placeholder="30 Minutes"
                      className="w-full px-2.5 py-1.5 rounded border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Broadcast Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Broadcast Content / Advisory Text <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State the purpose, expected impact, and healthcare clinical instructions clearly..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Multi-Channel Dispatch Toggles */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Multi-Channel Dispatch Matrix
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 transition-all ${
                  inAppChannel
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <input
                    type="checkbox"
                    checked={inAppChannel}
                    onChange={(e) => setInAppChannel(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-xs">
                    <p className="font-bold flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5" /> In-App Banner
                    </p>
                    <p className="text-[10px] opacity-75">Sticky on dashboard</p>
                  </div>
                </label>

                <label className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 transition-all ${
                  emailChannel
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <input
                    type="checkbox"
                    checked={emailChannel}
                    onChange={(e) => setEmailChannel(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-xs">
                    <p className="font-bold flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> Email Blast
                    </p>
                    <p className="text-[10px] opacity-75">All staff inboxes</p>
                  </div>
                </label>

                <label className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 transition-all ${
                  whatsAppChannel
                    ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-100'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <input
                    type="checkbox"
                    checked={whatsAppChannel}
                    onChange={(e) => setWhatsAppChannel(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div className="text-xs">
                    <p className="font-bold flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" /> WhatsApp API
                    </p>
                    <p className="text-[10px] opacity-75">Urgent phone alert</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Targeted Audiences */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  Targeted Audiences & Scopes
                </label>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  Reach: ~{totalEstimatedAudience} staff across {estimatedClinics} clinics
                </span>
              </div>

              {/* Roles */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-600 dark:text-slate-400">Designated Roles:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRoleScope('all')}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                        roleScope === 'all' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      All Roles
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoleScope('specific')}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                        roleScope === 'specific' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Filter Roles
                    </button>
                  </div>
                </div>

                {roleScope === 'specific' && (
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {AVAILABLE_ROLES.map((role) => (
                      <label
                        key={role.id}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 ${
                          selectedRoles.includes(role.id)
                            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 text-blue-900 dark:text-blue-100 font-semibold'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role.id)}
                          onChange={() => toggleRole(role.id)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{role.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Tiers */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-600 dark:text-slate-400">Clinic Subscription Tiers:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTierScope('all')}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                        tierScope === 'all' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      All Tiers
                    </button>
                    <button
                      type="button"
                      onClick={() => setTierScope('specific')}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                        tierScope === 'specific' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Filter Tiers
                    </button>
                  </div>
                </div>

                {tierScope === 'specific' && (
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {AVAILABLE_TIERS.map((tier) => (
                      <label
                        key={tier.id}
                        className={`px-2 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center gap-1.5 ${
                          selectedTiers.includes(tier.id)
                            ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 text-indigo-900 dark:text-indigo-100 font-semibold'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTiers.includes(tier.id)}
                          onChange={() => toggleTier(tier.id)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="truncate">{tier.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Clinics Scope */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-600 dark:text-slate-400">Clinic Tenant Filtering:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setClinicScope('all')}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                        clinicScope === 'all' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      All 5 Clinics
                    </button>
                    <button
                      type="button"
                      onClick={() => setClinicScope('specific')}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                        clinicScope === 'specific' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Select Clinics
                    </button>
                  </div>
                </div>

                {clinicScope === 'specific' && (
                  <div className="space-y-1 pt-1 max-h-28 overflow-y-auto">
                    {AVAILABLE_CLINICS.map((clinic) => (
                      <label
                        key={clinic.id}
                        className={`px-2.5 py-1 rounded border text-xs cursor-pointer flex items-center justify-between ${
                          selectedClinicIds.includes(clinic.id)
                            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 text-blue-900 dark:text-blue-100 font-medium'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedClinicIds.includes(clinic.id)}
                            onChange={() => toggleClinic(clinic.id)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>{clinic.name}</span>
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400">
                          {clinic.plan} • {clinic.city}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Call to Action & Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="View Guidelines"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  CTA Target Link
                </label>
                <input
                  type="text"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="#"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Timing / Dispatch Mode
                </label>
                <select
                  value={scheduleType}
                  onChange={(e) => setScheduleType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                >
                  <option value="immediate">Broadcast Immediately</option>
                  <option value="scheduled">Schedule for Future (IST)</option>
                </select>
              </div>
            </div>

            {scheduleType === 'scheduled' && (
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Scheduled Start (ISO or IST)
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledStart}
                    onChange={(e) => setScheduledStart(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Auto-End Expiry (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledEnd}
                    onChange={(e) => setScheduledEnd(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Multi-Channel Interactive Device Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                Live Multi-Channel Preview
              </span>
              <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('in_app')}
                  className={`px-2 py-1 rounded font-medium cursor-pointer ${
                    previewDevice === 'in_app' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  In-App Banner
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('whatsapp')}
                  className={`px-2 py-1 rounded font-medium cursor-pointer ${
                    previewDevice === 'whatsapp' ? 'bg-white dark:bg-slate-700 text-teal-600 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('email')}
                  className={`px-2 py-1 rounded font-medium cursor-pointer ${
                    previewDevice === 'email' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Email Card
                </button>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="flex-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white overflow-hidden min-h-[380px] flex flex-col justify-center items-center relative">
              {/* Device 1: In-App Workspace Banner */}
              {previewDevice === 'in_app' && (
                <div className="w-full space-y-3 animate-fade-in">
                  <div className="text-[10px] text-slate-400 text-center uppercase tracking-wider">
                    Workspace Sticky Top Banner Preview
                  </div>
                  <div className={`w-full p-3 rounded-lg text-white text-xs ${
                    severity === 'critical'
                      ? 'bg-gradient-to-r from-rose-700 via-red-600 to-rose-900 shadow-lg shadow-rose-950/50'
                      : severity === 'warning'
                      ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 shadow-lg shadow-amber-950/50'
                      : 'bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 shadow-lg'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/20">
                          {type.toUpperCase()}
                        </span>
                        <span className="font-bold truncate text-xs">
                          {title || 'Broadcast Title Preview'}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white text-slate-900 text-[10px] font-bold shrink-0">
                        {ctaText || 'View'}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/90 line-clamp-2">
                      {type === 'maintenance' && maintenanceWindow ? `[${maintenanceWindow}] ` : ''}
                      {message || 'Broadcast message preview will appear here.'}
                    </p>
                  </div>

                  {/* Simulated Mock Workspace beneath */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-2 opacity-75">
                    <div className="h-3 w-1/3 bg-slate-800 rounded" />
                    <div className="h-14 bg-slate-800/60 rounded flex items-center justify-center text-slate-600 text-[10px]">
                      Doctor / Clinic Operations Workspace
                    </div>
                  </div>
                </div>
              )}

              {/* Device 2: WhatsApp Mobile Preview */}
              {previewDevice === 'whatsapp' && (
                <div className="w-[280px] rounded-3xl bg-[#0b141a] border-4 border-slate-800 shadow-2xl overflow-hidden text-slate-200 text-xs animate-fade-in">
                  {/* WhatsApp Header */}
                  <div className="bg-[#1f2c34] px-3 py-2 flex items-center justify-between border-b border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#00a884] flex items-center justify-center text-white text-[10px] font-bold">
                        CP
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-[11px]">ClinicOS Platform</span>
                          <CheckCircle2 className="w-3 h-3 text-[#00a884]" />
                        </div>
                        <span className="text-[9px] text-slate-400">Verified Business Account</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Chat Area */}
                  <div className="p-3 bg-[#0b141a] space-y-2 min-h-[220px] flex flex-col justify-end">
                    <div className="bg-[#005c4b] p-2.5 rounded-lg rounded-tr-none text-white text-[11px] space-y-1 shadow-sm">
                      <p className="font-bold text-[10px] text-emerald-200 uppercase tracking-wider">
                        {severity === 'critical' ? '🚨 EMERGENCY ADVISORY' : '📡 PLATFORM BROADCAST'}
                      </p>
                      <p className="font-semibold text-[11px]">{title || 'Important Notice'}</p>
                      <p className="text-[10px] text-slate-200 whitespace-pre-line">
                        {message || 'Details of the announcement will be delivered here.'}
                      </p>
                      {type === 'maintenance' && maintenanceWindow && (
                        <p className="text-[10px] text-emerald-100 font-medium">
                          Window: {maintenanceWindow}
                        </p>
                      )}
                      <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200 pt-0.5">
                        <span>13:45</span>
                        <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Device 3: Branded Email Card Preview */}
              {previewDevice === 'email' && (
                <div className="w-full max-w-[340px] rounded-xl bg-white text-slate-900 shadow-xl overflow-hidden text-xs animate-fade-in">
                  {/* Email Header */}
                  <div className="bg-slate-900 p-3 text-white flex items-center justify-between">
                    <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" /> ClinicOS
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                      Platform Alert
                    </span>
                  </div>

                  {/* Ribbon */}
                  <div className={`px-3 py-1 text-center font-bold text-[10px] text-white uppercase tracking-wider ${
                    severity === 'critical' ? 'bg-red-600' : severity === 'warning' ? 'bg-amber-600' : 'bg-blue-600'
                  }`}>
                    {severity.toUpperCase()} NOTICE
                  </div>

                  {/* Email Body */}
                  <div className="p-3.5 space-y-2">
                    <p className="text-slate-500 text-[10px]">To: Clinic Medical Director & Staff</p>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                      {title || 'Platform Announcement'}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {message || 'The full message text will be rendered in this automated notification.'}
                    </p>

                    {type === 'maintenance' && maintenanceWindow && (
                      <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[10px]">
                        <strong>Maintenance Schedule:</strong> {maintenanceWindow}
                      </div>
                    )}

                    <div className="pt-2 text-center">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-[11px]">
                        {ctaText || 'Open ClinicOS Portal'}
                      </span>
                    </div>
                  </div>

                  {/* Email Footer */}
                  <div className="p-2 bg-slate-50 border-t border-slate-100 text-[9px] text-slate-400 text-center">
                    Automated operational dispatch on behalf of ClinicOS SaaS.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting}
            >
              Save Draft
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSubmit('active')}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Broadcasting...' : scheduleType === 'scheduled' ? 'Schedule Broadcast' : 'Dispatch Live Broadcast'}</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
