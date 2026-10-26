import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  MessageSquareHeart,
  Star,
  Search,
  Lock,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Send,
  Building2,
  Calendar,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

export function ReceptionFeedbackPage() {
  const {
    feedbacks,
    feedbackNotes,
    feedbackActivities,
    activeClinic,
    activeBranch,
    currentUser,
    hasReceptionistPermission,
    currentReceptionist,
    updateFeedbackStatus,
    addFeedbackInternalNote,
    showToast
  } = useApp();

  const canViewFeedback = hasReceptionistPermission('view_patient_feedback');
  const canUpdateStatus = hasReceptionistPermission('update_feedback_status');
  const canAddInternalNotes = hasReceptionistPermission('add_internal_notes');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Detail Modal State
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusUpdateVal, setStatusUpdateVal] = useState('Reviewed');
  const [resolutionNoteInput, setResolutionNoteInput] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');

  // Scoped feedbacks for current branch / clinic
  const branchFeedbacks = useMemo(() => {
    return feedbacks.filter((f) => f.clinicId === activeClinic.id);
  }, [feedbacks, activeClinic.id]);

  // Filtered feedbacks
  const filteredFeedbacks = useMemo(() => {
    return branchFeedbacks.filter((fb) => {
      const matchSearch =
        fb.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRating = selectedRating === 'ALL' || fb.rating === Number(selectedRating);
      const matchStatus = selectedStatus === 'ALL' || fb.status === selectedStatus;

      return matchSearch && matchRating && matchStatus;
    });
  }, [branchFeedbacks, searchTerm, selectedRating, selectedStatus]);

  // Open Details Modal
  const handleOpenDetails = (fb) => {
    setSelectedFeedback(fb);
    setStatusUpdateVal(fb.status);
    setResolutionNoteInput(fb.resolutionNote || '');
    setNewInternalNote('');
    setIsDetailModalOpen(true);
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (!selectedFeedback || !canUpdateStatus) return;
    updateFeedbackStatus(selectedFeedback.id, statusUpdateVal, resolutionNoteInput.trim() || undefined);
    setSelectedFeedback({
      ...selectedFeedback,
      status: statusUpdateVal,
      resolutionNote: resolutionNoteInput.trim() || selectedFeedback.resolutionNote
    });
    showToast(`Feedback status updated to ${statusUpdateVal}`);
  };

  const handleAddInternalNote = (e) => {
    e.preventDefault();
    if (!selectedFeedback || !canAddInternalNotes || !newInternalNote.trim()) return;
    addFeedbackInternalNote(selectedFeedback.id, newInternalNote.trim());
    setNewInternalNote('');
    showToast('Confidential internal note saved.');
  };

  // Notes linked to the selected feedback
  const currentFeedbackNotes = useMemo(() => {
    if (!selectedFeedback) return [];
    return feedbackNotes.filter((n) => n.feedbackId === selectedFeedback.id);
  }, [selectedFeedback, feedbackNotes]);

  // Activity audit linked to the selected feedback
  const currentFeedbackActivities = useMemo(() => {
    if (!selectedFeedback) return [];
    return feedbackActivities.filter((a) => a.feedbackId === selectedFeedback.id);
  }, [selectedFeedback, feedbackActivities]);

  // If receptionist lacks permission, render permission denied screen
  if (!canViewFeedback) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Desk Access Control</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Patient Feedback Inbox</h1>
        </div>

        <Card className="p-8 sm:p-12 text-center border-amber-200 bg-amber-50/40 max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-950">Access Restricted: Feedback Viewing Disabled</h3>
            <p className="text-xs text-amber-800 mt-1 max-w-md mx-auto leading-relaxed">
              Your staff desk profile (<strong>{currentUser.name}</strong>) does not currently have the <code>view_patient_feedback</code> permission enabled for <strong>{activeClinic.name}</strong>.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 border border-amber-200 text-xs text-slate-600 text-left space-y-1">
            <p className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" /> Clinic Privacy Policy
            </p>
            <p className="text-[11px] text-slate-500">
              Patient satisfaction ratings and written complaints are confidential quality records. To view this inbox, please request your Clinic Administrator to grant the <strong>"Access Patient Feedback"</strong> permission under <em>Staff Management → Receptionists</em>.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Permission is granted: render inbox
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Patient Experience</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Patient Feedback & Reviews</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Front-desk patient satisfaction inbox authorized for <strong>{currentUser.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Authorized Feedback Viewer
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 border-slate-200 bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search feedback by text or patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-blue-500 bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
            >
              <option value="ALL">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-blue-500 text-slate-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="New">New</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Feedback cards */}
      {filteredFeedbacks.length === 0 ? (
        <Card className="p-8 text-center border-slate-200 bg-white">
          <MessageSquareHeart className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 text-sm">No feedback records found</h3>
          <p className="text-xs text-slate-500">Try adjusting your filters.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredFeedbacks.map((fb) => (
            <Card
              key={fb.id}
              className="p-4 border border-slate-200 hover:border-blue-400 bg-white cursor-pointer transition-colors"
              onClick={() => handleOpenDetails(fb)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {fb.patientName?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{fb.patientName}</span>
                      <span className="font-mono text-[10px] text-slate-400">{fb.referenceNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">({fb.rating}/5)</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {fb.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-between sm:justify-end">
                  <span className="text-[11px] text-slate-400">
                    {new Date(fb.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                  <Badge variant={fb.status}>{fb.status}</Badge>
                  <Button variant="outline" size="xs">
                    View
                  </Button>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-700 line-clamp-2 italic">"{fb.message}"</p>
            </Card>
          ))}
        </div>
      )}

      {/* Feedback detail modal */}
      {isDetailModalOpen && selectedFeedback && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Feedback: ${selectedFeedback.referenceNumber}`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Header info */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm">{selectedFeedback.patientName}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Submitted {new Date(selectedFeedback.submittedAt).toLocaleString()}
                </p>
              </div>
              <Badge variant={selectedFeedback.status}>{selectedFeedback.status}</Badge>
            </div>

            {/* Review content */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">Category: {selectedFeedback.category}</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-amber-600">Rating: {selectedFeedback.rating} / 5 Stars</span>
              </div>
              <p className="text-slate-700 italic pt-1 whitespace-pre-wrap">"{selectedFeedback.message}"</p>
              {selectedFeedback.suggestions && (
                <div className="pt-2 border-t border-slate-100 mt-2">
                  <span className="font-semibold text-slate-600">Suggestions:</span>
                  <p className="text-slate-600">{selectedFeedback.suggestions}</p>
                </div>
              )}
            </div>

            {/* Status Update (Controlled by permission) */}
            {canUpdateStatus ? (
              <form onSubmit={handleStatusSubmit} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-800 block">Update Status</span>
                <div className="flex gap-2">
                  <select
                    value={statusUpdateVal}
                    onChange={(e) => setStatusUpdateVal(e.target.value)}
                    className="px-3 py-1.5 border rounded-xl bg-white text-xs border-slate-200 focus:outline-blue-500"
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <Button type="submit" variant="primary" size="xs">
                    Save Status
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-500 text-[11px] flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Status updating is restricted to Clinic Administrators and Supervisors.</span>
              </div>
            )}

            {/* Confidential Internal Notes */}
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600" /> Internal Staff Notes
                </span>
                <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
                  Internal Only
                </span>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto">
                {currentFeedbackNotes.length === 0 ? (
                  <p className="text-slate-400 italic text-center py-1">No notes recorded.</p>
                ) : (
                  currentFeedbackNotes.map((note) => (
                    <div key={note.id} className="p-2 rounded-lg bg-white border border-amber-100 text-xs">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span className="font-semibold text-slate-700">{note.authorStaffName}</span>
                        <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-700 mt-0.5">{note.note}</p>
                    </div>
                  ))
                )}
              </div>

              {canAddInternalNotes ? (
                <form onSubmit={handleAddInternalNote} className="flex gap-2 pt-1 border-t border-amber-200/60">
                  <input
                    type="text"
                    placeholder="Add reception desk note..."
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs border border-amber-200 rounded-xl bg-white focus:outline-blue-500"
                  />
                  <Button type="submit" variant="outline" size="xs" disabled={!newInternalNote.trim()}>
                    Post
                  </Button>
                </form>
              ) : (
                <p className="text-[11px] text-slate-400 italic">Adding internal notes is disabled for your desk account.</p>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsDetailModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

