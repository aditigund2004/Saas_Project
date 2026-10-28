import React, { useState, useMemo } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import {
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Monitor,
  Smartphone,
  Eye,
  Check,
  Stethoscope,
  Palette,
  Send,
  Building2,
  Mail,
  User,
  Sparkles
} from 'lucide-react';
import { emailService } from '../../../services/emailNotificationService';
import { EMAIL_THEMES, DOCTOR_PRESETS } from './emailThemes';


export function EmailEventSimulatorModal({
  isOpen,
  onClose,
  initialEventKey = '',
  triggers = [],
  clinics = [],
  onSimulationComplete
}) {
  const [selectedEventKey, setSelectedEventKey] = useState(
    initialEventKey || triggers[0]?.eventKey || 'doctor.invited'

  );

  const [selectedClinicId, setSelectedClinicId] = useState(
    clinics[0]?.id || 'clinic-citycare'
  );

  const [selectedThemeId, setSelectedThemeId] = useState('clinical_blue');
  const [previewViewMode, setPreviewViewMode] = useState('desktop'); // 'desktop' | 'mobile'

  const [customRecipientName, setCustomRecipientName] = useState('Dr. Rohan Deshmukh');
  const [customRecipientEmail, setCustomRecipientEmail] = useState('dr.rohan@citycare.demo');

  const [customPlanName, setCustomPlanName] = useState('Professional Multi-Specialty');
  const [customAmount, setCustomAmount] = useState('₹69,990');
  const [simulationResult, setSimulationResult] = useState(null);

  const selectedClinic = useMemo(() => {
    return clinics.find((c) => c.id === selectedClinicId) || clinics[0] || {
      id: 'clinic-citycare',
      name: 'CityCare Family Clinic',
      ownerName: 'Dr. Aarav Mehta',
      email: 'care@citycare.demo'
    };
  }, [clinics, selectedClinicId]);

  const activeTrigger = triggers.find((t) => t.eventKey === selectedEventKey) || triggers[0];
  const selectedTheme = EMAIL_THEMES.find((th) => th.id === selectedThemeId) || EMAIL_THEMES[0];

  // Quick preset selection
  const handleSelectDoctorPreset = (doc) => {
    setCustomRecipientName(doc.name);
    setCustomRecipientEmail(doc.email);
    if (doc.clinicId) {
      setSelectedClinicId(doc.clinicId);
    }
    // Switch to doctor.invited trigger if not already on a doctor event
    if (!selectedEventKey.startsWith('doctor.')) {
      setSelectedEventKey('doctor.invited');
    }
    setSimulationResult(null);
  };

  // Execute Simulation

  const handleExecute = () => {
    const res = emailService.simulateEventTrigger(selectedEventKey, {
      clinicName: selectedClinic?.name || 'CityCare Family Clinic',
      clinicId: selectedClinic?.id || 'clinic-citycare',
      recipientName: customRecipientName || selectedClinic?.ownerName || 'Dr. Rohan Deshmukh',
      recipientEmail: customRecipientEmail || selectedClinic?.email || 'dr.rohan@citycare.demo',
      planName: customPlanName,
      amount: customAmount,
      themeId: selectedTheme.id,
      themeName: selectedTheme.name

    });

    setSimulationResult(res);
    if (onSimulationComplete) {
      onSimulationComplete(res);
    }
  };

  // Dynamically computed preview values
  const previewData = useMemo(() => {
    const docName = customRecipientName || 'Dr. Rohan Deshmukh';
    const cName = selectedClinic?.name || 'CityCare Family Clinic';

    let subjectLine = '';
    let headline = '';
    let subheadline = '';
    let mainMessage = '';
    let calloutTitle = '';
    let calloutItems = [];
    let ctaLabel = 'Access Practice Cockpit';

    if (selectedEventKey === 'doctor.invited') {
      subjectLine = `Invitation to Join ${cName} Medical Staff on ClinicOS`;
      headline = 'Doctor Staff Invitation';
      subheadline = `Consulting Panel Appointment • ${cName}`;
      mainMessage = `You have been officially invited by the medical administration at ${cName} to join the consulting physician panel on ClinicOS. Through your secure doctor portal, you can access your real-time OPD queues, define weekly appointment slots, and issue tamper-evident prescriptions.`;
      calloutTitle = 'Doctor Onboarding Checklist & Next Steps:';
      calloutItems = [
        'Activate your clinical profile and upload digital signature for e-prescriptions',
        'Configure your morning/evening OPD consultation slots and consultation fees',
        'Access patient digital health records and previous consultation histories'
      ];
      ctaLabel = 'Accept Invitation & Set Up Profile →';
    } else if (selectedEventKey === 'hospital.welcome') {
      subjectLine = `Welcome to ClinicOS, ${cName}! Getting Started Guide`;
      headline = 'Welcome to ClinicOS!';
      subheadline = 'Modern Operating System for Healthcare Clinics';
      mainMessage = `We are delighted to partner with ${cName} to streamline your outpatient operations, doctor appointment schedules, and electronic patient records. Your practice cockpit is ready for full-scale operations.`;
      calloutTitle = 'Immediate Steps to Launch:';
      calloutItems = [
        'Add doctor profiles and clinical specialties to your rota',
        'Set up front-desk receptionist & accounts operator credentials',
        'Configure automated WhatsApp appointment confirmations & QR prescriptions'
      ];
      ctaLabel = 'Launch Practice Cockpit →';
    } else if (selectedEventKey === 'hospital.activated') {
      subjectLine = `Account Verified: ${cName} is Live on ClinicOS`;
      headline = 'Practice Credentials Verified';
      subheadline = 'Compliance Check Complete • Facility Active';
      mainMessage = `Good news! Your healthcare facility ${cName} has successfully cleared platform compliance and registration verification. All clinical modules, billing engines, and doctor queues are fully unlocked.`;
      calloutTitle = 'Active Modules & Capabilities:';
      calloutItems = [
        'Unlimited electronic health records & patient files',
        'Integrated pharmacy & OPD bill generation',
        'Multi-doctor slot allocation & real-time scheduling'
      ];
      ctaLabel = 'Open Verified Workspace →';
    } else if (selectedEventKey === 'subscription.activated') {
      subjectLine = `Subscription Confirmed: ${customPlanName} for ${cName}`;
      headline = 'Subscription Activated';
      subheadline = `Plan: ${customPlanName} • Payment Confirmed`;
      mainMessage = `Your subscription for ${cName} has been processed successfully. Your medical staff can now utilize all features included under the ${customPlanName} tier with zero interruption.`;
      calloutTitle = 'Subscription Summary:';
      calloutItems = [
        `Selected Tier: ${customPlanName}`,
        `Billed Amount: ${customAmount}`,
        'Includes priority support and continuous automated cloud backups'
      ];
      ctaLabel = 'View Invoices & Billing Details →';
    } else if (selectedEventKey === 'payment.failed') {
      subjectLine = `Urgent: Payment Failed for ${cName} (${customPlanName})`;
      headline = 'Payment Processing Notice';
      subheadline = 'Action Required • Grace Period Active';
      mainMessage = `Your recent recurring billing charge of ${customAmount} for ${cName} could not be completed by your financial institution. Please update your payment mandate within 3 business days to prevent disruption to doctor calendars.`;
      calloutTitle = 'Account Status Notice:';
      calloutItems = [
        'Doctor schedules and patient booking remain active during grace period',
        'Update credit card or bank auto-debit authorization to avoid interruption',
        'Instant receipt will be issued once transaction clears successfully'
      ];
      ctaLabel = 'Update Payment Method Now →';
    } else {
      // Generic / Other events
      subjectLine = `ClinicOS Notification: ${activeTrigger?.name || 'Automated Update'} for ${cName}`;
      headline = activeTrigger?.name || 'Platform Notification';
      subheadline = `Operational Update • ${cName}`;
      mainMessage = `This is an automated operational notification dispatched from the ClinicOS platform regarding your facility at ${cName}.`;
      calloutTitle = 'Event Details:';
      calloutItems = [
        `Trigger: ${selectedEventKey}`,
        `Target Facility: ${cName}`,
        `Recipient: ${docName}`
      ];
      ctaLabel = 'View Platform Dashboard →';
    }

    return {
      subjectLine,
      headline,
      subheadline,
      mainMessage,
      calloutTitle,
      calloutItems,
      ctaLabel,
      recipientName: docName,
      recipientEmail: customRecipientEmail || 'dr.rohan@citycare.demo',
      clinicName: cName
    };
  }, [selectedEventKey, selectedClinic, customRecipientName, customRecipientEmail, customPlanName, customAmount, activeTrigger]);


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Event-Based Email Automation Simulator & Doctor Mail Hub"
      size="full"
    >
      <div className="text-xs">
        {/* Top Info Banner */}
        <div className="mb-4 p-3 bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl flex items-center justify-between gap-3 text-blue-900 dark:text-blue-200">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="leading-snug">
              <span className="font-bold text-slate-900 dark:text-white">Super Admin Doctor Dispatch & Automation Test Bench:</span> Select any email theme design to see how the doctor will view the message in real time, then simulate dispatch with live logging.
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-mono text-[11px] font-bold shrink-0">
            <Palette className="w-3 h-3" />
            {EMAIL_THEMES.length} Themes Available
          </span>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Controls, Doctor Picker, Theme Selector */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Doctor Preset Bar */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Quick Doctor Presets
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Click to load recipient</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {DOCTOR_PRESETS.map((doc) => {
                  const isSelected = customRecipientName === doc.name;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => handleSelectDoctorPreset(doc)}
                      className={`p-2 rounded-lg text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-blue-100/80 dark:bg-blue-950/60 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-blue-200 font-semibold shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="truncate font-bold text-xs">{doc.name}</div>
                      <div className="truncate text-[10px] text-slate-500 dark:text-slate-400">{doc.specialty}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Event Trigger Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Select Business Event Trigger
              </label>
              <select
                value={selectedEventKey}
                onChange={(e) => {
                  setSelectedEventKey(e.target.value);
                  setSimulationResult(null);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              >
                <optgroup label="Doctor & Staff Events">
                  <option value="doctor.invited">doctor.invited — New Doctor Invitation</option>
                  <option value="staff.invited">staff.invited — Reception / Staff Invited</option>
                </optgroup>
                <optgroup label="Hospital Onboarding">
                  <option value="hospital.welcome">hospital.welcome — Hospital Welcome & Setup</option>
                  <option value="hospital.activated">hospital.activated — Hospital Account Verified</option>
                  <option value="onboarding.completed">onboarding.completed — Onboarding Completed</option>
                </optgroup>
                <optgroup label="Subscription & Billing">
                  <option value="subscription.activated">subscription.activated — Subscription Activated</option>
                  <option value="subscription.upgraded">subscription.upgraded — Subscription Upgraded</option>
                  <option value="payment.succeeded">payment.succeeded — Payment Succeeded</option>
                  <option value="payment.failed">payment.failed — Payment Failed Alert</option>
                  <option value="subscription.expiring">subscription.expiring — Plan Expiration Warning</option>
                </optgroup>
                <optgroup label="Other Platform Events">
                  {triggers
                    .filter(
                      (trg) =>
                        ![
                          'doctor.invited',
                          'staff.invited',
                          'hospital.welcome',
                          'hospital.activated',
                          'onboarding.completed',
                          'subscription.activated',
                          'subscription.upgraded',
                          'payment.succeeded',
                          'payment.failed',
                          'subscription.expiring'
                        ].includes(trg.eventKey)
                    )
                    .map((trg) => (
                      <option key={trg.eventKey} value={trg.eventKey}>
                        {trg.eventKey} — {trg.name}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            {/* THEME SELECTOR: Multi-theme selection options */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Select Email Theme Design
                </label>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                  {selectedTheme.name}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EMAIL_THEMES.map((th) => {
                  const isThemeActive = selectedThemeId === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setSelectedThemeId(th.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer group ${
                        isThemeActive
                          ? 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
                            style={{ backgroundColor: th.swatch }}
                          />
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              isThemeActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {th.tag}
                          </span>
                        </div>
                        {isThemeActive && (
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                          {th.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {th.isDark ? 'Dark Mode' : 'Light Canvas'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Hospital & Recipient Doctor Details */}
            <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Target Hospital / Clinic
                </label>
                <select
                  value={selectedClinicId}
                  onChange={(e) => {
                    setSelectedClinicId(e.target.value);
                    setSimulationResult(null);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {clinics.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.ownerName || 'Medical Director'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    Doctor / Recipient Name
                  </label>
                  <input
                    type="text"
                    value={customRecipientName}
                    onChange={(e) => setCustomRecipientName(e.target.value)}
                    placeholder="e.g. Dr. Rohan Deshmukh"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    Doctor Email Address
                  </label>
                  <input
                    type="email"
                    value={customRecipientEmail}
                    onChange={(e) => setCustomRecipientEmail(e.target.value)}
                    placeholder="e.g. dr.rohan@citycare.demo"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic parameters for billing events */}
              {selectedEventKey.includes('subscription') || selectedEventKey.includes('payment') ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={customPlanName}
                      onChange={(e) => setCustomPlanName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Billing Amount
                    </label>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Simulation Status / Result Box */}
            {simulationResult && (
              <div
                className={`p-3.5 rounded-xl border space-y-2 animate-fade-in ${
                  simulationResult.status === 'delivered'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200'
                    : simulationResult.status === 'skipped'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  {simulationResult.status === 'delivered' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {simulationResult.status === 'skipped' && (
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  )}
                  {simulationResult.status === 'failed' && (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                  <span>{simulationResult.message}</span>
                </div>

                {simulationResult.log && (
                  <div className="p-2.5 bg-white/95 dark:bg-slate-900/95 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white truncate">
                      {simulationResult.log.subject}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400">
                      <span>
                        Recipient: <strong className="text-slate-700 dark:text-slate-300">{simulationResult.log.recipientEmail}</strong>
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        Theme: {selectedTheme.name}
                      </span>
                      <span>•</span>
                      <span className="font-mono">Log ID: {simulationResult.log.id}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Left Column Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>

              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={handleExecute}
                className="shadow-sm"
              >
                Send Themed Email to Doctor
              </Button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Live Theme Template Preview */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-2.5">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between p-2.5 bg-slate-900 text-white rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold">
                  <Eye className="w-3 h-3 text-blue-400" />
                  Live Email Theme Preview
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Showing: <strong className="text-slate-200">{selectedTheme.name}</strong>
                </span>
              </div>

              {/* Viewport Mode: Desktop vs Mobile */}
              <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => setPreviewViewMode('desktop')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    previewViewMode === 'desktop'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewViewMode('mobile')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    previewViewMode === 'mobile'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Email Container Window */}
            <div className="bg-slate-950 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              {/* Mail Envelope Header */}
              <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/80 mb-3 text-[11px] space-y-1.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-[11px] text-slate-400 font-mono ml-2">Inbox &gt; Doctor Notification Dispatch</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Today, 10:45 AM</span>
                </div>

                <div className="grid grid-cols-1 gap-1 text-slate-300">
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 w-14 shrink-0 font-semibold">FROM:</span>
                    <span className="font-medium text-slate-200 truncate">
                      ClinicOS Platform Notifications &lt;notifications@clinicos.app&gt;
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 w-14 shrink-0 font-semibold">TO:</span>
                    <span className="font-semibold text-blue-400 truncate">
                      {previewData.recipientName} &lt;{previewData.recipientEmail}&gt;
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 w-14 shrink-0 font-semibold">SUBJECT:</span>
                    <span className="font-bold text-white truncate">
                      {previewData.subjectLine}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rendered Email Canvas (Themed) */}
              <div
                className={`transition-all duration-200 mx-auto ${
                  previewViewMode === 'mobile'
                    ? 'max-w-[340px] border-4 border-slate-700/80 rounded-[28px] p-2 bg-slate-900 shadow-2xl'
                    : 'w-full'
                }`}
              >
                {previewViewMode === 'mobile' && (
                  <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto mb-2" />
                )}

                {/* Email Body Card Styled in Selected Theme */}
                <div
                  className="rounded-xl overflow-hidden border shadow-lg transition-colors"
                  style={{
                    backgroundColor: selectedTheme.cardBg,
                    borderColor: selectedTheme.footerBorder
                  }}
                >
                  {/* Theme Header Banner */}
                  <div
                    className="p-5 text-center relative"
                    style={{
                      background: selectedTheme.headerGradient,
                      color: selectedTheme.headerText
                    }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white shadow-xs">
                        <Stethoscope className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-extrabold tracking-tight text-sm text-white">ClinicOS</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white ml-1">
                        Verified
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                      {previewData.headline}
                    </h2>
                    <p
                      className="text-xs font-medium"
                      style={{ color: selectedTheme.headerSubtext }}
                    >
                      {previewData.subheadline}
                    </p>
                  </div>

                  {/* Main Email Content */}
                  <div
                    className="p-5 sm:p-6 space-y-4 text-xs"
                    style={{ color: selectedTheme.cardText }}
                  >
                    {/* Doctor Salutation */}
                    <p className="text-sm font-bold">
                      Dear {previewData.recipientName},
                    </p>

                    {/* Main Narrative Paragraph */}
                    <p className="leading-relaxed opacity-90">
                      {previewData.mainMessage}
                    </p>

                    {/* Theme-Styled Callout Box */}
                    <div
                      className="p-3.5 rounded-lg border-l-4 space-y-2 transition-colors"
                      style={{
                        backgroundColor: selectedTheme.calloutBg,
                        borderLeftColor: selectedTheme.calloutBorder
                      }}
                    >
                      <div
                        className="font-bold text-xs flex items-center gap-1.5"
                        style={{ color: selectedTheme.calloutTitle }}
                      >
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        {previewData.calloutTitle}
                      </div>

                      <ul className="space-y-1.5 pl-1.5 text-[11px]" style={{ color: selectedTheme.calloutText }}>
                        {previewData.calloutItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: selectedTheme.swatch }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Theme-Styled Primary CTA Button */}
                    <div className="pt-2 pb-1 text-center">
                      <button
                        type="button"
                        className="inline-block px-5 py-2.5 rounded-lg font-bold text-xs tracking-wide transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-md"
                        style={{
                          backgroundColor: selectedTheme.btnBg,
                          color: selectedTheme.btnText,
                          boxShadow: selectedTheme.btnShadow
                        }}
                      >
                        {previewData.ctaLabel}
                      </button>
                    </div>

                    <p className="text-center text-[10px] opacity-70">
                      Security Notice: This link is cryptographically signed and valid for 48 hours.
                    </p>

                    {/* Theme Footer Bar */}
                    <div
                      className="pt-4 border-t text-[10px] space-y-1 text-center leading-normal"
                      style={{
                        borderColor: selectedTheme.footerBorder,
                        color: selectedTheme.footerText
                      }}
                    >
                      <div>
                        <strong>{previewData.clinicName}</strong> • Powered by ClinicOS Healthcare SaaS
                      </div>
                      <div>
                        HIPAA &amp; NABH Verified Healthcare Communications • End-to-End Encrypted
                      </div>
                      <div className="pt-1 text-[9px] opacity-60">
                        Theme applied: <span className="font-semibold">{selectedTheme.name}</span> ({selectedTheme.tag})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
}

