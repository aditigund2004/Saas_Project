import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
<<<<<<< HEAD
=======
import { belongsToCurrentPatient } from './patientDataAccess';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
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
  HeartHandshake
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
  const {
    feedbacks,
    appointments,
    activeClinic,
    currentUser,
    submitPatientFeedback,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'history'

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Doctor Care');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Patient's own appointments at this clinic
  const patientAppointments = useMemo(() => {
    return appointments.filter(
      (a) =>
<<<<<<< HEAD
        (a.patientId === currentUser.id || a.patientName === currentUser.name) &&
=======
        belongsToCurrentPatient(a, currentUser) &&
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        a.clinicId === activeClinic.id
    );
  }, [appointments, currentUser, activeClinic.id]);

  // STRICT PRIVACY FILTER: Only feedbacks submitted by the logged-in patient!
  const myFeedbacks = useMemo(() => {
    return feedbacks.filter(
      (f) =>
<<<<<<< HEAD
        (f.patientId === currentUser.id ||
          f.patientEmail === currentUser.email ||
          f.patientName === currentUser.name) &&
=======
        belongsToCurrentPatient(f, currentUser) &&
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        f.clinicId === activeClinic.id
    );
  }, [feedbacks, currentUser, activeClinic.id]);

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Patient Care Quality</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Your Feedback Matters</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Help <strong>{activeClinic.name}</strong> maintain clinical excellence and improve future visits.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'new'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Share Experience
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>My Submissions</span>
            {myFeedbacks.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                {myFeedbacks.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* VIEW 1: SUBMIT NEW FEEDBACK */}
      {activeTab === 'new' && (
        <Card className="p-6 border-slate-200 bg-white space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Rating Selector */}
            <div className="text-center py-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
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
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'text-slate-200 fill-slate-100'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-1.5 text-sm font-bold mt-1">
                <span>{ratingMeta.emoji}</span>
                <span className={ratingMeta.color}>{ratingMeta.label}</span>
                <span className="text-slate-400 font-normal">({currentDisplayRating} out of 5)</span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-800">
                What area does your feedback primarily relate to? *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className={`text-xs ${isSelected ? 'font-bold text-blue-900' : 'text-slate-700'}`}>
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
                <label className="block font-bold text-slate-800">
                  Select Associated Visit (Optional)
                </label>
                <select
                  value={selectedAppointmentId}
                  onChange={(e) => setSelectedAppointmentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-blue-500 bg-white"
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
                <label className="block font-bold text-slate-800">
                  Tell us about your experience *
                </label>
                <span className={`text-[11px] font-mono ${message.length > 900 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
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
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-blue-500 leading-relaxed"
              />
              <p className="text-[10px] text-slate-400">Minimum 10 characters.</p>
            </div>

            {/* Improvement Suggestions */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800">
                Any suggestions for how we could improve? (Optional)
              </label>
              <textarea
                rows={2}
                maxLength={500}
                placeholder="e.g. Lounge seating, waiting room music, parking instructions, follow-up messages..."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-blue-500 leading-relaxed"
              />
            </div>

            {/* Privacy & Quality Disclaimer */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
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
            <Card className="p-12 text-center border-slate-200 bg-white space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">No feedback submitted yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't submitted any feedback for {activeClinic.name} yet. Share your experience to help us serve you better!
              </p>
              <Button variant="primary" size="sm" onClick={() => setActiveTab('new')}>
                Share Your Feedback
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Displaying your past submitted reviews ({myFeedbacks.length})</span>
                <span className="text-[11px] text-blue-600 font-medium">Confidential Patient Records</span>
              </div>

              {myFeedbacks.map((fb) => (
                <Card key={fb.id} className="p-5 border-slate-200 bg-white space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700">{fb.referenceNumber}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          {fb.category}
                        </span>
                        {fb.appointmentRef && (
                          <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full font-mono">
                            {fb.appointmentRef}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
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
                              s <= fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
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
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed italic border border-slate-100">
                    "{fb.message}"
                  </div>

                  {fb.suggestions && (
                    <div className="text-xs text-slate-500 pl-1">
                      <span className="font-semibold text-slate-700">Suggestion:</span> {fb.suggestions}
                    </div>
                  )}

                  {/* Clinic Resolution Message Response if provided */}
                  {fb.resolutionNote && (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-[11px]">
                        <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                        Response from {activeClinic.name} Management:
                      </span>
                      <p className="text-emerald-800 leading-relaxed">{fb.resolutionNote}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
