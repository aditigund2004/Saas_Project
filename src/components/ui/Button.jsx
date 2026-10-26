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
    'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]';

  const sizes = {
    sm: 'text-xs h-9 px-3.5 gap-1.5 font-bold',
    md: 'text-sm h-10.5 px-4.5 gap-2 font-bold',
    lg: 'text-base h-12 px-6 gap-2.5 font-extrabold'
  };

  const variants = {
    primary:
      'bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white shadow-md shadow-green-700/20 hover:shadow-lg hover:shadow-green-700/30 font-bold focus-visible:ring-[#15803D]',
    secondary:
      'bg-slate-100/90 hover:bg-slate-200 active:bg-slate-300 text-[#17211B] font-bold border border-slate-200/80 focus-visible:ring-slate-400',
    outline:
      'border-2 border-slate-200 bg-white hover:bg-[#F0FDF4] hover:border-[#15803D] active:bg-[#DCFCE7] text-[#17211B] hover:text-[#15803D] font-bold shadow-2xs hover:shadow-sm focus-visible:ring-[#15803D]',
    white:
      'bg-white hover:bg-slate-50 active:bg-slate-100 text-[#17211B] shadow-sm hover:shadow-md focus-visible:ring-white font-bold',
    'outline-white':
      'border border-white/30 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white backdrop-blur-xs shadow-2xs focus-visible:ring-white font-semibold',
    ghost:
      'text-slate-600 hover:bg-[#F0FDF4] hover:text-[#166534] active:bg-[#DCFCE7] focus-visible:ring-[#15803D] font-semibold hover:-translate-y-0',
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-md shadow-rose-500/20 font-bold focus-visible:ring-rose-500',
    destructive:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-md shadow-rose-500/20 font-bold focus-visible:ring-rose-500',
    success:
      'bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white shadow-md shadow-green-700/20 font-bold focus-visible:ring-[#15803D]',
    whatsapp:
      'bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#169C4B] text-white shadow-md shadow-emerald-500/20 font-bold focus-visible:ring-[#25D366]',
    none: ''
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105' : 'w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-105'} />}
      {children}
    </button>
  );
}
