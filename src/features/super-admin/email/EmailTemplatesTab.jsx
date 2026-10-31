import React, { useState, useMemo } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import {
  Plus,
  Search,
  Eye,
  Edit2,
  Copy,
  Trash2,
  Send,
  CheckCircle2,
  Sparkles,
  Monitor,
  Smartphone,
  Save,
  RotateCcw,
  X,
  Columns,
  Table as TableIcon,
  ArrowLeft
} from 'lucide-react';
import { emailService } from '../../../services/emailNotificationService';

// Non-technical Friendly Variable Chips with human-readable labels
const FRIENDLY_VARIABLES = [
  { token: '{{hospital_name}}', label: '🏥 Hospital Name' },
  { token: '{{admin_name}}', label: '👤 Admin Name' },
  { token: '{{doctor_name}}', label: '👨‍⚕️ Doctor Name' },
  { token: '{{patient_name}}', label: '🧑 Patient Name' },
  { token: '{{plan_name}}', label: '📦 Subscription Plan' },
  { token: '{{payment_amount}}', label: '💳 Billing Amount' },
  { token: '{{action_url}}', label: '🔗 Dashboard Link' },
  { token: '{{support_email}}', label: '✉️ Support Email' }
];

// Color palette choices for non-technical users
const HEADER_COLOR_PALETTES = [
  { name: 'Clinical Blue', color: '#2563eb' },
  { name: 'Emerald Green', color: '#059669' },
  { name: 'Navy Enterprise', color: '#1e3a8a' },
  { name: 'Royal Indigo', color: '#4f46e5' },
  { name: 'Crimson Urgent', color: '#e11d48' },
  { name: 'Slate Neutral', color: '#334155' }
];

function formatRecipientType(type) {
  switch (type) {
    case 'hospital_admin':
      return 'Hospital Admin';
    case 'doctor':
      return 'Doctor';
    case 'patient':
      return 'Patient';
    case 'staff':
      return 'Staff Member';
    default:
      return type ? type.replace(/_/g, ' ') : 'Hospital Admin';
  }
}

/**
 * Intelligent helper to parse raw template HTML into non-technical friendly form fields
 */
function parseTemplateToVisualFields(template) {
  if (!template) return null;
  const html = template.htmlBody || '';

  // Extract banner title
  const titleMatch = html.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
  const bannerTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : template.name;

  // Extract banner color
  const colorMatch = html.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/i);
  const bannerColor = colorMatch ? colorMatch[1] : '#2563eb';

  // Extract greeting
  const greetingMatch = html.match(/<p[^>]*>(Dear\s+.*?|Hello\s+.*?)<\/p>/i);
  const greeting = greetingMatch
    ? greetingMatch[1].replace(/<[^>]+>/g, '').trim()
    : 'Dear {{admin_name}},';

  // Extract button text & URL
  const buttonMatch = html.match(/<a[^>]*href="([^"]*)"[^>]*style="[^"]*background-color:[^"]*"[^>]*>(.*?)<\/a>/i);
  const buttonUrl = buttonMatch ? buttonMatch[1] : '{{action_url}}';
  const buttonText = buttonMatch ? buttonMatch[2].replace(/<[^>]+>/g, '').trim() : 'Open Practice Cockpit';

  // Extract list items / highlight box
  const boxTitleMatch = html.match(/<h3[^>]*>(.*?)<\/h3>/i);
  const boxTitle = boxTitleMatch ? boxTitleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Important Next Steps:';

  const listItems = [];
  const liMatches = html.matchAll(/<li[^>]*>(.*?)<\/li>/gi);
  for (const m of liMatches) {
    listItems.push(m[1].replace(/<[^>]+>/g, '').trim());
  }

  // Extract message paragraphs (fallback to textBody if clean)
  let mainMessage = '';
  if (template.textBody) {
    const lines = template.textBody.split('\n\n').filter((l) => !l.startsWith('Dear') && !l.startsWith('Warm regards') && !l.startsWith('Best,') && !l.startsWith('Regards,'));
    mainMessage = lines.join('\n\n').trim();
  } else {
    mainMessage = 'We are pleased to notify you that your clinical operations have been updated successfully.';
  }

  return {
    name: template.name || '',
    subject: template.subject || '',
    status: template.status || 'active',
    bannerTitle,
    bannerSubtitle: template.category || 'Healthcare Operations',
    bannerColor,
    greeting,
    mainMessage,
    showButton: Boolean(buttonText),
    buttonText,
    buttonUrl,
    buttonColor: bannerColor,
    showHighlightBox: listItems.length > 0,
    boxTitle,
    boxItems: listItems.length > 0 ? listItems : ['Verify your clinical schedule', 'Review digital prescription presets', 'Invite front-desk receptionist staff'],
    footerNote: 'Questions? Contact our 24/7 clinical support concierge at {{support_email}}.'
  };
}

