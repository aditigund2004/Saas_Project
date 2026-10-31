import { describe, it, expect } from 'vitest';
import {
  checkAppointmentConflict,
  getDoctorSlotAvailability,
  validateRescheduleDrop,
  STANDARD_TIME_SLOTS
} from '../services/appointmentConflictService';
import { Appointment } from '../types';

describe('Appointment Conflict Detection Service', () => {
  const mockAppointments: Appointment[] = [
    {
      id: 'apt-1',
      clinicId: 'clinic-1',
      branchId: 'branch-1',
      doctorId: 'doc-mehta',
      doctorName: 'Dr. Suresh Mehta',
      patientId: 'pt-101',
      patientName: 'Rajesh Kumar',
      patientPhone: '9876543210',
      patientEmail: 'rajesh@example.com',
      serviceId: 'srv-1',
      serviceName: 'General Consultation',
      date: '2026-10-23',
      time: '10:30 AM',
      status: 'Confirmed'
    },
    {
      id: 'apt-2',
      clinicId: 'clinic-1',
      branchId: 'branch-1',
      doctorId: 'doc-mehta',
      doctorName: 'Dr. Suresh Mehta',
      patientId: 'pt-102',
      patientName: 'Priya Sharma',
      patientPhone: '9876543211',
      patientEmail: 'priya@example.com',
      serviceId: 'srv-1',
      serviceName: 'General Consultation',
      date: '2026-10-23',
      time: '11:00 AM',
      status: 'Cancelled' // Cancelled appointment should NOT cause conflict
    },
    {
      id: 'apt-3',
      clinicId: 'clinic-1',
      branchId: 'branch-1',
      doctorId: 'doc-sharma',
      doctorName: 'Dr. Ananya Sharma',
      patientId: 'pt-103',
      patientName: 'Amit Verma',
      patientPhone: '9876543212',
      patientEmail: 'amit@example.com',
      serviceId: 'srv-2',
      serviceName: 'Dental Checkup',
      date: '2026-10-23',
      time: '10:30 AM',
      status: 'Confirmed'
    }
  ];

  it('detects double-booking conflict for the same doctor, date, and time', () => {
    const result = checkAppointmentConflict({
      doctorId: 'doc-mehta',
      date: '2026-10-23',
      time: '10:30 AM',
      appointments: mockAppointments
    });

    expect(result.hasConflict).toBe(true);
    expect(result.conflictingAppointment?.patientName).toBe('Rajesh Kumar');
    expect(result.reason).toContain('Dr. Suresh Mehta is already booked');
  });

  it('permits booking when the slot is with a different doctor at the same time', () => {
    const result = checkAppointmentConflict({
      doctorId: 'doc-other',
      date: '2026-10-23',
      time: '10:30 AM',
      appointments: mockAppointments
    });

    expect(result.hasConflict).toBe(false);
  });

  it('does not flag conflict for cancelled appointments in the same slot', () => {
    const result = checkAppointmentConflict({
      doctorId: 'doc-mehta',
      date: '2026-10-23',
      time: '11:00 AM',
      appointments: mockAppointments
    });

    expect(result.hasConflict).toBe(false);
  });

  it('ignores self during rescheduling checks', () => {
    const result = checkAppointmentConflict({
      appointmentIdToExclude: 'apt-1',
      doctorId: 'doc-mehta',
      date: '2026-10-23',
      time: '10:30 AM',
      appointments: mockAppointments
    });

    expect(result.hasConflict).toBe(false);
  });

  it('generates accurate slot availability array for doctor daily roster', () => {
    const availability = getDoctorSlotAvailability('doc-mehta', '2026-10-23', mockAppointments);
    expect(availability.length).toBe(STANDARD_TIME_SLOTS.length);

    const slot1030 = availability.find((s) => s.time === '10:30 AM');
    expect(slot1030?.isAvailable).toBe(false);

    const slot0900 = availability.find((s) => s.time === '09:00 AM');
    expect(slot0900?.isAvailable).toBe(true);
  });

  it('validates drag-and-drop reschedule attempt and blocks collision', () => {
    // Attempting to move apt-3 (Dr. Sharma) into Dr. Mehta's busy slot
    const dropValidation = validateRescheduleDrop(
      'apt-3',
      'doc-mehta',
      '2026-10-23',
      '10:30 AM',
      mockAppointments
    );

    expect(dropValidation.allowed).toBe(false);
    expect(dropValidation.error).toContain('already booked');
  });
});

