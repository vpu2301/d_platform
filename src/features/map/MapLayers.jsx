import React, { useState, useRef, useEffect } from 'react';
import { Radar, Satellite, AlertTriangle, Target, Map, Cloud } from 'lucide-react';

/**
 * Map layer system component
 * Handles Radar, Satellite, Intel, Objects, Real Map, and Weather layers
 */
export const MapLayers = ({ activeLayers = {}, onLayerToggle, onWeatherContextMenu }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const containerRef = useRef(null);

  const layers = [
    { id: 'radar', name: 'RADAR', icon: Radar },
    { id: 'satellite', name: 'SAT', icon: Satellite },
    { id: 'weather', name: 'WEATHER', icon: Cloud },
    { id: 'intel', name: 'INTEL', icon: AlertTriangle },
    { id: 'objects', name: 'OBJECTS', icon: Target },
    { id: 'realmap', name: 'MAP', icon: Map },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !containerRef.current?.contains(e.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contextMenu]);
  
  const handleRightClick = (e, layer) => {
    if (layer.id === 'weather') {
      e.preventDefault();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        layer: layer.id,
      });
      onWeatherContextMenu?.(e.clientX, e.clientY);
    }
  };

  return (
    <div ref={containerRef} className="flex gap-1 p-1 bg-[#0f0f0f] border border-[#1a1a1a] relative">
      {layers.map((layer) => {
        const Icon = layer.icon;
        return (
          <button
            key={layer.id}
            onClick={() => onLayerToggle?.(layer.id)}
            onContextMenu={(e) => handleRightClick(e, layer)}
            className={`px-2 py-1 flex items-center gap-1 text-xs font-mono uppercase tracking-wide transition-all ${
              activeLayers[layer.id]
                ? 'bg-[#0088ff]/20 text-[#0088ff] border border-[#0088ff]/30'
                : 'text-slate-500 hover:bg-[#1a1a1a] hover:text-slate-400 border border-transparent'
            }`}
          >
            <Icon size={14} />
            <span>{layer.name}</span>
          </button>
        );
      })}
      
      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute z-50 glass-heavy border border-[#1a1a1a] min-w-[200px]"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
        >
          <div className="p-1">
            <button
              onClick={() => {
                onLayerToggle?.('weather');
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-[#0a0a0a] hover:text-white transition-all flex items-center gap-2"
            >
              <span>{activeLayers.weather ? '✗' : '✓'} Toggle Weather Layer</span>
            </button>
            <button
              onClick={() => {
                onWeatherContextMenu?.('open_modal');
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-[#0a0a0a] hover:text-white transition-all flex items-center gap-2"
            >
              📊 Open Weather Modal
            </button>
            <button
              onClick={() => {
                onWeatherContextMenu?.('toggle_important');
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-[#0a0a0a] hover:text-white transition-all flex items-center gap-2"
            >
              ⚠️ Toggle Important Data
            </button>
            <div className="border-t border-[#1a1a1a] my-1"></div>
            <button
              onClick={() => {
                onWeatherContextMenu?.('forecast_3d');
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-[#0a0a0a] hover:text-white transition-all flex items-center gap-2"
            >
              📅 3-Day Forecast
            </button>
            <button
              onClick={() => {
                onWeatherContextMenu?.('forecast_7d');
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-[#0a0a0a] hover:text-white transition-all flex items-center gap-2"
            >
              📅 7-Day Forecast
            </button>
            <div className="border-t border-[#1a1a1a] my-1"></div>
            <button
              onClick={() => {
                onWeatherContextMenu?.('export');
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-[#0a0a0a] hover:text-white transition-all flex items-center gap-2"
            >
              💾 Export Weather Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Radar sweep layer
 */
export const RadarSweepLayer = ({ width, height, centerX, centerY }) => {
  return (
    <g>
      {/* Radar sweep line with SVG animation */}
      <g transform={`translate(${centerX}, ${centerY})`}>
        <line
          x1={0}
          y1={0}
          x2={width / 2}
          y2={0}
          stroke="#64748b"
          strokeWidth={2}
          opacity={0.4}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="4s"
            repeatCount="indefinite"
          />
        </line>
      </g>
      
      {/* Radar circles */}
      {[1, 2, 3].map((ring) => (
        <circle
          key={ring}
          cx={centerX}
          cy={centerY}
          r={(width / 2 / 3) * ring}
          fill="none"
          stroke="#475569"
          strokeWidth={1}
          opacity={0.3}
        />
      ))}
    </g>
  );
};

/**
 * Satellite imagery pattern
 */
export const SatelliteLayer = ({ width, height }) => {
  return (
    <defs>
      <pattern
        id="satellitePattern"
        patternUnits="userSpaceOnUse"
        width="50"
        height="50"
      >
        <rect width="50" height="50" fill="#0f172a" />
        <rect x="0" y="0" width="25" height="25" fill="#1e293b" opacity="0.3" />
        <rect x="25" y="25" width="25" height="25" fill="#1e293b" opacity="0.3" />
        <circle cx="25" cy="25" r="2" fill="#475569" opacity="0.2" />
      </pattern>
    </defs>
  );
};

/**
 * Intel markers layer
 */
export const IntelLayer = ({ intelAlerts = [] }) => {
  // Convert grid references to approximate coordinates
  // This is a simplified mapping for demo purposes
  const gridToCoords = (gridRef) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter = gridRef[0];
    const number = parseInt(gridRef[1]);
    const baseX = 100 + (letters.indexOf(letter) * 80);
    const baseY = 100 + (number * 80);
    return { x: baseX, y: baseY };
  };
  
  return (
    <g>
      {intelAlerts.map((alert) => {
        const coords = gridToCoords(alert.location.replace('Grid ', ''));
        const color = alert.severity === 'critical' ? '#94a3b8' : '#64748b';
        
        return (
          <g key={alert.id} transform={`translate(${coords.x}, ${coords.y})`}>
            <circle
              cx={0}
              cy={0}
              r={8}
              fill={color}
              opacity={0.7}
              className="pulse-alert"
            />
            <text
              x={0}
              y={-15}
              fill={color}
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {alert.category}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/**
 * Weather layer - shows cloud patterns, precipitation, and weather zones
 */
export const WeatherLayer = ({ width, height, centerX, centerY }) => {
  // Generate random cloud patterns for demo
  const clouds = [
    { x: centerX - 150, y: centerY - 100, size: 60, opacity: 0.3, type: 'cumulus' },
    { x: centerX + 100, y: centerY - 80, size: 80, opacity: 0.4, type: 'cumulonimbus' },
    { x: centerX - 80, y: centerY + 120, size: 70, opacity: 0.35, type: 'stratus' },
    { x: centerX + 150, y: centerY + 100, size: 65, opacity: 0.3, type: 'cumulus' },
    { x: centerX + 50, y: centerY - 150, size: 90, opacity: 0.45, type: 'cumulonimbus' },
  ];

  // Weather zones with different conditions
  const weatherZones = [
    { x: centerX - 200, y: centerY - 50, radius: 120, condition: 'clear', color: '#0088ff' },
    { x: centerX + 180, y: centerY + 80, radius: 100, condition: 'light_rain', color: '#00aaff' },
    { x: centerX - 100, y: centerY + 150, radius: 90, condition: 'cloudy', color: '#0066cc' },
  ];

  return (
    <g>
      {/* Weather zones */}
      {weatherZones.map((zone, index) => (
        <g key={`zone-${index}`}>
          <circle
            cx={zone.x}
            cy={zone.y}
            r={zone.radius}
            fill={zone.color}
            opacity={0.15}
          />
          <circle
            cx={zone.x}
            cy={zone.y}
            r={zone.radius}
            fill="none"
            stroke={zone.color}
            strokeWidth={1}
            opacity={0.3}
            strokeDasharray="5,5"
          />
          <text
            x={zone.x}
            y={zone.y}
            fill={zone.color}
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
            opacity={0.7}
          >
            {zone.condition.replace('_', ' ').toUpperCase()}
          </text>
        </g>
      ))}

      {/* Cloud patterns */}
      {clouds.map((cloud, index) => (
        <g key={`cloud-${index}`} transform={`translate(${cloud.x}, ${cloud.y})`}>
          {cloud.type === 'cumulonimbus' ? (
            // Thunderstorm cloud (tall, dark)
            <>
              <ellipse cx={0} cy={-10} rx={cloud.size * 0.6} ry={cloud.size * 0.4} fill="#475569" opacity={cloud.opacity} />
              <ellipse cx={-20} cy={0} rx={cloud.size * 0.5} ry={cloud.size * 0.6} fill="#475569" opacity={cloud.opacity} />
              <ellipse cx={20} cy={0} rx={cloud.size * 0.5} ry={cloud.size * 0.6} fill="#475569" opacity={cloud.opacity} />
              <ellipse cx={0} cy={10} rx={cloud.size * 0.7} ry={cloud.size * 0.5} fill="#475569" opacity={cloud.opacity * 1.2} />
              {/* Lightning indicator */}
              <path
                d="M -10,-15 L 5,5 M 5,5 L -5,10"
                stroke="#ffaa00"
                strokeWidth={2}
                opacity={0.6}
                fill="none"
              />
            </>
          ) : cloud.type === 'stratus' ? (
            // Low flat cloud
            <ellipse cx={0} cy={0} rx={cloud.size} ry={cloud.size * 0.3} fill="#64748b" opacity={cloud.opacity} />
          ) : (
            // Regular cumulus cloud
            <>
              <ellipse cx={-cloud.size * 0.3} cy={0} rx={cloud.size * 0.4} ry={cloud.size * 0.5} fill="#94a3b8" opacity={cloud.opacity} />
              <ellipse cx={0} cy={-cloud.size * 0.2} rx={cloud.size * 0.5} ry={cloud.size * 0.5} fill="#94a3b8" opacity={cloud.opacity} />
              <ellipse cx={cloud.size * 0.3} cy={0} rx={cloud.size * 0.4} ry={cloud.size * 0.5} fill="#94a3b8" opacity={cloud.opacity} />
            </>
          )}
        </g>
      ))}

      {/* Wind direction indicators */}
      <g>
        {[0, 90, 180, 270].map((angle, index) => (
          <g key={`wind-${index}`} transform={`translate(${centerX}, ${centerY}) rotate(${angle})`}>
            <line
              x1={0}
              y1={-width / 3}
              x2={0}
              y2={-(width / 3 + 20)}
              stroke="#0088ff"
              strokeWidth={2}
              opacity={0.4}
              markerEnd="url(#arrowhead)"
            />
          </g>
        ))}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#0088ff" opacity={0.4} />
          </marker>
        </defs>
      </g>
    </g>
  );
};
