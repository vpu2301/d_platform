import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

/**
 * Configuration panel
 * Future: theme switching to Gotham
 */
export const Settings = () => {
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold text-cyan-400">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Appearance">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Theme</label>
              <div className="text-cyan-400 font-mono">AEROSIGHT v2.0</div>
              <p className="text-xs text-slate-500 mt-1">
                Gotham theme coming soon
              </p>
            </div>
          </div>
        </Card>

        <Card title="Simulation">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Tick Rate</label>
              <div className="text-cyan-400 font-mono">1000ms</div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Resource Decay</label>
              <div className="text-cyan-400 font-mono">0.005% per tick</div>
            </div>
          </div>
        </Card>

        <Card title="System Information">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Platform</span>
              <span className="text-cyan-400 font-mono">AEROSIGHT v2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Build</span>
              <span className="text-cyan-400 font-mono">Release Candidate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Environment</span>
              <span className="text-cyan-400 font-mono">Browser-based</span>
            </div>
          </div>
        </Card>

        <Card title="About">
          <div className="space-y-2 text-sm text-slate-400">
            <p>
              AEROSIGHT is a high-fidelity, web-based Command and Control (C2) interface
              designed for Unmanned Aerial Systems (UAS).
            </p>
            <p>
              It provides operators with a "single pane of glass" view to monitor drone fleets,
              analyze geospatial intelligence, and manage tactical missions.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
