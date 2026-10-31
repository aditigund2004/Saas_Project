/**
 * Visit Preparation & Brief Shared Data
 * Connects patient's pre-consultation workspace to doctor's 60-second brief.
 */

export const INITIAL_VISIT_BRIEFS = {
  'apt-101': {
    appointmentId: 'apt-101',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    doctorName: 'Dr. Aarav Mehta',
    appointmentDate: '2026-10-27',
    appointmentTime: '10:30 AM',
    status: 'Submitted', // 'Draft' | 'Submitted' | 'Reviewed'
    lastUpdated: '2026-10-27T08:45:00.000Z',
    reasonForVisit: 'Follow-up for mild blood pressure reading and evening heart flutter after workouts',
    selectedBodyRegion: 'chest',
    symptoms: [
      { name: 'Occasional Flutter / Palpitations', duration: '5 days', severity: 'Mild', frequency: 'Evenings after brisk walk' },
      { name: 'Mild Neck Stiffness', duration: '2 weeks', severity: 'Low', frequency: 'Morning on waking' }
    ],
    currentMedications: [
      { name: 'Telmisartan', dose: '20mg', frequency: 'Once daily morning' },
      { name: 'Vitamin D3', dose: '60,000 IU', frequency: 'Weekly once' }
    ],
    knownAllergies: ['Penicillin (Hives & itching)', 'Sulfa drugs (Skin rash)'],
    medicalHistory: 'Mild essential hypertension (controlled). Non-smoker. Regular walker.',
    patientQuestions: [
      'Is my current blood pressure reading within the target range for my age group?',
      'Can I continue high-intensity cardio exercises or should I stay with brisk walking?',
      'Do I need to repeat my 2D Echocardiogram or lipid profile this quarter?'
    ],
    additionalNotes: 'I had slight indigestion after heavy meals last weekend, but resolved with antacids.',
    vitalSnapshot: {
      bp: '128/82 mmHg',
      pulse: '72 bpm',
      weight: '71.5 kg',
      sleepHrs: '7.5 hrs'
    }
  }
};

