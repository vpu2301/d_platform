import React, { useState, useRef } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Video } from 'lucide-react';
import { DroneMarker } from './DroneMarker';
import { MapLayers, RadarSweepLayer, SatelliteLayer, IntelLayer, WeatherLayer } from './MapLayers';
import { ObjectsLayer } from './ObjectsLayer';
import { LiveStreamModal } from '../../components/LiveStreamModal';
import { WeatherModal } from '../../components/WeatherModal';

/**
 * Main SVG-based tactical map engine with objects and live stream support
 */
export const TacticalMap = ({
  drones = [],
  intelAlerts = [],
  objects = [],
  onDroneClick,
  selectedDroneId = null,
  width = 800,
  height = 600,
  centerLat = 52.1986, // Bünde, Germany
  centerLng = 8.5911,  // Bünde, Germany
  zoom = 1,
}) => {
  const [activeLayers, setActiveLayers] = useState({
    radar: true,
    satellite: true,
    weather: false, // Weather layer
    intel: true,
    objects: true,
    realmap: true, // OpenStreetMap layer
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showImportantWeather, setShowImportantWeather] = useState(true);
  const [forecastPeriod, setForecastPeriod] = useState(5);
  const svgRef = useRef(null);

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = (lat, lng) => {
    const scale = currentZoom * 1000; // Scale factor
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    
    const x = centerX + (lng - centerLng) * scale;
    const y = centerY - (lat - centerLat) * scale; // Invert Y axis
    
    return { x, y };
  };

  const handleLayerToggle = (layerId) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  const handleZoomIn = () => {
    setCurrentZoom((prev) => Math.min(prev * 1.5, 10));
  };

  const handleZoomOut = () => {
    setCurrentZoom((prev) => Math.max(prev / 1.5, 0.1));
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      svgRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleObjectClick = (object) => {
    setSelectedObject(object);
    setShowLiveStream(true);
  };

  const handleWeatherContextMenu = (action) => {
    if (typeof action === 'string') {
      switch (action) {
        case 'open_modal':
          setShowWeatherModal(true);
          break;
        case 'toggle_important':
          setShowImportantWeather(!showImportantWeather);
          break;
        case 'forecast_3d':
          setForecastPeriod(3);
          setShowWeatherModal(true);
          break;
        case 'forecast_7d':
          setForecastPeriod(7);
          setShowWeatherModal(true);
          break;
        case 'export':
          // Export weather data (placeholder)
          console.log('Exporting weather data...');
          break;
        default:
          break;
      }
    }
  };

  const mapWidth = isFullscreen ? window.innerWidth - 40 : (width || 800);
  const mapHeight = isFullscreen ? window.innerHeight - 40 : (height || 600);
  const centerX = mapWidth / 2;
  const centerY = mapHeight / 2;

  return (
    <>
      <div className="relative glass border border-[#1a1a1a] overflow-hidden w-full h-full flex flex-col bg-[#0a0a0a]">
        {/* Map controls */}
        <div className="absolute top-4 left-4 z-50 flex gap-2 pointer-events-auto">
          <MapLayers
            activeLayers={activeLayers}
            onLayerToggle={handleLayerToggle}
            onWeatherContextMenu={handleWeatherContextMenu}
          />
        </div>

        {/* Zoom controls */}
        <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto">
          <button
            onClick={handleZoomIn}
            className="glass p-2 border border-[#1a1a1a] hover:bg-[#0f0f0f] text-slate-300 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="glass p-2 border border-[#1a1a1a] hover:bg-[#0f0f0f] text-slate-300 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={handleFullscreen}
            className="glass p-2 border border-[#1a1a1a] hover:bg-[#0f0f0f] text-slate-300 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        {/* Map Info Overlay */}
        <div className="absolute bottom-4 left-4 z-50 glass border border-[#1a1a1a] p-2 pointer-events-auto">
          <div className="text-xs font-mono text-slate-400">
            <div>BÜNDE, GERMANY</div>
            <div>LAT: {centerLat.toFixed(4)}</div>
            <div>LNG: {centerLng.toFixed(4)}</div>
            {activeLayers.objects && (
              <div className="mt-1 text-green-500">LIVE FEED</div>
            )}
          </div>
        </div>

        {/* SVG Map Container */}
        <div className="relative flex-1 w-full h-full min-h-0">
          {/* Real Map Layer (OpenStreetMap) - Behind SVG */}
          {activeLayers.realmap && (
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.7 }}>
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${centerLng - 0.1},${centerLat - 0.1},${centerLng + 0.1},${centerLat + 0.1}&layer=mapnik&marker=${centerLat},${centerLng}`}
                className="w-full h-full border-0"
                style={{ 
                  filter: 'invert(1) hue-rotate(180deg) brightness(0.6) contrast(1.3)',
                  minHeight: '100%',
                  minWidth: '100%'
                }}
                title="OpenStreetMap"
                allowFullScreen
              />
            </div>
          )}

          {/* SVG Map */}
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            className="absolute inset-0 z-[1]"
            preserveAspectRatio="xMidYMid meet"
            style={{ minHeight: '100%', minWidth: '100%', background: 'transparent' }}
          >
          <defs>
            {activeLayers.satellite && <SatelliteLayer width={mapWidth} height={mapHeight} />}
          </defs>

          {/* Background pattern (satellite layer) - only if real map is off */}
          {activeLayers.satellite && !activeLayers.realmap && (
            <rect
              width={mapWidth}
              height={mapHeight}
              fill="url(#satellitePattern)"
              opacity={0.5}
            />
          )}

          {/* Grid overlay - make it visible but not too heavy */}
          <defs>
            <pattern
              id="gridPattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={activeLayers.realmap ? "#0088ff" : "#1a1a1a"}
                strokeWidth={0.5}
                opacity={activeLayers.realmap ? 0.2 : 0.3}
              />
            </pattern>
          </defs>
          <rect width={mapWidth} height={mapHeight} fill="url(#gridPattern)" />

          {/* Radar sweep layer */}
          {activeLayers.radar && (
            <RadarSweepLayer
              width={mapWidth}
              height={mapHeight}
              centerX={centerX}
              centerY={centerY}
            />
          )}

          {/* Weather layer */}
          {activeLayers.weather && (
            <WeatherLayer
              width={mapWidth}
              height={mapHeight}
              centerX={centerX}
              centerY={centerY}
            />
          )}

          {/* Intel markers layer */}
          {activeLayers.intel && (
            <IntelLayer intelAlerts={intelAlerts} />
          )}

          {/* Objects layer */}
          {activeLayers.objects && (
            <ObjectsLayer
              objects={objects}
              onObjectClick={handleObjectClick}
              mapWidth={mapWidth}
              mapHeight={mapHeight}
              latLngToPixel={latLngToPixel}
            />
          )}

          {/* Drone markers */}
          {drones.map((drone) => {
            const coords = latLngToPixel(drone.lat, drone.lng);
            return (
              <DroneMarker
                key={drone.id}
                drone={drone}
                x={coords.x}
                y={coords.y}
                onClick={onDroneClick}
                isSelected={drone.id === selectedDroneId}
              />
            );
          })}
        </svg>
        </div>
      </div>

      {/* Live Stream Modal */}
      <LiveStreamModal
        isOpen={showLiveStream}
        onClose={() => {
          setShowLiveStream(false);
          setSelectedObject(null);
        }}
        target={selectedObject}
      />

      {/* Weather Modal */}
      <WeatherModal
        isOpen={showWeatherModal}
        onClose={() => setShowWeatherModal(false)}
        lat={centerLat}
        lng={centerLng}
        location="Bünde, Germany"
        initialForecastDays={forecastPeriod}
      />
    </>
  );
};
