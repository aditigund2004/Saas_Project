import { Prescription } from '../types';
import { DEMO_PRESCRIPTIONS } from '../demo-data';

export const prescriptionService = {
  getPrescriptions: async (clinicId?: string): Promise<Prescription[]> => {
    if (clinicId) {
      return DEMO_PRESCRIPTIONS.filter((p) => p.clinicId === clinicId);
    }
    return [...DEMO_PRESCRIPTIONS];
  },

  getPrescriptionById: async (id: string): Promise<Prescription | undefined> => {
    return DEMO_PRESCRIPTIONS.find((p) => p.id === id || p.prescriptionNumber === id);
  },

  getPrescriptionsByPatient: async (patientId: string): Promise<Prescription[]> => {
    return DEMO_PRESCRIPTIONS.filter((p) => p.patientId === patientId);
  },

  createPrescription: async (payload: Omit<Prescription, 'id' | 'prescriptionNumber' | 'verificationId' | 'qrVerificationUrl' | 'createdAt'>): Promise<Prescription> => {
    const rxSeq = Math.floor(8800 + Math.random() * 1000);
    const id = `rx-2026-${rxSeq}`;
    const prescriptionNumber = `RX-2026-${rxSeq}`;
    const verificationId = `v_${Math.random().toString(36).substring(2, 10)}`;
    const newRx: Prescription = {
      ...payload,
      id,
      prescriptionNumber,
      verificationId,
      qrVerificationUrl: `/verify-prescription/${verificationId}`,
      createdAt: new Date().toISOString()
    };
    return newRx;
  }
};

