// Centralized Broadcast & Emergency Notification Service for ClinicOS SaaS
// Manages platform-wide announcements, targeted role/tier filtering,
// multi-channel dispatch simulation (In-App Banner, Email Blast, WhatsApp API),
// and persistent storage via localStorage.

const STORAGE_KEYS = {
  BROADCASTS: 'clinipulse_broadcasts',
  DISMISSED: 'clinipulse_broadcast_dismissals',
  LOGS: 'clinipulse_broadcast_logs',
};

export const BROADCAST_TYPES = {
  maintenance: {
    id: 'maintenance',
    label: 'Scheduled Maintenance',
    iconName: 'Wrench',
    color: 'amber',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    bannerGradient: 'from-amber-600 via-amber-700 to-orange-700',
  },
  emergency: {
    id: 'emergency',
    label: 'Emergency Health Advisory',
    iconName: 'AlertTriangle',
    color: 'rose',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    bannerGradient: 'from-rose-600 via-red-700 to-rose-900',
  },
  feature: {
    id: 'feature',
    label: 'Feature Release',
    iconName: 'Sparkles',
    color: 'indigo',
    badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
    bannerGradient: 'from-indigo-600 via-sky-700 to-blue-800',
  },
  security: {
    id: 'security',
    label: 'Security Notice',
    iconName: 'ShieldAlert',
    color: 'purple',
    badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    bannerGradient: 'from-purple-700 via-violet-800 to-slate-900',
  },
  announcement: {
    id: 'announcement',
    label: 'Platform Announcement',
    iconName: 'Megaphone',
    color: 'sky',
    badgeClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300 dark:border-sky-800',
    bannerGradient: 'from-sky-600 via-cyan-700 to-teal-800',
  },
};

export const SEVERITY_LEVELS = {
  critical: {
    id: 'critical',
    label: 'Critical / Emergency',
    badgeClass: 'bg-red-500 text-white font-semibold',
    pulse: true,
  },
  warning: {
    id: 'warning',
    label: 'High / Warning',
    badgeClass: 'bg-amber-500 text-white font-semibold',
    pulse: false,
  },
  info: {
    id: 'info',
    label: 'Medium / Information',
    badgeClass: 'bg-blue-500 text-white font-medium',
    pulse: false,
  },
  low: {
    id: 'low',
    label: 'Low / Standard Notice',
    badgeClass: 'bg-slate-500 text-white font-normal',
    pulse: false,
  },
};

export const AVAILABLE_ROLES = [
  { id: 'clinic_admin', label: 'Clinic Admins & Directors', desc: 'Practice managers, administrative owners' },
  { id: 'doctor', label: 'Doctors & Specialists', desc: 'OPD consulting physicians, surgeons' },
  { id: 'receptionist', label: 'Receptionists & Front Desk', desc: 'Patient check-in, queue managers' },
  { id: 'patient', label: 'Patients (Patient Portal)', desc: 'Registered patients using online bookings' },
];

export const AVAILABLE_TIERS = [
  { id: 'enterprise', label: 'Enterprise Chain', desc: 'Multi-branch hospitals, custom ABDM nodes' },
  { id: 'professional', label: 'Professional Tier', desc: 'Multi-specialty primary clinics' },
  { id: 'starter', label: 'Starter Clinic', desc: 'Solo practitioners & dental studios' },
];

export const AVAILABLE_CLINICS = [
  { id: 'clinic-citycare', name: 'CityCare Family Clinic', plan: 'professional', city: 'Pune' },
  { id: 'clinic-heartwell', name: 'HeartWell Cardiology Centre', plan: 'enterprise', city: 'Mumbai' },
  { id: 'clinic-brightsmile', name: 'BrightSmile Dental Studio', plan: 'starter', city: 'Bengaluru' },
  { id: 'clinic-skinspring', name: 'SkinSpring Dermatology & Laser', plan: 'professional', city: 'Delhi' },
  { id: 'clinic-movewell', name: 'MoveWell Orthopedic & Physiotherapy', plan: 'enterprise', city: 'Hyderabad' },
];

