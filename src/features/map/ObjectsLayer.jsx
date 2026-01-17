import React from 'react';

/**
 * Objects layer - shows buildings, vehicles, and other objects on the map
 */
export const ObjectsLayer = ({ objects = [], onObjectClick, mapWidth, mapHeight, latLngToPixel }) => {
  if (!latLngToPixel) return null;

  const objectIcons = {
    building: '🏢',
    vehicle: '🚗',
    structure: '🏗️',
    checkpoint: '🚧',
    target: '🎯',
    facility: '🏭',
  };

  return (
    <g>
      {objects.map((obj) => {
        const coords = latLngToPixel(obj.lat, obj.lng);
        
        return (
          <g
            key={obj.id}
            transform={`translate(${coords.x}, ${coords.y})`}
            onClick={() => onObjectClick?.(obj)}
            className="cursor-pointer"
          >
            {/* Object marker */}
            <circle
              cx={0}
              cy={0}
              r={obj.type === 'target' ? 10 : 6}
              fill={obj.type === 'target' ? '#ff4444' : '#64748b'}
              opacity={0.7}
              stroke={obj.type === 'target' ? '#ff0000' : '#94a3b8'}
              strokeWidth={2}
            />
            
            {/* Object label */}
            <text
              x={0}
              y={obj.type === 'target' ? -18 : -12}
              fill="#94a3b8"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
              fontWeight="bold"
            >
              {obj.id}
            </text>
            
            {/* Target indicator for important objects */}
            {obj.type === 'target' && (
              <circle
                cx={0}
                cy={0}
                r={15}
                fill="none"
                stroke="#ff4444"
                strokeWidth={1}
                opacity={0.5}
                className="animate-pulse"
              />
            )}
          </g>
        );
      })}
    </g>
  );
};
