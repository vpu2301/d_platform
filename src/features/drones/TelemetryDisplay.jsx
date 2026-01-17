import React from 'react';
import { Battery, Signal, Navigation, Gauge } from 'lucide-react';

/**
 * Real-time telemetry metric display
 */
export const TelemetryDisplay = ({ drone }) => {
  const metrics = [
    {
      label: 'Battery',
      value: `${drone.battery.toFixed(1)}%`,
      icon: Battery,
      color: drone.battery > 50 ? 'text-slate-300' : drone.battery > 20 ? 'text-slate-400' : 'text-slate-500',
    },
    {
      label: 'Signal',
      value: `${drone.signal.toFixed(0)} dB`,
      icon: Signal,
      color: drone.signal > 90 ? 'text-slate-300' : 'text-slate-400',
    },
    {
      label: 'Altitude',
      value: `${drone.altitude.toFixed(0)} m`,
      icon: Navigation,
      color: 'text-slate-300',
    },
    {
      label: 'Speed',
      value: `${drone.speed.toFixed(1)} m/s`,
      icon: Gauge,
      color: 'text-slate-300',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className="flex items-center gap-3 glass rounded p-3">
            <Icon size={24} className={metric.color} />
            <div>
              <div className="text-xs text-slate-400 font-mono">{metric.label}</div>
              <div className={`text-lg font-mono font-semibold ${metric.color}`}>
                {metric.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