export const SEED_BROADCASTS = [
  {
    id: 'BC-2026-001',
    title: 'Scheduled Platform Upgrade: Sunday 2:00 AM IST (ABDM M3 Engine)',
    type: 'maintenance',
    severity: 'warning',
    channels: ['in_app', 'email', 'whatsapp'],
    message: 'ClinicOS will undergo scheduled platform maintenance on Sunday at 02:00 AM IST. Estimated downtime is 30 minutes. Emergency offline prescription buffer will activate automatically during this window. OPD consultation records will queue safely and auto-sync once connectivity restores.',
    maintenanceWindow: 'Sunday, Nov 2, 2026 • 02:00 AM – 02:30 AM IST',
    expectedDowntime: '30 Minutes',
    ctaText: 'View Offline Protocol Guide',
    ctaUrl: '#',
    status: 'active',
    scheduleType: 'immediate',
    scheduledStart: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    scheduledEnd: new Date(Date.now() + 86400 * 1000 * 3).toISOString(),
    targetAudience: {
      clinicScope: 'all',
      selectedClinicIds: ['clinic-citycare', 'clinic-heartwell', 'clinic-brightsmile', 'clinic-skinspring', 'clinic-movewell'],
      tierScope: 'all',
      selectedTiers: ['enterprise', 'professional', 'starter'],
      roleScope: 'all',
      selectedRoles: ['clinic_admin', 'doctor', 'receptionist', 'patient'],
    },
    createdBy: 'Super Admin (DevOps & Reliability)',
    authorRole: 'Platform Infrastructure Lead',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    stats: {
      targetClinicsCount: 5,
      targetRecipientsCount: 42,
      inAppImpressions: 184,
      inAppDismissals: 26,
      emailsDispatched: 42,
      emailsDelivered: 42,
      emailsOpened: 39,
      whatsAppDispatched: 38,
      whatsAppDelivered: 38,
      whatsAppRead: 34,
    },
  },
  {
    id: 'BC-2026-002',
    title: '🚨 NHA Emergency Health Advisory: Acute Respiratory Surveillance Reporting',
    type: 'emergency',
    severity: 'critical',
    channels: ['in_app', 'whatsapp'],
    message: 'National Health Authority (NHA) directive: Heightened clinical surveillance is mandated for acute influenza-like illness (ILI). Doctors must log Culture Sensitivity IDs for second-line broad-spectrum antimicrobials and report cluster cases through the integrated ABDM epidemiology bridge.',
    ctaText: 'Review NHA Surveillance Guidelines',
    ctaUrl: '#',
    status: 'active',
    scheduleType: 'immediate',
    scheduledStart: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    scheduledEnd: new Date(Date.now() + 86400 * 1000 * 6).toISOString(),
    targetAudience: {
      clinicScope: 'all',
      selectedClinicIds: ['clinic-citycare', 'clinic-heartwell', 'clinic-brightsmile', 'clinic-skinspring', 'clinic-movewell'],
      tierScope: 'all',
      selectedTiers: ['enterprise', 'professional', 'starter'],
      roleScope: 'specific',
      selectedRoles: ['doctor', 'clinic_admin'],
    },
    createdBy: 'Chief Medical Compliance Officer',
    authorRole: 'Super Admin Regulatory Affairs',
    createdAt: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    stats: {
      targetClinicsCount: 5,
      targetRecipientsCount: 24,
      inAppImpressions: 119,
      inAppDismissals: 12,
      emailsDispatched: 0,
      emailsDelivered: 0,
      emailsOpened: 0,
      whatsAppDispatched: 24,
      whatsAppDelivered: 24,
      whatsAppRead: 23,
    },
  },
  {
    id: 'BC-2026-003',
    title: '✨ Enterprise Feature Live: AI Drug-to-Drug Interaction & Allergy Guard',
    type: 'feature',
    severity: 'info',
    channels: ['in_app', 'email'],
    message: 'Enterprise Tier clinics now have real-time AI cross-referencing enabled during digital prescription authoring. Flags high-risk interactions against patient allergy history and CDSCO contraindicated drug combinations before saving.',
    ctaText: 'Explore Feature Documentation',
    ctaUrl: '#',
    status: 'active',
    scheduleType: 'immediate',
    scheduledStart: new Date(Date.now() - 86400 * 1000 * 1).toISOString(),
    scheduledEnd: new Date(Date.now() + 86400 * 1000 * 14).toISOString(),
    targetAudience: {
      clinicScope: 'specific',
      selectedClinicIds: ['clinic-heartwell', 'clinic-movewell'],
      tierScope: 'specific',
      selectedTiers: ['enterprise'],
      roleScope: 'specific',
      selectedRoles: ['doctor', 'clinic_admin'],
    },
    createdBy: 'Product Innovation Team',
    authorRole: 'Super Admin Product Ops',
    createdAt: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400 * 1000 * 1).toISOString(),
    stats: {
      targetClinicsCount: 2,
      targetRecipientsCount: 16,
      inAppImpressions: 82,
      inAppDismissals: 8,
      emailsDispatched: 16,
      emailsDelivered: 16,
      emailsOpened: 15,
      whatsAppDispatched: 0,
      whatsAppDelivered: 0,
      whatsAppRead: 0,
    },
  },
  {
    id: 'BC-2026-004',
    title: '📢 Front-Desk Receptionists: WhatsApp Live Queue Token Dispatch Activated',
    type: 'announcement',
    severity: 'info',
    channels: ['in_app'],
    message: 'Receptionists can now send real-time OPD Queue Token barcodes directly via WhatsApp to patients as soon as they check in at the front desk. Live queue status allows patients to track OPD wait times from their smartphone.',
    ctaText: 'View Receptionist Guide',
    ctaUrl: '#',
    status: 'active',
    scheduleType: 'immediate',
    scheduledStart: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
    scheduledEnd: new Date(Date.now() + 86400 * 1000 * 10).toISOString(),
    targetAudience: {
      clinicScope: 'all',
      selectedClinicIds: ['clinic-citycare', 'clinic-heartwell', 'clinic-brightsmile', 'clinic-skinspring', 'clinic-movewell'],
      tierScope: 'all',
      selectedTiers: ['enterprise', 'professional', 'starter'],
      roleScope: 'specific',
      selectedRoles: ['receptionist', 'clinic_admin'],
    },
    createdBy: 'Customer Success Team',
    authorRole: 'Platform Enablement Manager',
    createdAt: new Date(Date.now() - 86400 * 1000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
    stats: {
      targetClinicsCount: 5,
      targetRecipientsCount: 18,
      inAppImpressions: 74,
      inAppDismissals: 15,
      emailsDispatched: 0,
      emailsDelivered: 0,
      emailsOpened: 0,
      whatsAppDispatched: 0,
      whatsAppDelivered: 0,
      whatsAppRead: 0,
    },
  },
  {
    id: 'BC-2026-005',
    title: '🔒 Scheduled Security Operation: Bi-Annual OAuth & Session Invalidation',
    type: 'security',
    severity: 'critical',
    channels: ['in_app', 'email', 'whatsapp'],
    message: 'Scheduled security compliance routine: All active web and mobile staff login sessions will be gracefully rotated to comply with ISO 27001 & DPDP Act credential integrity guidelines. Staff will be prompted to re-enter credentials or 2FA OTP upon next action.',
    maintenanceWindow: 'Saturday, Nov 8, 2026 • 01:30 AM – 02:00 AM IST',
    expectedDowntime: '10 Minutes',
    ctaText: 'Security Compliance FAQ',
    ctaUrl: '#',
    status: 'scheduled',
    scheduleType: 'scheduled',
    scheduledStart: '2026-11-08T01:30:00.000Z',
    scheduledEnd: '2026-11-08T02:00:00.000Z',
    targetAudience: {
      clinicScope: 'all',
      selectedClinicIds: ['clinic-citycare', 'clinic-heartwell', 'clinic-brightsmile', 'clinic-skinspring', 'clinic-movewell'],
      tierScope: 'all',
      selectedTiers: ['enterprise', 'professional', 'starter'],
      roleScope: 'all',
      selectedRoles: ['clinic_admin', 'doctor', 'receptionist', 'patient'],
    },
    createdBy: 'Super Admin (SecOps)',
    authorRole: 'Chief Information Security Officer',
    createdAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    stats: {
      targetClinicsCount: 5,
      targetRecipientsCount: 42,
      inAppImpressions: 0,
      inAppDismissals: 0,
      emailsDispatched: 0,
      emailsDelivered: 0,
      emailsOpened: 0,
      whatsAppDispatched: 0,
      whatsAppDelivered: 0,
      whatsAppRead: 0,
    },
  },
];

