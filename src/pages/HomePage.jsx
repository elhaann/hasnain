import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function HomePage() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-space-grotesk">Convert Waste to Energy</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Join our community-driven platform to transform waste into sustainable energy solutions. Track your
              contributions, earn eco-points, and make a real environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/citizen"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg inline-block text-center"
              >
                Join as Citizen
              </a>
              <a
                href="/admin"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors inline-block text-center"
              >
                Login as Admin
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space-grotesk">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple steps to contribute to a sustainable future
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="eco-card p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♻️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-space-grotesk">Report Waste</h3>
                <p className="text-muted-foreground">
                  Log your daily waste contributions including wet waste and plastic items through our easy-to-use
                  interface.
                </p>
              </div>

              <div className="eco-card p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-space-grotesk">Generate Energy</h3>
                <p className="text-muted-foreground">
                  Your waste is converted into biogas and eco-bricks, contributing to renewable energy production.
                </p>
              </div>

              <div className="eco-card p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-chart-1 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-space-grotesk">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Accumulate eco-points for your contributions and compete with your community on the leaderboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space-grotesk">Our Impact</h2>
              <p className="text-xl text-muted-foreground">Real numbers from our community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="stats-card p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-chart-1 mb-2">2,500kg</div>
                <div className="text-muted-foreground">Wet Waste Processed</div>
              </div>
              <div className="stats-card p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-chart-2 mb-2">5,000</div>
                <div className="text-muted-foreground">Meals of Biogas</div>
              </div>
              <div className="stats-card p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-chart-3 mb-2">1,200</div>
                <div className="text-muted-foreground">Plastic Items Recycled</div>
              </div>
              <div className="stats-card p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-chart-4 mb-2">72</div>
                <div className="text-muted-foreground">Eco-bricks Created</div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
