import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  PhoneCall,
  Clock,
  Calendar,
  User,
  Sparkles,
  FileText,
  AlertCircle,
  CheckCircle2,
  Send,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Plus
} from 'lucide-react';

export function PatientVirtualConsultingPage() {
  const { user } = useAuth();
  const {
    doctors = [],
    activeClinic,
    virtualConsultations = [],
    requestVirtualConsultation,
    showToast
  } = useApp();

  // Modal / Form state for requesting a virtual consultation
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || 'doc-aarav');
  const [connectType, setConnectType] = useState('instant'); // 'instant' | 'scheduled'
  const [scheduledDate, setScheduledDate] = useState('2026-10-28');
  const [scheduledTime, setScheduledTime] = useState('02:00 PM');
  const [reason, setReason] = useState('');
  const [inVideoRoom, setInVideoRoom] = useState(false);

  // In-call controls
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  // Filter patient's virtual consultations (matching current patient's name or id or default demo)
  const currentPatientName = user?.name || 'Aarav Patel';
  const myVirtualConsultations = virtualConsultations.filter(
    (vc) =>
      vc.patientName?.toLowerCase() === currentPatientName.toLowerCase() ||
      vc.patientId === user?.id ||
      vc.id === 'vc-103'
  );

  const activeConsultation = myVirtualConsultations.find(
    (vc) => vc.status === 'In Call' || vc.status === 'Waiting'
  ) || myVirtualConsultations[0];

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      showToast('Please specify the symptoms or reason for your consultation.', 'error');
      return;
    }

    const doctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

    requestVirtualConsultation({
      patientId: user?.id || 'usr-patient-aarav',
      patientName: currentPatientName,
      patientPhone: user?.phone || '+91 98765 43210',
      patientAvatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      clinicId: activeClinic?.id || 'clinic-citycare',
      clinicName: activeClinic?.name || 'CityCare Family Clinic',
      reason: reason.trim(),
      preferredTime: connectType === 'instant' ? 'Immediate Live Connect' : `Scheduled: ${scheduledDate} at ${scheduledTime}`
    });

    setReason('');
    setShowRequestModal(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto transition-colors pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Telemedicine Consultation
            </span>
            <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Patient Virtual Care
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Virtual Consulting
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Request to connect virtually with your doctor, join live video sessions, and receive digital prescriptions from home.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowRequestModal(true)}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5"
          >
            <Video className="w-4 h-4" />
            <span>Request Virtual Consultation</span>
          </Button>
        </div>
      </div>

      {/* Live Video Room (If in room) */}
      {inVideoRoom && (
        <Card className="p-6 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 bg-slate-950 text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-sm">
                Connected with {activeConsultation?.doctorName || 'Dr. Aarav Mehta'}
              </span>
              <span className="text-xs text-slate-400">({activeConsultation?.doctorSpecialty || 'General Physician'})</span>
            </div>
            <span className="font-mono text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800">
              LIVE 06:18
            </span>
          </div>

          <div className="relative aspect-[16/9] max-h-[460px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
            {videoOn ? (
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor Live Video Feed"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-slate-500">
                <VideoOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Doctor's camera feed is active</p>
              </div>
            )}

            {/* Self PIP View */}
            <div className="absolute bottom-4 right-4 w-28 sm:w-36 aspect-video rounded-xl bg-slate-800 border-2 border-white/20 overflow-hidden shadow-lg">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
                alt="You"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-1.5 text-[9px] text-white bg-black/60 px-1 rounded-sm">
                You
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setMicOn(!micOn)}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer transition-all ${
                micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setVideoOn(!videoOn)}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer transition-all ${
                videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setInVideoRoom(false);
                showToast('Exited virtual consultation room.', 'info');
              }}
              className="h-11 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/30"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave Room</span>
            </button>
          </div>
        </Card>
      )}

      {/* Active Virtual Consultation Status Card */}
      {activeConsultation && (
        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Active Virtual Consultation
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {activeConsultation.doctorName}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {activeConsultation.doctorSpecialty} · {activeConsultation.clinicName}
                </span>
              </div>
            </div>

            <div>
              {activeConsultation.status === 'Waiting' && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5 animate-pulse">
                    <Clock className="w-3.5 h-3.5" /> Waiting for Doctor to Join
                  </span>
                </div>
              )}
              {activeConsultation.status === 'In Call' && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Doctor Is Online
                  </span>
                </div>
              )}
              {activeConsultation.status === 'Completed' && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Completed Consultation
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Consultation Reason</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{activeConsultation.reason}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Preferred Timing</span>
              <p className="font-semibold text-blue-700 dark:text-blue-400">{activeConsultation.preferredTime}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Queue Status</span>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">Position #1 (Ready to Connect)</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted WebRTC HD medical connection with your verified clinician.</span>
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setInVideoRoom(true)}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{inVideoRoom ? 'Return to Video Screen' : 'Enter Live Consultation Room'}</span>
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* History of Virtual Consultations */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              My Virtual Consultation History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Previous online video sessions and doctor notes
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {myVirtualConsultations.map((vc) => (
            <div key={vc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{vc.doctorName}</span>
                  <span className="text-slate-400">({vc.doctorSpecialty})</span>
                  <Badge variant={vc.status === 'Completed' ? 'success' : vc.status === 'In Call' ? 'primary' : 'warning'}>
                    {vc.status}
                  </Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Reason: </strong>{vc.reason}
                </p>
                {vc.notes && (
                  <p className="text-slate-500 dark:text-slate-400 italic">
                    Doctor's Summary: "{vc.notes}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link to="/patient/prescriptions">
                  <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Prescriptions</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal: Request Virtual Consultation */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="max-w-lg w-full p-6 sm:p-7 border-slate-200 dark:border-slate-800 space-y-5 bg-white dark:bg-slate-900 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Request Virtual Consultation</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Connect live with a licensed doctor from your device
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              {/* Select Doctor */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Clinician <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Connection Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setConnectType('instant')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      connectType === 'instant'
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold block text-xs">⚡ Instant Live Connect</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      Join queue now (est. 5 min wait)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConnectType('scheduled')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      connectType === 'scheduled'
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold block text-xs">📅 Schedule Slot</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      Choose upcoming date & time
                    </span>
                  </button>
                </div>
              </div>

              {/* Scheduled date/time picker if scheduled */}
              {connectType === 'scheduled' && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                    <select
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Reason / Symptoms */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Reason for Consultation / Symptoms <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your symptoms, how long you've had them, or request a prescription refill..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="bg-blue-600 text-white font-bold"
                >
                  Submit Virtual Connect Request →
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

