import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useApp } from '../../context/AppContext';
import {
  Save,
  ShieldCheck,
  Globe,
  Building2,
  MessageSquare,
  RotateCcw,
  CheckCircle2,
  Activity,
  Lock
} from 'lucide-react';

const DEFAULT_PLATFORM_CONFIG = {
  // General & Branding
  platformName: 'ClinicOS SaaS Cloud',
  tagline: 'Enterprise Hospital & Multi-Specialty Clinic Operating System',
  supportEmail: 'support@clinicos.health',
  supportPhone: '+91 800-456-7890',
  portalUrl: 'https://app.clinicos.health',
  primaryTimezone: 'Asia/Kolkata (IST +05:30)',
  billingCurrency: 'INR (₹)',

  // Tenant Defaults & Subscriptions
  trialDurationDays: 14,
  gracePeriodDays: 7,
  autoProvisionSandboxClinic: true,
  allowGuestBookingByDefault: true,
  enableMultiBranchByDefault: true,
  maxDoctorsDefault: 3,

  // Gateways & Health Protocols
  enableWhatsAppPreview: true,
  whatsAppSenderNumber: '+91 98765 43210',
  enableQrVerification: true,
  enableAbdmSimulator: true,
  smsGatewayProvider: 'AWS SNS / DLT Verified (India)',
  emailSmtpHost: 'smtp.sendgrid.net (TLS 587)',

  // Security & Compliance
  require2FAForAdmins: false,
  sessionTimeoutMinutes: 30,
  auditLogRetentionDays: 90,
  maskPatientPhiInLogs: true,
  maintenanceMode: false
};

const TABS = [
  { id: 'general', label: 'General & Branding', icon: Globe },
  { id: 'tenants', label: 'Tenancy & Trials', icon: Building2 },
  { id: 'gateways', label: 'Gateways & Protocols', icon: MessageSquare },
  { id: 'security', label: 'Security & Governance', icon: ShieldCheck }
];

