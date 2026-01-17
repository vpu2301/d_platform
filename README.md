# AEROSIGHT Drone Intelligence Platform v2.0

A high-fidelity, web-based Command and Control (C2) interface designed for Unmanned Aerial Systems (UAS). Provides operators with a "single pane of glass" view to monitor drone fleets, analyze geospatial intelligence, and manage tactical missions.

## Features

- **Tactical Map Engine**: SVG-based layered map with Radar, Satellite, and Intel layers
- **Drone Fleet Management**: Real-time telemetry, payload control, and status monitoring
- **Simulation Deck**: Scenario injection system with multiple behavioral patterns
- **Operational Tools**: Mission timeline, secure chat, and intelligence feed
- **Defense-Grade UI**: Glassmorphic design with high-contrast dark mode
- **Real-time Updates**: 1000ms tick rate simulation engine

## Technology Stack

- **Frontend Framework**: React 18+ (Functional Components, Hooks)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS (Utility-first framework)
- **Icons**: lucide-react (Vector SVGs)
- **Build Tool**: Vite
- **Runtime**: Browser-based (Client-side rendering)

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (optional)

### Installation

1. Clone or navigate to the project directory:
```bash
cd platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Docker Deployment

### Development Mode

Run the development server with hot reload in Docker:

```bash
docker-compose up dev
```

The application will be available at `http://localhost:3000`

### Production Mode

Build and run the production container:

```bash
docker-compose up prod
```

The application will be available at `http://localhost:8080`

### Build Only

```bash
docker build -t aerosight-platform .
```

## Architecture

The application is structured as a modular React SPA:

```
src/
├── components/          # Reusable UI atoms (Card, Button, Badge, Modal)
├── views/               # Main operational screens (Dashboard, Fleet, Intel, Settings)
├── features/            # Feature modules
│   ├── map/            # Tactical map engine
│   ├── drones/         # Drone fleet management
│   ├── simulation/     # Simulation engine
│   └── operations/     # Operational tools (Timeline, Chat, Intel)
├── data/               # Data layer (generators, models, scenarios)
├── hooks/              # Custom React hooks (useSimulation, useDroneFleet)
├── utils/              # Utility functions (time, coordinates)
└── styles/             # Theme system and animations
```

## Key Capabilities

### Tactical Map Engine

- **Layers**: Toggle between Radar, Satellite, and Intel views
- **Drone Markers**: Interactive markers with heading indicators and battery status
- **Zoom & Pan**: Interactive map controls with fullscreen support
- **Animations**: Radar sweep with rotating animations

### Drone Fleet Management

- **Telemetry**: Real-time battery, signal, altitude, speed, and heading
- **Payload Control**: Switch between payload modes (Thermal, Night Vision, RGB)
- **Status Monitoring**: Active, Returning, Maintenance states
- **Selection**: Click drones on map or in fleet view to view details

### Simulation Deck

- **Random Walk**: Default stochastic movement
- **Hostile Intercept**: Vector drones toward target coordinates
- **Return to Base**: Automatic RTB behavior
- **Patrol Pattern**: Rectangular patrol routes

### Operational Tools

- **Mission Timeline**: Gantt-style visualization of mission phases
- **Secure Chat**: Simulated encrypted operator communications
- **Intel Feed**: Prioritized alerts (SIGINT, Weather, Hostile Contact)

## Configuration

### Simulation Settings

- **Tick Rate**: 1000ms (configurable in `useSimulation.js`)
- **Resource Decay**: 0.005% battery per tick
- **Movement Speed**: Variable by scenario

### Theme Customization

The theme system in `src/styles/theme.js` supports extensibility for future "Gotham" styled variant.

## Data Models

### Drone Entity

```javascript
{
  id: "UA-104",
  uuid: "7X92KLM",
  model: "Raven-X",
  status: "active",
  battery: 82.5,
  signal: 94,
  lat: 48.201,
  lng: 16.378,
  heading: 240,
  altitude: 1500,
  speed: 45.0,
  payload: "EO/IR_MK4",
  payloadConfig: {
    type: "Optical",
    zoom: "60x",
    modes: ["Thermal", "Night", "RGB"],
    currentMode: "Thermal"
  }
}
```

### Intelligence Alert

```javascript
{
  id: 1,
  severity: "critical",
  category: "JAMMING",
  title: "GPS Anomaly",
  location: "Grid A7",
  time: "10:41:30",
  timestamp: 1698328890000
}
```

## Development

### Adding New Scenarios

Add scenario definitions to `src/data/scenarios.js`:

```javascript
export const myScenario = {
  id: 'my_scenario',
  name: 'My Scenario',
  description: 'Custom behavior description',
  apply: (drone) => {
    // Custom movement logic
    return { lat, lng, heading };
  },
};
```

### Adding New Views

1. Create view component in `src/views/`
2. Add route to `App.jsx`
3. Add navigation item to sidebar

## Future Roadmap (v3.0)

- **Mapbox Integration**: Replace SVG map with WebGL tile rendering
- **WebSockets**: Real-time multi-user synchronization via SSE
- **3D View**: Three.js point cloud rendering
- **Gotham Theme**: Extended theme variant

## License

UNCLASSIFIED // TECHNICAL

## Classification

UNCLASSIFIED // TECHNICAL

---

**Version**: 2.0 (Release Candidate)  
**Date**: October 26, 2023
