import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  CreditCard,
  RotateCcw,
  DollarSign,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

export function SaaSFinanceNav() {
  const tabs = [
    { label: 'Overview', path: '/superadmin/finance/overview', icon: LayoutDashboard },
    { label: 'Revenue', path: '/superadmin/finance/revenue', icon: TrendingUp },
    { label: 'Invoices', path: '/superadmin/finance/invoices', icon: Receipt },
    { label: 'Payments', path: '/superadmin/finance/payments', icon: CreditCard },
    { label: 'Refunds', path: '/superadmin/finance/refunds', icon: RotateCcw },
    { label: 'Operating Expenses', path: '/superadmin/finance/expenses', icon: DollarSign },
    { label: 'SaaS Reports', path: '/superadmin/finance/reports', icon: BarChart3 }
  ];

  return (
<<<<<<< HEAD
    <div className="space-y-4 pb-2">
      {/* Scope Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
=======
    <div className="space-y-3 pb-2">
      {/* Scope Disclaimer Banner */}
      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
>>>>>>> origin/main
          <span>
            <strong>SaaS Corporate Finance:</strong> Tracks software subscription ARR/MRR, platform fees, payment gateways, and company operating costs. Strictly isolated from clinic patient revenue.
          </span>
        </div>
<<<<<<< HEAD
        <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono text-xs uppercase font-bold shrink-0">
=======
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] uppercase font-bold">
>>>>>>> origin/main
          B2B SaaS Ledger
        </span>
      </div>

      {/* Navigation Pills */}
<<<<<<< HEAD
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
=======
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
>>>>>>> origin/main
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
<<<<<<< HEAD
                `flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4" />
=======
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
>>>>>>> origin/main
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
