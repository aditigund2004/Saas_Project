export type UserRole = 'superadmin' | 'doctor_admin' | 'receptionist_manager' | 'patient';

export interface ClinicMembership {
  clinicId: string;
  clinicName: string;
  branchId?: string;
  branchName?: string;
  roleInClinic: UserRole;
  isPrimary?: boolean;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  memberships: ClinicMembership[];
  activeClinicId?: string;
  activeBranchId?: string;
  isDemoVerified?: boolean;
  verificationToken?: string;
  dob?: string;
  preferredCommunication?: 'whatsapp' | 'sms' | 'email';
  // Optional profile info collected during onboarding
  bloodGroup?: string;
  emergencyContact?: string;
  allergies?: string;
  createdAt: string;
}

export interface AuthState {
  user: DemoUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  activeClinicId: string | null;
}

export interface RegistrationForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  dob?: string;
  preferredCommunication?: 'whatsapp' | 'sms' | 'email';
}

export interface LoginForm {
  identifier: string; // email or phone
  password: string;
  role?: UserRole;
  clinicId?: string;
  rememberMe?: boolean;
}

export interface StaffInvitation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'receptionist_manager' | 'doctor_admin';
  clinicId: string;
  clinicName: string;
  branchId?: string;
  branchName?: string;
  invitedBy: string;
  invitedAt: string;
  status: 'Pending' | 'Accepted' | 'Expired' | 'Cancelled';
}

