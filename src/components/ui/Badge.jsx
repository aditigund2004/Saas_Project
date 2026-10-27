import React from 'react';

const statusStyles = {
  // Appointment statuses
  Confirmed: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
  'In Progress': 'bg-blue-50/90 text-blue-700 border-blue-200/80',
  'Checked In': 'bg-blue-50/90 text-blue-700 border-blue-200/80',
  Requested: 'bg-amber-50/90 text-amber-800 border-amber-200/80',
  'Pending Clinic Confirmation': 'bg-amber-50/90 text-amber-800 border-amber-200/80',
  'Alternative Slot Proposed': 'bg-violet-50/90 text-violet-700 border-violet-200/80',
  'Awaiting Patient Response': 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80',
  Completed: 'bg-slate-100/90 text-slate-600 border-slate-200/80',
  Cancelled: 'bg-rose-50/90 text-rose-700 border-rose-200/80',
  'No-show': 'bg-slate-100/90 text-slate-500 border-slate-200/80',

  // Payment statuses
  Paid: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
  Pending: 'bg-amber-50/90 text-amber-800 border-amber-200/80',
  'Partially Paid': 'bg-sky-50/90 text-sky-700 border-sky-200/80',
  Refunded: 'bg-rose-50/90 text-rose-700 border-rose-200/80',

  // General & Tenant statuses
  Active: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
  Inactive: 'bg-slate-100/90 text-slate-500 border-slate-200/80',
  'On Leave': 'bg-amber-50/90 text-amber-800 border-amber-200/80',
  'Invitation Pending': 'bg-sky-50/90 text-sky-700 border-sky-200/80',
  Trial: 'bg-violet-50/90 text-violet-700 border-violet-200/80',
  Suspended: 'bg-rose-50/90 text-rose-700 border-rose-200/80',
  delivered: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
  sent: 'bg-sky-50/90 text-sky-700 border-sky-200/80',
  failed: 'bg-rose-50/90 text-rose-700 border-rose-200/80',
  Authentic: 'bg-emerald-50/90 text-emerald-700 border-emerald-300/80 font-medium',

  // Feedback statuses
  New: 'bg-blue-50/90 text-blue-700 border-blue-200/80 font-medium',
  Reviewed: 'bg-violet-50/90 text-violet-700 border-violet-200/80',
  Resolved: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80 font-medium',
  Reopened: 'bg-amber-50/90 text-amber-800 border-amber-200/80'
};

export function Badge({ children, variant, className = '' }) {
  const style = statusStyles[variant || children] || 'bg-slate-100/90 text-slate-600 border-slate-200/80';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 shrink-0" />
      <span>{children}</span>
    </span>
  );
}
