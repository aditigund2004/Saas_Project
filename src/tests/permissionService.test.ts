import { describe, it, expect } from 'vitest';
import { hasPermission, hasAnyRole } from '../services/permissionService';

describe('Centralized Role-Based Access Control (RBAC)', () => {
  it('grants superadmin platform-level administrative privileges', () => {
    expect(hasPermission('superadmin', 'MANAGE_CLINICS')).toBe(true);
    expect(hasPermission('superadmin', 'VIEW_ORGANIZATION_ANALYTICS')).toBe(true);
    expect(hasPermission('superadmin', 'VIEW_SAAS_FINANCE')).toBe(true);
    expect(hasPermission('superadmin', 'CONDUCT_CONSULTATION')).toBe(false);
  });

  it('grants doctor/clinic_admin clinical and practice operations', () => {
    expect(hasPermission('doctor_admin', 'CONDUCT_CONSULTATION')).toBe(true);
    expect(hasPermission('doctor_admin', 'PRESCRIBE_MEDICATIONS')).toBe(true);
    expect(hasPermission('doctor_admin', 'MANAGE_DOCTORS')).toBe(true);
    expect(hasPermission('clinic_admin', 'CONDUCT_CONSULTATION')).toBe(true);
    expect(hasPermission('doctor_admin', 'MANAGE_CLINICS')).toBe(false);
  });

  it('restricts receptionist to front-desk and intake duties', () => {
    expect(hasPermission('receptionist_manager', 'REGISTER_PATIENTS')).toBe(true);
    expect(hasPermission('receptionist_manager', 'SCHEDULE_APPOINTMENTS')).toBe(true);
    expect(hasPermission('receptionist_manager', 'CHECK_IN_PATIENTS')).toBe(true);
    expect(hasPermission('receptionist', 'REGISTER_PATIENTS')).toBe(true);
    // Receptionist should NOT be able to prescribe medication
    expect(hasPermission('receptionist_manager', 'PRESCRIBE_MEDICATIONS')).toBe(false);
    expect(hasPermission('receptionist', 'VIEW_SAAS_FINANCE')).toBe(false);
  });

  it('isolates patient to self-service portals and records', () => {
    expect(hasPermission('patient', 'BOOK_APPOINTMENTS')).toBe(true);
    expect(hasPermission('patient', 'VIEW_OWN_PRESCRIPTIONS')).toBe(true);
    expect(hasPermission('patient', 'PAY_BILLS')).toBe(true);
    expect(hasPermission('patient', 'MANAGE_QUEUE')).toBe(false);
    expect(hasPermission('patient', 'CONDUCT_CONSULTATION')).toBe(false);
  });

  it('correctly validates hasAnyRole for aliased roles', () => {
    expect(hasAnyRole('doctor_admin', ['doctor_admin', 'clinic_admin'])).toBe(true);
    expect(hasAnyRole('clinic_admin', ['doctor_admin'])).toBe(true);
    expect(hasAnyRole('super_admin', ['superadmin'])).toBe(true);
    expect(hasAnyRole('patient', ['doctor_admin', 'superadmin'])).toBe(false);
  });
});

