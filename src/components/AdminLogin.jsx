import React, { useState } from "react";
import styles from "./AdminLogin.module.css";

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Dummy admin authentication
    if (credentials.username === "admin" && credentials.password === "admin123") {
      onLogin();
    } else {
      setError("Invalid credentials. Try: admin / admin123");
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <span>🔐</span>
            </div>
            <h1 className={styles.title}>Admin Portal</h1>
            <p className={styles.subtitle}>Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.fieldGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter admin password"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>

            <div className={styles.demoCredentials}>
              <strong>Demo Credentials:</strong>
              <br />
              Username: admin
              <br />
              Password: admin123
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
