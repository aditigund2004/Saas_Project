import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bot, Stethoscope, Pill, TrendingUp, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

export function AIPreviewAssistant({ defaultTab = 'clinical' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedScenario, setSelectedScenario] = useState('dental_pain');
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputGenerated, setOutputGenerated] = useState(true);

  // Drag & drop floating circle position state
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false
  });

  // Initialize position to bottom-right or restored session coordinate
  useEffect(() => {
    const initX = Math.max(16, window.innerWidth - 76);
    const initY = Math.max(16, window.innerHeight - 84);

    try {
      const saved = sessionStorage.getItem('clinicos_ai_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          setPosition({
            x: Math.max(12, Math.min(window.innerWidth - 68, parsed.x)),
            y: Math.max(12, Math.min(window.innerHeight - 68, parsed.y))
          });
          return;
        }
      }
    } catch {
      // ignore JSON parse or storage restrictions
    }

    setPosition({ x: initX, y: initY });
  }, []);

  // Keep circle clamped within viewport on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return prev;
        return {
          x: Math.max(12, Math.min(window.innerWidth - 68, prev.x)),
          y: Math.max(12, Math.min(window.innerHeight - 68, prev.y))
        };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle pointer down (mouse click or touch) for drag vs click
  const handlePointerDown = (e) => {
    // Only handle primary click
    if (e.button !== undefined && e.button !== 0) return;

    const currentX = position ? position.x : (window.innerWidth - 76);
    const currentY = position ? position.y : (window.innerHeight - 84);

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentX,
      initialY: currentY,
      hasMoved: false
    };

    const handlePointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;

      // Small threshold (4px) to separate accidental jitter from intentional drag
      if (!dragRef.current.hasMoved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        dragRef.current.hasMoved = true;
        setIsDragging(true);
      }

      if (dragRef.current.hasMoved) {
        moveEvent.preventDefault();
        const nextX = Math.max(12, Math.min(window.innerWidth - 68, dragRef.current.initialX + dx));
        const nextY = Math.max(12, Math.min(window.innerHeight - 68, dragRef.current.initialY + dy));
        setPosition({ x: nextX, y: nextY });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      if (dragRef.current.hasMoved) {
        setIsDragging(false);
        // Persist final position in sessionStorage
        setPosition((curr) => {
          if (curr) {
            try {
              sessionStorage.setItem('clinicos_ai_pos', JSON.stringify(curr));
            } catch {}
          }
          return curr;
        });
      } else {
        // Pure click without dragging -> open AI assistant drawer
        setIsOpen(true);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  // Lock body scroll when AI assistant drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
      {/* Reduced-size, Moveable Blinking Circle AI Assistant Launcher */}
      <div
        onPointerDown={handlePointerDown}
        style={
          position
            ? { left: `${position.x}px`, top: `${position.y}px` }
            : { right: '24px', bottom: '24px' }
        }
        className={`fixed z-50 group select-none touch-none ${
          isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab'
        } transition-transform duration-150`}
        aria-label="ClinicOS AI Assistant Launcher (Click to open, Drag to move)"
        role="button"
        tabIndex={0}
      >
        {/* Outer Blinking & Breathing Glowing Halo */}
        <span className="absolute -inset-1 rounded-full animate-ai-ping bg-cyan-400/40 pointer-events-none" />
        <span className="absolute -inset-2 rounded-full bg-blue-500/20 blur-xs animate-pulse pointer-events-none" />

        {/* Compact Blinking Circular Button */}
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 border-2 border-white/70 dark:border-cyan-300/70 shadow-lg animate-ai-beacon flex items-center justify-center text-white">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md text-white animate-pulse" />

          {/* Small pulsing live AI beacon dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs" />
          </span>
        </div>

        {/* Hover Tooltip (reveals on hover when not dragging) */}
        {!isDragging && (
          <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap bg-slate-900/95 dark:bg-slate-800/95 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ClinicOS AI Assistant</span>
            <span className="text-[9.5px] text-slate-400 border-l border-slate-700 pl-1.5">
              Click · Drag to move
            </span>
          </div>
        )}
      </div>

      {/* Modal / Slide-over Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 w-full h-full min-h-dvh z-[70] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] cursor-default"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
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
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feature Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 gap-2 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('clinical'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'clinical'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Clinical Notes Summary
              </button>
              <button
                onClick={() => { setActiveTab('patient_rx'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'patient_rx'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Pill className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Patient Rx Translator
              </button>
              <button
                onClick={() => { setActiveTab('operations'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'operations'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Clinic Ops Advisor
              </button>
              <button
                onClick={() => { setActiveTab('saas_business'); setOutputGenerated(true); }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'saas_business'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                SaaS Revenue Insights
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-800 dark:text-slate-200">
              {/* Notice */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-2.5 text-xs text-amber-850 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Demonstration Notice:</strong> Deterministic mock preview for SaaS product evaluation. No patient data is transmitted to external cloud APIs or LLM services. Never use for actual medical diagnoses.
                </div>
              </div>

              {activeTab === 'clinical' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Sample Clinical Notes Input:</span>
                    <select
                      value={selectedScenario}
                      onChange={(e) => setSelectedScenario(e.target.value)}
                      className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
                    >
                      <option value="dental_pain">Case 1: Severe Endodontic Toothache</option>
                      <option value="ortho_checkup">Case 2: Pediatric Malocclusion Check</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 dark:bg-slate-950 text-emerald-300 font-mono text-xs border border-slate-800 leading-relaxed">
                    {scenarios.clinical[selectedScenario]?.rawNotes}
                  </div>

                  <div className="flex justify-end">
                    <Button variant="primary" size="sm" onClick={handleRunDemo} disabled={isProcessing}>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      {isProcessing ? 'Synthesizing...' : 'Draft Structured Clinical Summary'}
                    </Button>
                  </div>

                  {outputGenerated && (
                    <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 space-y-3">
                      <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/40 pb-2">
                        <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          Generated Clinical Assessment & Plan
                        </span>
                        <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold uppercase">Deterministic Output</span>
                      </div>
                      <div className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
                        <div>
                          <strong className="text-blue-950 dark:text-blue-300">Assessment: </strong>
                          {scenarios.clinical[selectedScenario]?.summary.assessment}
                        </div>
                        <div>
                          <strong className="text-blue-950 dark:text-blue-300">Treatment Plan: </strong>
                          {scenarios.clinical[selectedScenario]?.summary.plan}
                        </div>
                        <div>
                          <strong className="text-blue-950 dark:text-blue-300">Clinical Precautions: </strong>
                          {scenarios.clinical[selectedScenario]?.summary.precautions}
                        </div>
                        <div>
                          <strong className="text-blue-950 dark:text-blue-300">Suggested Drug Presets: </strong>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {scenarios.clinical[selectedScenario]?.summary.suggestedRx.map((rx, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/60 text-[11px] font-mono text-slate-700 dark:text-slate-300">
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
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Converts complex medical prescription abbreviations into patient-friendly daily instructions for SMS, WhatsApp, and the Patient Portal:
                  </div>

                  <div className="space-y-2.5">
                    {scenarios.patient_rx.dental_pain.explanation.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-950 dark:text-indigo-300">{item.drug}</span>
                          <span className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-900/50 px-2 py-0.5 rounded-full">
                            {item.purpose}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[12px] pt-1">
                          👉 <strong>How to take:</strong> {item.directions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'operations' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Operational Bottleneck & Follow-up Recommendations:</span>
                  <div className="space-y-2">
                    {scenarios.operations.bottleneck.insights.map((insight, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                        <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
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
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Automated SaaS Growth & Retention Intelligence:</span>
                  <div className="space-y-2">
                    {scenarios.saas_business.mrr_insights.insights.map((insight, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                        <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                        <p>{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
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
