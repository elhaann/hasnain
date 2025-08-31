import React, { useState } from "react";
import AdminOverview from "./AdminOverview";
import PickupManagement from "./PickupManagement";
import CenterManagement from "./CenterManagement";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "pickups", label: "Pickup Management", icon: "🚛" },
    { id: "centers", label: "Collection Centers", icon: "🏢" },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Admin Dashboard</h1>
            <p>Manage waste collection and energy production</p>
          </div>
          <button onClick={onLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          <nav className={styles.tabsNav}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : styles.tabInactive}`}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className={styles.content}>
          {activeTab === "overview" && <AdminOverview />}
          {activeTab === "pickups" && <PickupManagement />}
          {activeTab === "centers" && <CenterManagement />}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
