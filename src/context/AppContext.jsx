import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEMO_USERS,
  DEMO_CLINICS,
  DEMO_DOCTORS,
  DEMO_RECEPTIONISTS,
  DEMO_PATIENTS,
  DEMO_PATIENT_FEEDBACK,
  DEMO_FEEDBACK_NOTES,
  DEMO_FEEDBACK_ACTIVITIES,
  DEMO_APPOINTMENTS,
  DEMO_PRESCRIPTIONS,
  DEMO_INVOICES,
  DEMO_EXPENSES,
  DEMO_INVENTORY,
  DEMO_INVENTORY_MOVEMENTS,
  DEMO_STOCK_REQUESTS,
  DEMO_SUPPLIERS,
  DEMO_PURCHASE_ORDERS,
  DEMO_SUPPORT_TICKETS,
  DEMO_STAFF_MEMBERS,
  DEMO_BACKGROUND_JOBS,
  DEMO_AUDIT_LOGS,
  DEMO_INTEGRATIONS,
  DEMO_ENCOUNTERS,
  DEMO_FOLLOW_UPS,
  DEMO_PLANS,
  DEMO_SAAS_INVOICES,
  DEMO_SAAS_PAYMENTS,
  DEMO_SAAS_REFUNDS,
  DEMO_SAAS_EXPENSES,
  DEMO_CLINIC_PAYMENTS,
  DEMO_CLINIC_REFUNDS,
<<<<<<< HEAD
  DEMO_NOTIFICATIONS,
  DEMO_WHATSAPP_TEMPLATES
} from '../demo-data';
import { ROLE_PERMISSIONS } from '../types';
import { useAuth, toAppRole, toAuthRole } from './AuthContext';
=======
  DEMO_NOTIFICATIONS
} from '../demo-data';
import { ROLE_PERMISSIONS } from '../types';
import { useAuth } from '../hooks/useAuth';
import { toWorkspaceRole } from '../services/roleMapping';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

const AppContext = createContext(null);

