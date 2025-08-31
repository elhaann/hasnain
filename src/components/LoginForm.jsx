import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "../firebase";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if we have user data stored locally from previous registration
      const savedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      let userData = savedUsers.find(user => user.email === email);
      
      // If no local data found, create basic user object using Firebase data
      if (!userData) {
        userData = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || email.split('@')[0], // Use display name or email prefix
          email: userCredential.user.email,
          ecoPoints: 0,
          totalWetWaste: 0,
          totalPlasticWaste: 0,
          joinDate: new Date().toISOString().split("T")[0],
          firebaseUser: userCredential.user
        };
        
        // Save this user data for future logins
        savedUsers.push(userData);
        localStorage.setItem("registeredUsers", JSON.stringify(savedUsers));
      } else {
        // Update with current Firebase user data while preserving the saved name
        userData = {
          ...userData,
          firebaseUser: userCredential.user,
          // Keep the original name from registration if it exists
          name: userData.name || userCredential.user.displayName
        };
        
        // Update the saved user data
        const userIndex = savedUsers.findIndex(user => user.email === email);
        if (userIndex >= 0) {
          savedUsers[userIndex] = userData;
          localStorage.setItem("registeredUsers", JSON.stringify(savedUsers));
        }
      }

      console.log('User logged in successfully:', userData);
      
      // Call onLogin to update the parent component
      onLogin(userData, 'signin');
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Provide user-friendly error messages
      let errorMessage = "Login failed. Please try again.";
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "No account found with this email address.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password. Please try again.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case 'auth/user-disabled':
          errorMessage = "This account has been disabled. Please contact support.";
          break;
        case 'auth/invalid-credential':
          errorMessage = "Invalid email or password. Please check your credentials.";
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Enter your email"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Enter your password"
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;