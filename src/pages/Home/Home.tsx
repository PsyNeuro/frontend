import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/pages/Register");
  };

  const handleSignIn = () => {
    navigate("/pages/Login");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">UniSystem</span>
            </h1>
            <p className="hero-subtitle">
              Your comprehensive student management platform for academic
              excellence
            </p>
            <p className="hero-description">
              Manage your courses, track your progress, connect with peers, and
              unlock your potential in our modern university ecosystem.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleGetStarted}>
                Get Started
              </button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">📚</div>
              <h3>Courses</h3>
              <p>Access your courses</p>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">📊</div>
              <h3>Progress</h3>
              <p>Track your grades</p>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">👥</div>
              <h3>Community</h3>
              <p>Connect with peers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            Everything you need for academic success
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Course Management</h3>
              <p>
                Organize your courses, assignments, and deadlines in one place
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Grade Tracking</h3>
              <p>Monitor your academic progress with detailed analytics</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Collaboration</h3>
              <p>Connect with classmates and participate in study groups</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access your dashboard anywhere, anytime from any device</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to start your journey?</h2>
            <p>
              Join thousands of students already using UniSystem to excel in
              their studies
            </p>
            <div className="auth-buttons">
              <button
                className="btn btn-primary large"
                onClick={handleGetStarted}
              >
                Register Now
              </button>
              <button className="btn btn-outline large" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
