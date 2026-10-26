const fs = require('fs');

let code = fs.readFileSync('src/context/AppContext.jsx', 'utf8');

// 1. Add import
if (!code.includes('subscriptionService')) {
  code = code.replace(
    "import { ROLE_PERMISSIONS } from '../types';",
    `import { ROLE_PERMISSIONS } from '../types';
import {
  DEFAULT_FEATURE_CATALOG,
  DEFAULT_USAGE_THRESHOLDS,
  INITIAL_APPROVAL_REQUESTS,
  calculateCustomPlanPrice,
  getThresholdStatus
} from '../services/subscriptionService.js';`
  );
}

// 2. Add state definitions
const stateTarget = `  const [plans, setPlans] = useState(() => {
    const s = localStorage.getItem('clinipulse_plans');
    return s ? JSON.parse(s) : DEMO_PLANS;
  });`;

const stateReplacement = `  const [plans, setPlans] = useState(() => {
    const s = localStorage.getItem('clinipulse_plans');
    return s ? JSON.parse(s) : DEMO_PLANS;
  });

  // Modular Feature-Based Catalog, Usage Thresholds & Super Admin Approvals
  const [approvalRequests, setApprovalRequests] = useState(() => {
    const s = localStorage.getItem('clinipulse_approval_requests');
    return s ? JSON.parse(s) : INITIAL_APPROVAL_REQUESTS;
  });

  const [featureCatalog, setFeatureCatalog] = useState(() => {
    const s = localStorage.getItem('clinipulse_feature_catalog');
    return s ? JSON.parse(s) : DEFAULT_FEATURE_CATALOG;
  });

  const [thresholdConfigs, setThresholdConfigs] = useState(() => {
    const s = localStorage.getItem('clinipulse_threshold_configs');
    return s ? JSON.parse(s) : DEFAULT_USAGE_THRESHOLDS;
  });`;

code = code.replace(stateTarget, stateReplacement);

// 3. Update onboardNewClinic and add subscription methods
const onboardTarget = `    setClinics((prev) => [newClinic, ...prev]);
    setActiveClinicId(clinicId);
    setActiveBranchId(branchId);
    switchRole('clinic_admin');
    showToast(\`🎉 Welcome to ClinicOS! \${newClinic.name} created on 14-day \${onboardingData.planId?.toUpperCase() || 'PRO'} trial.\`);
    return newClinic;
  };`;

