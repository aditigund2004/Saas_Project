import React, { useEffect, useState } from 'react';
import { Sparkles, Bot, Stethoscope, Pill, TrendingUp, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { useApp } from '../../context/AppContext';

const ROLE_EXPERIENCES = {
  super_admin: {
    title: 'Platform operations preview',
    tabs: ['saas_business']
  },
  clinic_admin: {
    title: 'Clinic operations preview',
    tabs: ['clinical', 'operations']
  },
  receptionist: {
    title: 'Front desk preview',
    tabs: ['operations']
  },
  patient: {
    title: 'Patient portal guide',
    tabs: ['patient_rx']
  }
};

const TAB_LABELS = {
  clinical: 'Clinical Notes Preview',
  patient_rx: 'Patient Portal Guide',
  operations: 'Clinic Operations',
  saas_business: 'Platform Insights'
};

export function AIPreviewAssistant() {
  const { currentRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const roleExperience = ROLE_EXPERIENCES[currentRole] || ROLE_EXPERIENCES.patient;
  const [activeTab, setActiveTab] = useState(roleExperience.tabs[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const scenarios = {
    clinical: {
      rawNotes: 'Synthetic example: visit date, chief concern, examination findings, clinician assessment, and follow-up fields.',
      summary: {
        assessment: 'Clinician-entered assessment field',
        plan: 'Clinician-entered care plan field',
        precautions: 'Clinician-entered follow-up and precaution field'
      }
    },
    operations: {
      bottleneck: {
        title: 'Synthetic workflow examples',
        insights: [
          'Sample queue view: review check-in status and route patients to the appropriate clinic team.',
          'Sample follow-up task: staff can review due reminders and contact patients using approved clinic workflows.',
          'No messages are sent and no patient records are processed by this preview.'
        ]
      }
    },
    saas_business: {
      mrr_insights: {
        title: 'SaaS Revenue & Tenant Health Insights',
        insights: [
          'Example platform metric: recurring revenue summaries can be reviewed by authorized platform administrators.',
          'Example subscription insight: plans and tenant status can be compared in platform reports.',
          'This preview contains synthetic examples, not live tenant or billing data.'
        ]
      }
    }
  };

  const visibleTab = roleExperience.tabs.includes(activeTab) ? activeTab : roleExperience.tabs[0];

  const handleRunDemo = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex min-h-10 items-center gap-2 rounded-full border border-blue-500/20 bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:bottom-6 sm:right-6 sm:px-4"
        title="Open ClinicOS experience preview"
        aria-label="Open experience preview"
        aria-haspopup="dialog"
      >
        <Sparkles className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">ClinicOS Guide</span>
        <span className="rounded-full bg-blue-700/60 px-2 py-0.5 text-[10px] text-white font-medium">Demo</span>
      </button>

      {/* Modal / Slide-over Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-2 backdrop-blur-xs sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-preview-title"
            className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[90vh]"
          >
            {/* Header - Light, soothing, professional */}
            <div className="flex items-start justify-between gap-3 bg-white border-b border-slate-100 p-4 sm:p-5">
              <div className="flex min-w-0 items-start gap-3">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:flex">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 id="experience-preview-title" className="text-base font-bold text-slate-900">ClinicOS Experience Preview</h3>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                      Interactive Prototype
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {roleExperience.title}. Clinical workflows and live data simulation.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-600"
                aria-label="Close experience preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feature Tabs */}
            <div className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-slate-50 px-3 sm:px-4">
              {roleExperience.tabs.map((tab) => {
                const TabIcon = tab === 'clinical' ? Stethoscope : tab === 'patient_rx' ? Pill : tab === 'operations' ? TrendingUp : Bot;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                      visibleTab === tab
                        ? 'border-blue-600 bg-white text-blue-700'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                    aria-current={visibleTab === tab ? 'page' : undefined}
                  >
                    <TabIcon className="h-4 w-4" />
                    {TAB_LABELS[tab]}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-5">
              {/* Notice */}
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div>
                  <strong>Demonstration Notice:</strong> All content shown here is synthetic and does not represent live platform, clinic, or patient data. This preview does not provide clinical advice or send messages.
                </div>
              </div>

              {visibleTab === 'clinical' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                    <span className="mb-1 block font-bold text-slate-800">Synthetic note structure</span>
                    {scenarios.clinical.rawNotes}
                  </div>

                  <div className="flex justify-end">
                    <Button variant="primary" size="sm" onClick={handleRunDemo} disabled={isProcessing}>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      {isProcessing ? 'Preparing preview...' : 'Preview note structure'}
                    </Button>
                  </div>

                  <Card className="p-4 bg-blue-50/50 border-blue-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                      <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        Sample structured fields
                      </span>
                      <span className="text-[10px] text-blue-700 font-semibold uppercase">Demo only</span>
                    </div>
                    <div className="text-xs space-y-2 text-slate-800">
                      <div>
                        <strong className="text-blue-950">Assessment: </strong>
                        {scenarios.clinical.summary.assessment}
                      </div>
                      <div>
                        <strong className="text-blue-950">Care plan: </strong>
                        {scenarios.clinical.summary.plan}
                      </div>
                      <div>
                        <strong className="text-blue-950">Follow-up: </strong>
                        {scenarios.clinical.summary.precautions}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {visibleTab === 'patient_rx' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800">Your health information stays in your portal</h4>
                  <p className="text-xs leading-relaxed text-slate-600">
                    Use the authenticated patient portal to view records and prescriptions provided by your clinic. This sample does not display personal medical information or interpret medication instructions.
                  </p>
                </div>
              )}

              {visibleTab === 'operations' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800">Operational Bottleneck & Follow-up Recommendations:</span>
                  <div className="space-y-2">
                    {scenarios.operations.bottleneck.insights.map((insight, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-2.5 text-xs text-slate-800">
                        <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p>{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {visibleTab === 'saas_business' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800">Automated SaaS Growth & Retention Intelligence:</span>
                  <div className="space-y-2">
                    {scenarios.saas_business.mrr_insights.insights.map((insight, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 flex items-start gap-2.5 text-xs text-slate-800">
                        <Bot className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <p>{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <span>ClinicOS · Synthetic frontend preview</span>
              <Button variant="secondary" size="sm" onClick={() => setIsOpen(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
