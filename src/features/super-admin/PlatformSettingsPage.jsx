import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Sparkles, ShieldCheck } from 'lucide-react';

export function PlatformSettingsPage() {
  const { showToast } = useApp();

  const [platformConfig, setPlatformConfig] = useState({
    platformName: 'CliniPulse Technologies',
    supportEmail: 'support@clinipulse.demo',
    trialDurationDays: 14,
    currencySymbol: '₹',
    enableWhatsAppPreview: true,
    enableQrVerification: true,
    allowGuestBookingByDefault: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform master configuration updated in demo memory.');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">System Configuration</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure global platform parameters, default 14-day trial duration, and communication gateways.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Global Parameters"
          subtitle="Settings applied across all multi-tenant organizations"
        />
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Platform Brand Name</label>
                <input
                  type="text"
                  value={platformConfig.platformName}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, platformName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Global Support Email</label>
                <input
                  type="email"
                  value={platformConfig.supportEmail}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, supportEmail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Default Free Trial Duration (Days)</label>
                <input
                  type="number"
                  value={platformConfig.trialDurationDays}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, trialDurationDays: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Billing Currency</label>
                <input
                  type="text"
                  value="INR (₹)"
                  disabled
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider">Features & Gateways</span>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.enableWhatsAppPreview}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enableWhatsAppPreview: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Enable WhatsApp Business Platform simulation drawer on all clinic accounts</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.enableQrVerification}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, enableQrVerification: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Generate public QR verification hashes on digital PDF prescriptions</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformConfig.allowGuestBookingByDefault}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, allowGuestBookingByDefault: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Allow public patient discovery and guest booking without registration</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100">
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

