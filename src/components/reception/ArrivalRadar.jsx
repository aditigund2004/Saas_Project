import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Users,
  UserCheck,
  Clock,
  AlertCircle,
  Phone,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ArrivalRadar() {
  const { appointments = [], updateAppointmentStatus, checkInPatient, showToast } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'Expected' | 'Checked In' | 'Delayed' | 'No Show'
  const [searchQuery, setSearchQuery] = useState('');

  // Group appointments into radar categories
  const radarList = appointments.map((apt) => {
    let radarStatus = 'Expected';
    if (apt.status === 'Checked In' || apt.status === 'Patient Checked In') {
      radarStatus = 'Checked In';
    } else if (apt.status === 'In Progress' || apt.status === 'In Consultation') {
      radarStatus = 'In Chamber';
    } else if (apt.status === 'Completed') {
      radarStatus = 'Completed';
    } else if (apt.status === 'Cancelled' || apt.status === 'Rejected') {
      radarStatus = 'No Show';
    } else if (apt.notes?.toLowerCase().includes('delay') || apt.time === '11:15 AM') {
      radarStatus = 'Delayed';
    }

    return {
      ...apt,
      radarStatus
    };
  });

  const filteredList = radarList.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.radarStatus === activeFilter;
    const matchesSearch =
      !searchQuery ||
      item.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.time?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: radarList.length,
    Expected: radarList.filter((a) => a.radarStatus === 'Expected').length,
    'Checked In': radarList.filter((a) => a.radarStatus === 'Checked In').length,
    Delayed: radarList.filter((a) => a.radarStatus === 'Delayed').length,
    'No Show': radarList.filter((a) => a.radarStatus === 'No Show').length
  };

  const handleQuickCheckIn = (aptId, patientName) => {
    if (checkInPatient) {
      checkInPatient(aptId);
    } else {
      updateAppointmentStatus(aptId, 'Checked In');
      showToast(`${patientName} marked as Checked In! Token assigned.`);
    }
  };

  const handleMarkDelayed = (aptId, patientName) => {
    updateAppointmentStatus(aptId, 'Delayed (+15 mins)');
    showToast(`Marked ${patientName} as Delayed`);
  };

  const handleMarkNoShow = (aptId, patientName) => {
    updateAppointmentStatus(aptId, 'Cancelled');
    showToast(`Marked ${patientName} as No-Show`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-blue-200" />
            Front Desk Operations Radar
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Patient Arrival Radar
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Real-time visual monitoring of today's expected, checked-in, delayed, and no-show patients with instant 1-click status transitions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <Badge variant="primary" size="lg" className="bg-white/20 text-white border-white/30 font-bold px-3 py-1.5">
            {counts['Checked In']} In Waiting Room
          </Badge>
        </div>
      </div>

      {/* KPI Filter Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[
          { key: 'all', label: 'All Scheduled', count: counts.all, color: 'border-slate-300' },
          { key: 'Expected', label: 'Expected Soon', count: counts.Expected, color: 'border-blue-400' },
          { key: 'Checked In', label: 'Checked In', count: counts['Checked In'], color: 'border-emerald-400' },
          { key: 'Delayed', label: 'Delayed Commute', count: counts.Delayed, color: 'border-amber-400' },
          { key: 'No Show', label: 'No-Show / Cancel', count: counts['No Show'], color: 'border-rose-400' }
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeFilter === tab.key
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wider block ${
                activeFilter === tab.key ? 'text-blue-100' : 'text-slate-400'
              }`}
            >
              {tab.label}
            </span>
            <span className="text-xl font-black block mt-0.5">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by patient name, doctor, or time..."
          className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
        />
      </div>

      {/* Patient Arrival Cards List */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200">No patients in this arrival filter</h4>
            <p className="text-xs text-slate-500 mt-1">Try selecting 'All Scheduled' or clear search query.</p>
          </div>
        ) : (
          filteredList.map((apt) => {
            const isCheckedIn = apt.radarStatus === 'Checked In';
            const isDelayed = apt.radarStatus === 'Delayed';
            const isNoShow = apt.radarStatus === 'No Show';

            return (
              <div
                key={apt.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isCheckedIn
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : isDelayed
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}
                  >
                    {apt.time}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-slate-900 dark:text-white text-base">
                        {apt.patientName}
                      </span>
                      <Badge
                        variant={isCheckedIn ? 'success' : isDelayed ? 'warning' : isNoShow ? 'neutral' : 'primary'}
                        size="sm"
                      >
                        {apt.radarStatus}
                      </Badge>
                      {apt.queueNumber && (
                        <span className="text-[10px] font-bold text-slate-400">
                          {apt.queueNumber}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-500 text-xs">
                      Dr. {apt.doctorName} · {apt.serviceName || 'General Consultation'} · {apt.date}
                    </p>

                    {apt.notes && (
                      <p className="text-[11px] text-slate-400 italic">"{apt.notes}"</p>
                    )}
                  </div>
                </div>

                {/* Quick Status Action Buttons */}
                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  {!isCheckedIn && !isNoShow && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleQuickCheckIn(apt.id, apt.patientName)}
                      className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs"
                    >
                      <UserCheck className="w-3.5 h-3.5 mr-1" /> Check In
                    </Button>
                  )}

                  {!isDelayed && !isCheckedIn && !isNoShow && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkDelayed(apt.id, apt.patientName)}
                      className="font-bold text-xs text-amber-600 border-amber-200 hover:bg-amber-50"
                    >
                      <Clock className="w-3.5 h-3.5 mr-1" /> Delayed
                    </Button>
                  )}

                  {!isNoShow && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkNoShow(apt.id, apt.patientName)}
                      className="font-bold text-xs text-slate-400 hover:text-rose-600"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" /> No-Show
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

