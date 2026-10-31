import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, PlusCircle, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ReceptionAppointmentsPage() {
  const {
    appointments = [],
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Schedule Master</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Reception Appointment Schedule</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Check in patients, call into consultation, or trigger WhatsApp visit updates.
          </p>
        </div>

        <Link to="/reception/appointments/new">
          <Button variant="primary" size="sm">
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Book Appointment
          </Button>
        </Link>
      </div>

      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name, reference number, or doctor..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardHeader
          title={`All Scheduled Appointments (${filtered.length})`}
          subtitle={`Current active branch: ${activeBranch?.name || 'Main Clinic'}`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12">#</th>
                <th className="p-3.5">Reference #</th>
                <th className="p-3.5">Patient Name</th>
                <th className="p-3.5">Doctor & Service</th>
                <th className="p-3.5">Date & Time</th>

                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">

                    No appointments match your search or filter.
                  </td>
                </tr>
              ) : (
                filtered.map((apt, idx) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white text-xs">
                      {apt.referenceNumber}
                      {apt.queueNumber && (
                        <span className="block text-xs font-bold text-blue-700 dark:text-blue-400">{apt.queueNumber}</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{apt.patientName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{apt.patientPhone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{apt.doctorName}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{apt.serviceName}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{apt.date}</div>
                      <div className="text-xs text-blue-700 dark:text-blue-400 font-medium">🕒 {apt.time}</div>
                    </td>
                    <td className="p-3.5">

                      <Badge variant={apt.status} size="sm">{apt.status}</Badge>
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
                              clinic_name: activeClinic?.name || 'CityCare Family Clinic',
                              appointment_date: apt.date,
                              appointment_time: apt.time,
                              doctor_name: apt.doctorName,
                              appointment_reference: apt.referenceNumber,
                              clinic_phone: activeClinic?.phone || '+91 98200 11223'
                            })
                          }
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 cursor-pointer transition-colors"
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
    </div>
  );
}
