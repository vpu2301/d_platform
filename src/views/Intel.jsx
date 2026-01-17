import React from 'react';
import { IntelFeed } from '../features/operations/IntelFeed';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

/**
 * Intelligence dashboard with feed and alerts
 */
export const Intel = ({ intelAlerts = [] }) => {
  const criticalAlerts = intelAlerts.filter((a) => a.severity === 'critical');
  const highAlerts = intelAlerts.filter((a) => a.severity === 'high');
  const mediumAlerts = intelAlerts.filter((a) => a.severity === 'medium');
  const lowAlerts = intelAlerts.filter((a) => a.severity === 'low');

  const summary = [
    { label: 'Critical', count: criticalAlerts.length, variant: 'critical' },
    { label: 'High', count: highAlerts.length, variant: 'high' },
    { label: 'Medium', count: mediumAlerts.length, variant: 'medium' },
    { label: 'Low', count: lowAlerts.length, variant: 'low' },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-200 mb-4">Intelligence Dashboard</h1>
        <div className="flex gap-4">
          {summary.map((item) => (
            <div key={item.label} className="glass rounded-lg p-3 min-w-[120px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{item.label}</span>
                <Badge variant={item.variant}>{item.count}</Badge>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-300">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intel feed */}
      <div className="flex-1">
        <IntelFeed alerts={intelAlerts} />
      </div>
    </div>
  );
};
