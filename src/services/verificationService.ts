import { PrescriptionVerification } from '../types';
import { DEMO_PRESCRIPTIONS, DEMO_CLINICS } from '../demo-data';

export const verificationService = {
  verifyPrescription: async (verificationId: string): Promise<PrescriptionVerification> => {
    // Simulated remote verification check
    await new Promise((res) => setTimeout(res, 200));

    const rx = DEMO_PRESCRIPTIONS.find(
      (p) => p.verificationId === verificationId || p.prescriptionNumber === verificationId
    );

    if (!rx) {
      return {
        verificationId,
        prescriptionNumber: 'UNKNOWN',
        status: 'NotFound',
        clinicName: 'Unverified Clinic',
        clinicCity: 'Unknown',
        doctorName: 'Unknown Practitioner',
        doctorRegistration: 'N/A',
        dateIssued: 'N/A',
        verificationNotice:
          'Sample verification — not connected to a production verification authority. Prescription identifier was not located in demo registry.'
      };
    }

    const clinic = DEMO_CLINICS.find((c) => c.id === rx.clinicId);

    return {
      verificationId: rx.verificationId,
      prescriptionNumber: rx.prescriptionNumber,
      status: rx.status === 'Active' ? 'Authentic' : rx.status === 'Revoked' ? 'Revoked' : 'Expired',
      clinicName: clinic?.name || 'Authorized Specialty Clinic',
      clinicCity: clinic?.city || 'Healthcare Center',
      doctorName: rx.doctorName,
      doctorRegistration: rx.doctorRegistration,
      dateIssued: rx.date,
      followUpDate: rx.followUpDate,
      verificationNotice:
        'Sample verification — frontend demo mode. In production, this verifies cryptographically against server-signed prescription records without exposing private medical notes.'
    };
  }
};

