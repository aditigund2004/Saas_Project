<<<<<<< HEAD
import React from 'react';
=======
import React, { useState, useMemo } from 'react';
>>>>>>> origin/main
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
<<<<<<< HEAD
import { Phone, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export function ReceptionFollowUpsPage() {
  const { followUps, updateFollowUpStatus, openWhatsAppModal, activeClinic } = useApp();

  const pendingCount = followUps.filter((f) => f.status !== 'Completed').length;
  const completedCount = followUps.filter((f) => f.status === 'Completed').length;

=======
import { Modal } from '../../components/ui/Modal';
import {
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  Search,
  Filter,
  PhoneCall,
  CalendarDays,
  UserCheck,
  AlertTriangle,
  RotateCcw,
  Check
} from 'lucide-react';

export function ReceptionFollowUpsPage() {
  const { followUps, updateFollowUpStatus, openWhatsAppModal, activeClinic, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Due Today' | 'Upcoming' | 'Overdue' | 'Completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskForCall, setSelectedTaskForCall] = useState(null);
  const [outreachResult, setOutreachResult] = useState('Confirmed');
  const [newRescheduleDate, setNewRescheduleDate] = useState('');
  const [callNotes, setCallNotes] = useState('');

  const todayStr = '2026-10-23'; // Matches demo baseline date

  // Categorized counts
  const pendingCount = followUps.filter((f) => f.status !== 'Completed').length;
  const completedCount = followUps.filter((f) => f.status === 'Completed').length;

  const filteredTasks = useMemo(() => {
    return followUps.filter((task) => {
      // Search matching
      const matchesSearch =
        task.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.patientPhone.includes(searchQuery) ||
        (task.doctorName && task.doctorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.reason && task.reason.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Status / Time filtering
      if (activeTab === 'All') return true;
      if (activeTab === 'Completed') return task.status === 'Completed';

      if (task.status === 'Completed') return false;

      if (activeTab === 'Due Today') {
        return task.dueDate === todayStr || task.dueDate === new Date().toISOString().slice(0, 10);
      }
      if (activeTab === 'Overdue') {
        return task.dueDate < todayStr && task.dueDate < new Date().toISOString().slice(0, 10);
      }
      if (activeTab === 'Upcoming') {
        return task.dueDate >= todayStr;
      }

      return true;
    });
  }, [followUps, searchQuery, activeTab]);

  const handleOpenOutreachModal = (task) => {
    setSelectedTaskForCall(task);
    setOutreachResult('Confirmed');
    setCallNotes('');
    setNewRescheduleDate(task.dueDate || todayStr);
  };

  const handleSaveOutreach = (e) => {
    e.preventDefault();
    if (!selectedTaskForCall) return;

    if (outreachResult === 'Confirmed') {
      updateFollowUpStatus(selectedTaskForCall.id, 'Completed');
      showToast(`Outreach logged: Patient ${selectedTaskForCall.patientName} confirmed review appointment.`);
    } else if (outreachResult === 'Rescheduled') {
      updateFollowUpStatus(selectedTaskForCall.id, 'Rescheduled');
      showToast(`Follow-up for ${selectedTaskForCall.patientName} moved to ${newRescheduleDate}.`);
    } else if (outreachResult === 'Unreachable') {
      updateFollowUpStatus(selectedTaskForCall.id, 'Pending Callback');
      showToast(`Marked ${selectedTaskForCall.patientName} as unreachable. Scheduled for evening retry.`);
    } else {
      updateFollowUpStatus(selectedTaskForCall.id, 'Completed');
      showToast(`Patient ${selectedTaskForCall.patientName} reported complete recovery. Review closed.`);
    }

    setSelectedTaskForCall(null);
  };

>>>>>>> origin/main
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Patient Continuity</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Follow-Up Schedule & Recalls</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Proactively contact patients for post-procedure check-ins, aligner reviews, and suture removals.
=======
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Patient Continuity & Retention
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Follow-Up Schedule & Recalls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Proactively contact patients for post-procedure check-ins, aligner reviews, suture removals, and chronic refills.
>>>>>>> origin/main
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Recalls</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{followUps.length}</p>
          </div>
<<<<<<< HEAD
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Scheduled</span>
=======
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Scheduled In System</span>
>>>>>>> origin/main
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Pending</p>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</p>
          </div>
<<<<<<< HEAD
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg">Awaiting Outreach</span>
=======
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg">
            Awaiting Outreach
          </span>
>>>>>>> origin/main
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Outreach</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{completedCount}</p>
          </div>
<<<<<<< HEAD
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">Care Delivered</span>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
        <CardHeader
          title={`Follow-Up Tasks Queue (${followUps.length})`}
          subtitle="Trigger WhatsApp check-ins and schedule review consultations"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12">#</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Patient Details</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Clinical Reason</th>
                <th className="p-4">Contact Preference</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {followUps.map((task, idx) => (
                <tr key={task.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                    {idx + 1}
                  </td>
                  <td className="p-4 font-bold font-mono text-blue-700 dark:text-blue-400">{task.dueDate}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{task.patientName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{task.patientPhone}</div>
                  </td>
                  <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">{task.doctorName}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 max-w-xs">{task.reason}</td>
                  <td className="p-4">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {task.contactPreference}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={task.status}>{task.status}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          openWhatsAppModal({
                            patient_name: task.patientName,
                            clinic_name: activeClinic.name,
                            appointment_date: task.dueDate,
                            appointment_time: '11:00 AM',
                            doctor_name: task.doctorName,
                            appointment_reference: 'REV-CARE',
                            clinic_phone: activeClinic.phone
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </button>

                      {task.status !== 'Completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateFollowUpStatus(task.id, 'Completed')}
                        >
                          Mark Done
                        </Button>
                      )}

                      <Link to={`/reception/appointments/new?patientName=${task.patientName}`}>
                        <Button variant="ghost" size="sm">
                          Book Slot
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
=======
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">
            Care Delivered
          </span>
        </Card>
      </div>

      {/* Search and Filters Bar */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recalls by patient name, phone, doctor, or clinical reason..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {['All', 'Due Today', 'Upcoming', 'Overdue', 'Completed'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
        <CardHeader
          title={`Follow-Up Tasks Queue (${filteredTasks.length})`}
          subtitle="Trigger WhatsApp check-ins and log telephone outreach responses"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12">#</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Attending Doctor</th>
                <th className="p-3.5">Clinical Reason</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-400 dark:text-slate-500">
                    No follow-up recalls match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task, idx) => (
                  <tr key={task.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 font-bold font-mono text-blue-700 dark:text-blue-400 whitespace-nowrap">
                      {task.dueDate}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{task.patientName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{task.patientPhone}</div>
                    </td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200 font-medium whitespace-nowrap">
                      {task.doctorName}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {task.reason}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                        {task.contactPreference || 'WhatsApp & Call'}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <Badge variant={task.status === 'Completed' ? 'success' : task.status === 'Pending' ? 'warning' : 'teal'}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            openWhatsAppModal({
                              patient_name: task.patientName,
                              clinic_name: activeClinic?.name || 'CityCare Family Clinic',
                              appointment_date: task.dueDate,
                              appointment_time: '11:00 AM',
                              doctor_name: task.doctorName,
                              appointment_reference: 'REV-CARE',
                              clinic_phone: activeClinic?.phone || '+91 98220 12345'
                            })
                          }
                          className="px-2 py-1 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 cursor-pointer flex items-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" /> WhatsApp
                        </button>

                        <Button
                          variant="outline"
                          size="sm"
                          icon={PhoneCall}
                          onClick={() => handleOpenOutreachModal(task)}
                          className="h-7 text-xs px-2 text-blue-700 dark:text-blue-300"
                        >
                          Log Call
                        </Button>

                        <Link to={`/reception/appointments/new?patientName=${encodeURIComponent(task.patientName)}`}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                            Book
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
>>>>>>> origin/main
            </tbody>
          </table>
        </div>
      </Card>
<<<<<<< HEAD
=======

      {/* Log Outreach Call Modal */}
      {selectedTaskForCall && (
        <Modal
          isOpen={!!selectedTaskForCall}
          onClose={() => setSelectedTaskForCall(null)}
          title={`Log Phone Call Outreach: ${selectedTaskForCall.patientName}`}
          size="md"
        >
          <form onSubmit={handleSaveOutreach} className="space-y-4 text-xs text-slate-800 dark:text-slate-200">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-900 dark:text-blue-300 text-xs">
                  {selectedTaskForCall.patientName} ({selectedTaskForCall.patientPhone})
                </span>
                <span className="font-mono text-xs text-slate-500">Due: {selectedTaskForCall.dueDate}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Reason: {selectedTaskForCall.reason} · Assigned: {selectedTaskForCall.doctorName}
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Outreach Call Result *</label>
              <select
                value={outreachResult}
                onChange={(e) => setOutreachResult(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Confirmed">Patient Confirmed Attendance for Visit</option>
                <option value="Rescheduled">Patient Requested Reschedule Date</option>
                <option value="Unreachable">Phone Ringing / Unanswered (Retry Later)</option>
                <option value="Recovered">Patient Fully Recovered / Review Discharged</option>
              </select>
            </div>

            {outreachResult === 'Rescheduled' && (
              <div>
                <label className="block font-semibold mb-1 text-blue-700 dark:text-blue-300">
                  New Rescheduled Follow-Up Date *
                </label>
                <input
                  required
                  type="date"
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold mb-1">Conversation Notes</label>
              <textarea
                rows={2}
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="e.g. Patient feeling much better, pain subsiding, confirmed appointment for Thursday..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setSelectedTaskForCall(null)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="font-bold">
                Save Call Record
              </Button>
            </div>
          </form>
        </Modal>
      )}
>>>>>>> origin/main
    </div>
  );
}
