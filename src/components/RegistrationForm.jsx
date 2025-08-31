import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { app } from "../firebase";

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name in Firebase
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Create user object with all necessary data
      const newUser = {
        id: userCredential.user.uid, // Use Firebase UID
        name: name,
        email: email,
        ecoPoints: 0,
        totalWetWaste: 0,
        totalPlasticWaste: 0,
        joinDate: new Date().toISOString().split("T")[0],
        firebaseUser: userCredential.user
      };

      // Save user data to localStorage for future reference
      const savedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const existingUserIndex = savedUsers.findIndex(user => user.email === email);
      
      if (existingUserIndex >= 0) {
        savedUsers[existingUserIndex] = newUser;
      } else {
        savedUsers.push(newUser);
      }
      
      localStorage.setItem("registeredUsers", JSON.stringify(savedUsers));

      console.log('User registered successfully:', newUser);
      
      // Call onRegister to update the parent component
      onRegister(newUser, 'signup');
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Provide user-friendly error messages
      let errorMessage = "Registration failed. Please try again.";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email address is already registered. Please use a different email or try signing in.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters long.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Email/password accounts are not enabled. Please contact support.";
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
        <label htmlFor="name" className={styles.label}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Enter your full name"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
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
          Set Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Create a password"
          required
          disabled={loading}
          minLength="6"
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegistrationForm;