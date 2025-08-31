import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Regular navigation items
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/citizen", label: "Citizen", icon: "👤" },
    { href: "/admin", label: "Admin", icon: "⚙️" },
    { href: "/analytics", label: "Analytics", icon: "📊" },
    { href: "/about", label: "About", icon: "ℹ️" },
  ];

  // Special redeem item for prominence
  const redeemItem = { href: "/redeem", label: "Rewards", icon: "🎁" };

  const handleNavClick = (href) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : styles.navDefault}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <span className={styles.logoEmoji}>🌱</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>EcoEnergy</span>
              <span className={styles.logoSubtitle}>Waste to Energy</span>
            </div>
          </Link>

          <div className={styles.desktopNav}>
            {/* Regular navigation items */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`${styles.navItem} ${
                  currentPath === item.href ? styles.navItemActive : styles.navItemInactive
                }`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
                {currentPath === item.href && <div className={styles.activeIndicator}></div>}
              </Link>
            ))}

            {/* Special Redeem Rewards button - prominent styling */}
            <Link
              to={redeemItem.href}
              className={`${styles.navItem} ${styles.redeemButton} ${
                currentPath === redeemItem.href ? styles.redeemButtonActive : ""
              }`}
            >
              <span className={styles.navIcon}>{redeemItem.icon}</span>
              <span>{redeemItem.label}</span>
            </Link>
          </div>

          <div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.mobileMenuButton}>
              <svg
                className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu with redeem item */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed}`}>
          <div className={styles.mobileMenuContent}>
            {/* Regular mobile navigation items */}
            {navItems.map((item, index) => (
              <button
                key={item.href}
                className={`${styles.mobileNavItem} ${
                  currentPath === item.href ? styles.mobileNavItemActive : styles.mobileNavItemInactive
                }`}
                onClick={() => handleNavClick(item.href)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={styles.mobileNavIcon}>{item.icon}</span>
                <span>{item.label}</span>
                {currentPath === item.href && <div className={styles.mobileActiveIndicator}></div>}
              </button>
            ))}

            {/* Special mobile redeem item */}
            <button
              className={`${styles.mobileNavItem} ${styles.mobileRedeemButton} ${
                currentPath === redeemItem.href ? styles.mobileRedeemButtonActive : ""
              }`}
              onClick={() => handleNavClick(redeemItem.href)}
              style={{ animationDelay: `${navItems.length * 50}ms` }}
            >
              <span className={styles.mobileNavIcon}>{redeemItem.icon}</span>
              <span>{redeemItem.label}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
