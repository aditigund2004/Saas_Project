import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  MessageSquare,
  Send,
  Clock,
  ShieldAlert,
  Receipt,
  FileText,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  Plus,
  HelpCircle,
  User,
  CheckCheck,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  PhoneCall,
  RotateCcw
} from 'lucide-react';
import { QUERY_RESPONSE_EXPECTATIONS, EMERGENCY_GUIDANCE_TEXT } from '../../demo-data/queriesData';
import { PatientEmergencyModal } from './PatientEmergencyModal';

const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'shortness of breath',
  'breathless',
  'cannot breathe',
  'choking',
  'bleeding heavily',
  'unconscious',
  'fainted',
  'paralysis',
  'stroke',
  'severe burn',
  'poison',
  'suicide'
];

export function PatientQueriesPage() {
  const [searchParams] = useSearchParams();
  const selectedQueryIdParam = searchParams.get('selected');

  const {
    currentUser,
    patients = [],
    patientQueries = [],
    createPatientQuery,
    replyToPatientQuery,
    resolvePatientQuery,
    simulateStaffReply,
    invoices = [],
    prescriptions = [],
    activeClinic
  } = useApp();

  const initialCategory = searchParams.get('category');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(
    initialCategory === 'Billing' || initialCategory === 'Bill'
      ? 'Bill'
      : initialCategory?.includes('Prescription')
      ? 'Prescription'
      : 'All'
  );
  const [selectedQueryId, setSelectedQueryId] = useState(
    selectedQueryIdParam || patientQueries[0]?.id || ''
  );
  const [replyText, setReplyText] = useState('');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isNewQueryModalOpen, setIsNewQueryModalOpen] = useState(false);

  // New query form state
  const [newCategory, setNewCategory] = useState('Prescription Clarification');
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newRelatedType, setNewRelatedType] = useState('none');
  const [newRelatedId, setNewRelatedId] = useState('');

  // Patient security boundary (filter queries for Aarav Patel in demo)
  const currentPatient =
    patients.find((p) => p.name === currentUser?.name || p.id === 'pt-1041') || patients[0];

  const myQueries = patientQueries.filter(
    (q) => q.patientId === 'pt-1041' || q.patientId === currentUser?.id
  );

  // Update selected query if param changes
  useEffect(() => {
    if (selectedQueryIdParam) {
      setSelectedQueryId(selectedQueryIdParam);
    } else if (!selectedQueryId && myQueries.length > 0) {
      setSelectedQueryId(myQueries[0].id);
    }
  }, [selectedQueryIdParam, myQueries]);

  // Filter queries by category
  const filteredQueries = myQueries.filter((q) => {
    if (activeCategoryFilter === 'All') return true;
    if (activeCategoryFilter === 'Prescription') return q.category === 'Prescription Clarification';
    if (activeCategoryFilter === 'Bill') return q.category === 'Bill Clarification';
    if (activeCategoryFilter === 'General') return q.category === 'General Clinical Query' || q.category === 'Appointment & Scheduling';
    return true;
  });

  const activeQuery = myQueries.find((q) => q.id === selectedQueryId) || filteredQueries[0] || myQueries[0];

  // Emergency keyword check in reply box
  const hasEmergencyKeywords = (text) => {
    const lower = text.toLowerCase();
    return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeQuery) return;

    replyToPatientQuery(
      activeQuery.id,
      replyText.trim(),
      'patient',
      currentUser?.name || 'Aarav Patel',
      'Patient'
    );
    setReplyText('');
  };

  const handleCreateNewQuery = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !newSubject.trim()) return;

    let relatedLabel = undefined;
    if (newRelatedType === 'invoice') {
      const inv = invoices.find((i) => i.id === newRelatedId);
      if (inv) relatedLabel = `Invoice #${inv.invoiceNumber}`;
    } else if (newRelatedType === 'prescription') {
      const rx = prescriptions.find((p) => p.id === newRelatedId);
      if (rx) relatedLabel = `Prescription #${rx.prescriptionNumber}`;
    }

    const created = createPatientQuery({
      category: newCategory,
      subject: newSubject.trim(),
      message: newMessage.trim(),
      relatedEntityId: newRelatedId || undefined,
      relatedEntityLabel: relatedLabel,
      urgency: newCategory === 'Prescription Clarification' ? 'Prompt Clinical Review' : 'Routine Non-Emergency'
    });

    setIsNewQueryModalOpen(false);
    setNewSubject('');
    setNewMessage('');
    setNewRelatedType('none');
    setNewRelatedId('');
    setSelectedQueryId(created.id);
  };

  const handleSimulateQuickReply = () => {
    if (!activeQuery) return;
    if (activeQuery.category === 'Bill Clarification') {
      simulateStaffReply(
        activeQuery.id,
        'Hello Aarav, this is the Clinic Accounts Coordinator. We have reviewed your billing record and verified that the procedure charges align with our standard institutional tariff. An adjusted, fully stamped breakdown statement has been appended to your portal documents. Please let us know if your insurance provider needs further documentation.',
        'billing',
        'Kavita S. (Lead Billing Coordinator)'
      );
    } else {
      simulateStaffReply(
        activeQuery.id,
        'Hello Aarav, Dr. Arvind Rao reviewed your message. For your specific clinical recovery, this is a normal post-procedural sensation. Continue the prescribed medications as scheduled without altering the dosage. If you notice any increased swelling or temperature above 100.4°F, please reply directly or schedule a walk-in evaluation.',
        'doctor',
        'Dr. Arvind Rao, MDS'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 uppercase tracking-wider font-mono">
              Patient Care Communication
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/60 font-mono">
              Authorized Staff Direct Channel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1.5">
            Clinic Inquiries & Clarifications
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Submit non-emergency clinical queries, request prescription or bill clarifications, and receive verified answers from authorized clinic staff.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            icon={ShieldAlert}
            className="text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold"
            onClick={() => setIsEmergencyModalOpen(true)}
          >
            Emergency Guidance
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            className="font-bold shadow-md shadow-blue-500/20"
            onClick={() => setIsNewQueryModalOpen(true)}
          >
            + Ask New Question
          </Button>
        </div>
      </div>

      {/* Prominent Emergency Guidance Banner */}
      <div className="p-4 sm:p-4.5 rounded-2xl bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-rose-900 dark:text-rose-100">
                Non-Emergency Notice & Severe Symptoms Safety Protocol
              </span>
              <span className="text-[10px] font-mono font-bold bg-rose-200 dark:bg-rose-900/80 text-rose-900 dark:text-rose-200 px-2 py-0.5 rounded-full uppercase">
                Life Safety
              </span>
            </div>
            <p className="text-rose-850 dark:text-rose-300 leading-relaxed max-w-3xl">
              This communication channel is strictly for <strong>non-emergency routine queries</strong> monitored during clinic operating hours. If you or a family member are experiencing acute chest pain, severe shortness of breath, uncontrolled bleeding, sudden weakness, or severe allergic swelling, <strong>DO NOT WAIT FOR A REPLY</strong>. Call <strong>112 / 108</strong> immediately.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEmergencyModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold whitespace-nowrap self-start sm:self-center shrink-0 shadow-xs transition-colors cursor-pointer"
        >
          View Emergency SOS Card &rarr;
        </button>
      </div>

      {/* Response-Time Expectations Cards (SLA Bar - 3 col per row grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="relative overflow-hidden p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:shadow-slate-950/40 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-emerald-500/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />
          <Stethoscope className="absolute -bottom-2 -right-2 w-16 h-16 text-teal-600/[0.05] dark:text-teal-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold">
            <span className="flex items-center gap-2 text-teal-700 dark:text-teal-300 text-sm">
              <span className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-200/80 dark:border-teal-800/60 flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </span>
              Prescription Clarifications
            </span>
            <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800/60">
              2 - 4 Hrs
            </span>
          </div>
          <p className="relative z-10 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Reviewed directly by prescribing doctor or clinical duty officer for dosage, timing & food instructions.
          </p>
        </div>

        <div className="relative overflow-hidden p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:shadow-slate-950/40 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-indigo-500/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />
          <Receipt className="absolute -bottom-2 -right-2 w-16 h-16 text-blue-600/[0.05] dark:text-blue-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold">
            <span className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
              <span className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center">
                <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </span>
              Bill & Tariff Clarifications
            </span>
            <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60">
              &le; 24 Hrs
            </span>
          </div>
          <p className="relative z-10 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Reviewed by clinic accounts desk with itemized statements, TPA approvals & receipt reconciliation.
          </p>
        </div>

        <div className="relative overflow-hidden p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:shadow-slate-950/40 space-y-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />
          <FileText className="absolute -bottom-2 -right-2 w-16 h-16 text-amber-600/[0.05] dark:text-amber-400/[0.05] pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold">
            <span className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-sm">
              <span className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center">
                <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </span>
              General Advice & Scheduling
            </span>
            <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
              2 - 6 Hrs
            </span>
          </div>
          <p className="relative z-10 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Pre-procedure guidance, follow-up advice and appointment rescheduling verified by duty clinic staff.
          </p>
        </div>
      </div>

      {/* Main Two-Pane Messaging Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left Column: Threads Master List */}
        <div className="lg:col-span-5 space-y-3 flex flex-col">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['All', 'Prescription', 'Bill', 'General'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {cat === 'All' ? `All Inquiries (${myQueries.length})` : cat}
              </button>
            ))}
          </div>

          {/* Queries List */}
          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[620px] pr-0.5">
            {filteredQueries.length === 0 ? (
              <Card className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700 dark:text-slate-300">No inquiries in this category</p>
                <p>Click "+ Ask New Question" above to start an inquiry.</p>
              </Card>
            ) : (
              filteredQueries.map((query) => {
                const isSelected = activeQuery?.id === query.id;
                const lastMsg = query.messages[query.messages.length - 1];

                const isStaffReplied = query.status === 'Staff Replied';
                const isResolved = query.status === 'Resolved';
                const isAwaiting = query.status === 'Awaiting Staff Reply';

                return (
                  <div
                    key={query.id}
                    onClick={() => setSelectedQueryId(query.id)}
                    className={`p-4 rounded-2xl border text-xs transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-[11px]">
                          {query.queryNumber}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {query.category}
                        </span>
                      </div>

                      {/* Status Tag */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                          isStaffReplied
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : isAwaiting
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {query.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1 text-sm">
                      {query.subject}
                    </h4>

                    {query.relatedEntityLabel && (
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
                        🔗 {query.relatedEntityLabel}
                      </span>
                    )}

                    <p className="text-slate-600 dark:text-slate-300 line-clamp-2 text-[11px] leading-relaxed">
                      {lastMsg ? `${lastMsg.senderName}: ${lastMsg.message}` : 'No messages yet.'}
                    </p>

                    <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      <span>{query.messages.length} {query.messages.length === 1 ? 'message' : 'messages'}</span>
                      <span>{lastMsg?.timestamp || 'Just now'}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation Thread */}
        <div className="lg:col-span-7 flex flex-col">
          {activeQuery ? (
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col h-full overflow-hidden">
              {/* Thread Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                      {activeQuery.queryNumber}
                    </span>
                    <Badge variant={activeQuery.status === 'Resolved' ? 'default' : activeQuery.status === 'Staff Replied' ? 'success' : 'warning'}>
                      {activeQuery.status}
                    </Badge>
                    <span className="text-slate-400 font-mono">· {activeQuery.category}</span>
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">
                    {activeQuery.subject}
                  </h3>
                  {activeQuery.relatedEntityLabel && (
                    <span className="text-xs text-blue-700 dark:text-blue-300 font-medium block">
                      🔗 Linked Reference: <strong>{activeQuery.relatedEntityLabel}</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  {activeQuery.status !== 'Resolved' && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => resolvePatientQuery(activeQuery.id)}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-semibold"
                    >
                      Mark Resolved
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Sparkles}
                    onClick={handleSimulateQuickReply}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                    title="Simulate verified response from attending clinical staff"
                  >
                    Simulate Staff Reply
                  </Button>
                </div>
              </div>

              {/* Response Time SLA Banner for active thread */}
              <div className="px-4 py-2.5 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-[11px] text-blue-950 dark:text-blue-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <strong>Expected Turnaround:</strong> {activeQuery.expectedResponseText}
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  Assigned: {activeQuery.assignedStaffName || activeQuery.assignedStaffRole}
                </span>
              </div>

              {/* Messages History Stream */}
              <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 max-h-[380px] bg-slate-50/20 dark:bg-slate-950/20 text-xs">
                {activeQuery.messages.map((msg) => {
                  const isStaff = msg.isStaff;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isStaff ? 'items-start' : 'items-end'}`}
                    >
                      {/* Sender Meta */}
                      <div className="flex items-center gap-1.5 mb-1 text-[11px]">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {msg.senderName}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold font-mono ${
                            isStaff
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {msg.senderBadge}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Bubble */}
                      <div
                        className={`p-3.5 rounded-2xl max-w-lg leading-relaxed shadow-2xs whitespace-pre-line ${
                          isStaff
                            ? 'bg-white dark:bg-slate-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-xs'
                            : 'bg-blue-600 text-white rounded-tr-xs'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Emergency Keyword Alert in live composer */}
              {hasEmergencyKeywords(replyText) && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border-t border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    <strong>Emergency Warning:</strong> Your text includes urgent medical keywords. Do not use online messaging for acute chest pain, breathing difficulty, or trauma. Call <strong>112 / 108</strong> now.
                  </span>
                </div>
              )}

              {/* Message Composer Footer */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                {activeQuery.status === 'Resolved' ? (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>This inquiry has been marked as <strong>Resolved</strong>. You can reopen it by sending a follow-up message below.</span>
                  </div>
                ) : null}

                <form onSubmit={handleSendReply} className="mt-2 flex items-end gap-2.5">
                  <div className="flex-1">
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your follow-up message for the clinic doctor or accounts staff..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-blue-500 leading-relaxed"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    icon={Send}
                    disabled={!replyText.trim()}
                    className="h-10 font-bold shadow-xs shrink-0"
                  >
                    Send
                  </Button>
                </form>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs space-y-2 h-full flex flex-col items-center justify-center">
              <MessageSquare className="w-10 h-10 text-slate-300 mb-2" />
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Select an Inquiry Thread</h3>
              <p>Choose any conversation from the list to view messages or ask a new question.</p>
            </Card>
          )}
        </div>
      </div>

      {/* NEW INQUIRY MODAL */}
      {isNewQueryModalOpen && (
        <Modal
          isOpen={isNewQueryModalOpen}
          onClose={() => setIsNewQueryModalOpen(false)}
          title="Submit Clinical or Billing Inquiry"
          size="md"
        >
          <form onSubmit={handleCreateNewQuery} className="space-y-4 text-xs">
            {/* Category Selector */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Inquiry Category *
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              >
                <option value="Prescription Clarification">Prescription Clarification (Dosage, Side Effects, Food Advice)</option>
                <option value="Bill Clarification">Bill Clarification (Itemized Cost, Insurance Reimbursement)</option>
                <option value="General Clinical Query">General Clinical Inquiry (Recovery, Pre-Op Preparation)</option>
                <option value="Appointment & Scheduling">Appointment & Front Desk Inquiry</option>
              </select>
            </div>

            {/* Expected Turnaround Notice */}
            <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-2 text-blue-950 dark:text-blue-200 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Expected SLA:</strong> {QUERY_RESPONSE_EXPECTATIONS[newCategory]?.text}
              </span>
            </div>

            {/* Optional Link to Bill or Prescription */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                  Link Reference (Optional)
                </label>
                <select
                  value={newRelatedType}
                  onChange={(e) => {
                    setNewRelatedType(e.target.value);
                    setNewRelatedId('');
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold"
                >
                  <option value="none">No Specific Record</option>
                  <option value="invoice">Link to an Invoice</option>
                  <option value="prescription">Link to a Prescription</option>
                </select>
              </div>

              {newRelatedType === 'invoice' && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                    Select Invoice
                  </label>
                  <select
                    value={newRelatedId}
                    onChange={(e) => setNewRelatedId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold"
                  >
                    <option value="">Select Invoice...</option>
                    {invoices.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        Invoice #{inv.invoiceNumber} - ₹{inv.totalAmount} ({inv.date})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {newRelatedType === 'prescription' && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                    Select Prescription
                  </label>
                  <select
                    value={newRelatedId}
                    onChange={(e) => setNewRelatedId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold"
                  >
                    <option value="">Select Prescription...</option>
                    {prescriptions.map((rx) => (
                      <option key={rx.id} value={rx.id}>
                        Rx #{rx.prescriptionNumber} - {rx.doctorName} ({rx.date})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Inquiry Subject *
              </label>
              <input
                type="text"
                required
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Brief summary of your question..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Detailed Question / Context *
              </label>
              <textarea
                required
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Explain what you need clarified in detail..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs leading-relaxed focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Emergency Check */}
            {hasEmergencyKeywords(newMessage + ' ' + newSubject) && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-2 rounded-xl">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <strong>Emergency Warning:</strong> For life-threatening emergencies or severe pain, please call <strong>112 / 108</strong> immediately.
                </span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsNewQueryModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                icon={Send}
                disabled={!newMessage.trim() || !newSubject.trim()}
                className="font-bold shadow-xs"
              >
                Submit Inquiry
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* EMERGENCY MEDICAL SOS MODAL */}
      <PatientEmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        patient={currentPatient}
      />
    </div>
  );
}
