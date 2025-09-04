import React, { useState, useEffect, useRef } from 'react';
import './WasteInput.css';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '../firebase';

const WasteInput = ({ onWeightSaved }) => {
  const [weight, setWeight] = useState(0);
  const [wasteType, setWasteType] = useState('');
  const [finalWeight, setFinalWeight] = useState(0);
  const [finalWasteType, setFinalWasteType] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(true);
  
  // Use useRef to store timer reference
  const inactivityTimer = useRef(null);

  // Timeout duration in milliseconds (5 seconds of no data updates)
  const INACTIVITY_TIMEOUT = 5000;

  useEffect(() => {
    if (!isMonitoring) return;

    const db = getDatabase(app);
    const testRef = ref(db, 'test');
    
    // Listen to database changes
    const unsubscribe = onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Raw database data:', data);
      console.log('Data type:', typeof data);
      
      let weightValue = 0;
      let wasteTypeValue = '';
      
      // Handle different data structures
      if (data !== null && data !== undefined) {
         if (typeof data === 'object') {
          
          if (data.weight !== undefined) {
            weightValue = data.weight;
            console.log('Weight from data.weight:', weightValue);
          }
          
          if (data.type !== undefined) {
            wasteTypeValue = data.type;
            console.log('Waste type from data.type:', wasteTypeValue);
          }
          
          // Handle nested object structure
          if (!weightValue || !wasteTypeValue) {
            const values = Object.values(data);
            if (values.length > 0 && typeof values[0] === 'object') {
              if (values[0].weight !== undefined && !weightValue) {
                weightValue = values[0].weight;
                console.log('Weight from nested object:', weightValue);
              }
              if (values[0].wasteType !== undefined && !wasteTypeValue) {
                wasteTypeValue = values[0].wasteType;
                console.log('Waste type from nested object:', wasteTypeValue);
              } else if (values[0].type !== undefined && !wasteTypeValue) {
                wasteTypeValue = values[0].type;
                console.log('Waste type from nested object (type):', wasteTypeValue);
              }
            }
          }
        }
      }
      
      console.log('Final weight value:', weightValue);
      console.log('Final waste type value:', wasteTypeValue);
      
      setWeight(Number(weightValue) || 0);
      setWasteType(wasteTypeValue || 'Unknown');
      setLastUpdated(new Date());
      setLoading(false);

      // Clear existing timer
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }

      // Set new timer to detect when data stops
      inactivityTimer.current = setTimeout(() => {
        const savedWeight = Number(weightValue) || 0;
        const savedType = wasteTypeValue || 'Unknown';
        
        console.log('Data stream stopped, saving final weight:', savedWeight);
        console.log('Data stream stopped, saving final waste type:', savedType);
        
        setFinalWeight(savedWeight);
        setFinalWasteType(savedType);
        setIsMonitoring(false);
        
        // Notify parent component about the saved weight and type
        if (onWeightSaved) {
          onWeightSaved({
            weight: savedWeight,
            wasteType: savedType
          });
        }
      }, INACTIVITY_TIMEOUT);
    }, (error) => {
      console.error('Database error:', error);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      unsubscribe();
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [isMonitoring, onWeightSaved]);

  // Reset function to start new measurement
  const handleReset = () => {
    // Clear any existing timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    setWeight(0);
    setWasteType('');
    setFinalWeight(0);
    setFinalWasteType('');
    setIsMonitoring(true);
    setLoading(true);
    setLastUpdated(null);
    console.log('Reset - Starting new measurement');
  };

  // Calculate biogas production (1 kg wet waste = 0.04 m³ biogas)
  const calculateBiogas = (weight) => {
    return (weight * 0.04).toFixed(3);
  };

  // Calculate meals (1 kg wet waste = 2.2 meals worth of energy)
  const calculateMeals = (weight) => {
    return Math.round(weight * 2.2);
  };

  // Calculate eco-points (1 kg = 1 points)
  const calculateEcoPoints = (weight) => {
    return Math.round(weight * 1);
  };

  // Use final values if monitoring stopped, otherwise use current values
  const displayWeight = !isMonitoring ? finalWeight : weight;
  const displayWasteType = !isMonitoring ? finalWasteType : wasteType;
  const biogas = calculateBiogas(displayWeight);
  const meals = calculateMeals(displayWeight);
  const ecoPoints = calculateEcoPoints(displayWeight);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Live Waste Input</h2>
          <div className="status-indicator">
            <div className={`status-dot ${loading ? 'loading' : isMonitoring ? 'active' : 'saved'}`}></div>
            <span className="status-text">
              {loading ? 'Loading...' : isMonitoring ? 'Live' : 'Saved'}
            </span>
          </div>
        </div>

        {/* Waste Type Display */}
        <div className="waste-type-display">
          <div className="waste-type-value">
            {loading ? '---' : displayWasteType || 'Unknown'}
          </div>
          <div className="waste-type-label">Waste Type</div>
        </div>

        {/* Weight Display */}
        <div className="weight-display">
          <div className="weight-value">
            {loading ? '---' : displayWeight.toFixed(1)} g
          </div>
          <div className="weight-label">
            {!isMonitoring ? 'Final Weight' : 'Current Weight'}
          </div>
        </div>

        {/* Conversion Chain - Only show for wet waste */}
        {(displayWasteType.toLowerCase().includes('wet') || displayWasteType.toLowerCase().includes('organic')) && (
          <div className="conversion-chain">
            <div className="conversion-item">
              <span className="conversion-value">
                {loading ? '---' : biogas} m³
              </span>
              <span className="conversion-label">Biogas</span>
            </div>
            <div className="conversion-arrow">→</div>
            <div className="conversion-item">
              <span className="conversion-value">
                {loading ? '---' : meals}
              </span>
              <span className="conversion-label">Meals</span>
            </div>
          </div>
        )}

        {/* Eco Points */}
        <div className="eco-points">
          <div className="eco-points-value">
            {loading ? '---' : ecoPoints}
          </div>
          <div className="eco-points-label">Eco-Points Earned</div>
        </div>

        {/* Reset Button - Only show when monitoring has stopped */}
        {!isMonitoring && (
          <div className="reset-section">
            <button className="reset-button" onClick={handleReset}>
              Start New Measurement
            </button>
          </div>
        )}

        {/* Last Updated */}
        <div className="last-updated">
          Last updated: {loading ? 'Loading...' : lastUpdated?.toLocaleTimeString()}
          {!isMonitoring && <span className="saved-indicator"> (Weight Saved)</span>}
        </div>
      </div>
    </div>
  );
};

export default WasteInput;