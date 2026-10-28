import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  List,
  LayoutGrid

} from 'lucide-react';

export function DoctorSchedulePage() {
  const { appointments, activeClinic, activeBranch } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-10-23');
  const [viewMode, setViewMode] = useState('table');


  const days = [
    { label: 'Wed, 21 Oct', date: '2026-10-21' },
    { label: 'Thu, 22 Oct', date: '2026-10-22' },
    { label: 'Today (Fri, 23 Oct)', date: '2026-10-23' },
    { label: 'Sat, 24 Oct', date: '2026-10-24' },
    { label: 'Mon, 26 Oct', date: '2026-10-26' }
  ];

  const currentAppointments = appointments.filter(
    (a) => (a.clinicId === activeClinic?.id || !a.clinicId) && ((a.confirmedDate || a.date) === selectedDate)

  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Doctor Rota & Calendar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Clinical Schedule</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">

            {activeClinic?.name} · Operatory Schedule & Timetable
          </p>
        </div>

        <Link to="/clinic/consultations">
          <Button variant="primary" size="sm">
            <Stethoscope className="w-3.5 h-3.5 mr-1" />
            Launch Consultation
          </Button>
        </Link>
      </div>

      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">

        <div className="flex items-center gap-1.5">
          {days.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                selectedDate === d.date
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'

              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden md:block">

          Slot Duration: 30 Mins · Break: 01:30 PM - 02:15 PM
        </div>
      </div>

      {/* Schedule Card / Table Container */}
      <Card className="p-0 border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Appointments for {selectedDate} ({currentAppointments.length})
            </div>
            <Badge variant="teal" size="sm">Active Session</Badge>
          </div>

          <div className="flex items-center bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1 px-2 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1 px-2 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Rows</span>
            </button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                  <th className="px-4 py-3">Slot & Token</th>
                  <th className="px-4 py-3">Encounter Ref</th>
                  <th className="px-4 py-3">Patient & Contact</th>
                  <th className="px-4 py-3">Service / Procedure</th>
                  <th className="px-4 py-3">Clinical Notes</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
                      No appointments scheduled for {selectedDate}.
                    </td>
                  </tr>
                ) : (
                  currentAppointments.map((apt, idx) => (
                    <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900">
                            {apt.time}
                          </span>
                          {apt.queueNumber && (
                            <Badge variant="teal" size="sm" className="font-mono">{apt.queueNumber}</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {apt.referenceNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white">{apt.patientName}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">{apt.patientPhone}</div>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                        {apt.serviceName}
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-[11px] italic max-w-xs truncate">
                        {apt.notes || 'Routine consultation'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            apt.status === 'Completed' ? 'success' :
                            apt.status === 'In Progress' ? 'warning' :
                            apt.status === 'Checked In' ? 'teal' : 'default'
                          }
                          size="sm"
                        >
                          {apt.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Link to={`/clinic/consultations/${apt.id}`}>
                          <Button variant="secondary" size="sm" className="text-xs h-7 px-2.5">
                            <Stethoscope className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                            Consultation
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentAppointments.length === 0 ? (
              <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                No appointments scheduled for {selectedDate}.
              </div>
            ) : (
              currentAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-blue-800 dark:text-blue-300 font-mono font-bold text-xs text-center min-w-[70px]">
                      <Clock className="w-3.5 h-3.5 mx-auto mb-0.5 text-blue-600 dark:text-blue-400" />
                      {apt.time}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{apt.patientName}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">({apt.referenceNumber})</span>
                        {apt.queueNumber && (
                          <Badge variant="teal" size="sm" className="font-mono">{apt.queueNumber}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Service: <span className="font-medium text-slate-700 dark:text-slate-300">{apt.serviceName}</span> · Phone: {apt.patientPhone}
                      </p>
                      {apt.notes && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic mt-0.5">
                          Notes: {apt.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Badge
                      variant={
                        apt.status === 'Completed' ? 'success' :
                        apt.status === 'In Progress' ? 'warning' :
                        apt.status === 'Checked In' ? 'teal' : 'default'
                      }
                      size="sm"
                    >
                      {apt.status}
                    </Badge>
                    <Link to={`/clinic/consultations/${apt.id}`}>
                      <Button variant="secondary" size="sm" className="text-xs">
                        <Stethoscope className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                        Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </Card>
    </div>
  );
}

