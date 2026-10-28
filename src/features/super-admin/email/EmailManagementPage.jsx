import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import {
  Mail,
  LayoutDashboard,
  FileText,
  Zap,
  Megaphone,
  History,
  Settings,
  Play
} from 'lucide-react';
import { emailService } from '../../../services/emailNotificationService';
import { EmailDashboardTab } from './EmailDashboardTab';
import { EmailTemplatesTab } from './EmailTemplatesTab';
import { EmailTemplateEditorModal } from './EmailTemplateEditorModal';
import { EmailPreviewModal } from './EmailPreviewModal';
import { EmailTriggersTab } from './EmailTriggersTab';
import { EmailCampaignsTab } from './EmailCampaignsTab';
import { EmailCampaignEditorModal } from './EmailCampaignEditorModal';
import { EmailActivityLogsTab } from './EmailActivityLogsTab';
import { EmailSettingsTab } from './EmailSettingsTab';
import { EmailEventSimulatorModal } from './EmailEventSimulatorModal';

export function EmailManagementPage() {
  const { tab: urlTab } = useParams();
  const navigate = useNavigate();
  const { clinics = [], plans = [], showToast } = useApp();

  const [activeTab, setActiveTab] = useState(urlTab || 'dashboard');

  // Module State
  const [templates, setTemplates] = useState(() => emailService.getTemplates());
  const [triggers, setTriggers] = useState(() => emailService.getTriggers());
  const [campaigns, setCampaigns] = useState(() => emailService.getCampaigns());
  const [logs, setLogs] = useState(() => emailService.getActivityLogs());
  const [settings, setSettings] = useState(() => emailService.getSettings());

  // Modal States
<<<<<<< HEAD
  const [editingTemplate, setEditingTemplate] = useState(null);
=======
  const [editingTemplate, setEditingTemplate] = useState(null); // template obj or 'new'
>>>>>>> origin/main
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewSampleData, setPreviewSampleData] = useState({});
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [simulatorInitialKey, setSimulatorInitialKey] = useState('');

  // Keep URL in sync
  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/superadmin/email/${newTab}`);
  };

  // Template Handlers
  const handleSaveTemplate = (saved) => {
    emailService.saveTemplate(saved);
    setTemplates(emailService.getTemplates());
    setEditingTemplate(null);
    showToast(`Template "${saved.name}" saved successfully.`, 'success');
  };

  const handleToggleTemplateStatus = (tplId) => {
    const tpl = templates.find((t) => t.id === tplId);
    if (!tpl) return;
    const nextStatus = tpl.status === 'active' ? 'inactive' : 'active';
    emailService.saveTemplate({ ...tpl, status: nextStatus });
    setTemplates(emailService.getTemplates());
    showToast(`Template marked ${nextStatus}.`, 'info');
  };

  const handleDuplicateTemplate = (tplId) => {
    const copy = emailService.duplicateTemplate(tplId);
    if (copy) {
      setTemplates(emailService.getTemplates());
      showToast(`Duplicated as "${copy.name}".`, 'success');
    }
  };

  const handleDeleteTemplate = (tplId) => {
    emailService.deleteTemplate(tplId);
    setTemplates(emailService.getTemplates());
    showToast('Template deleted successfully.', 'info');
  };

  // Trigger Handlers
  const handleToggleTrigger = (triggerId) => {
    const updated = emailService.toggleTrigger(triggerId);
    if (updated) {
      setTriggers(emailService.getTriggers());
      showToast(
        `Trigger "${updated.name}" is now ${updated.enabled ? 'Enabled' : 'Disabled'}.`,
        updated.enabled ? 'success' : 'info'
      );
    }
  };

  const handleSaveTrigger = (trigger) => {
    emailService.saveTrigger(trigger);
    setTriggers(emailService.getTriggers());
    showToast(`Trigger "${trigger.name}" updated successfully.`, 'success');
  };

  const handleRunTestTrigger = (eventKey) => {
    setSimulatorInitialKey(eventKey);
    setSimulatorOpen(true);
  };

  // Campaign Handlers
  const handleSaveCampaign = (campaign) => {
    emailService.saveCampaign(campaign);
    setCampaigns(emailService.getCampaigns());
    setEditingCampaign(null);
    showToast(`Campaign "${campaign.name}" saved.`, 'success');
  };

  const handleExecuteCampaign = (campaignId) => {
    const res = emailService.executeCampaignSimulation(campaignId, clinics);
    if (res.success) {
      setCampaigns(emailService.getCampaigns());
      setLogs(emailService.getActivityLogs());
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  // Log Handlers
  const handleRetryLog = (logId) => {
    const res = emailService.retryActivityLog(logId);
    setLogs(emailService.getActivityLogs());
    showToast(res.message, res.success ? 'success' : 'error');
  };

  // Settings Handlers
  const handleSaveSettings = (newSettings) => {
    emailService.saveSettings(newSettings);
    setSettings(newSettings);
    showToast('Email system settings updated.', 'success');
  };

  const handleResetDemoData = () => {
    emailService.resetAllDemoData();
    setTemplates(emailService.getTemplates());
    setTriggers(emailService.getTriggers());
    setCampaigns(emailService.getCampaigns());
    setLogs(emailService.getActivityLogs());
    setSettings(emailService.getSettings());
    showToast('Reset all email demo data back to default state.', 'info');
  };

<<<<<<< HEAD
=======
  // Simulator Completion
>>>>>>> origin/main
  const handleSimulatorComplete = (res) => {
    setLogs(emailService.getActivityLogs());
    setTriggers(emailService.getTriggers());
    showToast(res.message, res.success ? 'success' : 'error');
  };

<<<<<<< HEAD
=======
  // Send Test Simulation from preview
>>>>>>> origin/main
  const handleSendTestFromPreview = (tpl) => {
    const res = emailService.simulateEventTrigger(tpl.associatedTriggerKey || 'feature.published', {
      recipientName: 'Test Administrator',
      recipientEmail: settings.testRecipientEmail
    });
    setLogs(emailService.getActivityLogs());
    showToast(`Test simulation dispatched to ${settings.testRecipientEmail}!`, 'success');
  };

  const tabs = [
    { id: 'dashboard', label: 'Email Dashboard', icon: LayoutDashboard },
    { id: 'templates', label: 'Templates', icon: FileText, count: templates.length },
    { id: 'triggers', label: 'Automated Triggers', icon: Zap, count: triggers.filter((t) => t.enabled).length },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone, count: campaigns.length },
    { id: 'logs', label: 'Activity Logs', icon: History, count: logs.length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Communications Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span>Email Template & Notification Hub</span>
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono">
              Prototype Simulator
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Communications Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Email Template & Notification Hub</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono">
              Prototype Simulator
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Manage automated event triggers, custom HTML/text templates, audience broadcast campaigns, and simulation logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSimulatorInitialKey('subscription.activated');
              setSimulatorOpen(true);
            }}
<<<<<<< HEAD
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            <Play className="w-4 h-4" />
=======
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
>>>>>>> origin/main
            <span>Event Simulator</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
<<<<<<< HEAD
      <div className="border-b border-slate-200 dark:border-slate-800">
=======
      <div className="border-b border-slate-200">
>>>>>>> origin/main
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-px" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
<<<<<<< HEAD
                className={`flex items-center gap-2 py-3.5 px-3.5 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40 rounded-t-xl'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