export const SEED_LOGS = [
  {
    id: 'LOG-BC-901',
    broadcastId: 'BC-2026-001',
    event: 'Multi-Channel Broadcast Dispatched',
    channel: 'In-App, Email, WhatsApp',
    actor: 'Super Admin (DevOps)',
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    status: 'Delivered',
    details: 'Dispatched to 5 tenant clinics (42 staff recipients). 38 WhatsApp notifications confirmed delivered.',
  },
  {
    id: 'LOG-BC-902',
    broadcastId: 'BC-2026-002',
    event: 'Emergency Advisory Broadcasted',
    channel: 'In-App, WhatsApp',
    actor: 'Chief Medical Compliance Officer',
    timestamp: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    status: 'High Priority',
    details: 'Broadcasted to 24 doctors across all 5 clinics. WhatsApp template "nha_emergency_advisory" dispatched.',
  },
  {
    id: 'LOG-BC-903',
    broadcastId: 'BC-2026-003',
    event: 'Tier-Targeted Feature Announcement',
    channel: 'In-App, Email',
    actor: 'Product Innovation Team',
    timestamp: new Date(Date.now() - 86400 * 1000 * 1).toISOString(),
    status: 'Completed',
    details: 'Delivered to Enterprise Tier clinics (HeartWell & MoveWell). 16 staff emails dispatched.',
  },
];