/**
 * Intelligent helper to reconstruct standard responsive email HTML from non-technical friendly form fields
 */
function buildHtmlFromVisualFields(vf) {
  const paragraphs = (vf.mainMessage || '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.6; color: #334155;">${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');

  const bulletsHtml = (vf.boxItems || [])
    .filter((b) => b && b.trim())
    .map((b) => `<li style="margin-bottom: 6px;">${b}</li>`)
    .join('');

  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
  <div style="background-color: ${vf.bannerColor || '#2563eb'}; color: #ffffff; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">${vf.bannerTitle || 'ClinicOS Notification'}</h1>
    ${vf.bannerSubtitle ? `<p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">${vf.bannerSubtitle}</p>` : ''}
  </div>

  <div style="background-color: #ffffff; padding: 26px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
    ${vf.greeting ? `<p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0 0 14px 0;">${vf.greeting}</p>` : ''}

    ${paragraphs}

    ${
      vf.showHighlightBox && bulletsHtml
        ? `<div style="background-color: #f8fafc; border-left: 4px solid ${vf.bannerColor || '#2563eb'}; padding: 14px 16px; margin: 20px 0; border-radius: 6px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1e293b;">${vf.boxTitle || 'Key Highlights:'}</h3>
        <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.6; color: #475569;">
          ${bulletsHtml}
        </ul>
      </div>`
        : ''
    }

    ${
      vf.showButton && vf.buttonText
        ? `<div style="text-align: center; margin: 26px 0;">
        <a href="${vf.buttonUrl || '{{action_url}}'}" style="background-color: ${vf.buttonColor || vf.bannerColor || '#2563eb'}; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block;">
          ${vf.buttonText}
        </a>
      </div>`
        : ''
    }

    ${
      vf.footerNote
        ? `<p style="font-size: 12px; color: #64748b; margin-top: 24px; padding-top: 14px; border-top: 1px solid #f1f5f9; text-align: center;">${vf.footerNote}</p>`
        : ''
    }
  </div>
</div>`;
}

/**
 * Intelligent helper to reconstruct plain text fallback
 */
function buildTextFromVisualFields(vf) {
  let out = '';
  if (vf.greeting) out += `${vf.greeting}\n\n`;
  if (vf.mainMessage) out += `${vf.mainMessage}\n\n`;
  if (vf.showHighlightBox && vf.boxItems?.length > 0) {
    out += `${vf.boxTitle || 'Highlights'}:\n`;
    vf.boxItems.forEach((b) => {
      if (b.trim()) out += `- ${b.trim()}\n`;
    });
    out += '\n';
  }
  if (vf.showButton && vf.buttonText) {
    out += `${vf.buttonText}: ${vf.buttonUrl || '{{action_url}}'}\n\n`;
  }
  if (vf.footerNote) out += `${vf.footerNote}\n`;
  return out;
}

export function EmailTemplatesTab({
  templates = [],
  _triggers = [],
  onOpenCreate,
  onDuplicate,
  onToggleStatus,
  onDelete,
  onSendTest,
  onSaveTemplate
}) {
  // View mode: 'split' (3-part workspace) vs 'table' (full directory table)
  const [viewMode, setViewMode] = useState('split');

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingTemplate, setDeletingTemplate] = useState(null);

  // Active Selected Template (Default to first template on initial view for seamless 3-part split)
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return templates[0]?.id || null;
  });

  // Editor mode: 'visual' (No-code Friendly) vs 'code' (HTML Source)
  const [editorTab, setEditorTab] = useState('visual');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveToastNotice, setSaveToastNotice] = useState(false);

  // View mode controls for Middle Part: 'desktop' vs 'mobile'
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [previewFormat, setPreviewFormat] = useState('html'); // 'html' | 'text'

  // Non-technical visual fields state
  const [visualFields, setVisualFields] = useState(() => {
    return templates[0] ? parseTemplateToVisualFields(templates[0]) : null;
  });

  // Advanced raw HTML draft state
  const [rawHtmlDraft, setRawHtmlDraft] = useState(() => templates[0]?.htmlBody || '');
  const [rawTextDraft, setRawTextDraft] = useState(() => templates[0]?.textBody || '');

  // Currently focused field for variable tag insertions
  const [activeInputFocus, setActiveInputFocus] = useState('subject'); // 'subject' | 'mainMessage' | 'greeting' | 'bannerTitle'

  // Filter templates list
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const matchesSearch =
        tpl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tpl.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tpl.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || tpl.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || tpl.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [templates, searchTerm, categoryFilter, statusFilter]);

  // Currently active template object
  const activeTemplate = useMemo(() => {
    return templates.find((t) => t.id === selectedTemplateId) || templates[0] || null;
  }, [templates, selectedTemplateId]);

  // Handle switching template on click
  const handleSelectTemplate = (tpl) => {
    setSelectedTemplateId(tpl.id);
    const parsed = parseTemplateToVisualFields(tpl);
    setVisualFields(parsed);
    setRawHtmlDraft(tpl.htmlBody || '');
    setRawTextDraft(tpl.textBody || '');
    setHasUnsavedChanges(false);
    setSaveToastNotice(false);
  };

  // Clicking a template in the full table triggers the 3-part split view
  const handleOpenTemplateInSplit = (tpl) => {
    handleSelectTemplate(tpl);
    setViewMode('split');
  };

  // Real-time synchronization on visual field changes
  const handleVisualFieldChange = (field, value) => {
    if (!visualFields) return;
    const updated = { ...visualFields, [field]: value };
    setVisualFields(updated);

    // Keep raw drafts in sync automatically
    const newHtml = buildHtmlFromVisualFields(updated);
    const newText = buildTextFromVisualFields(updated);
    setRawHtmlDraft(newHtml);
    setRawTextDraft(newText);

    setHasUnsavedChanges(true);
    setSaveToastNotice(false);
  };

  // Bullet items add/remove
  const handleAddBulletItem = () => {
    if (!visualFields) return;
    const current = [...(visualFields.boxItems || [])];
    current.push('New key clinical action point');
    handleVisualFieldChange('boxItems', current);
  };

  const handleUpdateBulletItem = (idx, text) => {
    if (!visualFields) return;
    const current = [...(visualFields.boxItems || [])];
    current[idx] = text;
    handleVisualFieldChange('boxItems', current);
  };

  const handleDeleteBulletItem = (idx) => {
    if (!visualFields) return;
    const current = [...(visualFields.boxItems || [])];
    current.splice(idx, 1);
    handleVisualFieldChange('boxItems', current);
  };

  // 1-Click friendly variable insertion
  const handleInsertVariableToken = (token) => {
    if (!visualFields) return;
    if (editorTab === 'visual') {
      const fieldKey = activeInputFocus in visualFields ? activeInputFocus : 'mainMessage';
      const cur = visualFields[fieldKey] || '';
      handleVisualFieldChange(fieldKey, `${cur} ${token}`);
    } else {
      setRawHtmlDraft((prev) => `${prev} ${token}`);
      setHasUnsavedChanges(true);
    }
  };

  // Save changes and synchronize with system state & table
  const handleSaveAndSync = (e) => {
    e?.preventDefault();
    if (!activeTemplate || !visualFields) return;

    const finalHtml = editorTab === 'code' ? rawHtmlDraft : buildHtmlFromVisualFields(visualFields);
    const finalText = editorTab === 'code' ? rawTextDraft : buildTextFromVisualFields(visualFields);

    const updatedTemplate = {
      ...activeTemplate,
      name: visualFields.name || activeTemplate.name,
      subject: visualFields.subject || activeTemplate.subject,
      status: visualFields.status || activeTemplate.status,
      htmlBody: finalHtml,
      textBody: finalText,
      updatedAt: new Date().toISOString()
    };

    if (onSaveTemplate) {
      onSaveTemplate(updatedTemplate);
    } else {
      emailService.saveTemplate(updatedTemplate);
    }

    setHasUnsavedChanges(false);
    setSaveToastNotice(true);
    setTimeout(() => setSaveToastNotice(false), 3000);
  };

  // Reset/revert draft back to original
  const handleRevertChanges = () => {
    if (activeTemplate) {
      const parsed = parseTemplateToVisualFields(activeTemplate);
      setVisualFields(parsed);
      setRawHtmlDraft(activeTemplate.htmlBody || '');
      setRawTextDraft(activeTemplate.textBody || '');
      setHasUnsavedChanges(false);
    }
  };

  // Real-time rendered content for Part 2 (View screen)
  const renderedContent = useMemo(() => {
    if (!visualFields && !activeTemplate) return null;
    const htmlToRender = editorTab === 'code' ? rawHtmlDraft : buildHtmlFromVisualFields(visualFields);
    const textToRender = editorTab === 'code' ? rawTextDraft : buildTextFromVisualFields(visualFields);
    const subjectToRender = visualFields?.subject || activeTemplate?.subject || '';

    return emailService.renderContent({
      subject: subjectToRender,
      htmlBody: htmlToRender,
      textBody: textToRender
    });
  }, [visualFields, activeTemplate, editorTab, rawHtmlDraft, rawTextDraft]);

  const settings = emailService.getSettings();

  return (
    <div className="space-y-4">
      {/* Top Search, Filters & Workspace View Switcher Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates or keys..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories ({templates.length})</option>
            <option value="Onboarding & Activation">Onboarding & Activation</option>
            <option value="Subscription & Billing">Subscription & Billing</option>
            <option value="Clinical & Operations">Clinical & Operations</option>
            <option value="System & Security">System & Security</option>
            <option value="Feature Announcements">Feature Announcements</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        <div className="flex items-center gap-2 self-end lg:self-auto">
          {/* Workspace Switcher: Full Table vs 3-Part Split Studio */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
              title="3-Part Live Split Studio: List + View + Editor"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>3-Part Split Studio</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
              title="Full Directory Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Full Table ({filteredTemplates.length})</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={onOpenCreate}
            className="font-bold text-xs shadow-xs shrink-0"
          >
            Create Template
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE A: 3-PART SPLIT WORKSPACE (PART 1 LIST + PART 2 VIEW + PART 3 EDIT) */}
      {/* ========================================================================= */}
      {viewMode === 'split' ? (
        <div className="space-y-2">
          {/* Studio Top Context Indicator */}
          <div className="flex items-center justify-between px-3 py-2 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200/60 dark:border-blue-900/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                <Columns className="w-3.5 h-3.5 text-blue-600" />
                3-Part Live Studio Active:
              </span>
              <span className="font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                {activeTemplate?.name}
              </span>
              <span className="font-mono text-[11px] text-blue-700 dark:text-blue-300 hidden sm:inline">
                ({activeTemplate?.key})
              </span>
            </div>

            <button
              type="button"
              onClick={() => setViewMode('table')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Switch to Full Table View</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* ======================================================================= */}
            {/* PART 1: TEMPLATE NAME LIST IN TABLE FORMAT (Left, 3 cols / ~25%)        */}
            {/* ======================================================================= */}
            <div className="lg:col-span-3 space-y-2">
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl overflow-hidden flex flex-col h-[750px]">
                {/* Part 1 Header */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider block">
                      1. Template List
                    </span>
                    <span className="text-[10px] text-slate-500">Click row to switch view & editor</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {filteredTemplates.length}
                  </span>
                </div>

                {/* Template List Table */}
                <div className="overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="sticky top-0 bg-slate-100/95 dark:bg-slate-800/95 z-10 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider backdrop-blur-xs">
                      <tr>
                        <th className="py-2.5 px-2 text-center w-8">#</th>
                        <th className="py-2.5 px-3">Template Name & Key</th>
                        <th className="py-2.5 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredTemplates.map((tpl, idx) => {
                        const isSelected = activeTemplate?.id === tpl.id;
                        const isActive = tpl.status === 'active';

                        return (
                          <tr
                            key={tpl.id}
                            onClick={() => handleSelectTemplate(tpl)}
                            className={`transition-all cursor-pointer group ${
                              isSelected
                                ? 'bg-blue-50/90 dark:bg-blue-950/70 border-l-4 border-l-blue-600 shadow-2xs font-semibold'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            {/* Index */}
                            <td className="py-2.5 px-2 text-center font-mono text-[10px] text-slate-400">
                              {idx + 1}
                            </td>

                            {/* Name & Key */}
                            <td className="py-2.5 px-3">
                              <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight">
                                {tpl.name}
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="font-mono text-[10px] text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.2 rounded border border-blue-200/60 dark:border-blue-900/60 truncate max-w-[140px]">
                                  {tpl.key}
                                </span>
                              </div>
                            </td>

                            {/* Status indicator */}
                            <td className="py-2.5 px-2 text-center whitespace-nowrap">
                              <span
                                className={`inline-block w-2.5 h-2.5 rounded-full ${
                                  isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                                }`}
                                title={isActive ? 'Active' : 'Inactive'}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Part 1 Footer */}
                <div className="p-2.5 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Selected: <strong className="text-slate-800 dark:text-slate-200">{activeTemplate?.name}</strong></span>
                  {activeTemplate && (
                    <button
                      type="button"
                      onClick={() => onDuplicate && onDuplicate(activeTemplate.id)}
                      className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                      title="Duplicate this template"
                    >
                      <Copy className="w-3 h-3" /> Duplicate
                    </button>
                  )}
                </div>
              </Card>
            </div>

            {/* ======================================================================= */}
            {/* PART 2: THE VIEW (LIVE RENDERED PREVIEW) (Middle, 4 cols / ~35%)        */}
            {/* ======================================================================= */}
            <div className="lg:col-span-4 space-y-2">
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl overflow-hidden flex flex-col h-[750px]">
                {/* Part 2 Header */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      2. Live Email View
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Real-Time Sync
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Viewport Toggles: Desktop vs Mobile */}
                    <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          previewDevice === 'desktop'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                        title="Desktop View"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          previewDevice === 'mobile'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                        title="Mobile View"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Format Toggle: HTML vs Plain Text */}
                    <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => setPreviewFormat('html')}
                        className={`px-1.5 py-1 rounded-md cursor-pointer ${
                          previewFormat === 'html' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        title="Rendered Rich HTML Email"
                      >
                        HTML
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewFormat('text')}
                        className={`px-1.5 py-1 rounded-md cursor-pointer ${
                          previewFormat === 'text' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        title="Plain Text Fallback"
                      >
                        Text
                      </button>
                    </div>
                  </div>
                </div>

                {/* Email Envelope Header simulation */}
                <div className="p-2.5 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-bold uppercase w-12 text-[10px]">From:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                      {settings.senderDisplayName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-bold uppercase w-12 text-[10px]">To:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                      Dr. Aarav Mehta &lt;care@citycare.demo&gt;
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold uppercase w-12 text-[10px] mt-0.5">Subject:</span>
                    <span className="text-slate-900 dark:text-white font-black text-xs truncate">
                      {renderedContent?.subject || visualFields?.subject || activeTemplate?.subject}
                    </span>
                  </div>
                </div>

                {/* Live Rendered Email Body Simulation */}
                <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-3 sm:p-4 overflow-y-auto flex justify-center items-start">
                  <div
                    className={`transition-all bg-white text-slate-900 shadow-md rounded-xl overflow-hidden flex flex-col ${
                      previewDevice === 'mobile'
                        ? 'w-[300px] border-4 border-slate-800 rounded-2xl shadow-xl'
                        : 'w-full max-w-md border border-slate-200'
                    }`}
                  >
                    {/* Mobile top bar simulation */}
                    {previewDevice === 'mobile' && (
                      <div className="bg-slate-900 text-white text-[9px] px-3 py-1 flex justify-between font-mono">
                        <span>09:41</span>
                        <span>5G • 100%</span>
                      </div>
                    )}

                    {/* Rendered HTML or Text */}
                    <div className="p-3 text-slate-900 text-xs">
                      {previewFormat === 'html' ? (
                        <div
                          className="prose prose-xs max-w-none text-slate-900 leading-normal"
                          dangerouslySetInnerHTML={{ __html: renderedContent?.html || activeTemplate?.htmlBody || '' }}
                        />
                      ) : (
                        <pre className="font-mono text-[11px] whitespace-pre-wrap p-2 bg-slate-50 rounded text-slate-800">
                          {renderedContent?.text || activeTemplate?.textBody || ''}
                        </pre>
                      )}
                    </div>

                    {/* Footer simulation */}
                    <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[9px] text-slate-400 text-center leading-tight">
                      {settings.defaultFooter}
                    </div>
                  </div>
                </div>

                {/* Part 2 Quick Test Action */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 text-[10px]">Populated with practice sample data</span>
                  <button
                    type="button"
                    onClick={() => onSendTest(activeTemplate)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Test</span>
                  </button>
                </div>
              </Card>
            </div>

            {/* ======================================================================= */}
            {/* PART 3: EDITABLE TEMPLATE (NON-TECHNICAL FRIENDLY) (Right, 5 cols / ~40%) */}
            {/* ======================================================================= */}
            <div className="lg:col-span-5 space-y-2">
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl overflow-hidden flex flex-col h-[750px]">
                {/* Part 3 Top Action Bar */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                      3. Easy Editor (Non-Technical)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {editorTab === 'visual' ? 'Friendly form fields — no HTML needed' : 'Advanced code editor'}
                    </span>
                  </div>

                  {/* Mode Toggle & Save Button */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => setEditorTab('visual')}
                        className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          editorTab === 'visual'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Visual Form
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorTab('code')}
                        className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          editorTab === 'code'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        HTML Code
                      </button>
                    </div>

                    {/* Save & Sync Button */}
                    <Button
                      variant="primary"
                      size="xs"
                      onClick={handleSaveAndSync}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Sync</span>
                    </Button>
                  </div>
                </div>

                {/* Quick-Insert Friendly Variable Chips */}
                <div className="p-2 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[10px]">
                  <span className="font-bold text-slate-400 shrink-0 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-500" /> Insert:
                  </span>
                  {FRIENDLY_VARIABLES.map((v) => (
                    <button
                      key={v.token}
                      type="button"
                      onClick={() => handleInsertVariableToken(v.token)}
                      className="px-2 py-0.5 rounded-md font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-400 hover:bg-blue-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
                      title={`Click to insert ${v.token}`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                {/* Editor Workspace Scrollable Form */}
                <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
                  {saveToastNotice && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-2 animate-fade-in text-[11px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Changes synchronized and saved live across the table!</span>
                    </div>
                  )}

                  {/* ------------------------------------------------------------- */}
                  {/* NON-TECHNICAL VISUAL FORM EDITOR                              */}
                  {/* ------------------------------------------------------------- */}
                  {editorTab === 'visual' && visualFields && (
                    <div className="space-y-4">
                      {/* Email Subject Line */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300">
                          Email Subject Line <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={visualFields.subject}
                          onFocus={() => setActiveInputFocus('subject')}
                          onChange={(e) => handleVisualFieldChange('subject', e.target.value)}
                          placeholder="e.g. Welcome to {{hospital_name}}!"
                          className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      {/* Template Display Name & Banner Theme */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            Template Name
                          </label>
                          <input
                            type="text"
                            value={visualFields.name}
                            onChange={(e) => handleVisualFieldChange('name', e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            Banner Theme Color
                          </label>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            {HEADER_COLOR_PALETTES.map((p) => (
                              <button
                                key={p.name}
                                type="button"
                                onClick={() => handleVisualFieldChange('bannerColor', p.color)}
                                className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                                  visualFields.bannerColor === p.color ? 'scale-110 border-blue-600 ring-2 ring-blue-400' : 'border-white dark:border-slate-700'
                                }`}
                                style={{ backgroundColor: p.color }}
                                title={p.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Banner Title & Subtitle */}
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <span className="font-bold text-[11px] text-slate-700 dark:text-slate-300 block">
                          Email Header Banner
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={visualFields.bannerTitle}
                            onFocus={() => setActiveInputFocus('bannerTitle')}
                            onChange={(e) => handleVisualFieldChange('bannerTitle', e.target.value)}
                            placeholder="Header Title (e.g. Welcome to ClinicOS!)"
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                          <input
                            type="text"
                            value={visualFields.bannerSubtitle}
                            onChange={(e) => handleVisualFieldChange('bannerSubtitle', e.target.value)}
                            placeholder="Header Subtitle (e.g. Healthcare Operating System)"
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Greeting / Salutation */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Greeting / Salutation
                        </label>
                        <input
                          type="text"
                          value={visualFields.greeting}
                          onFocus={() => setActiveInputFocus('greeting')}
                          onChange={(e) => handleVisualFieldChange('greeting', e.target.value)}
                          placeholder="e.g. Dear {{admin_name}},"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Main Message Body Paragraphs */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            Main Email Message (Plain English Text)
                          </label>
                          <span className="text-[10px] text-slate-400">Separate paragraphs with Enter</span>
                        </div>
                        <textarea
                          rows={5}
                          value={visualFields.mainMessage}
                          onFocus={() => setActiveInputFocus('mainMessage')}
                          onChange={(e) => handleVisualFieldChange('mainMessage', e.target.value)}
                          placeholder="Write your email announcement or notification here..."
                          className="w-full p-3 text-xs leading-relaxed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      {/* Call-to-Action Button Section */}
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-slate-700 dark:text-slate-300">
                            Call-to-Action (CTA) Button
                          </span>
                          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={visualFields.showButton}
                              onChange={(e) => handleVisualFieldChange('showButton', e.target.checked)}
                              className="w-3.5 h-3.5 text-blue-600 rounded"
                            />
                            <span>Include Button</span>
                          </label>
                        </div>

                        {visualFields.showButton && (
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={visualFields.buttonText}
                              onChange={(e) => handleVisualFieldChange('buttonText', e.target.value)}
                              placeholder="Button Text (e.g. Access Cockpit)"
                              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                            <input
                              type="text"
                              value={visualFields.buttonUrl}
                              onChange={(e) => handleVisualFieldChange('buttonUrl', e.target.value)}
                              placeholder="Button URL (e.g. {{action_url}})"
                              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                          </div>
                        )}
                      </div>

                      {/* Highlights / Bullet Points Checklist */}
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-slate-700 dark:text-slate-300">
                            Checklist / Key Highlights Box
                          </span>
                          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={visualFields.showHighlightBox}
                              onChange={(e) => handleVisualFieldChange('showHighlightBox', e.target.checked)}
                              className="w-3.5 h-3.5 text-blue-600 rounded"
                            />
                            <span>Include Box</span>
                          </label>
                        </div>

                        {visualFields.showHighlightBox && (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={visualFields.boxTitle}
                              onChange={(e) => handleVisualFieldChange('boxTitle', e.target.value)}
                              placeholder="Box Title (e.g. Important Next Steps)"
                              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                            />

                            {/* Bullet Items */}
                            <div className="space-y-1.5">
                              {(visualFields.boxItems || []).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-1.5">
                                  <span className="text-slate-400 font-mono text-[10px] w-4">{idx + 1}.</span>
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleUpdateBulletItem(idx, e.target.value)}
                                    className="flex-1 px-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteBulletItem(idx)}
                                    className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                                    title="Remove point"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}

                              <button
                                type="button"
                                onClick={handleAddBulletItem}
                                className="px-2.5 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" /> Add Highlight Point
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------- */}
                  {/* ADVANCED RAW HTML EDITOR (For Power Users)                     */}
                  {/* ------------------------------------------------------------- */}
                  {editorTab === 'code' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] text-slate-700 dark:text-slate-300">
                          Raw HTML Template Source
                        </span>
                        <span className="text-[10px] text-slate-400">Updates live in Part 2 View</span>
                      </div>
                      <textarea
                        rows={18}
                        value={rawHtmlDraft}
                        onChange={(e) => {
                          setRawHtmlDraft(e.target.value);
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full p-3 font-mono text-[11px] leading-relaxed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-950 text-emerald-400 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
                        spellCheck={false}
                      />
                    </div>
                  )}
                </div>

                {/* Part 3 Footer Save Action */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  {hasUnsavedChanges ? (
                    <span className="text-amber-600 font-bold flex items-center gap-1 text-[11px]">
                      ● Unsaved changes pending
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">All changes synchronized</span>
                  )}

                  <div className="flex items-center gap-2">
                    {hasUnsavedChanges && (
                      <button
                        type="button"
                        onClick={handleRevertChanges}
                        className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Revert
                      </button>
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSaveAndSync}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Sync Email</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE B: FULL DIRECTORY TABLE VIEW (User's Complete Table with 8 Columns)  */
        /* ========================================================================= */
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl overflow-hidden">
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
            <span className="text-xs text-blue-800 dark:text-blue-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Tip: Click any template name or row to immediately open the <strong>3-Part Split Studio</strong> (List, Live View, and Easy Editor).
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-500">
              Showing {filteredTemplates.length} templates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 text-center w-10">#</th>
                  <th className="py-3 px-4">Template Name & Key</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Subject Line</th>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Trigger Hook</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTemplates.map((tpl, idx) => {
                  const isActive = tpl.status === 'active';

                  return (
                    <tr
                      key={tpl.id}
                      onClick={() => handleOpenTemplateInSplit(tpl)}
                      className="hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      {/* # */}
                      <td className="py-3 px-3 text-center font-mono text-slate-400">
                        {idx + 1}
                      </td>

                      {/* Template Name & Key */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tpl.name}
                          </span>
                          {tpl.isPrebuilt && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                              Prebuilt
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5">
                          <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/50 dark:border-blue-900/50">
                            {tpl.key}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">
                        {tpl.category}
                      </td>

                      {/* Subject Line */}
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium max-w-[220px] truncate" title={tpl.subject}>
                        {tpl.subject}
                      </td>

                      {/* Recipient */}
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatRecipientType(tpl.recipientType)}
                      </td>

                      {/* Trigger Hook */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {tpl.associatedTriggerKey ? (
                          <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/60">
                            {tpl.associatedTriggerKey}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">None</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => onToggleStatus && onToggleStatus(tpl.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          <span>{isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          {/* Open in 3-part split */}
                          <button
                            type="button"
                            onClick={() => handleOpenTemplateInSplit(tpl)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Open in 3-Part Split Studio"
                          >
                            <Columns className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Send Test */}
                          <button
                            type="button"
                            onClick={() => onSendTest(tpl)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Send Test Simulation"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>

                          {/* Duplicate */}
                          <button
                            type="button"
                            onClick={() => onDuplicate && onDuplicate(tpl.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Duplicate Template"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeletingTemplate(tpl)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Delete Template"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTemplate && (
        <Modal
          isOpen={Boolean(deletingTemplate)}
          onClose={() => setDeletingTemplate(null)}
          title="Confirm Delete Template"
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to permanently delete template{' '}
              <strong>"{deletingTemplate.name}"</strong> ({deletingTemplate.key})? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setDeletingTemplate(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onDelete(deletingTemplate.id);
                  if (selectedTemplateId === deletingTemplate.id) {
                    setSelectedTemplateId(null);
                  }
                  setDeletingTemplate(null);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Delete Template
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}