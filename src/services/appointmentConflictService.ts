import { Appointment } from '../types';

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictingAppointment?: Appointment;
  reason?: string;
}

export interface SlotAvailability {
  time: string;
  isAvailable: boolean;
  appointment?: Appointment;
}

export const STANDARD_TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM'
];

/**
 * Normalizes time format for clean comparisons (e.g. "10:30 AM" vs "10:30 am")
 */
export function normalizeTime(timeStr: string): string {
  if (!timeStr) return '';
  return timeStr.trim().toUpperCase();
}

/**
 * Pure function: Detects if scheduling or moving an appointment causes a conflict.
 * Excludes cancelled or no-show bookings and ignores the appointment being rescheduled.
 */
export function checkAppointmentConflict(params: {
  appointmentIdToExclude?: string;
  doctorId: string;
  date: string;
  time: string;
  appointments: Appointment[];
}): ConflictCheckResult {
  const { appointmentIdToExclude, doctorId, date, time, appointments } = params;

  if (!doctorId || !date || !time) {
    return { hasConflict: false };
  }

  const normalizedTargetTime = normalizeTime(time);

  const conflicting = appointments.find((apt) => {
    // Ignore self during rescheduling
    if (appointmentIdToExclude && apt.id === appointmentIdToExclude) {
      return false;
    }

    // Ignore inactive appointments
    if (apt.status === 'Cancelled' || apt.status === 'No-show') {
      return false;
    }

    const sameDoctor = apt.doctorId === doctorId;
    const sameDate = apt.date === date;
    const sameTime = normalizeTime(apt.time) === normalizedTargetTime;

    return sameDoctor && sameDate && sameTime;
  });

  if (conflicting) {
    return {
      hasConflict: true,
      conflictingAppointment: conflicting,
      reason: `Dr. ${conflicting.doctorName || 'Selected Doctor'} is already booked with ${conflicting.patientName} at ${time} on ${date}.`
    };
  }

  return { hasConflict: false };
}

/**
 * Pure function: Generates list of daily time slots indicating availability and existing bookings.
 */
export function getDoctorSlotAvailability(
  doctorId: string,
  date: string,
  appointments: Appointment[],
  slots: string[] = STANDARD_TIME_SLOTS
): SlotAvailability[] {
  return slots.map((time) => {
    const conflict = checkAppointmentConflict({
      doctorId,
      date,
      time,
      appointments
    });

    return {
      time,
      isAvailable: !conflict.hasConflict,
      appointment: conflict.conflictingAppointment
    };
  });
}

/**
 * Pure function: Validates drag-and-drop or manual rescheduling before committing state changes.
 */
export function validateRescheduleDrop(
  appointmentId: string,
  targetDoctorId: string,
  targetDate: string,
  targetTime: string,
  appointments: Appointment[]
): {
  allowed: boolean;
  error?: string;
  conflictingAppointment?: Appointment;
} {
  const apt = appointments.find((a) => a.id === appointmentId);
  if (!apt) {
    return { allowed: false, error: 'Appointment record not found.' };
  }

  if (apt.status === 'Completed' || apt.status === 'Cancelled') {
    return {
      allowed: false,
      error: `Cannot reschedule appointment with status "${apt.status}".`
    };
  }

  const conflict = checkAppointmentConflict({
    appointmentIdToExclude: appointmentId,
    doctorId: targetDoctorId,
    date: targetDate,
    time: targetTime,
    appointments
  });

  if (conflict.hasConflict) {
    return {
      allowed: false,
      error: conflict.reason,
      conflictingAppointment: conflict.conflictingAppointment
    };
  }

  return { allowed: true };
}

