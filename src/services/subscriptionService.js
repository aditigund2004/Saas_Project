/**
 * Subscription & Feature-Based Pricing Service
 * Manages modular feature pricing, dynamic custom quotes, usage thresholds,
 * and Super Admin approval workflows for ClinicOS healthcare platform.
 */

export const DEFAULT_FEATURE_CATALOG = [
  {
    id: 'patient_management',
    name: 'Patient Management & EMR',
    category: 'Clinical Core',
    description: 'Unified electronic medical records, allergy logs, visit histories, and emergency contacts.',
    monthlyPrice: 499,
    includedLimit: 'Up to 5,000 active patient profiles',
    metricKey: 'patients',
    baseLimit: 5000,
    isCore: true
  },
  {
    id: 'doctor_staff_management',
    name: 'Doctor & Clinician Rosters',
    category: 'Clinical Core',
    description: 'Consultation shift scheduling, specialty categorization, and doctor fee split tracking.',
    monthlyPrice: 399,
    includedLimit: 'Base 2 consulting doctors included',
    metricKey: 'doctors',
    baseLimit: 2,
    isCore: true
  },
  {
    id: 'appointment_scheduling',
    name: 'Appointment Scheduling & Calendar',
    category: 'Clinical Core',
    description: 'Day, week, and list views with conflict detection, holiday blocks, and double-booking locks.',
    monthlyPrice: 299,
    includedLimit: 'Up to 1,500 appointment slots / month',
    metricKey: 'appointments',
    baseLimit: 1500,
    isCore: true
  },
  {
    id: 'digital_prescriptions_qr',
    name: 'Tamper-Evident QR Prescriptions',
    category: 'Clinical Core',
    description: 'Standard A4 PDF prescription generator with dosage presets, clinical notes, and cryptographic QR verification.',
    monthlyPrice: 249,
    includedLimit: 'Unlimited digital prescriptions',
    metricKey: 'prescriptions',
    baseLimit: 999999,
    isCore: true
  },
  {
    id: 'reception_queue',
    name: 'Front-Desk Walk-In Queue',
    category: 'Operations',
    description: '30-second rapid walk-in registration, thermal token slip printing, and live OPD waiting room screen.',
    monthlyPrice: 199,
    includedLimit: 'Unlimited queue tokens',
    metricKey: 'queueTokens',
    baseLimit: 999999,
    isCore: false
  },
  {
    id: 'whatsapp_notifications',
    name: 'WhatsApp Notification Automations',
    category: 'Communications',
    description: 'Automated booking confirmations, 24h prior reminders, and instant digital prescription delivery via WhatsApp.',
    monthlyPrice: 299,
    includedLimit: '1,000 WhatsApp alerts / month',
    metricKey: 'whatsapp',
    baseLimit: 1000,
    isCore: false
  },
  {
    id: 'email_management',
    name: 'Email Campaigns & Trigger Alerts',
    category: 'Communications',
    description: 'Transactional appointment emails, patient health bulletins, and automated follow-up digests.',
    monthlyPrice: 199,
    includedLimit: '2,500 emails / month',
    metricKey: 'emails',
    baseLimit: 2500,
    isCore: false
  },
  {
    id: 'billing_payments',
    name: 'Itemized Billing & GST Receipts',
    category: 'Operations',
    description: 'OPD service invoicing, multi-mode collections (Cash/UPI/Card), partial payments, and tax receipts.',
    monthlyPrice: 349,
    includedLimit: 'Unlimited billing transactions',
    metricKey: 'invoices',
    baseLimit: 999999,
    isCore: false
  },
  {
    id: 'clinical_inventory',
    name: 'Clinical Inventory & Stock Triggers',
    category: 'Operations',
    description: 'Surgical consumables, pharmacy stock batches, expiry alerts, and auto-replenishment warnings.',
    monthlyPrice: 299,
    includedLimit: 'Up to 300 clinical SKU items',
    metricKey: 'inventory',
    baseLimit: 300,
    isCore: false
  },
  {
    id: 'reports_analytics',
    name: 'Reports & Revenue Analytics',
    category: 'Operations',
    description: 'Daily collection logs, doctor productivity metrics, patient footfall trends, and Excel/PDF exports.',
    monthlyPrice: 399,
    includedLimit: 'Full analytics suite',
    metricKey: 'reports',
    baseLimit: 999999,
    isCore: false
  },
  {
    id: 'multi_branch_ops',
    name: 'Multi-Branch Hospital Governance',
    category: 'Infrastructure',
    description: 'Centralized administration across satellite clinics, unified medical charts, and cross-branch patient visits.',
    monthlyPrice: 599,
    includedLimit: 'Base 1 branch included',
    metricKey: 'branches',
    baseLimit: 1,
    isCore: false
  }
];

