import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockAuthService, SEEDED_DEMO_USERS } from '../services/mockAuthService';

export function toAppRole(role) {
  if (!role) return 'patient';
  if (role === 'superadmin' || role === 'super_admin') return 'super_admin';
  if (role === 'doctor_admin' || role === 'clinic_admin' || role === 'doctor') return 'clinic_admin';
  if (role === 'receptionist_manager' || role === 'receptionist') return 'receptionist';
  if (role === 'patient') return 'patient';
  return 'patient';
}

export function toAuthRole(role) {
  if (!role) return 'patient';
  if (role === 'super_admin' || role === 'superadmin') return 'superadmin';
  if (role === 'clinic_admin' || role === 'doctor_admin' || role === 'doctor') return 'doctor_admin';
  if (role === 'receptionist' || role === 'receptionist_manager') return 'receptionist_manager';
  if (role === 'patient') return 'patient';
  return 'patient';
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Session initialization
  const [user, setUser] = useState(() => {
    return MockAuthService.getSession();
  });

  const [isLoading, setIsLoading] = useState(false);
  const [shadowSession, setShadowSession] = useState(() => {
    try {
      const raw = localStorage.getItem('clinipulse_shadow_session');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed.expiresAt || new Date(parsed.expiresAt).getTime() <= Date.now()) {
        localStorage.removeItem('clinipulse_shadow_session');
        if (parsed.originalUser) MockAuthService.saveSession(parsed.originalUser);
        return null;
      }
      return parsed;
    } catch { return null; }
  });

  const isAuthenticated = !!user;
  const role = user ? user.role : null;
  const activeClinicId = user ? user.activeClinicId || null : null;
  const memberships = user ? user.memberships || [] : [];

  // Listen to storage events to sync across tabs/windows
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'clinicos_auth_session') {
        const updated = MockAuthService.getSession();
        setUser(updated);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const syncRole = (targetRole, clinicId) => {
    const authRole = toAuthRole(targetRole);
    const appRole = toAppRole(targetRole);
    let matchedUser = null;
    if (authRole === 'superadmin') {
      matchedUser = SEEDED_DEMO_USERS.find((u) => u.role === 'superadmin');
    } else if (authRole === 'doctor_admin') {
      matchedUser =
        SEEDED_DEMO_USERS.find((u) => u.role === 'doctor_admin' && (!clinicId || u.activeClinicId === clinicId)) ||
        SEEDED_DEMO_USERS.find((u) => u.role === 'doctor_admin');
    } else if (authRole === 'receptionist_manager') {
      matchedUser =
        SEEDED_DEMO_USERS.find((u) => u.role === 'receptionist_manager' && (!clinicId || u.activeClinicId === clinicId)) ||
        SEEDED_DEMO_USERS.find((u) => u.role === 'receptionist_manager');
    } else {
      matchedUser = SEEDED_DEMO_USERS.find((u) => u.role === 'patient');
    }

    if (matchedUser) {
      MockAuthService.saveSession(matchedUser);
      setUser(matchedUser);
      localStorage.setItem('clinipulse_role', appRole);
      return matchedUser;
    }
    return null;
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const result = await MockAuthService.login(credentials);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('clinipulse_role', toAppRole(result.user.role));
        if (result.user.activeClinicId) {
          localStorage.setItem('clinipulse_clinic_id', result.user.activeClinicId);
        }
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const registerPatient = async (formData) => {
    setIsLoading(true);
    try {
      const result = await MockAuthService.registerPatient(formData);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('clinipulse_role', 'patient');
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (tokenOrEmail) => {
    setIsLoading(true);
    try {
      const result = await MockAuthService.verifyEmail(tokenOrEmail);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    if (!user) return { success: false, error: 'No active session' };
    setIsLoading(true);
    try {
      const result = await MockAuthService.updateProfile(user.id, profileData);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('clinipulse_shadow_session');
    setShadowSession(null);
    MockAuthService.clearSession();
    setUser(null);
    localStorage.setItem('clinipulse_role', 'patient');
  };

  const switchClinic = (clinicId) => {
    const updated = MockAuthService.switchClinic(clinicId);
    if (updated) {
      setUser(updated);
      localStorage.setItem('clinipulse_clinic_id', clinicId);
      return true;
    }
    return false;
  };

  const requestPasswordReset = async (email) => {
    return MockAuthService.requestPasswordReset(email);
  };

  const enterShadowMode = ({ clinic, targetRole = 'clinic_admin', reason = '', durationMinutes = 30 }) => {
    try {
      const originalUser = user || MockAuthService.getSession();
      const duration = Number(durationMinutes) || 30;
      const expiresAt = new Date(Date.now() + duration * 60 * 1000).toISOString();

      const newShadowSession = {
        originalUser,
        superAdminId: originalUser?.id || 'usr-superadmin',
        superAdminName: originalUser?.name || 'Super Administrator',
        targetClinic: clinic,
        targetRole,
        reason,
        durationMinutes: duration,
        expiresAt
      };

      setShadowSession(newShadowSession);
      localStorage.setItem('clinipulse_shadow_session', JSON.stringify(newShadowSession));

      const impersonatedRole = toAuthRole(targetRole);
      const appRole = toAppRole(targetRole);

      // Find any seeded doctor for this clinic if entering as doctor
      const clinicDoctor = SEEDED_DEMO_USERS.find(
        (u) => u.role === 'doctor_admin' && u.activeClinicId === clinic?.id
      );

      const branchId = clinic?.branches?.[0]?.id || `${clinic?.id || 'clinic'}-branch-1`;
      const branchName = clinic?.branches?.[0]?.name || 'Main Branch';

      const impersonatedUser = {
        id: targetRole === 'doctor_admin' ? (clinicDoctor?.id || `usr-doc-${clinic?.id}`) : `usr-admin-${clinic?.id}`,
        name: targetRole === 'doctor_admin'
          ? (clinicDoctor?.name || clinic?.ownerName || `${originalUser?.name || 'Super Admin'} (Lead Doctor)`)
          : (clinic?.ownerName || `${originalUser?.name || 'Super Admin'} (Clinic Admin)`),
        email: clinicDoctor?.email || clinic?.email || originalUser?.email || 'admin@clinicos.health',
        phone: clinicDoctor?.phone || clinic?.phone || originalUser?.phone || '',
        role: impersonatedRole,
        avatar: clinicDoctor?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        activeClinicId: clinic?.id,
        activeBranchId: branchId,
        memberships: [
          {
            clinicId: clinic?.id,
            clinicName: clinic?.name || 'Clinic',
            branchId,
            branchName,
            roleInClinic: impersonatedRole,
            isPrimary: true
          }
        ],
        isDemoVerified: true,
        isShadowMode: true
      };

      MockAuthService.saveSession(impersonatedUser);
      setUser(impersonatedUser);
      localStorage.setItem('clinipulse_role', appRole);
      if (clinic?.id) {
        localStorage.setItem('clinipulse_clinic_id', clinic.id);
      }
      if (branchId) {
        localStorage.setItem('clinipulse_branch_id', branchId);
      }

      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('clinipulse_shadow_entered', { detail: { clinic, targetRole } }));

      return { success: true, targetRole, clinic };
    } catch (err) {
      console.error('Failed to enter shadow mode:', err);
      return { success: false, error: err?.message || 'Failed to enter shadow mode' };
    }
  };

  const exitShadowMode = () => {
    try {
      let savedOriginalUser = shadowSession?.originalUser;
      if (!savedOriginalUser) {
        try {
          const raw = localStorage.getItem('clinipulse_shadow_session');
          if (raw) {
            const parsed = JSON.parse(raw);
            savedOriginalUser = parsed.originalUser;
          }
        } catch {}
      }

      localStorage.removeItem('clinipulse_shadow_session');
      setShadowSession(null);

      const restoreUser =
        savedOriginalUser ||
        SEEDED_DEMO_USERS.find((u) => u.role === 'superadmin') || {
          id: 'usr-superadmin',
          name: 'Super Administrator',
          email: 'superadmin@admin.com',
          phone: '+91 98000 00001',
          role: 'superadmin',
          memberships: [],
          isDemoVerified: true,
          createdAt: '2025-01-15'
        };

      MockAuthService.saveSession(restoreUser);
      setUser(restoreUser);
      localStorage.setItem('clinipulse_role', 'super_admin');
      if (restoreUser.activeClinicId) {
        localStorage.setItem('clinipulse_clinic_id', restoreUser.activeClinicId);
      } else {
        localStorage.removeItem('clinipulse_clinic_id');
      }

      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('clinipulse_shadow_exited'));

      return { success: true };
    } catch (err) {
      console.error('Failed to exit shadow mode:', err);
      return { success: false, error: err?.message || 'Failed to exit shadow mode' };
    }
  };

  const value = {
    user,
    role,
    isAuthenticated,
    isLoading,
    activeClinicId,
    memberships,
    shadowSession,
    isShadowMode: !!shadowSession,
    enterShadowMode,
    exitShadowMode,
    login,
    registerPatient,
    verifyEmail,
    updateProfile,
    logout,
    switchClinic,
    syncRole,
    requestPasswordReset
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
