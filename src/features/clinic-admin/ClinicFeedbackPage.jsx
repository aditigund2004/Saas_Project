import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { feedbackService } from '../../services/feedbackService';
import {
  MessageSquareHeart,
  Star,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Calendar,
  User,
  Phone,
  Mail,
  Shield,
  Lock,
  PlusCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Eye,
  Send,
  HelpCircle,
  FileText
} from 'lucide-react';

const CATEGORY_COLORS = {
  'Doctor Care': 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
  'Waiting Time': 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
  'Clinic Cleanliness': 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
  'Reception & Staff': 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/50',
  'Billing & Value': 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/50',
  'General Experience': 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900/50'
};

export function ClinicFeedbackPage() {
  const {
    feedbacks,
    feedbackNotes,
    feedbackActivities,
    activeClinic,
    updateFeedbackStatus,
    addFeedbackInternalNote,
    showToast
  } = useApp();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRating, setSelectedRating] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modal / Drawer State
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusUpdateVal, setStatusUpdateVal] = useState('Reviewed');
  const [resolutionNoteInput, setResolutionNoteInput] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');

  // Scoped feedbacks for active clinic
  const clinicFeedbacks = useMemo(() => {
    return feedbacks.filter((f) => f.clinicId === activeClinic.id);
  }, [feedbacks, activeClinic.id]);

  // KPI Metrics
  const metrics = useMemo(() => {
    return feedbackService.calculateMetrics(clinicFeedbacks);
  }, [clinicFeedbacks]);

  // Filtered feedbacks
  const filteredFeedbacks = useMemo(() => {
    return clinicFeedbacks.filter((fb) => {
      const matchSearch =
        fb.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (fb.suggestions && fb.suggestions.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchBranch = selectedBranch === 'ALL' || fb.branchId === selectedBranch;
      const matchCategory = selectedCategory === 'ALL' || fb.category === selectedCategory;
      const matchRating = selectedRating === 'ALL' || fb.rating === Number(selectedRating);
      const matchStatus = selectedStatus === 'ALL' || fb.status === selectedStatus;

      return matchSearch && matchBranch && matchCategory && matchRating && matchStatus;
    });
  }, [clinicFeedbacks, searchTerm, selectedBranch, selectedCategory, selectedRating, selectedStatus]);

  // Open Details Modal
  const handleOpenDetails = (fb) => {
    setSelectedFeedback(fb);
    setStatusUpdateVal(fb.status);
    setResolutionNoteInput(fb.resolutionNote || '');
    setNewInternalNote('');
    setIsDetailModalOpen(true);
  };

  // Handle status update
  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (!selectedFeedback) return;
    updateFeedbackStatus(selectedFeedback.id, statusUpdateVal, resolutionNoteInput.trim() || undefined);
    setSelectedFeedback({
      ...selectedFeedback,
      status: statusUpdateVal,
      resolutionNote: resolutionNoteInput.trim() || selectedFeedback.resolutionNote
    });
    showToast(`Feedback status updated to ${statusUpdateVal}`);
  };

  // Handle internal note add
  const handleAddInternalNote = (e) => {
    e.preventDefault();
    if (!selectedFeedback || !newInternalNote.trim()) return;
    addFeedbackInternalNote(selectedFeedback.id, newInternalNote.trim());
    setNewInternalNote('');
    showToast('Confidential internal note saved.');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBranch('ALL');
    setSelectedCategory('ALL');
    setSelectedRating('ALL');
    setSelectedStatus('ALL');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Patient Experience & Quality</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Patient Feedback & Ratings Inbox</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Confidential quality insights submitted by verified patients across <strong>{activeClinic.name}</strong> branches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Clinic-Admin Confidential Scope
          </span>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Submissions</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{metrics.total}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">All-time clinic reviews</span>
        </Card>

        <Card className="p-4 border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20">
          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">New / Unread</span>
          <p className="text-2xl font-black text-blue-700 dark:text-blue-300 mt-1">{metrics.newCount}</p>
          <span className="text-[10px] text-blue-600 dark:text-blue-400">Pending initial review</span>
        </Card>

        <Card className="p-4 border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20">
          <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">In Review</span>
          <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300 mt-1 tabular-nums">{metrics.reviewedCount}</p>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400">Investigating feedback</span>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20">
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Resolved</span>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{metrics.resolvedCount}</p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Addressed with patient</span>
        </Card>

        <Card className="p-4 border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Avg Patient Score</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl font-black text-amber-900 dark:text-amber-100">{metrics.averageRating}</span>
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <span className="text-[10px] text-amber-700 dark:text-amber-300 font-medium">Out of 5.0 Stars</span>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search feedback, patient name, ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Branch Filter */}
          <div>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
            >
              <option value="ALL">All Branches</option>
              {activeClinic.branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
            >
              <option value="ALL">All Categories</option>
              <option value="Doctor Care">Doctor Care</option>
              <option value="Waiting Time">Waiting Time</option>
              <option value="Clinic Cleanliness">Clinic Cleanliness</option>
              <option value="Reception & Staff">Reception & Staff</option>
              <option value="Billing & Value">Billing & Value</option>
              <option value="General Experience">General Experience</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 focus:outline-blue-500 text-slate-700 dark:text-slate-200"
            >
              <option value="ALL">All Ratings</option>
              <option value="5">5 Stars (Excellent)</option>
              <option value="4">4 Stars (Very Good)</option>
              <option value="3">3 Stars (Good / Average)</option>
              <option value="2">2 Stars (Fair)</option>
              <option value="1">1 Star (Needs Attention)</option>
            </select>
          </div>
        </div>

        {/* Secondary controls row */}
        <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong>{filteredFeedbacks.length}</strong> submission{filteredFeedbacks.length === 1 ? '' : 's'}
            </span>
            {(searchTerm || selectedBranch !== 'ALL' || selectedCategory !== 'ALL' || selectedRating !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium ml-2 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'ALL', label: 'All Reviews', count: clinicFeedbacks.length },
              { id: 'New', label: 'New / Unread', count: metrics.newCount },
              { id: 'Reviewed', label: 'In Review', count: metrics.reviewedCount },
              { id: 'Resolved', label: 'Resolved', count: metrics.resolvedCount }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  selectedStatus === st.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedStatus === st.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {st.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Structured Patient Feedback Table */}
      {filteredFeedbacks.length === 0 ? (
        <Card className="p-12 text-center border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white">No feedback entries found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            No patient reviews matched your search query or filter selections.
          </p>
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50/90 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-3 text-center w-12 font-semibold">#</th>
                  <th className="py-3.5 px-4 font-semibold">Patient & Reference</th>
                  <th className="py-3.5 px-3 font-semibold">Rating</th>
                  <th className="py-3.5 px-3 font-semibold">Category</th>
                  <th className="py-3.5 px-3 font-semibold">Branch Location</th>
                  <th className="py-3.5 px-4 font-semibold">Patient Review Message</th>
                  <th className="py-3.5 px-3 font-semibold">Submitted</th>
                  <th className="py-3.5 px-3 font-semibold">Status</th>
                  <th className="py-3.5 px-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredFeedbacks.map((fb, idx) => {
                  const branchName =
                    activeClinic.branches?.find((b) => b.id === fb.branchId)?.name ||
                    fb.branchName ||
                    'Main Clinic Hub';
                  const catClass =
                    CATEGORY_COLORS[fb.category] ||
                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';

                  return (
                    <tr
                      key={fb.id}
                      onClick={() => handleOpenDetails(fb)}
                      className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                    >
                      {/* Index */}
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>

                      {/* Patient & Ref */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {fb.patientName?.charAt(0) || 'P'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {fb.patientName}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200/80 dark:border-slate-700/80">
                                {fb.referenceNumber}
                              </span>
                              {fb.appointmentRef && (
                                <span className="text-[10px] text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 px-1.5 py-0.5 rounded font-mono font-medium">
                                  {fb.appointmentRef}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= fb.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-200 dark:text-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            {fb.rating}.0 / 5.0
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wide ${catClass}`}
                        >
                          {fb.category}
                        </span>
                      </td>

                      {/* Branch Location */}
                      <td className="py-3.5 px-3 text-xs text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{branchName}</span>
                        </div>
                      </td>

                      {/* Patient Feedback */}
                      <td className="py-3.5 px-4 max-w-xs sm:max-w-sm">
                        <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 italic leading-relaxed">
                          "{fb.message}"
                        </p>
                        {fb.suggestions && (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 flex items-center gap-1 mt-0.5">
                            <span className="text-amber-500 font-bold">💡</span>
                            <span className="truncate">{fb.suggestions}</span>
                          </p>
                        )}
                      </td>

                      {/* Date Submitted */}
                      <td className="py-3.5 px-3 text-xs text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>
                            {new Date(fb.submittedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <Badge variant={fb.status}>
                          {fb.status === 'Reviewed' ? 'In Review' : fb.status}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td
                        className="py-3.5 px-4 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => handleOpenDetails(fb)}
                          className="font-semibold text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Summary Footer */}
          <div className="p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span className="font-medium">
              Showing <strong>{filteredFeedbacks.length}</strong> patient feedback submissions
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Click any row or &quot;Inspect&quot; to view internal notes, patient contact info, and resolve reviews
            </span>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* FEEDBACK DETAIL & INTERNAL NOTES DRAWER / MODAL */}
      {/* ========================================================================= */}
      {isDetailModalOpen && selectedFeedback && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Patient Feedback: ${selectedFeedback.referenceNumber}`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Header Summary */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedFeedback.patientName}</span>
                  <Badge variant={selectedFeedback.status}>{selectedFeedback.status}</Badge>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>{selectedFeedback.patientPhone || 'No phone recorded'}</span>
                  <span>•</span>
                  <span>{selectedFeedback.patientEmail || 'No email recorded'}</span>
                  <span>•</span>
                  <span>{new Date(selectedFeedback.submittedAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Star Rating Display */}
              <div className="flex items-center gap-1.5 p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= selectedFeedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200 ml-1">{selectedFeedback.rating} / 5</span>
              </div>
            </div>

            {/* Category & Branch pill */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 font-semibold">
                Category: {selectedFeedback.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Facility: {selectedFeedback.branchName || 'Downtown Facility'}
              </span>
              {selectedFeedback.appointmentRef && (
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 font-mono">
                  Linked Visit: {selectedFeedback.appointmentRef}
                </span>
              )}
            </div>

            {/* Full Patient Message */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Patient Written Review</span>
              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed italic whitespace-pre-wrap">
                "{selectedFeedback.message}"
              </p>
              {selectedFeedback.suggestions && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Constructive Suggestions:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">{selectedFeedback.suggestions}</p>
                </div>
              )}
            </div>

            {/* Resolution Note if set */}
            {selectedFeedback.resolutionNote && (
              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Clinic Resolution Message to Patient
                </span>
                <p className="text-emerald-900 dark:text-emerald-200 text-xs">{selectedFeedback.resolutionNote}</p>
              </div>
            )}

            {/* Status Update Form */}
            <form onSubmit={handleStatusSubmit} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Update Feedback Review Status
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Status Workflow</label>
                  <select
                    value={statusUpdateVal}
                    onChange={(e) => setStatusUpdateVal(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 focus:outline-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="New">New (Unreviewed)</option>
                    <option value="Reviewed">Reviewed (Under Investigation)</option>
                    <option value="Resolved">Resolved (Addressed)</option>
                    <option value="Reopened">Reopened (Follow-up needed)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Response / Resolution Note for Patient</label>
                  <input
                    type="text"
                    placeholder="e.g. Spoke with Dr. Rao. Follow-up voucher provided."
                    value={resolutionNoteInput}
                    onChange={(e) => setResolutionNoteInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-700 focus:outline-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="sm">
                  Update Status
                </Button>
              </div>
            </form>

            {/* Confidential Internal Staff Notes Section */}
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-bold">
                  <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Confidential Internal Staff Notes</span>
                </div>
                <span className="text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                  Never visible to patients
                </span>
              </div>

              {/* Note History List */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {currentFeedbackNotes.length === 0 ? (
                  <p className="text-slate-400 dark:text-slate-500 italic text-center py-2">No internal staff notes posted yet.</p>
                ) : (
                  currentFeedbackNotes.map((note) => (
                    <div key={note.id} className="p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/30 bg-white dark:bg-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{note.authorStaffName} ({note.authorRole})</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{note.note}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Internal Note */}
              <form onSubmit={handleAddInternalNote} className="flex gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
                <input
                  type="text"
                  placeholder="Add private staff observation, phone follow-up note, doctor discussion..."
                  value={newInternalNote}
                  onChange={(e) => setNewInternalNote(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-amber-200 dark:border-amber-900/40 rounded-xl focus:outline-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
                <Button type="submit" variant="outline" size="sm" icon={Send} disabled={!newInternalNote.trim()}>
                  Post Note
                </Button>
              </form>
            </div>

            {/* Activity History Audit Trail */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Audit Trail</span>
              <div className="space-y-1.5">
                {currentFeedbackActivities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>{act.action}</span>
                    </div>
                    <span className="text-slate-400 dark:text-slate-500">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
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

