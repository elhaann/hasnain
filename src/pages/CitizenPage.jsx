import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import OTPLoginForm from "../components/OTPLoginForm";
import RegistrationForm from "../components/RegistrationForm";
import CitizenDashboard from "../components/CitizenDashboard";

export default function CitizenPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showOTPLogin, setShowOTPLogin] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("currentCitizen");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("currentCitizen");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (user, type = 'signin') => {
    setCurrentUser(user);
    setLoginType(type);
    localStorage.setItem("currentCitizen", JSON.stringify(user));
  };

  const handleRegister = (user, type = 'signup') => {
    setCurrentUser(user);
    setLoginType(type);
    localStorage.setItem("currentCitizen", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginType(null);
    localStorage.removeItem("currentCitizen");
    setShowLogin(true);
    setShowOTPLogin(false);
  };

  const switchToOTPLogin = () => {
    setShowOTPLogin(true);
    setShowLogin(true);
  };

  const switchToEmailLogin = () => {
    setShowOTPLogin(false);
    setShowLogin(true);
  };

  // Show loading state while checking for saved user
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show dashboard if user is logged in
  if (currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <CitizenDashboard user={currentUser} onLogout={handleLogout} loginType={loginType} />
        <Footer />
      </div>
    );
  }

  // Show login/registration forms
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 bg-background py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 font-space-grotesk">
                {showLogin 
                  ? (showOTPLogin ? "Login with OTP" : "Welcome Back") 
                  : "Join EcoEnergy"
                }
              </h1>
              <p className="text-muted-foreground">
                {showLogin 
                  ? (showOTPLogin 
                      ? "Enter your mobile number to receive OTP" 
                      : "Sign in to track your waste contributions"
                    )
                  : "Create an account to start contributing"
                }
              </p>
            </div>

            {showLogin ? (
              <>
                {showOTPLogin ? (
                  <OTPLoginForm 
                    onLogin={handleLogin} 
                    onSwitchToEmail={switchToEmailLogin}
                  />
                ) : (
                  <>
                    <LoginForm onLogin={handleLogin} />
                    <div className="mt-4 text-center">
                      <button 
                        onClick={switchToOTPLogin}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Login with OTP instead
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <RegistrationForm onRegister={handleRegister} />
            )}

            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  setShowLogin(!showLogin);
                  setShowOTPLogin(false);
                }}
                className="text-primary hover:text-primary/80 text-sm"
              >
                {showLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}