export const QUANTITY_ADDONS = [
  {
    id: 'extra_doctors',
    name: 'Additional Doctor Seats',
    description: 'Extra consulting practitioner logins with dedicated schedule rotas',
    unitPrice: 100,
    unitLabel: 'per doctor / mo',
    min: 0,
    max: 50,
    defaultQty: 1
  },
  {
    id: 'extra_branches',
    name: 'Additional Branch Locations',
    description: 'Physical satellite clinics with independent reception desks and stock vaults',
    unitPrice: 500,
    unitLabel: 'per branch / mo',
    min: 0,
    max: 15,
    defaultQty: 0
  },
  {
    id: 'extra_storage',
    name: 'Cloud Storage Expansion',
    description: 'Secure HIPAA/ISO-compliant storage for diagnostic X-rays and patient files (10 GB blocks)',
    unitPrice: 150,
    unitLabel: 'per 10 GB / mo',
    min: 0,
    max: 20,
    defaultQty: 1
  },
  {
    id: 'extra_whatsapp',
    name: 'Extra WhatsApp Notification Pack',
    description: 'Additional high-volume automated messaging credits (500 messages per pack)',
    unitPrice: 150,
    unitLabel: 'per 500 msgs / mo',
    min: 0,
    max: 20,
    defaultQty: 0
  }
];

export const DEFAULT_USAGE_THRESHOLDS = {
  doctors: { name: 'Doctor Consultation Seats', unit: 'Doctors', defaultLimit: 5, warningPercent: 80, criticalPercent: 100 },
  branches: { name: 'Active Hospital Branches', unit: 'Branches', defaultLimit: 2, warningPercent: 80, criticalPercent: 100 },
  appointments: { name: 'Monthly Booked Appointments', unit: 'Slots', defaultLimit: 1500, warningPercent: 80, criticalPercent: 100 },
  whatsapp: { name: 'WhatsApp Notification Reminders', unit: 'Messages', defaultLimit: 1000, warningPercent: 80, criticalPercent: 100 },
  emails: { name: 'Transactional Email Notifications', unit: 'Emails', defaultLimit: 2500, warningPercent: 80, criticalPercent: 100 },
  patients: { name: 'Registered Patient Records', unit: 'Patients', defaultLimit: 5000, warningPercent: 80, criticalPercent: 100 },
  storage: { name: 'Medical Document Cloud Storage', unit: 'GB', defaultLimit: 20, warningPercent: 80, criticalPercent: 100 }
};

/**
 * Calculates dynamic custom plan price breakdown.
 */
