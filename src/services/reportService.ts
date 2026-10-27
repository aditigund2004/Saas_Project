import { DEMO_PLATFORM_METRICS } from '../demo-data';
import { PlatformMetric } from '../types';

export interface ClinicAnalytics {
  totalPatients: number;
  newRegistrationsMonth: number;
  appointmentsToday: number;
  completedThisMonth: number;
  cancelledThisMonth: number;
  noShowThisMonth: number;
  revenueThisMonth: number;
  expensesThisMonth: number;
  netIncomeMonth: number;
  outstandingBalance: number;
  weeklyTrend: { day: string; appointments: number; revenue: number }[];
  specialtyBreakdown: { name: string; count: number }[];
}

export const reportService = {
  getClinicAnalytics: async (_clinicId: string, _branchId?: string): Promise<ClinicAnalytics> => {
    return {
      totalPatients: 348,
      newRegistrationsMonth: 42,
      appointmentsToday: 7,
      completedThisMonth: 128,
      cancelledThisMonth: 8,
      noShowThisMonth: 3,
      revenueThisMonth: 214500,
      expensesThisMonth: 68400,
      netIncomeMonth: 146100,
      outstandingBalance: 18500,
      weeklyTrend: [
        { day: 'Mon', appointments: 18, revenue: 26000 },
        { day: 'Tue', appointments: 22, revenue: 34000 },
        { day: 'Wed', appointments: 25, revenue: 41000 },
        { day: 'Thu', appointments: 19, revenue: 29500 },
        { day: 'Fri', appointments: 24, revenue: 38000 },
        { day: 'Sat', appointments: 28, revenue: 46000 }
      ],
      specialtyBreakdown: [
        { name: 'Endodontics', count: 48 },
        { name: 'Orthodontics', count: 36 },
        { name: 'Oral Hygiene', count: 28 },
        { name: 'Prosthetics', count: 16 }
      ]
    };
  },

  getPlatformMetrics: async (): Promise<PlatformMetric> => {
    return { ...DEMO_PLATFORM_METRICS };
  }
};

