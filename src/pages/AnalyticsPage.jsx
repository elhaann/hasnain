import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <AnalyticsDashboard />
      <Footer />
    </div>
  );
}
