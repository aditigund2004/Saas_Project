import React, { useState } from 'react';
import { Sparkles, Bot, Stethoscope, Pill, TrendingUp, AlertTriangle, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

export function AIPreviewAssistant({ defaultTab = 'clinical' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedScenario, setSelectedScenario] = useState('dental_pain');
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputGenerated, setOutputGenerated] = useState(true);

  const scenarios = {
    clinical: {
      dental_pain: {
        title: 'Endodontic Acute Pulpitis Case',
        rawNotes: 'Pt 34M Aarav Patel. Severe pain lower R jaw #46 x3 days. Aggravated by cold, biting. Percussion ++. Cold test lingered 30s. Deep caries disto-occlusal.',
        summary: {
          assessment: 'Acute Irreversible Pulpitis #46 with Symptomatic Apical Periodontitis',
          plan: 'Single-visit Endodontic Therapy (RCT) under 2% Lignocaine with 1:100k Adrenaline followed by Composite Core & Monolithic Zirconia Crown.',
          precautions: 'Monitor for vestibular swelling. Avoid hard chewing on right quadrant until crown cementation.',
          suggestedRx: ['Augmentin 625mg TDS x 5d', 'Ketorol-DT 10mg SOS x 3d', 'Chlorhexidine 0.2% Rinse BD x 7d']
        }
      },
      ortho_checkup: {
        title: 'Pediatric Dental Crowding Case',
        rawNotes: 'Pt 9F Ananya Shah. Class II Div 1 malocclusion. Anterior deep bite 60%. Premature loss of 75, space loss noted. High caries risk index.',
        summary: {
          assessment: 'Developing Angle Class II Malocclusion with Space Deficiency',
          plan: 'Fabricate band and loop space maintainer for 75 quadrant. Initiate Phase-1 myofunctional appliance assessment in 6 months.',
          precautions: 'Topical fluoride varnish application (5% NaF). Diet counseling regarding fermentable sugars.',
          suggestedRx: ['Fluoride Toothpaste (1000 ppm) BD', 'Oral Probiotics Lozenges OD x 30d']
        }
      }
    },
    patient_rx: {
      dental_pain: {
        title: 'Patient-Friendly Explanation for Augmentin + Ketorol',
        explanation: [
          { drug: 'Augmentin 625mg', purpose: 'Antibiotic to kill tooth root bacteria', directions: 'Take 1 tablet every 8 hours strictly after breakfast, lunch, and dinner. Complete all 5 days even if pain stops.' },
          { drug: 'Ketorol-DT 10mg', purpose: 'Fast-acting anti-inflammatory pain reliever', directions: 'Dissolve 1 tablet in 2 tablespoons of water only when pain is severe. Do not take on an empty stomach.' },
          { drug: 'Chlorhexidine 0.2%', purpose: 'Antiseptic germ-kill mouthrinse', directions: 'Swish 10ml undiluted in mouth for 60 seconds after brushing, then spit out. Do not eat or drink for 30 minutes.' }
        ]
      }
    },
    operations: {
      bottleneck: {
        title: 'Front-Desk Queue & Follow-up Optimization',
        insights: [
          'Peak OPD bottleneck detected between 10:30 AM – 12:00 PM (average wait time reaches 26 minutes vs 12 minutes afternoon target).',
          '3 post-op root canal patients due for 48-hour follow-up check today: Aarav Patel, Meera Deshmukh, Rohan Kulkarni.',
          'Recommendation: Dispatch automated WhatsApp post-op recovery check at 02:00 PM to triage pain scores before evening walk-in peak.'
        ]
      }
    },
    saas_business: {
      mrr_insights: {
        title: 'SaaS Revenue & Tenant Health Insights',
        insights: [
          'MRR Trajectory: ₹1,53,978 (+14.2% MoM growth driven by 4 new Professional clinic onboarding conversions).',
          'Expansion Opportunity: 3 Starter tier dental clinics have reached 90% doctor seat limits (eligible for automated Growth/Pro upgrade nudge).',
          'Zero churn observed in clinics with WhatsApp notification webhooks enabled (99.2% 90-day retention rate).'
        ]
      }
    }
  };

  const handleRunDemo = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOutputGenerated(true);
    }, 400);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-xs px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer border border-blue-400/30"
        title="Open ClinicOS Deterministic AI Experience Preview"
      >
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>ClinicOS AI Assistant</span>
        <Badge variant="teal" size="sm" className="bg-blue-700/60 text-white border-0 text-[10px]">Preview</Badge>
      </button>

      {/* Modal / Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">ClinicOS AI Experience Preview</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                      Synthetic Demo
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Deterministic simulation of clinical summarization, patient Rx translation, and clinic ops intelligence.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feature Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 gap-2 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('clinical'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'clinical'
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-blue-600" />
                Clinical Notes Summary
              </button>
              <button
                onClick={() => { setActiveTab('patient_rx'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'patient_rx'
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Pill className="w-4 h-4 text-indigo-600" />
                Patient Rx Translator
              </button>
              <button
                onClick={() => { setActiveTab('operations'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'operations'
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Clinic Ops Advisor
              </button>
              <button
                onClick={() => { setActiveTab('saas_business'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'saas_business'
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bot className="w-4 h-4 text-purple-600" />
                SaaS Revenue Insights
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Demonstration Notice:</strong> Deterministic mock preview for SaaS product evaluation. No patient data is transmitted to external cloud APIs or LLM services. Never use for actual medical diagnoses.
                </div>
              </div>

              {activeTab === 'clinical' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Sample Clinical Notes Input:</span>
                    <select
                      value={selectedScenario}
                      onChange={(e) => setSelectedScenario(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 bg-white text-slate-700 font-medium"
                    >
                      <option value="dental_pain">Case 1: Severe Endodontic Toothache</option>
                      <option value="ortho_checkup">Case 2: Pediatric Malocclusion Check</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs border border-slate-800 leading-relaxed">
                    {scenarios.clinical[selectedScenario]?.rawNotes}
                  </div>

                  <div className="flex justify-end">
                    <Button variant="primary" size="sm" onClick={handleRunDemo} disabled={isProcessing}>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      {isProcessing ? 'Synthesizing...' : 'Draft Structured Clinical Summary'}
                    </Button>
                  </div>

                  {outputGenerated && (
                    <Card className="p-4 bg-blue-50/50 border-blue-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                        <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          Generated Clinical Assessment & Plan
                        </span>
                        <span className="text-[10px] text-blue-700 font-semibold uppercase">Deterministic Output</span>
                      </div>
                      <div className="text-xs space-y-2 text-slate-800">
                        <div>
                          <strong className="text-blue-950">Assessment: </strong>
                          {scenarios.clinical[selectedScenario]?.summary.assessment}
                        </div>
                        <div>
                          <strong className="text-blue-950">Treatment Plan: </strong>
                          {scenarios.clinical[selectedScenario]?.summary.plan}
                        </div>
                        <div>
                          <strong className="text-blue-950">Clinical Precautions: </strong>
                          {scenarios.clinical[selectedScenario]?.summary.precautions}
                        </div>
                        <div>
                          <strong className="text-blue-950">Suggested Drug Presets: </strong>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {scenarios.clinical[selectedScenario]?.summary.suggestedRx.map((rx, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-[11px] font-mono text-slate-700">
                                {rx}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'patient_rx' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-600">
                    Converts complex medical prescription latin abbreviations (e.g. <em>Augmentin 625mg TDS PC</em>) into patient-friendly daily instructions for SMS, WhatsApp, and the Patient Portal:
                  </div>

                  <div className="space-y-2.5">
                    {scenarios.patient_rx.dental_pain.explanation.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-950">{item.drug}</span>
                          <span className="text-[11px] font-medium text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                            {item.purpose}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-[12px] pt-1">
                          👉 <strong>How to take:</strong> {item.directions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'operations' && (
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

              {activeTab === 'saas_business' && (
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
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>ClinicOS Healthcare SaaS · Interactive Frontend Prototype</span>
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