const onboardReplacement = `    const isCustom = onboardingData.planId === 'custom' || Boolean(onboardingData.isCustomPlan);
    const customDetails = onboardingData.customPlanDetails || null;

    newClinic.status = isCustom ? 'Pending Approval' : 'Trial';
    newClinic.subscriptionPlanId = isCustom ? 'custom' : (onboardingData.planId || 'professional');
    newClinic.subscriptionStatus = isCustom ? 'Pending Approval' : 'Trial';
    newClinic.isCustomPlan = isCustom;
    newClinic.customPlanDetails = customDetails;

    setClinics((prev) => {
      const next = [newClinic, ...prev];
      localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
      return next;
    });

    if (isCustom && customDetails) {
      const newApprovalReq = {
        id: \`req-appr-\${Date.now().toString().slice(-4)}\`,
        clinicId,
        clinicName: newClinic.name,
        requestType: 'Custom Plan Request',
        submissionDate: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        requestedTier: 'Bespoke Custom Plan',
        selectedFeatures: customDetails.selectedFeatures?.map((f) => f.id || f) || [],
        quantities: customDetails.quantities || {},
        currentCost: 0,
        requestedMonthlyCost: customDetails.displayPrice || customDetails.netMonthly || 0,
        annualCommitment: customDetails.billingInterval === 'annual',
        status: 'Pending Approval',
        reason: \`Newly registered clinic requested custom configuration with \${customDetails.selectedFeatures?.length || 0} modular features and tailored capacity.\`,
        metricsUsage: {
          doctors: { current: Number(onboardingData.doctorCount) || 2, limit: (Number(onboardingData.doctorCount) || 2) + (customDetails.quantities?.extra_doctors || 0) },
          branches: { current: Number(onboardingData.branchCount) || 1, limit: (Number(onboardingData.branchCount) || 1) + (customDetails.quantities?.extra_branches || 0) }
        },
        superadminNotes: ''
      };

      setApprovalRequests((prev) => {
        const next = [newApprovalReq, ...prev];
        localStorage.setItem('clinipulse_approval_requests', JSON.stringify(next));
        return next;
      });
    }

    setActiveClinicId(clinicId);
    setActiveBranchId(branchId);
    switchRole('clinic_admin');

    if (isCustom) {
      showToast(\`🎉 Registration Submitted! \${newClinic.name} pending Super Admin plan approval.\`);
    } else {
      showToast(\`🎉 Welcome to ClinicOS! \${newClinic.name} created on 14-day \${onboardingData.planId?.toUpperCase() || 'PRO'} trial.\`);
    }
    return newClinic;
  };

  const submitApprovalRequest = (requestData) => {
    const newReq = {
      id: \`req-appr-\${Date.now().toString().slice(-4)}\`,
      submissionDate: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending Approval',
      superadminNotes: '',
      ...requestData
    };
    setApprovalRequests((prev) => {
      const next = [newReq, ...prev];
      localStorage.setItem('clinipulse_approval_requests', JSON.stringify(next));
      return next;
    });
    showToast(\`Approval request \${newReq.id} submitted for Super Admin review.\`);
    return newReq;
  };

  const approveSubscriptionRequest = (requestId, superadminNotes = '') => {
    setApprovalRequests((prev) => {
      const next = prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Approved',
            superadminNotes: superadminNotes || 'Approved by Super Admin.',
            approvedAt: new Date().toISOString()
          };
        }
        return r;
      });
      localStorage.setItem('clinipulse_approval_requests', JSON.stringify(next));
      return next;
    });

    const targetReq = approvalRequests.find((r) => r.id === requestId);
    if (targetReq?.clinicId) {
      setClinics((prev) => {
        const next = prev.map((c) => {
          if (c.id === targetReq.clinicId) {
            return {
              ...c,
              status: 'Active',
              subscriptionStatus: 'Active',
              isCustomPlan: targetReq.requestType === 'Custom Plan Request',
              customPlanDetails: targetReq.selectedFeatures ? {
                features: targetReq.selectedFeatures,
                monthlyCost: targetReq.requestedMonthlyCost,
                quantities: targetReq.quantities
              } : c.customPlanDetails
            };
          }
          return c;
        });
        localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
        return next;
      });
    }
    showToast(\`Request \${requestId} approved. Clinic subscription updated to Active.\`);
  };

  const rejectSubscriptionRequest = (requestId, reason = '') => {
    setApprovalRequests((prev) => {
      const next = prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Rejected',
            superadminNotes: reason || 'Rejected by Super Admin after governance evaluation.',
            rejectedAt: new Date().toISOString()
          };
        }
        return r;
      });
      localStorage.setItem('clinipulse_approval_requests', JSON.stringify(next));
      return next;
    });

    const targetReq = approvalRequests.find((r) => r.id === requestId);
    if (targetReq?.clinicId) {
      setClinics((prev) => {
        const next = prev.map((c) => {
          if (c.id === targetReq.clinicId) {
            return { ...c, subscriptionStatus: 'Rejected' };
          }
          return c;
        });
        localStorage.setItem('clinipulse_clinics', JSON.stringify(next));
        return next;
      });
    }
    showToast(\`Request \${requestId} rejected.\`);
  };

  const requestMoreInfo = (requestId, notes = '') => {
    setApprovalRequests((prev) => {
      const next = prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'More Info Requested',
            superadminNotes: notes || 'Super Admin has requested additional clinic accreditation information.'
          };
        }
        return r;
      });
      localStorage.setItem('clinipulse_approval_requests', JSON.stringify(next));
      return next;
    });
    showToast(\`More information requested for request \${requestId}.\`);
  };

  const updateFeaturePrice = (featureId, newPrice) => {
    setFeatureCatalog((prev) => {
      const next = prev.map((f) => f.id === featureId ? { ...f, monthlyPrice: Number(newPrice) } : f);
      localStorage.setItem('clinipulse_feature_catalog', JSON.stringify(next));
      return next;
    });
    showToast('Feature price updated successfully.');
  };

  const updateThresholdConfig = (metricKey, updates) => {
    setThresholdConfigs((prev) => {
      const next = { ...prev, [metricKey]: { ...prev[metricKey], ...updates } };
      localStorage.setItem('clinipulse_threshold_configs', JSON.stringify(next));
      return next;
    });
    showToast('Usage threshold configuration saved.');
  };`;

code = code.replace(onboardTarget, onboardReplacement);

// 4. Update resetDemoData
code = code.replace(
  "localStorage.removeItem('clinipulse_notifications');",
  `localStorage.removeItem('clinipulse_notifications');
    localStorage.removeItem('clinipulse_approval_requests');
    localStorage.removeItem('clinipulse_feature_catalog');
    localStorage.removeItem('clinipulse_threshold_configs');
    setApprovalRequests(INITIAL_APPROVAL_REQUESTS);
    setFeatureCatalog(DEFAULT_FEATURE_CATALOG);
    setThresholdConfigs(DEFAULT_USAGE_THRESHOLDS);`
);

// 5. Update context value exports
const contextExportTarget = `        onboardNewClinic,
        followUps,
        updateFollowUpStatus,
        plans,
        setPlans,
        createPlan,
        deletePlan,
        updatePlan,
        upgradeClinicSubscription,`;

const contextExportReplacement = `        onboardNewClinic,
        followUps,
        updateFollowUpStatus,
        plans,
        setPlans,
        createPlan,
        deletePlan,
        updatePlan,
        upgradeClinicSubscription,
        approvalRequests,
        setApprovalRequests,
        submitApprovalRequest,
        approveSubscriptionRequest,
        rejectSubscriptionRequest,
        requestMoreInfo,
        featureCatalog,
        updateFeaturePrice,
        thresholdConfigs,
        updateThresholdConfig,`;

code = code.replace(contextExportTarget, contextExportReplacement);

fs.writeFileSync('src/context/AppContext.jsx', code);
console.log('AppContext.jsx successfully enhanced!');

