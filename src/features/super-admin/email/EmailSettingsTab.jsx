import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import {
  Save,
  RotateCcw,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { DEFAULT_EMAIL_SETTINGS } from '../../../services/emailNotificationService';

export function EmailSettingsTab({
  settings,
  onSaveSettings,
  onResetDemoData
}) {
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset email templates, triggers, campaigns, and settings back to original demonstration data?')) {
      onResetDemoData();
      setFormData({ ...DEFAULT_EMAIL_SETTINGS });
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Simulation Engine Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-bold text-sm">
            Frontend Prototype Delivery Environment
          </span>
        </div>
        <p className="leading-relaxed text-amber-900">
          This system is an interactive healthcare SaaS prototype. Real SMTP credentials, mailgun/sendgrid API keys, and third-party transport servers are deliberately not collected or stored in this frontend. All delivery events, delays, and responses are simulated for interface demonstration purposes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Sender Identity */}
        <Card className="p-5 border-slate-200/90 space-y-4 shadow-2xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Sender Identity & Header Defaults
            </h3>
            <p className="text-xs text-slate-500">
              Configure the default "From" and "Reply-To" fields populated across automated clinical notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Sender Display Name
              </label>
              <input
                type="text"
                required
                value={formData.senderDisplayName}
                onChange={(e) => setFormData({ ...formData, senderDisplayName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Sender Email Address
              </label>
              <input
                type="email"
                required
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Reply-To Email Address
              </label>
              <input
                type="email"
                required
                value={formData.replyToEmail}
                onChange={(e) => setFormData({ ...formData, replyToEmail: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Test Simulation Recipient
              </label>
              <input
                type="email"
                required
                value={formData.testRecipientEmail}
                onChange={(e) => setFormData({ ...formData, testRecipientEmail: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>
          </div>
        </Card>

        {/* Corporate Branding Defaults */}
        <Card className="p-5 border-slate-200/90 space-y-4 shadow-2xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Corporate Branding & Legal Footers
            </h3>
            <p className="text-xs text-slate-500">
              Default metadata injected into template variables for compliance and clinical trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Platform Company Name
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Customer Support Email
              </label>
              <input
                type="email"
                required
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Default Email Compliance Footer
            </label>
            <textarea
              rows={3}
              value={formData.defaultFooter}
              onChange={(e) => setFormData({ ...formData, defaultFooter: e.target.value })}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            />
          </div>
        </Card>

        {/* Simulation Preferences */}
        <Card className="p-5 border-slate-200/90 space-y-4 shadow-2xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Simulation Engine Controls
            </h3>
            <p className="text-xs text-slate-500">
              Test failure cases and error recovery workflows in this prototype.
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.enableSimulatedFailures}
                onChange={(e) => setFormData({ ...formData, enableSimulatedFailures: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
              />
              <div>
                <span className="font-bold text-slate-800 text-xs block">
                  Enable Intermittent Simulated Delivery Failures (10-20% chance)
                </span>
                <span className="text-slate-500 text-[11px]">
                  Allows QA teams to test retry simulations, error badges, and failure alerts in the Activity Logs.
                </span>
              </div>
            </label>
          </div>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={handleReset}
            className="text-rose-600 hover:bg-rose-50"
          >
            Reset All Email Demo Data
          </Button>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Settings Saved!
              </span>
            )}
            <Button variant="primary" size="sm" type="submit" icon={Save}>
              Save Email Settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
