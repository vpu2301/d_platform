import React, { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { scenarios } from '../../data/scenarios';

/**
 * Scenario injection interface modal
 */
export const SimulationModal = ({ isOpen, onClose, onScenarioSelect, currentScenario }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(currentScenario?.id || 'random_walk');
  const [targetLat, setTargetLat] = useState('48.201');
  const [targetLng, setTargetLng] = useState('16.378');

  const handleApply = () => {
    let scenario = scenarios.find((s) => s.id === selectedScenarioId);
    
    // For hostile intercept, allow custom target coordinates
    if (scenario?.id === 'hostile_intercept') {
      scenario = {
        ...scenario,
        target: {
          lat: parseFloat(targetLat),
          lng: parseFloat(targetLng),
        },
      };
    }
    
    onScenarioSelect?.(scenario);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Simulation Scenario">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Select Scenario</label>
          <div className="space-y-2">
            {scenarios.map((scenario) => (
              <label
                key={scenario.id}
                className={`flex items-center gap-3 p-3 glass rounded cursor-pointer transition-all ${
                  selectedScenarioId === scenario.id
                    ? 'ring-2 ring-slate-600 bg-slate-900/50'
                    : 'hover:bg-slate-800/50'
                }`}
              >
                <input
                  type="radio"
                  name="scenario"
                  value={scenario.id}
                  checked={selectedScenarioId === scenario.id}
                  onChange={(e) => setSelectedScenarioId(e.target.value)}
                  className="text-slate-400"
                />
                <div>
                  <div className="text-slate-200 font-semibold">{scenario.name}</div>
                  <div className="text-slate-400 text-sm">{scenario.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Target coordinates for hostile intercept */}
        {selectedScenarioId === 'hostile_intercept' && (
          <div className="space-y-2 pt-4 border-t border-slate-700">
            <label className="block text-sm text-slate-400">Target Coordinates</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={targetLat}
                  onChange={(e) => setTargetLat(e.target.value)}
                  className="w-full px-3 py-2 glass rounded text-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="48.201"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={targetLng}
                  onChange={(e) => setTargetLng(e.target.value)}
                  className="w-full px-3 py-2 glass rounded text-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="16.378"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-700">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Scenario
          </Button>
        </div>
      </div>
    </Modal>
  );
};
