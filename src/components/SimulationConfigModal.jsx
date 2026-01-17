import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { MapPin, Users, Radio, Calendar, Database, CheckCircle, Settings } from 'lucide-react';

/**
 * Simulation Configuration Modal - Configure new mission simulation
 */
export const SimulationConfigModal = ({ isOpen, onClose, onStartSimulation }) => {
  const [config, setConfig] = useState({
    name: 'New Simulation',
    location: {
      lat: 52.1986,
      lng: 8.5911,
      name: 'Bünde, Germany',
    },
    units: [],
    troops: [],
    divisions: [],
    commands: [],
    dataSources: [],
    timeframe: {
      start: new Date().toISOString().split('T')[0],
      duration: 24, // hours
    },
  });

  // Available options
  const availableUnits = [
    { id: 'UNIT-ALPHA', name: 'UNIT-ALPHA', type: 'Reconnaissance' },
    { id: 'UNIT-BRAVO', name: 'UNIT-BRAVO', type: 'Surveillance' },
    { id: 'UNIT-CHARLIE', name: 'UNIT-CHARLIE', type: 'Support' },
    { id: 'UNIT-DELTA', name: 'UNIT-DELTA', type: 'Transport' },
  ];

  const availableTroops = [
    { id: 'TROOP-1', name: 'Alpha Troop', size: 24, type: 'Infantry' },
    { id: 'TROOP-2', name: 'Bravo Troop', size: 18, type: 'Recon' },
    { id: 'TROOP-3', name: 'Charlie Troop', size: 32, type: 'Armored' },
  ];

  const availableDivisions = [
    { id: 'DIV-1', name: '1st Division', units: 4, status: 'active' },
    { id: 'DIV-2', name: '2nd Division', units: 3, status: 'standby' },
    { id: 'DIV-3', name: '3rd Division', units: 5, status: 'active' },
  ];

  const availableCommands = [
    { id: 'CMD-1', name: 'COMMAND-ALPHA', operator: 'OPS-ALPHA' },
    { id: 'CMD-2', name: 'COMMAND-BRAVO', operator: 'OPS-BRAVO' },
    { id: 'CMD-3', name: 'COMMAND-CHARLIE', operator: 'OPS-CHARLIE' },
  ];

  const dataSources = [
    { id: 'SAT-1', name: 'Satellite Link', type: 'SAT' },
    { id: 'COM-1', name: 'Command Center', type: 'COM' },
    { id: 'SIG-1', name: 'SIGINT Station', type: 'SIGINT' },
    { id: 'EO-1', name: 'EO/IR Sensor', type: 'EO/IR' },
  ];

  const toggleSelection = (array, item, setter) => {
    setter((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleStart = () => {
    onStartSimulation?.(config);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NEW SIMULATION CONFIGURATION" className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Basic Configuration */}
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Simulation Name</label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono"
            placeholder="Enter simulation name"
          />
        </div>

        {/* Location */}
        <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-[#0088ff]" />
            <span className="text-xs text-slate-500 uppercase tracking-wide">Location</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Location Name</label>
              <input
                type="text"
                value={config.location.name}
                onChange={(e) => setConfig({ ...config, location: { ...config.location, name: e.target.value } })}
                className="w-full px-2 py-1.5 bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={config.location.lat}
                onChange={(e) => setConfig({ ...config, location: { ...config.location, lat: parseFloat(e.target.value) } })}
                className="w-full px-2 py-1.5 bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={config.location.lng}
                onChange={(e) => setConfig({ ...config, location: { ...config.location, lng: parseFloat(e.target.value) } })}
                className="w-full px-2 py-1.5 bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Units Selection */}
        <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-[#0088ff]" />
            <span className="text-xs text-slate-500 uppercase tracking-wide">Units</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {availableUnits.map((unit) => {
              const isSelected = config.units.find((u) => u.id === unit.id);
              return (
                <button
                  key={unit.id}
                  onClick={() => toggleSelection(config.units, unit, (setter) => setConfig({ ...config, units: setter }))}
                  className={`p-2 border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0088ff]/10 border-[#0088ff]/30 text-[#0088ff]'
                      : 'bg-[#0f0f0f] border-[#1a1a1a] text-slate-400 hover:border-[#0088ff]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono">{unit.name}</span>
                    {isSelected && <CheckCircle size={14} />}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{unit.type}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Troops Selection */}
        <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-[#0088ff]" />
            <span className="text-xs text-slate-500 uppercase tracking-wide">Troops</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableTroops.map((troop) => {
              const isSelected = config.troops.find((t) => t.id === troop.id);
              return (
                <button
                  key={troop.id}
                  onClick={() => toggleSelection(config.troops, troop, (setter) => setConfig({ ...config, troops: setter }))}
                  className={`p-2 border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0088ff]/10 border-[#0088ff]/30 text-[#0088ff]'
                      : 'bg-[#0f0f0f] border-[#1a1a1a] text-slate-400 hover:border-[#0088ff]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono">{troop.name}</span>
                    {isSelected && <CheckCircle size={14} />}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{troop.size} - {troop.type}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divisions Selection */}
        <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <Radio size={16} className="text-[#0088ff]" />
            <span className="text-xs text-slate-500 uppercase tracking-wide">Divisions</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableDivisions.map((division) => {
              const isSelected = config.divisions.find((d) => d.id === division.id);
              return (
                <button
                  key={division.id}
                  onClick={() => toggleSelection(config.divisions, division, (setter) => setConfig({ ...config, divisions: setter }))}
                  className={`p-2 border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0088ff]/10 border-[#0088ff]/30 text-[#0088ff]'
                      : 'bg-[#0f0f0f] border-[#1a1a1a] text-slate-400 hover:border-[#0088ff]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono">{division.name}</span>
                    {isSelected && <CheckCircle size={14} />}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{division.units} units - {division.status}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Commands Selection */}
        <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <Radio size={16} className="text-[#0088ff]" />
            <span className="text-xs text-slate-500 uppercase tracking-wide">Command Assignments</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableCommands.map((command) => {
              const isSelected = config.commands.find((c) => c.id === command.id);
              return (
                <button
                  key={command.id}
                  onClick={() => toggleSelection(config.commands, command, (setter) => setConfig({ ...config, commands: setter }))}
                  className={`p-2 border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0088ff]/10 border-[#0088ff]/30 text-[#0088ff]'
                      : 'bg-[#0f0f0f] border-[#1a1a1a] text-slate-400 hover:border-[#0088ff]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono">{command.name}</span>
                    {isSelected && <CheckCircle size={14} />}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">OP: {command.operator}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Sources */}
        <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <Database size={16} className="text-[#0088ff]" />
            <span className="text-xs text-slate-500 uppercase tracking-wide">Data Sources</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {dataSources.map((source) => {
              const isSelected = config.dataSources.find((s) => s.id === source.id);
              return (
                <button
                  key={source.id}
                  onClick={() => toggleSelection(config.dataSources, source, (setter) => setConfig({ ...config, dataSources: setter }))}
                  className={`p-2 border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0088ff]/10 border-[#0088ff]/30 text-[#0088ff]'
                      : 'bg-[#0f0f0f] border-[#1a1a1a] text-slate-400 hover:border-[#0088ff]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono">{source.id}</span>
                    {isSelected && <CheckCircle size={14} />}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{source.type}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeframe */}
        <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-[#0088ff]" />
            <span className="text-xs text-slate-500 uppercase tracking-wide">Timeframe</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Start Date</label>
              <input
                type="date"
                value={config.timeframe.start}
                onChange={(e) => setConfig({ ...config, timeframe: { ...config.timeframe, start: e.target.value } })}
                className="w-full px-2 py-1.5 bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Duration (Hours)</label>
              <input
                type="number"
                min="1"
                max="168"
                value={config.timeframe.duration}
                onChange={(e) => setConfig({ ...config, timeframe: { ...config.timeframe, duration: parseInt(e.target.value) } })}
                className="w-full px-2 py-1.5 bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1a1a1a]">
          <Button variant="ghost" onClick={onClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleStart}>
            START SIMULATION
          </Button>
        </div>
      </div>
    </Modal>
  );
};
