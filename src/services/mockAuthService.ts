import { DemoUser, LoginForm, RegistrationForm, StaffInvitation, UserRole } from '../types/auth';

const STORAGE_KEY_SESSION = 'clinicos_auth_session';
const STORAGE_KEY_REGISTERED_PATIENTS = 'clinicos_registered_patients';
const STORAGE_KEY_INVITATIONS = 'clinicos_staff_invitations';

// Seeded demonstration accounts across all 4 roles and 5 clinics
export const SUPERADMIN_CREDENTIALS = {
  email: 'superadmin@admin.com',
  password: 'superadmin@123',
  role: 'superadmin' as const,
  name: 'Super Administrator',
  title: 'Platform Super Administrator'
};

export const SUPERADMIN_DEMO_CREDENTIALS = SUPERADMIN_CREDENTIALS;

export const SEEDED_DEMO_USERS: DemoUser[] = [
  // 1. SaaS Superadmin (Platform Business Owner)
  {
    id: 'usr-superadmin',
    name: 'Super Administrator',
    email: 'superadmin@admin.com',
    phone: '+91 98000 00001',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    memberships: [],
    isDemoVerified: true,
    createdAt: '2025-01-15'
  },

  // 2. Doctor/Admin Accounts (1 per clinic + 1 multi-clinic specialist)
  {
    id: 'usr-doc-aarav',
    name: 'Dr. Aarav Mehta, MBBS, MD',
    email: 'aarav.mehta@citycare.demo',
    phone: '+91 98220 11223',
    role: 'doctor_admin',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-citycare',
    activeBranchId: 'branch-citycare-main',
    memberships: [
      {
        clinicId: 'clinic-citycare',
        clinicName: 'CityCare Family Clinic',
        branchId: 'branch-citycare-main',
        branchName: 'Dadar Central Hub',
        roleInClinic: 'doctor_admin',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-01-10'
  },
  {
    id: 'usr-doc-rohan',
    name: 'Dr. Rohan Deshmukh, MD, DM',
    email: 'rohan.deshmukh@heartwell.demo',
    phone: '+91 98200 11992',
    role: 'doctor_admin',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-heartwell',
    activeBranchId: 'branch-heartwell-main',
    memberships: [
      {
        clinicId: 'clinic-heartwell',
        clinicName: 'HeartWell Cardiology Centre',
        branchId: 'branch-heartwell-main',
        branchName: 'Bandra Cardiac Center',
        roleInClinic: 'doctor_admin',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-02-14'
  },
  {
    id: 'usr-doc-isha',
    name: 'Dr. Isha Shah, BDS, MDS',
    email: 'isha.shah@brightsmile.demo',
    phone: '+91 98450 12345',
    role: 'doctor_admin',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-brightsmile',
    activeBranchId: 'branch-brightsmile-main',
    memberships: [
      {
        clinicId: 'clinic-brightsmile',
        clinicName: 'BrightSmile Dental Studio',
        branchId: 'branch-brightsmile-main',
        branchName: 'Indiranagar Dental Lounge',
        roleInClinic: 'doctor_admin',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-03-01'
  },
  {
    id: 'usr-doc-ananya',
    name: 'Dr. Ananya Rao, MD, FAAD',
    email: 'ananya.rao@skinspring.demo',
    phone: '+91 98230 45678',
    role: 'doctor_admin',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-skinspring',
    activeBranchId: 'branch-skinspring-main',
    memberships: [
      {
        clinicId: 'clinic-skinspring',
        clinicName: 'SkinSpring Dermatology Clinic',
        branchId: 'branch-skinspring-main',
        branchName: 'Koregaon Park Center',
        roleInClinic: 'doctor_admin',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-04-18'
  },
  {
    id: 'usr-doc-vikram',
    name: 'Dr. Vikram Patil, MS (Ortho)',
    email: 'vikram.patil@movewell.demo',
    phone: '+91 98210 23456',
    role: 'doctor_admin',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-movewell',
    activeBranchId: 'branch-movewell-main',
    memberships: [
      {
        clinicId: 'clinic-movewell',
        clinicName: 'MoveWell Orthopedic and Physiotherapy Centre',
        branchId: 'branch-movewell-main',
        branchName: 'Vashi Orthopedic & Rehab Hub',
        roleInClinic: 'doctor_admin',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-05-10'
  },
  // Multi-Clinic Visiting Specialist (Demo for Multi-Clinic Selection)
  {
    id: 'usr-doc-multi',
    name: 'Dr. Sanjay Kulkarni, MBBS, MS',
    email: 'sanjay.kulkarni@clinicos.demo',
    phone: '+91 98990 88776',
    role: 'doctor_admin',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-citycare',
    activeBranchId: 'branch-citycare-main',
    memberships: [
      {
        clinicId: 'clinic-citycare',
        clinicName: 'CityCare Family Clinic',
        branchId: 'branch-citycare-main',
        branchName: 'Dadar Central Hub',
        roleInClinic: 'doctor_admin',
        isPrimary: true
      },
      {
        clinicId: 'clinic-brightsmile',
        clinicName: 'BrightSmile Dental Studio',
        branchId: 'branch-brightsmile-main',
        branchName: 'Indiranagar Dental Lounge',
        roleInClinic: 'doctor_admin',
        isPrimary: false
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-06-01'
  },

  // 3. Receptionist / Front Desk Managers (1 per clinic)
  {
    id: 'usr-rec-priya',
    name: 'Priya Sharma',
    email: 'priya.sharma@citycare.demo',
    phone: '+91 98201 55667',
    role: 'receptionist_manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-citycare',
    activeBranchId: 'branch-citycare-main',
    memberships: [
      {
        clinicId: 'clinic-citycare',
        clinicName: 'CityCare Family Clinic',
        branchId: 'branch-citycare-main',
        branchName: 'Dadar Central Hub',
        roleInClinic: 'receptionist_manager',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-02-01'
  },
  {
    id: 'usr-rec-aniket',
    name: 'Aniket Verma',
    email: 'aniket.verma@heartwell.demo',
    phone: '+91 98202 66778',
    role: 'receptionist_manager',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-heartwell',
    activeBranchId: 'branch-heartwell-main',
    memberships: [
      {
        clinicId: 'clinic-heartwell',
        clinicName: 'HeartWell Cardiology Centre',
        branchId: 'branch-heartwell-main',
        branchName: 'Bandra Cardiac Center',
        roleInClinic: 'receptionist_manager',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-02-15'
  },
  {
    id: 'usr-rec-sneha',
    name: 'Sneha Nair',
    email: 'sneha.nair@brightsmile.demo',
    phone: '+91 98451 77889',
    role: 'receptionist_manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-brightsmile',
    activeBranchId: 'branch-brightsmile-main',
    memberships: [
      {
        clinicId: 'clinic-brightsmile',
        clinicName: 'BrightSmile Dental Studio',
        branchId: 'branch-brightsmile-main',
        branchName: 'Indiranagar Dental Lounge',
        roleInClinic: 'receptionist_manager',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-03-05'
  },
  {
    id: 'usr-rec-kavita',
    name: 'Kavita Joshi',
    email: 'kavita.joshi@skinspring.demo',
    phone: '+91 98231 88990',
    role: 'receptionist_manager',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-skinspring',
    activeBranchId: 'branch-skinspring-main',
    memberships: [
      {
        clinicId: 'clinic-skinspring',
        clinicName: 'SkinSpring Dermatology Clinic',
        branchId: 'branch-skinspring-main',
        branchName: 'Koregaon Park Center',
        roleInClinic: 'receptionist_manager',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-04-20'
  },
  {
    id: 'usr-rec-rahul',
    name: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@movewell.demo',
    phone: '+91 98211 99001',
    role: 'receptionist_manager',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    activeClinicId: 'clinic-movewell',
    activeBranchId: 'branch-movewell-main',
    memberships: [
      {
        clinicId: 'clinic-movewell',
        clinicName: 'MoveWell Orthopedic and Physiotherapy Centre',
        branchId: 'branch-movewell-main',
        branchName: 'Vashi Orthopedic & Rehab Hub',
        roleInClinic: 'receptionist_manager',
        isPrimary: true
      }
    ],
    isDemoVerified: true,
    createdAt: '2025-05-15'
  },

  // 4. Seeded Patient Account
  {
    id: 'usr-patient-aarav',
    name: 'Aarav Patel',
    email: 'aarav.patel@example.demo',
    phone: '+91 98765 43210',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    memberships: [],
    isDemoVerified: true,
    dob: '1992-04-18',
    preferredCommunication: 'whatsapp',
    bloodGroup: 'B+',
    emergencyContact: '+91 98765 99999 (Ritu Patel - Spouse)',
    allergies: 'Penicillin / Amoxicillin hypersensitivity',
    createdAt: '2026-05-12'
  }
];

export const INITIAL_STAFF_INVITATIONS: StaffInvitation[] = [
  {
    id: 'inv-101',
    name: 'Sunita Rao',
    email: 'sunita.rao@citycare.demo',
    phone: '+91 98205 11224',
    role: 'receptionist_manager',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    branchId: 'branch-citycare-main',
    branchName: 'Dadar Central Hub',
    invitedBy: 'Dr. Aarav Mehta',
    invitedAt: '2026-10-20',
    status: 'Pending'
  },
  {
    id: 'inv-102',
    name: 'Dr. Kunal Joshi',
    email: 'kunal.joshi@brightsmile.demo',
    phone: '+91 98450 33445',
    role: 'doctor_admin',
    clinicId: 'clinic-brightsmile',
    clinicName: 'BrightSmile Dental Studio',
    branchId: 'branch-brightsmile-main',
    branchName: 'Indiranagar Dental Lounge',
    invitedBy: 'Dr. Isha Shah',
    invitedAt: '2026-10-15',
    status: 'Accepted'
  }
];

// Helper: Normalize emails
export const normalizeEmail = (email: string): string => {
  return email ? email.trim().toLowerCase() : '';
};

export class MockAuthService {
  // Retrieve all registered patients from localStorage
  static getRegisteredPatients(): DemoUser[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_REGISTERED_PATIENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Save registered patients
  static saveRegisteredPatients(patients: DemoUser[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_REGISTERED_PATIENTS, JSON.stringify(patients));
    } catch {
      // Storage unavailable fallback
    }
  }

  // Get all users (seeded + registered)
  static getAllUsers(): DemoUser[] {
    const registered = this.getRegisteredPatients();
    return [...SEEDED_DEMO_USERS, ...registered];
  }

  // Find user by normalized email or phone
  static findUserByIdentifier(identifier: string): DemoUser | undefined {
    const normalized = normalizeEmail(identifier);
    const cleanPhone = identifier.trim().replace(/\s+/g, '');
    const allUsers = this.getAllUsers();

    // Check alias emails for superadmin
    if (normalized === 'superadmin@admin.com') {
      const superadminUser = allUsers.find((u) => u.role === 'superadmin');
      if (superadminUser) return superadminUser;
    }

    return allUsers.find(
      (u) =>
        normalizeEmail(u.email) === normalized ||
        (u.phone && u.phone.replace(/\s+/g, '') === cleanPhone)
    );
  }

  // Simulate Login
  static async login(form: LoginForm): Promise<{ success: boolean; user?: DemoUser; error?: string }> {
    // Artificial small delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.findUserByIdentifier(form.identifier);

    if (!user) {
      if (form.role === 'superadmin') {
        return {
          success: false,
          error: 'No administrator account found with this email. Please verify credentials.'
        };
      }
      return {
        success: false,
        error: 'No demo account found matching this email or phone number. Check credentials or register.'
      };
    }

    // Role check if logging in from a dedicated role portal
    if (form.role && user.role !== form.role) {
      const roleLabels: Record<UserRole, string> = {
        patient: 'Patient Portal',
        doctor_admin: 'Doctor / Clinic Administration',
        receptionist_manager: 'Front-Desk Reception',
        superadmin: 'SaaS Platform Administration'
      };
      return {
        success: false,
        error: `This demo account is registered as a ${user.role.replace('_', ' ').toUpperCase()}, not permitted for ${roleLabels[form.role]}.`
      };
    }

    // Super Admin specific password validation: strictly superadmin@123
    if (user.role === 'superadmin' || form.role === 'superadmin') {
      if (form.password !== 'superadmin@123') {
        return {
          success: false,
          error: 'Invalid administrator password. Please check your credentials.'
        };
      }
    } else {
      // General demo password check
      if (!form.password || form.password.length < 4) {
        return {
          success: false,
          error: 'Password must be at least 4 characters long in demo mode.'
        };
      }
    }

    // Resolve active clinic if specified
    let activeUser = { ...user };
    if (form.clinicId && user.memberships.some((m) => m.clinicId === form.clinicId)) {
      activeUser.activeClinicId = form.clinicId;
      const mem = user.memberships.find((m) => m.clinicId === form.clinicId);
      if (mem?.branchId) activeUser.activeBranchId = mem.branchId;
    } else if (user.memberships.length > 0 && !activeUser.activeClinicId) {
      activeUser.activeClinicId = user.memberships[0].clinicId;
      activeUser.activeBranchId = user.memberships[0].branchId;
    }

    this.saveSession(activeUser);
    return { success: true, user: activeUser };
  }

  // Simulate Patient Registration
  static async registerPatient(
    form: RegistrationForm
  ): Promise<{ success: boolean; user?: DemoUser; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalizedEmail = normalizeEmail(form.email);

    // Duplicate email check
    const existing = this.findUserByIdentifier(normalizedEmail);
    if (existing) {
      return {
        success: false,
        error: `An account with email "${form.email}" is already registered. Please sign in instead.`
      };
    }

    // Generate synthetic verification token
    const verificationToken = `demo_tok_${Math.random().toString(36).substring(2, 10)}`;

    const newUser: DemoUser = {
      id: `usr-patient-${Date.now().toString().slice(-6)}`,
      name: form.fullName.trim(),
      email: normalizedEmail,
      phone: form.phone.trim(),
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      memberships: [],
      isDemoVerified: false,
      verificationToken,
      dob: form.dob,
      preferredCommunication: form.preferredCommunication || 'whatsapp',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    const registered = this.getRegisteredPatients();
    registered.push(newUser);
    this.saveRegisteredPatients(registered);

    // Auto log in with unverified state so user sees verification step
    this.saveSession(newUser);

    return { success: true, user: newUser };
  }

  // Register a new Doctor / Clinic Owner
  static registerDoctor(doctorData: {
    name: string;
    email: string;
    phone?: string;
    clinicId: string;
    clinicName: string;
    password?: string;
  }): DemoUser {
    const normalizedEmail = normalizeEmail(doctorData.email);
    const existing = this.findUserByIdentifier(normalizedEmail);
    if (existing && existing.role === 'doctor_admin') {
      return existing;
    }

    const newUser: DemoUser = {
      id: `usr-doc-${Date.now().toString().slice(-6)}`,
      name: doctorData.name.trim(),
      email: normalizedEmail,
      phone: (doctorData.phone || '+91 98000 12345').trim(),
      role: 'doctor_admin',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      isDemoVerified: true,
      activeClinicId: doctorData.clinicId,
      memberships: [
        {
          clinicId: doctorData.clinicId,
          clinicName: doctorData.clinicName,
          branchName: `${doctorData.clinicName} (Main Branch)`,
          role: 'doctor_admin',
          isPrimary: true
        }
      ],
      createdAt: new Date().toISOString().slice(0, 10)
    };

    const registered = this.getRegisteredPatients();
    const filtered = registered.filter((u) => normalizeEmail(u.email) !== normalizedEmail);
    filtered.push(newUser);
    this.saveRegisteredPatients(filtered);

    return newUser;
  }

  // Simulate Email Verification
  static async verifyEmail(tokenOrEmail: string): Promise<{ success: boolean; user?: DemoUser; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const registered = this.getRegisteredPatients();
    const idx = registered.findIndex(
      (u) =>
        u.verificationToken === tokenOrEmail ||
        normalizeEmail(u.email) === normalizeEmail(tokenOrEmail)
    );

    if (idx >= 0) {
      registered[idx].isDemoVerified = true;
      this.saveRegisteredPatients(registered);
      const updated = registered[idx];
      this.saveSession(updated);
      return { success: true, user: updated };
    }

    // Check seeded users
    const seeded = SEEDED_DEMO_USERS.find(
      (u) => normalizeEmail(u.email) === normalizeEmail(tokenOrEmail)
    );
    if (seeded) {
      this.saveSession(seeded);
      return { success: true, user: seeded };
    }

    // Fallback: verify currently active session
    const current = this.getSession();
    if (current) {
      current.isDemoVerified = true;
      this.saveSession(current);
      return { success: true, user: current };
    }

    return { success: false, error: 'Verification token invalid or expired in demo environment.' };
  }

  // Update Patient Onboarding Profile Information
  static async updateProfile(
    userId: string,
    profileUpdates: Partial<DemoUser>
  ): Promise<{ success: boolean; user?: DemoUser }> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const current = this.getSession();
    let updatedUser: DemoUser | null = null;

    if (current && current.id === userId) {
      updatedUser = { ...current, ...profileUpdates };
      this.saveSession(updatedUser);
    }

    const registered = this.getRegisteredPatients();
    const idx = registered.findIndex((u) => u.id === userId);
    if (idx >= 0) {
      registered[idx] = { ...registered[idx], ...profileUpdates };
      this.saveRegisteredPatients(registered);
      updatedUser = registered[idx];
    }

    return { success: true, user: updatedUser || current || undefined };
  }

  // Simulate Password Reset Request
  static async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    // For privacy, we always return success message without leaking existence
    return {
      success: true,
      message: `A simulated password reset token has been dispatched to ${email}. In this demonstration prototype, you can proceed directly to log in.`
    };
  }

  // Switch Active Clinic (for doctors/staff with multiple clinics)
  static switchClinic(clinicId: string): DemoUser | null {
    const user = this.getSession();
    if (!user) return null;

    const membership = user.memberships.find((m) => m.clinicId === clinicId);
    if (!membership && user.role !== 'superadmin') return null;

    const updated: DemoUser = {
      ...user,
      activeClinicId: clinicId,
      activeBranchId: membership?.branchId || user.activeBranchId
    };

    this.saveSession(updated);
    return updated;
  }

  // Session Management
  static saveSession(user: DemoUser): void {
    try {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
    } catch {
      // Storage unavailable
    }
  }

  static getSession(): DemoUser | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SESSION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static clearSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    } catch {
      // Storage unavailable
    }
  }

  // Staff Invitations Suite (Section 13)
  static getStaffInvitations(clinicId?: string): StaffInvitation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_INVITATIONS);
      const list: StaffInvitation[] = data ? JSON.parse(data) : INITIAL_STAFF_INVITATIONS;
      if (clinicId) {
        return list.filter((i) => i.clinicId === clinicId);
      }
      return list;
    } catch {
      return INITIAL_STAFF_INVITATIONS;
    }
  }

  static saveStaffInvitations(invites: StaffInvitation[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_INVITATIONS, JSON.stringify(invites));
    } catch {
      // Storage unavailable
    }
  }

  static createStaffInvitation(inviteData: Omit<StaffInvitation, 'id' | 'invitedAt' | 'status'>): StaffInvitation {
    const current = this.getStaffInvitations();
    const newInvite: StaffInvitation = {
      ...inviteData,
      id: `inv-${Date.now().toString().slice(-5)}`,
      invitedAt: new Date().toISOString().slice(0, 10),
      status: 'Pending'
    };
    current.unshift(newInvite);
    this.saveStaffInvitations(current);
    return newInvite;
  }

  static updateStaffInvitationStatus(id: string, status: StaffInvitation['status']): void {
    const current = this.getStaffInvitations();
    const updated = current.map((i) => (i.id === id ? { ...i, status } : i));
    this.saveStaffInvitations(updated);
  }
}

