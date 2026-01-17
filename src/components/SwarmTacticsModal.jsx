import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Badge } from './Badge';
import { Target, Layers, Zap, Shield, Navigation, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

/**
 * Swarm Tactics Modal - Predefined swarm tactics with illustrations and recommendations
 */
export const SwarmTacticsModal = ({ isOpen, onClose, onSelectTactic, droneCount = 8 }) => {
  const [selectedTactic, setSelectedTactic] = useState(null);

  const tactics = [
    {
      id: 'convergence',
      name: 'Convergence Attack',
      description: 'Multiple drones converge on a single target from different angles simultaneously.',
      icon: Target,
      color: 'text-red-500',
      illustration: (
        <div className="relative w-full h-32 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
          <div className="absolute w-8 h-8 bg-red-500/30 border border-red-500 rounded-full"></div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1" strokeDasharray="2 2"/>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 50 + 35 * Math.cos(rad);
              const y1 = 50 + 35 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2="50"
                  y2="50"
                  stroke="rgba(239, 68, 68, 0.6)"
                  strokeWidth="1"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            <defs>
              <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <polygon points="0 0, 4 2, 0 4" fill="rgba(239, 68, 68, 0.6)" />
              </marker>
            </defs>
          </svg>
        </div>
      ),
      recommendation: droneCount >= 4 ? 'EXCELLENT - Recommended for this drone count' : 'MINIMUM 4 drones required',
      effectiveness: 'HIGH',
      useCase: 'Single high-value target elimination',
      minDrones: 4,
      maxDrones: 10,
      explanation: 'Convergence Attack is a coordinated strike where multiple drones approach a single target from different angles simultaneously. This tactic ensures maximum impact probability by overwhelming the target from multiple vectors. The drones converge at a predetermined time and location, minimizing the target\'s ability to evade or counter-attack. Ideal for high-value stationary or slow-moving targets where precision and timing are critical.',
      howItWorks: '1. Drones are launched from different positions around the target\n2. Each drone follows a flight path that converges at the target location\n3. All drones strike simultaneously at the designated impact time\n4. The multi-vector approach reduces the chance of target escape\n5. Impact occurs from 6+ angles, maximizing destruction',
    },
    {
      id: 'wolfpack',
      name: 'Wolfpack Formation',
      description: 'Drones attack in coordinated waves, overwhelming enemy defenses.',
      icon: Layers,
      color: 'text-orange-500',
      illustration: (
        <div className="relative w-full h-32 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {[0, 1, 2].map((wave, waveIdx) => (
              <g key={waveIdx}>
                {[0, 1, 2, 3].map((drone, droneIdx) => {
                  const angle = (360 / 4) * droneIdx;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 20 + wave * 15;
                  const x = 50 + radius * Math.cos(rad);
                  const y = 50 + radius * Math.sin(rad);
                  return (
                    <circle key={droneIdx} cx={x} cy={y} r="3" fill="rgba(249, 115, 22, 0.8)" />
                  );
                })}
                <circle cx="50" cy="50" r={20 + wave * 15} fill="none" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="0.5" strokeDasharray="1 1"/>
              </g>
            ))}
            <circle cx="50" cy="50" r="4" fill="rgba(239, 68, 68, 0.8)"/>
          </svg>
        </div>
      ),
      recommendation: droneCount >= 6 ? 'OPTIMAL - Best for 6-10 drones' : 'MINIMUM 6 drones recommended',
      effectiveness: 'HIGH',
      useCase: 'Multiple targets in defended area',
      minDrones: 6,
      maxDrones: 12,
      explanation: 'Wolfpack Formation employs coordinated waves of drones that attack in sequence. The first wave engages and suppresses enemy defenses, allowing subsequent waves to penetrate deeper. This tactic is based on military swarm behavior where overwhelming numbers and sustained pressure break down defensive capabilities. Each wave exhausts defensive resources, making the target increasingly vulnerable.',
      howItWorks: '1. Drones are organized into 2-3 attack waves\n2. First wave attacks and draws defensive fire\n3. Second wave follows while defenses are reloading/repositioning\n4. Third wave exploits weakened defenses for maximum impact\n5. Waves are spaced 5-10 seconds apart for optimal timing',
    },
    {
      id: 'saturation',
      name: 'Saturation Strike',
      description: 'All drones strike the same target area simultaneously for maximum damage.',
      icon: Zap,
      color: 'text-yellow-500',
      illustration: (
        <div className="relative w-full h-32 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-yellow-500/20 border-2 border-yellow-500 rounded"></div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const distance = 30;
              const x = 50 + distance * Math.cos(rad);
              const y = 50 + distance * Math.sin(rad);
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={y}
                    x2="50"
                    y2="50"
                    stroke="rgba(234, 179, 8, 0.6)"
                    strokeWidth="1"
                    markerEnd="url(#arrowhead-yellow)"
                  />
                  <circle cx={x} cy={y} r="2" fill="rgba(234, 179, 8, 0.8)" />
                </g>
              );
            })}
            <defs>
              <marker id="arrowhead-yellow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <polygon points="0 0, 4 2, 0 4" fill="rgba(234, 179, 8, 0.6)" />
              </marker>
            </defs>
          </svg>
        </div>
      ),
      recommendation: droneCount >= 5 ? 'VERY EFFECTIVE - Maximum area damage' : 'MINIMUM 5 drones required',
      effectiveness: 'VERY HIGH',
      useCase: 'Large stationary targets or facilities',
      minDrones: 5,
      maxDrones: 10,
      explanation: 'Saturation Strike deploys all drones to strike the same target area simultaneously, creating maximum explosive force. This tactic is designed for area destruction rather than precision. By concentrating all firepower at once, the attack maximizes overpressure and fragmentation effects, ensuring complete destruction of large structures or facility complexes. The simultaneous impact creates a synergistic blast effect.',
      howItWorks: '1. All drones are deployed from the carrier simultaneously\n2. They approach the target from different angles but converge on the same area\n3. Impact occurs within a 2-second window for maximum overlap\n4. Multiple warheads detonate simultaneously, amplifying blast effects\n5. The combined overpressure and fragmentation ensures complete area denial',
    },
    {
      id: 'flanking',
      name: 'Flanking Maneuver',
      description: 'Primary attack from front while drones flank from sides and rear.',
      icon: Navigation,
      color: 'text-blue-500',
      illustration: (
        <div className="relative w-full h-32 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <rect x="45" y="45" width="10" height="10" fill="rgba(239, 68, 68, 0.8)"/>
            {/* Front attack */}
            <line x1="50" y1="45" x2="50" y2="35" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" markerEnd="url(#arrowhead-blue)"/>
            {/* Flank attacks */}
            <line x1="55" y1="50" x2="70" y2="30" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)"/>
            <line x1="55" y1="50" x2="70" y2="70" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)"/>
            <line x1="45" y1="50" x2="30" y2="30" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)"/>
            <line x1="45" y1="50" x2="30" y2="70" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)"/>
            <defs>
              <marker id="arrowhead-blue" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <polygon points="0 0, 4 2, 0 4" fill="rgba(59, 130, 246, 0.6)" />
              </marker>
            </defs>
          </svg>
        </div>
      ),
      recommendation: droneCount >= 5 ? 'RECOMMENDED - Tactically superior' : 'MINIMUM 5 drones required',
      effectiveness: 'MEDIUM-HIGH',
      useCase: 'Moving targets or defended positions',
      minDrones: 5,
      maxDrones: 10,
      explanation: 'Flanking Maneuver uses a pincer movement where the primary attack draws attention from the front, while flanking drones strike from the sides and rear. This classic military tactic exploits the target\'s natural tendency to focus on the frontal threat, leaving flanks vulnerable. The flanking drones achieve surprise and can disable key systems like engines, communications, or defensive weapons before the main strike.',
      howItWorks: '1. Primary attack force engages from the front, drawing defensive focus\n2. Flanking drones simultaneously approach from left and right sides\n3. Rear-guard drones attack from behind to prevent escape\n4. Flanking elements disable critical systems (engines, weapons, comms)\n5. Main strike follows once target is compromised from multiple angles',
    },
    {
      id: 'precision_strike',
      name: 'Precision Coordinated',
      description: 'Highly synchronized precision strikes on multiple specific targets.',
      icon: Shield,
      color: 'text-green-500',
      illustration: (
        <div className="relative w-full h-32 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {[30, 50, 70].map((x, i) => {
              const targets = [
                { x: 30, y: 30 },
                { x: 50, y: 50 },
                { x: 70, y: 70 },
              ];
              return (
                <g key={i}>
                  <circle cx={targets[i].x} cy={targets[i].y} r="3" fill="rgba(239, 68, 68, 0.8)"/>
                  <circle cx={targets[i].x} cy={targets[i].y} r="8" fill="none" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="0.5"/>
                  {[i * 2, i * 2 + 1].map((droneIdx) => {
                    const angle = (360 / 6) * droneIdx;
                    const rad = (angle * Math.PI) / 180;
                    const distance = 20;
                    const dx = targets[i].x + distance * Math.cos(rad);
                    const dy = targets[i].y + distance * Math.sin(rad);
                    return (
                      <g key={droneIdx}>
                        <line x1={dx} y1={dy} x2={targets[i].x} y2={targets[i].y} stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" markerEnd="url(#arrowhead-green)"/>
                        <circle cx={dx} cy={dy} r="2" fill="rgba(34, 197, 94, 0.8)"/>
                      </g>
                    );
                  })}
                </g>
              );
            })}
            <defs>
              <marker id="arrowhead-green" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <polygon points="0 0, 4 2, 0 4" fill="rgba(34, 197, 94, 0.6)" />
              </marker>
            </defs>
          </svg>
        </div>
      ),
      recommendation: droneCount >= 6 ? 'OPTIMAL - Best for multi-target precision' : 'MINIMUM 6 drones recommended',
      effectiveness: 'HIGH',
      useCase: 'Multiple precision targets',
      minDrones: 6,
      maxDrones: 10,
      explanation: 'Precision Coordinated is a synchronized multi-target attack where small drone teams (2-3 drones) are assigned to specific targets. Each team executes a precision strike simultaneously, eliminating multiple high-value targets in one coordinated operation. This requires advanced timing and coordination. The tactic maximizes efficiency by eliminating multiple threats without over-allocating resources to any single target.',
      howItWorks: '1. Drones are divided into teams of 2-3 per target\n2. Each team is assigned a specific high-value target\n3. Teams approach their targets from different vectors\n4. All teams strike simultaneously at a synchronized time\n5. Multiple targets are eliminated in a single coordinated operation\n6. Each target receives adequate firepower without resource waste',
    },
  ];

  const handleSelect = () => {
    if (selectedTactic) {
      onSelectTactic?.(selectedTactic);
      onClose();
      setSelectedTactic(null);
    }
  };

  const isTacticAvailable = (tactic) => {
    return droneCount >= tactic.minDrones && droneCount <= tactic.maxDrones;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Swarm Tactic" className="max-w-5xl w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a1a1a]">
          <div className="text-sm text-slate-400">
            Available Drones: <span className="text-white font-mono font-semibold">{droneCount}</span>
          </div>
          <div className="text-xs text-slate-500">
            Select a tactic to deploy your swarm
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
          {tactics.map((tactic) => {
            const Icon = tactic.icon;
            const available = isTacticAvailable(tactic);
            const isSelected = selectedTactic?.id === tactic.id;

            return (
              <div
                key={tactic.id}
                onClick={() => available && setSelectedTactic(tactic)}
                className={`border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0088ff] bg-[#0088ff]/10'
                    : available
                    ? 'border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#0088ff]/30 hover:bg-[#0088ff]/5'
                    : 'border-[#1a1a1a] bg-[#0a0a0a] opacity-40 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 border ${tactic.color.replace('text-', 'border-')} bg-[#0a0a0a] flex-shrink-0 w-12 h-12 flex items-center justify-center`}>
                    <Icon size={20} className={tactic.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold ${isSelected ? 'text-[#0088ff]' : 'text-white'}`}>
                          {tactic.name}
                        </h3>
                        <div className="relative">
                          <button
                            onMouseEnter={() => setHoveredTacticId(tactic.id)}
                            onMouseLeave={() => setHoveredTacticId(null)}
                            className="p-1 hover:bg-[#0088ff]/20 rounded transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredTacticId(hoveredTacticId === tactic.id ? null : tactic.id);
                            }}
                          >
                            <Info size={14} className="text-[#0088ff]" />
                          </button>
                          {hoveredTacticId === tactic.id && (
                            <div 
                              className="absolute left-0 top-6 z-50 w-80 glass-heavy border border-[#0088ff]/30 p-4 shadow-2xl"
                              onMouseEnter={() => setHoveredTacticId(tactic.id)}
                              onMouseLeave={() => setHoveredTacticId(null)}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="text-xs font-semibold text-white uppercase tracking-wide">{tactic.name}</h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHoveredTacticId(null);
                                  }}
                                  className="p-0.5 hover:bg-[#0088ff]/20 text-slate-400 hover:text-white"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                              <div className="space-y-3 text-xs">
                                <div>
                                  <div className="text-slate-400 mb-1.5 font-semibold uppercase tracking-wide text-[10px]">Explanation</div>
                                  <p className="text-slate-300 leading-relaxed">{tactic.explanation}</p>
                                </div>
                                <div className="pt-2 border-t border-[#1a1a1a]">
                                  <div className="text-slate-400 mb-1.5 font-semibold uppercase tracking-wide text-[10px]">How It Works</div>
                                  <pre className="text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">{tactic.howItWorks}</pre>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {available ? (
                          <Badge variant="active" className="text-xs">AVAILABLE</Badge>
                        ) : (
                          <Badge variant="default" className="text-xs opacity-60">UNAVAILABLE</Badge>
                        )}
                        <span className={`text-xs font-mono ${tactic.color}`}>{tactic.effectiveness}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{tactic.description}</p>
                    
                    {/* Illustration */}
                    <div className="mb-2">
                      {tactic.illustration}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 text-xs mb-2">
                      <div className="truncate">
                        <span className="text-slate-500 block mb-0.5">Use Case:</span>
                        <span className="text-slate-300 font-mono text-[10px]">{tactic.useCase}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Min:</span>
                        <span className="text-white font-mono">{tactic.minDrones}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Max:</span>
                        <span className="text-white font-mono">{tactic.maxDrones}</span>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className={`flex items-start gap-2 text-xs p-2 border ${
                      available ? 'border-green-500/30 bg-green-500/10 text-green-500' : 'border-[#ffaa00]/30 bg-[#ffaa00]/10 text-[#ffaa00]'
                    }`}>
                      {available ? <CheckCircle size={14} className="flex-shrink-0 mt-0.5" /> : <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />}
                      <span>{tactic.recommendation}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4 mt-4 border-t border-[#1a1a1a]">
          <div className="text-xs text-slate-500">
            {selectedTactic ? `Selected: ${selectedTactic.name}` : 'No tactic selected'}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button
              variant="danger"
              onClick={handleSelect}
              disabled={!selectedTactic}
              className="flex items-center gap-2"
            >
              <Target size={16} />
              <span>Execute Swarm Attack</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