=======
                className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'
>>>>>>> origin/main
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content Panels */}
      <div>
        {activeTab === 'dashboard' && (
          <EmailDashboardTab
            templates={templates}
            triggers={triggers}
            campaigns={campaigns}
            logs={logs}
            onOpenSimulator={(eventKey) => {
              setSimulatorInitialKey(typeof eventKey === 'string' ? eventKey : 'subscription.activated');
              setSimulatorOpen(true);
            }}
            onOpenPreview={(log) => {
              setPreviewTemplate({
                id: log.templateId || 'preview',
                key: log.eventKey,
                name: log.templateName,
                subject: log.subject,
                htmlBody: log.renderedHtml || '<p>Simulated Content</p>',
                textBody: log.renderedText || 'Simulated Content'
              });
              setPreviewSampleData({
                hospital_name: log.clinicName,
                admin_name: log.recipientName,
                recipientEmail: log.recipientEmail
              });
            }}
            onRetryLog={handleRetryLog}
            onNavigateTab={handleTabChange}
          />
        )}

        {activeTab === 'templates' && (
          <EmailTemplatesTab
            templates={templates}
            triggers={triggers}
            onOpenCreate={() => setEditingTemplate({})}
            onOpenEdit={(tpl) => setEditingTemplate(tpl)}
            onOpenPreview={(tpl) => {
              setPreviewTemplate(tpl);
              setPreviewSampleData({});
            }}
            onDuplicate={handleDuplicateTemplate}
            onToggleStatus={handleToggleTemplateStatus}
            onDelete={handleDeleteTemplate}
            onSendTest={(tpl) => handleSendTestFromPreview(tpl)}
          />
        )}

        {activeTab === 'triggers' && (
          <EmailTriggersTab
            triggers={triggers}
            templates={templates}
            onToggleTrigger={handleToggleTrigger}
            onSaveTrigger={handleSaveTrigger}
            onRunTestTrigger={handleRunTestTrigger}
          />
        )}

        {activeTab === 'campaigns' && (
          <EmailCampaignsTab
            campaigns={campaigns}
            templates={templates}
            clinics={clinics}
            plans={plans}
            onOpenCreate={() => setEditingCampaign({})}
            onOpenEdit={(cmp) => setEditingCampaign(cmp)}
            onOpenPreview={(tpl, data) => {
              setPreviewTemplate(tpl);
              setPreviewSampleData(data || {});
            }}
            onExecuteSimulation={handleExecuteCampaign}
          />
        )}

        {activeTab === 'logs' && (
          <EmailActivityLogsTab
            logs={logs}
            onOpenPreview={(tpl, data) => {
              setPreviewTemplate(tpl);
              setPreviewSampleData(data || {});
            }}
            onRetryLog={handleRetryLog}
          />
        )}

        {activeTab === 'settings' && (
          <EmailSettingsTab
            settings={settings}
            onSaveSettings={handleSaveSettings}
            onResetDemoData={handleResetDemoData}
          />
        )}
      </div>

      {/* ========================================================= */}
      {/* MODALS */}
      {/* ========================================================= */}

      {/* Template Editor Modal */}
      {editingTemplate && (
        <EmailTemplateEditorModal
          isOpen={Boolean(editingTemplate)}
          onClose={() => setEditingTemplate(null)}
          template={editingTemplate?.id ? editingTemplate : null}
          existingTemplates={templates}
          triggers={triggers}
          onSave={handleSaveTemplate}
        />
      )}

      {/* Rendered Email Desktop / Mobile Preview Modal */}
      {previewTemplate && (
        <EmailPreviewModal
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          template={previewTemplate}
          sampleData={previewSampleData}
          onSendTest={handleSendTestFromPreview}
        />
      )}

      {/* Campaign Editor Modal */}
      {editingCampaign && (
        <EmailCampaignEditorModal
          isOpen={Boolean(editingCampaign)}
          onClose={() => setEditingCampaign(null)}
          campaign={editingCampaign?.id ? editingCampaign : null}
          templates={templates}
          clinics={clinics}
          plans={plans}
          onSave={handleSaveCampaign}
        />
      )}

      {/* Lifecycle Event Simulator Modal */}
      {simulatorOpen && (
        <EmailEventSimulatorModal
          isOpen={simulatorOpen}
          onClose={() => setSimulatorOpen(false)}
          initialEventKey={simulatorInitialKey}
          triggers={triggers}
          clinics={clinics}
          onSimulationComplete={handleSimulatorComplete}
        />
      )}
    </div>
  );
}
