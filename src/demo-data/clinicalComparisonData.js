/**
 * Patient Health Change Detector & Vitals Longitudinal Comparison Data
 * Historical synthetic measurements for blood pressure, pulse, weight, and blood sugar.
 */

export const DEMO_LONGITUDINAL_VITALS = [
  {
    date: '2026-05-15',
    timestamp: 'May 15',
    bpSystolic: 142,
    bpDiastolic: 90,
    pulse: 84,
    weight: 74.2,
    bloodSugar: 104,
    event: 'Initial Presentation (High stress)',
    doctorNotes: 'Elevated BP following work stress. Advised sodium restriction and light exercise.'
  },
  {
    date: '2026-06-20',
    timestamp: 'Jun 20',
    bpSystolic: 138,
    bpDiastolic: 88,
    pulse: 80,
    weight: 73.5,
    bloodSugar: 98,
    event: '1-Month Follow-up',
    doctorNotes: 'Modest drop in systolic BP. Initiated low-dose Telmisartan 20mg.'
  },
  {
    date: '2026-07-30',
    timestamp: 'Jul 30',
    bpSystolic: 134,
    bpDiastolic: 86,
    pulse: 78,
    weight: 72.8,
    bloodSugar: 95,
    event: 'Medication Tolerance Check',
    doctorNotes: 'Tolerating Telmisartan well. No orthostatic dizziness reported.'
  },
  {
    date: '2026-09-10',
    timestamp: 'Sep 10',
    bpSystolic: 130,
    bpDiastolic: 84,
    pulse: 75,
    weight: 72.1,
    bloodSugar: 94,
    event: 'Quarterly Wellness Scan',
    doctorNotes: 'Consistent improvement in weight and resting pulse with morning routine.'
  },
  {
    date: '2026-10-27',
    timestamp: 'Oct 27 (Today)',
    bpSystolic: 128,
    bpDiastolic: 82,
    pulse: 72,
    weight: 71.5,
    bloodSugar: 92,
    event: 'Current Consultation',
    doctorNotes: 'Optimal progression. Resting BP near target 120/80 mmHg. Good medication adherence.'
  }
];

export const DEMO_TREATMENT_OPTIONS_COMPARISON = {
  condition: 'Mild Stage-1 Essential Hypertension with Post-Exertional Palpitations',
  patientName: 'Aarav Patel',
  options: [
    {
      id: 'opt-a',
      title: 'Option A: Maintain Telmisartan 20mg + Enhanced Lifestyle Protocol',
      tagline: 'Conservative & Habit-Driven',
      recommendationLevel: 'Preferred First-Line',
      benefits: [
        'Minimal medication burden and no risk of daytime lethargy or bradycardia',
        'Directly supports long-term vascular endothelial health through diet & aerobic exercise',
        'Proven safety record with zero metabolic disturbance in non-diabetic adults',
        'Patient already demonstrates high adherence and positive BP trajectory (-14 mmHg systolic)'
      ],
      limitations: [
        'Requires continuous disciplined dietary restraint (<2.3g sodium/day)',
        'May take 4-6 more weeks to fully stabilize post-workout resting pulse below 70 bpm'
      ],
      considerations: [
        'Regular home BP log 3 mornings per week',
        'Incorporate 10-minute cool down stretching after aerobic runs',
        'Re-evaluate in 3 months with serum potassium and creatinine check'
      ],
      patientPreferencesMatch: 'High — Aarav prefers avoiding higher pill counts and values lifestyle modifications.'
    },
    {
      id: 'opt-b',
      title: 'Option B: Step-Up to Combination Therapy (Telmisartan 40mg + Amlodipine 2.5mg)',
      tagline: 'Aggressive Pharmacological Target',
      recommendationLevel: 'Alternative Secondary',
      benefits: [
        'More rapid and strict reduction of systolic BP under 120 mmHg',
        'Dual mechanism: Angiotensin Receptor Blocker plus Calcium Channel Blocker for vascular vasodilation'
      ],
      limitations: [
        'Potential risk of mild ankle edema or flushing with calcium channel blockers',
        'Higher risk of occasional mild postural dizziness upon sudden standing',
        'Unnecessary over-treatment given Aarav’s current 128/82 mmHg reading'
      ],
      considerations: [
        'Requires frequent electrolyte checks',
        'More expensive monthly pharmacy cost',
        'Patient expressed reluctance to take multiple chemical compounds'
      ],
      patientPreferencesMatch: 'Low — Excessive for current Stage 1 status.'
    }
  ]
};

