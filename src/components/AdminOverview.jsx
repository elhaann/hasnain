import React, { useState, useEffect } from "react";
import dummyData from "../assets/data/dummyData.json";
import styles from "./AdminOverview.module.css";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalWetWaste: 0,
    totalPlasticWaste: 0,
    biogasProduced: 0,
    ecoBricksProduced: 0,
    activeCitizens: 0,
    activeCenters: 0,
  });

  useEffect(() => {
    // Calculate stats from dummy data
    const totalWetWaste = dummyData.analytics.totalWetWaste;
    const totalPlasticWaste = dummyData.analytics.totalPlasticWaste;
    const biogasProduced = totalWetWaste * 2; // 1kg wet waste = 2 meals of biogas
    const ecoBricksProduced = Math.floor(totalPlasticWaste / 16.67); // ~500 bottles = 30 eco-bricks
    const activeCitizens = dummyData.citizens.length;
    const activeCenters = dummyData.collectionCenters.filter((center) => center.status === "active").length;

    setStats({
      totalWetWaste,
      totalPlasticWaste,
      biogasProduced,
      ecoBricksProduced,
      activeCitizens,
      activeCenters,
    });
  }, []);

  const statCards = [
    {
      title: "Total Wet Waste",
      value: `${stats.totalWetWaste}kg`,
      subtitle: `${stats.biogasProduced} meals of biogas`,
      icon: "♻️",
      color: "chart1",
    },
    {
      title: "Total Plastic Waste",
      value: `${stats.totalPlasticWaste} items`,
      subtitle: `${stats.ecoBricksProduced} eco-bricks produced`,
      icon: "🥤",
      color: "chart2",
    },
    {
      title: "Active Citizens",
      value: stats.activeCitizens,
      subtitle: "Registered users",
      icon: "👥",
      color: "chart3",
    },
    {
      title: "Collection Centers",
      value: stats.activeCenters,
      subtitle: "Currently operational",
      icon: "🏢",
      color: "chart4",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <div className={`${styles.statIcon} ${styles[`${stat.color}Icon`]}`}>
                <span>{stat.icon}</span>
              </div>
              <div className={styles.statValue}>
                <div className={`${styles.statNumber} ${styles[`${stat.color}Text`]}`}>{stat.value}</div>
                <div className={styles.statTitle}>{stat.title}</div>
              </div>
            </div>
            <p className={styles.statSubtitle}>{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Impact Calculations */}
      <div className={styles.impactCard}>
        <h2 className={styles.impactTitle}>Environmental Impact</h2>
        <div className={styles.impactGrid}>
          <div className={styles.impactSection}>
            <h3 className={styles.impactSectionTitle}>Biogas Production</h3>
            <div className={styles.impactDetails}>
              <div className={styles.impactRow}>
                <span className={styles.impactLabel}>Wet waste processed:</span>
                <span className={styles.impactValue}>{stats.totalWetWaste}kg</span>
              </div>
              <div className={styles.impactRow}>
                <span className={styles.impactLabel}>Biogas potential:</span>
                <span className={`${styles.impactValue} ${styles.chart1Text}`}>{stats.biogasProduced} meals</span>
              </div>
              <div className={styles.impactNote}>* 1kg wet waste ≈ 2 meals of biogas</div>
            </div>
          </div>

          <div className={styles.impactSection}>
            <h3 className={styles.impactSectionTitle}>Eco-brick Production</h3>
            <div className={styles.impactDetails}>
              <div className={styles.impactRow}>
                <span className={styles.impactLabel}>Plastic items collected:</span>
                <span className={styles.impactValue}>{stats.totalPlasticWaste} items</span>
              </div>
              <div className={styles.impactRow}>
                <span className={styles.impactLabel}>Eco-bricks produced:</span>
                <span className={`${styles.impactValue} ${styles.chart2Text}`}>{stats.ecoBricksProduced} bricks</span>
              </div>
              <div className={styles.impactNote}>* ~500 bottles = 30 eco-bricks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.activityCard}>
        <h2 className={styles.activityTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {dummyData.wasteEntries.slice(0, 5).map((entry) => {
            const citizen = dummyData.citizens.find((c) => c.id === entry.citizenId);
            return (
              <div key={entry.id} className={styles.activityItem}>
                <div className={styles.activityContent}>
                  <span>{citizen?.name}</span>
                  <span>
                    logged {entry.wetWaste}kg wet waste, {entry.plasticWaste} plastic items
                  </span>
                </div>
                <div className={styles.activityDate}>{entry.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
