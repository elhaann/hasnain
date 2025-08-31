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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contribution History</h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Date</th>
              <th>Wet Waste (kg)</th>
              <th>Plastic Items</th>
              <th>Eco Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{new Date(entry.date).toLocaleDateString()}</td>
                <td className={styles.tableCell}>{entry.wetWaste.toFixed(1)}</td>
                <td className={styles.tableCell}>{entry.plasticWaste}</td>
                <td className={styles.tableCell}>
                  <span className={styles.pointsBadge}>+{entry.ecoPointsEarned}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.summary}>
        Total entries: {entries.length} • Total eco-points earned:{" "}
        {entries.reduce((sum, entry) => sum + entry.ecoPointsEarned, 0)}
      </div>
    </div>
  );
};

export default WasteHistory;
