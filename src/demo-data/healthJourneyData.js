/**
 * Health Journey Demo Data — Interactive Chronological Medical Timeline
 * Connected with patient consultations, prescriptions, reports, vitals and milestones.
 */

export const DEMO_HEALTH_JOURNEY_EVENTS = [
  {
    id: 'hj-001',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    type: 'consultation', // consultation | diagnosis | prescription | lab | vitals | milestone | document
    category: 'Consultation',
    date: '2026-10-27',
    time: '10:30 AM',
    title: 'Cardiology & Preventive Review',
    doctor: 'Dr. Aarav Mehta',
    specialty: 'Family Medicine & Preventive Cardiology',
    clinic: 'CityCare Family Clinic (FC Road)',
    status: 'Completed',
    summary: 'Routine evaluation of mild blood pressure fluctuation and post-viral recovery.',
    details: {
      chiefComplaint: 'Mild intermittent palpitations after evening exercise, no chest pain or dyspnea.',
      findings: 'S1, S2 heard normal. No murmurs. Chest clear bilaterally. Peripheral pulses strong and equal.',
      diagnosis: 'Stage 1 Essential Hypertension (mild, diet-responsive) & Sinus Tachycardia post-exertion',
      treatmentPlan: 'Lifestyle modifications, low sodium DASH diet, 30 min daily brisk walking, morning Telmisartan 20mg.',
      vitals: { bp: '132/84 mmHg', pulse: '78 bpm', temp: '98.4 °F', spO2: '99%', weight: '71.5 kg' },
      prescriptions: ['Telmisartan 20mg (Once daily, Morning)', 'CoQ10 100mg (Post Lunch)'],
      nextFollowUp: '2026-11-27'
    },
    attachments: [
      { name: 'Consultation_Summary_Oct27.pdf', size: '240 KB', type: 'summary' },
      { name: 'Signed_Prescription_RX2026.pdf', size: '180 KB', type: 'prescription' }
    ]
  },
  {
    id: 'hj-002',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    type: 'vitals',
    category: 'Vitals Log',
    date: '2026-10-25',
    time: '08:15 AM',
    title: 'Home Vitals Sync: Blood Pressure & Pulse',
    doctor: 'Self Logged / Sync',
    specialty: 'Remote Patient Monitoring',
    clinic: 'CityCare Connected Health',
    status: 'Normal Range',
    summary: 'Systolic 128 mmHg, Diastolic 82 mmHg, Resting Heart Rate 72 bpm.',
    details: {
      vitals: { bp: '128/82 mmHg', pulse: '72 bpm', temp: '98.6 °F', spO2: '98%', weight: '71.8 kg' },
      notes: 'Logged before breakfast. Patient reports restful sleep and zero morning dizziness.'
    }
  },
  {
    id: 'hj-003',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    type: 'lab',
    category: 'Diagnostic Report',
    date: '2026-10-20',
    time: '11:00 AM',
    title: 'Comprehensive Lipid & Metabolic Panel',
    doctor: 'Dr. Neha Verma (Pathologist)',
    specialty: 'Clinical Biochemistry',
    clinic: 'Metropolis Diagnostic Centre',
    status: 'Verified',
    summary: 'Total Cholesterol: 198 mg/dL, HDL: 46 mg/dL, LDL: 122 mg/dL, Fasting Glucose: 92 mg/dL, HbA1c: 5.6%.',
    details: {
      labName: 'Central Pathology Laboratory',
      sampleType: 'Venous Blood (12-hour Fasting)',
      interpretations: 'Lipid ratios within satisfactory bounds. Non-diabetic glycaemic control confirmed.',
      values: [
        { test: 'Total Cholesterol', result: '198 mg/dL', reference: '< 200 mg/dL', flag: 'Normal' },
        { test: 'HDL (Good)', result: '46 mg/dL', reference: '> 40 mg/dL', flag: 'Normal' },
        { test: 'LDL (Calculated)', result: '122 mg/dL', reference: '< 100 mg/dL', flag: 'Borderline' },
        { test: 'Triglycerides', result: '150 mg/dL', reference: '< 150 mg/dL', flag: 'Normal' },
        { test: 'Fasting Blood Sugar', result: '92 mg/dL', reference: '70 - 99 mg/dL', flag: 'Normal' },
        { test: 'HbA1c Glycated Hb', result: '5.6%', reference: '< 5.7%', flag: 'Optimal' },
        { test: 'Serum Creatinine', result: '0.9 mg/dL', reference: '0.7 - 1.2 mg/dL', flag: 'Normal' }
      ]
    },
    attachments: [
      { name: 'Lipid_Panel_Report_Oct20.pdf', size: '1.2 MB', type: 'lab' }
    ]
  },
  {
    id: 'hj-004',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    type: 'prescription',
    category: 'Prescription Issued',
    date: '2026-10-15',
    time: '04:45 PM',
    title: 'Medication Refill: Antihypertensive Therapy',
    doctor: 'Dr. Aarav Mehta',
    specialty: 'Family Medicine',
    clinic: 'CityCare Family Clinic',
    status: 'Active',
    summary: 'Telmisartan 20mg prescribed for 30 days. QR verified digitally.',
    details: {
      rxId: 'rx-2026-081',
      items: [
        { name: 'Telmisartan', dosage: '20 mg', timing: 'Once daily (Morning after breakfast)', duration: '30 days' },
        { name: 'Vitamin D3 Cholecalciferol', dosage: '60,000 IU', timing: 'Once weekly (Sundays)', duration: '8 weeks' }
      ],
      qrVerified: true
    }
  },
  {
    id: 'hj-005',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    type: 'milestone',
    category: 'Health Milestone',
    date: '2026-10-01',
    time: '09:00 AM',
    title: 'Completed 60-Day Heart Health Lifestyle Challenge',
    doctor: 'Clinical Wellness Team',
    specialty: 'Preventive Health',
    clinic: 'CityCare Wellness Wing',
    status: 'Achieved',
    summary: 'Aarav reduced average resting systolic BP by 6 mmHg and sustained 8,500 daily steps for 8 consecutive weeks.',
    details: {
      achievement: 'Cardiovascular Fitness Grade A',
      metrics: 'Weight lowered from 73.2 kg to 71.5 kg. Resting heart rate lowered from 82 to 74 bpm.'
    }
  },
  {
    id: 'hj-006',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    type: 'consultation',
    category: 'Dental Check-up',
    date: '2026-08-18',
    time: '02:15 PM',
    title: 'Dental Prophylaxis & Enamel Assessment',
    doctor: 'Dr. Isha Shah',
    specialty: 'General Dentistry',
    clinic: 'BrightSmile Dental Studio',
    status: 'Completed',
    summary: 'Ultrasonic scaling performed. Mild plaque index reduced. Fluoride polish applied.',
    details: {
      findings: 'No active cavitations detected. Gingival tissue healthy with minimal bleeding on probing.',
      recommendations: 'Switch to soft-bristled oscillating electric brush; floss nightly.'
    }
  },
  {
    id: 'hj-007',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    type: 'document',
    category: 'Immunization Record',
    date: '2026-06-10',
    time: '11:30 AM',
    title: 'Influenza Annual Vaccination (Quadrivalent)',
    doctor: 'Dr. Aarav Mehta',
    specialty: 'Immunization Clinic',
    clinic: 'CityCare Family Clinic',
    status: 'Logged',
    summary: 'Administered in left deltoid muscle. Lot #INF-2026-B9.',
    details: {
      batch: 'FLU4-2026-MUM',
      site: 'Left Deltoid',
      nextBoosterDue: '2027-06-10'
    }
  }
];

