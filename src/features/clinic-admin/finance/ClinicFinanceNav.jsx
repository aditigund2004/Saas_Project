import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  RotateCcw,
  Wallet,
  Truck,
  BarChart3,
  Building,
  ShieldCheck
} from 'lucide-react';

export function ClinicFinanceNav() {
  const { activeClinic } = useApp();

  const tabs = [
    { label: 'Overview', path: '/clinic/finance/overview', icon: LayoutDashboard },
    { label: 'Invoices', path: '/clinic/finance/invoices', icon: Receipt },
    { label: 'Payments Ledger', path: '/clinic/finance/payments', icon: CreditCard },
    { label: 'Refunds Queue', path: '/clinic/finance/refunds', icon: RotateCcw },
    { label: 'Practice Expenses', path: '/clinic/finance/expenses', icon: Wallet },
    { label: 'Suppliers & POs', path: '/clinic/finance/suppliers', icon: Truck },
    { label: 'Reports & Margin', path: '/clinic/finance/reports', icon: BarChart3 }
  ];

  return (
    <div className="space-y-3 pb-2">
      {/* Scope Disclaimer Banner */}
<<<<<<< HEAD
      <div className="p-3.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-950 dark:text-blue-200 text-xs flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
=======
      <div className="p-3 rounded-xl bg-blue-50/90 border border-blue-200 text-blue-950 text-xs flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
>>>>>>> origin/main
            <Building className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold flex items-center gap-2">
<<<<<<< HEAD
              <span className="text-sm">Clinic Operational Finance</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-xs font-normal text-blue-700 dark:text-blue-400">Practice: {activeClinic?.name || 'Aegis Health Clinic'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
=======
              <span>Clinic Operational Finance</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-[11px] font-normal text-blue-700">Practice: {activeClinic?.name || 'Aegis Health Clinic'}</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
>>>>>>> origin/main
              Tracks patient billings, collections (UPI/Card/Cash), distributor liabilities, doctor remuneration, and practice operating margin. Isolated from SaaS platform metrics.
            </p>
          </div>
        </div>
<<<<<<< HEAD
        <div className="hidden md:flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 font-mono text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
=======
        <div className="hidden md:flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-white border border-blue-200 text-blue-700 font-mono text-[10px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
>>>>>>> origin/main
          <span>Doctor / Admin Scope</span>
        </div>
      </div>

      {/* Navigation Pills */}
<<<<<<< HEAD
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
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
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
=======
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
>>>>>>> origin/main
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
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
