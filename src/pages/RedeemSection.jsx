import React, { useState } from 'react';
import './RedeemSection.css';
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";



const RedeemSection = () => {
  const [ecoPoints, setEcoPoints] = useState(650); // Starting with 150 points
  const [message, setMessage] = useState('');
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  const availableRewards = [
    {
      id: 1,
      name: '🎉 Get 10% OFF',
      description: 'Redeem 100 eco-points and enjoy 10% discount on partner stores',
      pointsRequired: 100
    },
    {
      id: 2,
      name: '🔥 Flat 20% OFF',
      description: 'Use 200 eco-points to unlock 20% off on food & shopping deals',
      pointsRequired: 100
    },
    {
      id: 3,
      name: '🌟 Save 30% Today',
      description: 'Redeem 300 eco-points for a special 30% discount on select brands.',
      pointsRequired: 300
    },
    {
      id: 4,
      name: '💎 Mega Deal: 50% OFF',
      description: 'Use 500 eco-points to grab massive savings on exclusive offers.',
      pointsRequired: 500
    },
    {
      id: 5,
      name: '🚚 Free Delivery',
      description: 'Redeem 150 eco-points and get free delivery on your next order.',
      pointsRequired: 150
    },
    {
      id: 6,
      name: '🛍️ Buy 1 Get 1 Free',
      description: 'Use 400 eco-points to enjoy BOGO deals on select items.',
      pointsRequired: 400
    }
  ];

  const handleRedeem = (reward) => {
    if (ecoPoints >= reward.pointsRequired) {
      // Successful redemption
      setEcoPoints(prev => prev - reward.pointsRequired);
      const redeemedReward = {
        ...reward,
        redeemedAt: new Date().toLocaleString()
      };
      setRedeemedRewards(prev => [redeemedReward, ...prev]);
      setMessage(`Successfully redeemed ${reward.name}!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } else {
      // Not enough points
      setMessage('Not enough eco-points');
      
      // Clear error message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <>
      <Navigation />
    <div className="redeem-section">
      <div className="container">
        {/* Current Eco-Points */}
        <div className="eco-points-display">
          <h2>Your Eco-Points</h2>
          <div className="points-value">{ecoPoints}</div>
          <p>Keep earning points by making eco-friendly choices!</p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('Successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {/* Available Rewards */}
        <div className="rewards-section">
          <h3>Available Rewards</h3>
          <div className="rewards-grid">
            {availableRewards.map(reward => (
              <div key={reward.id} className="reward-card">
                <h4 className="reward-name">{reward.name}</h4>
                <p className="reward-description">{reward.description}</p>
                <div className="reward-points">
                  <span className="points-required">{reward.pointsRequired} points</span>
                </div>
                <button
                  className={`redeem-btn ${ecoPoints >= reward.pointsRequired ? 'available' : 'unavailable'}`}
                  onClick={() => handleRedeem(reward)}
                  disabled={ecoPoints < reward.pointsRequired}
                >
                  {ecoPoints >= reward.pointsRequired ? 'Redeem' : 'Not Enough Points'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Redeemed Rewards History */}
        {redeemedRewards.length > 0 && (
          <div className="history-section">
            <h3>Redeemed Rewards History</h3>
            <div className="history-list">
              {redeemedRewards.map((reward, index) => (
                <div key={index} className="history-item">
                  <div className="history-reward-info">
                    <h4 className="history-reward-name">{reward.name}</h4>
                    <p className="history-reward-description">{reward.description}</p>
                  </div>
                  <div className="history-meta">
                    <span className="history-points">{reward.pointsRequired} points</span>
                    <span className="history-date">{reward.redeemedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default RedeemSection;