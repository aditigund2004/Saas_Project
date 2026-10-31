import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { TablePagination } from '../../components/ui/Table';

import {
  Calendar,
  PlusCircle,
  Clock,
  Building2,
  Stethoscope,
  Eye,
  XCircle,
  FileText,
  Printer,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { calculateEndTime } from '../../utils/aiAppointmentDuration';

export function PatientAppointmentsPage() {
  const { appointments, updateAppointmentStatus, showToast, currentUser, familyMembers = [], formatCurrency } = useApp();
  const [filter, setFilter] = useState('All');
  const [cancelModal, setCancelModal] = useState({ isOpen: false, apt: null });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Patient appointments (including self and managed family members)
  const myAppointments = appointments.filter(
    (a) =>
      a.patientName === currentUser?.name ||
      a.patientId === 'pt-1041' ||
      a.patientId === currentUser?.id ||
      !a.patientId ||
      familyMembers.some((fm) => fm.name === a.patientName)

  );

  // Separate requests from confirmed/historical appointments
  const pendingRequestsCount = myAppointments.filter(
    (a) => a.status === 'Pending Clinic Confirmation' || a.status === 'Alternative Slot Proposed' || a.status === 'Awaiting Patient Response'
  ).length;

  const filtered = myAppointments.filter((a) => {
    if (filter === 'Upcoming') {
      return ['Confirmed', 'Patient Checked In', 'Checked In', 'In Consultation', 'In Progress'].includes(a.status);
    }
    if (filter === 'Completed') return a.status === 'Completed';
    if (filter === 'Cancelled') return a.status === 'Cancelled' || a.status === 'Rejected';
    return true;
  });

  const handleCancelConfirm = () => {
    if (!cancelModal.apt) return;
    updateAppointmentStatus(cancelModal.apt.id, 'Cancelled');
    showToast(`Appointment ${cancelModal.apt.referenceNumber || cancelModal.apt.requestId} has been cancelled.`);
    setCancelModal({ isOpen: false, apt: null });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'Patient Checked In':
      case 'Checked In':
        return <Badge variant="info">Checked In</Badge>;
      case 'In Consultation':
      case 'In Progress':
        return <Badge variant="purple">In Consultation</Badge>;
      case 'Completed':
        return <Badge variant="default">Completed</Badge>;
      case 'Pending Clinic Confirmation':
      case 'Alternative Slot Proposed':
      case 'Awaiting Patient Response':
        return <Badge variant="warning">{status}</Badge>;
      case 'Cancelled':
      case 'Rejected':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 uppercase tracking-wider">
              Patient Care Schedule
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">My Consultations & Appointments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View upcoming visits, check in at reception, and download consultation summaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pendingRequestsCount > 0 && (
            <Link to="/patient/appointments/requests">
              <Button variant="outline" size="md" className="relative border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold">
                <Clock className="w-4 h-4 mr-1.5 text-amber-600 dark:text-amber-400" />
                Requests Queue ({pendingRequestsCount})
              </Button>
            </Link>
          )}
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="md" icon={PlusCircle} className="shadow-md shadow-blue-500/20 font-bold">
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Requests Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <Link
          to="/patient/appointments/requests"
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
        >
          <span>Looking for unverified booking requests?</span>
          <span className="font-bold">View Requests Page &rarr;</span>
        </Link>
      </div>

      {/* Appointments Table Card */}
      <Card padding="none" className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-200 dark:border-slate-800 tracking-wider">
              <tr>
                <th className="px-4 py-3 sm:px-5">Reference #</th>
                <th className="px-4 py-3 sm:px-5">Clinic Name</th>
                <th className="px-4 py-3 sm:px-5">Doctor & Service</th>
                <th className="px-4 py-3 sm:px-5">Date & Time</th>
                <th className="px-4 py-3 sm:px-5">Queue / Mode</th>
                <th className="px-4 py-3 sm:px-5">Status</th>
                <th className="px-4 py-3 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                    <div className="max-w-xs mx-auto space-y-1">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">No appointments found</p>
                      <p className="text-xs">No visits match this status filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((apt) => {
                    const isUpcoming = ['Confirmed', 'Patient Checked In', 'Checked In'].includes(apt.status);
                    const isCompleted = apt.status === 'Completed';

                    return (
                      <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3.5 sm:px-5 font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                          {apt.referenceNumber || apt.requestId}
                        </td>
                        <td className="px-4 py-3.5 sm:px-5">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{apt.clinicName || 'ClinicOS Partner'}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{apt.branchName}</div>
                        </td>
                        <td className="px-4 py-3.5 sm:px-5">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{apt.doctorName}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{apt.serviceName}</div>
                          {apt.relationship && apt.relationship !== 'Self' && (
                            <span className="inline-block mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                              For {apt.patientName} ({apt.relationship})
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 sm:px-5 font-mono text-slate-800 dark:text-slate-200">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{apt.confirmedDate || apt.date}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>{apt.confirmedTime || apt.time} → {calculateEndTime(apt.confirmedTime || apt.time, apt.durationMinutes || 30)}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                              {apt.durationMinutes || 30}m
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 sm:px-5">
                          {apt.queueNumber ? (
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-mono text-[11px] font-bold border border-blue-200/50 dark:border-blue-900/50">
                              Token {apt.queueNumber}
                            </span>
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400 text-xs">In-Person OPD</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 sm:px-5">
                          {getStatusBadge(apt.status)}
                        </td>
                        <td className="px-4 py-3.5 sm:px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link to={`/patient/appointments/${apt.id}`}>
                              <Button variant="outline" size="sm" icon={Eye}>
                                Details
                              </Button>
                            </Link>
                            {isUpcoming && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCancelModal({ isOpen: true, apt })}
                                className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                              >
                                Cancel
                              </Button>
                            )}
                            {isCompleted && (
                              <Link to="/patient/records">
                                <Button variant="ghost" size="sm" icon={FileText}>
                                  Record
                                </Button>
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })

              )}
            </tbody>
          </table>
        </div>
        {filtered.length > pageSize && (
          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(filtered.length / pageSize)}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}

      </Card>

      {/* Cancel Appointment Modal */}
      <Modal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, apt: null })}
        title="Cancel Appointment"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Are you sure you want to cancel your appointment with <strong>{cancelModal.apt?.doctorName}</strong> at <strong>{cancelModal.apt?.clinicName}</strong> on <strong>{cancelModal.apt?.date} at {cancelModal.apt?.time}</strong>?
          </p>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
            Please note: Cancellation policies apply. You may submit a new booking request at any time.
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setCancelModal({ isOpen: false, apt: null })}>
              Keep Appointment
            </Button>
            <Button variant="primary" size="sm" onClick={handleCancelConfirm} className="bg-red-600 hover:bg-red-700">
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
