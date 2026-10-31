import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  PhoneCall,
  MessageSquare,
  FileText,
  User,
  Share2,
  CheckCircle2,
  Sparkles,
  Clock,
  Send,
  Plus,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Users,
  Activity,
  Calendar
} from 'lucide-react';

export function VirtualConsultingPage() {
  const {
    activeClinic,
    currentUser,
    patients = [],
    virtualConsultations = [],
    acceptVirtualConsultation,
    endVirtualConsultation,
    declineVirtualConsultation,
    openPrescriptionModal,
    showToast
  } = useApp();

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [inCall, setInCall] = useState(true);
  const [activeConsultationId, setActiveConsultationId] = useState(() => {
    const active = virtualConsultations.find((vc) => vc.status === 'In Call');
    return active ? active.id : virtualConsultations[0]?.id || 'vc-101';
  });

  const activeConsultation = virtualConsultations.find((vc) => vc.id === activeConsultationId) || virtualConsultations[0] || {
    id: 'vc-101',
    patientName: 'Rahul Sharma',
    patientPhone: '+91 98201 22334',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    doctorName: currentUser?.name || 'Dr. Aarav Mehta',
    doctorSpecialty: 'General Physician',
    reason: 'Fever, cough and throat irritation for 2 days. Needs urgent prescription refill.',
    status: 'In Call',
    requestedAt: 'Today, 10:45 AM',
    preferredTime: 'Immediate Live Connect',
    meetingLink: 'https://clinicos.health/meet/vc-101-live',
    notes: 'Patient reports mild seasonal allergy symptoms. Clear lungs, BP normal.',
    duration: '08:24'
  };

  const [consultationNotes, setConsultationNotes] = useState(activeConsultation.notes || 'Patient reports mild seasonal allergy symptoms. Clear lungs, BP normal.');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleConnectPatient = (vc) => {
    setActiveConsultationId(vc.id);
    setConsultationNotes(vc.notes || `Consultation with ${vc.patientName}. Chief complaint: ${vc.reason}`);
    acceptVirtualConsultation(vc.id);
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
    endVirtualConsultation(activeConsultation.id, consultationNotes);
  };

  const handleStartCall = () => {
    setInCall(true);
    acceptVirtualConsultation(activeConsultation.id);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(activeConsultation.meetingLink || window.location.href);
    setCopiedLink(true);
    showToast('Virtual consultation room link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const waitingCount = virtualConsultations.filter((vc) => vc.status === 'Waiting').length;
  const inCallCount = virtualConsultations.filter((vc) => vc.status === 'In Call').length;
  const completedCount = virtualConsultations.filter((vc) => vc.status === 'Completed').length;

  const filteredConsultations = virtualConsultations.filter((vc) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Waiting') return vc.status === 'Waiting';
    if (activeFilter === 'In Call') return vc.status === 'In Call';
    if (activeFilter === 'Completed') return vc.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto transition-colors pb-10">
      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Telemedicine & Virtual Care Suite
            </span>
            <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Virtual Operatory Ready
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Virtual Consulting
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Accept patient virtual connect requests, conduct HD video appointments, and prescribe electronically in one integrated operatory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Room Link'}</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => openPrescriptionModal?.({ patientName: activeConsultation.patientName })}
            className="bg-blue-600 text-white flex items-center gap-1.5 text-xs font-semibold shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Write E-Prescription</span>
          </Button>
        </div>
      </div>

      {/* KPI Overview Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Connected Patient</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block max-w-[140px]">
              {inCall ? activeConsultation.patientName : 'No active session'}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">Waiting Requests</span>
            <span className="text-base font-extrabold text-amber-900 dark:text-amber-200">{waitingCount} Patients</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Live In Call</span>
            <span className="text-base font-extrabold text-emerald-900 dark:text-emerald-200">{inCallCount} Active</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Today</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{completedCount} Visits</span>
          </div>
        </div>
      </div>

      {/* Main Operatory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center 8 Cols: Live Video Screen & Controls */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl bg-slate-950 border border-slate-800 aspect-[16/10] overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6">
            {/* Top Overlay Info */}
            <div className="flex items-center justify-between text-white text-xs z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <span className={`w-2 h-2 rounded-full ${inCall ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
                <span className="font-bold">{activeConsultation.patientName}</span>
                <span className="text-slate-400">• Virtual Consultation</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 font-mono text-emerald-400 font-bold">
                {inCall ? '08:24' : 'DISCONNECTED'}
              </div>
            </div>

            {/* Video Canvas or Placeholder */}
            {inCall && videoOn ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={activeConsultation.patientAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80'}
                  alt="Patient Video Feed"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-900">
                <VideoOff className="w-16 h-16 mb-2 opacity-40" />
                <span className="text-sm font-semibold text-slate-400">
                  {inCall ? 'Camera is turned off' : 'No patient currently connected in this operatory'}
                </span>
                {!inCall && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleStartCall}
                    className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    <PhoneCall className="w-4 h-4 mr-1.5" />
                    Reconnect Operatory
                  </Button>
                )}
              </div>
            )}

            {/* Doctor Pip Preview */}
            {inCall && (
              <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 w-28 sm:w-40 aspect-video rounded-2xl bg-slate-800 border-2 border-white/20 overflow-hidden shadow-xl z-10">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
                  alt="Doctor Self-View"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-2 text-[9px] text-white/90 font-semibold bg-black/60 px-1.5 rounded-sm">
                  You ({currentUser?.name || 'Dr. Mehta'})
                </span>
              </div>
            )}

            {/* Bottom Call Bar */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 z-10 pt-4">
              <button
                type="button"
                onClick={() => setMicOn(!micOn)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer transition-all ${
                  micOn
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setVideoOn(!videoOn)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer transition-all ${
                  videoOn
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={videoOn ? 'Turn Off Video' : 'Turn On Video'}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer transition-all"
                title="Share Room Link"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {inCall ? (
                <button
                  type="button"
                  onClick={handleEndCall}
                  className="h-11 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/30 transition-all"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Consult</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartCall}
                  className="h-11 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Connect Live</span>
                </button>
              )}
            </div>
          </div>

          {/* Clinical Consultation Notes During Virtual Session */}
          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Real-time Clinical Consultation Notes
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Auto-saved to patient health chart</span>
            </div>

            <textarea
              rows={3}
              value={consultationNotes}
              onChange={(e) => setConsultationNotes(e.target.value)}
              placeholder="Record chief complaints, diagnosis, vitals, or clinical advice discussed during this virtual consult..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all resize-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Quick presets:</span>
                <button
                  type="button"
                  onClick={() => setConsultationNotes((p) => p + ' Advised 5-day antibiotic course & warm saline gargles.')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  + Pharyngitis advice
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationNotes((p) => p + ' Normal vitals. Advised rest, hydration & Paracetamol PRN.')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  + Viral fever protocol
                </button>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  endVirtualConsultation(activeConsultation.id, consultationNotes);
                  showToast('Clinical notes saved to patient consultation history.', 'success');
                }}
                className="text-xs"
              >
                Save Clinical Notes
              </Button>
            </div>
          </Card>
        </div>

        {/* Right 4 Cols: Patient Queue & Incoming Connect Requests */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-4 sm:p-5 border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Virtual Connect Requests</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Patients requesting live virtual consultation
                </p>
              </div>
              {waitingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 animate-pulse">
                  {waitingCount} waiting
                </span>
              )}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              {['All', 'Waiting', 'In Call', 'Completed'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`flex-1 py-1 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer ${
                    activeFilter === tab
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Requests List */}
            <div className="space-y-3">
              {filteredConsultations.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  No virtual consultation requests matching "{activeFilter}".
                </div>
              ) : (
                filteredConsultations.map((vc) => {
                  const isCurrentActive = vc.id === activeConsultationId;
                  const isWaiting = vc.status === 'Waiting';
                  const isInCall = vc.status === 'In Call';

                  return (
                    <div
                      key={vc.id}
                      className={`p-3.5 rounded-2xl border transition-all text-xs space-y-2.5 ${
                        isCurrentActive
                          ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={vc.patientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                            alt={vc.patientName}
                            className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate">
                              {vc.patientName}
                            </h4>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                              {vc.patientPhone}
                            </span>
                          </div>
                        </div>

                        <div>
                          {isWaiting && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Waiting
                            </span>
                          )}
                          {isInCall && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                            </span>
                          )}
                          {vc.status === 'Completed' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Chief Complaint */}
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-750 line-clamp-2">
                        <strong className="text-slate-800 dark:text-slate-200">Reason: </strong>
                        {vc.reason}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {vc.preferredTime}
                        </span>
                        <span>{vc.requestedAt}</span>
                      </div>

                      {/* Connect Action Button */}
                      <div className="pt-1 flex items-center gap-2">
                        {isWaiting && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleConnectPatient(vc)}
                            className="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
                          >
                            <PhoneCall className="w-3.5 h-3.5 mr-1.5" /> Connect Live Now
                          </Button>
                        )}
                        {isInCall && !isCurrentActive && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleConnectPatient(vc)}
                            className="w-full text-xs font-semibold"
                          >
                            Switch to this Room
                          </Button>
                        )}
                        {isInCall && isCurrentActive && (
                          <div className="w-full py-1 text-center font-bold text-emerald-600 text-xs">
                            Active in Operatory Screen
                          </div>
                        )}
                        {vc.status === 'Completed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleConnectPatient(vc)}
                            className="w-full text-[11px]"
                          >
                            Review Consultation Notes
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

