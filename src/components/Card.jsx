import React from 'react';

/**
 * Gotham-style card component - geometric, minimal
 */
export const Card = ({ children, className = '', title, subtitle, onClick }) => {
  const baseClasses = 'glass border border-[#1a1a1a] p-4 transition-all duration-200';
  const clickableClasses = onClick ? 'cursor-pointer hover:bg-[#0f0f0f] hover:border-[#0088ff]/30' : '';
  
  return (
    <div
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="mb-3 pb-2.5 border-b border-[#1a1a1a]">
          {title && (
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-[#0088ff]"></div>
              <h3 className="text-slate-200 font-semibold text-sm uppercase tracking-wide">{title}</h3>
            </div>
          )}
          {subtitle && <p className="text-slate-500 text-xs mt-1.5 font-mono ml-3">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
