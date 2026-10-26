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
<<<<<<< HEAD
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 font-semibold'
=======
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5'
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  };

  const variants = {
    primary:
<<<<<<< HEAD
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs hover:shadow-sm focus-visible:ring-blue-500',
    secondary:
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 focus-visible:ring-slate-400',
    outline:
      'border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 shadow-2xs focus-visible:ring-slate-400',
    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-slate-400',
    danger:
      'bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white shadow-xs focus-visible:ring-rose-500',
    destructive:
      'bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white shadow-xs focus-visible:ring-rose-500',
    success:
      'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-xs focus-visible:ring-emerald-500',
    whatsapp:
      'bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#169C4B] text-white shadow-xs font-semibold focus-visible:ring-[#25D366]'
=======
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500 hover:shadow-blue-600/20 hover:shadow-md active:bg-blue-800',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400',
    outline:
      'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm focus:ring-slate-400',
    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500',
    success:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500',
    whatsapp:
      'bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm font-semibold'
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
<<<<<<< HEAD
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 shrink-0'} />}
=======
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      {children}
    </button>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
