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
    <div className="space-y-3 pb-2">
      {/* Scope Disclaimer Banner */}
      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>SaaS Corporate Finance:</strong> Tracks software subscription ARR/MRR, platform fees, payment gateways, and company operating costs. Strictly isolated from clinic patient revenue.
          </span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] uppercase font-bold">
          B2B SaaS Ledger
        </span>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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

