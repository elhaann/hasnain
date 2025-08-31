import React from "react";
import styles from "./AboutContent.module.css";

const AboutContent = () => {
  const impactStats = [
    {
      input: "200kg",
      inputType: "Wet Waste",
      output: "400 meals",
      outputType: "of Biogas",
      description: "Organic waste converted to clean cooking fuel",
      icon: "⚡",
      color: "chart1",
    },
    {
      input: "500 bottles",
      inputType: "Plastic Waste",
      output: "30 eco-bricks",
      outputType: "Building Material",
      description: "Plastic bottles compressed into construction blocks",
      icon: "🧱",
      color: "chart2",
    },
    {
      input: "1 citizen",
      inputType: "Daily Contribution",
      output: "10 eco-points",
      outputType: "Community Impact",
      description: "Individual actions creating collective change",
      icon: "🏆",
      color: "chart3",
    },
  ];

  const features = [
    {
      title: "Citizen Engagement",
      description:
        "Easy-to-use platform for citizens to log daily waste contributions and track their environmental impact.",
      icon: "👥",
    },
    {
      title: "Smart Analytics",
      description: "Comprehensive data visualization showing waste-to-energy conversion rates and community progress.",
      icon: "📊",
    },
    {
      title: "Admin Management",
      description:
        "Powerful dashboard for administrators to manage collection centers, schedule pickups, and monitor operations.",
      icon: "⚙️",
    },
    {
      title: "Real Impact",
      description:
        "Transparent tracking of biogas production and eco-brick creation from community waste contributions.",
      icon: "🌱",
    },
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>About EcoEnergy Platform</h1>
          <p className={styles.heroDescription}>
            A revolutionary digital platform that transforms community waste into sustainable energy solutions,
            empowering citizens to make a measurable environmental impact while creating valuable resources for their
            communities.
          </p>
        </div>
      </section>

      {/* Project Description */}
      <section className={styles.missionSection}>
        <div className={styles.missionContainer}>
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <h2>Our Mission</h2>
              <div className={styles.missionText}>
                <p>
                  The EcoEnergy Platform addresses the critical challenge of waste management while simultaneously
                  creating renewable energy solutions. By connecting citizens, administrators, and technology, we're
                  building a sustainable ecosystem that turns everyday waste into valuable resources.
                </p>
                <p>
                  Our platform enables communities to track their waste contributions in real-time, visualize their
                  environmental impact, and participate in a gamified system that rewards sustainable behavior. Every
                  kilogram of wet waste becomes biogas for cooking, and every plastic bottle contributes to eco-brick
                  construction materials.
                </p>
                <p>
                  Through comprehensive analytics and transparent reporting, we provide both citizens and administrators
                  with the insights needed to optimize waste-to-energy conversion and maximize community impact.
                </p>
              </div>
            </div>
            <div className={styles.benefitsCard}>
              <h3 className={styles.benefitsTitle}>Key Benefits</h3>
              <ul className={styles.benefitsList}>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  <span className={styles.benefitText}>Reduce landfill waste by up to 70%</span>
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  <span className={styles.benefitText}>Generate clean cooking fuel from organic waste</span>
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  <span className={styles.benefitText}>Create sustainable building materials from plastic</span>
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  <span className={styles.benefitText}>Engage communities in environmental action</span>
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  <span className={styles.benefitText}>Provide transparent impact measurement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className={styles.impactSection}>
        <div className={styles.impactContainer}>
          <div className={styles.impactHeader}>
            <h2 className={styles.impactTitle}>Environmental Impact</h2>
            <p className={styles.impactDescription}>
              See how your waste contributions translate into real environmental benefits
            </p>
          </div>

          <div className={styles.impactGrid}>
            {impactStats.map((stat, index) => (
              <div key={index} className={styles.impactCard}>
                <div className={`${styles.impactIcon} ${styles[`${stat.color}Icon`]}`}>
                  <span>{stat.icon}</span>
                </div>
                <div className={styles.inputSection}>
                  <div className={styles.inputValue}>{stat.input}</div>
                  <div className={styles.inputType}>{stat.inputType}</div>
                </div>
                <div className={styles.arrow}>→</div>
                <div className={styles.outputSection}>
                  <div className={`${styles.outputValue} ${styles[`${stat.color}Text`]}`}>{stat.output}</div>
                  <div className={styles.outputType}>{stat.outputType}</div>
                </div>
                <p className={styles.impactDescription}>{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Impact Metrics */}
          <div className={styles.metricsCard}>
            <h3 className={styles.metricsTitle}>Real-World Impact Calculations</h3>
            <div className={styles.metricsGrid}>
              <div className={styles.metricsSection}>
                <h4 className={styles.metricsSectionTitle}>Biogas Production</h4>
                <ul className={styles.metricsList}>
                  <li>• 1kg organic waste = 0.3-0.5 cubic meters of biogas</li>
                  <li>• 1 cubic meter biogas = 2-3 hours of cooking fuel</li>
                  <li>• 200kg waste = 400+ meals worth of clean energy</li>
                  <li>• Reduces CO₂ emissions by 1.5kg per kg of waste</li>
                </ul>
              </div>
              <div className={styles.metricsSection}>
                <h4 className={styles.metricsSectionTitle}>Eco-brick Creation</h4>
                <ul className={styles.metricsList}>
                  <li>• 1 eco-brick = 16-17 plastic bottles (500ml)</li>
                  <li>• 30 eco-bricks = 1 square meter of wall construction</li>
                  <li>• Prevents 8.5kg of plastic from entering landfills</li>
                  <li>• Creates durable building material lasting 300+ years</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>Platform Features</h2>
            <p className={styles.featuresDescription}>Comprehensive tools for waste management and energy production</p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureContent}>
                  <div className={styles.featureIcon}>
                    <span>{feature.icon}</span>
                  </div>
                  <div className={styles.featureText}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Join the Sustainable Future</h2>
          <p className={styles.ctaDescription}>
            Start contributing to your community's waste-to-energy transformation today
          </p>
          <div className={styles.ctaButtons}>
            <a href="/citizen" className={styles.ctaPrimary}>
              Get Started as Citizen
            </a>
            <a href="/analytics" className={styles.ctaSecondary}>
              View Analytics
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;
