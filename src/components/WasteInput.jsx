import React, { useState, useEffect } from 'react';
import './WasteInput.css';

const WasteInput = () => {
  const [wasteData, setWasteData] = useState({ weight: 0 });
  const [loading, setLoading] = useState(true);

  // Simulate API fetch with dummy data
  const fetchWasteData = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate random weight between 0.1 and 5.0 kg
      const randomWeight = Math.round((Math.random() * 4.9 + 0.1) * 10) / 10;
      
      setWasteData({ weight: randomWeight });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching waste data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchWasteData();

    // Set up interval to fetch data every 5 seconds
    const interval = setInterval(fetchWasteData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Calculate biogas production (1 kg wet waste = ~0.04 m³ biogas)
  const calculateBiogas = (weight) => {
    return Math.round(weight * 0.04 * 1000) / 1000; // Round to 3 decimal places
  };

  // Calculate meals (1 kg wet waste = ~2.2 meals worth of energy)
  const calculateMeals = (weight) => {
    return Math.round(weight * 2.2);
  };

  // Calculate eco-points (1 kg = 10 points)
  const calculateEcoPoints = (weight) => {
    return Math.round(weight * 10);
  };

  const { weight } = wasteData;
  const biogas = calculateBiogas(weight);
  const meals = calculateMeals(weight);
  const ecoPoints = calculateEcoPoints(weight);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Live Waste Input</h2>
          <div className="status-indicator">
            <div className={`status-dot ${loading ? 'loading' : 'active'}`}></div>
            <span className="status-text">{loading ? 'Updating...' : 'Live'}</span>
          </div>
        </div>

        <div className="weight-display">
          <div className="weight-value">
            {loading ? '---' : weight.toFixed(1)} kg
          </div>
          <div className="weight-label">Current Wet Waste</div>
        </div>

        <div className="conversion-chain">
          <div className="conversion-item">
            <span className="conversion-value">{loading ? '---' : biogas.toFixed(3)} m³</span>
            <span className="conversion-label">Biogas</span>
          </div>
          <div className="conversion-arrow">→</div>
          <div className="conversion-item">
            <span className="conversion-value">{loading ? '---' : meals}</span>
            <span className="conversion-label">Meals</span>
          </div>
        </div>

        <div className="eco-points">
          <div className="eco-points-value">{loading ? '---' : ecoPoints}</div>
          <div className="eco-points-label">Eco-Points Earned</div>
        </div>

        <div className="last-updated">
          Last updated: {loading ? 'Updating...' : new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default WasteInput;