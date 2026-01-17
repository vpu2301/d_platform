import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Radio, Settings } from 'lucide-react';
import { Dashboard } from './views/Dashboard';
import { Fleet } from './views/Fleet';
import { Intel } from './views/Intel';
import { Settings as SettingsView } from './views/Settings';
import { OperatorApp } from './views/OperatorApp';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { useSimulation } from './hooks/useSimulation';
import { useDroneFleet } from './hooks/useDroneFleet';
import { generateDrones, generateIntelAlerts, generateChatMessage } from './data/generators';
import { randomWalkScenario } from './data/scenarios';
import { getZuluTime } from './utils/time';
import './styles/animations.css';

/**
 * Main application shell with navigation, layout, global clock, and view switching
 */
function App() {
  // Check if we're in operator app mode (via URL param or pathname)
  const urlParams = new URLSearchParams(window.location.search);
  const isOperatorMode = window.location.pathname.includes('operator') || urlParams.get('mode') === 'operator';
  const operatorUnitId = urlParams.get('unitId') || sessionStorage.getItem('operatorUnitId') || 'UA-101';

  const [currentView, setCurrentView] = useState('dashboard');
  const [zuluTime, setZuluTime] = useState(getZuluTime());
  const [activeScenario, setActiveScenario] = useState(randomWalkScenario);
  const [intelAlerts, setIntelAlerts] = useState(generateIntelAlerts(10));
  const [chatMessages, setChatMessages] = useState([]);

  // Initialize drone fleet
  const [initialDrones] = useState(() => generateDrones(8));
  const {
    drones: fleetDrones,
    selectedDrone,
    selectDrone,
    deselectDrone,
    updatePayloadMode,
    updateDrone,
  } = useDroneFleet(initialDrones);

  // Run simulation - sync with fleet drones
  const {
    drones: simulatedDrones,
    isRunning,
    toggleSimulation,
  } = useSimulation(fleetDrones, activeScenario);


  // Update Zulu time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setZuluTime(getZuluTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate new intel alerts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIntelAlerts((prev) => {
        const newAlert = generateIntelAlerts(1)[0];
        return [newAlert, ...prev].slice(0, 50); // Keep last 50 alerts
      });
    }, 30000); // New alert every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDroneClick = (drone) => {
    // Find the latest drone state from simulated drones
    const latestDrone = simulatedDrones.find(d => d.id === drone.id) || drone;
    if (selectedDrone?.id === latestDrone.id) {
      deselectDrone();
    } else {
      selectDrone(latestDrone);
    }
  };

  const handlePayloadModeChange = (droneId, mode) => {
    // Update payload mode in fleet
    updatePayloadMode(droneId, mode);
  };

  const handleSendMessage = (message) => {
    const operators = ['OPS-1', 'OPS-2', 'PILOT-1', 'INTEL-1'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const newMessage = generateChatMessage(operator, message, true);
    setChatMessages((prev) => [...prev, newMessage].slice(-100)); // Keep last 100 messages
  };

  const handleScenarioSelect = (scenario) => {
    setActiveScenario(scenario);
  };

  const views = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet', name: 'Fleet', icon: Users },
    { id: 'intel', name: 'Intel', icon: Radio },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        // Get selected drone from simulated drones for latest state
        const currentSelectedDrone = selectedDrone 
          ? simulatedDrones.find(d => d.id === selectedDrone.id) || selectedDrone
          : null;
        return (
          <Dashboard
            drones={simulatedDrones}
            intelAlerts={intelAlerts}
            selectedDrone={currentSelectedDrone}
            onDroneClick={handleDroneClick}
            onPayloadModeChange={handlePayloadModeChange}
            onSendMessage={handleSendMessage}
            chatMessages={chatMessages}
            onScenarioSelect={handleScenarioSelect}
            activeScenario={activeScenario}
            isSimulationRunning={isRunning}
            toggleSimulation={toggleSimulation}
          />
        );
      case 'fleet':
        return (
          <Fleet
            drones={simulatedDrones}
            onDroneClick={handleDroneClick}
            selectedDroneId={selectedDrone?.id}
          />
        );
      case 'intel':
        return <Intel intelAlerts={intelAlerts} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard drones={simulatedDrones} />;
    }
  };

  // Render Operator App if in operator mode
  if (isOperatorMode) {
    return <OperatorApp unitId={operatorUnitId} />;
  }

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-slate-200 overflow-hidden gotham-grid">
      {/* Top navigation bar - Matching design */}
      <header className="glass-heavy border-b border-[#1a1a1a] px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-white tracking-normal">AEROSIGHT /// DASHBOARD</h1>
          </div>

          {/* Right: Global clock */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-semibold text-white tabular-nums">{zuluTime}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation - Narrow, matching design */}
        <aside className="glass-heavy border-r border-[#1a1a1a] w-16 p-2 flex-shrink-0 overflow-y-auto">
          <nav className="space-y-2 flex flex-col items-center">
            {views.map((view) => {
              const Icon = view.icon;
              const isActive = currentView === view.id;
              const viewLabels = {
                dashboard: 'OPS',
                fleet: 'FLEET',
                intel: 'INTEL',
                settings: 'CONF',
              };
              return (
                <button
                  key={view.id}
                  onClick={() => setCurrentView(view.id)}
                  className={`w-12 h-12 flex flex-col items-center justify-center gap-1 transition-all relative ${
                    isActive
                      ? 'bg-[#0088ff]/20 text-[#0088ff]'
                      : 'text-slate-400 hover:bg-[#0f0f0f]/80 hover:text-slate-300'
                  }`}
                  title={viewLabels[view.id] || view.name}
                >
                  <Icon size={20} />
                  <span className="text-[10px] uppercase font-semibold tracking-wide">{viewLabels[view.id] || view.name.substring(0, 4)}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
          {renderView()}
        </main>
      </div>

      {/* Footer with systems and units */}
      <Footer />
    </div>
  );
}

export default App;
