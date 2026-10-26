import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
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
  const [formServiceId, setFormServiceId] = useState(activeClinic.services[0]?.id || '');
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
    const matchesBranch = !activeBranch || a.branchId === activeBranch.id;
    const matchesDoctor = selectedDoctorFilter === 'All' || a.doctorId === selectedDoctorFilter;
    const matchesStatus = selectedStatusFilter === 'All' || a.status === selectedStatusFilter;
    const matchesDate = viewMode === 'day' ? a.date === selectedDate : true;
    return matchesBranch && matchesDoctor && matchesStatus && matchesDate;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {activeBranch?.name} Schedule
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Appointment Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time schedule with conflict detection and status workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Modes */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs">
            {['list', 'day', 'week', 'month'].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                  viewMode === m
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
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
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter by Status</label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
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
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
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
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Reference #</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Doctor & Service</th>
                <th className="p-3.5">Date & Slot</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No appointments found matching current filters.
                  </td>
                </tr>
              ) : (
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
                    </td>
                    <td className="p-3.5">
                      <Badge variant={apt.status}>{apt.status}</Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
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
                              clinic_name: activeClinic.name,
                              appointment_date: apt.date,
                              appointment_time: apt.time,
                              doctor_name: apt.doctorName,
                              appointment_reference: apt.referenceNumber,
                              clinic_phone: activeClinic.phone
                            })
                          }
                          className="px-2 py-1 rounded-md text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
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
                  <span className="font-semibold">Clinical Note:</span> {selectedAppointment.notes}
                </div>
              )}
            </div>

            {/* Quick Status Changers */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">Update Status</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Confirmed', 'Checked In', 'In Progress', 'Completed', 'Cancelled', 'No-show'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, st);
                      setSelectedAppointment(null);
                    }}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedAppointment.status === st
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
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
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Schedule Conflict Warning</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Another appointment is already scheduled for this doctor at {formTime} on {formDate}. (In production, the backend enforces non-overlapping slot allocation).
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor *</label>
                <select
                  value={formDoctorId}
                  onChange={(e) => setFormDoctorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {doctors.filter((d) => d.clinicId === activeClinic.id).map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service / Procedure *</label>
                <select
                  value={formServiceId}
                  onChange={(e) => setFormServiceId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {activeClinic.services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} (₹{s.fee})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  required
                  type="text"
                  value={formPatientName}
                  onChange={(e) => setFormPatientName(e.target.value)}
                  placeholder="e.g. Meera Deshmukh"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Phone *</label>
                <input
                  required
                  type="tel"
                  value={formPatientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot *</label>
                <select
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {['09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Note / Reason</label>
              <textarea
                rows={2}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Reason for consultation..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
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

