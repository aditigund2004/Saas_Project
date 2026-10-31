import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Sparkles, ShieldCheck } from 'lucide-react';

export function PlatformSettingsPage() {
  const { showToast } = useApp();

  const [platformConfig, setPlatformConfig] = useState({
    platformName: 'ClinicOS SaaS Cloud',
    supportEmail: 'support@clinicos.health',
    trialDurationDays: 14,
    currencySymbol: '₹',
    enableWhatsAppPreview: true,
    enableQrVerification: true,
    allowGuestBookingByDefault: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform master configuration updated in demo memory.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">System Configuration</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Platform Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure global platform parameters, default 14-day trial duration, and communication gateways.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <CardHeader
          title="Global Parameters"
          subtitle="Settings applied across all multi-tenant organizations"
        />
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Platform Brand Name</label>
                <input
                  type="text"
                  value={platformConfig.platformName}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, platformName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Global Support Email</label>
                <input
                  type="email"
                  value={platformConfig.supportEmail}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, supportEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Default Free Trial Duration (Days)</label>
                <input
                  type="number"
                  value={platformConfig.trialDurationDays}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, trialDurationDays: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Billing Currency</label>
                <input
                  type="text"
                  value="INR (₹)"
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Features & Gateways</span>

              <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.enableWhatsAppPreview}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enableWhatsAppPreview: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Enable WhatsApp Business Platform simulation drawer on all clinic accounts</span>
              </label>

              <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.enableQrVerification}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enableQrVerification: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Generate public QR verification hashes on digital PDF prescriptions</span>
              </label>

              <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.allowGuestBookingByDefault}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, allowGuestBookingByDefault: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Allow public patient discovery and guest booking without registration</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="primary" size="md" type="submit" icon={Save}>
                Save Platform Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
