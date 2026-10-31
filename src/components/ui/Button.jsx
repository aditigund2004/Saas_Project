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
    'inline-flex items-center justify-center font-medium transition-all duration-150 ease-out rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none box-border whitespace-nowrap shrink-0';

  const sizes = {
    sm: 'text-xs min-h-[2.125rem] px-3 py-1.5 gap-1.5',
    md: 'text-sm min-h-[2.5rem] px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base min-h-[2.875rem] px-5 py-2.5 gap-2.5 font-semibold'
=======
    'inline-flex items-center justify-center font-medium transition-all duration-150 ease-out rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 font-semibold'
>>>>>>> origin/main
  };

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs hover:shadow-sm focus-visible:ring-blue-500',
    secondary:
<<<<<<< HEAD
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 dark:bg-[#172640] dark:hover:bg-[#1C2D4B] dark:active:bg-[#203456] dark:text-[#F1F5F9] border border-slate-200 dark:border-[#263B59] focus-visible:ring-blue-400',
    outline:
      'border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] hover:bg-slate-50 dark:hover:bg-[#172640] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] shadow-2xs focus-visible:ring-blue-400',
=======
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 focus-visible:ring-slate-400',
    outline:
      'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs focus-visible:ring-slate-400',
>>>>>>> origin/main
    white:
      'bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-950 shadow-md hover:shadow-lg focus-visible:ring-white font-bold',
    'outline-white':
      'border border-white/30 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white backdrop-blur-xs shadow-2xs focus-visible:ring-white font-semibold',
    ghost:
<<<<<<< HEAD
      'text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640] hover:text-slate-900 dark:hover:text-[#F1F5F9] active:bg-slate-200 dark:active:bg-[#203456] focus-visible:ring-blue-400',
=======
      'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white active:bg-slate-200 focus-visible:ring-slate-400',
>>>>>>> origin/main
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs focus-visible:ring-rose-500',
    destructive:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs focus-visible:ring-rose-500',
    success:
      'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs focus-visible:ring-emerald-500',
    whatsapp:
      'bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#169C4B] text-white shadow-xs font-semibold focus-visible:ring-[#25D366]',
    none: ''
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
    >
<<<<<<< HEAD
      {Icon && <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} shrink-0 pointer-events-none`} />}
=======
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 shrink-0'} />}
>>>>>>> origin/main
      {children}
    </button>
  );
}
