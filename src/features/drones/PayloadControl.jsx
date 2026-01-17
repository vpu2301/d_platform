import React from 'react';
import { Camera, Settings } from 'lucide-react';
import { Button } from '../../components/Button';

/**
 * Interactive payload mode switching component
 */
export const PayloadControl = ({ drone, onModeChange }) => {
  const modes = drone?.payloadConfig?.modes || [];
  const currentMode = drone?.payloadConfig?.currentMode || modes[0];

  const modeIcons = {
    Thermal: '🔥',
    Night: '🌙',
    RGB: '📷',
    Ground: '🌍',
    Air: '✈️',
    Maritime: '🌊',
    COMINT: '📡',
    ELINT: '📻',
  };

  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Camera size={20} className="text-slate-300" />
        <h3 className="text-slate-200 font-semibold">Payload Control</h3>
      </div>

      <div className="mb-3">
        <div className="text-sm text-slate-400 mb-1">Payload Type</div>
        <div className="text-slate-300 font-mono font-semibold">{drone?.payload}</div>
      </div>

      {drone?.payloadConfig && (
        <div className="mb-4">
          <div className="text-sm text-slate-400 mb-1">Current Mode</div>
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <span className="text-xl">{modeIcons[currentMode] || '📷'}</span>
            <span className="font-semibold">{currentMode}</span>
            <span className="text-slate-500">({drone.payloadConfig.zoom})</span>
          </div>
        </div>
      )}

      <div>
        <div className="text-sm text-slate-400 mb-2">Available Modes</div>
        <div className="flex flex-wrap gap-2">
          {modes.map((mode) => (
            <Button
              key={mode}
              variant={mode === currentMode ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onModeChange?.(drone.id, mode)}
            >
              <span className="mr-1">{modeIcons[mode] || '📷'}</span>
              {mode}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
