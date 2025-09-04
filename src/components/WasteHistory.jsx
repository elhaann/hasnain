import React from "react";
import styles from "./WasteHistory.module.css";

const WasteHistory = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Contribution History</h2>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <span>📊</span>
          </div>
          <p>No waste entries yet</p>
          <p>Start logging your daily waste to see your history here</p>
        </div>
      </div>
    );
  }

  // Sort entries by date (most recent first)
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Helper function to get waste type display with icon
  const getWasteTypeDisplay = (entry) => {
    const wasteType = entry.wasteType || 'Manual Entry';
    const isAutoFilled = wasteType !== 'Manual Entry' && 
                        wasteType !== 'Wet' && 
                        wasteType !== 'Dry';
    
    return {
      text: wasteType,
      icon: isAutoFilled ? '🔄' : '✏️',
      className: isAutoFilled ? 'auto-filled' : 'manual-entry'
    };
  };

  // Helper function to determine primary waste type
  const getPrimaryWasteType = (entry) => {
    const wetWeight = entry.wetWaste || 0;
    const dryWeight = entry.plasticWaste || 0;
    
    if (wetWeight > 0 && dryWeight === 0) return 'Wet';
    if (dryWeight > 0 && wetWeight === 0) return 'Dry';
    if (wetWeight > 0 && dryWeight > 0) return 'Mixed';
    return 'Unknown';
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contribution History</h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Date</th>
              <th>Entry Type</th>
              <th>Waste Category</th>
              <th>Wet Waste (g)</th>
              <th>Dry Waste (g)</th>
              <th>Eco Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry) => {
              const wasteTypeDisplay = getWasteTypeDisplay(entry);
              const primaryType = getPrimaryWasteType(entry);
              
              return (
                <tr key={entry.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div>
                      <div>{new Date(entry.date).toLocaleDateString()}</div>
                      <div style={{fontSize: '10px', color: '#666'}}>
                        {new Date(entry.date).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <span 
                      className={`${styles.wasteTypeBadge} ${styles[wasteTypeDisplay.className] || ''}`}
                      style={{
                        backgroundColor: wasteTypeDisplay.className === 'auto-filled' ? '#e3f2fd' : '#f3e5f5',
                        color: wasteTypeDisplay.className === 'auto-filled' ? '#1976d2' : '#7b1fa2',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}
                    >
                      {wasteTypeDisplay.icon} {wasteTypeDisplay.text}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span 
                      className={styles.categoryBadge}
                      style={{
                        backgroundColor: 
                          primaryType === 'Wet' ? '#e8f5e8' : 
                          primaryType === 'Dry' ? '#fff3e0' : 
                          primaryType === 'Mixed' ? '#f3e5f5' : '#f5f5f5',
                        color: 
                          primaryType === 'Wet' ? '#2e7d32' : 
                          primaryType === 'Dry' ? '#f57c00' : 
                          primaryType === 'Mixed' ? '#7b1fa2' : '#666',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}
                    >
                      {primaryType}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span style={{
                      fontWeight: entry.wetWaste > 0 ? 'bold' : 'normal',
                      color: entry.wetWaste > 0 ? '#2e7d32' : '#999'
                    }}>
                      {entry.wetWaste ? entry.wetWaste.toFixed(1) : '0.0'}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span style={{
                      fontWeight: entry.plasticWaste > 0 ? 'bold' : 'normal',
                      color: entry.plasticWaste > 0 ? '#f57c00' : '#999'
                    }}>
                      {entry.plasticWaste ? entry.plasticWaste.toFixed(1) : '0.0'}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.pointsBadge} style={{
                      backgroundColor: '#e8f5e8',
                      color: '#2e7d32',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      +{entry.ecoPointsEarned || 0}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryStats}>
          <div className={styles.statItem}>
            <strong>📊 Total entries:</strong> {entries.length}
          </div>
          <div className={styles.statItem}>
            <strong>💧 Total wet waste:</strong> {entries.reduce((sum, entry) => sum + (entry.wetWaste || 0), 0).toFixed(1)}g
          </div>
          <div className={styles.statItem}>
            <strong>🗂️ Total dry waste:</strong> {entries.reduce((sum, entry) => sum + (entry.plasticWaste || 0), 0).toFixed(1)}g
          </div>
          <div className={styles.statItem}>
            <strong>⭐ Total eco-points:</strong> {entries.reduce((sum, entry) => sum + (entry.ecoPointsEarned || 0), 0)}
          </div>
        </div>
        
        {/* Entry type breakdown */}
        <div style={{marginTop: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px'}}>
          <h4 style={{margin: '0 0 10px 0', fontSize: '14px'}}>Entry Types:</h4>
          <div style={{display: 'flex', gap: '15px', fontSize: '12px'}}>
            <span>
              🔄 Auto-filled: {entries.filter(e => e.wasteType && e.wasteType !== 'Manual Entry' && e.wasteType !== 'Wet' && e.wasteType !== 'Dry').length}
            </span>
            <span>
              ✏️ Manual entries: {entries.filter(e => !e.wasteType || e.wasteType === 'Manual Entry' || e.wasteType === 'Wet' || e.wasteType === 'Dry').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteHistory;