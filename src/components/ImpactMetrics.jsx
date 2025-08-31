import React from "react";
import dummyData from "../assets/data/dummyData.json";
import styles from "./ImpactMetrics.module.css";

const ImpactMetrics = () => {
  const metrics = [
    {
      title: "Total Waste Processed",
      value: `${dummyData.analytics.totalWetWaste + dummyData.analytics.totalPlasticWaste}`,
      unit: "kg",
      subtitle: "Combined wet and plastic waste",
      icon: "♻️",
      color: "chart1",
    },
    {
      title: "Biogas Produced",
      value: dummyData.analytics.biogasProduced,
      unit: "meals",
      subtitle: `From ${dummyData.analytics.totalWetWaste}kg wet waste`,
      icon: "⚡",
      color: "chart2",
    },
    {
      title: "Eco-bricks Created",
      value: dummyData.analytics.ecoBricksCreated,
      unit: "bricks",
      subtitle: `From ${dummyData.analytics.totalPlasticWaste} plastic items`,
      icon: "🧱",
      color: "chart3",
    },
    {
      title: "Active Citizens",
      value: dummyData.analytics.activeCitizens,
      unit: "users",
      subtitle: "Contributing to the platform",
      icon: "👥",
      color: "chart4",
    },
  ];

  return (
    <div className={styles.metricsGrid}>
      {metrics.map((metric, index) => (
        <div key={index} className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <div className={`${styles.metricIcon} ${styles[`${metric.color}Icon`]}`}>
              <span>{metric.icon}</span>
            </div>
            <div className={styles.metricValue}>
              <div className={`${styles.metricNumber} ${styles[`${metric.color}Text`]}`}>
                {metric.value}
                <span className={styles.metricUnit}>{metric.unit}</span>
              </div>
              <div className={styles.metricTitle}>{metric.title}</div>
            </div>
          </div>
          <p className={styles.metricSubtitle}>{metric.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default ImpactMetrics;
