<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Stethoscope,
  Pill,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  X,
  CheckCircle2,
  Trash2,
  RotateCcw,
  User,
  MessageSquare
} from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { useApp } from '../../context/AppContext';

export function AIPreviewAssistant() {
  const { activeClinic, doctors = [], patients = [], appointments = [], plans = [] } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('chat'); // 'chat' | 'scenarios'
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Chat message history
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'msg-init-1',
      sender: 'ai',
      text: `Hello! I am ClinicOS AI, your specialized healthcare practice copilot. I can assist with clinical prescription guidance, consultation summarization, OPD queue bottleneck resolution, or subscription tier advice.\n\nHow can I help ${activeClinic?.name || 'your clinic'} today?`,
      timestamp: 'Just now'
    }
  ]);

  // Pre-configured clinical scenarios for reference
  const [selectedScenario, setSelectedScenario] = useState('dental_pain');
  const scenarios = {
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
    pediatric_crowding: {
      title: 'Pediatric Dental Crowding Case',
      rawNotes: 'Pt 9F Ananya Shah. Class II Div 1 malocclusion. Anterior deep bite 60%. Premature loss of 75, space loss noted. High caries risk index.',
      summary: {
        assessment: 'Developing Angle Class II Malocclusion with Space Deficiency',
        plan: 'Fabricate band and loop space maintainer for 75 quadrant. Initiate Phase-1 myofunctional appliance assessment in 6 months.',
        precautions: 'Topical fluoride varnish application (5% NaF). Diet counseling regarding fermentable sugars.',
        suggestedRx: ['Fluoride Toothpaste (1000 ppm) BD', 'Oral Probiotics Lozenges OD x 30d']
      }
    },
    bottleneck_ops: {
      title: 'Front-Desk Queue & Follow-up Optimization',
      rawNotes: 'OPD reception wait times spiking between 10:30 AM and 12:00 PM. 3 post-op patients pending 48h check.',
      summary: {
        assessment: 'Peak morning congestion due to concurrent walk-ins and scheduled arrivals',
        plan: 'Trigger automated WhatsApp recovery surveys at 02:00 PM and enable 30-second Express Walk-in token mode.',
        precautions: 'Designate secondary triage desk for return review visits.',
        suggestedRx: ['Automated WhatsApp Reminder', 'Queue Token Express Mode']
=======
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
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      }
    }
  };

