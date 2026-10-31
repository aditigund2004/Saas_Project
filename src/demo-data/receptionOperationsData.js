/**
 * Reception Operations Demo Data
 * Resource rooms, end-of-day handover, attendance patterns, and capacity heatmap.
 */

export const INITIAL_CLINIC_ROOMS = [
  {
    id: 'room-101',
    name: 'Consultation Suite 1',
    type: 'Consultation',
    doctorAssigned: 'Dr. Aarav Mehta',
    currentPatient: 'Aarav Patel (In Chamber)',
    status: 'Occupied', // 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance'
    equipment: ['Digital Sphygmomanometer', 'Welch Allyn Otoscope', 'ECG Lead-12 Unit', 'Examination Couch'],
    sanitizedAt: 'Today, 10:15 AM'
  },
  {
    id: 'room-102',
    name: 'Consultation Suite 2',
    type: 'Consultation',
    doctorAssigned: 'Dr. Rohan Deshmukh',
    currentPatient: null,
    status: 'Available',
    equipment: ['Digital Stethoscope', 'Treadmill Stress Monitor', 'Vitals Cart'],
    sanitizedAt: 'Today, 10:45 AM'
  },
  {
    id: 'room-103',
    name: 'Minor Procedure & Triage',
    type: 'Procedure',
    doctorAssigned: 'Dr. Sneha Joshi',
    currentPatient: 'Pooja Verma (Dressing)',
    status: 'Occupied',
    equipment: ['Surgical Light Unit', 'Autoclave Sterilizer', 'Oxygen Concentrator', 'Emergency Crash Cart'],
    sanitizedAt: 'Today, 09:30 AM'
  },
  {
    id: 'room-104',
    name: 'Sample Collection & Phlebotomy',
    type: 'Diagnostic',
    doctorAssigned: 'Lab Tech Ramesh',
    currentPatient: null,
    status: 'Available',
    equipment: ['Centrifuge 4000 RPM', 'Barcode Scanner', 'Refrigerated Storage 4°C'],
    sanitizedAt: 'Today, 10:55 AM'
  },
  {
    id: 'room-105',
    name: 'Ultrasound & Sonography Bay',
    type: 'Imaging',
    doctorAssigned: 'Dr. Neha Verma',
    currentPatient: null,
    status: 'Cleaning',
    equipment: ['GE Healthcare Sonosite Ultrasound', 'Gel Warmer', 'Thermal Image Printer'],
    sanitizedAt: 'In Progress'
  }
];

export const INITIAL_HANDOVER_DATA = {
  shiftDate: '2026-10-27',
  shiftType: 'Morning Shift (08:00 AM – 03:00 PM)',
  outgoingStaff: 'Priya Sharma (Senior Receptionist)',
  incomingStaff: 'Karan Dave (Evening Front Desk)',
  totalCheckIns: 38,
  pendingAppointmentsCount: 4,
  unresolvedBillingCount: 2,
  urgentFollowUpsCount: 3,
  checklist: [
    { id: 'chk-1', task: 'Reconcile front desk POS card and UPI batch closures with cash drawer', completed: true },
    { id: 'chk-2', task: 'Hand over high-priority urgent blood test reports (Rahul Sharma lipid panel) to Dr. Mehta', completed: true },
    { id: 'chk-3', task: 'Confirm emergency oxygen cylinder replacement in Procedure Suite 3 with supplier', completed: true },
    { id: 'chk-4', task: 'Follow up with Mrs. Sunita Patel regarding delayed evening appointment rescheduling', completed: false },
    { id: 'chk-5', task: 'Ensure Room 105 sonography bay sanitization log is countersigned', completed: false }
  ],
  shiftNotes: 'Dr. Mehta will hold a quick video consultation at 04:30 PM. The courier picked up 14 lab samples at 01:45 PM. Cash drawer balance reconciled to exactly ₹14,850.',
  pendingPatients: [
    { name: 'Tanvi Nair', time: '03:15 PM', doctor: 'Dr. Aarav Mehta', status: 'Arrived in waiting area', notes: 'First visit, forms filled' },
    { name: 'Vikram Sethi', time: '03:45 PM', doctor: 'Dr. Rohan Deshmukh', status: 'Called to notify 10m delay', notes: 'Has external ECG report' }
  ]
};

