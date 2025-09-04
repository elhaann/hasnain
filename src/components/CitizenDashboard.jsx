import React, { useState, useEffect } from "react";
import WasteEntryForm from "./WasteEntryForm";
import CollectionCentersMap from "./CollectionCentersMap";
import WasteHistory from "./WasteHistory";
import dummyData from "../assets/data/dummyData.json";
import styles from "./CitizenDashboard.module.css";
import WasteInput from "./WasteInput";


const CitizenDashboard = ({ user, onLogout, loginType }) => {
  const [showDashboard, setShowDashboard] = useState(false);

  const [userEntries, setUserEntries] = useState([]);
  const [userStats, setUserStats] = useState({
    ecoPoints: user.ecoPoints || 0,
    totalWetWaste: user.totalWetWaste || 0,
    totalPlasticWaste: user.totalPlasticWaste || 0,
  });

  useEffect(() => {
    // Load user's waste entries
    const entries = dummyData.wasteEntries.filter((entry) => entry.citizenId === user.id);
    setUserEntries(entries);
  }, [user.id]);

  const handleNewEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      citizenId: user.id,
      date: new Date().toISOString().split("T")[0],
      ecoPointsEarned: Math.floor(entry.wetWaste * 4 + entry.plasticWaste * 2),
    };

    setUserEntries([newEntry, ...userEntries]);
    setUserStats((prev) => ({
      ecoPoints: prev.ecoPoints + newEntry.ecoPointsEarned,
      totalWetWaste: prev.totalWetWaste + entry.wetWaste,
      totalPlasticWaste: prev.totalPlasticWaste + entry.plasticWaste,
    }));
  };

  // Determine welcome message based on login type
  const getWelcomeMessage = () => {
    if (loginType === 'signup') {
      return `Welcome, ${user.name} !`;
    } else {
      return `Welcome back, ${user.name} !`;
    }
  };

  const getWelcomeSubtext = () => {
    if (loginType === 'signup') {
      return "Thanks for joining! Start tracking your waste contributions and earn eco-points";
    } else {
      return "Track your waste contributions and earn eco-points";
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className="text-3xl font-bold text-foreground font-space-grotesk">
              {getWelcomeMessage()}
            </h1>
            <p className="text-muted-foreground">
              {getWelcomeSubtext()}
            </p>
          </div>
          <button onClick={onLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statsCard}>
            <div className={styles.statsCardContent}>
              <div className={styles.statsCardText}>
                <p className="text-muted-foreground text-sm">Eco Points</p>
                <p className={styles.primaryText}>{userStats.ecoPoints}</p>
              </div>
              <div className={`${styles.statsCardIcon} ${styles.primaryIcon}`}>
                <span className="text-primary text-xl">🏆</span>
              </div>
            </div>
          </div>
          

          <div className={styles.statsCard}>
            <div className={styles.statsCardContent}>
              <div className={styles.statsCardText}>
                <p className="text-muted-foreground text-sm">Wet Waste (kg)</p>
                <p className={styles.chart1Text}>{userStats.totalWetWaste.toFixed(1)}</p>
              </div>
              <div className={`${styles.statsCardIcon} ${styles.chart1Icon}`}>
                <span className="text-chart-1 text-xl">♻️</span>
              </div>
            </div>
          </div>

          <div className={styles.statsCard}>
            <div className={styles.statsCardContent}>
              <div className={styles.statsCardText}>
                <p className="text-muted-foreground text-sm">Plastic Items</p>
                <p className={styles.chart3Text}>{userStats.totalPlasticWaste}</p>
              </div>
              <div className={`${styles.statsCardIcon} ${styles.chart3Icon}`}>
                <span className="text-chart-3 text-xl">🥤</span>
              </div>
            </div>
          </div>
        </div>
        <section className="py-16 bg-background text-center">
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
          >
            {showDashboard ? "Hide Live Dashboard" : "Show Live Dashboard"}
          </button>

          {showDashboard && (
            <div className="mt-8">
              <WasteInput />
            </div>
          )}
        </section>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          
    
          {/* Waste Entry Form */}
          <div className={styles.contentCard}>
            <h2 className="text-xl font-semibold text-foreground mb-4 font-space-grotesk">Log Today's Waste</h2>
            <WasteEntryForm onSubmit={handleNewEntry} />
          </div>

          {/* Collection Centers Map */}
          <div className={styles.contentCard}>
            <h2 className="text-xl font-semibold text-foreground mb-4 font-space-grotesk">Nearby Collection Centers</h2>
            <CollectionCentersMap />
          </div>
        </div>

        {/* Waste History */}
        <div className={styles.historySection}>
          <WasteHistory entries={userEntries} />
        </div>
      </div>
    </main>
  );
};

export default CitizenDashboard;