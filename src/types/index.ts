// Domain Entities & TypeScript Models for Multi-Tenant Clinic Management SaaS

export type Role =
  | 'super_admin'
  | 'clinic_admin'
  | 'receptionist'
  | 'patient';

export type Permission =
  | 'appointments.read'
  | 'appointments.manage'
  | 'patients.read'
  | 'patients.create'
  | 'clinical_records.read'
  | 'clinical_records.create'
  | 'prescriptions.create'
  | 'prescriptions.finalize'
  | 'billing.read'
  | 'billing.manage'
  | 'refunds.approve'
  | 'inventory.read'
  | 'inventory.adjust'
  | 'staff.manage'
  | 'subscriptions.manage'
  | 'saas_finance.read'
  | 'saas_plans.manage'
  | 'support.create'
  | 'support.manage';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    'saas_finance.read',
    'saas_plans.manage',
    'subscriptions.manage',
    'support.manage',
    'support.create'
  ],
  clinic_admin: [
    'appointments.read',
    'appointments.manage',
    'patients.read',
    'patients.create',
    'clinical_records.read',
    'clinical_records.create',
    'prescriptions.create',
    'prescriptions.finalize',
    'billing.read',
    'billing.manage',
    'refunds.approve',
    'inventory.read',
    'inventory.adjust',
    'staff.manage',
    'subscriptions.manage',
    'support.create'
  ],
  receptionist: [
    'appointments.read',
    'appointments.manage',
    'patients.read',
    'patients.create',
    'billing.read',
    'billing.manage',
    'inventory.read',
    'support.create'
  ],
  patient: [
    'appointments.read',
    'appointments.manage',
    'clinical_records.read',
    'billing.read',
    'support.create'
  ]
};

export type AccountStatus = 'Active' | 'Pending' | 'Suspended' | 'Trial' | 'Expired';

export type StaffStatus = 'Active' | 'Inactive' | 'On Leave' | 'Invitation Pending';

export type ReceptionistPermission =
  | 'register_patients'
  | 'manage_appointments'
  | 'check_in_patients'
  | 'view_patient_feedback'
  | 'update_feedback_status'
  | 'add_internal_notes'
  | 'view_reports';

export type FeedbackCategory =
  | 'Doctor Care'
  | 'Waiting Time'
  | 'Clinic Cleanliness'
  | 'Reception & Staff'
  | 'Billing & Value'
  | 'General Experience';

export type FeedbackStatus = 'New' | 'Reviewed' | 'Resolved' | 'Reopened';

export type AppointmentStatus =
  | 'Draft'
  | 'Pending Clinic Confirmation'
  | 'Alternative Slot Proposed'
  | 'Awaiting Patient Response'
  | 'Confirmed'
  | 'Patient Checked In'
  | 'In Consultation'
  | 'Completed'
  | 'Cancellation Requested'
  | 'Cancelled'
  | 'Rejected'
  | 'No-Show'
  // Backward compatibility
  | 'Requested'
  | 'Checked In'
  | 'In Progress'
  | 'No-show';

export interface ProposedAlternative {
  id: string;
  proposedDate: string;
  proposedTime: string;
  proposedDoctorId?: string;
  proposedDoctorName?: string;
  reason: string;
  proposedAt: string;
  status: 'Pending' | 'Accepted' | 'Declined';
}

export interface AppointmentAuditEntry {
  id: string;
  action: string;
  timestamp: string;
  actor: string;
  notes?: string;
}

export interface SimulatedNotification {
  id: string;
  recipientRole: Role | 'all';
  recipientUserId?: string;
  clinicId?: string;
  appointmentId?: string;
  requestId?: string;
  type:
    | 'booking_request_submitted'
    | 'request_received_by_clinic'
    | 'appointment_confirmed'
    | 'alternative_slot_proposed'
    | 'alternative_accepted'
    | 'alternative_declined'
    | 'appointment_cancelled'
    | 'appointment_reminder'
    | 'follow_up_reminder';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  priority?: 'normal' | 'high' | 'urgent';
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Partially Paid' | 'Refunded';

export type WhatsAppStatus = 'not_configured' | 'pending' | 'sent' | 'delivered' | 'failed' | 'requires_attention';

export type SubscriptionTier = 'starter' | 'growth' | 'professional' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
  clinicId?: string; // Tenant identifier
  branchId?: string; // Primary branch assignment
  createdAt: string;
}

export interface ClinicBranch {
  id: string;
  clinicId: string;
  name: string;
  code: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  operatingHours: string;
  isMain: boolean;
  activeDoctorsCount: number;
}

