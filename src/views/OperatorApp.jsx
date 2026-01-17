import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Square, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, 
  ZoomIn, ZoomOut, Camera, Video, Radio, MapPin, Battery, Signal,
  Navigation, Gauge, Compass, Thermometer, Wind, Activity, Target,
  Layers, Send, Cpu, Sparkles
} from 'lucide-react';

/**
 * Operator App - DJI-style drone control interface
 * Opens in separate browser window with full operator controls
 */
export const OperatorApp = ({ unitId = 'UA-101' }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraMode, setCameraMode] = useState('RGB');
  const [zoom, setZoom] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [unitData, setUnitData] = useState(null);
  // Strike FPV functionality (if carrier)
  const [isCarrier, setIsCarrier] = useState(false);
  const [carriedDrones, setCarriedDrones] = useState([]);

  // Fetch unit data from sessionStorage or use defaults
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('operatorUnitData');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setUnitData({
          id: parsed.id || unitId,
          status: parsed.status || 'active',
          battery: parsed.battery || 87,
          signal: parsed.signal || 95,
          altitude: parsed.altitude || 1250,
          speed: parsed.speed || 45,
          heading: parsed.heading || 245,
          lat: parsed.lat || 52.1986,
          lng: parsed.lng || 8.5911,
          temperature: 22,
          windSpeed: 8,
          model: parsed.model || 'Raven-X',
          payload: parsed.payload || 'EO/IR_MK4',
          payloadConfig: parsed.payloadConfig || { currentMode: 'RGB' },
        });
      } else {
        // Default data
        setUnitData({
          id: unitId,
          status: 'active',
          battery: 87,
          signal: 95,
          altitude: 1250,
          speed: 45,
          heading: 245,
          lat: 52.1986,
          lng: 8.5911,
          temperature: 22,
          windSpeed: 8,
          model: 'Raven-X',
          payload: 'EO/IR_MK4',
          payloadConfig: { currentMode: 'RGB' },
        });
        // Check if unit is a carrier (has carried drones)
        if (parsed.carrierCapacity || parsed.type === 'carrier') {
          setIsCarrier(true);
          // Mock carried FPV drones for demo
          setCarriedDrones([
            { id: 'FPV-201', status: 'Ready', fuel: 95, warhead: 'High-Explosive', aiEnabled: false },
            { id: 'FPV-202', status: 'Ready', fuel: 92, warhead: 'Penetrating', aiEnabled: false },
            { id: 'FPV-203', status: 'Ready', fuel: 88, warhead: 'High-Explosive', aiEnabled: true },
            { id: 'FPV-204', status: 'Standby', fuel: 85, warhead: 'Fragmentation', aiEnabled: false },
            { id: 'FPV-205', status: 'Ready', fuel: 90, warhead: 'Penetrating', aiEnabled: false },
          ]);
        }
      }
    } catch (error) {
      console.error('Error loading unit data:', error);
      // Fallback to default
      setUnitData({
        id: unitId,
        status: 'active',
        battery: 87,
        signal: 95,
        altitude: 1250,
        speed: 45,
        heading: 245,
        lat: 52.1986,
        lng: 8.5911,
        temperature: 22,
        windSpeed: 8,
      });
    }
  }, [unitId]);

  if (!unitData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0088ff] mx-auto mb-4"></div>
          <div className="text-sm text-slate-400">Loading operator app...</div>
        </div>
      </div>
    );
  }

  const handleFlightControl = (direction) => {
    console.log(`Flight control: ${direction}`);
    // In real app, this would send command to drone
  };

  const handleTakeoff = () => {
    console.log('Takeoff command sent');
    setIsConnected(true);
  };

  const handleLand = () => {
    console.log('Land command sent');
  };

  const handleReturnToHome = () => {
    console.log('Return to Home command sent');
  };

  const cameraModes = unitData.payloadConfig?.modes || ['RGB', 'Thermal', 'Night'];

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-slate-200 overflow-hidden gotham-grid">
      {/* Header */}
      <header className="glass-heavy border-b border-[#1a1a1a] px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h1 className="text-base font-semibold text-white tracking-normal">AEROSIGHT /// OPERATOR APP</h1>
            <span className="text-xs text-slate-500 font-mono">({unitData.id})</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Connection</div>
            <span className={`text-sm font-mono ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
              {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex gap-2 p-2 overflow-hidden">
        {/* Left Panel - Camera Feed & Controls */}
        <div className="w-2/3 flex flex-col gap-2">
          {/* Main Camera Feed */}
          <div className="flex-1 relative bg-black border border-[#1a1a1a] flex items-center justify-center overflow-hidden">
            {/* Camera View */}
            <div className="text-center">
              <Camera size={64} className="mx-auto mb-4 text-slate-600" />
              <div className="text-lg font-mono text-slate-400 mb-2">LIVE CAMERA FEED</div>
              <div className="text-sm text-slate-500">{unitData.id}</div>
              <div className="mt-4 text-xs text-slate-600">{cameraMode} • {zoom.toFixed(1)}x</div>
            </div>

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 glass border border-[#1a1a1a] p-2">
              <div className="text-xs font-mono text-white">{unitData.id}</div>
              <div className="text-xs text-slate-400">{unitData.model || 'Raven-X'}</div>
              <div className="text-xs text-slate-400 mt-1">{cameraMode}</div>
            </div>

            {/* Telemetry Overlay (DJI-style) */}
            <div className="absolute top-4 right-4 glass border border-[#1a1a1a] p-2 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <Battery size={12} className="text-green-500" />
                <span className="font-mono text-white">{unitData.battery}%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Signal size={12} className="text-[#0088ff]" />
                <span className="font-mono text-white">{unitData.signal} dB</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Navigation size={12} className="text-slate-400" />
                <span className="font-mono text-white">{unitData.altitude}m</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Gauge size={12} className="text-slate-400" />
                <span className="font-mono text-white">{unitData.speed} m/s</span>
              </div>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 glass border border-red-500/30 bg-red-500/10 p-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-mono text-red-500">REC</span>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="h-32 glass border border-[#1a1a1a] p-4 flex items-center justify-center gap-4">
            {cameraModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setCameraMode(mode)}
                className={`px-4 py-2 text-xs font-mono uppercase border transition-all ${
                  cameraMode === mode
                    ? 'bg-[#0088ff]/20 text-[#0088ff] border-[#0088ff]/30'
                    : 'bg-[#0a0a0a] text-slate-400 border-[#1a1a1a] hover:border-[#0088ff]/30'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
            <div className="w-px h-8 bg-[#1a1a1a]"></div>
            <button
              onClick={() => setZoom(Math.max(1, zoom - 0.5))}
              className="p-2 border border-[#1a1a1a] text-slate-400 hover:bg-[#0f0f0f] hover:text-white transition-all"
            >
              <ZoomOut size={16} />
            </button>
            <div className="text-xs font-mono text-white w-16 text-center">{zoom.toFixed(1)}x</div>
            <button
              onClick={() => setZoom(Math.min(10, zoom + 0.5))}
              className="p-2 border border-[#1a1a1a] text-slate-400 hover:bg-[#0f0f0f] hover:text-white transition-all"
            >
              <ZoomIn size={16} />
            </button>
            <div className="w-px h-8 bg-[#1a1a1a]"></div>
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-4 py-2 text-xs font-mono uppercase border transition-all ${
                isRecording
                  ? 'bg-red-500/20 text-red-500 border-red-500/30'
                  : 'bg-[#0a0a0a] text-slate-400 border-[#1a1a1a] hover:border-red-500/30'
              }`}
            >
              <Video size={14} className="inline mr-2" />
              {isRecording ? 'STOP REC' : 'REC'}
            </button>
            <button className="px-4 py-2 text-xs font-mono uppercase border border-[#1a1a1a] bg-[#0a0a0a] text-slate-400 hover:bg-[#0f0f0f] hover:text-white transition-all">
              <Camera size={14} className="inline mr-2" />
              SNAP
            </button>
          </div>
        </div>

        {/* Right Panel - Controls & Telemetry */}
        <div className="w-1/3 flex flex-col gap-2">
          {/* Flight Controls */}
          <div className="glass border border-[#1a1a1a] p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Flight Controls</div>
            <div className="space-y-3">
              <button
                onClick={handleTakeoff}
                className="w-full px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500/20 transition-all text-xs font-mono uppercase"
              >
                <ArrowUp size={14} className="inline mr-2" />
                Takeoff
              </button>
              <button
                onClick={handleLand}
                className="w-full px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 transition-all text-xs font-mono uppercase"
              >
                <ArrowDown size={14} className="inline mr-2" />
                Land
              </button>
              <button
                onClick={handleReturnToHome}
                className="w-full px-4 py-2 bg-[#0088ff]/10 text-[#0088ff] border border-[#0088ff]/30 hover:bg-[#0088ff]/20 transition-all text-xs font-mono uppercase"
              >
                <MapPin size={14} className="inline mr-2" />
                Return to Home
              </button>
            </div>

            {/* Directional Controls */}
            <div className="mt-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Manual Control</div>
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button
                  onMouseDown={() => handleFlightControl('up')}
                  className="p-3 border border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#0f0f0f] hover:border-[#0088ff]/30 transition-all"
                >
                  <ArrowUp size={20} className="text-slate-400" />
                </button>
                <div></div>
                <button
                  onMouseDown={() => handleFlightControl('left')}
                  className="p-3 border border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#0f0f0f] hover:border-[#0088ff]/30 transition-all"
                >
                  <ArrowLeft size={20} className="text-slate-400" />
                </button>
                <button
                  onMouseDown={() => handleFlightControl('stop')}
                  className="p-3 border border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#0f0f0f] hover:border-[#0088ff]/30 transition-all"
                >
                  <Square size={16} className="text-slate-400 mx-auto" />
                </button>
                <button
                  onMouseDown={() => handleFlightControl('right')}
                  className="p-3 border border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#0f0f0f] hover:border-[#0088ff]/30 transition-all"
                >
                  <ArrowRight size={20} className="text-slate-400" />
                </button>
                <div></div>
                <button
                  onMouseDown={() => handleFlightControl('down')}
                  className="p-3 border border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#0f0f0f] hover:border-[#0088ff]/30 transition-all"
                >
                  <ArrowDown size={20} className="text-slate-400" />
                </button>
                <div></div>
              </div>
            </div>

            {/* Strike FPV Controls (if carrier) */}
            {isCarrier && (
              <div className="mt-4 border-t border-[#1a1a1a] pt-4">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Strike FPV Controls</div>
                <div className="space-y-2">
                  <button
                    onClick={() => console.log('Launch All FPV')}
                    disabled={carriedDrones.filter(d => d.status === 'Ready').length === 0}
                    className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-500 text-xs font-mono uppercase hover:bg-red-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>LAUNCH ALL</span>
                  </button>
                  <button
                    onClick={() => console.log('Swarm Attack')}
                    disabled={carriedDrones.filter(d => d.status === 'Ready').length < 2}
                    className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-500 text-xs font-mono uppercase hover:bg-red-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Layers size={14} />
                    <span>SWARM ATTACK</span>
                  </button>
                  <div className="text-[10px] text-slate-500 mt-2">
                    Ready: {carriedDrones.filter(d => d.status === 'Ready').length} / {carriedDrones.length}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Telemetry */}
          <div className="glass border border-[#1a1a1a] p-4 flex-1 overflow-y-auto">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Telemetry</div>
            <div className="space-y-3">
              <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-1">
                  <Battery size={14} className="text-[#0088ff]" />
                  <span className="text-xs text-slate-500 uppercase tracking-wide">Battery</span>
                </div>
                <div className="text-xl font-mono font-bold text-white">{unitData.battery}%</div>
                <div className="h-2 bg-[#1a1a1a] mt-2 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${unitData.battery}%` }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-1">
                    <Signal size={12} className="text-[#0088ff]" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Signal</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{unitData.signal} dB</div>
                </div>

                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation size={12} className="text-[#0088ff]" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Altitude</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{unitData.altitude}m</div>
                </div>

                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge size={12} className="text-[#0088ff]" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Speed</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{unitData.speed} m/s</div>
                </div>

                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-1">
                    <Compass size={12} className="text-[#0088ff]" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Heading</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{unitData.heading}°</div>
                </div>
              </div>

              <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#0088ff]" />
                  <span className="text-xs text-slate-500 uppercase tracking-wide">Position</span>
                </div>
                <div className="text-xs font-mono text-white space-y-1">
                  <div>LAT: {unitData.lat.toFixed(6)}</div>
                  <div>LNG: {unitData.lng.toFixed(6)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer size={12} className="text-[#0088ff]" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Temp</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{unitData.temperature}°C</div>
                </div>

                <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind size={12} className="text-[#0088ff]" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Wind</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{unitData.windSpeed} m/s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
