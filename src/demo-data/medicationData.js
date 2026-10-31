/**
 * Medication Day Planner Demo Data
 * Interactive daily dosage schedule & weekly adherence tracking.
 */

export const INITIAL_MEDICATION_SCHEDULE = [
  {
    id: 'med-01',
    patientId: 'pt-1041',
    name: 'Telmisartan',
    brand: 'Telma 20',
    dosage: '20 mg',
    form: 'Tablet',
    category: 'Antihypertensive',
    timeSlot: 'Morning',
    scheduledTime: '08:30 AM',
    instructions: 'Take 1 tablet with warm water after breakfast. Do not crush.',
    status: 'taken', // 'taken' | 'pending' | 'skipped' | 'snoozed'
    takenAt: '08:35 AM',
    prescribedBy: 'Dr. Aarav Mehta',
    refillsLeft: 2,
    pillsRemaining: 24,
    color: 'emerald'
  },
  {
    id: 'med-02',
    patientId: 'pt-1041',
    name: 'Coenzyme Q10',
    brand: 'CoQ-Sure 100',
    dosage: '100 mg',
    form: 'Softgel Capsule',
    category: 'Cardioprotective Antioxidant',
    timeSlot: 'Afternoon',
    scheduledTime: '01:30 PM',
    instructions: 'Take with or immediately after lunch for best absorption.',
    status: 'pending',
    prescribedBy: 'Dr. Aarav Mehta',
    refillsLeft: 1,
    pillsRemaining: 18,
    color: 'blue'
  },
  {
    id: 'med-03',
    patientId: 'pt-1041',
    name: 'Magnesium Glycinate',
    brand: 'MagRelax 250',
    dosage: '250 mg',
    form: 'Tablet',
    category: 'Muscle & Sleep Support',
    timeSlot: 'Evening',
    scheduledTime: '07:30 PM',
    instructions: 'Take with evening snack or dinner.',
    status: 'pending',
    prescribedBy: 'Dr. Aarav Mehta',
    refillsLeft: 3,
    pillsRemaining: 28,
    color: 'purple'
  },
  {
    id: 'med-04',
    patientId: 'pt-1041',
    name: 'Melatonin (Timed Release)',
    brand: 'RestWell 3mg',
    dosage: '3 mg',
    form: 'Sublingual Tablet',
    category: 'Sleep Aid',
    timeSlot: 'Bedtime',
    scheduledTime: '10:15 PM',
    instructions: 'Dissolve under the tongue 30 minutes before sleep.',
    status: 'pending',
    prescribedBy: 'Dr. Aarav Mehta',
    refillsLeft: 1,
    pillsRemaining: 12,
    color: 'amber'
  }
];

export const INITIAL_WEEKLY_ADHERENCE = [
  { day: 'Mon', date: 'Oct 20', taken: 4, total: 4, percentage: 100 },
  { day: 'Tue', date: 'Oct 21', taken: 4, total: 4, percentage: 100 },
  { day: 'Wed', date: 'Oct 22', taken: 3, total: 4, percentage: 75, missed: 'Afternoon CoQ10' },
  { day: 'Thu', date: 'Oct 23', taken: 4, total: 4, percentage: 100 },
  { day: 'Fri', date: 'Oct 24', taken: 4, total: 4, percentage: 100 },
  { day: 'Sat', date: 'Oct 25', taken: 4, total: 4, percentage: 100 },
  { day: 'Sun', date: 'Oct 26', taken: 4, total: 4, percentage: 100 }
];

