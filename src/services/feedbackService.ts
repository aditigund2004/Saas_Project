import {
  PatientFeedback,
  FeedbackInternalNote,
  FeedbackActivity,
  FeedbackStatus
} from '../types';
import {
  DEMO_PATIENT_FEEDBACK,
  DEMO_FEEDBACK_NOTES,
  DEMO_FEEDBACK_ACTIVITIES
} from '../demo-data';

export const feedbackService = {
  getClinicFeedback: async (
    clinicId?: string,
    branchId?: string
  ): Promise<PatientFeedback[]> => {
    let list = [...DEMO_PATIENT_FEEDBACK];
    if (clinicId) {
      list = list.filter((f) => f.clinicId === clinicId);
    }
    if (branchId) {
      list = list.filter((f) => f.branchId === branchId);
    }
    return list;
  },

  getPatientFeedback: async (
    patientId: string,
    clinicId?: string
  ): Promise<PatientFeedback[]> => {
    let list = DEMO_PATIENT_FEEDBACK.filter((f) => f.patientId === patientId);
    if (clinicId) {
      list = list.filter((f) => f.clinicId === clinicId);
    }
    return list;
  },

  submitFeedback: async (
    data: Omit<PatientFeedback, 'id' | 'referenceNumber' | 'status' | 'submittedAt' | 'updatedAt'>
  ): Promise<PatientFeedback> => {
    const seq = Math.floor(2600 + Math.random() * 900);
    const newFeedback: PatientFeedback = {
      ...data,
      id: `fb-${Date.now().toString().slice(-6)}`,
      referenceNumber: `FB-${seq}`,
      status: 'New',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return newFeedback;
  },

  calculateMetrics: (feedbacks: PatientFeedback[]) => {
    const total = feedbacks.length;
    if (total === 0) {
      return { total: 0, newCount: 0, reviewedCount: 0, resolvedCount: 0, averageRating: 0 };
    }
    const newCount = feedbacks.filter((f) => f.status === 'New').length;
    const reviewedCount = feedbacks.filter((f) => f.status === 'Reviewed').length;
    const resolvedCount = feedbacks.filter((f) => f.status === 'Resolved').length;
    const sumRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = Number((sumRating / total).toFixed(1));

    return {
      total,
      newCount,
      reviewedCount,
      resolvedCount,
      averageRating
    };
  }
};

