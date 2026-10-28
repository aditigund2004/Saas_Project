import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import {
  Code,
  FileText,
  Save,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { DEFAULT_DYNAMIC_VARIABLES } from '../../../services/emailNotificationService';

export function EmailTemplateEditorModal({
  isOpen,
  onClose,
  template,
  existingTemplates = [],
  triggers = [],
  onSave
}) {
  const isEditing = Boolean(template?.id);

  const [formData, setFormData] = useState({
    id: template?.id || `tpl-${Date.now().toString().slice(-6)}`,
    key: template?.key || '',
    name: template?.name || '',
    category: template?.category || 'Onboarding & Activation',
    subject: template?.subject || '',
    htmlBody: template?.htmlBody || '<div style="font-family: sans-serif; padding: 20px;">\n  <h2>Hello {{admin_name}},</h2>\n  <p>Message content here...</p>\n</div>',
    textBody: template?.textBody || 'Hello {{admin_name}},\n\nMessage content here...',
    recipientType: template?.recipientType || 'hospital_admin',
    associatedTriggerKey: template?.associatedTriggerKey || '',
    status: template?.status || 'active',
    supportedVariables: template?.supportedVariables || [
      'hospital_name',
      'admin_name',
      'plan_name',
      'action_url',
      'company_name'
    ]
  });

  const [activeBodyTab, setActiveBodyTab] = useState('html'); // 'html' | 'text'
  const [activeFieldFocus, setActiveFieldFocus] = useState('htmlBody'); // 'subject' | 'htmlBody' | 'textBody'
  const [errorMsg, setErrorMsg] = useState('');

  // Handle inserting variable into focused field
  const handleInsertVariable = (varName) => {
    const currentVal = formData[activeFieldFocus] || '';
    setFormData({
      ...formData,
      [activeFieldFocus]: currentVal + ' ' + varName
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Template name is required.');
      return;
    }

    if (!formData.key.trim()) {
      setErrorMsg('Template unique key is required.');
      return;
    }

    // Check duplicate key
    const cleanKey = formData.key.trim().toLowerCase();
    const collision = existingTemplates.find(
      (t) => t.key.toLowerCase() === cleanKey && t.id !== formData.id
    );

    if (collision) {
      setErrorMsg(`Template key "${cleanKey}" is already used by "${collision.name}". Please choose a unique key.`);
      return;
    }

    if (!formData.subject.trim()) {
      setErrorMsg('Email subject line cannot be empty.');
      return;
    }

    onSave({
      ...formData,
      key: cleanKey,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit Template: ${template.name}` : 'Create New Email Template'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {errorMsg && (
<<<<<<< HEAD
          <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
=======
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
>>>>>>> origin/main
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Top Grid: Template Meta */}
<<<<<<< HEAD
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
                Template Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  const autoKey = !isEditing && !formData.key ? name.toLowerCase().replace(/[^a-z0-9]+/g, '.') : formData.key;
                  setFormData({ ...formData, name, key: autoKey });
                }}
                placeholder="e.g. Hospital Welcome Email"
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
                Unique Template Key <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="e.g. hospital.welcome"
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
              >
                <option value="Onboarding & Activation">Onboarding & Activation</option>
                <option value="Subscription & Billing">Subscription & Billing</option>
                <option value="Clinical & Operations">Clinical & Operations</option>
                <option value="System & Security">System & Security</option>
                <option value="Feature Announcements">Feature Announcements</option>
              </select>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
                Target Recipient Role
              </label>
              <select
                value={formData.recipientType}
                onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
>>>>>>> origin/main
              >
                <option value="hospital_admin">Hospital / Clinic Administrator</option>
                <option value="doctor">Consulting Doctor / Specialist</option>
                <option value="staff">Front Desk & Receptionist</option>
                <option value="patient">Patient / Consumer</option>
                <option value="platform_admin">Platform Superadmin</option>
              </select>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
                Associated Trigger Hook
              </label>
              <select
                value={formData.associatedTriggerKey}
                onChange={(e) => setFormData({ ...formData, associatedTriggerKey: e.target.value })}
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
=======
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-mono"
>>>>>>> origin/main
              >
                <option value="">-- No Direct Trigger --</option>
                {triggers.map((trg) => (
                  <option key={trg.eventKey} value={trg.eventKey}>
                    {trg.eventKey} ({trg.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-5">
<<<<<<< HEAD
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
=======
              <label className="flex items-center gap-2 cursor-pointer select-none">
>>>>>>> origin/main
                <input
                  type="checkbox"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'active' : 'inactive' })}
<<<<<<< HEAD
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
=======
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-800">
>>>>>>> origin/main
                  Active (Allowed in Automations)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Subject Line */}
        <div>
<<<<<<< HEAD
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
=======
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
>>>>>>> origin/main
            Email Subject Line <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onFocus={() => setActiveFieldFocus('subject')}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Welcome to ClinicOS, {{hospital_name}}!"
<<<<<<< HEAD
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
          />
        </div>

        {/* Dynamic Placeholder Insertion Panel */}
<<<<<<< HEAD
        <div className="p-3.5 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Dynamic Variable Placeholders (Click to insert into focused field)
            </span>
            <span className="text-xs text-blue-700 dark:text-blue-400 font-mono">
=======
        <div className="p-3 bg-blue-50/70 border border-blue-200/90 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Dynamic Variable Placeholders (Click to insert into focused field)
            </span>
            <span className="text-[10px] text-blue-700 font-mono">
>>>>>>> origin/main
              Target Field: <strong>{activeFieldFocus}</strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {DEFAULT_DYNAMIC_VARIABLES.map((v) => (
              <button
                key={v.name}
                type="button"
                onClick={() => handleInsertVariable(v.name)}
<<<<<<< HEAD
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 font-mono text-xs font-semibold transition-colors cursor-pointer shadow-xs"
=======
                className="px-2 py-0.5 rounded bg-white hover:bg-blue-100/80 border border-blue-200 text-blue-950 font-mono text-[10px] font-semibold transition-colors cursor-pointer shadow-2xs"
>>>>>>> origin/main
                title={`${v.desc} (Sample: ${v.sample})`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Email Body Editors: HTML vs Plain Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
<<<<<<< HEAD
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
=======
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
>>>>>>> origin/main
              <button
                type="button"
                onClick={() => {
                  setActiveBodyTab('html');
                  setActiveFieldFocus('htmlBody');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  activeBodyTab === 'html'
<<<<<<< HEAD
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
=======
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
>>>>>>> origin/main
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>HTML Template Body</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveBodyTab('text');
                  setActiveFieldFocus('textBody');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  activeBodyTab === 'text'
<<<<<<< HEAD
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
=======
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
>>>>>>> origin/main
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Plain Text Fallback</span>
              </button>
            </div>

<<<<<<< HEAD
            <span className="text-xs text-slate-400 dark:text-slate-500">
=======
            <span className="text-[11px] text-slate-400">
>>>>>>> origin/main
              {activeBodyTab === 'html' ? 'Inline CSS supported' : 'Fallback for plain email clients'}
            </span>
          </div>

          {activeBodyTab === 'html' ? (
            <textarea
              rows={9}
              value={formData.htmlBody}
              onFocus={() => setActiveFieldFocus('htmlBody')}
              onChange={(e) => setFormData({ ...formData, htmlBody: e.target.value })}
<<<<<<< HEAD
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-900 text-slate-100 leading-relaxed"
=======
              className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-900 text-slate-100 leading-relaxed"
>>>>>>> origin/main
              placeholder="<div style='font-family: sans-serif;'>...</div>"
            />
          ) : (
            <textarea
              rows={9}
              value={formData.textBody}
              onFocus={() => setActiveFieldFocus('textBody')}
              onChange={(e) => setFormData({ ...formData, textBody: e.target.value })}
<<<<<<< HEAD
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 leading-relaxed"
=======
              className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-800 leading-relaxed"
>>>>>>> origin/main
              placeholder="Dear {{admin_name}}, ..."
            />
          )}
        </div>

        {/* Modal Footer */}
<<<<<<< HEAD
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
=======
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
>>>>>>> origin/main
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" size="sm" type="submit" icon={Save}>
            Save Template
          </Button>
        </div>
      </form>
    </Modal>
  );
}
