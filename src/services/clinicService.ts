import { Clinic, ClinicBranch, Doctor } from '../types';
import { DEMO_CLINICS, DEMO_DOCTORS } from '../demo-data';

export const clinicService = {
  getClinics: async (): Promise<Clinic[]> => {
    return [...DEMO_CLINICS];
  },

  getClinicBySlug: async (slug: string): Promise<Clinic | undefined> => {
    return DEMO_CLINICS.find((c) => c.slug === slug);
  },

  getClinicById: async (id: string): Promise<Clinic | undefined> => {
    return DEMO_CLINICS.find((c) => c.id === id);
  },

  getBranchesByClinic: async (clinicId: string): Promise<ClinicBranch[]> => {
    const clinic = DEMO_CLINICS.find((c) => c.id === clinicId);
    return clinic ? clinic.branches : [];
  },

  getDoctorsByClinic: async (clinicId: string, branchId?: string): Promise<Doctor[]> => {
    let docs = DEMO_DOCTORS.filter((d) => d.clinicId === clinicId);
    if (branchId) {
      docs = docs.filter((d) => d.branchIds.includes(branchId));
    }
    return docs;
  }
};

