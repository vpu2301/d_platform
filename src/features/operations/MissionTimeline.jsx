import React from 'react';

/**
 * Horizontal timeline visualization matching design
 */
export const MissionTimeline = ({ phases = [] }) => {
  const now = Date.now();
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getPhaseStatus = (phase) => {
    if (now < phase.startTime) return 'pending';
    if (now >= phase.startTime && now < phase.endTime) return 'active';
    return 'completed';
  };

  return (
    <div className="flex items-center gap-4">
      {phases.map((phase, index) => {
        const status = getPhaseStatus(phase);
        return (
          <React.Fragment key={phase.id}>
            <div className="flex flex-col items-center gap-2">
              <div className={`text-xs font-mono ${
                status === 'active' ? 'text-white' : 'text-slate-500'
              }`}>
                {formatTime(phase.startTime)}
              </div>
              <div className={`w-2 h-2 rounded-full ${
                status === 'active' ? 'bg-white' :
                status === 'completed' ? 'bg-slate-600' :
                'bg-slate-700'
              }`}></div>
              <div className={`text-xs font-semibold ${
                status === 'active' ? 'text-white' : 'text-slate-400'
              }`}>
                {phase.name}
              </div>
            </div>
            {index < phases.length - 1 && (
              <div className={`h-px w-12 ${
                status === 'completed' ? 'bg-slate-600' : 'bg-slate-700'
              }`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
