import React, { useState } from 'react';
import { Video, Radio, Activity, MapPin, AlertTriangle, Play, Pause } from 'lucide-react';
import { LiveStreamModal } from './LiveStreamModal';
import { SecureChat } from '../features/operations/SecureChat';
import { Button } from './Button';

/**
 * Right sidebar with live stream, communication, and other info
 */
export const RightSidebar = ({
  selectedDrone,
  intelAlerts = [],
  chatMessages = [],
  onSendMessage,
  isSimulationRunning,
  toggleSimulation,
}) => {
  const [activeStream, setActiveStream] = useState(null);
  const [activeTab, setActiveTab] = useState('stream'); // stream, comm, intel

  // Get active live streams (simulated - would come from drones/objects with active feeds)
  const activeStreams = selectedDrone
    ? [
        {
          id: `STREAM-${selectedDrone.id}`,
          name: `${selectedDrone.id} Feed`,
          source: selectedDrone.id,
          type: 'drone',
          lat: selectedDrone.lat,
          lng: selectedDrone.lng,
          status: 'active',
        },
      ]
    : [];

  const criticalAlerts = intelAlerts.filter(a => a.severity === 'critical' || a.severity === 'high').slice(0, 5);

  const tabs = [
    { id: 'stream', name: 'Streams', icon: Video },
    { id: 'comm', name: 'Comm', icon: Radio },
    { id: 'intel', name: 'Intel', icon: AlertTriangle },
  ];

  const handleStreamClick = (stream) => {
    setActiveStream(stream);
  };

  return (
    <>
      <div className="w-80 border-l border-[#1a1a1a] flex flex-col overflow-hidden bg-[#0f0f0f]">
        {/* Header/Tabs */}
        <div className="p-3 border-b border-[#1a1a1a]">
          <div className="flex gap-1 mb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 text-xs uppercase tracking-wide transition-all border ${
                    isActive
                      ? 'bg-[#0088ff]/10 text-[#0088ff] border-[#0088ff]/30'
                      : 'bg-[#0a0a0a] text-slate-400 border-[#1a1a1a] hover:bg-[#0f0f0f] hover:text-slate-300'
                  }`}
                >
                  <Icon size={14} className="mx-auto mb-1" />
                  <div>{tab.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'stream' && (
            <div className="p-4 space-y-3">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Live Streams</div>
              
              {activeStreams.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  <Video size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No active streams</p>
                  <p className="text-xs text-slate-600 mt-1">Select a drone to view feed</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeStreams.map((stream) => (
                    <div
                      key={stream.id}
                      onClick={() => handleStreamClick(stream)}
                      className="border border-[#1a1a1a] bg-[#0a0a0a] cursor-pointer hover:bg-[#0f0f0f] hover:border-[#0088ff]/30 transition-all"
                    >
                      {/* Stream Preview */}
                      <div className="aspect-video bg-[#0a0a0a] relative border-b border-[#1a1a1a]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video size={24} className="text-slate-600" />
                        </div>
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-red-500/20 border border-red-500/30">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                          <span className="text-xs font-mono text-red-400">LIVE</span>
                        </div>
                        <div className="absolute bottom-2 right-2 text-xs font-mono text-slate-400 bg-black/60 px-2 py-0.5">
                          {stream.status === 'active' ? 'HD' : 'OFF'}
                        </div>
                      </div>
                      
                      {/* Stream Info */}
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-mono text-white">{stream.name}</span>
                          <span className="text-xs text-slate-500 uppercase">{stream.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <MapPin size={12} />
                          <span className="font-mono">{stream.lat?.toFixed(3)}, {stream.lng?.toFixed(3)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Simulation Control */}
              <div className="mt-6 pt-4 border-t border-[#1a1a1a]">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Simulation</div>
                <Button
                  variant={isSimulationRunning ? 'danger' : 'success'}
                  onClick={toggleSimulation}
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSimulationRunning ? (
                    <>
                      <Pause size={14} />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>Start</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'comm' && (
            <div className="h-full flex flex-col">
              <SecureChat messages={chatMessages} onSendMessage={onSendMessage} />
            </div>
          )}

          {activeTab === 'intel' && (
            <div className="p-4 space-y-3">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Active Alerts</div>
              
              {criticalAlerts.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  <AlertTriangle size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No active alerts</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {criticalAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="border border-red-500/30 bg-red-500/10 p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold uppercase text-red-400">{alert.category}</span>
                        <span className="text-xs font-mono text-red-300">{alert.time}</span>
                      </div>
                      <div className="text-sm text-red-300 mb-1">{alert.title}</div>
                      <div className="text-xs font-mono text-slate-400">{alert.location}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Live Stream Modal */}
      {activeStream && (
        <LiveStreamModal
          isOpen={!!activeStream}
          onClose={() => setActiveStream(null)}
          target={activeStream}
        />
      )}
    </>
  );
};