export function PlatformSettingsPage() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('general');

  const [platformConfig, setPlatformConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('clinipulse_platform_settings');
      if (saved) {
        return { ...DEFAULT_PLATFORM_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // fallback to defaults
    }
    return DEFAULT_PLATFORM_CONFIG;
  });

  const [lastSavedTime, setLastSavedTime] = useState(() => {
    return localStorage.getItem('clinipulse_platform_settings_last_saved') || 'Today at 09:30 AM';
  });

  const handleSave = (e) => {
    e?.preventDefault();
    try {
      localStorage.setItem('clinipulse_platform_settings', JSON.stringify(platformConfig));
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const timeStr = `Today at ${now}`;
      localStorage.setItem('clinipulse_platform_settings_last_saved', timeStr);
      setLastSavedTime(timeStr);
      showToast('Platform master configuration saved successfully.', 'success');
    } catch {
      showToast('Failed to save settings to browser storage.', 'error');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to restore factory default configuration settings?')) {
      setPlatformConfig(DEFAULT_PLATFORM_CONFIG);
      localStorage.setItem('clinipulse_platform_settings', JSON.stringify(DEFAULT_PLATFORM_CONFIG));
      showToast('Platform settings reset to default configurations.', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              System Configuration & Control
            </span>
            <Badge variant="Active" className="text-[11px] font-bold">
              v2.4.0 Production
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Platform Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure global platform parameters, multi-tenant trial policies, communication gateways, and security controls.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={handleResetDefaults}
            className="text-slate-600 dark:text-slate-300"
          >
            Reset Defaults
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={handleSave}
            className="shadow-xs font-semibold"
          >
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Observability Quick Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gateway State</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">All Nodes Active</span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trial Standard</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{platformConfig.trialDurationDays} Days Default</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">Free Tier</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Zero-Trust Logs</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{platformConfig.auditLogRetentionDays} Days Stored</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">SHA-256</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Sync</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{lastSavedTime}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Synced</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General & Branding */}
      {activeTab === 'general' && (
        <Card className="border-slate-200/90 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader
            title="Global Platform Brand & Identity"
            subtitle="Core operational parameters and default portal endpoints"
          />
          <CardContent className="space-y-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Platform Brand Name
                  </label>
                  <input
                    type="text"
                    value={platformConfig.platformName}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, platformName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Global Support Email
                  </label>
                  <input
                    type="email"
                    value={platformConfig.supportEmail}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, supportEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Toll-Free Helpdesk Hotline
                  </label>
                  <input
                    type="text"
                    value={platformConfig.supportPhone}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, supportPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Master Portal Public URL
                  </label>
                  <input
                    type="url"
                    value={platformConfig.portalUrl}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, portalUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Default Platform Currency
                  </label>
                  <input
                    type="text"
                    value={platformConfig.billingCurrency}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Platform Tagline / Marketing Banner
                  </label>
                  <input
                    type="text"
                    value={platformConfig.tagline}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={Save}>
                  Save General Settings
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Tenancy & Trials */}
      {activeTab === 'tenants' && (
        <Card className="border-slate-200/90 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader
            title="Multi-Tenant Defaults & Trial Management"
            subtitle="Policies for new organization signups, grace periods, and license quotas"
          />
          <CardContent className="space-y-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Free Trial Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={platformConfig.trialDurationDays}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, trialDurationDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Default trial length granted on registration</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Invoice Grace Period (Days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={platformConfig.gracePeriodDays}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, gracePeriodDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Days before tenant suspension on overdue payment</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Default Doctor Quota on Trial
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={platformConfig.maxDoctorsDefault}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, maxDoctorsDefault: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Included seats during 14-day trial period</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Organization Feature Flags
                </span>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.autoProvisionSandboxClinic}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, autoProvisionSandboxClinic: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      Auto-Provision Demo Clinic Data on Registration
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Populates newly registered clinics with sample patient records, sample queues, and starter prescriptions for immediate evaluation.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.allowGuestBookingByDefault}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, allowGuestBookingByDefault: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      Allow Public Patient Discovery & Self-Service Booking
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Enables the public clinic booking page for all clinics without requiring patient accounts to be pre-created.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.enableMultiBranchByDefault}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, enableMultiBranchByDefault: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      Enable Multi-Branch Facility Switching
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Permits clinics with secondary facilities to toggle between branch operations within the top navigation bar.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={Save}>
                  Save Tenancy Policies
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Gateways & Protocols */}
      {activeTab === 'gateways' && (
        <Card className="border-slate-200/90 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader
            title="Healthcare Communication & Compliance Gateways"
            subtitle="Configure WhatsApp Webhooks, ABDM Sandboxes, and Digital Rx QR Hashes"
          />
          <CardContent className="space-y-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    WhatsApp Business API Outbound Sender ID
                  </label>
                  <input
                    type="text"
                    value={platformConfig.whatsAppSenderNumber}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, whatsAppSenderNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Transactional SMS Provider (DLT Compliant)
                  </label>
                  <input
                    type="text"
                    value={platformConfig.smsGatewayProvider}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, smsGatewayProvider: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Active Health Gateway Services
                </span>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.enableWhatsAppPreview}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, enableWhatsAppPreview: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      Enable Live WhatsApp Business Dispatch & Simulation Drawer
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Allows clinic staff to test instant WhatsApp appointment notifications, PDF Rx links, and payment reminders.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.enableQrVerification}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, enableQrVerification: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      Generate Public QR Authenticity Verification on Digital Prescriptions
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Embeds a cryptographically signed QR code onto patient Rx printouts to prevent prescription tampering and counterfeiting.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.enableAbdmSimulator}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, enableAbdmSimulator: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      ABDM / Ayushman Bharat Digital Mission (Milestone 1, 2 & 3 Sandbox)
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Simulates ABHA Health ID generation, consent management gateway, and national health registry compliance checks.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={Save}>
                  Save Gateway Settings
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Security & Governance */}
      {activeTab === 'security' && (
        <Card className="border-slate-200/90 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader
            title="Platform Security, Audit Logging & Governance"
            subtitle="Access controls, session management, and sensitive medical data masking"
          />
          <CardContent className="space-y-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Session Inactivity Auto-Logout (Minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="240"
                    value={platformConfig.sessionTimeoutMinutes}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, sessionTimeoutMinutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Zero-Trust Audit Log Retention (Days)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="365"
                    value={platformConfig.auditLogRetentionDays}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, auditLogRetentionDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Compliance & Safeguards
                </span>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.maskPatientPhiInLogs}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, maskPatientPhiInLogs: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      Mask Patient PHI / PII in Administrative Activity Traces
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Automatically masks phone numbers, addresses, and diagnoses in superadmin activity feeds to comply with DISHA / HIPAA requirements.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.require2FAForAdmins}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, require2FAForAdmins: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      Enforce Mandatory Two-Factor Authentication (2FA) for Hospital Owners
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Requires TOTP authenticator code verification for all clinic administrator and billing manager accounts.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.maintenanceMode}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, maintenanceMode: e.target.checked })}
                    className="mt-0.5 rounded border-rose-300 dark:border-rose-700 text-rose-600 focus:ring-rose-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-rose-900 dark:text-rose-300 block">
                      Emergency Platform Maintenance Mode
                    </span>
                    <span className="text-xs text-rose-600 dark:text-rose-400 block mt-0.5">
                      Displays a read-only platform maintenance banner across all tenant dashboards during scheduled database upgrades.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={Save}>
                  Save Security Policies
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
