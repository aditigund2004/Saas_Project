import { PatientQuery, PatientQueryCategory } from '../types';

export const QUERY_RESPONSE_EXPECTATIONS: Record<PatientQueryCategory, { hours: number; text: string; staffRole: string }> = {
  'Prescription Clarification': {
    hours: 4,
    text: 'Attending doctor or clinical duty officer typically responds within 2 - 4 business hours (Mon-Sat, 9 AM - 7 PM).',
    staffRole: 'Prescribing Doctor / Clinical Officer'
  },
  'Bill Clarification': {
    hours: 24,
    text: 'Clinic billing & finance desk typically responds within 24 business hours.',
    staffRole: 'Billing Lead / Accounts Coordinator'
  },
  'General Clinical Query': {
    hours: 6,
    text: 'Duty medical practitioner typically responds within 4 - 6 business hours.',
    staffRole: 'Duty Clinical Officer'
  },
  'Appointment & Scheduling': {
    hours: 4,
    text: 'Front desk reception desk typically responds within 2 - 4 business hours.',
    staffRole: 'Clinic Receptionist'
  }
};

export const EMERGENCY_GUIDANCE_TEXT =
  '🚨 CRITICAL EMERGENCY GUIDANCE: Online queries and clarification messages are monitored for routine non-emergency care during clinic operating hours only (Mon - Sat, 08:30 AM - 08:00 PM). If you or a family member are experiencing chest pain, acute shortness of breath, severe uncontrolled bleeding, sudden numbness or speech difficulty, severe allergic anaphylaxis, or any acute trauma, DO NOT WAIT for an online message reply. Immediately call 112 / 108 or visit the nearest emergency department.';

