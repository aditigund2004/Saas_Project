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
  MessageSquare,
  FileText,
  User,
  Share2,
  CheckCircle2,
  Sparkles,
  Clock,
  Send,
  Plus
} from 'lucide-react';

export function TelemedicinePage() {
  const { activeClinic, currentUser, patients = [], openPrescriptionModal, showToast } = useApp();

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [inCall, setInCall] = useState(true);
  const [activePatient, setActivePatient] = useState(patients[0]?.name || 'Rahul Sharma');
  const [consultationNotes, setConsultationNotes] = useState('Patient reports mild seasonal allergy symptoms. Clear lungs, BP normal.');

  const handleEndCall = () => {
    setInCall(false);
    showToast('Teleconsultation ended. Summary recorded in patient history.', 'info');
  };

  const handleStartCall = () => {
    setInCall(true);
    showToast('Connected to HD Telemedicine room.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Virtual Care Suite
            </span>
            <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Room Ready
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Telemedicine Consultation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Conduct HD video consultations, take clinical notes, and prescribe electronically in one integrated operatory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => openPrescriptionModal?.({ patientName: activePatient })}
            className="bg-blue-600 text-white flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Write E-Prescription</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Video Screen */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl bg-slate-950 border border-slate-800 aspect-[16/10] overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6">
            {/* Top Overlay Info */}
            <div className="flex items-center justify-between text-white text-xs z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold">{activePatient}</span>
                <span className="text-slate-400">• OPD Teleconsultation</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 font-mono text-emerald-400 font-bold">
                {inCall ? '08:24' : 'DISCONNECTED'}
              </div>
            </div>

            {/* Video Canvas or Placeholder */}
            {inCall && videoOn ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
                  alt="Patient Video Feed"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <User className="w-10 h-10" />
                </div>
                <div className="text-sm font-semibold">{inCall ? 'Video is muted' : 'Call ended'}</div>
              </div>
            )}

            {/* Doctor Picture-in-Picture Preview */}
            <div className="absolute bottom-20 right-4 sm:right-6 w-36 sm:w-44 aspect-video rounded-2xl bg-slate-900 border-2 border-white/20 overflow-hidden shadow-xl z-10">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                alt="Doctor Self Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-2 text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                You (Dr. Siddharth)
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="flex items-center justify-center gap-3 z-10 pt-4">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-full text-white transition-all shadow-md cursor-pointer ${
                  micOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-red-600 hover:bg-red-700 ring-2 ring-red-400'
                }`}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3 rounded-full text-white transition-all shadow-md cursor-pointer ${
                  videoOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-red-600 hover:bg-red-700 ring-2 ring-red-400'
                }`}
                title={videoOn ? 'Turn Video Off' : 'Turn Video On'}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              {inCall ? (
                <button
                  onClick={handleEndCall}
                  className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </button>
              ) : (
                <button
                  onClick={handleStartCall}
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Reconnect</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Clinical Notepad & Patient Info */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Consultation Notes
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Symptoms & Clinical Observations
              </label>
              <textarea
                rows={6}
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Type clinical notes during virtual consultation..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Notes saved to patient timeline.', 'success')}
              className="w-full bg-blue-600 text-white font-bold text-xs"
            >
              Save Consultation Record
            </Button>
          </Card>

          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Patient Queue (Virtual OPD)
            </h3>
            <div className="space-y-2">
              {['Rahul Sharma (In Call)', 'Priya Mehta (Waiting - 5m)', 'Amitabh Roy (Upcoming - 11:30 AM)'].map(
                (p, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                      idx === 0
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 font-bold text-blue-900 dark:text-blue-300'
                        : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>{p}</span>
                    {idx === 0 && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


