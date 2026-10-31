import { useAuth, toAuthRole } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { hasPermission, hasAnyRole, Permission, UserRole } from '../services/permissionService';

export function usePermissions() {
  const auth = useAuth();
  const app = useApp();

  const role = auth?.user?.role || toAuthRole(app?.currentRole) || 'patient';

  return {
    role,
    can: (permission: Permission) => hasPermission(role, permission),
    isRole: (...roles: string[]) => hasAnyRole(role, roles),
    isSuperAdmin: hasAnyRole(role, ['superadmin']),
    isDoctorAdmin: hasAnyRole(role, ['doctor_admin', 'clinic_admin']),
    isReceptionist: hasAnyRole(role, ['receptionist_manager', 'receptionist']),
    isPatient: hasAnyRole(role, ['patient'])
  };
}

