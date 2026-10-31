import { Doctor, Appointment } from '../types';
import { DEMO_DOCTORS } from '../demo-data';

export const doctorService = {
  getDoctors: async (clinicId?: string, branchId?: string): Promise<Doctor[]> => {
    let list = [...DEMO_DOCTORS];
    if (clinicId) {
      list = list.filter((d) => d.clinicId === clinicId);
    }
    if (branchId) {
      list = list.filter((d) => d.branchIds.includes(branchId));
    }
    return list;
  },

  checkDoctorAppointments: (doctorId: string, appointments: Appointment[]): { hasUpcoming: boolean; count: number; activeAppointments: Appointment[] } => {
    const linked = appointments.filter(
      (a) => a.doctorId === doctorId && !['Cancelled', 'Completed', 'No-show'].includes(a.status)
    );
    return {
      hasUpcoming: linked.length > 0,
      count: linked.length,
      activeAppointments: linked
    };
  },

  createDoctor: async (doctorData: Omit<Doctor, 'id' | 'createdAt'>): Promise<Doctor> => {
    const seq = Math.floor(110 + Math.random() * 890);
    const newDoc: Doctor = {
      ...doctorData,
      id: `doc-${Date.now().toString().slice(-6)}`,
      doctorIdNumber: doctorData.doctorIdNumber || `DOC-${seq}`,
      createdAt: new Date().toISOString(),
      status: doctorData.status || 'Active',
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          action: 'Doctor profile registered into clinic roster',
          timestamp: new Date().toLocaleString(),
          actor: 'Clinic Administrator'
        }
      ]
    };
    return newDoc;
  },

  updateDoctor: async (doctorId: string, updates: Partial<Doctor>): Promise<Doctor> => {
    return {
      id: doctorId,
      ...updates
    } as Doctor;
  },

  exportToCSV: (doctors: Doctor[]): void => {
    const headers = ['Doctor ID', 'Name', 'Specialty', 'Qualifications', 'Reg Number', 'Email', 'Phone', 'Fee (INR)', 'Days', 'Hours', 'Status'];
    const rows = doctors.map((d) => [
      d.doctorIdNumber || d.id,
      `"${d.name}"`,
      `"${d.specialty}"`,
      `"${d.qualifications}"`,
      d.registrationNumber,
      d.email,
      d.phone,
      d.consultationFee,
      `"${d.availableDays.join(', ')}"`,
      `"${d.workingHours}"`,
      d.status || 'Active'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinic_doctors_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

