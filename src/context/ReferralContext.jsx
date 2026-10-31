import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_AFFILIATES,
  INITIAL_COMMISSION_RULES,
  INITIAL_REFERRAL_CODES,
  INITIAL_REFERRALS,
  INITIAL_COMMISSION_LEDGER,
  INITIAL_PAYOUTS,
  MONTHLY_REFERRAL_ANALYTICS
} from '../demo-data/referralAffiliateData';
import { useApp } from './AppContext';

const ReferralContext = createContext(null);

const STORAGE_KEY = 'clinicos_referral_state_v1';

export function ReferralProvider({ children }) {
  const { showToast } = useApp() || { showToast: () => {} };

  // Load from localStorage or initial defaults
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse referral state from localStorage:', e);
    }
    return {
      affiliates: INITIAL_AFFILIATES,
      commissionRules: INITIAL_COMMISSION_RULES,
      referralCodes: INITIAL_REFERRAL_CODES,
      referrals: INITIAL_REFERRALS,
      commissionLedger: INITIAL_COMMISSION_LEDGER,
      payouts: INITIAL_PAYOUTS,
      monthlyAnalytics: MONTHLY_REFERRAL_ANALYTICS
    };
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save referral state to localStorage:', e);
    }
  }, [state]);

  const {
    affiliates,
    commissionRules,
    referralCodes,
    referrals,
    commissionLedger,
    payouts,
    monthlyAnalytics
  } = state;

  // Key Dashboard Statistics
  const stats = useMemo(() => {
    const totalAffiliates = affiliates.length;
    const activeAffiliates = affiliates.filter((a) => a.status === 'Active').length;
    const totalReferredHospitals = referrals.length;
    const convertedHospitals = referrals.filter((r) => r.referralStatus === 'Converted').length;
    const conversionRate = totalReferredHospitals > 0
      ? Math.round((convertedHospitals / totalReferredHospitals) * 100)
      : 0;

    const eligibleReferralRevenue = referrals
      .filter((r) => r.referralStatus === 'Converted')
      .reduce((sum, r) => sum + (Number(r.subscriptionAmount) || 0), 0);

    const totalCommissionEarned = commissionLedger
      .filter((l) => l.status === 'Paid' || l.status === 'Approved' || l.status === 'Pending')
      .reduce((sum, l) => sum + (Number(l.commissionAmount) || 0), 0);

    const pendingCommission = commissionLedger
      .filter((l) => l.status === 'Pending')
      .reduce((sum, l) => sum + (Number(l.commissionAmount) || 0), 0);

    const approvedCommission = commissionLedger
      .filter((l) => l.status === 'Approved')
      .reduce((sum, l) => sum + (Number(l.commissionAmount) || 0), 0);

    const totalPaidCommission = commissionLedger
      .filter((l) => l.status === 'Paid')
      .reduce((sum, l) => sum + (Number(l.commissionAmount) || 0), 0);

    return {
      totalAffiliates,
      activeAffiliates,
      totalReferredHospitals,
      convertedHospitals,
      conversionRate,
      eligibleReferralRevenue,
      totalCommissionEarned,
      pendingCommission,
      approvedCommission,
      totalPaidCommission
    };
  }, [affiliates, referrals, commissionLedger]);

  // Affiliate Partner CRUD
  const addAffiliate = (affiliateData) => {
    const nextIdNum = 101 + affiliates.length;
    const newId = `AFF-${nextIdNum}`;
    const generatedCode = affiliateData.referralCode?.toUpperCase().replace(/\s+/g, '-') ||
      `REF-${affiliateData.name.split(' ')[0].toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newAffiliate = {
      id: newId,
      name: affiliateData.name,
      company: affiliateData.company || affiliateData.name,
      partnerType: affiliateData.partnerType || 'Healthcare Consultant',
      email: affiliateData.email,
      phone: affiliateData.phone || '',
      referralCode: generatedCode,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      referredHospitalsCount: 0,
      convertedHospitalsCount: 0,
      totalCommissionEarned: 0,
      paidCommission: 0,
      pendingCommission: 0,
      availableBalance: 0,
      payoutMethod: affiliateData.payoutMethod || 'Bank Transfer (NEFT/IMPS)',
      bankDetails: {
        accountHolder: affiliateData.accountHolder || affiliateData.name,
        bankName: affiliateData.bankName || 'HDFC Bank Ltd',
        accountNumber: affiliateData.accountNumber || '501000000000',
        ifscCode: affiliateData.ifscCode || 'HDFC0001234',
        upiId: affiliateData.upiId || ''
      },
      ruleId: affiliateData.ruleId || 'RULE-PERC-15'
    };

    // Auto-create matching referral code
    const newCodeRecord = {
      code: generatedCode,
      affiliateId: newId,
      affiliateName: newAffiliate.name,
      customSlug: generatedCode.toLowerCase(),
      referralUrl: `https://clinicos.app/register/clinic?ref=${generatedCode}`,
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      usageLimit: 50,
      usageCount: 0,
      status: 'Active'
    };

    setState((prev) => ({
      ...prev,
      affiliates: [newAffiliate, ...prev.affiliates],
      referralCodes: [newCodeRecord, ...prev.referralCodes]
    }));

    showToast(`Affiliate partner "${newAffiliate.name}" enrolled with code ${generatedCode}!`, 'success');
    return newAffiliate;
  };

  const updateAffiliate = (id, updates) => {
    setState((prev) => ({
      ...prev,
      affiliates: prev.affiliates.map((a) => (a.id === id ? { ...a, ...updates } : a))
    }));
    showToast(`Affiliate partner details updated successfully.`, 'success');
  };

  const toggleAffiliateStatus = (id) => {
    setState((prev) => ({
      ...prev,
      affiliates: prev.affiliates.map((a) => {
        if (a.id === id) {
          const next = a.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`Affiliate ${a.name} is now ${next}.`, 'info');
          return { ...a, status: next };
        }
        return a;
      })
    }));
  };

  const deleteAffiliate = (id) => {
    const target = affiliates.find((a) => a.id === id);
    setState((prev) => ({
      ...prev,
      affiliates: prev.affiliates.filter((a) => a.id !== id),
      referralCodes: prev.referralCodes.filter((c) => c.affiliateId !== id)
    }));
    showToast(`Affiliate "${target?.name || id}" archived.`, 'info');
  };

  // Referral Codes CRUD
  const createReferralCode = (codeData) => {
    const aff = affiliates.find((a) => a.id === codeData.affiliateId);
    const codeClean = (codeData.code || `${aff?.name?.split(' ')[0] || 'REF'}-${Math.floor(100 + Math.random() * 900)}`)
      .toUpperCase()
      .replace(/\s+/g, '-');

    const newCode = {
      code: codeClean,
      affiliateId: codeData.affiliateId,
      affiliateName: aff?.name || 'Partner',
      customSlug: codeClean.toLowerCase(),
      referralUrl: `https://clinicos.app/register/clinic?ref=${codeClean}`,
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: codeData.expiryDate || new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
      usageLimit: Number(codeData.usageLimit) || 50,
      usageCount: 0,
      status: 'Active'
    };

    setState((prev) => ({
      ...prev,
      referralCodes: [newCode, ...prev.referralCodes]
    }));
    showToast(`Referral code ${newCode.code} created!`, 'success');
    return newCode;
  };

  const updateReferralCode = (codeStr, updates) => {
    setState((prev) => ({
      ...prev,
      referralCodes: prev.referralCodes.map((c) => (c.code === codeStr ? { ...c, ...updates } : c))
    }));
    showToast(`Referral code ${codeStr} updated.`, 'success');
  };

  const toggleReferralCodeStatus = (codeStr) => {
    setState((prev) => ({
      ...prev,
      referralCodes: prev.referralCodes.map((c) => {
        if (c.code === codeStr) {
          const next = c.status === 'Active' ? 'Inactive' : 'Active';
          showToast(`Referral code ${c.code} marked as ${next}.`, 'info');
          return { ...c, status: next };
        }
        return c;
      })
    }));
  };

  // Referral Tracking Actions
  const updateReferralStatus = (referralId, newStatus) => {
    setState((prev) => {
      const updatedReferrals = prev.referrals.map((r) => {
        if (r.id === referralId) {
          const newTimeline = [...r.timeline];
          if (newStatus === 'Converted' && !newTimeline.some((t) => t.step === 6)) {
            newTimeline.push({
              step: 6,
              title: 'Referral Marked Converted',
              date: new Date().toLocaleString(),
              desc: 'Manually marked converted by Super Admin in demo simulator.'
            });
          }
          return {
            ...r,
            referralStatus: newStatus,
            timeline: newTimeline
          };
        }
        return r;
      });
      return { ...prev, referrals: updatedReferrals };
    });
    showToast(`Referral ${referralId} status updated to ${newStatus}.`, 'success');
  };

  const advanceReferralStage = (referralId) => {
    setState((prev) => {
      const updatedReferrals = prev.referrals.map((r) => {
        if (r.id === referralId) {
          const currentStep = r.timeline.length;
          const nextStep = currentStep + 1;
          const nowStr = new Date().toLocaleString();
          let stepTitle = '';
          let stepDesc = '';
          let nextStatus = r.referralStatus;

          if (nextStep === 3) {
            stepTitle = 'Trial Started';
            stepDesc = '14-day full feature trial provisioned with branch configurations.';
            nextStatus = 'Trial';
          } else if (nextStep === 4) {
            stepTitle = 'Subscription Selected';
            stepDesc = `Selected ${r.subscriptionPlan} annual tier.`;
          } else if (nextStep === 5) {
            stepTitle = 'Payment Marked Successful';
            stepDesc = `Simulated payment captured (Ref #SIM-${Math.floor(100000 + Math.random() * 900000)}).`;
          } else if (nextStep === 6) {
            stepTitle = 'Referral Marked Converted';
            stepDesc = 'Conversion verified. Commission eligibility confirmed.';
            nextStatus = 'Converted';
          } else if (nextStep === 7) {
            stepTitle = 'Commission Marked Pending Approval';
            stepDesc = `₹${(r.commissionAmount || 10000).toLocaleString('en-IN')} added to Superadmin Commission Ledger.`;
          } else {
            return r;
          }

          const updatedTimeline = [
            ...r.timeline,
            { step: nextStep, title: stepTitle, date: nowStr, desc: stepDesc }
          ];

          return {
            ...r,
            referralStatus: nextStatus,
            timeline: updatedTimeline
          };
        }
        return r;
      });
      return { ...prev, referrals: updatedReferrals };
    });
    showToast(`Advanced referral timeline for ${referralId}!`, 'success');
  };

  // Commission Rules CRUD
  const addCommissionRule = (ruleData) => {
    const nextId = `RULE-CUSTOM-${commissionRules.length + 1}`;
    const newRule = {
      id: nextId,
      name: ruleData.name,
      partnerType: ruleData.partnerType || 'Healthcare Consultant',
      calculationType: ruleData.calculationType || 'Percentage',
      rateValue: Number(ruleData.rateValue) || 15,
      eligiblePlans: ruleData.eligiblePlans || ['Professional Multi-Specialty'],
      frequency: ruleData.frequency || 'Recurring Annual',
      durationMonths: Number(ruleData.durationMonths) || 12,
      minPayoutThreshold: Number(ruleData.minPayoutThreshold) || 5000,
      isFirstPaymentOnly: Boolean(ruleData.isFirstPaymentOnly),
      status: 'Active',
      description: ruleData.description || 'Configured policy rule for affiliate incentives.'
    };

    setState((prev) => ({
      ...prev,
      commissionRules: [newRule, ...prev.commissionRules]
    }));
    showToast(`Commission policy "${newRule.name}" created!`, 'success');
    return newRule;
  };

  const updateCommissionRule = (id, updates) => {
    setState((prev) => ({
      ...prev,
      commissionRules: prev.commissionRules.map((r) => (r.id === id ? { ...r, ...updates } : r))
    }));
    showToast(`Commission rule updated.`, 'success');
  };

  const toggleCommissionRuleStatus = (id) => {
    setState((prev) => ({
      ...prev,
      commissionRules: prev.commissionRules.map((r) => {
        if (r.id === id) {
          const next = r.status === 'Active' ? 'Inactive' : 'Active';
          showToast(`Rule ${r.name} is now ${next}.`, 'info');
          return { ...r, status: next };
        }
        return r;
      })
    }));
  };

  // Commission Ledger Actions
  const approveCommission = (transactionId) => {
    setState((prev) => {
      const target = prev.commissionLedger.find((l) => l.transactionId === transactionId);
      if (!target || target.status !== 'Pending') {
        showToast('Only Pending commissions can be approved.', 'error');
        return prev;
      }

      const updatedLedger = prev.commissionLedger.map((l) =>
        l.transactionId === transactionId
          ? {
              ...l,
              status: 'Approved',
              notes: `Approved by Super Admin on ${new Date().toISOString().split('T')[0]}`
            }
          : l
      );

      // Increase available balance for affiliate
      const updatedAffiliates = prev.affiliates.map((a) => {
        if (a.id === target.affiliateId) {
          return {
            ...a,
            pendingCommission: Math.max(0, a.pendingCommission - target.commissionAmount),
            availableBalance: a.availableBalance + target.commissionAmount
          };
        }
        return a;
      });

      return {
        ...prev,
        commissionLedger: updatedLedger,
        affiliates: updatedAffiliates
      };
    });
    showToast(`Commission ${transactionId} Approved! Added to partner available balance.`, 'success');
  };

  const rejectCommission = (transactionId, reason) => {
    setState((prev) => {
      const target = prev.commissionLedger.find((l) => l.transactionId === transactionId);
      if (!target || target.status !== 'Pending') {
        showToast('Only Pending commissions can be rejected.', 'error');
        return prev;
      }

      const updatedLedger = prev.commissionLedger.map((l) =>
        l.transactionId === transactionId
          ? {
              ...l,
              status: 'Rejected',
              notes: `Rejected on ${new Date().toISOString().split('T')[0]}. Reason: ${reason || 'Terms not met'}`
            }
          : l
      );

      const updatedAffiliates = prev.affiliates.map((a) => {
        if (a.id === target.affiliateId) {
          return {
            ...a,
            pendingCommission: Math.max(0, a.pendingCommission - target.commissionAmount)
          };
        }
        return a;
      });

      return {
        ...prev,
        commissionLedger: updatedLedger,
        affiliates: updatedAffiliates
      };
    });
    showToast(`Commission ${transactionId} rejected.`, 'info');
  };

  const reverseCommission = (transactionId, reason) => {
    setState((prev) => {
      const target = prev.commissionLedger.find((l) => l.transactionId === transactionId);
      if (!target || (target.status !== 'Approved' && target.status !== 'Paid')) {
        showToast('Only Approved or Paid commissions can be reversed.', 'error');
        return prev;
      }

      const updatedLedger = prev.commissionLedger.map((l) =>
        l.transactionId === transactionId
          ? {
              ...l,
              status: 'Reversed',
              notes: `Simulated Reversal on ${new Date().toISOString().split('T')[0]}. Reason: ${reason || 'Subscription Refund'}`
            }
          : l
      );

      const updatedAffiliates = prev.affiliates.map((a) => {
        if (a.id === target.affiliateId) {
          return {
            ...a,
            availableBalance: Math.max(0, a.availableBalance - target.commissionAmount),
            totalCommissionEarned: Math.max(0, a.totalCommissionEarned - target.commissionAmount)
          };
        }
        return a;
      });

      return {
        ...prev,
        commissionLedger: updatedLedger,
        affiliates: updatedAffiliates
      };
    });
    showToast(`Commission ${transactionId} reversed (simulated).`, 'info');
  };

  // Payout Management Actions
  const requestPayout = ({ affiliateId, amount, paymentMethod, notes }) => {
    const aff = affiliates.find((a) => a.id === affiliateId);
    if (!aff) {
      showToast('Affiliate not found.', 'error');
      return null;
    }

    const numAmount = Number(amount);
    if (numAmount > aff.availableBalance) {
      showToast(`Requested amount exceeds available balance of ₹${aff.availableBalance.toLocaleString('en-IN')}`, 'error');
      return null;
    }

    const newPayoutId = `PAY-${2600 + payouts.length + 1}`;
    const newPayout = {
      id: newPayoutId,
      affiliateId: aff.id,
      affiliateName: aff.name,
      availableBalanceBefore: aff.availableBalance,
      requestedAmount: numAmount,
      requestDate: new Date().toISOString().split('T')[0],
      paymentMethod: paymentMethod || aff.payoutMethod || 'Bank Transfer (NEFT/IMPS)',
      payoutStatus: 'Pending',
      approvedBy: 'Pending Review',
      approvalDate: null,
      paymentReference: 'Awaiting Authorization',
      accountDetails:
        paymentMethod === 'UPI'
          ? `UPI ID: ${aff.bankDetails.upiId || 'partner@upi'}`
          : `${aff.bankDetails.bankName} - A/C ...${aff.bankDetails.accountNumber.slice(-6)} (IFSC: ${aff.bankDetails.ifscCode})`,
      processedDate: null,
      notes: notes || 'Standard payout request'
    };

    setState((prev) => ({
      ...prev,
      payouts: [newPayout, ...prev.payouts],
      affiliates: prev.affiliates.map((a) =>
        a.id === aff.id ? { ...a, availableBalance: a.availableBalance - numAmount } : a
      )
    }));

    showToast(`Payout request ${newPayoutId} for ₹${numAmount.toLocaleString('en-IN')} submitted!`, 'success');
    return newPayout;
  };

  const approvePayout = (payoutId) => {
    setState((prev) => ({
      ...prev,
      payouts: prev.payouts.map((p) =>
        p.id === payoutId
          ? {
              ...p,
              payoutStatus: 'Approved',
              approvedBy: 'Super Admin',
              approvalDate: new Date().toISOString().split('T')[0],
              paymentReference: 'Scheduled for disbursement batch'
            }
          : p
      )
    }));
    showToast(`Payout ${payoutId} Approved! Ready to mark as paid.`, 'success');
  };

  const rejectPayout = (payoutId, reason) => {
    setState((prev) => {
      const target = prev.payouts.find((p) => p.id === payoutId);
      if (!target) return prev;

      // Refund the requested amount back to available balance
      const updatedAffiliates = prev.affiliates.map((a) =>
        a.id === target.affiliateId
          ? { ...a, availableBalance: a.availableBalance + target.requestedAmount }
          : a
      );

      const updatedPayouts = prev.payouts.map((p) =>
        p.id === payoutId
          ? {
              ...p,
              payoutStatus: 'Rejected',
              approvedBy: 'Super Admin',
              approvalDate: new Date().toISOString().split('T')[0],
              paymentReference: 'REJECTED',
              notes: `Rejected: ${reason || 'Verification failed'}`
            }
          : p
      );

      return {
        ...prev,
        payouts: updatedPayouts,
        affiliates: updatedAffiliates
      };
    });
    showToast(`Payout ${payoutId} Rejected. Balance refunded to affiliate.`, 'info');
  };

  const markPayoutPaid = (payoutId, paymentReference) => {
    setState((prev) => {
      const target = prev.payouts.find((p) => p.id === payoutId);
      if (!target) return prev;

      const refNumber = paymentReference || `CMS-UTR-${Date.now().toString().slice(-8)}`;

      const updatedPayouts = prev.payouts.map((p) =>
        p.id === payoutId
          ? {
              ...p,
              payoutStatus: 'Paid',
              approvedBy: 'Super Admin',
              approvalDate: p.approvalDate || new Date().toISOString().split('T')[0],
              processedDate: new Date().toISOString().split('T')[0],
              paymentReference: refNumber,
              notes: `${p.notes} | Disbursed with Ref: ${refNumber}`
            }
          : p
      );

      const updatedAffiliates = prev.affiliates.map((a) => {
        if (a.id === target.affiliateId) {
          return {
            ...a,
            paidCommission: a.paidCommission + target.requestedAmount
          };
        }
        return a;
      });

      return {
        ...prev,
        payouts: updatedPayouts,
        affiliates: updatedAffiliates
      };
    });
    showToast(`Demo Payout ${payoutId} marked as Paid! (Simulated payment reference generated)`, 'success');
  };

  const resetToDemoDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      affiliates: INITIAL_AFFILIATES,
      commissionRules: INITIAL_COMMISSION_RULES,
      referralCodes: INITIAL_REFERRAL_CODES,
      referrals: INITIAL_REFERRALS,
      commissionLedger: INITIAL_COMMISSION_LEDGER,
      payouts: INITIAL_PAYOUTS,
      monthlyAnalytics: MONTHLY_REFERRAL_ANALYTICS
    });
    showToast('Referral & Affiliate dataset reset to default initial state.', 'info');
  };

  const value = {
    affiliates,
    commissionRules,
    referralCodes,
    referrals,
    commissionLedger,
    payouts,
    monthlyAnalytics,
    stats,

    // Actions
    addAffiliate,
    updateAffiliate,
    toggleAffiliateStatus,
    deleteAffiliate,

    createReferralCode,
    updateReferralCode,
    toggleReferralCodeStatus,

    updateReferralStatus,
    advanceReferralStage,

    addCommissionRule,
    updateCommissionRule,
    toggleCommissionRuleStatus,

    approveCommission,
    rejectCommission,
    reverseCommission,

    requestPayout,
    approvePayout,
    rejectPayout,
    markPayoutPaid,

    resetToDemoDefaults
  };

  return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>;
}

export function useReferral() {
  const ctx = useContext(ReferralContext);
  if (!ctx) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return ctx;
}
