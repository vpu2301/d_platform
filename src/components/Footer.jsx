import React, { useState } from 'react';
import { Activity, Network, Server, Shield, Radio, Satellite, ChevronUp, ChevronDown } from 'lucide-react';
import { UnitInfoModal } from './UnitInfoModal';
import { UnitPageModal } from './UnitPageModal';

/**
 * Gotham-style footer with system status and units - expandable
 */
export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showUnitPage, setShowUnitPage] = useState(false);

  const systems = [
    { id: 'SAT-1', name: 'Satellite Link', status: 'online', icon: Satellite },
    { id: 'COM-1', name: 'Command Center', status: 'online', icon: Radio },
    { id: 'SVR-1', name: 'Data Server', status: 'online', icon: Server },
    { id: 'SEC-1', name: 'Security Layer', status: 'online', icon: Shield },
    { id: 'NET-1', name: 'Network Hub', status: 'online', icon: Network },
  ];

  const units = [
    { id: 'UNIT-ALPHA', type: 'Reconnaissance', status: 'active' },
    { id: 'UNIT-BRAVO', type: 'Surveillance', status: 'active' },
    { id: 'UNIT-CHARLIE', type: 'Support', status: 'standby' },
    { id: 'UNIT-DELTA', type: 'Transport', status: 'active' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'active':
        return 'text-green-500';
      case 'standby':
        return 'text-[#ffaa00]';
      case 'offline':
      case 'inactive':
        return 'text-slate-500';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusDot = (status) => {
    const colors = {
      online: 'bg-green-500',
      active: 'bg-green-500',
      standby: 'bg-[#ffaa00]',
      offline: 'bg-slate-500',
      inactive: 'bg-slate-500',
    };
    return colors[status] || 'bg-slate-500';
  };

  const handleUnitClick = (unit) => {
    // Units (carriers) open UnitPageModal, systems open UnitInfoModal
    if (unit.type) {
      setSelectedUnit(unit);
      setShowUnitPage(true);
    } else {
      setSelectedUnit(unit);
      setShowUnitPage(false);
    }
  };

  return (
    <>
      <footer className={`glass-heavy border-t border-[#1a1a1a] px-6 flex-shrink-0 transition-all duration-300 ${
        isExpanded ? 'py-4' : 'py-2'
      }`}>
        {/* Collapsed view / Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wide">
              <Activity size={12} />
              <span>Systems</span>
            </div>
            <div className="flex items-center gap-3">
              {systems.slice(0, isExpanded ? systems.length : 3).map((system) => {
                const Icon = system.icon;
                return (
                  <div
                    key={system.id}
                    onClick={() => handleUnitClick(system)}
                    className="flex items-center gap-2 px-3 py-1 bg-[#0f0f0f] border border-[#1a1a1a] cursor-pointer hover:bg-[#0a0a0a] hover:border-[#0088ff]/30 transition-all"
                    title={`${system.name} - ${system.status}`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(system.status)}`}></div>
                    <Icon size={12} className={getStatusColor(system.status)} />
                    <span className="text-xs font-mono text-slate-400">{system.id}</span>
                  </div>
                );
              })}
              {!isExpanded && <span className="text-xs text-slate-500">+{systems.length - 3} more</span>}
            </div>
          </div>

          {/* Center: Divider */}
          <div className="w-px h-6 bg-[#1a1a1a]"></div>

          {/* Center: Units */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wide">
              <Network size={12} />
              <span>Units</span>
            </div>
            <div className="flex items-center gap-3">
              {units.slice(0, isExpanded ? units.length : 2).map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => handleUnitClick(unit)}
                  className="flex items-center gap-2 px-3 py-1 bg-[#0f0f0f] border border-[#1a1a1a] cursor-pointer hover:bg-[#0a0a0a] hover:border-[#0088ff]/30 transition-all"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(unit.status)}`}></div>
                  <span className="text-xs font-mono text-slate-400">{unit.id}</span>
                  <span className="text-xs text-slate-500">({unit.type})</span>
                </div>
              ))}
              {!isExpanded && <span className="text-xs text-slate-500">+{units.length - 2} more</span>}
            </div>
          </div>

          {/* Right: Divider */}
          <div className="w-px h-6 bg-[#1a1a1a]"></div>

          {/* Right: Status Metrics */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-wide">Latency</span>
              <span className="text-xs font-mono text-slate-300">42ms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-wide">Uptime</span>
              <span className="text-xs font-mono text-slate-300">99.8%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-wide">Throughput</span>
              <span className="text-xs font-mono text-slate-300">1.2 GB/s</span>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-1.5 hover:bg-[#0f0f0f] border border-[#1a1a1a] transition-all"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDown size={14} className="text-slate-400" />
            ) : (
              <ChevronUp size={14} className="text-slate-400" />
            )}
          </button>
        </div>

        {/* Expanded view - additional details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[#1a1a1a] grid grid-cols-3 gap-6">
            {/* All Systems */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">All Systems</div>
              <div className="space-y-2">
                {systems.map((system) => {
                  const Icon = system.icon;
                  return (
                    <div
                      key={system.id}
                      onClick={() => handleUnitClick(system)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#0f0f0f] border border-[#1a1a1a] cursor-pointer hover:bg-[#0a0a0a] hover:border-[#0088ff]/30 transition-all"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(system.status)}`}></div>
                      <Icon size={14} className={getStatusColor(system.status)} />
                      <div className="flex-1">
                        <div className="text-xs font-mono text-slate-300">{system.id}</div>
                        <div className="text-xs text-slate-500">{system.name}</div>
                      </div>
                      <span className={`text-xs uppercase ${getStatusColor(system.status)}`}>
                        {system.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Units */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">All Units</div>
              <div className="space-y-2">
                {units.map((unit) => (
                  <div
                    key={unit.id}
                    onClick={() => handleUnitClick(unit)}
                    className="flex items-center gap-2 px-3 py-2 bg-[#0f0f0f] border border-[#1a1a1a] cursor-pointer hover:bg-[#0a0a0a] hover:border-[#0088ff]/30 transition-all"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(unit.status)}`}></div>
                    <div className="flex-1">
                      <div className="text-xs font-mono text-slate-300">{unit.id}</div>
                      <div className="text-xs text-slate-500">{unit.type}</div>
                    </div>
                    <span className={`text-xs uppercase ${getStatusColor(unit.status)}`}>
                      {unit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Metrics */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">System Health</div>
              <div className="space-y-3">
                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Network Status</div>
                  <div className="text-sm font-mono text-white">All Systems Operational</div>
                </div>
                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Last Health Check</div>
                  <div className="text-sm font-mono text-white">{new Date().toLocaleTimeString()}</div>
                </div>
                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Active Connections</div>
                  <div className="text-sm font-mono text-white">24</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </footer>

      {/* Unit Page Modal (for carrier/intelligence units) */}
      <UnitPageModal
        isOpen={showUnitPage && !!selectedUnit}
        onClose={() => {
          setShowUnitPage(false);
          setSelectedUnit(null);
        }}
        unit={selectedUnit}
      />

      {/* Unit Info Modal (for systems) */}
      <UnitInfoModal
        isOpen={!showUnitPage && !!selectedUnit}
        onClose={() => setSelectedUnit(null)}
        unit={selectedUnit}
      />
    </>
  );
};
