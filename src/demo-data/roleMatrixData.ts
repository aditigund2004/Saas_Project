export interface PersonnelMember {
  id: string;
  name: string;
  email: string;
  department: 'Engineering / Devs' | 'QA & Testing' | 'DevOps & SRE' | 'Security & Compliance' | 'Customer Support' | 'Executive / Superadmin' | 'Clinical Operations';
  title: string;
  avatar: string;
  environmentAccess: ('Production' | 'Staging' | 'QA Sandbox' | 'Demo / Local')[];
  accessScope: 'Global Root' | 'Infrastructure Only' | 'E2E Testing Suite' | 'Audit / Compliance' | 'Support Escalations' | 'Tenant Scoped';
  mfaStatus: 'Enforced Hardware Key' | 'Enforced TOTP' | 'Biometric Passkey';
  activeSession: 'Active Now' | '2h ago' | '4h ago' | 'Yesterday';
  securityClearance: 'Level 4 - Root' | 'Level 3 - Engineering' | 'Level 2 - Operations' | 'Level 1 - Support';
  joinedDate: string;
}

export interface RbacPermissionRow {
  roleId: string;
  roleName: string;
  category: 'Platform Staff' | 'Clinic Tenant Staff' | 'End User';
  headcount: number;
  tenantOnboarding: 'Full Access' | 'Read Only' | 'Tenant Scoped' | 'No Access';
  billingFinance: 'Full Access' | 'Read Only' | 'Tenant Scoped' | 'No Access';
  infrastructureLogs: 'Full Access' | 'Read Only' | 'No Access';
  clinicalEhr: 'Full Access' | 'Read Only' | 'Tenant Scoped' | 'No Access';
  prescriptionSigning: 'Full Access' | 'Verify Only' | 'Tenant Scoped' | 'No Access';
  piiAccess: 'Full Access' | 'Masked / Anonymized' | 'Tenant Scoped' | 'No Access';
  featureFlags: 'Full Access' | 'Read Only' | 'No Access';
  auditCompliance: 'Full Access' | 'Audit Logged' | 'Read Only' | 'No Access';
}

export const WORKFORCE_METRICS = {
  totalWorkforce: 48,
  activeNow: 19,
  engineering: 14, // Developers
  qaTesting: 6,    // QA / Testers
  devopsSre: 4,    // DevOps & SRE
  securityCompliance: 3, // Security & HIPAA
  supportSuccess: 7,     // Customer Support
  clinicalOperations: 14 // Medical Informatics & Clinic Admins
};

