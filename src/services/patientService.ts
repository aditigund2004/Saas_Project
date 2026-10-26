import { Patient } from '../types';
import { DEMO_PATIENTS } from '../demo-data';

export const patientService = {
  getPatients: async (clinicId?: string): Promise<Patient[]> => {
    if (clinicId) {
      return DEMO_PATIENTS.filter((p) => p.clinicId === clinicId);
    }
    return [...DEMO_PATIENTS];
  },

  getPatientById: async (id: string): Promise<Patient | undefined> => {
    return DEMO_PATIENTS.find((p) => p.id === id || p.patientIdNumber === id);
  },

  createPatient: async (payload: Omit<Patient, 'id' | 'patientIdNumber' | 'registeredAt'>): Promise<Patient> => {
    const nextSeq = Math.floor(1040 + Math.random() * 900);
    const newPatient: Patient = {
      ...payload,
      id: `pt-${nextSeq}`,
      patientIdNumber: `PT-${nextSeq}`,
      registeredAt: new Date().toISOString().slice(0, 10),
      status: 'Active'
    };
    return newPatient;
  },

  updatePatient: async (id: string, updates: Partial<Patient>): Promise<Patient | null> => {
    const existing = DEMO_PATIENTS.find((p) => p.id === id);
    if (!existing) return null;
    return { ...existing, ...updates };
  }
};

