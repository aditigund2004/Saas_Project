import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Button } from '../../../components/ui/Button';
import {
  X,
  Save,
  Monitor,
  Smartphone,
  Code,
  FileText,
  Check,
  Send,
  Sparkles,
  Stethoscope,
  Palette,
  Eye,
  Building2,
  User,
  Mail,
  CheckCircle2,
  Tag,
  DollarSign
} from 'lucide-react';
import { emailService } from '../../../services/emailNotificationService';
import { EMAIL_THEMES } from './emailThemes';

const FALLBACK_CLINICS = [
  { id: 'clinic-citycare', name: 'CityCare Family Clinic', ownerName: 'Dr. Aarav Mehta, MBBS, MD', email: 'care@citycare.demo' },
  { id: 'clinic-metrohealth', name: 'MetroHealth Specialty Center', ownerName: 'Dr. Maya Sharma', email: 'dr.maya@metrohealth.demo' },
  { id: 'clinic-apex', name: 'Apex Child Care Hospital', ownerName: 'Dr. Arvind Rao', email: 'dr.arvind@apexchild.demo' }
];

export function EmailDualEditorPreviewModal({
  isOpen,
  onClose,
  template,
  sampleData = {},
  existingTemplates: _existingTemplates = [],
  triggers = [],
  clinics = [],
  onSave,
  onSendTest
}) {
  const activeClinics = clinics.length > 0 ? clinics : FALLBACK_CLINICS;

  // Selected Business Event Trigger
  const [selectedEventKey, setSelectedEventKey] = useState(
    () => template?.associatedTriggerKey || template?.key || triggers[0]?.eventKey || 'subscription.activated'
  );

  // Selected Email Theme Design
  const [selectedThemeId, setSelectedThemeId] = useState(
    () => sampleData?.themeId || localStorage.getItem('clinicos_selected_email_theme') || 'clinical_blue'
  );

  // Target Hospital / Clinic
  const [selectedClinicId, setSelectedClinicId] = useState(
    () => activeClinics[0]?.id || 'clinic-citycare'
  );

  // Doctor & Recipient Parameters
  const [customRecipientName, setCustomRecipientName] = useState(
    () => sampleData?.doctor_name || sampleData?.admin_name || sampleData?.recipientName || 'Dr. Rohan Deshmukh'
  );
  const [customRecipientEmail, setCustomRecipientEmail] = useState(
    () => sampleData?.recipientEmail || 'dr.rohan@citycare.demo'
  );

  // Plan & Billing Parameters
  const [customPlanName, setCustomPlanName] = useState(
    () => sampleData?.plan_name || 'Professional Multi-Specialty'
  );
  const [customAmount, setCustomAmount] = useState(
    () => sampleData?.payment_amount || '₹69,990'
  );

  // Subject line for editing existing email
  const [customSubject, setCustomSubject] = useState(
    () => template?.subject || ''
  );

  // Preview States
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [formatMode, setFormatMode] = useState('html'); // 'html' | 'text'
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  // Snapshot initial theme upon open to allow complete undo on dismissal
  const initialThemeRef = useRef(
    sampleData?.themeId ||
      (template?.key ? localStorage.getItem(`clinicos_email_theme_${template.key}`) : null) ||
      localStorage.getItem('clinicos_selected_email_theme') ||
      'clinical_blue'
  );

  // Dismiss and undo all unsaved changes: closes both popups together and reverts theme
  const handleDismissAndUndo = useCallback(() => {
    try {
      if (initialThemeRef.current) {
        localStorage.setItem('clinicos_selected_email_theme', initialThemeRef.current);
      }
    } catch {
      // ignore
    }
    onClose?.();
  }, [onClose]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) handleDismissAndUndo();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleDismissAndUndo]);

  const selectedClinic = useMemo(() => {
    return activeClinics.find((c) => c.id === selectedClinicId) || activeClinics[0] || {};
  }, [activeClinics, selectedClinicId]);

  const selectedTheme = useMemo(() => {
    return EMAIL_THEMES.find((th) => th.id === selectedThemeId) || EMAIL_THEMES[0];
  }, [selectedThemeId]);

  const activeTrigger = useMemo(() => {
    return triggers.find((t) => t.eventKey === selectedEventKey);
  }, [triggers, selectedEventKey]);

  // Compute live preview email data based on the left panel configuration
  const previewData = useMemo(() => {
    const cName = selectedClinic.name || 'CityCare Family Clinic';
    const docName = customRecipientName || 'Dr. Rohan Deshmukh';

    let defaultSubject = '';
    let headline = '';
    let subheadline = '';
    let mainMessage = '';
    let calloutTitle = '';
    let calloutItems = [];
    let ctaLabel = 'Access Practice Cockpit';

    if (selectedEventKey === 'doctor.invited') {
      defaultSubject = `Invitation to Join ${cName} Medical Staff on ClinicOS`;
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
      defaultSubject = `Welcome to ClinicOS, ${cName}! Getting Started Guide`;
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
      defaultSubject = `Account Verified: ${cName} is Live on ClinicOS`;
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
      defaultSubject = `Subscription Confirmed: ${customPlanName} for ${cName}`;
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
      defaultSubject = `Urgent: Payment Failed for ${cName} (${customPlanName})`;
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
      defaultSubject = `ClinicOS Notification: ${activeTrigger?.name || template?.name || 'Automated Update'} for ${cName}`;
      headline = activeTrigger?.name || template?.name || 'Platform Notification';
      subheadline = `${template?.category || 'Operational Update'} • ${cName}`;
      mainMessage = `This is an automated operational notification dispatched from the ClinicOS platform regarding your facility at ${cName}. All practice systems are functioning normally.`;
      calloutTitle = 'Event Details:';
      calloutItems = [
        `Trigger: ${selectedEventKey}`,
        `Target Facility: ${cName}`,
        `Recipient: ${docName}`
      ];
      ctaLabel = 'View Platform Dashboard →';
    }

    const finalSubject = customSubject.trim() || defaultSubject;

    return {
      subjectLine: finalSubject,
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
  }, [
    selectedEventKey,
    selectedClinic,
    customRecipientName,
    customRecipientEmail,
    customPlanName,
    customAmount,
    customSubject,
    activeTrigger,
    template
  ]);

  const settings = emailService.getSettings();

  if (!isOpen) return null;

  const handleSaveConfiguration = (e) => {
    e?.preventDefault();
    if (template) {
      const updatedTemplate = {
        ...template,
        subject: previewData.subjectLine,
        associatedTriggerKey: selectedEventKey,
        themeId: selectedThemeId,
        updatedAt: new Date().toISOString()
      };
      onSave?.(updatedTemplate);
      try {
        localStorage.setItem('clinicos_selected_email_theme', selectedThemeId);
        if (template.key) {
          localStorage.setItem(`clinicos_email_theme_${template.key}`, selectedThemeId);
        }
      } catch {
        // ignore
      }
      initialThemeRef.current = selectedThemeId;
    }
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 4000);
  };

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto cursor-pointer"
      role="dialog"
      aria-modal="true"
      onClick={handleDismissAndUndo}
    >
      {/* Solid Dimmed Backdrop */}
      <div
        className="fixed inset-0 w-full h-full min-h-dvh bg-slate-950/80 backdrop-blur-sm transition-opacity duration-150"
        aria-hidden="true"
      />

      {/* Dual Popup Container */}
      <div className="relative z-10 min-h-full flex items-center justify-center p-2 sm:p-4 md:p-6 cursor-pointer">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-5 w-full max-w-[1420px] 2xl:max-w-[1580px] pointer-events-none my-auto">
          
          {/* ========================================================= */}
          {/* POPUP 1 (LEFT): Email Configuration & Trigger Bench       */}
          {/* ========================================================= */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto w-full lg:w-1/2 flex flex-col rounded-2xl bg-slate-900 text-slate-100 border border-slate-700/80 shadow-2xl h-[88vh] max-h-[850px] overflow-hidden cursor-default transition-all"
          >
            {/* Left Header Bar (Pinned) */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 sm:px-6 py-3.5 bg-slate-950/90 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                      Edit Email: {template?.name || 'Email Template Dispatch'}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950/80 text-blue-300 border border-blue-800 uppercase tracking-wider">
                      Live Editor
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Customize business trigger, recipient, and theme design
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isSavedRecently && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800 animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Changes Saved
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleDismissAndUndo}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close both dialogs"
                  title="Close and discard changes"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left Scrollable Form Body */}
            <form onSubmit={handleSaveConfiguration} className="flex-1 min-h-0 flex flex-col">
              <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
                {/* 1. Select Business Event Trigger */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Select Business Event Trigger
                  </label>
                  <select
                    value={selectedEventKey}
                    onChange={(e) => {
                      setSelectedEventKey(e.target.value);
                      setIsSavedRecently(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono cursor-pointer"
                  >
                    <optgroup label="Subscription & Billing">
                      <option value="subscription.activated">subscription.activated – Subscription Activated</option>
                      <option value="subscription.upgraded">subscription.upgraded – Subscription Upgraded</option>
                      <option value="payment.succeeded">payment.succeeded – Payment Succeeded</option>
                      <option value="payment.failed">payment.failed – Payment Failed Alert</option>
                      <option value="subscription.expiring">subscription.expiring – Plan Expiration Warning</option>
                    </optgroup>
                    <optgroup label="Doctor & Staff Events">
                      <option value="doctor.invited">doctor.invited – New Doctor Staff Invitation</option>
                      <option value="staff.invited">staff.invited – Reception / Staff Invited</option>
                    </optgroup>
                    <optgroup label="Hospital Onboarding">
                      <option value="hospital.welcome">hospital.welcome – Hospital Welcome & Setup</option>
                      <option value="hospital.activated">hospital.activated – Hospital Account Verified</option>
                      <option value="onboarding.completed">onboarding.completed – Onboarding Completed</option>
                    </optgroup>
                    <optgroup label="Other Platform Triggers">
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
                            {trg.eventKey} – {trg.name}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

                {/* 2. Select Email Theme Design */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-blue-400" />
                      Select Email Theme Design
                    </label>
                    <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      Click theme to preview ➔
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {EMAIL_THEMES.map((th) => {
                      const isThemeActive = selectedThemeId === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => {
                            setSelectedThemeId(th.id);
                            setIsSavedRecently(false);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer group ${
                            isThemeActive
                              ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-950/40 shadow-xs'
                              : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs ring-1 ring-black/20"
                                style={{ backgroundColor: th.swatch }}
                              />
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                  isThemeActive
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {th.tag}
                              </span>
                            </div>
                            {isThemeActive && (
                              <Check className="w-3.5 h-3.5 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-white truncate">
                              {th.name}
                            </div>
                            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                              {th.isDark ? 'Dark Mode' : 'Light Canvas'}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Target Hospital & Recipient Details */}
                <div className="space-y-3 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      Target Hospital / Clinic
                    </label>
                    <select
                      value={selectedClinicId}
                      onChange={(e) => {
                        setSelectedClinicId(e.target.value);
                        setIsSavedRecently(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      {activeClinics.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.ownerName || 'Medical Director'})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Doctor / Recipient Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Doctor / Recipient Name
                      </label>
                      <input
                        type="text"
                        value={customRecipientName}
                        onChange={(e) => {
                          setCustomRecipientName(e.target.value);
                          setIsSavedRecently(false);
                        }}
                        placeholder="e.g. Dr. Rohan Deshmukh"
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        Doctor Email Address
                      </label>
                      <input
                        type="email"
                        value={customRecipientEmail}
                        onChange={(e) => {
                          setCustomRecipientEmail(e.target.value);
                          setIsSavedRecently(false);
                        }}
                        placeholder="e.g. dr.rohan@citycare.demo"
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* 5. Plan Name & Billing Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800/80">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        Plan Name
                      </label>
                      <input
                        type="text"
                        value={customPlanName}
                        onChange={(e) => {
                          setCustomPlanName(e.target.value);
                          setIsSavedRecently(false);
                        }}
                        placeholder="e.g. Professional Multi-Specialty"
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        Billing Amount
                      </label>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setIsSavedRecently(false);
                        }}
                        placeholder="e.g. ₹69,990"
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Email Subject Line */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Email Subject Line (for existing email)
                  </label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => {
                      setCustomSubject(e.target.value);
                      setIsSavedRecently(false);
                    }}
                    placeholder={`e.g. ${previewData.subjectLine}`}
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Leave blank to use auto-generated subject line from business trigger.
                  </p>
                </div>

              </div>

              {/* Left Footer Actions Bar (Pinned at Bottom) */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/90 shrink-0">
                <Button variant="outline" size="sm" type="button" onClick={handleDismissAndUndo}>
                  Cancel
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    icon={Save}
                    className="shadow-sm font-semibold"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* ========================================================= */}
          {/* POPUP 2 (RIGHT): Email Preview Popup (Exact Figure Layout) */}
          {/* ========================================================= */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto w-full lg:w-1/2 flex flex-col rounded-2xl bg-slate-900 text-slate-100 border border-slate-700/80 shadow-2xl h-[88vh] max-h-[850px] overflow-hidden cursor-default transition-all"
          >
            {/* Right Header Bar (Pinned) */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 sm:px-6 py-3.5 bg-slate-950/90 shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Email Preview: {template?.name || previewData.headline}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleDismissAndUndo}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                aria-label="Close both dialogs"
                title="Close and discard changes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Right Scrollable Content with min-h-0 */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-xs">
              {/* Controls Bar */}
              <div className="flex flex-wrap items-center gap-2.5 p-2 bg-slate-950/70 border border-slate-800 rounded-xl">
                {/* Viewport & Format Toggles */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Desktop vs Mobile Toggle */}
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setViewMode('desktop')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        viewMode === 'desktop'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('mobile')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        viewMode === 'mobile'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                  </div>

                  {/* HTML vs Plain Text Toggle */}
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setFormatMode('html')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        formatMode === 'html'
                          ? 'bg-slate-800 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>HTML Layout</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormatMode('text')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        formatMode === 'text'
                          ? 'bg-slate-800 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Plain Text</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Header Metadata Envelope Bar */}
              <div className="bg-slate-950 text-slate-200 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs shadow-md">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-[11px] text-slate-400 font-mono ml-2">Inbox &gt; Template Live Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Theme: {selectedTheme.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Today, 10:45 AM</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1 text-[11px] pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 w-16 shrink-0 font-semibold uppercase">From:</span>
                    <span className="font-medium text-slate-200 truncate">
                      {settings.senderDisplayName} &lt;{settings.senderEmail}&gt;
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 w-16 shrink-0 font-semibold uppercase">To:</span>
                    <span className="font-semibold text-blue-400 truncate">
                      {previewData.recipientName} &lt;{previewData.recipientEmail}&gt;
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 w-16 shrink-0 font-semibold uppercase">Subject:</span>
                    <span className="font-bold text-white truncate">{previewData.subjectLine}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 w-16 shrink-0 font-semibold uppercase">Key:</span>
                    <span className="font-mono text-blue-400 bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-900/60">
                      {selectedEventKey}
                    </span>
                    <span className="text-slate-500 text-[10px] ml-2 font-semibold">
                      Clinic: <span className="text-slate-300">{previewData.clinicName}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Themed Render Container */}
              <div className="flex justify-center bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-inner">
                <div
                  className={`transition-all ${
                    viewMode === 'mobile'
                      ? 'w-[340px] max-w-full border-4 border-slate-700/80 rounded-[28px] p-2 bg-slate-900 shadow-2xl'
                      : 'w-full'
                  }`}
                >
                  {/* Mobile Speaker Notch */}
                  {viewMode === 'mobile' && (
                    <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto mb-2" />
                  )}

                  {/* Email Canvas Styled in Selected Theme */}
                  <div
                    className="rounded-xl overflow-hidden border shadow-xl transition-colors"
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
                      <div className="flex items-center justify-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white shadow-xs">
                          <Stethoscope className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-extrabold tracking-tight text-sm text-white">ClinicOS</span>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white ml-1">
                          VERIFIED
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold tracking-tight text-white mb-0.5">
                        {previewData.headline}
                      </h2>
                      <p
                        className="text-xs font-medium opacity-90"
                        style={{ color: selectedTheme.headerSubtext }}
                      >
                        {previewData.subheadline}
                      </p>
                    </div>

                    {/* Email Body Content */}
                    <div
                      className="p-5 sm:p-6 space-y-4 text-xs"
                      style={{ color: selectedTheme.cardText }}
                    >
                      {formatMode === 'html' ? (
                        <div className="space-y-4">
                          {/* Salutation */}
                          <p className="text-sm font-bold">
                            Dear {previewData.recipientName},
                          </p>

                          {/* Narrative Message */}
                          <p className="leading-relaxed opacity-90">
                            {previewData.mainMessage}
                          </p>

                          {/* Theme Highlight Callout Box */}
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

                          {/* Theme Primary CTA Action Button */}
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
                        </div>
                      ) : (
                        <pre
                          className="font-mono text-xs whitespace-pre-wrap leading-relaxed p-3.5 rounded-lg border"
                          style={{
                            backgroundColor: selectedTheme.calloutBg,
                            borderColor: selectedTheme.calloutBorder,
                            color: selectedTheme.cardText
                          }}
                        >
                          {`Subject: ${previewData.subjectLine}\n\nDear ${previewData.recipientName},\n\n${previewData.mainMessage}\n\n${previewData.calloutTitle}\n${previewData.calloutItems.map(i => '- ' + i).join('\n')}\n\n${previewData.clinicName} • Powered by ClinicOS Healthcare SaaS`}
                        </pre>
                      )}

                      {/* Theme Footer */}
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
                        <div>HIPAA &amp; NABH Verified Healthcare Communications • End-to-End Encrypted</div>
                        <div className="pt-1 text-[9px] opacity-70">
                          Theme applied: <span className="font-semibold">{selectedTheme.name}</span> ({selectedTheme.tag})
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Footer Actions Bar (Pinned at Bottom) */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/90 shrink-0">
              <span className="text-xs text-slate-400 italic">
                Theme: <strong className="text-blue-400">{selectedTheme.name}</strong>
              </span>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleDismissAndUndo}>
                  Close
                </Button>
                {onSendTest && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Send}
                    onClick={() => {
                      onSendTest({
                        ...template,
                        subject: previewData.subjectLine,
                        associatedTriggerKey: selectedEventKey,
                        recipientName: previewData.recipientName,
                        recipientEmail: previewData.recipientEmail,
                        clinicName: previewData.clinicName,
                        planName: customPlanName,
                        amount: customAmount
                      });
                    }}
                  >
                    Send Test Simulation
                  </Button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
