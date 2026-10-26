import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
<<<<<<< HEAD
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
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
  AlertCircle
} from 'lucide-react';

export function PatientAppointmentsPage() {
  const { appointments, updateAppointmentStatus, showToast, currentUser, formatCurrency } = useApp();
  const [filter, setFilter] = useState('All');
  const [cancelModal, setCancelModal] = useState({ isOpen: false, apt: null });

  // Patient appointments
  const myAppointments = appointments.filter(
    (a) => a.patientName === currentUser?.name || a.patientId === 'pt-1041' || !a.patientId
=======
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { belongsToCurrentPatient } from './patientDataAccess';
import {
  PlusCircle,
  Clock,
  Eye,
  FileText,
} from 'lucide-react';

export function PatientAppointmentsPage() {
  const { appointments, updateAppointmentStatus, showToast, currentUser } = useApp();
  const [filter, setFilter] = useState('All');
  const [cancelModal, setCancelModal] = useState({ isOpen: false, apt: null });

  const myAppointments = appointments.filter((appointment) =>
    belongsToCurrentPatient(appointment, currentUser)
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Patient Care Schedule
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Consultations & Appointments</h1>
          <p className="text-xs text-slate-500">
            View upcoming visits, check in at reception, and download consultation summaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingRequestsCount > 0 && (
            <Link to="/patient/appointments/requests">
              <Button variant="outline" size="sm" className="relative border-amber-300 bg-amber-50 text-amber-900 font-semibold">
                <Clock className="w-3.5 h-3.5 mr-1 text-amber-700" />
                Requests Queue ({pendingRequestsCount})
              </Button>
            </Link>
          )}
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="sm" icon={PlusCircle}>
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <Link
          to="/patient/appointments/requests"
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          <span>Looking for unverified booking requests?</span>
          <span className="font-bold">View Requests Page &rarr;</span>
        </Link>
      </div>

      {/* Appointments Table Card */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Reference #</th>
                <th className="p-3.5">Clinic Name</th>
                <th className="p-3.5">Doctor & Service</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Queue / Mode</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No appointments found matching this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((apt) => {
                  const isUpcoming = ['Confirmed', 'Patient Checked In', 'Checked In'].includes(apt.status);
                  const isCompleted = apt.status === 'Completed';

                  return (
                    <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {apt.referenceNumber || apt.requestId}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{apt.clinicName || 'ClinicOS Partner'}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{apt.branchName}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{apt.doctorName}</div>
                        <div className="text-[11px] text-slate-500">{apt.serviceName}</div>
                      </td>
                      <td className="p-3.5 font-mono text-slate-800">
                        <div>{apt.confirmedDate || apt.date}</div>
                        <div className="text-[11px] text-slate-500">{apt.confirmedTime || apt.time}</div>
                      </td>
                      <td className="p-3.5">
                        {apt.queueNumber ? (
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                            Token {apt.queueNumber}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">In-Person OPD</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {getStatusBadge(apt.status)}
                      </td>
                      <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <Link to={`/patient/appointments/${apt.id}`}>
                          <Button variant="outline" size="xs" icon={Eye}>
                            Details
                          </Button>
                        </Link>
                        {isUpcoming && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => setCancelModal({ isOpen: true, apt })}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Cancel
                          </Button>
                        )}
                        {isCompleted && (
                          <Link to="/patient/records">
                            <Button variant="ghost" size="xs" icon={FileText}>
                              Visit Record
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
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
