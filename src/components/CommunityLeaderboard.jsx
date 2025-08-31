import React from "react";
import styles from "./CommunityLeaderboard.module.css";

const CommunityLeaderboard = ({ citizens }) => {
  // Sort citizens by eco-points in descending order
  const sortedCitizens = [...citizens].sort((a, b) => b.ecoPoints - a.ecoPoints);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const getRankColorClass = (rank) => {
    switch (rank) {
      case 1:
        return styles.goldRank;
      case 2:
        return styles.silverRank;
      case 3:
        return styles.bronzeRank;
      default:
        return styles.defaultRank;
    }
  };

  return (
    <div className={styles.container}>
      {sortedCitizens.map((citizen, index) => {
        const rank = index + 1;
        return (
          <div
            key={citizen.id}
            className={`${styles.leaderboardItem} ${rank <= 3 ? styles.topRankItem : styles.regularItem}`}
          >
            <div className={styles.itemLeft}>
              <div className={`${styles.rankIcon} ${getRankColorClass(rank)}`}>{getRankIcon(rank)}</div>
              <div className={styles.citizenInfo}>
                <div className={styles.citizenName}>{citizen.name}</div>
                <div className={styles.citizenStats}>
                  {citizen.totalWetWaste.toFixed(1)}kg wet • {citizen.totalPlasticWaste} plastic items
                </div>
              </div>
            </div>
            <div className={styles.itemRight}>
              <div className={styles.ecoPoints}>{citizen.ecoPoints}</div>
              <div className={styles.pointsLabel}>eco-points</div>
            </div>
          </div>
        );
      })}

      {/* Summary Stats */}
      <div className={styles.summary}>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <div className={styles.summaryValue}>
              {sortedCitizens.reduce((sum, citizen) => sum + citizen.ecoPoints, 0)}
            </div>
            <div className={styles.summaryLabel}>Total Eco-Points</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryValue}>
              {sortedCitizens
                .reduce((sum, citizen) => sum + citizen.totalWetWaste + citizen.totalPlasticWaste, 0)
                .toFixed(1)}
            </div>
            <div className={styles.summaryLabel}>Total Waste (kg)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
