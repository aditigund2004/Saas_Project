import { useState, useEffect } from 'react';

export interface DashboardWidget {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  order: number;
}

const DEFAULT_LAYOUTS: Record<string, DashboardWidget[]> = {
  doctor_admin: [
    { id: 'metrics', title: 'Daily Clinical Metrics', description: 'Appointments, queue size, revenue, follow-ups', visible: true, order: 0 },
    { id: 'queue', title: 'Live Patient Waiting Lounge', description: 'Patient token status and call-in controls', visible: true, order: 1 },
    { id: 'appointments', title: 'Today’s Consultation Schedule', description: 'Time slots and confirmed bookings', visible: true, order: 2 },
    { id: 'inventory', title: 'Low Stock & 60-Day Expiry Alerts', description: 'Pharmacy inventory triage alerts', visible: true, order: 3 },
    { id: 'revenue', title: 'Weekly Revenue & GST Breakdown', description: 'Clinic collections and mode distribution', visible: true, order: 4 }
  ],
  receptionist_manager: [
    { id: 'stats', title: 'Front Desk Pulse', description: 'Waiting patients, pending check-ins, doctors active', visible: true, order: 0 },
    { id: 'queue', title: 'Waiting Lounge Queue', description: 'Real-time patient call list and arrival tokens', visible: true, order: 1 },
    { id: 'walkin', title: 'Express Walk-In Desk', description: 'Rapid patient intake generator', visible: true, order: 2 },
    { id: 'doctors', title: 'Clinician Duty Rosters', description: 'Doctor chair allocation and status', visible: true, order: 3 }
  ],
  superadmin: [
    { id: 'saas_metrics', title: 'Platform Financial Telemetry', description: 'MRR, ARR, churn, active clinics', visible: true, order: 0 },
    { id: 'growth_chart', title: 'Recurring Revenue Trajectory', description: 'Monthly MRR expansion and subscriptions', visible: true, order: 1 },
    { id: 'tenants', title: 'Clinic Tenant Health', description: 'Branch counts, doctor limits, status', visible: true, order: 2 },
    { id: 'support', title: 'Priority Support Desk', description: 'Open clinic tickets and SLA triage', visible: true, order: 3 }
  ],
  patient: [
    { id: 'next_visit', title: 'Next Scheduled Consultation', description: 'Doctor, time, room, and directions', visible: true, order: 0 },
    { id: 'active_meds', title: 'Active Prescriptions', description: 'Dosage instructions and AI guide', visible: true, order: 1 },
    { id: 'vitals_summary', title: 'Vitals & Health Metrics', description: 'Recent blood pressure and pulse', visible: true, order: 2 },
    { id: 'billing_status', title: 'Outstanding Bills & Receipts', description: 'Pending clinic fees and tax receipts', visible: true, order: 3 }
  ]
};

export function useDashboardLayout(role: string = 'doctor_admin') {
  const normalizedRole =
    role === 'clinic_admin' || role === 'doctor'
      ? 'doctor_admin'
      : role === 'receptionist'
      ? 'receptionist_manager'
      : role === 'super_admin'
      ? 'superadmin'
      : role;

  const storageKey = `clinicos_dash_layout_${normalizedRole}`;

  const [widgets, setWidgets] = useState<DashboardWidget[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_LAYOUTS[normalizedRole] || DEFAULT_LAYOUTS.doctor_admin;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(widgets));
    } catch {}
  }, [widgets, storageKey]);

  const toggleWidget = (widgetId: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === widgetId ? { ...w, visible: !w.visible } : w))
    );
  };

  const moveWidget = (widgetId: string, direction: 'up' | 'down') => {
    setWidgets((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((w) => w.id === widgetId);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;

      const tempOrder = sorted[index].order;
      sorted[index].order = sorted[targetIndex].order;
      sorted[targetIndex].order = tempOrder;

      return [...sorted];
    });
  };

  const resetToDefault = () => {
    const defaultWidgets = DEFAULT_LAYOUTS[normalizedRole] || DEFAULT_LAYOUTS.doctor_admin;
    setWidgets(defaultWidgets);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  };

  const isWidgetVisible = (widgetId: string): boolean => {
    const w = widgets.find((item) => item.id === widgetId);
    return w ? w.visible : true;
  };

  return {
    widgets: [...widgets].sort((a, b) => a.order - b.order),
    toggleWidget,
    moveWidget,
    resetToDefault,
    isWidgetVisible
  };
}

