import React from 'react';

/**
 * Interactive drone marker for SVG map
 */
export const DroneMarker = ({ drone, x, y, onClick, isSelected }) => {
  const statusColors = {
    active: '#94a3b8', // slate-400
    returning: '#64748b', // slate-500
    maintenance: '#475569', // slate-600
  };
  
  const color = statusColors[drone.status] || statusColors.active;
  
  return (
    <g
      onClick={() => onClick?.(drone)}
      className="cursor-pointer"
      transform={`translate(${x}, ${y})`}
    >
      {/* Heading indicator line */}
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={-20}
        stroke={color}
        strokeWidth={2}
        opacity={0.6}
        transform={`rotate(${drone.heading})`}
      />
      
      {/* Drone body (triangle) */}
      <polygon
        points="0,-15 10,10 -10,10"
        fill={color}
        stroke={isSelected ? '#ffffff' : '#000000'}
        strokeWidth={isSelected ? 2 : 1}
        opacity={0.9}
        transform={`rotate(${drone.heading})`}
      />
      
      {/* Selection indicator */}
      {isSelected && (
        <circle
          cx={0}
          cy={0}
          r={25}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2}
          opacity={0.5}
          className="animate-pulse"
        />
      )}
      
      {/* Drone ID label */}
      <text
        x={0}
        y={35}
        fill={color}
        fontSize="12"
        fontFamily="monospace"
        textAnchor="middle"
        fontWeight="bold"
      >
        {drone.id}
      </text>
      
      {/* Battery indicator dot */}
      <circle
        cx={12}
        cy={-12}
        r={4}
        fill={drone.battery > 50 ? '#94a3b8' : drone.battery > 20 ? '#64748b' : '#475569'}
      />
    </g>
  );
};
