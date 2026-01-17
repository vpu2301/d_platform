import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Gotham-style modal - geometric, minimal
 */
export const Modal = ({ isOpen, onClose, children, title, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`glass-heavy border border-[#1a1a1a] max-w-2xl w-full max-h-[90vh] overflow-auto animate-in zoom-in duration-200 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-[#0088ff]"></div>
              <h2 className="text-slate-200 font-semibold text-sm uppercase tracking-wide">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-[#0f0f0f]"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
