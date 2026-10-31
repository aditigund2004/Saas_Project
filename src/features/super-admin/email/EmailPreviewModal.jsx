import React, { useState, useMemo } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import {
  Monitor,
  Smartphone,
  Send,
  Copy,
  Check,
  Code,
  FileText,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { emailService } from '../../../services/emailNotificationService';
import { EMAIL_THEMES } from './emailThemes';

export function EmailPreviewModal({
  isOpen,
  onClose,
  template,
  sampleData = {},
  logRecord = null,
  isReadOnly = false,
  onSendTest
}) {
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [formatMode, setFormatMode] = useState('html'); // 'html' | 'text'
  const [copied, setCopied] = useState(false);

  // Automatically load the theme selected at the time of sending, or default to clinical_blue
  const [selectedThemeId, setSelectedThemeId] = useState(
    () => sampleData?.themeId || localStorage.getItem('clinicos_selected_email_theme') || 'clinical_blue'
  );

  const settings = emailService.getSettings();
  const rendered = emailService.renderContent(template || {}, sampleData);
  const selectedTheme =
    EMAIL_THEMES.find((th) => th.id === selectedThemeId) || EMAIL_THEMES[0];

  // Dynamically adapt rendered HTML to match the chosen theme design
  const themedHtml = useMemo(() => {
    if (!rendered.html) return '';
    let html = rendered.html;
    if (selectedTheme.isDark) {
      html = html
        .replace(/background-color:\s*#ffffff/gi, `background-color: ${selectedTheme.cardBg}`)
        .replace(/background-color:\s*#f8fafc/gi, `background-color: ${selectedTheme.calloutBg}`)
        .replace(/background-color:\s*#eff6ff/gi, `background-color: ${selectedTheme.calloutBg}`)
        .replace(/background-color:\s*#f1f5f9/gi, `background-color: ${selectedTheme.calloutBg}`)
        .replace(/color:\s*#1e293b/gi, `color: ${selectedTheme.cardText}`)
        .replace(/color:\s*#0f172a/gi, `color: ${selectedTheme.cardText}`)
        .replace(/border:\s*1px solid #e2e8f0/gi, `border: 1px solid ${selectedTheme.footerBorder}`)
        .replace(/border-bottom:\s*1px solid #e2e8f0/gi, `border-bottom: 1px solid ${selectedTheme.footerBorder}`);
    } else {
      html = html
        .replace(/background-color:\s*#ffffff/gi, `background-color: ${selectedTheme.cardBg}`)
        .replace(/background-color:\s*#f8fafc/gi, `background-color: ${selectedTheme.calloutBg}`)
        .replace(/background-color:\s*#eff6ff/gi, `background-color: ${selectedTheme.calloutBg}`);
    }

    // Replace header and button backgrounds with selected theme gradient / primary color
    html = html
      .replace(/background-color:\s*(#2563eb|#1e3a8a|#059669|#4f46e5|#0284c7|#16a34a|#0d9488|#64748b)/gi, `background: ${selectedTheme.headerGradient}`)
      .replace(/border-left:\s*4px solid (#2563eb|#3b82f6|#059669|#4f46e5|#0284c7)/gi, `border-left: 4px solid ${selectedTheme.calloutBorder}`);

    return html;
  }, [rendered.html, selectedTheme]);

  if (!template) return null;

  const handleThemeChange = (newId) => {
    setSelectedThemeId(newId);
    localStorage.setItem('clinicos_selected_email_theme', newId);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatMode === 'html' ? themedHtml : rendered.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recipientDisplayName =
    sampleData.admin_name ||
    sampleData.doctor_name ||
    sampleData.recipientName ||
    (template.recipientType === 'doctor' ? 'Dr. Rohan Deshmukh' : 'Dr. Aarav Mehta');

  const recipientDisplayEmail =
    sampleData.recipientEmail ||
    (template.recipientType === 'doctor' ? 'dr.rohan@citycare.demo' : 'care@citycare.demo');

  const modalTitle = isReadOnly
    ? `Dispatched Email Audit Record — ${logRecord?.id || template.name}`
    : `Email Preview: ${template.name}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      size="xl"
    >
      <div className="space-y-4 text-xs">
        {/* Read-Only Dispatch Audit Header Banner */}
        {logRecord && (
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2.5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Read-Only Record</span>
                </span>
                <span className="font-mono text-xs text-blue-400 font-bold">{logRecord.id}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-mono text-xs">
                  {new Date(logRecord.timestamp).toLocaleString()}
                </span>
              </div>

              <div>
                {logRecord.status === 'delivered' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Delivered (Simulated)
                  </span>
                )}
                {logRecord.status === 'failed' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-950/80 text-rose-400 border border-rose-800">
                    <XCircle className="w-3.5 h-3.5" />
                    Failed
                  </span>
                )}
                {logRecord.status === 'skipped' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950/80 text-amber-400 border border-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Skipped
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-0.5">
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Recipient Target</span>
                <span className="font-semibold text-white">{logRecord.recipientName}</span>
                <span className="text-[11px] text-slate-400 block font-mono">{logRecord.recipientEmail}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Clinic Facility</span>
                <span className="font-semibold text-white">{logRecord.clinicName}</span>
                <span className="text-[11px] text-slate-400 block capitalize">{logRecord.source?.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Trigger Event Hook</span>
                <span className="font-mono text-blue-400 font-semibold">{logRecord.eventKey}</span>
                <span className="text-[11px] text-slate-400 block truncate">{logRecord.templateName}</span>
              </div>
            </div>

            {logRecord.errorReason && (
              <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs">
                <strong>Failure Reason:</strong> {logRecord.errorReason}
              </div>
            )}
          </div>
        )}
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          {/* Left: Viewport & Format Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Desktop vs Mobile Toggle */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'desktop'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {/* HTML vs Plain Text Toggle */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setFormatMode('html')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  formatMode === 'html'
                    ? 'bg-slate-800 dark:bg-slate-700 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>HTML Layout</span>
              </button>
              <button
                type="button"
                onClick={() => setFormatMode('text')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  formatMode === 'text'
                    ? 'bg-slate-800 dark:bg-slate-700 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Plain Text</span>
              </button>
            </div>
          </div>

          {/* Right: Theme Selector & Copy Button */}
          <div className="flex items-center gap-2">
            {/* Active Theme Selector */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
              <span
                className="w-3 h-3 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
                style={{ backgroundColor: selectedTheme.swatch }}
              />
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Theme:</span>
              <select
                value={selectedThemeId}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="bg-transparent text-slate-900 dark:text-white text-xs font-bold focus:outline-none cursor-pointer"
              >
                {EMAIL_THEMES.map((th) => (
                  <option key={th.id} value={th.id} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                    {th.name} ({th.tag})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer shadow-xs"
              title="Copy email content"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Email Header Metadata Envelope Bar */}
        <div className="bg-slate-950 text-slate-200 rounded-xl p-3 sm:p-3.5 border border-slate-800 space-y-1.5 text-xs shadow-md">
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
                {recipientDisplayName} &lt;{recipientDisplayEmail}&gt;
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-slate-500 w-16 shrink-0 font-semibold uppercase">Subject:</span>
              <span className="font-bold text-white truncate">{rendered.subject}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-slate-500 w-16 shrink-0 font-semibold uppercase">Key:</span>
              <span className="font-mono text-blue-400 bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-900/60">
                {template.key}
              </span>
              <span className="text-slate-500 text-[10px] ml-2 font-semibold">
                Category: <span className="text-slate-300">{template.category}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Themed Render Container */}
        <div className="flex justify-center bg-slate-950/70 p-3 sm:p-5 rounded-2xl border border-slate-800 min-h-[380px] max-h-[540px] overflow-y-auto shadow-inner">
          <div
            className={`transition-all ${
              viewMode === 'mobile'
                ? 'w-[360px] max-w-full border-4 border-slate-700/80 rounded-[30px] p-2 bg-slate-900 shadow-2xl'
                : 'w-full max-w-2xl'
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
                  {template.name}
                </h2>
                <p
                  className="text-xs font-medium opacity-90"
                  style={{ color: selectedTheme.headerSubtext }}
                >
                  {template.category} • Modern Practice Cockpit
                </p>
              </div>

              {/* Email Body Content */}
              <div
                className="p-5 sm:p-6 space-y-4 text-xs"
                style={{ color: selectedTheme.cardText }}
              >
                {formatMode === 'html' ? (
                  <div className="space-y-4">
                    {/* Rendered Template HTML */}
                    <div
                      className="prose prose-sm max-w-none leading-relaxed"
                      style={{ color: selectedTheme.cardText }}
                      dangerouslySetInnerHTML={{ __html: themedHtml }}
                    />

                    {/* Theme Highlight Callout Box */}
                    <div
                      className="p-3.5 rounded-lg border-l-4 space-y-1.5 transition-colors"
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
                        Clinical Operational Summary &amp; Verification
                      </div>
                      <p
                        className="text-[11px] leading-snug"
                        style={{ color: selectedTheme.calloutText }}
                      >
                        Dispatched using HIPAA &amp; NABH compliant encrypted cloud delivery channels. Verified for {template.recipientType.replace('_', ' ')} accounts.
                      </p>
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
                        Access Verified Workspace ➔
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
                    {rendered.text}
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
                    <strong>ClinicOS Healthcare SaaS Platform</strong> • 256-bit SSL Clinical Grade Security
                  </div>
                  <div>{settings.defaultFooter}</div>
                  <div className="pt-1 text-[9px] opacity-70">
                    Theme applied: <span className="font-semibold">{selectedTheme.name}</span> ({selectedTheme.tag})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 dark:text-slate-500 italic">
            {isReadOnly ? (
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Historical audit log record • Read-only view</span>
              </span>
            ) : (
              <span>Showing theme <strong className="text-blue-600 dark:text-blue-400">{selectedTheme.name}</strong> selected at dispatch time.</span>
            )}
          </span>

          <div className="flex items-center gap-2">
            <Button variant={isReadOnly ? 'primary' : 'outline'} size="sm" onClick={onClose}>
              {isReadOnly ? 'Close Record' : 'Close'}
            </Button>
            {!isReadOnly && onSendTest && (
              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={() => {
                  onSendTest(template);
                }}
              >
                Send Test Simulation
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}