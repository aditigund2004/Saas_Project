import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DemoPatientSwitcher } from '../../components/patient/DemoPatientSwitcher';
import {
  MessageSquareHeart,
  Star,
  ShieldCheck,
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Lock,
  HeartHandshake,
  List,
  LayoutGrid
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Doctor Care', label: 'Doctor Care & Treatment', icon: '🩺' },
  { id: 'Waiting Time', label: 'Waiting Time & Delays', icon: '⏱️' },
  { id: 'Clinic Cleanliness', label: 'Hygiene & Cleanliness', icon: '✨' },
  { id: 'Reception & Staff', label: 'Reception & Staff Courtesy', icon: '🤝' },
  { id: 'Billing & Value', label: 'Billing & Transparency', icon: '💳' },
  { id: 'General Experience', label: 'Overall Experience', icon: '🏥' }
];

const RATING_DESCRIPTIONS = {
  1: { label: 'Poor', emoji: '😠', color: 'text-rose-600' },
  2: { label: 'Fair', emoji: '🙁', color: 'text-amber-600' },
  3: { label: 'Good', emoji: '😐', color: 'text-yellow-600' },
  4: { label: 'Very Good', emoji: '🙂', color: 'text-emerald-600' },
  5: { label: 'Excellent', emoji: '🤩', color: 'text-blue-600' }
};

