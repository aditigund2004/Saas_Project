import { Appointment, AppointmentStatus } from '../types';
import { DEMO_APPOINTMENTS } from '../demo-data';

export const appointmentService = {
  getAppointments: async (clinicId?: string, branchId?: string): Promise<Appointment[]> => {
    let list = [...DEMO_APPOINTMENTS];
    if (clinicId) {
      list = list.filter((a) => a.clinicId === clinicId);
    }
    if (branchId) {
      list = list.filter((a) => a.branchId === branchId);
    }
    return list;
  },

  checkConflict: (
    appointments: Appointment[],
    doctorId: string,
    date: string,
    time: string,
    excludeId?: string
  ): boolean => {
    return appointments.some(
      (a) =>
        a.id !== excludeId &&
        a.doctorId === doctorId &&
        a.date === date &&
        a.time === time &&
        !['Cancelled', 'No-show'].includes(a.status)
    );
  },

  createAppointment: async (appointment: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt'>): Promise<Appointment> => {
    const id = `apt-${Date.now().toString().slice(-5)}`;
    const referenceNumber = `APT-${Math.floor(2000 + Math.random() * 8000)}`;
    const newAppointment: Appointment = {
      ...appointment,
      id,
      referenceNumber,
      createdAt: new Date().toISOString()
    };
    return newAppointment;
  },

  updateStatus: async (appointmentId: string, status: AppointmentStatus): Promise<{ id: string; status: AppointmentStatus }> => {
    return { id: appointmentId, status };
  }
};