export function AppProvider({ children }) {
<<<<<<< HEAD
  const auth = useAuth();

  // Authentication & Role State
  const [currentRole, setCurrentRole] = useState(() => {
    if (auth?.user?.role) {
      return toAppRole(auth.user.role);
    }
    return localStorage.getItem('clinipulse_role') || 'clinic_admin';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    if (auth?.user) {
      const appRole = toAppRole(auth.user.role);
      return {
        id: auth.user.id,
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone || '',
        role: appRole,
        clinicId: auth.user.activeClinicId || 'clinic-citycare',
        branchId: auth.user.activeBranchId || 'branch-citycare-main',
        avatar: auth.user.avatar || DEMO_USERS[appRole]?.avatar,
        createdAt: auth.user.createdAt || '2026-01-01'
      };
    }
    return DEMO_USERS[currentRole] || DEMO_USERS.clinic_admin;
  });

  // Multi-Tenant Clinic & Branch State
  const [activeClinicId, setActiveClinicId] = useState(() => {
    const saved = localStorage.getItem('clinipulse_clinic_id');
    return saved && DEMO_CLINICS.some((c) => c.id === saved) ? saved : 'clinic-citycare';
  });

  const [activeBranchId, setActiveBranchId] = useState(() => {
    return localStorage.getItem('clinipulse_branch_id') || 'branch-citycare-main';
  });
=======
  const { user: authUser, switchClinic: switchAuthClinic } = useAuth();

  // Authentication & Role State
  const [selectedRole, setSelectedRole] = useState(() => {
    const savedRole = localStorage.getItem('clinipulse_role');
    return ['super_admin', 'clinic_admin', 'receptionist', 'patient'].includes(savedRole)
      ? savedRole
      : 'clinic_admin';
  });
  const currentRole = toWorkspaceRole(authUser?.role) || selectedRole;

  const currentUser = authUser || DEMO_USERS[currentRole] || DEMO_USERS.clinic_admin;

  // Multi-Tenant Clinic & Branch State
  const [selectedClinicId, setSelectedClinicId] = useState(() => {
    const saved = localStorage.getItem('clinipulse_clinic_id');
    return saved && DEMO_CLINICS.some((c) => c.id === saved) ? saved : 'clinic-citycare';
  });
  const activeClinicId = authUser?.activeClinicId || selectedClinicId;

  const [branchSelection, setBranchSelection] = useState(() => ({
    userId: null,
    clinicId: null,
    id: localStorage.getItem('clinipulse_branch_id') || 'branch-citycare-main'
  }));
  const setActiveBranchId = (branchId) => {
    setBranchSelection({
      userId: authUser?.id || null,
      clinicId: activeClinicId,
      id: branchId
    });
  };
  const hasAuthenticatedBranchSelection =
    authUser &&
    branchSelection.userId === authUser.id &&
    branchSelection.clinicId === activeClinicId;
  const activeBranchId = hasAuthenticatedBranchSelection
    ? branchSelection.id
    : authUser?.activeBranchId || branchSelection.id;

  const setActiveClinicId = (clinicId) => {
    setSelectedClinicId(clinicId);
    setBranchSelection((selection) => ({
      ...selection,
      userId: authUser?.id || null,
      clinicId,
      id: DEMO_CLINICS.find((clinic) => clinic.id === clinicId)?.branches[0]?.id || selection.id
    }));
  };
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

  // Domain Entity Collections with LocalStorage hydration for smooth demo edits
  const [clinics, setClinics] = useState(() => {
    const s = localStorage.getItem('clinipulse_clinics');
    return s ? JSON.parse(s) : DEMO_CLINICS;
  });

  const [doctors, setDoctors] = useState(() => {
    const s = localStorage.getItem('clinipulse_doctors');
    return s ? JSON.parse(s) : DEMO_DOCTORS;
  });

  const [receptionists, setReceptionists] = useState(() => {
    const s = localStorage.getItem('clinipulse_receptionists');
    return s ? JSON.parse(s) : DEMO_RECEPTIONISTS;
  });

  const [feedbacks, setFeedbacks] = useState(() => {
    const s = localStorage.getItem('clinipulse_feedbacks');
    return s ? JSON.parse(s) : DEMO_PATIENT_FEEDBACK;
  });

  const [feedbackNotes, setFeedbackNotes] = useState(() => {
    const s = localStorage.getItem('clinipulse_feedback_notes');
    return s ? JSON.parse(s) : DEMO_FEEDBACK_NOTES;
  });

  const [feedbackActivities, setFeedbackActivities] = useState(() => {
    const s = localStorage.getItem('clinipulse_feedback_activities');
    return s ? JSON.parse(s) : DEMO_FEEDBACK_ACTIVITIES;
  });

  const [patients, setPatients] = useState(() => {
    const s = localStorage.getItem('clinipulse_patients');
    return s ? JSON.parse(s) : DEMO_PATIENTS;
  });

  const [appointments, setAppointments] = useState(() => {
    const s = localStorage.getItem('clinipulse_appointments');
    return s ? JSON.parse(s) : DEMO_APPOINTMENTS;
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const s = localStorage.getItem('clinipulse_prescriptions');
    return s ? JSON.parse(s) : DEMO_PRESCRIPTIONS;
  });

  const [invoices, setInvoices] = useState(() => {
    const s = localStorage.getItem('clinipulse_invoices');
    return s ? JSON.parse(s) : DEMO_INVOICES;
  });

  const [expenses, setExpenses] = useState(() => {
    const s = localStorage.getItem('clinipulse_expenses');
    return s ? JSON.parse(s) : DEMO_EXPENSES;
  });

  const [inventory, setInventory] = useState(() => {
    const s = localStorage.getItem('clinipulse_inventory');
    return s ? JSON.parse(s) : DEMO_INVENTORY;
  });

  const [inventoryMovements, setInventoryMovements] = useState(() => {
    const s = localStorage.getItem('clinipulse_inventory_movements');
    return s ? JSON.parse(s) : DEMO_INVENTORY_MOVEMENTS;
  });

  const [stockRequests, setStockRequests] = useState(() => {
    const s = localStorage.getItem('clinipulse_stock_requests');
    return s ? JSON.parse(s) : DEMO_STOCK_REQUESTS;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const s = localStorage.getItem('clinipulse_suppliers');
    return s ? JSON.parse(s) : DEMO_SUPPLIERS;
  });

  const [purchaseOrders, setPurchaseOrders] = useState(() => {
    const s = localStorage.getItem('clinipulse_purchase_orders');
    return s ? JSON.parse(s) : DEMO_PURCHASE_ORDERS;
  });

  const [supportTickets, setSupportTickets] = useState(() => {
    const s = localStorage.getItem('clinipulse_support_tickets');
    return s ? JSON.parse(s) : DEMO_SUPPORT_TICKETS;
  });

  const [staffMembers, setStaffMembers] = useState(() => {
    const s = localStorage.getItem('clinipulse_staff_members');
    return s ? JSON.parse(s) : DEMO_STAFF_MEMBERS;
  });

  const [encounters, setEncounters] = useState(() => {
    const s = localStorage.getItem('clinipulse_encounters');
    return s ? JSON.parse(s) : DEMO_ENCOUNTERS;
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('clinipulse_currency') || 'INR';
  });

  const [followUps, setFollowUps] = useState(() => {
    const s = localStorage.getItem('clinipulse_followups');
    return s ? JSON.parse(s) : DEMO_FOLLOW_UPS;
  });

  const [plans, setPlans] = useState(() => {
    const s = localStorage.getItem('clinipulse_plans');
    return s ? JSON.parse(s) : DEMO_PLANS;
  });

  // SaaS Finance (Superadmin) Collections
  const [saasInvoices, setSaasInvoices] = useState(() => {
    const s = localStorage.getItem('clinipulse_saas_invoices');
    return s ? JSON.parse(s) : DEMO_SAAS_INVOICES;
  });

  const [saasPayments, setSaasPayments] = useState(() => {
    const s = localStorage.getItem('clinipulse_saas_payments');
    return s ? JSON.parse(s) : DEMO_SAAS_PAYMENTS;
  });

  const [saasRefunds, setSaasRefunds] = useState(() => {
    const s = localStorage.getItem('clinipulse_saas_refunds');
    return s ? JSON.parse(s) : DEMO_SAAS_REFUNDS;
  });

  const [saasExpenses, setSaasExpenses] = useState(() => {
    const s = localStorage.getItem('clinipulse_saas_expenses');
    return s ? JSON.parse(s) : DEMO_SAAS_EXPENSES;
  });

  // Clinic Finance Collections
  const [clinicPayments, setClinicPayments] = useState(() => {
    const s = localStorage.getItem('clinipulse_clinic_payments');
    return s ? JSON.parse(s) : DEMO_CLINIC_PAYMENTS;
  });

  const [clinicRefunds, setClinicRefunds] = useState(() => {
    const s = localStorage.getItem('clinipulse_clinic_refunds');
    return s ? JSON.parse(s) : DEMO_CLINIC_REFUNDS;
  });

  // Simulated Notifications Center
  const [notifications, setNotifications] = useState(() => {
    const s = localStorage.getItem('clinipulse_notifications');
    return s ? JSON.parse(s) : DEMO_NOTIFICATIONS;
  });

<<<<<<< HEAD
  // WhatsApp Activity Templates
  const [whatsAppTemplates, setWhatsAppTemplates] = useState(() => {
    const s = localStorage.getItem('clinipulse_wa_templates');
    return s ? JSON.parse(s) : DEMO_WHATSAPP_TEMPLATES;
  });

  useEffect(() => {
    localStorage.setItem('clinipulse_wa_templates', JSON.stringify(whatsAppTemplates));
  }, [whatsAppTemplates]);

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  // UI Modals & Feedback
  const [toast, setToast] = useState(null);
  const [whatsAppModal, setWhatsAppModal] = useState({ isOpen: false, payload: null });
  const [prescriptionModal, setPrescriptionModal] = useState({ isOpen: false, prescription: null });

<<<<<<< HEAD
  // Theme Management (Light / Dark Mode)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('clinipulse_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      }
      localStorage.setItem('clinipulse_theme', theme);
    } catch (e) {
      console.error('Failed to sync theme', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync state to local storage & AuthContext active user
  useEffect(() => {
    if (auth?.user) {
      const appRole = toAppRole(auth.user.role);
      setCurrentRole(appRole);
      localStorage.setItem('clinipulse_role', appRole);

      const mappedUser = {
        id: auth.user.id,
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone || '',
        role: appRole,
        clinicId: auth.user.activeClinicId || 'clinic-citycare',
        branchId: auth.user.activeBranchId || 'branch-citycare-main',
        avatar: auth.user.avatar || DEMO_USERS[appRole]?.avatar,
        createdAt: auth.user.createdAt || '2026-01-01'
      };
      setCurrentUser(mappedUser);

      if (auth.user.activeClinicId) {
        setActiveClinicId(auth.user.activeClinicId);
        localStorage.setItem('clinipulse_clinic_id', auth.user.activeClinicId);
      }
    } else if (auth && !auth.user) {
      setCurrentRole('patient');
      localStorage.setItem('clinipulse_role', 'patient');
      setCurrentUser(DEMO_USERS.patient);
    }
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('clinipulse_role', currentRole);
    if (!auth?.user) {
      setCurrentUser(DEMO_USERS[currentRole] || DEMO_USERS.clinic_admin);
    }
  }, [currentRole, auth?.user]);
=======
  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('clinipulse_role', currentRole);
  }, [currentRole]);
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

  useEffect(() => {
    localStorage.setItem('clinipulse_clinic_id', activeClinicId);
  }, [activeClinicId]);

  useEffect(() => {
    localStorage.setItem('clinipulse_branch_id', activeBranchId);
  }, [activeBranchId]);

  useEffect(() => {
    localStorage.setItem('clinipulse_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('clinipulse_receptionists', JSON.stringify(receptionists));
  }, [receptionists]);

  useEffect(() => {
    localStorage.setItem('clinipulse_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('clinipulse_feedback_notes', JSON.stringify(feedbackNotes));
  }, [feedbackNotes]);

  useEffect(() => {
    localStorage.setItem('clinipulse_feedback_activities', JSON.stringify(feedbackActivities));
  }, [feedbackActivities]);

  useEffect(() => {
    localStorage.setItem('clinipulse_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('clinipulse_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('clinipulse_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('clinipulse_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('clinipulse_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('clinipulse_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('clinipulse_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('clinipulse_inventory_movements', JSON.stringify(inventoryMovements));
  }, [inventoryMovements]);

  useEffect(() => {
    localStorage.setItem('clinipulse_stock_requests', JSON.stringify(stockRequests));
  }, [stockRequests]);

  useEffect(() => {
    localStorage.setItem('clinipulse_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('clinipulse_purchase_orders', JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  useEffect(() => {
    localStorage.setItem('clinipulse_support_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem('clinipulse_staff_members', JSON.stringify(staffMembers));
  }, [staffMembers]);

  useEffect(() => {
    localStorage.setItem('clinipulse_encounters', JSON.stringify(encounters));
  }, [encounters]);

  useEffect(() => {
    localStorage.setItem('clinipulse_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('clinipulse_followups', JSON.stringify(followUps));
  }, [followUps]);

  // Toast Notification Trigger
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Active Clinic & Branch helpers
  const activeClinic = clinics.find((c) => c.id === activeClinicId) || clinics[0];
  const activeBranch = activeClinic.branches.find((b) => b.id === activeBranchId) || activeClinic.branches[0];

  // Actions
  const switchRole = (role) => {
<<<<<<< HEAD
    const appRole = toAppRole(role);
    const authRole = toAuthRole(role);
    setCurrentRole(appRole);
    localStorage.setItem('clinipulse_role', appRole);

    if (auth && auth.syncRole) {
      auth.syncRole(authRole, activeClinicId);
    }

    setCurrentUser(DEMO_USERS[appRole] || DEMO_USERS.patient);
    showToast(`Switched active workspace to: ${appRole.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const switchClinic = (clinicId) => {
    setActiveClinicId(clinicId);
    if (auth && auth.switchClinic) {
      auth.switchClinic(clinicId);
=======
    setSelectedRole(role);
    localStorage.setItem('clinipulse_role', role);
    showToast(`Switched active workspace to: ${role.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const switchClinic = (clinicId) => {
    if (authUser?.memberships?.some((membership) => membership.clinicId === clinicId)) {
      switchAuthClinic(clinicId);
    } else {
      setActiveClinicId(clinicId);
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    }
    const target = clinics.find((c) => c.id === clinicId);
    if (target && target.branches.length > 0) {
      setActiveBranchId(target.branches[0].id);
    }
    showToast(`Active clinic tenant: ${target?.name || clinicId}`, 'info');
  };

  const switchBranch = (branchId) => {
    setActiveBranchId(branchId);
    const branch = activeClinic.branches.find((b) => b.id === branchId);
    showToast(`Switched active branch to: ${branch?.name || branchId}`, 'info');
  };

  const createAppointment = (appointmentData) => {
    // Conflict detection against active bookings
    const conflict = appointments.find(
      (a) =>
        a.doctorId === appointmentData.doctorId &&
        a.date === appointmentData.date &&
        a.time === appointmentData.time &&
        !['Cancelled', 'No-show'].includes(a.status)
    );
    if (conflict) {
      showToast(`Slot Conflict: Dr. ${conflict.doctorName} already has an appointment booked at ${appointmentData.time} on ${appointmentData.date}. Please pick an alternative slot.`, 'error');
      return null;
    }

    const id = `apt-${Date.now().toString().slice(-5)}`;
    const referenceNumber = `APT-${Math.floor(2000 + Math.random() * 8000)}`;
    const newAppointment = {
      ...appointmentData,
      id,
      referenceNumber,
      createdAt: new Date().toISOString()
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment ${referenceNumber} scheduled successfully!`);
    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === appointmentId ? { ...apt, status } : apt))
    );
    showToast(`Appointment status updated to ${status}`);
  };

  const createPatient = (patientData) => {
    const seq = Math.floor(1050 + Math.random() * 800);
    const newPatient = {
      ...patientData,
      id: `pt-${seq}`,
      patientIdNumber: `PT-${seq}`,
      clinicId: activeClinicId,
      registeredAt: new Date().toISOString().slice(0, 10),
      status: 'Active'
    };
    setPatients((prev) => [newPatient, ...prev]);
    showToast(`Patient ${newPatient.name} registered (ID: ${newPatient.patientIdNumber})`);
    return newPatient;
  };

  const createPrescription = (rxData) => {
    const seq = Math.floor(8820 + Math.random() * 900);
    const id = `rx-2026-${seq}`;
    const prescriptionNumber = `RX-2026-${seq}`;
    const verificationId = `v_${Math.random().toString(36).substring(2, 9)}`;
    const newRx = {
      ...rxData,
      id,
      prescriptionNumber,
      verificationId,
      qrVerificationUrl: `/verify-prescription/${verificationId}`,
      createdAt: new Date().toISOString()
    };
    setPrescriptions((prev) => [newRx, ...prev]);
    showToast(`Prescription ${prescriptionNumber} generated & signed!`);
    return newRx;
  };

  const createInvoice = (invoiceData) => {
    const seq = Math.floor(400 + Math.random() * 500);
    const newInv = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-0${seq}`
    };
    setInvoices((prev) => [newInv, ...prev]);
    showToast(`Invoice ${newInv.invoiceNumber} created!`);
    return newInv;
  };

  const addExpense = (expenseData) => {
    const newExp = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };
    setExpenses((prev) => [newExp, ...prev]);
    showToast(`Expense ₹${newExp.amount.toLocaleString()} recorded!`);
    return newExp;
  };

  const updateStock = (itemId, delta) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updated = Math.max(0, item.currentStock + delta);
          return {
            ...item,
            currentStock: updated,
            lastUpdated: new Date().toISOString().slice(0, 10)
          };
        }
        return item;
      })
    );
    showToast(`Inventory stock adjusted.`);
  };

  const updateFollowUpStatus = (taskId, status) => {
    setFollowUps((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
    showToast(`Follow-up task marked as ${status}`);
  };

  // Doctor Management Actions
  const addDoctor = (docData) => {
    const seq = Math.floor(105 + Math.random() * 890);
    const newDoc = {
      ...docData,
      id: `doc-${Date.now().toString().slice(-6)}`,
      doctorIdNumber: docData.doctorIdNumber || `DOC-${seq}`,
      clinicId: activeClinicId,
      status: docData.status || 'Active',
      createdAt: new Date().toISOString().slice(0, 10),
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          action: 'Doctor profile onboarded into clinic system',
          timestamp: new Date().toLocaleString(),
          actor: currentUser.name || 'Clinic Admin'
        }
      ]
    };
    setDoctors((prev) => [newDoc, ...prev]);
    showToast(`Doctor ${newDoc.name} registered successfully`);
    return newDoc;
  };

  const updateDoctor = (doctorId, updates) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          const log = {
            id: `act-${Date.now()}`,
            action: 'Doctor profile updated',
            timestamp: new Date().toLocaleString(),
            actor: currentUser.name || 'Clinic Admin'
          };
          return {
            ...d,
            ...updates,
            activityHistory: [log, ...(d.activityHistory || [])]
          };
        }
        return d;
      })
    );
    showToast('Doctor details updated successfully');
  };

  const toggleDoctorStatus = (doctorId, newStatus) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          const log = {
            id: `act-${Date.now()}`,
            action: `Account status updated to ${newStatus}`,
            timestamp: new Date().toLocaleString(),
            actor: currentUser.name || 'Clinic Admin'
          };
          return {
            ...d,
            status: newStatus,
            activityHistory: [log, ...(d.activityHistory || [])]
          };
        }
        return d;
      })
    );
    showToast(`Doctor status updated to ${newStatus}`);
  };

  const deleteDoctor = (doctorId) => {
    const activeApts = appointments.filter(
      (a) => a.doctorId === doctorId && !['Cancelled', 'Completed', 'No-show'].includes(a.status)
    );
    if (activeApts.length > 0) {
      showToast(
        `Cannot delete doctor with ${activeApts.length} active scheduled appointment(s). Please reassign appointments or deactivate doctor profile.`,
        'error'
      );
      return { success: false, reason: 'has_appointments', count: activeApts.length };
    }
    setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
    showToast('Doctor profile removed.');
    return { success: true };
  };

  // Receptionist Management Actions
  const addReceptionist = (recData) => {
    const seq = Math.floor(210 + Math.random() * 780);
    const newRec = {
      ...recData,
      id: `rec-${Date.now().toString().slice(-6)}`,
      staffIdNumber: recData.staffIdNumber || `REC-${seq}`,
      clinicId: activeClinicId,
      status: recData.status || 'Active',
      permissions: recData.permissions || ['register_patients', 'manage_appointments', 'check_in_patients'],
      joiningDate: recData.joiningDate || new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 10),
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          action: 'Staff desk account provisioned',
          timestamp: new Date().toLocaleString(),
          actor: currentUser.name || 'Clinic Admin'
        }
      ]
    };
    setReceptionists((prev) => [newRec, ...prev]);
    showToast(`Receptionist ${newRec.name} registered.`);
    return newRec;
  };

  const updateReceptionist = (recId, updates) => {
    setReceptionists((prev) =>
      prev.map((r) => {
        if (r.id === recId) {
          const log = {
            id: `act-${Date.now()}`,
            action: 'Staff profile / permissions updated',
            timestamp: new Date().toLocaleString(),
            actor: currentUser.name || 'Clinic Admin'
          };
          return {
            ...r,
            ...updates,
            activityHistory: [log, ...(r.activityHistory || [])]
          };
        }
        return r;
      })
    );
    showToast('Receptionist record updated.');
  };

  const toggleReceptionistStatus = (recId, newStatus) => {
    setReceptionists((prev) =>
      prev.map((r) => {
        if (r.id === recId) {
          const log = {
            id: `act-${Date.now()}`,
            action: `Status changed to ${newStatus}`,
            timestamp: new Date().toLocaleString(),
            actor: currentUser.name || 'Clinic Admin'
          };
          return {
            ...r,
            status: newStatus,
            activityHistory: [log, ...(r.activityHistory || [])]
          };
        }
        return r;
      })
    );
    showToast(`Receptionist status changed to ${newStatus}`);
  };

  const deleteReceptionist = (recId) => {
    setReceptionists((prev) => prev.filter((r) => r.id !== recId));
    showToast('Receptionist profile removed.');
    return { success: true };
  };

  // Helper to determine current active receptionist and check permissions
  const currentReceptionist = receptionists.find(
    (r) => r.email === currentUser.email || (r.clinicId === activeClinicId && currentRole === 'receptionist')
  ) || receptionists[0];

  const hasReceptionistPermission = (permission) => {
    if (currentRole === 'clinic_admin' || currentRole === 'super_admin') return true;
    if (!currentReceptionist || !currentReceptionist.permissions) return false;
    return currentReceptionist.permissions.includes(permission);
  };

  // Patient Feedback Actions
  const submitPatientFeedback = (feedbackData) => {
    const seq = Math.floor(2600 + Math.random() * 900);
    const newFb = {
      ...feedbackData,
      id: `fb-${Date.now().toString().slice(-6)}`,
      referenceNumber: `FB-${seq}`,
      status: 'New',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setFeedbacks((prev) => [newFb, ...prev]);

    const newAct = {
      id: `act-fb-${Date.now()}`,
      feedbackId: newFb.id,
      clinicId: newFb.clinicId,
      action: `Feedback submitted by patient (Rating: ${newFb.rating} Stars)`,
      actorName: newFb.patientName,
      actorRole: 'Patient',
      timestamp: new Date().toLocaleString()
    };
    setFeedbackActivities((prev) => [newAct, ...prev]);
    showToast('Thank you! Your feedback has been submitted to clinic administration.');
    return newFb;
  };

  const updateFeedbackStatus = (feedbackId, status, resolutionNote) => {
    setFeedbacks((prev) =>
      prev.map((f) => {
        if (f.id === feedbackId) {
          return {
            ...f,
            status,
            resolutionNote: resolutionNote !== undefined ? resolutionNote : f.resolutionNote,
            updatedAt: new Date().toISOString()
          };
        }
        return f;
      })
    );

    const newAct = {
      id: `act-fb-${Date.now()}`,
      feedbackId,
      clinicId: activeClinicId,
      action: `Status updated to ${status}${resolutionNote ? ' with resolution message' : ''}`,
      actorName: currentUser.name || 'Clinic Staff',
      actorRole: currentRole === 'clinic_admin' ? 'Clinic Admin / Doctor' : 'Receptionist',
      timestamp: new Date().toLocaleString()
    };
    setFeedbackActivities((prev) => [newAct, ...prev]);
    showToast(`Feedback status updated to ${status}`);
  };

  const addFeedbackInternalNote = (feedbackId, noteText) => {
    const newNote = {
      id: `note-${Date.now()}`,
      feedbackId,
      clinicId: activeClinicId,
      authorStaffId: currentUser.id,
      authorStaffName: currentUser.name,
      authorRole: currentRole === 'clinic_admin' ? 'Clinic Admin / Doctor' : 'Receptionist',
      note: noteText,
      createdAt: new Date().toISOString()
    };
    setFeedbackNotes((prev) => [newNote, ...prev]);

    const newAct = {
      id: `act-fb-${Date.now()}`,
      feedbackId,
      clinicId: activeClinicId,
      action: 'Internal staff note added',
      actorName: currentUser.name,
      actorRole: currentRole === 'clinic_admin' ? 'Clinic Admin / Doctor' : 'Receptionist',
      timestamp: new Date().toLocaleString()
    };
    setFeedbackActivities((prev) => [newAct, ...prev]);
    showToast('Internal note saved.');
    return newNote;
  };

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    if (currency === 'INR') {
      return `₹${num.toLocaleString('en-IN')}`;
    }
    return `$${num.toLocaleString('en-US')}`;
  };

  // Inventory actions
  const addInventoryItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
      clinicId: activeClinicId,
      branchId: activeBranchId,
      lastUpdated: new Date().toISOString().slice(0, 10),
      status: itemData.currentStock <= itemData.minStockLevel ? 'Low Stock' : 'In Stock'
    };
    setInventory((prev) => [newItem, ...prev]);
    const movement = {
      id: `mov-${Date.now()}`,
      clinicId: activeClinicId,
      itemId: newItem.id,
      itemName: newItem.name,
      sku: newItem.sku,
      type: 'Receipt',
      quantity: newItem.currentStock,
      previousStock: 0,
      newStock: newItem.currentStock,
      reason: 'Initial item catalog stock entry',
      actor: currentUser?.name || 'Staff',
      date: new Date().toLocaleString()
    };
    setInventoryMovements((prev) => [movement, ...prev]);
    showToast(`Inventory item "${newItem.name}" added to catalog.`);
    return newItem;
  };

  const updateInventoryItem = (itemId, updates) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updated = { ...item, ...updates, lastUpdated: new Date().toISOString().slice(0, 10) };
          updated.status = updated.currentStock <= updated.minStockLevel ? 'Low Stock' : 'In Stock';
          return updated;
        }
        return item;
      })
    );
    showToast('Inventory item updated.');
  };

  const adjustStock = (itemId, delta, reason, actor) => {
    const target = inventory.find((i) => i.id === itemId);
    if (!target) return false;
    const newStock = target.currentStock + delta;
    if (newStock < 0) {
      showToast(`Cannot adjust below 0. Available stock is only ${target.currentStock} ${target.unit}.`, 'error');
      return false;
    }

    setInventory((prev) =>
      prev.map((i) => {
        if (i.id === itemId) {
          const status = newStock <= i.minStockLevel ? 'Low Stock' : 'In Stock';
          return { ...i, currentStock: newStock, status, lastUpdated: new Date().toISOString().slice(0, 10) };
        }
        return i;
      })
    );

    const movement = {
      id: `mov-${Date.now()}`,
      clinicId: activeClinicId,
      itemId: target.id,
      itemName: target.name,
      sku: target.sku,
      type: delta > 0 ? 'Receipt' : 'Adjustment',
      quantity: delta,
      previousStock: target.currentStock,
      newStock: newStock,
      reason: reason || 'Manual stock adjustment',
      actor: actor || currentUser?.name || 'Staff',
      date: new Date().toLocaleString()
    };
    setInventoryMovements((prev) => [movement, ...prev]);
    showToast(`Stock updated: ${target.name} now has ${newStock} ${target.unit}.`);
    return true;
  };

  const createStockRequest = (reqData) => {
    const newReq = {
      ...reqData,
      id: `req-${Date.now()}`,
      clinicId: activeClinicId,
      branchId: activeBranchId,
      requestedDate: new Date().toISOString().slice(0, 10),
      status: 'Pending'
    };
    setStockRequests((prev) => [newReq, ...prev]);
    showToast(`Stock request for "${newReq.itemName}" submitted to pharmacy.`);
    return newReq;
  };

  const updateStockRequestStatus = (requestId, status, notes) => {
    setStockRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status, notes: notes || r.notes } : r))
    );
    showToast(`Stock request marked as ${status}.`);
  };

  const createSupplier = (supplierData) => {
    const newSup = {
      ...supplierData,
      id: `sup-${Date.now()}`,
      clinicId: activeClinicId,
      rating: 4.8,
      activeOrdersCount: 0
    };
    setSuppliers((prev) => [newSup, ...prev]);
    showToast(`Supplier "${newSup.name}" registered.`);
    return newSup;
  };

  const createPurchaseOrder = (poData) => {
    const poNumber = `PO-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newPo = {
      ...poData,
      id: `po-${Date.now()}`,
      poNumber,
      clinicId: activeClinicId,
      orderDate: new Date().toISOString().slice(0, 10),
      status: 'Sent'
    };
    setPurchaseOrders((prev) => [newPo, ...prev]);
    showToast(`Purchase Order ${poNumber} dispatched to supplier.`);
    return newPo;
  };

  const updatePurchaseOrderStatus = (poId, status) => {
    setPurchaseOrders((prev) =>
      prev.map((p) => (p.id === poId ? { ...p, status } : p))
    );
    showToast(`PO status changed to ${status}.`);
  };

  // Support Tickets Actions
  const createSupportTicket = (ticketData) => {
    const ticketSeq = Math.floor(810 + Math.random() * 100);
    const ticketNumber = `TCK-2026-${ticketSeq}`;
    const newTicket = {
      ...ticketData,
      id: `tkt-${Date.now()}`,
      ticketNumber,
      clinicId: activeClinicId,
      clinicName: activeClinic?.name || 'Clinic Tenant',
      status: 'Open',
      assignedTo: 'usr-support-pooja',
      assignedAgentName: 'Pooja Sharma',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderName: currentUser?.name || 'Clinic Administrator',
          senderRole: currentRole.replace('_', ' ').toUpperCase(),
          message: ticketData.description,
          timestamp: new Date().toLocaleString()
        }
      ]
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    showToast(`Support Ticket ${ticketNumber} raised. SaaS Support will respond shortly.`);
    return newTicket;
  };

  const addTicketMessage = (ticketId, messageText, isInternal = false) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: currentUser?.name || 'Support Agent',
      senderRole: currentRole.replace('_', ' ').toUpperCase(),
      message: messageText,
      timestamp: new Date().toLocaleString(),
      isInternal
    };
    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            updatedAt: new Date().toLocaleString(),
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );
    showToast(isInternal ? 'Internal note added to ticket.' : 'Reply sent on ticket.');
    return newMsg;
  };

  const updateTicketStatus = (ticketId, status) => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: new Date().toLocaleString() } : t))
    );
    showToast(`Ticket status updated to ${status}.`);
  };

  const assignTicket = (ticketId, agentId, agentName) => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignedTo: agentId, assignedAgentName: agentName, updatedAt: new Date().toLocaleString() } : t))
    );
    showToast(`Ticket assigned to ${agentName}.`);
  };

  // Clinical Encounter & Doctor consultation
  const saveEncounterDraft = (encounterData) => {
    const existingIndex = encounters.findIndex((e) => e.appointmentId === encounterData.appointmentId);
    const encounter = {
      ...encounterData,
      id: encounterData.id || `enc-${Date.now()}`,
      isDraft: true,
      clinicId: activeClinicId,
      branchId: activeBranchId,
      date: new Date().toISOString().slice(0, 10)
    };
    if (existingIndex >= 0) {
      setEncounters((prev) => prev.map((e, idx) => (idx === existingIndex ? encounter : e)));
    } else {
      setEncounters((prev) => [encounter, ...prev]);
    }
    showToast('Consultation draft saved successfully.');
    return encounter;
  };

  const finalizeEncounter = (encounterData) => {
    const finalized = {
      ...encounterData,
      id: encounterData.id || `enc-${Date.now()}`,
      isDraft: false,
      finalizedAt: new Date().toLocaleString(),
      clinicId: activeClinicId,
      branchId: activeBranchId,
      date: new Date().toISOString().slice(0, 10)
    };

    setEncounters((prev) => {
      const idx = prev.findIndex((e) => e.appointmentId === encounterData.appointmentId);
      if (idx >= 0) {
        return prev.map((e, i) => (i === idx ? finalized : e));
      }
      return [finalized, ...prev];
    });

    if (encounterData.appointmentId) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === encounterData.appointmentId ? { ...apt, status: 'Completed' } : apt))
      );
    }

    if (encounterData.medications && encounterData.medications.length > 0) {
      const rxSeq = Math.floor(8830 + Math.random() * 700);
      const newRx = {
        id: `rx-2026-${rxSeq}`,
        prescriptionNumber: `RX-2026-${rxSeq}`,
        verificationId: `v_${Math.random().toString(36).substring(2, 9)}`,
        clinicId: activeClinicId,
        branchId: activeBranchId,
        doctorId: encounterData.doctorId,
        doctorName: encounterData.doctorName,
        doctorRegistration: 'MCI-REG-44910',
        patientId: encounterData.patientId,
        patientName: encounterData.patientName,
        patientAgeGender: encounterData.patientAgeGender || '34 Yrs / Male',
        date: new Date().toISOString().slice(0, 10),
        diagnosis: encounterData.diagnosis,
        vitals: encounterData.vitals,
        medications: encounterData.medications,
        additionalInstructions: encounterData.treatmentPlan || 'Complete prescribed course. Return for review if pain recurs.',
        followUpDate: encounterData.followUpDate,
        status: 'Active',
        qrVerificationUrl: `https://clinicos.health/verify-prescription/v_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      setPrescriptions((prev) => [newRx, ...prev]);
    }

    showToast(`Consultation finalized and prescription generated for ${encounterData.patientName}!`);
    return finalized;
  };

  // Reusable Client-Side Availability Service (Section L)
  const checkSlotAvailability = (clinicId, doctorId, date, time, durationMinutes = 30, excludeAppointmentId = null) => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc) return { available: false, reason: 'Doctor profile not found.' };

    // Check doctor available days
    if (date) {
      const dateObj = new Date(date);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[dateObj.getDay()];
      if (doc.availableDays && doc.availableDays.length > 0 && !doc.availableDays.includes(dayName)) {
        return {
          available: false,
          reason: `Dr. ${doc.name} does not hold clinical hours on ${dayName}s. Available days: ${doc.availableDays.join(', ')}.`
        };
      }
    }

    // Blocking statuses that consume a slot
    const blockingStatuses = ['Confirmed', 'Patient Checked In', 'Checked In', 'In Consultation', 'In Progress'];

    const conflict = appointments.find((a) => {
      if (excludeAppointmentId && a.id === excludeAppointmentId) return false;
      if (a.doctorId !== doctorId) return false;
      const aptDate = a.confirmedDate || a.date;
      if (aptDate !== date) return false;
      const aptTime = a.confirmedTime || a.time;
      if (aptTime !== time) return false;
      return blockingStatuses.includes(a.status);
    });

    if (conflict) {
      return {
        available: false,
        reason: `Slot conflict: Dr. ${doc.name} already has a confirmed booking at ${time} on ${date}.`,
        conflictingAppointment: conflict
      };
    }

    return { available: true };
  };

  const getAvailableSlotsForDoctor = (clinicId, doctorId, date) => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc) return [];

    const standardSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
      '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'
    ];

    return standardSlots.map((time) => {
      const check = checkSlotAvailability(clinicId, doctorId, date, time, doc.appointmentDurationMinutes || 30);
      return {
        time,
        available: check.available,
        reason: check.reason || null
      };
    });
  };

  // Appointment Lifecycle Actions (Sections E, F, G, H, J)
  const submitBookingRequest = (requestData) => {
    const seq = Math.floor(100 + Math.random() * 900);
    const requestId = `REQ-2026-${seq}`;
    const id = `apt-req-${Date.now().toString().slice(-6)}`;
    const referenceNumber = `APT-${Math.floor(3000 + Math.random() * 6000)}`;

    const clinic = clinics.find((c) => c.id === requestData.clinicId) || clinics[0];
    const doctor = doctors.find((d) => d.id === requestData.doctorId) || doctors[0];

    const newRequest = {
      ...requestData,
      id,
      requestId,
      referenceNumber,
      clinicId: clinic.id,
      clinicName: clinic.name,
      branchId: requestData.branchId || clinic.branches[0]?.id || 'branch-main',
      branchName: clinic.branches[0]?.name || 'Main Hub',
      doctorId: doctor.id,
      doctorName: doctor.name,
      consultationFee: requestData.consultationFee || doctor.consultationFee || 600,
      consultationType: requestData.consultationType || 'First Consultation',
      requestedDate: requestData.preferredDate || requestData.date,
      requestedTime: requestData.preferredTime || requestData.time,
      date: requestData.preferredDate || requestData.date,
      time: requestData.preferredTime || requestData.time,
      durationMinutes: requestData.durationMinutes || doctor.appointmentDurationMinutes || 30,
      status: 'Pending Clinic Confirmation',
      patientAlternativePreferences: requestData.patientAlternativePreferences || null,
      proposedAlternatives: [],
      responseHistory: [
        {
          id: `aud-${Date.now()}`,
          action: 'Booking request submitted by patient',
          timestamp: new Date().toLocaleString(),
          actor: `${requestData.patientName} (Patient)`,
          notes: `Requested preferred slot: ${requestData.preferredDate || requestData.date} at ${requestData.preferredTime || requestData.time}`
        }
      ],
      createdAt: new Date().toISOString()
    };

    setAppointments((prev) => [newRequest, ...prev]);

    // Simulated notification for receptionist
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'receptionist',
      clinicId: clinic.id,
      appointmentId: id,
      requestId,
      type: 'booking_request_submitted',
      title: 'New Online Booking Request',
      message: `${requestData.patientName} requested an appointment with Dr. ${doctor.name} for ${newRequest.requestedDate} at ${newRequest.requestedTime}.`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'normal'
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Booking request ${requestId} submitted! The clinic receptionist will verify availability.`);
    return newRequest;
  };

  const confirmBookingRequest = (appointmentId, actorName = 'Shweta Kulkarni (Receptionist)') => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return false;

    const targetDate = apt.requestedDate || apt.date;
    const targetTime = apt.requestedTime || apt.time;

    // Revalidate slot availability
    const check = checkSlotAvailability(apt.clinicId, apt.doctorId, targetDate, targetTime, apt.durationMinutes || 30, apt.id);
    if (!check.available) {
      showToast(`Cannot confirm: ${check.reason}. Please propose an alternative slot.`, 'error');
      return false;
    }

    const audit = {
      id: `aud-${Date.now()}`,
      action: 'Requested slot verified and confirmed by clinic receptionist',
      timestamp: new Date().toLocaleString(),
      actor: actorName,
      notes: `Confirmed slot: ${targetDate} at ${targetTime}`
    };

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'Confirmed',
              confirmedDate: targetDate,
              confirmedTime: targetTime,
              date: targetDate,
              time: targetTime,
              updatedAt: new Date().toISOString(),
              responseHistory: [...(a.responseHistory || []), audit]
            }
          : a
      )
    );

    // Simulated confirmation notification to patient
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'patient',
      recipientUserId: apt.patientId,
      clinicId: apt.clinicId,
      appointmentId: apt.id,
      requestId: apt.requestId,
      type: 'appointment_confirmed',
      title: 'Appointment Confirmed! 🎉',
      message: `Your appointment with Dr. ${apt.doctorName} at ${apt.clinicName} on ${targetDate} at ${targetTime} is confirmed. Please arrive 10 minutes early.`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'high'
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Appointment ${apt.referenceNumber || apt.requestId} confirmed! Patient notified.`);
    return true;
  };

  const proposeAlternativeSlot = (appointmentId, proposedData, actorName = 'Receptionist') => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return null;

    const newAlt = {
      id: `prop-alt-${Date.now()}`,
      proposedDate: proposedData.proposedDate,
      proposedTime: proposedData.proposedTime,
      proposedDoctorId: proposedData.proposedDoctorId || apt.doctorId,
      proposedDoctorName: proposedData.proposedDoctorName || apt.doctorName,
      reason: proposedData.reason || 'Requested slot was unavailable due to doctor procedure schedule.',
      proposedAt: new Date().toLocaleString(),
      status: 'Pending'
    };

    const audit = {
      id: `aud-${Date.now()}`,
      action: 'Alternative slot proposed by clinic receptionist',
      timestamp: new Date().toLocaleString(),
      actor: actorName,
      notes: `Offered ${newAlt.proposedDate} at ${newAlt.proposedTime}. Reason: ${newAlt.reason}`
    };

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'Alternative Slot Proposed',
              proposedAlternatives: [newAlt, ...(a.proposedAlternatives || [])],
              responseHistory: [...(a.responseHistory || []), audit],
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );

    // Simulated notification for patient
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'patient',
      recipientUserId: apt.patientId,
      clinicId: apt.clinicId,
      appointmentId: apt.id,
      requestId: apt.requestId,
      type: 'alternative_slot_proposed',
      title: 'Alternative Appointment Slot Proposed',
      message: `Your requested time was unavailable. ${apt.clinicName} offered an alternative on ${newAlt.proposedDate} at ${newAlt.proposedTime}. Please review and respond.`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'high'
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Alternative slot (${newAlt.proposedDate} at ${newAlt.proposedTime}) proposed to patient.`);
    return newAlt;
  };

  const respondToAlternativeSlot = (appointmentId, accepted, simulateConflict = false) => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return { success: false, message: 'Appointment not found.' };

    const latestAlt = apt.proposedAlternatives?.[0];
    if (!latestAlt) return { success: false, message: 'No proposed slot found.' };

    if (accepted) {
      // Revalidate availability (and support simulating scenario 4 conflict!)
      const check = checkSlotAvailability(
        apt.clinicId,
        latestAlt.proposedDoctorId || apt.doctorId,
        latestAlt.proposedDate,
        latestAlt.proposedTime,
        apt.durationMinutes || 30,
        apt.id
      );

      if (simulateConflict || !check.available) {
        // Slot is no longer available!
        const audit = {
          id: `aud-${Date.now()}`,
          action: 'Alternative acceptance blocked: slot conflict detected',
          timestamp: new Date().toLocaleString(),
          actor: `${apt.patientName} (Patient)`,
          notes: 'Proposed slot was consumed by another booking before patient confirmation.'
        };

        setAppointments((prev) =>
          prev.map((a) =>
            a.id === appointmentId
              ? {
                  ...a,
                  status: 'Pending Clinic Confirmation',
                  responseHistory: [...(a.responseHistory || []), audit],
                  updatedAt: new Date().toISOString()
                }
              : a
          )
        );

        const notif = {
          id: `notif-${Date.now()}`,
          recipientRole: 'receptionist',
          clinicId: apt.clinicId,
          appointmentId: apt.id,
          requestId: apt.requestId,
          type: 'request_received_by_clinic',
          title: 'Action Needed: Proposed Slot Expired',
          message: `Patient attempted to accept ${latestAlt.proposedTime} on ${latestAlt.proposedDate}, but it was consumed. Please propose a new alternative slot.`,
          createdAt: new Date().toISOString(),
          read: false,
          priority: 'urgent'
        };
        setNotifications((prev) => [notif, ...prev]);

        showToast('This proposed slot is no longer available. The receptionist has been notified to propose another slot.', 'error');
        return { success: false, conflict: true };
      }

      // Slot is available -> Confirm!
      const audit = {
        id: `aud-${Date.now()}`,
        action: 'Patient accepted alternative slot - Appointment Confirmed',
        timestamp: new Date().toLocaleString(),
        actor: `${apt.patientName} (Patient)`,
        notes: `Confirmed: ${latestAlt.proposedDate} at ${latestAlt.proposedTime}`
      };

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? {
                ...a,
                status: 'Confirmed',
                confirmedDate: latestAlt.proposedDate,
                confirmedTime: latestAlt.proposedTime,
                date: latestAlt.proposedDate,
                time: latestAlt.proposedTime,
                doctorId: latestAlt.proposedDoctorId || a.doctorId,
                doctorName: latestAlt.proposedDoctorName || a.doctorName,
                proposedAlternatives: a.proposedAlternatives?.map((alt, idx) =>
                  idx === 0 ? { ...alt, status: 'Accepted' } : alt
                ),
                responseHistory: [...(a.responseHistory || []), audit],
                updatedAt: new Date().toISOString()
              }
            : a
        )
      );

      const notif = {
        id: `notif-${Date.now()}`,
        recipientRole: 'patient',
        recipientUserId: apt.patientId,
        clinicId: apt.clinicId,
        appointmentId: apt.id,
        requestId: apt.requestId,
        type: 'alternative_accepted',
        title: 'Appointment Confirmed! 🎉',
        message: `You accepted the alternative slot! Appointment with Dr. ${latestAlt.proposedDoctorName || apt.doctorName} at ${apt.clinicName} on ${latestAlt.proposedDate} at ${latestAlt.proposedTime} is confirmed.`,
        createdAt: new Date().toISOString(),
        read: false,
        priority: 'high'
      };
      setNotifications((prev) => [notif, ...prev]);

      showToast(`Alternative slot accepted! Appointment ${apt.referenceNumber || apt.requestId} is confirmed.`);
      return { success: true };
    } else {
      // Declined!
      const audit = {
        id: `aud-${Date.now()}`,
        action: 'Patient declined proposed alternative slot',
        timestamp: new Date().toLocaleString(),
        actor: `${apt.patientName} (Patient)`,
        notes: `Declined alternative on ${latestAlt.proposedDate} at ${latestAlt.proposedTime}`
      };

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? {
                ...a,
                status: 'Rejected',
                proposedAlternatives: a.proposedAlternatives?.map((alt, idx) =>
                  idx === 0 ? { ...alt, status: 'Declined' } : alt
                ),
                responseHistory: [...(a.responseHistory || []), audit],
                updatedAt: new Date().toISOString()
              }
            : a
        )
      );

      const notif = {
        id: `notif-${Date.now()}`,
        recipientRole: 'receptionist',
        clinicId: apt.clinicId,
        appointmentId: apt.id,
        requestId: apt.requestId,
        type: 'alternative_declined',
        title: 'Patient Declined Alternative Slot',
        message: `${apt.patientName} declined the proposed alternative for request ${apt.requestId}.`,
        createdAt: new Date().toISOString(),
        read: false,
        priority: 'normal'
      };
      setNotifications((prev) => [notif, ...prev]);

      showToast('Alternative declined. You may submit a new request anytime.', 'info');
      return { success: true, declined: true };
    }
  };

  const rejectBookingRequest = (appointmentId, reason, actorName = 'Receptionist') => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return;

    const audit = {
      id: `aud-${Date.now()}`,
      action: 'Booking request rejected by clinic front desk',
      timestamp: new Date().toLocaleString(),
      actor: actorName,
      notes: reason
    };

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'Rejected',
              rejectionReason: reason,
              responseHistory: [...(a.responseHistory || []), audit],
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );

    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'patient',
      recipientUserId: apt.patientId,
      clinicId: apt.clinicId,
      appointmentId: apt.id,
      requestId: apt.requestId,
      type: 'appointment_cancelled',
      title: 'Booking Request Not Accommodated',
      message: `Your booking request at ${apt.clinicName} could not be confirmed. Reason: ${reason}.`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'high'
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Booking request ${apt.requestId || apt.referenceNumber} rejected.`);
  };

  // Patient arrival and clinic check-in (Scenario 5)
  const checkInPatient = (appointmentId) => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return;

    const queueSeq = `#Q-${Math.floor(10 + Math.random() * 89)}`;

    const audit = {
      id: `aud-${Date.now()}`,
      action: 'Patient arrived and checked in at reception',
      timestamp: new Date().toLocaleString(),
      actor: 'Receptionist',
      notes: `Assigned queue token ${queueSeq}`
    };

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'Patient Checked In',
              queueNumber: queueSeq,
              responseHistory: [...(a.responseHistory || []), audit],
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );

    // Notify doctor
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'clinic_admin',
      recipientUserId: apt.doctorId,
      clinicId: apt.clinicId,
      appointmentId: apt.id,
      type: 'request_received_by_clinic',
      title: `Patient Arrived (${queueNumber || queueSeq})`,
      message: `${apt.patientName} is checked in and waiting in reception for Dr. ${apt.doctorName}.`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'normal'
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Patient ${apt.patientName} checked in! Assigned token ${queueSeq}.`);
  };

  const startConsultation = (appointmentId) => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return;

    const audit = {
      id: `aud-${Date.now()}`,
      action: 'Doctor initiated consultation in chamber',
      timestamp: new Date().toLocaleString(),
      actor: `Dr. ${apt.doctorName}`
    };

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'In Consultation',
              responseHistory: [...(a.responseHistory || []), audit],
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );

    showToast(`Consultation in progress with ${apt.patientName}.`);
  };

  const completeConsultation = (appointmentId, notes = '', prescriptionId = null) => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return;

    const audit = {
      id: `aud-${Date.now()}`,
      action: 'Consultation concluded and clinical summary finalized',
      timestamp: new Date().toLocaleString(),
      actor: `Dr. ${apt.doctorName}`
    };

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'Completed',
              notes: notes || a.notes,
              responseHistory: [...(a.responseHistory || []), audit],
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );

    // Notification for patient
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'patient',
      recipientUserId: apt.patientId,
      clinicId: apt.clinicId,
      appointmentId: apt.id,
      type: 'appointment_reminder',
      title: 'Consultation Summary & Prescription Ready',
      message: `Your visit with Dr. ${apt.doctorName} is complete. Your visit record and signed prescription are available.`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'normal'
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Consultation completed for ${apt.patientName}! Summary and prescription saved.`);
  };

  const cancelAppointment = (appointmentId, reason = 'Cancelled by clinic front desk') => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return;

    const audit = {
      id: `aud-${Date.now()}`,
      action: 'Appointment cancelled',
      timestamp: new Date().toLocaleString(),
      actor: 'Front Desk / Patient',
      notes: reason
    };

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'Cancelled',
              cancellationReason: reason,
              responseHistory: [...(a.responseHistory || []), audit],
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );
    showToast('Appointment cancelled.');
  };

  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return false;

    const check = checkSlotAvailability(apt.clinicId, apt.doctorId, newDate, newTime, apt.durationMinutes || 30, appointmentId);
    if (!check.available) {
      showToast(`Cannot reschedule: ${check.reason}`, 'error');
      return false;
    }

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              date: newDate,
              time: newTime,
              confirmedDate: newDate,
              confirmedTime: newTime,
              status: 'Confirmed',
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );
    showToast(`Appointment rescheduled to ${newDate} at ${newTime}.`);
    return true;
  };

  // Notification Actions
  const addNotification = (notifData) => {
    const newNotif = {
      ...notifData,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return newNotif;
  };

<<<<<<< HEAD
  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared.');
=======
  const isNotificationForCurrentUser = (notification) => {
    if (notification.recipientUserId === currentUser?.id) return true;
    if (currentRole === 'patient') return false;
    return (
      notification.clinicId === activeClinicId &&
      toWorkspaceRole(notification.recipientRole) === currentRole
    );
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notifId && isNotificationForCurrentUser(n) ? { ...n, read: true } : n
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) =>
        isNotificationForCurrentUser(notification) ? { ...notification, read: true } : notification
      )
    );
    showToast('Your notifications have been marked as read.');
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  };

  // Staff Management
  const inviteStaffMember = (staffData) => {
    const newStaff = {
      ...staffData,
      id: `stf-${Date.now()}`,
      clinicId: activeClinicId,
      branchIds: [activeBranchId],
      status: 'Active',
      joinedDate: new Date().toISOString().slice(0, 10)
    };
    setStaffMembers((prev) => [newStaff, ...prev]);
    showToast(`Staff invitation sent to ${newStaff.name} (${newStaff.role.toUpperCase()}).`);
    return newStaff;
  };

  const updateStaffRole = (staffId, newRole) => {
    setStaffMembers((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, role: newRole } : s))
    );
    showToast('Staff role privileges updated.');
  };

  // Billing & Payments
  const recordInvoicePayment = (invoiceId, amountPaid, paymentMethod = 'UPI / QR Scan') => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const totalPaid = (inv.amountPaid || 0) + Number(amountPaid);
          const isFullyPaid = totalPaid >= inv.totalAmount;
          return {
            ...inv,
            amountPaid: totalPaid,
            status: isFullyPaid ? 'Paid' : 'Partially Paid',
            paymentMethod
          };
        }
        return inv;
      })
    );
    showToast(`Simulated Payment of ${formatCurrency(amountPaid)} received via ${paymentMethod}! (Demo Transaction - No real charge)`);
  };

  const requestRefund = (invoiceId, reason) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Refunded' } : inv))
    );
    showToast(`Refund processed for invoice. Reason: ${reason || 'Patient request'}.`);
  };

  // Demo Onboarding
  const onboardNewClinic = (onboardingData) => {
<<<<<<< HEAD
    const clinicId = `clinic-${onboardingData.clinicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
    const branchId = `branch-${clinicId}-main`;
=======
    const clinicId = onboardingData.clinicId ||
      `clinic-${onboardingData.clinicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
    const branchCount = Math.max(1, Number(onboardingData.branchCount) || 1);
    const branches = Array.from({ length: branchCount }, (_, index) => {
      const branchId = index === 0 ? `branch-${clinicId}-main` : `branch-${clinicId}-${index + 1}`;
      return {
        id: branchId,
        clinicId,
        name: index === 0
          ? `${onboardingData.clinicName} (Main Branch)`
          : `${onboardingData.clinicName} (Branch ${index + 1})`,
        code: index === 0 ? 'MAIN' : `BR-${index + 1}`,
        address: onboardingData.address || '101 Healthcare Boulevard',
        city: onboardingData.city || 'Mumbai',
        phone: onboardingData.phone || '+91 98000 12345',
        email: onboardingData.email || 'contact@newclinic.demo',
        operatingHours: 'Mon - Sat: 09:00 - 20:00',
        isMain: index === 0,
        activeDoctorsCount: Math.ceil((Number(onboardingData.doctorCount) || 2) / branchCount)
      };
    });
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

    const newClinic = {
      id: clinicId,
      slug: onboardingData.clinicName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: onboardingData.clinicName,
      tagline: `${onboardingData.specialty} Excellence & Patient Care`,
      specialty: onboardingData.specialty || 'General',
      description: `Modern digital healthcare clinic with ${onboardingData.doctorCount || 3} dedicated clinicians.`,
      logo: '🏥',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      address: onboardingData.address || '101 Healthcare Boulevard',
      city: onboardingData.city || 'Mumbai',
      phone: onboardingData.phone || '+91 98000 12345',
      email: onboardingData.email || 'contact@newclinic.demo',
<<<<<<< HEAD
      ownerName: onboardingData.ownerName || 'Dr. Administrator',
      status: 'Trial',
      subscriptionPlanId: onboardingData.planId || 'professional',
      trialEndsAt: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      isTrial: true,
      branches: [
        {
          id: branchId,
          clinicId,
          name: `${onboardingData.clinicName} (Main Branch)`,
          code: 'MAIN',
          address: onboardingData.address || '101 Healthcare Boulevard',
          city: onboardingData.city || 'Mumbai',
          phone: onboardingData.phone || '+91 98000 12345',
          email: onboardingData.email || 'contact@newclinic.demo',
          operatingHours: 'Mon - Sat: 09:00 - 20:00',
          isMain: true,
          activeDoctorsCount: Number(onboardingData.doctorCount) || 2
        }
      ],
=======
      ownerEmail: onboardingData.ownerEmail,
      ownerName: onboardingData.ownerName || 'Dr. Administrator',
      status: 'Pending',
      approvalStatus: 'Pending',
      subscriptionPlanId: onboardingData.planId || 'professional',
      trialEndsAt: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      isTrial: true,
      branches,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      services: [
        { id: 'srv-gen-1', name: 'Comprehensive Consultation', durationMinutes: 30, fee: 800, category: 'Consultation', description: 'Primary consultation and diagnosis' },
        { id: 'srv-gen-2', name: 'Follow-up Checkup', durationMinutes: 15, fee: 400, category: 'Follow-up', description: 'Review progress and medication adjustment' }
      ],
      operatingHours: 'Mon - Sat: 09:00 - 20:00',
      bookingPolicy: '15-minute grace period for scheduled slots',
      rating: 4.9,
      reviewsCount: 12
    };

    setClinics((prev) => [newClinic, ...prev]);
<<<<<<< HEAD
    setActiveClinicId(clinicId);
    setActiveBranchId(branchId);
    switchRole('clinic_admin');
    showToast(`🎉 Welcome to ClinicOS! ${newClinic.name} created on 14-day ${onboardingData.planId?.toUpperCase() || 'PRO'} trial.`);
    return newClinic;
  };

  const createPlan = (planData) => {
    const rawId = planData.id?.trim() || planData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const id = rawId.replace(/^-+|-+$/g, '') || `plan-${Date.now()}`;
    if (plans.some((p) => p.id === id)) {
      showToast(`A plan with ID "${id}" already exists. Please choose a different name or ID.`, 'error');
      return null;
    }

    const discountPercent = Number(planData.discountPercent) || 0;
    const monthlyPrice = Number(planData.monthlyPrice) || 0;
    const originalMonthlyPrice = planData.originalMonthlyPrice
      ? Number(planData.originalMonthlyPrice)
      : discountPercent > 0
      ? Math.round(monthlyPrice / (1 - discountPercent / 100))
      : monthlyPrice;

    const newPlan = {
      id,
      name: planData.name.trim(),
      tagline: planData.tagline?.trim() || 'Custom ClinicOS Healthcare SaaS Tier',
      monthlyPrice,
      originalMonthlyPrice,
      annualPrice: Number(planData.annualPrice) || (monthlyPrice * 10) || 0,
      discountPercent,
      maxDoctors: Number(planData.maxDoctors) || 1,
      maxBranches: Number(planData.maxBranches) || 1,
      maxStaff: Number(planData.maxStaff) || 2,
      features: Array.isArray(planData.features) ? planData.features.filter(Boolean) : [],
      isPopular: Boolean(planData.isPopular)
    };

    setPlans((prev) => {
      let next = [...prev];
      if (newPlan.isPopular) {
        next = next.map((p) => ({ ...p, isPopular: false }));
      }
      next.push(newPlan);
      localStorage.setItem('clinipulse_plans', JSON.stringify(next));
      return next;
    });

    showToast(`Subscription plan "${newPlan.name}" created successfully!`);
    return newPlan;
  };

  const updatePlan = (planId, updates) => {
    setPlans((prev) => {
      const next = prev.map((p) => {
        if (p.id === planId) {
          const discountPercent = updates.discountPercent !== undefined ? Number(updates.discountPercent) : (p.discountPercent || 0);
          const monthlyPrice = updates.monthlyPrice !== undefined ? Number(updates.monthlyPrice) : p.monthlyPrice;
          const originalMonthlyPrice = updates.originalMonthlyPrice !== undefined
            ? Number(updates.originalMonthlyPrice)
            : discountPercent > 0
            ? Math.round(monthlyPrice / (1 - discountPercent / 100))
            : monthlyPrice;

          const updated = {
            ...p,
            ...updates,
            monthlyPrice,
            originalMonthlyPrice,
            discountPercent,
            annualPrice: updates.annualPrice !== undefined ? Number(updates.annualPrice) : p.annualPrice,
            maxDoctors: updates.maxDoctors !== undefined ? Number(updates.maxDoctors) : p.maxDoctors,
            maxBranches: updates.maxBranches !== undefined ? Number(updates.maxBranches) : p.maxBranches,
            maxStaff: updates.maxStaff !== undefined ? Number(updates.maxStaff) : p.maxStaff,
            features: updates.features !== undefined ? updates.features : p.features
          };
          return updated;
        }
        if (updates.isPopular && p.id !== planId) {
          return { ...p, isPopular: false };
        }
        return p;
      });
      localStorage.setItem('clinipulse_plans', JSON.stringify(next));
      return next;
    });
    showToast(`Subscription plan "${updates.name || planId}" updated successfully.`);
  };

  const deletePlan = (planId, fallbackPlanId = null) => {
    const subscribedClinics = clinics.filter((c) => c.subscriptionPlanId === planId);

    if (subscribedClinics.length > 0 && !fallbackPlanId) {
      showToast(
        `Cannot delete plan: ${subscribedClinics.length} clinic(s) are currently subscribed to it. Please reassign them first.`,
        'error'
      );
      return {
        success: false,
        reason: 'active_clinics',
        count: subscribedClinics.length,
        clinics: subscribedClinics.map((c) => c.name)
      };
    }

    if (subscribedClinics.length > 0 && fallbackPlanId) {
      setClinics((prev) => {
        const next = prev.map((c) => (c.subscriptionPlanId === planId ? { ...c, subscriptionPlanId: fallbackPlanId } : c));
        localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
        return next;
      });
    }

    setPlans((prev) => {
      const next = prev.filter((p) => p.id !== planId);
      localStorage.setItem('clinipulse_plans', JSON.stringify(next));
      return next;
    });

    showToast(`Subscription plan removed successfully.`);
    return { success: true };
  };

  const resetPlans = () => {
    localStorage.removeItem('clinipulse_plans');
    setPlans(DEMO_PLANS);
    showToast('Subscription plans restored to default tiers.');
  };

  // Immediate Doctor Plan Change / Upgrade with Zero Waiting or Admin Permission
  const upgradeClinicSubscription = (clinicId, newPlanId, paymentDetails = {}) => {
    const targetPlan = plans.find((p) => p.id === newPlanId) || { name: newPlanId, monthlyPrice: 4999 };
    const amount = paymentDetails.amount || targetPlan.monthlyPrice;
    const paymentMethod = paymentDetails.paymentMethod || 'UPI Instant QR';

    setClinics((prev) => {
      const next = prev.map((c) =>
        c.id === clinicId
          ? {
              ...c,
              subscriptionPlanId: newPlanId,
              isTrial: false,
              status: 'Active'
            }
          : c
      );
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });

    // Record SaaS invoice & payment automatically so no waiting or manual admin permission is needed!
    const seq = Math.floor(1000 + Math.random() * 9000);
    const invoiceNum = `SAAS-INV-${seq}`;
    const newInvoice = {
      id: `sinv-${Date.now()}`,
      invoiceNumber: invoiceNum,
      clinicId,
      clinicName: activeClinic?.name || 'Clinic Tenant',
      planId: newPlanId,
      planName: targetPlan.name,
      amount,
      billingCycle: paymentDetails.cycle || 'Monthly',
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date().toISOString().slice(0, 10),
      paidAt: new Date().toISOString().slice(0, 10),
      status: 'Paid',
      paymentMethod,
      transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    };
    setSaasInvoices((prev) => [newInvoice, ...prev]);

    const newPayment = {
      id: `spay-${Date.now()}`,
      paymentReference: `PAY-${Date.now().toString().slice(-6)}`,
      clinicId,
      clinicName: activeClinic?.name || 'Clinic Tenant',
      invoiceNumber: invoiceNum,
      amount,
      paymentMethod,
      date: new Date().toISOString().slice(0, 10),
      status: 'Success'
    };
    setSaasPayments((prev) => [newPayment, ...prev]);

    showToast(`Payment of ₹${amount.toLocaleString('en-IN')} confirmed! ${targetPlan.name} is now immediately active with zero waiting.`);
    return { success: true, invoice: newInvoice, plan: targetPlan };
  };

  const updateWhatsAppTemplate = (templateId, updates) => {
    setWhatsAppTemplates((prev) => {
      const next = prev.map((t) =>
        t.id === templateId || t.key === templateId
          ? { ...t, ...updates, lastEdited: new Date().toISOString().slice(0, 10) }
          : t
      );
      localStorage.setItem('clinipulse_wa_templates', JSON.stringify(next));
      return next;
    });
    showToast(`WhatsApp activity template updated successfully.`);
  };

  const resetWhatsAppTemplates = () => {
    localStorage.removeItem('clinipulse_wa_templates');
    setWhatsAppTemplates(DEMO_WHATSAPP_TEMPLATES);
    showToast(`WhatsApp templates restored to standard clinical defaults.`);
=======
    showToast(`${newClinic.name} registration was submitted for super-admin approval.`);
    return newClinic;
  };

  const updatePlan = (planId, updates) => {
    setPlans((prev) => {
      const next = prev.map((p) => (p.id === planId ? { ...p, ...updates } : p));
      localStorage.setItem('clinipulse_plans', JSON.stringify(next));
      return next;
    });
    showToast(`Plan limits & pricing updated successfully.`);
  };

  const upgradeClinicSubscription = (clinicId, newPlanId) => {
    setClinics((prev) => {
      const next = prev.map((c) => (c.id === clinicId ? { ...c, subscriptionPlanId: newPlanId } : c));
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });
    showToast(`Clinic subscription plan updated to ${newPlanId.toUpperCase()}`);
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  };

  // Centralized Permission Checker
  const hasPermission = (permission) => {
    const perms = ROLE_PERMISSIONS[currentRole] || [];
    return perms.includes(permission);
  };

  // SaaS Finance Actions
  const recordSaaSPayment = (invoiceNumber, paymentMethod = 'Razorpay / UPI') => {
    const inv = saasInvoices.find((i) => i.invoiceNumber === invoiceNumber);
    if (!inv) return;
    const paymentRef = `rzp_pay_${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    const newPayment = {
      id: `spay-${Date.now()}`,
      paymentReference: paymentRef,
      clinicId: inv.clinicId,
      clinicName: inv.clinicName,
      invoiceNumber: inv.invoiceNumber,
      amount: inv.amount,
      paymentMethod,
      date: new Date().toISOString().slice(0, 10),
      status: 'Success'
    };
    setSaasPayments((prev) => [newPayment, ...prev]);
    setSaasInvoices((prev) =>
      prev.map((i) =>
        i.invoiceNumber === invoiceNumber
          ? { ...i, status: 'Paid', paidAt: new Date().toISOString().slice(0, 10), paymentMethod }
          : i
      )
    );
    showToast(`Simulated subscription payment of ₹${inv.amount.toLocaleString('en-IN')} recorded for ${invoiceNumber}`);
  };

  const requestSaaSRefund = (refundData) => {
    const newRefund = {
      ...refundData,
      id: `sref-${Date.now()}`,
      refundReference: `RFD-SAAS-${Math.floor(10000 + Math.random() * 90000)}`,
      requestDate: new Date().toISOString().slice(0, 10),
      status: 'Completed'
    };
    setSaasRefunds((prev) => [newRefund, ...prev]);
    showToast(`SaaS refund reference ${newRefund.refundReference} processed.`);
    return newRefund;
  };

  const addSaaSExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: `sexp-${Date.now()}`,
      date: expenseData.date || new Date().toISOString().slice(0, 10),
      paymentStatus: 'Paid'
    };
    setSaasExpenses((prev) => [newExpense, ...prev]);
    showToast(`Company operating expense recorded: ₹${Number(expenseData.amount).toLocaleString('en-IN')}`);
    return newExpense;
  };

  // Clinic Finance Actions
  const recordClinicPayment = (invoiceNumber, paymentMethod = 'UPI QR', amount) => {
    const inv = invoices.find((i) => i.invoiceNumber === invoiceNumber);
    if (!inv) return;
    const remaining = inv.totalAmount - (inv.amountPaid || 0);
    const paidAmount = Number(amount) || (remaining > 0 ? remaining : inv.totalAmount);
    const newAmountPaid = (inv.amountPaid || 0) + paidAmount;
    const newStatus = newAmountPaid >= inv.totalAmount ? 'Paid' : 'Partially Paid';

    setInvoices((prev) =>
      prev.map((i) =>
        i.invoiceNumber === invoiceNumber
          ? { ...i, amountPaid: newAmountPaid, status: newStatus, paymentMethod }
          : i
      )
    );

    const paymentRef = `PAY-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newPayRecord = {
      id: `cpay-${Date.now()}`,
      paymentReference: paymentRef,
      patientId: inv.patientId,
      patientName: inv.patientName,
      invoiceNumber: inv.invoiceNumber,
      amount: paidAmount,
      paymentMethod,
      date: new Date().toISOString().slice(0, 10),
      status: 'Completed'
    };
    setClinicPayments((prev) => [newPayRecord, ...prev]);
    showToast(`Payment of ₹${paidAmount.toLocaleString('en-IN')} recorded on ${invoiceNumber} (${paymentMethod})`);
    return newPayRecord;
  };

  const requestClinicRefund = (refundData) => {
    const newRefund = {
      ...refundData,
      id: `cref-${Date.now()}`,
      requestReference: `CRFD-2026-${Math.floor(10 + Math.random() * 90)}`,
      requestedAt: new Date().toISOString().slice(0, 10),
      approvalStatus: 'Pending Approval'
    };
    setClinicRefunds((prev) => [newRefund, ...prev]);
    showToast(`Clinic refund request submitted: ${newRefund.requestReference}`);
    return newRefund;
  };

  const approveClinicRefund = (refundId) => {
    setClinicRefunds((prev) =>
      prev.map((r) =>
        r.id === refundId
          ? { ...r, approvalStatus: 'Approved', approvedAt: new Date().toISOString().slice(0, 10) }
          : r
      )
    );
    showToast(`Refund request approved and recorded.`);
  };

  const createClinicExpense = (expenseData) => {
    const newExp = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      clinicId: activeClinicId,
      branchId: activeBranchId,
      date: expenseData.date || new Date().toISOString().slice(0, 10)
    };
    setExpenses((prev) => [newExp, ...prev]);
    showToast(`Clinic expense of ₹${Number(newExp.amount).toLocaleString('en-IN')} recorded.`);
    return newExp;
  };

  const resetDemoData = () => {
    localStorage.removeItem('clinipulse_clinics');
    localStorage.removeItem('clinipulse_plans');
    localStorage.removeItem('clinipulse_saas_invoices');
    localStorage.removeItem('clinipulse_saas_payments');
    localStorage.removeItem('clinipulse_saas_refunds');
    localStorage.removeItem('clinipulse_saas_expenses');
    localStorage.removeItem('clinipulse_clinic_payments');
    localStorage.removeItem('clinipulse_clinic_refunds');
    localStorage.removeItem('clinipulse_doctors');
    localStorage.removeItem('clinipulse_receptionists');
    localStorage.removeItem('clinipulse_feedbacks');
    localStorage.removeItem('clinipulse_feedback_notes');
    localStorage.removeItem('clinipulse_feedback_activities');
    localStorage.removeItem('clinipulse_appointments');
    localStorage.removeItem('clinipulse_patients');
    localStorage.removeItem('clinipulse_prescriptions');
    localStorage.removeItem('clinipulse_invoices');
    localStorage.removeItem('clinipulse_expenses');
    localStorage.removeItem('clinipulse_inventory');
    localStorage.removeItem('clinipulse_inventory_movements');
    localStorage.removeItem('clinipulse_stock_requests');
    localStorage.removeItem('clinipulse_suppliers');
    localStorage.removeItem('clinipulse_purchase_orders');
    localStorage.removeItem('clinipulse_support_tickets');
    localStorage.removeItem('clinipulse_staff_members');
    localStorage.removeItem('clinipulse_encounters');
    localStorage.removeItem('clinipulse_currency');
    localStorage.removeItem('clinipulse_followups');
    setClinics(DEMO_CLINICS);
    setPlans(DEMO_PLANS);
    setSaasInvoices(DEMO_SAAS_INVOICES);
    setSaasPayments(DEMO_SAAS_PAYMENTS);
    setSaasRefunds(DEMO_SAAS_REFUNDS);
    setSaasExpenses(DEMO_SAAS_EXPENSES);
    setClinicPayments(DEMO_CLINIC_PAYMENTS);
    setClinicRefunds(DEMO_CLINIC_REFUNDS);
    localStorage.removeItem('clinipulse_feedback_notes');
    localStorage.removeItem('clinipulse_feedback_activities');
    localStorage.removeItem('clinipulse_appointments');
    localStorage.removeItem('clinipulse_patients');
    localStorage.removeItem('clinipulse_prescriptions');
    localStorage.removeItem('clinipulse_invoices');
    localStorage.removeItem('clinipulse_expenses');
    localStorage.removeItem('clinipulse_inventory');
    localStorage.removeItem('clinipulse_inventory_movements');
    localStorage.removeItem('clinipulse_stock_requests');
    localStorage.removeItem('clinipulse_suppliers');
    localStorage.removeItem('clinipulse_purchase_orders');
    localStorage.removeItem('clinipulse_support_tickets');
    localStorage.removeItem('clinipulse_staff_members');
    localStorage.removeItem('clinipulse_encounters');
    localStorage.removeItem('clinipulse_currency');
    localStorage.removeItem('clinipulse_followups');
    localStorage.removeItem('clinipulse_notifications');
    setClinics(DEMO_CLINICS);
    setPlans(DEMO_PLANS);
    setDoctors(DEMO_DOCTORS);
    setReceptionists(DEMO_RECEPTIONISTS);
    setFeedbacks(DEMO_PATIENT_FEEDBACK);
    setFeedbackNotes(DEMO_FEEDBACK_NOTES);
    setFeedbackActivities(DEMO_FEEDBACK_ACTIVITIES);
    setAppointments(DEMO_APPOINTMENTS);
    setNotifications(DEMO_NOTIFICATIONS);
    setPatients(DEMO_PATIENTS);
    setPrescriptions(DEMO_PRESCRIPTIONS);
    setInvoices(DEMO_INVOICES);
    setExpenses(DEMO_EXPENSES);
    setInventory(DEMO_INVENTORY);
    setInventoryMovements(DEMO_INVENTORY_MOVEMENTS);
    setStockRequests(DEMO_STOCK_REQUESTS);
    setSuppliers(DEMO_SUPPLIERS);
    setPurchaseOrders(DEMO_PURCHASE_ORDERS);
    setSupportTickets(DEMO_SUPPORT_TICKETS);
    setStaffMembers(DEMO_STAFF_MEMBERS);
    setEncounters(DEMO_ENCOUNTERS);
    setCurrency('INR');
    setFollowUps(DEMO_FOLLOW_UPS);
    showToast('Demo data restored to initial state.', 'info');
  };

  const openWhatsAppModal = (payload) => {
    setWhatsAppModal({ isOpen: true, payload });
  };

  const closeWhatsAppModal = () => {
    setWhatsAppModal({ isOpen: false, payload: null });
  };

  const openPrescriptionModal = (prescription) => {
    setPrescriptionModal({ isOpen: true, prescription });
  };

  const closePrescriptionModal = () => {
    setPrescriptionModal({ isOpen: false, prescription: null });
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        activeClinicId,
        activeClinic,
        switchClinic,
        activeBranchId,
        activeBranch,
        switchBranch,
        currency,
        setCurrency,
        formatCurrency,
        clinics,
        setClinics,
        doctors,
        setDoctors,
        addDoctor,
        updateDoctor,
        toggleDoctorStatus,
        deleteDoctor,
        receptionists,
        setReceptionists,
        addReceptionist,
        updateReceptionist,
        toggleReceptionistStatus,
        deleteReceptionist,
        currentReceptionist,
        hasReceptionistPermission,
        staffMembers,
        inviteStaffMember,
        updateStaffRole,
        feedbacks,
        setFeedbacks,
        feedbackNotes,
        setFeedbackNotes,
        feedbackActivities,
        submitPatientFeedback,
        updateFeedbackStatus,
        addFeedbackInternalNote,
        patients,
        createPatient,
        appointments,
        createAppointment,
        updateAppointmentStatus,
        checkSlotAvailability,
        getAvailableSlotsForDoctor,
        submitBookingRequest,
        confirmBookingRequest,
        proposeAlternativeSlot,
        respondToAlternativeSlot,
        rejectBookingRequest,
        checkInPatient,
        startConsultation,
        completeConsultation,
        cancelAppointment,
        rescheduleAppointment,
        notifications,
        addNotification,
        markNotificationAsRead,
<<<<<<< HEAD
        clearAllNotifications,
=======
        isNotificationForCurrentUser,
        markAllNotificationsAsRead,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        prescriptions,
        createPrescription,
        encounters,
        saveEncounterDraft,
        finalizeEncounter,
        invoices,
        createInvoice,
        recordInvoicePayment,
        requestRefund,
        expenses,
        addExpense,
        inventory,
        updateStock,
        addInventoryItem,
        updateInventoryItem,
        adjustStock,
        inventoryMovements,
        stockRequests,
        createStockRequest,
        updateStockRequestStatus,
        suppliers,
        createSupplier,
        purchaseOrders,
        createPurchaseOrder,
        updatePurchaseOrderStatus,
        supportTickets,
        createSupportTicket,
        addTicketMessage,
        updateTicketStatus,
        assignTicket,
        backgroundJobs: DEMO_BACKGROUND_JOBS,
        auditLogs: DEMO_AUDIT_LOGS,
        integrations: DEMO_INTEGRATIONS,
        onboardNewClinic,
        followUps,
        updateFollowUpStatus,
        plans,
        setPlans,
<<<<<<< HEAD
        createPlan,
        updatePlan,
        deletePlan,
        resetPlans,
        upgradeClinicSubscription,
        whatsAppTemplates,
        setWhatsAppTemplates,
        updateWhatsAppTemplate,
        resetWhatsAppTemplates,
=======
        updatePlan,
        upgradeClinicSubscription,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        hasPermission,
        saasInvoices,
        saasPayments,
        saasRefunds,
        saasExpenses,
        recordSaaSPayment,
        requestSaaSRefund,
        addSaaSExpense,
        clinicPayments,
        clinicRefunds,
        recordClinicPayment,
        requestClinicRefund,
        approveClinicRefund,
        createClinicExpense,
<<<<<<< HEAD
        theme,
        setTheme,
        toggleTheme,
        isDark,
=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        toast,
        showToast,
        whatsAppModal,
        openWhatsAppModal,
        closeWhatsAppModal,
        prescriptionModal,
        openPrescriptionModal,
        closePrescriptionModal,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