export const DEMO_PATIENT_QUERIES: PatientQuery[] = [
  {
    id: 'pq-101',
    queryNumber: 'QRY-2026-081',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    category: 'Prescription Clarification',
    relatedEntityId: 'rx-2026-8812',
    relatedEntityLabel: 'Prescription #RX-2026-8812 (Dr. Arvind Rao)',
    subject: 'Can I take Zerodol-P with cold milk if I experience mild stomach acidity?',
    status: 'Staff Replied',
    urgency: 'Routine Non-Emergency',
    expectedResponseHours: 4,
    expectedResponseText: 'Attending doctor typically responds within 2 - 4 business hours.',
    assignedStaffName: 'Dr. Arvind Rao, MDS',
    assignedStaffRole: 'Prescribing Doctor',
    createdAt: '2026-10-24T10:15:00.000Z',
    updatedAt: '2026-10-24T11:45:00.000Z',
    messages: [
      {
        id: 'msg-101-1',
        senderId: 'pt-1041',
        senderName: 'Aarav Patel',
        senderRole: 'patient',
        senderBadge: 'Patient',
        message:
          'Hello Dr. Rao, I started the prescribed Augmentin 625 and Zerodol-P after my root canal yesterday. I feel a bit of stomach heaviness and mild acidity about 20 minutes after taking the painkiller. Can I take Zerodol-P with a glass of cold milk instead of water, or should I take a Pantoprazole antacid before it?',
        timestamp: '24 Oct 2026, 10:15 AM',
        isStaff: false
      },
      {
        id: 'msg-101-2',
        senderId: 'doc-arvind-rao',
        senderName: 'Dr. Arvind Rao, MDS',
        senderRole: 'doctor',
        senderBadge: 'Prescribing Doctor',
        message:
          'Hello Aarav, yes absolutely. Taking Zerodol-P with a glass of cold milk is an excellent way to buffer your gastric mucosa against aceclofenac-induced irritation. Also ensure you do not take it on an empty stomach. If the acidity persists, you can take a Pantoprazole 40mg tablet 30 minutes before your morning breakfast. Feel free to message here if you have any further questions or if the pain increases.',
        timestamp: '24 Oct 2026, 11:20 AM',
        isStaff: true
      },
      {
        id: 'msg-101-3',
        senderId: 'pt-1041',
        senderName: 'Aarav Patel',
        senderRole: 'patient',
        senderBadge: 'Patient',
        message:
          'Thank you Dr. Rao, taking it with milk worked wonders! Acidity is gone and the molar pain is already settling down nicely.',
        timestamp: '24 Oct 2026, 11:45 AM',
        isStaff: false
      }
    ]
  },
  {
    id: 'pq-102',
    queryNumber: 'QRY-2026-074',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    category: 'Bill Clarification',
    relatedEntityId: 'inv-2026-0391',
    relatedEntityLabel: 'Invoice #INV-2026-0391 (₹5,000 - Single-Sitting Endodontic Therapy)',
    subject: 'Request for itemized RVG diagnostic breakdown certificate for Star Health claim',
    status: 'Resolved',
    urgency: 'Routine Non-Emergency',
    expectedResponseHours: 24,
    expectedResponseText: 'Clinic billing & finance desk responds within 24 business hours.',
    assignedStaffName: 'Kavita S.',
    assignedStaffRole: 'Lead Billing Coordinator',
    createdAt: '2026-10-24T14:30:00.000Z',
    updatedAt: '2026-10-24T16:45:00.000Z',
    messages: [
      {
        id: 'msg-102-1',
        senderId: 'pt-1041',
        senderName: 'Aarav Patel',
        senderRole: 'patient',
        senderBadge: 'Patient',
        message:
          'Hi CityCare Accounts Team, my Star Health insurance TPA portal is asking for an itemized breakdown bill that specifically lists the diagnostic RVG radiographs separately from the root canal procedure fee. My invoice INV-2026-0391 lists total ₹5,000 with subtotal ₹5,200 less ₹200 discount. Could you verify the separate line item codes for insurance reimbursement?',
        timestamp: '24 Oct 2026, 02:30 PM',
        isStaff: false
      },
      {
        id: 'msg-102-2',
        senderId: 'staff-billing-kavita',
        senderName: 'Kavita S.',
        senderRole: 'billing',
        senderBadge: 'Lead Billing Coordinator',
        message:
          'Hello Aarav, we have generated the standardized itemized insurance statement: Dental Procedure Code DEN-301 (Single-Sitting Endodontic Therapy #37: ₹4,500) and Diagnostic Code RAD-102 (Digital RVG Radiographs x2: ₹700), with ₹200 package discount applied against the consultation. The digitally signed copy has also been sent to your email (aarav.patel@example.demo) for TPA portal upload. Let us know if your insurer requires any additional hospital registration certificates.',
        timestamp: '24 Oct 2026, 04:15 PM',
        isStaff: true
      },
      {
        id: 'msg-102-3',
        senderId: 'pt-1041',
        senderName: 'Aarav Patel',
        senderRole: 'patient',
        senderBadge: 'Patient',
        message:
          'Received the document and submitted to Star Health portal. Thank you for the super quick help!',
        timestamp: '24 Oct 2026, 04:45 PM',
        isStaff: false
      }
    ]
  },
  {
    id: 'pq-103',
    queryNumber: 'QRY-2026-088',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    category: 'General Clinical Query',
    relatedEntityId: 'apt-req-001',
    relatedEntityLabel: 'Upcoming Follow-Up: Permanent Crown Fitting',
    subject: 'Dietary instructions before scheduled permanent crown placement visit',
    status: 'Awaiting Staff Reply',
    urgency: 'Routine Non-Emergency',
    expectedResponseHours: 6,
    expectedResponseText: 'Duty clinical officer typically responds within 4 - 6 business hours (Expected today by 03:30 PM).',
    assignedStaffName: 'Shweta Patil',
    assignedStaffRole: 'Head Clinic Receptionist',
    createdAt: '2026-10-27T09:30:00.000Z',
    updatedAt: '2026-10-27T09:30:00.000Z',
    messages: [
      {
        id: 'msg-103-1',
        senderId: 'pt-1041',
        senderName: 'Aarav Patel',
        senderRole: 'patient',
        senderBadge: 'Patient',
        message:
          'Good morning team, I have my scheduled appointment for the permanent zirconia crown cementation tomorrow morning at 10:30 AM. Do I need to be fasting or can I have a regular breakfast before coming in?',
        timestamp: '27 Oct 2026, 09:30 AM',
        isStaff: false
      }
    ]
  }
];

