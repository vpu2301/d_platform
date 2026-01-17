import React from 'react';
import { X, Plus, Map } from 'lucide-react';

/**
 * Map tabs component - manages multiple map instances with mission type colors
 */
export const MapTabs = ({ maps, activeMapId, onMapSelect, onMapClose, onNewMap }) => {
  const getTabColors = (missionType, isActive) => {
    const baseStyles = isActive ? 'font-semibold' : '';
    
    switch (missionType) {
      case 'primary':
        return {
          bg: isActive ? 'bg-[#0088ff]/10' : 'bg-[#0a0a0a]',
          text: isActive ? 'text-[#0088ff]' : 'text-slate-400',
          border: isActive ? 'border-[#0088ff]/30' : 'border-[#1a1a1a]',
        };
      case 'intelligence':
        return {
          bg: isActive ? 'bg-green-500/10' : 'bg-[#0a0a0a]',
          text: isActive ? 'text-green-500' : 'text-slate-400',
          border: isActive ? 'border-green-500/30' : 'border-[#1a1a1a]',
        };
      case 'strike':
        return {
          bg: isActive ? 'bg-red-500/10' : 'bg-[#0a0a0a]',
          text: isActive ? 'text-red-500' : 'text-slate-400',
          border: isActive ? 'border-red-500/30' : 'border-[#1a1a1a]',
        };
      case 'support':
        return {
          bg: isActive ? 'bg-[#ffaa00]/10' : 'bg-[#0a0a0a]',
          text: isActive ? 'text-[#ffaa00]' : 'text-slate-400',
          border: isActive ? 'border-[#ffaa00]/30' : 'border-[#1a1a1a]',
        };
      case 'simulation':
        return {
          bg: isActive ? 'bg-purple-500/10' : 'bg-[#0a0a0a]',
          text: isActive ? 'text-purple-500' : 'text-slate-400',
          border: isActive ? 'border-purple-500/30' : 'border-[#1a1a1a]',
        };
      default:
        return {
          bg: isActive ? 'bg-[#0088ff]/10' : 'bg-[#0a0a0a]',
          text: isActive ? 'text-[#0088ff]' : 'text-slate-400',
          border: isActive ? 'border-[#0088ff]/30' : 'border-[#1a1a1a]',
        };
    }
  };

  return (
    <div className="flex items-center gap-1 py-1">
      {maps.map((map) => {
        const missionType = map.type || map.missionType || 'primary';
        const colors = getTabColors(missionType, activeMapId === map.id);
        const isActive = activeMapId === map.id;
        
        return (
          <div
            key={map.id}
            className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer border transition-all ${
              isActive
                ? `${colors.bg} ${colors.text} ${colors.border}`
                : `${colors.bg} ${colors.text} ${colors.border} hover:bg-[#0f0f0f] hover:text-slate-300`
            }`}
            onClick={() => onMapSelect?.(map.id)}
          >
            <Map size={14} />
            <span className={`text-xs font-mono uppercase tracking-wide ${colors.text}`}>{map.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMapClose?.(map.id);
              }}
              className="ml-1 hover:bg-[#1a1a1a] p-0.5 rounded transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
      <button
        onClick={onNewMap}
        className="flex items-center gap-1 px-3 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] text-slate-400 hover:bg-[#0f0f0f] hover:text-[#0088ff] hover:border-[#0088ff]/30 transition-all"
        title="New Map / Mission"
      >
        <Plus size={14} />
        <span className="text-xs font-mono uppercase tracking-wide">NEW</span>
      </button>
    </div>
  );
};
