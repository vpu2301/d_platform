import React from 'react';
import { Activity, Network, Server, Shield, Radio, Satellite, X, Battery, Signal, Navigation, Gauge, MapPin } from 'lucide-react';
import { Modal } from './Modal';

/**
 * Unit information modal - shows detailed unit/system information
 */
export const UnitInfoModal = ({ isOpen, onClose, unit }) => {
  if (!unit) return null;

  const systemIcons = {
    'SAT-1': Satellite,
    'COM-1': Radio,
    'SVR-1': Server,
    'SEC-1': Shield,
    'NET-1': Network,
  };

  const Icon = systemIcons[unit.id] || Activity;

  // Mock detailed data for systems
  const systemDetails = {
    'SAT-1': {
      name: 'Satellite Link',
      description: 'Primary satellite communication link',
      metrics: [
        { label: 'Signal Strength', value: '98%', icon: Signal },
        { label: 'Latency', value: '42ms', icon: Gauge },
        { label: 'Uptime', value: '99.8%', icon: Activity },
      ],
      status: 'Operational',
      location: 'Orbital Position 12.5°',
      lastUpdate: new Date().toLocaleTimeString(),
    },
    'COM-1': {
      name: 'Command Center',
      description: 'Primary command and control center',
      metrics: [
        { label: 'Connected Units', value: '12', icon: Network },
        { label: 'Active Channels', value: '8', icon: Radio },
        { label: 'Throughput', value: '1.2 GB/s', icon: Gauge },
      ],
      status: 'Operational',
      location: 'Base Station Alpha',
      lastUpdate: new Date().toLocaleTimeString(),
    },
    'SVR-1': {
      name: 'Data Server',
      description: 'Central data processing and storage',
      metrics: [
        { label: 'CPU Usage', value: '45%', icon: Activity },
        { label: 'Memory', value: '67%', icon: Server },
        { label: 'Storage', value: '234 GB', icon: Server },
      ],
      status: 'Operational',
      location: 'Data Center 1',
      lastUpdate: new Date().toLocaleTimeString(),
    },
    'SEC-1': {
      name: 'Security Layer',
      description: 'Security and encryption layer',
      metrics: [
        { label: 'Encryption Status', value: 'Active', icon: Shield },
        { label: 'Threat Level', value: 'Low', icon: Shield },
        { label: 'Active Sessions', value: '24', icon: Network },
      ],
      status: 'Operational',
      location: 'Secure Zone',
      lastUpdate: new Date().toLocaleTimeString(),
    },
    'NET-1': {
      name: 'Network Hub',
      description: 'Network routing and switching hub',
      metrics: [
        { label: 'Connected Nodes', value: '48', icon: Network },
        { label: 'Bandwidth', value: '10 Gbps', icon: Gauge },
        { label: 'Packet Loss', value: '0.01%', icon: Activity },
      ],
      status: 'Operational',
      location: 'Network Core',
      lastUpdate: new Date().toLocaleTimeString(),
    },
  };

  // Mock detailed data for units
  const unitDetails = {
    'UNIT-ALPHA': {
      name: 'Reconnaissance Unit Alpha',
      description: 'Primary reconnaissance and surveillance unit',
      metrics: [
        { label: 'Mission Status', value: 'Active', icon: Activity },
        { label: 'Last Contact', value: '2 min ago', icon: Radio },
        { label: 'Coverage Area', value: '50 km²', icon: MapPin },
      ],
      status: 'Active',
      location: 'Grid B7',
      lastUpdate: new Date().toLocaleTimeString(),
    },
    'UNIT-BRAVO': {
      name: 'Surveillance Unit Bravo',
      description: 'Extended surveillance operations',
      metrics: [
        { label: 'Mission Status', value: 'Active', icon: Activity },
        { label: 'Last Contact', value: '5 min ago', icon: Radio },
        { label: 'Coverage Area', value: '75 km²', icon: MapPin },
      ],
      status: 'Active',
      location: 'Grid C9',
      lastUpdate: new Date().toLocaleTimeString(),
    },
    'UNIT-CHARLIE': {
      name: 'Support Unit Charlie',
      description: 'Logistics and support operations',
      metrics: [
        { label: 'Mission Status', value: 'Standby', icon: Activity },
        { label: 'Last Contact', value: '1 min ago', icon: Radio },
        { label: 'Resources', value: '87%', icon: Battery },
      ],
      status: 'Standby',
      location: 'Base Station',
      lastUpdate: new Date().toLocaleTimeString(),
    },
    'UNIT-DELTA': {
      name: 'Transport Unit Delta',
      description: 'Transport and deployment operations',
      metrics: [
        { label: 'Mission Status', value: 'Active', icon: Activity },
        { label: 'Last Contact', value: '3 min ago', icon: Radio },
        { label: 'Capacity', value: '6/8', icon: Navigation },
      ],
      status: 'Active',
      location: 'Grid A3',
      lastUpdate: new Date().toLocaleTimeString(),
    },
  };

  const details = unit.type ? unitDetails[unit.id] : systemDetails[unit.id];
  if (!details) return null;

  const getStatusColor = (status) => {
    if (status === 'online' || status === 'active' || status === 'Operational') {
      return 'text-green-500';
    } else if (status === 'standby') {
      return 'text-[#ffaa00]';
    }
    return 'text-slate-500';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${unit.id} - ${details.name}`}>
      <div className="space-y-6">
        {/* Header Info */}
        <div className="border-b border-[#1a1a1a] pb-4">
          <p className="text-sm text-slate-400 mb-4">{details.description}</p>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Status</span>
              <div className={`text-sm font-semibold mt-1 ${getStatusColor(details.status)}`}>
                {details.status}
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Location</span>
              <div className="text-sm font-mono text-white mt-1">{details.location}</div>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Last Update</span>
              <div className="text-sm font-mono text-slate-300 mt-1">{details.lastUpdate}</div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div>
          <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            {details.metrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <div key={index} className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-2">
                    <MetricIcon size={16} className="text-slate-400" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">{metric.label}</span>
                  </div>
                  <div className="text-lg font-mono font-semibold text-white">{metric.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System/Unit Icon Display */}
        <div className="flex justify-center pt-4 border-t border-[#1a1a1a]">
          <div className="w-24 h-24 flex items-center justify-center border-2 border-[#1a1a1a] bg-[#0a0a0a]">
            <Icon size={48} className={getStatusColor(unit.status)} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
