import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Layers, Target, Play, Square } from 'lucide-react';
import { Button } from './Button';

/**
 * Swarm Controller - Liquid glass draggable widget for swarm operations
 * Expandable/collapsible, can be moved around the screen
 */
export const SwarmController = ({ onLaunchSwarm, onStopSwarm, droneCount = 8, activeSwarm = null }) => {
  const [isExpanded, setIsExpanded] = useState(true); // Expanded by default for visibility
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e) => {
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  return (
    <div
      ref={widgetRef}
      className="fixed z-[9999] select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        maxWidth: '300px',
      }}
    >
      <div className="glass-heavy border border-[#0088ff]/30 shadow-2xl backdrop-blur-xl">
        {/* Header - Always visible, draggable */}
        <div
          className="flex items-center justify-between p-3 cursor-move border-b border-[#1a1a1a] bg-[#0088ff]/10"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#0088ff]" />
            <span className="text-xs font-mono font-semibold text-white uppercase tracking-wide">
              Swarm Controller
            </span>
            {activeSwarm && (
              <span className="px-2 py-0.5 text-[10px] font-mono bg-red-500/20 text-red-500 border border-red-500/30">
                ACTIVE
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 hover:bg-[#0088ff]/20 text-slate-400 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 space-y-3">
            {/* Status */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Ready Drones:</span>
              <span className="font-mono text-white font-semibold">{droneCount}</span>
            </div>

            {activeSwarm ? (
              /* Active Swarm Controls */
              <div className="space-y-3 pt-2 border-t border-[#1a1a1a]">
                <div className="text-xs text-slate-400 mb-2">
                  Active: <span className="text-white font-mono">{activeSwarm.tactic}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div>Drones:</div>
                  <div className="font-mono text-white">{activeSwarm.droneCount}</div>
                  <div>Status:</div>
                  <div className="font-mono text-green-500">{activeSwarm.status}</div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onStopSwarm?.()}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Square size={14} />
                  <span>STOP SWARM</span>
                </Button>
              </div>
            ) : (
              /* Inactive - Launch Controls */
              <div className="space-y-3 pt-2 border-t border-[#1a1a1a]">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onLaunchSwarm?.()}
                  disabled={droneCount < 2}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Target size={14} />
                  <span>LAUNCH SWARM</span>
                </Button>
                {droneCount < 2 && (
                  <div className="text-[10px] text-[#ffaa00] text-center">
                    Minimum 2 drones required
                  </div>
                )}
              </div>
            )}

            {/* Quick Stats */}
            {isExpanded && (
              <div className="pt-2 border-t border-[#1a1a1a] space-y-1 text-[10px] text-slate-500">
                <div className="flex justify-between">
                  <span>Available:</span>
                  <span className="text-slate-300">{droneCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={activeSwarm ? 'text-green-500' : 'text-slate-400'}>
                    {activeSwarm ? 'ENGAGED' : 'STANDBY'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