export function PatientFeedbackPage() {
  const [searchParams] = useSearchParams();
  const urlAptId = searchParams.get('appointment') || '';

  const {
    feedbacks,
    appointments,
    activeClinic,
    currentUser,
    activePatientId,
    patients = [],
    submitPatientFeedback,
    showToast
  } = useApp();

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'history'
  const [historyViewMode, setHistoryViewMode] = useState('table');

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Doctor Care');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(urlAptId);
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (urlAptId) {
      setSelectedAppointmentId(urlAptId);
      setActiveTab('new');
    }
  }, [urlAptId]);

  // Patient's own appointments at this clinic
  const patientAppointments = useMemo(() => {
    return appointments.filter(
      (a) =>
        (a.patientId === activePatient?.id ||
          a.patientId === activePatient?.patientIdNumber ||
          a.patientName === activePatient?.name) &&
        a.clinicId === activeClinic.id
    );
  }, [appointments, activePatient, activeClinic.id]);

  // STRICT PRIVACY FILTER: Only feedbacks submitted by the active patient!
  const myFeedbacks = useMemo(() => {
    return feedbacks.filter(
      (f) =>
        (f.patientId === activePatient?.id ||
          f.patientId === activePatient?.patientIdNumber ||
          f.patientEmail === activePatient?.email ||
          f.patientName === activePatient?.name) &&
        f.clinicId === activeClinic.id
    );
  }, [feedbacks, activePatient, activeClinic.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || message.trim().length < 10) {
      showToast('Please provide at least 10 characters describing your experience', 'error');
      return;
    }

    setIsSubmitting(true);

    const linkedApt = patientAppointments.find((a) => a.id === selectedAppointmentId);

    const newFeedback = {
      clinicId: activeClinic.id,
      branchId: linkedApt?.branchId || activeClinic.branches[0]?.id || '',
      branchName: activeClinic.branches.find((b) => b.id === (linkedApt?.branchId || activeClinic.branches[0]?.id))?.name,
      patientId: currentUser.id,
      patientName: currentUser.name,
      patientPhone: currentUser.phone,
      patientEmail: currentUser.email,
      appointmentId: selectedAppointmentId || undefined,
      appointmentRef: linkedApt?.referenceNumber || undefined,
      category,
      rating,
      message: message.trim(),
      suggestions: suggestions.trim() || undefined
    };

    setTimeout(() => {
      submitPatientFeedback(newFeedback);
      setIsSubmitting(false);
      setMessage('');
      setSuggestions('');
      setSelectedAppointmentId('');
      setActiveTab('history');
    }, 400);
  };

  const currentDisplayRating = hoverRating || rating;
  const ratingMeta = RATING_DESCRIPTIONS[currentDisplayRating] || RATING_DESCRIPTIONS[5];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <DemoPatientSwitcher />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Patient Care Quality</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">Your Feedback Matters</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Help <strong>{activeClinic.name}</strong> maintain clinical excellence and improve future visits.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium self-start sm:self-auto border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'new'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Share Experience
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>My Submissions</span>
            {myFeedbacks.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                {myFeedbacks.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* VIEW 1: SUBMIT NEW FEEDBACK */}
      {activeTab === 'new' && (
        <Card className="p-6 sm:p-7 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            {/* Rating Selector */}
            <div className="text-center py-5 bg-slate-50/70 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                How would you rate your recent experience?
              </label>

              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                        starVal <= currentDisplayRating
                          ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                          : 'text-slate-200 dark:text-slate-700 fill-slate-100 dark:fill-slate-800'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-base font-bold mt-1">
                <span>{ratingMeta.emoji}</span>
                <span className={ratingMeta.color}>{ratingMeta.label}</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">({currentDisplayRating} out of 5)</span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
                What area does your feedback primarily relate to? *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-blue-500 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm ring-1 ring-blue-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950/60'
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className={`text-xs ${isSelected ? 'font-bold text-blue-900 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Appointment Selector */}
            {patientAppointments.length > 0 && (
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
                  Select Associated Visit (Optional)
                </label>
                <select
                  value={selectedAppointmentId}
                  onChange={(e) => setSelectedAppointmentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">General feedback (Not tied to a specific appointment)</option>
                  {patientAppointments.map((apt) => (
                    <option key={apt.id} value={apt.id}>
                      {apt.referenceNumber} • {apt.doctorName} • {apt.serviceName} ({apt.date})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Written Message */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
                  Tell us about your experience *
                </label>
                <span className={`text-xs font-mono ${message.length > 900 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                  {message.length} / 1000
                </span>
              </div>
              <textarea
                rows={4}
                required
                maxLength={1000}
                placeholder="What went well? Was your treatment comfortable? Were doctor explanations clear and reassuring?..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
              <p className="text-xs text-slate-400">Minimum 10 characters.</p>
            </div>

            {/* Improvement Suggestions */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
                Any suggestions for how we could improve? (Optional)
              </label>
              <textarea
                rows={2}
                maxLength={500}
                placeholder="e.g. Lounge seating, waiting room music, parking instructions, follow-up messages..."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            {/* Privacy & Quality Disclaimer */}
            <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3 text-blue-950 dark:text-blue-200">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold">Strict Patient Privacy Assurance:</span> Your feedback is transmitted securely directly to <strong>{activeClinic.name}</strong>'s clinical management team. It is strictly confidential, never displayed publicly, and used only to continuously improve treatment quality and patient comfort.
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Send}
                disabled={isSubmitting || message.trim().length < 10}
                className="shadow-md shadow-blue-500/20 font-bold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Patient Feedback'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* VIEW 2: MY SUBMISSION HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {myFeedbacks.length === 0 ? (
            <Card className="p-12 text-center border-slate-200 dark:border-slate-800 dark:bg-slate-900/60 space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">No feedback submitted yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                You haven't submitted any feedback for {activeClinic.name} yet. Share your experience to help us serve you better!
              </p>
              <Button variant="primary" size="md" onClick={() => setActiveTab('new')} className="font-bold">
                Share Your Feedback
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
                <span>Displaying your past submitted reviews ({myFeedbacks.length})</span>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setHistoryViewMode('table')}
                      className={`p-1 px-2 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        historyViewMode === 'table'
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>Table</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHistoryViewMode('cards')}
                      className={`p-1 px-2 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        historyViewMode === 'cards'
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Cards</span>
                    </button>
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold hidden sm:inline">Confidential Patient Records</span>
                </div>
              </div>

              {historyViewMode === 'table' ? (
                <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-3.5 py-3 text-center w-12 font-semibold">#</th>
                          <th className="px-4 py-3">Reference #</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Rating</th>
                          <th className="px-4 py-3">Appointment</th>
                          <th className="px-4 py-3">Feedback Summary</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {myFeedbacks.map((fb, idx) => (
                          <tr key={fb.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-3.5 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                              {idx + 1}
                            </td>
                            <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                              {fb.referenceNumber}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
                                {fb.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-1 font-bold text-amber-500">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>{fb.rating}.0</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {fb.appointmentRef || 'General Visit'}
                            </td>
                            <td className="px-4 py-3 max-w-xs">
                              <div className="truncate text-slate-700 dark:text-slate-300 font-medium">"{fb.message}"</div>
                              {fb.resolutionNote && (
                                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 truncate flex items-center gap-1 mt-0.5">
                                  <HeartHandshake className="w-3 h-3 shrink-0" />
                                  <span>Clinic: {fb.resolutionNote}</span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                              {new Date(fb.submittedAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                              <Badge variant={fb.status} size="sm">
                                {fb.status === 'New'
                                  ? 'Submitted'
                                  : fb.status === 'Reviewed'
                                  ? 'In Review'
                                  : 'Resolved'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ) : (
                myFeedbacks.map((fb) => (
                  <Card key={fb.id} className="p-5 sm:p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 space-y-3.5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{fb.referenceNumber}</span>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="text-xs font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50">
                            {fb.category}
                          </span>
                          {fb.appointmentRef && (
                            <span className="text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full font-mono">
                              {fb.appointmentRef}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                          Submitted on {new Date(fb.submittedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant={fb.status}>
                          {fb.status === 'New'
                            ? 'Submitted · Pending Review'
                            : fb.status === 'Reviewed'
                            ? 'Under Clinic Review'
                            : 'Resolved by Clinic'}
                        </Badge>
                      </div>
                    </div>

                    {/* Written Message */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic border border-slate-100 dark:border-slate-800">
                      "{fb.message}"
                    </div>

                    {fb.suggestions && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 pl-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Suggestion:</span> {fb.suggestions}
                      </div>
                    )}

                    {/* Clinic Resolution Message Response if provided */}
                    {fb.resolutionNote && (
                      <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs space-y-1">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
                          <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          Response from {activeClinic.name} Management:
                        </span>
                        <p className="text-emerald-800 dark:text-emerald-300/90 leading-relaxed">{fb.resolutionNote}</p>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

