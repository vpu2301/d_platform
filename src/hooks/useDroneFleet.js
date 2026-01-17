import { useState, useCallback } from 'react';

/**
 * Fleet state management hook
 * Manages drone fleet operations and telemetry updates
 */
export const useDroneFleet = (initialDrones = []) => {
  const [drones, setDrones] = useState(initialDrones);
  const [selectedDrone, setSelectedDrone] = useState(null);

  // Update single drone
  const updateDrone = useCallback((id, updates) => {
    setDrones((prevDrones) =>
      prevDrones.map((drone) =>
        drone.id === id ? { ...drone, ...updates } : drone
      )
    );
    
    // Update selected drone if it's the one being updated
    if (selectedDrone?.id === id) {
      setSelectedDrone((prev) => ({ ...prev, ...updates }));
    }
  }, [selectedDrone]);

  // Update multiple drones (accepts full drone array or array of updates)
  const updateDrones = useCallback((updates) => {
    if (Array.isArray(updates) && updates.length > 0) {
      // Check if it's a full drone array or update objects
      if (updates[0].lat !== undefined && updates[0].lng !== undefined) {
        // Full drone array - replace entire state
        setDrones(updates);
      } else {
        // Update objects array - merge updates
        setDrones((prevDrones) =>
          prevDrones.map((drone) => {
            const update = updates.find((u) => u.id === drone.id);
            return update ? { ...drone, ...update } : drone;
          })
        );
      }
    }
  }, []);

  // Select a drone
  const selectDrone = useCallback((drone) => {
    setSelectedDrone(drone);
  }, []);

  // Deselect drone
  const deselectDrone = useCallback(() => {
    setSelectedDrone(null);
  }, []);

  // Update payload mode
  const updatePayloadMode = useCallback((id, mode) => {
    updateDrone(id, {
      payloadConfig: {
        ...drones.find((d) => d.id === id)?.payloadConfig,
        currentMode: mode,
      },
    });
  }, [drones, updateDrone]);

  // Update drone status
  const updateDroneStatus = useCallback((id, status) => {
    updateDrone(id, { status });
  }, [updateDrone]);

  // Get drone by ID
  const getDrone = useCallback((id) => {
    return drones.find((drone) => drone.id === id);
  }, [drones]);

  // Get active drones
  const getActiveDrones = useCallback(() => {
    return drones.filter((drone) => drone.status === 'active');
  }, [drones]);

  // Get returning drones
  const getReturningDrones = useCallback(() => {
    return drones.filter((drone) => drone.status === 'returning');
  }, [drones]);

  // Get maintenance drones
  const getMaintenanceDrones = useCallback(() => {
    return drones.filter((drone) => drone.status === 'maintenance');
  }, [drones]);

  return {
    drones,
    selectedDrone,
    updateDrone,
    updateDrones,
    selectDrone,
    deselectDrone,
    updatePayloadMode,
    updateDroneStatus,
    getDrone,
    getActiveDrones,
    getReturningDrones,
    getMaintenanceDrones,
  };
};
