import { useState, useEffect, useRef } from 'react';
import { randomWalkScenario } from '../data/scenarios';

/**
 * Simulation hook with 1000ms tick rate
 * Drives unit behavior based on selected scenarios
 */
export const useSimulation = (drones, activeScenario = randomWalkScenario) => {
  const [simulatedDrones, setSimulatedDrones] = useState(drones);
  const [isRunning, setIsRunning] = useState(true);
  const tickIntervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    // Initialize simulation loop
    tickIntervalRef.current = setInterval(() => {
      setSimulatedDrones((prevDrones) => {
        return prevDrones.map((drone) => {
          // Apply scenario movement
          const movement = activeScenario.apply(drone);
          
          // Apply resource decay (0.005% per tick)
          const batteryDecay = 0.005;
          const newBattery = Math.max(0, drone.battery - batteryDecay);
          
          // Small signal strength variation
          const signalVariation = (Math.random() - 0.5) * 2;
          const newSignal = Math.max(0, Math.min(100, drone.signal + signalVariation));

          return {
            ...drone,
            ...movement,
            battery: parseFloat(newBattery.toFixed(2)),
            signal: parseFloat(newSignal.toFixed(2)),
            // Update status based on battery
            status: newBattery < 10 ? 'returning' : drone.status,
          };
        });
      });
    }, 1000); // 1000ms tick rate

    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, [isRunning, activeScenario]);

  // Update drones when initial drones change
  useEffect(() => {
    setSimulatedDrones(drones);
  }, [drones]);

  const startSimulation = () => setIsRunning(true);
  const stopSimulation = () => setIsRunning(false);
  const toggleSimulation = () => setIsRunning(!isRunning);

  return {
    drones: simulatedDrones,
    isRunning,
    startSimulation,
    stopSimulation,
    toggleSimulation,
  };
};
