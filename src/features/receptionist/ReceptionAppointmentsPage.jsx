import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, PlusCircle, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ReceptionAppointmentsPage() {
  const {
    appointments,
    activeBranch,
    activeClinic,
    updateAppointmentStatus,
    openWhatsAppModal
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const branchAppointments = appointments.filter((a) => !activeBranch || a.branchId === activeBranch.id);

  const filtered = branchAppointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Schedule Master</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Reception Appointment Schedule</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Check in patients, call into consultation, or trigger WhatsApp visit updates.
          </p>
        </div>

        <Link to="/reception/appointments/new">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            + Book Appointment
          </Button>
        </Link>
      </div>

      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name, reference number, or doctor..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked In">Checked In</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Requested">Requested</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          title={`All Scheduled Appointments (${filtered.length})`}
          subtitle={`Current active branch: ${activeBranch?.name}`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Reference #</th>
                <th className="p-3.5">Patient Name</th>
                <th className="p-3.5">Doctor & Service</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((apt) => (
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
                      {apt.status === 'Confirmed' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateAppointmentStatus(apt.id, 'Checked In')}
                        >
                          Check In
                        </Button>
                      )}
                      {apt.status === 'Checked In' && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => updateAppointmentStatus(apt.id, 'In Progress')}
                        >
                          Call Doctor
                        </Button>
                      )}
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
                        className="px-2 py-1 rounded text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                      >
                        WhatsApp
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