<<<<<<< HEAD
  // Scroll to bottom on new message
  useEffect(() => {
    if (activeMode === 'chat' && isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping, activeMode, isOpen]);

  // AI Response Generator
  const generateAIResponse = (userPrompt) => {
    const p = userPrompt.toLowerCase();

    // 1. Prescription & Dosage queries
    if (p.includes('augmentin') || p.includes('antibiotic') || p.includes('amoxicillin')) {
      return `💊 **Augmentin 625mg (Amoxicillin 500mg + Clavulanic Acid 125mg)**\n\n• **Standard Adult Dosage:** 1 tablet orally every 8 hours (TDS) for 5 to 7 days.\n• **Administration:** Take strictly at the start of a meal to enhance absorption and minimize GI irritation.\n• **Clinical Indications:** Odontogenic infections, acute sinusitis, respiratory tract infections, and post-surgical prophylaxis.\n• **Patient Advice:** Complete full prescribed course even if symptoms subside. Contraindicated in patients with penicillin hypersensitivity.`;
    }

    if (p.includes('ketorol') || p.includes('pain') || p.includes('analgesic') || p.includes('paracetamol')) {
      return `💉 **Analgesic & Anti-Inflammatory Guidance**\n\n• **Ketorol-DT 10mg (Dispersible):** Dissolve 1 tablet in 15-30ml water only when pain is severe (SOS). Maximum 40mg/day, strictly limited to 5 consecutive days. Do not administer on an empty stomach.\n• **Paracetamol (650mg):** 1 tablet TDS/QDS for mild to moderate pain or fever relief. Maximum 3000mg/day.\n• **Precautions:** In elderly patients or those with gastric ulceration history, co-prescribe a proton-pump inhibitor (e.g. Pantoprazole 40mg OD).`;
    }

    // 2. Queue Bottlenecks & Front Desk
    if (p.includes('queue') || p.includes('wait') || p.includes('bottleneck') || p.includes('reception')) {
      return `⚡ **Clinic Queue & OPD Bottleneck Optimization**\n\n• **Peak Congestion Window:** Analysis shows maximum walk-in load occurs between 10:30 AM – 12:00 PM (averaging 24 mins wait time).\n• **Recommended Solutions:**\n  1. **Express Token Check-In:** Use the Reception Walk-In module for rapid 30-second registration without manual paper forms.\n  2. **Automated WhatsApp 24h & 2h Reminders:** Pre-confirm arrival times to stagger appointment slots.\n  3. **Doctor Rota Buffering:** Introduce a 10-minute administrative grace buffer between consultation batches.`;
    }

    // 3. Plans & Subscription Upgrades
    if (p.includes('plan') || p.includes('upgrade') || p.includes('discount') || p.includes('pricing') || p.includes('subscription')) {
      return `🏷️ **ClinicOS SaaS Subscription & Upgrade Intelligence**\n\n• **Current Active Clinic:** ${activeClinic?.name || 'CityCare Clinic'}\n• **Available Tiers:**\n  - **Starter Clinic:** Up to 2 Doctors · 1 Branch (15% OFF, ₹2,499/mo)\n  - **Growth Practice:** Up to 5 Doctors · 2 Branches (20% OFF, ₹4,499/mo)\n  - **Professional:** Up to 10 Doctors · 3 Branches · Full WhatsApp Webhooks (25% OFF, ₹6,999/mo)\n  - **Enterprise:** Unlimited Doctors · 10 Branches · Bed Occupancy Tracker (30% OFF, ₹14,999/mo)\n\n⚡ **Instant Upgrade Policy:** Doctors can upgrade at any time from the **SaaS Subscription** page. Upgrades take effect immediately upon simulated payment with zero admin approval required!`;
    }

    // 4. Specific Patient Queries
    if (p.includes('aarav') || p.includes('patel')) {
      return `👤 **Patient Summary: Aarav Patel (34M · ID: PT-1042)**\n\n• **Primary Diagnosis:** Acute Irreversible Pulpitis #46 with Symptomatic Apical Periodontitis.\n• **Active Appointment:** APT-2601 on 28 Oct 2026 at 10:30 AM with Dr. Arvind Rao.\n• **Treatment Plan:** Single-visit Endodontic Therapy (RCT) followed by monolithic zirconia crown.\n• **Medications Prescribed:** Augmentin 625mg TDS x 5d, Ketorol-DT 10mg SOS x 3d, Chlorhexidine 0.2% mouthwash.`;
    }

    if (p.includes('whatsapp') || p.includes('template') || p.includes('reminder')) {
      return `📱 **WhatsApp Communication Automation**\n\n• **Active Templates:** Booking Confirmation, 24-Hour Reminder, Rescheduled Alert, Cancellation Notice, Digital Rx QR Link, Post-Op Recovery Check, and Invoice Receipt.\n• **Customization:** Navigate to **WhatsApp Messaging** in the sidebar to customize message wording and variables (e.g. \`{{patient_name}}\`, \`{{appointment_time}}\`, \`{{prescription_link}}\`).\n• **Simulated Dispatch:** Real-time test dispatches can be triggered with one click.`;
    }

    if (p.includes('doctor') || p.includes('staff')) {
      return `🩺 **Doctor & Workforce Overview**\n\n• Your clinic currently has **${doctors.length} active doctors** onboarded in the roster.\n• Available Specialties: Dentistry, Orthopedics, General Medicine, Pediatrics, and Dermatology.\n• To adjust consultation fees, slot durations (15m/30m), or weekly days of availability, visit the **Doctor Management** page in your sidebar.`;
    }

    // Default intelligent clinical response
    return `🤖 **ClinicOS Clinical Analysis**\n\nRegarding "${userPrompt}":\n\n1. **Clinical Recommendation:** Ensure patient vital signs (BP, Pulse, SpO2) are recorded during consultation before dispensing digital prescriptions.\n2. **Front-Desk Workflow:** Utilize the automated WhatsApp notification triggers in your sidebar to keep the patient informed of their status.\n3. **Compliance:** All digital prescriptions generated in ClinicOS include cryptographic QR verification for public pharmacy validation.\n\nWould you like me to draft a prescription explanation, summarize a patient chart, or help with queue scheduling?`;
  };

  // Handle Send Message
  const handleSendMessage = (textToSend = inputMessage) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsAiTyping(true);

    setTimeout(() => {
      const aiReplyText = generateAIResponse(text);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 450);
  };

  const handleQuickPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'ai',
        text: `Chat history cleared. How can I assist you with clinical, operational, or prescription queries today?`,
        timestamp: 'Just now'
      }
    ]);
