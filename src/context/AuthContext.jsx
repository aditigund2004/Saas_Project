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

  const value = {
    user,
    role,
    isAuthenticated,
    isLoading,
    activeClinicId,
    memberships,
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
