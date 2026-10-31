/**
 * Healthcare Regulatory & Data Compliance Service (Frontend Simulation Layer)
 * 
 * IMPORTANT COMPLIANCE NOTICE:
 * This is a simulated frontend governance monitoring service for ClinicOS Super Admin.
 * Operational statuses ('Configured', 'Pending Review', 'Action Required') indicate internal
 * application configuration readiness and do not represent verified statutory certifications,
 * official ABDM sandbox approvals, or statutory exemptions under the DPDP Act 2023.
 */

const STORAGE_KEY = 'clinipulse_compliance_data';

// Helper: Calculate client-side SHA-256 checksum for simulated tamper-evidence
export async function calculateSha256(contentString) {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(contentString);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err) {
    console.warn('SubtleCrypto unavailable, using deterministic fallback hash', err);
  }
  // Simple deterministic fallback hash
  let hash = 0;
  for (let i = 0; i < contentString.length; i++) {
    const char = contentString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'demo_sha256_' + Math.abs(hash).toString(16).padStart(16, '0') + 'c7e8';
}

// Initial Seed Dataset across existing tenant clinics
const INITIAL_COMPLIANCE_DATA = {
  // Tenant Governance Statuses
  clinicGovernance: [
    {
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      city: 'Pune',
      governanceStatus: 'Configured', // Configured | Pending Review | Action Required | Not Configured
      abdmStatus: 'Configured', // Configured | Pending Configuration | Connection Issue | Not Configured
      abhaEventCount: 3840,
      consentRecordsCount: 245,
      openPrivacyRequestsCount: 2,
      lastAuditTimestamp: '2026-10-28 16:45',
      dpoName: 'Dr. Vikram Singhania (Designated DPO)',
      dpoEmail: 'dpo@citycare.demo',
      retentionPolicyDays: 1095, // 3 Years statutory OPD retention
      fhirProfile: 'NRCES National Draft Profile v1.0',
      sandboxHealth: '99.8% Uptime',
      lastValidationStatus: 'Demo Validation Passed'
    },
    {
      clinicId: 'clinic-heartwell',
      clinicName: 'HeartWell Cardiology Centre',
      city: 'Mumbai',
      governanceStatus: 'Configured',
      abdmStatus: 'Configured',
      abhaEventCount: 5120,
      consentRecordsCount: 312,
      openPrivacyRequestsCount: 1,
      lastAuditTimestamp: '2026-10-29 09:15',
      dpoName: 'Adv. Meera Sen (Legal & Privacy Officer)',
      dpoEmail: 'compliance@heartwell.demo',
      retentionPolicyDays: 1825, // 5 Years Cardiology IPD
      fhirProfile: 'NRCES National Draft Profile v1.0',
      sandboxHealth: '100% Uptime',
      lastValidationStatus: 'Demo Validation Passed'
    },
    {
      clinicId: 'clinic-brightsmile',
      clinicName: 'BrightSmile Dental Studio',
      city: 'Bengaluru',
      governanceStatus: 'Pending Review',
      abdmStatus: 'Pending Configuration',
      abhaEventCount: 890,
      consentRecordsCount: 94,
      openPrivacyRequestsCount: 3,
      lastAuditTimestamp: '2026-10-27 14:20',
      dpoName: 'Dr. Neha Kapoor (Lead Practice Officer)',
      dpoEmail: 'care@brightsmile.demo',
      retentionPolicyDays: 730,
      fhirProfile: 'NRCES National Draft Profile v1.0',
      sandboxHealth: 'Configuring Bridge',
      lastValidationStatus: 'Needs Review'
    },
    {
      clinicId: 'clinic-skinspring',
      clinicName: 'SkinSpring Dermatology Clinic',
      city: 'Hyderabad',
      governanceStatus: 'Action Required',
      abdmStatus: 'Connection Issue',
      abhaEventCount: 1240,
      consentRecordsCount: 118,
      openPrivacyRequestsCount: 4,
      lastAuditTimestamp: '2026-10-29 08:30',
      dpoName: 'Rahul Varma (Practice Operations Lead)',
      dpoEmail: 'privacy@skinspring.demo',
      retentionPolicyDays: 1095,
      fhirProfile: 'NRCES National Draft Profile v1.0',
      sandboxHealth: 'Network TLS Handshake Timeout',
      lastValidationStatus: 'Schema Warning'
    },
    {
      clinicId: 'clinic-movewell',
      clinicName: 'MoveWell Orthopedic & Physiotherapy Centre',
      city: 'Navi Mumbai',
      governanceStatus: 'Not Configured',
      abdmStatus: 'Not Configured',
      abhaEventCount: 0,
      consentRecordsCount: 12,
      openPrivacyRequestsCount: 0,
      lastAuditTimestamp: '2026-10-25 11:00',
      dpoName: 'Unassigned',
      dpoEmail: 'admin@movewell.demo',
      retentionPolicyDays: 1095,
      fhirProfile: 'Pending Initial Onboarding',
      sandboxHealth: 'Inactive Bridge',
      lastValidationStatus: 'Needs Review'
    }
  ],

  // FHIR Interoperability Indicators & Resources
  fhirResources: [
    {
      id: 'fhir-res-1',
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      fhirVersion: 'FHIR R4 (v4.0.1)',
      profileStandard: 'NRCES Clinical Artifact v1.0 (Patient)',
      resourceType: 'Patient',
      validationStatus: 'Demo Validation Passed',
      lastValidated: '2026-10-29 10:14',
      issuesCount: 0,
      validationIssues: 'Resource complies with mock Indian NRCES profile identifiers (ABHA Address & Mobile Telecom).',
      suggestedAction: 'None. Ready for test bundle dispatch.',
      samplePayload: JSON.stringify({
        resourceType: 'Patient',
        id: 'PT-REF-4821',
        meta: { profile: ['https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient'] },
        identifier: [{ system: 'https://healthid.ndhm.gov.in', value: 'aarav.patel@abdm' }],
        name: [{ text: 'Aarav Patel (Demo)' }],
        gender: 'male',
        birthDate: '1988-06-12'
      }, null, 2)
    },
    {
      id: 'fhir-res-2',
      clinicId: 'clinic-heartwell',
      clinicName: 'HeartWell Cardiology Centre',
      fhirVersion: 'FHIR R4 (v4.0.1)',
      profileStandard: 'NRCES DiagnosticReport Artifact v1.0',
      resourceType: 'DiagnosticReport',
      validationStatus: 'Demo Validation Passed',
      lastValidated: '2026-10-29 09:30',
      issuesCount: 0,
      validationIssues: 'SNOMED CT coded observation values verified in test sandbox.',
      suggestedAction: 'Maintain current terminology bindings.',
      samplePayload: JSON.stringify({
        resourceType: 'DiagnosticReport',
        id: 'DR-ECG-2026-99',
        status: 'final',
        category: [{ coding: [{ system: 'http://snomed.info/sct', code: '268400002', display: '12 Lead ECG' }] }],
        code: { text: 'Electrocardiogram Normal Rhythm' },
        subject: { reference: 'Patient/PT-REF-1092' }
      }, null, 2)
    },
    {
      id: 'fhir-res-3',
      clinicId: 'clinic-skinspring',
      clinicName: 'SkinSpring Dermatology Clinic',
      fhirVersion: 'FHIR R4 (v4.0.1)',
      profileStandard: 'NRCES Encounter Artifact v1.0',
      resourceType: 'Encounter',
      validationStatus: 'Schema Warning',
      lastValidated: '2026-10-29 08:25',
      issuesCount: 1,
      validationIssues: 'Missing mandatory practitioner identifier system URI in participant element.',
      suggestedAction: 'Update Practitioner reference to include registration Council prefix (MCI/SMC code).',
      samplePayload: JSON.stringify({
        resourceType: 'Encounter',
        id: 'ENC-DERM-401',
        status: 'finished',
        class: { code: 'AMB', display: 'ambulatory' },
        subject: { reference: 'Patient/PT-REF-8830' },
        warning: 'Participant reference lacks registration system identifier'
      }, null, 2)
    },
    {
      id: 'fhir-res-4',
      clinicId: 'clinic-brightsmile',
      clinicName: 'BrightSmile Dental Studio',
      fhirVersion: 'FHIR R4 (v4.0.1)',
      profileStandard: 'NRCES Prescription / MedicationRequest v1.0',
      resourceType: 'MedicationRequest',
      validationStatus: 'Needs Review',
      lastValidated: '2026-10-27 16:40',
      issuesCount: 2,
      validationIssues: 'Dosage instructions lack structured timing frequency specification.',
      suggestedAction: 'Ensure morning/night structured timing intervals are serialized instead of free-text strings.',
      samplePayload: JSON.stringify({
        resourceType: 'MedicationRequest',
        id: 'RX-DENT-2026-11',
        status: 'active',
        intent: 'order',
        medicationCodeableConcept: { text: 'Amoxicillin 500mg' },
        warning: 'Unstructured timing text: "twice daily after meals"'
      }, null, 2)
    },
    {
      id: 'fhir-res-5',
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      fhirVersion: 'FHIR R4 (v4.0.1)',
      profileStandard: 'NRCES Observation Profile v1.0',
      resourceType: 'Observation',
      validationStatus: 'Demo Validation Passed',
      lastValidated: '2026-10-28 17:10',
      issuesCount: 0,
      validationIssues: 'LOINC code 8480-6 (Systolic Blood Pressure) properly bound.',
      suggestedAction: 'Periodic regression verification.',
      samplePayload: JSON.stringify({
        resourceType: 'Observation',
        id: 'OBS-BP-881',
        status: 'final',
        code: { coding: [{ system: 'http://loinc.org', code: '8480-6', display: 'Systolic blood pressure' }] },
        valueQuantity: { value: 124, unit: 'mm[Hg]' }
      }, null, 2)
    }
  ],

  // Consent Management Records across clinics
  consentRecords: [
    {
      id: 'CON-2026-801',
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      patientRef: 'PT-REF-4821',
      patientPseudonym: 'Patient AP-48',
      purpose: 'Longitudinal EHR & OPD Encounter Sync',
      dataCategories: ['Clinical Encounters', 'Digital Prescriptions', 'Diagnostic Reports'],
      status: 'Granted', // Granted | Pending | Revoked | Expired | Rejected
      legalBasis: 'Explicit Digital Consent (DPDP s.6 & ABDM Consent Manager)',
      recordedDate: '2026-09-15 11:20',
      expiryDate: '2027-09-15 23:59',
      lastUpdated: '2026-09-15 11:20',
      consentMode: 'HIP/HIU Bridge Mode',
      history: [
        { timestamp: '2026-09-15 11:20', status: 'Granted', notes: 'Patient authorized access via SMS OTP token #7741' }
      ]
    },
    {
      id: 'CON-2026-802',
      clinicId: 'clinic-heartwell',
      clinicName: 'HeartWell Cardiology Centre',
      patientRef: 'PT-REF-1092',
      patientPseudonym: 'Patient VK-10',
      purpose: 'Cardiac Diagnostics & Remote Holter Sync',
      dataCategories: ['Diagnostic Reports', 'Vital Telemetry'],
      status: 'Granted',
      legalBasis: 'Explicit Digital Consent (DPDP s.6)',
      recordedDate: '2026-10-01 14:10',
      expiryDate: '2027-04-01 23:59',
      lastUpdated: '2026-10-01 14:10',
      consentMode: 'ABDM Health Locker Forwarding',
      history: [
        { timestamp: '2026-10-01 14:10', status: 'Granted', notes: 'Consent granted for 180-day telemetry monitoring.' }
      ]
    },
    {
      id: 'CON-2026-803',
      clinicId: 'clinic-brightsmile',
      clinicName: 'BrightSmile Dental Studio',
      patientRef: 'PT-REF-9024',
      patientPseudonym: 'Patient MD-90',
      purpose: 'Dental 3D OPG Scan Sharing with Maxillofacial Specialist',
      dataCategories: ['Radiology Imaging', 'Treatment Plan'],
      status: 'Pending',
      legalBasis: 'Consent Request Dispatched (Awaiting Patient SMS Acceptance)',
      recordedDate: '2026-10-28 16:00',
      expiryDate: '2026-11-04 23:59',
      lastUpdated: '2026-10-28 16:00',
      consentMode: 'One-Time Referral Share',
      history: [
        { timestamp: '2026-10-28 16:00', status: 'Pending', notes: 'Consent notification sent to patient registered phone.' }
      ]
    },
    {
      id: 'CON-2026-804',
      clinicId: 'clinic-skinspring',
      clinicName: 'SkinSpring Dermatology Clinic',
      patientRef: 'PT-REF-8830',
      patientPseudonym: 'Patient RS-88',
      purpose: 'Cosmetic Clinical Follow-Up Photography Archival',
      dataCategories: ['Clinical Encounter Images'],
      status: 'Revoked',
      legalBasis: 'Consent Withdrawn by Data Principal',
      recordedDate: '2026-08-10 10:30',
      expiryDate: '2027-08-10 23:59',
      lastUpdated: '2026-10-26 15:45',
      consentMode: 'Private Practice Archive',
      history: [
        { timestamp: '2026-08-10 10:30', status: 'Granted', notes: 'Initial consent recorded during clinical photography.' },
        { timestamp: '2026-10-26 15:45', status: 'Revoked', notes: 'Patient submitted written withdrawal request #CON-WD-09.' }
      ]
    },
    {
      id: 'CON-2026-805',
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      patientRef: 'PT-REF-2201',
      patientPseudonym: 'Patient SP-22',
      purpose: 'Seasonal Vaccination Tracking & Reminder Webhook',
      dataCategories: ['Immunization Records'],
      status: 'Expired',
      legalBasis: 'Explicit Digital Consent (Expired)',
      recordedDate: '2025-10-15 09:00',
      expiryDate: '2026-10-15 23:59',
      lastUpdated: '2026-10-16 00:00',
      consentMode: 'Annual Preventive Health',
      history: [
        { timestamp: '2025-10-15 09:00', status: 'Granted', notes: '1-Year vaccination consent recorded.' },
        { timestamp: '2026-10-16 00:00', status: 'Expired', notes: 'Term expired automatically; data sharing gated.' }
      ]
    }
  ],

  // Data Privacy Requests (DPDP s.11, s.12, s.13 & Healthcare Retention Workflow)
  privacyRequests: [
    {
      id: 'DPR-2026-041',
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      patientRef: 'PT-REF-4821',
      patientPseudonym: 'Patient AP-48 (Aarav Patel)',
      requestType: 'Access or copy of personal data', // Access | Correction | Erasure | Anonymization | Consent withdrawal | Other
      submissionDate: '2026-10-24 11:30',
      targetDate: '2026-11-08 23:59', // 15-day statutory window
      assignedReviewer: 'Dr. Vikram Singhania (DPO)',
      status: 'Under Review', // Submitted | Identity Verification Pending | Under Review | Awaiting Clinic Action | Approved | Rejected | Processing | Completed | Escalated
      description: 'Data Principal requested comprehensive portable ZIP copy of clinical history, vitals telemetry, and digital billing ledger for insurance migration.',
      verificationStatus: 'Verified via OTP (Aadhaar/Mobile Demo)',
      reviewNotes: 'Identity confirmed via SMS OTP. Verification dossier attached. Compiling FHIR DiagnosticReport and Prescription bundles.',
      timeline: [
        { timestamp: '2026-10-24 11:30', title: 'Request Submitted', actor: 'Patient Portal', description: 'Request lodged via patient privacy cockpit.' },
        { timestamp: '2026-10-25 09:15', title: 'Identity Verification Completed', actor: 'Compliance Desk', description: 'Dual-factor verification token validated.' },
        { timestamp: '2026-10-26 14:00', title: 'Review Initiated', actor: 'Dr. Vikram Singhania', description: 'DPO assigned; scope established as OPD clinical records 2024-2026.' }
      ],
      affectedTenants: [
        { clinicId: 'clinic-citycare', clinicName: 'CityCare Family Clinic', taskStatus: 'In Progress', notes: 'Compiling 18 OPD consultation records.' }
      ],
      retentionObligations: 'Full export allowed. Original records retained in clinic archive per NMC Medical Ethics regulations 2020.',
      rejectionReason: null,
      escalationReason: null
    },
    {
      id: 'DPR-2026-042',
      clinicId: 'clinic-skinspring',
      clinicName: 'SkinSpring Dermatology Clinic',
      patientRef: 'PT-REF-8830',
      patientPseudonym: 'Patient RS-88',
      requestType: 'Erasure request',
      submissionDate: '2026-10-26 16:15',
      targetDate: '2026-11-10 23:59',
      assignedReviewer: 'Rahul Varma (Privacy Officer)',
      status: 'Awaiting Clinic Action',
      description: 'Patient requested deletion of marketing contact details and clinical photographs stored during aesthetic consultation.',
      verificationStatus: 'Verified via OTP (Mobile Demo)',
      reviewNotes: 'Clinical audit determined marketing phone list can be purged immediately. However, medical procedure record and informed consent must be retained for 3 years under Indian healthcare statutory guidelines.',
      timeline: [
        { timestamp: '2026-10-26 16:15', title: 'Request Submitted', actor: 'Patient Web Form', description: 'Erasure request initiated.' },
        { timestamp: '2026-10-27 10:00', title: 'Identity Verified', actor: 'Staff Reception Desk', description: 'Government photo ID cross-referenced with clinic registration.' },
        { timestamp: '2026-10-28 11:30', title: 'Statutory Retention Evaluation', actor: 'Legal Compliance', description: 'Segregated marketing records (eligible for purge) from clinical records (mandatory 3-year statutory hold).' }
      ],
      affectedTenants: [
        { clinicId: 'clinic-skinspring', clinicName: 'SkinSpring Dermatology Clinic', taskStatus: 'Pending DPO Execution', notes: 'Marketing database deletion pending approval.' }
      ],
      retentionObligations: 'IMPORTANT LEGAL GUARD: NMC Regulations require maintaining clinical charts for 3 years. Marketing contact information and elective non-clinical photography can be purged after DPO review.',
      rejectionReason: null,
      escalationReason: null
    },
    {
      id: 'DPR-2026-043',
      clinicId: 'clinic-brightsmile',
      clinicName: 'BrightSmile Dental Studio',
      patientRef: 'PT-REF-9024',
      patientPseudonym: 'Patient MD-90',
      requestType: 'Correction of personal data',
      submissionDate: '2026-10-28 14:00',
      targetDate: '2026-11-12 23:59',
      assignedReviewer: 'Dr. Neha Kapoor',
      status: 'Identity Verification Pending',
      description: 'Data Principal requested correction of date of birth and emergency contact address on official patient profile.',
      verificationStatus: 'Pending ID Proof Submission',
      reviewNotes: 'Patient advised to upload government proof (Passport / Voter ID / Aadhaar masked) to verify date of birth change.',
      timeline: [
        { timestamp: '2026-10-28 14:00', title: 'Request Lodged', actor: 'Receptionist Desk', description: 'Patient requested demographic amendment.' }
      ],
      affectedTenants: [
        { clinicId: 'clinic-brightsmile', clinicName: 'BrightSmile Dental Studio', taskStatus: 'Awaiting Document', notes: 'Awaiting scanned proof.' }
      ],
      retentionObligations: 'Correction of factual demographic discrepancies permitted upon identity validation.',
      rejectionReason: null,
      escalationReason: null
    },
    {
      id: 'DPR-2026-044',
      clinicId: 'clinic-heartwell',
      clinicName: 'HeartWell Cardiology Centre',
      patientRef: 'PT-REF-1092',
      patientPseudonym: 'Patient VK-10',
      requestType: 'Consent withdrawal',
      submissionDate: '2026-10-20 09:30',
      targetDate: '2026-11-04 23:59',
      assignedReviewer: 'Adv. Meera Sen',
      status: 'Completed',
      description: 'Revocation of voluntary clinical research registry participation and multi-center clinical telemetry forwarding.',
      verificationStatus: 'Verified via OTP (Aadhaar/Mobile Demo)',
      reviewNotes: 'Research telemetry token revoked in ABDM bridge. Patient notified via encrypted email and SMS confirmation.',
      timeline: [
        { timestamp: '2026-10-20 09:30', title: 'Withdrawal Submitted', actor: 'Patient Portal', description: 'Withdrawal notice generated.' },
        { timestamp: '2026-10-21 11:00', title: 'Approved', actor: 'Adv. Meera Sen', description: 'No outstanding medical study hold; approved for execution.' },
        { timestamp: '2026-10-22 14:20', title: 'Executed', actor: 'System Daemon', description: 'Research consent token invalidated; export channel severed.' },
        { timestamp: '2026-10-22 14:22', title: 'Marked Completed', actor: 'Adv. Meera Sen', description: 'Closure confirmation sent to data principal.' }
      ],
      affectedTenants: [
        { clinicId: 'clinic-heartwell', clinicName: 'HeartWell Cardiology Centre', taskStatus: 'Completed', notes: 'Registry webhook unlinked.' }
      ],
      retentionObligations: 'Primary medical charts retained under hospital statutory retention guidelines.',
      rejectionReason: null,
      escalationReason: null
    }
  ],

  // Compliance Audit Logs
  complianceAuditLogs: [
    {
      id: 'aud-cmp-101',
      timestamp: '2026-10-29 11:05',
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      actorType: 'Super Admin',
      actorRef: 'Vikramaditya Singhania (Superadmin)',
      category: 'Privacy Requests', // Consent Activity | Privacy Requests | ABHA Integration Events | FHIR Validation Events | Export Activity | Compliance Configuration Changes | Administrative Actions
      action: 'Privacy Request Review Status Transition',
      affectedResourceRef: 'DPR-2026-041',
      outcome: 'Success',
      correlationId: 'req-track-40192',
      details: 'Moved data access request DPR-2026-041 to "Under Review". Scope established as OPD clinical history.'
    },
    {
      id: 'aud-cmp-102',
      timestamp: '2026-10-29 10:14',
      clinicId: 'clinic-citycare',
      clinicName: 'CityCare Family Clinic',
      actorType: 'Integration Webhook',
      actorRef: 'ABDM Sandbox Bridge v2.4',
      category: 'FHIR Validation Events',
      action: 'Simulated FHIR R4 Bundle Validation',
      affectedResourceRef: 'Patient/PT-REF-4821',
      outcome: 'Success',
      correlationId: 'fhir-val-9921',
      details: 'Demo validation completed for Patient profile. 0 schema warnings detected.'
    },
    {
      id: 'aud-cmp-103',
      timestamp: '2026-10-28 16:45',
      clinicId: 'clinic-brightsmile',
      clinicName: 'BrightSmile Dental Studio',
      actorType: 'Clinic DPO',
      actorRef: 'Dr. Neha Kapoor (Clinic Admin)',
      category: 'Consent Activity',
      action: 'Patient Consent Request Dispatched',
      affectedResourceRef: 'CON-2026-803',
      outcome: 'Success',
      correlationId: 'con-sms-7781',
      details: 'Dispatched referral consent request for 3D OPG radiology sharing to patient mobile.'
    },
    {
      id: 'aud-cmp-104',
      timestamp: '2026-10-28 14:10',
      clinicId: 'clinic-skinspring',
      clinicName: 'SkinSpring Dermatology Clinic',
      actorType: 'System Daemon',
      actorRef: 'ABDM Gateway Healthcheck Job',
      category: 'ABHA Integration Events',
      action: 'Bridge Connectivity Probing',
      affectedResourceRef: 'ABDM-M2-BRIDGE',
      outcome: 'Failed',
      correlationId: 'conn-probe-104',
      details: 'Handshake timeout on endpoint https://gateway.sandbox.abdm.demo/v0.5/health. Network latency > 3500ms.'
    },
    {
      id: 'aud-cmp-105',
      timestamp: '2026-10-27 11:30',
      clinicId: 'clinic-heartwell',
      clinicName: 'HeartWell Cardiology Centre',
      actorType: 'Super Admin',
      actorRef: 'Vikramaditya Singhania',
      category: 'Export Activity',
      action: 'Compliance Vault Report Generated',
      affectedResourceRef: 'EXP-2026-079',
      outcome: 'Success',
      correlationId: 'vault-job-881',
      details: 'Generated Administrative Audit Trail export in CSV format. 142 records compiled.'
    },
    {
      id: 'aud-cmp-106',
      timestamp: '2026-10-26 15:45',
      clinicId: 'clinic-skinspring',
      clinicName: 'SkinSpring Dermatology Clinic',
      actorType: 'Patient Representative',
      actorRef: 'Patient RS-88',
      category: 'Consent Activity',
      action: 'Clinical Photography Consent Revoked',
      affectedResourceRef: 'CON-2026-804',
      outcome: 'Success',
      correlationId: 'wd-con-441',
      details: 'Data Principal revoked photo archival consent; media marked for restricted processing.'
    }
  ],

  // Compliance Export Vault Jobs
  exportJobs: [
    {
      id: 'EXP-2026-081',
      reportName: 'Q3 2026 Multi-Tenant Administrative Audit Ledger',
      reportType: 'Administrative Audit Log', // Administrative Audit Log | Consent Activity Report | Privacy Request Report | ABHA Integration Activity Report | FHIR Validation Summary | Clinic Governance Summary
      clinicScope: 'All Clinics',
      dateRange: '2026-07-01 to 2026-09-30',
      requestedBy: 'Vikramaditya Singhania (Super Admin)',
      createdAt: '2026-10-28 15:30',
      status: 'Ready', // Queued | Processing | Ready | Failed
      format: 'CSV',
      recordCount: 142,
      fileSize: '48.2 KB',
      checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      description: 'Comprehensive platform administrative actions across all tenant healthcare clinics.'
    },
    {
      id: 'EXP-2026-082',
      reportName: 'DPDP Data Privacy Request Fulfillment Digest',
      reportType: 'Privacy Request Report',
      clinicScope: 'All Clinics',
      dateRange: '2026-09-01 to 2026-10-29',
      requestedBy: 'Vikramaditya Singhania (Super Admin)',
      createdAt: '2026-10-29 09:00',
      status: 'Ready',
      format: 'JSON',
      recordCount: 28,
      fileSize: '64.8 KB',
      checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      description: 'Active and completed data principal privacy requests under evaluation.'
    },
    {
      id: 'EXP-2026-083',
      reportName: 'CityCare Family Clinic Consent Activity Log',
      reportType: 'Consent Activity Report',
      clinicScope: 'CityCare Family Clinic',
      dateRange: '2026-01-01 to 2026-10-29',
      requestedBy: 'Dr. Vikram Singhania',
      createdAt: '2026-10-29 10:20',
      status: 'Ready',
      format: 'CSV',
      recordCount: 245,
      fileSize: '78.4 KB',
      checksumSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      description: 'Patient consent lifecycle audit records for CityCare Family Clinic tenant.'
    }
  ]
};

