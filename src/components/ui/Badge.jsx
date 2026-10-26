import React from 'react';

const statusStyles = {
  // Appointment statuses
  Confirmed: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  'In Progress': 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]',
  'Checked In': 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  Requested: 'bg-amber-50 text-amber-800 border-amber-200',
  'Pending Clinic Confirmation': 'bg-amber-50 text-amber-800 border-amber-200',
  'Alternative Slot Proposed': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Awaiting Patient Response': 'bg-purple-50 text-purple-800 border-purple-200',
  Completed: 'bg-slate-100 text-slate-700 border-slate-200',
  Cancelled: 'bg-rose-50 text-rose-800 border-rose-200',
  'No-show': 'bg-slate-100 text-slate-600 border-slate-200',

  // Payment statuses
  Paid: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  Pending: 'bg-amber-50 text-amber-800 border-amber-200',
  'Partially Paid': 'bg-sky-50 text-sky-800 border-sky-200',
  Refunded: 'bg-rose-50 text-rose-800 border-rose-200',

  // General & Tenant statuses
  Active: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  Inactive: 'bg-slate-100 text-slate-600 border-slate-200',
  'On Leave': 'bg-amber-50 text-amber-800 border-amber-200',
  'Invitation Pending': 'bg-sky-50 text-sky-800 border-sky-200',
  Trial: 'bg-[#DCFCE7] text-[#14532D] border-[#86efac]',
  Suspended: 'bg-rose-50 text-rose-800 border-rose-200',
  delivered: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  sent: 'bg-sky-50 text-sky-800 border-sky-200',
  failed: 'bg-rose-50 text-rose-800 border-rose-200',
  Authentic: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7] font-semibold',

  // Email statuses
  Draft: 'bg-slate-100 text-slate-700 border-slate-200',
  Scheduled: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  Queued: 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]',
  'Sent (simulated)': 'bg-sky-50 text-sky-800 border-sky-200',
  'Delivered (simulated)': 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  Failed: 'bg-rose-50 text-rose-800 border-rose-200',
  Disabled: 'bg-slate-100 text-slate-600 border-slate-200',

  // Semantic variants
  primary: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  success: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  danger: 'bg-rose-50 text-rose-800 border-rose-200',
  error: 'bg-rose-50 text-rose-800 border-rose-200',
  info: 'bg-sky-50 text-sky-800 border-sky-200',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',

  // Feedback statuses
  New: 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7] font-semibold',
  Reviewed: 'bg-purple-50 text-purple-800 border-purple-200',
  Resolved: 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7] font-semibold',
  Reopened: 'bg-amber-50 text-amber-800 border-amber-200'
};

export function Badge({ children, variant, dot = true, className = '' }) {
  const style = statusStyles[variant || children] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold border shadow-2xs ${style} ${className}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
