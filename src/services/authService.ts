import { User, Role } from '../types';
import { DEMO_USERS } from '../demo-data';

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: Role;
}

export interface RegisterClinicPayload {
  clinicName: string;
  ownerName: string;
  specialty: string;
  email: string;
  phone: string;
  city: string;
  planId: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulated async auth
    await new Promise((res) => setTimeout(res, 250));
    const targetRole = credentials.role || 'clinic_admin';
    return DEMO_USERS[targetRole] || DEMO_USERS.clinic_admin;
  },

  registerClinic: async (payload: RegisterClinicPayload): Promise<{ user: User; clinicId: string }> => {
    await new Promise((res) => setTimeout(res, 350));
    const newUserId = `usr-${Date.now()}`;
    const newClinicId = `clinic-${payload.clinicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const newUser: User = {
      id: newUserId,
      name: payload.ownerName,
      email: payload.email,
      phone: payload.phone,
      role: 'clinic_admin',
      clinicId: newClinicId,
      createdAt: new Date().toISOString()
    };
    return { user: newUser, clinicId: newClinicId };
  },

  switchRole: (role: Role): User => {
    return DEMO_USERS[role] || DEMO_USERS.clinic_admin;
  },

  getCurrentSession: (): User => {
    const saved = localStorage.getItem('clinipulse_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS.clinic_admin;
      }
    }
    return DEMO_USERS.clinic_admin;
  }
};

