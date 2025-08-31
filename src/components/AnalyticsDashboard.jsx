import React, { useState } from "react";
// import WasteProductionChart from "./WasteProductionChart";
import BiogasChart from "./BiogasChart";
import EcoBricksChart from "./EcoBricksChart";
import CommunityLeaderboard from "./CommunityLeaderboard";
import MonthlyTrendsChart from "./MonthlyTrendsChart";
import ImpactMetrics from "./ImpactMetrics";
import dummyData from "../assets/data/dummyData.json";
import styles from "./AnalyticsDashboard.module.css";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("6months");

  const timeRanges = [
    { value: "1month", label: "Last Month" },
    { value: "3months", label: "Last 3 Months" },
    { value: "6months", label: "Last 6 Months" },
    { value: "1year", label: "Last Year" },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Analytics Dashboard</h1>
            <p>Comprehensive insights into waste-to-energy conversion</p>
          </div>
          <div className={styles.timeRangeSelector}>
            <label htmlFor="timeRange" className={styles.timeRangeLabel}>
              Time Range:
            </label>
            <select
              id="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.timeRangeSelect}
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Impact Metrics */}
        <ImpactMetrics />

        {/* Charts Grid */}
        <div className={styles.chartsGrid}>
          Waste Production Chart
          {/* <div className={styles.chartCard}> */}
            {/* <h2 className={styles.chartTitle}>Monthly Waste Collection</h2> */}
            {/* <WasteProductionChart data={dummyData.analytics.monthlyData} /> */}
          {/* </div> */}

          {/* Biogas Production Chart */}
          {/* <div className={styles.chartCard}> */}
            {/* <h2 className={styles.chartTitle}>Biogas Production</h2> */}
            {/* <BiogasChart data={dummyData.analytics.monthlyData} /> */}
          {/* </div> */}
        </div>

        {/* Monthly Trends */}
        <div className={styles.trendsCard}>
          <h2 className={styles.chartTitle}>Monthly Trends Overview</h2>
          <MonthlyTrendsChart data={dummyData.analytics.monthlyData} />
        </div>

        <div className={styles.bottomGrid}>
          {/* Eco-bricks Chart */}
          <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>Plastic to Eco-bricks Conversion</h2>
            <EcoBricksChart data={dummyData.analytics.monthlyData} />
          </div>

          {/* Community Leaderboard */}
          <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>Community Leaderboard</h2>
            <CommunityLeaderboard citizens={dummyData.citizens} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnalyticsDashboard;