export const CAPACITY_HEATMAP_DATA = [
  { hour: '08:00 AM', Mon: 45, Tue: 50, Wed: 40, Thu: 48, Fri: 55, Sat: 65 },
  { hour: '09:00 AM', Mon: 80, Tue: 85, Wed: 75, Thu: 82, Fri: 90, Sat: 95 },
  { hour: '10:00 AM', Mon: 95, Tue: 92, Wed: 88, Thu: 94, Fri: 98, Sat: 100 },
  { hour: '11:00 AM', Mon: 92, Tue: 90, Wed: 85, Thu: 89, Fri: 96, Sat: 98 },
  { hour: '12:00 PM', Mon: 70, Tue: 72, Wed: 68, Thu: 74, Fri: 78, Sat: 85 },
  { hour: '01:00 PM', Mon: 40, Tue: 38, Wed: 35, Thu: 42, Fri: 45, Sat: 60 },
  { hour: '02:00 PM', Mon: 55, Tue: 58, Wed: 52, Thu: 60, Fri: 62, Sat: 50 },
  { hour: '03:00 PM', Mon: 75, Tue: 78, Wed: 72, Thu: 76, Fri: 82, Sat: 70 },
  { hour: '04:00 PM', Mon: 88, Tue: 86, Wed: 84, Thu: 90, Fri: 94, Sat: 75 },
  { hour: '05:00 PM', Mon: 92, Tue: 94, Wed: 89, Thu: 95, Fri: 96, Sat: 80 },
  { hour: '06:00 PM', Mon: 85, Tue: 82, Wed: 78, Thu: 84, Fri: 88, Sat: 70 },
  { hour: '07:00 PM', Mon: 50, Tue: 48, Wed: 45, Thu: 52, Fri: 55, Sat: 40 }
];

export const NO_SHOW_ANALYTICS_DATA = {
  monthlyAttendanceRate: 88.4,
  monthlyNoShowRate: 7.2,
  monthlyCancellationRate: 4.4,
  weekdayStats: [
    { day: 'Monday', scheduled: 48, attended: 43, noShow: 3, cancelled: 2, noShowRate: 6.2 },
    { day: 'Tuesday', scheduled: 52, attended: 47, noShow: 3, cancelled: 2, noShowRate: 5.7 },
    { day: 'Wednesday', scheduled: 46, attended: 42, noShow: 2, cancelled: 2, noShowRate: 4.3 },
    { day: 'Thursday', scheduled: 50, attended: 44, noShow: 4, cancelled: 2, noShowRate: 8.0 },
    { day: 'Friday', scheduled: 56, attended: 47, noShow: 6, cancelled: 3, noShowRate: 10.7 },
    { day: 'Saturday', scheduled: 62, attended: 52, noShow: 7, cancelled: 3, noShowRate: 11.2 }
  ],
  peakNoShowSlots: [
    { slot: 'Friday 06:00 PM – 07:00 PM', reason: 'Weekend commute congestion', rate: 14.5 },
    { slot: 'Saturday 08:00 AM – 09:00 AM', reason: 'Weekend morning fatigue', rate: 12.8 },
    { slot: 'Monday 08:00 AM – 09:00 AM', reason: 'Office conflict', rate: 9.2 }
  ],
  recommendedInterventions: [
    'Enable automated 2-hour WhatsApp reminder for Friday evening appointments',
    'Require 2-click reconfirmation on Saturday morning slots by Friday 8 PM',
    'Offer immediate 1-click video consultation alternative for commuters delayed in traffic'
  ]
};

