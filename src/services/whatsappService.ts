import { WhatsAppNotification, WhatsAppStatus } from '../types';
import { DEMO_WHATSAPP_NOTIFICATIONS } from '../demo-data';

export interface WhatsAppTemplateVariables {
  patient_name: string;
  clinic_name: string;
  appointment_date: string;
  appointment_time: string;
  doctor_name: string;
  appointment_reference: string;
  clinic_phone?: string;
}

export const WHATSAPP_TEMPLATES = {
  booking_confirmation: {
    title: 'Booking Confirmation',
    template:
      'Hello {{patient_name}}, your appointment at {{clinic_name}} is confirmed for {{appointment_date}} at {{appointment_time}} with {{doctor_name}}. Appointment reference: {{appointment_reference}}. Please arrive 10 minutes prior to your time slot. Contact {{clinic_phone}} if you need changes.'
  },
  reminder: {
    title: '24-Hour Appointment Reminder',
    template:
      'Reminder from {{clinic_name}}: Hello {{patient_name}}, your scheduled consultation with {{doctor_name}} is tomorrow, {{appointment_date}} at {{appointment_time}} (Ref: {{appointment_reference}}). Reply 1 to CONFIRM or 2 to RESCHEDULE.'
  },
  reschedule: {
    title: 'Appointment Rescheduled',
    template:
      'Update from {{clinic_name}}: Hello {{patient_name}}, your appointment (Ref: {{appointment_reference}}) with {{doctor_name}} has been updated to {{appointment_date}} at {{appointment_time}}. Please reach out if this does not suit your schedule.'
  },
  cancellation: {
    title: 'Appointment Cancellation',
    template:
      'Notice from {{clinic_name}}: Hello {{patient_name}}, your appointment (Ref: {{appointment_reference}}) for {{appointment_date}} has been cancelled. To book a new consultation, visit our online clinic portal.'
  },
  follow_up: {
    title: 'Clinical Follow-Up Care',
    template:
      'Health Check from {{clinic_name}}: Hello {{patient_name}}, {{doctor_name}} has scheduled your post-consultation review for {{appointment_date}}. Please reply to reserve your follow-up slot or report any ongoing symptoms.'
  }
};

export const whatsappService = {
  getTemplatePreview: (
    type: keyof typeof WHATSAPP_TEMPLATES,
    vars: WhatsAppTemplateVariables
  ): string => {
    let text = WHATSAPP_TEMPLATES[type]?.template || '';
    Object.entries(vars).forEach(([key, val]) => {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), val || '');
    });
    return text;
  },

  getNotifications: async (clinicId?: string): Promise<WhatsAppNotification[]> => {
    if (clinicId) {
      return DEMO_WHATSAPP_NOTIFICATIONS.filter((n) => n.clinicId === clinicId);
    }
    return [...DEMO_WHATSAPP_NOTIFICATIONS];
  },

  simulateSend: async (
    notification: Omit<WhatsAppNotification, 'id' | 'status' | 'sentAt' | 'deliveredAt'>
  ): Promise<WhatsAppNotification> => {
    const id = `wa-sim-${Date.now()}`;
    const sentAt = new Date().toISOString();
    // Simulate immediate provider dispatch
    return {
      ...notification,
      id,
      status: 'delivered',
      sentAt,
      deliveredAt: new Date(Date.now() + 2000).toISOString()
    };
  },

  retryNotification: async (id: string): Promise<WhatsAppStatus> => {
    await new Promise((res) => setTimeout(res, 300));
    return 'delivered';
  }
};

