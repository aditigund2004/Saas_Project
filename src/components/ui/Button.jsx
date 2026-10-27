import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon: Icon
}) {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 font-medium rounded-lg',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2 font-medium rounded-xl',
    lg: 'text-sm sm:text-base px-4.5 py-2.5 gap-2.5 font-semibold rounded-xl'
  };

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-1',
    secondary:
      'bg-slate-100/90 hover:bg-slate-200/90 active:bg-slate-300/90 text-slate-800 focus-visible:ring-2 focus-visible:ring-slate-400/30',
    outline:
      'border border-slate-200/90 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 shadow-2xs hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-400/30',
    white:
      'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 shadow-xs hover:shadow-sm focus-visible:ring-2 focus-visible:ring-slate-300 font-semibold border border-slate-200/60',
    'outline-white':
      'border border-white/30 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white backdrop-blur-xs shadow-2xs focus-visible:ring-2 focus-visible:ring-white/40 font-semibold',
    ghost:
      'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:bg-slate-200/80 focus-visible:ring-2 focus-visible:ring-slate-400/30',
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-rose-500/30',
    destructive:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-rose-500/30',
    success:
      'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-500/30',
    whatsapp:
      'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs font-semibold focus-visible:ring-2 focus-visible:ring-emerald-500/30',
    none: ''
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 shrink-0'} />}
      {children}
    </button>
  );
}
