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
  DEMO_RECEIPTS,
  DEMO_NOTIFICATIONS,
  DEMO_VIRTUAL_CONSULTATIONS
} from '../demo-data';
import { ROLE_PERMISSIONS } from '../types';
import { useAuth, toAppRole, toAuthRole } from './AuthContext';
import { getDefaultWebsiteSettings } from '../features/website-builder/websiteBuilderDefaults';
import { broadcastSync, subscribeSync } from '../services/crossTabSync';

const AppContext = createContext(null);

export function AppProvider({ children }) {
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

  // Domain Entity Collections with LocalStorage hydration for smooth demo edits
  const [clinics, setClinics] = useState(() => {
    const s = localStorage.getItem('clinipulse_clinics');
    const raw = s ? JSON.parse(s) : DEMO_CLINICS;
    return raw.map((c) => ({
      ...c,
      websiteSettings: c.websiteSettings || getDefaultWebsiteSettings(c)
    }));
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
    if (!s) return DEMO_STAFF_MEMBERS;
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed) && parsed.length < DEMO_STAFF_MEMBERS.length) {
        const existingIds = new Set(parsed.map((p) => p.id));
        const missing = DEMO_STAFF_MEMBERS.filter((d) => !existingIds.has(d.id));
        return [...parsed, ...missing];
      }
      return parsed;
    } catch {
      return DEMO_STAFF_MEMBERS;
    }
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

  const [receipts, setReceipts] = useState(() => {
    const s = localStorage.getItem('clinipulse_receipts');
    return s ? JSON.parse(s) : DEMO_RECEIPTS;
  });

  const [activePatientId, setActivePatientId] = useState(() => {
    return localStorage.getItem('clinipulse_active_patient_id') || 'pt-1041';
  });

  // Simulated Notifications Center
  const [notifications, setNotifications] = useState(() => {
    const s = localStorage.getItem('clinipulse_notifications');
    return s ? JSON.parse(s) : DEMO_NOTIFICATIONS;
  });

  // Virtual Consulting State
  const [virtualConsultations, setVirtualConsultations] = useState(() => {
    const s = localStorage.getItem('clinipulse_virtual_consultations');
    return s ? JSON.parse(s) : DEMO_VIRTUAL_CONSULTATIONS;
  });

  const requestVirtualConsultation = (reqData) => {
    const newVC = {
      id: `vc-${Date.now().toString().slice(-4)}`,
      patientId: reqData.patientId || auth?.user?.id || 'usr-patient-aarav',
      patientName: reqData.patientName || auth?.user?.name || 'Aarav Patel',
      patientPhone: reqData.patientPhone || auth?.user?.phone || '+91 98765 43210',
      patientAvatar: reqData.patientAvatar || auth?.user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      doctorId: reqData.doctorId || activeDoctor?.id || 'doc-aarav',
      doctorName: reqData.doctorName || activeDoctor?.name || 'Dr. Aarav Mehta',
      doctorSpecialty: reqData.doctorSpecialty || activeDoctor?.specialty || 'General Physician',
      clinicId: reqData.clinicId || activeClinic?.id || 'clinic-citycare',
      clinicName: reqData.clinicName || activeClinic?.name || 'CityCare Family Clinic',
      reason: reqData.reason || 'Virtual Consultation Request',
      status: 'Waiting',
      requestedAt: 'Just now',
      preferredTime: reqData.preferredTime || 'Immediate Live Connect',
      meetingLink: `https://clinicos.health/meet/vc-${Date.now().toString().slice(-4)}-live`,
      notes: '',
      duration: '00:00'
    };

    setVirtualConsultations((prev) => {
      const updated = [newVC, ...prev];
      localStorage.setItem('clinipulse_virtual_consultations', JSON.stringify(updated));
      return updated;
    });

    // Also trigger notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'clinic_admin',
      recipientUserId: 'usr-clinicadmin-aarav',
      clinicId: newVC.clinicId,
      type: 'request_received_by_clinic',
      title: 'Virtual Consultation Requested',
      message: `${newVC.patientName} has requested a virtual consultation: "${newVC.reason}".`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'high'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    if (showToast) {
      showToast(`Virtual consultation requested with ${newVC.doctorName}. Doctor has been notified!`, 'success');
    }
    return newVC;
  };

  const acceptVirtualConsultation = (id) => {
    setVirtualConsultations((prev) => {
      const updated = prev.map((vc) =>
        vc.id === id ? { ...vc, status: 'In Call', duration: '00:01' } : vc
      );
      localStorage.setItem('clinipulse_virtual_consultations', JSON.stringify(updated));
      return updated;
    });
    if (showToast) {
      showToast('Connected to Virtual Consultation room.', 'success');
    }
  };

  const endVirtualConsultation = (id, notes) => {
    setVirtualConsultations((prev) => {
      const updated = prev.map((vc) =>
        vc.id === id ? { ...vc, status: 'Completed', notes: notes || vc.notes } : vc
      );
      localStorage.setItem('clinipulse_virtual_consultations', JSON.stringify(updated));
      return updated;
    });
    if (showToast) {
      showToast('Virtual consultation ended and saved.', 'info');
    }
  };

  const declineVirtualConsultation = (id) => {
    setVirtualConsultations((prev) => {
      const updated = prev.map((vc) =>
        vc.id === id ? { ...vc, status: 'Declined' } : vc
      );
      localStorage.setItem('clinipulse_virtual_consultations', JSON.stringify(updated));
      return updated;
    });
    if (showToast) {
      showToast('Virtual consultation request declined.', 'info');
    }
  };

  // UI Modals & Feedback
  const [toast, setToast] = useState(null);
  const [whatsAppModal, setWhatsAppModal] = useState({ isOpen: false, payload: null });
  const [prescriptionModal, setPrescriptionModal] = useState({ isOpen: false, prescription: null });

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

  useEffect(() => {
    localStorage.setItem('clinipulse_receipts', JSON.stringify(receipts));
  }, [receipts]);

  useEffect(() => {
    localStorage.setItem('clinipulse_active_patient_id', activePatientId);
  }, [activePatientId]);

  // Real-Time Cross-Tab Event Bus Listener (BroadcastChannel + LocalStorage)
  useEffect(() => {
    const unsubscribe = subscribeSync((msg) => {
      if (msg.type === 'APPOINTMENT_UPDATED') {
        const { appointmentId, status, newDate, newTime, newDoctorId } = msg.payload || {};
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointmentId
              ? {
                  ...apt,
                  ...(status ? { status } : {}),
                  ...(newDate ? { date: newDate } : {}),
                  ...(newTime ? { time: newTime } : {}),
                  ...(newDoctorId ? { doctorId: newDoctorId } : {})
                }
              : apt
          )
        );
        showToast('Live Sync: Appointment updated across tabs.', 'info');
      } else if (msg.type === 'PATIENT_CHECKED_IN') {
        const { appointmentId, queueNumber, patientName, doctorName } = msg.payload || {};
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointmentId
              ? {
                  ...apt,
                  status: 'Patient Checked In',
                  queueNumber: queueNumber || apt.queueNumber
                }
              : apt
          )
        );
        showToast(
          `Live Sync: ${patientName || 'Patient'} arrived & checked in (${queueNumber || 'Token assigned'}). Queue updated!`,
          'success'
        );
      } else if (msg.type === 'APPOINTMENT_CANCELLED') {
        const { appointmentId } = msg.payload || {};
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: 'Cancelled' } : apt))
        );
      }
    });

    return () => unsubscribe();
  }, []);

  // Toast Notification Trigger
  const showToast = (message, type = 'success', options = {}) => {
    setToast({
      id: Date.now(),
      message,
      type,
      actionLabel: options.actionLabel,
      onAction: options.onAction
    });
    setTimeout(() => {
      setToast(null);
    }, options.durationMs || 4500);
  };

  // Active Clinic & Branch helpers
  const activeClinic = clinics.find((c) => c.id === activeClinicId) || clinics[0];
  const activeBranch = activeClinic.branches.find((b) => b.id === activeBranchId) || activeClinic.branches[0];

  // Actions
  const switchRole = (role) => {
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

    // Ensure patient exists in patients collection for seamless end-to-end lookup
    let targetPatientId = appointmentData.patientId;
    if (appointmentData.patientName) {
      const existingPt = patients.find(
        (p) =>
          (p.phone && appointmentData.patientPhone && p.phone === appointmentData.patientPhone) ||
          p.id === appointmentData.patientId ||
          p.patientIdNumber === appointmentData.patientId
      );
      if (!existingPt) {
        const seq = Math.floor(1050 + Math.random() * 800);
        targetPatientId = `pt-${seq}`;
        const autoPatient = {
          id: targetPatientId,
          patientIdNumber: `PT-${seq}`,
          name: appointmentData.patientName,
          phone: appointmentData.patientPhone || '',
          email: appointmentData.patientEmail || `${appointmentData.patientName.toLowerCase().replace(/\s+/g, '.')}@example.demo`,
          clinicId: appointmentData.clinicId || activeClinicId,
          registeredAt: appointmentData.date || new Date().toISOString().slice(0, 10),
          status: 'Active',
          gender: 'Unspecified',
          dob: '1995-01-01',
          bloodGroup: 'B+'
        };
        setPatients((prev) => [autoPatient, ...prev]);
      } else {
        targetPatientId = existingPt.id;
      }
    }

    const id = `apt-${Date.now().toString().slice(-5)}`;
    const referenceNumber = `APT-${Math.floor(2000 + Math.random() * 8000)}`;
    const newAppointment = {
      ...appointmentData,
      id,
      patientId: targetPatientId || appointmentData.patientId,
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
    broadcastSync('APPOINTMENT_UPDATED', { appointmentId, status });
    showToast(`Appointment status updated to ${status}`);
  };

  const createPatient = (patientData) => {
    const seq = Math.floor(1050 + Math.random() * 800);
    const newPatient = {
      ...patientData,
      id: patientData.id || `pt-${seq}`,
      patientIdNumber: patientData.patientIdNumber || `PT-${seq}`,
      clinicId: patientData.clinicId || activeClinicId,
      registeredAt: patientData.registeredAt || new Date().toISOString().slice(0, 10),
      status: patientData.status || 'Active'
    };
    setPatients((prev) => [newPatient, ...prev]);
    setActivePatientId(newPatient.id);
    localStorage.setItem('clinipulse_active_patient_id', newPatient.id);
    if (currentRole === 'patient') {
      setCurrentUser({
        id: newPatient.id,
        name: newPatient.name,
        email: newPatient.email,
        phone: newPatient.phone,
        role: 'patient',
        patientIdNumber: newPatient.patientIdNumber,
        bloodGroup: newPatient.bloodGroup,
        allergies: newPatient.allergies,
        dob: newPatient.dob,
        gender: newPatient.gender,
        emergencyContact: newPatient.emergencyContact,
        address: newPatient.address
      });
    }
    showToast(`Patient ${newPatient.name} registered (ID: ${newPatient.patientIdNumber})`);
    return newPatient;
  };

  const updatePatient = (patientId, updates) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId || p.patientIdNumber === patientId ? { ...p, ...updates } : p))
    );
    showToast(`Updated profile for ${updates.name || 'patient'}`);
  };

  const switchDemoPatient = (patientId) => {
    const pt = patients.find((p) => p.id === patientId || p.patientIdNumber === patientId);
    if (!pt) return;
    setActivePatientId(pt.id);
    localStorage.setItem('clinipulse_active_patient_id', pt.id);
    if (currentRole === 'patient') {
      setCurrentUser({
        id: pt.id,
        name: pt.name,
        email: pt.email,
        phone: pt.phone,
        role: 'patient',
        patientIdNumber: pt.patientIdNumber || pt.id,
        bloodGroup: pt.bloodGroup,
        allergies: pt.allergies,
        dob: pt.dob,
        gender: pt.gender,
        address: pt.address
      });
    }
    showToast(`Switched active patient: ${pt.name} (${pt.patientIdNumber || pt.id})`);
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
    if (feedbackData.appointmentId && feedbacks.some((f) => f.appointmentId === feedbackData.appointmentId)) {
      showToast('Feedback has already been recorded for this appointment.', 'warning');
      return null;
    }
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

    // Broadcast check-in to doctor / reception tabs
    broadcastSync('PATIENT_CHECKED_IN', {
      appointmentId,
      queueNumber: queueSeq,
      patientName: apt.patientName,
      doctorName: apt.doctorName
    });

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

    const previousStatus = apt.status;

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

    broadcastSync('APPOINTMENT_CANCELLED', { appointmentId, reason });

    showToast(`Appointment ${apt.referenceNumber || ''} cancelled.`, 'warning', {
      actionLabel: 'Undo',
      durationMs: 5000,
      onAction: () => {
        setAppointments((prev) =>
          prev.map((a) => (a.id === appointmentId ? { ...a, status: previousStatus } : a))
        );
        broadcastSync('APPOINTMENT_UPDATED', { appointmentId, status: previousStatus });
        showToast('Cancellation undone successfully!', 'success');
      }
    });
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

  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared.');
  };

  // Staff Management
  const addStaffMember = (staffData) => {
    const newStaff = {
      id: staffData.id || `stf-${Date.now()}`,
      clinicId: staffData.clinicId || activeClinicId || 'clinic-citycare',
      branchIds: staffData.branchIds || [activeBranchId || 'branch-citycare-main'],
      name: staffData.name,
      email: staffData.email,
      phone: staffData.phone,
      role: staffData.role || 'doctor',
      department: staffData.department || (staffData.role === 'doctor' ? 'General Medicine' : 'Administration'),
      status: staffData.status || 'Active',
      shift: staffData.shift || '09:00 - 18:00',
      joinedDate: staffData.joinedDate || new Date().toISOString().slice(0, 10),
      qualifications: staffData.qualifications || '',
      registrationNumber: staffData.registrationNumber || '',
      avatar: staffData.avatar || '',
      experienceYears: Number(staffData.experienceYears) || 5,
      notes: staffData.notes || ''
    };

    setStaffMembers((prev) => [newStaff, ...prev]);

    // If role is doctor, sync into doctors list so appointments & rosters recognize them
    if (newStaff.role === 'doctor') {
      const alreadyDoctor = doctors.some(
        (d) => d.email?.toLowerCase() === newStaff.email?.toLowerCase() || d.name?.toLowerCase() === newStaff.name?.toLowerCase()
      );
      if (!alreadyDoctor) {
        const newDoc = {
          id: `doc-${Date.now()}`,
          doctorIdNumber: `DOC-${Math.floor(100 + Math.random() * 900)}`,
          clinicId: newStaff.clinicId,
          clinicName: activeClinic?.name || 'CityCare Family Clinic',
          branchIds: newStaff.branchIds,
          name: newStaff.name,
          specialty: newStaff.department,
          qualifications: newStaff.qualifications || 'MBBS',
          registrationNumber: newStaff.registrationNumber || `MDC-${Date.now().toString().slice(-5)}`,
          experienceYears: newStaff.experienceYears,
          consultationFee: staffData.consultationFee || 500,
          email: newStaff.email,
          phone: newStaff.phone,
          status: 'Active',
          avatar: newStaff.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
          bio: newStaff.notes || `${newStaff.name} is a specialist in ${newStaff.department}.`
        };
        setDoctors((prev) => [newDoc, ...prev]);
      }
    }

    // If role is receptionist, sync into receptionists list
    if (newStaff.role === 'receptionist') {
      const alreadyRec = receptionists.some(
        (r) => r.email?.toLowerCase() === newStaff.email?.toLowerCase()
      );
      if (!alreadyRec) {
        const newRec = {
          id: `rec-${Date.now()}`,
          staffIdNumber: `REC-${Math.floor(100 + Math.random() * 900)}`,
          clinicId: newStaff.clinicId,
          branchIds: newStaff.branchIds,
          name: newStaff.name,
          email: newStaff.email,
          phone: newStaff.phone,
          shift: newStaff.shift,
          workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          permissions: ['register_patients', 'manage_appointments', 'check_in_patients'],
          status: 'Active',
          joiningDate: newStaff.joinedDate,
          createdAt: newStaff.joinedDate
        };
        setReceptionists((prev) => [newRec, ...prev]);
      }
    }

    showToast(`Staff member "${newStaff.name}" added to clinic team.`);
    return newStaff;
  };

  const updateStaffMember = (staffId, updates) => {
    let updatedMember = null;
    setStaffMembers((prev) =>
      prev.map((s) => {
        if (s.id === staffId) {
          updatedMember = { ...s, ...updates };
          return updatedMember;
        }
        return s;
      })
    );

    if (updatedMember) {
      if (updatedMember.role === 'doctor') {
        setDoctors((prev) =>
          prev.map((d) =>
            d.email === updatedMember.email || d.name === updatedMember.name
              ? {
                  ...d,
                  name: updatedMember.name,
                  email: updatedMember.email,
                  phone: updatedMember.phone,
                  specialty: updatedMember.department || d.specialty,
                  qualifications: updatedMember.qualifications || d.qualifications,
                  registrationNumber: updatedMember.registrationNumber || d.registrationNumber,
                  status: updatedMember.status === 'Active' ? 'Active' : 'Inactive'
                }
              : d
          )
        );
      } else if (updatedMember.role === 'receptionist') {
        setReceptionists((prev) =>
          prev.map((r) =>
            r.email === updatedMember.email || r.name === updatedMember.name
              ? {
                  ...r,
                  name: updatedMember.name,
                  email: updatedMember.email,
                  phone: updatedMember.phone,
                  shift: updatedMember.shift || r.shift,
                  status: updatedMember.status === 'Active' ? 'Active' : 'Inactive'
                }
              : r
          )
        );
      }
    }

    showToast('Staff profile updated successfully.');
  };

  const deleteStaffMember = (staffId) => {
    const target = staffMembers.find((s) => s.id === staffId);
    if (!target) return { success: false, error: 'Staff member not found.' };

    if (
      target.id === 'stf-1' ||
      target.email === currentUser?.email ||
      target.name.toLowerCase().includes('aarav mehta')
    ) {
      showToast('Cannot delete the primary clinic administrator account.', 'error');
      return { success: false, error: 'Cannot delete primary clinic administrator.' };
    }

    setStaffMembers((prev) => prev.filter((s) => s.id !== staffId));

    if (target.role === 'doctor') {
      setDoctors((prev) => prev.filter((d) => d.email !== target.email && d.name !== target.name));
    } else if (target.role === 'receptionist') {
      setReceptionists((prev) => prev.filter((r) => r.email !== target.email && r.name !== target.name));
    }

    showToast(`Staff member "${target.name}" removed from clinic.`);
    return { success: true };
  };

  const toggleStaffStatus = (staffId, newStatus) => {
    setStaffMembers((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, status: newStatus } : s))
    );
    showToast(`Staff status updated to ${newStatus}.`);
  };

  const inviteStaffMember = (staffData) => {
    return addStaffMember(staffData);
  };

  const updateStaffRole = (staffId, newRole) => {
    setStaffMembers((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, role: newRole } : s))
    );
    showToast('Staff role privileges updated.');
  };

  // Billing & Payments
  const recordInvoicePayment = (invoiceId, amountPaid, paymentMethod = 'UPI / QR Scan', transactionRef = '') => {
    return recordClinicPayment(invoiceId, paymentMethod, amountPaid, transactionRef);
  };

  const requestRefund = (invoiceId, reason) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Refunded' } : inv))
    );
    showToast(`Refund processed for invoice. Reason: ${reason || 'Patient request'}.`);
  };

  // Demo Onboarding
  const onboardNewClinic = (onboardingData) => {
    const clinicId = `clinic-${onboardingData.clinicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
    const branchId = `branch-${clinicId}-main`;

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
    setActiveClinicId(clinicId);
    setActiveBranchId(branchId);
    switchRole('clinic_admin');
    showToast(`🎉 Welcome to ClinicOS! ${newClinic.name} created on 14-day ${onboardingData.planId?.toUpperCase() || 'PRO'} trial.`);
    return newClinic;
  };

  const createPlan = (newPlan) => {
    setPlans((prev) => {
      const next = [...prev, newPlan];
      localStorage.setItem('clinipulse_plans', JSON.stringify(next));
      return next;
    });
    showToast(`Plan "${newPlan.name}" created successfully!`, 'success');
  };

  const deletePlan = (planId) => {
    setPlans((prev) => {
      const next = prev.filter((p) => p.id !== planId);
      localStorage.setItem('clinipulse_plans', JSON.stringify(next));
      return next;
    });
    showToast(`Plan deleted successfully.`, 'info');
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
  };

  const updateClinic = (clinicId, updates) => {
    setClinics((prev) => {
      const next = prev.map((c) => (c.id === clinicId ? { ...c, ...updates } : c));
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });
    showToast('Clinic profile updated successfully.', 'success');
  };

  const updateClinicWebsite = (clinicIdOrUpdates, maybeUpdates) => {
    let targetClinicId = clinicIdOrUpdates;
    let websiteUpdates = maybeUpdates;
    if (typeof clinicIdOrUpdates === 'object' && clinicIdOrUpdates !== null && maybeUpdates === undefined) {
      targetClinicId = activeClinicId;
      websiteUpdates = clinicIdOrUpdates;
    }

    setClinics((prev) => {
      const next = prev.map((c) => {
        if (c.id !== targetClinicId) return c;
        const currentWebsite = c.websiteSettings || getDefaultWebsiteSettings(c);
        return {
          ...c,
          websiteSettings: {
            ...currentWebsite,
            ...websiteUpdates,
            status: websiteUpdates.status || (currentWebsite.status === 'published' ? 'changes_pending' : currentWebsite.status)
          }
        };
      });
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });
  };

  const saveClinicWebsiteDraft = (clinicId, draftSettings) => {
    setClinics((prev) => {
      const next = prev.map((c) => {
        if (c.id !== clinicId) return c;
        const currentWebsite = c.websiteSettings || getDefaultWebsiteSettings(c);
        return {
          ...c,
          websiteSettings: {
            ...currentWebsite,
            ...draftSettings,
            status: 'draft'
          }
        };
      });
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });
    showToast('Website changes saved as draft.', 'info');
  };

  const publishClinicWebsite = (clinicId) => {
    setClinics((prev) => {
      const next = prev.map((c) => {
        if (c.id !== clinicId) return c;
        const currentWebsite = c.websiteSettings || getDefaultWebsiteSettings(c);
        return {
          ...c,
          websiteSettings: {
            ...currentWebsite,
            status: 'published',
            publishedAt: new Date().toISOString()
          }
        };
      });
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });
    showToast('🎉 Website published! Patients can now discover your services and book online.', 'success');
  };

  const unpublishClinicWebsite = (clinicId) => {
    setClinics((prev) => {
      const next = prev.map((c) => {
        if (c.id !== clinicId) return c;
        const currentWebsite = c.websiteSettings || getDefaultWebsiteSettings(c);
        return {
          ...c,
          websiteSettings: {
            ...currentWebsite,
            status: 'draft'
          }
        };
      });
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });
    showToast('Website unpublished and set to private draft mode.', 'info');
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
  const recordClinicPayment = (invoiceNumber, paymentMethod = 'UPI QR', amount, transactionRef = '') => {
    const inv = invoices.find(
      (i) => i.invoiceNumber === invoiceNumber || i.id === invoiceNumber
    );
    if (!inv) {
      showToast(`Invoice ${invoiceNumber} not found`, 'error');
      return null;
    }
    const currentPaid = Number(inv.amountPaid) || 0;
    const remaining = Math.max(0, inv.totalAmount - currentPaid);
    if (remaining <= 0) {
      showToast(`Invoice ${inv.invoiceNumber} is already fully paid.`, 'info');
      return null;
    }
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      showToast('Payment amount must be greater than zero.', 'error');
      return null;
    }
    const paidAmount = Math.min(numAmount, remaining);
    const newAmountPaid = currentPaid + paidAmount;
    const newOutstanding = Math.max(0, inv.totalAmount - newAmountPaid);
    const newStatus = newOutstanding === 0 ? 'Paid' : 'Partially Paid';

    setInvoices((prev) =>
      prev.map((i) =>
        i.invoiceNumber === inv.invoiceNumber || i.id === inv.id
          ? {
              ...i,
              amountPaid: newAmountPaid,
              outstandingBalance: newOutstanding,
              status: newStatus,
              paymentMethod
            }
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
      transactionRef: transactionRef || '',
      date: new Date().toISOString().slice(0, 10),
      status: 'Completed'
    };
    setClinicPayments((prev) => [newPayRecord, ...prev]);

    const rSeq = Math.floor(1000 + Math.random() * 9000);
    const newReceipt = {
      id: `rcp-${Date.now()}`,
      receiptNumber: `RCP-2026-${rSeq}`,
      paymentReference: paymentRef,
      invoiceNumber: inv.invoiceNumber,
      invoiceId: inv.id,
      patientId: inv.patientId,
      patientName: inv.patientName,
      amount: paidAmount,
      paymentMethod,
      transactionRef: transactionRef || '',
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      clinicId: inv.clinicId || activeClinicId,
      clinicName: activeClinic?.name || 'CityCare Family Practice',
      branchId: inv.branchId || activeBranchId,
      issuedBy: currentUser?.name || 'Front Desk Cashier',
      status: 'Issued',
      notes: `Settlement for ${inv.items?.[0]?.description || 'OPD Consultation'}`
    };
    setReceipts((prev) => [newReceipt, ...prev]);

    showToast(`Payment of ₹${paidAmount.toLocaleString('en-IN')} recorded! Receipt #${newReceipt.receiptNumber} generated.`);
    return { payment: newPayRecord, receipt: newReceipt };
  };

  // Synchronized Doctor Fee Settlement from Patient Portal / Clinic
  const payDoctorConsultationFee = (appointmentId, paymentMethod = 'UPI / QR Scan', transactionRef = '') => {
    const apt = appointments.find(
      (a) => a.id === appointmentId || a.referenceNumber === appointmentId || a.requestId === appointmentId
    );
    if (!apt) {
      showToast('Appointment record not found for fee settlement.', 'error');
      return null;
    }

    const fee = Number(apt.consultationFee) || 600;
    const dateStr = new Date().toISOString().slice(0, 10);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const payRef = transactionRef || `UPI-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // 1. Update appointment payment status across platform
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === apt.id
          ? {
              ...a,
              paymentStatus: 'Paid',
              amountPaid: fee,
              paidAt: `${dateStr} ${timeStr}`,
              paymentMethod,
              transactionRef: payRef,
              paymentReference: payRef
            }
          : a
      )
    );

    // 2. Synchronize or create matching invoice
    let matchedInv = invoices.find(
      (i) =>
        i.appointmentId === apt.id ||
        (apt.referenceNumber && i.referenceNumber === apt.referenceNumber) ||
        (i.patientId === apt.patientId && i.date === (apt.confirmedDate || apt.date))
    );

    const invNum = matchedInv ? matchedInv.invoiceNumber : `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    if (matchedInv) {
      setInvoices((prev) =>
        prev.map((i) =>
          i.id === matchedInv.id
            ? {
                ...i,
                amountPaid: i.totalAmount || fee,
                outstandingBalance: 0,
                status: 'Paid',
                paymentMethod,
                paidAt: `${dateStr} ${timeStr}`,
                transactionRef: payRef
              }
            : i
        )
      );
    } else {
      const newInv = {
        id: `inv-${Date.now()}`,
        invoiceNumber: invNum,
        clinicId: apt.clinicId || activeClinicId,
        branchId: apt.branchId || activeBranchId,
        patientId: apt.patientId,
        patientName: apt.patientName,
        patientPhone: apt.patientPhone,
        appointmentId: apt.id,
        referenceNumber: apt.referenceNumber || apt.requestId,
        date: dateStr,
        dueDate: dateStr,
        items: [
          {
            id: `item-${Date.now()}`,
            description: `${apt.serviceName || 'OPD Consultation'} with Dr. ${apt.doctorName || 'Doctor'}`,
            quantity: 1,
            unitPrice: fee,
            total: fee
          }
        ],
        subtotal: fee,
        discount: 0,
        tax: 0,
        totalAmount: fee,
        amountPaid: fee,
        outstandingBalance: 0,
        status: 'Paid',
        paymentMethod,
        paidAt: `${dateStr} ${timeStr}`
      };
      setInvoices((prev) => [newInv, ...prev]);
    }

    // 3. Record in clinicPayments
    const newPayRecord = {
      id: `cpay-${Date.now()}`,
      paymentReference: payRef,
      patientId: apt.patientId,
      patientName: apt.patientName,
      invoiceNumber: invNum,
      appointmentId: apt.id,
      amount: fee,
      paymentMethod,
      transactionRef: payRef,
      date: dateStr,
      status: 'Completed'
    };
    setClinicPayments((prev) => [newPayRecord, ...prev]);

    // 4. Generate official Receipt for Patient & Clinic
    const rSeq = Math.floor(1000 + Math.random() * 9000);
    const newReceipt = {
      id: `rcp-${Date.now()}`,
      receiptNumber: `RCP-2026-${rSeq}`,
      paymentReference: payRef,
      invoiceNumber: invNum,
      appointmentId: apt.id,
      patientId: apt.patientId,
      patientName: apt.patientName,
      amount: fee,
      paymentMethod,
      transactionRef: payRef,
      date: dateStr,
      time: timeStr,
      clinicId: apt.clinicId || activeClinicId,
      clinicName: apt.clinicName || activeClinic?.name || 'CityCare Family Practice',
      branchId: apt.branchId || activeBranchId,
      issuedBy: 'Patient Self-Service Payment Gateway',
      status: 'Issued',
      notes: `Consultation fee settlement for Dr. ${apt.doctorName} (${apt.serviceName || 'OPD Consultation'})`
    };
    setReceipts((prev) => [newReceipt, ...prev]);

    showToast(`Payment of ₹${fee.toLocaleString('en-IN')} paid to Dr. ${apt.doctorName}! Receipt #${newReceipt.receiptNumber} generated.`);
    return { success: true, receipt: newReceipt, payment: newPayRecord };
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
        setStaffMembers,
        addStaffMember,
        updateStaffMember,
        deleteStaffMember,
        toggleStaffStatus,
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
        updatePatient,
        activePatientId,
        setActivePatientId,
        switchDemoPatient,
        receipts,
        setReceipts,
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
        clearAllNotifications,
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
        createPlan,
        deletePlan,
        updatePlan,
        upgradeClinicSubscription,
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
        payDoctorConsultationFee,
        requestClinicRefund,
        approveClinicRefund,
        createClinicExpense,
        updateClinic,
        updateClinicWebsite,
        saveClinicWebsiteDraft,
        publishClinicWebsite,
        unpublishClinicWebsite,
        toast,
        showToast,
        whatsAppModal,
        openWhatsAppModal,
        closeWhatsAppModal,
        prescriptionModal,
        openPrescriptionModal,
        closePrescriptionModal,
        virtualConsultations,
        requestVirtualConsultation,
        acceptVirtualConsultation,
        endVirtualConsultation,
        declineVirtualConsultation,
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

