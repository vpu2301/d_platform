import React from 'react';
import { Activity, CheckCircle, Clock, AlertTriangle, MapPin, Users, Radio, Database } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

/**
 * Simulation Results Panel - Shows simulation progress and results
 */
export const SimulationResults = ({ results }) => {
  if (!results) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'running':
        return 'text-[#0088ff]';
      case 'paused':
        return 'text-[#ffaa00]';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'running':
        return Activity;
      case 'paused':
        return Clock;
      case 'failed':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const StatusIcon = getStatusIcon(results.status);

  return (
    <div className="border-t border-[#1a1a1a] bg-[#0f0f0f] max-h-64 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <StatusIcon size={20} className={getStatusColor(results.status)} />
            <div>
              <div className="text-sm font-mono text-white uppercase tracking-wide">{results.config.name}</div>
              <div className="text-xs text-slate-500">{results.status.toUpperCase()} • {results.config.location.name}</div>
            </div>
          </div>
          <Badge variant={results.status === 'completed' ? 'success' : results.status === 'running' ? 'active' : 'warning'}>
            {results.status.toUpperCase()}
          </Badge>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-[#0088ff]" />
              <div className="text-xs text-slate-500 uppercase tracking-wide">Total Units</div>
            </div>
            <div className="text-2xl font-mono font-bold text-white">{results.metrics.totalUnits}</div>
            <div className="text-xs text-slate-400 mt-1">Active: {results.metrics.activeUnits}</div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-[#0088ff]" />
              <div className="text-xs text-slate-500 uppercase tracking-wide">Coverage</div>
            </div>
            <div className="text-lg font-mono font-bold text-white">{results.metrics.coverageArea}</div>
            <div className="text-xs text-slate-400 mt-1">Area monitored</div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-[#0088ff]" />
              <div className="text-xs text-slate-500 uppercase tracking-wide">Duration</div>
            </div>
            <div className="text-lg font-mono font-bold text-white">{results.metrics.missionDuration}</div>
            <div className="text-xs text-slate-400 mt-1">Timeframe</div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Database size={14} className="text-[#0088ff]" />
              <div className="text-xs text-slate-500 uppercase tracking-wide">Data Sources</div>
            </div>
            <div className="text-lg font-mono font-bold text-white">{results.config.dataSources.length}</div>
            <div className="text-xs text-slate-400 mt-1">Active feeds</div>
          </Card>
        </div>

        {/* Configuration Summary */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="border border-[#1a1a1a] p-2 bg-[#0a0a0a]">
            <div className="text-slate-500 uppercase tracking-wide mb-1">Units</div>
            <div className="text-slate-300 font-mono">{results.config.units.map(u => u.name).join(', ') || 'None'}</div>
          </div>
          <div className="border border-[#1a1a1a] p-2 bg-[#0a0a0a]">
            <div className="text-slate-500 uppercase tracking-wide mb-1">Divisions</div>
            <div className="text-slate-300 font-mono">{results.config.divisions.map(d => d.name).join(', ') || 'None'}</div>
          </div>
          <div className="border border-[#1a1a1a] p-2 bg-[#0a0a0a]">
            <div className="text-slate-500 uppercase tracking-wide mb-1">Commands</div>
            <div className="text-slate-300 font-mono">{results.config.commands.map(c => c.name).join(', ') || 'None'}</div>
          </div>
        </div>

        {/* Progress Bar */}
        {results.status === 'running' && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>SIMULATION PROGRESS</span>
              <span className="font-mono">{Math.round(results.progress)}%</span>
            </div>
            <div className="h-1 bg-[#1a1a1a] overflow-hidden">
              <div
                className="h-full bg-[#0088ff] transition-all duration-300"
                style={{ width: `${results.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
