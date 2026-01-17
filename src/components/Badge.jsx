import React from 'react';

/**
 * Gotham-style badge - geometric, minimal
 */
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'inline-flex items-center px-2 py-0.5 text-xs font-medium uppercase tracking-wide border';
  
  const variants = {
    default: 'bg-[#0f0f0f] text-slate-400 border-[#1a1a1a]',
    active: 'bg-green-500/20 text-green-500 border-green-500/30',
    returning: 'bg-[#ffaa00]/10 text-[#ffaa00] border-[#ffaa00]/30',
    maintenance: 'bg-red-500/20 text-red-500 border-red-500/30',
    critical: 'bg-red-500/20 text-red-500 border-red-500/30',
    high: 'bg-red-500/20 text-red-500 border-red-500/30',
    medium: 'bg-[#0088ff]/10 text-[#0088ff] border-[#0088ff]/30',
    low: 'bg-[#0f0f0f] text-slate-500 border-[#1a1a1a]',
  };
  
  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
