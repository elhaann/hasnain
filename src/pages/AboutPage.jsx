import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AboutContent from "../components/AboutContent";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <Navigation />
      <AboutContent />
      <Footer />
    </div>
  );
}
