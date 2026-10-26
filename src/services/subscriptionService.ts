import { SubscriptionPlan, ClinicSubscription, SubscriptionTier } from '../types';
import { DEMO_PLANS } from '../demo-data';

export const subscriptionService = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    return [...DEMO_PLANS];
  },

  getClinicSubscription: async (clinicId: string): Promise<ClinicSubscription> => {
    return {
      id: `sub-${clinicId}`,
      clinicId,
      planId: 'professional',
      status: 'Trial',
      billingInterval: 'Monthly',
      trialDaysRemaining: 14,
      currentPeriodEnd: '2026-11-06T00:00:00.000Z',
      lastPaymentDate: '2026-10-23',
      lastAmountPaid: 0
    };
  },

  requestPlanChange: async (
    clinicId: string,
    planId: SubscriptionTier,
    interval: 'Monthly' | 'Annual'
  ): Promise<{ success: boolean; message: string }> => {
    return {
      success: true,
      message: `Simulated: Plan upgrade request for ${planId} (${interval}) logged. Ready for payment gateway checkout integration.`
    };
  }
};

