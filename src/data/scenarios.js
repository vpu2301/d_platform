// Simulation scenario definitions

/**
 * Random Walk scenario
 * Drones move stochastically with small random deltas
 */
export const randomWalkScenario = {
  id: 'random_walk',
  name: 'Random Walk',
  description: 'Default state; drones move stochastically',
  apply: (drone) => {
    const delta = 0.001; // Small movement delta
    const latDelta = (Math.random() - 0.5) * delta * 2;
    const lngDelta = (Math.random() - 0.5) * delta * 2;
    
    return {
      lat: drone.lat + latDelta,
      lng: drone.lng + lngDelta,
      heading: (drone.heading + (Math.random() - 0.5) * 10) % 360,
    };
  },
};

/**
 * Hostile Intercept scenario
 * Vectors drones toward a specific grid coordinate
 */
export const hostileInterceptScenario = {
  id: 'hostile_intercept',
  name: 'Hostile Intercept',
  description: 'Vectors drones toward target coordinates',
  target: { lat: 48.201, lng: 16.378 }, // Default target
  apply: (drone, target = null) => {
    const tgt = target || hostileInterceptScenario.target;
    const dx = tgt.lng - drone.lng;
    const dy = tgt.lat - drone.lat;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Move toward target
    const speed = 0.002; // Movement speed
    const heading = Math.atan2(dx, dy) * (180 / Math.PI);
    
    if (distance < 0.001) {
      // Arrived at target
      return {
        lat: drone.lat,
        lng: drone.lng,
        heading: (heading + 360) % 360,
      };
    }
    
    const moveDistance = Math.min(speed, distance);
    const latDelta = Math.cos(heading * Math.PI / 180) * moveDistance;
    const lngDelta = Math.sin(heading * Math.PI / 180) * moveDistance;
    
    return {
      lat: drone.lat + latDelta,
      lng: drone.lng + lngDelta,
      heading: (heading + 360) % 360,
    };
  },
};

/**
 * Return to Base scenario
 * Vectors all drones toward a base location
 */
export const returnToBaseScenario = {
  id: 'return_to_base',
  name: 'Return to Base',
  description: 'All drones return to base coordinates',
  base: { lat: 48.150, lng: 16.300 }, // Base location
  apply: (drone) => {
    const base = returnToBaseScenario.base;
    const dx = base.lng - drone.lng;
    const dy = base.lat - drone.lat;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const speed = 0.003; // Faster return speed
    const heading = Math.atan2(dx, dy) * (180 / Math.PI);
    
    if (distance < 0.001) {
      return {
        lat: drone.lat,
        lng: drone.lng,
        heading: (heading + 360) % 360,
        status: 'maintenance',
      };
    }
    
    const moveDistance = Math.min(speed, distance);
    const latDelta = Math.cos(heading * Math.PI / 180) * moveDistance;
    const lngDelta = Math.sin(heading * Math.PI / 180) * moveDistance;
    
    return {
      lat: drone.lat + latDelta,
      lng: drone.lng + lngDelta,
      heading: (heading + 360) % 360,
      status: 'returning',
    };
  },
};

/**
 * Patrol Pattern scenario
 * Drones follow a rectangular patrol pattern
 */
export const patrolPatternScenario = {
  id: 'patrol_pattern',
  name: 'Patrol Pattern',
  description: 'Drones follow a rectangular patrol route',
  pattern: [
    { lat: 48.180, lng: 16.200 },
    { lat: 48.220, lng: 16.200 },
    { lat: 48.220, lng: 16.400 },
    { lat: 48.180, lng: 16.400 },
  ],
  apply: (drone, patternIndex = 0) => {
    const pattern = patrolPatternScenario.pattern;
    const targetIndex = patternIndex % pattern.length;
    const target = pattern[targetIndex];
    
    const dx = target.lng - drone.lng;
    const dy = target.lat - drone.lat;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const speed = 0.002;
    const heading = Math.atan2(dx, dy) * (180 / Math.PI);
    
    if (distance < 0.001) {
      // Reached waypoint, move to next
      return {
        lat: drone.lat,
        lng: drone.lng,
        heading: (heading + 360) % 360,
        patternIndex: (patternIndex + 1) % pattern.length,
      };
    }
    
    const moveDistance = Math.min(speed, distance);
    const latDelta = Math.cos(heading * Math.PI / 180) * moveDistance;
    const lngDelta = Math.sin(heading * Math.PI / 180) * moveDistance;
    
    return {
      lat: drone.lat + latDelta,
      lng: drone.lng + lngDelta,
      heading: (heading + 360) % 360,
      patternIndex,
    };
  },
};

/**
 * Available scenarios
 */
export const scenarios = [
  randomWalkScenario,
  hostileInterceptScenario,
  returnToBaseScenario,
  patrolPatternScenario,
];