export interface ClinicReview {
  id?: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Clinic {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  specialty: string;
  specialties?: string[];
  description: string;
  logo: string;
  image: string;
  address: string;
  locality?: string;
  city: string;
  phone: string;
  email: string;
  ownerName: string;
  status: AccountStatus;
<<<<<<< HEAD
=======
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  subscriptionPlanId: SubscriptionTier;
  trialEndsAt: string;
  isTrial: boolean;
  branches: ClinicBranch[];
  services: AppointmentService[];
  operatingHours: string;
  bookingPolicy: string;
  consultationFeeRange?: string;
  rating: number;
  reviewsCount: number;
  sampleReviews?: ClinicReview[];
  nextAvailableSlot?: string;
  bedCount?: number; // for nursing homes
}

export interface Doctor {
  id: string;
  doctorIdNumber?: string; // e.g. DOC-101
  clinicId: string;
  clinicName?: string;
  branchIds: string[];
  name: string;
  specialty: string;
  qualifications: string;
  registrationNumber: string;
  experienceYears: number;
  consultationFee: number;
  avatar: string;
  email: string;
  phone: string;
  availableDays: string[];
  workingHours: string;
  appointmentDurationMinutes?: number;
  breaks?: string;
  status?: StaffStatus;
  bio: string;
  rating?: number;
  reviewsCount?: number;
  sampleReviews?: ClinicReview[];
  createdAt?: string;
  activityHistory?: Array<{ id: string; action: string; timestamp: string; actor: string }>;
}

export interface Receptionist {
  id: string;
  staffIdNumber: string; // e.g. REC-201
  clinicId: string;
  branchIds: string[];
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  shift: 'Morning (08:00 - 16:00)' | 'Evening (12:00 - 20:00)' | 'Full Day (09:00 - 18:00)' | 'Night (20:00 - 08:00)';
  workingDays: string[];
  permissions: ReceptionistPermission[];
  status: StaffStatus;
  joiningDate: string;
  createdAt: string;
  activityHistory?: Array<{ id: string; action: string; timestamp: string; actor: string }>;
}

export interface FeedbackInternalNote {
  id: string;
  feedbackId: string;
  clinicId: string;
  authorStaffId: string;
  authorStaffName: string;
  authorRole: string;
  note: string;
  createdAt: string;
}

export interface FeedbackActivity {
  id: string;
  feedbackId: string;
  clinicId: string;
  action: string;
  actorName: string;
  actorRole: string;
  timestamp: string;
}

export interface PatientFeedback {
  id: string;
  referenceNumber: string; // e.g. FB-1042
  clinicId: string;
  branchId: string;
  branchName?: string;
  patientId: string;
  patientName: string;
  patientPhone?: string;
  patientEmail?: string;
  appointmentId?: string;
  appointmentRef?: string;
  category: FeedbackCategory;
  rating: number; // 1 to 5
  message: string;
  suggestions?: string;
  status: FeedbackStatus;
  resolutionNote?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  clinicId: string;
  patientIdNumber: string; // e.g. PT-1042
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  allergies?: string[];
  medicalHistory?: string;
  address?: string;
  emergencyContact?: string;
  registeredAt: string;
  status: 'Active' | 'Inactive';
}

export interface AppointmentService {
  id: string;
  name: string;
  durationMinutes: number;
  fee: number;
  category: string;
  description: string;
}

export interface Appointment {
  id: string;
  requestId?: string; // e.g. REQ-2026-081
  referenceNumber: string; // e.g. APT-2601
  clinicId: string;
  clinicName?: string;
  branchId: string;
  branchName?: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  serviceId: string;
  serviceName: string;
  consultationFee?: number;
  consultationType?: 'In-person' | 'Follow-up' | 'First Consultation';
  requestedDate?: string;
  requestedTime?: string;
  confirmedDate?: string;
  confirmedTime?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:30 AM"
  durationMinutes?: number;
  status: AppointmentStatus;
  notes?: string;
  patientAlternativePreferences?: {
    secondPreferredDate?: string;
    preferredTimeOfDay?: 'Morning' | 'Afternoon' | 'Evening' | 'Flexible';
    noteForReceptionist?: string;
  };
  proposedAlternatives?: ProposedAlternative[];
  responseHistory?: AppointmentAuditEntry[];
  cancellationReason?: string;
  rejectionReason?: string;
  queueNumber?: string; // e.g. #W-104 for walk-in
  isWalkIn?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface PrescriptionMedication {
  id: string;
  name: string;
  dosage: string; // e.g. "500 mg"
  frequency: string; // e.g. "Twice a day (1-0-1)"
  duration: string; // e.g. "5 days"
  route: string; // e.g. "Oral, after meals"
  instructions: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string; // e.g. RX-2026-8812
  verificationId: string; // opaque hash for QR code e.g. "v_88f91a27"
  clinicId: string;
  branchId: string;
  doctorId: string;
  doctorName: string;
  doctorRegistration: string;
  patientId: string;
  patientName: string;
  patientAgeGender: string;
  date: string;
  diagnosis: string;
  vitals?: {
    bp?: string;
    pulse?: string;
    temp?: string;
    weight?: string;
  };
  medications: PrescriptionMedication[];
  additionalInstructions: string;
  followUpDate?: string;
  status: 'Active' | 'Archived' | 'Revoked';
  qrVerificationUrl: string;
  createdAt: string;
}

export interface PrescriptionVerification {
  verificationId: string;
  prescriptionNumber: string;
  status: 'Authentic' | 'Revoked' | 'NotFound' | 'Expired';
  clinicName: string;
  clinicCity: string;
  doctorName: string;
  doctorRegistration: string;
  dateIssued: string;
  followUpDate?: string;
  verificationNotice: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-0391
  clinicId: string;
  branchId: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  appointmentId?: string;
  date: string;
  dueDate: string;
  items: InvoiceLineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  amountPaid: number;
  status: PaymentStatus;
  paymentMethod?: string;
}

export interface Expense {
  id: string;
  clinicId: string;
  branchId: string;
  category: 'Supplies' | 'Rent' | 'Salaries' | 'Utilities' | 'Equipment' | 'Maintenance' | 'Marketing';
  description: string;
  amount: number;
  date: string;
  paymentMethod: string;
  vendorName: string;
  receiptNumber?: string;
}

// SaaS Finance Models (Superadmin Domain)
export interface SaaSBillingInvoice {
  id: string;
  invoiceNumber: string;
  clinicId: string;
  clinicName: string;
  planId: SubscriptionTier;
  planName: string;
  billingPeriod: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Failed';
  paymentMethod: string;
  paidAt?: string;
  tierLimitDoctors: number;
  tierLimitBranches: number;
}

export interface SaaSPayment {
  id: string;
  paymentReference: string;
  clinicId: string;
  clinicName: string;
  invoiceNumber: string;
  amount: number;
  paymentMethod: 'Credit Card' | 'Direct Debit' | 'Razorpay' | 'Net Banking' | 'UPI Autopay';
  date: string;
  status: 'Success' | 'Failed' | 'Processing';
}

export interface SaaSRefund {
  id: string;
  refundReference: string;
  clinicId: string;
  clinicName: string;
  originalPaymentRef: string;
  amount: number;
  reason: string;
  requestDate: string;
  status: 'Completed' | 'Pending' | 'Rejected';
}

export interface SaaSExpense {
  id: string;
  category: 'Cloud Infrastructure' | 'SaaS Tooling' | 'Regulatory & Legal' | 'Engineering & Ops' | 'Payment Gateway Reserve';
  description: string;
  date: string;
  amount: number;
  paymentStatus: 'Paid' | 'Scheduled';
}

// Clinic Finance Models (Doctor/Admin Domain)
export interface ClinicPaymentRecord {
  id: string;
  paymentReference: string;
  patientId: string;
  patientName: string;
  invoiceNumber: string;
  amount: number;
  paymentMethod: 'UPI QR' | 'Credit/Debit Card' | 'Cash' | 'Net Banking';
  date: string;
  status: 'Completed' | 'Pending';
}

export interface ClinicRefundRecord {
  id: string;
  requestReference: string;
  originalPaymentRef: string;
  patientName: string;
  reason: string;
  amount: number;
  approvalStatus: 'Pending Approval' | 'Approved' | 'Rejected';
  requestedAt: string;
  approvedAt?: string;
}

export interface InventoryItem {
  id: string;
  clinicId: string;
  branchId: string;
  name: string;
  sku: string;
  category: string;
  unit: string; // e.g. "Boxes", "Bottles", "Packs", "Strips"
  batchNumber?: string;
  expiryDate?: string; // YYYY-MM-DD
  currentStock: number;
  minStockLevel: number;
  costPerUnit: number;
  supplier: string;
  status?: 'In Stock' | 'Low Stock' | 'Expiring Soon' | 'Expired';
  lastUpdated: string;
}

export interface InventoryMovement {
  id: string;
  clinicId: string;
  branchId?: string;
  itemId: string;
  itemName: string;
  sku: string;
  type: 'Receipt' | 'Adjustment' | 'Dispensed' | 'Damaged' | 'Transfer';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  actor: string;
  date: string;
}

export interface StockRequest {
  id: string;
  clinicId: string;
  branchId: string;
  itemName: string;
  sku: string;
  quantity: number;
  unit: string;
  urgency: 'Routine' | 'Urgent' | 'Emergency';
  requestedBy: string;
  department: string;
  requestedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface Supplier {
  id: string;
  clinicId: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  categories: string[];
  paymentTerms: string;
  rating: number;
  activeOrdersCount?: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  clinicId: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  deliveryDate?: string;
  totalAmount: number;
  itemsCount: number;
  status: 'Draft' | 'Sent' | 'Delivered' | 'Cancelled';
}

export interface TicketMessage {
  id: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
  isInternal?: boolean;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  clinicId: string;
  clinicName: string;
  category: 'Billing & Subscriptions' | 'Clinical Workflow' | 'Technical & Bug' | 'Hardware/Integration' | 'General Query';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Waiting on Customer' | 'Resolved' | 'Closed';
  subject: string;
  description: string;
  assignedTo?: string;
  assignedAgentName?: string;
  simulatedAttachment?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface BackgroundJob {
  id: string;
  name: string;
  schedule: string;
  lastRun: string;
  duration: string;
  status: 'Healthy' | 'Running' | 'Failed';
  processedRecords: number;
}

export interface SystemAuditLog {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export interface IntegrationStatus {
  id: string;
  name: string;
  category: string;
  provider: string;
  status: 'Operational' | 'Degraded' | 'Offline';
  latencyMs: number;
  uptime90d: number;
}

export interface ClinicalEncounter {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  clinicId: string;
  branchId: string;
  date: string;
  chiefComplaint: string;
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    spO2?: string;
    weight: string;
  };
  clinicalFindings: string;
  diagnosis: string;
  treatmentPlan: string;
  medications: PrescriptionMedication[];
  followUpDays?: number;
  followUpDate?: string;
  notes: string;
  isDraft: boolean;
  finalizedAt?: string;
}

export interface StaffMember {
  id: string;
  clinicId: string;
  branchIds: string[];
  name: string;
  email: string;
  phone: string;
  role: 'doctor' | 'receptionist' | 'inventory' | 'accountant' | 'nurse' | 'admin';
  department: string;
  status: StaffStatus;
  shift: string;
  joinedDate: string;
}

export interface SubscriptionPlan {
<<<<<<< HEAD
  id: SubscriptionTier | string;
=======
  id: SubscriptionTier;
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
<<<<<<< HEAD
  originalMonthlyPrice?: number;
  discountPercent?: number;
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  maxDoctors: number;
  maxBranches: number;
  maxStaff: number;
  features: string[];
  isPopular?: boolean;
}

<<<<<<< HEAD
export interface WhatsAppTemplate {
  id: string;
  key: string;
  name: string;
  category: 'Booking & Queue' | 'Clinical & Rx' | 'Financial & Invoices' | 'Patient Care';
  activity: string;
  description: string;
  body: string;
  variables: string[];
  status: 'Active' | 'Draft';
  lastEdited?: string;
}

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
export interface ClinicSubscription {
  id: string;
  clinicId: string;
  planId: SubscriptionTier;
  status: 'Trial' | 'Active' | 'PastDue' | 'Cancelled';
  billingInterval: 'Monthly' | 'Annual';
  trialDaysRemaining: number;
  currentPeriodEnd: string;
  lastPaymentDate: string;
  lastAmountPaid: number;
}

export interface WhatsAppNotification {
  id: string;
  clinicId: string;
  recipientPhone: string;
  recipientName: string;
  templateType: 'booking_confirmation' | 'reminder' | 'reschedule' | 'cancellation' | 'follow_up';
  messageBody: string;
  status: WhatsAppStatus;
  sentAt?: string;
  deliveredAt?: string;
  appointmentRef?: string;
}

export interface FollowUpTask {
  id: string;
  clinicId: string;
  branchId: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  dueDate: string;
  reason: string;
  status: 'Pending' | 'Completed' | 'Skipped';
  contactPreference: 'WhatsApp' | 'Phone Call' | 'SMS';
  lastContactedAt?: string;
}

export interface PlatformMetric {
  totalClinics: number;
  activeClinics: number;
  trialClinics: number;
  expiredTrials: number;
  activeSubscriptions: number;
  monthlyRecurringRevenue: number;
  totalAppointmentsMonth: number;
  registeredUsers: number;
}
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
