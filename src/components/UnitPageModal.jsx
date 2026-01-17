import React, { useState } from 'react';
import { 
  X, User, Users, Package, Fuel, Zap, Shield, Radio, Activity, MapPin, 
  Battery, Signal, Navigation, Gauge, Target, Settings, ArrowRight, Play,
  Send, Layers, Sparkles, Cpu, Lock, Unlock, AlertTriangle, CheckCircle, ExternalLink
} from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card } from './Card';
import { SwarmTacticsModal } from './SwarmTacticsModal';
import { SwarmController } from './SwarmController';

/**
 * Comprehensive unit page - shows carrier, intelligence, attack drones, engine, fuel, etc.
 */
export const UnitPageModal = ({ isOpen, onClose, unit, openOperatorApp }) => {
  const [selectedOperator, setSelectedOperator] = useState(unit?.assignedOperator || '');
  const [selectedDrones, setSelectedDrones] = useState([]);
  const [aiMode, setAiMode] = useState(false);
  const [showSwarmTactics, setShowSwarmTactics] = useState(false);
  const [activeSwarm, setActiveSwarm] = useState(null);
  const [carriedDrones, setCarriedDrones] = useState([
    { id: 'FPV-201', type: 'Strike FPV', status: 'Ready', fuel: 95, warhead: 'High-Explosive', aiEnabled: false, locked: false },
    { id: 'FPV-202', type: 'Strike FPV', status: 'Ready', fuel: 92, warhead: 'Penetrating', aiEnabled: false, locked: false },
    { id: 'FPV-203', type: 'Strike FPV', status: 'Ready', fuel: 88, warhead: 'High-Explosive', aiEnabled: false, locked: false },
    { id: 'FPV-204', type: 'Strike FPV', status: 'Standby', fuel: 85, warhead: 'Fragmentation', aiEnabled: false, locked: false },
    { id: 'FPV-205', type: 'Strike FPV', status: 'Ready', fuel: 90, warhead: 'Penetrating', aiEnabled: true, locked: false },
    { id: 'FPV-206', type: 'Strike FPV', status: 'Ready', fuel: 87, warhead: 'High-Explosive', aiEnabled: false, locked: false },
    { id: 'FPV-207', type: 'Strike FPV', status: 'Maintenance', fuel: 45, warhead: 'High-Explosive', aiEnabled: false, locked: true },
    { id: 'FPV-208', type: 'Strike FPV', status: 'Ready', fuel: 93, warhead: 'Fragmentation', aiEnabled: false, locked: false },
    { id: 'FPV-209', type: 'Strike FPV', status: 'Ready', fuel: 89, warhead: 'Penetrating', aiEnabled: true, locked: false },
    { id: 'FPV-210', type: 'Strike FPV', status: 'Ready', fuel: 91, warhead: 'High-Explosive', aiEnabled: false, locked: false },
  ]);

  const operators = ['OPS-ALPHA', 'OPS-BRAVO', 'OPS-CHARLIE', 'OPS-DELTA', 'OPS-ECHO'];

  // Don't create unitData if unit doesn't exist - Modal handles isOpen check
  if (!unit) {
    return null;
  }

  // Mock comprehensive unit data
  const unitData = {
    ...unit,
    carrierCapacity: 10,
    currentLoad: carriedDrones.length,
    engineType: 'Turbo-Jet Mk4',
    fuelCapacity: 500, // liters (up to 500L as specified)
    currentFuel: 387,
    fuelPercentage: 77.4,
    intelligence: {
      sensors: ['EO/IR', 'RADAR', 'SIGINT', 'ELINT'],
      range: '150km',
      altitude: '12000m',
      dataRate: '2.4 GB/s',
    },
    specifications: {
      maxSpeed: '850 km/h',
      cruiseSpeed: '650 km/h',
      endurance: '18 hours',
      payload: '2500 kg',
      wingspan: '28m',
      length: '15m',
    },
    assignedOperator: selectedOperator || unit.assignedOperator || 'UNASSIGNED',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
  };

  const handleAssignOperator = () => {
    if (selectedOperator) {
      // In real app, this would update the unit's assigned operator
      console.log(`Assigning operator ${selectedOperator} to ${unit.id}`);
      // You could call an update function here
    }
  };

  const handleLaunchDrone = (droneId) => {
    console.log(`Launching strike drone ${droneId} from carrier ${unit.id}`);
    // Launch logic here
  };

  const handleLaunchStrike = (droneId) => {
    console.log(`STRIKE: Launching ${droneId} for strike mission`);
    // Strike launch logic
  };

  const handleLaunchAll = () => {
    const readyDrones = carriedDrones.filter(d => d.status === 'Ready' && !d.locked);
    console.log(`LAUNCH ALL: Deploying ${readyDrones.length} strike FPV drones`);
    // Launch all ready drones
  };

  const handleDropAll = () => {
    console.log(`DROP ALL: Emergency jettison all carried drones`);
    // Emergency drop all
  };

  const handleSwarmAttack = () => {
    const readyDrones = carriedDrones.filter(d => d.status === 'Ready' && !d.locked);
    if (readyDrones.length < 2) {
      console.log('Minimum 2 drones required for swarm attack');
      return;
    }
    setShowSwarmTactics(true);
  };

  const handleSelectSwarmTactic = (tactic) => {
    const readyDrones = carriedDrones.filter(d => d.status === 'Ready' && !d.locked);
    console.log(`SWARM ATTACK: ${tactic.name} with ${readyDrones.length} FPV drones`);
    setActiveSwarm({
      tactic: tactic.name,
      droneCount: readyDrones.length,
      status: 'ACTIVE',
      tacticId: tactic.id,
    });
    // Execute swarm attack with selected tactic
  };

  const handleStopSwarm = () => {
    console.log('STOP SWARM: Terminating swarm attack');
    setActiveSwarm(null);
  };

  const handleToggleAI = (droneId) => {
    setCarriedDrones(prev => prev.map(d => 
      d.id === droneId ? { ...d, aiEnabled: !d.aiEnabled } : d
    ));
  };

  const handleToggleDroneSelection = (droneId) => {
    setSelectedDrones(prev => 
      prev.includes(droneId)
        ? prev.filter(id => id !== droneId)
        : [...prev, droneId]
    );
  };

  const handleAIAutonomousAttack = () => {
    const aiDrones = carriedDrones.filter(d => d.aiEnabled && d.status === 'Ready' && !d.locked);
    console.log(`AI AUTONOMOUS: ${aiDrones.length} drones executing autonomous attack`);
    // AI autonomous attack logic
  };

  const readyDroneCount = carriedDrones.filter(d => d.status === 'Ready' && !d.locked).length;

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title={`${unit.id} - ${unit.name || unit.type || 'Unit Details'}`}
        className="max-w-[90vw] w-full max-h-[90vh]"
      >
      <div className="space-y-4 max-h-[85vh] overflow-y-auto">
        {/* Header Info Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Status</div>
            <Badge variant={unit.status === 'active' ? 'active' : 'maintenance'}>
              {unit.status.toUpperCase()}
            </Badge>
          </Card>
          <Card className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Type</div>
            <div className="text-sm font-mono text-white">{unit.type || 'CARRIER'}</div>
          </Card>
          <Card className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Location</div>
            <div className="text-xs font-mono text-slate-300">
              {unit.lat?.toFixed(4)}, {unit.lng?.toFixed(4)}
            </div>
          </Card>
          <Card className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Assigned Operator</div>
            <div className="text-sm font-mono text-white">{unitData.assignedOperator}</div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column: Engine & Fuel, Intelligence */}
          <div className="col-span-1 space-y-4">
            {/* Engine & Fuel */}
            <Card title="Engine & Fuel">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Fuel Level</span>
                    <span className="text-sm font-mono text-white">
                      {unitData.currentFuel}/{unitData.fuelCapacity} L
                    </span>
                  </div>
                  <div className="relative h-3 bg-[#0a0a0a] border border-[#1a1a1a]">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#0088ff]/30 transition-all"
                      style={{ width: `${unitData.fuelPercentage}%` }}
                    ></div>
                    <div
                      className="absolute inset-y-0 left-0 bg-[#0088ff] transition-all"
                      style={{ width: `${unitData.fuelPercentage}%`, opacity: 0.7 }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <Fuel size={14} />
                    <span>{unitData.fuelPercentage.toFixed(1)}% Remaining</span>
                  </div>
                </div>

                <div className="border-t border-[#1a1a1a] pt-3">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Engine Type</div>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[#0088ff]" />
                    <span className="text-sm font-mono text-white">{unitData.engineType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1a1a1a]">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Max Speed</div>
                    <div className="text-sm font-mono text-white">{unitData.specifications.maxSpeed}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Cruise</div>
                    <div className="text-sm font-mono text-white">{unitData.specifications.cruiseSpeed}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Endurance</div>
                    <div className="text-sm font-mono text-white">{unitData.specifications.endurance}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Payload</div>
                    <div className="text-sm font-mono text-white">{unitData.specifications.payload}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Intelligence Capabilities */}
            <Card title="Intelligence">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Sensors</div>
                  <div className="flex flex-wrap gap-2">
                    {unitData.intelligence.sensors.map((sensor) => (
                      <Badge key={sensor} variant="active">
                        {sensor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#1a1a1a]">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Range</span>
                    <span className="text-xs font-mono text-white">{unitData.intelligence.range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Altitude</span>
                    <span className="text-xs font-mono text-white">{unitData.intelligence.altitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Data Rate</span>
                    <span className="text-xs font-mono text-white">{unitData.intelligence.dataRate}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Operator Assignment */}
            <Card title="Operator Assignment">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">
                    Assign Operator
                  </label>
                  <select
                    value={selectedOperator}
                    onChange={(e) => setSelectedOperator(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0088ff]/30"
                  >
                    <option value="">UNASSIGNED</option>
                    {operators.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAssignOperator}
                  disabled={!selectedOperator}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <User size={14} />
                  <span>Assign Operator</span>
                </Button>

                {unitData.assignedOperator !== 'UNASSIGNED' && (
                  <div className="pt-3 border-t border-[#1a1a1a]">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <User size={14} />
                      <span>Currently: {unitData.assignedOperator}</span>
                    </div>
                  </div>
                )}

                {/* Open Operator App Button */}
                {openOperatorApp && (
                  <div className="pt-3 border-t border-[#1a1a1a]">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        const unitData = {
                          id: unit.id,
                          ...unit,
                        };
                        sessionStorage.setItem('operatorUnitData', JSON.stringify(unitData));
                        openOperatorApp(unit.id);
                      }}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={14} />
                      <span>Open Operator App</span>
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Center Column: Strike FPV Drones & Controls */}
          <div className="col-span-1 space-y-4">
            {/* Quick Action Controls */}
            <Card title="Quick Actions">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLaunchAll}
                  disabled={carriedDrones.filter(d => d.status === 'Ready' && !d.locked).length === 0}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>LAUNCH ALL</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDropAll}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Package size={14} />
                  <span>DROP ALL</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleSwarmAttack}
                  disabled={carriedDrones.filter(d => d.status === 'Ready' && !d.locked).length < 2}
                  className="w-full flex items-center justify-center gap-2 col-span-2"
                >
                  <Layers size={14} />
                  <span>{activeSwarm ? 'SWARM ACTIVE' : 'SWARM ATTACK'}</span>
                </Button>
                <Button
                  variant={aiMode ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={handleAIAutonomousAttack}
                  disabled={carriedDrones.filter(d => d.aiEnabled && d.status === 'Ready').length === 0}
                  className="w-full flex items-center justify-center gap-2 col-span-2"
                >
                  <Sparkles size={14} />
                  <span>AI AUTONOMOUS ATTACK</span>
                </Button>
              </div>
            </Card>

            <Card title="Strike FPV Drones">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1a1a1a]">
                  <span className="text-xs text-slate-400">
                    {unitData.currentLoad}/{unitData.carrierCapacity} FPV Drones
                  </span>
                  <Badge variant={unitData.currentLoad === unitData.carrierCapacity ? 'active' : 'default'}>
                    {unitData.currentLoad < unitData.carrierCapacity ? 'AVAILABLE' : 'FULL'}
                  </Badge>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {carriedDrones.map((drone) => {
                    const isReady = drone.status === 'Ready' && !drone.locked;
                    const isSelected = selectedDrones.includes(drone.id);
                    const fuelColor = drone.fuel > 70 ? 'text-green-500' : drone.fuel > 40 ? 'text-[#ffaa00]' : 'text-red-500';
                    
                    return (
                      <div
                        key={drone.id}
                        className={`p-3 border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#0088ff] bg-[#0088ff]/10'
                            : isReady 
                            ? 'border-[#0088ff]/30 bg-[#0088ff]/5 hover:bg-[#0088ff]/10 hover:border-[#0088ff]/50' 
                            : 'border-[#1a1a1a] bg-[#0a0a0a] opacity-60'
                        }`}
                        onClick={() => !drone.locked && handleToggleDroneSelection(drone.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Target size={16} className={isReady ? 'text-red-500' : 'text-slate-400'} />
                            <span className="text-sm font-mono text-white">{drone.id}</span>
                            {drone.locked && <Lock size={12} className="text-slate-500" />}
                            {drone.aiEnabled && <Cpu size={12} className="text-[#0088ff]" />}
                            <Badge variant={isReady ? 'active' : 'maintenance'} className="text-xs">
                              {drone.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            {isReady && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLaunchStrike(drone.id);
                                  }}
                                  className="p-1 hover:bg-red-500/20 border border-red-500/30 transition-all"
                                  title="Launch Strike"
                                >
                                  <Target size={14} className="text-red-500" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleAI(drone.id);
                                  }}
                                  className={`p-1 border transition-all ${
                                    drone.aiEnabled
                                      ? 'bg-[#0088ff]/20 border-[#0088ff]/30'
                                      : 'hover:bg-[#0f0f0f] border-[#1a1a1a]'
                                  }`}
                                  title={drone.aiEnabled ? 'Disable AI' : 'Enable AI'}
                                >
                                  <Cpu size={14} className={drone.aiEnabled ? 'text-[#0088ff]' : 'text-slate-400'} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">{drone.warhead}</span>
                          <div className="flex items-center gap-2">
                            <Fuel size={12} className={fuelColor} />
                            <span className={`font-mono ${fuelColor}`}>{drone.fuel}%</span>
                          </div>
                        </div>
                        {drone.aiEnabled && (
                          <div className="mt-2 pt-2 border-t border-[#1a1a1a] flex items-center gap-2 text-xs text-[#0088ff]">
                            <Sparkles size={12} />
                            <span>AI AUTONOMOUS ENABLED</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Selection Summary */}
                {selectedDrones.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">Selected: {selectedDrones.length}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          selectedDrones.forEach(id => handleLaunchStrike(id));
                          setSelectedDrones([]);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Target size={14} />
                        <span>LAUNCH SELECTED</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column: Telemetry & Maintenance */}
          <div className="col-span-1 space-y-4">
            {/* Telemetry */}
            <Card title="Telemetry">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 border border-[#1a1a1a] bg-[#0a0a0a]">
                  <Battery size={16} className="text-slate-300" />
                  <div>
                    <div className="text-xs text-slate-500">Battery</div>
                    <div className="text-sm font-mono text-white">
                      {unit.battery?.toFixed(1) || 'N/A'}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 border border-[#1a1a1a] bg-[#0a0a0a]">
                  <Signal size={16} className="text-slate-300" />
                  <div>
                    <div className="text-xs text-slate-500">Signal</div>
                    <div className="text-sm font-mono text-white">
                      {unit.signal?.toFixed(0) || 'N/A'} dB
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 border border-[#1a1a1a] bg-[#0a0a0a]">
                  <Navigation size={16} className="text-slate-300" />
                  <div>
                    <div className="text-xs text-slate-500">Altitude</div>
                    <div className="text-sm font-mono text-white">
                      {unit.altitude?.toFixed(0) || 'N/A'} m
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 border border-[#1a1a1a] bg-[#0a0a0a]">
                  <Gauge size={16} className="text-slate-300" />
                  <div>
                    <div className="text-xs text-slate-500">Speed</div>
                    <div className="text-sm font-mono text-white">
                      {unit.speed?.toFixed(1) || 'N/A'} m/s
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Specifications */}
            <Card title="Specifications">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Wingspan</span>
                  <span className="font-mono text-white">{unitData.specifications.wingspan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Length</span>
                  <span className="font-mono text-white">{unitData.specifications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Payload</span>
                  <span className="font-mono text-white">{unitData.specifications.payload}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Carrier Capacity</span>
                  <span className="font-mono text-white">{unitData.carrierCapacity} Drones</span>
                </div>
              </div>
            </Card>

            {/* Maintenance */}
            <Card title="Maintenance">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Last Maintenance</div>
                  <div className="text-sm font-mono text-white">{unitData.lastMaintenance}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Next Maintenance</div>
                  <div className="text-sm font-mono text-white">{unitData.nextMaintenance}</div>
                </div>
                <div className="pt-3 border-t border-[#1a1a1a]">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Settings size={14} className="mr-2" />
                    Schedule Maintenance
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Modal>

      {/* Swarm Tactics Modal - Render outside Modal */}
      <SwarmTacticsModal
        isOpen={showSwarmTactics}
        onClose={() => setShowSwarmTactics(false)}
        onSelectTactic={handleSelectSwarmTactic}
        droneCount={readyDroneCount}
      />

      {/* Swarm Controller Widget - Render outside Modal, only show when swarm is active or when opening swarm */}
      {isOpen && activeSwarm && (
        <SwarmController
          onLaunchSwarm={handleSwarmAttack}
          onStopSwarm={handleStopSwarm}
          droneCount={readyDroneCount}
          activeSwarm={activeSwarm}
        />
      )}
    </>
  );
};