=======
  const handleRunDemo = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOutputGenerated(true);
    }, 400);
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
<<<<<<< HEAD
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-blue-400/30 select-none group hover:scale-105 active:scale-95"
        title="Open Interactive ClinicOS AI Medical Assistant"
      >
        <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
        <span className="font-bold tracking-tight">ClinicOS AI</span>
        <Badge variant="teal" size="sm" className="hidden sm:inline-flex bg-blue-800/80 text-white border-0 text-[10px] py-0 px-1.5">
          Copilot
        </Badge>
=======
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-xs px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer border border-blue-400/30"
        title="Open ClinicOS Deterministic AI Experience Preview"
      >
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>ClinicOS AI Assistant</span>
        <Badge variant="teal" size="sm" className="bg-blue-700/60 text-white border-0 text-[10px]">Preview</Badge>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      </button>

      {/* Modal / Slide-over Drawer */}
      {isOpen && (
<<<<<<< HEAD
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl overflow-hidden flex flex-col h-[85vh] max-h-[800px]">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-white tracking-tight">
                      ClinicOS AI Medical Copilot
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                      Interactive
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Clinical pharmacology, Rx dosage translator, front-desk queue triage, and practice intelligence.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeMode === 'chat' && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Clear Chat History"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Clear</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 pt-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveMode('chat')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeMode === 'chat'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>Interactive AI Chat (Ask Anything)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('scenarios')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeMode === 'scenarios'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Clinical Case Scenarios</span>
              </button>
            </div>

            {/* MODE 1: INTERACTIVE AI CHAT */}
            {activeMode === 'chat' && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-900/40">
                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 text-xs ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 space-y-1.5 shadow-2xs ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed text-[13px]">{msg.text}</p>
                        <div
                          className={`text-[10px] text-right ${
                            msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isAiTyping && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 animate-bounce" />
                      </div>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-100" />
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-200" />
                        </span>
                        <span>ClinicOS AI is analyzing clinical records & guidelines...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Quick Suggestion Chips */}
                <div className="p-2 sm:px-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                    Ask:
                  </span>
                  {[
                    'Prescription dosage for Augmentin 625mg',
                    'How to resolve peak morning queue rush?',
                    'Summarize Aarav Patel clinical notes',
                    'Compare Growth vs Professional plan limits',
                    'Draft a WhatsApp post-procedure follow-up'
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickPrompt(chip)}
                      className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ask ClinicOS AI about dosages, patient summaries, queue, or plans..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      disabled={isAiTyping}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={!inputMessage.trim() || isAiTyping}
                      icon={Send}
                      className="bg-blue-600 hover:bg-blue-700 shrink-0 font-bold"
                    >
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* MODE 2: CLINICAL CASE SCENARIOS */}
            {activeMode === 'scenarios' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'dental_pain', label: 'Endodontic Pulpitis (34M)' },
                    { id: 'pediatric_crowding', label: 'Pediatric Crowding (9F)' },
                    { id: 'bottleneck_ops', label: 'OPD Queue Bottleneck' }
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setSelectedScenario(sc.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        selectedScenario === sc.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>

                {/* Scenario Details */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Doctor Raw Consultation Notes:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-mono bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    "{scenarios[selectedScenario]?.rawNotes}"
                  </p>
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900 space-y-3">
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider block">
                    AI Clinical Synthesis & Assessment:
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {scenarios[selectedScenario]?.summary.assessment}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Treatment Plan:</strong> {scenarios[selectedScenario]?.summary.plan}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Clinical Precautions:</strong> {scenarios[selectedScenario]?.summary.precautions}
                  </p>

                  <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Suggested Clinical Prescription:
                    </span>
                    <div className="space-y-1">
                      {scenarios[selectedScenario]?.summary.suggestedRx.map((rx, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{rx}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={MessageSquare}
                      onClick={() => {
                        setActiveMode('chat');
                        handleSendMessage(
                          `Can you give me detailed patient counseling instructions for: ${scenarios[selectedScenario]?.title}?`
                        );
                      }}
                    >
                      Ask AI About This Case in Chat →
                    </Button>
                  </div>
                </div>
              </div>
            )}
=======
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
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          </div>
        </div>
      )}
    </>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