export const RBAC_PERMISSIONS_MATRIX: RbacPermissionRow[] = [
  {
    roleId: 'superadmin',
    roleName: 'SaaS Superadmin (Global Root)',
    category: 'Platform Staff',
    headcount: 2,
    tenantOnboarding: 'Full Access',
    billingFinance: 'Full Access',
    infrastructureLogs: 'Full Access',
    clinicalEhr: 'Read Only',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Masked / Anonymized',
    featureFlags: 'Full Access',
    auditCompliance: 'Full Access'
  },
  {
    roleId: 'lead_architect',
    roleName: 'Principal Architect / Engineering Lead',
    category: 'Platform Staff',
    headcount: 3,
    tenantOnboarding: 'Full Access',
    billingFinance: 'Read Only',
    infrastructureLogs: 'Full Access',
    clinicalEhr: 'No Access',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Masked / Anonymized',
    featureFlags: 'Full Access',
    auditCompliance: 'Audit Logged'
  },
  {
    roleId: 'frontend_dev',
    roleName: 'Frontend Software Engineer (React / UI)',
    category: 'Platform Staff',
    headcount: 6,
    tenantOnboarding: 'Read Only',
    billingFinance: 'Read Only',
    infrastructureLogs: 'Read Only',
    clinicalEhr: 'No Access',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Masked / Anonymized',
    featureFlags: 'Full Access',
    auditCompliance: 'Audit Logged'
  },
  {
    roleId: 'backend_dev',
    roleName: 'Backend & Platform API Engineer',
    category: 'Platform Staff',
    headcount: 5,
    tenantOnboarding: 'Full Access',
    billingFinance: 'Read Only',
    infrastructureLogs: 'Full Access',
    clinicalEhr: 'No Access',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Masked / Anonymized',
    featureFlags: 'Full Access',
    auditCompliance: 'Audit Logged'
  },
  {
    roleId: 'qa_tester',
    roleName: 'QA Automation & Reliability Tester',
    category: 'Platform Staff',
    headcount: 6,
    tenantOnboarding: 'Read Only',
    billingFinance: 'Read Only',
    infrastructureLogs: 'Read Only',
    clinicalEhr: 'Read Only',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Masked / Anonymized',
    featureFlags: 'Read Only',
    auditCompliance: 'Audit Logged'
  },
  {
    roleId: 'devops_sre',
    roleName: 'DevOps & SRE Cloud Engineer',
    category: 'Platform Staff',
    headcount: 4,
    tenantOnboarding: 'Read Only',
    billingFinance: 'No Access',
    infrastructureLogs: 'Full Access',
    clinicalEhr: 'No Access',
    prescriptionSigning: 'No Access',
    piiAccess: 'No Access',
    featureFlags: 'Full Access',
    auditCompliance: 'Full Access'
  },
  {
    roleId: 'security_officer',
    roleName: 'Information Security & HIPAA Auditor',
    category: 'Platform Staff',
    headcount: 3,
    tenantOnboarding: 'Read Only',
    billingFinance: 'Read Only',
    infrastructureLogs: 'Full Access',
    clinicalEhr: 'Audit Logged',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Masked / Anonymized',
    featureFlags: 'Read Only',
    auditCompliance: 'Full Access'
  },
  {
    roleId: 'tier2_support',
    roleName: 'Tier-2 Technical Escalation Specialist',
    category: 'Platform Staff',
    headcount: 7,
    tenantOnboarding: 'Read Only',
    billingFinance: 'Read Only',
    infrastructureLogs: 'Read Only',
    clinicalEhr: 'No Access',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Masked / Anonymized',
    featureFlags: 'No Access',
    auditCompliance: 'Audit Logged'
  },
  {
    roleId: 'doctor_admin',
    roleName: 'Clinic Doctor / Admin',
    category: 'Clinic Tenant Staff',
    headcount: 24,
    tenantOnboarding: 'Tenant Scoped',
    billingFinance: 'Tenant Scoped',
    infrastructureLogs: 'No Access',
    clinicalEhr: 'Full Access',
    prescriptionSigning: 'Full Access',
    piiAccess: 'Tenant Scoped',
    featureFlags: 'No Access',
    auditCompliance: 'Audit Logged'
  },
  {
    roleId: 'receptionist_manager',
    roleName: 'Clinic Receptionist / Front Desk',
    category: 'Clinic Tenant Staff',
    headcount: 18,
    tenantOnboarding: 'No Access',
    billingFinance: 'Tenant Scoped',
    infrastructureLogs: 'No Access',
    clinicalEhr: 'No Access',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'Tenant Scoped',
    featureFlags: 'No Access',
    auditCompliance: 'Audit Logged'
  },
  {
    roleId: 'patient',
    roleName: 'Patient Self-Service User',
    category: 'End User',
    headcount: 1420,
    tenantOnboarding: 'No Access',
    billingFinance: 'No Access',
    infrastructureLogs: 'No Access',
    clinicalEhr: 'No Access',
    prescriptionSigning: 'Verify Only',
    piiAccess: 'No Access',
    featureFlags: 'No Access',
    auditCompliance: 'No Access'
  }
];

