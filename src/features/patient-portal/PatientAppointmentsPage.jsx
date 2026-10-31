import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
  AlertCircle,
  Star,
  CreditCard,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import { DemoPatientSwitcher } from '../../components/patient/DemoPatientSwitcher';
import { DoctorPaymentModal } from '../../components/patient/DoctorPaymentModal';

export function PatientAppointmentsPage() {
  const {
    appointments,
    updateAppointmentStatus,
    showToast,
    currentUser,
    activePatientId,
    patients = [],
    feedbacks = [],
    formatCurrency
  } = useApp();
  const [filter, setFilter] = useState('All');
  const [cancelModal, setCancelModal] = useState({ isOpen: false, apt: null });
  const [paymentModalApt, setPaymentModalApt] = useState(null);

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  // Patient appointments
  const myAppointments = appointments.filter(
    (a) =>
      a.patientId === activePatient?.id ||
      a.patientId === activePatient?.patientIdNumber ||
      a.patientName === activePatient?.name
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
      <DemoPatientSwitcher />

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
      <Card padding="none" className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12">#</th>
                <th className="p-4">Reference #</th>
                <th className="p-4">Clinic Name</th>
                <th className="p-4">Doctor & Service</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Consultation Fee</th>
                <th className="p-4">Queue / Mode</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-10 text-center text-slate-400 dark:text-slate-500 text-sm">
                    No appointments found matching this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((apt, idx) => {
                  const isUpcoming = ['Confirmed', 'Patient Checked In', 'Checked In'].includes(apt.status);
                  const isCompleted = apt.status === 'Completed';
                  const fee = Number(apt.consultationFee) || 600;
                  const isPaid = apt.paymentStatus === 'Paid';

                  return (
                    <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="p-4 font-mono font-bold text-blue-700 dark:text-blue-400">
                        {apt.referenceNumber || apt.requestId}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{apt.clinicName || 'ClinicOS Partner'}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{apt.branchName}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{apt.doctorName}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{apt.serviceName}</div>
                      </td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">
                        <div className="font-semibold">{apt.confirmedDate || apt.date}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{apt.confirmedTime || apt.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                          ₹{fee.toLocaleString('en-IN')}
                        </div>
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            <Clock className="w-3 h-3" /> Fee Due
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {apt.queueNumber ? (
                          <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-mono text-xs font-bold border border-blue-200/50 dark:border-blue-900/50">
                            Token {apt.queueNumber}
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400 text-xs">In-Person OPD</span>
                        )}
                      </td>
                      <td className="p-4">
                        {getStatusBadge(apt.status)}
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        {!isPaid && apt.status !== 'Cancelled' && apt.status !== 'Rejected' && (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={CreditCard}
                            onClick={() => setPaymentModalApt(apt)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                          >
                            Pay Fee
                          </Button>
                        )}
                        {isPaid && (
                          <Link to="/patient/receipts">
                            <Button variant="ghost" size="sm" icon={Receipt} className="text-emerald-700 dark:text-emerald-400">
                              Receipt
                            </Button>
                          </Link>
                        )}
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
                          <>
                            <Link to={`/patient/feedback?appointment=${apt.id}`}>
                              <Button variant="outline" size="sm" className="text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800 bg-amber-50/50 hover:bg-amber-100 dark:hover:bg-amber-950/40">
                                <Star className="w-3.5 h-3.5 mr-1 fill-amber-500 text-amber-500" />
                                Rate Visit
                              </Button>
                            </Link>
                            <Link to="/patient/records">
                              <Button variant="ghost" size="sm" icon={FileText}>
                                Visit Record
                              </Button>
                            </Link>
                          </>
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

      {/* Doctor Consultation Fee Payment Gateway Modal */}
      <DoctorPaymentModal
        isOpen={!!paymentModalApt}
        onClose={() => setPaymentModalApt(null)}
        appointment={paymentModalApt}
      />
    </div>
  );
}