export function calculateCustomPlanPrice(selectedFeatureIds = [], quantities = {}, billingInterval = 'monthly', featureList = DEFAULT_FEATURE_CATALOG) {
  const selectedFeatures = featureList.filter((f) => selectedFeatureIds.includes(f.id));
  const featuresSubtotal = selectedFeatures.reduce((acc, f) => acc + f.monthlyPrice, 0);

  const extraDoctorsQty = Math.max(0, Number(quantities.extra_doctors || 0));
  const extraBranchesQty = Math.max(0, Number(quantities.extra_branches || 0));
  const extraStorageQty = Math.max(0, Number(quantities.extra_storage || 0));
  const extraWhatsappQty = Math.max(0, Number(quantities.extra_whatsapp || 0));

  const extraDoctorsCost = extraDoctorsQty * 100;
  const extraBranchesCost = extraBranchesQty * 500;
  const extraStorageCost = extraStorageQty * 150;
  const extraWhatsappCost = extraWhatsappQty * 150;

  const addonsSubtotal = extraDoctorsCost + extraBranchesCost + extraStorageCost + extraWhatsappCost;
  const grossMonthly = featuresSubtotal + addonsSubtotal;

  // Multi-module bundled discount: 10% discount if 6 or more features selected
  const discountPercent = selectedFeatures.length >= 6 ? 10 : 0;
  const discountAmount = Math.round((grossMonthly * discountPercent) / 100);
  const netMonthly = Math.max(0, grossMonthly - discountAmount);

  // Annual commitment gives extra 15% discount
  const annualTotal = Math.round(netMonthly * 12 * 0.85);
  const effectiveMonthlyAnnual = Math.round(annualTotal / 12);

  const itemizedBreakdown = [
    ...selectedFeatures.map((f) => ({
      name: f.name,
      category: f.category,
      unitPrice: f.monthlyPrice,
      qty: 1,
      total: f.monthlyPrice,
      type: 'feature'
    })),
    ...(extraDoctorsQty > 0
      ? [{ name: `Additional Doctor Seats (${extraDoctorsQty} seats)`, category: 'Add-on', unitPrice: 100, qty: extraDoctorsQty, total: extraDoctorsCost, type: 'addon' }]
      : []),
    ...(extraBranchesQty > 0
      ? [{ name: `Additional Branches (${extraBranchesQty} locations)`, category: 'Add-on', unitPrice: 500, qty: extraBranchesQty, total: extraBranchesCost, type: 'addon' }]
      : []),
    ...(extraStorageQty > 0
      ? [{ name: `Extra Cloud Storage (${extraStorageQty * 10} GB)`, category: 'Add-on', unitPrice: 150, qty: extraStorageQty, total: extraStorageCost, type: 'addon' }]
      : []),
    ...(extraWhatsappQty > 0
      ? [{ name: `WhatsApp Messaging Pack (${extraWhatsappQty * 500} msgs)`, category: 'Add-on', unitPrice: 150, qty: extraWhatsappQty, total: extraWhatsappCost, type: 'addon' }]
      : [])
  ];

  return {
    selectedFeatures,
    featuresSubtotal,
    addonsSubtotal,
    grossMonthly,
    discountPercent,
    discountAmount,
    netMonthly,
    annualTotal,
    effectiveMonthlyAnnual,
    displayPrice: billingInterval === 'annual' ? effectiveMonthlyAnnual : netMonthly,
    billingInterval,
    itemizedBreakdown
  };
}

/**
 * Evaluates usage against limit and returns status token.
 */
export function getThresholdStatus(current, limit, warningPercent = 80, criticalPercent = 100) {
  if (!limit || limit <= 0) {
    return { percentage: 0, status: 'Normal', variant: 'success', isExceeded: false };
  }
  const percentage = Math.round((current / limit) * 100);

  if (percentage > criticalPercent) {
    return {
      percentage,
      status: 'Approval Required',
      variant: 'danger',
      isExceeded: true,
      description: `Exceeded by ${(percentage - criticalPercent)}%. Super Admin quota approval required.`
    };
  }
  if (percentage === criticalPercent) {
    return {
      percentage,
      status: 'Threshold Reached',
      variant: 'orange',
      isExceeded: false,
      description: 'Capacity reached (100%). Next entry will require capacity approval.'
    };
  }
  if (percentage >= warningPercent) {
    return {
      percentage,
      status: 'Approaching Limit',
      variant: 'warning',
      isExceeded: false,
      description: `Operating at ${percentage}% capacity. Near threshold limit.`
    };
  }

  return {
    percentage,
    status: 'Normal',
    variant: 'success',
    isExceeded: false,
    description: `Operating normally at ${percentage}% utilization.`
  };
}

