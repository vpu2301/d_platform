import React from 'react';

/**
 * Gotham-style button - geometric, minimal
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-[#1a1a1a] uppercase tracking-wide text-xs';
  
  const variants = {
    primary: 'bg-[#0088ff]/10 text-[#0088ff] hover:bg-[#0088ff]/20 active:bg-[#0088ff]/15 border-[#0088ff]/30',
    success: 'bg-[#00cc66]/10 text-[#00cc66] hover:bg-[#00cc66]/20 active:bg-[#00cc66]/15 border-[#00cc66]/30',
    danger: 'bg-[#ff4444]/10 text-[#ff4444] hover:bg-[#ff4444]/20 active:bg-[#ff4444]/15 border-[#ff4444]/30',
    warning: 'bg-[#ffaa00]/10 text-[#ffaa00] hover:bg-[#ffaa00]/20 active:bg-[#ffaa00]/15 border-[#ffaa00]/30',
    ghost: 'bg-transparent text-slate-400 hover:bg-[#0f0f0f]/80 hover:border-[#1a1a1a] hover:text-slate-200',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-xs',
    lg: 'px-5 py-2.5 text-sm',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
