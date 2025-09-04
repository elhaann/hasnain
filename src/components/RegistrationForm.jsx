import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { app } from "../firebase";

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Validate Indian phone number
  const validatePhoneNumber = (phoneNumber) => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(phoneNumber);
  };

  // Format phone number for Firebase (add +91 country code)
  const formatPhoneNumber = (phoneNumber) => {
    return `+91${phoneNumber}`;
  };

  // Check if email exists
  const checkEmailExists = async (email) => {
    try {
      const auth = getAuth(app);
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  // Handle email verification
  const handleEmailVerification = async () => {
    if (!email) {
      setError('Please enter an email address first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError('This email address is already registered. Please use a different email or try signing in.');
        setLoading(false);
        return;
      }

      // Create a temporary user to send verification email
      const auth = getAuth(app);
      const tempUserCredential = await createUserWithEmailAndPassword(auth, email, 'tempPassword123!');
      
      // Send verification email
      await sendEmailVerification(tempUserCredential.user);
      
      // Delete the temporary user immediately
      await tempUserCredential.user.delete();
      
      setVerificationSent(true);
      setError('');
    } catch (error) {
      console.error('Email verification error:', error);
      let errorMessage = "Failed to send verification email.";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email address is already registered.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      setLoading(false);
      return;
    }

    // Check if email verification is required
    if (!verificationSent) {
      setError('Please verify your email address first');
      setLoading(false);
      return;
    }

    try {
      // Check if email still exists (in case user verified it elsewhere)
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError('This email address is already registered. Please use a different email.');
        setLoading(false);
        return;
      }

      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name in Firebase
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Send final email verification
      await sendEmailVerification(userCredential.user);
      
      // Create user object with all necessary data
      const newUser = {
        id: userCredential.user.uid,
        name: name,
        address: address,
        phone: formatPhoneNumber(phone),
        email: email,
        ecoPoints: 0,
        totalWetWaste: 0,
        totalPlasticWaste: 0,
        joinDate: new Date().toISOString().split("T")[0],
        firebaseUser: userCredential.user,
        emailVerified: userCredential.user.emailVerified
      };

      // Save user data to localStorage
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
      
      {verificationSent && (
        <div className={styles.successMessage}>
          A verification email has been sent to {email}. Please check your inbox and verify your email before proceeding.
        </div>
      )}

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
        <label htmlFor="address" className={styles.label}>
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.input}
          placeholder="Enter your Address"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number
        </label>
        <div className={styles.phoneInputContainer}>
          <span className={styles.countryCode}>+91</span>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
            className={styles.phoneInput}
            placeholder="Enter 10-digit mobile number"
            required
            disabled={loading}
            pattern="[6-9][0-9]{9}"
            title="Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <div className={styles.emailContainer}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Enter your email"
            required
            disabled={loading || verificationSent}
          />
          {!verificationSent && (
            <button
              type="button"
              onClick={handleEmailVerification}
              className={styles.verifyButton}
              disabled={loading || !email}
            >
              Verify Email
            </button>
          )}
          {verificationSent && (
            <span className={styles.verifiedIcon}>✅</span>
          )}
        </div>
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
          placeholder="Create a password (min 6 characters)"
          required
          disabled={loading}
          minLength="6"
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={loading || !verificationSent}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegistrationForm;