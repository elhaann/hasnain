import React, { useState, useEffect } from "react";
import styles from "./OTPLoginForm.module.css";
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { app } from "../firebase";

const OTPLoginForm = ({ onLogin, onSwitchToEmail }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Validate Indian phone number
  const validatePhoneNumber = (phoneNumber) => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(phoneNumber);
  };

  // Format phone number for display
  const formatPhoneNumber = (phoneNumber) => {
    return `+91${phoneNumber}`;
  };

  // Generate 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Simulate SMS sending (replace with actual SMS service)
  const sendSMS = async (phoneNumber, otpCode) => {
    // For demo purposes, we'll just log the OTP
    // In production, integrate with services like:
    // - Twilio, MSG91, TextLocal, or any SMS gateway
    console.log(`SMS to ${phoneNumber}: Your OTP is ${otpCode}`);
    
    // Show OTP in alert for testing (remove in production)
    alert(`Demo OTP for ${phoneNumber}: ${otpCode}`);
    
    return true; // Simulate successful SMS sending
  };

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Send OTP
  const handleSendOTP = async () => {
    if (!validatePhoneNumber(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneNumber(phone);
      
      // Check if user exists in localStorage
      const savedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const userExists = savedUsers.find(user => user.phone === formattedPhone);
      
      if (!userExists) {
        setError('No account found with this phone number. Please register first.');
        setLoading(false);
        return;
      }

      // Generate OTP
      const otpCode = generateOTP();
      setGeneratedOTP(otpCode);
      
      // Send SMS (replace with actual SMS service)
      const smsSent = await sendSMS(formattedPhone, otpCode);
      
      if (smsSent) {
        setOtpSent(true);
        setCountdown(60);
        setError('');
        
        // Store OTP with timestamp for expiration (5 minutes)
        const otpData = {
          code: otpCode,
          phone: formattedPhone,
          timestamp: Date.now(),
          expires: Date.now() + (5 * 60 * 1000) // 5 minutes
        };
        localStorage.setItem('currentOTP', JSON.stringify(otpData));
      } else {
        setError('Failed to send OTP. Please try again.');
      }
      
    } catch (error) {
      console.error('OTP sending error:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get stored OTP data
      const storedOTPData = localStorage.getItem('currentOTP');
      if (!storedOTPData) {
        setError('OTP has expired. Please request a new one.');
        setLoading(false);
        return;
      }

      const otpData = JSON.parse(storedOTPData);
      
      // Check if OTP is expired
      if (Date.now() > otpData.expires) {
        localStorage.removeItem('currentOTP');
        setError('OTP has expired. Please request a new one.');
        setLoading(false);
        return;
      }

      // Verify OTP
      if (otp !== otpData.code) {
        setError('Invalid OTP. Please check and try again.');
        setLoading(false);
        return;
      }

      // Get user data from localStorage
      const savedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const formattedPhone = formatPhoneNumber(phone);
      let userData = savedUsers.find(user => user.phone === formattedPhone);
      
      if (!userData) {
        setError('User account not found. Please register first.');
        setLoading(false);
        return;
      }

      // Clean up OTP data
      localStorage.removeItem('currentOTP');

      console.log('User logged in with OTP successfully:', userData);
      
      // Call onLogin to update parent component
      onLogin(userData, 'signin');
      
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setOtp('');
    setOtpSent(false);
    setGeneratedOTP('');
    localStorage.removeItem('currentOTP');
    await handleSendOTP();
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      {!otpSent ? (
        <>
          <div className={styles.fieldGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <div className={styles.phoneInputContainer}>
              <span className={styles.countryCode}>+91</span>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                className={styles.phoneInput}
                placeholder="Enter 10-digit mobile number"
                required
                disabled={loading}
                pattern="[6-9][0-9]{9}"
              />
            </div>
          </div>

          <div className={styles.infoMessage}>
            <p>📱 For demo purposes, OTP will be shown in an alert.</p>
            <p>In production, integrate with an SMS service.</p>
          </div>

          <button 
            onClick={handleSendOTP}
            className={styles.submitButton}
            disabled={loading || !phone || phone.length !== 10}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </>
      ) : (
        <>
          <div className={styles.otpSentMessage}>
            OTP sent to +91{phone}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="otp" className={styles.label}>
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
              className={styles.otpInput}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
              disabled={loading}
            />
          </div>

          <button 
            onClick={handleVerifyOTP}
            className={styles.submitButton}
            disabled={loading || !otp || otp.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className={styles.resendContainer}>
            {countdown > 0 ? (
              <span className={styles.countdownText}>
                Resend OTP in {countdown} seconds
              </span>
            ) : (
              <button 
                onClick={handleResendOTP}
                className={styles.resendButton}
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
          </div>
        </>
      )}

      <div className={styles.switchContainer}>
        <button 
          onClick={onSwitchToEmail}
          className={styles.switchButton}
        >
          Login with Email instead
        </button>
      </div>
    </div>
  );
};

export default OTPLoginForm;