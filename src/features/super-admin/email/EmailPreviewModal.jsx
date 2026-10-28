import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import {
  Monitor,
  Smartphone,
  Send,
  Copy,
  Check,
  Code,
  FileText
} from 'lucide-react';
import { emailService } from '../../../services/emailNotificationService';

export function EmailPreviewModal({
  isOpen,
  onClose,
  template,
  sampleData = {},
  onSendTest
}) {
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [formatMode, setFormatMode] = useState('html'); // 'html' | 'text'
  const [copied, setCopied] = useState(false);

  if (!template) return null;

  const settings = emailService.getSettings();
  const rendered = emailService.renderContent(template, sampleData);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatMode === 'html' ? rendered.html : rendered.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Email Preview: ${template.name}`}
      size="xl"
    >
      <div className="space-y-4 text-xs">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          {/* Desktop vs Mobile Toggle */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">

            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
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
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
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
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setFormatMode('html')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
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
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  formatMode === 'text'
                    ? 'bg-slate-800 dark:bg-slate-700 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />

                <span>Plain Text</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              title="Copy email content"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}

            </button>
          </div>
        </div>

        {/* Email Header Metadata Box */}
        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 uppercase w-16">From:</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">

              {settings.senderDisplayName} &lt;{settings.senderEmail}&gt;
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 uppercase w-16">To:</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">

              {sampleData.admin_name || sampleData.recipientName || 'Dr. Aarav Mehta'} &lt;
              {sampleData.recipientEmail || 'care@citycare.demo'}&gt;
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-400 uppercase w-16 mt-0.5">Subject:</span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">{rendered.subject}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 pt-1.5 border-t border-slate-100 dark:border-slate-800">
            <span className="font-bold uppercase w-16">Template:</span>
            <span className="font-mono text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-xs border border-blue-200 dark:border-blue-900/60">

              {template.key}
            </span>
          </div>
        </div>

        {/* Render Container */}
        <div className="flex justify-center bg-slate-100/70 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[360px] max-h-[500px] overflow-y-auto">
          <div
            className={`transition-all bg-white text-slate-900 shadow-sm rounded-xl overflow-hidden ${

              viewMode === 'mobile'
                ? 'w-[375px] border-4 border-slate-800 rounded-2xl shadow-xl'
                : 'w-full max-w-2xl border border-slate-200'
            }`}
          >
            {/* Mobile Status Bar Simulation */}
            {viewMode === 'mobile' && (
              <div className="bg-slate-800 text-white text-xs px-4 py-1.5 flex justify-between font-mono">

                <span>09:41</span>
                <span>5G • 100%</span>
              </div>
            )}

            {/* Email Body Content */}
            <div className="p-4 sm:p-6 text-slate-900">
              {formatMode === 'html' ? (
                <div
                  className="prose prose-sm max-w-none text-slate-900"

                  dangerouslySetInnerHTML={{ __html: rendered.html }}
                />
              ) : (
                <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed p-3 bg-slate-50 rounded-lg border border-slate-200">
                  {rendered.text}
                </pre>
              )}
            </div>

            {/* Simulated Email Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 text-center leading-relaxed">

              {settings.defaultFooter}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 dark:text-slate-500 italic">

            Variables populated using active demonstration practice data.
          </span>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            {onSendTest && (
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

