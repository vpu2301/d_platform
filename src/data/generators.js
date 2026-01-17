// Mock data generators for drones, intel alerts, and mission history

/**
 * Generate a random drone ID
 */
const generateDroneId = () => {
  const prefix = 'UA-';
  const number = Math.floor(Math.random() * 200) + 100;
  return `${prefix}${number}`;
};

/**
 * Generate a random UUID
 */
const generateUUID = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

/**
 * Generate random coordinates within a bounding box
 */
const generateCoordinates = () => {
  // Bünde, Germany region (52.1986° N, 8.5911° E)
  // Generate coordinates around Bünde ±0.1 degrees (~11km radius)
  const lat = 52.1986 + (Math.random() - 0.5) * 0.2;
  const lng = 8.5911 + (Math.random() - 0.5) * 0.2;
  return { lat, lng };
};

/**
 * Generate a drone entity
 */
export const generateDrone = (overrides = {}) => {
  const coords = generateCoordinates();
  const models = ['Raven-X', 'Raven-II', 'Predator-Mini', 'Reaper-Lite', 'Global Hawk'];
  const statuses = ['active', 'returning', 'maintenance'];
  const payloadTypes = ['EO/IR_MK4', 'EO/IR_MK3', 'RADAR_X1', 'SIGINT_A2'];
  const modes = {
    'EO/IR_MK4': ['Thermal', 'Night', 'RGB'],
    'EO/IR_MK3': ['Thermal', 'RGB'],
    'RADAR_X1': ['Ground', 'Air', 'Maritime'],
    'SIGINT_A2': ['COMINT', 'ELINT'],
  };

  const payload = payloadTypes[Math.floor(Math.random() * payloadTypes.length)];
  const availableModes = modes[payload] || ['RGB'];

  return {
    id: generateDroneId(),
    uuid: generateUUID(),
    model: models[Math.floor(Math.random() * models.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    battery: Math.floor(Math.random() * 40) + 60, // 60-100%
    signal: Math.floor(Math.random() * 20) + 80, // 80-100 dB
    lat: coords.lat,
    lng: coords.lng,
    heading: Math.floor(Math.random() * 360),
    altitude: Math.floor(Math.random() * 5000) + 1000, // 1000-6000m
    speed: Math.random() * 50 + 20, // 20-70 m/s
    payload,
    payloadConfig: {
      type: 'Optical',
      zoom: `${Math.floor(Math.random() * 100) + 10}x`,
      modes: availableModes,
      currentMode: availableModes[0],
    },
    ...overrides,
  };
};

/**
 * Generate multiple drones
 */
export const generateDrones = (count = 5) => {
  return Array.from({ length: count }, () => generateDrone());
};

/**
 * Generate an intelligence alert
 */
export const generateIntelAlert = (overrides = {}) => {
  const categories = ['JAMMING', 'SIGINT', 'WEATHER', 'HOSTILE', 'GPS_ANOMALY'];
  const severities = ['critical', 'high', 'medium', 'low'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];

  const alerts = {
    JAMMING: 'GPS Anomaly',
    SIGINT: 'Signal Intercept Detected',
    WEATHER: 'Severe Weather Warning',
    HOSTILE: 'Hostile Contact',
    GPS_ANOMALY: 'Navigation System Degradation',
  };

  const grids = ['A7', 'B3', 'C9', 'D2', 'E5', 'F8', 'G1', 'H6'];
  const grid = grids[Math.floor(Math.random() * grids.length)];

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;

  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    severity,
    category,
    title: alerts[category] || 'Unknown Alert',
    location: `Grid ${grid}`,
    time,
    timestamp: Date.now(),
    ...overrides,
  };
};

/**
 * Generate multiple intelligence alerts
 */
export const generateIntelAlerts = (count = 10) => {
  return Array.from({ length: count }, () => generateIntelAlert());
};

/**
 * Generate mission phases
 */
export const generateMissionPhases = () => {
  const now = Date.now();
  const phases = [
    { id: 'briefing', name: 'Briefing', duration: 15 * 60 * 1000 },
    { id: 'takeoff', name: 'Takeoff', duration: 5 * 60 * 1000 },
    { id: 'transit', name: 'Transit', duration: 30 * 60 * 1000 },
    { id: 'operation', name: 'Operation', duration: 60 * 60 * 1000 },
    { id: 'rtb', name: 'RTB', duration: 30 * 60 * 1000 },
  ];

  let currentTime = now;
  return phases.map((phase, index) => {
    const startTime = currentTime;
    const endTime = currentTime + phase.duration;
    currentTime = endTime;

    return {
      id: phase.id,
      name: phase.name,
      startTime,
      endTime,
      status: index === 0 ? 'active' : 'pending',
    };
  });
};

/**
 * Generate chat messages
 */
export const generateChatMessage = (operator, message, encrypted = true) => {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    operator,
    message,
    timestamp: Date.now(),
    encrypted,
  };
};

/**
 * Generate map objects (buildings, vehicles, targets, etc.)
 */
export const generateMapObject = (overrides = {}) => {
  const coords = generateCoordinates();
  const types = ['building', 'vehicle', 'structure', 'checkpoint', 'target', 'facility'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const objectIds = {
    building: 'BLD',
    vehicle: 'VEH',
    structure: 'STR',
    checkpoint: 'CHK',
    target: 'TGT',
    facility: 'FAC',
  };

  const idPrefix = objectIds[type] || 'OBJ';
  const idNumber = Math.floor(Math.random() * 1000) + 100;
  const id = `${idPrefix}-${idNumber}`;

  return {
    id,
    type,
    lat: coords.lat,
    lng: coords.lng,
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${idNumber}`,
    source: 'AUTO',
    ...overrides,
  };
};

/**
 * Generate multiple map objects
 */
export const generateMapObjects = (count = 15) => {
  return Array.from({ length: count }, () => generateMapObject());
};
