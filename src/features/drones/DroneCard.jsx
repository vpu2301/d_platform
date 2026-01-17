import React from 'react';
import { MapPin, Activity, AlertCircle } from 'lucide-react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { TelemetryDisplay } from './TelemetryDisplay';

/**
 * Drone card component with telemetry display
 */
export const DroneCard = ({ drone, onClick, isSelected }) => {
  const statusVariants = {
    active: 'active',
    returning: 'returning',
    maintenance: 'maintenance',
  };

  return (
    <Card
      title={`${drone.model} - ${drone.id}`}
      subtitle={`UUID: ${drone.uuid}`}
      className={`transition-all ${isSelected ? 'ring-2 ring-slate-500' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Status and location */}
        <div className="flex items-center justify-between">
          <Badge variant={statusVariants[drone.status] || 'default'}>
            {drone.status.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
            <MapPin size={14} />
            {drone.lat.toFixed(4)}, {drone.lng.toFixed(4)}
          </div>
        </div>

        {/* Telemetry */}
        <TelemetryDisplay drone={drone} />

        {/* Heading */}
        <div className="flex items-center gap-2 text-slate-400">
          <Activity size={16} />
          <span className="text-xs font-mono">Heading: {drone.heading.toFixed(0)}°</span>
        </div>

        {/* Low battery warning */}
        {drone.battery < 20 && (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <AlertCircle size={16} />
            <span>Low Battery Warning</span>
          </div>
        )}
      </div>
    </Card>
  );
};
