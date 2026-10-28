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
  AlertCircle,
  List,
  LayoutGrid

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

  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'


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
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Desk Access Control</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Patient Feedback Inbox</h1>
        </div>

        <Card className="p-8 sm:p-12 text-center border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-950 dark:text-amber-200">Access Restricted: Feedback Viewing Disabled</h3>
            <p className="text-sm text-amber-800 dark:text-amber-300/80 mt-1.5 max-w-md mx-auto leading-relaxed">
              Your staff desk profile (<strong>{currentUser.name}</strong>) does not currently have the <code className="bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.5 rounded text-xs">view_patient_feedback</code> permission enabled for <strong>{activeClinic.name}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-900/50 text-xs text-slate-600 dark:text-slate-400 text-left space-y-1.5">
            <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Clinic Privacy Policy
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">

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
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Patient Experience</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Patient Feedback & Reviews</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Front-desk patient satisfaction inbox authorized for <strong className="text-slate-700 dark:text-slate-300">{currentUser.name}</strong>.

          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />

            Authorized Feedback Viewer
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search feedback by text or patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-950 dark:text-slate-100"

            />
          </div>

          <div>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"

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
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"

            >
              <option value="ALL">All Statuses</option>
              <option value="New">New</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong>{filteredFeedbacks.length}</strong> feedback records
          </span>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Feedback Records: Table Structure */}
      {filteredFeedbacks.length === 0 ? (
        <Card className="p-12 text-center border-slate-200 dark:border-slate-800 dark:bg-slate-900/90">
          <MessageSquareHeart className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">No feedback records found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try adjusting your filters or search keywords.</p>
        </Card>
      ) : viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center w-12">#</th>
                  <th className="py-3.5 px-4">Patient & Ref</th>
                  <th className="py-3.5 px-3">Rating</th>
                  <th className="py-3.5 px-3">Category</th>
                  <th className="py-3.5 px-4">Feedback Remarks</th>
                  <th className="py-3.5 px-3">Submitted</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredFeedbacks.map((fb, idx) => (
                  <tr
                    key={fb.id}
                    onClick={() => handleOpenDetails(fb)}
                    className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  >
                    <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {fb.patientName}
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                        {fb.referenceNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                          {fb.rating}.0
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-900/50 whitespace-nowrap">
                        {fb.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-sm">
                      <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-1 italic">
                        "{fb.message}"
                      </p>
                    </td>

                    <td className="py-3.5 px-3 text-xs text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">
                      {new Date(fb.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge variant={fb.status}>{fb.status}</Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleOpenDetails(fb)}
                        className="text-xs"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Reception OPD Feedback Roster ({filteredFeedbacks.length} submissions)</span>
            <span>Click any record to inspect and add internal notes</span>
          </div>
        </div>

      ) : (
        <div className="space-y-3">
          {filteredFeedbacks.map((fb) => (
            <Card
              key={fb.id}
              className="p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/60 dark:bg-slate-900/90 cursor-pointer transition-all hover:shadow-md"
              onClick={() => handleOpenDetails(fb)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-base shrink-0 border border-blue-100 dark:border-blue-800/50">

                    {fb.patientName?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{fb.patientName}</span>
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{fb.referenceNumber}</span>
                    </div>
                    <div className="flex items-center gap-2.5 mt-1">

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
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">({fb.rating}/5)</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-900/50">

                        {fb.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {new Date(fb.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                  <Badge variant={fb.status}>{fb.status}</Badge>
                  <Button variant="outline" size="sm">

                    View
                  </Button>
                </div>
              </div>

              <p className="mt-3.5 text-sm text-slate-700 dark:text-slate-300 line-clamp-2 italic leading-relaxed">"{fb.message}"</p>

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
          <div className="space-y-4 text-sm">
            {/* Header info */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{selectedFeedback.patientName}</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

                  Submitted {new Date(selectedFeedback.submittedAt).toLocaleString()}
                </p>
              </div>
              <Badge variant={selectedFeedback.status}>{selectedFeedback.status}</Badge>
            </div>

            {/* Review content */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Category: {selectedFeedback.category}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">Rating: {selectedFeedback.rating} / 5 Stars</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic pt-1 whitespace-pre-wrap leading-relaxed">"{selectedFeedback.message}"</p>
              {selectedFeedback.suggestions && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Patient Suggestions:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{selectedFeedback.suggestions}</p>

                </div>
              )}
            </div>

            {/* Status Update (Controlled by permission) */}
            {canUpdateStatus ? (
              <form onSubmit={handleStatusSubmit} className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2.5">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider">Update Status</span>

                <div className="flex gap-2">
                  <select
                    value={statusUpdateVal}
                    onChange={(e) => setStatusUpdateVal(e.target.value)}
                    className="px-3.5 py-2 border rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100 text-sm border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"

                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <Button type="submit" variant="primary" size="sm">

                    Save Status
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />

                <span>Status updating is restricted to Clinic Administrators and Supervisors.</span>
              </div>
            )}

            {/* Confidential Internal Notes */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Internal Staff Notes
                </span>
                <span className="text-xs text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full font-semibold">

                  Internal Only
                </span>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto">
                {currentFeedbackNotes.length === 0 ? (
                  <p className="text-slate-400 italic text-center py-2 text-xs">No notes recorded yet.</p>
                ) : (
                  currentFeedbackNotes.map((note) => (
                    <div key={note.id} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/40 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{note.authorStaffName}</span>
                        <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mt-1">{note.note}</p>

                    </div>
                  ))
                )}
              </div>

              {canAddInternalNotes ? (
                <form onSubmit={handleAddInternalNote} className="flex gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40">

                  <input
                    type="text"
                    placeholder="Add reception desk note..."
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-amber-200 dark:border-amber-900/60 rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="submit" variant="outline" size="sm" disabled={!newInternalNote.trim()}>

                    Post
                  </Button>
                </form>
              ) : (
                <p className="text-xs text-slate-400 italic">Adding internal notes is disabled for your desk account.</p>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">

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

