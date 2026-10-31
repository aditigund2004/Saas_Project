import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Key,
  GitBranch,
  Calculator,
  Receipt,
  CreditCard,
  BarChart3,
  Eye,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useReferral } from '../../../context/ReferralContext';

export function ReferralNav() {
  const { affiliates, referrals, commissionLedger, payouts, resetToDemoDefaults } = useReferral();

  const pendingCommissionsCount = commissionLedger.filter((l) => l.status === 'Pending').length;
  const pendingPayoutsCount = payouts.filter((p) => p.payoutStatus === 'Pending').length;

  const tabs = [
    { label: 'Referral Dashboard', path: '/superadmin/referrals/dashboard', icon: LayoutDashboard },
    { label: 'Affiliate Partners', path: '/superadmin/referrals/affiliates', icon: Users, badge: affiliates.length },
    { label: 'Referral Codes', path: '/superadmin/referrals/codes', icon: Key },
    { label: 'Referral Tracking', path: '/superadmin/referrals/tracking', icon: GitBranch, badge: referrals.length },
    { label: 'Commission Rules', path: '/superadmin/referrals/commission-rules', icon: Calculator },
    {
      label: 'Commission Ledger',
      path: '/superadmin/referrals/commission-ledger',
      icon: Receipt,
      badge: pendingCommissionsCount > 0 ? `${pendingCommissionsCount} Pending` : null,
      badgeColor: 'amber'
    },
    {
      label: 'Payout Management',
      path: '/superadmin/referrals/payouts',
      icon: CreditCard,
      badge: pendingPayoutsCount > 0 ? `${pendingPayoutsCount} Req` : null,
      badgeColor: 'blue'
    },
    { label: 'Referral Reports', path: '/superadmin/referrals/reports', icon: BarChart3 }
  ];

  return (
    <div className="space-y-4 pb-2">
      {/* Enterprise Architecture Disclaimer Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/90 dark:border-indigo-900 text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>B2B Referral & Affiliate Engine:</strong> Automated tracking for hospital networks, doctor advisors, and healthcare consultants with real-time attribution, transparent commission ledgers, and audit-ready payouts.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <NavLink
            to="/superadmin/referrals/preview"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
            title="Preview the portal from the perspective of an enrolled affiliate"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Affiliate Portal Preview</span>
          </NavLink>
          <button
            type="button"
            onClick={resetToDemoDefaults}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-slate-800 text-indigo-800 dark:text-indigo-300 text-xs font-medium cursor-pointer transition-colors"
            title="Reset referral dataset to fresh initial demo values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 border-b border-slate-200 dark:border-slate-800 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    tab.badgeColor === 'amber'
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300'
                      : tab.badgeColor === 'blue'
                      ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
