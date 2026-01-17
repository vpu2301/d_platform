import React from 'react';
import { DroneCard } from '../features/drones/DroneCard';
import { Badge } from '../components/Badge';
import { useDroneFleet } from '../hooks/useDroneFleet';

/**
 * Fleet status grid with detailed telemetry
 */
export const Fleet = ({ drones = [], onDroneClick, selectedDroneId }) => {
  const { getActiveDrones, getReturningDrones, getMaintenanceDrones } = useDroneFleet(drones);

  const activeDrones = getActiveDrones();
  const returningDrones = getReturningDrones();
  const maintenanceDrones = getMaintenanceDrones();

  const stats = [
    { label: 'Total', value: drones.length, color: 'text-slate-300' },
    { label: 'Active', value: activeDrones.length, color: 'text-slate-300' },
    { label: 'Returning', value: returningDrones.length, color: 'text-slate-400' },
    { label: 'Maintenance', value: maintenanceDrones.length, color: 'text-slate-500' },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4 min-h-0">
      {/* Header with stats */}
      <div>
        <h1 className="text-2xl font-bold text-slate-200 mb-4">Fleet Management</h1>
        <div className="flex gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-lg p-3 min-w-[100px]">
              <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drones.map((drone) => (
            <DroneCard
              key={drone.id}
              drone={drone}
              onClick={() => onDroneClick?.(drone)}
              isSelected={drone.id === selectedDroneId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
