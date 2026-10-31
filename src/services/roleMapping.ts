import type { Role } from '../types';
import type { UserRole } from '../types/auth';

const WORKSPACE_ROLE_BY_AUTH_ROLE: Record<UserRole, Role> = {
  superadmin: 'super_admin',
  doctor_admin: 'clinic_admin',
  receptionist_manager: 'receptionist',
  patient: 'patient'
};

const AUTH_ROLE_BY_WORKSPACE_ROLE: Record<Role, UserRole> = {
  super_admin: 'superadmin',
  clinic_admin: 'doctor_admin',
  receptionist: 'receptionist_manager',
  patient: 'patient'
};

export function toWorkspaceRole(role: UserRole | Role | null | undefined): Role | null {
  if (!role) return null;
  if (Object.prototype.hasOwnProperty.call(WORKSPACE_ROLE_BY_AUTH_ROLE, role)) {
    return WORKSPACE_ROLE_BY_AUTH_ROLE[role as UserRole];
  }
  if (Object.prototype.hasOwnProperty.call(AUTH_ROLE_BY_WORKSPACE_ROLE, role)) {
    return role as Role;
  }
  return null;
}

export function toAuthRole(role: UserRole | Role): UserRole {
  return AUTH_ROLE_BY_WORKSPACE_ROLE[toWorkspaceRole(role) || 'clinic_admin'];
}
