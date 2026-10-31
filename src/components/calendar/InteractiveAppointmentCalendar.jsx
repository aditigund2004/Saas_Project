import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Move,
  X
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import {
  STANDARD_TIME_SLOTS,
  checkAppointmentConflict,
  validateRescheduleDrop
} from '../../services/appointmentConflictService';

export function InteractiveAppointmentCalendar({
  appointments,
  doctors,
  selectedDoctorId,
  selectedDate,
  onDateChange,
  onRescheduleAppointment,
  onSelectAppointment,
  activeBranch
}) {
  const [calendarMode, setCalendarMode] = useState('week'); // 'day' | 'week' | 'month'
  const [draggedAptId, setDraggedAptId] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null); // { date, time, doctorId, hasConflict, conflictReason }
  const [pendingDrop, setPendingDrop] = useState(null); // { apt, targetDate, targetTime, targetDoctorId }
  const [snapBackId, setSnapBackId] = useState(null);

  // Filter appointments for the active branch and optional doctor filter
  const branchAppointments = appointments.filter((a) => {
    const matchesBranch = !activeBranch || a.branchId === activeBranch.id;
    const matchesDoctor = selectedDoctorId === 'All' || !selectedDoctorId || a.doctorId === selectedDoctorId;
    return matchesBranch && matchesDoctor;
  });

  // Calculate 7-day week starting from selectedDate
  const currentBaseDate = new Date(selectedDate || '2026-10-23');
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(currentBaseDate);
    // Find monday of the week
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) + i;
    const targetDate = new Date(d.setDate(diff));
    return {
      dateStr: targetDate.toISOString().slice(0, 10),
      dayName: targetDate.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: targetDate.getDate(),
      isToday: targetDate.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10),
      isSelected: targetDate.toISOString().slice(0, 10) === selectedDate
    };
  });

  // Drag and Drop Handlers
  const handleDragStart = (e, apt) => {
    e.dataTransfer.setData('text/plain', apt.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedAptId(apt.id);
  };

  const handleDragEnd = () => {
    setDraggedAptId(null);
    setDragOverSlot(null);
  };

  const handleDragOver = (e, dateStr, timeSlot, doctorId) => {
    e.preventDefault();
    if (!draggedAptId) return;

    // Check conflict for this target
    const targetDocId = doctorId || (selectedDoctorId !== 'All' ? selectedDoctorId : doctors[0]?.id);
    const conflict = checkAppointmentConflict({
      appointmentIdToExclude: draggedAptId,
      doctorId: targetDocId,
      date: dateStr,
      time: timeSlot,
      appointments
    });

    setDragOverSlot({
      date: dateStr,
      time: timeSlot,
      doctorId: targetDocId,
      hasConflict: conflict.hasConflict,
      conflictReason: conflict.reason
    });

    e.dataTransfer.dropEffect = conflict.hasConflict ? 'none' : 'move';
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e, dateStr, timeSlot, doctorId) => {
    e.preventDefault();
    const aptId = e.dataTransfer.getData('text/plain') || draggedAptId;
    if (!aptId) return;

    const apt = appointments.find((a) => a.id === aptId);
    if (!apt) return;

    const targetDocId = doctorId || apt.doctorId || doctors[0]?.id;
    const validation = validateRescheduleDrop(aptId, targetDocId, dateStr, timeSlot, appointments);

    if (!validation.allowed) {
      // Trigger snap-back shake animation
      setSnapBackId(aptId);
      setTimeout(() => setSnapBackId(null), 700);
      setDragOverSlot(null);
      setDraggedAptId(null);
      return;
    }

    // If valid, open confirmation modal
    setPendingDrop({
      appointment: apt,
      targetDate: dateStr,
      targetTime: timeSlot,
      targetDoctorId: targetDocId,
      targetDoctorName: doctors.find((d) => d.id === targetDocId)?.name || apt.doctorName
    });

    setDragOverSlot(null);
    setDraggedAptId(null);
  };

  const confirmReschedule = () => {
    if (pendingDrop) {
      onRescheduleAppointment(
        pendingDrop.appointment.id,
        pendingDrop.targetDate,
        pendingDrop.targetTime,
        pendingDrop.targetDoctorId
      );
      setPendingDrop(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar View Selector & Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs">
            {['day', 'week', 'month'].map((mode) => (
              <button
                key={mode}
                onClick={() => setCalendarMode(mode)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                  calendarMode === mode
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {mode} View
              </button>
            ))}
          </div>

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Date Shift Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - (calendarMode === 'week' ? 7 : 1));
                onDateChange(d.toISOString().slice(0, 10));
              }}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-2 font-mono">
              {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + (calendarMode === 'week' ? 7 : 1));
                onDateChange(d.toISOString().slice(0, 10));
              }}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drag and Drop instructions badge */}
        <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400 bg-blue-50/60 dark:bg-blue-950/30 px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/40">
          <Move className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mr-1.5 shrink-0" />
          <span>Drag any appointment to reschedule. Conflict detection prevents double-booking.</span>
        </div>
      </div>

      {/* Week Grid Calendar View */}
      {calendarMode === 'week' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Week Days Header Row */}
          <div className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 text-xs">
            <div className="p-3 text-slate-400 font-semibold text-center border-r border-slate-200 dark:border-slate-800">
              Time
            </div>
            {weekDays.map((wd) => (
              <div
                key={wd.dateStr}
                onClick={() => onDateChange(wd.dateStr)}
                className={`p-3 text-center cursor-pointer transition-colors border-r border-slate-200 dark:border-slate-800 last:border-r-0 ${
                  wd.isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                    : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">{wd.dayName}</div>
                <div className={`text-sm font-extrabold mt-0.5 ${wd.isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                  {wd.dayNumber}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slot Rows with Droppable Cells */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[650px] overflow-y-auto">
            {STANDARD_TIME_SLOTS.map((timeSlot) => (
              <div key={timeSlot} className="grid grid-cols-8 min-h-[58px]">
                {/* Time Column */}
                <div className="p-2 border-r border-slate-200 dark:border-slate-800 text-center font-mono text-[11px] text-slate-400 dark:text-slate-500 bg-slate-50/30 dark:bg-slate-950/20 flex items-center justify-center">
                  {timeSlot}
                </div>

                {/* Day Slot Cells */}
                {weekDays.map((wd) => {
                  const matchingAppointments = branchAppointments.filter(
                    (a) => a.date === wd.dateStr && a.time === timeSlot && !['Cancelled', 'No-show'].includes(a.status)
                  );

                  const isSlotOver =
                    dragOverSlot && dragOverSlot.date === wd.dateStr && dragOverSlot.time === timeSlot;

                  return (
                    <div
                      key={wd.dateStr + timeSlot}
                      onDragOver={(e) => handleDragOver(e, wd.dateStr, timeSlot, null)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, wd.dateStr, timeSlot, null)}
                      className={`p-1 border-r border-slate-100 dark:border-slate-800/60 last:border-r-0 transition-all flex flex-col justify-center relative ${
                        isSlotOver
                          ? dragOverSlot.hasConflict
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-400 dark:border-rose-600'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-600'
                          : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/20'
                      }`}
                    >
                      {/* Conflict Hover Tooltip */}
                      {isSlotOver && dragOverSlot.hasConflict && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 bg-rose-900 text-white text-[10px] py-1 px-2 rounded-md shadow-lg whitespace-nowrap flex items-center space-x-1 animate-in fade-in">
                          <AlertTriangle className="w-3 h-3 text-rose-300 shrink-0" />
                          <span>{dragOverSlot.conflictReason || 'Slot Conflict: Doctor booked'}</span>
                        </div>
                      )}

                      {/* Render Appointments in this slot */}
                      {matchingAppointments.map((apt) => {
                        const isDragging = draggedAptId === apt.id;
                        const isSnapping = snapBackId === apt.id;

                        return (
                          <div
                            key={apt.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, apt)}
                            onDragEnd={handleDragEnd}
                            onClick={() => onSelectAppointment?.(apt)}
                            className={`p-1.5 rounded-lg cursor-grab active:cursor-grabbing text-left transition-all border ${
                              isDragging
                                ? 'opacity-40 scale-95 border-dashed border-blue-400'
                                : isSnapping
                                ? 'animate-shake border-rose-400 bg-rose-50'
                                : 'bg-white dark:bg-slate-800 hover:shadow-md border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-[11px] text-slate-900 dark:text-white truncate">
                                {apt.patientName}
                              </span>
                              <span
                                className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase shrink-0 ${
                                  apt.status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                                    : apt.status === 'In Progress' || apt.status === 'Checked In'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {apt.status}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {apt.doctorName}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day Mode / Multi-Doctor Columns */}
      {calendarMode === 'day' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Doctors Header Row */}
          <div className="grid grid-cols-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 text-xs">
            <div className="p-3 text-slate-400 font-semibold text-center border-r border-slate-200 dark:border-slate-800">
              Time
            </div>
            {doctors.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                className="p-3 text-center border-r border-slate-200 dark:border-slate-800 last:border-r-0"
              >
                <div className="font-bold text-slate-900 dark:text-white text-xs">{doc.name}</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{doc.specialty}</div>
              </div>
            ))}
          </div>

          {/* Time Slot Rows for each doctor */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
            {STANDARD_TIME_SLOTS.map((timeSlot) => (
              <div key={timeSlot} className="grid grid-cols-5 min-h-[56px]">
                <div className="p-2 border-r border-slate-200 dark:border-slate-800 text-center font-mono text-[11px] text-slate-400 flex items-center justify-center bg-slate-50/30">
                  {timeSlot}
                </div>

                {doctors.slice(0, 4).map((doc) => {
                  const apt = branchAppointments.find(
                    (a) =>
                      a.date === selectedDate &&
                      a.time === timeSlot &&
                      a.doctorId === doc.id &&
                      !['Cancelled', 'No-show'].includes(a.status)
                  );

                  const isSlotOver =
                    dragOverSlot &&
                    dragOverSlot.date === selectedDate &&
                    dragOverSlot.time === timeSlot &&
                    dragOverSlot.doctorId === doc.id;

                  return (
                    <div
                      key={doc.id + timeSlot}
                      onDragOver={(e) => handleDragOver(e, selectedDate, timeSlot, doc.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, selectedDate, timeSlot, doc.id)}
                      className={`p-1.5 border-r border-slate-100 dark:border-slate-800 last:border-r-0 relative transition-all ${
                        isSlotOver
                          ? dragOverSlot.hasConflict
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500'
                          : 'hover:bg-slate-50/50'
                      }`}
                    >
                      {apt ? (
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, apt)}
                          onDragEnd={handleDragEnd}
                          onClick={() => onSelectAppointment?.(apt)}
                          className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs cursor-grab text-left"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {apt.patientName}
                            </span>
                            <Badge variant={apt.status}>{apt.status}</Badge>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{apt.serviceName}</div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-[10px] text-slate-300 dark:text-slate-600 font-mono">
                          Available
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Month Mode / Mini Calendar Overview */}
      {calendarMode === 'month' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <div className="text-center font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">
            {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-[11px] font-bold text-slate-400 uppercase py-1">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `2026-10-${dayNum.toString().padStart(2, '0')}`;
              const count = branchAppointments.filter((a) => a.date === dateStr).length;
              const isSelected = dateStr === selectedDate;

              return (
                <div
                  key={dateStr}
                  onClick={() => {
                    onDateChange(dateStr);
                    setCalendarMode('day');
                  }}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200">{dayNum}</div>
                  {count > 0 && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                      {count} apts
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmation Modal for Drag-and-Drop Reschedule */}
      {pendingDrop && (
        <Modal
          isOpen={!!pendingDrop}
          onClose={() => setPendingDrop(null)}
          title="Confirm Appointment Reschedule"
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-1.5">
              <div className="flex items-center text-blue-900 dark:text-blue-100 font-bold text-sm">
                <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
                Rescheduling Details
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Move consultation for <strong className="text-slate-900 dark:text-white">{pendingDrop.appointment.patientName}</strong>?
              </p>
              <div className="pt-2 border-t border-blue-200 dark:border-blue-800/50 space-y-1 text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-slate-400">From:</span> {pendingDrop.appointment.date} at {pendingDrop.appointment.time}
                </div>
                <div>
                  <span className="text-slate-400">To New Slot:</span> <strong className="text-blue-600 dark:text-blue-400">{pendingDrop.targetDate} at {pendingDrop.targetTime}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Doctor:</span> {pendingDrop.targetDoctorName}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setPendingDrop(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={confirmReschedule}>
                Confirm Reschedule
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

