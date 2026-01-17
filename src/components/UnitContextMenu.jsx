import React, { useEffect, useRef } from 'react';
import { User, Play, Settings, MapPin, Radio, Camera, FileText, ExternalLink } from 'lucide-react';

/**
 * Context menu for units with multiple options
 */
export const UnitContextMenu = ({ isOpen, position, unit, onClose, onAction }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !unit) return null;

  const menuItems = [
    { id: 'open_operator', label: 'Open Operator App', icon: ExternalLink, variant: 'primary' },
    { id: 'assign_operator', label: 'Assign Operator', icon: User, variant: 'default' },
    { id: 'start_mission', label: 'Start Mission', icon: Play, variant: 'default' },
    { id: 'open_camera', label: 'Open Camera Feed', icon: Camera, variant: 'default' },
    { id: 'configure', label: 'Configure Unit', icon: Settings, variant: 'default' },
    { id: 'view_details', label: 'View Details', icon: FileText, variant: 'default' },
    { id: 'send_command', label: 'Send Command', icon: Radio, variant: 'default' },
    { id: 'set_waypoint', label: 'Set Waypoint', icon: MapPin, variant: 'default' },
  ];

  const handleAction = (actionId) => {
    onAction?.(actionId, unit);
    onClose?.();
  };

  return (
    <div
      ref={menuRef}
      className="absolute z-50 glass-heavy border border-[#1a1a1a] min-w-[200px] shadow-2xl"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="p-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleAction(item.id)}
              className={`w-full text-left px-3 py-2 text-xs transition-all flex items-center gap-2 ${
                item.variant === 'primary'
                  ? 'text-[#0088ff] hover:bg-[#0088ff]/10'
                  : 'text-slate-300 hover:bg-[#0a0a0a] hover:text-white'
              }`}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