export const INITIAL_APPROVAL_REQUESTS = [
  {
    id: 'req-appr-101',
    clinicId: 'clinic-apex-dental',
    clinicName: 'Apex Dental & Maxillofacial Care',
    requestType: 'Custom Plan Request',
    submissionDate: '2026-10-25 11:30 AM',
    requestedTier: 'Bespoke Custom Plan',
    selectedFeatures: [
      'patient_management',
      'doctor_staff_management',
      'appointment_scheduling',
      'digital_prescriptions_qr',
      'whatsapp_notifications',
      'billing_payments',
      'clinical_inventory',
      'multi_branch_ops'
    ],
    quantities: { extra_doctors: 3, extra_branches: 1, extra_storage: 2, extra_whatsapp: 1 },
    currentCost: 4499,
    requestedMonthlyCost: 3280,
    annualCommitment: false,
    status: 'Pending Approval',
    reason: 'Multi-chair orthodontic practice requesting custom bundle without email campaigns but with multi-branch sync and 3 additional dental chairs.',
    metricsUsage: {
      doctors: { current: 5, limit: 5 },
      branches: { current: 2, limit: 2 },
      whatsapp: { current: 850, limit: 1000 }
    },
    superadminNotes: ''
  },
  {
    id: 'req-appr-102',
    clinicId: 'clinic-citycare-family',
    clinicName: 'CityCare Family Practice',
    requestType: 'Usage Threshold Exceeded',
    submissionDate: '2026-10-26 09:15 AM',
    requestedTier: 'Quota Upgrade Request',
    selectedFeatures: ['whatsapp_notifications', 'appointment_scheduling'],
    quantities: { extra_whatsapp: 2 },
    currentCost: 4499,
    requestedMonthlyCost: 4799,
    annualCommitment: false,
    status: 'Pending Approval',
    reason: 'Monthly WhatsApp notifications reached 1,180 (Allowed limit: 1,000 = 118%). Automated dispatch paused pending Super Admin capacity review.',
    metricsUsage: {
      whatsapp: { current: 1180, limit: 1000, exceeded: true },
      appointments: { current: 1420, limit: 1500 }
    },
    superadminNotes: ''
  },
  {
    id: 'req-appr-103',
    clinicId: 'clinic-pulse-ortho',
    clinicName: 'Pulse Orthopedics & Joint Care',
    requestType: 'Custom Plan Request',
    submissionDate: '2026-10-23 04:00 PM',
    requestedTier: 'Bespoke Custom Plan',
    selectedFeatures: ['patient_management', 'doctor_staff_management', 'digital_prescriptions_qr', 'billing_payments', 'reports_analytics'],
    quantities: { extra_doctors: 2, extra_storage: 3 },
    currentCost: 2499,
    requestedMonthlyCost: 2190,
    annualCommitment: true,
    status: 'Approved',
    reason: 'Specialized surgical physical therapy clinic with 4 physiotherapists and 30GB medical imaging storage.',
    metricsUsage: {
      doctors: { current: 4, limit: 4 },
      storage: { current: 28, limit: 30 }
    },
    superadminNotes: 'Approved with institutional verification. Diagnostic PACS quota granted.'
  },
  {
    id: 'req-appr-104',
    clinicId: 'clinic-lotus-child',
    clinicName: 'Lotus Children Wellness Hub',
    requestType: 'Custom Plan Request',
    submissionDate: '2026-10-21 02:45 PM',
    requestedTier: 'Bespoke Custom Plan',
    selectedFeatures: ['patient_management', 'appointment_scheduling'],
    quantities: { extra_doctors: 10 },
    currentCost: 2499,
    requestedMonthlyCost: 1799,
    annualCommitment: false,
    status: 'Rejected',
    reason: 'Requested 10 doctor seats on non-verified clinic registration without formal clinical registration documentation.',
    metricsUsage: {
      doctors: { current: 2, limit: 2 }
    },
    superadminNotes: 'Rejected: Medical establishment license pending state council verification.'
  }
];

