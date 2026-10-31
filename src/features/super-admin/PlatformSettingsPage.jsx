import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Save,
  ShieldCheck,
  Smartphone,
  Mail,
  Sliders,
  Server,
  Lock,
  Globe,
  RotateCcw,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Key
} from 'lucide-react';

export function PlatformSettingsPage() {
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const [platformConfig, setPlatformConfig] = useState(() => {
    const defaults = {
      platformName: 'ClinicOS SaaS Cloud',
      companyLegalName: 'ClinicOS Healthcare Technologies Pvt Ltd',
      supportEmail: 'support@clinicos.health',
      supportPhone: '+91 98765 43210',
      trialDurationDays: 14,
      currencySymbol: '₹',
      currencyCode: 'INR',
      timezone: 'Asia/Kolkata (IST +05:30)',
      // Security
      enforceMfa: true,
      sessionTimeoutMinutes: 60,
      maxLoginAttempts: 5,
      enableQrVerification: true,
      strictTenantIsolation: true,
      auditRetentionYears: 3,
      // Gateways
      enableWhatsAppPreview: true,
      allowGuestBookingByDefault: true,
      smsGatewayProvider: 'Fast2SMS India (DLT Registered)',
      emailEngine: 'Amazon SES (ap-south-1)',
      autoProvisionSubdomains: true,
      // System & Maintenance
      maintenanceMode: false,
      maintenanceMessage: 'Platform is undergoing routine database maintenance. Services will resume shortly.',
      enableAbhaSandbox: true,
      backupFrequencyHours: 6
    };

    try {
      const saved = localStorage.getItem('clinicos_platform_config');
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch (err) {
      console.error('Failed to load platform settings from localStorage:', err);
    }
    return defaults;
  });

  const handleSave = (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      try {
        localStorage.setItem('clinicos_platform_config', JSON.stringify(platformConfig));
      } catch (err) {
        console.error('Failed to save platform config:', err);
      }
      setIsSaving(false);
      showToast('Platform master configuration saved successfully.', 'success');
    }, 350);
  };

  const handleReset = () => {
    if (window.confirm('Reset all platform settings to original default values?')) {
      localStorage.removeItem('clinicos_platform_config');
      setPlatformConfig({
        platformName: 'ClinicOS SaaS Cloud',
        companyLegalName: 'ClinicOS Healthcare Technologies Pvt Ltd',
        supportEmail: 'support@clinicos.health',
        supportPhone: '+91 98765 43210',
        trialDurationDays: 14,
        currencySymbol: '₹',
        currencyCode: 'INR',
        timezone: 'Asia/Kolkata (IST +05:30)',
        enforceMfa: true,
        sessionTimeoutMinutes: 60,
        maxLoginAttempts: 5,
        enableQrVerification: true,
        strictTenantIsolation: true,
        auditRetentionYears: 3,
        enableWhatsAppPreview: true,
        allowGuestBookingByDefault: true,
        smsGatewayProvider: 'Fast2SMS India (DLT Registered)',
        emailEngine: 'Amazon SES (ap-south-1)',
        autoProvisionSubdomains: true,
        maintenanceMode: false,
        maintenanceMessage: 'Platform is undergoing routine database maintenance. Services will resume shortly.',
        enableAbhaSandbox: true,
        backupFrequencyHours: 6
      });
      showToast('Platform settings reset to defaults.', 'info');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              System Governance
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
              Master Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-blue-600 dark:text-blue-400 shrink-0" />
            Platform Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Configure multi-tenant global defaults, compliance thresholds, authentication rules, and communication gateway providers across all tenant clinics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-slate-600 dark:text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Defaults
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            <Save className="w-4 h-4 mr-1.5" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </Button>
        </div>
      </div>

      {/* Maintenance Mode Alert if enabled */}
      {platformConfig.maintenanceMode && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block">Platform Maintenance Mode is Active</span>
            <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
              {platformConfig.maintenanceMessage}
            </p>
          </div>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'general'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>General & Branding</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Authentication</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gateways')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'gateways'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Gateways & Communications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('system')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'system'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>System & Maintenance</span>
        </button>
      </div>

      {/* Tab 1: General & Branding */}
      {activeTab === 'general' && (
        <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
          <CardHeader
            title="Platform Identity & Tenant Defaults"
            subtitle="Global parameters applied across registered clinic organizations and public landing portals"
          />
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Platform Brand Name
                </label>
                <input
                  type="text"
                  value={platformConfig.platformName}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, platformName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. ClinicOS SaaS Cloud"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Displayed on platform headers and email titles</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Corporate / Legal Entity Name
                </label>
                <input
                  type="text"
                  value={platformConfig.companyLegalName}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, companyLegalName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Legal company entity"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Used in tax invoices and statutory agreements</span>
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
                  placeholder="support@clinicos.health"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Support Contact Phone
                </label>
                <input
                  type="text"
                  value={platformConfig.supportPhone}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, supportPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Default Free Trial Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={platformConfig.trialDurationDays}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, trialDurationDays: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">New self-serve tenant clinics receive this trial window</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary Platform Currency
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="INR (₹)"
                    disabled
                    className="w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-bold"
                  />
                  <input
                    type="text"
                    value={platformConfig.timezone}
                    disabled
                    className="w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono font-medium truncate"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save General Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Security & Authentication */}
      {activeTab === 'security' && (
        <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
          <CardHeader
            title="Access Security & Compliance Policies"
            subtitle="Enforce session lifetimes, staff credential verification, and data principal privacy standards"
          />
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Idle Session Timeout (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="480"
                  value={platformConfig.sessionTimeoutMinutes}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, sessionTimeoutMinutes: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Staff sessions expire after inactivity</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Max Consecutive Failed Login Attempts
                </label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={platformConfig.maxLoginAttempts}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, maxLoginAttempts: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Triggers temporary lockout and admin notification</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Security Enforcements
              </span>

              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.enforceMfa}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enforceMfa: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
                />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Enforce Multi-Factor Authentication (MFA / OTP) for All Clinic Staff
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Requires phone/email OTP verification when signing in from unrecognized browser sessions.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.enableQrVerification}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enableQrVerification: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
                />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Generate Public QR Verification Hashes on Digital PDF Prescriptions
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Enables tamper-proof verification of prescriptions via scannable QR code by pharmacies and labs.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.strictTenantIsolation}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, strictTenantIsolation: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
                />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Enforce Strict Multi-Tenant Data Isolation (Row-Level Security)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Prevents cross-tenant query contamination between clinic databases.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save Security Policies</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Gateways & Communications */}
      {activeTab === 'gateways' && (
        <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
          <CardHeader
            title="Communication Gateways & Dispatch Services"
            subtitle="Configure third-party adapters for WhatsApp Cloud API, transactional email, and patient messaging"
          />
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  SMS Gateway Integration Provider
                </label>
                <select
                  value={platformConfig.smsGatewayProvider}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, smsGatewayProvider: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Fast2SMS India (DLT Registered)">Fast2SMS India (DLT Registered)</option>
                  <option value="Gupshup Enterprise Messaging">Gupshup Enterprise Messaging</option>
                  <option value="Twilio Global SMS">Twilio Global SMS</option>
                  <option value="Msg91 Healthcare Gateway">Msg91 Healthcare Gateway</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">Default SMS engine for appointment reminders and OTPs</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Delivery Engine
                </label>
                <select
                  value={platformConfig.emailEngine}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, emailEngine: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Amazon SES (ap-south-1)">Amazon SES (Mumbai ap-south-1)</option>
                  <option value="SendGrid Marketing & Transactional">SendGrid Marketing & Transactional</option>
                  <option value="Postmark Transactional">Postmark Transactional</option>
                  <option value="Custom SMTP Relay">Custom Enterprise SMTP Relay</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">Configured with SPF, DKIM, and DMARC alignment</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Feature Toggles
              </span>

              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.enableWhatsAppPreview}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enableWhatsAppPreview: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
                />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Enable WhatsApp Business Platform Simulation on All Tenant Clinics
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Renders interactive WhatsApp modal drawers across reception and doctor appointment pages.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.allowGuestBookingByDefault}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, allowGuestBookingByDefault: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
                />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Allow Public Patient Discovery & Guest Booking Without Prior Account Registration
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Permits walk-in and online patients to request appointments without password sign-up.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.autoProvisionSubdomains}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, autoProvisionSubdomains: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
                />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Auto-Provision Tenant Subdomains (e.g. clinicname.clinicos.health)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Automatically maps white-label tenant domains on new clinic onboarding.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save Gateway Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: System & Maintenance */}
      {activeTab === 'system' && (
        <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
          <CardHeader
            title="System Maintenance & Operations Controls"
            subtitle="Platform operational state, automated snapshots, and simulated healthcare sandbox modes"
          />
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-900 dark:text-rose-200 text-sm block">
                    Platform Maintenance Mode
                  </span>
                  <span className="text-xs text-rose-700/80 dark:text-rose-300/80 block mt-0.5">
                    When active, tenant clinics will display a maintenance banner and non-admin operations are paused.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformConfig.maintenanceMode}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-rose-600"></div>
                </label>
              </div>

              {platformConfig.maintenanceMode && (
                <div>
                  <label className="block text-xs font-bold text-rose-900 dark:text-rose-200 mb-1">
                    Public Maintenance Advisory Notice
                  </label>
                  <textarea
                    rows={2}
                    value={platformConfig.maintenanceMessage}
                    onChange={(e) => setPlatformConfig({ ...platformConfig, maintenanceMessage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Automated Database Snapshot Frequency
                </label>
                <select
                  value={platformConfig.backupFrequencyHours}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, backupFrequencyHours: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value={4}>Every 4 Hours</option>
                  <option value={6}>Every 6 Hours (Recommended)</option>
                  <option value={12}>Every 12 Hours</option>
                  <option value={24}>Daily (24 Hours)</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">Encrypted cold snapshot dispatched to Backup Vault</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ABDM / ABHA Compliance Sandbox Engine
                </label>
                <select
                  value={platformConfig.enableAbhaSandbox ? 'enabled' : 'disabled'}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enableAbhaSandbox: e.target.value === 'enabled' })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="enabled">Active (Simulated Sandbox Bridge)</option>
                  <option value="disabled">Disabled (Strict Production Gateway)</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">Simulates Ayushman Bharat Digital Mission API responses</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save System Controls</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