export const PLATFORM_PERSONNEL: PersonnelMember[] = [
  // Core Engineering (Developers)
  {
    id: 'emp-eng-01',
    name: 'Ananya Sengupta',
    email: 'ananya.s@clinicos.tech',
    department: 'Engineering / Devs',
    title: 'Staff Frontend Architect (React, TypeScript & Design System)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging', 'QA Sandbox', 'Demo / Local'],
    accessScope: 'Global Root',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2024-02-15'
  },
  {
    id: 'emp-eng-02',
    name: 'Marcus Vance',
    email: 'marcus.v@clinicos.tech',
    department: 'Engineering / Devs',
    title: 'Lead Platform Backend Engineer (Multi-Tenant Isolation & Node/Go)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging', 'QA Sandbox'],
    accessScope: 'Global Root',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2024-03-01'
  },
  {
    id: 'emp-eng-03',
    name: 'Siddharth Verma',
    email: 'siddharth.v@clinicos.tech',
    department: 'Engineering / Devs',
    title: 'Full-Stack Engineer (Real-Time Availability Engine & Queues)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Staging', 'QA Sandbox', 'Demo / Local'],
    accessScope: 'Global Root',
    mfaStatus: 'Enforced TOTP',
    activeSession: '2h ago',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2024-07-10'
  },
  {
    id: 'emp-eng-04',
    name: 'Priya Swaminathan',
    email: 'priya.swami@clinicos.tech',
    department: 'Engineering / Devs',
    title: 'Senior Database Engineer (Postgres Multi-AZ & Replication)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging'],
    accessScope: 'Infrastructure Only',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2024-05-18'
  },
  {
    id: 'emp-eng-05',
    name: 'Chen Wei',
    email: 'chen.wei@clinicos.tech',
    department: 'Engineering / Devs',
    title: 'API Integrations Engineer (Meta Cloud WhatsApp API & Twilio)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Staging', 'QA Sandbox', 'Demo / Local'],
    accessScope: 'Global Root',
    mfaStatus: 'Biometric Passkey',
    activeSession: '4h ago',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2024-09-01'
  },
  {
    id: 'emp-eng-06',
    name: 'Rohan Joshi',
    email: 'rohan.j@clinicos.tech',
    department: 'Engineering / Devs',
    title: 'Frontend Engineer (Patient Portal & Mobile Web Experience)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Staging', 'QA Sandbox', 'Demo / Local'],
    accessScope: 'Global Root',
    mfaStatus: 'Enforced TOTP',
    activeSession: 'Yesterday',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2025-01-12'
  },

  // QA & Reliability Testers
  {
    id: 'emp-qa-01',
    name: 'Sarah Jenkins',
    email: 'sarah.j@clinicos.tech',
    department: 'QA & Testing',
    title: 'Lead QA Automation Architect (E2E Cypress & Playwright)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Staging', 'QA Sandbox', 'Demo / Local'],
    accessScope: 'E2E Testing Suite',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 2 - Operations',
    joinedDate: '2024-04-10'
  },
  {
    id: 'emp-qa-02',
    name: 'Tenzin Dorjee',
    email: 'tenzin.d@clinicos.tech',
    department: 'QA & Testing',
    title: 'Senior Concurrency & Double-Booking Stress Tester',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Staging', 'QA Sandbox'],
    accessScope: 'E2E Testing Suite',
    mfaStatus: 'Enforced TOTP',
    activeSession: 'Active Now',
    securityClearance: 'Level 2 - Operations',
    joinedDate: '2024-06-22'
  },
  {
    id: 'emp-qa-03',
    name: 'Neha Deshpande',
    email: 'neha.d@clinicos.tech',
    department: 'QA & Testing',
    title: 'Clinical Workflow QA Specialist (Prescriptions & ICD-10 Coding)',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['QA Sandbox', 'Demo / Local'],
    accessScope: 'E2E Testing Suite',
    mfaStatus: 'Biometric Passkey',
    activeSession: '2h ago',
    securityClearance: 'Level 2 - Operations',
    joinedDate: '2024-08-15'
  },
  {
    id: 'emp-qa-04',
    name: 'David Miller',
    email: 'david.m@clinicos.tech',
    department: 'QA & Testing',
    title: 'Performance & Load Testing Engineer (k6 & Locust 10k RPS)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Staging', 'QA Sandbox'],
    accessScope: 'E2E Testing Suite',
    mfaStatus: 'Enforced TOTP',
    activeSession: 'Yesterday',
    securityClearance: 'Level 2 - Operations',
    joinedDate: '2024-11-03'
  },

  // DevOps & SRE Cloud Infrastructure
  {
    id: 'emp-ops-01',
    name: 'Alexey Voronov',
    email: 'alexey.v@clinicos.tech',
    department: 'DevOps & SRE',
    title: 'Principal Cloud Architect (AWS Mumbai Multi-AZ EKS & Terraform)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging', 'QA Sandbox'],
    accessScope: 'Infrastructure Only',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 4 - Root',
    joinedDate: '2024-01-10'
  },
  {
    id: 'emp-ops-02',
    name: 'Fatima Zahra',
    email: 'fatima.z@clinicos.tech',
    department: 'DevOps & SRE',
    title: 'Senior SRE & Observability Lead (Datadog APM & 99.98% SLA)',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging'],
    accessScope: 'Infrastructure Only',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2024-04-18'
  },

  // Security & Compliance (HIPAA / DISHA)
  {
    id: 'emp-sec-01',
    name: 'Dr. Kabir Mehta',
    email: 'kabir.m@clinicos.tech',
    department: 'Security & Compliance',
    title: 'Chief Information Security Officer & HIPAA Privacy Lead',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging', 'QA Sandbox'],
    accessScope: 'Audit / Compliance',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 4 - Root',
    joinedDate: '2024-02-01'
  },
  {
    id: 'emp-sec-02',
    name: 'Elena Rostova',
    email: 'elena.r@clinicos.tech',
    department: 'Security & Compliance',
    title: 'Data Protection Officer (DISHA & SOC-2 Audit Governance)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging'],
    accessScope: 'Audit / Compliance',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: '2h ago',
    securityClearance: 'Level 3 - Engineering',
    joinedDate: '2024-06-01'
  },

  // Customer Support & Operations
  {
    id: 'emp-sup-01',
    name: 'Pooja Sharma',
    email: 'pooja.s@clinicos.tech',
    department: 'Customer Support',
    title: 'Head of Customer Success & Clinic Tenant Onboarding',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging', 'Demo / Local'],
    accessScope: 'Support Escalations',
    mfaStatus: 'Enforced TOTP',
    activeSession: 'Active Now',
    securityClearance: 'Level 2 - Operations',
    joinedDate: '2024-03-15'
  },
  {
    id: 'emp-sup-02',
    name: 'Daniel O\'Connor',
    email: 'daniel.oc@clinicos.tech',
    department: 'Customer Support',
    title: 'Tier-2 Technical Escalation Engineer (Webhooks & Printing)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Staging', 'QA Sandbox'],
    accessScope: 'Support Escalations',
    mfaStatus: 'Biometric Passkey',
    activeSession: '3h ago',
    securityClearance: 'Level 1 - Support',
    joinedDate: '2024-08-20'
  },

  // Executive / Superadmin
  {
    id: 'emp-exec-01',
    name: 'Vikramaditya Singhania',
    email: 'admin@clinicos.health',
    department: 'Executive / Superadmin',
    title: 'SaaS Platform Founder & Executive Administrator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    environmentAccess: ['Production', 'Staging', 'QA Sandbox', 'Demo / Local'],
    accessScope: 'Global Root',
    mfaStatus: 'Enforced Hardware Key',
    activeSession: 'Active Now',
    securityClearance: 'Level 4 - Root',
    joinedDate: '2024-01-01'
  }
];

