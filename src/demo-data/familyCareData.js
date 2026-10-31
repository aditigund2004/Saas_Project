/**
 * Family Care Circle Demo Data
 * Family member profiles, appointments, medications, allergies, and emergency contacts.
 */

export const INITIAL_FAMILY_MEMBERS = [
  {
    id: 'pt-1041',
    name: 'Aarav Patel',
    relation: 'Self (Account Primary)',
    age: 34,
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: ['Penicillin', 'Sulfa drugs'],
    chronicConditions: ['Stage 1 Hypertension (Controlled)'],
    upcomingAppointment: {
      doctor: 'Dr. Aarav Mehta',
      clinic: 'CityCare Family Clinic',
      date: '2026-10-27',
      time: '10:30 AM',
      type: 'Routine Review'
    },
    activeMedicationsCount: 4,
    emergencyContact: 'Sunita Patel (Spouse) — +91 98765 43219',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    recentEncounter: '2026-10-15 (Follow-up)'
  },
  {
    id: 'pt-fam-02',
    name: 'Sunita Patel',
    relation: 'Spouse',
    age: 32,
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: ['Aspirin (Gastric upset)'],
    chronicConditions: ['Hypothyroidism (Euthyroid on Thyronorm)'],
    upcomingAppointment: {
      doctor: 'Dr. Sneha Joshi',
      clinic: 'Apex Women Care Clinic',
      date: '2026-11-04',
      time: '04:00 PM',
      type: 'Thyroid & Metabolic Review'
    },
    activeMedicationsCount: 2,
    emergencyContact: 'Aarav Patel (Husband) — +91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    recentEncounter: '2026-09-28 (Thyroid profile normal)'
  },
  {
    id: 'pt-fam-03',
    name: 'Rohan Patel',
    relation: 'Son',
    age: 7,
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: ['Peanuts (Mild urticaria)'],
    chronicConditions: ['Childhood Asthma (Mild intermittent)'],
    upcomingAppointment: {
      doctor: 'Dr. Ananya Sharma',
      clinic: 'CityCare Pediatrics Wing',
      date: '2026-11-12',
      time: '11:15 AM',
      type: 'Growth & Annual Booster Check'
    },
    activeMedicationsCount: 1,
    emergencyContact: 'Sunita Patel (Mother) — +91 98765 43219',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=200&q=80',
    recentEncounter: '2026-08-14 (Influenza booster dose)'
  },
  {
    id: 'pt-fam-04',
    name: 'Kamalaben Patel',
    relation: 'Mother',
    age: 63,
    gender: 'Female',
    bloodGroup: 'B+',
    allergies: ['None known'],
    chronicConditions: ['Type 2 Diabetes', 'Osteoarthritis knees'],
    upcomingAppointment: {
      doctor: 'Dr. Aarav Mehta',
      clinic: 'CityCare Family Clinic',
      date: '2026-10-29',
      time: '03:30 PM',
      type: 'Glycemic Control & Joint Review'
    },
    activeMedicationsCount: 3,
    emergencyContact: 'Aarav Patel (Son) — +91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=200&q=80',
    recentEncounter: '2026-10-10 (HbA1c 6.8%)'
  }
];

