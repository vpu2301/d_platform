import React, { useState } from 'react';
import { Play, Settings, Battery, Signal, Navigation, Grid, Maximize2 } from 'lucide-react';
import { TacticalMap } from '../features/map/TacticalMap';
import { MissionTimeline } from '../features/operations/MissionTimeline';
import { IntelFeed } from '../features/operations/IntelFeed';
import { RightSidebar } from '../components/RightSidebar';
import { SimulationModal } from '../features/simulation/SimulationModal';
import { SimulationConfigModal } from '../components/SimulationConfigModal';
import { MissionPipeline } from '../components/MissionPipeline';
import { SimulationResults } from '../components/SimulationResults';
import { MapTabs } from '../components/MapTabs';
import { UnitContextMenu } from '../components/UnitContextMenu';
import { UnitPageModal } from '../components/UnitPageModal';
import { Button } from '../components/Button';
import { generateMissionPhases, generateMapObjects } from '../data/generators';

// Generate static map objects for demo
const mapObjects = generateMapObjects(12);

/**
 * Dashboard with center map and right sidebar
 */
export const Dashboard = ({
  drones = [],
  intelAlerts = [],
  selectedDrone,
  onDroneClick,
  onPayloadModeChange,
  onSendMessage,
  chatMessages = [],
  onScenarioSelect,
  activeScenario,
  isSimulationRunning,
  toggleSimulation,
}) => {
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [showSimulationConfig, setShowSimulationConfig] = useState(false);
  const [showMissionPipeline, setShowMissionPipeline] = useState(false);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'split'
  const [selectedUnitPage, setSelectedUnitPage] = useState(null);
  const [hoveredDrone, setHoveredDrone] = useState(null);
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, unit: null });
  
  // Map tabs management
  const [maps, setMaps] = useState([
    { id: 'map-1', name: 'Primary', type: 'primary', lat: 52.1986, lng: 8.5911, location: 'Bünde, Germany', active: true },
  ]);
  const [activeMapId, setActiveMapId] = useState('map-1');
  const [simulationResults, setSimulationResults] = useState(null);
  
  const missionPhases = generateMissionPhases();
  
  const activeCount = drones.filter(d => d.status === 'active').length;
  const alertCount = intelAlerts.filter(a => a.severity === 'critical' || a.severity === 'high').length;

  const handleUnitClick = (drone) => {
    setSelectedUnitPage(drone);
  };

  const handleNewMap = () => {
    setShowMissionPipeline(true);
  };
  
  const handleCreateMission = (missionConfig) => {
    // Create new mission map tab
    const newMapId = `mission-${Date.now()}`;
    const newMap = {
      id: newMapId,
      name: missionConfig.name || 'New Mission',
      type: missionConfig.type || 'intelligence',
      lat: 52.1986, // Default to Bünde, can be configured in mission
      lng: 8.5911,
      location: 'Bünde, Germany',
      missionConfig,
      active: true,
    };
    
    setMaps([...maps, newMap]);
    setActiveMapId(newMapId);
  };

  const handleUnitContextMenu = (e, drone) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      unit: drone,
    });
  };

  const handleContextMenuAction = (actionId, unit) => {
    switch (actionId) {
      case 'open_operator':
        // Store unit data in sessionStorage for operator app
        const unitData = {
          id: unit.id,
          ...unit,
        };
        sessionStorage.setItem('operatorUnitData', JSON.stringify(unitData));
        // Open operator app in new browser tab
        const operatorUrl = `${window.location.origin}/?mode=operator&unitId=${unit.id}`;
        window.open(operatorUrl, '_blank');
        break;
      case 'assign_operator':
        handleUnitClick(unit);
        break;
      case 'view_details':
        handleUnitClick(unit);
        break;
      default:
        console.log(`Action: ${actionId} for unit: ${unit.id}`);
    }
  };

  const handleMapSelect = (mapId) => {
    setActiveMapId(mapId);
  };

  const handleMapClose = (mapId) => {
    if (maps.length === 1) return; // Can't close the last map
    const newMaps = maps.filter((m) => m.id !== mapId);
    setMaps(newMaps);
    if (activeMapId === mapId) {
      setActiveMapId(newMaps[0].id);
    }
  };

  const handleStartSimulation = (config) => {
    // Generate new map with simulation config
    const newMapId = `map-${Date.now()}`;
    const newMap = {
      id: newMapId,
      name: config.name,
      lat: config.location.lat,
      lng: config.location.lng,
      location: config.location.name,
      config,
      active: true,
    };
    
    setMaps([...maps, newMap]);
    setActiveMapId(newMapId);
    
    // Generate simulation results (mock for now)
    setTimeout(() => {
      setSimulationResults({
        mapId: newMapId,
        config,
        status: 'running',
        progress: 0,
        metrics: {
          totalUnits: config.units.length + config.troops.length + config.divisions.length,
          activeUnits: config.units.length,
          coverageArea: '1200 km²',
          missionDuration: `${config.timeframe.duration}h`,
        },
        events: [],
      });
    }, 1000);
  };

  const activeMap = maps.find((m) => m.id === activeMapId) || maps[0];

  return (
    <div className="h-full flex flex-col gap-0 min-h-0 bg-[#0a0a0a]">
      {/* Main content area - split left/center/right */}
      <div className="flex-1 flex gap-0 min-h-0 overflow-hidden">
        {/* Left Panel: Mission Control and Units */}
        <div className="w-80 border-r border-[#1a1a1a] flex flex-col overflow-hidden bg-[#0f0f0f]">
          {/* Mission Control Section */}
          <div className="p-4 border-b border-[#1a1a1a]">
            <div className="mb-3">
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">MISSION CONTROL</label>
              <select className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono">
                <option>MISSION CONTROL</option>
              </select>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">ACTIVE</div>
                <div className="text-3xl font-bold text-white font-mono">{activeCount}</div>
              </div>
              <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">ALERTS</div>
                <div className="text-3xl font-bold text-red-500 font-mono">{alertCount}</div>
              </div>
            </div>
          </div>

          {/* Units Section */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">UNITS</div>
            <div className="space-y-2">
              {drones.map((drone) => {
                const isActive = drone.status === 'active';
                const isMaintenance = drone.status === 'maintenance';
                const isHovered = hoveredDrone?.id === drone.id;
                
                return (
                  <div
                    key={drone.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredDrone(drone)}
                    onMouseLeave={() => setHoveredDrone(null)}
                    onTouchStart={() => setHoveredDrone(drone)}
                    onTouchEnd={() => setTimeout(() => setHoveredDrone(null), 2000)}
                    onContextMenu={(e) => handleUnitContextMenu(e, drone)}
                  >
                    <div
                      onClick={() => handleUnitClick(drone)}
                      className={`p-3 border border-[#1a1a1a] bg-[#0a0a0a] cursor-pointer hover:bg-[#0f0f0f] hover:border-[#0088ff]/30 transition-all ${
                        selectedDrone?.id === drone.id ? 'border-[#0088ff]/50 bg-[#0088ff]/5' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-mono text-sm text-white">{drone.id}</div>
                        <div className={`px-2 py-0.5 text-xs uppercase font-semibold ${
                          isActive ? 'bg-green-500/20 text-green-500 border border-green-500/30' :
                          isMaintenance ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                          'bg-slate-700/20 text-slate-400 border border-slate-700/30'
                        }`}>
                          {drone.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{drone.model}</span>
                        <span className="text-xs font-mono text-white">{Math.round(drone.battery)}% BAT</span>
                      </div>
                    </div>
                    
                    {/* Tooltip with important info */}
                    {isHovered && (
                      <div className="absolute left-full ml-2 top-0 z-50 w-64 glass-heavy border border-[#1a1a1a] p-3 shadow-2xl">
                        <div className="text-xs font-mono text-white mb-2 font-semibold">{drone.id}</div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Status:</span>
                            <span className={`font-mono ${isActive ? 'text-green-500' : isMaintenance ? 'text-red-500' : 'text-slate-400'}`}>
                              {drone.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Battery size={12} /> Battery:
                            </span>
                            <span className="font-mono text-white">{Math.round(drone.battery)}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Signal size={12} /> Signal:
                            </span>
                            <span className="font-mono text-white">{Math.round(drone.signal)} dB</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Navigation size={12} /> Altitude:
                            </span>
                            <span className="font-mono text-white">{Math.round(drone.altitude)}m</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Speed:</span>
                            <span className="font-mono text-white">{Math.round(drone.speed)} m/s</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Panel: Map - in the middle */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Map Tabs with View Toggle */}
          <div className="flex items-center gap-2 border-b border-[#1a1a1a] bg-[#0f0f0f] px-2">
            <div className="flex-1 min-w-0">
              <MapTabs
                maps={maps}
                activeMapId={activeMapId}
                onMapSelect={handleMapSelect}
                onMapClose={handleMapClose}
                onNewMap={handleNewMap}
              />
            </div>
            
            {/* View Mode Toggle - Visible when 2+ maps */}
            {maps.length >= 2 && (
              <div className="flex items-center gap-2 px-2 flex-shrink-0">
                <button
                  onClick={() => setViewMode(viewMode === 'single' ? 'split' : 'single')}
                  className={`p-1.5 border transition-all flex-shrink-0 ${
                    viewMode === 'split'
                      ? 'bg-[#0088ff]/20 text-[#0088ff] border-[#0088ff]/30'
                      : 'bg-[#0a0a0a] text-slate-400 border-[#1a1a1a] hover:bg-[#0f0f0f] hover:text-slate-300'
                  }`}
                  title={viewMode === 'single' ? 'Switch to Split View' : 'Switch to Single View'}
                >
                  {viewMode === 'single' ? <Grid size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
            )}
          </div>
          
          {/* Single View - Show only active map */}
          {viewMode === 'single' ? (
            <>
              <div className="flex-1 min-h-0 relative">
                <TacticalMap
                  drones={drones}
                  intelAlerts={intelAlerts}
                  objects={mapObjects}
                  onDroneClick={onDroneClick}
                  selectedDroneId={selectedDrone?.id}
                  width={800}
                  height={600}
                  centerLat={activeMap?.lat || 52.1986}
                  centerLng={activeMap?.lng || 8.5911}
                />
              </div>
              
              {/* Simulation Results Panel */}
              {simulationResults && simulationResults.mapId === activeMapId && (
                <SimulationResults results={simulationResults} />
              )}
            </>
          ) : (
            /* Split View - Show all maps in grid */
            <div className={`flex-1 grid gap-2 p-2 overflow-hidden ${
              maps.length === 2 ? 'grid-cols-2' : 
              maps.length === 3 ? 'grid-cols-3' : 
              'grid-cols-2'
            }`}>
              {maps.map((map) => {
                const isActive = map.id === activeMapId;
                const missionType = map.type || map.missionType || 'primary';
                
                // Get border color based on mission type
                const getBorderColor = (type) => {
                  switch (type) {
                    case 'primary': return 'border-[#0088ff]';
                    case 'intelligence': return 'border-green-500';
                    case 'strike': return 'border-red-500';
                    case 'support': return 'border-[#ffaa00]';
                    case 'simulation': return 'border-purple-500';
                    default: return 'border-[#0088ff]';
                  }
                };
                
                return (
                  <div
                    key={map.id}
                    className={`flex flex-col overflow-hidden border-2 transition-all cursor-pointer ${
                      isActive ? getBorderColor(missionType) : 'border-[#1a1a1a] hover:border-slate-600'
                    }`}
                    onClick={() => handleMapSelect(map.id)}
                  >
                    {/* Map Header */}
                    <div className={`px-2 py-1 text-xs font-mono uppercase tracking-wide flex items-center justify-between ${
                      isActive ? 'bg-[#0a0a0a]' : 'bg-[#0f0f0f]'
                    }`}>
                      <span className={isActive ? 'text-white' : 'text-slate-400'}>{map.name}</span>
                      {isActive && (
                        <span className="text-xs text-slate-500">ACTIVE</span>
                      )}
                    </div>
                    
                    {/* Map Content */}
                    <div className="flex-1 min-h-0 relative">
                      <TacticalMap
                        drones={drones}
                        intelAlerts={intelAlerts}
                        objects={mapObjects}
                        onDroneClick={onDroneClick}
                        selectedDroneId={selectedDrone?.id}
                        width={400}
                        height={300}
                        centerLat={map.lat || 52.1986}
                        centerLng={map.lng || 8.5911}
                      />
                    </div>
                    
                    {/* Simulation Results for this map */}
                    {simulationResults && simulationResults.mapId === map.id && (
                      <div className="max-h-32 overflow-y-auto">
                        <SimulationResults results={simulationResults} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Panel: Timeline and Intel Feed */}
          <div className="h-48 border-t border-[#1a1a1a] flex gap-0 bg-[#0f0f0f]">
            {/* Mission Timeline */}
            <div className="w-1/2 border-r border-[#1a1a1a] p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">MISSION TIMELINE</div>
              <div className="flex items-center gap-6">
                <MissionTimeline phases={missionPhases} />
                <Button
                  variant="ghost"
                  onClick={() => setShowSimulationModal(true)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Settings size={12} />
                  <span>Scenario</span>
                </Button>
              </div>
            </div>

            {/* Intel Feed */}
            <div className="w-1/2 p-4 overflow-y-auto">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">INTEL FEED</div>
              <IntelFeed alerts={intelAlerts} />
            </div>
          </div>
        </div>

        {/* Right Panel: Sidebar with Live Stream, Communication, Intel */}
        <RightSidebar
          selectedDrone={selectedDrone}
          intelAlerts={intelAlerts}
          chatMessages={chatMessages}
          onSendMessage={onSendMessage}
          isSimulationRunning={isSimulationRunning}
          toggleSimulation={toggleSimulation}
        />
      </div>

      {/* Simulation Modal */}
      <SimulationModal
        isOpen={showSimulationModal}
        onClose={() => setShowSimulationModal(false)}
        onScenarioSelect={onScenarioSelect}
        currentScenario={activeScenario}
      />

      {/* Unit Page Modal */}
      <UnitPageModal
        isOpen={!!selectedUnitPage}
        onClose={() => setSelectedUnitPage(null)}
        unit={selectedUnitPage}
        openOperatorApp={(unitId) => {
          const unit = drones.find(d => d.id === unitId);
          if (unit) {
            const unitData = { id: unit.id, ...unit };
            sessionStorage.setItem('operatorUnitData', JSON.stringify(unitData));
            const operatorUrl = `${window.location.origin}/operator.html?unitId=${unitId}`;
            window.open(operatorUrl, '_blank');
          }
        }}
      />

      {/* Simulation Configuration Modal */}
      <SimulationConfigModal
        isOpen={showSimulationConfig}
        onClose={() => setShowSimulationConfig(false)}
        onStartSimulation={handleStartSimulation}
      />

      {/* Mission Pipeline Modal */}
      <MissionPipeline
        isOpen={showMissionPipeline}
        onClose={() => setShowMissionPipeline(false)}
        onCreateMission={handleCreateMission}
      />

      {/* Unit Context Menu */}
      <UnitContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        unit={contextMenu.unit}
        onClose={() => setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, unit: null })}
        onAction={handleContextMenuAction}
      />
    </div>
  );
};
