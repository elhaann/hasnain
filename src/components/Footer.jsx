import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>
                <span className={styles.logoIconText}>E</span>
              </div>
              <span className={styles.logoTitle}>EcoEnergy</span>
            </div>
            <p className={styles.description}>
              Converting waste to energy for a sustainable future. Join our
              community in making a positive environmental impact.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={styles.sectionTitle}>Contact Us</h3>
            <div className={styles.contactList}>
              <p className={styles.contactItem}>
                📧 elhanyasir_admin@ecoenergy.com
              </p>
              <p className={styles.contactItem}>📞 +91 91342 14397</p>
              <p className={styles.contactItem}>📍 Station Road, Asansol</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <div className={styles.linksList}>
              <a href="/citizen" className={styles.link}>
                Citizen Portal
              </a>
              <a href="/admin" className={styles.link}>
                Admin Dashboard
              </a>
              <a href="/analytics" className={styles.link}>
                Analytics
              </a>
              <a href="/about" className={styles.link}>
                About Us
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © 2025 EcoEnergy. All rights reserved. Built for a sustainable
            future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
