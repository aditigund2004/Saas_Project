import React from 'react';

const statusStyles = {
  // Appointment statuses
  Confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'In Progress': 'bg-blue-50 text-blue-800 border-blue-200',
  'Checked In': 'bg-blue-50 text-blue-800 border-blue-200',
  Requested: 'bg-amber-50 text-amber-800 border-amber-200',
  'Pending Clinic Confirmation': 'bg-amber-50 text-amber-800 border-amber-200',
  'Alternative Slot Proposed': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Awaiting Patient Response': 'bg-purple-50 text-purple-800 border-purple-200',
  Completed: 'bg-slate-100 text-slate-700 border-slate-200',
  Cancelled: 'bg-rose-50 text-rose-800 border-rose-200',
  'No-show': 'bg-gray-100 text-gray-700 border-gray-300',

  // Payment statuses
  Paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-800 border-amber-200',
  'Partially Paid': 'bg-sky-50 text-sky-800 border-sky-200',
  Refunded: 'bg-rose-50 text-rose-800 border-rose-200',

  // General & Tenant statuses
  Active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Inactive: 'bg-slate-100 text-slate-600 border-slate-200',
  'On Leave': 'bg-amber-50 text-amber-800 border-amber-200',
  'Invitation Pending': 'bg-sky-50 text-sky-800 border-sky-200',
  Trial: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  Suspended: 'bg-rose-50 text-rose-800 border-rose-200',
  delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  sent: 'bg-sky-50 text-sky-800 border-sky-200',
  failed: 'bg-rose-50 text-rose-800 border-rose-200',
  Authentic: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold',

  // Feedback statuses
  New: 'bg-blue-50 text-blue-800 border-blue-200 font-semibold',
  Reviewed: 'bg-purple-50 text-purple-800 border-purple-200',
  Resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
  Reopened: 'bg-amber-50 text-amber-800 border-amber-200'
};

export function Badge({ children, variant, className = '' }) {
  const style = statusStyles[variant || children] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 shrink-0" />
      <span>{children}</span>
    </span>
  );
}
