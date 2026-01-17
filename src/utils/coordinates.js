// Coordinate utility functions

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

/**
 * Convert lat/lng to grid reference
 */
export const latLngToGrid = (lat, lng, gridSize = 0.1) => {
  // Simple grid system: divide coordinates into grid cells
  const gridLat = Math.floor(lat / gridSize);
  const gridLng = Math.floor(lng / gridSize);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.abs(gridLat) % letters.length];
  const number = Math.abs(gridLng) % 10;
  return `${letter}${number}`;
};

/**
 * Convert grid reference to lat/lng center
 */
export const gridToLatLng = (gridRef, gridSize = 0.1) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = gridRef[0];
  const number = parseInt(gridRef[1]);
  const gridLat = letters.indexOf(letter) * gridSize;
  const gridLng = number * gridSize;
  return {
    lat: gridLat + gridSize / 2,
    lng: gridLng + gridSize / 2,
  };
};

/**
 * Normalize heading to 0-360 range
 */
export const normalizeHeading = (heading) => {
  return ((heading % 360) + 360) % 360;
};

/**
 * Calculate bearing between two coordinates
 */
export const calculateBearing = (lat1, lng1, lat2, lng2) => {
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
  
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return normalizeHeading(bearing);
};
