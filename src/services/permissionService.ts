/**
 * Centralized Role-Based Access Control (RBAC) & Permission Engine
 * Provides single source of truth for role permissions across ClinicOS.
 */

export type UserRole = 'superadmin' | 'doctor_admin' | 'receptionist_manager' | 'patient';

export type Permission =
  // Super Admin
  | 'MANAGE_CLINICS'
  | 'MANAGE_PLANS'
  | 'VIEW_ORGANIZATION_ANALYTICS'
  | 'MANAGE_SYSTEM_SETTINGS'
  | 'VIEW_AUDIT_LOGS'
  | 'MANAGE_SUPPORT_TICKETS'
  | 'MANAGE_AFFILIATES'
  | 'VIEW_SAAS_FINANCE'
  // Doctor & Clinic Admin
  | 'MANAGE_CLINIC_OPERATIONS'
  | 'MANAGE_DOCTORS'
  | 'MANAGE_STAFF'
  | 'VIEW_CLINIC_FINANCE'
  | 'CONDUCT_CONSULTATION'
  | 'PRESCRIBE_MEDICATIONS'
  | 'VIEW_MEDICAL_RECORDS'
  | 'MANAGE_INVENTORY'
  | 'MANAGE_WEBSITE'
  | 'MANAGE_BRANCHES'
  // Receptionist
  | 'REGISTER_PATIENTS'
  | 'SEARCH_PATIENTS'
  | 'SCHEDULE_APPOINTMENTS'
  | 'CHECK_IN_PATIENTS'
  | 'MANAGE_QUEUE'
  | 'COLLECT_PAYMENTS'
  | 'REQUEST_INVENTORY'
  // Patient Portal
  | 'BOOK_APPOINTMENTS'
  | 'VIEW_OWN_APPOINTMENTS'
  | 'VIEW_OWN_PRESCRIPTIONS'
  | 'VIEW_OWN_BILLS'
  | 'PAY_BILLS'
  | 'SUBMIT_FEEDBACK'
  | 'EDIT_PROFILE';

export const ROLE_PERMISSIONS_MAP: Record<UserRole, Permission[]> = {
  superadmin: [
    'MANAGE_CLINICS',
    'MANAGE_PLANS',
    'VIEW_ORGANIZATION_ANALYTICS',
    'MANAGE_SYSTEM_SETTINGS',
    'VIEW_AUDIT_LOGS',
    'MANAGE_SUPPORT_TICKETS',
    'MANAGE_AFFILIATES',
    'VIEW_SAAS_FINANCE'
  ],
  doctor_admin: [
    'MANAGE_CLINIC_OPERATIONS',
    'MANAGE_DOCTORS',
    'MANAGE_STAFF',
    'VIEW_CLINIC_FINANCE',
    'CONDUCT_CONSULTATION',
    'PRESCRIBE_MEDICATIONS',
    'VIEW_MEDICAL_RECORDS',
    'MANAGE_INVENTORY',
    'MANAGE_WEBSITE',
    'MANAGE_BRANCHES',
    // Clinical admin can also perform scheduling & queue inspection
    'REGISTER_PATIENTS',
    'SEARCH_PATIENTS',
    'SCHEDULE_APPOINTMENTS',
    'CHECK_IN_PATIENTS',
    'MANAGE_QUEUE'
  ],
  receptionist_manager: [
    'REGISTER_PATIENTS',
    'SEARCH_PATIENTS',
    'SCHEDULE_APPOINTMENTS',
    'CHECK_IN_PATIENTS',
    'MANAGE_QUEUE',
    'COLLECT_PAYMENTS',
    'REQUEST_INVENTORY'
  ],
  patient: [
    'BOOK_APPOINTMENTS',
    'VIEW_OWN_APPOINTMENTS',
    'VIEW_OWN_PRESCRIPTIONS',
    'VIEW_OWN_BILLS',
    'PAY_BILLS',
    'SUBMIT_FEEDBACK',
    'EDIT_PROFILE'
  ]
};

/**
 * Pure helper function to verify if a given role has a specific permission.
 */
export function hasPermission(role: string | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  // Normalize role string (handle synonyms like clinic_admin, receptionist)
  let normalized: UserRole = 'patient';
  if (role === 'superadmin' || role === 'super_admin') normalized = 'superadmin';
  else if (role === 'doctor_admin' || role === 'clinic_admin' || role === 'doctor') normalized = 'doctor_admin';
  else if (role === 'receptionist_manager' || role === 'receptionist') normalized = 'receptionist_manager';
  else if (role === 'patient') normalized = 'patient';

  const rolePerms = ROLE_PERMISSIONS_MAP[normalized] || [];
  return rolePerms.includes(permission);
}

/**
 * Pure helper function to verify if a role belongs to an allowed set.
 */
export function hasAnyRole(currentRole: string | null | undefined, allowedRoles: string[]): boolean {
  if (!currentRole) return false;
  let normalized = currentRole;
  if (currentRole === 'super_admin') normalized = 'superadmin';
  if (currentRole === 'clinic_admin' || currentRole === 'doctor') normalized = 'doctor_admin';
  if (currentRole === 'receptionist') normalized = 'receptionist_manager';

  return allowedRoles.some((r) => {
    let target = r;
    if (r === 'super_admin') target = 'superadmin';
    if (r === 'clinic_admin' || r === 'doctor') target = 'doctor_admin';
    if (r === 'receptionist') target = 'receptionist_manager';
    return target === normalized;
  });
}