export const ACCESS_AUDIT_LOGS = [
  {
    id: 'aud-sec-901',
    timestamp: 'Today, 14:12',
    actor: 'Ananya Sengupta (Staff Frontend Architect)',
    action: 'Simulated Canary Feature Flag Rollout (Booking Wizard v2.4)',
    result: 'Authorized',
    ip: '10.0.4.19 (Internal VPN)',
    mfaVerified: true
  },
  {
    id: 'aud-sec-902',
    timestamp: 'Today, 13:45',
    actor: 'Tenzin Dorjee (QA Concurrency Tester)',
    action: 'Simulate High-Concurrency Conflict Check (100 parallel slot claims)',
    result: 'Blocked Double-Booking',
    ip: '10.0.6.88 (QA VPC)',
    mfaVerified: true
  },
  {
    id: 'aud-sec-903',
    timestamp: 'Today, 12:30',
    actor: 'Sarah Jenkins (Lead QA Architect)',
    action: 'Automated E2E Playwright Suite Execution (Full 6 Scenarios)',
    result: 'Passed (100% Green)',
    ip: '10.0.6.12 (CI/CD Runner)',
    mfaVerified: true
  },
  {
    id: 'aud-sec-904',
    timestamp: 'Today, 11:15',
    actor: 'Alexey Voronov (Principal Cloud SRE)',
    action: 'Database Multi-AZ Snapshot & Read Replica Failover Drill',
    result: 'Zero Data Loss Drill Confirmed',
    ip: '10.0.1.5 (Bastion Host)',
    mfaVerified: true
  },
  {
    id: 'aud-sec-905',
    timestamp: 'Today, 09:00',
    actor: 'Dr. Kabir Mehta (CISO)',
    action: 'Quarterly HIPAA Privilege Scope & PII Masking Review',
    result: 'Compliant & Certified',
    ip: '10.0.2.14 (SecOps Hub)',
    mfaVerified: true
  }
];

