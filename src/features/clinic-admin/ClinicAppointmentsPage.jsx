import React, { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
=======
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
>>>>>>> origin/main
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
<<<<<<< HEAD
  PlusCircle,
  AlertTriangle,
  Stethoscope,
  FileText,
  Receipt,
  CheckCircle2
=======
  Calendar as CalendarIcon,
  Clock,
  User,
  PlusCircle,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Building2,
  Stethoscope
>>>>>>> origin/main
} from 'lucide-react';

export function ClinicAppointmentsPage() {
  const {
    activeClinic,
    activeBranch,
    appointments,
    doctors,
    createAppointment,
    updateAppointmentStatus,
    openWhatsAppModal,
    showToast
  } = useApp();

  const [viewMode, setViewMode] = useState('list'); // 'day', 'week', 'month', 'list'
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-10-23');

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // New Appointment Form State
  const [formDoctorId, setFormDoctorId] = useState(doctors[0]?.id || '');
  const [formPatientName, setFormPatientName] = useState('');
  const [formPatientPhone, setFormPatientPhone] = useState('');
<<<<<<< HEAD
  const [formServiceId, setFormServiceId] = useState(activeClinic?.services?.[0]?.id || '');
=======
  const [formServiceId, setFormServiceId] = useState(activeClinic.services[0]?.id || '');
>>>>>>> origin/main
  const [formDate, setFormDate] = useState('2026-10-23');
  const [formTime, setFormTime] = useState('11:30 AM');
  const [formNotes, setFormNotes] = useState('');

  // Conflict Check
  const hasConflict = appointments.some(
    (a) =>
      a.doctorId === formDoctorId &&
      a.date === formDate &&
      a.time === formTime &&
      !['Cancelled', 'No-show'].includes(a.status)
  );

  const filteredAppointments = appointments.filter((a) => {
<<<<<<< HEAD
=======
    const matchesClinic = a.clinicId === activeClinic?.id;
>>>>>>> origin/main
    const matchesBranch = !activeBranch || a.branchId === activeBranch.id;
    const matchesDoctor = selectedDoctorFilter === 'All' || a.doctorId === selectedDoctorFilter;
    const matchesStatus = selectedStatusFilter === 'All' || a.status === selectedStatusFilter;
    const matchesDate = viewMode === 'day' ? a.date === selectedDate : true;
<<<<<<< HEAD
    return matchesBranch && matchesDoctor && matchesStatus && matchesDate;
=======
    return matchesClinic && matchesBranch && matchesDoctor && matchesStatus && matchesDate;
>>>>>>> origin/main
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (hasConflict) {
      showToast('Cannot schedule: selected doctor has a conflicting booking at this date/time.', 'error');
      return;
    }
    const doc = doctors.find((d) => d.id === formDoctorId) || doctors[0];
    const srv = activeClinic.services.find((s) => s.id === formServiceId) || activeClinic.services[0];

    createAppointment({
      clinicId: activeClinic.id,
      branchId: activeBranch.id,
      doctorId: doc.id,
      doctorName: doc.name,
      patientId: `pt-${Math.floor(1050 + Math.random() * 500)}`,
      patientName: formPatientName,
      patientPhone: formPatientPhone,
      patientEmail: 'patient@demo.io',
      serviceId: srv.id,
      serviceName: srv.name,
      date: formDate,
      time: formTime,
      status: 'Confirmed',
      notes: formNotes
    });

    setIsNewModalOpen(false);
    setFormPatientName('');
    setFormPatientPhone('');
    setFormNotes('');
  };

  return (
<<<<<<< HEAD
    <div className="space-y-6 transition-colors">
=======
    <div className="space-y-6">
>>>>>>> origin/main
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {activeBranch?.name} Schedule
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Appointment Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {activeBranch?.name} Schedule
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Appointment Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Real-time schedule with conflict detection and status workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Modes */}
<<<<<<< HEAD
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 text-xs">
=======
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs">
>>>>>>> origin/main
            {['list', 'day', 'week', 'month'].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                  viewMode === m
                    ? 'bg-blue-600 text-white font-semibold'
<<<<<<< HEAD
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
=======
                    : 'text-slate-600 hover:text-slate-900'
>>>>>>> origin/main
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsNewModalOpen(true)}
          >
            New Booking
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
<<<<<<< HEAD
      <Card className="p-4 border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Filter by Doctor</label>
            <select
              value={selectedDoctorFilter}
              onChange={(e) => setSelectedDoctorFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Doctors</option>
              {doctors.filter((d) => d.clinicId === activeClinic?.id).map((d) => (
=======
      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter by Doctor</label>
            <select
              value={selectedDoctorFilter}
              onChange={(e) => setSelectedDoctorFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
            >
              <option value="All">All Doctors</option>
              {doctors.filter((d) => d.clinicId === activeClinic.id).map((d) => (
>>>>>>> origin/main
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Filter by Status</label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
=======
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter by Status</label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
>>>>>>> origin/main
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked In">Checked In</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Requested">Requested (Pending)</option>
              <option value="Cancelled">Cancelled</option>
              <option value="No-show">No-show</option>
            </select>
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Filter Date</label>
=======
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter Date</label>
>>>>>>> origin/main
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
<<<<<<< HEAD
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
=======
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
            />
          </div>
        </div>
      </Card>

      {/* Appointments List / Table */}
      <Card>
        <CardHeader
          title={`Scheduled Consultations (${filteredAppointments.length})`}
          subtitle={`Showing appointments for ${activeBranch?.name}`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
<<<<<<< HEAD
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12">#</th>
=======
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="p-3.5">Reference #</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Doctor & Service</th>
                <th className="p-3.5">Date & Slot</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 dark:text-slate-500">
=======
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
>>>>>>> origin/main
                    No appointments found matching current filters.
                  </td>
                </tr>
              ) : (
<<<<<<< HEAD
                filteredAppointments.map((apt, idx) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                      {apt.referenceNumber}
                      {apt.queueNumber && (
                        <span className="block text-[10px] font-bold text-blue-700 dark:text-blue-400">{apt.queueNumber}</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{apt.patientPhone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{apt.doctorName}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{apt.serviceName}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{apt.date}</div>
                      <div className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">🕒 {apt.time}</div>
=======
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {apt.referenceNumber}
                      {apt.queueNumber && (
                        <span className="block text-[10px] font-bold text-blue-700">{apt.queueNumber}</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400">{apt.patientPhone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">{apt.doctorName}</div>
                      <div className="text-[10px] text-slate-500">{apt.serviceName}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{apt.date}</div>
                      <div className="text-[10px] text-blue-700 font-medium">🕒 {apt.time}</div>
>>>>>>> origin/main
                    </td>
                    <td className="p-3.5">
                      <Badge variant={apt.status}>{apt.status}</Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
<<<<<<< HEAD
                        {['Checked In', 'Patient Checked In', 'In Consultation', 'In Progress'].includes(apt.status) && (
                          <Link to={`/clinic/consultations/${apt.id}`}>
                            <Button variant="primary" size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 font-bold">
                              <Stethoscope className="w-3.5 h-3.5 mr-1" />
                              Consult
                            </Button>
                          </Link>
                        )}
=======
>>>>>>> origin/main
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedAppointment(apt)}
                        >
                          Manage
                        </Button>
                        <button
                          onClick={() =>
                            openWhatsAppModal({
                              patient_name: apt.patientName,
<<<<<<< HEAD
                              clinic_name: activeClinic?.name || 'Clinic',
=======
                              clinic_name: activeClinic.name,
>>>>>>> origin/main
                              appointment_date: apt.date,
                              appointment_time: apt.time,
                              doctor_name: apt.doctorName,
                              appointment_reference: apt.referenceNumber,
<<<<<<< HEAD
                              clinic_phone: activeClinic?.phone || ''
                            })
                          }
                          className="px-2 py-1 rounded-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 cursor-pointer"
=======
                              clinic_phone: activeClinic.phone
                            })
                          }
                          className="px-2 py-1 rounded-md text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
>>>>>>> origin/main
                        >
                          WhatsApp
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Appointment Detail / Status Changer Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          title={`Manage Appointment: ${selectedAppointment.referenceNumber}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
<<<<<<< HEAD
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Patient:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Phone:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedAppointment.patientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Doctor:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedAppointment.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Time:</span>
                <span className="font-semibold text-blue-700 dark:text-blue-400">{selectedAppointment.date} at {selectedAppointment.time}</span>
              </div>
              {selectedAppointment.notes && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
=======
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-800">{selectedAppointment.patientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-semibold text-slate-900">{selectedAppointment.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time:</span>
                <span className="font-semibold text-blue-700">{selectedAppointment.date} at {selectedAppointment.time}</span>
              </div>
              {selectedAppointment.notes && (
                <div className="pt-2 border-t border-slate-200 text-slate-600">
>>>>>>> origin/main
                  <span className="font-semibold">Clinical Note:</span> {selectedAppointment.notes}
                </div>
              )}
            </div>

<<<<<<< HEAD
            {/* Clinical Workflow Shortcut */}
            {['Checked In', 'Patient Checked In', 'In Consultation', 'In Progress'].includes(selectedAppointment.status) ? (
              <Link to={`/clinic/consultations/${selectedAppointment.id}`} className="block">
                <Button variant="primary" size="sm" className="w-full font-bold shadow-sm">
                  <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
                  Launch Doctor Consultation & Rx Room
                </Button>
              </Link>
            ) : selectedAppointment.status === 'Completed' ? (
              <div className="grid grid-cols-2 gap-2">
                <Link to={`/clinic/consultations/${selectedAppointment.id}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    <FileText className="w-3.5 h-3.5 mr-1" />
                    Consultation Notes
                  </Button>
                </Link>
                <Link to="/clinic/finance/invoices">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    <Receipt className="w-3.5 h-3.5 mr-1" />
                    Patient Invoice
                  </Button>
                </Link>
              </div>
            ) : null}

            {/* Quick Status Changers */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Update Status</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Pending', 'Confirmed', 'Checked In', 'In Consultation', 'Completed', 'Cancelled', 'No Show'].map((st) => (
=======
            {/* Quick Status Changers */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">Update Status</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Confirmed', 'Checked In', 'In Progress', 'Completed', 'Cancelled', 'No-show'].map((st) => (
>>>>>>> origin/main
                  <button
                    key={st}
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, st);
                      setSelectedAppointment(null);
                    }}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedAppointment.status === st
<<<<<<< HEAD
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
=======
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
>>>>>>> origin/main
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

<<<<<<< HEAD
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
=======
            <div className="pt-3 border-t border-slate-100 flex justify-end">
>>>>>>> origin/main
              <Button variant="outline" size="sm" onClick={() => setSelectedAppointment(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Booking Form Modal with Conflict Detection */}
      {isNewModalOpen && (
        <Modal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          title="Schedule New Consultation"
          size="md"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            {/* Visual Conflict Warning */}
            {hasConflict && (
<<<<<<< HEAD
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Schedule Conflict Warning</p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                    Another appointment is already scheduled for this doctor at {formTime} on {formDate}.
=======
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Schedule Conflict Warning</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Another appointment is already scheduled for this doctor at {formTime} on {formDate}. (In production, the backend enforces non-overlapping slot allocation).
>>>>>>> origin/main
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
<<<<<<< HEAD
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Doctor *</label>
                <select
                  value={formDoctorId}
                  onChange={(e) => setFormDoctorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {doctors.filter((d) => d.clinicId === activeClinic?.id).map((d) => (
=======
                <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor *</label>
                <select
                  value={formDoctorId}
                  onChange={(e) => setFormDoctorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {doctors.filter((d) => d.clinicId === activeClinic.id).map((d) => (
>>>>>>> origin/main
                    <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Service / Procedure *</label>
                <select
                  value={formServiceId}
                  onChange={(e) => setFormServiceId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {activeClinic?.services?.map((s) => (
=======
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service / Procedure *</label>
                <select
                  value={formServiceId}
                  onChange={(e) => setFormServiceId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {activeClinic.services.map((s) => (
>>>>>>> origin/main
                    <option key={s.id} value={s.id}>{s.name} (₹{s.fee})</option>
                  ))}
                </select>
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Patient Full Name *</label>
=======
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name *</label>
>>>>>>> origin/main
                <input
                  required
                  type="text"
                  value={formPatientName}
                  onChange={(e) => setFormPatientName(e.target.value)}
                  placeholder="e.g. Meera Deshmukh"
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Patient Phone *</label>
=======
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Phone *</label>
>>>>>>> origin/main
                <input
                  required
                  type="tel"
                  value={formPatientPhone}
<<<<<<< HEAD
                  onChange={(e) => setFormPatientPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date *</label>
=======
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date *</label>
>>>>>>> origin/main
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Slot *</label>
                <select
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
=======
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot *</label>
                <select
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
>>>>>>> origin/main
                >
                  {['09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Clinical Note / Reason</label>
=======
              <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Note / Reason</label>
>>>>>>> origin/main
              <textarea
                rows={2}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Reason for consultation..."
<<<<<<< HEAD
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
=======
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
>>>>>>> origin/main
              <Button variant="outline" size="sm" onClick={() => setIsNewModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" disabled={hasConflict}>
                {hasConflict ? 'Slot Conflict' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
