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
  AlertCircle
} from 'lucide-react';

export function DoctorSchedulePage() {
  const { appointments, activeClinic, activeBranch } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-10-23');

  const days = [
    { label: 'Wed, 21 Oct', date: '2026-10-21' },
    { label: 'Thu, 22 Oct', date: '2026-10-22' },
    { label: 'Today (Fri, 23 Oct)', date: '2026-10-23' },
    { label: 'Sat, 24 Oct', date: '2026-10-24' },
    { label: 'Mon, 26 Oct', date: '2026-10-26' }
  ];

  const currentAppointments = appointments.filter(
    (a) => a.clinicId === activeClinic?.id && ((a.confirmedDate || a.date) === selectedDate)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Doctor Rota & Calendar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Schedule</h1>
          <p className="text-xs text-slate-500">
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
      <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5">
          {days.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                selectedDate === d.date
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="text-xs font-medium text-slate-500 hidden md:block">
          Slot Duration: 30 Mins · Break: 01:30 PM - 02:15 PM
        </div>
      </div>

      {/* Schedule Grid */}
      <Card className="p-0 border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Appointments for {selectedDate} ({currentAppointments.length})
          </div>
          <Badge variant="teal" size="sm">Active Session</Badge>
        </div>

        <div className="divide-y divide-slate-100">
          {currentAppointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No appointments scheduled for {selectedDate}.
            </div>
          ) : (
            currentAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 font-mono font-bold text-xs text-center min-w-[70px]">
                    <Clock className="w-3.5 h-3.5 mx-auto mb-0.5 text-blue-600" />
                    {apt.time}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{apt.patientName}</span>
                      <span className="text-xs text-slate-400 font-mono">({apt.referenceNumber})</span>
                      {apt.queueNumber && (
                        <Badge variant="teal" size="sm" className="font-mono">{apt.queueNumber}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Service: <span className="font-medium text-slate-700">{apt.serviceName}</span> · Phone: {apt.patientPhone}
                    </p>
                    {apt.notes && (
                      <p className="text-[11px] text-slate-400 italic mt-0.5">
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
                      <Stethoscope className="w-3.5 h-3.5 mr-1 text-blue-600" />
                      Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