// Compliance Service Object with LocalStorage Hydration
export const complianceService = {
  // Retrieve full state
  getData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse compliance local storage', e);
    }
    // Seed initial dataset
    this.saveData(INITIAL_COMPLIANCE_DATA);
    return INITIAL_COMPLIANCE_DATA;
  },

  // Save full state
  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist compliance data', e);
    }
  },

  // Reset to initial seed
  resetData() {
    this.saveData(INITIAL_COMPLIANCE_DATA);
    return INITIAL_COMPLIANCE_DATA;
  },

  // Update a Consent Record status & dispatch audit event
  updateConsentStatus(consentId, nextStatus, notes, actorName = 'Super Admin') {
    const data = this.getData();
    const idx = data.consentRecords.findIndex((c) => c.id === consentId);
    if (idx === -1) return { success: false, message: 'Consent record not found.' };

    const record = data.consentRecords[idx];
    const prevStatus = record.status;
    record.status = nextStatus;
    record.lastUpdated = new Date().toISOString().replace('T', ' ').slice(0, 16);
    record.history = [
      {
        timestamp: record.lastUpdated,
        status: nextStatus,
        notes: notes || `Status updated from ${prevStatus} to ${nextStatus}.`
      },
      ...(record.history || [])
    ];

    // Create Audit Log
    const auditEvent = {
      id: `aud-cmp-${Date.now()}`,
      timestamp: record.lastUpdated,
      clinicId: record.clinicId,
      clinicName: record.clinicName,
      actorType: 'Super Admin',
      actorRef: actorName,
      category: 'Consent Activity',
      action: `Consent Status Transition: ${prevStatus} ➔ ${nextStatus}`,
      affectedResourceRef: record.id,
      outcome: 'Success',
      correlationId: `con-tx-${Date.now()}`,
      details: `Consent record for ${record.patientPseudonym} (${record.purpose}) updated to ${nextStatus}. Justification: ${notes || 'Administrative review.'}`
    };

    data.complianceAuditLogs = [auditEvent, ...data.complianceAuditLogs];
    data.consentRecords[idx] = record;
    this.saveData(data);

    return { success: true, record, auditEvent };
  },

  // Update a Privacy Request Workflow & dispatch audit event
  updatePrivacyRequest(requestId, updates, transitionNote, actorName = 'Super Admin') {
    const data = this.getData();
    const idx = data.privacyRequests.findIndex((r) => r.id === requestId);
    if (idx === -1) return { success: false, message: 'Privacy request not found.' };

    const req = data.privacyRequests[idx];
    const prevStatus = req.status;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);

    // Apply updates
    Object.assign(req, updates);

    // Add timeline event
    req.timeline = [
      {
        timestamp: now,
        title: updates.status ? `Status Transitioned to ${updates.status}` : 'Request Updated',
        actor: actorName,
        description: transitionNote || updates.reviewNotes || 'Administrative review action performed.'
      },
      ...(req.timeline || [])
    ];

    // Create Audit Event
    const auditEvent = {
      id: `aud-cmp-${Date.now()}`,
      timestamp: now,
      clinicId: req.clinicId,
      clinicName: req.clinicName,
      actorType: 'Super Admin',
      actorRef: actorName,
      category: 'Privacy Requests',
      action: updates.status
        ? `Privacy Request Status Transition: ${prevStatus} ➔ ${updates.status}`
        : 'Privacy Request Review Updated',
      affectedResourceRef: req.id,
      outcome: 'Success',
      correlationId: `dpr-wf-${Date.now()}`,
      details: `Request ${req.id} (${req.requestType}) for ${req.patientPseudonym}. ${transitionNote || 'Review notes updated.'}`
    };

    data.complianceAuditLogs = [auditEvent, ...data.complianceAuditLogs];
    data.privacyRequests[idx] = req;
    this.saveData(data);

    return { success: true, request: req, auditEvent };
  },

  // Trigger simulated FHIR test validation
  revalidateFhirResource(resourceId, actorName = 'Super Admin') {
    const data = this.getData();
    const idx = data.fhirResources.findIndex((r) => r.id === resourceId);
    if (idx === -1) return { success: false, message: 'FHIR resource not found.' };

    const res = data.fhirResources[idx];
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    res.lastValidated = now;
    res.validationStatus = 'Demo Validation Passed';
    res.issuesCount = 0;
    res.validationIssues = 'Simulated schema validation re-check passed without syntax or profile discrepancies.';

    const auditEvent = {
      id: `aud-cmp-${Date.now()}`,
      timestamp: now,
      clinicId: res.clinicId,
      clinicName: res.clinicName,
      actorType: 'Super Admin',
      actorRef: actorName,
      category: 'FHIR Validation Events',
      action: 'FHIR Resource Re-validation Execution',
      affectedResourceRef: `${res.resourceType}/${res.id}`,
      outcome: 'Success',
      correlationId: `fhir-reval-${Date.now()}`,
      details: `Executed demo validation check for ${res.resourceType} profile standard (${res.profileStandard}).`
    };

    data.complianceAuditLogs = [auditEvent, ...data.complianceAuditLogs];
    data.fhirResources[idx] = res;
    this.saveData(data);

    return { success: true, resource: res, auditEvent };
  },

  // Generate Real Downloadable Compliance Report in Export Vault
  async generateExportJob(config, actorName = 'Super Admin') {
    const data = this.getData();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newJobId = `EXP-2026-${Math.floor(100 + Math.random() * 900)}`;

    // Build real dataset based on report type and clinic scope
    let compiledRecords = [];
    const filterClinic = config.clinicScope && config.clinicScope !== 'All Clinics' ? config.clinicScope : null;

    if (config.reportType === 'Administrative Audit Log') {
      compiledRecords = data.complianceAuditLogs.filter(
        (l) => !filterClinic || l.clinicName === filterClinic || l.clinicId === filterClinic
      );
    } else if (config.reportType === 'Consent Activity Report') {
      compiledRecords = data.consentRecords.filter(
        (c) => !filterClinic || c.clinicName === filterClinic || c.clinicId === filterClinic
      );
    } else if (config.reportType === 'Privacy Request Report') {
      compiledRecords = data.privacyRequests.filter(
        (r) => !filterClinic || r.clinicName === filterClinic || r.clinicId === filterClinic
      );
    } else if (config.reportType === 'FHIR Validation Summary') {
      compiledRecords = data.fhirResources.filter(
        (f) => !filterClinic || f.clinicName === filterClinic || f.clinicId === filterClinic
      );
    } else {
      // Clinic Governance Summary
      compiledRecords = data.clinicGovernance.filter(
        (g) => !filterClinic || g.clinicName === filterClinic || g.clinicId === filterClinic
      );
    }

    // Generate real content string (CSV or JSON)
    let contentString = '';
    if (config.format === 'JSON') {
      contentString = JSON.stringify(
        {
          exportMetadata: {
            jobId: newJobId,
            reportName: config.reportName,
            reportType: config.reportType,
            clinicScope: config.clinicScope,
            dateRange: config.dateRange,
            generatedAt: now,
            requestedBy: actorName,
            recordCount: compiledRecords.length,
            complianceNotice:
              'Simulated ClinicOS Frontend Compliance Manifest. Checksum verifies file transmission integrity.'
          },
          records: compiledRecords
        },
        null,
        2
      );
    } else {
      // CSV Export
      if (compiledRecords.length > 0) {
        const headers = Object.keys(compiledRecords[0]).filter((k) => typeof compiledRecords[0][k] !== 'object');
        const rows = compiledRecords.map((item) =>
          headers.map((h) => `"${String(item[h] || '').replace(/"/g, '""')}"`).join(',')
        );
        contentString = [headers.join(','), ...rows].join('\n');
      } else {
        contentString = 'ID,Notice\nNO_DATA,"No records found matching selected export criteria."';
      }
    }

    // Calculate real SHA-256 hash of the content string
    const checksum = await calculateSha256(contentString);
    const sizeKb = (contentString.length / 1024).toFixed(1) + ' KB';

    const newJob = {
      id: newJobId,
      reportName: config.reportName,
      reportType: config.reportType,
      clinicScope: config.clinicScope,
      dateRange: config.dateRange,
      requestedBy: actorName,
      createdAt: now,
      status: 'Ready',
      format: config.format,
      recordCount: compiledRecords.length,
      fileSize: sizeKb,
      checksumSha256: checksum,
      description: config.description || `Generated ${config.reportType} export for compliance auditing.`,
      rawContent: contentString
    };

    // Log the export creation event in the audit trail
    const auditEvent = {
      id: `aud-cmp-${Date.now()}`,
      timestamp: now,
      clinicId: filterClinic || 'all-tenants',
      clinicName: config.clinicScope,
      actorType: 'Super Admin',
      actorRef: actorName,
      category: 'Export Activity',
      action: `Compliance Report Export Generated: ${config.reportType}`,
      affectedResourceRef: newJobId,
      outcome: 'Success',
      correlationId: `exp-job-${Date.now()}`,
      details: `Generated ${config.format} export with ${compiledRecords.length} records. SHA-256: ${checksum.slice(0, 16)}...`
    };

    data.exportJobs = [newJob, ...data.exportJobs];
    data.complianceAuditLogs = [auditEvent, ...data.complianceAuditLogs];
    this.saveData(data);

    return { success: true, job: newJob, auditEvent };
  },

  // Trigger actual file download in browser
  downloadReportFile(job) {
    if (!job || !job.rawContent) return false;
    try {
      const mimeType = job.format === 'JSON' ? 'application/json' : 'text/csv;charset=utf-8;';
      const blob = new Blob([job.rawContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `clinicos_${job.reportType.toLowerCase().replace(/\s+/g, '_')}_${job.id}.${job.format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (e) {
      console.error('Download error', e);
      return false;
    }
  },

  // Download cryptographic tamper-evidence manifest as JSON
  downloadManifest(job) {
    if (!job) return false;
    try {
      const manifest = {
        manifestVersion: '1.0-SIMULATED-EVIDENCE',
        exportJobId: job.id,
        reportName: job.reportName,
        reportType: job.reportType,
        clinicScope: job.clinicScope,
        dateRange: job.dateRange,
        generationTimestamp: job.createdAt,
        requestedBy: job.requestedBy,
        recordCount: job.recordCount,
        fileFormat: job.format,
        fileSizeBytes: job.fileSize,
        checksumAlgorithm: 'SHA-256 (Client WebCrypto Digest)',
        sha256Checksum: job.checksumSha256,
        disclaimerNotice:
          'DISCLAIMER: This client-generated SHA-256 checksum provides file integrity verification against post-export corruption or modification. It does not establish statutory non-repudiation, tamper-proof hardware storage, or legal certification under Indian Evidence Act/DPDP without verified PKI signatures.'
      };

      const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `manifest_${job.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (e) {
      console.error('Manifest download error', e);
      return false;
    }
  }
};

