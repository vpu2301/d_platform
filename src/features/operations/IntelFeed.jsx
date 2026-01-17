import React from 'react';

/**
 * Intel feed matching design - red highlighting for critical alerts
 */
export const IntelFeed = ({ alerts = [] }) => {
  // Sort alerts by severity (critical first) and then by timestamp (newest first)
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const severityDiff = (severityOrder[a.severity] || 4) - (severityOrder[b.severity] || 4);
    if (severityDiff !== 0) return severityDiff;
    return b.timestamp - a.timestamp;
  });

  const isHostileOrCritical = (alert) => {
    return alert.category === 'HOSTILE' || 
           alert.category === 'JAMMING' || 
           alert.severity === 'critical' || 
           alert.severity === 'high';
  };

  return (
    <div className="space-y-2">
      {sortedAlerts.length === 0 ? (
        <div className="text-center text-slate-500 py-4">
          <p className="text-xs">No intelligence alerts</p>
        </div>
      ) : (
        sortedAlerts.slice(0, 10).map((alert) => {
          const isRed = isHostileOrCritical(alert);
          
          return (
            <div
              key={alert.id}
              className={`p-2 border border-[#1a1a1a] ${
                isRed ? 'bg-red-500/10 border-red-500/30' : 'bg-[#0a0a0a]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold uppercase ${
                  isRed ? 'text-red-500' : 'text-slate-400'
                }`}>
                  {alert.category}
                </span>
                <span className={`text-xs font-mono ${
                  isRed ? 'text-red-400' : 'text-slate-500'
                }`}>
                  {alert.time}
                </span>
              </div>
              <div className={`text-sm ${
                isRed ? 'text-red-300' : 'text-slate-300'
              }`}>
                {alert.title} - {alert.location}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
