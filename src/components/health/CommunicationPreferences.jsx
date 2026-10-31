import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Bell,
  Mail,
  MessageSquare,
  Phone,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Eye,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function CommunicationPreferences() {
  const { isPatientFriendlyMode, togglePatientFriendlyMode, showToast, currentUser } = useApp();

  const [primaryChannel, setPrimaryChannel] = useState('whatsapp'); // 'whatsapp' | 'sms' | 'email'
  const [preferredLang, setPreferredLang] = useState('English');
  const [reminderTiming, setReminderTiming] = useState('24h');
  const [allowPromotions, setAllowPromotions] = useState(false);
  const [previewTab, setPreviewTab] = useState('whatsapp');

  const handleSave = () => {
    showToast('Communication preferences saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Patient Notification Settings
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Communication Preference Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize how and when you receive appointment confirmations, doctor reminders, and digital prescription links.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Settings Panel */}
        <div className="lg:col-span-7 space-y-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Primary Channel */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Preferred Notification Channel
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, sub: 'Recommended' },
                { id: 'sms', label: 'SMS Text', icon: Smartphone, sub: 'Instant' },
                { id: 'email', label: 'Email', icon: Mail, sub: 'Official PDFs' }
              ].map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setPrimaryChannel(ch.id);
                    setPreviewTab(ch.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    primaryChannel === ch.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
                  }`}
                >
                  <ch.icon className="w-4 h-4 mb-1" />
                  <div className="font-extrabold text-xs block">{ch.label}</div>
                  <span
                    className={`text-[10px] ${
                      primaryChannel === ch.id ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {ch.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Preference */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Communication Language
            </label>
            <select
              value={preferredLang}
              onChange={(e) => setPreferredLang(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="English">English</option>
            </select>
          </div>

          {/* Reminder Timing */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Appointment Reminder Timing
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              {[
                { id: '2h', label: '2 Hours Before' },
                { id: '24h', label: '24 Hours Before' },
                { id: '48h', label: '2 Days Before' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setReminderTiming(t.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    reminderTiming === t.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Toggle: Patient-Friendly Mode */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-extrabold text-xs text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-600" /> Patient-Friendly Accessible Mode
              </span>
              <p className="text-[11px] text-blue-700 dark:text-blue-300">
                Increases typography size, tap targets, and simplifies medical jargon across your portal.
              </p>
            </div>
            <button
              type="button"
              onClick={togglePatientFriendlyMode}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                isPatientFriendlyMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
                  isPatientFriendlyMode ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="md" onClick={handleSave} className="font-bold">
              Save Preferences
            </Button>
          </div>
        </div>

        {/* Right Live Simulation Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Preview Generator
            </span>
            <div className="flex gap-1">
              {['whatsapp', 'sms', 'email'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPreviewTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                    previewTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Smartphone Simulator */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-xl border-4 border-slate-800 relative">
            <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

            {previewTab === 'whatsapp' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs text-emerald-400 font-bold">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  CityCare Family Clinic (Official WhatsApp Verified)
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-100 text-xs leading-relaxed space-y-2">
                  <p>
                    👋 Hello <strong>{currentUser?.name || 'Aarav Patel'}</strong>,
                  </p>
                  <p>
                    This is your appointment reminder for <strong>Tomorrow at 10:30 AM</strong> with <strong>Dr. Aarav Mehta</strong> at CityCare Clinic (FC Road).
                  </p>
                  <div className="p-2 rounded-xl bg-black/30 border border-emerald-700/50 text-[11px] space-y-0.5">
                    <div>📍 Location: FC Road Main Clinic</div>
                    <div>🎫 Token Assigned: #12</div>
                    <div>📝 Pre-visit brief: Received ✓</div>
                  </div>
                  <p className="text-[10px] text-emerald-300 pt-1">
                    Reply "1" to Confirm or "2" to Reschedule.
                  </p>
                </div>
              </div>
            )}

            {previewTab === 'sms' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 font-bold pb-2 border-b border-slate-800">
                  SMS · +91 98765 43210
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800 text-slate-100 text-xs leading-relaxed space-y-2">
                  <p>
                    [CityCare Clinic] Reminder: Consultation with Dr. Aarav Mehta scheduled on 27-Oct at 10:30 AM. Token #12. Please arrive 10m prior. Track live queue at https://clinicos.health/w/apt-101
                  </p>
                </div>
              </div>
            )}

            {previewTab === 'email' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 font-bold pb-2 border-b border-slate-800">
                  Email Subject: Appointment Confirmation & Visit Brief
                </div>
                <div className="p-4 rounded-2xl bg-white text-slate-900 text-xs space-y-2">
                  <h4 className="font-extrabold text-blue-600 text-sm">
                    CityCare Family Practice
                  </h4>
                  <p>Dear {currentUser?.name || 'Aarav Patel'},</p>
                  <p className="text-slate-600 text-[11px]">
                    Your appointment with Dr. Aarav Mehta has been confirmed for 27-Oct-2026 at 10:30 AM. Your digital pre-visit brief is attached for the doctor's review.
                  </p>
                  <div className="p-2 rounded-lg bg-slate-100 text-[10px] font-mono">
                    Attached: Visit_Brief_AaravPatel.pdf (184 KB)
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800 text-[9px] text-slate-500 text-center">
              Simulated message rendering. No real SMS or email is dispatched.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

