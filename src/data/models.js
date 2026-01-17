// Data schemas matching the AEROSIGHT spec

/**
 * Drone Entity Schema
 * @typedef {Object} Drone
 * @property {string} id - Drone identifier (e.g., "UA-104")
 * @property {string} uuid - Unique identifier (e.g., "7X92KLM")
 * @property {string} model - Drone model (e.g., "Raven-X")
 * @property {string} status - Status: "active" | "returning" | "maintenance"
 * @property {number} battery - Battery percentage (0-100)
 * @property {number} signal - Signal strength in dB
 * @property {number} lat - Latitude coordinate
 * @property {number} lng - Longitude coordinate
 * @property {number} heading - Heading in degrees (0-360)
 * @property {number} altitude - Altitude in meters
 * @property {number} speed - Speed in m/s
 * @property {string} payload - Payload identifier (e.g., "EO/IR_MK4")
 * @property {Object} payloadConfig - Payload configuration
 * @property {string} payloadConfig.type - Payload type (e.g., "Optical")
 * @property {string} payloadConfig.zoom - Zoom level (e.g., "60x")
 * @property {string[]} payloadConfig.modes - Available modes (e.g., ["Thermal", "Night", "RGB"])
 * @property {string} payloadConfig.currentMode - Current active mode
 */

/**
 * Intelligence Alert Schema
 * @typedef {Object} IntelligenceAlert
 * @property {number} id - Alert identifier
 * @property {string} severity - Severity: "critical" | "high" | "medium" | "low"
 * @property {string} category - Alert category (e.g., "JAMMING", "SIGINT", "WEATHER", "HOSTILE")
 * @property {string} title - Alert title
 * @property {string} location - Location identifier (e.g., "Grid A7")
 * @property {string} time - Time string (e.g., "10:41:30")
 * @property {number} timestamp - Unix timestamp
 */

/**
 * Mission Phase Schema
 * @typedef {Object} MissionPhase
 * @property {string} id - Phase identifier
 * @property {string} name - Phase name (e.g., "Briefing", "Takeoff", "RTB")
 * @property {number} startTime - Start timestamp
 * @property {number} endTime - End timestamp (optional)
 * @property {string} status - Status: "pending" | "active" | "completed"
 */

/**
 * Chat Message Schema
 * @typedef {Object} ChatMessage
 * @property {string} id - Message identifier
 * @property {string} operator - Operator identifier
 * @property {string} message - Message content
 * @property {number} timestamp - Unix timestamp
 * @property {boolean} encrypted - Whether message is encrypted
 */
