import React, { useState, useEffect } from 'react';
import { X, Video, Wifi, Signal, MapPin, Clock, Target, Package, Camera, Send, Droplet, Lock, Radio, Zap, Shield } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

/**
 * Live stream modal with liquid glass control panel - displays live feed from target area
 */
export const LiveStreamModal = ({ isOpen, onClose, target, streamUrl = null }) => {
  const [streamStatus, setStreamStatus] = useState('connecting');
  const [streamQuality, setStreamQuality] = useState('HD');

  useEffect(() => {
    if (isOpen && target) {
      // Simulate stream connection
      setStreamStatus('connecting');
      const timer = setTimeout(() => {
        setStreamStatus('active');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, target]);

  if (!target) return null;

  // Mock stream URL - in production this would come from the actual stream source
  const displayStreamUrl = streamUrl || `https://via.placeholder.com/800x600/0a0a0a/64748b?text=LIVE+STREAM+${target.id || 'TARGET'}`;

  // Command and Control options
  const controlOptions = [
    { 
      id: 'free_payload', 
      label: 'Free Payload', 
      icon: Package, 
      description: 'Release payload from device',
      variant: 'primary',
      action: () => console.log('Free Payload')
    },
    { 
      id: 'make_video', 
      label: 'Record Video', 
      icon: Camera, 
      description: 'Start video recording',
      variant: 'primary',
      action: () => console.log('Make Video')
    },
    { 
      id: 'send_target', 
      label: 'Send Target', 
      icon: Target, 
      description: 'Send coordinates to forces',
      variant: 'primary',
      action: () => console.log('Send Target to Forces')
    },
    { 
      id: 'drop_payload', 
      label: 'Drop Payload', 
      icon: Droplet, 
      description: 'Emergency payload drop',
      variant: 'danger',
      action: () => console.log('Drop Payload')
    },
    { 
      id: 'lock_target', 
      label: 'Lock Target', 
      icon: Lock, 
      description: 'Lock on target position',
      variant: 'primary',
      action: () => console.log('Lock Target')
    },
    { 
      id: 'comms', 
      label: 'Open Comms', 
      icon: Radio, 
      description: 'Establish communication',
      variant: 'primary',
      action: () => console.log('Open Communications')
    },
    { 
      id: 'stun', 
      label: 'Stun Mode', 
      icon: Zap, 
      description: 'Activate stun protocol',
      variant: 'warning',
      action: () => console.log('Stun Mode')
    },
    { 
      id: 'secure', 
      label: 'Secure Channel', 
      icon: Shield, 
      description: 'Establish secure channel',
      variant: 'primary',
      action: () => console.log('Secure Channel')
    },
  ];

  const handleCommand = (option) => {
    option.action();
    // You could add notification or confirmation here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`LIVE STREAM - ${target.id || target.name || 'TARGET'}`} className="max-w-[95vw] w-full max-h-[95vh]">
      <div className="flex gap-4 h-[85vh]">
        {/* Main Stream Display Area */}
        <div className="flex-1 flex flex-col space-y-4 min-w-0">
          {/* Stream Status Bar */}
          <div className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-[#1a1a1a]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  streamStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-[#ffaa00]'
                }`}></div>
                <span className="text-xs text-slate-400 uppercase tracking-wide">
                  {streamStatus === 'active' ? 'LIVE' : 'CONNECTING'}
                </span>
              </div>
              <div className="w-px h-4 bg-[#1a1a1a]"></div>
              <div className="flex items-center gap-2">
                <Signal size={14} className="text-green-500" />
                <span className="text-xs font-mono text-slate-300">{streamQuality}</span>
              </div>
              <div className="w-px h-4 bg-[#1a1a1a]"></div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-xs font-mono text-slate-400">
                  {target.lat?.toFixed(4)}, {target.lng?.toFixed(4)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              <span className="text-xs font-mono text-slate-400">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Stream Display Area */}
          <div className="relative flex-1 border border-[#1a1a1a] bg-black aspect-video min-h-0">
            {streamStatus === 'active' ? (
              <>
                {/* Placeholder for actual video stream */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
                  <div className="text-center">
                    <Video size={64} className="mx-auto mb-4 text-slate-600" />
                    <div className="text-lg font-mono text-slate-400 mb-2">LIVE STREAM</div>
                    <div className="text-sm text-slate-500">{target.id || target.name || 'Target Area'}</div>
                    <div className="mt-4 text-xs text-slate-600">
                      {target.type ? `${target.type.toUpperCase()} VIEW` : 'REAL-TIME FEED'}
                    </div>
                  </div>
                </div>
                
                {/* Stream overlay info */}
                <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur-sm border border-[#1a1a1a]">
                  <div className="text-xs font-mono text-white">{target.id}</div>
                  <div className="text-xs text-slate-400">{target.type || 'OBJECT'}</div>
                </div>

                {/* Stream controls overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1a1a1a] text-white text-xs hover:bg-[#0f0f0f] transition-all">
                    REC
                  </button>
                  <button className="px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1a1a1a] text-white text-xs hover:bg-[#0f0f0f] transition-all">
                    SNAP
                  </button>
                </div>

                {/* Grid overlay (simulating camera view) */}
                <svg className="absolute inset-0 pointer-events-none opacity-20">
                  <defs>
                    <pattern id="crosshairPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="#64748b" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#crosshairPattern)" />
                  <circle cx="50%" cy="50%" r="20" fill="none" stroke="#64748b" strokeWidth="1" />
                </svg>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0088ff] mx-auto mb-4"></div>
                  <div className="text-sm text-slate-400">Establishing connection...</div>
                  <div className="text-xs text-slate-500 mt-2">{target.id || target.name}</div>
                </div>
              </div>
            )}
          </div>

          {/* Stream Metadata */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Source</div>
              <div className="text-sm font-mono text-white">{target.source || 'AUTO'}</div>
            </div>
            <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">FPS</div>
              <div className="text-sm font-mono text-white">30</div>
            </div>
            <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Resolution</div>
              <div className="text-sm font-mono text-white">1920x1080</div>
            </div>
          </div>
        </div>

        {/* Right Control Panel - Liquid Glass */}
        <div className="w-72 border-l border-[#1a1a1a] flex flex-col overflow-hidden">
          {/* Control Panel Header */}
          <div className="p-4 border-b border-[#1a1a1a] bg-[#0a0a0a]/60 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-0.5 h-4 bg-[#0088ff]"></div>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">Command & Control</h3>
            </div>
            <div className="text-xs text-slate-500 font-mono">{target.id || 'TARGET'}</div>
          </div>

          {/* Control Options */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {controlOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleCommand(option)}
                  className={`w-full p-3 border transition-all text-left group ${
                    option.variant === 'danger'
                      ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50'
                      : option.variant === 'warning'
                      ? 'border-[#ffaa00]/30 bg-[#ffaa00]/5 hover:bg-[#ffaa00]/10 hover:border-[#ffaa00]/50'
                      : 'border-[#0088ff]/30 bg-[#0088ff]/5 hover:bg-[#0088ff]/10 hover:border-[#0088ff]/50'
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <Icon 
                      size={18} 
                      className={`${
                        option.variant === 'danger'
                          ? 'text-red-400'
                          : option.variant === 'warning'
                          ? 'text-[#ffaa00]'
                          : 'text-[#0088ff]'
                      } group-hover:scale-110 transition-transform`}
                    />
                    <span className={`text-sm font-semibold uppercase tracking-wide ${
                      option.variant === 'danger'
                        ? 'text-red-300'
                        : option.variant === 'warning'
                        ? 'text-[#ffaa00]'
                        : 'text-slate-200'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 ml-7">{option.description}</p>
                </button>
              );
            })}
          </div>

          {/* Control Panel Footer */}
          <div className="p-4 border-t border-[#1a1a1a] bg-[#0a0a0a]/60 backdrop-blur-md">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Status</div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-300">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