export const broadcastService = {
  // Fetch all broadcasts
  getBroadcasts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BROADCASTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed reading broadcasts from localStorage', e);
    }
    localStorage.setItem(STORAGE_KEYS.BROADCASTS, JSON.stringify(SEED_BROADCASTS));
    return SEED_BROADCASTS;
  },

  // Save full list
  saveBroadcasts: (broadcasts) => {
    localStorage.setItem(STORAGE_KEYS.BROADCASTS, JSON.stringify(broadcasts));
    window.dispatchEvent(new CustomEvent('clinipulse_broadcast_update'));
  },

  // Get single broadcast
  getBroadcastById: (id) => {
    const broadcasts = broadcastService.getBroadcasts();
    return broadcasts.find((b) => b.id === id) || null;
  },

  // Create new broadcast
  createBroadcast: (newBroadcastData) => {
    const broadcasts = broadcastService.getBroadcasts();
    const id = `BC-2026-${String(broadcasts.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();

    // Calculate initial target recipient estimates
    let targetRecipients = 42;
    if (newBroadcastData.targetAudience?.roleScope === 'specific') {
      const roles = newBroadcastData.targetAudience.selectedRoles || [];
      targetRecipients = roles.length * 8;
    }
    if (newBroadcastData.targetAudience?.clinicScope === 'specific') {
      const clinics = newBroadcastData.targetAudience.selectedClinicIds || [];
      targetRecipients = Math.round(targetRecipients * (clinics.length / 5));
    }

    const created = {
      ...newBroadcastData,
      id,
      createdAt: now,
      updatedAt: now,
      stats: {
        targetClinicsCount: newBroadcastData.targetAudience?.clinicScope === 'specific'
          ? (newBroadcastData.targetAudience.selectedClinicIds?.length || 1)
          : 5,
        targetRecipientsCount: Math.max(1, targetRecipients),
        inAppImpressions: newBroadcastData.channels?.includes('in_app') ? 1 : 0,
        inAppDismissals: 0,
        emailsDispatched: newBroadcastData.channels?.includes('email') ? targetRecipients : 0,
        emailsDelivered: newBroadcastData.channels?.includes('email') ? targetRecipients : 0,
        emailsOpened: 0,
        whatsAppDispatched: newBroadcastData.channels?.includes('whatsapp') ? Math.round(targetRecipients * 0.9) : 0,
        whatsAppDelivered: newBroadcastData.channels?.includes('whatsapp') ? Math.round(targetRecipients * 0.9) : 0,
        whatsAppRead: 0,
      },
    };

    const updatedList = [created, ...broadcasts];
    broadcastService.saveBroadcasts(updatedList);

    // Add log
    broadcastService.logEvent({
      broadcastId: id,
      event: `Global Broadcast Created (${created.type})`,
      channel: (created.channels || []).join(', ') || 'In-App',
      actor: created.createdBy || 'Super Admin',
      status: created.status === 'active' ? 'Broadcasting' : 'Scheduled',
      details: `Dispatched to ${created.stats.targetClinicsCount} clinics, ~${created.stats.targetRecipientsCount} recipients.`,
    });

    return created;
  },

  // Update existing
  updateBroadcast: (id, updates) => {
    const broadcasts = broadcastService.getBroadcasts();
    const index = broadcasts.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updated = {
      ...broadcasts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    broadcasts[index] = updated;
    broadcastService.saveBroadcasts(broadcasts);
    return updated;
  },

  // End or deactivate broadcast
  deactivateBroadcast: (id) => {
    const updated = broadcastService.updateBroadcast(id, { status: 'ended' });
    broadcastService.logEvent({
      broadcastId: id,
      event: 'Broadcast Deactivated Manually',
      channel: 'Console',
      actor: 'Super Admin',
      status: 'Terminated',
      details: 'Super Admin ended live broadcast visibility.',
    });
    return updated;
  },

  // Reactivate broadcast
  reactivateBroadcast: (id) => {
    const updated = broadcastService.updateBroadcast(id, { status: 'active' });
    broadcastService.logEvent({
      broadcastId: id,
      event: 'Broadcast Reactivated',
      channel: 'Console',
      actor: 'Super Admin',
      status: 'Active',
      details: 'Super Admin re-enabled live broadcast visibility.',
    });
    return updated;
  },

  // Delete broadcast
  deleteBroadcast: (id) => {
    const broadcasts = broadcastService.getBroadcasts();
    const filtered = broadcasts.filter((b) => b.id !== id);
    broadcastService.saveBroadcasts(filtered);
    return true;
  },

  // Increment impression counter
  recordImpression: (broadcastId) => {
    const broadcasts = broadcastService.getBroadcasts();
    const item = broadcasts.find((b) => b.id === broadcastId);
    if (item && item.stats) {
      item.stats.inAppImpressions = (item.stats.inAppImpressions || 0) + 1;
      broadcastService.saveBroadcasts(broadcasts);
    }
  },

  // Dismiss a broadcast for a user
  dismissBroadcast: (broadcastId, userId = 'current_user') => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DISMISSED);
      const dismissed = stored ? JSON.parse(stored) : {};
      if (!dismissed[userId]) {
        dismissed[userId] = [];
      }
      if (!dismissed[userId].includes(broadcastId)) {
        dismissed[userId].push(broadcastId);
      }
      localStorage.setItem(STORAGE_KEYS.DISMISSED, JSON.stringify(dismissed));

      // Also record stat
      const broadcasts = broadcastService.getBroadcasts();
      const item = broadcasts.find((b) => b.id === broadcastId);
      if (item && item.stats) {
        item.stats.inAppDismissals = (item.stats.inAppDismissals || 0) + 1;
        broadcastService.saveBroadcasts(broadcasts);
      }

      window.dispatchEvent(new CustomEvent('clinipulse_broadcast_update'));
      return true;
    } catch (e) {
      console.error('Failed to dismiss broadcast', e);
      return false;
    }
  },

  // Check if broadcast is dismissed
  isBroadcastDismissed: (broadcastId, userId = 'current_user') => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DISMISSED);
      if (!stored) return false;
      const dismissed = JSON.parse(stored);
      return Boolean(dismissed[userId] && dismissed[userId].includes(broadcastId));
    } catch {
      return false;
    }
  },

  // Clear dismissals for testing
  clearDismissals: (userId = 'current_user') => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DISMISSED);
      if (stored) {
        const dismissed = JSON.parse(stored);
        delete dismissed[userId];
        localStorage.setItem(STORAGE_KEYS.DISMISSED, JSON.stringify(dismissed));
      }
      window.dispatchEvent(new CustomEvent('clinipulse_broadcast_update'));
    } catch (e) {
      console.error('Failed to clear dismissals', e);
    }
  },

  // Filter active broadcasts for current user context
  getActiveBroadcastsForUser: ({ role, clinicId, clinicTier, userId = 'current_user' }) => {
    const broadcasts = broadcastService.getBroadcasts();
    const now = Date.now();

    return broadcasts.filter((b) => {
      // Must be active status
      if (b.status !== 'active') return false;

      // Check dates
      if (b.scheduledStart && new Date(b.scheduledStart).getTime() > now) return false;
      if (b.scheduledEnd && new Date(b.scheduledEnd).getTime() < now) return false;

      // Has user dismissed it?
      if (broadcastService.isBroadcastDismissed(b.id, userId)) return false;

      // Super Admin sees all active broadcasts for verification
      if (role === 'super_admin' || role === 'superadmin') return true;

      const aud = b.targetAudience;
      if (!aud) return true;

      // Check clinic scope
      if (aud.clinicScope === 'specific' && clinicId) {
        if (!aud.selectedClinicIds?.includes(clinicId)) return false;
      }

      // Check tier scope
      if (aud.tierScope === 'specific' && clinicTier) {
        if (!aud.selectedTiers?.includes(clinicTier)) return false;
      }

      // Check role scope
      if (aud.roleScope === 'specific' && role) {
        // Map common app role aliases
        const normalizedRole = role === 'admin' ? 'clinic_admin' : role;
        if (!aud.selectedRoles?.includes(normalizedRole)) return false;
      }

      return true;
    });
  },

  // Dispatch Simulator test
  simulateDispatchTest: async ({ broadcast, channel, testRecipient }) => {
    await new Promise((r) => setTimeout(r, 800));

    const id = `SIM-${Date.now()}`;
    const logEntry = {
      id,
      broadcastId: broadcast.id,
      event: `Test Dispatch (${channel.toUpperCase()})`,
      channel: channel.toUpperCase(),
      actor: 'Super Admin (Simulation)',
      timestamp: new Date().toISOString(),
      status: 'Test Sent',
      details: `Test dispatch delivered to ${testRecipient || 'test-sandbox@clinicos.app'}`,
    };

    broadcastService.logEvent(logEntry);
    return {
      success: true,
      channel,
      recipient: testRecipient,
      deliveredAt: new Date().toISOString(),
      latencyMs: 142,
    };
  },

  // Audit Logs
  getBroadcastLogs: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed reading broadcast logs', e);
    }
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(SEED_LOGS));
    return SEED_LOGS;
  },

  logEvent: (eventData) => {
    const logs = broadcastService.getBroadcastLogs();
    const newEntry = {
      id: `LOG-BC-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...eventData,
    };
    const updated = [newEntry, ...logs];
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated.slice(0, 100)));
    return newEntry;
  },

  // Reset to default seeds
  resetBroadcastData: () => {
    localStorage.setItem(STORAGE_KEYS.BROADCASTS, JSON.stringify(SEED_BROADCASTS));
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(SEED_LOGS));
    localStorage.removeItem(STORAGE_KEYS.DISMISSED);
    window.dispatchEvent(new CustomEvent('clinipulse_broadcast_update'));
    return SEED_BROADCASTS;
  },
};

