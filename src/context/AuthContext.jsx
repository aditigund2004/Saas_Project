import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockAuthService, SEEDED_DEMO_USERS } from '../services/mockAuthService';
import { toAuthRole, toWorkspaceRole } from '../services/roleMapping';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Session initialization
  const [user, setUser] = useState(() => MockAuthService.getSession());

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

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const result = await MockAuthService.login(credentials);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemoRole = async (workspaceRole) => {
    const normalizedRole = toWorkspaceRole(workspaceRole);
    if (!normalizedRole) {
      return { success: false, error: `Unknown demo role: ${workspaceRole}` };
    }

    const demoRole = toAuthRole(normalizedRole);
    const demoUser = SEEDED_DEMO_USERS.find((candidate) => candidate.role === demoRole);
    if (!demoUser) {
      return { success: false, error: `No demo account is configured for the ${workspaceRole} role.` };
    }

    return login({
      identifier: demoUser.email,
      password: 'DemoPassword123',
      role: demoRole,
      clinicId: demoUser.activeClinicId
    });
  };

  const registerPatient = async (formData) => {
    setIsLoading(true);
    try {
      const result = await MockAuthService.registerPatient(formData);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const registerTenant = async (formData) => {
    setIsLoading(true);
    try {
      return await MockAuthService.registerTenant(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTenantApproval = (clinicId, status) =>
    MockAuthService.updateTenantApproval(clinicId, status);

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
  };

  const switchClinic = (clinicId) => {
    const updated = MockAuthService.switchClinic(clinicId);
    if (updated) {
      setUser(updated);
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
    loginAsDemoRole,
    registerPatient,
    registerTenant,
    updateTenantApproval,
    verifyEmail,
    updateProfile,
    logout,
    switchClinic,
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
